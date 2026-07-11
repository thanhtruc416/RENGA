"""
PNJ Bộ Trang Sức Crawler v2 — RENGA Schema Edition
====================================================
Crawl tối đa 300 bộ trang sức từ PNJ trong khoảng giá 1.000.000đ - 60.000.000đ
Map vào 4 bảng RENGA: CATEGORY, PRODUCT, PRODUCT_VARIANT, PRODUCT_IMAGE

URL nguồn : https://www.pnj.com.vn/bo-trang-suc/
Output    : Data/Raw/pnj_bo_trang_suc.json

─────────────────────────────────────────────────────────────────────────────
THAY ĐỔI SO VỚI v1:
  • Khai thác group_products_data từ __NEXT_DATA__ → liệt kê tên từng món
    trong bộ vào description (VD: "Gồm: Nhẫn ..., Bông tai ..., Mặt dây...")
  • full_description từ __NEXT_DATA__ luôn có nội dung text thuần → đây là
    nguồn chính cho PRODUCT.description, không phụ thuộc features
  • Fallback HTML scrape lấy thêm .ty-product-description nếu Next.js fail
─────────────────────────────────────────────────────────────────────────────
"""

import asyncio
import json
import re
import time
from playwright.async_api import async_playwright

# ── Cấu hình ──────────────────────────────────────────────────────────────
BASE_URL     = "https://www.pnj.com.vn/bo-trang-suc/"
MIN_PRICE    = 1_000_000
MAX_PRICE    = 5_000_000
MAX_PRODUCTS = 300
DETAIL_DELAY = 1.5

# ── Cây danh mục RENGA ────────────────────────────────────────────────────
CATEGORY_DATA = {
    "parent": {
        "category_name": "Bộ sưu tập đặc biệt & Khác",
        "slug":          "bo-suu-tap-dac-biet",
        "display_order": 5,
        "is_active":     True,
        "parent_id":     None,
    },
    "child": {
        "category_name": "Bộ trang sức",
        "slug":          "bo-trang-suc",
        "display_order": 1,
        "is_active":     True,
    }
}

# ── Utility ────────────────────────────────────────────────────────────────
_THUMB_PATTERN = re.compile(r"/thumbnails/\d+/\d+/")

def to_fullsize(url: str) -> str:
    return _THUMB_PATTERN.sub("/detailed/", url)

def strip_html(html: str) -> str:
    return re.sub(r"<[^>]+>", " ", html or "").strip()

def get_feature(features: list, *names) -> str:
    for f in features:
        for n in names:
            if n.lower() in f.get("feature", "").lower():
                return f.get("text", "").strip()
    return ""

def build_description(features: list, raw_description: str,
                      group_products: list) -> str | None:
    """
    Ưu tiên:
      1. full_description (text mô tả sản phẩm từ PNJ)
      2. group_products_data → tên từng món trong bộ
      3. features (chất liệu, trọng lượng nếu có)
    """
    parts = []

    # Thành phần bộ từ group_products_data
    if group_products:
        pieces = [g.get("product", "").strip() for g in group_products if g.get("product")]
        if pieces:
            parts.append("Gồm: " + " | ".join(pieces))

    # features (chất liệu, trọng lượng nếu PNJ có điền)
    mat    = get_feature(features, "chất liệu", "material")
    purity = get_feature(features, "hàm lượng", "tuổi vàng")
    weight = get_feature(features, "trọng lượng tham khảo", "trọng lượng")

    if mat:
        parts.append(f"Chất liệu: {mat}" + (f" ({purity})" if purity else ""))
    if weight:
        parts.append(f"Trọng lượng: {weight}")

    # Mô tả text thuần
    base = strip_html(raw_description)
    # Loại bỏ khoảng trắng thừa do strip_html
    base = re.sub(r"\s+", " ", base).strip()[:1500]
    if base:
        parts.append(base)

    return " | ".join(parts) if parts else None

def map_product_status(price: int) -> str:
    return "INACTIVE" if price <= 0 else "ACTIVE"

