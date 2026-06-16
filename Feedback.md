REVIEW DỰ ÁN ANGULAR — RENGA

1. QUY TẮC ĐẶT TÊN
✅ Làm tốt:

Component đặt đúng: LoginComponent, HomeComponent, ChatbotComponent
Service đúng: AuthService, ModalService
File kebab-case đúng: login.component.ts, auth.service.ts
Interface rõ ràng: User, ApiResponse, BotCard, ActionBtn
❌ Vấn đề — chatbot.component.ts:27:
FAQ_DB và SPECIAL_RESPONSE là dữ liệu tĩnh nhưng đặt thẳng trong file component, làm file dài ~250 dòng.
Cách sửa: Tạo file src/app/shared/data/chatbot-faq.data.ts, chuyển dữ liệu sang đó và import vào component.

❌ Vấn đề — login.component.ts:
MOCK_PHONES nằm bên trong hàm/cấp local. Nên đặt ở cấp module (đầu file, ngoài class).

----------
2. CHUẨN ANGULAR
❌ Thiếu cấu trúc core/ + features/ — Tất cả hiện đang nằm rời rạc trong app/:


app/
  login/          ← nên là features/auth/login/
  register/       ← nên là features/auth/register/
  services/       ← nên là core/services/
  guards/         ← nên là core/guards/
  interceptors/   ← nên là core/interceptors/
✅ Lazy loading đã được dùng đúng trong app.routes.ts — Tất cả route dùng loadComponent / loadChildren. Đây là điểm rất tốt.

❌ Vấn đề — home.component.ts:39:
Còn console.log debug trong production code. Xóa ngay trước khi demo/deploy.

❌ Vấn đề — register.component.ts, forgot-password.component.ts:
Dùng signal() thủ công cho từng field thay vì ReactiveFormsModule. Với form nhiều field, cách này dễ mắc lỗi hơn.
Cách sửa: Chuyển sang FormGroup + FormControl + Validators.required, Validators.pattern.

-------------------
3. CHẤT LƯỢNG CODE
❌ Vấn đề nghiêm trọng — login.component.ts:
Mock login nằm trong error handler production — nguy hiểm nếu deploy lên server thật:


error: () => {
  if (MOCK_PHONES.includes(this.phone())) {
    this.authService.mockLogin(); // ← NGUY HIỂM nếu lên production
  }
}
Cách sửa:


if (!environment.production && MOCK_PHONES.includes(this.phone())) {
  this.authService.mockLogin();
}
❌ Vấn đề — chatbot.component.html:154:
Dùng $any($event.target).value — đây là cách "né" TypeScript, mất type safety.
Cách sửa:


(input)="setInput(($event.target as HTMLInputElement).value)"
❌ Vấn đề — nhiều modal trong src/app/shared/components/modal/:
Nhiều file dùng ViewEncapsulation.None — CSS sẽ lan ra toàn trang. Nếu hai modal có class trùng tên thì đè lên nhau.
Cách sửa: Đặt tên class thật unique theo BEM (phone-not-found-modal__backdrop, không dùng tên chung như auth-modal__backdrop cho nhiều component).

✅ Làm tốt:

Zero any type — type safety rất tốt
DestroyRef dùng đúng trong forgot-password.component.ts
Signals + computed() dùng nhất quán, không leak subscription

----------------------------------
4. CẤU TRÚC THƯ MỤC
❌ Cấu trúc hiện tại còn phẳng — feature và core lẫn lộn:


app/
  login/
  register/
  home/
  profile/
  services/
  guards/
  interceptors/
  shared/
  models/
✅ Chuẩn nên hướng đến:


app/
  core/
    services/       ← AuthService, ModalService
    guards/         ← auth.guard, admin.guard
    interceptors/   ← auth.interceptor, error.interceptor
  features/
    auth/           ← login, register, forgot-password, reset-password
    home/
    profile/
    products/
    studio/
    design/
  shared/
    components/     ← header, footer, chatbot, modals
    models/
    data/           ← chatbot-faq.data.ts (mới cần tạo)
❌ Vấn đề — src/environments/:
File environment.ts và environment.prod.ts hiện rỗng — không có apiUrl, production flag.
Cách sửa:


// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};

-----------------------------
5. FE SẴN SÀNG ĐỂ BE LÀM TIẾP CHƯA?
❌ API URL hardcode trong mọi service:


// auth.service.ts
this.http.post('/api/auth/login', payload)   // ← hardcode
this.http.post('/api/auth/register', payload) // ← hardcode
Tương tự trong cart.service.ts, orders.service.ts, checkout.service.ts, account.service.ts, admin.service.ts, studio.service.ts.

Cách sửa: Sau khi bổ sung environment.ts:


this.http.post(`${environment.apiUrl}/auth/login`, payload)
❌ Logic phân loại lỗi đang do FE tự làm thay BE:
Hiện tại FE tự quyết định "số điện thoại < 10 ký tự → chưa đăng ký, ≥ 10 → sai mật khẩu" thay vì đọc HTTP status từ BE.
Khi BE xong, cần đổi sang:


if (err.status === 404) this.showPhoneNotFound.set(true);
if (err.status === 401) this.showLoginFail.set(true);
❌ Register error handler luôn show popup "đơn hàng cũ" — đây chỉ là mock, không phản ánh nghiệp vụ thật. Khi BE xong, chỉ show khi BE trả 409 Conflict với code: "EXISTING_ORDERS".

✅ Làm tốt — sẵn sàng để BE kết nối:

auth.interceptor.ts tự động gắn Authorization: Bearer <token> vào mọi request
error.interceptor.ts xử lý 401 (auto logout), 403 (redirect về home), 500 (log lỗi)
Interface đầy đủ: LoginPayload, RegisterPayload, AuthData, ApiResponse<T>, PaginatedResponse<T>
HTTP verb đúng: POST cho login/register, PATCH cho update, DELETE cho xóa
Mock data có comment // TODO: swap to /api/... — rõ ràng vị trí cần đổi
TỔNG KẾT
Điểm tổng: 6.5 / 10
#	Vấn đề	Mức độ
1	console.log còn trong home.component.ts	🔴 Sửa ngay
2	Mock login không bảo vệ bởi environment.production	🔴 Sửa ngay
3	environment.ts rỗng — API URL hardcode khắp nơi	🔴 Sửa trước khi kết nối BE
4	Logic phân loại lỗi do FE tự làm thay BE	🟡 Sửa khi BE xong
5	$any() trong chatbot HTML	🟡 Dễ sửa
6	FAQ_DB nằm trong component	🟢 Refactor sau
7	Thiếu cấu trúc core/ + features/	🟢 Cải thiện dần
3 điểm làm tốt nhất:
✅ Lazy loading toàn bộ — app load nhanh
✅ Zero any type — type safety xuất sắc
✅ Interceptor + interface chuẩn — BE kết nối được ngay sau khi fix environment