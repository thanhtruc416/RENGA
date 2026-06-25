"""
PNJ Nhẫn Crawler (Fixed)
========================
"""

import asyncio
import json
import re
import time
from playwright.async_api import async_playwright

# ── Cấu hình ──────────────────────────────────────────────────────────────
CATEGORY_ID   = 639
PAGE_LIMIT    = 40
MIN_PRICE     = 500_000
MAX_PRICE     = 50_000_000
MAX_PRODUCTS  = 500
DETAIL_DELAY  = 1.2

LIST_API = (
    "https://edge-cf-api.pnj.io/ecom-frontend/v1/get-product-list"
    f"?limit={PAGE_LIMIT}&category_ids={CATEGORY_ID}&page={{page}}"
)

MATERIAL_MAP = {
    "vàng trắng": "GOLD",
    "vàng hồng":  "ROSE_GOLD",
    "rose gold":  "ROSE_GOLD",
    "bạch kim":   "PLATINUM",
    "platinum":   "PLATINUM",
    "bạc":        "SILVER",
    "silver":     "SILVER",
    "vàng":       "GOLD",
    "gold":       "GOLD",
}

STONE_MAP = {
    "kim cương":  "DIAMOND",
    "diamond":    "DIAMOND",
    "ruby":       "RUBY",
    "hồng ngọc":  "RUBY",
    "sapphire":   "SAPPHIRE",
    "xa-phia":    "SAPPHIRE",
    "emerald":    "EMERALD",
    "ngọc lục":   "EMERALD",
    "ngọc trai":  "PEARL",
    "pearl":      "PEARL",
}

# Giá base cho từng loại đá (dùng khi PNJ không expose)
STONE_BASE_PRICE = {
    "DIAMOND":  5_000_000,
    "RUBY":     2_000_000,
    "SAPPHIRE": 1_500_000,
    "EMERALD":  1_500_000,
    "PEARL":      500_000,
    "OTHER":      200_000,
}

# price_modifier cho từng loại chất liệu
MATERIAL_PRICE_MODIFIER = {
    "PLATINUM":  2_000_000,
    "GOLD":              0,
    "ROSE_GOLD":         0,
    "SILVER":   -500_000,
}

def parse_material_type(text: str) -> str:
    t = text.lower()
    for keyword, mtype in MATERIAL_MAP.items():
        if keyword in t:
            return mtype
    return "GOLD"

def parse_stone_type(text: str) -> str:
    t = text.lower()
    for keyword, stype in STONE_MAP.items():
        if keyword in t:
            return stype
    return "OTHER"

def get_feature(features: list, *names) -> str:
    for f in features:
        for n in names:
            if n.lower() in f.get("feature", "").lower():
                return f.get("text", "").strip()
    return ""

def strip_html(html: str) -> str:
    return re.sub(r"<[^>]+>", " ", html or "").strip()

def parse_carat(stone_size_text: str) -> float | None:
    """Parse carat từ text như '0.05ct', '1.5 ct', '2.0 carat'"""
    if not stone_size_text:
        return None
    match = re.search(r"([\d.]+)\s*(?:ct|carat)", stone_size_text.lower())
    if match:
        try:
            return float(match.group(1))
        except ValueError:
            pass
    return None

# ── Crawl listing ─────────────────────────────────────────────────────────
async def fetch_listing_page(context, page_num: int) -> dict:
    url = LIST_API.format(page=page_num)
    page = await context.new_page()
    try:
        result = await page.evaluate(f"""
            async () => {{
                const r = await fetch("{url}");
                return await r.json();
            }}
        """)
        return result
    finally:
        await page.close()

# ── Crawl detail ──────────────────────────────────────────────────────────
async def fetch_product_detail(context, product_url: str) -> dict:
    page = await context.new_page()
    try:
        await page.goto(product_url, timeout=30000, wait_until="domcontentloaded")
        await page.wait_for_timeout(2000)

        # Đọc __NEXT_DATA__ → props.pageProps.dataServerSide
        raw = await page.evaluate("""
            () => {
                const nd = window.__NEXT_DATA__;
                if (!nd) return null;
                return nd.props?.pageProps?.dataServerSide || null;
            }
        """)
        return raw
    except Exception as e:
        print(f"    [!] Lỗi detail {product_url}: {e}")
        return None
    finally:
        await page.close()

