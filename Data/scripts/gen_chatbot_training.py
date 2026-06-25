"""
RENGA - Chatbot Training Data Generator
Output: Data/chatbot_training.json
Format: intent-based (compatible with Rasa, ChatterBot, Dialogflow, fine-tuning)
"""
import json, sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

OUT = Path(__file__).resolve().parent / "chatbot_training.json"

intents = [

    # ─── CHÀO HỎI ────────────────────────────────────────────────
    {
        "tag": "chao_hoi",
        "topic": "GENERAL",
        "patterns": [
            "Xin chào", "Chào RENGA", "Hello", "Hi bạn ơi", "Alo",
            "Hey", "Chào buổi sáng", "Chào buổi tối", "Cho mình hỏi chút",
            "Bạn có thể giúp mình không", "Mình cần hỗ trợ"
        ],
        "responses": [
            "Xin chào! Tôi là trợ lý ảo của RENGA – tiệm trang sức cao cấp. Tôi có thể giúp gì cho bạn?",
            "Chào mừng bạn đến với RENGA! Bạn cần tư vấn sản phẩm, đặt hàng hay hỗ trợ gì khác không?"
        ]
    },
    {
        "tag": "tam_biet",
        "topic": "GENERAL",
        "patterns": [
            "Tạm biệt", "Bye", "Cảm ơn nhé", "Thôi mình đi", "Cảm ơn bạn nhiều",
            "Hẹn gặp lại", "Mình hiểu rồi cảm ơn", "Okay cảm ơn", "Xong rồi cảm ơn"
        ],
        "responses": [
            "Cảm ơn bạn đã liên hệ RENGA! Chúc bạn một ngày tốt lành. Hẹn gặp lại! ✨",
            "Tạm biệt bạn! Nếu cần thêm hỗ trợ, RENGA luôn sẵn sàng. ❤️"
        ]
    },

    # ─── SẢN PHẨM – TỔNG QUAN ────────────────────────────────────
    {
        "tag": "san_pham_danh_sach",
        "topic": "PRODUCT",
        "patterns": [
            "RENGA bán những sản phẩm gì", "Có những loại trang sức nào",
            "Danh mục sản phẩm của RENGA", "Mình muốn xem trang sức",
            "Các dòng sản phẩm của shop", "Shop có những gì",
            "RENGA kinh doanh gì", "Trang sức RENGA gồm những loại nào"
        ],
        "responses": [
            "RENGA hiện có 7 danh mục: Nhẫn, Dây chuyền, Lắc tay, Hoa tai, Mặt dây chuyền, Bộ trang sức và Charm. Bạn quan tâm danh mục nào?"
        ]
    },
    {
        "tag": "san_pham_chat_lieu",
        "topic": "PRODUCT",
        "patterns": [
            "Trang sức làm bằng gì", "Chất liệu vàng mấy k",
            "Có vàng 18k không", "Bạch kim là gì", "Bán bạc 925 không",
            "Rose gold có không", "Sản phẩm làm từ chất liệu gì",
            "Vàng 14k hay 18k tốt hơn", "RENGA dùng vàng gì",
            "[sản phẩm] làm bằng chất liệu gì"
        ],
        "responses": [
            "RENGA sử dụng các chất liệu cao cấp: Vàng 18K, Vàng 14K, Vàng trắng 18K, Rose Gold, Bạch kim (Platinum) và Bạc 925. Thông tin chất liệu chi tiết có trong phần mô tả từng sản phẩm."
        ]
    },
    {
        "tag": "san_pham_da_quy",
        "topic": "PRODUCT",
        "patterns": [
            "Đá kim cương có giấy chứng nhận không", "GIA là gì", "IGI là gì",
            "Sản phẩm có certificate không", "Đá sapphire của RENGA",
            "Ruby có thật không", "Đá quý được kiểm định ở đâu",
            "[sản phẩm] đính đá gì", "Carat kim cương bao nhiêu"
        ],
        "responses": [
            "Kim cương và đá quý tại RENGA đều có giấy kiểm định GIA hoặc IGI đi kèm. Thông tin loại đá và carat ghi rõ trong thông số sản phẩm."
        ]
    },
    {
        "tag": "san_pham_bao_quan",
        "topic": "PRODUCT",
        "patterns": [
            "Bảo quản trang sức như thế nào", "Nhẫn vàng có bị đen không",
            "Bạc có bị xỉn không", "Cách giữ trang sức sáng bóng",
            "Đeo vào nước được không", "Trang sức có bị oxi hóa không",
            "Vệ sinh trang sức cách nào", "Có bị ảnh hưởng bởi hóa chất không"
        ],
        "responses": [
            "Vàng 18K và Bạch kim rất ít bị oxi hóa. Bạc 925 có thể xỉn màu theo thời gian. Bảo quản: để nơi khô ráo, tránh tiếp xúc hóa chất, nước biển và nước hoa. Lau nhẹ bằng vải mềm sau khi đeo. Bạn có thể mang đến RENGA để vệ sinh chuyên nghiệp miễn phí."
        ]
    },
    {
        "tag": "san_pham_chon_size_nhan",
        "topic": "PRODUCT",
        "patterns": [
            "Làm thế nào để chọn kích thước nhẫn", "Đo size nhẫn như nào",
            "Size 14 là bao nhiêu mm", "Nhẫn size nào vừa tay",
            "Cách đo chu vi ngón tay", "Tôi không biết size nhẫn của mình",
            "Size nhẫn 16 là gì", "Bảng size nhẫn ở đâu"
        ],
        "responses": [
            "Bạn có thể đo size bằng cách dùng thước mềm hoặc sợi dây quấn quanh ngón tay, sau đó đo chiều dài (mm) để ra chu vi. Bảng quy đổi size chi tiết có trên website RENGA. Hoặc bạn có thể ghé cửa hàng để được đo trực tiếp miễn phí."
        ]
    },
    {
        "tag": "san_pham_size_co_san",
        "topic": "PRODUCT",
        "patterns": [
            "Sản phẩm có những size nào", "Hết size rồi làm sao",
            "Khi nào có hàng lại", "Size nhẫn 10 còn không",
            "Còn hàng không", "Sản phẩm đang hết hàng",
            "[sản phẩm] có size nào", "Tôi cần size khác"
        ],
        "responses": [
            "Các size có sẵn hiển thị trực tiếp trong trang sản phẩm. Nếu size bạn cần hết hàng, bạn có thể để lại thông tin – RENGA sẽ liên hệ khi có hàng. Với nhẫn, RENGA cũng hỗ trợ đặt làm theo size qua dịch vụ The Studio."
        ]
    },
    {
        "tag": "san_pham_gia",
        "topic": "PRODUCT",
        "patterns": [
            "Giá bao nhiêu", "Sản phẩm giá bao nhiêu tiền",
            "Có sản phẩm rẻ không", "Nhẫn kim cương giá mấy",
            "Giá đã bao gồm gì chưa", "Giá chưa gồm phí khắc",
            "[sản phẩm] giá bao nhiêu", "Giá hiển thị đã VAT chưa"
        ],
        "responses": [
            "Giá hiển thị trên website đã bao gồm 10% VAT. Đây là giá cơ bản, chưa bao gồm phí khắc chữ hoặc gia công thêm (nếu bạn chọn). Các tùy chọn bổ sung sẽ được cộng vào khi bạn chọn trong trang sản phẩm."
        ]
    },
    {
        "tag": "san_pham_nhan_cuoi",
        "topic": "PRODUCT",
        "patterns": [
            "Có nhẫn cưới không", "Nhẫn đôi mua ở đâu", "Mua nhẫn cưới cho 2 người",
            "Set nhẫn đôi giá bao nhiêu", "Nhẫn cưới có customize không",
            "Nhẫn nam nhẫn nữ có không", "Mua nhẫn cưới tại RENGA"
        ],
        "responses": [
            "RENGA có gói nhẫn cưới đôi với ưu đãi tốt hơn mua riêng lẻ. Bạn có thể chọn nhẫn có sẵn hoặc đặt thiết kế riêng theo ý muốn qua dịch vụ The Designer. Liên hệ RENGA để được tư vấn chi tiết."
        ]
    },

    # ─── ĐẶT HÀNG ────────────────────────────────────────────────
    {
        "tag": "dat_hang",
        "topic": "ORDER",
        "patterns": [
            "Làm thế nào để đặt hàng", "Cách mua hàng trên RENGA",
            "Đặt hàng online như thế nào", "Mua hàng không cần tài khoản được không",
            "Có thể đặt qua điện thoại không", "Đặt hàng ở đâu",
            "Quy trình mua hàng như thế nào", "Mua hàng trên website"
        ],
        "responses": [
            "Bạn có thể đặt hàng trực tiếp trên website RENGA hoặc gọi hotline 1800-RENGA. Đặt hàng không cần tài khoản (đặt với tư cách khách), nhưng đăng ký tài khoản sẽ giúp bạn tích điểm và theo dõi đơn hàng dễ hơn."
        ]
    },
    {
        "tag": "theo_doi_don_hang",
        "topic": "ORDER",
        "patterns": [
            "Theo dõi đơn hàng ở đâu", "Kiểm tra trạng thái đơn",
            "Đơn hàng của tôi đang ở đâu", "Bao giờ thì được giao hàng",
            "Xem lịch sử đơn hàng", "Đơn đang được xử lý chưa",
            "Làm sao biết đơn đã xác nhận", "Tracking đơn hàng"
        ],
        "responses": [
            "Đăng nhập tài khoản → Lịch sử đơn hàng để xem trạng thái đơn theo thời gian thực. Bạn cũng sẽ nhận thông báo qua email/SMS khi đơn chuyển trạng thái."
        ]
    },
    {
        "tag": "huy_don_hang",
        "topic": "ORDER",
        "patterns": [
            "Hủy đơn hàng được không", "Muốn hủy đơn vừa đặt",
            "Đổi ý không mua nữa", "Cancel đơn như thế nào",
            "Hủy đơn sau bao lâu", "Có thể hủy sau khi thanh toán không",
            "Tôi đặt nhầm muốn hủy", "Thời gian hủy đơn"
        ],
        "responses": [
            "Bạn có thể tự hủy đơn trong vòng 2 giờ đầu sau khi đặt. Sau đó vui lòng liên hệ CSKH qua hotline hoặc chat để được hỗ trợ. Lưu ý: đơn đang vận chuyển hoặc đã đóng gói không thể hủy."
        ]
    },
    {
        "tag": "thoi_gian_giao_hang",
        "topic": "ORDER",
        "patterns": [
            "Bao lâu thì nhận được hàng", "Ship bao nhiêu ngày",
            "Giao hàng mất mấy ngày", "Tỉnh thành khác bao lâu",
            "Hàng nội thành giao nhanh không", "Ship toàn quốc không",
            "Thời gian vận chuyển tới Hà Nội", "Giao hàng Đà Nẵng mất mấy ngày"
        ],
        "responses": [
            "Với hàng có sẵn: nội thành TP.HCM 1–2 ngày làm việc, tỉnh thành khác 3–5 ngày làm việc. Với đơn tùy biến/thiết kế: sau khi chế tác xong (7–30 ngày), giao hàng thêm 1–3 ngày. Bạn sẽ nhận thông báo khi đơn được giao cho đơn vị vận chuyển."
        ]
    },
    {
        "tag": "phi_van_chuyen",
        "topic": "ORDER",
        "patterns": [
            "Phí ship bao nhiêu", "Giao hàng miễn phí không",
            "Free ship từ bao nhiêu tiền", "Phí vận chuyển tính như thế nào",
            "Đơn dưới 2 triệu ship mấy tiền", "Có miễn phí vận chuyển không"
        ],
        "responses": [
            "Miễn phí vận chuyển cho đơn từ 2.000.000đ trở lên. Đơn dưới 2 triệu: phí ship 30.000đ–50.000đ tùy khu vực."
        ]
    },
    {
        "tag": "kiem_tra_hang_truoc_khi_nhan",
        "topic": "ORDER",
        "patterns": [
            "Được xem hàng trước khi trả tiền không", "Kiểm tra hàng COD",
            "Hàng giao đến có được mở xem không", "Shipper cho xem hàng không",
            "Nhận hàng mà thấy hỏng thì sao", "Hàng bị lỗi khi giao"
        ],
        "responses": [
            "Bạn được kiểm tra bên ngoài bao bì khi nhận. Nếu phát hiện hư hỏng hoặc bao bì không nguyên vẹn, ghi nhận ngay với shipper và liên hệ RENGA trong vòng 24 giờ để được hỗ trợ xử lý."
        ]
    },

    # ─── THANH TOÁN ──────────────────────────────────────────────
    {
        "tag": "phuong_thuc_thanh_toan",
        "topic": "PAYMENT",
        "patterns": [
            "Thanh toán bằng gì", "Có nhận tiền mặt không",
            "Thanh toán MoMo được không", "Có ZaloPay không",
            "Chuyển khoản được không", "COD có không",
            "Các hình thức thanh toán", "Thẻ tín dụng thanh toán được không"
        ],
        "responses": [
            "RENGA hỗ trợ: Thẻ tín dụng/ghi nợ, Chuyển khoản ngân hàng, MoMo, ZaloPay và COD (thanh toán khi nhận hàng). Bạn chọn phương thức ở bước thanh toán trong giỏ hàng."
        ]
    },
    {
        "tag": "vat_gia",
        "topic": "PAYMENT",
        "patterns": [
            "Giá đã có VAT chưa", "Thuế VAT tính riêng không",
            "Giá trên web là giá cuối không", "10% VAT tính vào giá chưa",
            "Có phát sinh thêm phí không", "Giá niêm yết bao gồm gì"
        ],
        "responses": [
            "Giá hiển thị trên website RENGA đã bao gồm 10% VAT. Không phát sinh thêm thuế hay phí ẩn, ngoài phí vận chuyển và phí gia công thêm nếu bạn chọn tùy chọn tùy biến."
        ]
    },
    {
        "tag": "tra_gop",
        "topic": "PAYMENT",
        "patterns": [
            "Thanh toán trả góp được không", "Mua trả góp có không",
            "Trả nhiều lần được không", "Có hỗ trợ installment không",
            "Mua góp qua thẻ được không"
        ],
        "responses": [
            "Hiện tại RENGA chưa hỗ trợ trả góp trực tiếp. Tính năng này đang trong lộ trình phát triển. Bạn có thể liên hệ ngân hàng phát hành thẻ để hỏi về chương trình trả góp 0% lãi suất của ngân hàng."
        ]
    },
    {
        "tag": "voucher",
        "topic": "PAYMENT",
        "patterns": [
            "Dùng voucher như thế nào", "Nhập mã giảm giá ở đâu",
            "Mã voucher không dùng được", "Có mã giảm giá không",
            "Voucher áp dụng cho đơn nào", "Dùng nhiều voucher cùng lúc được không",
            "Mã khuyến mãi RENGA", "RENGA2026 là mã gì",
            "Voucher kết hợp điểm thưởng được không"
        ],
        "responses": [
            "Nhập mã voucher tại bước thanh toán trong giỏ hàng. Mỗi đơn chỉ áp dụng 1 voucher, nhưng có thể kết hợp với điểm thưởng. Voucher có thể có điều kiện về giá trị đơn tối thiểu hoặc danh mục áp dụng – kiểm tra điều kiện trong phần thông tin voucher."
        ]
    },

    # ─── ĐIỂM THƯỞNG & THÀNH VIÊN ────────────────────────────────
    {
        "tag": "tich_diem",
        "topic": "MEMBERSHIP",
        "patterns": [
            "Tích điểm như thế nào", "Mua hàng có điểm không",
            "1 đơn hàng được bao nhiêu điểm", "Điểm thưởng tính ra sao",
            "Viết review được điểm không", "Cách kiếm điểm thưởng",
            "Điểm RENGA dùng để làm gì"
        ],
        "responses": [
            "Mỗi 100.000đ mua hàng = 100 điểm. Viết review kèm ảnh = 50 điểm. Điểm tích lũy dùng để đổi giảm giá cho đơn tiếp theo: 1.000 điểm = 10.000đ."
        ]
    },
    {
        "tag": "doi_diem",
        "topic": "MEMBERSHIP",
        "patterns": [
            "Đổi điểm như thế nào", "Dùng điểm để giảm giá",
            "Điểm thưởng xài ở đâu", "1000 điểm đổi được bao nhiêu",
            "Điểm có hết hạn không", "Quy đổi điểm thưởng"
        ],
        "responses": [
            "Vào mục Điểm thưởng trong tài khoản → Đổi điểm. Tỷ lệ: 1.000 điểm = 10.000đ giảm giá. Điểm có thể kết hợp với voucher trên cùng một đơn."
        ]
    },
    {
        "tag": "hang_thanh_vien",
        "topic": "MEMBERSHIP",
        "patterns": [
            "Có mấy hạng thành viên", "Hạng Diamond ưu đãi gì",
            "Lên hạng Gold cần mua bao nhiêu", "Platinum là bao nhiêu tiền",
            "Phân biệt Silver Gold Platinum Diamond", "Hạng thành viên được lợi gì",
            "Điều kiện để lên hạng Diamond"
        ],
        "responses": [
            "RENGA có 4 hạng thành viên: Silver (0–4.999.999đ), Gold (5–14.999.999đ), Platinum (15–39.999.999đ), Diamond (từ 40.000.000đ). Hạng càng cao, ưu đãi càng nhiều: Diamond được bảo hành vĩnh viễn, ưu tiên đặt lịch nghệ nhân và nhiều quyền lợi đặc biệt."
        ]
    },
    {
        "tag": "bao_hanh_diamond",
        "topic": "MEMBERSHIP",
        "patterns": [
            "Diamond được bảo hành vĩnh viễn không", "Hạng Diamond có gì đặc biệt",
            "Ưu đãi của thành viên Diamond", "Cần mua bao nhiêu để là Diamond"
        ],
        "responses": [
            "Thành viên Diamond (tích lũy từ 40.000.000đ) được hưởng bảo hành vĩnh viễn cho tất cả sản phẩm RENGA, ưu tiên đặt lịch nghệ nhân, và các chương trình ưu đãi độc quyền."
        ]
    },

    # ─── TÙY BIẾN – THE STUDIO ───────────────────────────────────
    {
        "tag": "the_studio_la_gi",
        "topic": "CUSTOMIZATION",
        "patterns": [
            "The Studio là gì", "Dịch vụ tùy biến của RENGA",
            "Đặt trang sức theo yêu cầu", "Customization tại RENGA",
            "Thiết kế trang sức riêng", "The Studio hoạt động thế nào",
            "Mình muốn đặt trang sức độc đáo"
        ],
        "responses": [
            "The Studio là dịch vụ tùy biến trang sức của RENGA, gồm 2 nhánh: The Studio (tùy biến từ phôi có sẵn – nhanh hơn) và The Designer (thiết kế riêng hoàn toàn từ ý tưởng của bạn, tư vấn trực tiếp với nghệ nhân)."
        ]
    },
    {
        "tag": "gia_tuy_bien",
        "topic": "CUSTOMIZATION",
        "patterns": [
            "Giá tùy biến tính như thế nào", "The Studio giá bao nhiêu",
            "Phí khắc chữ là bao nhiêu", "Gia công phí thế nào",
            "Chi phí thiết kế riêng", "Tùy biến tốn bao nhiêu tiền"
        ],
        "responses": [
            "Giá tùy biến = giá phôi + phí gia công + giá đá (nếu có) + phí khắc chữ (nếu có). Bạn xem bảng giá chi tiết tại trang The Studio trên website RENGA."
        ]
    },
    {
        "tag": "thoi_gian_tuy_bien",
        "topic": "CUSTOMIZATION",
        "patterns": [
            "Đặt tùy biến mất bao lâu", "The Studio mất mấy ngày",
            "Thiết kế riêng bao lâu xong", "Khi nào nhận được đơn custom",
            "Chế tác mất bao lâu", "DESIGN order mất bao nhiêu thời gian"
        ],
        "responses": [
            "Đơn tùy biến từ The Studio: 7–14 ngày làm việc. Đơn thiết kế riêng (The Designer): 15–30 ngày tùy độ phức tạp. Sau khi hoàn thành chế tác, giao hàng thêm 1–3 ngày."
        ]
    },
    {
        "tag": "theo_doi_che_tac",
        "topic": "CUSTOMIZATION",
        "patterns": [
            "Theo dõi tiến độ chế tác ở đâu", "Đơn tùy biến đang chế tác chưa",
            "Xem trạng thái CRAFTING", "Biết bao giờ chế tác xong",
            "Cập nhật tiến độ đơn design"
        ],
        "responses": [
            "Đăng nhập → Đơn hàng của tôi → xem trạng thái chế tác cập nhật theo thời gian thực: CRAFTING (đang chế tác) → FINISHED (hoàn thành) → SHIPPED (đang giao)."
        ]
    },
    {
        "tag": "dat_coc_thiet_ke",
        "topic": "CUSTOMIZATION",
        "patterns": [
            "Đặt thiết kế phải cọc bao nhiêu", "Cần cọc trước bao nhiêu",
            "Cọc 50% có đúng không", "Phần còn lại thanh toán khi nào",
            "Đặt cọc thiết kế riêng"
        ],
        "responses": [
            "Sau khi duyệt bản thiết kế cuối cùng, bạn đặt cọc 50% giá trị đơn. Phần còn lại 50% thanh toán khi nhận hàng."
        ]
    },
    {
        "tag": "huy_sau_dat_coc",
        "topic": "CUSTOMIZATION",
        "patterns": [
            "Hủy đơn sau khi đặt cọc có lấy lại cọc không",
            "Đổi ý sau khi cọc rồi", "Hủy đơn thiết kế",
            "Cọc rồi nhưng muốn hủy", "Mất cọc nếu hủy không"
        ],
        "responses": [
            "Hủy TRƯỚC khi bắt đầu chế tác: hoàn lại 100% tiền cọc trong 3–5 ngày làm việc. Hủy SAU khi đã bắt đầu chế tác: tiền cọc không được hoàn vì nguyên vật liệu đã được sử dụng."
        ]
    },

    # ─── LỊCH HẸN TƯ VẤN (APPOINTMENT) ──────────────────────────
    {
        "tag": "dat_lich_hen",
        "topic": "APPOINTMENT",
        "patterns": [
            "Đặt lịch tư vấn như thế nào", "Hẹn gặp nghệ nhân",
            "Muốn gặp thợ kim hoàn", "Đặt lịch The Designer",
            "Tư vấn thiết kế riêng ở đâu", "Cách book lịch hẹn"
        ],
        "responses": [
            "Đăng nhập → The Designer → Chọn nghệ nhân và khung giờ phù hợp → Xác nhận đặt lịch. Mỗi buổi tư vấn 60 phút."
        ]
    },
    {
        "tag": "phi_tu_van",
        "topic": "APPOINTMENT",
        "patterns": [
            "Phí tư vấn bao nhiêu", "Tư vấn có mất tiền không",
            "Gặp nghệ nhân tốn bao nhiêu", "Phí booking lịch hẹn",
            "Consultation fee là bao nhiêu"
        ],
        "responses": [
            "Phí tư vấn dao động 450.000đ – 700.000đ tùy nghệ nhân. Khoản phí này được hoàn lại hoàn toàn khi bạn đặt đơn thiết kế sau buổi tư vấn."
        ]
    },
    {
        "tag": "doi_huy_lich_hen",
        "topic": "APPOINTMENT",
        "patterns": [
            "Đổi lịch hẹn được không", "Muốn dời lịch tư vấn",
            "Hủy lịch hẹn có mất phí không", "Cancel lịch hẹn",
            "Không đến được hẹn thì sao", "No-show có bị phạt không",
            "Đổi lịch bao nhiêu lần được"
        ],
        "responses": [
            "Đổi lịch: tối đa 1 lần, trước buổi hẹn ít nhất 24 giờ. Hủy lịch: hủy trước 24 giờ được hoàn phí tư vấn. Hủy trong vòng 24 giờ hoặc không đến (no-show): mất phí tư vấn."
        ]
    },
    {
        "tag": "buoi_tu_van_nhu_the_nao",
        "topic": "APPOINTMENT",
        "patterns": [
            "Buổi tư vấn diễn ra như thế nào", "Gặp nghệ nhân thì làm gì",
            "Mang gì đến buổi hẹn", "Cần chuẩn bị gì trước khi gặp thợ",
            "Buổi hẹn kéo dài bao lâu", "Tư vấn 60 phút làm gì"
        ],
        "responses": [
            "Buổi tư vấn kéo dài 60 phút. Nghệ nhân sẽ lắng nghe ý tưởng, tư vấn chất liệu/đá/kiểu dáng, phác thảo sơ bộ và báo giá sơ bộ. Bạn nên chuẩn bị sẵn ý tưởng hoặc hình ảnh tham khảo. Liên hệ trước nếu cần thêm thời gian."
        ]
    },

    # ─── BẢO HÀNH & ĐỔI TRẢ ─────────────────────────────────────
    {
        "tag": "chinh_sach_bao_hanh",
        "topic": "WARRANTY",
        "patterns": [
            "Bảo hành được không", "Chính sách bảo hành của RENGA",
            "Thời gian bảo hành bao lâu", "Bảo hành 12 tháng có không",
            "Bảo hành có tốn phí không", "Áp dụng bảo hành như thế nào"
        ],
        "responses": [
            "RENGA bảo hành tiêu chuẩn 12 tháng cho tất cả sản phẩm. Thành viên Diamond được bảo hành vĩnh viễn. Mang sản phẩm và hóa đơn đến cửa hàng, hoặc gửi yêu cầu tới warranty@renga.vn."
        ]
    },
    {
        "tag": "doi_tra_san_pham",
        "topic": "WARRANTY",
        "patterns": [
            "Đổi trả sản phẩm", "Trả hàng được không", "Sản phẩm bị lỗi đổi không",
            "Chính sách hoàn tiền", "7 ngày đổi trả", "Hàng lỗi từ nhà sản xuất",
            "Mua về không đúng đổi được không"
        ],
        "responses": [
            "Hỗ trợ đổi trả trong 7 ngày nếu sản phẩm lỗi từ nhà sản xuất, chưa qua sử dụng và còn nguyên bao bì. Không áp dụng với sản phẩm đã khắc chữ hoặc chỉnh sửa theo yêu cầu."
        ]
    },
    {
        "tag": "doi_tra_tuy_bien",
        "topic": "WARRANTY",
        "patterns": [
            "Đơn tùy biến có đổi trả không", "Hàng custom bị lỗi thì sao",
            "Thiết kế riêng có được hoàn tiền không", "Sản phẩm khắc tên đổi được không"
        ],
        "responses": [
            "Sản phẩm tùy biến và thiết kế riêng không áp dụng đổi trả thông thường do tính chất cá nhân hóa. Tuy nhiên, nếu lỗi từ phía RENGA (lỗi sản xuất, sai thiết kế đã duyệt), bạn sẽ được hỗ trợ hoàn toàn."
        ]
    },
    {
        "tag": "chinh_size_nhan",
        "topic": "WARRANTY",
        "patterns": [
            "Nhẫn rộng quá muốn chỉnh", "Chỉnh size nhẫn được không",
            "Nhẫn chật muốn nới ra", "Phí chỉnh size là bao nhiêu",
            "Miễn phí chỉnh nhẫn không", "Trong 30 ngày chỉnh size miễn phí không"
        ],
        "responses": [
            "RENGA hỗ trợ chỉnh size nhẫn miễn phí 1 lần trong vòng 30 ngày kể từ ngày nhận hàng. Sau 30 ngày hoặc lần thứ 2 trở đi sẽ tính phí theo bảng giá dịch vụ."
        ]
    },
    {
        "tag": "sua_chua_trang_suc",
        "topic": "WARRANTY",
        "patterns": [
            "Sửa trang sức bị gãy", "Dây chuyền bị đứt sửa được không",
            "Hoa tai mất 1 chiếc sao", "Bị mất đá có gắn lại không",
            "Sửa nhẫn méo", "Phí sửa chữa bao nhiêu"
        ],
        "responses": [
            "RENGA có dịch vụ sửa chữa và phục hồi trang sức. Mang sản phẩm đến cửa hàng để được kiểm tra và báo giá. Trong thời gian bảo hành, nhiều dịch vụ được miễn phí hoặc ưu đãi."
        ]
    },

    # ─── TÀI KHOẢN ───────────────────────────────────────────────
    {
        "tag": "dang_ky_tai_khoan",
        "topic": "ACCOUNT",
        "patterns": [
            "Đăng ký tài khoản như thế nào", "Tạo account mới",
            "Cần email không khi đăng ký", "Đăng ký bằng số điện thoại được không",
            "Lợi ích khi có tài khoản", "Có cần tài khoản để mua hàng không"
        ],
        "responses": [
            "Đăng ký tài khoản tại trang Đăng ký của RENGA bằng email hoặc số điện thoại. Có tài khoản bạn sẽ tích điểm thưởng, theo dõi đơn hàng và nhận ưu đãi thành viên. Bạn vẫn có thể mua hàng không cần tài khoản (đặt khách)."
        ]
    },
    {
        "tag": "quen_mat_khau",
        "topic": "ACCOUNT",
        "patterns": [
            "Quên mật khẩu", "Không nhớ mật khẩu", "Đổi mật khẩu như thế nào",
            "Reset password", "Lấy lại mật khẩu cũ", "Không đăng nhập được"
        ],
        "responses": [
            "Tại trang đăng nhập, chọn 'Quên mật khẩu' → nhập email/SĐT đăng ký → RENGA gửi link đặt lại mật khẩu vào email. Nếu không nhận được, kiểm tra hộp thư rác hoặc liên hệ support@renga.vn."
        ]
    },
    {
        "tag": "tai_khoan_bi_khoa",
        "topic": "ACCOUNT",
        "patterns": [
            "Tài khoản bị khóa", "Không đăng nhập được tài khoản",
            "Bị suspend account", "Tài khoản bị vô hiệu hóa",
            "Mở khóa tài khoản"
        ],
        "responses": [
            "Liên hệ support@renga.vn hoặc gọi hotline 1800-RENGA để được hỗ trợ mở khóa tài khoản. Vui lòng cung cấp thông tin xác minh khi liên hệ."
        ]
    },
    {
        "tag": "cap_nhat_thong_tin",
        "topic": "ACCOUNT",
        "patterns": [
            "Đổi địa chỉ giao hàng", "Cập nhật số điện thoại",
            "Thay đổi thông tin cá nhân", "Đổi email tài khoản",
            "Thêm địa chỉ mới"
        ],
        "responses": [
            "Đăng nhập → Tài khoản của tôi → Thông tin cá nhân (hoặc Địa chỉ) → Chỉnh sửa và lưu."
        ]
    },

    # ─── LIÊN HỆ ─────────────────────────────────────────────────
    {
        "tag": "lien_he",
        "topic": "CONTACT",
        "patterns": [
            "Liên hệ RENGA như thế nào", "Hotline RENGA là gì",
            "Email hỗ trợ khách hàng", "Địa chỉ cửa hàng ở đâu",
            "Số điện thoại CSKH", "Muốn gặp nhân viên RENGA",
            "Chat với người thật", "Giờ làm việc"
        ],
        "responses": [
            "Hotline: 1800-RENGA (miễn phí). Email: support@renga.vn. Giờ làm việc: 8:00–21:00 mỗi ngày. Bạn cũng có thể chat trực tiếp tại website hoặc inbox fanpage RENGA."
        ]
    },
    {
        "tag": "bao_hanh_lien_he",
        "topic": "CONTACT",
        "patterns": [
            "Email bảo hành", "Liên hệ bộ phận bảo hành",
            "Gửi yêu cầu bảo hành qua đâu", "warranty@renga.vn"
        ],
        "responses": [
            "Gửi yêu cầu bảo hành tới warranty@renga.vn kèm ảnh sản phẩm và số đơn hàng. Hoặc mang trực tiếp đến cửa hàng RENGA để được xử lý nhanh hơn."
        ]
    },

    # ─── KHÁC ─────────────────────────────────────────────────────
    {
        "tag": "cua_hang_renga",
        "topic": "GENERAL",
        "patterns": [
            "RENGA là gì", "Giới thiệu về RENGA", "RENGA bán ở đâu",
            "RENGA có uy tín không", "Có showroom không",
            "RENGA là thương hiệu Việt không"
        ],
        "responses": [
            "RENGA là thương hiệu trang sức cao cấp của Việt Nam, chuyên cung cấp trang sức vàng, bạc, đá quý và dịch vụ tùy biến theo yêu cầu. RENGA cam kết chất lượng với chứng nhận kiểm định GIA/IGI và bảo hành rõ ràng."
        ]
    },
    {
        "tag": "qua_tang",
        "topic": "PRODUCT",
        "patterns": [
            "Mua làm quà tặng được không", "Có gói quà không",
            "Trang sức làm quà sinh nhật", "Mua tặng bạn gái",
            "Mua tặng mẹ", "Gói quà kèm thiệp",
            "Có in hộp quà không"
        ],
        "responses": [
            "RENGA có dịch vụ gói quà sang trọng kèm thiệp handwritten theo yêu cầu. Chọn tùy chọn 'Gói quà' khi thanh toán hoặc liên hệ CSKH để được tư vấn thêm."
        ]
    },
    {
        "tag": "khac_chu",
        "topic": "CUSTOMIZATION",
        "patterns": [
            "Khắc tên lên nhẫn được không", "Có khắc chữ không",
            "Khắc ngày kỷ niệm lên trang sức", "Phí khắc chữ bao nhiêu",
            "Khắc được bao nhiêu ký tự", "Engraving có không"
        ],
        "responses": [
            "RENGA hỗ trợ khắc chữ (engraving) lên hầu hết các sản phẩm nhẫn và lắc tay. Phí khắc tùy theo số ký tự và chất liệu – xem bảng phí tại trang The Studio. Lưu ý: sản phẩm đã khắc không áp dụng đổi trả."
        ]
    },
    {
        "tag": "khong_hieu",
        "topic": "GENERAL",
        "patterns": [
            "Không hiểu", "Bạn có thể giải thích lại không",
            "Ý bạn là gì", "Tôi chưa rõ", "Giải thích giúp tôi",
            "??", "Hả", "Không biết hỏi gì"
        ],
        "responses": [
            "Xin lỗi vì chưa rõ ràng! Bạn có thể mô tả câu hỏi cụ thể hơn không? Hoặc chọn một trong các chủ đề: Sản phẩm, Đặt hàng, Thanh toán, Tùy biến, Lịch hẹn, Bảo hành, Tài khoản.",
            "Mình chưa hiểu rõ ý bạn. Bạn thử hỏi cụ thể hơn nhé! Hoặc liên hệ hotline 1800-RENGA để được hỗ trợ trực tiếp."
        ]
    },
]

output = {
    "version": "1.0",
    "store": "RENGA Jewelry",
    "language": "vi",
    "description": "Training data cho chatbot hỗ trợ khách hàng RENGA – trang sức cao cấp",
    "topics": ["GENERAL","PRODUCT","ORDER","PAYMENT","MEMBERSHIP","CUSTOMIZATION","APPOINTMENT","WARRANTY","ACCOUNT","CONTACT"],
    "stats": {
        "total_intents": len(intents),
        "total_patterns": sum(len(i["patterns"]) for i in intents),
        "total_responses": sum(len(i["responses"]) for i in intents),
    },
    "intents": intents,
}

OUT.write_text(json.dumps(output, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"✅ Đã tạo: {OUT.name}")
print(f"   Intents  : {output['stats']['total_intents']}")
print(f"   Patterns : {output['stats']['total_patterns']}")
print(f"   Responses: {output['stats']['total_responses']}")
