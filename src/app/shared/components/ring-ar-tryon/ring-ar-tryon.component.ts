import {
  ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit,
  Output, ViewChild, signal,
} from '@angular/core';
import { loadMediaPipeScripts } from './mediapipe-loader';
import { environment } from '../../../../environments/environment';

declare const Hands: any;
declare const Camera: any;

interface SmoothState { x: number | null; y: number | null; angle: number | null; width: number | null; }

const FINGER_NAMES = ['Cái', 'Trỏ', 'Giữa', 'Áp út', 'Út'];
const FINGER_MCP = [2, 5, 9, 13, 17];
const FINGER_PIP = [3, 6, 10, 14, 18];
const THUMB_AXIAL_RATIO = 0.42;
const SMOOTHING_FACTOR = 0.25;
const SIZE_SMOOTHING_FACTOR = 0.18;
const FINGER_WIDTH_RATIO = [0.34, 0.245, 0.255, 0.24, 0.21];
const LATERAL_RATIO = [0, -0.2, 0, 0, 0];
const THUMB_LATERAL_RATIO = -0.33;

const HINTS = [
  '👍 Xòe rõ ngón cái ra phía camera để nhận diện chính xác hơn',
  '☝️ Tách ngón trỏ xa ngón giữa một chút để nhận diện chính xác hơn',
  '🖕 Tách ngón giữa xa các ngón bên cạnh một chút',
  '💍 Tách ngón áp út xa ngón giữa/út một chút',
  '🤙 Tách ngón út ra một chút để nhận diện rõ hơn',
];

@Component({
  selector: 'app-ring-ar-tryon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ring-ar-tryon.component.html',
  styleUrl: './ring-ar-tryon.component.css',
})
export class RingArTryonComponent implements OnInit, OnDestroy {
  @Input({ required: true }) candidateImageUrls!: string[];
  @Output() closed = new EventEmitter<void>();

  @ViewChild('videoEl') videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasEl') canvasRef!: ElementRef<HTMLCanvasElement>;

  readonly isStarting     = signal(false);
  readonly cameraStarted  = signal(false);
  readonly handDetected   = signal(false);
  readonly cameraError    = signal<string | null>(null);
  readonly ringSize       = signal(55);
  readonly fingerIdx      = signal(3);
  readonly fingerHint     = signal<string | null>(null);
  readonly fingerNames    = FINGER_NAMES;

  private hands: any = null;
  private mpCamera: any = null;
  private mediaStream: MediaStream | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private readonly ringImage = new Image();
  private ringImageLoaded = false;
  // Ảnh nhẫn nền trong suốt thường có viền trong suốt rất rộng quanh nhẫn (ảnh gốc
  // 2000x2000 nhưng nhẫn chỉ chiếm ~25% ở giữa) — nếu vẽ nguyên tấm vào khung nhỏ,
  // viền trong suốt chiếm hết chỗ khiến nhẫn bị thu nhỏ/méo. Tự tính vùng có nội
  // dung thật (bounding box pixel không trong suốt) 1 lần khi ảnh tải xong, rồi chỉ
  // vẽ đúng vùng đó — giữ đúng tỉ lệ khung hình mà không kéo méo.
  private ringCropRect: { sx: number; sy: number; sw: number; sh: number } | null = null;
  private hintTimeout: ReturnType<typeof setTimeout> | null = null;

  private smooth: Record<'Left' | 'Right', SmoothState> = {
    Left:  { x: null, y: null, angle: null, width: null },
    Right: { x: null, y: null, angle: null, width: null },
  };

  private proxiedUrl(url: string): string {
    return `${environment.apiUrl}/products/image-proxy?url=${encodeURIComponent(url)}`;
  }

  ngOnInit(): void {
    this.ringImage.crossOrigin = 'anonymous';
    this.pickBestCandidate();
  }

