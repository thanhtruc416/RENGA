import time
import csv
import re
import json
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

# ==================== CẤU HÌNH ====================
START_URL = "https://ngocgems.com/collections/vong-tay-phong-thuy"
OUTPUT_FILE = "../Raw/NgocGems_Bracelet.csv"
MAX_PRODUCTS = 300

# Cấu hình Chrome options
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--window-size=1920,1080")
chrome_options.add_argument(
    "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36")

# Khởi tạo driver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

# Cấu hình columns cho CSV
COLUMNS = [
    "product_id", "product_name", "product_url", "sku", "price", "price_sale",
    "currency", "material", "gemstone", "size_options", "size_prices_json",
    "description", "images", "in_stock", "crawled_at", "source_website"
]


# ==================== HÀM LẤY TẤT CẢ LINK SẢN PHẨM ====================
def get_all_product_links():
    """Lấy tất cả link sản phẩm từ danh mục vòng tay phong thủy"""
    all_links = []
    page = 1

    while page <= 10 and len(all_links) < MAX_PRODUCTS:
        if page == 1:
            url = START_URL
        else:
            url = f"{START_URL}?page={page}"

        print(f"\n📂 Đang crawl trang {page}: {url}")
        driver.get(url)
        time.sleep(3)

        try:
            WebDriverWait(driver, 15).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".product-wrapper a[href*='/products/']"))
            )
        except:
            print(f"  ⚠️ Không tìm thấy sản phẩm trên trang {page}")
            break

        # Tìm tất cả link sản phẩm
        product_elements = driver.find_elements(By.CSS_SELECTOR, ".product-wrapper a[href*='/products/']")

        page_links = []
        for elem in product_elements:
            href = elem.get_attribute("href")
            if href and href not in all_links and href not in page_links:
                page_links.append(href)

        # Loại bỏ trùng lặp
        page_links = list(dict.fromkeys(page_links))

        if not page_links:
            break

        remaining = MAX_PRODUCTS - len(all_links)
        if len(page_links) > remaining:
            page_links = page_links[:remaining]

        all_links.extend(page_links)
        print(f"  ✅ Tìm thấy {len(page_links)} sản phẩm (Tổng: {len(all_links)}/{MAX_PRODUCTS})")

        if len(all_links) >= MAX_PRODUCTS:
            print(f"  🎯 Đã đủ {MAX_PRODUCTS} sản phẩm, dừng crawl")
            break

        page += 1
        time.sleep(1)

    print(f"\n✅ TỔNG CỘNG: {len(all_links)} link sản phẩm")
    return all_links


