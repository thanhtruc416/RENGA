"""
clean_raw_data.py — RENGA Data Pipeline
=========================================
Clean + Validate nhiều file JSON trang sức PNJ.
Output sẵn sàng INSERT vào MySQL theo schema RENGA.

Đặt file này tại: Data/Preprocessing/clean_raw_data.py

Chạy từ bất kỳ đâu:
    python Data/Preprocessing/clean_raw_data.py
    python clean_raw_data.py
    python clean_raw_data.py --input_dir ../Raw --output_dir Clean

Mặc định:
    input_dir  = <thư mục chứa script>/../Raw   (tức là Data/Raw)
    output_dir = <thư mục chứa script>/Clean    (tức là Data/Preprocessing/Clean)

─────────────────────────────────────────────────────────────────────────────
CÁC BƯỚC XỬ LÝ TỪNG FILE:
  1. load()     : Đọc file JSON raw
  2. clean()    : Bỏ duplicate (cùng SKU+URL), xóa ảnh base64 placeholder
  3. validate() : Loại sp không ảnh, price <= 0, product_name rỗng/quá dài
  4. report()   : In thống kê null + số sp bị loại theo từng lý do
  5. save()     : Lưu file clean JSON vào output_dir
─────────────────────────────────────────────────────────────────────────────
"""

import argparse
import json
import sys
from pathlib import Path


# ── Đường dẫn tự động theo vị trí script ──────────────────────────────────
# Script nằm tại Data/Preprocessing/ → Raw nằm tại Data/Raw/
SCRIPT_DIR  = Path(__file__).resolve().parent
DEFAULT_IN  = str(SCRIPT_DIR.parent / "Raw")           # Data/Raw
DEFAULT_OUT = str(SCRIPT_DIR / "Clean")                 # Data/Preprocessing/Clean

# Chỉ xử lý các file này (theo thứ tự cố định)
TARGET_FILES = [
    "pnj_nhan.json",
    "pnj_day_chuyen.json",
    "pnj_mat_day_chuyen.json",
    "pnj_bong_tai.json",
    "pnj_charm.json",
    "pnj_vong_tay.json",
    "pnj_bo_trang_suc.json",
]


# ══════════════════════════════════════════════════════════════════════════
# STEP 1 — LOAD
# ══════════════════════════════════════════════════════════════════════════

def load(path: Path) -> dict:
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    products = data.get("products", [])
    print(f"✅ Loaded {path.name}: {len(products)} sản phẩm")
    return data


# ══════════════════════════════════════════════════════════════════════════
# STEP 2 — CLEAN
# ══════════════════════════════════════════════════════════════════════════

def _is_placeholder_url(url: str) -> bool:
    """True nếu URL là ảnh giả không nên INSERT vào DB."""
    if not url:
        return True
    if url.startswith("data:"):     # base64 lazy-load placeholder
        return True
    return False


def _clean_images(images: list) -> list:
    """Xóa ảnh placeholder, reset display_order + is_primary."""
    clean = [
        img for img in images
        if not _is_placeholder_url(img.get("image_url", ""))
    ]
    for i, img in enumerate(clean):
        img["display_order"] = i
        img["is_primary"]    = (i == 0)
    return clean


def clean(data: dict) -> tuple[dict, dict]:
    """
    Bước clean:
      - Bỏ duplicate (SKU + source_url)
      - Xóa ảnh base64 placeholder
    Trả về (data đã clean, stats).
    """
    products = data.get("products", [])
    stats    = {"dup_removed": 0, "base64_imgs_removed": 0}

    # ── Dedup ──────────────────────────────────────────────────────────────
    seen:    set  = set()
    deduped: list = []

    for p in products:
        meta = p.get("_meta", {})
        sku  = (meta.get("sku", "") or "").strip()
        url  = (meta.get("source_url", "") or "").strip()
        name = ((p.get("product", p) or {}).get("product_name", "") or "").strip()

        key = (sku, url) if (sku or url) else name
        if key in seen:
            stats["dup_removed"] += 1
            continue
        seen.add(key)
        deduped.append(p)

    # ── Xóa ảnh placeholder ───────────────────────────────────────────────
    for p in deduped:
        imgs_before = p.get("images", [])
        imgs_clean  = _clean_images(imgs_before)
        stats["base64_imgs_removed"] += len(imgs_before) - len(imgs_clean)
        p["images"] = imgs_clean

    data["products"] = deduped
    return data, stats


# ══════════════════════════════════════════════════════════════════════════
# STEP 3 — VALIDATE
# ══════════════════════════════════════════════════════════════════════════

def _validate_product(p: dict) -> str | None:
    """
    Kiểm tra ràng buộc NOT NULL / CHECK của schema MySQL.
    Trả về None nếu hợp lệ, chuỗi mô tả lý do nếu không hợp lệ.
    """
    prod  = p.get("product", p) or {}
    name  = (prod.get("product_name", "") or "").strip()
    price = prod.get("base_price", 0) or 0
    imgs  = p.get("images", [])

    if not imgs:
        return "không có ảnh"
    if not name:
        return "product_name rỗng"
    if len(name) > 255:
        return f"product_name > 255 ký tự ({len(name)})"
    if price <= 0:
        return f"base_price <= 0 ({price})"
    return None


