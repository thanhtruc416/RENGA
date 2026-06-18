# RENGA — Nền tảng thương mại trang sức cao cấp

> **Framework:** Angular 22 (Standalone API) · **Ngôn ngữ:** TypeScript · **Style:** CSS thuần + CSS Custom Properties

---

## Mục lục

1. [Tổng quan dự án](#1-tổng-quan-dự-án)
2. [Cài đặt & Chạy dự án](#2-cài-đặt--chạy-dự-án)
3. [Cấu trúc thư mục](#3-cấu-trúc-thư-mục)
4. [Routing](#4-routing)
5. [CSS Token System](#5-css-token-system)
6. [Shared Components](#6-shared-components)
7. [Core — Services, Guards, Interceptors](#7-core--services-guards-interceptors)
8. [Models — TypeScript Interfaces](#8-models--typescript-interfaces)
9. [Admin Module](#9-admin-module)
10. [Quy tắc code & Convention](#10-quy-tắc-code--convention)
11. [Quy trình Git & Merge](#11-quy-trình-git--merge)
12. [Các lỗi thường gặp sau merge](#12-các-lỗi-thường-gặp-sau-merge)

---

## 1. Tổng quan dự án

RENGA là nền tảng thương mại điện tử trang sức cao cấp, gồm 2 luồng chính:

| Luồng | Mô tả |
|-------|-------|
| **Customer** | Xem sản phẩm, thiết kế nhẫn tuỳ chỉnh (The Studio), đặt lịch với chuyên gia (The Designer), thanh toán, quản lý đơn hàng |
| **Admin** | Quản lý sản phẩm, đơn hàng, lịch hẹn, voucher, bảo hành, Q&A |

**Tech Stack:**

| Thành phần | Công nghệ |
|---|---|
| Framework | Angular 22 Standalone |
| State | Angular Signals (`signal`, `computed`) |
| HTTP | Angular HttpClient + Interceptors |
| Style | CSS thuần + CSS Custom Properties |
| Locale | `vi` (Vietnamese — `LOCALE_ID` đăng ký trong `app.config.ts`) |
| Test | Vitest |
| Package Manager | npm |

**API Base URL:**
- Development: `http://localhost:3000/api`
- Production: `https://api.renga.vn/api`

---

## 2. Cài đặt & Chạy dự án

```bash
npm install
npm start        # Dev server → http://localhost:4200
npm run build    # Build production → dist/
npm test         # Chạy unit tests
npm run watch    # Build watch mode
```

---

## 3. Cấu trúc thư mục

```
src/
├── app/
│   ├── app.ts                        # Root component
│   ├── app.html                      # Root template
│   ├── app.css                       # Root styles
│   ├── app.routes.ts                 # ← Tất cả routes customer định nghĩa ở đây
│   ├── app.config.ts                 # Providers: Router, HttpClient, Interceptors, LOCALE_ID
│   │
│   ├── home/                         # Trang chủ (/)
│   ├── products/                     # Danh sách & chi tiết sản phẩm
│   │   ├── product-list/             # /products
│   │   └── product-detail/           # /products/:id
│   ├── studio/                       # The Studio — thiết kế nhẫn tuỳ chỉnh (/studio)
│   ├── design/                       # The Designer — đặt lịch chuyên gia (/the-designer)
│   ├── categories/                   # Danh mục sản phẩm (/danh-muc)
│   ├── cart/                         # Giỏ hàng (/cart)
│   ├── checkout/                     # Thanh toán (/checkout)
│   ├── orders/
│   │   ├── order-detail/             # /orders/:id
│   │   ├── order-detail-custom/      # /orders/custom/:id
│   │   ├── order-lookup/             # /orders/lookup
│   │   └── order-tracking/           # /orders/tracking
│   ├── appointment-history/          # Lịch sử lịch hẹn (/appointment-history)
│   ├── profile/                      # Hồ sơ cá nhân (/profile, /profile/rewards)
│   ├── admin-login/                  # Trang đăng nhập admin (/quan-tri-vien)
│   ├── not-found/                    # Trang 404 (**)
│   │
│   ├── features/
│   │   └── auth/                     # Authentication
│   │       ├── login/                # /dang-nhap
│   │       ├── register/             # /dang-ki
│   │       ├── forgot-password/      # /quen-mat-khau
│   │       └── reset-password/       # /mat-khau-moi
│   │
│   ├── admin/                        # Admin Dashboard (/admin — xem mục 9)
│   │   ├── admin-layout/             # Shell layout (header + sidebar)
│   │   ├── admin.routes.ts           # ← Admin child routes
│   │   ├── dashboard/
│   │   ├── product-management/       # /admin/san-pham
│   │   ├── order-management/         # /admin/don-hang
│   │   ├── order-detail/             # /admin/don-hang/:id
│   │   ├── design-order-create/      # /admin/don-thiet-ke/tao
│   │   ├── appointment-management/   # /admin/lich-hen
│   │   ├── voucher-management/       # /admin/voucher
│   │   ├── warranty-management/      # /admin/bao-hanh
│   │   └── qa-management/            # /admin/hoi-dap
│   │
│   ├── shared/
│   │   ├── components/               # Components tái sử dụng (xem mục 6)
│   │   ├── data/                     # Data tĩnh (chatbot-faq.data.ts)
│   │   ├── modal-found-orders/
│   │   └── modal-login-required/
│   │
│   ├── core/
│   │   ├── services/                 # AuthService, ModalService
│   │   ├── guards/                   # authGuard, adminGuard
│   │   └── interceptors/             # authInterceptor, errorInterceptor
│   │
│   └── models/
│       ├── user.model.ts
│       └── api-response.model.ts
│
├── styles/
│   └── _token.css                    # ← CSS Design Tokens (màu sắc, font, spacing)
├── styles.css                        # ← Global styles + biến bổ sung cho :root
├── main.ts                           # Bootstrap Angular app
└── environments/
    ├── environment.ts                # Dev config
    └── environment.prod.ts           # Prod config
```

---

## 4. Routing

### Customer Routes — `src/app/app.routes.ts`

Tất cả routes dùng **lazy loading** (`loadComponent` / `loadChildren`):

| URL | Component | Ghi chú |
|-----|-----------|---------|
| `/` | `HomeComponent` | Trang chủ |
| `/products` | `ProductListComponent` | Danh sách sản phẩm (lazy children) |
| `/products/:id` | `ProductDetailComponent` | Chi tiết sản phẩm |
| `/studio` | `StudioComponent` | Thiết kế nhẫn tuỳ chỉnh |
| `/the-designer` | `DesignComponent` | Đặt lịch với chuyên gia |
| `/danh-muc` | `CategoriesComponent` | Danh mục sản phẩm |
| `/cart` | `CartComponent` | Giỏ hàng |
| `/checkout` | `CheckoutComponent` | Thanh toán |
| `/orders/tracking` | `OrderTrackingComponent` | Theo dõi đơn hàng (member) |
| `/orders/lookup` | `OrderLookupComponent` | Tra cứu đơn hàng (guest) |
| `/orders/custom/:id` | `OrderDetailCustomComponent` | Chi tiết đơn thiết kế tuỳ chỉnh |
| `/orders/:id` | `OrderDetailComponent` | Chi tiết đơn hàng thường |
| `/appointment-history` | `AppointmentHistoryComponent` | Lịch sử lịch hẹn |
| `/profile` | `ProfileComponent` | Hồ sơ cá nhân |
| `/profile/rewards` | `ProfileRewardsComponent` | Điểm thưởng |
| `/dang-nhap` | `LoginComponent` | Đăng nhập |
| `/dang-ki` | `RegisterComponent` | Đăng ký |
| `/quen-mat-khau` | `ForgotPasswordComponent` | Quên mật khẩu |
| `/mat-khau-moi` | `ResetPasswordComponent` | Đặt mật khẩu mới |
| `/quan-tri-vien` | `AdminLoginComponent` | Trang đăng nhập admin riêng |
| `/**` | `NotFoundComponent` | 404 |

### Admin Routes — `src/app/admin/admin.routes.ts`

Route cha `/admin` được bảo vệ bởi `adminGuard`. Tất cả children render bên trong `AdminLayoutComponent`:

| URL | Component |
|-----|-----------|
| `/admin` | redirect → `/admin/dashboard` |
| `/admin/dashboard` | `DashboardComponent` |
| `/admin/san-pham` | `ProductManagementComponent` |
| `/admin/don-hang` | `OrderManagementComponent` |
| `/admin/don-hang/:id` | `AdminOrderDetailComponent` |
| `/admin/don-thiet-ke/tao` | `DesignOrderCreateComponent` |
| `/admin/lich-hen` | `AppointmentManagementComponent` |
| `/admin/bao-hanh` | `WarrantyManagementComponent` |
| `/admin/voucher` | `VoucherManagementComponent` |
| `/admin/hoi-dap` | `QaManagementComponent` |

---

## 5. CSS Token System

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

## 6. Shared Components

Thư mục: [src/app/shared/components/](src/app/shared/components/)

| Component | Selector | Mô tả |
|-----------|---------|-------|
| `HeaderComponent` | `app-header` | Navigation bar chính |
| `FooterComponent` | `app-footer` | Footer |
| `ButtonComponent` | `app-button` | Button tái sử dụng |
| `ProductCardComponent` | `app-product-card` | Card sản phẩm |
| `ChatbotComponent` | `app-chatbot` | Chatbot FAQ |
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

## 7. Core — Services, Guards, Interceptors

### AuthService — `src/app/core/services/auth.service.ts`

Dùng **Angular Signals** để quản lý state:

```typescript
// Đọc state (trong component/template)
authService.isLoggedIn()   // boolean
authService.isAdmin()      // boolean
authService.currentUser()  // User | null

// Methods
authService.login(phone, password)   // POST /auth/login
authService.register(...)            // POST /auth/register
authService.logout()                 // Xoá session + navigate /dang-nhap
authService.mockLogin()              // Dev helper — login không cần backend
authService.getToken()               // Lấy token từ localStorage
```

### ModalService — `src/app/core/services/modal.service.ts`

```typescript
modalService.showLoginRequired()   // signal: boolean
modalService.openLoginRequired()
modalService.closeLoginRequired()
```

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
| `errorInterceptor` | 401 → logout, 403 → về home, 500 → log lỗi |

---

## 8. Models — TypeScript Interfaces

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

interface Customer extends User { role: 'customer'; phone?; address? }
interface Employee extends User { role: 'employee' | 'admin'; position?; department? }
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

## 9. Admin Module

Thư mục: [src/app/admin/](src/app/admin/)

Tất cả trang admin có cơ chế **bộ lọc 2 tầng**:
- **Pending signals** (`filterX`) — giá trị đang chọn trong dropdown
- **Active signals** (`activeX`) — giá trị đang thực sự lọc bảng
- `applyFilters()` sao chép pending → active; `clearFilters()` reset cả hai
- `filteredItems = computed(...)` đọc từ active signals

| Component | Route | Chức năng |
|-----------|-------|----------|
| `DashboardComponent` | `/admin/dashboard` | Tổng quan số liệu |
| `ProductManagementComponent` | `/admin/san-pham` | CRUD sản phẩm + bộ lọc (danh mục, chất liệu, trạng thái) |
| `OrderManagementComponent` | `/admin/don-hang` | Quản lý đơn hàng + bộ lọc (loại, trạng thái) |
| `AdminOrderDetailComponent` | `/admin/don-hang/:id` | Chi tiết đơn hàng — hóa đơn, spec sản phẩm |
| `DesignOrderCreateComponent` | `/admin/don-thiet-ke/tao` | Tạo đơn thiết kế thủ công — nhập giá có dấu chấm tự động, validate SĐT/email |
| `AppointmentManagementComponent` | `/admin/lich-hen` | Quản lý lịch hẹn + bộ lọc + date range picker |
| `WarrantyManagementComponent` | `/admin/bao-hanh` | Quản lý bảo hành + bộ lọc + modal xử lý |
| `VoucherManagementComponent` | `/admin/voucher` | Quản lý voucher + bộ lọc + tạo mới |
| `QaManagementComponent` | `/admin/hoi-dap` | Kiểm duyệt Q&A — trả lời, ẩn câu hỏi |

---

## 10. Quy tắc code & Convention

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

---

## 11. Quy trình Git & Merge

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

## 12. Các lỗi thường gặp sau merge

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

*Cập nhật lần cuối: 2026-06-18*
