"""
RENGA – Business Rule Checker
Kiểm tra mock data có tuân theo Business Rule không.

Usage:
    python Data/check_br.py
"""

import sys
import json
from pathlib import Path
from collections import Counter, defaultdict

sys.stdout.reconfigure(encoding="utf-8")

BASE = Path(__file__).resolve().parent / "Mock"


def load(filename: str) -> dict:
    return json.loads((BASE / filename).read_text("utf-8"))


def main():
    order_data   = load("07_order.json")
    payment_data = load("08_payment.json")
    appt_data    = load("09_appointment.json")
    post_data    = load("11_postcare.json")
    intr_data    = load("10_interaction.json")

    orders      = order_data["ORDER"]
    order_items = order_data["ORDER_ITEM"]
    history     = order_data["ORDER_STATUS_HISTORY"]
    payments    = payment_data["PAYMENT"]
    ltxns       = payment_data["LOYALTY_TRANSACTION"]
    reviews     = intr_data["REVIEW"]
    warranty    = post_data["WARRANTY_REQUEST"]
    refunds     = post_data["REFUND"]
    desigs      = appt_data["DESIGN"]
    apts        = appt_data["APPOINTMENT"]

    issues:  list[str] = []
    ok_list: list[str] = []

    # ── Helpers ────────────────────────────────────────────
    hist_by_ord: dict[str, list] = defaultdict(list)
    for h in history:
        hist_by_ord[h["order_id"]].append(h)

    def get_chain(order_id: str) -> list[str]:
        hs = sorted(hist_by_ord[order_id], key=lambda x: x["changed_at"])
        return [h["status_after"] for h in hs]

    def get_craft_chain(order_id: str) -> list[str]:
        hs = sorted(hist_by_ord[order_id], key=lambda x: x["changed_at"])
        return [h["craft_status_after"] for h in hs if h.get("craft_status_after")]

    def flag(code: str, msg: str):
        issues.append(f"[{code}] {msg}")

    def good(msg: str):
        ok_list.append(f"[OK] {msg}")

    # ── BR-11: STANDARD order statuses ─────────────────────
    VALID_STD = {"PENDING", "PAYMENT_CONFIRMED", "PACKED", "SHIPPED",
                 "COMPLETED", "CANCELLED", "REFUNDED"}
    for o in orders:
        if o["order_type"] == "STANDARD" and o["order_status"] not in VALID_STD:
            flag("BR-11", f"{o['order_id']}: invalid status '{o['order_status']}'")

    for o in orders:
        if o["order_type"] == "STANDARD" and o["order_status"] == "COMPLETED":
            if o.get("shipping_status") != "DELIVERED":
                flag("BR-11", f"{o['order_id']}: COMPLETED nhưng shipping_status='{o.get('shipping_status')}'")
            if not o.get("tracking_code"):
                flag("BR-11", f"{o['order_id']}: COMPLETED nhưng tracking_code null")

    for o in orders:
        if o["order_type"] == "STANDARD" and o["order_status"] == "CANCELLED":
            if o.get("shipping_status") != "NOT_SHIPPED":
                flag("BR-11", f"{o['order_id']}: CANCELLED nhưng shipping_status='{o.get('shipping_status')}'")

    std_dist = Counter(o["order_status"] for o in orders if o["order_type"] == "STANDARD")
    good(f"STANDARD status distribution: {dict(std_dist)}")

    # ── BR-11: STANDARD COMPLETED phải đi qua đủ bước ─────
    FULL_STD_CHAIN = ["PENDING", "PAYMENT_CONFIRMED", "PACKED", "SHIPPED", "COMPLETED"]
    for o in orders:
        if o["order_type"] == "STANDARD" and o["order_status"] == "COMPLETED":
            chain = get_chain(o["order_id"])
            if chain != FULL_STD_CHAIN:
                flag("BR-11", f"{o['order_id']}: COMPLETED chain sai → {chain}")

    # ── BR-12: STUDIO / DESIGN order statuses ──────────────
    VALID_CUSTOM = {"PENDING", "PAYMENT_CONFIRMED", "CRAFTING", "FINISHED",
                    "PACKED", "SHIPPED", "COMPLETED", "CANCELLED", "REFUNDED"}
    VALID_CRAFT  = {None, "CRAFTING", "FINISHED"}

    for o in orders:
        if o["order_type"] in ("STUDIO", "DESIGN"):
            if o["order_status"] not in VALID_CUSTOM:
                flag("BR-12", f"{o['order_id']}: invalid order_status '{o['order_status']}'")
            if o.get("craft_status") not in VALID_CRAFT:
                flag("BR-12", f"{o['order_id']}: invalid craft_status '{o.get('craft_status')}'")

    for o in orders:
        if o["order_type"] == "DESIGN" and o["order_status"] == "COMPLETED":
            craft_chain = get_craft_chain(o["order_id"])
            if not any(s in ("CRAFTING", "CR") for s in craft_chain):
                flag("BR-12", f"{o['order_id']} [DESIGN]: craft chain missing CRAFTING -> {craft_chain}")
            if not any(s in ("FINISHED", "FN") for s in craft_chain):
                flag("BR-12", f"{o['order_id']} [DESIGN]: craft chain missing FINISHED -> {craft_chain}")

    custom_dist = Counter(
        f"{o['order_status']}(craft={o.get('craft_status')})"
        for o in orders if o["order_type"] in ("STUDIO", "DESIGN")
    )
    good(f"STUDIO+DESIGN status distribution: {dict(custom_dist)}")

    # ── BR-12: DESIGN orders có record trong DESIGN table ──
    design_order_ids = {o["order_id"] for o in orders if o["order_type"] == "DESIGN"}
    design_linked    = {d.get("order_id") for d in desigs}
    for oid in design_order_ids:
        if oid not in design_linked:
            flag("BR-12", f"DESIGN order {oid} không có record trong DESIGN table")
    good(f"DESIGN orders: {len(design_order_ids)}, có DESIGN record: {len(design_linked & design_order_ids)}")

    # ── BR-24/25: CANCELLED chains ─────────────────────────
    for o in orders:
        if o["order_status"] != "CANCELLED":
            continue
        chain = get_chain(o["order_id"])
        if not chain:
            flag("BR-24", f"{o['order_id']}: CANCELLED nhưng không có history")
            continue
        if o["order_type"] == "STANDARD":
            if any(s in ("PACKED", "SHIPPED") for s in chain):
                flag("BR-24", f"{o['order_id']}: STANDARD CANCELLED sau PACKED/SHIPPED → {chain}")
        elif o["order_type"] in ("STUDIO", "DESIGN"):
            last = next((s for s in reversed(chain) if s != "CANCELLED"), None)
            if last not in ("PENDING", "PAYMENT_CONFIRMED"):
                flag("BR-25", f"{o['order_id']}: STUDIO/DESIGN CANCELLED từ '{last}' → {chain}")

    # ── BR-37: REVIEW gắn với order_item_id thuộc đơn COMPLETED ──
    completed_ids = {o["order_id"] for o in orders if o["order_status"] == "COMPLETED"}
    completed_item_ids = {oi["order_item_id"] for oi in order_items
                          if oi["order_id"] in completed_ids}
    seen_item_ids: set[str] = set()
    for r in reviews:
        oiid = r.get("order_item_id")
        if not oiid:
            flag("BR-37", f"REVIEW {r.get('review_id','?')}: missing order_item_id")
        elif oiid not in completed_item_ids:
            flag("BR-37", f"REVIEW {r.get('review_id','?')}: order_item {oiid} not from COMPLETED order")
        elif oiid in seen_item_ids:
            flag("BR-37", f"REVIEW {r.get('review_id','?')}: duplicate order_item_id {oiid}")
        seen_item_ids.add(oiid)
    good(f"REVIEW: {len(reviews)} records, "
         f"{sum(1 for r in reviews if r.get('order_item_id') in completed_item_ids)} on COMPLETED items")

    # ── BR-40: LOYALTY_TRANSACTION types ───────────────────
    VALID_LTX = {"PURCHASE", "REVIEW", "SHARE", "DEDUCT_REFUND", "DEDUCT_REDEEM"}
    for t in ltxns:
        if t["transaction_type"] not in VALID_LTX:
            flag("BR-40", f"LOYALTY_TRANSACTION {t.get('transaction_id')}: "
                          f"invalid type '{t['transaction_type']}'")
    good(f"LOYALTY_TRANSACTION types: {dict(Counter(t['transaction_type'] for t in ltxns))}")

    # ── BR-33: APPOINTMENT status ──────────────────────────
    VALID_APT = {"PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "NO_SHOW"}
    for apt in apts:
        if apt.get("appointment_status") not in VALID_APT:
            flag("BR-33", f"APPOINTMENT {apt.get('appointment_id')}: "
                          f"invalid status '{apt.get('appointment_status')}'")
    good(f"APPOINTMENT statuses: {dict(Counter(a.get('appointment_status') for a in apts))}")

    # ── BR-45: WARRANTY_REQUEST types ─────────────────────
    VALID_WRT = {"REPAIR", "CLEANING", "RESIZE", "WARRANTY"}
    for w in warranty:
        if w.get("request_type") not in VALID_WRT:
            flag("BR-45", f"WARRANTY_REQUEST {w.get('warranty_id')}: "
                          f"invalid type '{w.get('request_type')}'")
    good(f"WARRANTY_REQUEST types: {dict(Counter(w.get('request_type') for w in warranty))}")

    # ── REFUND: cancel_id XOR return_id ───────────────────
    for r in refunds:
        if (r.get("cancel_id") is None) == (r.get("return_id") is None):
            flag("REFUND-XOR", f"REFUND {r.get('refund_id')}: "
                               f"cancel_id={r.get('cancel_id')} return_id={r.get('return_id')}")

    # ── BR-31: PAYMENT statuses ────────────────────────────
    VALID_PMT = {"PENDING", "SUCCESS", "FAILED", "REFUNDED"}
    for p in payments:
        if p.get("payment_status") not in VALID_PMT:
            flag("BR-31", f"PAYMENT {p.get('payment_id')}: "
                          f"invalid status '{p.get('payment_status')}'")
    good(f"PAYMENT statuses: {dict(Counter(p.get('payment_status') for p in payments))}")

    # ── ORDER_STATUS_HISTORY coverage ─────────────────────
    ords_with_hist = set(h["order_id"] for h in history)
    for o in orders:
        if o["order_id"] not in ords_with_hist:
            flag("BR-48", f"{o['order_id']}: không có ORDER_STATUS_HISTORY")
    good(f"ORDER_STATUS_HISTORY: {len(history)} records for {len(ords_with_hist)} orders")

    # ── Report ─────────────────────────────────────────────
    print("=" * 60)
    print("  BUSINESS RULE CHECK REPORT")
    print("=" * 60)
    print(f"\n[OK] ({len(ok_list)} checks passed):")
    for m in ok_list:
        print(f"  {m}")
    print(f"\n{'[ISSUES FOUND]' if issues else '[ALL CLEAR]'} ({len(issues)}):")
    for m in issues:
        print(f"  {m}")
    if not issues:
        print("  (none)")
    print()


if __name__ == "__main__":
    main()
