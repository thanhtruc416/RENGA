"""
generate_mock_data.py
Sinh mock data cho dự án RENGA — khớp đúng với schema MySQL đã định nghĩa.
Chạy: python generate_mock_data.py
Output: Data/Mock/*.json
"""

import json
import random
import hashlib
from pathlib import Path
from datetime import datetime, timedelta, date

random.seed(42)

# Tự động detect: chạy từ root (có Data/Mock) hay từ trong Data/
_here   = Path(__file__).resolve().parent
OUT_DIR = (_here / "Mock") if (_here / "Mock").exists() else (_here / "Data" / "Mock")
OUT_DIR.mkdir(parents=True, exist_ok=True)

# ─────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────

def fmt_id(prefix: str, n: int) -> str:
    return f"{prefix}{n:06d}"

def rand_dt(start="2026-01-01", end="2026-06-30") -> str:
    s = datetime.fromisoformat(start)
    e = datetime.fromisoformat(end)
    delta = int((e - s).total_seconds())
    return (s + timedelta(seconds=random.randint(0, delta))).strftime("%Y-%m-%dT%H:%M:%S")

def rand_date(start="2026-01-01", end="2026-06-30") -> str:
    return rand_dt(start, end).split("T")[0]

def dt_add(base: str, hours: int) -> str:
    return (datetime.fromisoformat(base) + timedelta(hours=hours)).strftime("%Y-%m-%dT%H:%M:%S")

def dt_after(base: str, min_h=1, max_h=48) -> str:
    return dt_add(base, random.randint(min_h, max_h))

def fake_hash(s: str) -> str:
    return "$2b$12$" + hashlib.md5(s.encode()).hexdigest()[:53]

def save(filename: str, data: dict):
    path = OUT_DIR / filename
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"  {filename}")
    for table, rows in data.items():
        print(f"    {table}: {len(rows)} rows")

# ─────────────────────────────────────────────
# Dữ liệu tham chiếu Việt Nam
# ─────────────────────────────────────────────

HO = ["Nguyễn","Trần","Lê","Phạm","Hoàng","Huỳnh","Phan","Vũ","Võ","Đặng",
      "Bùi","Đỗ","Hồ","Ngô","Dương","Lý","Đinh","Trịnh","Tô","Lưu"]
TEN_M = ["Minh","Hùng","Đức","Tuấn","Khoa","Long","Nam","Hải","Phong","Quân",
         "Tâm","Bình","Dũng","Cường","Thắng","Kiên","Việt","Trung","Quốc","Sơn"]
TEN_F = ["Lan","Hương","Thảo","Ngọc","Mai","Linh","Hoa","Trang","Phương","Thu",
         "Huyền","Nhung","Yến","Hạnh","Châu","Diễm","Kim","Vy","An","Trinh"]
DEM_M = ["Văn","Hữu","Quốc","Đình","Thành","Xuân","Bá","Công","Đức","Trung"]
DEM_F = ["Thị","Ngọc","Kim","Bích","Mỹ","Thanh","Thùy","Thúy","Ánh","Diệu"]

def vn_name(gender="any"):
    ho = random.choice(HO)
    if gender == "male" or (gender == "any" and random.random() > 0.5):
        return f"{ho} {random.choice(DEM_M)} {random.choice(TEN_M)}", "MALE"
    else:
        return f"{ho} {random.choice(DEM_F)} {random.choice(TEN_F)}", "FEMALE"

def vn_phone():
    return random.choice(["09","03","07","08"]) + "".join([str(random.randint(0,9)) for _ in range(8)])

CITIES = {
    "TP.HCM": [
        ("123 Nguyễn Huệ","Phường Bến Nghé","TP.HCM"),
        ("45 Lê Lợi","Phường Bến Thành","TP.HCM"),
        ("78 Trần Hưng Đạo","Phường Phạm Ngũ Lão","TP.HCM"),
        ("201 Nguyễn Trãi","Phường 2","TP.HCM"),
        ("56 Cách Mạng Tháng 8","Phường 5","TP.HCM"),
    ],
    "Hà Nội": [
        ("10 Tràng Thi","Phường Hàng Bông","Hà Nội"),
        ("25 Lý Thường Kiệt","Phường Trần Hưng Đạo","Hà Nội"),
        ("67 Đội Cấn","Phường Đội Cấn","Hà Nội"),
    ],
    "Đà Nẵng": [
        ("30 Trần Phú","Phường Thạch Thang","Đà Nẵng"),
        ("55 Nguyễn Văn Linh","Phường Thạch Thang","Đà Nẵng"),
    ],
    "Cần Thơ": [
        ("44 Nguyễn Thị Minh Khai","Phường An Nghiệp","Cần Thơ"),
    ],
    "Bình Dương": [
        ("23 Đại lộ Bình Dương","Phường Hiệp Thành","Bình Dương"),
    ],
}

def rand_address():
    province = random.choice(list(CITIES.keys()))
    street, ward, prov = random.choice(CITIES[province])
    return street, ward, prov

import unicodedata
def vn_email(name: str) -> str:
    parts = name.lower().split()
    base = "".join(parts) + str(random.randint(1, 99))
    base = unicodedata.normalize("NFD", base)
    base = "".join(c for c in base if unicodedata.category(c) != "Mn")
    base = base.replace("đ", "d").replace("ư", "u").replace("ơ", "o")
    base = "".join(c for c in base if c.isalnum())
    return f"{base}@{random.choice(['gmail.com','yahoo.com','outlook.com'])}"


# ══════════════════════════════════════════════════════
# MODULE 01: MEMBER_TIER, TIER_BENEFIT
# ══════════════════════════════════════════════════════

def gen_prerequisite(sh: dict) -> dict:
    tiers = [
        {"tier_id":"TIR000001","tier_name":"SILVER",   "min_points":0,     "max_points":4999,  "point_multiplier":1.0,"description":"Hạng cơ bản dành cho thành viên mới"},
        {"tier_id":"TIR000002","tier_name":"GOLD",     "min_points":5000,  "max_points":14999, "point_multiplier":1.5,"description":"Hạng vàng dành cho khách hàng thân thiết"},
        {"tier_id":"TIR000003","tier_name":"PLATINUM", "min_points":15000, "max_points":39999, "point_multiplier":2.0,"description":"Hạng bạch kim với nhiều đặc quyền cao cấp"},
        {"tier_id":"TIR000004","tier_name":"DIAMOND",  "min_points":40000, "max_points":None,  "point_multiplier":3.0,"description":"Hạng kim cương dành cho khách hàng VIP nhất"},
    ]
    benefits = [
        {"benefit_id":"BNF000001","tier_id":"TIR000001","benefit_type":"FREE_SHIP",      "description":"Miễn phí giao hàng cho đơn hàng trên 500.000đ"},
        {"benefit_id":"BNF000002","tier_id":"TIR000001","benefit_type":"BIRTHDAY_GIFT",  "description":"Ưu đãi sinh nhật 5% toàn bộ đơn hàng"},
        {"benefit_id":"BNF000003","tier_id":"TIR000002","benefit_type":"FREE_SHIP",      "description":"Miễn phí giao hàng không điều kiện"},
        {"benefit_id":"BNF000004","tier_id":"TIR000002","benefit_type":"VOUCHER",        "description":"Tặng voucher giảm 5% khi lên hạng Gold"},
        {"benefit_id":"BNF000005","tier_id":"TIR000003","benefit_type":"PRIORITY_CONSULT","description":"Ưu tiên đặt lịch tư vấn với nghệ nhân hàng đầu"},
        {"benefit_id":"BNF000006","tier_id":"TIR000003","benefit_type":"BIRTHDAY_GIFT",  "description":"Tặng quà nhân dịp đặc biệt"},
        {"benefit_id":"BNF000007","tier_id":"TIR000003","benefit_type":"VOUCHER",        "description":"Tặng voucher giảm 8% khi lên hạng Platinum"},
        {"benefit_id":"BNF000008","tier_id":"TIR000004","benefit_type":"VOUCHER",        "description":"Tặng voucher giảm 12% khi lên hạng Diamond"},
        {"benefit_id":"BNF000009","tier_id":"TIR000004","benefit_type":"EARLY_ACCESS",   "description":"Truy cập sớm bộ sưu tập mới trước 48 giờ"},
        {"benefit_id":"BNF000010","tier_id":"TIR000004","benefit_type":"PRIORITY_CONSULT","description":"Tư vấn riêng tư với Head Designer mỗi quý"},
    ]
    sh["tier_ids"] = [t["tier_id"] for t in tiers]
    return {"MEMBER_TIER": tiers, "TIER_BENEFIT": benefits}


# ══════════════════════════════════════════════════════
# MODULE 02: EMPLOYEE, ADMIN, DESIGNER
# ══════════════════════════════════════════════════════

def gen_employee(sh: dict) -> dict:
    employees, admins, designers = [], [], []

    # 3 ADMIN
    admin_depts = ["Quản lý hệ thống","Quản lý nội dung","Quản lý đơn hàng"]
    admin_roles = ["SUPER_ADMIN","STAFF","STAFF"]
    for i in range(1, 4):
        emp_id = fmt_id("EMP", i)
        name, gender = vn_name("female" if i % 2 == 0 else "male")
        created = rand_dt("2025-07-01","2025-10-01")
        updated = dt_after(created, 1, 500)
        employees.append({
            "employee_id": emp_id,
            "full_name": name,
            "gender": gender,
            "email": vn_email(name),
            "password_hash": fake_hash(emp_id),
            "employee_type": "ADMIN",
            "status": "ACTIVE",
            "created_at": created,
            "updated_at": updated,
        })
        admins.append({
            "employee_id": emp_id,
            "role": admin_roles[i-1],
            "department": admin_depts[i-1],
        })

    # 5 DESIGNER
    specialties = [
        "Thiết kế nhẫn cưới",
        "Thiết kế vòng cổ & mặt dây chuyền",
        "Thiết kế lắc tay",
        "Thiết kế hoa tai",
        "Thiết kế trang sức đính đá",
    ]
    fees = [500000, 600000, 450000, 550000, 700000]
    # avatar DiceBear lorelei — line-art portrait, phù hợp brand jewelry cao cấp
    designer_avatars = [
        "https://api.dicebear.com/9.x/lorelei/png?seed=phan-duc-cuong&size=300",
        "https://api.dicebear.com/9.x/lorelei/png?seed=nguyen-kim-hanh&size=300",
        "https://api.dicebear.com/9.x/lorelei/png?seed=bui-huu-duc&size=300",
        "https://api.dicebear.com/9.x/lorelei/png?seed=luu-my-huong&size=300",
        "https://api.dicebear.com/9.x/lorelei/png?seed=ho-huu-trung&size=300",
    ]
    for i in range(1, 6):
        emp_id = fmt_id("EMP", i + 3)
        name, gender = vn_name("female" if i % 2 == 0 else "male")
        created = rand_dt("2025-07-01","2025-10-01")
        updated = dt_after(created, 1, 500)
        employees.append({
            "employee_id": emp_id,
            "full_name": name,
            "gender": gender,
            "email": vn_email(name),
            "password_hash": fake_hash(emp_id),
            "employee_type": "DESIGNER",
            "status": "ACTIVE",
            "created_at": created,
            "updated_at": updated,
        })
        designers.append({
            "employee_id": emp_id,
            "bio": f"Nghệ nhân với {3+i} năm kinh nghiệm trong lĩnh vực {specialties[i-1].lower()}.",
            "specialty": specialties[i-1],
            "portfolio_url": f"https://renga.vn/designers/{emp_id.lower()}",
            "consultation_fee": fees[i-1],
            "is_available": True,
            "avatar": designer_avatars[i-1],
        })

    # === Tài khoản admin cố định ===
    _adm = "EMP000009"
    employees.append({
        "employee_id":   _adm,
        "full_name":     "Cao Thi Thanh Truc",
        "gender":        "FEMALE",
        "email":         "trucctt23416@st.uel.edu.vn",
        "password_hash": fake_hash("Renga2026@"),
        "employee_type": "ADMIN",
        "status":        "ACTIVE",
        "created_at":    "2025-07-01T08:00:00",
        "updated_at":    "2025-07-01T08:00:00",
    })
    admins.append({"employee_id": _adm, "role": "STAFF", "department": "Quản lý đơn hàng"})
    # ================================

    sh["admin_employee_ids"] = [a["employee_id"] for a in admins]
    sh["designer_employee_ids"] = [d["employee_id"] for d in designers]
    sh["all_employee_ids"] = [e["employee_id"] for e in employees]
    return {"EMPLOYEE": employees, "ADMIN": admins, "DESIGNER": designers}


# ══════════════════════════════════════════════════════
# MODULE 03: CLIENT, GUEST, CUSTOMER, ACCOUNT, ADDRESS
# ══════════════════════════════════════════════════════

