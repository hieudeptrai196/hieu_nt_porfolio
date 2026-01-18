# Hướng Dẫn Lấy Google Gemini API Key (Miễn Phí & Nhanh Nhất)

Đây là cách dễ nhất để có trí tuệ nhân tạo (AI) cho Website của bạn mà không tốn tiền.

## Bước 1: Truy cập Google AI Studio

1.  Bấm vào link này: **[https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)**
2.  Đăng nhập bằng Gmail của bạn (nếu chưa đăng nhập).

## Bước 2: Tạo Key

1.  Bấm vào nút to đùng màu xanh: **"Create API key"** (hoặc "Get API key").
2.  Chọn **"Create API key in new project"** (Tạo key trong dự án mới).
    - _Mẹo: Nếu nó hỏi Project nào thì cứ chọn New Project cho nhanh._

## Bước 3: Copy Key

1.  Một đoạn mã dài xuất hiện (bắt đầu bằng `AIza...`).
2.  Bấm nút **Copy**.

---

## Bước 4: Nhập vào Code (QUAN TRỌNG)

1.  Mở file `.env` trong dự án của bạn lên.
2.  Thêm dòng này vào cuối file:
    ```env
    VITE_GEMINI_API_KEY=AIzaSy... (dán mã bạn vừa copy vào đây)
    ```
3.  Lưu file lại (`Ctrl + S`).

🎉 **Xong! Bây giờ bạn đã sẵn sàng có Chatbot AI xịn xò rồi!**
