"""
PNJ Vòng Tay Crawler — RENGA Schema Edition
============================================
Crawl tối đa 500 vòng tay từ PNJ trong khoảng giá 200.000đ - 20.000.000đ
Map vào 4 bảng RENGA: CATEGORY, PRODUCT, PRODUCT_VARIANT, PRODUCT_IMAGE

URL nguồn : https://www.pnj.com.vn/vong-tay/
Output    : Data/Raw/pnj_vong_tay.json

─────────────────────────────────────────────────────────────────────────────
CẤU TRÚC OUTPUT JSON:
  category        → bảng CATEGORY (danh mục cha + danh mục con)
  products[]
    ├─ product    → bảng PRODUCT
    ├─ images[]   → bảng PRODUCT_IMAGE
    └─ variants[] → bảng PRODUCT_VARIANT

GHI CHÚ KỸ THUẬT:
  • Trang /vong-tay/ dùng CS-Cart (HTML thuần) – scrape listing HTML trực tiếp.
  • Giá thực lấy từ <input id="cdp_product_price{id}" value="...">
  • Trang listing: /vong-tay/, /vong-tay/page-2/, ...
  • Chi tiết sản phẩm thử __NEXT_DATA__ (Next.js), fallback scrape HTML.
  • STONE / MATERIAL KHÔNG được map ở đây — đó là bảng của The Studio
    (customization). Thông tin chất liệu, đá crawl được → lưu vào
    PRODUCT.description dạng text.
  • category_id, created_by_admin_id → điền khi INSERT vào DB.
  • Vòng tay có thể có nhiều size (chu vi S/M/L hoặc cm) → tạo nhiều variants.
─────────────────────────────────────────────────────────────────────────────
"""

import asyncio
import json
import re
import time
from playwright.async_api import async_playwright

# ── Cấu hình ──────────────────────────────────────────────────────────────
BASE_URL     = "https://www.pnj.com.vn/vong-tay/"
MIN_PRICE    = 200_000
MAX_PRICE    = 50_000_000
MAX_PRODUCTS = 500
DETAIL_DELAY = 1.5

# ── Cây danh mục RENGA cho sản phẩm này ──────────────────────────────────
# CATEGORY schema: category_id, parent_id, category_name, slug, display_order, is_active
# Danh mục cha: Lắc tay & Vòng tay (nhóm 4 trong đồ án)
# Danh mục con: Vòng tay
CATEGORY_DATA = {
    "parent": {
        "category_name": "Lắc tay & Vòng tay",
        "slug":          "lac-tay-vong-tay",
        "display_order": 4,          # nhóm 4 trong danh mục sản phẩm đồ án
        "is_active":     True,
        "parent_id":     None,       # đây là danh mục gốc
    },
    "child": {
        "category_name": "Vòng tay",
        "slug":          "vong-tay",
        "display_order": 2,          # sau "Lắc tay" trong cùng nhóm
        "is_active":     True,
        # parent_id → trỏ tới category_id của "Lắc tay & Vòng tay", điền khi INSERT
    }
}

# ── Utility ────────────────────────────────────────────────────────────────
_THUMB_PATTERN = re.compile(r"/thumbnails/\d+/\d+/")

def to_fullsize(url: str) -> str:
    return _THUMB_PATTERN.sub("/detailed/", url)

def get_feature(features: list, *names) -> str:
    for f in features:
        for n in names:
            if n.lower() in f.get("feature", "").lower():
                return f.get("text", "").strip()
    return ""

def strip_html(html: str) -> str:
    return re.sub(r"<[^>]+>", " ", html or "").strip()

