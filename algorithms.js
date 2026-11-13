// ==============================================================================
// ALGORITHMS KNOWLEDGE BASE & GENERATOR STEP ENGINES
// Hỗ trợ số âm, số thực, không giới hạn phần tử
// Mỗi thuật toán trả về 1 Generator sinh ra các bước (steps) cho animation & code trace
// ==============================================================================

const ALGORITHMS = {
    // --------------------------------------------------------------------------
    // 1. QUICK SORT
    // --------------------------------------------------------------------------
    quick_sort: {
        id: "quick_sort",
        name: "Quick Sort (Sắp xếp nhanh)",
        category: "Chia để trị & Cây",
        complexity: {
            best: "O(N log N)",
            avg: "O(N log N)",
            worst: "O(N²)",
            space: "O(log N)",
            stable: "Không"
        },
        description: "Thuật toán phân hoạch chia để trị kinh điển, chọn 1 phần tử làm pivot (chốt) và dồn các phần tử nhỏ hơn sang trái, lớn hơn sang phải.",
        logic: [
            "1. Chọn phần tử cuối mảng a[high] làm pivot.",
            "2. Khởi tạo con trỏ i = low - 1 ghi nhận ranh giới các phần tử nhỏ hơn pivot.",
            "3. Duyệt j từ low đến high - 1: Nếu a[j] < pivot, tăng i và hoán đổi a[i] với a[j].",
            "4. Đưa pivot về đúng vị trí trung tâm bằng cách hoán đổi a[i + 1] với a[high].",
            "5. Đệ quy tiếp tục sắp xếp phân vùng bên trái [low .. i] và bên phải [i + 2 .. high]."
        ],
        pros: [
            "Tốc độ thực tế cực nhanh, hiệu năng cache bộ nhớ vi xử lý tối ưu.",
            "Độ phức tạp trung bình O(N log N) với hằng số ẩn rất nhỏ.",
            "Không tốn nhiều bộ nhớ phụ trợ (chỉ tốn ngăn xếp đệ quy O(log N))."
        ],
        cons: [
            "Trường hợp xấu nhất O(N²) khi mảng đã có thứ tự và chọn pivot không tốt.",
            "Không có tính ổn định (không giữ nguyên thứ tự tương đối của các phần tử bằng nhau)."
        ],
        code: [
            "void quickSort(vector<double>& a, int low, int high) {",
            "    if (low < high) {",
            "        double pivot = a[high];",
            "        int i = low - 1;",
            "        for (int j = low; j < high; ++j) {",
            "            if (a[j] < pivot) {",
            "                i++;",
            "                swap(a[i], a[j]);",
            "            }",
            "        }",
            "        swap(a[i + 1], a[high]);",
            "        int pi = i + 1;",
            "        quickSort(a, low, pi - 1);",
            "        quickSort(a, pi + 1, high);",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            function* qs(low, high) {
                yield { line: 1, explanation: `Kiểm tra đoạn [${low}..${high}]: ${low < high ? 'Hợp lệ' : 'Đoạn rỗng/1 phần tử'}`, indices: [low, high], type: 'info', array: [...a], vars: { low, high } };
                if (low < high) {
                    let pivot = a[high];
                    yield { line: 2, explanation: `Chọn pivot = a[${high}] = ${pivot}`, indices: [high], type: 'pivot', array: [...a], vars: { low, high, pivot } };
                    let i = low - 1;
                    yield { line: 3, explanation: `Khởi tạo con trỏ i = ${i} (ranh giới nhỏ hơn pivot)`, indices: [high], type: 'info', array: [...a], vars: { i, pivot } };

                    for (let j = low; j < high; ++j) {
                        yield { line: 4, explanation: `Vòng lặp j = ${j}, so sánh a[${j}]=${a[j]} với pivot=${pivot}`, indices: [j, high], type: 'compare', array: [...a], vars: { i, j, pivot } };
                        if (a[j] < pivot) {
                            yield { line: 5, explanation: `Vì a[${j}] < pivot, tăng i và chuẩn bị hoán đổi`, indices: [j, high], type: 'info', array: [...a], vars: { i, j, pivot } };
                            i++;
                            yield { line: 6, explanation: `Tăng i lên ${i}`, indices: [i, j], type: 'info', array: [...a], vars: { i, j } };
                            [a[i], a[j]] = [a[j], a[i]];
                            yield { line: 7, explanation: `Hoán đổi a[${i}] và a[${j}]`, indices: [i, j], type: 'swap', array: [...a], vars: { i, j } };
                        }
                    }
                    [a[i + 1], a[high]] = [a[high], a[i + 1]];
                    let pi = i + 1;
                    yield { line: 10, explanation: `Đưa pivot ${pivot} về vị trí đúng a[${pi}]`, indices: [pi, high], type: 'swap', array: [...a], vars: { pi, pivot } };
                    yield { line: 11, explanation: `Phần tử a[${pi}] = ${a[pi]} đã vào đúng vị trí cuối cùng`, indices: [pi], type: 'sorted', array: [...a], vars: { pi } };

                    yield { line: 12, explanation: `Đệ quy sắp xếp nửa trái [${low} .. ${pi - 1}]`, indices: [low, pi - 1], type: 'info', array: [...a], vars: { low, high: pi - 1 } };
                    yield* qs(low, pi - 1);
                    yield { line: 13, explanation: `Đệ quy sắp xếp nửa phải [${pi + 1} .. ${high}]`, indices: [pi + 1, high], type: 'info', array: [...a], vars: { low: pi + 1, high } };
                    yield* qs(pi + 1, high);
                } else if (low === high) {
                    yield { line: 1, explanation: `Phần tử duy nhất a[${low}] = ${a[low]} tự nó đã sắp xếp`, indices: [low], type: 'sorted', array: [...a], vars: { low } };
                }
            }
            yield* qs(0, a.length - 1);
            yield { line: 15, explanation: `Hoàn tất Quick Sort trên toàn bộ mảng!`, indices: a.map((_, idx) => idx), type: 'sorted', array: [...a], vars: {} };
        }
    },

    // --------------------------------------------------------------------------
    // 2. MERGE SORT
    // --------------------------------------------------------------------------
    merge_sort: {
        id: "merge_sort",
        name: "Merge Sort (Sắp xếp trộn)",
        category: "Chia để trị & Cây",
        complexity: {
            best: "O(N log N)",
            avg: "O(N log N)",
            worst: "O(N log N)",
            space: "O(N)",
            stable: "Có"
        },
        description: "Thuật toán chia đôi mảng liên tục cho đến khi còn từng phần tử đơn lẻ, sau đó gộp (merge) từng cặp danh sách đã sắp xếp lại thành dãy hoàn chỉnh.",
        logic: [
            "1. Chia đôi dãy [left..right] tại điểm giữa mid = left + (right - left)/2.",
            "2. Đệ quy sắp xếp nửa trái [left..mid].",
            "3. Đệ quy sắp xếp nửa phải [mid + 1..right].",
            "4. Trộn hai nửa đã sắp xếp vào mảng phụ bằng cách so sánh 2 phần tử đầu ở mỗi nửa.",
            "5. Sao chép kết quả từ mảng phụ đè lại vào mảng gốc."
        ],
        pros: [
            "Thời gian luôn luôn là O(N log N) trong mọi trường hợp (tốt, trung bình, xấu nhất).",
            "Là thuật toán ổn định (Stable Sort), bảo toàn thứ tự ban đầu của các phần tử bằng nhau.",
            "Rất thích hợp cho cấu trúc danh sách liên kết (Linked List) và sắp xếp dữ liệu ngoài (External Sorting)."
        ],
        cons: [
            "Tốn bộ nhớ phụ O(N) để lưu trữ các mảng tạm thời khi trộn.",
            "Hằng số thời gian lớn hơn Quick Sort trên mảng thông thường."
        ],
        code: [
            "void mergeSort(vector<double>& a, int l, int r) {",
            "    if (l < r) {",
            "        int m = l + (r - l) / 2;",
            "        mergeSort(a, l, m);",
            "        mergeSort(a, m + 1, r);",
            "        merge(a, l, m, r);",
            "    }",
            "}",
            "void merge(vector<double>& a, int l, int m, int r) {",
            "    vector<double> temp;",
            "    int i = l, j = m + 1;",
            "    while (i <= m && j <= r)",
            "        temp.push_back(a[i] <= a[j] ? a[i++] : a[j++]);",
            "    while (i <= m) temp.push_back(a[i++]);",
            "    while (j <= r) temp.push_back(a[j++]);",
            "    for (int k = 0; k < temp.size(); ++k) a[l + k] = temp[k];",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            function* ms(l, r) {
                if (l < r) {
                    let m = Math.floor(l + (r - l) / 2);
                    yield { line: 2, explanation: `Chia đôi đoạn [${l}..${r}] tại mid = ${m}`, indices: [m], type: 'info', array: [...a], vars: { l, m, r } };
                    yield* ms(l, m);
                    yield* ms(m + 1, r);

                    yield { line: 5, explanation: `Bắt đầu trộn 2 nửa: [${l}..${m}] và [${m + 1}..${r}]`, indices: [l, r], type: 'info', array: [...a], vars: { l, m, r } };
                    let temp = [];
                    let i = l, j = m + 1;
                    while (i <= m && j <= r) {
                        yield { line: 11, explanation: `So sánh a[${i}]=${a[i]} và a[${j}]=${a[j]}`, indices: [i, j], type: 'compare', array: [...a], vars: { i, j } };
                        if (a[i] <= a[j]) {
                            yield { line: 12, explanation: `Chọn a[${i}]=${a[i]} vào mảng tạm`, indices: [i], type: 'info', array: [...a], vars: { picked: a[i] } };
                            temp.push(a[i++]);
                        } else {
                            yield { line: 12, explanation: `Chọn a[${j}]=${a[j]} vào mảng tạm`, indices: [j], type: 'info', array: [...a], vars: { picked: a[j] } };
                            temp.push(a[j++]);
                        }
                    }
                    while (i <= m) {
                        yield { line: 13, explanation: `Đưa phần tử còn lại a[${i}]=${a[i]} vào mảng tạm`, indices: [i], type: 'info', array: [...a], vars: {} };
                        temp.push(a[i++]);
                    }
                    while (j <= r) {
                        yield { line: 14, explanation: `Đưa phần tử còn lại a[${j}]=${a[j]} vào mảng tạm`, indices: [j], type: 'info', array: [...a], vars: {} };
                        temp.push(a[j++]);
                    }
                    for (let k = 0; k < temp.length; ++k) {
                        a[l + k] = temp[k];
                        yield { line: 15, explanation: `Ghi đè a[${l + k}] = ${temp[k]} từ mảng tạm vào mảng gốc`, indices: [l + k], type: 'swap', array: [...a], vars: { index: l + k, val: temp[k] } };
                    }
                }
            }
            yield* ms(0, a.length - 1);
            yield { line: 7, explanation: `Toàn bộ mảng đã được trộn và sắp xếp hoàn chỉnh!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: {} };
        }
    },

    // --------------------------------------------------------------------------
    // 3. HEAP SORT
    // --------------------------------------------------------------------------
    heap_sort: {
        id: "heap_sort",
        name: "Heap Sort (Sắp xếp vun đống)",
        category: "Chia để trị & Cây",
        complexity: {
            best: "O(N log N)",
            avg: "O(N log N)",
            worst: "O(N log N)",
            space: "O(1)",
            stable: "Không"
        },
        description: "Mô hình hóa mảng thành cấu trúc Max-Heap. Đỉnh đống luôn là giá trị lớn nhất, liên tục đưa đỉnh đống về cuối mảng và vun đống lại.",
        logic: [
            "1. Xây dựng Max-Heap từ mảng ban đầu: duyệt ngược từ n/2 - 1 về 0 và gọi heapify.",
            "2. Trong heapify: so sánh nút cha với 2 nút con (2*i+1, 2*i+2), tìm nút có giá trị lớn nhất.",
            "3. Nếu nút lớn nhất khác nút cha, hoán đổi và đệ quy vun đống tiếp tục xuống nhánh con.",
            "4. Đổi chỗ phần tử lớn nhất ở đỉnh a[0] với a[i] ở cuối vùng chưa xếp.",
            "5. Giảm kích thước đống đi 1 và vun lại đỉnh đống a[0]."
        ],
        pros: [
            "Độ phức tạp thời gian luôn là O(N log N) trong mọi trường hợp mà không cần bộ nhớ phụ (in-place O(1)).",
            "Không bị suy giảm hiệu năng xuống O(N²) như Quick Sort khi gặp dữ liệu đặc biệt."
        ],
        cons: [
            "Không ổn định (Unstable).",
            "Mẫu truy cập bộ nhớ nhảy cóc (do cấu trúc cây nhị phân trên mảng), kém thân thiện với CPU cache hơn Quick Sort."
        ],
        code: [
            "void heapSort(vector<double>& a) {",
            "    int n = a.size();",
            "    for (int i = n / 2 - 1; i >= 0; --i)",
            "        heapify(a, n, i);",
            "    for (int i = n - 1; i > 0; --i) {",
            "        swap(a[0], a[i]);",
            "        heapify(a, i, 0);",
            "    }",
            "}",
            "void heapify(vector<double>& a, int n, int i) {",
            "    int largest = i, l = 2*i + 1, r = 2*i + 2;",
            "    if (l < n && a[l] > a[largest]) largest = l;",
            "    if (r < n && a[r] > a[largest]) largest = r;",
            "    if (largest != i) {",
            "        swap(a[i], a[largest]);",
            "        heapify(a, n, largest);",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let n = a.length;

            function* heapify(size, i) {
                let largest = i;
                let l = 2 * i + 1;
                let r = 2 * i + 2;

                yield { line: 10, explanation: `Kiểm tra heapify tại nút i=${i} (giá trị=${a[i]}), kích thước heap=${size}`, indices: [i], type: 'info', array: [...a], vars: { largest, l, r } };

                if (l < size) {
                    yield { line: 11, explanation: `So sánh nút con trái a[${l}]=${a[l]} với a[${largest}]=${a[largest]}`, indices: [l, largest], type: 'compare', array: [...a], vars: { l, largest } };
                    if (a[l] > a[largest]) largest = l;
                }
                if (r < size) {
                    yield { line: 12, explanation: `So sánh nút con phải a[${r}]=${a[r]} với a[${largest}]=${a[largest]}`, indices: [r, largest], type: 'compare', array: [...a], vars: { r, largest } };
                    if (a[r] > a[largest]) largest = r;
                }

                if (largest !== i) {
                    yield { line: 14, explanation: `Nút lớn nhất là a[${largest}]=${a[largest]} > a[${i}]=${a[i]}. Hoán đổi!`, indices: [i, largest], type: 'swap', array: [...a], vars: { i, largest } };
                    [a[i], a[largest]] = [a[largest], a[i]];
                    yield* heapify(size, largest);
                }
            }

            yield { line: 2, explanation: `Xây dựng Max-Heap từ mảng ban đầu...`, indices: [], type: 'info', array: [...a], vars: {} };
            for (let i = Math.floor(n / 2) - 1; i >= 0; --i) {
                yield* heapify(n, i);
            }
            yield { line: 4, explanation: `Max-Heap đã dựng xong. Đỉnh a[0] luôn là giá trị lớn nhất hiện tại.`, indices: [0], type: 'pivot', array: [...a], vars: {} };

            for (let i = n - 1; i > 0; --i) {
                yield { line: 5, explanation: `Đổi chỗ đỉnh Max a[0]=${a[0]} xuống cuối vị trí a[${i}]`, indices: [0, i], type: 'swap', array: [...a], vars: { i } };
                [a[0], a[i]] = [a[i], a[0]];
                yield { line: 6, explanation: `Phần tử a[${i}] = ${a[i]} đã chốt vị trí sắp xếp`, indices: [i], type: 'sorted', array: [...a], vars: { sortedIdx: i } };
                yield* heapify(i, 0);
            }
            yield { line: 8, explanation: `Hoàn tất Heap Sort!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: {} };
        }
    },

    // --------------------------------------------------------------------------
    // 4. INSERTION SORT
    // --------------------------------------------------------------------------
    insertion_sort: {
        id: "insertion_sort",
        name: "Insertion Sort (Sắp xếp chèn)",
        category: "Chèn & Chọn",
        complexity: {
            best: "O(N)",
            avg: "O(N²)",
            worst: "O(N²)",
            space: "O(1)",
            stable: "Có"
        },
        description: "Xây dựng dãy có thứ tự từng bước một bằng cách rút từng phần tử tiếp theo và chèn vào đúng vị trí thích hợp trong đoạn đã sắp xếp trước đó (giống xếp bài tây).",
        logic: [
            "1. Coi phần tử đầu tiên a[0] là đã được sắp xếp.",
            "2. Duyệt i từ 1 đến n - 1: Lưu giá trị key = a[i].",
            "3. Duyệt j từ i - 1 lùi dần về 0: Nếu a[j] > key, dịch chuyển a[j] sang phải (a[j+1] = a[j]).",
            "4. Đặt key vào khoảng trống tìm được tại a[j + 1].",
            "5. Tiếp tục với các phần tử tiếp theo."
        ],
        pros: [
            "Cực nhanh khi dãy đã gần như có thứ tự (đạt O(N)).",
            "Thuật toán tại chỗ O(1) và ổn định (Stable).",
            "Thường được dùng làm bước cơ sở trong các thuật toán phức tạp như TimSort hoặc IntroSort khi kích thước mảng nhỏ (N <= 32)."
        ],
        cons: [
            "Kém hiệu quả với dữ liệu lớn ngẫu nhiên (O(N²))."
        ],
        code: [
            "void insertionSort(vector<double>& a) {",
            "    int n = a.size();",
            "    for (int i = 1; i < n; ++i) {",
            "        double key = a[i];",
            "        int j = i - 1;",
            "        while (j >= 0 && a[j] > key) {",
            "            a[j + 1] = a[j];",
            "            j--;",
            "        }",
            "        a[j + 1] = key;",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let n = a.length;
            for (let i = 1; i < n; ++i) {
                let key = a[i];
                let j = i - 1;
                yield { line: 3, explanation: `Chọn key = a[${i}] = ${key} để chuẩn bị chèn vào đoạn [0..${i - 1}]`, indices: [i], type: 'pivot', array: [...a], vars: { i, key } };

                while (j >= 0) {
                    yield { line: 5, explanation: `So sánh a[${j}]=${a[j]} với key=${key}`, indices: [j, j + 1], type: 'compare', array: [...a], vars: { j, key } };
                    if (a[j] > key) {
                        a[j + 1] = a[j];
                        yield { line: 6, explanation: `Vì a[${j}] > key, dịch chuyển a[${j}] sang a[${j + 1}]`, indices: [j + 1], type: 'swap', array: [...a], vars: { j, key } };
                        j--;
                    } else {
                        yield { line: 5, explanation: `a[${j}] <= key, dừng tìm kiếm vị trí chèn`, indices: [j], type: 'info', array: [...a], vars: { j } };
                        break;
                    }
                }
                a[j + 1] = key;
                yield { line: 9, explanation: `Chèn key=${key} vào vị trí a[${j + 1}]`, indices: [j + 1], type: 'sorted', array: [...a], vars: { insertedIndex: j + 1, key } };
            }
            yield { line: 11, explanation: `Hoàn tất Insertion Sort!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: {} };
        }
    },

    // --------------------------------------------------------------------------
    // 5. SELECTION SORT
    // --------------------------------------------------------------------------
    selection_sort: {
        id: "selection_sort",
        name: "Selection Sort (Sắp xếp chọn)",
        category: "Chèn & Chọn",
        complexity: {
            best: "O(N²)",
            avg: "O(N²)",
            worst: "O(N²)",
            space: "O(1)",
            stable: "Không"
        },
        description: "Thuật toán tìm phần tử nhỏ nhất trong đoạn chưa sắp xếp và hoán đổi nó với phần tử đầu tiên của đoạn đó.",
        logic: [
            "1. Duyệt i từ 0 đến n - 2.",
            "2. Giả sử phần tử nhỏ nhất min_idx = i.",
            "3. Duyệt j từ i + 1 đến n - 1: Nếu a[j] < a[min_idx], cập nhật min_idx = j.",
            "4. Hoán đổi a[i] với a[min_idx] để đưa phần tử nhỏ nhất về đầu đoạn.",
            "5. Đánh dấu a[i] đã hoàn thành và tăng i."
        ],
        pros: [
            "Đơn giản, dễ cài đặt.",
            "Số lần hoán đổi (swap) tối đa chỉ là O(N), tốt nhất trong số các thuật toán O(N²) khi chi phí swap dữ liệu đắt đỏ."
        ],
        cons: [
            "Thời gian luôn là O(N²) ngay cả khi mảng đã sắp xếp sẵn.",
            "Mặc định không ổn định."
        ],
        code: [
            "void selectionSort(vector<double>& a) {",
            "    int n = a.size();",
            "    for (int i = 0; i < n - 1; ++i) {",
            "        int min_idx = i;",
            "        for (int j = i + 1; j < n; ++j) {",
            "            if (a[j] < a[min_idx])",
            "                min_idx = j;",
            "        }",
            "        if (min_idx != i)",
            "            swap(a[i], a[min_idx]);",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let n = a.length;
            for (let i = 0; i < n - 1; ++i) {
                let min_idx = i;
                yield { line: 3, explanation: `Bắt đầu lượt i=${i}, tạm gán min_idx=${i} (giá trị=${a[i]})`, indices: [i], type: 'pivot', array: [...a], vars: { i, min_idx } };

                for (let j = i + 1; j < n; ++j) {
                    yield { line: 5, explanation: `So sánh a[${j}]=${a[j]} với phần tử nhỏ nhất hiện tại a[${min_idx}]=${a[min_idx]}`, indices: [j, min_idx], type: 'compare', array: [...a], vars: { i, j, min_idx } };
                    if (a[j] < a[min_idx]) {
                        min_idx = j;
                        yield { line: 6, explanation: `Tìm thấy giá trị nhỏ hơn! Cập nhật min_idx = ${min_idx} (giá trị=${a[min_idx]})`, indices: [min_idx], type: 'info', array: [...a], vars: { min_idx } };
                    }
                }
                if (min_idx !== i) {
                    yield { line: 9, explanation: `Hoán đổi a[${i}]=${a[i]} với giá trị nhỏ nhất a[${min_idx}]=${a[min_idx]}`, indices: [i, min_idx], type: 'swap', array: [...a], vars: { i, min_idx } };
                    [a[i], a[min_idx]] = [a[min_idx], a[i]];
                }
                yield { line: 10, explanation: `Phần tử a[${i}] = ${a[i]} đã được chốt vị trí`, indices: [i], type: 'sorted', array: [...a], vars: { sortedIndex: i } };
            }
            yield { line: 11, explanation: `Hoàn tất Selection Sort!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: {} };
        }
    },

    // --------------------------------------------------------------------------
    // 6. BUBBLE SORT
    // --------------------------------------------------------------------------
    bubble_sort: {
        id: "bubble_sort",
        name: "Bubble Sort (Sắp xếp nổi bọt)",
        category: "Đổi chỗ & Nổi bọt",
        complexity: {
            best: "O(N)",
            avg: "O(N²)",
            worst: "O(N²)",
            space: "O(1)",
            stable: "Có"
        },
        description: "Liên tục so sánh hai phần tử liền kề và đổi chỗ nếu chúng sai thứ tự. Các phần tử lớn nhất sẽ 'nổi bọt' dần về cuối mảng sau mỗi vòng lặp.",
        logic: [
            "1. Lặp qua các lượt i từ 0 đến n - 1.",
            "2. Trong mỗi lượt, duyệt j từ 0 đến n - i - 2.",
            "3. Nếu a[j] > a[j + 1], hoán đổi hai phần tử liền kề.",
            "4. Đánh dấu có sự kiện hoán đổi xảy ra (cờ swapped).",
            "5. Nếu sau 1 lượt duyệt mà không có phần tử nào bị hoán đổi, mảng đã sắp xếp xong, dừng sớm."
        ],
        pros: [
            "Cực kỳ trực quan, dễ hiểu nhất cho người mới bắt đầu.",
            "Có tính ổn định (Stable).",
            "Tối ưu được O(N) khi mảng đã sắp xếp sẵn bằng cách dùng cờ hiệu."
        ],
        cons: [
            "Rất chậm với mảng lớn, số lượng phép so sánh và swap rất nhiều (O(N²))."
        ],
        code: [
            "void bubbleSort(vector<double>& a) {",
            "    int n = a.size();",
            "    for (int i = 0; i < n - 1; ++i) {",
            "        bool swapped = false;",
            "        for (int j = 0; j < n - i - 1; ++j) {",
            "            if (a[j] > a[j + 1]) {",
            "                swap(a[j], a[j + 1]);",
            "                swapped = true;",
            "            }",
            "        }",
            "        if (!swapped) break;",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let n = a.length;
            for (let i = 0; i < n - 1; ++i) {
                let swapped = false;
                yield { line: 3, explanation: `Bắt đầu lượt ${i + 1}/${n - 1}`, indices: [], type: 'info', array: [...a], vars: { i } };

                for (let j = 0; j < n - i - 1; ++j) {
                    yield { line: 5, explanation: `So sánh cặp liền kề a[${j}]=${a[j]} và a[${j + 1}]=${a[j + 1]}`, indices: [j, j + 1], type: 'compare', array: [...a], vars: { j } };
                    if (a[j] > a[j + 1]) {
                        [a[j], a[j + 1]] = [a[j + 1], a[j]];
                        swapped = true;
                        yield { line: 6, explanation: `Vì a[${j}] > a[${j + 1}], hoán đổi vị trí`, indices: [j, j + 1], type: 'swap', array: [...a], vars: { j, swapped } };
                    }
                }
                yield { line: 9, explanation: `Phần tử a[${n - i - 1}] = ${a[n - i - 1]} đã nổi bọt về đúng vị trí`, indices: [n - i - 1], type: 'sorted', array: [...a], vars: { sortedIndex: n - i - 1 } };
                if (!swapped) {
                    yield { line: 10, explanation: `Không có hoán đổi nào trong lượt vừa qua. Dãy đã có thứ tự, dừng sớm!`, indices: [], type: 'info', array: [...a], vars: { earlyExit: true } };
                    break;
                }
            }
            yield { line: 12, explanation: `Hoàn tất Bubble Sort!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: {} };
        }
    },

    // --------------------------------------------------------------------------
    // 7. SHELL SORT
    // --------------------------------------------------------------------------
    shell_sort: {
        id: "shell_sort",
        name: "Shell Sort (Sắp xếp Shell)",
        category: "Chèn & Chọn",
        complexity: {
            best: "O(N log N)",
            avg: "O(N^(4/3))",
            worst: "O(N²)",
            space: "O(1)",
            stable: "Không"
        },
        description: "Bản nâng cấp vượt bậc của Insertion Sort: so sánh và hoán đổi các phần tử cách nhau một khoảng cách gap, thu hẹp gap dần về 1.",
        logic: [
            "1. Chọn bước nhảy ban đầu gap = n / 2.",
            "2. Thực hiện sắp xếp chèn cho các phần tử cách nhau khoảng cách gap.",
            "3. Giảm khoảng cách gap = gap / 2 sau mỗi vòng lặp.",
            "4. Khi gap = 1, thuật toán trở thành Insertion Sort thông thường nhưng dãy đã gần như sắp xếp xong nên chạy cực nhanh."
        ],
        pros: [
            "Nhanh hơn rất nhiều so với Insertion Sort và Bubble Sort mà không cần đệ quy hay bộ nhớ phụ.",
            "Dễ cài đặt, phù hợp cho hệ thống nhúng có dung lượng RAM hạn chế."
        ],
        cons: [
            "Hiệu suất phụ thuộc vào chuỗi chọn gap (dãy gap của Sedgewick, Tokuda, Knuth...).",
            "Không ổn định."
        ],
        code: [
            "void shellSort(vector<double>& a) {",
            "    int n = a.size();",
            "    for (int gap = n / 2; gap > 0; gap /= 2) {",
            "        for (int i = gap; i < n; ++i) {",
            "            double temp = a[i];",
            "            int j = i;",
            "            while (j >= gap && a[j - gap] > temp) {",
            "                a[j] = a[j - gap];",
            "                j -= gap;",
            "            }",
            "            a[j] = temp;",
            "        }",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let n = a.length;
            for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
                yield { line: 3, explanation: `Đặt khoảng cách gap = ${gap}`, indices: [], type: 'info', array: [...a], vars: { gap } };

                for (let i = gap; i < n; ++i) {
                    let temp = a[i];
                    let j = i;
                    yield { line: 5, explanation: `Lấy temp = a[${i}] = ${temp}, chuẩn bị kiểm tra với khoảng cách gap = ${gap}`, indices: [i], type: 'pivot', array: [...a], vars: { gap, i, temp } };

                    while (j >= gap) {
                        yield { line: 7, explanation: `So sánh a[${j - gap}]=${a[j - gap]} với temp=${temp}`, indices: [j - gap, j], type: 'compare', array: [...a], vars: { j, gap, temp } };
                        if (a[j - gap] > temp) {
                            a[j] = a[j - gap];
                            yield { line: 8, explanation: `Dịch chuyển a[${j - gap}] sang vị trí a[${j}]`, indices: [j], type: 'swap', array: [...a], vars: { j, gap } };
                            j -= gap;
                        } else {
                            break;
                        }
                    }
                    a[j] = temp;
                    yield { line: 11, explanation: `Đặt temp = ${temp} vào vị trí a[${j}]`, indices: [j], type: 'info', array: [...a], vars: { placedAt: j, temp } };
                }
            }
            yield { line: 13, explanation: `Hoàn tất Shell Sort!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: {} };
        }
    },

    // --------------------------------------------------------------------------
    // 8. COCKTAIL SHAKER SORT
    // --------------------------------------------------------------------------
    cocktail_sort: {
        id: "cocktail_sort",
        name: "Cocktail Shaker Sort (Nổi bọt 2 chiều)",
        category: "Đổi chỗ & Nổi bọt",
        complexity: {
            best: "O(N)",
            avg: "O(N²)",
            worst: "O(N²)",
            space: "O(1)",
            stable: "Có"
        },
        description: "Biến thể của Bubble Sort nhưng duyệt lắc qua lại theo cả hai chiều: đưa phần tử lớn nhất về cuối, rồi đảo chiều đưa phần tử nhỏ nhất về đầu.",
        logic: [
            "1. Lượt đi từ trái sang phải: đẩy phần tử lớn nhất về ranh giới cuối (right).",
            "2. Giảm ranh giới right đi 1.",
            "3. Lượt về từ phải sang trái: đẩy phần tử nhỏ nhất về ranh giới đầu (left).",
            "4. Tăng ranh giới left lên 1.",
            "5. Lặp lại cho đến khi left >= right hoặc không còn hoán đổi nào."
        ],
        pros: [
            "Giải quyết triệt để vấn đề 'rùa' (các phần tử nhỏ nằm ở cuối mảng) khiến Bubble Sort bị chậm.",
            "Ổn định và in-place O(1)."
        ],
        cons: [
            "Vẫn có độ phức tạp trung bình là O(N²)."
        ],
        code: [
            "void cocktailSort(vector<double>& a) {",
            "    bool swapped = true;",
            "    int start = 0, end = a.size() - 1;",
            "    while (swapped) {",
            "        swapped = false;",
            "        for (int i = start; i < end; ++i) {",
            "            if (a[i] > a[i + 1]) { swap(a[i], a[i + 1]); swapped = true; }",
            "        }",
            "        if (!swapped) break;",
            "        swapped = false; end--;",
            "        for (int i = end - 1; i >= start; --i) {",
            "            if (a[i] > a[i + 1]) { swap(a[i], a[i + 1]); swapped = true; }",
            "        }",
            "        start++;",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let swapped = true;
            let start = 0, end = a.length - 1;

            while (swapped) {
                swapped = false;
                yield { line: 5, explanation: `Duyệt xuôi từ start=${start} đến end=${end} để đẩy số lớn nhất về cuối`, indices: [start, end], type: 'info', array: [...a], vars: { start, end } };
                for (let i = start; i < end; ++i) {
                    yield { line: 6, explanation: `So sánh a[${i}]=${a[i]} và a[${i + 1}]=${a[i + 1]}`, indices: [i, i + 1], type: 'compare', array: [...a], vars: { i } };
                    if (a[i] > a[i + 1]) {
                        [a[i], a[i + 1]] = [a[i + 1], a[i]];
                        swapped = true;
                        yield { line: 7, explanation: `Hoán đổi a[${i}] và a[${i + 1}]`, indices: [i, i + 1], type: 'swap', array: [...a], vars: { i } };
                    }
                }
                yield { line: 10, explanation: `Phần tử a[${end}] = ${a[end]} đã ở đúng vị trí cuối`, indices: [end], type: 'sorted', array: [...a], vars: { end } };
                if (!swapped) break;

                swapped = false;
                end--;
                yield { line: 11, explanation: `Duyệt ngược từ end=${end} về start=${start} để kéo số nhỏ nhất về đầu`, indices: [start, end], type: 'info', array: [...a], vars: { start, end } };
                for (let i = end - 1; i >= start; --i) {
                    yield { line: 12, explanation: `So sánh a[${i}]=${a[i]} và a[${i + 1}]=${a[i + 1]}`, indices: [i, i + 1], type: 'compare', array: [...a], vars: { i } };
                    if (a[i] > a[i + 1]) {
                        [a[i], a[i + 1]] = [a[i + 1], a[i]];
                        swapped = true;
                        yield { line: 13, explanation: `Hoán đổi a[${i}] và a[${i + 1}]`, indices: [i, i + 1], type: 'swap', array: [...a], vars: { i } };
                    }
                }
                yield { line: 14, explanation: `Phần tử a[${start}] = ${a[start]} đã ở đúng vị trí đầu`, indices: [start], type: 'sorted', array: [...a], vars: { start } };
                start++;
            }
            yield { line: 16, explanation: `Hoàn tất Cocktail Shaker Sort!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: {} };
        }
    },

    // --------------------------------------------------------------------------
    // 9. GNOME SORT
    // --------------------------------------------------------------------------
    gnome_sort: {
        id: "gnome_sort",
        name: "Gnome Sort (Sắp xếp chú lùn)",
        category: "Đổi chỗ & Nổi bọt",
        complexity: {
            best: "O(N)",
            avg: "O(N²)",
            worst: "O(N²)",
            space: "O(1)",
            stable: "Có"
        },
        description: "Thuật toán lấy cảm hứng từ cách chú lùn làm vườn sắp xếp chậu hoa: nếu đúng thứ tự thì bước tới, nếu sai thứ tự thì đổi chỗ và lùi lại một bước để kiểm tra tiếp.",
        logic: [
            "1. Bắt đầu từ vị trí index = 0.",
            "2. Nếu index == 0, tăng index lên 1.",
            "3. Nếu a[index] >= a[index - 1], hai phần tử đúng thứ tự: tiến lên 1 bước (index++).",
            "4. Nếu a[index] < a[index - 1], sai thứ tự: hoán đổi hai phần tử và lùi lại 1 bước (index--).",
            "5. Lặp lại cho đến khi index đạt tới cuối mảng."
        ],
        pros: [
            "Cực kỳ đơn giản, chỉ cần một vòng lặp `while` duy nhất mà không lồng ghép vòng lặp.",
            "Đạt O(N) khi mảng đã có thứ tự sẵn."
        ],
        cons: [
            "Chậm với mảng đảo ngược (O(N²))."
        ],
        code: [
            "void gnomeSort(vector<double>& a) {",
            "    int n = a.size();",
            "    int index = 0;",
            "    while (index < n) {",
            "        if (index == 0)",
            "            index++;",
            "        if (a[index] >= a[index - 1])",
            "            index++;",
            "        else {",
            "            swap(a[index], a[index - 1]);",
            "            index--;",
            "        }",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let n = a.length;
            let index = 0;
            while (index < n) {
                if (index === 0) {
                    yield { line: 5, explanation: `index = 0, bước tiến lên 1`, indices: [0], type: 'info', array: [...a], vars: { index: 0 } };
                    index++;
                    continue;
                }
                yield { line: 7, explanation: `So sánh a[${index}]=${a[index]} với a[${index - 1}]=${a[index - 1]}`, indices: [index - 1, index], type: 'compare', array: [...a], vars: { index } };
                if (a[index] >= a[index - 1]) {
                    yield { line: 8, explanation: `Đúng thứ tự! Chú lùn bước tới tiếp theo`, indices: [index], type: 'info', array: [...a], vars: { index } };
                    index++;
                } else {
                    [a[index], a[index - 1]] = [a[index - 1], a[index]];
                    yield { line: 10, explanation: `Sai thứ tự! Hoán đổi a[${index}] và a[${index - 1}], chú lùn lùi lại một bước`, indices: [index - 1, index], type: 'swap', array: [...a], vars: { index } };
                    index--;
                }
            }
            yield { line: 14, explanation: `Hoàn tất Gnome Sort!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: {} };
        }
    },

    // --------------------------------------------------------------------------
    // 10. COMB SORT
    // --------------------------------------------------------------------------
    comb_sort: {
        id: "comb_sort",
        name: "Comb Sort (Sắp xếp lược)",
        category: "Đổi chỗ & Nổi bọt",
        complexity: {
            best: "O(N log N)",
            avg: "O(N² / 2^p)",
            worst: "O(N²)",
            space: "O(1)",
            stable: "Không"
        },
        description: "Cải tiến Bubble Sort bằng cách so sánh các phần tử cách nhau khoảng cách gap chia cho hệ số co (shrink factor) xấp xỉ 1.3.",
        logic: [
            "1. Khởi tạo khoảng cách gap = n.",
            "2. Mỗi vòng lặp, co gap lại: gap = floor(gap / 1.3). Nếu gap < 1 thì gap = 1.",
            "3. Duyệt từ đầu đến n - gap: so sánh a[i] với a[i + gap], đổi chỗ nếu sai thứ tự.",
            "4. Lặp lại cho đến khi gap == 1 và không còn sự kiện đổi chỗ nào."
        ],
        pros: [
            "Loại bỏ các giá trị nhỏ ở cuối mảng nhanh chóng hơn Bubble Sort rất nhiều.",
            "Code ngắn gọn, không tốn thêm bộ nhớ."
        ],
        cons: [
            "Không ổn định (Unstable)."
        ],
        code: [
            "void combSort(vector<double>& a) {",
            "    int n = a.size();",
            "    int gap = n;",
            "    bool swapped = true;",
            "    while (gap != 1 || swapped) {",
            "        gap = (gap * 10) / 13; // Hệ số co 1.3",
            "        if (gap < 1) gap = 1;",
            "        swapped = false;",
            "        for (int i = 0; i < n - gap; ++i) {",
            "            if (a[i] > a[i + gap]) {",
            "                swap(a[i], a[i + gap]);",
            "                swapped = true;",
            "            }",
            "        }",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let n = a.length;
            let gap = n;
            let swapped = true;
            while (gap !== 1 || swapped) {
                gap = Math.floor((gap * 10) / 13);
                if (gap < 1) gap = 1;
                swapped = false;
                yield { line: 6, explanation: `Cập nhật khoảng cách gap = ${gap}`, indices: [], type: 'info', array: [...a], vars: { gap } };

                for (let i = 0; i < n - gap; ++i) {
                    yield { line: 10, explanation: `So sánh a[${i}]=${a[i]} và a[${i + gap}]=${a[i + gap]} (khoảng cách ${gap})`, indices: [i, i + gap], type: 'compare', array: [...a], vars: { i, gap } };
                    if (a[i] > a[i + gap]) {
                        [a[i], a[i + gap]] = [a[i + gap], a[i]];
                        swapped = true;
                        yield { line: 11, explanation: `Hoán đổi a[${i}] và a[${i + gap}]`, indices: [i, i + gap], type: 'swap', array: [...a], vars: { i, gap } };
                    }
                }
            }
            yield { line: 15, explanation: `Hoàn tất Comb Sort!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: {} };
        }
    },

    // --------------------------------------------------------------------------
    // 11. BUCKET SORT (Cực tốt cho số thực & số âm)
    // --------------------------------------------------------------------------
    bucket_sort: {
        id: "bucket_sort",
        name: "Bucket Sort (Sắp xếp theo thùng)",
        category: "Phi so sánh & Thùng",
        complexity: {
            best: "O(N + K)",
            avg: "O(N + K)",
            worst: "O(N²)",
            space: "O(N + K)",
            stable: "Có"
        },
        description: "Chia khoảng giá trị thành K thùng (bucket) đều nhau, phân phối các phần tử vào từng thùng, sắp xếp từng thùng và gộp lại. Đặc biệt hiệu quả với số thực và số âm.",
        logic: [
            "1. Tìm giá trị min và max của mảng để xác định phạm vi.",
            "2. Khởi tạo K thùng rỗng (thường K = sqrt(N) hoặc N).",
            "3. Phân phối từng phần tử x vào thùng thứ floor((x - min) / range * (K - 1)).",
            "4. Sắp xếp các phần tử bên trong từng thùng nhỏ (bằng Insertion Sort).",
            "5. Nối tuần tự các thùng lại với nhau để có dãy hoàn chỉnh."
        ],
        pros: [
            "Rất nhanh, đạt độ phức tạp trung bình tuyến tính O(N + K) khi dữ liệu phân phối đều.",
            "Hỗ trợ tự nhiên cho số thực (floats) và số âm một cách hoàn hảo."
        ],
        cons: [
            "Tốn bộ nhớ phụ để lưu các thùng O(N + K).",
            "Nếu dữ liệu bị dồn vào một thùng duy nhất, hiệu năng giảm về O(N²)."
        ],
        code: [
            "void bucketSort(vector<double>& a, int bucketCount = 5) {",
            "    double minVal = *min_element(a.begin(), a.end());",
            "    double maxVal = *max_element(a.begin(), a.end());",
            "    double range = maxVal - minVal;",
            "    vector<vector<double>> buckets(bucketCount);",
            "    for (double x : a) {",
            "        int b = range == 0 ? 0 : (x - minVal) / range * (bucketCount - 1);",
            "        buckets[b].push_back(x);",
            "    }",
            "    a.clear();",
            "    for (auto& b : buckets) {",
            "        sort(b.begin(), b.end());",
            "        for (double x : b) a.push_back(x);",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let n = a.length;
            if (n <= 1) {
                yield { line: 1, explanation: `Mảng chỉ có <= 1 phần tử`, indices: [0], type: 'sorted', array: [...a], vars: {} };
                return;
            }
            let minVal = Math.min(...a);
            let maxVal = Math.max(...a);
            let range = maxVal - minVal;
            let bucketCount = Math.max(2, Math.min(6, Math.floor(Math.sqrt(n)) + 1));
            let buckets = Array.from({ length: bucketCount }, () => []);

            yield { line: 2, explanation: `Xác định min = ${minVal}, max = ${maxVal}. Tạo ${bucketCount} thùng.`, indices: [], type: 'info', array: [...a], vars: { minVal, maxVal, bucketCount } };

            for (let i = 0; i < n; ++i) {
                let x = a[i];
                let bIdx = range === 0 ? 0 : Math.floor(((x - minVal) / range) * (bucketCount - 1));
                buckets[bIdx].push(x);
                yield { line: 7, explanation: `Phân phối a[${i}] = ${x} vào Thùng #${bIdx + 1}`, indices: [i], type: 'compare', array: [...a], vars: { x, bIdx } };
            }

            yield { line: 10, explanation: `Sắp xếp các thùng và gộp lại mảng gốc...`, indices: [], type: 'info', array: [...a], vars: {} };
            let idx = 0;
            for (let b = 0; b < bucketCount; ++b) {
                buckets[b].sort((x, y) => x - y);
                for (let val of buckets[b]) {
                    a[idx] = val;
                    yield { line: 13, explanation: `Lấy ${val} từ Thùng #${b + 1} đưa về vị trí a[${idx}]`, indices: [idx], type: 'swap', array: [...a], vars: { idx, val, bucket: b + 1 } };
                    idx++;
                }
            }
            yield { line: 15, explanation: `Hoàn tất Bucket Sort!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: {} };
        }
    },

    // --------------------------------------------------------------------------
    // 12. COUNTING SORT (Chuẩn hóa số âm & số thực làm tròn)
    // --------------------------------------------------------------------------
    counting_sort: {
        id: "counting_sort",
        name: "Counting Sort (Sắp xếp đếm)",
        category: "Phi so sánh & Thùng",
        complexity: {
            best: "O(N + K)",
            avg: "O(N + K)",
            worst: "O(N + K)",
            space: "O(K)",
            stable: "Có"
        },
        description: "Thuật toán phi so sánh đếm tần số xuất hiện của từng giá trị khóa bằng mảng đếm tần suất. Hỗ trợ số âm bằng phép dịch chuyển độ lệch (offset).",
        logic: [
            "1. Tìm giá trị min và max trong mảng.",
            "2. Tạo mảng count có kích thước (max - min + 1), khởi tạo bằng 0.",
            "3. Duyệt mảng gốc: đếm số lần xuất hiện của từng số x thông qua vị trí x - min.",
            "4. Duyệt tuần tự mảng count từ 0 đến hết: ghi các giá trị ngược lại vào mảng theo thứ tự tăng dần."
        ],
        pros: [
            "Thời gian chạy là tuyến tính O(N + K), nhanh hơn bất kỳ thuật toán so sánh nào khi khoảng giá trị K nhỏ.",
            "Có tính ổn định (Stable)."
        ],
        cons: [
            "Không phù hợp nếu khoảng giá trị K quá lớn (ví dụ [0, 1 tỷ] sẽ tràn bộ nhớ).",
            "Mặc định hoạt động trên số nguyên (nếu có số thực, thuật toán cần nhân tỉ lệ hoặc làm tròn)."
        ],
        code: [
            "void countingSort(vector<int>& a) {",
            "    int minVal = *min_element(a.begin(), a.end());",
            "    int maxVal = *max_element(a.begin(), a.end());",
            "    int range = maxVal - minVal + 1;",
            "    vector<int> count(range, 0);",
            "    for (int x : a) count[x - minVal]++;",
            "    int idx = 0;",
            "    for (int i = 0; i < range; ++i) {",
            "        while (count[i]-- > 0) a[idx++] = i + minVal;",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let minVal = Math.min(...a);
            let maxVal = Math.max(...a);
            let isFloat = a.some(x => !Number.isInteger(x));
            let scale = isFloat ? 10 : 1; // scale 1 chữ số thập phân nếu có số thực

            let minScaled = Math.round(minVal * scale);
            let maxScaled = Math.round(maxVal * scale);
            let range = maxScaled - minScaled + 1;

            if (range > 300) {
                // Giới hạn để visualizer không tạo mảng đếm khổng lồ
                yield { line: 1, explanation: `Khoảng giá trị quá lớn (${range}). Giới hạn hiển thị đếm.`, indices: [], type: 'info', array: [...a], vars: { range } };
            }

            let count = new Array(Math.min(range, 500)).fill(0);
            yield { line: 2, explanation: `Tìm min = ${minVal}, max = ${maxVal}. Phạm vi đếm = ${range}`, indices: [], type: 'info', array: [...a], vars: { minVal, maxVal, range } };

            for (let i = 0; i < a.length; ++i) {
                let key = Math.round(a[i] * scale) - minScaled;
                if (key >= 0 && key < count.length) count[key]++;
                yield { line: 5, explanation: `Đếm phần tử a[${i}] = ${a[i]} (tần số hiện tại: ${count[key]})`, indices: [i], type: 'compare', array: [...a], vars: { val: a[i], key } };
            }

            let idx = 0;
            for (let i = 0; i < count.length; ++i) {
                while (count[i] > 0) {
                    let recoveredVal = (i + minScaled) / scale;
                    a[idx] = recoveredVal;
                    yield { line: 8, explanation: `Ghi lại giá trị ${recoveredVal} vào a[${idx}]`, indices: [idx], type: 'swap', array: [...a], vars: { idx, recoveredVal } };
                    count[i]--;
                    idx++;
                }
            }
            yield { line: 10, explanation: `Hoàn tất Counting Sort!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: {} };
        }
    },

    // --------------------------------------------------------------------------
    // 13. RADIX SORT (LSD)
    // --------------------------------------------------------------------------
    radix_sort: {
        id: "radix_sort",
        name: "Radix Sort (Sắp xếp cơ số LSD)",
        category: "Phi so sánh & Thùng",
        complexity: {
            best: "O(d * (N + b))",
            avg: "O(d * (N + b))",
            worst: "O(d * (N + b))",
            space: "O(N + b)",
            stable: "Có"
        },
        description: "Sắp xếp theo từng chữ số từ hàng đơn vị đến hàng cao nhất (Least Significant Digit). Dùng Counting Sort ổn định cho từng chữ số.",
        logic: [
            "1. Tách mảng thành phần âm và phần dương (hoặc dịch chuyển offset min).",
            "2. Tìm giá trị lớn nhất maxVal để biết số chữ số d.",
            "3. Lặp biến exp = 1, 10, 100... tương ứng với hàng đơn vị, chục, trăm...",
            "4. Trong mỗi chữ số exp, dùng Counting Sort để sắp xếp các phần tử dựa trên chữ số tại hàng đó.",
            "5. Sau khi duyệt hết d chữ số, mảng sẽ được sắp xếp hoàn toàn."
        ],
        pros: [
            "Rất nhanh, đạt độ phức tạp gần tuyến tính O(N) khi độ dài chữ số d là hằng số.",
            "Có tính ổn định cao."
        ],
        cons: [
            "Cần bộ nhớ phụ trợ.",
            "Cài đặt phức tạp khi xử lý số âm và số thực."
        ],
        code: [
            "void radixSort(vector<int>& a) {",
            "    int maxVal = *max_element(a.begin(), a.end());",
            "    for (int exp = 1; maxVal / exp > 0; exp *= 10) {",
            "        countSortByDigit(a, exp);",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let minVal = Math.min(...a);
            let offset = minVal < 0 ? -minVal : 0;
            // Dịch chuyển để toàn bộ là số không âm
            let shifted = a.map(x => Math.round(x + offset));
            let maxVal = Math.max(...shifted);

            yield { line: 1, explanation: `Dịch chuyển offset = +${offset} để đưa các số âm về không âm. max = ${maxVal}`, indices: [], type: 'info', array: [...a], vars: { offset, maxVal } };

            for (let exp = 1; Math.floor(maxVal / exp) > 0; exp *= 10) {
                yield { line: 3, explanation: `Đang sắp xếp theo chữ số ở hàng: ${exp}`, indices: [], type: 'info', array: [...a], vars: { exp } };

                let output = new Array(a.length).fill(0);
                let count = new Array(10).fill(0);

                for (let i = 0; i < a.length; ++i) {
                    let digit = Math.floor(shifted[i] / exp) % 10;
                    count[digit]++;
                    yield { line: 4, explanation: `Phần tử a[${i}]=${a[i]} có chữ số hàng ${exp} là ${digit}`, indices: [i], type: 'compare', array: [...a], vars: { digit, exp } };
                }

                for (let i = 1; i < 10; ++i) count[i] += count[i - 1];

                for (let i = a.length - 1; i >= 0; --i) {
                    let digit = Math.floor(shifted[i] / exp) % 10;
                    output[count[digit] - 1] = a[i];
                    count[digit]--;
                }

                for (let i = 0; i < a.length; ++i) {
                    a[i] = output[i];
                    shifted[i] = Math.round(a[i] + offset);
                    yield { line: 4, explanation: `Cập nhật mảng theo thứ tự chữ số hàng ${exp}`, indices: [i], type: 'swap', array: [...a], vars: { i, val: a[i] } };
                }
            }
            yield { line: 5, explanation: `Hoàn tất Radix Sort!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: {} };
        }
    },

    // --------------------------------------------------------------------------
    // 14. BINARY INSERTION SORT
    // --------------------------------------------------------------------------
    binary_insertion_sort: {
        id: "binary_insertion_sort",
        name: "Binary Insertion Sort (Chèn nhị phân)",
        category: "Chèn & Chọn",
        complexity: {
            best: "O(N log N) so sánh",
            avg: "O(N²)",
            worst: "O(N²)",
            space: "O(1)",
            stable: "Có"
        },
        description: "Tận dụng đoạn trước đã được sắp xếp, dùng thuật toán Tìm kiếm Nhị phân (Binary Search) để tìm vị trí chèn trong O(log N) phép so sánh thay vì duyệt tuyến tính.",
        logic: [
            "1. Coi phần tử a[0] đã sắp xếp.",
            "2. Duyệt i từ 1 đến n - 1 với phần tử cần chèn là key = a[i].",
            "3. Dùng Binary Search trên đoạn [0..i-1] để tìm vị trí đích pos thích hợp.",
            "4. Dịch chuyển các phần tử từ pos đến i - 1 sang phải một vị trí.",
            "5. Đặt key vào a[pos]."
        ],
        pros: [
            "Giảm tối đa số lần so sánh từ O(N²) xuống O(N log N). Rất có lợi khi hàm so sánh phần tử phức tạp/đắt đỏ.",
            "Ổn định và in-place O(1)."
        ],
        cons: [
            "Vẫn cần O(N²) phép dịch chuyển phần tử trong mảng tĩnh."
        ],
        code: [
            "void binaryInsertionSort(vector<double>& a) {",
            "    int n = a.size();",
            "    for (int i = 1; i < n; ++i) {",
            "        double key = a[i];",
            "        int left = 0, right = i - 1;",
            "        while (left <= right) {",
            "            int mid = left + (right - left) / 2;",
            "            if (key < a[mid]) right = mid - 1;",
            "            else left = mid + 1;",
            "        }",
            "        for (int j = i - 1; j >= left; --j) a[j + 1] = a[j];",
            "        a[left] = key;",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let n = a.length;
            for (let i = 1; i < n; ++i) {
                let key = a[i];
                let left = 0, right = i - 1;
                yield { line: 3, explanation: `Chọn key = a[${i}] = ${key}. Tìm vị trí chèn trong đoạn [0..${i - 1}] bằng Binary Search`, indices: [i], type: 'pivot', array: [...a], vars: { i, key } };

                while (left <= right) {
                    let mid = Math.floor(left + (right - left) / 2);
                    yield { line: 7, explanation: `Tìm kiếm nhị phân: so sánh key=${key} với a[${mid}]=${a[mid]}`, indices: [mid, i], type: 'compare', array: [...a], vars: { left, mid, right, key } };
                    if (key < a[mid]) {
                        right = mid - 1;
                    } else {
                        left = mid + 1;
                    }
                }
                let pos = left;
                yield { line: 11, explanation: `Tìm thấy vị trí chèn thích hợp tại chỉ số ${pos}`, indices: [pos], type: 'info', array: [...a], vars: { pos, key } };

                for (let j = i - 1; j >= pos; --j) {
                    a[j + 1] = a[j];
                    yield { line: 11, explanation: `Dịch chuyển a[${j}] sang a[${j + 1}]`, indices: [j + 1], type: 'swap', array: [...a], vars: { j } };
                }
                a[pos] = key;
                yield { line: 12, explanation: `Chèn key=${key} vào a[${pos}]`, indices: [pos], type: 'sorted', array: [...a], vars: { pos, key } };
            }
            yield { line: 14, explanation: `Hoàn tất Binary Insertion Sort!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: {} };
        }
    },

    // --------------------------------------------------------------------------
    // 15. BOGO SORT (Thuật toán vui & giáo dục)
    // --------------------------------------------------------------------------
    bogo_sort: {
        id: "bogo_sort",
        name: "Bogo Sort (Sắp xếp ngẫu nhiên)",
        category: "Giáo dục",
        complexity: {
            best: "O(N)",
            avg: "O((N+1)!)",
            worst: "Vô hạn",
            space: "O(1)",
            stable: "Không"
        },
        description: "Thuật toán ngẫu nhiên hài hước: kiểm tra xem mảng đã có thứ tự chưa, nếu chưa thì xáo trộn ngẫu nhiên toàn bộ và kiểm tra lại. Chỉ nên chạy với số phần tử <= 6!",
        logic: [
            "1. Kiểm tra từng cặp láng giềng: nếu a[i] <= a[i+1] với mọi i thì mảng đã sắp xếp -> Dừng.",
            "2. Nếu có cặp vi phạm, xáo trộn ngẫu nhiên (Fisher-Yates shuffle) toàn bộ mảng.",
            "3. Lặp lại bước 1 cho đến khi tình cờ trúng thứ tự đúng."
        ],
        pros: [
            "Mang tính giải trí và giáo dục cực cao về độ phức tạp giai thừa O(N!).",
            "Thời gian tốt nhất là O(N) nếu may mắn mảng đã sắp xếp ngay từ đầu."
        ],
        cons: [
            "Thời gian trung bình và xấu nhất cực kỳ tồi tệ, có thể chạy mãi mãi không dừng!"
        ],
        code: [
            "bool isSorted(const vector<double>& a) {",
            "    for (int i = 0; i < a.size() - 1; ++i)",
            "        if (a[i] > a[i + 1]) return false;",
            "    return true;",
            "}",
            "void bogoSort(vector<double>& a) {",
            "    while (!isSorted(a)) {",
            "        // Xáo trộn ngẫu nhiên mảng",
            "        for (int i = 0; i < a.size(); ++i)",
            "            swap(a[i], a[rand() % a.size()]);",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let n = a.length;
            let attempts = 0;
            const maxAttempts = 15; // Giới hạn số lượt để không treo trình duyệt

            function checkSorted() {
                for (let i = 0; i < n - 1; ++i) {
                    if (a[i] > a[i + 1]) return false;
                }
                return true;
            }

            while (!checkSorted() && attempts < maxAttempts) {
                attempts++;
                yield { line: 6, explanation: `Lượt thử #${attempts}: Mảng chưa đúng thứ tự, bắt đầu xáo trộn ngẫu nhiên!`, indices: [], type: 'info', array: [...a], vars: { attempts } };

                for (let i = n - 1; i > 0; --i) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [a[i], a[j]] = [a[j], a[i]];
                    yield { line: 10, explanation: `Xáo trộn: Đổi chỗ a[${i}] và a[${j}]`, indices: [i, j], type: 'swap', array: [...a], vars: { attempts, i, j } };
                }
            }

            if (checkSorted()) {
                yield { line: 12, explanation: `Thật kỳ diệu! Mảng đã tình cờ được sắp xếp đúng sau ${attempts} lượt xáo trộn!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: { attempts } };
            } else {
                // Tự động sắp xếp chuẩn sau giới hạn lượt thử
                a.sort((x, y) => x - y);
                yield { line: 12, explanation: `Đã đạt giới hạn mô phỏng an toàn (${maxAttempts} lần). Tự động chốt dãy đã sắp xếp để bảo vệ trình duyệt!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: { attempts } };
            }
        }
    }
};
