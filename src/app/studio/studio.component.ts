import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, signal, DestroyRef, inject, Injector, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../core/services/cart.service';
import { NotificationService } from '../core/services/notification.service';
import { PaymentSuccessModalComponent } from '../shared/components/modal/payment-success-modal/payment-success-modal.component';
import { PaymentFailModalComponent } from '../shared/components/modal/payment-fail-modal/payment-fail-modal.component';
import { formatVnd } from '../shared/utils/currency.util';
import { environment } from '../../environments/environment';

interface Blank {
  id: string;
  name: string;
  type: string;
  basePrice: number;
  description: string;
  image: string;
}

interface Material {
  id: string;
  label: string;
  tag: string;
  color: string;
  price: string;
  priceVnd: number;
  image: string;
  imgFilter: string;
  available: boolean;
}

interface Stone {
  id: string;
  label: string;
  image: string;
  pricePerCarat: number;
  muted?: boolean;
}

interface GalleryThumb {
  src: string;
  alt: string;
}

interface OrderItem {
  name: string;
  subName?: string;
  price: number;
}

interface CheckoutForm {
  name: FormControl<string>;
  phone: FormControl<string>;
  email: FormControl<string>;
  province: FormControl<string>;
  ward: FormControl<string>;
  address: FormControl<string>;
}

@Component({
  selector: 'app-studio',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe, ReactiveFormsModule, PaymentSuccessModalComponent, PaymentFailModalComponent],
  templateUrl: './studio.component.html',
  styleUrl: './studio.component.css',
})
export class StudioComponent implements OnInit {
  // ─── Constants ───────────────────────────────────────────────────────
  // Công chế tác trước đây là phí cố định 5tr bất kể thiết kế — giờ tính theo độ
  // phức tạp: có gắn đá thì cộng thêm phí gắn đá + phí theo carat (đá lớn khó gắn
  // hơn). Phải khớp với computeCraftFee() ở server/services/studio.service.ts.
  readonly CRAFT_FEE_BASE = 3_000_000;
  readonly STONE_SETTING_FEE = 2_000_000;
  readonly STONE_SETTING_FEE_PER_CARAT = 300_000;
  readonly ENGRAVE_FEE_PER_CHAR = 50_000;
  readonly ENGRAVE_FREE_CHARS = 10;
  readonly MAX_ENGRAVE_CHARS = 25;
  readonly showSuccessModal = signal(false);
  readonly showFailModal = signal(false);
  readonly isSubmitting = signal(false);
  readonly placedOrderId = signal('');

  // ─── Voucher state ────────────────────────────────────────────────────
  private appliedCustomerVoucherId: string | null = null;
  readonly voucherDiscount = signal(0);
  readonly voucherMsg = signal('');
  readonly voucherStatus = signal<'idle' | 'success' | 'error'>('idle');

  // ─── Blank forms (from DB) ────────────────────────────────────────────
  readonly allBlanks     = signal<Blank[]>([]);
  readonly blanksLoading = signal(false);
  readonly blanksError   = signal(false);

  private readonly TYPE_LABELS: Record<string, string> = {
    RING: 'Nhẫn', NECKLACE: 'Dây chuyền', BRACELET: 'Lắc tay', EARRING: 'Hoa tai',
  };

  typeLabel(type: string): string {
    return this.TYPE_LABELS[type] ?? type;
  }