def build_description(product_name: str, features: list, raw_description: str) -> str:
    """
    Gộp thông tin chất liệu, đá, chu vi vào PRODUCT.description dạng text thuần.
    STONE / MATERIAL không có bảng riêng cho sản phẩm có sẵn trong RENGA schema.
    """
    parts = []

    mat        = get_feature(features, "chất liệu", "material")
    purity     = get_feature(features, "hàm lượng", "tuổi vàng")
    stone      = get_feature(features, "loại đá chính", "loại đá", "đá chính",
                             "main stone", "stone type")
    stone_size = get_feature(features, "kích thước đá", "kích thước đá chính")
    size       = get_feature(features, "chu vi", "kích thước", "size",
                             "chiều dài", "vòng tay")
    weight     = get_feature(features, "trọng lượng tham khảo", "trọng lượng")

    if mat:
        parts.append(f"Chất liệu: {mat}" + (f" ({purity})" if purity else ""))
    if stone:
        parts.append(f"Đá chủ: {stone}" + (f" - {stone_size}" if stone_size else ""))
    if size:
        parts.append(f"Chu vi/Kích thước: {size}")
    if weight:
        parts.append(f"Trọng lượng: {weight}")

    base = strip_html(raw_description)[:1500]
    if base:
        parts.append(base)

    return " | ".join(parts) if parts else None

def map_product_status(price: int) -> str:
    """ENUM('ACTIVE','INACTIVE','OUT_OF_STOCK')"""
    return "INACTIVE" if price <= 0 else "ACTIVE"

def map_variant_status(stock: int) -> str:
    """ENUM('AVAILABLE','OUT_OF_STOCK','DISCONTINUED')"""
    return "AVAILABLE" if stock > 0 else "OUT_OF_STOCK"

def build_size_variants(size_options: list, base_price: int) -> list:
    """
    Chuyển danh sách size text thành variant list.
    VD: ['S (14cm)', 'M (16cm)', 'L (18cm)'] → 3 variants với size_value = '14', '16', '18'
    """
    variants = []
    for opt in size_options:
        opt = opt.strip()
        if not opt or opt.lower() in ("chọn size", "-- chọn --", "select"):
            continue
        size_match = re.search(r"\b(\d+(?:[.,]\d+)?)\s*(?:cm|mm)?\b", opt)
        size_val   = size_match.group(1) if size_match else None
        variants.append({
            "variant_name":   opt,
            "size_value":     size_val,   # chu vi dây (cm)
            "price":          base_price,
            "stock_quantity": 0,
            "status":         map_variant_status(0),
        })
    return variants if variants else [{
        "variant_name":   "Mặc định",
        "size_value":     None,
        "price":          base_price,
        "stock_quantity": 0,
        "status":         map_variant_status(0),
    }]

# ── Scrape 1 trang listing ─────────────────────────────────────────────────
async def scrape_listing_page(context, page_num: int) -> tuple[list, bool]:
    url = BASE_URL if page_num == 1 else f"{BASE_URL}page-{page_num}/"
    page = await context.new_page()
    try:
        await page.goto(url, timeout=30_000, wait_until="domcontentloaded")
        await page.wait_for_timeout(1_500)

        items = await page.evaluate("""
            () => {
                const results = [];
                document.querySelectorAll('.product-item[data-key]').forEach(block => {
                    const pid = block.getAttribute('data-key');
                    if (!pid) return;

                    const priceEl = document.getElementById('cdp_product_price' + pid);
                    const skuEl   = document.getElementById('cdp_product_id'    + pid);
                    const nameEl  = document.getElementById('cdp_product_name'  + pid);
                    const urlEl   = document.getElementById('cdp_product_url'   + pid);

                    const price      = priceEl ? parseFloat(priceEl.value) || 0 : 0;
                    const sku        = skuEl   ? skuEl.value   : '';
                    const name       = nameEl  ? nameEl.value  : '';
                    const productUrl = urlEl   ? urlEl.value   : '';

                    const imgEl  = block.querySelector('img.ty-pict');
                    const rawImg = imgEl
                        ? (imgEl.getAttribute('src') || imgEl.getAttribute('data-src') || '')
                        : '';

                    const linkEl = block.querySelector('a[data-catecurr]');
                    const gender = linkEl ? (linkEl.getAttribute('data-block') || '') : '';

                    results.push({ pid, sku, name, price, url: productUrl, rawImg, gender });
                });
                return results;
            }
        """)

        for item in items:
            item["image"] = to_fullsize(item.pop("rawImg", ""))

        has_next = await page.evaluate(
            "() => !!document.querySelector('a.ty-pagination__next')"
        )
        return items, has_next

    except Exception as e:
        print(f"    [!] Lỗi listing trang {page_num}: {e}")
        return [], False
    finally:
        await page.close()

