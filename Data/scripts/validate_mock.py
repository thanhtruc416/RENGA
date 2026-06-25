"""
RENGA – FK & Integrity Validator
Kiểm tra tính toàn vẹn dữ liệu (FK, cumulative balance, XOR constraints).

Usage:
    python Data/validate_mock.py
"""

import json
from pathlib import Path
from collections import defaultdict, Counter

MOCK = Path(__file__).resolve().parent / "Mock"


def load(filename: str) -> dict:
    return json.loads((MOCK / filename).read_text("utf-8"))


def main():
    pre   = load("01_prerequisite.json")
    emp   = load("02_employee.json")
    cst   = load("03_customer.json")
    studio = load("04_studio.json")
    prod  = load("06_product.json")
    ord_  = load("07_order.json")
    pay   = load("08_payment.json")
    appt  = load("09_appointment.json")
    post  = load("11_postcare.json")

    errors: list[str] = []

    def err(msg: str):
        errors.append(msg)

    # ── 1. CUSTOMER.client_id → CLIENT ─────────────────────
    client_ids = {c["client_id"] for c in cst["CLIENT"]}
    for c in cst["CUSTOMER"]:
        if c["client_id"] not in client_ids:
            err(f"CUSTOMER {c['client_id']}: client_id không tồn tại trong CLIENT")

    # ── 2. CUSTOMER.tier_id → MEMBER_TIER ─────────────────
    tier_ids = {t["tier_id"] for t in pre["MEMBER_TIER"]}
    for c in cst["CUSTOMER"]:
        if c["tier_id"] not in tier_ids:
            err(f"CUSTOMER {c['client_id']}: tier_id '{c['tier_id']}' không tồn tại")

    # ── 3. loyalty_points nằm đúng tier range ─────────────
    tier_range = {
        "TIR000001": (0,      4_999),
        "TIR000002": (5_000,  14_999),
        "TIR000003": (15_000, 39_999),
        "TIR000004": (40_000, 99_999_999),
    }
    for c in cst["CUSTOMER"]:
        lo, hi = tier_range.get(c["tier_id"], (0, 99_999_999))
        pts = c.get("loyalty_points", 0)
        if not (lo <= pts <= hi):
            err(f"CUSTOMER {c['client_id']}: loyalty_points={pts} ngoài range tier {c['tier_id']} [{lo}-{hi}]")

    # ── 4. LOYALTY_TRANSACTION cumulative balance ──────────
    txns_by_cst: dict[str, list] = defaultdict(list)
    for t in pay["LOYALTY_TRANSACTION"]:
        key = t.get("customer_id") or t.get("client_id")
        if key:
            txns_by_cst[key].append(t)

    cst_pts = {c["client_id"]: c.get("loyalty_points", 0) for c in cst["CUSTOMER"]}
    for cid, txns in txns_by_cst.items():
        bal = 0
        for t in sorted(txns, key=lambda x: x["created_at"]):
            bal += t.get("points_changed", 0)
            stored = t.get("points_balance", 0)
            if abs(bal - stored) > 1:
                err(f"LOYALTY_TRANSACTION {t.get('transaction_id')}: "
                    f"running_balance={bal} ≠ points_balance={stored}")
        if cid in cst_pts and abs(bal - cst_pts[cid]) > 1:
            err(f"CLIENT {cid}: txn final balance={bal} ≠ loyalty_points={cst_pts[cid]}")

    # ── 5. ADDRESS.client_id → CLIENT ─────────────────────
    for a in cst["ADDRESS"]:
        if a["client_id"] not in client_ids:
            err(f"ADDRESS {a['address_id']}: client_id '{a['client_id']}' không tồn tại")

    # ── 6. ORDER.client_id → CLIENT ───────────────────────
    for o in ord_["ORDER"]:
        if o["client_id"] not in client_ids:
            err(f"ORDER {o['order_id']}: client_id '{o['client_id']}' không tồn tại")

    # ── 7. ORDER.address_id thuộc đúng client ─────────────
    addr_by_client: dict[str, set] = defaultdict(set)
    for a in cst["ADDRESS"]:
        addr_by_client[a["client_id"]].add(a["address_id"])
    for o in ord_["ORDER"]:
        if o.get("address_id"):
            if o["address_id"] not in addr_by_client.get(o["client_id"], set()):
                err(f"ORDER {o['order_id']}: address_id '{o['address_id']}' "
                    f"không thuộc client '{o['client_id']}'")

    # ── 8. ORDER_ITEM.order_id → ORDER ────────────────────
    order_ids = {o["order_id"] for o in ord_["ORDER"]}
    for oi in ord_["ORDER_ITEM"]:
        if oi["order_id"] not in order_ids:
            err(f"ORDER_ITEM {oi['order_item_id']}: order_id '{oi['order_id']}' không tồn tại")

    # ── 9. ORDER_ITEM.variant_id → PRODUCT_VARIANT ────────
    variant_ids = {v["variant_id"] for v in prod["PRODUCT_VARIANT"]}
    for oi in ord_["ORDER_ITEM"]:
        if oi.get("variant_id") and oi["variant_id"] not in variant_ids:
            err(f"ORDER_ITEM {oi['order_item_id']}: variant_id '{oi['variant_id']}' không tồn tại")

    # ── 10. ORDER_ITEM.custom_id → CUSTOMIZATION ──────────
    custom_ids = {c["custom_id"] for c in studio["CUSTOMIZATION"]}
    for oi in ord_["ORDER_ITEM"]:
        if oi.get("custom_id") and oi["custom_id"] not in custom_ids:
            err(f"ORDER_ITEM {oi['order_item_id']}: custom_id '{oi['custom_id']}' không tồn tại")

    # ── 11. PAYMENT.order_id → ORDER ──────────────────────
    for p in pay["PAYMENT"]:
        if p.get("order_id") and p["order_id"] not in order_ids:
            err(f"PAYMENT {p['payment_id']}: order_id '{p['order_id']}' không tồn tại")

    # ── 12. APPOINTMENT.client_id → CLIENT ────────────────
    for a in appt["APPOINTMENT"]:
        if a["client_id"] not in client_ids:
            err(f"APPOINTMENT {a['appointment_id']}: client_id '{a['client_id']}' không tồn tại")

    # ── 13. DESIGN.order_id → ORDER ───────────────────────
    for d in appt["DESIGN"]:
        if d.get("order_id") and d["order_id"] not in order_ids:
            err(f"DESIGN {d.get('design_id','?')}: order_id '{d['order_id']}' không tồn tại")

    # ── 14. WARRANTY_REQUEST.order_id → ORDER ─────────────
    for w in post["WARRANTY_REQUEST"]:
        if w["order_id"] not in order_ids:
            err(f"WARRANTY_REQUEST {w['warranty_id']}: order_id '{w['order_id']}' không tồn tại")

    # ── 15. REPAIR_QUOTE.warranty_id → WARRANTY_REQUEST (REPAIR) ──
    repair_wrt_ids = {w["warranty_id"] for w in post["WARRANTY_REQUEST"]
                      if w.get("request_type") == "REPAIR"}
    for q in post["REPAIR_QUOTE"]:
        if q["warranty_id"] not in repair_wrt_ids:
            err(f"REPAIR_QUOTE {q['quote_id']}: warranty_id '{q['warranty_id']}' "
                f"không phải loại REPAIR")

    # ── 16. CANCELLATION_REQUEST.order_id → ORDER ─────────
    for c in post["CANCELLATION_REQUEST"]:
        if c["order_id"] not in order_ids:
            err(f"CANCELLATION_REQUEST {c['cancel_id']}: order_id '{c['order_id']}' không tồn tại")

    # ── 17. RETURN_REQUEST.order_id → ORDER ───────────────
    for r in post["RETURN_REQUEST"]:
        if r["order_id"] not in order_ids:
            err(f"RETURN_REQUEST {r['return_id']}: order_id '{r['order_id']}' không tồn tại")

    # ── 18. REFUND: cancel_id XOR return_id ───────────────
    cancel_ids = {c["cancel_id"] for c in post["CANCELLATION_REQUEST"]}
    return_ids = {r["return_id"] for r in post["RETURN_REQUEST"]}
    for r in post["REFUND"]:
        both_null    = (r.get("cancel_id") is None) and (r.get("return_id") is None)
        both_not_null = (r.get("cancel_id") is not None) and (r.get("return_id") is not None)
        if both_null or both_not_null:
            err(f"REFUND {r['refund_id']}: vi phạm XOR "
                f"(cancel_id={r.get('cancel_id')}, return_id={r.get('return_id')})")
        if r.get("cancel_id") and r["cancel_id"] not in cancel_ids:
            err(f"REFUND {r['refund_id']}: cancel_id '{r['cancel_id']}' không tồn tại")
        if r.get("return_id") and r["return_id"] not in return_ids:
            err(f"REFUND {r['refund_id']}: return_id '{r['return_id']}' không tồn tại")

    # ── 19. Không có cancel_id nào dùng bởi 2 REFUND ──────
    cancel_usage = Counter(r["cancel_id"] for r in post["REFUND"] if r.get("cancel_id"))
    for cid, cnt in cancel_usage.items():
        if cnt > 1:
            err(f"cancel_id '{cid}' được dùng bởi {cnt} REFUND records (phải là 1)")

    # ── Report ─────────────────────────────────────────────
    print("=" * 60)
    print("  FK & INTEGRITY VALIDATION REPORT")
    print("=" * 60)
    print(f"\nChecked: {len(list(errors) + ['ok'] * (19 - len(errors)))} constraints")
    if errors:
        print(f"\n❌ ERRORS ({len(errors)}):")
        for e in errors:
            print(f"  - {e}")
    else:
        print("\n✅ ALL FK & INTEGRITY CHECKS PASSED")
    print()


if __name__ == "__main__":
    main()
