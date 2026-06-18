# RENGA — Trang web thương mại trang sức

> **Framework:** Angular 22 (Standalone API) · **Ngôn ngữ:** TypeScript · **Style:** CSS thuần với CSS Custom Properties

---

## Mục lục

1. [Tổng quan dự án](#1-tổng-quan-dự-án)
2. [Cài đặt & Chạy dự án](#2-cài-đặt--chạy-dự-án)
3. [Cấu trúc thư mục](#3-cấu-trúc-thư-mục)
4. [Routing — Tất cả đường dẫn](#4-routing--tất-cả-đường-dẫn)
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
| State | Angular Signals |
| HTTP | Angular HttpClient + Interceptors |
| Style | CSS thuần + CSS Custom Properties |
| Test | Vitest |
| Format | Prettier |
| Package Manager | npm |

**API Base URL:**
- Development: `http://localhost:3000/api`
- Production: `https://api.renga.vn/api`

---

## 2. Cài đặt & Chạy dự án

```bash
npm install
npm start        # http://localhost:4200
npm run build    # Build production → dist/
npm test         # Chạy unit tests
```

---

## 3. Cấu trúc thư mục

```
src/
├── app/
│   ├── app.ts                    # Root component
│   ├── app.html                  # Root template
│   ├── app.css                   # Root styles
│   ├── app.routes.ts             # ← Tất cả routes định nghĩa ở đây
│   ├── app.config.ts             # Providers: Router, HttpClient, Interceptors
│   │
│   ├── home/                     # Trang chủ (/)
│   ├── products/                 # Danh sách & chi tiết sản phẩm
│   │   ├── product-list/         # /products
│   │   └── product-detail/       # /products/:id
│   ├── studio/                   # The Studio — thiết kế nhẫn tuỳ chỉnh (/studio)
│   ├── design/                   # The Designer — đặt lịch chuyên gia (/the-designer)
│   ├── categories/               # Danh mục sản phẩm (/danh-muc)
│   ├── cart/                     # Giỏ hàng (/cart)
│   ├── checkout/                 # Thanh toán (/checkout)
│   ├── orders/                   # Quản lý đơn hàng
│   │   ├── order-detail/         # /orders/:id
│   │   ├── order-detail-custom/  # /orders/custom/:id
│   │   ├── order-lookup/         # /orders/lookup
│   │   └── order-tracking/       # /orders/tracking
│   ├── appointment-history/      # Lịch sử lịch hẹn (/appointment-history)
│   ├── account/                  # (chưa có route) Profile info & loyalty — tách từ /profile
│   ├── profile/                  # Hồ sơ cá nhân (/profile)
│   ├── reviews/                  # Đánh giá sản phẩm
│   ├── not-found/                # Trang 404
│   │
│   ├── features/
│   │   └── auth/                 # Authentication
│   │       ├── login/            # /dang-nhap
│   │       ├── register/         # /dang-ki
│   │       ├── forgot-password/  # /quen-mat-khau
│   │       └── reset-password/   # /mat-khau-moi
│   │
│   ├── admin/                    # Admin Dashboard (chưa có route — xem mục 9)
│   │   ├── dashboard/
│   │   ├── product-management/
│   │   ├── order-management/
│   │   ├── order-detail/
│   │   ├── appointment-management/
│   │   ├── design-order-create/
│   │   ├── voucher-management/
│   │   ├── warranty-management/
│   │   └── qa-management/
│   │
│   ├── shared/
│   │   ├── components/           # Components tái sử dụng (xem mục 6)
│   │   ├── data/                 # Data tĩnh (chatbot-faq.data.ts)
│   │   ├── modal-found-orders/
│   │   └── modal-login-required/
│   │
│   ├── core/
│   │   ├── services/             # AuthService, ModalService
│   │   ├── guards/               # authGuard, adminGuard
│   │   └── interceptors/         # authInterceptor, errorInterceptor
│   │
│   └── models/                   # TypeScript interfaces
│       ├── user.model.ts
│       └── api-response.model.ts
│
├── styles/
│   └── _token.css                # ← CSS Design Tokens (màu sắc, font, spacing)
├── styles.css                    # ← Global styles + biến bổ sung cho :root
├── main.ts                       # Bootstrap Angular app
└── environments/
    ├── environment.ts            # Dev config
    └── environment.prod.ts       # Prod config
```

---

## 4. Routing — Tất cả đường dẫn

File: [src/app/app.routes.ts](src/app/app.routes.ts)

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
| `/**` | `NotFoundComponent` | 404 |

> **Lưu ý:** Admin module (`src/app/admin/`) chưa được gắn vào `app.routes.ts` — chưa có route `/admin`. Account module (`src/app/account/`) cũng chưa được gắn route.

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
--color-primary:       #c4607e   /* Hồng chủ đạo */
--color-primary-light: #f7f0f3   /* Hồng nhạt — dùng trên nền tối */
--color-dark:          #1a1a1a
--color-muted:         #444748
--color-border:        #c4c7c7
--color-bg-card:       #f3f3f4
--color-white:         #ffffff
--color-black:         #000000
```

**Font:**
```css
--font-serif: 'Playfair Display', Georgia, serif   /* Tiêu đề lớn */
--font-sans:  'Montserrat', Arial, sans-serif       /* Body text */
--font-ui:    'Montserrat', Arial, sans-serif       /* UI elements (search, badge) */
```

**Color aliases** (shorthand cho component dùng tên ngắn hơn):
```css
--color-bg:         var(--color-white)    /* Nền trang */
--color-surface:    var(--color-bg-card)  /* Nền card */
--color-text:       var(--color-dark)     /* Text chính */
--color-text-muted: var(--color-muted)    /* Text phụ */
```

**Spacing:**
```css
--sp-xs: 4px  |  --sp-sm: 8px  |  --sp-md: 16px
--sp-lg: 24px |  --sp-xl: 48px |  --sp-2xl: 80px
```

**Spacing aliases** (dùng trong modal/card components):
```css
--space-1: var(--sp-xs)   /* 4px  */
--space-2: var(--sp-sm)   /* 8px  */
--space-3: 12px
--space-4: var(--sp-md)   /* 16px */
--space-6: var(--sp-lg)   /* 24px */
--space-8: 32px
```

**Layout:**
```css
--max-width:     1440px
--header-height: 169px
--container-px:  80px   /* Padding ngang của các section */
```

### Tokens bổ sung trong `styles.css`

```css
--color-studio-bg:       rgba(26, 26, 26, 0.9)      /* Nền tối section Studio */
--color-designer-bg:     rgba(196, 96, 126, 0.6)    /* Nền hồng section Designer */
--color-badge-bg:        #fff0f5
--color-review-card-bg:  #f9f9f9
--color-price:           #9a3f5c
--color-product-card-bg: rgba(247, 240, 243, 0.7)
--shadow-card:           0 2px 8px rgba(0, 0, 0, 0.08)
```

### Quy tắc sử dụng CSS trong component

- Mỗi component có file `.css` riêng — Angular tự scope (không bị leak ra ngoài)
- Đặt tên class theo BEM: `.block__element--modifier`
- Không dùng `!important`, không inline style
- Tất cả màu sắc/font/spacing phải dùng CSS variables, không hardcode

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

**Modal con** (trong `shared/components/modal/`):

| Modal | Khi nào dùng |
|-------|-------------|
| `CancelOrderModalComponent` | Huỷ đơn hàng |
| `CancelDesignModalComponent` | Huỷ đơn thiết kế |
| `CancelAppointmentModalComponent` | Huỷ lịch hẹn |
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

### Interceptors (đăng ký trong `app.config.ts`)

| Interceptor | Chức năng |
|-------------|-----------|
| `authInterceptor` | Tự động thêm `Authorization: Bearer {token}` vào mọi request |
| `errorInterceptor` | Handle lỗi: 401 → logout, 403 → về home, 500 → log lỗi |

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

| Component | Chức năng |
|-----------|----------|
| `DashboardComponent` | Dashboard tổng quan |
| `ProductManagementComponent` | CRUD sản phẩm |
| `OrderManagementComponent` | Quản lý đơn hàng |
| `OrderDetailComponent` | Chi tiết đơn hàng (admin) |
| `AppointmentManagementComponent` | Quản lý lịch hẹn |
| `DesignOrderCreateComponent` | Tạo đơn thiết kế thủ công |
| `VoucherManagementComponent` | Quản lý voucher |
| `WarrantyManagementComponent` | Quản lý bảo hành |
| `QaManagementComponent` | Quản lý Q&A |

> **TODO:** Admin chưa được gắn vào `app.routes.ts` và chưa có sidebar layout. Cần thêm route `/admin` với `adminGuard` và xây dựng admin shell component.

---

## 10. Quy tắc code & Convention

### Angular

- **Tất cả components phải là Standalone** — không dùng NgModule
- Dùng `ChangeDetectionStrategy.OnPush` khi có thể
- State trong component dùng `signal()`, computed dùng `computed()`
- Lazy load tất cả routes bằng `loadComponent` hoặc `loadChildren`
- Inject service bằng `inject()` function, không dùng constructor injection

### HTML Template

- Dùng `@if`, `@for`, `@switch` (Angular 17+ control flow) thay vì `*ngIf`, `*ngFor`
- Tránh logic phức tạp trong template — chuyển vào `computed()` trong component

### CSS

- **BEM naming:** `.component__element--modifier`
- Không hardcode màu/font/spacing — luôn dùng CSS variable từ token system
- File CSS của component chỉ chứa styles cho component đó
- Không dùng `::ng-deep` trừ trường hợp bất khả kháng

### TypeScript

- Strict mode bật (`noImplicitAny`, `strictNullChecks`)
- Luôn type rõ return type của function public
- Dùng `interface` cho data shapes, `type` cho unions/aliases

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
3. **Build thành công** trước khi push: `npm run build`
4. **Không commit file rỗng** — nếu tạo component mới, đảm bảo có nội dung

### Files nhạy cảm — cần review kỹ khi merge

| File | Lý do cần cẩn thận |
|------|-------------------|
| `src/styles.css` | Mất `:root {` làm hỏng toàn bộ CSS variables |
| `src/styles/_token.css` | Design tokens dùng chung toàn app |
| `src/app/app.routes.ts` | Conflict route gây 404 hoặc mất route |
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

**Nguyên nhân:** Ai đó thêm route mới nhưng bị overwrite khi merge `app.routes.ts`.

**Fix:** So sánh `app.routes.ts` với commit history của 2 branch, gộp lại đủ routes.

---

### Lỗi 3: Component không load được (lazy loading fail)

**Nguyên nhân:** Path import trong `loadComponent()` bị sai sau khi ai đó rename/move file.

**Fix:** `ng build` sẽ báo lỗi rõ ràng — sửa path trong `app.routes.ts`.

---

### Lỗi 4: Text không hiển thị (gần như vô hình)

**Nguyên nhân:** CSS variable màu nền bị mất (do Lỗi 1), dẫn đến text sáng trên nền trắng.

**Ví dụ điển hình:** Section Studio dùng `--color-primary-light` (`#f7f0f3`) cho text bước — màu này chỉ đọc được trên nền tối `--color-studio-bg` (`rgba(26,26,26,0.9)`). Nếu `--color-studio-bg` bị undefined, nền trở thành trắng và text gần như vô hình.

---

*Cập nhật lần cuối: 2026-06-18*