# ── Crawl trang chi tiết ───────────────────────────────────────────────────
async def fetch_product_detail(context, product_url: str) -> dict | None:
    """
    Thử __NEXT_DATA__ (Next.js).
    Nếu không có, fallback scrape features/images/sizeOptions từ HTML CS-Cart.
    """
    page = await context.new_page()
    try:
        await page.goto(product_url, timeout=30_000, wait_until="domcontentloaded")
        await page.wait_for_timeout(2_000)

        raw = await page.evaluate("""
            () => {
                const nd = window.__NEXT_DATA__;
                if (!nd) return null;
                return nd.props?.pageProps?.dataServerSide || null;
            }
        """)
        if raw:
            return raw

        # Fallback: scrape HTML (bao gồm size options cho vòng tay)
        fallback = await page.evaluate("""
            () => {
                const images = [];
                document.querySelectorAll(
                    '.ty-product-img-outer img, .mp-product-detail-image img'
                ).forEach(img => {
                    const src = img.getAttribute('src') || img.getAttribute('data-src') || '';
                    if (src && !src.startsWith('data:') && !images.includes(src))
                        images.push(src);
                });

                const features = [];
                document.querySelectorAll(
                    '.ty-product-features .ty-product-feature'
                ).forEach(row => {
                    const feat = (row.querySelector('.ty-product-feature__label') || {})
                                     .textContent?.trim() || '';
                    const val  = (row.querySelector('.ty-product-feature__value') || {})
                                     .textContent?.trim() || '';
                    if (feat) features.push({ feature: feat, text: val });
                });

                const desc = (document.querySelector('.ty-product-description') || {})
                                 .textContent?.trim() || '';

                // Size options — đặc trưng của vòng tay
                const sizeOptions = [];
                document.querySelectorAll(
                    '.ty-product-options select option, .product-size-selector .size-item'
                ).forEach(opt => {
                    const v = opt.value || opt.textContent?.trim() || '';
                    if (v && v !== '') sizeOptions.push(v);
                });

                return { images, features, full_description: desc, sizeOptions };
            }
        """)
        return fallback or None

    except Exception as e:
        print(f"    [!] Lỗi detail {product_url}: {e}")
        return None
    finally:
        await page.close()

