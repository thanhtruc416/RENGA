import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { AbstractControl, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PaymentFailModalComponent } from '../shared/components/modal/payment-fail-modal/payment-fail-modal.component';
import { PaymentSuccessModalComponent } from '../shared/components/modal/payment-success-modal/payment-success-modal.component';
import { CartService } from '../core/services/cart.service';
import { AuthService } from '../core/services/auth.service';
import { environment } from '../../environments/environment';

interface OrderItem {
  readonly id: string;
  readonly name: string;
  readonly spec: string;
  readonly qty: number;
  readonly price: number;
  readonly image: string;
  readonly variantId?: string;
}

type PaymentMethod = 'cod' | 'bank' | 'ewallet' | 'card';

interface CheckoutForm {
  fullName: FormControl<string>;
  phone: FormControl<string>;
  email: FormControl<string>;
  province: FormControl<string>;
  district: FormControl<string>;
  address: FormControl<string>;
}

function noWhitespace(control: AbstractControl) {
  return control.value && !control.value.trim() ? { whitespace: true } : null;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe, ReactiveFormsModule, RouterLink, PaymentSuccessModalComponent, PaymentFailModalComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  private readonly destroyRef  = inject(DestroyRef);
  private readonly cartService = inject(CartService);
  private readonly auth        = inject(AuthService);
  private readonly http        = inject(HttpClient);
  private readonly router      = inject(Router);

  readonly showSuccessModal      = signal(false);
  readonly showFailModal         = signal(false);
  readonly showSuccessGuestModal = signal(false);
  readonly placedOrderId         = signal('');

  readonly orderItems = computed<OrderItem[]>(() =>
    this.cartService.items()
      .filter(i => i.type === 'available')
      .map(i => ({ id: i.id, name: i.name, spec: i.spec, qty: i.quantity ?? 1, price: i.price, image: i.image, variantId: i.variantId }))
  );

  readonly orderCount = computed(() => this.orderItems().length);

  readonly subtotal = computed(() =>
    this.orderItems().reduce((sum, item) => sum + item.price * item.qty, 0)
  );

  readonly voucherCode     = signal('');
  readonly voucherDiscount = signal(0);
  readonly voucherStatus   = signal<'idle' | 'success' | 'error'>('idle');
  readonly voucherMsg      = signal('');
  private readonly _appliedCustomerVoucherId = signal<string | null>(null);

  readonly total = computed(() => Math.max(this.subtotal() - this.voucherDiscount(), 0));

  applyVoucher(): void {
    const code = this.voucherCode().trim().toUpperCase();
    if (!code) { this.voucherStatus.set('error'); this.voucherMsg.set('Vui lòng nhập mã voucher.'); return; }
    this.http.post<any>(`${environment.apiUrl}/vouchers/validate`, { code, order_total: this.subtotal() }).subscribe({
      next: (res) => {
        if (res.valid) {
          this.voucherDiscount.set(res.discount);
          this._appliedCustomerVoucherId.set(res.customer_voucher_id ?? null);
          this.voucherStatus.set('success');
          this.voucherMsg.set(res.message);
        } else {
          this.voucherDiscount.set(0);
          this._appliedCustomerVoucherId.set(null);
          this.voucherStatus.set('error');
          this.voucherMsg.set(res.message);
        }
      },
      error: () => {
        this.voucherDiscount.set(0);
        this.voucherStatus.set('error');
        this.voucherMsg.set('Không thể kiểm tra voucher. Vui lòng thử lại.');
      },
    });
  }

  onVoucherInput(event: Event): void {
    this.voucherCode.set((event.target as HTMLInputElement).value);
    this.voucherStatus.set('idle');
    this.voucherMsg.set('');
  }

  readonly selectedPayment = signal<PaymentMethod>('cod');
  selectPayment(method: PaymentMethod): void { this.selectedPayment.set(method); }

  readonly remainingSeconds = signal(60 * 60 - 4);
  readonly countdownDisplay = computed(() => {
    const t = this.remainingSeconds();
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(Math.floor(t / 3600))}:${pad(Math.floor((t % 3600) / 60))}:${pad(t % 60)}`;
  });

  private readonly _countdownRef = (() => {
    const id = setInterval(() => {
      this.remainingSeconds.update(s => { if (s <= 0) { clearInterval(id); return 0; } return s - 1; });
    }, 1000);
    this.destroyRef.onDestroy(() => clearInterval(id));
  })();

  // Danh sách 34 tỉnh thành sau sáp nhập 2025 (hiệu lực từ 1/7/2025)
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

  // Sau sáp nhập 2025: HCM và Đà Nẵng bỏ cấp quận/huyện → dùng phường/xã
  // Hà Nội vẫn giữ cấp quận/huyện
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
      { value: 'le-chan',      label: 'Quận Lê Chân' },
      { value: 'hai-an',      label: 'Quận Hải An' },
      { value: 'kien-an',     label: 'Quận Kiến An' },
      { value: 'hai-duong',   label: 'TP. Hải Dương' },
      { value: 'kinh-mon',    label: 'TX. Kinh Môn' },
      { value: 'chi-linh',    label: 'TP. Chí Linh' },
    ],
    hue: [
      { value: 'phu-hoi',     label: 'Phường Phú Hội' },
      { value: 'phu-xuan',    label: 'Phường Phú Xuân' },
      { value: 'thuan-hoa',   label: 'Phường Thuận Hòa' },
      { value: 'an-cuu',      label: 'Phường An Cựu' },
      { value: 'kim-long',    label: 'Phường Kim Long' },
      { value: 'huong-thuy',  label: 'TX. Hương Thủy' },
      { value: 'huong-tra',   label: 'TX. Hương Trà' },
    ],
    cantho: [
      { value: 'ninh-kieu',   label: 'Quận Ninh Kiều' },
      { value: 'binh-thuy',   label: 'Quận Bình Thủy' },
      { value: 'cai-rang',    label: 'Quận Cái Răng' },
      { value: 'o-mon',       label: 'Quận Ô Môn' },
      { value: 'thot-not',    label: 'Quận Thốt Nốt' },
      { value: 'vi-thanh',    label: 'TP. Vị Thanh' },
      { value: 'nga-bay',     label: 'TX. Ngã Bảy' },
      { value: 'soc-trang',   label: 'TP. Sóc Trăng' },
    ],
    quangninh: [
      { value: 'ha-long',     label: 'TP. Hạ Long' },
      { value: 'cam-pha',     label: 'TP. Cẩm Phả' },
      { value: 'uong-bi',     label: 'TP. Uông Bí' },
      { value: 'mong-cai',    label: 'TP. Móng Cái' },
      { value: 'dong-trieu',  label: 'TX. Đông Triều' },
      { value: 'quang-yen',   label: 'TX. Quảng Yên' },
    ],
    bacninh: [
      { value: 'bac-ninh-tp', label: 'TP. Bắc Ninh' },
      { value: 'tu-son',      label: 'TX. Từ Sơn' },
      { value: 'bac-giang-tp',label: 'TP. Bắc Giang' },
      { value: 'viet-yen',    label: 'TX. Việt Yên' },
      { value: 'yen-phong',   label: 'Huyện Yên Phong' },
      { value: 'lang-giang',  label: 'Huyện Lạng Giang' },
    ],
    thainguyen: [
      { value: 'tn-tp',       label: 'TP. Thái Nguyên' },
      { value: 'song-cong',   label: 'TP. Sông Công' },
      { value: 'pho-yen',     label: 'TX. Phổ Yên' },
      { value: 'bac-kan',     label: 'TP. Bắc Kạn' },
      { value: 'cho-moi',     label: 'TX. Chợ Mới' },
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
      { value: 'lao-cai-tp',  label: 'TP. Lào Cai' },
      { value: 'sa-pa',       label: 'TX. Sa Pa' },
      { value: 'yen-bai-tp',  label: 'TP. Yên Bái' },
      { value: 'nghia-lo',    label: 'TX. Nghĩa Lộ' },
      { value: 'van-yen',     label: 'Huyện Văn Yên' },
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
      { value: 'vinh',         label: 'TP. Vinh' },
      { value: 'cua-lo',       label: 'TX. Cửa Lò' },
      { value: 'thai-hoa',     label: 'TX. Thái Hòa' },
      { value: 'hoang-mai',    label: 'TX. Hoàng Mai' },
    ],
    hatinh: [
      { value: 'ha-tinh-tp',   label: 'TP. Hà Tĩnh' },
      { value: 'hong-linh',    label: 'TX. Hồng Lĩnh' },
      { value: 'ky-anh',       label: 'TX. Kỳ Anh' },
      { value: 'vung-ang',     label: 'TX. Vũng Áng' },
    ],
    quangtri: [
      { value: 'dong-ha',      label: 'TP. Đông Hà' },
      { value: 'quang-tri-tx', label: 'TX. Quảng Trị' },
      { value: 'dong-hoi',     label: 'TP. Đồng Hới' },
      { value: 'ba-don',       label: 'TX. Ba Đồn' },
      { value: 'le-thuy',      label: 'Huyện Lệ Thủy' },
    ],
    quangngai: [
      { value: 'quang-ngai-tp',label: 'TP. Quảng Ngãi' },
      { value: 'duc-pho',      label: 'TX. Đức Phổ' },
      { value: 'kon-tum-tp',   label: 'TP. Kon Tum' },
      { value: 'dak-to',       label: 'TX. Đắk Tô' },
      { value: 'ngoc-hoi',     label: 'Huyện Ngọc Hồi' },
    ],
    gialai: [
      { value: 'pleiku',       label: 'TP. Pleiku' },
      { value: 'an-khe',       label: 'TX. An Khê' },
      { value: 'ayun-pa',      label: 'TX. Ayun Pa' },
      { value: 'quy-nhon',     label: 'TP. Quy Nhơn' },
      { value: 'hoai-nhon',    label: 'TX. Hoài Nhơn' },
      { value: 'an-nhon',      label: 'TX. An Nhơn' },
    ],
    khanhhoa: [
      { value: 'nha-trang',    label: 'TP. Nha Trang' },
      { value: 'cam-ranh',     label: 'TP. Cam Ranh' },
      { value: 'ninh-hoa',     label: 'TX. Ninh Hòa' },
      { value: 'phan-rang',    label: 'TP. Phan Rang - Tháp Chàm' },
      { value: 'ninh-hai',     label: 'TX. Ninh Hải' },
    ],
    lamdong: [
      { value: 'da-lat',       label: 'TP. Đà Lạt' },
      { value: 'bao-loc',      label: 'TX. Bảo Lộc' },
      { value: 'phan-thiet',   label: 'TP. Phan Thiết' },
      { value: 'la-gi',        label: 'TX. La Gi' },
      { value: 'duc-linh',     label: 'Huyện Đức Linh' },
    ],
    daklak: [
      { value: 'buon-ma-thuot',label: 'TP. Buôn Ma Thuột' },
      { value: 'buon-ho',      label: 'TX. Buôn Hồ' },
      { value: 'gia-nghia',    label: 'TP. Gia Nghĩa' },
      { value: 'dak-mil',      label: 'TX. Đắk Mil' },
    ],
    dongnai: [
      { value: 'bien-hoa',     label: 'TP. Biên Hòa' },
      { value: 'long-khanh',   label: 'TP. Long Khánh' },
      { value: 'nhon-trach',   label: 'TX. Nhơn Trạch' },
      { value: 'dong-xoai',    label: 'TP. Đồng Xoài' },
      { value: 'chon-thanh',   label: 'TX. Chơn Thành' },
    ],
    tayninh: [
      { value: 'tay-ninh-tp',  label: 'TP. Tây Ninh' },
      { value: 'trang-bang',   label: 'TX. Trảng Bàng' },
      { value: 'hoa-thanh',    label: 'TX. Hòa Thành' },
      { value: 'tan-an',       label: 'TP. Tân An' },
      { value: 'kien-tuong',   label: 'TX. Kiến Tường' },
    ],
    angiang: [
      { value: 'long-xuyen',   label: 'TP. Long Xuyên' },
      { value: 'chau-doc',     label: 'TP. Châu Đốc' },
      { value: 'tan-chau',     label: 'TX. Tân Châu' },
      { value: 'rach-gia',     label: 'TP. Rạch Giá' },
      { value: 'ha-tien',      label: 'TX. Hà Tiên' },
      { value: 'kien-luong',   label: 'TX. Kiên Lương' },
    ],
    dongthap: [
      { value: 'cao-lanh',     label: 'TP. Cao Lãnh' },
      { value: 'sa-dec',       label: 'TP. Sa Đéc' },
      { value: 'hong-ngu',     label: 'TX. Hồng Ngự' },
      { value: 'my-tho',       label: 'TP. Mỹ Tho' },
      { value: 'cai-lay',      label: 'TX. Cai Lậy' },
    ],
    vinhlong: [
      { value: 'vinh-long-tp', label: 'TP. Vĩnh Long' },
      { value: 'binh-minh',    label: 'TX. Bình Minh' },
      { value: 'ben-tre-tp',   label: 'TP. Bến Tre' },
      { value: 'tra-vinh-tp',  label: 'TP. Trà Vinh' },
      { value: 'duyen-hai',    label: 'TX. Duyên Hải' },
    ],
    camau: [
      { value: 'ca-mau-tp',    label: 'TP. Cà Mau' },
      { value: 'nam-can',      label: 'TX. Năm Căn' },
      { value: 'bac-lieu-tp',  label: 'TP. Bạc Liêu' },
      { value: 'gia-rai',      label: 'TX. Giá Rai' },
    ],
    caobang: [
      { value: 'cao-bang-tp',  label: 'TP. Cao Bằng' },
      { value: 'bao-lac',      label: 'Huyện Bảo Lạc' },
      { value: 'ha-quang',     label: 'Huyện Hà Quảng' },
    ],
    dienbien: [
      { value: 'dien-bien-phu',label: 'TP. Điện Biên Phủ' },
      { value: 'muong-lay',    label: 'TX. Mường Lay' },
      { value: 'dien-bien',    label: 'Huyện Điện Biên' },
    ],
    laichau: [
      { value: 'lai-chau-tp',  label: 'TP. Lai Châu' },
      { value: 'phong-tho',    label: 'TX. Phong Thổ' },
      { value: 'sin-ho',       label: 'Huyện Sìn Hồ' },
      { value: 'tam-duong',    label: 'Huyện Tam Đường' },
    ],
    langson: [
      { value: 'lang-son-tp',  label: 'TP. Lạng Sơn' },
      { value: 'loc-binh',     label: 'Huyện Lộc Bình' },
      { value: 'chi-lang',     label: 'Huyện Chi Lăng' },
      { value: 'huu-lung',     label: 'Huyện Hữu Lũng' },
    ],
    sonla: [
      { value: 'son-la-tp',    label: 'TP. Sơn La' },
      { value: 'moc-chau',     label: 'TX. Mộc Châu' },
      { value: 'mai-son',      label: 'TX. Mai Sơn' },
      { value: 'yen-chau',     label: 'Huyện Yên Châu' },
    ],
  };

  readonly selectedProvince   = signal('');
  readonly availableDistricts = computed(() => this.DISTRICTS[this.selectedProvince()] ?? []);
  readonly districtLabel       = computed(() => this.selectedProvince() === 'hn' ? 'QUẬN/HUYỆN' : 'KHU VỰC');
  readonly districtPlaceholder = computed(() => this.selectedProvince() === 'hn' ? 'Chọn Quận/Huyện' : 'Chọn Khu vực');

  onProvinceChange(): void {
    this.selectedProvince.set(this.shippingForm.get('province')!.value);
    this.shippingForm.get('district')!.setValue('');
  }

  private _user() { return this.auth.currentUser(); }

  readonly shippingForm = new FormGroup<CheckoutForm>({
    fullName: new FormControl(this._user()?.fullName ?? '', { nonNullable: true, validators: [Validators.required] }),
    phone:    new FormControl(this._user()?.phone    ?? '', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^0\d{9}$/)]}),
    email:    new FormControl(this._user()?.email    ?? '', { nonNullable: true, validators: [Validators.email, noWhitespace] }),
    province: new FormControl('',                           { nonNullable: true, validators: [Validators.required] }),
    district: new FormControl('',                           { nonNullable: true, validators: [Validators.required] }),
    address:  new FormControl('',                           { nonNullable: true, validators: [Validators.required] }),
  });

  readonly isSubmitting = signal(false);

  onSubmit(): void {
    if (this.orderItems().length === 0) { this.router.navigate(['/cart']); return; }
    if (this.shippingForm.invalid) {
      this.shippingForm.markAllAsTouched();
      document.querySelector('.checkout-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    this.isSubmitting.set(true);

    if (!this.auth.isLoggedIn()) {
      const allIds = new Set(this.orderItems().map(i => i.id));
      setTimeout(() => {
        this.isSubmitting.set(false);
        this.cartService.removeItems(allIds);
        this.showSuccessGuestModal.set(true);
      }, 800);
      return;
    }

    const form = this.shippingForm.getRawValue();
    const PROVINCE_LABELS = Object.fromEntries(this.PROVINCES.map(p => [p.value, p.label]));
    const provinceLabel = PROVINCE_LABELS[form.province] ?? form.province;
    const districtLabel = this.availableDistricts().find(d => d.value === form.district)?.label ?? form.district;

    const itemsWithVariant = this.orderItems().filter(i => i.variantId);
    if (!itemsWithVariant.length) {
      this.isSubmitting.set(false);
      this.voucherStatus.set('error');
      this.voucherMsg.set('Không có sản phẩm hợp lệ để đặt hàng. Vui lòng thêm sản phẩm từ trang chi tiết.');
      return;
    }

    this.http.post<any>(`${environment.apiUrl}/orders`, {
      items: itemsWithVariant.map(i => ({ variant_id: i.variantId, quantity: i.qty, unit_price: i.price })),
      address: {
        recipient_name: form.fullName,
        recipient_phone: form.phone,
        address_line: `${form.address}, ${districtLabel}`,
        province: provinceLabel,
      },
      discount_amount: this.voucherDiscount(),
      customer_voucher_id: this._appliedCustomerVoucherId(),
      note: null,
    }).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        this.placedOrderId.set(res.data?.order_id ?? '');
        this.cartService.removeItems(new Set(itemsWithVariant.map(i => i.id)));
        this.showSuccessModal.set(true);
      },
      error: () => {
        this.isSubmitting.set(false);
        this.showFailModal.set(true);
      },
    });
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }
}