# ── Parse 1 sản phẩm ──────────────────────────────────────────────────────
def parse_product(item: dict, detail: dict | None) -> dict:
    sku          = item.get("sku_13", "")
    product_name = item.get("name", "").strip()
    list_price   = item.get("price", 0)
    product_url  = item.get("url", "")
    list_image   = item.get("image", "")
    gender       = item.get("gender", "")

    material_name     = ""
    material_type     = "GOLD"
    price_modifier    = 0
    stone_name        = None
    stone_type        = None
    stone_base_price  = None
    stone_size_label  = None
    stone_carat       = None
    weight            = ""
    description       = ""
    images            = [list_image] if list_image else []
    variants          = []

    if detail:
        features  = detail.get("features", [])
        purity_raw = get_feature(features, "hàm lượng")

        # ── Chất liệu ──
        name_lower = product_name.lower()
        if "bạch kim" in name_lower:
            material_name = "Bạch kim"
            material_type = "PLATINUM"
        elif "vàng hồng" in name_lower or "rose gold" in name_lower:
            material_name = "Vàng hồng"
            material_type = "ROSE_GOLD"
        elif "vàng trắng" in name_lower:
            material_name = "Vàng trắng"
            material_type = "GOLD"
        elif "bạc" in name_lower:
            material_name = "Bạc 925"
            material_type = "SILVER"
        elif "18k" in name_lower or "75%" in name_lower or purity_raw == "7500":
            material_name = "Vàng 18K"
            material_type = "GOLD"
        elif "14k" in name_lower or "58.5%" in name_lower or "58,5%" in name_lower or purity_raw == "5850":
            material_name = "Vàng 14K"
            material_type = "GOLD"
        elif "10k" in name_lower or "41.6%" in name_lower or "41,6%" in name_lower:
            material_name = "Vàng 10K"
            material_type = "GOLD"
        elif "vàng" in name_lower:
            material_name = get_feature(features, "chất liệu") or "Vàng"
            material_type = "GOLD"
        else:
            mat_raw = get_feature(features, "chất liệu", "material")
            material_name = mat_raw or ""
            material_type = parse_material_type(product_name + " " + mat_raw)

        price_modifier = MATERIAL_PRICE_MODIFIER.get(material_type, 0)

        # ── Đá chủ ──
        stone_raw = get_feature(features, "loại đá chính", "loại đá")
        if stone_raw:
            stone_name       = stone_raw.strip()
            stone_type       = parse_stone_type(stone_name)
            stone_base_price = STONE_BASE_PRICE.get(stone_type, STONE_BASE_PRICE["OTHER"])

            # Kích thước đá
            stone_size_text  = get_feature(features, "kích thước đá chính")
            stone_size_label = stone_size_text or None
            stone_carat      = parse_carat(stone_size_text)

        # ── Trọng lượng ──
        weight = get_feature(features, "trọng lượng tham khảo")

        # ── Mô tả ──
        description = strip_html(detail.get("full_description", ""))[:2000]

        # ── Ảnh — lấy từ detail.images (list URL thật) ──
        # Cấu trúc: ["url1.jpg", "url2.png", ...]
        detail_images = detail.get("images", [])
        if detail_images:
            images = detail_images   # list string URL

        # ── Variant theo size_modifier_prices ──
        # Cấu trúc: {"15": {"price": 13174000, "net_price": 0}, ...}
        size_prices = detail.get("size_modifier_prices", {})
        if size_prices:
            for sz, price_info in size_prices.items():
                p = price_info.get("price") or price_info.get("net_price") or list_price
                if MIN_PRICE <= p <= MAX_PRICE:
                    variants.append({
                        "variant_name":   f"Size {sz}",
                        "size_value":     sz,
                        "price":          p,
                        "stock_quantity": 0,
                        "status":         "AVAILABLE"
                    })
        else:
            # Không có size_modifier → fallback sizes từ listing
            sizes_raw = item.get("sizes", [])
            for sz in sizes_raw:
                variants.append({
                    "variant_name":   f"Size {sz}",
                    "size_value":     sz,
                    "price":          list_price,
                    "stock_quantity": 0,
                    "status":         "AVAILABLE"
                })

    # Không có variant nào
    if not variants:
        variants.append({
            "variant_name":   "Mặc định",
            "size_value":     None,
            "price":          list_price,
            "stock_quantity": 0,
            "status":         "AVAILABLE"
        })

    # base_price = giá thấp nhất trong variants
    base_price = min(v["price"] for v in variants) if variants else list_price

    # ── Format ảnh → PRODUCT_IMAGE ──
    image_list = []
    for idx, url in enumerate(images):
        if url:
            image_list.append({
                "image_url":     url,
                "is_primary":    idx == 0,
                "display_order": idx
            })

    return {
        # PRODUCT
        "sku":              sku,
        "product_name":     product_name,
        "category":         "Nhẫn",
        "source_url":       product_url,
        "base_price":       base_price,
        "description":      description,
        "weight":           weight,
        "gender":           gender,
        "status":           "ACTIVE",

        # MATERIAL
        "material_name":    material_name,
        "material_type":    material_type,
        "price_modifier":   price_modifier,

        # STONE (nếu có)
        "stone_name":       stone_name,
        "stone_type":       stone_type,
        "stone_base_price": stone_base_price,
        "stone_size_label": stone_size_label,
        "stone_carat":      stone_carat,

        # PRODUCT_IMAGE
        "images":           image_list,

        # PRODUCT_VARIANT
        "variants":         variants,
    }