# ── Parse 1 sản phẩm → PRODUCT + PRODUCT_IMAGE + PRODUCT_VARIANT ──────────
def parse_product(item: dict, detail: dict | None) -> dict:
    sku          = item.get("sku", "")
    product_name = item.get("name", "").strip()
    list_price   = item.get("price", 0)
    product_url  = item.get("url", "")
    list_image   = item.get("image", "")
    gender       = item.get("gender", "")

    description = None
    images      = [list_image] if list_image else []

    # Default 1 variant
    variants = [{
        "variant_name":   "Mặc định",
        "size_value":     None,
        "price":          list_price,
        "stock_quantity": 0,
        "status":         map_variant_status(0),
    }]

    if detail:
        features = detail.get("features", [])

        # Lấy giá thực từ detail nếu listing thiếu
        if list_price == 0:
            for key in ("price", "net_price", "price_display", "original_price"):
                val = detail.get(key)
                if val:
                    try:
                        p = int(float(str(val).replace(",", "").replace(".", "")))
                        if p > 0:
                            list_price = p
                            break
                    except (ValueError, TypeError):
                        pass

        # PRODUCT.description = gộp thông tin chất liệu/đá/chu vi vào text
        description = build_description(
            product_name, features, detail.get("full_description", "")
        )

        # Ảnh từ detail
        detail_images = detail.get("images", [])
        if detail_images:
            images = [img for img in detail_images if img]

        # ── Xây dựng variants (ưu tiên: size_modifier_prices > sizeOptions > default) ──
        size_prices  = detail.get("size_modifier_prices", {})
        size_options = detail.get("sizeOptions", [])

        if size_prices:
            # Variant từ __NEXT_DATA__ — trích số cm từ tên size nếu có
            variants = []
            for sz, price_info in size_prices.items():
                p = price_info.get("price") or price_info.get("net_price") or list_price
                size_match = re.search(r"\b(\d+(?:[.,]\d+)?)\s*(?:cm|mm)?\b", sz)
                variants.append({
                    "variant_name":   sz,
                    "size_value":     size_match.group(1) if size_match else None,
                    "price":          int(p) if p else list_price,
                    "stock_quantity": 0,
                    "status":         map_variant_status(0),
                })
        elif size_options:
            # Variant từ HTML fallback
            variants = build_size_variants(size_options, list_price)
        else:
            variants[0]["price"] = list_price

    # ── PRODUCT_IMAGE ─────────────────────────────────────────────────────
    image_list = [
        {
            "image_url":     u,
            "is_primary":    i == 0,
            "display_order": i,
        }
        for i, u in enumerate(images) if u
    ]

    return {
        # ── PRODUCT ───────────────────────────────────────────────────────
        # Không có: product_id, category_id, created_by_admin_id → điền khi INSERT
        "product": {
            "product_name": product_name,
            "description":  description,         # chất liệu/đá/chu vi gộp vào đây
            "base_price":   list_price,           # DECIMAL(12,0) NOT NULL > 0
            "status":       map_product_status(list_price),
        },

        # ── PRODUCT_IMAGE ─────────────────────────────────────────────────
        "images": image_list,

        # ── PRODUCT_VARIANT ───────────────────────────────────────────────
        # Không có: variant_id, product_id → điền khi INSERT
        # size_value = chu vi vòng tay (cm) nếu có, None nếu không
        "variants": variants,

        # ── Metadata (KHÔNG INSERT vào DB) ───────────────────────────────
        "_meta": {
            "sku":        sku,
            "source_url": product_url,
            "gender":     gender,
        }
    }