# ==================== TRÍCH XUẤT GIÁ THEO SIZE TỪ HTML ====================
def extract_sizes_and_prices(soup):
    """Trích xuất thông tin size và giá từ trang sản phẩm"""
    size_prices = {}

    # Cách 1: Tìm trong thẻ script JSON-LD
    scripts = soup.find_all("script", type="application/ld+json")
    for script in scripts:
        try:
            data = json.loads(script.string)
            if isinstance(data, dict) and data.get("@type") == "Product":
                offers = data.get("offers", {})
                if offers and isinstance(offers, list):
                    for offer in offers:
                        price = offer.get("price", "")
                        name = offer.get("name", "")
                        # Trích xuất size từ name (ví dụ: "8mm", "10mm")
                        size_match = re.search(r'(\d+(?:\.\d+)?)\s*mm', name, re.IGNORECASE)
                        if size_match and price:
                            size = size_match.group(1)
                            size_prices[size] = int(float(price))
        except:
            pass

    # Cách 2: Tìm trong phần variant selector
    if not size_prices:
        variant_select = soup.find("select", {"id": "product-select"})
        if variant_select:
            for option in variant_select.find_all("option"):
                text = option.get_text(strip=True)
                value = option.get("value", "")
                # Trích xuất size và giá
                size_match = re.search(r'(\d+(?:\.\d+)?)\s*mm', text, re.IGNORECASE)
                price_match = re.search(r'([\d,.]+)\s*[đ₫]', text)
                if size_match and price_match:
                    size = size_match.group(1)
                    price_str = price_match.group(1).replace(".", "").replace(",", "")
                    try:
                        price = int(price_str)
                        size_prices[size] = price
                    except:
                        pass

    # Cách 3: Tìm trong data-opt (radio buttons cho size)
    if not size_prices:
        opt_elements = soup.find_all("ul", class_=re.compile(r"data-opt\d+"))
        for opt in opt_elements:
            for li in opt.find_all("li"):
                if "hidden" not in li.get("class", []):
                    span = li.find("span")
                    if span:
                        text = span.get_text(strip=True)
                        size_match = re.search(r'(\d+(?:\.\d+)?)\s*mm', text, re.IGNORECASE)
                        if size_match:
                            size = size_match.group(1)
                            # Tìm giá tương ứng trong các thẻ script
                            price_script = soup.find("script", string=re.compile(f"{size}mm.*?price"))
                            if price_script:
                                price_match = re.search(r'price["\']?\s*:\s*([\d.]+)', price_script.string)
                                if price_match:
                                    size_prices[size] = int(float(price_match.group(1)))

    # Cách 4: Lấy từ biến JavaScript product object
    if not size_prices:
        scripts = soup.find_all("script")
        for script in scripts:
            if script.string and "var product" in script.string:
                # Tìm product object trong JavaScript
                match = re.search(r'var product\s*=\s*({[^;]+});', script.string, re.DOTALL)
                if match:
                    try:
                        # Thử parse JSON (có thể không hoàn hảo do JS object)
                        product_str = match.group(1)
                        # Thay thế các key không có quotes
                        product_str = re.sub(r'(\w+):', r'"\1":', product_str)
                        product_data = json.loads(product_str)
                        variants = product_data.get("variants", [])
                        for variant in variants:
                            title = variant.get("title", "")
                            price = variant.get("price", 0)
                            size_match = re.search(r'(\d+(?:\.\d+)?)\s*mm', title, re.IGNORECASE)
                            if size_match and price:
                                size = size_match.group(1)
                                size_prices[size] = int(price / 100) if price > 1000000 else int(price)
                    except:
                        pass

    return size_prices