# ── Main ──────────────────────────────────────────────────────────────────
async def main():
    print("=" * 60)
    print("PNJ Nhẫn Crawler")
    print(f"Giá: {MIN_PRICE:,}đ – {MAX_PRICE:,}đ")
    print("=" * 60)

    all_products = []

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0.0.0 Safari/537.36"
            )
        )

        # ── Bước 1: Listing ───────────────────────────────────────────────
        print("\n[1] Lấy danh sách sản phẩm...")
        page_num = 1
        raw_items = []

        while True:
            print(f"  Trang {page_num}...", end=" ")
            data = await fetch_listing_page(context, page_num)
            items = data.get("data", [])
            total = data.get("totalRecords", 0)

            if not items:
                print("hết dữ liệu.")
                break

            in_range = [i for i in items if MIN_PRICE <= i.get("price", 0) <= MAX_PRICE]
            raw_items.extend(in_range)
            print(f"lấy {len(in_range)}/{len(items)} (tổng: {len(raw_items)})")

            if len(raw_items) >= MAX_PRODUCTS:
                raw_items = raw_items[:MAX_PRODUCTS]
                print(f"  → Đủ {MAX_PRODUCTS} sản phẩm, dừng.")
                break

            if page_num * PAGE_LIMIT >= total:
                print(f"  → Đã hết {total} sản phẩm")
                break

            page_num += 1
            await asyncio.sleep(0.5)

        print(f"\n  ✅ Tổng: {len(raw_items)} sản phẩm")

        # ── Bước 2: Detail ────────────────────────────────────────────────
        print(f"\n[2] Crawl detail ({DETAIL_DELAY}s/trang)...")

        for idx, item in enumerate(raw_items, 1):
            name = item.get("name", "")[:50]
            url  = item.get("url", "")
            print(f"  [{idx:3d}/{len(raw_items)}] {name}...", end=" ")

            detail  = await fetch_product_detail(context, url)
            product = parse_product(item, detail)
            all_products.append(product)

            v_count = len(product["variants"])
            i_count = len(product["images"])
            carat   = product.get("stone_carat")
            carat_str = f", {carat}ct" if carat else ""
            print(f"✓ ({v_count} sizes, {i_count} ảnh{carat_str})")

            await asyncio.sleep(DETAIL_DELAY)

        await browser.close()

    # ── Bước 3: Lưu ──────────────────────────────────────────────────────
    import os
    script_dir = os.path.dirname(os.path.abspath(__file__))
    raw_dir    = os.path.join(script_dir, "..", "Raw")
    os.makedirs(raw_dir, exist_ok=True)
    out_path   = os.path.join(raw_dir, "pnj_nhan.json")

    output = {
        "crawled_at":  time.strftime("%Y-%m-%d %H:%M:%S"),
        "source":      "pnj.com.vn",
        "category":    "Nhẫn",
        "price_range": {"min": MIN_PRICE, "max": MAX_PRICE},
        "total":       len(all_products),
        "products":    all_products
    }

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\n{'='*60}")
    print(f"✅ Xong! {len(all_products)} sản phẩm")
    print(f"📁 {os.path.abspath(out_path)}")

    # ── Thống kê ──────────────────────────────────────────────────────────
    by_material, by_stone, has_carat = {}, {}, 0
    for p in all_products:
        mt = p["material_type"]
        by_material[mt] = by_material.get(mt, 0) + 1
        if p.get("stone_type"):
            st = p["stone_type"]
            by_stone[st] = by_stone.get(st, 0) + 1
        if p.get("stone_carat"):
            has_carat += 1

    print("\n📊 Thống kê:")
    print("  Chất liệu:")
    for k, v in sorted(by_material.items(), key=lambda x: -x[1]):
        print(f"    {k}: {v}")
    print("  Đá:")
    for k, v in sorted(by_stone.items(), key=lambda x: -x[1]):
        print(f"    {k}: {v}")
    print(f"  Có carat: {has_carat}/{len(all_products)}")

if __name__ == "__main__":
    asyncio.run(main())