def gen_customer(sh: dict) -> dict:
    clients, customers, guests, accounts, addresses = [], [], [], [], []

    tier_range = {
        "TIR000001": (0, 4999),
        "TIR000002": (5000, 14999),
        "TIR000003": (15000, 39999),
        "TIR000004": (40000, 65000),
    }
    # Phân bổ tier: 40 Silver, 32 Gold, 20 Platinum, 8 Diamond
    tier_assign = ["TIR000001"]*40 + ["TIR000002"]*32 + ["TIR000003"]*20 + ["TIR000004"]*8
    random.shuffle(tier_assign)

    addr_counter = [1]
    client_addr_map = {}   # client_id -> [address_id, ...]
    clt_by_cst_id  = {}    # customer PK (= client_id) -> client_id (same value, kept for clarity)

    def make_addr(client_id, name, phone, n=2):
        ids = []
        for k in range(n):
            aid = fmt_id("ADR", addr_counter[0]); addr_counter[0] += 1
            street, ward, province = rand_address()
            addresses.append({
                "address_id": aid,
                "client_id": client_id,
                "recipient_name": name,
                "recipient_phone": phone,
                "address_line": street,
                "ward": ward,
                "province": province,
                "is_default": k == 0,
                "created_at": rand_dt("2025-07-01","2025-12-31"),
            })
            ids.append(aid)
        return ids

    # 100 CUSTOMER
    for i in range(1, 101):
        clt_id = fmt_id("CLT", i)
        name, gender = vn_name()
        phone = vn_phone()
        email = vn_email(name)
        created = rand_dt("2025-07-01","2025-12-31")
        updated = dt_after(created, 1, 200)

        clients.append({
            "client_id": clt_id,
            "email": email,
            "phone": phone,
            "client_type": "CUSTOMER",
            "status": "ACTIVE",
            "created_at": created,
            "updated_at": updated,
        })

        tier_id = tier_assign[i-1]
        lo, hi = tier_range[tier_id]
        pts = random.randint(lo, hi)

        # CUSTOMER — PK = client_id (không có cột riêng customer_id)
        customers.append({
            "client_id": clt_id,
            "full_name": name,
            "gender": gender,
            "birth_date": rand_date("1970-01-01","2000-12-31"),
            "avatar": None,
            "tier_id": tier_id,
            "loyalty_points": pts,
            "tier_start_date": rand_date("2025-07-01","2025-12-31"),
        })

        accounts.append({
            "account_id": fmt_id("ACC", i),
            "client_id": clt_id,
            "provider": "LOCAL",
            "identifier": email,
            "password_hash": fake_hash(clt_id),
            "is_verified": True,
            "created_at": created,
        })

        n_addr = random.choice([1, 1, 2])
        aids = make_addr(clt_id, name, phone, n_addr)
        client_addr_map[clt_id] = aids
        clt_by_cst_id[clt_id] = clt_id

    # 8 GUEST
    for i in range(1, 9):
        clt_id = fmt_id("CLT", 100 + i)
        phone = vn_phone()
        created = rand_dt("2025-07-01","2025-12-31")
        updated = dt_after(created, 1, 72)

        clients.append({
            "client_id": clt_id,
            "email": None,
            "phone": phone,
            "client_type": "GUEST",
            "status": "ANONYMOUS",
            "created_at": created,
            "updated_at": updated,
        })
        # GUEST chỉ có client_id (PK=FK)
        guests.append({"client_id": clt_id})

        name_g, _ = vn_name()
        make_addr(clt_id, name_g, phone, 1)
        client_addr_map[clt_id] = [addresses[-1]["address_id"]]

    # === Tài khoản customer cố định ===
    _clt = "CLT000109"
    clients.append({
        "client_id":  _clt,
        "email":      None,
        "phone":      "0777555963",
        "client_type": "CUSTOMER",
        "status":     "ACTIVE",
        "created_at": "2026-01-01T08:00:00",
        "updated_at": "2026-01-01T08:00:00",
    })
    customers.append({
        "client_id":      _clt,
        "full_name":      "Cao Thi Thanh Truc",
        "gender":         "FEMALE",
        "birth_date":     None,
        "avatar":         None,
        "tier_id":        "TIR000001",
        "loyalty_points": 0,
        "tier_start_date": "2026-01-01",
    })
    accounts.append({
        "account_id":    "ACC000101",
        "client_id":     _clt,
        "provider":      "LOCAL",
        "identifier":    "0777555963",
        "password_hash": fake_hash("Renga2026@"),
        "is_verified":   True,
        "created_at":    "2026-01-01T08:00:00",
    })
    addresses.append({
        "address_id":       "ADR000900",
        "client_id":        _clt,
        "recipient_name":   "Cao Thi Thanh Truc",
        "recipient_phone":  "0777555963",
        "address_line":     "123 Đinh Tiên Hoàng",
        "ward":             "Phường Đa Kao",
        "province":         "TP. Hồ Chí Minh",
        "is_default":       True,
        "created_at":       "2026-01-01T08:00:00",
    })
    client_addr_map[_clt] = ["ADR000900"]
    # ===================================

    sh["customer_client_ids"] = [fmt_id("CLT", i) for i in range(1, 101)]
    sh["all_client_ids"]      = [c["client_id"] for c in clients]
    sh["client_addr_map"]     = client_addr_map
    sh["loyalty_points"]      = {c["client_id"]: c["loyalty_points"] for c in customers}
    sh["customers_list"]      = customers
    sh["addresses_map"]       = {a["address_id"]: a for a in addresses}

    return {"CLIENT": clients, "CUSTOMER": customers, "GUEST": guests,
            "ACCOUNT": accounts, "ADDRESS": addresses}


# ══════════════════════════════════════════════════════
# MODULE 04: Studio (BLANK_FORM, MATERIAL, STONE, STONE_SIZE,
#            BLANK_STONE, ENGRAVING_CONFIG, PROCESSING_FEE,
#            CUSTOMIZATION, SAVED_CUSTOM)
# ══════════════════════════════════════════════════════

def gen_studio(sh: dict) -> dict:
    admin_ids = sh["admin_employee_ids"]

    blank_forms = [
        {"blank_id":"BLK000001","blank_name":"Nhẫn tròn trơn",       "blank_type":"RING",     "base_price":800000, "description":"Nhẫn tròn cơ bản không họa tiết","image_url":"https://renga.vn/images/blank/ring_plain.jpg","is_active":True},
        {"blank_id":"BLK000002","blank_name":"Nhẫn đai ngang",        "blank_type":"RING",     "base_price":950000, "description":"Nhẫn có đai ngang phong cách","image_url":"https://renga.vn/images/blank/ring_band.jpg","is_active":True},
        {"blank_id":"BLK000003","blank_name":"Nhẫn đính đá solo",     "blank_type":"RING",     "base_price":1100000,"description":"Nhẫn đính một viên đá trung tâm","image_url":"https://renga.vn/images/blank/ring_solitaire.jpg","is_active":True},
        {"blank_id":"BLK000004","blank_name":"Vòng cổ dây mảnh",      "blank_type":"NECKLACE", "base_price":700000, "description":"Dây chuyền mảnh thanh lịch","image_url":"https://renga.vn/images/blank/necklace_thin.jpg","is_active":True},
        {"blank_id":"BLK000005","blank_name":"Vòng cổ dây xích",      "blank_type":"NECKLACE", "base_price":1200000,"description":"Dây chuyền xích đậm chất","image_url":"https://renga.vn/images/blank/necklace_chain.jpg","is_active":True},
        {"blank_id":"BLK000006","blank_name":"Lắc tay tròn trơn",     "blank_type":"BRACELET", "base_price":1000000,"description":"Lắc tay tròn cổ điển","image_url":"https://renga.vn/images/blank/bracelet_round.jpg","is_active":True},
        {"blank_id":"BLK000007","blank_name":"Hoa tai thả tròn",      "blank_type":"EARRING",  "base_price":600000, "description":"Hoa tai thả kiểu tròn","image_url":"https://renga.vn/images/blank/earring_drop.jpg","is_active":True},
        {"blank_id":"BLK000008","blank_name":"Mặt dây chuyền oval",   "blank_type":"NECKLACE", "base_price":850000, "description":"Mặt dây chuyền hình oval","image_url":"https://renga.vn/images/blank/pendant_oval.jpg","is_active":True},
    ]

    materials = [
        {"material_id":"MAT000001","material_name":"Bạc 925",    "material_type":"SILVER",   "price_modifier":500000, "description":"Bạc nguyên chất 92.5%","is_active":True},
        {"material_id":"MAT000002","material_name":"Vàng 18K",   "material_type":"GOLD",     "price_modifier":3500000,"description":"Vàng 18 karat","is_active":True},
        {"material_id":"MAT000003","material_name":"Vàng 14K",   "material_type":"GOLD",     "price_modifier":2700000,"description":"Vàng 14 karat","is_active":True},
        {"material_id":"MAT000004","material_name":"Bạch kim",   "material_type":"PLATINUM", "price_modifier":4200000,"description":"Platinum 950","is_active":True},
        {"material_id":"MAT000005","material_name":"Rose Gold",  "material_type":"ROSE_GOLD","price_modifier":3200000,"description":"Vàng hồng 18K","is_active":True},
    ]

    stones = [
        {"stone_id":"STN000001","stone_name":"Kim cương tự nhiên","stone_type":"DIAMOND", "base_price":8000000, "description":"Kim cương GIA certified","is_active":True},
        {"stone_id":"STN000002","stone_name":"Ruby Miến Điện",    "stone_type":"RUBY",    "base_price":2500000, "description":"Ruby đỏ pigeon blood","is_active":True},
        {"stone_id":"STN000003","stone_name":"Sapphire xanh",     "stone_type":"SAPPHIRE","base_price":1800000, "description":"Sapphire xanh hoàng gia","is_active":True},
        {"stone_id":"STN000004","stone_name":"Ngọc lục bảo",      "stone_type":"EMERALD", "base_price":2000000, "description":"Emerald xanh lá đậm","is_active":True},
        {"stone_id":"STN000005","stone_name":"Ngọc trai",          "stone_type":"PEARL",   "base_price":800000,  "description":"Ngọc trai Akoya","is_active":True},
        {"stone_id":"STN000006","stone_name":"Moissanite",         "stone_type":"OTHER",   "base_price":600000,  "description":"Moissanite cao cấp lấp lánh","is_active":True},
    ]

    stone_sizes = []
    labels = ["0.25ct","0.50ct","0.75ct","1.00ct","1.50ct","2.00ct","3.00ct"]
    carats = [0.25, 0.50, 0.75, 1.00, 1.50, 2.00, 3.00]
    mods   = [500000, 1000000, 1500000, 2000000, 3000000, 4000000, 6000000]
    ssz_counter = 1
    for stn in stones:
        for j in range(random.randint(2, 3)):
            idx = random.randint(0, len(labels)-1)
            stone_sizes.append({
                "stone_size_id": fmt_id("SSZ", ssz_counter),
                "stone_id": stn["stone_id"],
                "size_label": labels[idx],
                "carat_weight": carats[idx],
                "price_modifier": mods[idx],
            })
            ssz_counter += 1

    # BLANK_STONE — composite PK (blank_id, stone_size_id), no other columns
    blank_stones = []
    used_bs = set()
    for _ in range(20):
        blk = random.choice(blank_forms)
        ssz = random.choice(stone_sizes)
        key = (blk["blank_id"], ssz["stone_size_id"])
        if key not in used_bs:
            used_bs.add(key)
            blank_stones.append({"blank_id": blk["blank_id"], "stone_size_id": ssz["stone_size_id"]})

    # ENGRAVING_CONFIG — 1 active record
    engraving_configs = [{
        "config_id": "ENG000001",
        "free_char_limit": 10,
        "price_per_extra_char": 5000,
        "is_active": True,
        "updated_by_admin_id": admin_ids[0],
        "updated_at": "2025-10-01T10:00:00",
    }]

    # PROCESSING_FEE
    processing_fees = [
        {"fee_id":"PFE000001","fee_name":"Gia công tiêu chuẩn",  "fee_type":"COMPLEX_DESIGN",  "description":"Gia công thiết kế phức tạp tiêu chuẩn","fee_amount":350000,"is_active":True,"created_by_admin_id":admin_ids[0],"updated_by_admin_id":None,"created_at":"2025-10-01T08:00:00","updated_at":"2025-10-01T08:00:00"},
        {"fee_id":"PFE000002","fee_name":"Gia công độc bản",      "fee_type":"UNIQUE_PIECE",    "description":"Phí cho sản phẩm độc bản số lượng 1","fee_amount":650000,"is_active":True,"created_by_admin_id":admin_ids[0],"updated_by_admin_id":None,"created_at":"2025-10-01T08:00:00","updated_at":"2025-10-01T08:00:00"},
        {"fee_id":"PFE000003","fee_name":"Gia công chất liệu đặc biệt","fee_type":"SPECIAL_MATERIAL","description":"Phí gia công chất liệu yêu cầu kỹ thuật cao","fee_amount":500000,"is_active":True,"created_by_admin_id":admin_ids[1],"updated_by_admin_id":None,"created_at":"2025-11-01T08:00:00","updated_at":"2025-11-01T08:00:00"},
        {"fee_id":"PFE000004","fee_name":"Phí khác",              "fee_type":"OTHER",           "description":"Phí gia công không thuộc danh mục trên","fee_amount":200000,"is_active":True,"created_by_admin_id":admin_ids[1],"updated_by_admin_id":None,"created_at":"2025-11-01T08:00:00","updated_at":"2025-11-01T08:00:00"},
    ]

    # CUSTOMIZATION — PK=custom_id, client_id (FK→CUSTOMER.client_id)
    clt_ids  = sh["customer_client_ids"]
    blk_ids  = [b["blank_id"] for b in blank_forms]
    mat_ids  = [m["material_id"] for m in materials]
    ssz_ids  = [s["stone_size_id"] for s in stone_sizes]
    fee_ids  = [f["fee_id"] for f in processing_fees]

    customizations = []
    for i in range(1, 11):
        blank_id = random.choice(blk_ids)
        mat_id   = random.choice(mat_ids)
        has_stone = random.random() > 0.3
        ssz_id   = random.choice(ssz_ids) if has_stone else None
        has_engr  = random.random() > 0.5
        created  = rand_dt()
        updated  = dt_after(created, 1, 30)
        blk_price = next(b["base_price"] for b in blank_forms if b["blank_id"] == blank_id)
        mat_mod   = next(m["price_modifier"] for m in materials if m["material_id"] == mat_id)
        ssz_mod   = next((s["price_modifier"] for s in stone_sizes if s["stone_size_id"] == ssz_id), 0) if ssz_id else 0
        fee_amount= next(f["fee_amount"] for f in processing_fees if f["fee_id"] == fee_ids[0])
        calc_price = blk_price + mat_mod + ssz_mod + fee_amount
        customizations.append({
            "custom_id": fmt_id("CTM", i),
            "client_id": random.choice(clt_ids),
            "blank_id":  blank_id,
            "material_id": mat_id,
            "stone_size_id": ssz_id,
            "config_id": "ENG000001" if has_engr else None,
            "engraving_text": random.choice(["Mãi bên nhau","Forever","Love","Yêu em mãi",None]) if has_engr else None,
            "processing_fee_id": random.choice(fee_ids),
            "calculated_price": calc_price,
            "status": random.choice(["DRAFT","DRAFT","ORDERED"]),
            "created_at": created,
            "updated_at": updated,
        })

    # SAVED_CUSTOM
    saved_customs = []
    for i in range(1, 6):
        ctm = random.choice(customizations)
        is_shared = i <= 2
        created = ctm["created_at"]
        saved_customs.append({
            "saved_id": fmt_id("SAV", i),
            "custom_id": ctm["custom_id"],
            "custom_name": random.choice(["Nhẫn cưới của mình","Thiết kế yêu thích","Quà tặng người yêu","Lắc sinh nhật","Vòng cổ kỷ niệm"]),
            "is_shared": is_shared,
            "shared_at": dt_after(created, 1, 48) if is_shared else None,
            "created_at": created,
            "points_awarded": is_shared,
        })

    sh["blank_forms_map"]   = {b["blank_id"]: b for b in blank_forms}
    sh["materials_map"]     = {m["material_id"]: m for m in materials}
    sh["customizations_map"]= {c["custom_id"]: c for c in customizations}
    sh["custom_ids"]        = [c["custom_id"] for c in customizations]
    sh["shared_custom_client_ids"] = [
        ctm["client_id"] for ctm, sv in zip(customizations, saved_customs) if sv["is_shared"]
    ]

    return {
        "BLANK_FORM": blank_forms,
        "MATERIAL": materials,
        "STONE": stones,
        "STONE_SIZE": stone_sizes,
        "BLANK_STONE": blank_stones,
        "ENGRAVING_CONFIG": engraving_configs,
        "PROCESSING_FEE": processing_fees,
        "CUSTOMIZATION": customizations,
        "SAVED_CUSTOM": saved_customs,
    }