  // Dữ liệu sản phẩm hay gán nhầm ảnh chụp tay/macro chéo góc làm ảnh "nhẫn cắt
  // nền" — cả 2 loại đều có nền trong suốt nên không phân biệt được qua metadata.
  // Ảnh nhẫn đúng chuẩn để ướm AR luôn có dạng "băng ngang mỏng" (bounding box
  // rộng hơn nhiều so với cao), khác hẳn ảnh macro gần vuông/chéo góc — tải thử
  // từng ứng viên, đo tỉ lệ khung thật, chọn ảnh "ngang" nhất.
  private async pickBestCandidate(): Promise<void> {
    let best: { url: string; rect: { sx: number; sy: number; sw: number; sh: number }; ratio: number } | null = null;

    for (const url of this.candidateImageUrls) {
      const rect = await this.probeImage(this.proxiedUrl(url));
      if (!rect) continue;
      const ratio = rect.sw / rect.sh;
      if (!best || ratio > best.ratio) best = { url, rect, ratio };
    }

    const finalUrl = best ? this.proxiedUrl(best.url) : this.proxiedUrl(this.candidateImageUrls[0]);
    this.ringCropRect = best?.rect ?? null;

    this.ringImage.onload = () => {
      if (!this.ringCropRect) this.ringCropRect = this.computeOpaqueBoundingBox(this.ringImage);
      this.ringImageLoaded = true;
    };
    this.ringImage.onerror = () => console.error('[ring-ar-tryon] Không tải được ảnh nhẫn');
    this.ringImage.src = finalUrl;
  }

