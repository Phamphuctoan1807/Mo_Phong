# 🚀 Sorting Algorithm Studio (22 Thuật Toán - GitHub Pages Ready)

Một ứng dụng trực quan hóa và bách khoa toàn thư toàn diện về **22 thuật toán sắp xếp kinh điển & công nghiệp**, được thiết kế tối ưu để chạy trực tiếp trên **GitHub Pages** không cần build tool hay cài đặt phức tạp.

---

## ✨ Điểm nổi bật của dự án

1. **Tab "🎯 Mô phỏng" (Simulation Studio):**
   - **Đầu vào tùy biến hoàn toàn:** Cho phép nhập dãy số bất kỳ, hỗ trợ **số âm**, **số thực (thập phân)** và **không giới hạn số lượng phần tử**.
   - **Trục tọa độ số 0 (Zero-Axis Baseline):** Biểu diễn các số âm quay xuống dưới (tone màu đỏ cam) và số dương vươn lên trên (tone màu xanh dương/cyan) cực kỳ trực quan.
   - **Mô phỏng mã nguồn C++ Việt hóa đồng bộ từng dòng:** Dòng code đang chạy sẽ được tô sáng (highlight), các biến số đặt tên bằng Tiếng Việt (`chot`, `dau`, `cuoi`, `trai`, `phai`, `giaTriChen`, `doSauToiDa`...), kèm hộp thoại diễn giải chi tiết logic tại bước đó.
   - **Theo dõi biến thời gian thực (Variable Watcher):** Hiển thị giá trị tức thời của các biến.
   - **Bộ điều khiển linh hoạt:** Chạy tự động (Play), Tạm dừng (Pause), Chạy từng bước (Step), Đặt lại (Reset) và thanh trượt tùy chỉnh tốc độ.

2. **Tab "📚 Thuật toán" (Bách khoa toàn thư 22 thuật toán):**
   - Giới thiệu chi tiết 22 thuật toán:
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
     12. **Bucket Sort** (Sắp xếp theo thùng)
     13. **Counting Sort** (Sắp xếp đếm tuyến tính O(N+K))
     14. **Radix Sort** (Sắp xếp cơ số LSD)
     15. **Bogo Sort** (Sắp xếp ngẫu nhiên - Giáo dục)
     16. **TimSort** (Chuẩn công nghiệp Python & Java - Thuật toán lai)
     17. **IntroSort** (Chuẩn C++ std::sort - Thuật toán nội quan)
     18. **Cycle Sort** (Sắp xếp chu trình - Tối ưu số lần ghi vào RAM/Flash)
     19. **Pancake Sort** (Sắp xếp bánh kếp - Bài toán lật mảng của Bill Gates)
     20. **Bitonic Sort** (Sắp xếp song song trên GPU & Card đồ họa)
     21. **Odd-Even Sort** (Sắp xếp chẵn lẻ / Brick Sort)
     22. **Stooge Sort** (Sắp xếp đệ quy 2/3 giáo dục kinh điển)
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