# ══════════════════════════════════════════════════════
# MODULE 05: DESIGNER_SCHEDULE, APPOINTMENT_SLOT
# ══════════════════════════════════════════════════════

def gen_schedule(sh: dict) -> dict:
    dsg_ids = sh["designer_employee_ids"]
    day_map = {0:"MON",1:"TUE",2:"WED",3:"THU",4:"FRI",5:"SAT",6:"SUN"}

    schedules = []
    sch_counter = 1
    # Mỗi designer có 1 schedule/ngày trong tuần (MON→FRI)
    working_days = ["MON","TUE","WED","THU","FRI"]
    for dsg_id in dsg_ids:
        for day in working_days:
            start_h = random.choice([9, 10])
            end_h   = start_h + random.randint(4, 6)
            schedules.append({
                "schedule_id": fmt_id("SCH", sch_counter),
                "employee_id": dsg_id,
                "day_of_week": day,
                "start_time": f"{start_h:02d}:00",
                "end_time":   f"{min(end_h,18):02d}:00",
                "is_active": True,
            })
            sch_counter += 1

    # APPOINTMENT_SLOT — sinh từ 2024-01-01 đến 2024-03-31, tối đa ~500 slots
    slots = []
    slt_counter = 1
    # Build map: (employee_id, day_of_week) -> schedule
    from collections import defaultdict
    sch_map = defaultdict(dict)
    for sch in schedules:
        sch_map[sch["employee_id"]][sch["day_of_week"]] = sch

    cur = date(2026, 1, 1)
    end_dt = date(2026, 6, 30)
    while cur <= end_dt and slt_counter <= 1200:
        dow = day_map[cur.weekday()]
        for dsg_id in dsg_ids:
            if dow not in sch_map[dsg_id]:
                continue
            sch = sch_map[dsg_id][dow]
            sh_h = int(sch["start_time"].split(":")[0])
            eh_h = int(sch["end_time"].split(":")[0])
            h = sh_h
            while h + 1 <= eh_h and slt_counter <= 1200:
                slots.append({
                    "slot_id": fmt_id("SLT", slt_counter),
                    "schedule_id": sch["schedule_id"],
                    "slot_duration_minutes": 60,
                    "slot_date": cur.isoformat(),
                    "start_time": f"{h:02d}:00",
                    "end_time":   f"{h+1:02d}:00",
                    "is_available": True,
                })
                slt_counter += 1
                h += 1
        cur += timedelta(days=1)

    # Build per-designer slot list for appointment gen
    dsg_slot_map = defaultdict(list)
    for sl in slots:
        sch = next(s for s in schedules if s["schedule_id"] == sl["schedule_id"])
        dsg_slot_map[sch["employee_id"]].append(sl)

    sh["schedules_map"]  = {s["schedule_id"]: s for s in schedules}
    sh["slots_list"]     = slots
    sh["slots_map"]      = {s["slot_id"]: s for s in slots}
    sh["dsg_slot_map"]   = dsg_slot_map
    return {"DESIGNER_SCHEDULE": schedules, "APPOINTMENT_SLOT": slots}


# ══════════════════════════════════════════════════════
# MODULE 06 — CATEGORY, PRODUCT, PRODUCT_IMAGE, PRODUCT_VARIANT
# ══════════════════════════════════════════════════════

def gen_product(sh: dict) -> dict:
    admin_ids = sh["admin_employee_ids"]

    categories = [
        {"category_id":"CAT000001","parent_id":None,        "category_name":"Trang sức",          "slug":"trang-suc",          "display_order":0,"is_active":True},
        {"category_id":"CAT000002","parent_id":"CAT000001", "category_name":"Nhẫn",                "slug":"nhan",               "display_order":1,"is_active":True},
        {"category_id":"CAT000003","parent_id":"CAT000001", "category_name":"Dây chuyền",          "slug":"day-chuyen",         "display_order":2,"is_active":True},
        {"category_id":"CAT000004","parent_id":"CAT000001", "category_name":"Lắc tay",             "slug":"lac-tay",            "display_order":3,"is_active":True},
        {"category_id":"CAT000005","parent_id":"CAT000001", "category_name":"Hoa tai",             "slug":"hoa-tai",            "display_order":4,"is_active":True},
        {"category_id":"CAT000006","parent_id":"CAT000001", "category_name":"Mặt dây chuyền",      "slug":"mat-day-chuyen",     "display_order":5,"is_active":True},
        {"category_id":"CAT000007","parent_id":"CAT000001", "category_name":"Bộ trang sức",        "slug":"bo-trang-suc",       "display_order":6,"is_active":True},
        {"category_id":"CAT000008","parent_id":"CAT000001", "category_name":"Charm",               "slug":"charm",              "display_order":7,"is_active":True},
    ]

    products_raw = [
        # (product_id, category_id, name, base_price, description)
        ("PRD000001","CAT000002","Nhẫn Kim Cương Vĩnh Cửu",          8500000, "Nhẫn đính kim cương thiên nhiên GIA, vàng 18K"),
        ("PRD000002","CAT000002","Nhẫn Bạc Moissanite Lấp Lánh",     2800000, "Nhẫn bạc 925 đính đá moissanite cao cấp"),
        ("PRD000003","CAT000002","Nhẫn Đính Sapphire Hoàng Gia",     9200000, "Nhẫn vàng 18K đính đá sapphire xanh hoàng gia"),
        ("PRD000004","CAT000003","Dây Chuyền Bạch Kim Ngôi Sao",     4200000, "Dây chuyền bạch kim hình ngôi sao, mặt dây đính đá"),
        ("PRD000005","CAT000003","Vòng Cổ Vàng 14K Nhẹ Nhàng",      3800000, "Dây chuyền vàng 14K mảnh thanh lịch"),
        ("PRD000006","CAT000004","Lắc Tay Vàng 18K Khắc Tên",       5800000, "Lắc tay vàng 18K có thể khắc tên theo yêu cầu"),
        ("PRD000007","CAT000005","Hoa Tai Ruby Hoàng Gia",           12000000,"Hoa tai đính đá ruby tự nhiên, vàng 18K"),
        ("PRD000006","CAT000006","Mặt Dây Ngọc Lục Bảo Oval",       6500000, "Mặt dây chuyền đính ngọc lục bảo hình oval"),
        ("PRD000008","CAT000007","Bộ Trang Sức Cưới Trọn Vẹn",      22000000,"Bộ nhẫn cưới + dây chuyền + hoa tai đồng bộ"),
        ("PRD000009","CAT000008","Charm Trái Tim Bạc",               650000,  "Charm trái tim bằng bạc 925, tương thích các loại lắc"),
        ("PRD000010","CAT000002","Nhẫn Vàng Hồng Đính Đá",          7200000, "Nhẫn rose gold đính hàng đá nhỏ xung quanh"),
        ("PRD000011","CAT000003","Dây Chuyền Ngọc Trai Akoya",       5500000, "Dây chuyền ngọc trai Akoya Nhật Bản"),
    ]
    # Deduplicate sản phẩm (PRD000006 bị trùng ở trên, fix luôn)
    seen_ids = set()
    products_raw_clean = []
    fixed_counter = 1
    for row in products_raw:
        pid = row[0]
        if pid in seen_ids:
            pid = fmt_id("PRD", 100 + fixed_counter); fixed_counter += 1
            row = (pid,) + row[1:]
        seen_ids.add(pid)
        products_raw_clean.append(row)
    products_raw = products_raw_clean

    products = []
    images   = []
    variants = []
    img_counter = 1
    var_counter = 1

    _MOCK_IMG_URLS = {
        "PRD000001": [
            "https://cdn.pnj.io/images/detailed/180/sp-GNDD00C000074-nhan-cuoi-nam-kim-cuong-vang-18k-pnj-chung-doi-1.png",
            "https://cdn.pnj.io/images/detailed/179/sp-GNDD00C000081-nhan-cuoi-kim-cuong-vang-18k-pnj-chung-doi-1.png",
        ],
        "PRD000002": [
            "https://cdn.pnj.io/images/detailed/283/sp-snxmmxw060003-nhan-bac-dinh-da-style-by-pnj-01.png",
            "https://cdn.pnj.io/images/detailed/272/sp-snxmxmw000212-nhan-bac-dinh-da-pnjsilver-1.png",
        ],
        "PRD000003": [
            "https://cdn.pnj.io/images/detailed/279/sp-gnsp00w000118-nhan-vang-trang-10k-dinh-da-sapphire-pnj-1.png",
            "https://cdn.pnj.io/images/detailed/279/sp-gnspxmw000571-nhan-vang-trang-14k-dinh-da-sapphire-pnj-1.png",
        ],
        "PRD000004": [
            "https://cdn.pnj.io/images/detailed/301/sp-gd0000w001583-day-chuyen-vang-trang-y-75-18k-pnj-1.png",
            "https://cdn.pnj.io/images/detailed/300/sp-gd0000w001570-day-chuyen-vang-trang-75-18k-pnj-1.png",
        ],
        "PRD000005": [
            "https://cdn.pnj.io/images/detailed/301/sp-gd0000y013155-day-chuyen-vang-y-75-18k-pnj-1.png",
            "https://cdn.pnj.io/images/detailed/246/sp-gd0000y060543-day-chuyen-nam-vang-y-18k-mancode-by-pnj-1.png",
        ],
        "PRD000006": [
            "https://cdn.pnj.io/images/detailed/294/sp-gvxm00w000461-vong-tay-nam-vang-trang-416-10k-dinh-da-ecz-pnj-01.png",
            "https://cdn.pnj.io/images/detailed/294/sp-gvxmxmw001634-vong-tay-vang-trang-416-10k-dinh-da-ecz-pnj-01.png",
        ],
        "PRD000007": [
            "https://cdn.pnj.io/images/detailed/299/sp-gbrbxmw000125-bong-tai-vang-trang-585-14k-dinh-da-ruby-pnj-family-infinity-1.png",
            "https://cdn.pnj.io/images/detailed/300/sp-gbrbxmy000398-bong-tai-vang-585-14k-dinh-da-ruby-pnj-1.png",
        ],
        "PRD000101": [
            "https://cdn.pnj.io/images/detailed/287/sp-gmpaxmw000140-mat-day-chuyen-vang-trang-10k-dinh-ngoc-trai-akoya-pnj-1.png",
            "https://cdn.pnj.io/images/detailed/287/sp-gmpaxmw000141-mat-day-chuyen-vang-trang-10k-dinh-ngoc-trai-akoya-pnj-1.png",
        ],
        "PRD000008": [
            "https://cdn.pnj.io/images/detailed/300/sp-gn0000c000793-gn0000c000794-cap-nhan-cuoi-vang-pnj-1.png",
            "https://cdn.pnj.io/images/detailed/300/sp-gn0000c000791-gn0000c000792-cap-nhan-cuoi-vang-pnj-1.png",
        ],
        "PRD000009": [
            "https://cdn.pnj.io/images/detailed/288/sp-siztxmw060098-hat-charm-bac-dinh-da-pnjsilver-hinh-trai-tim-01.png",
            "https://cdn.pnj.io/images/detailed/290/sp-sixmxmw000084-hat-charm-bac-dinh-da-pnjsilver-kind-heart-1.png",
        ],
        "PRD000010": [
            "https://cdn.pnj.io/images/detailed/209/sp-gnxmxmw000121-nhan-vang-trang-10k-dinh-da-ecz-pnj-1.png",
            "https://cdn.pnj.io/images/detailed/209/sp-gnxmxmw000121-nhan-vang-trang-10k-dinh-da-ecz-pnj-2.png",
        ],
        "PRD000011": [
            "https://cdn.pnj.io/images/detailed/298/sp-sd0000w060121-day-chuyen-bac-pnjsilver-1.png",
            "https://cdn.pnj.io/images/detailed/298/sp-sd0000w060121-day-chuyen-bac-pnjsilver-2.png",
        ],
    }

    for pid, cat_id, pname, base_price, desc in products_raw:
        created = rand_dt("2025-07-01","2025-12-01")
        updated = dt_after(created, 1, 200)
        products.append({
            "product_id": pid,
            "category_id": cat_id,
            "product_name": pname,
            "description": desc,
            "base_price": base_price,
            "status": "ACTIVE",
            "created_by_admin_id": random.choice(admin_ids),
            "created_at": created,
            "updated_at": updated,
        })
        for k, url in enumerate(_MOCK_IMG_URLS.get(pid, [])):
            images.append({
                "image_id": fmt_id("IMG", img_counter),
                "product_id": pid,
                "image_url": url,
                "is_primary": k == 0,
                "display_order": k,
            })
            img_counter += 1
        # Variants: nhẫn có size, còn lại chỉ 1 default variant
        if cat_id == "CAT000002":  # Nhẫn — có size
            for sz in random.sample([10,12,14,16,18,20], 4):
                variants.append({
                    "variant_id": fmt_id("VAR", var_counter),
                    "product_id": pid,
                    "variant_name": f"Size {sz}",
                    "size_value": str(sz),
                    "price": base_price + random.choice([0, 0, 100000]),
                    "stock_quantity": random.randint(3, 20),
                    "status": "AVAILABLE",
                })
                var_counter += 1
        else:
            # 1 default variant hoặc 2-3 kích thước dây chuyền
            sizes_opt = ["40cm","42cm","45cm"] if cat_id == "CAT000003" else ["One size"]
            for sz_name in (random.sample(sizes_opt, 2) if cat_id == "CAT000003" else sizes_opt):
                variants.append({
                    "variant_id": fmt_id("VAR", var_counter),
                    "product_id": pid,
                    "variant_name": sz_name,
                    "size_value": sz_name,
                    "price": base_price,
                    "stock_quantity": random.randint(5, 30),
                    "status": "AVAILABLE",
                })
                var_counter += 1

    sh["products_map"]  = {p["product_id"]: p for p in products}
    sh["variants_list"] = variants
    sh["variants_map"]  = {v["variant_id"]: v for v in variants}
    sh["variant_ids"]   = [v["variant_id"] for v in variants]

    # Build per-product variant list cho order gen
    from collections import defaultdict
    prod_variants = defaultdict(list)
    for v in variants:
        prod_variants[v["product_id"]].append(v["variant_id"])
    sh["prod_variants"] = prod_variants

    return {
        "CATEGORY": categories,
        "PRODUCT": products,
        "PRODUCT_IMAGE": images,
        "PRODUCT_VARIANT": variants,
    }


