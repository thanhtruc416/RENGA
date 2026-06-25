"""
RENGA - Fetch TRYON (top-down) images
======================================
PNJ image naming:
  -1.png  / -01.png  → ảnh chính (GALLERY, is_primary)
  -2.png  / -02.png  → ảnh chính diện top-down  → TRYON

Script này:
  1. Lấy primary image URL của mỗi product từ DB
  2. Thay suffix -1.png → -2.png, check URL tồn tại
  3. Upsert vào PRODUCT_IMAGE với image_type='TRYON'

Usage:
    python Data/scripts/fetch_tryon.py               # toàn bộ
    python Data/scripts/fetch_tryon.py --limit 10    # test 10 sản phẩm
    python Data/scripts/fetch_tryon.py --id PRD000001
"""

import os
import re
import sys
import time
import pymysql
import pymysql.cursors
import requests
from pathlib import Path
from dotenv import load_dotenv

# ── Config ────────────────────────────────────────────────────────────────
ROOT_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv(ROOT_DIR / ".env")
REQUEST_DELAY = 0.3   # giây giữa 2 HEAD request

# ── DB ────────────────────────────────────────────────────────────────────
def get_conn():
    return pymysql.connect(
        host        = os.getenv("DB_HOST", "localhost"),
        port        = int(os.getenv("DB_PORT", 3306)),
        user        = os.getenv("DB_USER", "root"),
        password    = os.getenv("DB_PASSWORD", ""),
        database    = os.getenv("DB_NAME", "renga"),
        charset     = "utf8mb4",
        cursorclass = pymysql.cursors.Cursor,
    )

# ── Tạo URL ảnh top-down từ URL ảnh chính ────────────────────────────────
def get_tryon_candidate(primary_url: str) -> str | None:
    """
    Lấy số cuối trong URL, cộng thêm 1 → ảnh top-down kế tiếp.
    sp-...-1.jpg  → sp-...-2.jpg
    sp-...-01.png → sp-...-02.png
    sp-...-001.jpg → sp-...-002.jpg
    """
    match = re.search(r"-(\d{1,3})\.(png|jpg)$", primary_url)
    if not match:
        return None
    num      = int(match.group(1))
    ext      = match.group(2)
    pad      = len(match.group(1))          # giữ nguyên số chữ số (01 → 02)
    next_num = str(num + 1).zfill(pad)
    return primary_url[:match.start()] + f"-{next_num}.{ext}"

def url_exists(url: str) -> bool:
    try:
        r = requests.head(url, timeout=6, allow_redirects=True)
        return r.status_code == 200
    except Exception:
        return False

# ── Upsert PRODUCT_IMAGE ──────────────────────────────────────────────────
def upsert_tryon(cur, product_id: str, tryon_url: str):
    # Xóa TRYON cũ nếu có
    cur.execute(
        "DELETE FROM PRODUCT_IMAGE WHERE product_id=%s AND image_type='TRYON'",
        (product_id,),
    )
    # Lấy display_order max hiện tại
    cur.execute(
        "SELECT COALESCE(MAX(display_order),0) FROM PRODUCT_IMAGE WHERE product_id=%s",
        (product_id,),
    )
    next_order = cur.fetchone()[0] + 1
    image_id   = f"TRY{product_id[-8:]}"
    cur.execute(
        """
        INSERT INTO PRODUCT_IMAGE
            (image_id, product_id, image_url, is_primary, display_order, image_type)
        VALUES (%s, %s, %s, 0, %s, 'TRYON')
        """,
        (image_id, product_id, tryon_url, next_order),
    )

# ── Main ──────────────────────────────────────────────────────────────────
def main():
    limit     = None
    target_id = None
    args = sys.argv[1:]
    if "--limit" in args:
        limit = int(args[args.index("--limit") + 1])
    if "--id" in args:
        target_id = args[args.index("--id") + 1]

    conn = get_conn()
    cur  = conn.cursor()

    # Lấy primary image của mỗi product
    if target_id:
        cur.execute(
            "SELECT product_id, image_url FROM PRODUCT_IMAGE "
            "WHERE product_id=%s AND is_primary=1 LIMIT 1",
            (target_id,),
        )
    else:
        query = (
            "SELECT product_id, image_url FROM PRODUCT_IMAGE "
            "WHERE is_primary=1"
            + (f" LIMIT {limit}" if limit else "")
        )
        cur.execute(query)

    products = cur.fetchall()
    total    = len(products)
    print(f"{'='*55}")
    print(f"  fetch_tryon.py  —  {total} san pham")
    print(f"{'='*55}\n")

    ok = skip = fail = 0

    for i, (product_id, primary_url) in enumerate(products, 1):
        candidate = get_tryon_candidate(primary_url)

        if not candidate:
            print(f"  [{i:4d}/{total}] {product_id}  SKIP  (URL khong match pattern)")
            skip += 1
            continue

        exists = url_exists(candidate)
        status = "OK  " if exists else "FAIL"
        print(f"  [{i:4d}/{total}] {product_id}  {status}  {candidate.split('/')[-1]}")

        if exists:
            upsert_tryon(cur, product_id, candidate)
            conn.commit()
            ok += 1
        else:
            fail += 1

        time.sleep(REQUEST_DELAY)

    cur.close()
    conn.close()

    print(f"\n{'='*55}")
    print(f"  OK: {ok}  |  SKIP: {skip}  |  FAIL: {fail}")
    print(f"{'='*55}")

if __name__ == "__main__":
    main()