def map_variant_status(stock: int) -> str:
    return "AVAILABLE" if stock > 0 else "OUT_OF_STOCK"

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
    Lấy __NEXT_DATA__ từ trang chi tiết.
    Với bộ trang sức PNJ, __NEXT_DATA__.dataServerSide chứa:
      - full_description : mô tả HTML
      - features         : [{"feature": "Giới tính", "text": "Nữ"}, ...]
      - images           : danh sách URL ảnh
      - group_products_data : [{product, product_code, image_link, ...}]
      - price            : giá thực
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

        # Fallback scrape HTML cho trang CS-Cart thuần
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

                // Lấy mô tả text từ tất cả các block description
                const descParts = [];
                document.querySelectorAll(
                    '.mp-block-description p, .ty-product-description p'
                ).forEach(p => {
                    const t = p.textContent?.trim() || '';
                    if (t) descParts.push(t);
                });
                const desc = descParts.join(' ') ||
                    (document.querySelector('.ty-product-description') || {})
                        .textContent?.trim() || '';

                return {
                    images,
                    features,
                    full_description: desc,
                    group_products_data: [],
                };
            }
        """)
        return fallback or None

    except Exception as e:
        print(f"    [!] Lỗi detail {product_url}: {e}")
        return None
    finally:
        await page.close()

# ── Parse 1 sản phẩm ──────────────────────────────────────────────────────
def parse_product(item: dict, detail: dict | None) -> dict:
    sku          = item.get("sku", "")
    product_name = item.get("name", "").strip()
    list_price   = item.get("price", 0)
    product_url  = item.get("url", "")
    list_image   = item.get("image", "")
    gender       = item.get("gender", "")

    description = None
    images      = [list_image] if list_image else []

    variants = [{
        "variant_name":   "Mặc định",
        "size_value":     None,
        "price":          list_price,
        "stock_quantity": 0,
        "status":         map_variant_status(0),
    }]

    if detail:
        features       = detail.get("features", [])
        group_products = detail.get("group_products_data", []) or []
        raw_desc       = detail.get("full_description", "")

        # Lấy giá thực từ detail nếu listing = 0
        if list_price == 0:
            # Thử field "price" trước (có thể là int trực tiếp từ Next.js)
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

        # Build description: group_products + features + full_description
        description = build_description(features, raw_desc, group_products)

        # Ảnh từ detail (ưu tiên hơn listing thumbnail)
        detail_images = detail.get("images", [])
        if detail_images:
            images = [img for img in detail_images if img]

        variants[0]["price"] = list_price

        # Bộ trang sức thường không có size, nhưng vẫn check
        size_prices = detail.get("size_modifier_prices", {})
        if size_prices:
            style_variants = []
            for sz, price_info in size_prices.items():
                p = price_info.get("price") or price_info.get("net_price") or list_price
                style_variants.append({
                    "variant_name":   sz,
                    "size_value":     None,
                    "price":          int(p) if p else list_price,
                    "stock_quantity": 0,
                    "status":         map_variant_status(0),
                })
            if style_variants:
                variants = style_variants

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
        "product": {
            "product_name": product_name,
            "description":  description,
            "base_price":   list_price,
            "status":       map_product_status(list_price),
        },
        "images":   image_list,
        "variants": variants,
        "_meta": {
            "sku":        sku,
            "source_url": product_url,
            "gender":     gender,
        }
    }

# ── Main ──────────────────────────────────────────────────────────────────
async def main():
    print("=" * 60)
    print("PNJ Bộ Trang Sức Crawler v2 — RENGA Schema Edition")
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

            has_desc = "✓desc" if product["product"]["description"] else "✗desc"
            print(
                f"{has_desc}  ({len(product['variants'])} variants, "
                f"{len(product['images'])} ảnh)"
            )

            await asyncio.sleep(DETAIL_DELAY)

        await browser.close()

    # ── Bước 3: Lưu file ──────────────────────────────────────────────────
    import os
    script_dir = os.path.dirname(os.path.abspath(__file__))
    raw_dir    = os.path.join(script_dir, "..", "Raw")
    os.makedirs(raw_dir, exist_ok=True)
    out_path   = os.path.join(raw_dir, "pnj_bo_trang_suc.json")

    output = {
        "crawled_at":  time.strftime("%Y-%m-%d %H:%M:%S"),
        "source":      "pnj.com.vn",
        "price_range": {"min": MIN_PRICE, "max": MAX_PRICE},
        "total":       len(all_products),
        "category":    CATEGORY_DATA,
        "_insert_notes": {
            "step_1": "INSERT category.parent → lấy category_id cha",
            "step_2": "INSERT category.child với parent_id = id cha → lấy category_id con",
            "step_3": "Với mỗi product: INSERT PRODUCT (category_id con, created_by_admin_id) → lấy product_id",
            "step_4": "INSERT PRODUCT_IMAGE với product_id",
            "step_5": "INSERT PRODUCT_VARIANT với product_id",
            "stock_quantity":  "Toàn bộ = 0, cập nhật từ kho thực tế",
            "description_note": "description = tên từng món trong bộ (group_products_data) + mô tả PNJ",
        },
        "products": all_products,
    }

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\n{'='*60}")
    print(f"✅ Xong! Đã crawl {len(all_products)} sản phẩm")
    print(f"📁 Lưu tại: {os.path.abspath(out_path)}")

    # ── Thống kê ──────────────────────────────────────────────────────────
    has_desc     = sum(1 for p in all_products if p["product"]["description"])
    multi_var    = sum(1 for p in all_products if len(p["variants"]) > 1)
    total_images = sum(len(p["images"]) for p in all_products)
    inactive     = sum(1 for p in all_products if p["product"]["status"] == "INACTIVE")
    price_sum    = sum(p["product"]["base_price"] for p in all_products)
    avg          = price_sum // len(all_products) if all_products else 0

    print("\n📊 Thống kê:")
    print(f"  Có description      : {has_desc}/{len(all_products)}")
    print(f"  Có nhiều variants   : {multi_var}/{len(all_products)}")
    print(f"  Tổng ảnh            : {total_images} ({total_images/max(len(all_products),1):.1f} ảnh/sp)")
    print(f"  Status INACTIVE     : {inactive}")
    print(f"  Giá trung bình      : {avg:,}đ")

if __name__ == "__main__":
    asyncio.run(main())