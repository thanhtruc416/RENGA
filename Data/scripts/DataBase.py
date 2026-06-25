"""
RENGA - Mock Data Loader
Đọc các file JSON từ Data/Mock/ và INSERT vào MySQL database.

Usage:
    python Data/DataBase.py                        # load toàn bộ (INSERT IGNORE)
    python Data/DataBase.py --reload 04_studio     # xóa + insert lại 1 file
    python Data/DataBase.py --reload all           # xóa toàn bộ + insert lại
"""

import json
import os
import sys
import pymysql
import pymysql.cursors
from pathlib import Path
from dotenv import load_dotenv

# ============================================================
# Paths
# ============================================================
SCRIPT_DIR = Path(__file__).resolve().parent
ROOT_DIR   = SCRIPT_DIR.parent.parent        # project root
MOCK_DIR   = SCRIPT_DIR.parent / "Mock"      # Data/Mock/

load_dotenv(ROOT_DIR / ".env")

# ============================================================
# Thứ tự INSERT — parent table trước, child table sau
# ============================================================
INSERT_ORDER = [
    ("01_prerequisite.json", "MEMBER_TIER"),
    ("01_prerequisite.json", "TIER_BENEFIT"),
    ("02_employee.json",     "EMPLOYEE"),
    ("02_employee.json",     "ADMIN"),
    ("02_employee.json",     "DESIGNER"),
    ("03_customer.json",     "CLIENT"),
    ("03_customer.json",     "CUSTOMER"),
    ("03_customer.json",     "GUEST"),
    ("03_customer.json",     "ACCOUNT"),
    ("03_customer.json",     "ADDRESS"),
    ("04_studio.json",       "BLANK_FORM"),
    ("04_studio.json",       "MATERIAL"),
    ("04_studio.json",       "STONE"),
    ("04_studio.json",       "STONE_SIZE"),
    ("04_studio.json",       "BLANK_STONE"),
    ("04_studio.json",       "ENGRAVING_CONFIG"),
    ("04_studio.json",       "PROCESSING_FEE"),
    ("04_studio.json",       "CUSTOMIZATION"),
    ("04_studio.json",       "SAVED_CUSTOM"),
    ("05_schedule.json",     "DESIGNER_SCHEDULE"),
    ("05_schedule.json",     "APPOINTMENT_SLOT"),
    ("06_product.json",      "CATEGORY"),
    ("06_product.json",      "PRODUCT"),
    ("06_product.json",      "PRODUCT_IMAGE"),
    ("06_product.json",      "PRODUCT_VARIANT"),
    ("08_payment.json",      "VOUCHER"),
    ("08_payment.json",      "CUSTOMER_VOUCHER"),
    ("07_order.json",        "CART"),
    ("07_order.json",        "CART_ITEM"),
    ("07_order.json",        "ORDER"),
    ("09_appointment.json",  "APPOINTMENT"),
    ("09_appointment.json",  "DESIGN"),
    ("09_appointment.json",  "DESIGN_DRAFT"),
    ("07_order.json",        "ORDER_ITEM"),
    ("07_order.json",        "ORDER_STATUS_HISTORY"),
    ("08_payment.json",      "PAYMENT"),
    ("08_payment.json",      "PAYMENT_LOG"),
    ("08_payment.json",      "LOYALTY_TRANSACTION"),
    ("10_interaction.json",  "REVIEW"),
    ("10_interaction.json",  "QUESTION"),
    ("10_interaction.json",  "FAQ"),
    ("11_postcare.json",     "WARRANTY_REQUEST"),
    ("11_postcare.json",     "REPAIR_QUOTE"),
    ("11_postcare.json",     "CANCELLATION_REQUEST"),
    ("11_postcare.json",     "RETURN_REQUEST"),
    ("11_postcare.json",     "REFUND"),
    ("12_chatbot.json",      "CHATBOT_SESSION"),
    ("12_chatbot.json",      "CHATBOT_MESSAGE"),
    ("13_notification.json", "NOTIFICATION"),
]

# Thứ tự DELETE khi reload — ngược lại INSERT (child trước, parent sau)
DELETE_ORDER = [t for _, t in reversed(INSERT_ORDER)]


# ============================================================
# Helpers
# ============================================================

def load_config() -> dict:
    return {
        "host":     os.getenv("DB_HOST", "localhost"),
        "port":     int(os.getenv("DB_PORT", 3306)),
        "user":     os.getenv("DB_USER", "root"),
        "password": os.getenv("DB_PASSWORD", ""),
        "database": os.getenv("DB_NAME", "renga"),
    }


def load_mock(filename: str) -> dict:
    path = MOCK_DIR / filename
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def get_tables_for_file(filename: str) -> list[str]:
    """Trả về danh sách tables thuộc về file đó (theo thứ tự INSERT)."""
    return [t for f, t in INSERT_ORDER if f == filename]