# ── Main ──────────────────────────────────────────────────────────────────
async def main():
    print("=" * 60)
    print("PNJ Vòng Tay Crawler — RENGA Schema Edition")
    print(f"Giá: {MIN_PRICE:,}đ – {MAX_PRICE:,}đ | Map: CATEGORY + PRODUCT + VARIANT + IMAGE")
    print("=" * 60)

    all_products = []

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0.0.0 Safari/537.36"
            ),
            locale="vi-VN",
        )

        # ── Bước 1: Scrape listing ─────────────────────────────────────────
        print("\n[1] Scrape listing HTML...")
        page_num  = 1
        raw_items = []

        while True:
            print(f"  Trang {page_num}...", end=" ", flush=True)
            items, has_next = await scrape_listing_page(context, page_num)

            if not items:
                print("không có sản phẩm.")
                break

            in_range = [i for i in items if MIN_PRICE <= i.get("price", 0) <= MAX_PRICE]
            raw_items.extend(in_range)
            print(
                f"lấy {len(in_range)}/{len(items)} sp trong khoảng giá "
                f"(tổng: {len(raw_items)})"
            )

            if len(raw_items) >= MAX_PRODUCTS:
                raw_items = raw_items[:MAX_PRODUCTS]
                print(f"  → Đủ {MAX_PRODUCTS} sản phẩm, dừng.")
                break

            if not has_next:
                print("  → Hết trang.")
                break

            page_num += 1
            await asyncio.sleep(0.8)

        print(f"\n  ✅ Tổng listing: {len(raw_items)} sản phẩm")

        # ── Bước 2: Crawl detail ───────────────────────────────────────────
        print(f"\n[2] Crawl detail {len(raw_items)} sản phẩm ({DETAIL_DELAY}s/trang)...")

        for idx, item in enumerate(raw_items, 1):
            name = item.get("name", "")[:50]
            url  = item.get("url", "")
            print(f"  [{idx:3d}/{len(raw_items)}] {name}...", end=" ", flush=True)

            detail  = await fetch_product_detail(context, url)
            product = parse_product(item, detail)
            all_products.append(product)
            print(
                f"✓  ({len(product['variants'])} variants, "
                f"{len(product['images'])} ảnh)"
            )

            await asyncio.sleep(DETAIL_DELAY)

        await browser.close()

    # ── Bước 3: Lưu file ──────────────────────────────────────────────────
    import os
    script_dir = os.path.dirname(os.path.abspath(__file__))
    raw_dir    = os.path.join(script_dir, "..", "Raw")
    os.makedirs(raw_dir, exist_ok=True)
    out_path   = os.path.join(raw_dir, "pnj_vong_tay.json")

    output = {
        "crawled_at":  time.strftime("%Y-%m-%d %H:%M:%S"),
        "source":      "pnj.com.vn",
        "price_range": {"min": MIN_PRICE, "max": MAX_PRICE},
        "total":       len(all_products),

        # ── CATEGORY block ─────────────────────────────────────────────────
        # Dùng để INSERT 2 row vào bảng CATEGORY trước khi INSERT products
        "category": CATEGORY_DATA,

        # ── Ghi chú khi INSERT vào DB ──────────────────────────────────────
        "_insert_notes": {
            "step_1": "INSERT category.parent → lấy category_id cha",
            "step_2": "INSERT category.child với parent_id = id cha vừa lấy → lấy category_id con",
            "step_3": "Với mỗi product: INSERT PRODUCT (dùng category_id con, điền created_by_admin_id) → lấy product_id",
            "step_4": "INSERT PRODUCT_IMAGE với product_id vừa lấy",
            "step_5": "INSERT PRODUCT_VARIANT với product_id vừa lấy",
            "stock_quantity": "Toàn bộ = 0, cần cập nhật từ hệ thống kho thực tế",
            "size_value_note": "size_value = chu vi vòng tay (cm) nếu có variant size, None nếu không có",
        },

        "products": all_products,
    }

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\n{'='*60}")
    print(f"✅ Xong! Đã crawl {len(all_products)} sản phẩm")
    print(f"📁 Lưu tại: {os.path.abspath(out_path)}")

    # ── Thống kê nhanh ────────────────────────────────────────────────────
    has_desc     = sum(1 for p in all_products if p["product"]["description"])
    multi_var    = sum(1 for p in all_products if len(p["variants"]) > 1)
    total_images = sum(len(p["images"]) for p in all_products)
    inactive     = sum(1 for p in all_products if p["product"]["status"] == "INACTIVE")
    price_sum    = sum(p["product"]["base_price"] for p in all_products)

    avg = price_sum // len(all_products) if all_products else 0

    print("\n📊 Thống kê:")
    print(f"  Có description      : {has_desc}/{len(all_products)}")
    print(f"  Có nhiều size       : {multi_var}/{len(all_products)}")
    print(f"  Tổng ảnh            : {total_images} ({total_images/max(len(all_products),1):.1f} ảnh/sp)")
    print(f"  Status INACTIVE     : {inactive}")
    print(f"  Giá trung bình      : {avg:,}đ")

if __name__ == "__main__":
    asyncio.run(main())