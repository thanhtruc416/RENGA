"""
RENGA - PNJ Data Transformer
Usage: python Transform.py
"""

import sys
import json
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

script_dir  = Path(__file__).resolve().parent
clean_dir   = script_dir / "Preprocessing" / "Clean"
mock_dir    = script_dir / "Mock"
output_path = mock_dir / "06_product.json"

PNJ_FILES = [
    "pnj_nhan_clean.json",
    "pnj_day_chuyen_clean.json",
    "pnj_mat_day_chuyen_clean.json",
    "pnj_bong_tai_clean.json",
    "pnj_charm_clean.json",
    "pnj_vong_tay_clean.json",
    "pnj_bo_trang_suc_clean.json",
]

DEFAULT_ADMIN_ID = "EMP000001"

PNJ_SLUG_TO_MOCK_SLUG = {
    "nhan":           "nhan",
    "day-chuyen":     "day-chuyen",
    "mat-day-chuyen": "mat-day-chuyen",
    "bong-tai":       "hoa-tai",
    "charm":          "charm",
    "vong-tay":       "lac-tay",
    "bo-trang-suc":   "bo-trang-suc",
}


def build_category_map(categories: list) -> dict:
    return {cat["slug"]: cat["category_id"] for cat in categories}


def resolve_category_id(category_raw, category_map: dict):
    if isinstance(category_raw, str):
        slug_map = {"Nhẫn": "nhan"}
        pnj_slug = slug_map.get(category_raw, category_raw.lower().replace(" ", "-"))
    elif isinstance(category_raw, dict):
        child  = category_raw.get("child")
        parent = category_raw.get("parent")
        pnj_slug = child["slug"] if child else (parent["slug"] if parent else None)
    else:
        return None
    mock_slug = PNJ_SLUG_TO_MOCK_SLUG.get(pnj_slug, pnj_slug)
    return category_map.get(mock_slug)


def normalize_item(item: dict) -> dict:
    """
    Chuẩn hóa về flat format dù item là flat hay nested.
    - flat  (pnj_nhan): item có sku, product_name, images, variants trực tiếp
    - nested (còn lại): item = { product: {...}, images: [...], variants: [...], _meta: {sku, ...} }
    """
    if "product" in item and "_meta" in item:
        # nested format
        prod = item["product"]
        meta = item["_meta"]
        return {
            "sku":          meta.get("sku", ""),
            "product_name": prod.get("product_name", ""),
            "description":  prod.get("description", ""),
            "base_price":   prod.get("base_price", 0),
            "status":       prod.get("status", "ACTIVE"),
            "images":       item.get("images", []),
            "variants":     item.get("variants", []),
        }
    else:
        # flat format
        return {
            "sku":          item.get("sku", ""),
            "product_name": item.get("product_name", ""),
            "description":  item.get("description", ""),
            "base_price":   item.get("base_price", 0),
            "status":       item.get("status", "ACTIVE"),
            "images":       item.get("images", []),
            "variants":     item.get("variants", []),
        }


def transform(existing: dict) -> dict:
    categories       = existing.get("CATEGORY", [])
    category_map     = build_category_map(categories)

    products         = list(existing.get("PRODUCT", []))
    product_images   = list(existing.get("PRODUCT_IMAGE", []))
    product_variants = list(existing.get("PRODUCT_VARIANT", []))

    # Lấy SKU đã có để tránh duplicate
    existing_skus = set()
    for p in products:
        desc = p.get("description", "")
        if desc.startswith("[SKU:"):
            sku = desc.split("]")[0].replace("[SKU:", "")
            existing_skus.add(sku)

    prod_counter    = max((int(p["product_id"][3:])  for p in products         if p["product_id"][3:].isdigit()), default=0)
    img_counter     = max((int(i["image_id"][3:])    for i in product_images   if i["image_id"][3:].isdigit()),   default=0)
    variant_counter = max((int(v["variant_id"][3:])  for v in product_variants if v["variant_id"][3:].isdigit()), default=0)

    for filename in PNJ_FILES:
        filepath = clean_dir / filename
        if not filepath.exists():
            print(f"  [SKIP] Không tìm thấy: {filepath}")
            continue

        with open(filepath, encoding="utf-8") as f:
            pnj_data = json.load(f)

        category_raw = pnj_data.get("category")
        category_id  = resolve_category_id(category_raw, category_map)
        pnj_products = pnj_data.get("products", [])

        added = skipped = 0

        for raw_item in pnj_products:
            item = normalize_item(raw_item)
            sku  = item["sku"]

            if not sku or sku in existing_skus or not category_id:
                skipped += 1
                continue

            # PRODUCT
            prod_counter += 1
            product_id = f"PNJ{prod_counter:06d}"
            existing_skus.add(sku)

            products.append({
                "product_id":          product_id,
                "category_id":         category_id,
                "product_name":        item["product_name"],
                "description":         f"[SKU:{sku}] " + (item["description"] or ""),
                "base_price":          item["base_price"],
                "status":              item["status"],
                "created_by_admin_id": DEFAULT_ADMIN_ID,
                "created_at":          "2024-01-01T00:00:00",
                "updated_at":          "2024-01-01T00:00:00",
            })

            # PRODUCT_IMAGE
            for img in item["images"]:
                img_counter += 1
                product_images.append({
                    "image_id":      f"IMG{img_counter:06d}",
                    "product_id":    product_id,
                    "image_url":     img.get("image_url", ""),
                    "is_primary":    img.get("is_primary", False),
                    "display_order": img.get("display_order", 0),
                })

            # PRODUCT_VARIANT
            variants = item["variants"]
            if variants:
                for var in variants:
                    variant_counter += 1
                    product_variants.append({
                        "variant_id":     f"VAR{variant_counter:06d}",
                        "product_id":     product_id,
                        "variant_name":   var.get("variant_name", "Mặc định"),
                        "size_value":     var.get("size_value"),
                        "price":          var.get("price", item["base_price"]),
                        "stock_quantity": var.get("stock_quantity", 0),
                        "status":         var.get("status", "AVAILABLE"),
                    })
            else:
                variant_counter += 1
                product_variants.append({
                    "variant_id":     f"VAR{variant_counter:06d}",
                    "product_id":     product_id,
                    "variant_name":   "Mặc định",
                    "size_value":     None,
                    "price":          item["base_price"],
                    "stock_quantity": 10,
                    "status":         "AVAILABLE",
                })

            added += 1

        print(f"  {filename}: +{added} added | {skipped} skipped")

    return {
        "CATEGORY":        categories,
        "PRODUCT":         products,
        "PRODUCT_IMAGE":   product_images,
        "PRODUCT_VARIANT": product_variants,
    }


def main():
    print("=== RENGA PNJ Transformer ===\n")

    if output_path.exists():
        with open(output_path, encoding="utf-8") as f:
            existing = json.load(f)
        print(f"Đọc {output_path.name}: {len(existing.get('PRODUCT', []))} products hiện có\n")
    else:
        print(f"[WARN] Không tìm thấy {output_path} — tạo mới\n")
        existing = {"CATEGORY": [], "PRODUCT": [], "PRODUCT_IMAGE": [], "PRODUCT_VARIANT": []}

    result = transform(existing)

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(f"\n✅ Ghi ra {output_path.name}")
    print(f"   PRODUCT:         {len(result['PRODUCT'])}")
    print(f"   PRODUCT_IMAGE:   {len(result['PRODUCT_IMAGE'])}")
    print(f"   PRODUCT_VARIANT: {len(result['PRODUCT_VARIANT'])}")


if __name__ == "__main__":
    main()