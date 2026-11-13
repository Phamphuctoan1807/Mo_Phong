# 🚀 Sorting Algorithm Studio (GitHub Pages Ready)

Một ứng dụng trực quan hóa và bách khoa toàn thư toàn diện về **15 thuật toán sắp xếp kinh điển**, được thiết kế tối ưu để chạy trực tiếp trên **GitHub Pages** không cần build tool hay cài đặt phức tạp.

---

## ✨ Điểm nổi bật của dự án

1. **Tab "🎯 Mô phỏng" (Simulation Studio):**
   - **Đầu vào tùy biến hoàn toàn:** Cho phép nhập dãy số bất kỳ, hỗ trợ **số âm**, **số thực (thập phân)** và **không giới hạn số lượng phần tử**.
   - **Trục tọa độ số 0 (Zero-Axis Baseline):** Biểu diễn các số âm quay xuống dưới (tone màu đỏ cam) và số dương vươn lên trên (tone màu xanh dương/cyan) cực kỳ trực quan.
   - **Mô phỏng mã nguồn đồng bộ từng dòng (C++):** Dòng code đang chạy sẽ được tô sáng (highlight), kèm hộp thoại diễn giải chi tiết logic tại bước đó (ví dụ: đang so sánh `a[i]` với `pivot`, đang hoán đổi, hay chốt vị trí).
   - **Theo dõi biến thời gian thực (Variable Watcher):** Hiển thị giá trị tức thời của các biến như `i`, `j`, `pivot`, `key`, `mid`, `gap`...
   - **Bộ điều khiển linh hoạt:** Chạy tự động (Play), Tạm dừng (Pause), Chạy từng bước (Step), Đặt lại (Reset) và thanh trượt tùy chỉnh tốc độ.

2. **Tab "📚 Thuật toán" (15 Algorithms Encyclopedia):**
   - Giới thiệu chi tiết 15 thuật toán:
     1. **Quick Sort** (Sắp xếp nhanh)
     2. **Merge Sort** (Sắp xếp trộn)
     3. **Heap Sort** (Sắp xếp vun đống)
     4. **Insertion Sort** (Sắp xếp chèn)
     5. **Binary Insertion Sort** (Chèn nhị phân)
     6. **Selection Sort** (Sắp xếp chọn)
     7. **Bubble Sort** (Sắp xếp nổi bọt)
     8. **Shell Sort** (Sắp xếp Shell)
     9. **Cocktail Shaker Sort** (Nổi bọt 2 chiều)
     10. **Gnome Sort** (Sắp xếp chú lùn)
     11. **Comb Sort** (Sắp xếp lược)
     12. **Bucket Sort** (Sắp xếp theo thùng - Rất tốt cho số thực)
     13. **Counting Sort** (Sắp xếp đếm tuyến tính O(N+K))
     14. **Radix Sort** (Sắp xếp cơ số LSD)
     15. **Bogo Sort** (Sắp xếp ngẫu nhiên - Giáo dục)
   - Mỗi thuật toán gồm:
     - Bảng độ phức tạp thời gian (Tốt nhất, Trung bình, Xấu nhất), không gian bộ nhớ, tính ổn định (Stable).
     - Chi tiết từng bước logic hoạt động.
     - Phân tích Ưu điểm & Nhược điểm.
     - **Bảng mô phỏng mini tương tác (Interactive Mini Visualizer)** ngay trên thẻ: Có nút `[▶ Chạy mô phỏng mini]` chạy trực tiếp tại chỗ và nút `[🎯 Mở trong tab Mô phỏng chính]`.

---

## 🌐 Hướng dẫn triển khai lên GitHub Pages (3 phút)

1. **Khởi tạo và đẩy mã nguồn lên GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Sorting Algorithm Studio"
   git branch -M main
   git remote add origin https://github.com/<tai-khoan-cua-ban>/<ten-repository>.git
   git push -u origin main
   ```

2. **Bật GitHub Pages:**
   - Vào repository trên GitHub > Chọn tab **Settings**.
   - Tại menu bên trái, chọn **Pages**.
   - Mục **Branch**: chọn `main` và thư mục `/ (root)`.
   - Nhấn **Save**.

3. **Truy cập web:**
   - Sau 1 phút, trang web sẽ chạy trực tiếp tại:  
     `https://<tai-khoan-cua-ban>.github.io/<ten-repository>/`
