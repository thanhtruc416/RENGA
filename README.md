# RENGA — Nền tảng thương mại trang sức cao cấp

> Đồ án nhóm — website thương mại điện tử trang sức với thiết kế tuỳ biến (The Studio), đặt lịch tư vấn nghệ nhân (The Designer), thử trang sức bằng AR, và một hệ thống quản trị (Admin) đầy đủ.

**Stack:** Angular 21+ (Standalone + Signals) · Express 5 + TypeScript · MySQL · JWT Auth

---

## Mục lục

1. [Giới thiệu](#1-giới-thiệu)
2. [Tính năng](#2-tính-năng)
3. [Tech Stack](#3-tech-stack)
4. [Bắt đầu nhanh](#4-bắt-đầu-nhanh)
5. [Cấu trúc thư mục](#5-cấu-trúc-thư-mục)
6. [Routing (Frontend)](#6-routing-frontend)
7. [Tổng quan Backend & API](#7-tổng-quan-backend--api)
8. [CSS Token System](#8-css-token-system)
9. [Shared Components](#9-shared-components)
10. [Core — Services, Guards, Interceptors](#10-core--services-guards-interceptors)
11. [Models — TypeScript Interfaces](#11-models--typescript-interfaces)
12. [Admin Module](#12-admin-module)
13. [Quy tắc code & Convention](#13-quy-tắc-code--convention)
14. [Quy trình Git & Merge](#14-quy-trình-git--merge)
15. [Các lỗi thường gặp sau merge](#15-các-lỗi-thường-gặp-sau-merge)

---

## 1. Giới thiệu

RENGA là nền tảng thương mại điện tử trang sức cao cấp, xoay quanh 3 luồng chính:

| Luồng | Mô tả |
|-------|-------|
| **Khách hàng (Customer)** | Duyệt/tìm sản phẩm, thiết kế nhẫn tuỳ chỉnh (The Studio), đặt lịch tư vấn với nghệ nhân (The Designer), thử trang sức qua camera (AR), giỏ hàng & thanh toán, theo dõi đơn hàng, tích điểm thành viên |
| **Khách vãng lai (Guest)** | Xem sản phẩm, đặt mua sản phẩm có sẵn không cần tài khoản |
| **Quản trị viên (Admin)** | Quản lý sản phẩm, đơn hàng, lịch hẹn, bảo hành, voucher, hỏi-đáp sản phẩm — có dashboard số liệu thời gian thực |

Dự án gồm 2 phần triển khai riêng biệt trong cùng repo:

- **Frontend** — Angular 21+ SPA (`src/`), gọi API qua `HttpClient`
- **Backend** — Express 5 + TypeScript (`server/`, entry point `server.ts`), kết nối MySQL qua `mysql2/promise`

---

## 2. Tính năng

### Khách hàng

- Duyệt sản phẩm theo danh mục, lọc chất liệu/khoảng giá/loại đá, tìm kiếm gợi ý theo thời gian thực
- **The Studio** — thiết kế nhẫn/dây chuyền/vòng tay 5 bước (phôi → chất liệu → đá → khắc chữ → xem giá), giá tính lại tức thời khi đổi lựa chọn
- **The Designer** — đặt lịch tư vấn với nghệ nhân thật: chọn nghệ nhân, chọn khung giờ trống, thanh toán phí tư vấn; hệ thống tự chặn trùng lịch và đảm bảo khoảng cách tối thiểu 1 tiếng giữa 2 lịch hẹn của cùng một nghệ nhân
- **Thử trang sức AR** — thử nhẫn trực tiếp qua camera (MediaPipe Hands nhận diện bàn tay theo thời gian thực, overlay nhẫn theo đúng ngón đã chọn)
- Giỏ hàng & thanh toán (COD, chuyển khoản, ví điện tử, thẻ), áp voucher
- Theo dõi đơn hàng, huỷ đơn, yêu cầu bảo hành/trả hàng
- Đánh giá sản phẩm (1–5 sao), hỏi-đáp công khai dưới mỗi sản phẩm
- Tích điểm thưởng & thăng hạng thành viên (Bạc / Vàng / Bạch kim / Kim cương)
- Đăng ký/đăng nhập qua OTP, quên mật khẩu, khoá tài khoản sau 5 lần đăng nhập sai (mở khoá bằng OTP)
- Trợ lý ảo Chatbot (LLM thật, trả lời câu hỏi về đá quý, size nhẫn, bảo quản trang sức)
- **1 link đăng nhập duy nhất** (`/dang-nhap`) — nhận số điện thoại (khách hàng) hoặc email (nhân viên/admin), tự điều hướng đúng vai trò

### Quản trị viên (`/admin`)

- Dashboard: tổng doanh thu, đơn theo trạng thái, top sản phẩm bán chạy
- Quản lý sản phẩm (CRUD), quản lý đơn hàng (cập nhật trạng thái theo quy trình)
- Quản lý lịch hẹn tư vấn (xác nhận/huỷ/hoàn tất, đổi nghệ nhân hoặc khung giờ)
- Quản lý yêu cầu bảo hành (chấp nhận/từ chối kèm lý do, theo dõi tiến độ sửa chữa)
- Quản lý voucher (tạo/sửa, tự tính hết hạn theo ngày)
- Kiểm duyệt hỏi-đáp sản phẩm (trả lời, ẩn/hiện câu hỏi)

---

## 3. Tech Stack

| Thành phần | Công nghệ |
|---|---|
| Frontend framework | Angular 21+ (Standalone API, Signals) |
| Ngôn ngữ | TypeScript |
| HTTP | Angular HttpClient + Interceptors |
| Style | CSS thuần + CSS Custom Properties |
| Backend | Node.js + Express 5 + TypeScript (chạy qua `tsx`) |
| Database | MySQL (`mysql2/promise`, connection pool + transaction) |
| Xác thực | JWT (access + refresh token), `bcrypt` |
| Email | Nodemailer (OTP, xác nhận đơn hàng/lịch hẹn) |
| AI Chatbot | Groq (tương thích chuẩn OpenAI SDK), model `llama-3.3-70b-versatile` |
| AR thử trang sức | MediaPipe Hands (nhận diện bàn tay qua camera trình duyệt) |
| Locale | `vi` (Vietnamese) |
| Test | Vitest (unit), Playwright (kiểm thử thủ công trong quá trình phát triển) |
| Package Manager | npm |

---

## 4. Bắt đầu nhanh

### Yêu cầu hệ thống

- Node.js ≥ 20
- MySQL ≥ 8.0
- npm

### 4.1. Cài đặt

```bash
git clone https://github.com/thanhtruc416/RENGA.git
cd RENGA
npm install
```

### 4.2. Thiết lập cơ sở dữ liệu

Tạo database rồi import schema có sẵn:

```bash
mysql -u root -p -e "CREATE DATABASE renga"
mysql -u root -p renga < renga_schema.sql
```

> `renga_schema.sql` đã có sẵn `CREATE DATABASE IF NOT EXISTS renga; USE renga;` ở đầu file, nên cũng có thể import thẳng mà không cần tạo database thủ công trước.

### 4.3. Thiết lập biến môi trường

Sao chép file mẫu rồi điền giá trị thật:

```bash
cp .env.example .env
```

| Biến | Mô tả |
|---|---|
| `PORT` | Cổng chạy backend (mặc định `3000`) |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | Thông tin kết nối MySQL |
| `JWT_SECRET`, `JWT_EXPIRES_IN` | Khoá ký JWT và thời hạn access token |
| `API_KEY`, `BASE_URL`, `MODEL_NAME` | Cấu hình chatbot AI (mặc định dùng Groq — có thể đổi sang bất kỳ endpoint tương thích OpenAI nào) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Tài khoản SMTP để gửi email OTP/xác nhận đơn hàng (không có trong `.env.example`, cần thêm thủ công nếu muốn tính năng email hoạt động) |

### 4.4. Chạy dự án

Backend và frontend chạy độc lập, cần 2 terminal:

```bash
# Terminal 1 — Backend API (http://localhost:3000)
npm run server

# Terminal 2 — Frontend (http://localhost:4200)
npm start
```

Các lệnh khác:

```bash
npm run build    # Build production frontend → dist/
npm test         # Chạy unit test (Vitest)
npm run watch    # Build frontend ở chế độ watch
npm run server:run   # Chạy backend 1 lần, không watch (dùng cho production)
```

**API Base URL:**
- Development: `http://localhost:3000/api`
- Production: cấu hình trong `src/environments/environment.prod.ts`

---

## 5. Cấu trúc thư mục

```
RENGA/
├── server.ts                         # Entry point backend Express
├── renga_schema.sql                  # Schema + seed data MySQL
├── .env.example                      # Mẫu biến môi trường
│
├── server/
│   ├── routes/                       # Express routers — xem bảng đầy đủ ở mục 7
│   ├── services/                     # Business logic + truy vấn DB (1 service / domain)
│   ├── middlewares/                  # auth.middleware (JWT), role.middleware, error.middleware
│   ├── jobs/                         # Job nền (huỷ lịch hẹn quá hạn chưa thanh toán, xét hạng thành viên)
│   └── db.ts                         # MySQL connection pool + helper transaction
│
├── src/
│   ├── app/
│   │   ├── app.ts / app.html / app.css   # Root component
│   │   ├── app.routes.ts             # ← Tất cả routes customer định nghĩa ở đây
│   │   ├── app.config.ts             # Providers: Router, HttpClient, Interceptors, LOCALE_ID
│   │   │
│   │   ├── home/                     # Trang chủ (/)
│   │   ├── products/                 # product-list/ (/products), product-detail/ (/products/:id)
│   │   ├── studio/                   # The Studio — thiết kế nhẫn tuỳ chỉnh (/studio)
│   │   ├── design/                   # The Designer — đặt lịch chuyên gia (/the-designer)
│   │   ├── categories/               # Danh mục sản phẩm (/danh-muc)
│   │   ├── collections/              # Bộ sưu tập (/bo-suu-tap, /bo-suu-tap/:slug)
│   │   ├── cart/ · checkout/         # Giỏ hàng, thanh toán
│   │   ├── orders/                   # order-tracking/, order-lookup/, order-detail/,
│   │   │                             #   order-detail-custom/ (theo dõi/tra cứu/chi tiết đơn hàng)
│   │   ├── reviews/                  # review-list/ (/orders/reviews), viết đánh giá (/orders/reviews/write)
│   │   ├── appointment-history/      # Lịch sử lịch hẹn
│   │   ├── account/                  # profile-info/ (/account/thong-tin),
│   │   │                             #   profile-loyalty/ (/account/diem-tich-luy)
│   │   ├── brand-story/              # Câu chuyện thương hiệu (/cau-chuyen-thuong-hieu)
│   │   ├── sustainable-materials/    # Vật liệu bền vững (/vat-lieu-ben-vung)
│   │   ├── policies/                 # warranty-policy/ (/chinh-sach-bao-hanh),
│   │   │                             #   returns-policy/ (/doi-tra-hoan-tien)
│   │   ├── admin-login/              # Trang đăng nhập admin dự phòng (/quan-tri-vien)
│   │   │
│   │   ├── features/auth/            # login/, register/, forgot-password/, reset-password/
│   │   │
│   │   ├── admin/                    # Admin Dashboard (/admin — xem mục 12)
│   │   │   └── admin-layout/         # Shell layout (header + sidebar) bọc quanh mọi trang admin
│   │   │
│   │   ├── shared/
│   │   │   ├── components/           # header/, footer/, button/, product-card/, chatbot/,
│   │   │   │                         #   ring-ar-tryon/, global-toast/, cta-section/, modal/
│   │   │   ├── data/                 # Dữ liệu tĩnh (FAQ chatbot...)
│   │   │   └── utils/                # Hàm tiện ích dùng chung (định dạng tiền tệ...)
│   │   │
│   │   ├── core/
│   │   │   ├── services/             # AuthService, CartService, NotificationService...
│   │   │   ├── guards/                # authGuard, adminGuard
│   │   │   └── interceptors/          # authInterceptor, errorInterceptor
│   │   │
│   │   └── models/                   # user.model.ts, api-response.model.ts
│   │
│   ├── assets/                       # Ảnh sản phẩm, bộ sưu tập, nghệ nhân...
│   ├── styles/_token.css             # ← CSS Design Tokens (màu sắc, font, spacing)
│   ├── styles.css                    # ← Global styles + biến bổ sung cho :root
│   ├── main.ts                       # Bootstrap Angular app
│   └── environments/                 # environment.ts (dev), environment.prod.ts
```

---

## 6. Routing (Frontend)

### Customer Routes — `src/app/app.routes.ts`

Tất cả routes dùng **lazy loading** (`loadComponent` / `loadChildren`):

| URL | Component | Ghi chú |
|-----|-----------|---------|
| `/` | `HomeComponent` | Trang chủ |
| `/products`, `/products/:id` | `ProductListComponent`, `ProductDetailComponent` | Danh sách & chi tiết sản phẩm |
| `/studio` | `StudioComponent` | Thiết kế nhẫn tuỳ chỉnh |
| `/the-designer` | `DesignComponent` | Đặt lịch với chuyên gia |
| `/danh-muc` | `CategoriesComponent` | Danh mục sản phẩm |
| `/bo-suu-tap`, `/bo-suu-tap/:slug` | `CollectionsComponent`, `CollectionDetailComponent` | Bộ sưu tập |
| `/cart`, `/checkout` | `CartComponent`, `CheckoutComponent` | Giỏ hàng, thanh toán |
| `/orders/tracking`, `/orders/lookup`, `/orders/:id`, `/orders/custom/:id` | — | Theo dõi/tra cứu/chi tiết đơn hàng |
| `/orders/reviews`, `/orders/reviews/write` | `ReviewListComponent`, `ReviewsComponent` | Danh sách đơn cần đánh giá, viết đánh giá |
| `/appointment-history` | `AppointmentHistoryComponent` | Lịch sử lịch hẹn |
| `/account/thong-tin`, `/account/diem-tich-luy` | `ProfileInfoComponent`, `ProfileLoyaltyComponent` | Hồ sơ cá nhân, điểm thưởng |
| `/chinh-sach-bao-hanh` | `WarrantyPolicyComponent` | Chính sách bảo hành |
| `/doi-tra-hoan-tien` (alias `/cau-hoi-thuong-gap`) | `ReturnsPolicyComponent` | Đổi trả & hoàn tiền |
| `/vat-lieu-ben-vung` | `SustainableMaterialsComponent` | Vật liệu bền vững |
| `/cau-chuyen-thuong-hieu` | `BrandStoryComponent` | Câu chuyện thương hiệu |
| `/dang-nhap` | `LoginComponent` | Đăng nhập chung (SĐT → khách hàng, email → admin/nhân viên) |
| `/dang-ki` | `RegisterComponent` | Đăng ký |
| `/quen-mat-khau`, `/mat-khau-moi` | — | Quên mật khẩu / đặt mật khẩu mới |
| `/quan-tri-vien` | `AdminLoginComponent` | Trang đăng nhập admin riêng (dự phòng) |
| `/**` | `NotFoundComponent` | 404 |

> `/studio`, `/the-designer`, `/appointment-history`, `/account/**`, `/orders/reviews`, `/orders/reviews/write` đều được bảo vệ bởi `authGuard`. `/consultation` redirect sang `/the-designer`.

### Admin Routes — `src/app/admin/admin.routes.ts`

Route cha `/admin` được bảo vệ bởi `adminGuard`. Tất cả children render bên trong `AdminLayoutComponent`:

| URL | Component |
|-----|-----------|
| `/admin` | redirect → `/admin/dashboard` |
| `/admin/dashboard` | `DashboardComponent` |
| `/admin/san-pham` | `ProductManagementComponent` |
| `/admin/don-hang`, `/admin/don-hang/:id` | `OrderManagementComponent`, `AdminOrderDetailComponent` |
| `/admin/don-thiet-ke/tao` | `DesignOrderCreateComponent` |
| `/admin/lich-hen` | `AppointmentManagementComponent` |
| `/admin/bao-hanh` | `WarrantyManagementComponent` |
| `/admin/voucher` | `VoucherManagementComponent` |
| `/admin/hoi-dap` | `QaManagementComponent` |

---

## 7. Tổng quan Backend & API

Entry point: `server.ts` — khởi tạo Express app, đăng ký middleware `cors()`/`express.json()`, mount các router dưới `/api/*`.

| Router (`server/routes/`) | Base path | Mô tả |
|---|---|---|
| `auth.ts` | `/api/auth` | Đăng ký/đăng nhập khách hàng (`/login`) và nhân viên (`/employee/login`), OTP, quên mật khẩu, refresh/logout, mở khoá tài khoản |
| `product.ts` | `/api/products` | Danh sách/chi tiết sản phẩm, tìm kiếm, proxy ảnh CORS |
| `cart.ts` | `/api/cart` | Giỏ hàng |
| `order.ts` | `/api/orders` | Tạo đơn, theo dõi, huỷ đơn |
| `voucher.ts` | `/api/vouchers` | Kiểm tra hợp lệ voucher khi checkout |
| `design.ts` | `/api/design` | Danh sách nghệ nhân, khung giờ trống, đặt/huỷ lịch tư vấn |
| `studio.ts` | `/api/studio` | Tính giá & tạo đơn tuỳ biến (The Studio) |
| `warranty.ts` | `/api/warranty` | Yêu cầu bảo hành/trả hàng |
| `review.ts` | `/api/reviews` | Đánh giá sản phẩm |
| `account.ts` | `/api/account` | Hồ sơ cá nhân, điểm thưởng |
| `chatbot.ts` | `/api/chatbot` | Trợ lý ảo AI |
| `admin.ts` | `/api/admin` | Toàn bộ API quản trị — bảo vệ bởi `authenticate` + `requireRole('ADMIN')` |

> `server/routes/` còn 3 file **chưa được mount** trong `server.ts` (`appointment.ts`, `checkout.ts`, `loyalty.ts`) — logic tương ứng hiện nằm trong `design.service.ts`/`order.service.ts` và được gọi trực tiếp từ service khác, không qua route riêng. `loyalty.service.ts` (tích điểm, xét hạng thành viên) cũng hoạt động theo cách này — không có router riêng, được gọi từ `order.service.ts`/`studio.service.ts` khi đơn hàng hoàn tất.

**Xác thực:** JWT access token (gửi qua header `Authorization: Bearer <token>`) + refresh token lưu riêng để cấp lại access token khi hết hạn. Payload token phân biệt `role` (`CUSTOMER` / `GUEST` / `ADMIN` / `DESIGNER`) — middleware `requireRole()` dùng để giới hạn route admin.

**Database:** một connection pool `mysql2/promise` dùng chung (`server/db.ts`), có helper `withTransaction()` cho các thao tác ghi nhiều bảng cùng lúc (vd. tạo đơn hàng + trừ điểm + cập nhật voucher). Toàn bộ schema + dữ liệu mẫu nằm trong `renga_schema.sql` ở thư mục gốc.

**Job nền** (`server/jobs/`): tự động huỷ lịch hẹn chưa thanh toán sau 10 phút.

---

## 8. CSS Token System

### Quy tắc quan trọng

Có **2 file CSS global** — không được lẫn lộn:

| File | Mục đích |
|------|---------|
| `src/styles/_token.css` | Design tokens cốt lõi (màu, font, spacing, layout) — **bọc trong `:root {}`** |
| `src/styles.css` | Import token + định nghĩa biến **bổ sung** + CSS reset global — **cũng bọc trong `:root {}`** |

> **Lỗi merge phổ biến:** Khi merge conflict trong `styles.css`, dễ bị mất dòng `:root {`. Nếu mất dòng này, toàn bộ biến CSS trong file sẽ vô hiệu và UI sẽ hỏng trên nhiều trang cùng lúc.

### Tokens trong `_token.css`

**Màu sắc:**
```css
--color-primary:       #c4607e      /* Hồng chủ đạo */
--color-primary-dark:  #9a3f5c      /* Hồng đậm — hover, active */
--color-primary-rgb:   196, 96, 126 /* Dùng với rgba() */
--color-primary-light: #f7f0f3      /* Hồng nhạt — background nhẹ */
--color-dark:          #1a1a1a
--color-muted:         #444748
--color-border:        #c4c7c7
--color-bg-card:       #f3f3f4
--color-white:         #ffffff
--color-black:         #000000
--color-error:         #e53935      /* Màu lỗi form validation */
```

**Font:**
```css
--font-serif: 'Playfair Display', Georgia, serif   /* Tiêu đề lớn */
--font-sans:  'Montserrat', Arial, sans-serif       /* Body text, UI */
```

> **Lưu ý:** Các số liệu thống kê (stat cards) trong Admin dùng trực tiếp `'Montserrat', Arial, sans-serif` thay vì `var(--font-serif)` để đồng nhất phong cách số.

**Spacing:**
```css
--sp-xs: 4px  |  --sp-sm: 8px  |  --sp-md: 16px
--sp-lg: 24px |  --sp-xl: 48px |  --sp-2xl: 80px
```

**Spacing aliases** (dùng trong modal/card):
```css
--space-1: 4px   --space-2: 8px   --space-3: 12px
--space-4: 16px  --space-6: 24px  --space-8: 32px
```

**Layout:**
```css
--max-width:     1440px
--header-height: 169px
--container-px:  80px
```

### Tokens bổ sung trong `styles.css`

```css
--color-studio-bg:       rgba(26, 26, 26, 0.9)
--color-designer-bg:     rgba(196, 96, 126, 0.6)
--color-badge-bg:        #fff0f5
--color-review-card-bg:  #f9f9f9
--color-price:           var(--color-primary-dark)
--color-product-card-bg: rgba(247, 240, 243, 0.7)
--shadow-card:           0 2px 8px rgba(0, 0, 0, 0.08)
```

### Quy tắc sử dụng CSS

- Mỗi component có file `.css` riêng — Angular tự scope
- Đặt tên class theo BEM: `.block__element--modifier`
- Không hardcode màu/font/spacing — luôn dùng CSS variable
- Không dùng `!important`, không inline style
- Không dùng `::ng-deep` trừ trường hợp bất khả kháng

### Đơn vị tiền tệ

Toàn bộ project dùng ký hiệu `₫` (U+20AB — Vietnamese Dong có gạch chéo), **không** dùng `đ`, `VND`, hay `VNĐ`.

Định dạng số: dùng pipe `| number:'1.0-0'` (locale `vi`) hoặc `.toLocaleString('vi-VN')` để tự động thêm dấu chấm phân nghìn.

---

## 9. Shared Components

Thư mục: [src/app/shared/components/](src/app/shared/components/)

| Component | Selector | Mô tả |
|-----------|---------|-------|
| `HeaderComponent` | `app-header` | Navigation bar chính, có tìm kiếm gợi ý theo thời gian thực |
| `FooterComponent` | `app-footer` | Footer |
| `ButtonComponent` | `app-button` | Button tái sử dụng |
| `ProductCardComponent` | `app-product-card` | Card sản phẩm |
| `ChatbotComponent` | `app-chatbot` | Trợ lý ảo AI |
| `RingArTryonComponent` | `app-ring-ar-tryon` | Thử nhẫn qua camera (MediaPipe Hands) |
| `GlobalToastComponent` | `app-global-toast` | Thông báo lỗi/thành công dùng chung toàn app |
| `CtaSectionComponent` | `app-cta-section` | Khối kêu gọi hành động dùng lại ở nhiều trang |
| `ModalComponent` | `app-modal` | Base modal wrapper |

**Modal con** — `shared/components/modal/`:

| Modal | Khi nào dùng |
|-------|-------------|
| `CancelOrderModalComponent` | Huỷ đơn hàng thường |
| `CancelDesignModalComponent` | Huỷ đơn thiết kế |
| `CancelAppointmentModalComponent` | Huỷ lịch hẹn (có textarea lý do khác, tối đa 150 ký tự) |
| `PaymentSuccessModalComponent` | Thanh toán thành công |
| `PaymentFailModalComponent` | Thanh toán thất bại |
| `WarrantyModalComponent` | Thông tin bảo hành |
| `LoginRequiredModalComponent` | Yêu cầu đăng nhập |
| `LoginFailModalComponent` | Đăng nhập thất bại |
| `OldOrdersModalComponent` | Đơn hàng cũ |
| `PhoneNotFoundModalComponent` | Không tìm thấy SĐT |

---

## 10. Core — Services, Guards, Interceptors

### AuthService — `src/app/core/services/auth.service.ts`

Dùng **Angular Signals** để quản lý state, lưu token/role vào `localStorage`:

```typescript
// Đọc state (trong component/template)
authService.isLoggedIn()   // boolean
authService.isAdmin()      // boolean
authService.currentUser()  // User | null

// Methods
authService.login({ phone, password })          // POST /auth/login (khách hàng)
authService.adminLogin({ email, password })      // POST /auth/employee/login (admin/nhân viên)
authService.registerSendOtp(...) / registerVerifyOtp(...)   // Đăng ký qua OTP
authService.forgotPasswordSendOtp(...) / forgotPasswordVerifyOtp(...) / resetPassword(...)
authService.refreshToken()   // Cấp lại access token bằng refresh token
authService.logout()         // Xoá session + navigate /dang-nhap
authService.getToken()       // Lấy access token từ localStorage
```

> Trang `/dang-nhap` dùng chung 1 form cho cả khách hàng và admin/nhân viên — tự nhận diện input là số điện thoại hay email rồi gọi đúng phương thức tương ứng ở trên.

### Guards

| Guard | File | Redirect khi fail |
|-------|------|-------------------|
| `authGuard` | `core/guards/auth.guard.ts` | `/dang-nhap` |
| `adminGuard` | `core/guards/admin.guard.ts` | `/` (home) |

### Interceptors

Đăng ký trong `app.config.ts`:

| Interceptor | Chức năng |
|-------------|-----------|
| `authInterceptor` | Tự động thêm `Authorization: Bearer {token}` vào mọi request |
| `errorInterceptor` | 401 → thử refresh token / logout, 403 → về home, 500 → log lỗi |

---

## 11. Models — TypeScript Interfaces

File: [src/app/models/](src/app/models/)

### User (`user.model.ts`)

```typescript
type UserRole = 'admin' | 'employee' | 'customer'

interface User {
  id: string
  email: string
  fullName: string
  role: UserRole
  avatarUrl?: string
  createdAt?: string
}
```

### API Response (`api-response.model.ts`)

```typescript
interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  errors?: string[]
}

interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  total: number
  page: number
  pageSize: number
}
```

---

## 12. Admin Module

Thư mục: [src/app/admin/](src/app/admin/)

Tất cả trang admin có cơ chế **bộ lọc 2 tầng**:
- **Pending signals** (`filterX`) — giá trị đang chọn trong dropdown
- **Active signals** (`activeX`) — giá trị đang thực sự lọc bảng (đã gửi lên server)
- `applyFilters()` sao chép pending → active rồi gọi lại API; `clearFilters()` reset cả hai

| Component | Route | Chức năng |
|-----------|-------|----------|
| `DashboardComponent` | `/admin/dashboard` | Tổng quan số liệu thật từ DB (doanh thu, đơn theo trạng thái, top sản phẩm) |
| `ProductManagementComponent` | `/admin/san-pham` | CRUD sản phẩm + bộ lọc |
| `OrderManagementComponent` | `/admin/don-hang` | Quản lý đơn hàng + cập nhật trạng thái theo quy trình |
| `AdminOrderDetailComponent` | `/admin/don-hang/:id` | Chi tiết đơn hàng |
| `DesignOrderCreateComponent` | `/admin/don-thiet-ke/tao` | Tạo đơn thiết kế thủ công |
| `AppointmentManagementComponent` | `/admin/lich-hen` | Quản lý lịch hẹn — đổi nghệ nhân/khung giờ (tự chặn trùng lịch, tối thiểu cách nhau 1 tiếng) |
| `WarrantyManagementComponent` | `/admin/bao-hanh` | Chấp nhận/từ chối yêu cầu bảo hành kèm lý do |
| `VoucherManagementComponent` | `/admin/voucher` | Quản lý voucher |
| `QaManagementComponent` | `/admin/hoi-dap` | Kiểm duyệt Q&A — trả lời, ẩn/hiện câu hỏi |

---

## 13. Quy tắc code & Convention

### Angular

- **Tất cả components phải là Standalone** — không dùng NgModule
- Dùng `ChangeDetectionStrategy.OnPush` cho tất cả components
- State trong component dùng `signal()`, computed dùng `computed()`
- Lazy load tất cả routes bằng `loadComponent` hoặc `loadChildren`
- Inject service bằng `inject()` function, không dùng constructor injection

### HTML Template

- Dùng `@if`, `@for`, `@switch` (Angular 17+ control flow) — **không** dùng `*ngIf`, `*ngFor`
- Tránh logic phức tạp trong template — chuyển vào `computed()` trong component
- Bind event filter với pattern: `(change)="signal.set($any($event.target).value)"`

### TypeScript

- Strict mode bật (`noImplicitAny`, `strictNullChecks`)
- Luôn type rõ return type của function public
- Dùng `interface` cho data shapes, `type` cho unions/aliases
- Khai báo signal sau các dependency của nó (field initializer chạy theo thứ tự — signal dùng `this.formGroup` phải đặt sau `formGroup`)

### Backend

- Mỗi domain có 1 `*.service.ts` (business logic + SQL) và 1 router tương ứng trong `server/routes/`
- Luôn dùng câu lệnh SQL tham số hoá (`?`), không nối chuỗi trực tiếp giá trị vào query
- Route admin bắt buộc đi qua `authenticate` + `requireRole('ADMIN')`
- Lỗi nghiệp vụ ném ra dạng `{ status, message }` (hoặc `Error` có gắn `.status`), route bắt và trả `res.status(status).json({ success: false, message })`

---

## 14. Quy trình Git & Merge

### Branch naming

```
feature/FE-[tên]-[tính-năng]    # Feature mới
fix/[mô-tả-lỗi]                 # Bug fix
chore/[mô-tả]                   # Maintenance
```

### Quy tắc bắt buộc trước khi tạo PR

1. **Rebase branch lên `dev` mới nhất** trước khi tạo PR:
   ```bash
   git fetch origin
   git rebase origin/dev
   ```
2. **Resolve tất cả conflict cẩn thận** — đặc biệt các file:
   - `src/styles.css` — dễ mất `:root {`
   - `src/styles/_token.css` — không được xoá biến đang dùng
   - `src/app/app.routes.ts` — dễ bị conflict khi nhiều người thêm route
   - `src/app/admin/admin.routes.ts` — tương tự
3. **Build thành công** trước khi push: `npm run build`
4. **Không commit file rỗng** — nếu tạo component mới, đảm bảo có nội dung

### Files nhạy cảm — cần review kỹ khi merge

| File | Lý do cần cẩn thận |
|------|-------------------|
| `src/styles.css` | Mất `:root {` làm hỏng toàn bộ CSS variables |
| `src/styles/_token.css` | Design tokens dùng chung toàn app |
| `src/app/app.routes.ts` | Conflict route gây 404 hoặc mất route |
| `src/app/admin/admin.routes.ts` | Conflict route admin |
| `src/app/app.config.ts` | Providers bị duplicate hoặc mất |

---

## 15. Các lỗi thường gặp sau merge

### Lỗi 1: UI hỏng nhiều trang cùng lúc (màu sắc, shadow biến mất)

**Nguyên nhân:** `styles.css` bị mất `:root {` sau khi resolve conflict.

**Kiểm tra:**
```css
/* styles.css phải có dạng: */
@import './styles/_token.css';

:root {           /* ← dòng này không được mất */
  --color-studio-bg: ...
}
```

**Fix:** Thêm lại `:root {` trước các CSS variables.

---

### Lỗi 2: Route bị 404 sau merge

**Nguyên nhân:** Ai đó thêm route mới nhưng bị overwrite khi merge `app.routes.ts` hoặc `admin.routes.ts`.

**Fix:** So sánh với commit history của 2 branch, gộp lại đủ routes.

---

### Lỗi 3: Component không load được (lazy loading fail)

**Nguyên nhân:** Path import trong `loadComponent()` bị sai sau khi rename/move file.

**Fix:** `npm run build` sẽ báo lỗi rõ ràng — sửa path trong routes file.

---

### Lỗi 4: Text không hiển thị (gần như vô hình)

**Nguyên nhân:** CSS variable màu nền bị mất (do Lỗi 1), text sáng trên nền trắng.

**Ví dụ điển hình:** Section Studio dùng `--color-primary-light` (`#f7f0f3`) cho text — chỉ đọc được trên nền tối `--color-studio-bg`. Nếu `--color-studio-bg` bị undefined, nền trắng, text gần như vô hình.

---

### Lỗi 5: Signal dùng `this.X` trước khi `X` được khai báo

**Nguyên nhân:** Class field initializer chạy theo thứ tự khai báo. Signal được khởi tạo bằng `this.formGroup.value` nhưng đặt trước `formGroup`.

**Fix:** Đảm bảo thứ tự khai báo: `formGroup` → `computedValues` → `displaySignals`.

---

### Lỗi 6: Không kết nối được backend / API trả lỗi 500 hàng loạt

**Nguyên nhân thường gặp:** thiếu file `.env`, sai thông tin kết nối MySQL, hoặc chưa import `renga_schema.sql`.

**Fix:** Kiểm tra lại mục [4.3](#43-thiết-lập-biến-môi-trường) và [4.2](#42-thiết-lập-cơ-sở-dữ-liệu), xem log terminal chạy `npm run server` để biết lỗi cụ thể.

---

*README được cập nhật lần gần nhất dựa trên trạng thái source code hiện tại — có thể lệch nhẹ so với code mới nhất nếu repo đã thay đổi sau đó.*