  private probeImage(src: string): Promise<{ sx: number; sy: number; sw: number; sh: number } | null> {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(this.computeOpaqueBoundingBox(img));
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  ngOnDestroy(): void {
    this.stopCamera();
    if (this.hintTimeout) clearTimeout(this.hintTimeout);
  }

  async startCamera(): Promise<void> {
    this.cameraError.set(null);
    this.isStarting.set(true);
    try {
      await loadMediaPipeScripts();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      this.mediaStream = stream;

      const video = this.videoRef.nativeElement;
      video.srcObject = stream;
      await new Promise<void>((resolve) => { video.onloadedmetadata = () => resolve(); });
      await video.play();

      const canvas = this.canvasRef.nativeElement;
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      this.ctx = canvas.getContext('2d');

      this.hands = new Hands({
        locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });
      this.hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.55,
        minTrackingConfidence: 0.45,
      });
      this.hands.onResults((results: any) => this.onResults(results));

      this.mpCamera = new Camera(video, {
        onFrame: async () => { if (this.hands) await this.hands.send({ image: video }); },
        width: canvas.width,
        height: canvas.height,
      });
      await this.mpCamera.start();

      this.cameraStarted.set(true);
    } catch (err) {
      console.error('[ring-ar-tryon] Lỗi khởi động camera:', err);
      this.cameraError.set('Không thể mở camera. Vui lòng cho phép quyền truy cập camera và thử lại.');
      this.stopCamera();
    } finally {
      this.isStarting.set(false);
    }
  }

  stopCamera(): void {
    this.mpCamera?.stop?.();
    this.mediaStream?.getTracks().forEach((t) => t.stop());
    this.hands?.close?.();
    this.mediaStream = null;
    this.mpCamera = null;
    this.hands = null;
    this.cameraStarted.set(false);
    this.handDetected.set(false);
  }

  close(): void {
    this.stopCamera();
    this.closed.emit();
  }

  selectFinger(idx: number): void {
    this.fingerIdx.set(idx);
    this.smooth = {
      Left:  { x: null, y: null, angle: null, width: null },
      Right: { x: null, y: null, angle: null, width: null },
    };
    if (this.handDetected()) {
      this.fingerHint.set(HINTS[idx]);
      if (this.hintTimeout) clearTimeout(this.hintTimeout);
      this.hintTimeout = setTimeout(() => this.fingerHint.set(null), 3000);
    }
  }

  adjustSize(delta: number): void {
    this.ringSize.update((v) => Math.min(100, Math.max(30, v + delta)));
  }

  capturePhoto(): void {
    const video = this.videoRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;
    const capture = document.createElement('canvas');
    capture.width = canvas.width;
    capture.height = canvas.height;
    const capCtx = capture.getContext('2d')!;

    capCtx.save();
    capCtx.scale(-1, 1);
    capCtx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
    capCtx.restore();
    capCtx.save();
    capCtx.scale(-1, 1);
    capCtx.drawImage(canvas, -canvas.width, 0, canvas.width, canvas.height);
    capCtx.restore();

    capture.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `renga-uom-thu-nhan-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  }

  private computeOpaqueBoundingBox(img: HTMLImageElement): { sx: number; sy: number; sw: number; sh: number } | null {
    const w = img.naturalWidth, h = img.naturalHeight;
    if (!w || !h) return null;
    const tmp = document.createElement('canvas');
    tmp.width = w; tmp.height = h;
    const tctx = tmp.getContext('2d');
    if (!tctx) return null;
    tctx.drawImage(img, 0, 0);

    let data: Uint8ClampedArray;
    try {
      data = tctx.getImageData(0, 0, w, h).data;
    } catch {
      return null; // canvas bị "tainted" (không có CORS) — dùng nguyên ảnh gốc
    }

    let minX = w, minY = h, maxX = -1, maxY = -1;
    for (let y = 0; y < h; y += 2) {       // bước nhảy 2px cho nhanh, độ chính xác đủ dùng
      for (let x = 0; x < w; x += 2) {
        if (data[(y * w + x) * 4 + 3] > 10) { // alpha > ngưỡng nhiễu nhỏ
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    if (maxX < minX || maxY < minY) return null;

    // Thêm đệm nhỏ quanh vùng nội dung để không cắt sát viền nhẫn quá đà
    const padX = (maxX - minX) * 0.06, padY = (maxY - minY) * 0.06;
    const sx = Math.max(0, minX - padX);
    const sy = Math.max(0, minY - padY);
    const sw = Math.min(w, maxX - minX + padX * 2);
    const sh = Math.min(h, maxY - minY + padY * 2);
    return { sx, sy, sw, sh };
  }

  private onResults(results: any): void {
    if (!this.ctx) return;
    const canvas = this.canvasRef.nativeElement;
    const video = this.videoRef.nativeElement;
    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    const detected = !!results.multiHandLandmarks?.length;
    this.handDetected.set(detected);

    if (detected) {
      results.multiHandLandmarks.forEach((landmarks: any[], i: number) => {
        // selfieMode=false: model nhìn ảnh gốc chưa mirror → đảo nhãn để khớp
        // với thứ người dùng nhìn thấy trên preview đã mirror bằng CSS.
        const rawHandedness = results.multiHandedness[i].label;
        const handedness: 'Left' | 'Right' = rawHandedness === 'Left' ? 'Right' : 'Left';
        this.drawRingOnFinger(landmarks, canvas.width, canvas.height, handedness);
      });
    } else {
      this.smooth = {
        Left:  { x: null, y: null, angle: null, width: null },
        Right: { x: null, y: null, angle: null, width: null },
      };
    }
  }

  private drawRingOnFinger(lm: any[], W: number, H: number, handedness: 'Left' | 'Right'): void {
    const ctx = this.ctx!;
    const fi = this.fingerIdx();
    const mcpIdx = FINGER_MCP[fi];
    const pipIdx = FINGER_PIP[fi];
    const mcp = lm[mcpIdx];
    const pip = lm[pipIdx];

    const t = fi === 0 ? 0.42 : 0.55;
    let rawX = (mcp.x + t * (pip.x - mcp.x)) * W;
    let rawY = (mcp.y + t * (pip.y - mcp.y)) * H;

    if (fi === 0) {
      const axDx = (pip.x - mcp.x) * W;
      const axDy = (pip.y - mcp.y) * H;
      const axLen = Math.hypot(axDx, axDy) || 1;
      rawX += (axDx / axLen) * axLen * THUMB_AXIAL_RATIO;
      rawY += (axDy / axLen) * axLen * THUMB_AXIAL_RATIO;
    }

    const tipIdx = pipIdx + 1;
    const tip2 = lm[tipIdx];
    const dx1 = pip.x - mcp.x, dy1 = pip.y - mcp.y;
    const dx2 = tip2.x - pip.x, dy2 = tip2.y - pip.y;
    const dx = dx1 + dx2, dy = dy1 + dy2;
    const rawAngle = Math.atan2(dy, dx) - Math.PI / 2;

    const wrist = lm[0];
    const midMcp = lm[9];
    const handScale = Math.hypot((midMcp.x - wrist.x) * W, (midMcp.y - wrist.y) * H);
    let rawFingerWidth = handScale * FINGER_WIDTH_RATIO[fi];

    const sm = this.smooth[handedness];
    const maxStep = handScale * 0.45;
    if (sm.x !== null) {
      const jumpDist = Math.hypot(rawX - sm.x, rawY - (sm.y as number));
      if (jumpDist > maxStep) {
        const ratio = maxStep / jumpDist;
        rawX = sm.x + (rawX - sm.x) * ratio;
        rawY = (sm.y as number) + (rawY - (sm.y as number)) * ratio;
      }
      const widthJump = Math.abs(rawFingerWidth - (sm.width as number));
      const maxWidthStep = (sm.width as number) * 0.35;
      if (widthJump > maxWidthStep) {
        rawFingerWidth = (sm.width as number) + Math.sign(rawFingerWidth - (sm.width as number)) * maxWidthStep;
      }
    }

    if (sm.x === null) {
      sm.x = rawX; sm.y = rawY; sm.angle = rawAngle; sm.width = rawFingerWidth;
    } else {
      sm.x     = sm.x! * (1 - SMOOTHING_FACTOR) + rawX * SMOOTHING_FACTOR;
      sm.y     = sm.y! * (1 - SMOOTHING_FACTOR) + rawY * SMOOTHING_FACTOR;
      sm.angle = sm.angle! * (1 - SMOOTHING_FACTOR) + rawAngle * SMOOTHING_FACTOR;
      sm.width = sm.width! * (1 - SIZE_SMOOTHING_FACTOR) + rawFingerWidth * SIZE_SMOOTHING_FACTOR;
    }

    let rx = sm.x!;
    let ry = sm.y!;
    const angle = sm.angle!;
    const fingerWidth = sm.width!;

    const sizeMultiplier = 0.7 + ((this.ringSize() - 30) / 70) * 0.8;
    const ringW = Math.max(fingerWidth * 2.2 * sizeMultiplier, 45);
    const ringH = ringW * 0.6;

    const pinkyMcp = lm[17];
    const haxX = (pinkyMcp.x - wrist.x) * W;
    const haxY = (pinkyMcp.y - wrist.y) * H;
    const haxLen = Math.hypot(haxX, haxY) || 1;
    const perpX = -haxY / haxLen;
    const perpY =  haxX / haxLen;

    const inwardOffset = Math.min(5, fingerWidth * 0.10);
    rx += perpX * inwardOffset;
    ry += perpY * inwardOffset;

    const lateralOffset = handScale * LATERAL_RATIO[fi];
    rx += (haxX / haxLen) * lateralOffset;
    ry += (haxY / haxLen) * lateralOffset;

    if (fi === 0) {
      rx += (haxX / haxLen) * handScale * THUMB_LATERAL_RATIO;
      ry += (haxY / haxLen) * handScale * THUMB_LATERAL_RATIO;
    }

    ctx.save();
    ctx.translate(rx, ry);
    ctx.rotate(angle);
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 8;

    if (this.ringImageLoaded) {
      ctx.drawImage(this.ringImage, -ringW / 2, -ringH / 2, ringW, ringH);
    } else {
      ctx.font = `${ringW * 0.85}px "Segoe UI Emoji"`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('💍', 0, 0);
    }

    ctx.restore();
  }
}