# ==================== CRAWL CHI TIẾT SẢN PHẨM ====================
def crawl_product_detail(product_url, index, total):
    """Crawl thông tin chi tiết của một sản phẩm"""
    print(f"\n📦 [{index}/{total}] Đang crawl: {product_url[:80]}...")

    driver.get(product_url)
    time.sleep(2)

    try:
        WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".product-title h1, .product-info h2"))
        )
    except:
        print(f"    ⚠️ Timeout khi tải trang: {product_url}")
        return None

    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")

    # Khởi tạo data
    data = {col: "" for col in COLUMNS}
    data["product_url"] = product_url
    data["crawled_at"] = time.strftime("%Y-%m-%d %H:%M:%S")
    data["source_website"] = "NgocGems.com"
    data["currency"] = "VND"

    # Lấy tên sản phẩm
    title_elem = soup.find("h1") or soup.find("div", class_="product-title").find("h1") if soup.find("div",
                                                                                                     class_="product-title") else None
    if title_elem:
        data["product_name"] = title_elem.get_text(strip=True)
    else:
        h2_elem = soup.find("h2")
        if h2_elem:
            data["product_name"] = h2_elem.get_text(strip=True)

    # Lấy SKU
    sku_elem = soup.find("span", class_="product-sku") or soup.find(id="pro_sku")
    if sku_elem:
        sku_text = sku_elem.get_text(strip=True)
        sku_match = re.search(r'SKU:\s*(\S+)', sku_text, re.IGNORECASE)
        if sku_match:
            data["sku"] = sku_match.group(1)
        else:
            data["sku"] = sku_text.replace("SKU:", "").strip()

    # Lấy mô tả
    desc_elem = soup.find("div", id="description") or soup.find("div", class_="product-description-wrapper")
    if desc_elem:
        data["description"] = desc_elem.get_text(strip=True)[:2000]

    # Lấy ảnh
    images = []
    img_elements = soup.find_all("img", src=re.compile(r"cdn\.hstatic\.net"))
    for img in img_elements[:10]:
        src = img.get("src")
        if src and src not in images:
            images.append(src)
    data["images"] = "|".join(images)

    # Lấy giá và size
    size_prices = extract_sizes_and_prices(soup)

    if size_prices:
        # Lưu size và giá
        sizes = list(size_prices.keys())
        # Sắp xếp size theo số
        sizes.sort(key=lambda x: float(x))
        data["size_options"] = ",".join(sizes)
        data["size_prices_json"] = json.dumps(size_prices, ensure_ascii=False)

        # Lấy giá mặc định (size nhỏ nhất hoặc trung bình)
        default_price = list(size_prices.values())[0] if size_prices else ""
        if default_price:
            data["price"] = f"{default_price:,}".replace(",", ".") + "₫"

        print(f"    📏 Các size: {data['size_options']}")
        print(f"    💰 Giá theo size: {data['size_prices_json'][:100]}...")
    else:
        # Fallback: lấy giá từ HTML
        price_elem = soup.find("span", class_="price-new") or soup.find("div", class_="product-price")
        if price_elem:
            price_text = price_elem.get_text(strip=True)
            price_match = re.search(r'([\d,.]+)\s*[đ₫]', price_text)
            if price_match:
                data["price"] = price_match.group(1).replace(".", "") + "₫"

    # Lấy thông tin đá (gemstone)
    gemstone_elem = soup.find(string=re.compile(r"Thạch anh|Agate|Kyanite|Diopside|Garnet|Ngọc|Mắt hổ", re.IGNORECASE))
    if gemstone_elem:
        data["gemstone"] = gemstone_elem.strip()[:100]
    elif data["product_name"]:
        # Trích xuất từ tên sản phẩm
        if "Thạch anh" in data["product_name"]:
            data["gemstone"] = "Thạch anh"
        elif "Agate" in data["product_name"]:
            data["gemstone"] = "Agate"
        elif "Kyanite" in data["product_name"]:
            data["gemstone"] = "Kyanite"
        elif "Mắt hổ" in data["product_name"]:
            data["gemstone"] = "Mắt hổ"

    # Kiểm tra tồn kho
    stock_elem = soup.find(string=re.compile(r"Hết hàng|Tạm hết|Còn hàng", re.IGNORECASE))
    if stock_elem and "hết" in stock_elem.lower():
        data["in_stock"] = "False"
    else:
        data["in_stock"] = "True"

    # Lấy product_id từ URL
    id_match = re.search(r'/products/([^/?]+)', product_url)
    if id_match:
        data["product_id"] = id_match.group(1)

    print(f"    ✅ {data['product_name'][:50] if data['product_name'] else 'N/A'}")
    print(f"       💎 Đá: {data['gemstone']}")
    print(f"       💰 Giá: {data['price']}")
    print(f"       📏 Size: {data['size_options']}")

    return data


# ==================== MAIN ====================
def main():
    print("=" * 70)
    print("🚀 CRAWL VÒNG TAY PHONG THỦY - NGOCGEMS.COM")
    print(f"📦 Giới hạn sản phẩm: {MAX_PRODUCTS}")
    print("=" * 70)

    try:
        # Bước 1: Lấy tất cả link sản phẩm
        product_links = get_all_product_links()

        if not product_links:
            print("❌ Không tìm thấy sản phẩm nào!")
            return

        # Bước 2: Crawl từng sản phẩm
        with open(OUTPUT_FILE, "w", newline="", encoding="utf-8-sig") as f:
            writer = csv.DictWriter(f, fieldnames=COLUMNS)
            writer.writeheader()

            success_count = 0
            for i, link in enumerate(product_links, 1):
                data = crawl_product_detail(link, i, len(product_links))
                if data:
                    writer.writerow(data)
                    success_count += 1
                time.sleep(1.5)  # Delay để tránh bị chặn

        print("\n" + "=" * 70)
        print(f"✅ HOÀN THÀNH! Đã crawl {success_count}/{len(product_links)} sản phẩm")
        print(f"📁 File output: {OUTPUT_FILE}")
        print("=" * 70)

    except Exception as e:
        print(f"❌ Lỗi: {e}")
        import traceback
        traceback.print_exc()
    finally:
        driver.quit()


if __name__ == "__main__":
    main()