def validate(data: dict) -> tuple[dict, dict]:
    """
    Loại sản phẩm không đạt ràng buộc schema.
    Trả về (data đã validate, stats chi tiết từng lý do).
    """
    products      = data.get("products", [])
    reasons: dict = {}
    kept:    list = []

    for p in products:
        reason = _validate_product(p)
        if reason:
            reasons[reason] = reasons.get(reason, 0) + 1
            continue
        kept.append(p)

    data["products"] = kept
    data["total"]    = len(kept)
    return data, reasons


# ══════════════════════════════════════════════════════════════════════════
# STEP 4 — REPORT
# ══════════════════════════════════════════════════════════════════════════

def report(data: dict, clean_stats: dict, reject_reasons: dict, file_name: str):
    products = data.get("products", [])
    total    = len(products)

    # Null summary
    null_counts = {"description": 0}
    for p in products:
        prod = p.get("product", p) or {}
        if not (prod.get("description") or "").strip():
            null_counts["description"] += 1

    print(f"\n📊 Report — {file_name}")
    print(f"  Còn lại : {total} sản phẩm")

    if clean_stats.get("dup_removed"):
        print(f"  Dedup    : -{clean_stats['dup_removed']} bản trùng")
    if clean_stats.get("base64_imgs_removed"):
        print(f"  Base64   : -{clean_stats['base64_imgs_removed']} ảnh placeholder đã xóa")

    if reject_reasons:
        print(f"  Bị loại  :")
        for reason, count in reject_reasons.items():
            print(f"    - {reason}: {count} sp")

    print(f"  Null fields:")
    any_null = False
    for col, count in null_counts.items():
        if count > 0:
            pct = count / total * 100 if total > 0 else 0
            print(f"    {col:30s}: {count:4d} ({pct:.1f}%)")
            any_null = True
    if not any_null:
        print(f"    ✅ Không có null đáng kể")


# ══════════════════════════════════════════════════════════════════════════
# STEP 5 — SAVE
# ══════════════════════════════════════════════════════════════════════════

def save(data: dict, output_path: Path):
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"💾 Saved → {output_path}")


# ══════════════════════════════════════════════════════════════════════════
# PROCESS 1 FILE
# ══════════════════════════════════════════════════════════════════════════

def process_file(input_path: Path, output_dir: Path):
    print("\n" + "─" * 60)
    print(f"🚀 Processing: {input_path.name}")

    data        = load(input_path)
    before_rows = len(data.get("products", []))

    data, clean_stats    = clean(data)
    data, reject_reasons = validate(data)

    after_rows = len(data.get("products", []))
    print(f"📌 Rows: {before_rows} → {after_rows}")

    report(data, clean_stats, reject_reasons, input_path.name)

    out_name = input_path.stem + "_clean.json"
    save(data, output_dir / out_name)


# ══════════════════════════════════════════════════════════════════════════
# MAIN
# ══════════════════════════════════════════════════════════════════════════

def main():
    parser = argparse.ArgumentParser(description="Clean PNJ JSON files cho RENGA DB")
    parser.add_argument(
        "--input_dir",
        default=DEFAULT_IN,
        help=f"Folder chứa file raw JSON (mặc định: {DEFAULT_IN})"
    )
    parser.add_argument(
        "--output_dir",
        default=DEFAULT_OUT,
        help=f"Folder xuất file clean JSON (mặc định: {DEFAULT_OUT})"
    )
    args = parser.parse_args()

    input_dir  = Path(args.input_dir)
    output_dir = Path(args.output_dir)

    if not input_dir.exists():
        print(f"❌ Không tìm thấy folder: {input_dir}")
        print(f"   Script đang ở       : {SCRIPT_DIR}")
        print(f"   Đang tìm Raw tại    : {input_dir.resolve()}")
        print(f"   Dùng --input_dir để chỉ đường dẫn thủ công nếu cần.")
        sys.exit(1)

    output_dir.mkdir(parents=True, exist_ok=True)

    json_files = [input_dir / f for f in TARGET_FILES if (input_dir / f).exists()]
    missing    = [f for f in TARGET_FILES if not (input_dir / f).exists()]

    print("=" * 60)
    print("RENGA Data Pipeline — clean_raw_data.py")
    print(f"📥 Input : {input_dir.resolve()}")
    print(f"📤 Output: {output_dir.resolve()}")
    print(f"📁 Found : {len(json_files)}/{len(TARGET_FILES)} file")
    if missing:
        print(f"⚠️  Missing: {', '.join(missing)}")
    print("=" * 60)

    total_before = total_after = 0

    for file in json_files:
        before = len(json.loads(file.read_text(encoding="utf-8")).get("products", []))
        try:
            process_file(file, output_dir)
            out_path = output_dir / (file.stem + "_clean.json")
            after    = len(json.loads(out_path.read_text(encoding="utf-8")).get("products", []))
            total_before += before
            total_after  += after
        except Exception as e:
            print(f"❌ Error processing {file.name}: {e}")
            total_before += before

    print("\n" + "=" * 60)
    print(f"✅ DONE — Đã xử lý {len(json_files)} file")
    print(f"   Tổng trước : {total_before} sản phẩm")
    print(f"   Tổng sau   : {total_after} sản phẩm")
    print(f"   Đã loại    : {total_before - total_after} sản phẩm")
    print("=" * 60)


if __name__ == "__main__":
    main()