def insert_table(cursor, table: str, rows: list) -> int:
    if not rows:
        return 0
    columns = list(rows[0].keys())
    col_sql = ", ".join(f"`{c}`" for c in columns)
    val_sql = ", ".join(["%s"] * len(columns))
    sql     = f"INSERT IGNORE INTO `{table}` ({col_sql}) VALUES ({val_sql})"
    data    = [tuple(row.get(c) for c in columns) for row in rows]
    cursor.executemany(sql, data)
    return cursor.rowcount


def delete_table(cursor, table: str) -> int:
    cursor.execute(f"DELETE FROM `{table}`")
    return cursor.rowcount


# ============================================================
# Modes
# ============================================================

def run_insert_all(cur, file_cache: dict) -> tuple[int, int]:
    """INSERT IGNORE toàn bộ — bỏ qua record đã tồn tại."""
    total, errors = 0, 0
    for filename, table in INSERT_ORDER:
        if filename not in file_cache:
            try:
                file_cache[filename] = load_mock(filename)
            except FileNotFoundError:
                print(f"  [SKIP] File not found: {filename}")
                continue
        rows = file_cache[filename].get(table, [])
        if not rows:
            continue
        try:
            n = insert_table(cur, table, rows)
            total += n
            print(f"  {table:<30} {len(rows):>5} records  =>  {'+'+str(n) if n else '0 (dup)'}")
        except pymysql.Error as e:
            errors += 1
            print(f"  [ERROR] {table}: {e}")
    return total, errors


def run_reload_file(cur, filename: str, file_cache: dict) -> tuple[int, int]:
    """Xóa và insert lại các tables thuộc file chỉ định."""
    tables = get_tables_for_file(filename)
    if not tables:
        print(f"  [ERROR] File '{filename}' not found in INSERT_ORDER")
        return 0, 1

    # Load data trước khi xóa
    try:
        file_cache[filename] = load_mock(filename)
    except FileNotFoundError:
        print(f"  [ERROR] File does not exist: {filename}")
        return 0, 1

    # DELETE theo thứ tự ngược (child trước)
    print(f"  Deleting old data...")
    for table in reversed(tables):
        try:
            n = delete_table(cur, table)
            print(f"    DELETE {table:<28} {n} rows")
        except pymysql.Error as e:
            print(f"    [ERROR] DELETE {table}: {e}")

    # INSERT lại
    total, errors = 0, 0
    print(f"  Inserting new data...")
    for table in tables:
        rows = file_cache[filename].get(table, [])
        if not rows:
            continue
        try:
            n = insert_table(cur, table, rows)
            total += n
            print(f"    INSERT {table:<28} +{n} rows")
        except pymysql.Error as e:
            errors += 1
            print(f"    [ERROR] INSERT {table}: {e}")

    return total, errors


def run_reload_all(cur, file_cache: dict) -> tuple[int, int]:
    """Xóa toàn bộ rồi insert lại từ đầu."""
    print("  Deleting all data...")
    for table in DELETE_ORDER:
        try:
            n = delete_table(cur, table)
            if n:
                print(f"    DELETE {table:<28} {n} rows")
        except pymysql.Error as e:
            print(f"    [ERROR] DELETE {table}: {e}")

    print("\n  Re-inserting all data...")
    return run_insert_all(cur, file_cache)


# ============================================================
# Main
# ============================================================

def main():
    # Parse args: --reload <file|all>
    reload_target = None
    args = sys.argv[1:]
    if "--reload" in args:
        idx = args.index("--reload")
        if idx + 1 < len(args):
            reload_target = args[idx + 1]
            # Thêm .json nếu thiếu
            if reload_target != "all" and not reload_target.endswith(".json"):
                reload_target += ".json"
        else:
            print("Usage: python DataBase.py --reload <filename|all>")
            return

    print("=" * 55)
    print("  RENGA Mock Data Loader")
    if reload_target:
        label = "RELOAD ALL" if reload_target == "all" else f"RELOAD {reload_target}"
        print(f"  Mode: {label}")
    print("=" * 55)

    cfg = load_config()
    print(f"\nConnecting {cfg['user']}@{cfg['host']}:{cfg['port']}/{cfg['database']}\n")

    try:
        conn = pymysql.connect(
            host        = cfg["host"],
            port        = int(cfg["port"]),
            user        = cfg["user"],
            password    = cfg["password"],
            database    = cfg["database"],
            charset     = "utf8mb4",
            cursorclass = pymysql.cursors.Cursor,
        )
    except pymysql.Error as e:
        print(f"[ERROR] Cannot connect to database: {e}")
        return

    file_cache: dict[str, dict] = {}

    with conn:
        with conn.cursor() as cur:
            cur.execute("SET FOREIGN_KEY_CHECKS = 0")

            if reload_target == "all":
                total, errors = run_reload_all(cur, file_cache)
            elif reload_target:
                total, errors = run_reload_file(cur, reload_target, file_cache)
            else:
                total, errors = run_insert_all(cur, file_cache)

            cur.execute("SET FOREIGN_KEY_CHECKS = 1")
            conn.commit()

    print()
    print("=" * 55)
    if errors:
        print(f"  Done with {errors} errors -- {total} rows affected")
    else:
        print(f"  Done -- {total} rows affected")
    print("=" * 55)


if __name__ == "__main__":
    main()
