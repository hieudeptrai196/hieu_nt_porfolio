# Hướng Dẫn Cấu Hình Google Search API

Để tính năng tìm kiếm hoạt động "như thật", bạn cần lấy **2 thông số** từ Google và dán vào code. Hoàn toàn miễn phí (100 lượt/ngày).

## Bước 1: Lấy Search Engine ID (CX)

1.  Truy cập: [Google Programmable Search Engine](https://programmablesearchengine.google.com/controlpanel/create).
2.  **Đặt tên:** Bất kỳ (ví dụ: `Portfolio Search`).
3.  **Bạn muốn tìm kiếm gì?**: Chọn **"Tìm kiếm trên toàn bộ web"** (Search the entire web).
    - _Lưu ý: Phải bật tùy chọn này Google mới cho tìm cả internet. Nếu không nó chỉ tìm trên web của bạn thôi._
4.  Bấm **Tạo** (Create).
5.  Sau khi tạo xong, bạn sẽ thấy mã **Search Engine ID** (có dạng giống `cx=0123456789...`).
    - 👉 **Copy mã này lại.**

## Bước 2: Lấy API Key

1.  Truy cập: [Google Cloud Credentials](https://console.cloud.google.com/apis/credentials).
2.  Nếu chưa có Project, bấm **Create Project** (đặt tên gì cũng được).
3.  Bấm vào nút **+ CREATE CREDENTIALS** (Tạo thông tin xác thực) -> chọn **API Key**.
4.  Màn hình sẽ hiện ra một chuỗi ký tự dài ngoằng.
    - 👉 **Copy API Key này lại.**

## Bước 3: Kích hoạt Custom Search API

1.  Truy cập: [Thư viện API (Library)](https://console.cloud.google.com/apis/library/customsearch.googleapis.com).
2.  Bấm nút **ENABLE** (Bật) để cho phép Key của bạn dùng dịch vụ tìm kiếm này.

---

## Bước 4: Nhập vào Code

1.  Mở file: `src/components/Search.jsx`
2.  Tìm đến dòng khoảng 49-50:
    ```javascript
    const API_KEY = "YOUR_GOOGLE_API_KEY_HERE";
    const CX = "YOUR_SEARCH_ENGINE_ID_HERE";
    ```
3.  Thay thế bằng mã bạn vừa copy:
    ```javascript
    const API_KEY = "AIzaSyD......."; // API Key từ Bước 2
    const CX = "a1b2c3d4......"; // CX ID từ Bước 1
    ```
4.  Lưu file lại (Ctrl + S).

🎉 **Xong! Bây giờ web của bạn đã có thể tìm kiếm cả thế giới!**