  onBlankImgError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/images/studio-ring.png';
  }

  // Ảnh phôi/chất liệu trong DB là ảnh gốc từ Shopify CDN (300-450KB/ảnh) — quá nặng
  // cho lưới chọn phôi/khung preview nhỏ, khiến trang Studio load rất chậm lúc vào lần
  // đầu. Shopify CDN hỗ trợ resize on-the-fly qua query "?width=" (giảm ~90% dung
  // lượng), ảnh asset nội bộ (assets/images/...) thì giữ nguyên vì đã nhẹ sẵn.
  thumbUrl(url: string | undefined | null, width: number): string {
    if (!url || !url.includes('cdn.shopify.com')) return url ?? '';
    return url.includes('?') ? `${url}&width=${width}` : `${url}?width=${width}`;
  }

  retryLoadBlanks(): void {
    this.blanksError.set(false);
    this.blanksLoading.set(true);
    this.http.get<any>(`${environment.apiUrl}/studio/blanks`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.allBlanks.set(res.data.map((b: any): Blank => ({
              id:          b.blank_id,
              name:        b.blank_name,
              type:        b.blank_type,
              basePrice:   Number(b.base_price),
              description: b.description ?? '',
              image:       b.image_url ?? 'assets/images/studio-ring.png',
            })));
          }
          this.blanksLoading.set(false);
        },
        error: () => {
          this.blanksLoading.set(false);
          this.blanksError.set(true);
        },
      });
  }

  // ─── Static data ──────────────────────────────────────────────────────
  readonly steps = [
    { n: 1, label: 'Chọn phôi' },
    { n: 2, label: 'Chất liệu' },
    { n: 3, label: 'Đá quý' },
    { n: 4, label: 'Khắc chữ' },
    { n: 5, label: 'Đặt hàng' },
  ];


  readonly materials: Material[] = [
    { id: 'vang-18k', label: 'Vàng 18K', tag: 'Lựa chọn đặc trưng', color: '#d4af37', price: '15 triệu VNĐ', priceVnd: 15_000_000,
      image: '', imgFilter: '', available: true },
    { id: 'vang-14k', label: 'Vàng 14K', tag: 'Thanh lịch cân bằng', color: '#e5c07b', price: '12 triệu VNĐ', priceVnd: 12_000_000,
      image: '', imgFilter: '', available: true },
    { id: 'bach-kim', label: 'Bạch kim', tag: 'Sức mạnh vĩnh cửu', color: '#e5e4e2', price: '20 triệu VNĐ', priceVnd: 20_000_000,
      image: '', imgFilter: '', available: true },
    { id: 'bac-925', label: 'Bạc 925', tag: 'Cổ điển hiện đại', color: '#c0c0c0', price: '8 triệu VNĐ', priceVnd: 8_000_000,
      image: '', imgFilter: '', available: true },
  ];

  // Hình ảnh của từng blank theo chất liệu (lấy từ Mejuri product variants)
  // Key: blank_id → { material_id → image_url }
  // Nếu blank_id không có trong map → tất cả chất liệu đều available (dùng ảnh blank mặc định)
  // Nếu blank_id có trong map nhưng material_id không có → chất liệu đó bị disabled
  private readonly BLANK_MATERIAL_IMAGES: Record<string, Partial<Record<string, string>>> = {
    'BLK000001': { // Nhẫn tròn trơn → Thin Dome Ring
      'vang-18k': 'https://cdn.shopify.com/s/files/1/0797/3637/3533/files/0-StackerRings_ThinDomeRing_V_OffFigure-PDP_new.png',
      'vang-14k': 'https://cdn.shopify.com/s/files/1/0797/3637/3533/files/0-ThinDomeRing-14k-Angled_061_new.png',
      'bac-925':  'https://cdn.shopify.com/s/files/1/0797/3637/3533/files/0-StackerRings_ThinDomeRing_SS_OffFigure-PDP_new.png',
      // bach-kim: không có variant → disabled
    },
    'BLK000002': { // Nhẫn đai ngang → Stacker Ring
      'vang-18k': 'https://cdn.shopify.com/s/files/1/0797/3637/3533/files/0-StackerRing_10k_OffFigureAngledView_PDP_new.png',
      'vang-14k': 'https://cdn.shopify.com/s/files/1/0797/3637/3533/files/0-StackerRing_10k_OffFigureAngledView_PDP_new.png',
      'bach-kim': 'https://cdn.shopify.com/s/files/1/0797/3637/3533/files/stacker_ring_OffFigureAngledView_PDP.jpg',
      // bac-925: không có variant → disabled
    },
    'BLK000003': { // Nhẫn đính đá solo → Dôme Figure Balance Ring
      'vang-18k': 'https://cdn.shopify.com/s/files/1/0797/3637/3533/files/0-DomeFigure_DomeFigureFloatingGemstoneStackerLGS_V_OffFigAngledView-018_Purple_FOC_new.png',
      'vang-14k': 'https://cdn.shopify.com/s/files/1/0797/3637/3533/files/0-DomeFigure_DomeFigureFloatingGemstoneStackerLGS_V_OffFigAngledView-018_Purple_FOC_new.png',
      'bac-925':  'https://cdn.shopify.com/s/files/1/0797/3637/3533/files/0-DomeFigure_DomeFigureFloatingGemstoneStackerLGS_V_OffFigAngledView-018_Purple_FOC_SILVER_new.png',
      // bach-kim: không có variant → disabled
    },

    'BLK000004': { // Vòng cổ dây mảnh → Spheres Chain Necklace
      'vang-18k': 'https://cdn.shopify.com/s/files/1/0797/3637/3533/files/0-NEWCHAINS_SpheresChokerNecklace_14k_Front_061_new_20102b9f-4820-489c-a4d0-ef33501515fb.png',
      'vang-14k': 'https://cdn.shopify.com/s/files/1/0797/3637/3533/files/0-NEWCHAINS_SpheresChokerNecklace_14k_Front_061_new_20102b9f-4820-489c-a4d0-ef33501515fb.png',
      'bac-925':  'https://cdn.shopify.com/s/files/1/0797/3637/3533/files/0-SILVERBESTSELLERLES-SpheresChainNecklaceSilver-SS-Front_043_new.png',
      // bach-kim: không có → disabled
    },
    'BLK000005': { // Vòng cổ dây xích → Serpentine Chain Necklace
      'vang-18k': 'https://cdn.shopify.com/s/files/1/0797/3637/3533/files/0-SerpentineChainNecklace-14K-Front_014_new_694c52ff-6f10-4b64-b2f0-2c3d52a0f8e8.png',
      'vang-14k': 'https://cdn.shopify.com/s/files/1/0797/3637/3533/files/0-SerpentineChainNecklace-14K-Front_014_new_694c52ff-6f10-4b64-b2f0-2c3d52a0f8e8.png',
      'bac-925':  'https://cdn.shopify.com/s/files/1/0797/3637/3533/files/0-SILVERBESTSELLERLES-SerpentineNecklaceSilver-SS-Front_229_new.png',
      // bach-kim: không có → disabled
    },
    'BLK000006': { // Lắc tay tròn trơn → Spheres Chain Bracelet
      'vang-18k': 'https://cdn.shopify.com/s/files/1/0797/3637/3533/files/0-SpheresBracelet-14K-TopDown_169_new.png',
      'vang-14k': 'https://cdn.shopify.com/s/files/1/0797/3637/3533/files/0-SpheresBracelet-14K-TopDown_169_new.png',
      'bac-925':  'https://cdn.shopify.com/s/files/1/0797/3637/3533/files/0-SILVERBESTSELLERLES-SpheresChainBraceletSilver-SS-TopDown_527_new.png',
      // bach-kim: không có → disabled
    },
    'BLK000007': { // Hoa tai thả tròn → Bold Huggie Hoops
      'vang-18k': 'https://cdn.shopify.com/s/files/1/0797/3637/3533/files/0-BoldHuggieHoops_V_OffFigureAngledView_PDP_new.png',
      'vang-14k': 'https://cdn.shopify.com/s/files/1/0797/3637/3533/files/0-BoldHuggieHoops_10k_OffFigureAngledView_PDP_new.png',
      'bac-925':  'https://cdn.shopify.com/s/files/1/0797/3637/3533/files/0-SILVERBESTSELLERLES-BoldHuggieHoopsSilver-SS-Angled_014_new_12392e97-5877-4977-ace5-18b963492f6b.png',
      // bach-kim: không có → disabled
    },
    'BLK000008': { // Mặt dây chuyền oval → Lucia Pendant Necklace
      'vang-18k': 'https://cdn.shopify.com/s/files/1/0797/3637/3533/files/0-LGSSinglePendantNecklace_V_OffFigureFrontView_copy.jpg',
      'vang-14k': 'https://cdn.shopify.com/s/files/1/0797/3637/3533/files/0-LGSSinglePendantNecklace_V_OffFigureFrontView_copy.jpg',
      'bac-925':  'https://cdn.shopify.com/s/files/1/0797/3637/3533/files/0-LGSSinglePendantNecklace_SS_OffFigureFrontViewcopy.jpg',
      // bach-kim: không có → disabled
    },
  };

  readonly step2PreviewImage = computed(() => {
    const blank = this.selectedBlank();
    if (!blank) return 'assets/images/studio-ring.png';
    const variants = this.BLANK_MATERIAL_IMAGES[blank.id];
    if (!variants) return blank.image; // không có variant map → dùng ảnh blank
    return variants[this.selectedMaterial().id] || blank.image;
  });

  // Stone availability per blank
  // Blank không có trong map → chỉ 'none' khả dụng (không gắn đá được)
  private readonly BLANK_AVAILABLE_STONES: Record<string, string[]> = {
    'BLK000003': ['diamond', 'ruby', 'sapphire', 'emerald', 'none'],
    'BLK000008': ['diamond', 'ruby', 'sapphire', 'emerald', 'none'],
  };

  isStoneAvailableForBlank(stoneId: string): boolean {
    const blank = this.selectedBlank();
    if (!blank) return stoneId === 'none';
    const available = this.BLANK_AVAILABLE_STONES[blank.id];
    if (!available) return stoneId === 'none';
    return available.includes(stoneId);
  }

  blankSupportsStones(): boolean {
    const blank = this.selectedBlank();
    if (!blank) return false;
    return !!this.BLANK_AVAILABLE_STONES[blank.id];
  }

  // Vertical metallic band gradient — simulates inner surface curvature under light
  readonly innerBandGradient = computed(() => {
    const id = this.selectedMaterial().id;
    if (id === 'vang-18k' || id === 'vang-14k')
      return 'linear-gradient(to bottom, #7a5510 0%, #c8960c 18%, #f0cc50 38%, #ffe47a 50%, #e8c040 62%, #c09018 82%, #7a5510 100%)';
    if (id === 'bach-kim')
      return 'linear-gradient(to bottom, #606070 0%, #9898b0 18%, #d0d0e0 38%, #f0f0f8 50%, #c8c8d8 62%, #8888a0 82%, #606070 100%)';
    return 'linear-gradient(to bottom, #555 0%, #909090 18%, #d4d4d4 38%, #ebebeb 50%, #c8c8c8 62%, #888 82%, #555 100%)';
  });

  readonly innerBandTextColor = computed(() => {
    const id = this.selectedMaterial().id;
    if (id === 'vang-18k' || id === 'vang-14k') return 'rgba(80, 48, 4, 0.85)';
    if (id === 'bach-kim') return 'rgba(50, 50, 70, 0.80)';
    return 'rgba(40, 40, 40, 0.80)';
  });

  isMaterialAvailableForBlank(materialId: string): boolean {
    const blank = this.selectedBlank();
    if (!blank) return true;
    const variants = this.BLANK_MATERIAL_IMAGES[blank.id];
    if (!variants) return true; // blank không có variant map → tất cả available
    return !!variants[materialId];
  }

  readonly stones: Stone[] = [
    {
      id: 'diamond',
      label: 'Kim cương',
      image: 'assets/images/product-nhan-kim-cuong-solitaire.png',
      pricePerCarat: 10_000_000,
    },
    {
      id: 'ruby',
      label: 'Hồng ngọc',
      image: 'assets/images/product-nhan-rose-gold-sapphire.png',
      pricePerCarat: 8_000_000,
    },
    {
      id: 'sapphire',
      label: 'Lam ngọc',
      image: 'assets/images/product-nhan-eternal-love.png',
      pricePerCarat: 7_000_000,
    },
    {
      id: 'emerald',
      label: 'Ngọc lục bảo',
      image: 'assets/images/product-nhan-emerald-modernity.png',
      pricePerCarat: 6_000_000,
    },
    {
      id: 'none',
      label: 'Không đá',
      image: 'assets/images/studio-ring.png',
      pricePerCarat: 0,
      muted: true,
    },
  ];

  readonly engraveGallery: GalleryThumb[] = [
    {
      src: 'assets/images/product-detail-nhan-aeterna-1.png',
      alt: 'Góc nhìn chính',
    },
    {
      src: 'assets/images/product-detail-nhan-aeterna-2.png',
      alt: 'Góc nhìn 2',
    },
    {
      src: 'assets/images/product-detail-nhan-aeterna-3.png',
      alt: 'Góc nhìn 3',
    },
    {
      src: 'assets/images/product-detail-nhan-aeterna-4.png',
      alt: 'Góc nhìn 4',
    },
  ];

  readonly paymentMethods = [
    { id: 'bank-transfer', label: 'Chuyển khoản ngân hàng' },
    { id: 'e-wallet', label: 'Ví điện tử (MoMo/ZaloPay)' },
    { id: 'credit-card', label: 'Thẻ tín dụng/Ghi nợ' },
  ];

  // ─── Province / Ward data ─────────────────────────────────────────────
  readonly PROVINCES = [
    { value: 'hcm',        label: 'TP. Hồ Chí Minh' },
    { value: 'hn',         label: 'Hà Nội' },
    { value: 'dn',         label: 'Đà Nẵng' },
    { value: 'cantho',     label: 'Cần Thơ' },
    { value: 'haiphong',   label: 'Hải Phòng' },
    { value: 'hue',        label: 'Huế' },
    { value: 'quangninh',  label: 'Quảng Ninh' },
    { value: 'bacninh',    label: 'Bắc Ninh' },
    { value: 'thainguyen', label: 'Thái Nguyên' },
    { value: 'phutho',     label: 'Phú Thọ' },
    { value: 'laocai',     label: 'Lào Cai' },
    { value: 'tuyenquang', label: 'Tuyên Quang' },
    { value: 'hungyen',    label: 'Hưng Yên' },
    { value: 'ninhbinh',   label: 'Ninh Bình' },
    { value: 'thanhhoa',   label: 'Thanh Hóa' },
    { value: 'nghean',     label: 'Nghệ An' },
    { value: 'hatinh',     label: 'Hà Tĩnh' },
    { value: 'quangtri',   label: 'Quảng Trị' },
    { value: 'quangngai',  label: 'Quảng Ngãi' },
    { value: 'gialai',     label: 'Gia Lai' },
    { value: 'khanhhoa',   label: 'Khánh Hòa' },
    { value: 'lamdong',    label: 'Lâm Đồng' },
    { value: 'daklak',     label: 'Đắk Lắk' },
    { value: 'dongnai',    label: 'Đồng Nai' },
    { value: 'tayninh',    label: 'Tây Ninh' },
    { value: 'angiang',    label: 'An Giang' },
    { value: 'dongthap',   label: 'Đồng Tháp' },
    { value: 'vinhlong',   label: 'Vĩnh Long' },
    { value: 'camau',      label: 'Cà Mau' },
    { value: 'caobang',    label: 'Cao Bằng' },
    { value: 'dienbien',   label: 'Điện Biên' },
    { value: 'laichau',    label: 'Lai Châu' },
    { value: 'langson',    label: 'Lạng Sơn' },
    { value: 'sonla',      label: 'Sơn La' },
  ];

  readonly DISTRICTS: Record<string, { value: string; label: string }[]> = {
    hcm: [
      { value: 'ben-nghe',        label: 'Phường Bến Nghé' },
      { value: 'ben-thanh',       label: 'Phường Bến Thành' },
      { value: 'co-giang',        label: 'Phường Cô Giang' },
      { value: 'nguyen-cu-trinh', label: 'Phường Nguyễn Cư Trinh' },
      { value: 'phu-my-hung',     label: 'Phường Phú Mỹ Hưng' },
      { value: 'tan-phong',       label: 'Phường Tân Phong' },
      { value: 'linh-trung',      label: 'Phường Linh Trung' },
      { value: 'thu-duc',         label: 'Phường Thủ Đức' },
      { value: 'binh-tho',        label: 'Phường Bình Thọ' },
      { value: 'hiep-binh-phuoc', label: 'Phường Hiệp Bình Phước' },
      { value: 'an-lac',          label: 'Phường An Lạc' },
      { value: 'tan-son-nhi',     label: 'Phường Tân Sơn Nhì' },
      { value: 'phu-nhuan',       label: 'Phường Phú Nhuận' },
    ],
    hn: [
      { value: 'ba-dinh',      label: 'Quận Ba Đình' },
      { value: 'hoan-kiem',    label: 'Quận Hoàn Kiếm' },
      { value: 'hai-ba-trung', label: 'Quận Hai Bà Trưng' },
      { value: 'dong-da',      label: 'Quận Đống Đa' },
      { value: 'tay-ho',       label: 'Quận Tây Hồ' },
      { value: 'cau-giay',     label: 'Quận Cầu Giấy' },
      { value: 'thanh-xuan',   label: 'Quận Thanh Xuân' },
      { value: 'hoang-mai',    label: 'Quận Hoàng Mai' },
      { value: 'long-bien',    label: 'Quận Long Biên' },
      { value: 'nam-tu-liem',  label: 'Quận Nam Từ Liêm' },
      { value: 'bac-tu-liem',  label: 'Quận Bắc Từ Liêm' },
      { value: 'ha-dong',      label: 'Quận Hà Đông' },
    ],
    dn: [
      { value: 'hai-chau-1',    label: 'Phường Hải Châu 1' },
      { value: 'hai-chau-2',    label: 'Phường Hải Châu 2' },
      { value: 'thanh-binh',    label: 'Phường Thạnh Bình' },
      { value: 'thuan-phuoc',   label: 'Phường Thuận Phước' },
      { value: 'my-an',         label: 'Phường Mỹ An' },
      { value: 'khue-my',       label: 'Phường Khuê Mỹ' },
      { value: 'man-thai',      label: 'Phường Mân Thái' },
      { value: 'phuoc-my',      label: 'Phường Phước Mỹ' },
      { value: 'hoa-cuong-bac', label: 'Phường Hòa Cường Bắc' },
      { value: 'hoa-khanh-bac', label: 'Phường Hòa Khánh Bắc' },
      { value: 'hoa-minh',      label: 'Phường Hòa Minh' },
      { value: 'hoa-vang',      label: 'Xã Hòa Vang' },
    ],
    haiphong: [
      { value: 'hong-bang',   label: 'Quận Hồng Bàng' },
      { value: 'ngo-quyen',   label: 'Quận Ngô Quyền' },
      { value: 'le-chan',     label: 'Quận Lê Chân' },
      { value: 'hai-an',     label: 'Quận Hải An' },
      { value: 'kien-an',    label: 'Quận Kiến An' },
      { value: 'hai-duong',  label: 'TP. Hải Dương' },
      { value: 'kinh-mon',   label: 'TX. Kinh Môn' },
      { value: 'chi-linh',   label: 'TP. Chí Linh' },
    ],
    hue: [
      { value: 'phu-hoi',    label: 'Phường Phú Hội' },
      { value: 'phu-xuan',   label: 'Phường Phú Xuân' },
      { value: 'thuan-hoa',  label: 'Phường Thuận Hòa' },
      { value: 'an-cuu',     label: 'Phường An Cựu' },
      { value: 'kim-long',   label: 'Phường Kim Long' },
      { value: 'huong-thuy', label: 'TX. Hương Thủy' },
      { value: 'huong-tra',  label: 'TX. Hương Trà' },
    ],
    cantho: [
      { value: 'ninh-kieu',  label: 'Quận Ninh Kiều' },
      { value: 'binh-thuy',  label: 'Quận Bình Thủy' },
      { value: 'cai-rang',   label: 'Quận Cái Răng' },
      { value: 'o-mon',      label: 'Quận Ô Môn' },
      { value: 'thot-not',   label: 'Quận Thốt Nốt' },
      { value: 'vi-thanh',   label: 'TP. Vị Thanh' },
      { value: 'nga-bay',    label: 'TX. Ngã Bảy' },
      { value: 'soc-trang',  label: 'TP. Sóc Trăng' },
    ],
    quangninh: [
      { value: 'ha-long',    label: 'TP. Hạ Long' },
      { value: 'cam-pha',    label: 'TP. Cẩm Phả' },
      { value: 'uong-bi',    label: 'TP. Uông Bí' },
      { value: 'mong-cai',   label: 'TP. Móng Cái' },
      { value: 'dong-trieu', label: 'TX. Đông Triều' },
      { value: 'quang-yen',  label: 'TX. Quảng Yên' },
    ],
    bacninh: [
      { value: 'bac-ninh-tp',  label: 'TP. Bắc Ninh' },
      { value: 'tu-son',       label: 'TX. Từ Sơn' },
      { value: 'bac-giang-tp', label: 'TP. Bắc Giang' },
      { value: 'viet-yen',     label: 'TX. Việt Yên' },
      { value: 'yen-phong',    label: 'Huyện Yên Phong' },
      { value: 'lang-giang',   label: 'Huyện Lạng Giang' },
    ],
    thainguyen: [
      { value: 'tn-tp',      label: 'TP. Thái Nguyên' },
      { value: 'song-cong',  label: 'TP. Sông Công' },
      { value: 'pho-yen',    label: 'TX. Phổ Yên' },
      { value: 'bac-kan',    label: 'TP. Bắc Kạn' },
      { value: 'cho-moi',    label: 'TX. Chợ Mới' },
    ],
    phutho: [
      { value: 'viet-tri',    label: 'TP. Việt Trì' },
      { value: 'phu-tho-tx',  label: 'TX. Phú Thọ' },
      { value: 'vinh-yen',    label: 'TP. Vĩnh Yên' },
      { value: 'phuc-yen',    label: 'TP. Phúc Yên' },
      { value: 'hoa-binh-tp', label: 'TP. Hòa Bình' },
      { value: 'luong-son',   label: 'TX. Lương Sơn' },
    ],
    laocai: [
      { value: 'lao-cai-tp', label: 'TP. Lào Cai' },
      { value: 'sa-pa',      label: 'TX. Sa Pa' },
      { value: 'yen-bai-tp', label: 'TP. Yên Bái' },
      { value: 'nghia-lo',   label: 'TX. Nghĩa Lộ' },
      { value: 'van-yen',    label: 'Huyện Văn Yên' },
    ],
    tuyenquang: [
      { value: 'tuyen-quang-tp', label: 'TP. Tuyên Quang' },
      { value: 'ha-giang-tp',    label: 'TP. Hà Giang' },
      { value: 'dong-van',       label: 'TX. Đồng Văn' },
      { value: 'yen-binh',       label: 'Huyện Yên Bình' },
    ],
    hungyen: [
      { value: 'hung-yen-tp',  label: 'TP. Hưng Yên' },
      { value: 'my-hao',       label: 'TX. Mỹ Hào' },
      { value: 'thai-binh-tp', label: 'TP. Thái Bình' },
      { value: 'dong-hoa',     label: 'TX. Đông Hòa' },
      { value: 'kien-xuong',   label: 'Huyện Kiến Xương' },
    ],
    ninhbinh: [
      { value: 'ninh-binh-tp', label: 'TP. Ninh Bình' },
      { value: 'tam-diep',     label: 'TP. Tam Điệp' },
      { value: 'phu-ly',       label: 'TP. Phủ Lý' },
      { value: 'nam-dinh-tp',  label: 'TP. Nam Định' },
      { value: 'my-loc',       label: 'TX. Mỹ Lộc' },
    ],
    thanhhoa: [
      { value: 'thanh-hoa-tp', label: 'TP. Thanh Hóa' },
      { value: 'bim-son',      label: 'TX. Bỉm Sơn' },
      { value: 'sam-son',      label: 'TP. Sầm Sơn' },
      { value: 'nghi-son',     label: 'TX. Nghi Sơn' },
    ],
    nghean: [
      { value: 'vinh',       label: 'TP. Vinh' },
      { value: 'cua-lo',     label: 'TX. Cửa Lò' },
      { value: 'thai-hoa',   label: 'TX. Thái Hòa' },
      { value: 'hoang-mai',  label: 'TX. Hoàng Mai' },
    ],
    hatinh: [
      { value: 'ha-tinh-tp', label: 'TP. Hà Tĩnh' },
      { value: 'hong-linh',  label: 'TX. Hồng Lĩnh' },
      { value: 'ky-anh',     label: 'TX. Kỳ Anh' },
      { value: 'vung-ang',   label: 'TX. Vũng Áng' },
    ],
    quangtri: [
      { value: 'dong-ha',      label: 'TP. Đông Hà' },
      { value: 'quang-tri-tx', label: 'TX. Quảng Trị' },
      { value: 'dong-hoi',     label: 'TP. Đồng Hới' },
      { value: 'ba-don',       label: 'TX. Ba Đồn' },
      { value: 'le-thuy',      label: 'Huyện Lệ Thủy' },
    ],
    quangngai: [
      { value: 'quang-ngai-tp', label: 'TP. Quảng Ngãi' },
      { value: 'duc-pho',       label: 'TX. Đức Phổ' },
      { value: 'kon-tum-tp',    label: 'TP. Kon Tum' },
      { value: 'dak-to',        label: 'TX. Đắk Tô' },
      { value: 'ngoc-hoi',      label: 'Huyện Ngọc Hồi' },
    ],
    gialai: [
      { value: 'pleiku',    label: 'TP. Pleiku' },
      { value: 'an-khe',    label: 'TX. An Khê' },
      { value: 'ayun-pa',   label: 'TX. Ayun Pa' },
      { value: 'quy-nhon',  label: 'TP. Quy Nhơn' },
      { value: 'hoai-nhon', label: 'TX. Hoài Nhơn' },
      { value: 'an-nhon',   label: 'TX. An Nhơn' },
    ],
    khanhhoa: [
      { value: 'nha-trang', label: 'TP. Nha Trang' },
      { value: 'cam-ranh',  label: 'TP. Cam Ranh' },
      { value: 'ninh-hoa',  label: 'TX. Ninh Hòa' },
      { value: 'phan-rang', label: 'TP. Phan Rang - Tháp Chàm' },
      { value: 'ninh-hai',  label: 'TX. Ninh Hải' },
    ],
    lamdong: [
      { value: 'da-lat',    label: 'TP. Đà Lạt' },
      { value: 'bao-loc',   label: 'TX. Bảo Lộc' },
      { value: 'phan-thiet',label: 'TP. Phan Thiết' },
      { value: 'la-gi',     label: 'TX. La Gi' },
      { value: 'duc-linh',  label: 'Huyện Đức Linh' },
    ],
    daklak: [
      { value: 'buon-ma-thuot', label: 'TP. Buôn Ma Thuột' },
      { value: 'buon-ho',       label: 'TX. Buôn Hồ' },
      { value: 'gia-nghia',     label: 'TP. Gia Nghĩa' },
      { value: 'dak-mil',       label: 'TX. Đắk Mil' },
    ],
    dongnai: [
      { value: 'bien-hoa',  label: 'TP. Biên Hòa' },
      { value: 'long-khanh',label: 'TP. Long Khánh' },
      { value: 'nhon-trach',label: 'TX. Nhơn Trạch' },
      { value: 'dong-xoai', label: 'TP. Đồng Xoài' },
      { value: 'chon-thanh',label: 'TX. Chơn Thành' },
    ],
    tayninh: [
      { value: 'tay-ninh-tp', label: 'TP. Tây Ninh' },
      { value: 'trang-bang',  label: 'TX. Trảng Bàng' },
      { value: 'hoa-thanh',   label: 'TX. Hòa Thành' },
      { value: 'tan-an',      label: 'TP. Tân An' },
      { value: 'kien-tuong',  label: 'TX. Kiến Tường' },
    ],
    angiang: [
      { value: 'long-xuyen', label: 'TP. Long Xuyên' },
      { value: 'chau-doc',   label: 'TP. Châu Đốc' },
      { value: 'tan-chau',   label: 'TX. Tân Châu' },
      { value: 'rach-gia',   label: 'TP. Rạch Giá' },
      { value: 'ha-tien',    label: 'TX. Hà Tiên' },
      { value: 'kien-luong', label: 'TX. Kiên Lương' },
    ],
    dongthap: [
      { value: 'cao-lanh', label: 'TP. Cao Lãnh' },
      { value: 'sa-dec',   label: 'TP. Sa Đéc' },
      { value: 'hong-ngu', label: 'TX. Hồng Ngự' },
      { value: 'my-tho',   label: 'TP. Mỹ Tho' },
      { value: 'cai-lay',  label: 'TX. Cai Lậy' },
    ],
    vinhlong: [
      { value: 'vinh-long-tp', label: 'TP. Vĩnh Long' },
      { value: 'binh-minh',    label: 'TX. Bình Minh' },
      { value: 'ben-tre-tp',   label: 'TP. Bến Tre' },
      { value: 'tra-vinh-tp',  label: 'TP. Trà Vinh' },
      { value: 'duyen-hai',    label: 'TX. Duyên Hải' },
    ],
    camau: [
      { value: 'ca-mau-tp',   label: 'TP. Cà Mau' },
      { value: 'nam-can',     label: 'TX. Năm Căn' },
      { value: 'bac-lieu-tp', label: 'TP. Bạc Liêu' },
      { value: 'gia-rai',     label: 'TX. Giá Rai' },
    ],
    caobang: [
      { value: 'cao-bang-tp', label: 'TP. Cao Bằng' },
      { value: 'bao-lac',     label: 'Huyện Bảo Lạc' },
      { value: 'ha-quang',    label: 'Huyện Hà Quảng' },
    ],
    dienbien: [
      { value: 'dien-bien-phu', label: 'TP. Điện Biên Phủ' },
      { value: 'muong-lay',     label: 'TX. Mường Lay' },
      { value: 'dien-bien',     label: 'Huyện Điện Biên' },
    ],
    laichau: [
      { value: 'lai-chau-tp', label: 'TP. Lai Châu' },
      { value: 'phong-tho',   label: 'TX. Phong Thổ' },
      { value: 'sin-ho',      label: 'Huyện Sìn Hồ' },
      { value: 'tam-duong',   label: 'Huyện Tam Đường' },
    ],
    langson: [
      { value: 'lang-son-tp', label: 'TP. Lạng Sơn' },
      { value: 'loc-binh',    label: 'Huyện Lộc Bình' },
      { value: 'chi-lang',    label: 'Huyện Chi Lăng' },
      { value: 'huu-lung',    label: 'Huyện Hữu Lũng' },
    ],
    sonla: [
      { value: 'son-la-tp', label: 'TP. Sơn La' },
      { value: 'moc-chau',  label: 'TX. Mộc Châu' },
      { value: 'mai-son',   label: 'TX. Mai Sơn' },
      { value: 'yen-chau',  label: 'Huyện Yên Châu' },
    ],
  };

  // ─── Step state ───────────────────────────────────────────────────────
  readonly currentStep = signal(1);

  // Step 5 has two sub-views: 1 = price analysis, 2 = checkout form
  readonly checkoutSubStep = signal<1 | 2>(1);

  // ─── Draft persistence (survives leaving/returning to /studio) ────────
  private readonly DRAFT_KEY = 'renga_studio_draft';
  private pendingBlankId: string | null = null;

  constructor() {
    this.blanksLoading.set(true);
    this.http.get<any>(`${environment.apiUrl}/studio/blanks`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.allBlanks.set(res.data.map((b: any): Blank => ({
              id:          b.blank_id,
              name:        b.blank_name,
              type:        b.blank_type,
              basePrice:   Number(b.base_price),
              description: b.description ?? '',
              image:       b.image_url ?? 'assets/images/studio-ring.png',
            })));
          }
          this.blanksLoading.set(false);
          this.applyPendingBlank();
        },
        error: () => {
          this.blanksLoading.set(false);
          this.blanksError.set(true);
        },
      });

    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const step = Number(params['step']);
        const sub = Number(params['sub']) as 1 | 2;
        if (step >= 1 && step <= 5) {
          this.currentStep.set(step);
        }
        if (sub === 1 || sub === 2) {
          this.checkoutSubStep.set(sub);
        }
        // CART-02: "Tiếp tục thiết kế" từ giỏ hàng — nạp lại đúng thiết kế DRAFT đã
        // lưu (blank/chất liệu/khắc chữ) thay vì đưa khách vào Studio trống trơn.
        const resumeId = params['resume'];
        if (resumeId) this.resumeStudioCartItem(resumeId);
      });
  }

  private resumeStudioCartItem(customId: string): void {
    this.http.get<any>(`${environment.apiUrl}/cart/studio-items/${customId}`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (!res.success) return;
          const data = res.data;
          this.pendingBlankId = data.blankId;
          this.applyPendingBlank();
          const material = this.materials.find(m => m.id === data.materialId);
          if (material) this.selectedMaterial.set(material);
          this.engraveText.set(data.engraveText ?? '');
          this.currentStep.set(2);
        },
        error: () => this.notify.error('Không thể tải lại thiết kế đã lưu. Vui lòng thử chọn lại từ đầu.'),
      });
  }

  private applyPendingBlank(): void {
    if (!this.pendingBlankId) return;
    // Danh sách blank có thể chưa tải xong (resume chạy song song, độc lập với fetch
    // blanks) — chờ lần gọi tiếp theo thay vì xoá pendingBlankId quá sớm và mất resume.
    if (!this.allBlanks().length) return;
    const blank = this.allBlanks().find(b => b.id === this.pendingBlankId);
    if (blank) this.selectedBlank.set(blank);
    this.pendingBlankId = null;
  }

  ngOnInit(): void {
    this.restoreDraft();

    this.checkoutForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.saveDraft());

    // effect() gọi trong ngOnInit (không phải constructor/field initializer) cần
    // truyền injector tường minh — thiếu chỗ này ném lỗi runtime NG0203 làm hỏng
    // toàn bộ init của component, khiến trang Studio hiện trắng khi vào lần đầu.
    effect(() => {
      // Đọc mọi signal cần lưu để effect tự chạy lại khi bất kỳ cái nào đổi
      this.selectedMaterial(); this.selectedStone(); this.carat();
      this.engraveText(); this.engraveFont(); this.selectedPaymentMethod();
      this.voucherCode(); this.voucherDiscount(); this.voucherMsg(); this.voucherStatus();
      this.selectedProvince(); this.currentStep(); this.checkoutSubStep();
      this.selectedBlank();
      this.saveDraft();
    }, { injector: this.injector });
  }

  private restoreDraft(): void {
    let draft: any;
    try {
      const raw = sessionStorage.getItem(this.DRAFT_KEY);
      draft = raw ? JSON.parse(raw) : null;
    } catch {
      draft = null;
    }
    if (!draft) return;

    if (draft.blankId) this.pendingBlankId = draft.blankId;
    const material = this.materials.find(m => m.id === draft.materialId);
    if (material) this.selectedMaterial.set(material);
    const stone = this.stones.find(s => s.id === draft.stoneId);
    if (stone) this.selectedStone.set(stone);
    if (typeof draft.carat === 'number') this.carat.set(draft.carat);
    if (typeof draft.engraveText === 'string') this.engraveText.set(draft.engraveText);
    if (draft.engraveFont) this.engraveFont.set(draft.engraveFont);
    if (draft.selectedPaymentMethod) this.selectedPaymentMethod.set(draft.selectedPaymentMethod);
    if (typeof draft.voucherCode === 'string') this.voucherCode.set(draft.voucherCode);
    if (typeof draft.voucherDiscount === 'number') this.voucherDiscount.set(draft.voucherDiscount);
    if (typeof draft.voucherMsg === 'string') this.voucherMsg.set(draft.voucherMsg);
    if (draft.voucherStatus) this.voucherStatus.set(draft.voucherStatus);
    if (draft.appliedCustomerVoucherId) this.appliedCustomerVoucherId = draft.appliedCustomerVoucherId;
    if (draft.selectedProvince) this.selectedProvince.set(draft.selectedProvince);
    if (draft.checkoutForm) this.checkoutForm.patchValue(draft.checkoutForm);
    if (draft.currentStep >= 1 && draft.currentStep <= 5) this.currentStep.set(draft.currentStep);
    if (draft.checkoutSubStep === 1 || draft.checkoutSubStep === 2) this.checkoutSubStep.set(draft.checkoutSubStep);
  }

  private saveDraft(): void {
    const draft = {
      blankId:                 this.selectedBlank()?.id ?? null,
      materialId:              this.selectedMaterial().id,
      stoneId:                 this.selectedStone().id,
      carat:                   this.carat(),
      engraveText:             this.engraveText(),
      engraveFont:             this.engraveFont(),
      selectedPaymentMethod:   this.selectedPaymentMethod(),
      voucherCode:             this.voucherCode(),
      voucherDiscount:         this.voucherDiscount(),
      voucherMsg:              this.voucherMsg(),
      voucherStatus:           this.voucherStatus(),
      appliedCustomerVoucherId: this.appliedCustomerVoucherId,
      selectedProvince:        this.selectedProvince(),
      checkoutForm:            this.checkoutForm.getRawValue(),
      currentStep:             this.currentStep(),
      checkoutSubStep:         this.checkoutSubStep(),
    };
    try {
      sessionStorage.setItem(this.DRAFT_KEY, JSON.stringify(draft));
    } catch {
      // sessionStorage đầy/bị chặn — bỏ qua, không ảnh hưởng luồng chính
    }
  }

  private clearDraft(): void {
    try { sessionStorage.removeItem(this.DRAFT_KEY); } catch {}
  }

  // Step 1
  readonly selectedBlank = signal<Blank | null>(null);

  // Step 2
  readonly selectedMaterial = signal<Material>(this.materials[0]);

  // Step 3
  readonly selectedStone = signal<Stone>(this.stones[0]);

  readonly savedToast = signal(false);
  readonly sharePopupOpen = signal(false);
  private saveTimer: ReturnType<typeof setTimeout> | null = null;

  saveDesign(): void {
    if (this.saveTimer) clearTimeout(this.saveTimer);
    this.savedToast.set(true);
    this.saveTimer = setTimeout(() => this.savedToast.set(false), 2500);
    this.downloadDesignFile();
  }

  // "Lưu thiết kế" trước đây tải ra file .txt — QA báo sai định dạng (phải là ẢNH).
  // Giờ vẽ ảnh preview thiết kế + thông tin lựa chọn lên canvas rồi xuất PNG thật.
  private downloadDesignFile(): void {
    const imgSrc = this.step2PreviewImage();
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => this.renderDesignImage(img);
    img.onerror = () => this.renderDesignImage(null);
    img.src = imgSrc;
  }

  private renderDesignImage(img: HTMLImageElement | null): void {
    const blank = this.selectedBlank();
    const stone = this.selectedStone();
    const accent = '#c4607e';
    const W = 900;
    const PAD = 50;
    const boxW = W - PAD * 2;
    const boxH = 560;

    const details = [
      { label: 'PHÔI', value: blank?.name ?? 'Chưa chọn' },
      { label: 'CHẤT LIỆU', value: this.selectedMaterial().label },
      { label: 'ĐÁ QUÝ', value: stone.id === 'none' ? 'Không đá' : `${stone.label} (${this.carat().toFixed(1)} carat)` },
      { label: 'KHẮC CHỮ', value: this.engraveText() || 'Không khắc' },
    ];

    // Chiều cao canvas tính trước theo đúng các mốc sẽ dùng lúc vẽ bên dưới, để
    // không phải resize canvas giữa chừng (resize sẽ xoá sạch context đã vẽ).
    const titleY   = PAD + boxH + 70;
    const subY     = titleY + 38;
    const detailsY0 = subY + 50;
    const detailsH  = details.length * 56;
    const dividerY  = detailsY0 + detailsH + 6;
    const totalY    = dividerY + 46;
    const footerY   = totalY + 50;
    const H = footerY + PAD;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = W;
    canvas.height = H;

    // Nền hồng nhạt + khung viền ngoài màu nhấn thương hiệu
    ctx.fillStyle = '#fdeef2';
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.strokeRect(16, 16, W - 32, H - 32);

    // Card ảnh trắng có viền, ảnh được canh giữa + chừa lề trong
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(PAD, PAD, boxW, boxH);
    ctx.strokeStyle = '#e8cdd4';
    ctx.lineWidth = 1;
    ctx.strokeRect(PAD, PAD, boxW, boxH);
    if (img) {
      const innerPad = 30;
      const scale = Math.min((boxW - innerPad * 2) / img.width, (boxH - innerPad * 2) / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.drawImage(img, PAD + (boxW - w) / 2, PAD + (boxH - h) / 2, w, h);
    }

    // Tiêu đề + gạch trang trí dưới tên thương hiệu
    // Georgia không có đủ glyph dấu tiếng Việt trên canvas (dấu bị tách rời khỏi
    // chữ cái, ví dụ "ế" ra "ê´") — dùng Arial cho toàn bộ chữ để hiển thị đúng.
    ctx.textAlign = 'center';
    ctx.fillStyle = '#1b1c1c';
    ctx.font = 'bold 30px Arial';
    ctx.fillText('RENGA', W / 2, titleY);
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 46, titleY + 14);
    ctx.lineTo(W / 2 + 46, titleY + 14);
    ctx.stroke();

    ctx.font = '600 15px Arial';
    ctx.fillStyle = '#9a6070';
    ctx.fillText('THIẾT KẾ TÙY BIẾN CỦA BẠN', W / 2, subY);

    // Chi tiết dạng nhãn nhỏ + giá trị đậm, mỗi mục 1 hàng cho thoáng
    ctx.textAlign = 'left';
    let y = detailsY0;
    for (const item of details) {
      ctx.font = '13px Arial';
      ctx.fillStyle = '#9a8a8f';
      ctx.fillText(item.label, PAD, y);
      ctx.font = '600 19px Arial';
      ctx.fillStyle = '#1b1c1c';
      ctx.fillText(item.value, PAD, y + 25);
      y += 56;
    }

    // Đường phân cách trước tổng tiền
    ctx.strokeStyle = '#e8cdd4';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(PAD, dividerY);
    ctx.lineTo(PAD + boxW, dividerY);
    ctx.stroke();

    // Tổng tiền nổi bật, canh 2 đầu trái/phải
    ctx.textAlign = 'left';
    ctx.font = '15px Arial';
    ctx.fillStyle = '#9a6070';
    ctx.fillText('TỔNG CỘNG', PAD, totalY);
    ctx.textAlign = 'right';
    ctx.font = 'bold 27px Arial';
    ctx.fillStyle = accent;
    ctx.fillText(`${this.formatVnd(this.totalPrice())}đ`, PAD + boxW, totalY);

    ctx.textAlign = 'center';
    ctx.font = '13px Arial';
    ctx.fillStyle = '#9a8a8f';
    ctx.fillText(`Lưu lúc ${new Date().toLocaleString('vi-VN')}`, W / 2, footerY);

    canvas.toBlob((blob) => {
      if (!blob) {
        this.notify.error('Không thể tạo ảnh thiết kế. Vui lòng thử lại.');
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `renga-thiet-ke-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  }

  openSharePopup(): void {
    this.sharePopupOpen.set(true);
  }
  readonly carat = signal(1.0);

  // Step 4
  readonly engraveText = signal('');
  readonly engraveFont = signal<'serif-italic' | 'classic-sans'>('serif-italic');
  readonly selectedThumbIndex = signal(0);

  // Step 5 — không có phương thức nào an toàn để mặc định sẵn (khác checkout SP
  // có sẵn có COD) nên để trống, bắt khách tự chọn.
  readonly selectedPaymentMethod = signal('');
  readonly voucherCode = signal('');
  readonly shippingExpanded = signal(true);

  readonly checkoutForm = new FormGroup<CheckoutForm>({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    phone: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    // Email không bắt buộc nhưng nếu có nhập thì phải đúng định dạng — trước đây
    // field này không có validator nào nên gõ sai kiểu gì cũng được coi là hợp lệ.
    email: new FormControl('', { nonNullable: true, validators: [Validators.email] }),
    province: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    ward: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    address: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  readonly selectedProvince   = signal('');
  readonly availableDistricts = computed(() => this.DISTRICTS[this.selectedProvince()] ?? []);
  readonly wardLabel          = computed(() => this.selectedProvince() === 'hn' ? 'QUẬN/HUYỆN' : 'PHƯỜNG/XÃ');
  readonly wardPlaceholder    = computed(() => this.selectedProvince() === 'hn' ? 'Chọn Quận/Huyện' : 'Chọn Phường/Xã');

  onProvinceChange(): void {
    // Ô nhập giờ cho gõ tự do (datalist), giá trị thật là LABEL người đọc được
    // chứ không còn là key nội bộ ('hcm') như <select> cũ — phải dò lại key từ
    // label mới tra được DISTRICTS; gõ tự do/không khớp → không gợi ý khu vực.
    const rawValue = this.checkoutForm.get('province')!.value;
    const matchedKey = this.PROVINCES.find(p => p.label === rawValue)?.value ?? '';
    this.selectedProvince.set(matchedKey);
    this.checkoutForm.get('ward')!.setValue('');
  }

  // ─── Saved address picker ─────────────────────────────────────────────
  readonly savedAddresses    = signal<any[]>([]);
  readonly addressesLoaded   = signal(false);
  readonly addressesLoading  = signal(false);
  readonly showAddressPicker = signal(false);

  loadAndShowAddresses(): void {
    if (!this.addressesLoaded()) {
      this.addressesLoading.set(true);
      this.http.get<any>(`${environment.apiUrl}/orders/addresses`)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (res) => {
            this.savedAddresses.set(res.data ?? []);
            this.addressesLoaded.set(true);
            this.addressesLoading.set(false);
            this.showAddressPicker.set(true);
          },
          error: () => {
            // Không đánh dấu addressesLoaded=true khi lỗi — để lần bấm sau còn thử tải lại,
            // và không mở picker giả vờ như tải được 0 địa chỉ.
            this.addressesLoading.set(false);
            this.notify.error('Không tải được danh sách địa chỉ đã lưu. Vui lòng thử lại.');
          },
        });
    } else {
      this.showAddressPicker.update(v => !v);
    }
  }

  @HostListener('document:click')
  closeAddressPicker(): void {
    this.showAddressPicker.set(false);
  }

  applyAddress(addr: any): void {
    // Ô nhập province/ward giờ hiện LABEL (text tự do), không còn phải key nội bộ
    // như lúc còn <select> — patch label vào form để hiển thị đúng, còn key chỉ
    // giữ riêng trong selectedProvince() để tra cứu DISTRICTS.
    const provinceEntry = this.PROVINCES.find(p => p.value === addr.province || p.label === addr.province);
    const provinceKey = provinceEntry?.value ?? '';
    this.selectedProvince.set(provinceKey);
    const wardEntry = (this.DISTRICTS[provinceKey] ?? []).find(d => d.value === addr.ward || d.label === addr.ward);
    this.checkoutForm.patchValue({
      name:     addr.recipient_name,
      phone:    addr.recipient_phone,
      address:  addr.address_line,
      province: provinceEntry?.label ?? addr.province,
      ward:     wardEntry?.label ?? addr.ward,
    });
    this.showAddressPicker.set(false);
  }

  // ─── Computed ─────────────────────────────────────────────────────────
  readonly stonePrice = computed(() =>
    this.selectedStone().id === 'none'
      ? 0
      : Math.round(this.selectedStone().pricePerCarat * this.carat()),
  );

  readonly engraveFee = computed(() => {
    const extra = Math.max(0, this.engraveText().length - this.ENGRAVE_FREE_CHARS);
    return extra * this.ENGRAVE_FEE_PER_CHAR;
  });

  readonly craftFee = computed(() => {
    const stone = this.selectedStone();
    if (stone.id === 'none') return this.CRAFT_FEE_BASE;
    return this.CRAFT_FEE_BASE + this.STONE_SETTING_FEE
      + Math.round(this.STONE_SETTING_FEE_PER_CARAT * this.carat());
  });

  readonly totalPrice = computed(
    () =>
      (this.selectedBlank()?.basePrice ?? 0) +
      this.selectedMaterial().priceVnd +
      this.stonePrice() +
      this.engraveFee() +
      this.craftFee(),
  );

  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cartService = inject(CartService);
  private readonly notify = inject(NotificationService);
  private readonly http = inject(HttpClient);
  private readonly injector = inject(Injector);

  readonly finalTotal = computed(() => Math.max(this.totalPrice() - this.voucherDiscount(), 0));
  readonly depositAmount = computed(() => Math.round(this.finalTotal() / 2));

  readonly orderItems = computed((): OrderItem[] => {
    const blank = this.selectedBlank();
    const items: OrderItem[] = [
      { name: this.selectedMaterial().label, price: this.selectedMaterial().priceVnd },
    ];
    if (this.selectedStone().id !== 'none') {
      items.push({
        name: `${this.selectedStone().label} ${this.carat().toFixed(1)}ct`,
        price: this.stonePrice(),
      });
    }
    items.push({ name: blank?.name ?? 'Phôi', price: blank?.basePrice ?? 0 });
    items.push({ name: 'Công chế tác thủ công', price: this.craftFee() });
    if (this.engraveFee() > 0) {
      items.push({
        name: `Khắc chữ (${this.engraveText().length} ký tự)`,
        price: this.engraveFee(),
      });
    }
    return items;
  });


  readonly currentGalleryImage = computed(
    () => this.engraveGallery[this.selectedThumbIndex()],
  );

  readonly engraveCharCount = computed(() => this.engraveText().length);

  // ─── Methods ──────────────────────────────────────────────────────────
  goToStep(n: number): void {
    this.currentStep.set(n);
    this.checkoutSubStep.set(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  flyToCart(event: MouseEvent): void {
    const btn = event.currentTarget as HTMLElement;
    const cartEl = document.getElementById('cart-icon-btn');
    if (!cartEl) { this.addToCartSilent(); return; }

    const btnRect = btn.getBoundingClientRect();
    const cartRect = cartEl.getBoundingClientRect();

    const imgSrc = this.selectedBlank()?.image ?? 'assets/images/studio-ring.png';

    const fly = document.createElement('div');
    fly.style.cssText = `
      position: fixed;
      left: ${btnRect.left + btnRect.width / 2 - 24}px;
      top: ${btnRect.top + btnRect.height / 2 - 24}px;
      width: 48px; height: 48px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid var(--color-primary, #c4607e);
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      z-index: 9999;
      pointer-events: none;
      transition: left 0.65s cubic-bezier(0.25,0.46,0.45,0.94),
                  top  0.65s cubic-bezier(0.25,0.46,0.45,0.94),
                  transform 0.65s ease,
                  opacity 0.2s ease 0.45s;
    `;
    fly.innerHTML = `<img src="${imgSrc}" style="width:100%;height:100%;object-fit:cover;" />`;
    document.body.appendChild(fly);

    fly.getBoundingClientRect();

    fly.style.left    = `${cartRect.left + cartRect.width / 2 - 12}px`;
    fly.style.top     = `${cartRect.top  + cartRect.height / 2 - 12}px`;
    fly.style.transform = 'scale(0.15)';
    fly.style.opacity   = '0';

    setTimeout(() => {
      document.body.removeChild(fly);
      this.addToCartSilent();
      this.cartService.triggerBump();
    }, 700);
  }

  private addToCartSilent(): void {
    const blank = this.selectedBlank();
    if (!blank) { this.notify.error('Vui lòng chọn phôi sản phẩm trước khi thêm vào giỏ.'); return; }
    this.cartService.addItem({
      type: 'studio',
      name: `${blank.name} Studio`,
      spec: `${this.selectedMaterial().label} • ${this.selectedStone().label}`,
      price: this.totalPrice(),
      image: blank.image,
      quantity: 1,
      studioConfig: {
        blankId: blank.id,
        materialId: this.selectedMaterial().id,
        stoneId: this.selectedStone().id,
        carat: this.carat(),
        engraveText: this.engraveText() || undefined,
      },
    });
  }

  selectBlank(blank: Blank): void {
    this.selectedBlank.set(blank);
    // Reset material nếu chất liệu hiện tại không available cho blank mới
    const variants = this.BLANK_MATERIAL_IMAGES[blank.id];
    if (variants && !variants[this.selectedMaterial().id]) {
      const firstAvailable = this.materials.find(m => !!variants[m.id]);
      if (firstAvailable) this.selectedMaterial.set(firstAvailable);
    }
    // Reset stone về 'none' nếu blank mới không hỗ trợ đá
    if (!this.BLANK_AVAILABLE_STONES[blank.id]) {
      this.selectedStone.set(this.stones.find(s => s.id === 'none')!);
    }
    // Đổi sang phôi/sản phẩm khác thì các tuỳ biến riêng của thiết kế cũ (khắc
    // chữ...) phải reset theo — trước đây engraveText giữ nguyên giá trị cũ nên
    // phí khắc chữ của thiết kế trước bị tính nhầm sang thiết kế mới dù khách
    // chưa hề đi tới bước khắc chữ của thiết kế này.
    this.engraveText.set('');
    this.engraveFont.set('serif-italic');
    this.goToStep(2);
  }

  selectMaterial(material: Material): void {
    this.selectedMaterial.set(material);
  }

  selectStone(stone: Stone): void {
    this.selectedStone.set(stone);
  }

  onCaratChange(event: Event): void {
    this.carat.set(parseFloat((event.target as HTMLInputElement).value));
  }

  onEngraveInput(event: Event): void {
    this.engraveText.set((event.target as HTMLInputElement).value);
  }

  selectFont(font: 'serif-italic' | 'classic-sans'): void {
    this.engraveFont.set(font);
  }

  selectThumb(index: number): void {
    this.selectedThumbIndex.set(index);
  }

  selectPaymentMethod(id: string): void {
    this.selectedPaymentMethod.set(id);
  }

  goToCheckout(): void {
    this.checkoutSubStep.set(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  backFromCheckout(): void {
    this.checkoutSubStep.set(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  readonly formatVnd = formatVnd;

  applyVoucher(): void {
    const code = this.voucherCode().trim();
    if (!code) return;
    this.http.post<any>(`${environment.apiUrl}/vouchers/validate`, {
      code,
      order_total: this.totalPrice(),
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.valid) {
          this.voucherDiscount.set(res.discount);
          this.voucherMsg.set(res.message);
          this.voucherStatus.set('success');
          this.appliedCustomerVoucherId = res.customer_voucher_id ?? null;
        } else {
          this.voucherDiscount.set(0);
          this.voucherMsg.set(res.message);
          this.voucherStatus.set('error');
          this.appliedCustomerVoucherId = null;
        }
      },
      error: () => {
        this.voucherMsg.set('Không thể kiểm tra voucher');
        this.voucherStatus.set('error');
      },
    });
  }

  submitOrder(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }
    if (!this.selectedPaymentMethod()) {
      this.notify.error('Vui lòng chọn phương thức thanh toán.');
      return;
    }
    const form = this.checkoutForm.getRawValue();
    const PROVINCE_MAP = Object.fromEntries(this.PROVINCES.map(p => [p.value, p.label]));
    const provinceLabel = PROVINCE_MAP[form.province] ?? form.province;
    const wardLabel     = this.availableDistricts().find(d => d.value === form.ward)?.label ?? form.ward;

    this.isSubmitting.set(true);
    this.http.post<any>(`${environment.apiUrl}/studio`, {
      // BR-16: giá chốt cuối cùng tính lại ở server từ các lựa chọn thô này,
      // không gửi totalPrice/discountAmount trực tiếp để tránh sửa request gian lận giá.
      customerVoucherId:  this.appliedCustomerVoucherId,
      blankId:            this.selectedBlank()?.id ?? null,
      materialId:         this.selectedMaterial().id,
      stoneId:            this.selectedStone().id,
      carat:              this.carat(),
      engraveTextLength:  this.engraveText().length,
      address: {
        recipient_name:  form.name,
        recipient_phone: form.phone,
        address_line:    form.address,
        province:        provinceLabel,
        ward:            wardLabel,
      },
      // MAIL: ô email (tuỳ chọn) trước đây gõ vào cũng vô ích, không hề gửi lên
      // server — khách chưa có email trong tài khoản thì không nhận được mail xác
      // nhận đơn Studio dù đã điền ở đây.
      email: form.email || undefined,
      note: `Studio - ${this.selectedBlank()?.name ?? ''} - ${this.selectedMaterial().label} - ${this.selectedStone().label}`,
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success) {
          this.placedOrderId.set(res.data.order_id);
          this.clearDraft();
          // Chưa có cổng thanh toán thật — mô phỏng kết quả theo phương thức
          // giống checkout sản phẩm có sẵn: chuyển khoản/ví coi như thành công,
          // thẻ coi như bị từ chối. Đơn vẫn được tạo thật để khách đổi phương
          // thức/thử lại.
          if (this.selectedPaymentMethod() === 'credit-card') {
            this.showFailModal.set(true);
          } else {
            this.showSuccessModal.set(true);
          }
        } else {
          this.showFailModal.set(true);
        }
        this.isSubmitting.set(false);
      },
      error: () => {
        this.showFailModal.set(true);
        this.isSubmitting.set(false);
      },
    });
  }
}