# ══════════════════════════════════════════════════════
# MODULE 07: CART, CART_ITEM, ORDER, ORDER_ITEM, ORDER_STATUS_HISTORY
# ══════════════════════════════════════════════════════

def gen_order(sh: dict) -> dict:
    clt_ids      = sh["customer_client_ids"]
    client_addr  = sh["client_addr_map"]
    admin_ids    = sh["admin_employee_ids"]
    variant_ids  = sh["variant_ids"]
    variants_map = sh["variants_map"]
    custom_ids   = sh["custom_ids"]
    custom_map   = sh["customizations_map"]

    carts, cart_items = [], []
    orders, order_items, histories = [], [], []

    car_c=oci_c=ord_c=ori_c=osh_c = 1

    def get_addr(clt_id):
        addrs = client_addr.get(clt_id, [])
        return random.choice(addrs) if addrs else None

    # ── 16 CARTs
    for _ in range(16):
        clt = random.choice(clt_ids)
        created = rand_dt()
        cart_id = fmt_id("CAR", car_c); car_c += 1
        carts.append({"cart_id": cart_id, "client_id": clt,
                      "created_at": created, "updated_at": dt_after(created, 0, 5)})
        for _ in range(random.randint(1, 3)):
            vid = random.choice(variant_ids)
            qty = random.randint(1, 2)
            cart_items.append({
                "cart_item_id": fmt_id("CRI", oci_c), "cart_id": cart_id,
                "item_type": "PRODUCT", "variant_id": vid, "custom_id": None,
                "quantity": qty, "unit_price": variants_map[vid]["price"],
                "added_at": created,
            })
            oci_c += 1
    cart_items = cart_items[:15]

    # ── Helper tạo ORDER_STATUS_HISTORY
    def make_history(ord_id, chain, base_time, admin_id=None):
        rows = []
        t = base_time; prev = None
        for st in chain:
            rows.append({
                "history_id": fmt_id("OSH", osh_c + len(rows)),
                "order_id": ord_id,
                "status_before": prev, "status_after": st,
                "craft_status_before": None, "craft_status_after": None,
                "changed_by_admin_id": admin_id,
                "note": None, "changed_at": t,
            })
            t = dt_after(t, 4, 48); prev = st
        return rows

    osh_offset = [1]

    def add_ord_history(ord_id, chain, base_time, craft_chain=None):
        rows = []; t = base_time; prev_st = None; prev_cs = None
        craft_chain = craft_chain or ([None]*len(chain))
        for st, cs in zip(chain, craft_chain):
            rows.append({
                "history_id": fmt_id("OSH", osh_offset[0]),
                "order_id": ord_id,
                "status_before": prev_st, "status_after": st,
                "craft_status_before": prev_cs, "craft_status_after": cs,
                "changed_by_admin_id": random.choice(admin_ids) if st != "PENDING" else None,
                "note": None, "changed_at": t,
            })
            t = dt_after(t, 4, 48); prev_st = st; prev_cs = cs
            osh_offset[0] += 1
        return rows

    completed_order_ids = []
    completed_order_clt = {}
    cancelled_order_ids = []

    # ── STANDARD orders: 154
    std_configs = (
        [("PENDING",              ["PENDING"],                                                      None)] * 6 +
        [("PAYMENT_CONFIRMED",    ["PENDING","PAYMENT_CONFIRMED"],                                  None)] * 12 +
        [("PACKED",               ["PENDING","PAYMENT_CONFIRMED","PACKED"],                         None)] * 12 +
        [("SHIPPED",              ["PENDING","PAYMENT_CONFIRMED","PACKED","SHIPPED"],               None)] * 12 +
        [("COMPLETED",            ["PENDING","PAYMENT_CONFIRMED","PACKED","SHIPPED","COMPLETED"],   None)] * 103 +
        [("CANCELLED",            ["PENDING","CANCELLED"],                                          None)] * 9
    )

    for final_st, chain, _ in std_configs:
        clt_id  = random.choice(clt_ids)
        addr_id = get_addr(clt_id)
        created = rand_dt("2026-01-01","2026-06-30")
        ord_id  = fmt_id("ORD", ord_c); ord_c += 1

        ship_st = {"COMPLETED":"DELIVERED","SHIPPED":"IN_TRANSIT","PACKED":"HANDED_OVER",
                   "CANCELLED":"NOT_SHIPPED"}.get(final_st, "NOT_SHIPPED")

        item_rows = []
        total = 0
        for _ in range(random.randint(1, 3)):
            vid = random.choice(variant_ids)
            qty = random.randint(1, 2)
            price = variants_map[vid]["price"]
            sub = price * qty; total += sub
            item_rows.append({
                "order_item_id": fmt_id("ORI", ori_c),
                "order_id": ord_id,
                "item_type": "PRODUCT",
                "variant_id": vid, "custom_id": None, "design_id": None,
                "quantity": qty, "unit_price": price, "subtotal": sub,
            })
            ori_c += 1

        orders.append({
            "order_id": ord_id, "client_id": clt_id, "order_type": "STANDARD",
            "order_status": final_st, "craft_status": None,
            "address_id": addr_id,
            "shipping_status": ship_st,
            "tracking_code": f"VN{random.randint(10**8,10**9-1)}" if final_st=="COMPLETED" else None,
            "voucher_customer_id": None, "discount_amount": 0,
            "total_amount": total, "deposit_amount": 0,
            "note": None, "created_at": created, "updated_at": dt_after(created,1,72),
        })
        order_items.extend(item_rows)
        histories.extend(add_ord_history(ord_id, chain, created))

        if final_st == "COMPLETED":
            completed_order_ids.append(ord_id); completed_order_clt[ord_id] = clt_id
        if final_st == "CANCELLED":
            cancelled_order_ids.append(ord_id)

    # ── STUDIO orders: 31
    studio_cfgs = (
        [("PAYMENT_CONFIRMED", ["PENDING","PAYMENT_CONFIRMED"], None)] * 3 +
        [("COMPLETED",         ["PENDING","PAYMENT_CONFIRMED","PACKED","SHIPPED","COMPLETED"], None)] * 18 +
        [("CANCELLED",         ["PENDING","CANCELLED"], None)] * 10
    )
    for final_st, chain, _ in studio_cfgs:
        clt_id  = random.choice(clt_ids)
        addr_id = get_addr(clt_id)
        created = rand_dt("2026-01-01","2026-06-30")
        ord_id  = fmt_id("ORD", ord_c); ord_c += 1
        ctm_id  = random.choice(custom_ids)
        price   = custom_map[ctm_id]["calculated_price"]
        ship_st = "DELIVERED" if final_st=="COMPLETED" else "NOT_SHIPPED"

        orders.append({
            "order_id": ord_id, "client_id": clt_id, "order_type": "STUDIO",
            "order_status": final_st, "craft_status": None,
            "address_id": addr_id,
            "shipping_status": ship_st,
            "tracking_code": f"VN{random.randint(10**8,10**9-1)}" if final_st=="COMPLETED" else None,
            "voucher_customer_id": None, "discount_amount": 0,
            "total_amount": price, "deposit_amount": round(price*0.3,-3),
            "note": "Đơn customization studio", "created_at": created,
            "updated_at": dt_after(created,1,72),
        })
        order_items.append({
            "order_item_id": fmt_id("ORI", ori_c), "order_id": ord_id,
            "item_type": "CUSTOMIZATION",
            "variant_id": None, "custom_id": ctm_id, "design_id": None,
            "quantity": 1, "unit_price": price, "subtotal": price,
        })
        ori_c += 1
        histories.extend(add_ord_history(ord_id, chain, created))
        if final_st=="COMPLETED":
            completed_order_ids.append(ord_id); completed_order_clt[ord_id] = clt_id
        if final_st=="CANCELLED":
            cancelled_order_ids.append(ord_id)

    # ── DESIGN orders: 15
    design_cfgs = (
        [("COMPLETED","FINISHED",
          ["PENDING","PAYMENT_CONFIRMED","PAYMENT_CONFIRMED","PACKED","SHIPPED","COMPLETED"],
          ["CONCEPT_RECEIVED","SKETCHING","WAITING_APPROVAL","APPROVED","CRAFTING","FINISHED"])] * 10 +
        [("PAYMENT_CONFIRMED","CRAFTING",
          ["PENDING","PAYMENT_CONFIRMED"],
          ["CONCEPT_RECEIVED","CRAFTING"])] * 3 +
        [("CANCELLED", None,
          ["PENDING","CANCELLED"],
          [None, None])] * 2
    )
    for final_st, craft_final, chain, craft_chain in design_cfgs:
        clt_id  = random.choice(clt_ids)
        addr_id = get_addr(clt_id)
        created = rand_dt("2026-01-01","2026-06-30")
        ord_id  = fmt_id("ORD", ord_c); ord_c += 1
        price   = round(random.uniform(8000000,20000000),-3)
        ship_st = "DELIVERED" if final_st=="COMPLETED" else "NOT_SHIPPED"

        orders.append({
            "order_id": ord_id, "client_id": clt_id, "order_type": "DESIGN",
            "order_status": final_st, "craft_status": craft_final,
            "address_id": addr_id,
            "shipping_status": ship_st,
            "tracking_code": f"VN{random.randint(10**8,10**9-1)}" if final_st=="COMPLETED" else None,
            "voucher_customer_id": None, "discount_amount": 0,
            "total_amount": price, "deposit_amount": round(price*0.5,-3),
            "note": "Đơn thiết kế theo yêu cầu", "created_at": created,
            "updated_at": dt_after(created,1,72),
        })
        order_items.append({
            "order_item_id": fmt_id("ORI", ori_c), "order_id": ord_id,
            "item_type": "DESIGN",
            "variant_id": None, "custom_id": None, "design_id": None,  # design_id gán sau
            "quantity": 1, "unit_price": price, "subtotal": price,
        })
        ori_c += 1
        histories.extend(add_ord_history(ord_id, chain, created, craft_chain))
        if final_st=="COMPLETED":
            completed_order_ids.append(ord_id); completed_order_clt[ord_id] = clt_id
        if final_st=="CANCELLED":
            cancelled_order_ids.append(ord_id)

    sh["orders_map"]            = {o["order_id"]: o for o in orders}
    sh["all_order_ids"]         = [o["order_id"] for o in orders]
    sh["completed_order_ids"]   = completed_order_ids
    sh["completed_order_clt"]   = completed_order_clt
    sh["cancelled_order_ids"]   = cancelled_order_ids
    sh["design_order_ids"]      = [o["order_id"] for o in orders if o["order_type"]=="DESIGN"]
    sh["order_items_list"]      = order_items  # để update design_id sau

    return {"CART": carts, "CART_ITEM": cart_items,
            "ORDER": orders, "ORDER_ITEM": order_items,
            "ORDER_STATUS_HISTORY": histories}


# ══════════════════════════════════════════════════════
# MODULE 08: PAYMENT, PAYMENT_LOG, VOUCHER,
#            CUSTOMER_VOUCHER, LOYALTY_TRANSACTION
# ══════════════════════════════════════════════════════

def gen_payment(sh: dict) -> dict:
    orders_map          = sh["orders_map"]
    admin_ids           = sh["admin_employee_ids"]
    clt_ids             = sh["customer_client_ids"]
    loyalty_points      = sh["loyalty_points"]
    completed_order_clt = sh["completed_order_clt"]
    completed_order_ids = sh["completed_order_ids"]

    payments, pay_logs = [], []
    vouchers, cust_vouchers = [], []
    loyalty_txns = []

    pmt_c=plg_c=vcn_c=ctv_c=ltx_c = 1

    METHODS = ["BANK_TRANSFER","CREDIT_CARD","CASH"]

    # Các đơn có thể thanh toán (status != PENDING)
    payable = [o for o in orders_map.values() if o["order_status"] != "PENDING"]
    random.shuffle(payable)

    for order in payable:
        pmt_id  = fmt_id("PMT", pmt_c); pmt_c += 1
        method  = random.choice(METHODS)
        created = dt_after(order["created_at"], 0, 4)
        is_done = order["order_status"] not in ("CANCELLED",)
        txn_type = "PAYMENT"
        if order["order_type"] in ("STUDIO","DESIGN") and order["deposit_amount"] > 0:
            txn_type = "DEPOSIT"

        payments.append({
            "payment_id": pmt_id,
            "order_id": order["order_id"],
            "appointment_id": None,
            "transaction_type": txn_type,
            "payment_method": method,
            "amount": order["deposit_amount"] if txn_type=="DEPOSIT" else order["total_amount"],
            "payment_status": "SUCCESS" if is_done else "FAILED",
            "gateway_response": '{"code":"00","message":"success"}' if is_done else None,
            "processed_at": dt_after(created, 0, 1) if is_done else None,
            "created_at": created,
        })

        n_logs = random.randint(1, 2)
        for k in range(n_logs):
            pay_logs.append({
                "log_id": fmt_id("PLG", plg_c), "payment_id": pmt_id,
                "action_type": "INITIATED" if k==0 else ("SUCCESS" if is_done else "FAILED"),
                "amount": payments[-1]["amount"],
                "performed_by_admin_id": None,
                "note": "Khởi tạo thanh toán" if k==0 else ("Thanh toán thành công" if is_done else "Thanh toán thất bại"),
                "performed_at": dt_after(created, 0, 1),
            })
            plg_c += 1

    # Pad đủ 40 logs
    while len(pay_logs) < 40:
        pmt = random.choice(payments)
        pay_logs.append({
            "log_id": fmt_id("PLG", plg_c), "payment_id": pmt["payment_id"],
            "action_type": "ADJUSTMENT",
            "amount": pmt["amount"],
            "performed_by_admin_id": random.choice(admin_ids),
            "note": "Đối soát định kỳ",
            "performed_at": dt_after(pmt["created_at"], 1, 24),
        })
        plg_c += 1

    # 8 VOUCHERs
    voucher_data = [
        ("VCH000001","RENGA2026","PERCENTAGE",10,500000,None,           "ALL",     30,"2026-01-01T00:00:00","2026-12-31T23:59:59","ACTIVE"),
        ("VCH000002","NEWMEMBER","PERCENTAGE",5, 200000,None,           "ALL",     50,"2025-12-01T00:00:00","2026-06-30T23:59:59","ACTIVE"),
        ("VCH000003","SALE0626", "PERCENTAGE",15,1000000,2000000,       "STANDARD",20,"2026-06-01T00:00:00","2026-06-30T23:59:59","EXPIRED"),
        ("VCH000004","GOLD5PCT", "PERCENTAGE",5, 0,     None,           "ALL",     40,"2026-01-01T00:00:00","2026-12-31T23:59:59","ACTIVE"),
        ("VCH000005","PLAT8PCT", "PERCENTAGE",8, 0,     None,           "ALL",     30,"2026-01-01T00:00:00","2026-12-31T23:59:59","ACTIVE"),
        ("VCH000006","DIAMOND12","PERCENTAGE",12,0,     None,           "ALL",     20,"2026-01-01T00:00:00","2026-12-31T23:59:59","ACTIVE"),
        ("VCH000007","STUDIO10", "PERCENTAGE",10,3000000,None,          "STUDIO",  15,"2026-01-01T00:00:00","2026-12-31T23:59:59","ACTIVE"),
        ("VCH000008","BIRTHDAY", "PERCENTAGE",5, 0,     None,           "ALL",     25,"2026-01-01T00:00:00","2026-12-31T23:59:59","ACTIVE"),
    ]
    for vid, code, dtype, dval, min_ord, max_disc, atype, ulimit, vfrom, vto, vstatus in voucher_data:
        vouchers.append({
            "voucher_id": vid, "voucher_code": code,
            "discount_type": dtype, "discount_value": dval,
            "min_order_value": min_ord, "max_discount_amount": max_disc,
            "applicable_order_type": atype,
            "usage_limit": ulimit, "used_count": random.randint(0, ulimit//3),
            "valid_from": vfrom, "valid_to": vto, "status": vstatus,
            "created_by_admin_id": admin_ids[0],
            "created_at": "2025-12-01T08:00:00",
        })

    # 15 CUSTOMER_VOUCHERs
    vcn_ids = [v["voucher_id"] for v in vouchers]
    used_pairs = set()
    while len(cust_vouchers) < 15:
        clt_id = random.choice(clt_ids)
        vcn_id = random.choice(vcn_ids)
        if (clt_id, vcn_id) in used_pairs:
            continue
        used_pairs.add((clt_id, vcn_id))
        issued = rand_dt("2026-01-01","2026-06-30")
        is_used = random.random() > 0.45
        cust_vouchers.append({
            "customer_voucher_id": fmt_id("CTV", ctv_c),
            "client_id": clt_id,
            "voucher_id": vcn_id,
            "status": "USED" if is_used else "AVAILABLE",
            "issued_at": issued,
            "grant_reason": random.choice(["MARKETING","BIRTHDAY","TIER_UPGRADE","SYSTEM"]),
            "used_at": dt_after(issued, 1, 30) if is_used else None,
            "order_id": random.choice(completed_order_ids) if is_used else None,
        })
        ctv_c += 1

    # LOYALTY_TRANSACTION — số dư cuối khớp loyalty_points
    from collections import defaultdict
    events = defaultdict(list)  # client_id -> [(type, pts, dt)]

    # PURCHASE từ completed orders
    for ord_id, clt_id in completed_order_clt.items():
        amt = orders_map[ord_id]["total_amount"]
        pts = int(amt / 100000) * 100
        if pts > 0:
            events[clt_id].append(("PURCHASE", pts, dt_after(orders_map[ord_id]["created_at"],1,12)))

    # SHARE từ saved_custom
    for clt_id in sh.get("shared_custom_client_ids", []):
        events[clt_id].append(("SHARE", 30, rand_dt()))

    # Quyết định trước review events
    review_with_media = random.sample(completed_order_ids, min(24, len(completed_order_ids)))
    sh["review_with_media_orders"] = review_with_media
    for ord_id in review_with_media:
        clt_id = completed_order_clt[ord_id]
        events[clt_id].append(("REVIEW", 50, dt_after(orders_map[ord_id]["created_at"],48,200)))

    # Build transactions đảm bảo balance cuối == loyalty_points
    for clt_id, target in loyalty_points.items():
        evts = sorted(events.get(clt_id, []), key=lambda x: x[2])
        earned = sum(p for _, p, _ in evts)
        if earned > target:
            evts.append(("DEDUCT_REDEEM", -(earned - target), rand_dt("2026-06-15","2026-06-30")))
        elif earned < target:
            evts.append(("PURCHASE", target - earned, rand_dt("2026-06-15","2026-06-30")))
        evts = sorted(evts, key=lambda x: x[2])
        bal = 0
        for etype, pts, cat in evts:
            bal += pts
            loyalty_txns.append({
                "transaction_id": fmt_id("LTX", ltx_c),
                "client_id": clt_id,
                "transaction_type": etype,
                "points_changed": pts,
                "points_balance": bal,
                "source_id": None,
                "note": f"{'Cộng' if pts>0 else 'Trừ'} điểm - {etype}",
                "created_at": cat,
            })
            ltx_c += 1

    sh["_cv_list"] = cust_vouchers
    return {
        "PAYMENT": payments,
        "PAYMENT_LOG": pay_logs,
        "VOUCHER": vouchers,
        "CUSTOMER_VOUCHER": cust_vouchers,
        "LOYALTY_TRANSACTION": loyalty_txns,
    }


# ══════════════════════════════════════════════════════
# MODULE 09: APPOINTMENT, DESIGN, DESIGN_DRAFT
# ══════════════════════════════════════════════════════

def gen_appointment(sh: dict) -> dict:
    dsg_ids         = sh["designer_employee_ids"]
    clt_ids         = sh["customer_client_ids"]
    dsg_slot_map    = sh["dsg_slot_map"]
    slots_map       = sh["slots_map"]
    admin_ids       = sh["admin_employee_ids"]
    orders_map      = sh["orders_map"]
    design_ord_ids  = sh["design_order_ids"]
    order_items_list= sh["order_items_list"]

    appointments, designs, drafts = [], [], []
    apt_c=des_c=ddr_c = 1

    # 60 APPOINTMENTs
    used_slots = set()
    for i in range(60):
        dsg_id = random.choice(dsg_ids)
        clt_id = random.choice(clt_ids)
        candidates = [s for s in dsg_slot_map.get(dsg_id,[])
                      if s["slot_id"] not in used_slots and s["slot_date"] < "2026-07-01"]
        if not candidates:
            continue
        slot = random.choice(candidates)
        used_slots.add(slot["slot_id"])
        # Mark slot unavailable
        slots_map[slot["slot_id"]]["is_available"] = False

        apt_date = slot["slot_date"]
        created  = f"{apt_date}T{slot['start_time']}:00"
        status   = random.choice(["PENDING","CONFIRMED","COMPLETED","CANCELLED","NO_SHOW"])
        appointments.append({
            "appointment_id": fmt_id("APT", apt_c),
            "client_id": clt_id,
            "slot_id": slot["slot_id"],
            "idea_description": random.choice(["Nhẫn cưới phong cách tối giản","Dây chuyền tặng mẹ","Hoa tai cho tiệc cưới",None]),
            "reference_images": None,
            "consultation_fee": random.choice([450000,500000,550000,600000,700000]),
            "payment_status": "PAID" if status in ("COMPLETED","CONFIRMED") else "UNPAID",
            "appointment_status": status,
            "cancel_reason": "Bận đột xuất" if status=="CANCELLED" else None,
            "reschedule_count": random.choice([0, 0, 1]),
            "calendar_event_id": f"gcal_{apt_c:06d}" if status!="CANCELLED" else None,
            "created_at": dt_add(created, -random.randint(24,168)),
            "updated_at": created,
        })
        apt_c += 1

    apt_ids = [a["appointment_id"] for a in appointments if a["appointment_status"]=="COMPLETED"]

    # DESIGNs — gắn với tất cả DESIGN orders
    design_names = ["Nhẫn Kim Cương Hoàng Gia","Dây Chuyền Tình Yêu Vĩnh Cửu","Lắc Tay Kỷ Niệm",
                    "Nhẫn Cưới Đôi Tinh Tế","Hoa Tai Sapphire Hoàng Gia","Vòng Cổ Ngọc Trai Quý Phái",
                    "Nhẫn Bạch Kim Đơn Giản","Lắc Tay Đính Đá Đặc Biệt","Mặt Dây Ruby Tình Yêu"]
    for i, ord_id in enumerate(design_ord_ids):
        ord = orders_map[ord_id]
        dsg_id = random.choice(dsg_ids)
        created = dt_after(ord["created_at"], 1, 5)
        is_done = ord["order_status"] == "COMPLETED"
        des_id  = fmt_id("DES", des_c)
        designs.append({
            "design_id": des_id,
            "order_id": ord_id,
            "appointment_id": random.choice(apt_ids) if apt_ids and is_done else None,
            "design_brief": f"Thiết kế {design_names[i % len(design_names)]} theo yêu cầu khách hàng, phong cách tinh tế.",
            "agreed_price": ord["total_amount"],
            "deposit_rate": 0.50,
            "deposit_amount": ord["deposit_amount"],
            "estimated_days": random.randint(14, 30),
            "created_at": created,
        })

        # Cập nhật ORDER_ITEM design_id
        for oi in order_items_list:
            if oi["order_id"] == ord_id and oi["item_type"] == "DESIGN":
                oi["design_id"] = des_id

        # 2-3 DESIGn_DRAFTs
        n_drafts = random.randint(2, 3)
        draft_t  = created
        for k in range(n_drafts):
            is_last  = k == n_drafts - 1
            approval = "APPROVED" if (is_last and is_done) else ("REVISION_REQUESTED" if k < n_drafts-1 else "WAITING")
            drafts.append({
                "draft_id": fmt_id("DDR", ddr_c),
                "design_id": des_id,
                "version_number": k + 1,
                "draft_files": f"https://renga.vn/drafts/{fmt_id('DDR',ddr_c).lower()}.png",
                "designer_note": random.choice(["Bản phác thảo lần 1","Đã chỉnh theo feedback","Phiên bản hoàn thiện",None]),
                "customer_feedback": random.choice(["Thêm chút sáng bóng","OK chuyển bước tiếp","Chỉnh lại kích thước đá",None]),
                "approval_status": approval,
                "submitted_at": draft_t,
                "uploaded_by_designer_id": dsg_id,
                "reviewed_at": dt_after(draft_t, 24, 72) if approval != "WAITING" else None,
            })
            ddr_c += 1
            draft_t = dt_after(draft_t, 24, 72)
        des_c += 1

    sh["design_ids"] = [d["design_id"] for d in designs]
    sh["apt_ids"]             = [a["appointment_id"] for a in appointments]
    sh["_appointments_list"]  = appointments

    return {"APPOINTMENT": appointments, "DESIGN": designs, "DESIGN_DRAFT": drafts}


# ══════════════════════════════════════════════════════
# MODULE 10: REVIEW, QUESTION, FAQ
# ══════════════════════════════════════════════════════

def gen_interaction(sh: dict) -> dict:
    completed_order_ids = sh["completed_order_ids"]
    completed_order_clt = sh["completed_order_clt"]
    orders_map          = sh["orders_map"]
    review_w_media      = sh["review_with_media_orders"]
    products_map        = sh["products_map"]
    admin_ids           = sh["admin_employee_ids"]
    clt_ids             = sh["customer_client_ids"]
    order_items_list    = sh["order_items_list"]

    reviews, questions, faqs = [], [], []
    rvw_c=qst_c=faq_c = 1

    # REVIEWs — tối đa 100, mỗi order_item chỉ review 1 lần
    comment_pool = [
        (5,"Sản phẩm đẹp xuất sắc, đóng gói cẩn thận, giao hàng nhanh!"),
        (5,"Chất lượng vàng rất tốt, khắc chữ rõ nét, mình rất hài lòng."),
        (4,"Đẹp hơn ảnh, nhưng giao hơi chậm một chút."),
        (5,"Mua tặng người yêu, được khen nhiều lắm. Sẽ quay lại!"),
        (4,"Thiết kế độc đáo, giá hợp lý cho chất lượng mid-end."),
        (3,"Sản phẩm ổn nhưng đóng gói chưa đẹp lắm."),
        (5,"RENGA thật sự rất chuyên nghiệp, cảm ơn team!"),
        (4,"Hài lòng với dịch vụ, sẽ giới thiệu cho bạn bè."),
        (5,"Nhẫn đúng y ảnh, đá sáng lung linh, xứng đáng từng đồng."),
        (4,"Dịch vụ chăm sóc rất tốt, hàng đẹp như mong đợi."),
        (5,"Lần thứ 3 mua tại RENGA, vẫn không thất vọng!"),
        (4,"Đặt nhẫn cưới ở đây, cả hai đều rất ưng ý."),
        (5,"Khắc tên trên vòng lắc rất sắc nét, quà tặng hoàn hảo!"),
        (3,"Giao hàng hơi chậm nhưng chất lượng sản phẩm OK."),
        (5,"Thiết kế customization đúng ý muốn, nhân viên nhiệt tình."),
        (4,"Bao bì đẹp như hộp quà cao cấp, rất ấn tượng."),
        (5,"Moissanite lấp lánh hơn cả tưởng tượng, rất đáng tiền."),
        (4,"Hoa tai ruby đỏ đẹp, cân đối, sẽ giới thiệu bạn bè."),
        (5,"Nhận hàng đúng hẹn, sản phẩm y hệt mô tả, tuyệt vời!"),
        (4,"Giá hơi cao nhưng xứng đáng với chất lượng nhận được."),
        (5,"Tặng vợ nhân ngày kỷ niệm, cô ấy rất thích. Cảm ơn RENGA!"),
        (3,"Nhẫn đẹp nhưng cần thêm thời gian để giao hàng."),
        (5,"Vòng cổ ngọc trai sang trọng, hàng chính hãng rõ ràng."),
        (4,"Lắc tay vàng 18K vừa ý lắm, màu sắc đẹp tự nhiên."),
        (5,"Charm trái tim bạc dễ thương, giá phải chăng, ship nhanh."),
        (4,"Bộ trang sức cưới hoàn hảo, đúng kỳ vọng, giao hàng đúng hẹn."),
        (5,"Nhẫn sapphire đính đá đẹp lộng lẫy, đúng chuẩn GIA."),
        (3,"Sản phẩm OK nhưng mong hộp đựng cao cấp hơn một chút."),
        (5,"Dây chuyền bạch kim tinh tế, đeo vào tôn da rất nhiều!"),
        (4,"Đặt online lần đầu nhưng rất hài lòng, sẽ mua lại."),
    ]
    completed_set = set(completed_order_ids)
    completed_items = [(oi["order_item_id"], oi["order_id"])
                       for oi in order_items_list
                       if oi["order_id"] in completed_set]
    random.shuffle(completed_items)
    n_reviews = min(80, len(completed_items))
    for idx in range(n_reviews):
        order_item_id, ord_id = completed_items[idx]
        rating, content = random.choice(comment_pool)
        clt_id   = completed_order_clt[ord_id]
        has_media = ord_id in review_w_media and rvw_c <= 24
        created  = dt_after(orders_map[ord_id]["created_at"], 48, 720)
        reviews.append({
            "review_id": fmt_id("RVW", rvw_c),
            "order_item_id": order_item_id,
            "rating": rating,
            "content": content,
            "media_urls": f"https://renga.vn/reviews/{fmt_id('RVW',rvw_c).lower()}.jpg" if has_media else None,
            "is_verified": True,
            "admin_reply": "Cảm ơn bạn đã tin tưởng RENGA! ❤️" if rating >= 4 else None,
            "visibility_status": "VISIBLE",
            "created_at": created,
            "points_awarded": has_media,
        })
        rvw_c += 1

    # 25 QUESTIONs — client_id, product_id, question_content, reply_content
    prod_ids = list(products_map.keys())
    qna_data = [
        ("Nhẫn vàng 18K có bị xỉn màu không?",         True, "Vàng 18K có độ bền cao, ít bị xỉn màu. Tránh tiếp xúc với hóa chất và nước biển."),
        ("Kích thước nhẫn có thể chỉnh không?",          True, "Hỗ trợ chỉnh size miễn phí trong 30 ngày kể từ ngày nhận hàng."),
        ("Thời gian làm customization bao lâu?",         False, None),
        ("Sản phẩm có bảo hành không?",                  True, "Tất cả sản phẩm được bảo hành 12 tháng. Diamond được bảo hành vĩnh viễn."),
        ("Chính sách đổi trả như thế nào?",              False, None),
        ("Có ship tới nước ngoài không?",                True, "Hiện chỉ giao hàng trong nội địa Việt Nam."),
        ("Tôi muốn khắc tên lên nhẫn được không?",      True, "Có, phí khắc từ 150.000đ tùy số ký tự và font chữ."),
        ("Vàng 18K và 14K khác nhau thế nào?",          True, "Vàng 18K chứa 75% vàng nguyên chất, 14K chứa 58.3%. 18K bền hơn nhưng giá cao hơn."),
        ("Làm sao biết size nhẫn của mình?",             False, None),
        ("Thanh toán trả góp được không?",               True, "Hiện chưa hỗ trợ trả góp. Đang phát triển tính năng này."),
        ("Chất liệu bạch kim có đặc điểm gì?",          True, "Bạch kim cứng hơn vàng trắng, không bị bạc màu, phù hợp người dị ứng kim loại."),
        ("Hàng có nguồn gốc rõ ràng không?",            True, "Tất cả sản phẩm đều có giấy kiểm định và xuất xứ rõ ràng kèm khi giao hàng."),
        ("Moissanite có phải kim cương không?",          True, "Moissanite là đá tổng hợp cao cấp, độ sáng tương đương kim cương nhưng giá rẻ hơn nhiều."),
        ("Nhẫn cưới có thể làm set đôi không?",         True, "Có, chúng tôi có gói nhẫn cặp với chiết khấu hấp dẫn."),
        ("Sản phẩm có ảnh thực tế không?",              False, None),
        ("Tôi có thể đến xem trực tiếp không?",         True, "Có, bạn có thể đến showroom hoặc đặt lịch hẹn tư vấn online."),
        ("Voucher có dùng chung với điểm thưởng không?",True, "Có thể kết hợp voucher với điểm thưởng trên cùng một đơn hàng."),
        ("Hoa tai bị mất một chiếc có thể mua lẻ không?",False, None),
        ("Giao hàng có bảo hiểm không?",                True, "Tất cả đơn hàng đều được đóng gói đặc biệt và bảo hiểm trong quá trình vận chuyển."),
        ("Lắc tay có thể tháo charm ra không?",         True, "Tùy loại lắc, bạn có thể liên hệ để được tư vấn cụ thể."),
        ("Có gói quà không?",                           True, "Có, tất cả đơn hàng đều được đóng hộp quà RENGA miễn phí."),
        ("Điểm thưởng có hết hạn không?",              True, "Điểm thưởng không hết hạn miễn tài khoản còn hoạt động."),
        ("Có chương trình khách hàng thân thiết không?",True, "Có, hệ thống 4 hạng thành viên: Silver, Gold, Platinum, Diamond với nhiều ưu đãi riêng."),
        ("Mua online có an toàn không?",                True, "Thanh toán được mã hóa SSL, thông tin cá nhân được bảo mật tuyệt đối."),
        ("Sản phẩm có thể cá nhân hóa không?",         False, None),
    ]
    for qtext, has_ans, ans_text in qna_data:
        clt_id = random.choice(clt_ids)
        pid    = random.choice(prod_ids)
        created = rand_dt()
        questions.append({
            "question_id": fmt_id("QST", qst_c),
            "product_id": pid,
            "client_id": clt_id,
            "question_content": qtext,
            "reply_content": ans_text,
            "visibility_status": "VISIBLE",
            "created_at": created,
            "replied_at": dt_after(created, 2, 48) if has_ans else None,
            "replied_by_admin_id": random.choice(admin_ids) if has_ans else None,
        })
        qst_c += 1

    # 20 FAQs
    faq_raw = [
        ("PRODUCT","Làm thế nào để chọn kích thước nhẫn đúng?","Bạn có thể đến cửa hàng hoặc dùng thước đo tại nhà theo hướng dẫn trên website RENGA."),
        ("PRODUCT","Sản phẩm có certificate không?","Kim cương và đá quý đều có giấy GIA hoặc IGI đi kèm."),
        ("PRODUCT","Nhẫn cưới có thể làm set đôi không?","Có, chúng tôi có gói nhẫn đôi với giá ưu đãi hơn mua riêng."),
        ("ORDER","Làm thế nào để đặt hàng?","Bạn có thể đặt hàng trực tiếp trên website hoặc liên hệ hotline 1800-RENGA."),
        ("ORDER","Có thể hủy đơn không?","Hủy đơn trong 2 giờ đầu. Sau đó liên hệ CSKH để được hỗ trợ."),
        ("ORDER","Làm sao theo dõi đơn hàng?","Đăng nhập tài khoản → Lịch sử đơn hàng để theo dõi trạng thái."),
        ("ORDER","Có thể đặt hàng không có tài khoản?","Có, đặt hàng với tư cách khách (Guest) không cần đăng ký."),
        ("PAYMENT","Thanh toán những phương thức nào?","Thẻ tín dụng, chuyển khoản, MoMo, ZaloPay, COD."),
        ("PAYMENT","Giá trên website đã bao gồm VAT?","Giá hiển thị đã bao gồm 10% VAT."),
        ("PAYMENT","Thanh toán trả góp được không?","Hiện tại chưa hỗ trợ. Đang trong lộ trình phát triển."),
        ("WARRANTY","Bảo hành được áp dụng thế nào?","Mang sản phẩm và hóa đơn đến cửa hàng hoặc gửi mail tới warranty@renga.vn."),
        ("WARRANTY","Thời gian bảo hành là bao lâu?","12 tháng tiêu chuẩn. Thành viên Diamond được bảo hành vĩnh viễn."),
        ("CUSTOMIZATION","Đặt lịch hẹn tư vấn thiết kế?","Đăng nhập → The Designer → Chọn nghệ nhân và khung giờ → Xác nhận."),
        ("CUSTOMIZATION","Thời gian tư vấn studio là bao lâu?","Mỗi buổi 60 phút. Liên hệ trước nếu cần thêm thời gian."),
        ("CUSTOMIZATION","Phí tư vấn có được hoàn không?","Phí tư vấn được hoàn khi bạn đặt đơn thiết kế sau buổi tư vấn."),
        ("MEMBERSHIP","Điểm thưởng tích lũy như thế nào?","Mỗi 100.000đ mua hàng = 100 điểm. Viết review kèm ảnh = 50 điểm."),
        ("MEMBERSHIP","Cách đổi điểm thưởng?","Vào mục Điểm thưởng → Đổi điểm. 1.000 điểm = 10.000đ giảm giá."),
        ("MEMBERSHIP","Phân biệt các hạng thành viên?","Silver (0-4.999đ), Gold (5.000-14.999đ), Platinum (15.000-39.999đ), Diamond (40.000đ+)."),
        ("APPOINTMENT","Có thể đổi lịch hẹn không?","Có thể đổi lịch tối đa 1 lần, trước buổi hẹn ít nhất 24 giờ."),
        ("OTHER","Tài khoản bị khóa phải làm gì?","Liên hệ support@renga.vn hoặc gọi hotline để được hỗ trợ mở khóa."),
        # FAQ021-040 — bổ sung phủ đầy câu hỏi thường gặp
        ("CUSTOMIZATION","Cần đặt cọc bao nhiêu khi đặt thiết kế riêng?","Đặt cọc 50% giá trị đơn hàng sau khi duyệt bản thiết kế cuối. Phần còn lại thanh toán khi nhận hàng."),
        ("CUSTOMIZATION","Đơn tùy biến mất bao lâu để hoàn thành?","Đơn tùy biến từ The Studio: 7–14 ngày làm việc. Đơn thiết kế riêng (DESIGN): 15–30 ngày tùy độ phức tạp."),
        ("CUSTOMIZATION","Tôi có thể theo dõi tiến độ chế tác ở đâu?","Đăng nhập → Đơn hàng của tôi → xem trạng thái chế tác (CRAFTING → FINISHED) cập nhật theo thời gian thực."),
        ("CUSTOMIZATION","Nếu muốn hủy đơn sau khi đã đặt cọc thì có lấy lại cọc không?","Nếu hủy sau khi đã bắt đầu chế tác, tiền cọc sẽ không được hoàn. Hủy trước khi chế tác sẽ được hoàn cọc trong 3–5 ngày làm việc."),
        ("CUSTOMIZATION","Giá tùy biến được tính như thế nào?","Giá = giá phôi + phí gia công + giá đá (nếu có) + phí khắc chữ (nếu có). Xem bảng giá chi tiết tại trang The Studio."),
        ("APPOINTMENT","Phí tư vấn với nghệ nhân là bao nhiêu?","Phí tư vấn dao động từ 450.000đ – 700.000đ tùy nghệ nhân. Phí này được hoàn lại khi bạn đặt đơn thiết kế sau buổi hẹn."),
        ("APPOINTMENT","Đặt lịch rồi muốn hủy lịch thì có bị mất phí không?","Hủy trước 24 giờ: hoàn phí tư vấn. Hủy trong vòng 24 giờ hoặc không đến (no-show): mất phí tư vấn."),
        ("PAYMENT","Voucher dùng như thế nào?","Nhập mã voucher tại bước thanh toán. Có thể kết hợp với điểm thưởng nhưng không áp dụng đồng thời nhiều voucher trên cùng một đơn."),
        ("ORDER","Bao lâu thì nhận được hàng (hàng có sẵn)?","Nội thành TP.HCM: 1–2 ngày làm việc. Tỉnh thành khác: 3–5 ngày làm việc sau khi đơn được xác nhận."),
        ("CUSTOMIZATION","Bao lâu thì nhận được hàng (đơn tùy biến/thiết kế)?","Sau khi hoàn thành chế tác (7–30 ngày tùy loại đơn), giao hàng trong 1–3 ngày làm việc. Bạn sẽ nhận thông báo khi đơn được giao đơn vị vận chuyển."),
        ("ORDER","Phí vận chuyển bao nhiêu?","Miễn phí vận chuyển cho đơn từ 2.000.000đ. Đơn dưới 2 triệu: 30.000đ–50.000đ tùy khu vực."),
        ("ORDER","Có được kiểm tra hàng trước khi nhận không?","Được kiểm tra bên ngoài bao bì. Nếu phát hiện hư hỏng, ghi nhận ngay với shipper và liên hệ RENGA trong vòng 24 giờ để được hỗ trợ."),
        ("WARRANTY","Chính sách đổi trả đối với sản phẩm có sẵn như thế nào?","Hỗ trợ đổi trả trong 7 ngày nếu sản phẩm lỗi từ nhà sản xuất, chưa qua sử dụng và còn nguyên bao bì. Không áp dụng với sản phẩm đã khắc/chỉnh sửa."),
        ("WARRANTY","Sản phẩm tùy biến/thiết kế có được đổi trả không?","Sản phẩm tùy biến và thiết kế riêng không áp dụng đổi trả do tính chất cá nhân hóa, trừ trường hợp lỗi sản xuất từ phía RENGA."),
        ("WARRANTY","Nếu nhẫn rộng/chật thì có chỉnh size được không?","Hỗ trợ chỉnh size miễn phí 1 lần trong 30 ngày kể từ ngày nhận hàng. Sau đó tính phí theo bảng giá dịch vụ bảo hành."),
        ("PRODUCT","[Tên sản phẩm] đeo có bị đen/oxi hóa không, cách bảo quản thế nào?","Vàng 18K và Bạch kim rất ít bị oxi hóa. Bạc 925 có thể xỉn màu theo thời gian. Bảo quản nơi khô ráo, tránh hóa chất và nước biển, lau nhẹ bằng vải mềm sau khi đeo."),
        ("PRODUCT","[Tên sản phẩm] làm bằng chất liệu gì?","Thông tin chất liệu hiển thị trong phần mô tả sản phẩm. RENGA sử dụng: Vàng 18K, Vàng 14K, Vàng trắng, Rose Gold, Bạch kim, Bạc 925."),
        ("PRODUCT","[Tên sản phẩm] đính đá gì, kích thước/carat bao nhiêu?","Thông tin loại đá và carat ghi rõ trong thông số sản phẩm. Đá chính (kim cương, ruby, sapphire...) đều kèm giấy kiểm định GIA hoặc IGI."),
        ("PRODUCT","[Tên sản phẩm] có những size nào, đổi size được không?","Các size có sẵn hiển thị trong trang sản phẩm. Hỗ trợ chỉnh size miễn phí 1 lần trong 30 ngày. Xem thêm: FAQ về bảo hành."),
        ("PRODUCT","[Tên sản phẩm] giá bao nhiêu, giá này đã gồm phí khắc/gia công chưa?","Giá hiển thị là giá cơ bản, chưa bao gồm phí khắc chữ hoặc gia công thêm. Các phí bổ sung sẽ được cộng vào khi bạn chọn tùy chọn tương ứng."),
    ]
    for topic, q, a in faq_raw:
        created = rand_dt("2025-10-01","2025-12-31")
        faqs.append({
            "faq_id": fmt_id("FAQ", faq_c),
            "topic": topic,
            "question": q,
            "answer": a,
            "is_active": True,
            "created_by_admin_id": random.choice(admin_ids),
            "updated_by_admin_id": None,
            "created_at": created,
            "updated_at": created,
        })
        faq_c += 1

    return {"REVIEW": reviews, "QUESTION": questions, "FAQ": faqs}


# ══════════════════════════════════════════════════════
# MODULE 11: WARRANTY_REQUEST, REPAIR_QUOTE,
#            CANCELLATION_REQUEST, RETURN_REQUEST, REFUND
# ══════════════════════════════════════════════════════

def gen_postcare(sh: dict) -> dict:
    completed_order_ids = sh["completed_order_ids"]
    completed_order_clt = sh["completed_order_clt"]
    orders_map          = sh["orders_map"]
    all_order_ids       = sh["all_order_ids"]
    admin_ids           = sh["admin_employee_ids"]

    warranty_requests, repair_quotes = [], []
    cancellations, returns, refunds  = [], [], []
    wrt_c=rpq_c=cnc_c=rtn_c=rfd_c = 1

    # 30 WARRANTY_REQUESTs
    req_type_pool = ["REPAIR","REPAIR","CLEANING","CLEANING","RESIZE","RESIZE","WARRANTY","WARRANTY"]
    for i in range(30):
        ord_id = random.choice(completed_order_ids)
        ord    = orders_map[ord_id]
        created = dt_after(ord["created_at"], 720, 2000)
        status  = random.choice(["PENDING","ACCEPTED","IN_PROGRESS","COMPLETED"])
        warranty_requests.append({
            "warranty_id": fmt_id("WRT", wrt_c),
            "order_id": ord_id,
            "request_type": req_type_pool[i % len(req_type_pool)],
            "issue_description": random.choice([
                "Nhẫn bị lỏng lẻo, cần hàn lại",
                "Đá bị long ra, cần gắn lại",
                "Muốn làm sạch và đánh bóng lại",
                "Cần chỉnh lại kích thước",
                "Kiểm tra định kỳ theo bảo hành",
            ]),
            "evidence_images": None,
            "warranty_status": status,
            "rejection_reason": None,
            "handler_id": random.choice(admin_ids) if status != "PENDING" else None,
            "drop_off_date": rand_date("2026-01-01","2026-06-30") if status != "PENDING" else None,
            "received_at": rand_date("2026-01-01","2026-06-30") if status in ("IN_PROGRESS","COMPLETED") else None,
            "completed_at": rand_date("2026-02-01","2026-06-30") if status == "COMPLETED" else None,
            "created_at": created,
        })
        wrt_c += 1

    # REPAIR_QUOTEs từ REPAIR requests (tối đa 15)
    repair_wrt = [w for w in warranty_requests if w["request_type"] == "REPAIR"]
    for wrt in repair_wrt[:12]:
        repair_quotes.append({
            "quote_id": fmt_id("RPQ", rpq_c),
            "warranty_id": wrt["warranty_id"],
            "repair_description": random.choice(["Hàn lại cạnh nhẫn bị bung","Gắn lại đá và kiểm tra ổ đá"]),
            "estimated_fee": random.choice([250000, 350000, 450000]),
            "final_fee": random.choice([250000, 350000, 450000]),
            "customer_status": random.choice(["PENDING","ACCEPTED","REJECTED"]),
            "created_at": dt_after(wrt["created_at"], 4, 24),
            "responded_at": dt_after(wrt["created_at"], 24, 72) if random.random()>0.3 else None,
        })
        rpq_c += 1

    # 12 CANCELLATION_REQUESTs
    sample_ords = random.sample(all_order_ids, min(12, len(all_order_ids)))
    for ord_id in sample_ords:
        ord    = orders_map[ord_id]
        created = dt_after(ord["created_at"], 0, 4)
        status  = random.choice(["PENDING","APPROVED","REJECTED"])
        cancellations.append({
            "cancel_id": fmt_id("CNC", cnc_c),
            "order_id": ord_id,
            "reason": random.choice([
                "Đặt nhầm sản phẩm",
                "Muốn thay đổi địa chỉ giao hàng",
                "Không có nhu cầu nữa",
            ]),
            "refund_amount": ord["total_amount"] if status=="APPROVED" else None,
            "status": status,
            "processed_by_admin_id": random.choice(admin_ids) if status!="PENDING" else None,
            "handled_at": dt_after(created, 1, 24) if status!="PENDING" else None,
            "created_at": created,
        })
        cnc_c += 1

    # 8 RETURN_REQUESTs
    for ord_id in random.sample(completed_order_ids, min(8, len(completed_order_ids))):
        ord    = orders_map[ord_id]
        created = dt_after(ord["created_at"], 48, 144)
        status  = random.choice(["PENDING","APPROVED","COMPLETED"])
        returns.append({
            "return_id": fmt_id("RTN", rtn_c),
            "order_id": ord_id,
            "reason": random.choice(["DEFECTIVE","DAMAGED_SHIPPING","WRONG_ITEM","OTHER"]),
            "description": "Sản phẩm bị lỗi từ nhà sản xuất, đề nghị đổi mới.",
            "evidence_images": None,
            "status": status,
            "processed_by_admin_id": random.choice(admin_ids) if status!="PENDING" else None,
            "handled_at": dt_after(created, 24, 120) if status!="PENDING" else None,
            "created_at": created,
        })
        rtn_c += 1

    # 20 REFUNDs — cancel_id XOR return_id
    cancel_approved = [c["cancel_id"] for c in cancellations if c["status"]=="APPROVED"]
    return_approved = [r["return_id"] for r in returns if r["status"] in ("APPROVED","COMPLETED")]
    refund_sources = ([(cid, None) for cid in cancel_approved[:8]] +
                      [(None, rid) for rid in return_approved[:8]])

    for cancel_id, return_id in refund_sources[:16]:
        refunds.append({
            "refund_id": fmt_id("RFD", rfd_c),
            "cancel_id": cancel_id,
            "return_id": return_id,
            "refund_amount": random.choice([500000,1000000,2000000,3500000]),
            "refund_reason": "Hoàn tiền theo yêu cầu hủy đơn" if cancel_id else "Hoàn tiền do trả hàng",
            "refund_method": random.choice(["BANK_TRANSFER","CREDIT CARD"]),
            "refund_status": random.choice(["PENDING","PROCESSED"]),
            "processed_by_admin_id": random.choice(admin_ids),
            "processed_at": rand_dt("2026-01-01","2026-06-30"),
            "created_at": rand_dt("2026-01-01","2026-06-30"),
        })
        rfd_c += 1

    sh["_warranty_list"] = warranty_requests
    sh["_repair_list"]   = repair_quotes
    sh["_cancel_list"]   = cancellations
    sh["_refund_list"]   = refunds

    return {
        "WARRANTY_REQUEST": warranty_requests,
        "REPAIR_QUOTE": repair_quotes,
        "CANCELLATION_REQUEST": cancellations,
        "RETURN_REQUEST": returns,
        "REFUND": refunds,
    }


# ══════════════════════════════════════════════════════
# MODULE 12: CHATBOT_SESSION, CHATBOT_MESSAGE
# ══════════════════════════════════════════════════════

def gen_chatbot(sh: dict) -> dict:
    all_client_ids = sh["all_client_ids"]

    sessions = []
    messages = []
    ses_c = msg_c = 1

    conversations = [
        [
            ("USER", "Xin chào, tôi muốn hỏi về nhẫn vàng 18K", None),
            ("BOT",  "Chào bạn! RENGA có nhiều mẫu nhẫn vàng 18K đẹp. Bạn muốn tìm nhẫn cho dịp nào ạ?", "AI_GENERATED"),
            ("USER", "Mua tặng bạn gái nhân dịp sinh nhật", None),
            ("BOT",  "Gợi ý cho bạn: Nhẫn Kim Cương Vĩnh Cửu hoặc Nhẫn Đính Sapphire Hoàng Gia rất phù hợp làm quà sinh nhật!", "AI_GENERATED"),
        ],
        [
            ("USER", "Chính sách bảo hành của RENGA như thế nào?", None),
            ("BOT",  "RENGA bảo hành 12 tháng cho tất cả sản phẩm. Thành viên Diamond được bảo hành vĩnh viễn.", "FAQ"),
            ("USER", "Bảo hành có bao gồm mất đá không?", None),
            ("BOT",  "Bảo hành bao gồm lỗi kỹ thuật từ nhà sản xuất. Trường hợp mất đá do sử dụng cần thêm phí kiểm định.", "AI_GENERATED"),
        ],
        [
            ("USER", "Thời gian giao hàng về Hà Nội mất bao lâu?", None),
            ("BOT",  "Giao hàng nội thành Hà Nội từ 1-2 ngày làm việc. Tỉnh thành khác từ 3-5 ngày.", "FAQ"),
        ],
        [
            ("USER", "Tôi muốn đặt lịch tư vấn thiết kế nhẫn cưới", None),
            ("BOT",  "Tuyệt vời! Bạn có thể đặt lịch trong mục The Designer trên website. RENGA có 5 nghệ nhân chuyên về nhẫn cưới.", "AI_GENERATED"),
            ("USER", "Phí tư vấn là bao nhiêu?", None),
            ("BOT",  "Phí tư vấn từ 450.000đ - 700.000đ tùy nghệ nhân. Phí này sẽ được hoàn lại khi bạn đặt đơn thiết kế.", "FAQ"),
            ("USER", "Ok cảm ơn bạn", None),
            ("BOT",  "Rất vui được hỗ trợ bạn! Chúc bạn chọn được mẫu nhẫn ưng ý nhé 💍", "AI_GENERATED"),
        ],
        [
            ("USER", "Làm sao để đổi size nhẫn?", None),
            ("BOT",  "Trong vòng 30 ngày từ khi nhận hàng, RENGA hỗ trợ đổi size miễn phí khi mang sản phẩm và hóa đơn đến cửa hàng.", "FAQ"),
        ],
        [
            ("USER", "Sản phẩm moissanite có bền không?", None),
            ("BOT",  "Moissanite có độ cứng 9.25 Mohs, rất bền và lấp lánh hơn kim cương với giá cả phải chăng hơn.", "AI_GENERATED"),
            ("USER", "Giá nhẫn moissanite khoảng bao nhiêu?", None),
            ("BOT",  "Nhẫn Bạc Moissanite Lấp Lánh tại RENGA có giá 2.800.000đ. Bạn có muốn xem thêm thông tin không?", "AI_GENERATED"),
        ],
        [
            ("USER", "Tôi có thể thanh toán bằng ví điện tử không?", None),
            ("BOT",  "Hiện RENGA hỗ trợ thẻ tín dụng, chuyển khoản ngân hàng và COD. Ví điện tử đang trong lộ trình tích hợp.", "FAQ"),
        ],
        [
            ("USER", "Điểm tích lũy dùng để làm gì?", None),
            ("BOT",  "Điểm tích lũy giúp bạn lên hạng thành viên và đổi thành voucher giảm giá. 1.000 điểm = 10.000đ.", "FAQ"),
            ("USER", "Bao nhiêu điểm thì lên hạng Gold?", None),
            ("BOT",  "Cần tích lũy 5.000 điểm để lên hạng Gold, tương đương mua hàng khoảng 5.000.000đ.", "AI_GENERATED"),
        ],
        [
            ("USER", "Nhẫn bạch kim và nhẫn vàng trắng khác nhau thế nào?", None),
            ("BOT",  "Bạch kim cứng hơn, không bị bạc màu, phù hợp người dị ứng kim loại. Vàng trắng là hợp kim mạ rhodium, cần đánh bóng định kỳ.", "AI_GENERATED"),
        ],
        [
            ("USER", "Tôi muốn xem các mẫu lắc tay", None),
            ("BOT",  "RENGA có Lắc Tay Vàng 18K Khắc Tên (5.800.000đ) và nhiều mẫu tùy biến trong The Studio.", "AI_GENERATED"),
            ("USER", "Có mẫu nào dưới 3 triệu không?", None),
            ("BOT",  "Lắc tay có sẵn bắt đầu từ 5.800.000đ. Nếu muốn ngân sách linh hoạt hơn, bạn có thể dùng The Studio để tùy biến.", "AI_GENERATED"),
        ],
    ]

    for i in range(20):
        ses_id    = fmt_id("SES", ses_c); ses_c += 1
        is_logged = i < 6
        clt_id    = random.choice(all_client_ids) if is_logged else None
        started   = rand_dt()
        conv      = conversations[i % len(conversations)]
        ended     = dt_add(started, len(conv) * 2 + random.randint(1, 5))

        sessions.append({
            "session_id":    ses_id,
            "client_id":     clt_id,
            "browser_token": None if is_logged else f"btkn_{random.randint(100000, 999999)}",
            "started_at":    started,
            "ended_at":      ended,
            "status":        "ENDED",
        })

        msg_time = datetime.fromisoformat(started)
        for sender, content, src in conv:
            messages.append({
                "message_id":      fmt_id("MSG", msg_c),
                "session_id":      ses_id,
                "sender_type":     sender,
                "content":         content,
                "response_source": src,
                "created_at":      msg_time.strftime("%Y-%m-%dT%H:%M:%S"),
            })
            msg_c += 1
            msg_time += timedelta(minutes=random.randint(1, 3))

    return {"CHATBOT_SESSION": sessions, "CHATBOT_MESSAGE": messages}


# ══════════════════════════════════════════════════════
# MODULE 13: NOTIFICATION
# ══════════════════════════════════════════════════════

def gen_notification(sh: dict) -> dict:
    orders_map          = sh["orders_map"]
    completed_order_ids = sh["completed_order_ids"]
    completed_order_clt = sh["completed_order_clt"]
    customer_client_ids = sh["customer_client_ids"]
    apt_ids             = sh["apt_ids"]
    all_client_ids      = sh["all_client_ids"]

    # Lấy dữ liệu từ shared
    appointments   = sh.get("_appointments", [])
    warranty_list  = sh.get("_warranty_list", [])
    repair_list    = sh.get("_repair_list", [])
    cancel_list    = sh.get("_cancel_list", [])
    refund_list    = sh.get("_refund_list", [])
    cv_list        = sh.get("_cv_list", [])

    notifications = []
    ntf_c = [1]

    def add(clt_id, ntype, channel, title, content, ref_id, ref_type, created):
        notifications.append({
            "notification_id": fmt_id("NTF", ntf_c[0]),
            "client_id":       clt_id,
            "notification_type": ntype,
            "channel":         channel,
            "title":           title,
            "content":         content,
            "reference_id":    ref_id,
            "reference_type":  ref_type,
            "status":          "SENT",
            "sent_at":         dt_after(created, 0, 1),
            "created_at":      created,
        })
        ntf_c[0] += 1

    # ORDER_CONFIRMED / ORDER_SHIPPED / ORDER_COMPLETED — từ completed orders
    for ord_id in completed_order_ids[:50]:
        o   = orders_map[ord_id]
        clt = o["client_id"]
        t   = o["created_at"]
        add(clt, "ORDER_CONFIRMED", "IN_APP",
            "Đơn hàng đã được xác nhận",
            f"Đơn hàng {ord_id} của bạn đã được xác nhận thanh toán thành công.",
            ord_id, "ORDER", t)
        add(clt, "ORDER_SHIPPED", "EMAIL",
            "Đơn hàng đang trên đường giao",
            f"Đơn hàng {ord_id} đã được bàn giao cho đơn vị vận chuyển.",
            ord_id, "ORDER", dt_after(t, 24, 72))
        add(clt, "ORDER_COMPLETED", "IN_APP",
            "Đơn hàng đã giao thành công",
            f"Đơn hàng {ord_id} đã giao thành công. Cảm ơn bạn đã tin tưởng RENGA!",
            ord_id, "ORDER", dt_after(t, 72, 144))

    # APPOINTMENT_CONFIRMED
    for apt in appointments:
        if apt["appointment_status"] in ("COMPLETED", "CONFIRMED"):
            add(apt["client_id"], "APPOINTMENT_CONFIRMED", "EMAIL",
                "Lịch hẹn tư vấn đã được xác nhận",
                f"Lịch hẹn {apt['appointment_id']} của bạn đã được xác nhận. Chúng tôi rất mong được gặp bạn!",
                apt["appointment_id"], "APPOINTMENT", apt["created_at"])

    # CRAFT_UPDATE — DESIGN orders
    for ord_id, o in orders_map.items():
        if o["order_type"] == "DESIGN" and o.get("craft_status"):
            add(o["client_id"], "CRAFT_UPDATE", "IN_APP",
                "Tiến độ chế tác được cập nhật",
                f"Sản phẩm thiết kế trong đơn {ord_id} đang được chế tác. Nghệ nhân sẽ cập nhật hình ảnh sớm.",
                ord_id, "ORDER", dt_after(o["created_at"], 48, 120))

    # WARRANTY_UPDATE
    for w in warranty_list[:16]:
        o = orders_map.get(w["order_id"])
        if not o: continue
        add(o["client_id"], "WARRANTY_UPDATE", "IN_APP",
            "Cập nhật yêu cầu bảo hành",
            f"Yêu cầu bảo hành {w['warranty_id']} đang được xử lý. Chúng tôi sẽ liên hệ sớm.",
            w["warranty_id"], "WARRANTY", w["created_at"])

    # REPAIR_QUOTE_ISSUED
    for q in repair_list:
        w = next((x for x in warranty_list if x["warranty_id"] == q["warranty_id"]), None)
        if not w: continue
        o = orders_map.get(w["order_id"])
        if not o: continue
        add(o["client_id"], "REPAIR_QUOTE_ISSUED", "IN_APP",
            "Báo giá sửa chữa đã được gửi",
            f"Báo giá cho yêu cầu {w['warranty_id']} đã sẵn sàng. Vui lòng xem xét và phản hồi.",
            w["warranty_id"], "WARRANTY", q["created_at"])

    # REFUND_PROCESSED
    for r in refund_list[:12]:
        clt = random.choice(customer_client_ids)
        add(clt, "REFUND_PROCESSED", "EMAIL",
            "Hoàn tiền đã được xử lý",
            f"Giao dịch hoàn tiền {r['refund_id']} đã được xử lý. Tiền sẽ về tài khoản trong 3-5 ngày.",
            r["refund_id"], "REFUND", r["created_at"])

    # VOUCHER_ISSUED
    for cv in cv_list[:12]:
        add(cv["client_id"], "VOUCHER_ISSUED", "IN_APP",
            "Bạn vừa nhận được voucher mới",
            "RENGA tặng bạn voucher ưu đãi. Kiểm tra mục Voucher của tôi để sử dụng ngay!",
            cv["voucher_id"], None, cv["issued_at"])

    # BIRTHDAY_GIFT
    for clt_id in random.sample(customer_client_ids, min(12, len(customer_client_ids))):
        add(clt_id, "BIRTHDAY_GIFT", "EMAIL",
            "Chúc mừng sinh nhật! Quà tặng từ RENGA đang chờ bạn 🎂",
            "Nhân dịp sinh nhật, RENGA gửi tặng bạn voucher giảm 5% cho đơn hàng tiếp theo.",
            None, None, rand_dt())

    # CANCEL_RESULT
    for c in cancel_list:
        o = orders_map.get(c["order_id"])
        if not o: continue
        result = "đã được chấp nhận" if c["status"] == "APPROVED" else "không được chấp nhận"
        add(o["client_id"], "CANCEL_RESULT", "EMAIL",
            "Kết quả xử lý yêu cầu hủy đơn hàng",
            f"Yêu cầu hủy đơn {c['order_id']} của bạn {result}.",
            c["order_id"], "ORDER", c["created_at"])

    return {"NOTIFICATION": notifications}


# ══════════════════════════════════════════════════════
# MAIN
# ══════════════════════════════════════════════════════

def main():
    print("=" * 55)
    print("  RENGA Mock Data Generator  (schema-aligned)")
    print("=" * 55)

    sh = {}

    steps = [
        ("01_prerequisite.json", gen_prerequisite),
        ("02_employee.json",     gen_employee),
        ("03_customer.json",     gen_customer),
        ("04_studio.json",       gen_studio),
        ("05_schedule.json",     gen_schedule),
        ("06_product.json",      gen_product),
        ("07_order.json",        gen_order),
        ("08_payment.json",      gen_payment),
        ("09_appointment.json",  gen_appointment),
        ("10_interaction.json",  gen_interaction),
        ("11_postcare.json",     gen_postcare),
        ("12_chatbot.json",      gen_chatbot),
        ("13_notification.json", gen_notification),
    ]

    for filename, fn in steps:
        print(f"\n[{filename}]")
        data = fn(sh)
        # Re-save schedule với slot is_available đã cập nhật sau appointment gen
        if filename == "05_schedule.json":
            sh["_schedule_data"] = data
        save(filename, data)

    # Re-save 05 sau appointment (slot is_available updated)
    print("\n[Re-save 05_schedule.json - update is_available slots]")
    refreshed = {
        "DESIGNER_SCHEDULE": sh["_schedule_data"]["DESIGNER_SCHEDULE"],
        "APPOINTMENT_SLOT":  sh["slots_list"],
    }
    save("05_schedule.json", refreshed)

    print(f"\n{'='*55}")
    print(f"  Output: {OUT_DIR}")
    print("  Done!")
    print("=" * 55)


if __name__ == "__main__":
    main()