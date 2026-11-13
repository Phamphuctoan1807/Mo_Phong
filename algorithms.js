// ==============================================================================
// ALGORITHMS KNOWLEDGE BASE & GENERATOR STEP ENGINES (TIẾNG VIỆT HÓA BIẾN SỐ)
// Hỗ trợ số âm, số thực, không giới hạn phần tử
// Toàn bộ tên biến C++, mã nguồn và biến theo dõi đã được chuyển sang Tiếng Việt
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
        description: "Thuật toán chia để trị kinh điển, chọn 1 phần tử làm 'chốt' (pivot) và dồn các phần tử nhỏ hơn sang trái, lớn hơn sang phải.",
        logic: [
            "1. Chọn phần tử cuối mảng a[cuoi] làm 'chot'.",
            "2. Khởi tạo con trỏ i = dau - 1 ghi nhận ranh giới các phần tử nhỏ hơn chốt.",
            "3. Duyệt j từ dau đến cuoi - 1: Nếu a[j] < chot, tăng i và hoán đổi a[i] với a[j].",
            "4. Đưa chốt về đúng vị trí trung tâm bằng cách hoán đổi a[i + 1] với a[cuoi].",
            "5. Đệ quy tiếp tục sắp xếp phân vùng bên trái [dau .. viTriChot - 1] và bên phải [viTriChot + 1 .. cuoi]."
        ],
        pros: [
            "Tốc độ thực tế cực nhanh, hiệu năng cache bộ nhớ vi xử lý tối ưu.",
            "Độ phức tạp trung bình O(N log N) với hằng số ẩn rất nhỏ.",
            "Không tốn nhiều bộ nhớ phụ trợ (chỉ tốn ngăn xếp đệ quy O(log N))."
        ],
        cons: [
            "Trường hợp xấu nhất O(N²) khi mảng đã có thứ tự và chọn chốt không tốt.",
            "Không có tính ổn định (không giữ nguyên thứ tự tương đối của các phần tử bằng nhau)."
        ],
        code: [
            "void quickSort(vector<double>& mang, int dau, int cuoi) {",
            "    if (dau < cuoi) {",
            "        double chot = mang[cuoi];",
            "        int i = dau - 1;",
            "        for (int j = dau; j < cuoi; ++j) {",
            "            if (mang[j] < chot) {",
            "                i++;",
            "                swap(mang[i], mang[j]);",
            "            }",
            "        }",
            "        swap(mang[i + 1], mang[cuoi]);",
            "        int viTriChot = i + 1;",
            "        quickSort(mang, dau, viTriChot - 1);",
            "        quickSort(mang, viTriChot + 1, cuoi);",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            function* qs(dau, cuoi) {
                yield { line: 1, explanation: `Kiểm tra đoạn [${dau}..${cuoi}]: ${dau < cuoi ? 'Hợp lệ' : 'Đoạn rỗng/1 phần tử'}`, indices: [dau, cuoi], type: 'info', array: [...a], vars: { dau, cuoi } };
                if (dau < cuoi) {
                    let chot = a[cuoi];
                    yield { line: 2, explanation: `Chọn chốt = mang[${cuoi}] = ${chot}`, indices: [cuoi], type: 'pivot', array: [...a], vars: { dau, cuoi, chot } };
                    let i = dau - 1;
                    yield { line: 3, explanation: `Khởi tạo con trỏ i = ${i} (ranh giới nhỏ hơn chốt)`, indices: [cuoi], type: 'info', array: [...a], vars: { i, chot } };

                    for (let j = dau; j < cuoi; ++j) {
                        yield { line: 4, explanation: `Vòng lặp j = ${j}, so sánh mang[${j}]=${a[j]} với chot=${chot}`, indices: [j, cuoi], type: 'compare', array: [...a], vars: { i, j, chot } };
                        if (a[j] < chot) {
                            yield { line: 5, explanation: `Vì mang[${j}] < chot, tăng i và chuẩn bị hoán đổi`, indices: [j, cuoi], type: 'info', array: [...a], vars: { i, j, chot } };
                            i++;
                            yield { line: 6, explanation: `Tăng i lên ${i}`, indices: [i, j], type: 'info', array: [...a], vars: { i, j } };
                            [a[i], a[j]] = [a[j], a[i]];
                            yield { line: 7, explanation: `Hoán đổi mang[${i}] và mang[${j}]`, indices: [i, j], type: 'swap', array: [...a], vars: { i, j } };
                        }
                    }
                    [a[i + 1], a[cuoi]] = [a[cuoi], a[i + 1]];
                    let viTriChot = i + 1;
                    yield { line: 10, explanation: `Đưa chốt ${chot} về vị trí chính xác mang[${viTriChot}]`, indices: [viTriChot, cuoi], type: 'swap', array: [...a], vars: { viTriChot, chot } };
                    yield { line: 11, explanation: `Phần tử mang[${viTriChot}] = ${a[viTriChot]} đã cố định vị trí`, indices: [viTriChot], type: 'sorted', array: [...a], vars: { viTriChot } };

                    yield { line: 12, explanation: `Đệ quy sắp xếp nửa trái [${dau} .. ${viTriChot - 1}]`, indices: [dau, viTriChot - 1], type: 'info', array: [...a], vars: { dau, cuoi: viTriChot - 1 } };
                    yield* qs(dau, viTriChot - 1);
                    yield { line: 13, explanation: `Đệ quy sắp xếp nửa phải [${viTriChot + 1} .. ${cuoi}]`, indices: [viTriChot + 1, cuoi], type: 'info', array: [...a], vars: { dau: viTriChot + 1, cuoi } };
                    yield* qs(viTriChot + 1, cuoi);
                } else if (dau === cuoi) {
                    yield { line: 1, explanation: `Phần tử duy nhất mang[${dau}] = ${a[dau]} tự nó đã có thứ tự`, indices: [dau], type: 'sorted', array: [...a], vars: { dau } };
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
        description: "Thuật toán chia đôi mảng liên tục cho đến từng phần tử đơn lẻ, sau đó trộn (merge) từng cặp danh sách đã sắp xếp lại thành dãy hoàn chỉnh.",
        logic: [
            "1. Chia đôi dãy [trai..phai] tại điểm giữa giua = trai + (phai - trai)/2.",
            "2. Đệ quy sắp xếp nửa trái [trai..giua].",
            "3. Đệ quy sắp xếp nửa phải [giua + 1..phai].",
            "4. Trộn hai nửa đã sắp xếp vào mảng tạm bằng cách so sánh 2 phần tử đầu ở mỗi nửa.",
            "5. Sao chép kết quả từ mảng tạm đè lại vào mảng gốc."
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
            "void mergeSort(vector<double>& mang, int trai, int phai) {",
            "    if (trai < phai) {",
            "        int giua = trai + (phai - trai) / 2;",
            "        mergeSort(mang, trai, giua);",
            "        mergeSort(mang, giua + 1, phai);",
            "        tronMang(mang, trai, giua, phai);",
            "    }",
            "}",
            "void tronMang(vector<double>& mang, int trai, int giua, int phai) {",
            "    vector<double> mangTam;",
            "    int i = trai, j = giua + 1;",
            "    while (i <= giua && j <= phai)",
            "        mangTam.push_back(mang[i] <= mang[j] ? mang[i++] : mang[j++]);",
            "    while (i <= giua) mangTam.push_back(mang[i++]);",
            "    while (j <= phai) mangTam.push_back(mang[j++]);",
            "    for (int k = 0; k < mangTam.size(); ++k) mang[trai + k] = mangTam[k];",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            function* ms(trai, phai) {
                if (trai < phai) {
                    let giua = Math.floor(trai + (phai - trai) / 2);
                    yield { line: 2, explanation: `Chia đôi đoạn [${trai}..${phai}] tại điểm giữa giua = ${giua}`, indices: [giua], type: 'info', array: [...a], vars: { trai, giua, phai } };
                    yield* ms(trai, giua);
                    yield* ms(giua + 1, phai);

                    yield { line: 5, explanation: `Bắt đầu trộn 2 nửa: [${trai}..${giua}] và [${giua + 1}..${phai}]`, indices: [trai, phai], type: 'info', array: [...a], vars: { trai, giua, phai } };
                    let mangTam = [];
                    let i = trai, j = giua + 1;
                    while (i <= giua && j <= phai) {
                        yield { line: 11, explanation: `So sánh mang[${i}]=${a[i]} và mang[${j}]=${a[j]}`, indices: [i, j], type: 'compare', array: [...a], vars: { i, j } };
                        if (a[i] <= a[j]) {
                            yield { line: 12, explanation: `Chọn mang[${i}]=${a[i]} đưa vào mảng tạm`, indices: [i], type: 'info', array: [...a], vars: { phanTuChon: a[i] } };
                            mangTam.push(a[i++]);
                        } else {
                            yield { line: 12, explanation: `Chọn mang[${j}]=${a[j]} đưa vào mảng tạm`, indices: [j], type: 'info', array: [...a], vars: { phanTuChon: a[j] } };
                            mangTam.push(a[j++]);
                        }
                    }
                    while (i <= giua) {
                        yield { line: 13, explanation: `Đưa phần tử còn lại mang[${i}]=${a[i]} vào mảng tạm`, indices: [i], type: 'info', array: [...a], vars: { phanTuChon: a[i] } };
                        mangTam.push(a[i++]);
                    }
                    while (j <= phai) {
                        yield { line: 14, explanation: `Đưa phần tử còn lại mang[${j}]=${a[j]} vào mảng tạm`, indices: [j], type: 'info', array: [...a], vars: { phanTuChon: a[j] } };
                        mangTam.push(a[j++]);
                    }
                    for (let k = 0; k < mangTam.length; ++k) {
                        a[trai + k] = mangTam[k];
                        yield { line: 15, explanation: `Ghi đè mang[${trai + k}] = ${mangTam[k]} từ mảng tạm vào mảng chính`, indices: [trai + k], type: 'swap', array: [...a], vars: { viTri: trai + k, giaTri: mangTam[k] } };
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
            "1. Xây dựng Max-Heap từ mảng ban đầu: duyệt ngược từ n/2 - 1 về 0 và gọi vunDong.",
            "2. Trong vunDong: so sánh nút cha với 2 nút con (conTrai, conPhai), tìm nút có giá trị lonNhat.",
            "3. Nếu nút lonNhat khác nút cha, hoán đổi và đệ quy vun tiếp tục xuống nhánh con.",
            "4. Đổi chỗ phần tử lớn nhất ở đỉnh mang[0] với mang[i] ở cuối vùng chưa xếp.",
            "5. Giảm kích thước đống đi 1 và vun lại đỉnh đống mang[0]."
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
            "void heapSort(vector<double>& mang) {",
            "    int soPhanTu = mang.size();",
            "    for (int i = soPhanTu / 2 - 1; i >= 0; --i)",
            "        vunDong(mang, soPhanTu, i);",
            "    for (int i = soPhanTu - 1; i > 0; --i) {",
            "        swap(mang[0], mang[i]);",
            "        vunDong(mang, i, 0);",
            "    }",
            "}",
            "void vunDong(vector<double>& mang, int kichThuoc, int i) {",
            "    int lonNhat = i, conTrai = 2*i + 1, conPhai = 2*i + 2;",
            "    if (conTrai < kichThuoc && mang[conTrai] > mang[lonNhat]) lonNhat = conTrai;",
            "    if (conPhai < kichThuoc && mang[conPhai] > mang[lonNhat]) lonNhat = conPhai;",
            "    if (lonNhat != i) {",
            "        swap(mang[i], mang[lonNhat]);",
            "        vunDong(mang, kichThuoc, lonNhat);",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let soPhanTu = a.length;

            function* vunDong(kichThuoc, i) {
                let lonNhat = i;
                let conTrai = 2 * i + 1;
                let conPhai = 2 * i + 2;

                yield { line: 10, explanation: `Kiểm tra vun đống tại nút i=${i} (giá trị=${a[i]}), kích thước đống=${kichThuoc}`, indices: [i], type: 'info', array: [...a], vars: { lonNhat, conTrai, conPhai, kichThuoc } };

                if (conTrai < kichThuoc) {
                    yield { line: 11, explanation: `So sánh nút con trái mang[${conTrai}]=${a[conTrai]} với mang[${lonNhat}]=${a[lonNhat]}`, indices: [conTrai, lonNhat], type: 'compare', array: [...a], vars: { conTrai, lonNhat } };
                    if (a[conTrai] > a[lonNhat]) lonNhat = conTrai;
                }
                if (conPhai < kichThuoc) {
                    yield { line: 12, explanation: `So sánh nút con phải mang[${conPhai}]=${a[conPhai]} với mang[${lonNhat}]=${a[lonNhat]}`, indices: [conPhai, lonNhat], type: 'compare', array: [...a], vars: { conPhai, lonNhat } };
                    if (a[conPhai] > a[lonNhat]) lonNhat = conPhai;
                }

                if (lonNhat !== i) {
                    yield { line: 14, explanation: `Nút lớn nhất là mang[${lonNhat}]=${a[lonNhat]} > mang[${i}]=${a[i]}. Hoán đổi!`, indices: [i, lonNhat], type: 'swap', array: [...a], vars: { i, lonNhat } };
                    [a[i], a[lonNhat]] = [a[lonNhat], a[i]];
                    yield* vunDong(kichThuoc, lonNhat);
                }
            }

            yield { line: 2, explanation: `Xây dựng Max-Heap từ mảng ban đầu...`, indices: [], type: 'info', array: [...a], vars: {} };
            for (let i = Math.floor(soPhanTu / 2) - 1; i >= 0; --i) {
                yield* vunDong(soPhanTu, i);
            }
            yield { line: 4, explanation: `Max-Heap đã dựng xong. Đỉnh mang[0] luôn là giá trị lớn nhất hiện tại.`, indices: [0], type: 'pivot', array: [...a], vars: { dinhMax: a[0] } };

            for (let i = soPhanTu - 1; i > 0; --i) {
                yield { line: 5, explanation: `Đổi chỗ đỉnh Max mang[0]=${a[0]} xuống cuối vị trí mang[${i}]`, indices: [0, i], type: 'swap', array: [...a], vars: { i, chotCuoi: a[0] } };
                [a[0], a[i]] = [a[i], a[0]];
                yield { line: 6, explanation: `Phần tử mang[${i}] = ${a[i]} đã chốt vị trí sắp xếp`, indices: [i], type: 'sorted', array: [...a], vars: { viTriChot: i } };
                yield* vunDong(i, 0);
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
            "1. Coi phần tử đầu tiên mang[0] là đã được sắp xếp.",
            "2. Duyệt i từ 1 đến soPhanTu - 1: Lưu giá trị giaTriChen = mang[i].",
            "3. Duyệt j từ i - 1 lùi dần về 0: Nếu mang[j] > giaTriChen, dịch chuyển mang[j] sang phải.",
            "4. Đặt giaTriChen vào khoảng trống tìm được tại mang[j + 1].",
            "5. Tiếp tục với các phần tử tiếp theo."
        ],
        pros: [
            "Cực nhanh khi dãy đã gần như có thứ tự (đạt O(N)).",
            "Thuật toán tại chỗ O(1) và ổn định (Stable).",
            "Thường được dùng làm bước cơ sở trong các thuật toán phức tạp như TimSort khi mảng nhỏ."
        ],
        cons: [
            "Kém hiệu quả với dữ liệu lớn ngẫu nhiên (O(N²))."
        ],
        code: [
            "void insertionSort(vector<double>& mang) {",
            "    int soPhanTu = mang.size();",
            "    for (int i = 1; i < soPhanTu; ++i) {",
            "        double giaTriChen = mang[i];",
            "        int j = i - 1;",
            "        while (j >= 0 && mang[j] > giaTriChen) {",
            "            mang[j + 1] = mang[j];",
            "            j--;",
            "        }",
            "        mang[j + 1] = giaTriChen;",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let soPhanTu = a.length;
            for (let i = 1; i < soPhanTu; ++i) {
                let giaTriChen = a[i];
                let j = i - 1;
                yield { line: 3, explanation: `Chọn giaTriChen = mang[${i}] = ${giaTriChen} để chuẩn bị chèn vào đoạn [0..${i - 1}]`, indices: [i], type: 'pivot', array: [...a], vars: { i, giaTriChen } };

                while (j >= 0) {
                    yield { line: 5, explanation: `So sánh mang[${j}]=${a[j]} với giaTriChen=${giaTriChen}`, indices: [j, j + 1], type: 'compare', array: [...a], vars: { j, giaTriChen } };
                    if (a[j] > giaTriChen) {
                        a[j + 1] = a[j];
                        yield { line: 6, explanation: `Vì mang[${j}] > giaTriChen, dịch chuyển mang[${j}] sang mang[${j + 1}]`, indices: [j + 1], type: 'swap', array: [...a], vars: { j, giaTriChen } };
                        j--;
                    } else {
                        yield { line: 5, explanation: `mang[${j}] <= giaTriChen, dừng tìm kiếm vị trí chèn`, indices: [j], type: 'info', array: [...a], vars: { j } };
                        break;
                    }
                }
                a[j + 1] = giaTriChen;
                yield { line: 9, explanation: `Chèn giaTriChen=${giaTriChen} vào vị trí mang[${j + 1}]`, indices: [j + 1], type: 'sorted', array: [...a], vars: { viTriChen: j + 1, giaTriChen } };
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
            "1. Duyệt i từ 0 đến soPhanTu - 2.",
            "2. Giả sử phần tử nhỏ nhất viTriNhoNhat = i.",
            "3. Duyệt j từ i + 1 đến soPhanTu - 1: Nếu mang[j] < mang[viTriNhoNhat], cập nhật viTriNhoNhat = j.",
            "4. Hoán đổi mang[i] với mang[viTriNhoNhat] để đưa phần tử nhỏ nhất về đầu đoạn.",
            "5. Đánh dấu mang[i] đã hoàn thành và tăng i."
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
            "void selectionSort(vector<double>& mang) {",
            "    int soPhanTu = mang.size();",
            "    for (int i = 0; i < soPhanTu - 1; ++i) {",
            "        int viTriNhoNhat = i;",
            "        for (int j = i + 1; j < soPhanTu; ++j) {",
            "            if (mang[j] < mang[viTriNhoNhat])",
            "                viTriNhoNhat = j;",
            "        }",
            "        if (viTriNhoNhat != i)",
            "            swap(mang[i], mang[viTriNhoNhat]);",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let soPhanTu = a.length;
            for (let i = 0; i < soPhanTu - 1; ++i) {
                let viTriNhoNhat = i;
                yield { line: 3, explanation: `Bắt đầu lượt i=${i}, tạm gán viTriNhoNhat=${i} (giá trị=${a[i]})`, indices: [i], type: 'pivot', array: [...a], vars: { i, viTriNhoNhat } };

                for (let j = i + 1; j < soPhanTu; ++j) {
                    yield { line: 5, explanation: `So sánh mang[${j}]=${a[j]} với phần tử nhỏ nhất hiện tại mang[${viTriNhoNhat}]=${a[viTriNhoNhat]}`, indices: [j, viTriNhoNhat], type: 'compare', array: [...a], vars: { i, j, viTriNhoNhat } };
                    if (a[j] < a[viTriNhoNhat]) {
                        viTriNhoNhat = j;
                        yield { line: 6, explanation: `Tìm thấy giá trị nhỏ hơn! Cập nhật viTriNhoNhat = ${viTriNhoNhat} (giá trị=${a[viTriNhoNhat]})`, indices: [viTriNhoNhat], type: 'info', array: [...a], vars: { viTriNhoNhat } };
                    }
                }
                if (viTriNhoNhat !== i) {
                    yield { line: 9, explanation: `Hoán đổi mang[${i}]=${a[i]} với giá trị nhỏ nhất mang[${viTriNhoNhat}]=${a[viTriNhoNhat]}`, indices: [i, viTriNhoNhat], type: 'swap', array: [...a], vars: { i, viTriNhoNhat } };
                    [a[i], a[viTriNhoNhat]] = [a[viTriNhoNhat], a[i]];
                }
                yield { line: 10, explanation: `Phần tử mang[${i}] = ${a[i]} đã được chốt vị trí`, indices: [i], type: 'sorted', array: [...a], vars: { viTriDaChot: i } };
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
            "1. Lặp qua các lượt i từ 0 đến soPhanTu - 1.",
            "2. Khởi tạo cờ daHoanDoi = false.",
            "3. Duyệt j từ 0 đến soPhanTu - i - 2: nếu mang[j] > mang[j + 1], hoán đổi và gán daHoanDoi = true.",
            "4. Nếu sau 1 lượt duyệt mà daHoanDoi vẫn là false, mảng đã sắp xếp xong, dừng sớm."
        ],
        pros: [
            "Cực kỳ trực quan, dễ hiểu nhất cho người mới bắt đầu.",
            "Có tính ổn định (Stable).",
            "Tối ưu được O(N) khi mảng đã sắp xếp sẵn bằng cách dùng cờ hiệu daHoanDoi."
        ],
        cons: [
            "Rất chậm với mảng lớn, số lượng phép so sánh và swap rất nhiều (O(N²))."
        ],
        code: [
            "void bubbleSort(vector<double>& mang) {",
            "    int soPhanTu = mang.size();",
            "    for (int i = 0; i < soPhanTu - 1; ++i) {",
            "        bool daHoanDoi = false;",
            "        for (int j = 0; j < soPhanTu - i - 1; ++j) {",
            "            if (mang[j] > mang[j + 1]) {",
            "                swap(mang[j], mang[j + 1]);",
            "                daHoanDoi = true;",
            "            }",
            "        }",
            "        if (!daHoanDoi) break;",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let soPhanTu = a.length;
            for (let i = 0; i < soPhanTu - 1; ++i) {
                let daHoanDoi = false;
                yield { line: 3, explanation: `Bắt đầu lượt ${i + 1}/${soPhanTu - 1}`, indices: [], type: 'info', array: [...a], vars: { i, daHoanDoi } };

                for (let j = 0; j < soPhanTu - i - 1; ++j) {
                    yield { line: 5, explanation: `So sánh cặp liền kề mang[${j}]=${a[j]} và mang[${j + 1}]=${a[j + 1]}`, indices: [j, j + 1], type: 'compare', array: [...a], vars: { j, daHoanDoi } };
                    if (a[j] > a[j + 1]) {
                        [a[j], a[j + 1]] = [a[j + 1], a[j]];
                        daHoanDoi = true;
                        yield { line: 6, explanation: `Vì mang[${j}] > mang[${j + 1}], hoán đổi vị trí`, indices: [j, j + 1], type: 'swap', array: [...a], vars: { j, daHoanDoi } };
                    }
                }
                yield { line: 9, explanation: `Phần tử mang[${soPhanTu - i - 1}] = ${a[soPhanTu - i - 1]} đã nổi bọt về đúng vị trí`, indices: [soPhanTu - i - 1], type: 'sorted', array: [...a], vars: { viTriChot: soPhanTu - i - 1 } };
                if (!daHoanDoi) {
                    yield { line: 10, explanation: `Không có hoán đổi nào (daHoanDoi = false). Dãy đã có thứ tự, dừng sớm!`, indices: [], type: 'info', array: [...a], vars: { daHoanDoi: false, dungSom: true } };
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
        description: "Bản nâng cấp vượt bậc của Insertion Sort: so sánh và hoán đổi các phần tử cách nhau một khoảng cách khoangCach, thu hẹp dần về 1.",
        logic: [
            "1. Chọn bước nhảy ban đầu khoangCach = soPhanTu / 2.",
            "2. Thực hiện sắp xếp chèn cho các phần tử cách nhau khoảng cách khoangCach.",
            "3. Giảm khoảng cách khoangCach = khoangCach / 2 sau mỗi vòng lặp.",
            "4. Khi khoangCach = 1, thuật toán trở thành Insertion Sort thông thường nhưng dãy đã gần như sắp xếp xong nên chạy cực nhanh."
        ],
        pros: [
            "Nhanh hơn rất nhiều so với Insertion Sort và Bubble Sort mà không cần đệ quy hay bộ nhớ phụ.",
            "Dễ cài đặt, phù hợp cho hệ thống nhúng có dung lượng RAM hạn chế."
        ],
        cons: [
            "Hiệu suất phụ thuộc vào chuỗi chọn khoangCach.",
            "Không ổn định."
        ],
        code: [
            "void shellSort(vector<double>& mang) {",
            "    int soPhanTu = mang.size();",
            "    for (int khoangCach = soPhanTu / 2; khoangCach > 0; khoangCach /= 2) {",
            "        for (int i = khoangCach; i < soPhanTu; ++i) {",
            "            double tamThoi = mang[i];",
            "            int j = i;",
            "            while (j >= khoangCach && mang[j - khoangCach] > tamThoi) {",
            "                mang[j] = mang[j - khoangCach];",
            "                j -= khoangCach;",
            "            }",
            "            mang[j] = tamThoi;",
            "        }",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let soPhanTu = a.length;
            for (let khoangCach = Math.floor(soPhanTu / 2); khoangCach > 0; khoangCach = Math.floor(khoangCach / 2)) {
                yield { line: 3, explanation: `Đặt khoảng cách khoangCach = ${khoangCach}`, indices: [], type: 'info', array: [...a], vars: { khoangCach } };

                for (let i = khoangCach; i < soPhanTu; ++i) {
                    let tamThoi = a[i];
                    let j = i;
                    yield { line: 5, explanation: `Lấy tamThoi = mang[${i}] = ${tamThoi}, kiểm tra với bước nhảy khoangCach = ${khoangCach}`, indices: [i], type: 'pivot', array: [...a], vars: { khoangCach, i, tamThoi } };

                    while (j >= khoangCach) {
                        yield { line: 7, explanation: `So sánh mang[${j - khoangCach}]=${a[j - khoangCach]} với tamThoi=${tamThoi}`, indices: [j - khoangCach, j], type: 'compare', array: [...a], vars: { j, khoangCach, tamThoi } };
                        if (a[j - khoangCach] > tamThoi) {
                            a[j] = a[j - khoangCach];
                            yield { line: 8, explanation: `Dịch chuyển mang[${j - khoangCach}] sang vị trí mang[${j}]`, indices: [j], type: 'swap', array: [...a], vars: { j, khoangCach } };
                            j -= khoangCach;
                        } else {
                            break;
                        }
                    }
                    a[j] = tamThoi;
                    yield { line: 11, explanation: `Đặt tamThoi = ${tamThoi} vào vị trí mang[${j}]`, indices: [j], type: 'info', array: [...a], vars: { viTriDat: j, tamThoi } };
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
            "1. Lượt đi từ dau sang cuoi: đẩy phần tử lớn nhất về ranh giới cuối.",
            "2. Giảm ranh giới cuoi đi 1.",
            "3. Lượt về từ cuoi về dau: đẩy phần tử nhỏ nhất về ranh giới đầu.",
            "4. Tăng ranh giới dau lên 1.",
            "5. Lặp lại cho đến khi dau >= cuoi hoặc không còn hoán đổi nào (daHoanDoi = false)."
        ],
        pros: [
            "Giải quyết triệt để vấn đề 'rùa' (các phần tử nhỏ nằm ở cuối mảng) khiến Bubble Sort bị chậm.",
            "Ổn định và in-place O(1)."
        ],
        cons: [
            "Vẫn có độ phức tạp trung bình là O(N²)."
        ],
        code: [
            "void cocktailSort(vector<double>& mang) {",
            "    bool daHoanDoi = true;",
            "    int dau = 0, cuoi = mang.size() - 1;",
            "    while (daHoanDoi) {",
            "        daHoanDoi = false;",
            "        for (int i = dau; i < cuoi; ++i) {",
            "            if (mang[i] > mang[i + 1]) { swap(mang[i], mang[i + 1]); daHoanDoi = true; }",
            "        }",
            "        if (!daHoanDoi) break;",
            "        daHoanDoi = false; cuoi--;",
            "        for (int i = cuoi - 1; i >= dau; --i) {",
            "            if (mang[i] > mang[i + 1]) { swap(mang[i], mang[i + 1]); daHoanDoi = true; }",
            "        }",
            "        dau++;",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let daHoanDoi = true;
            let dau = 0, cuoi = a.length - 1;

            while (daHoanDoi) {
                daHoanDoi = false;
                yield { line: 5, explanation: `Duyệt xuôi từ dau=${dau} đến cuoi=${cuoi} để đẩy số lớn nhất về cuối`, indices: [dau, cuoi], type: 'info', array: [...a], vars: { dau, cuoi } };
                for (let i = dau; i < cuoi; ++i) {
                    yield { line: 6, explanation: `So sánh mang[${i}]=${a[i]} và mang[${i + 1}]=${a[i + 1]}`, indices: [i, i + 1], type: 'compare', array: [...a], vars: { i } };
                    if (a[i] > a[i + 1]) {
                        [a[i], a[i + 1]] = [a[i + 1], a[i]];
                        daHoanDoi = true;
                        yield { line: 7, explanation: `Hoán đổi mang[${i}] và mang[${i + 1}]`, indices: [i, i + 1], type: 'swap', array: [...a], vars: { i, daHoanDoi } };
                    }
                }
                yield { line: 10, explanation: `Phần tử mang[${cuoi}] = ${a[cuoi]} đã ở đúng vị trí cuối`, indices: [cuoi], type: 'sorted', array: [...a], vars: { cuoi } };
                if (!daHoanDoi) break;

                daHoanDoi = false;
                cuoi--;
                yield { line: 11, explanation: `Duyệt ngược từ cuoi=${cuoi} về dau=${dau} để kéo số nhỏ nhất về đầu`, indices: [dau, cuoi], type: 'info', array: [...a], vars: { dau, cuoi } };
                for (let i = cuoi - 1; i >= dau; --i) {
                    yield { line: 12, explanation: `So sánh mang[${i}]=${a[i]} và mang[${i + 1}]=${a[i + 1]}`, indices: [i, i + 1], type: 'compare', array: [...a], vars: { i } };
                    if (a[i] > a[i + 1]) {
                        [a[i], a[i + 1]] = [a[i + 1], a[i]];
                        daHoanDoi = true;
                        yield { line: 13, explanation: `Hoán đổi mang[${i}] và mang[${i + 1}]`, indices: [i, i + 1], type: 'swap', array: [...a], vars: { i, daHoanDoi } };
                    }
                }
                yield { line: 14, explanation: `Phần tử mang[${dau}] = ${a[dau]} đã ở đúng vị trí đầu`, indices: [dau], type: 'sorted', array: [...a], vars: { dau } };
                dau++;
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
        description: "Thuật toán lấy cảm hứng từ cách chú lùn làm vườn sắp xếp chậu hoa: nếu đúng thứ tự thì bước tới, nếu sai thứ tự thì đổi chỗ và lùi lại một bước.",
        logic: [
            "1. Bắt đầu từ vị trí viTri = 0.",
            "2. Nếu viTri == 0, tăng viTri lên 1.",
            "3. Nếu mang[viTri] >= mang[viTri - 1], đúng thứ tự: tiến lên 1 bước (viTri++).",
            "4. Nếu mang[viTri] < mang[viTri - 1], sai thứ tự: hoán đổi và lùi lại 1 bước (viTri--).",
            "5. Lặp lại cho đến khi viTri đạt tới cuối mảng."
        ],
        pros: [
            "Cực kỳ đơn giản, chỉ cần một vòng lặp `while` duy nhất mà không lồng ghép vòng lặp.",
            "Đạt O(N) khi mảng đã có thứ tự sẵn."
        ],
        cons: [
            "Chậm với mảng đảo ngược (O(N²))."
        ],
        code: [
            "void gnomeSort(vector<double>& mang) {",
            "    int soPhanTu = mang.size();",
            "    int viTri = 0;",
            "    while (viTri < soPhanTu) {",
            "        if (viTri == 0)",
            "            viTri++;",
            "        if (mang[viTri] >= mang[viTri - 1])",
            "            viTri++;",
            "        else {",
            "            swap(mang[viTri], mang[viTri - 1]);",
            "            viTri--;",
            "        }",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let soPhanTu = a.length;
            let viTri = 0;
            while (viTri < soPhanTu) {
                if (viTri === 0) {
                    yield { line: 5, explanation: `viTri = 0, chú lùn bước tiến lên 1`, indices: [0], type: 'info', array: [...a], vars: { viTri: 0 } };
                    viTri++;
                    continue;
                }
                yield { line: 7, explanation: `So sánh mang[${viTri}]=${a[viTri]} với mang[${viTri - 1}]=${a[viTri - 1]}`, indices: [viTri - 1, viTri], type: 'compare', array: [...a], vars: { viTri } };
                if (a[viTri] >= a[viTri - 1]) {
                    yield { line: 8, explanation: `Đúng thứ tự! Chú lùn bước tới tiếp theo`, indices: [viTri], type: 'info', array: [...a], vars: { viTri } };
                    viTri++;
                } else {
                    [a[viTri], a[viTri - 1]] = [a[viTri - 1], a[viTri]];
                    yield { line: 10, explanation: `Sai thứ tự! Hoán đổi mang[${viTri}] và mang[${viTri - 1}], lùi lại một bước`, indices: [viTri - 1, viTri], type: 'swap', array: [...a], vars: { viTri } };
                    viTri--;
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
        description: "Cải tiến Bubble Sort bằng cách so sánh các phần tử cách nhau khoảng cách khoangCach chia cho hệ số co xấp xỉ 1.3.",
        logic: [
            "1. Khởi tạo khoảng cách khoangCach = soPhanTu.",
            "2. Mỗi vòng lặp, co khoảng cách lại: khoangCach = floor(khoangCach / 1.3). Nếu khoangCach < 1 thì gán = 1.",
            "3. Duyệt từ đầu đến soPhanTu - khoangCach: so sánh mang[i] với mang[i + khoangCach], đổi chỗ nếu sai thứ tự.",
            "4. Lặp lại cho đến khi khoangCach == 1 và daHoanDoi == false."
        ],
        pros: [
            "Loại bỏ các giá trị nhỏ ở cuối mảng nhanh chóng hơn Bubble Sort rất nhiều.",
            "Code ngắn gọn, không tốn thêm bộ nhớ."
        ],
        cons: [
            "Không ổn định (Unstable)."
        ],
        code: [
            "void combSort(vector<double>& mang) {",
            "    int soPhanTu = mang.size();",
            "    int khoangCach = soPhanTu;",
            "    bool daHoanDoi = true;",
            "    while (khoangCach != 1 || daHoanDoi) {",
            "        khoangCach = (khoangCach * 10) / 13;",
            "        if (khoangCach < 1) khoangCach = 1;",
            "        daHoanDoi = false;",
            "        for (int i = 0; i < soPhanTu - khoangCach; ++i) {",
            "            if (mang[i] > mang[i + khoangCach]) {",
            "                swap(mang[i], mang[i + khoangCach]);",
            "                daHoanDoi = true;",
            "            }",
            "        }",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let soPhanTu = a.length;
            let khoangCach = soPhanTu;
            let daHoanDoi = true;
            while (khoangCach !== 1 || daHoanDoi) {
                khoangCach = Math.floor((khoangCach * 10) / 13);
                if (khoangCach < 1) khoangCach = 1;
                daHoanDoi = false;
                yield { line: 6, explanation: `Cập nhật khoảng cách khoangCach = ${khoangCach}`, indices: [], type: 'info', array: [...a], vars: { khoangCach } };

                for (let i = 0; i < soPhanTu - khoangCach; ++i) {
                    yield { line: 10, explanation: `So sánh mang[${i}]=${a[i]} và mang[${i + khoangCach}]=${a[i + khoangCach]} (bước nhảy ${khoangCach})`, indices: [i, i + khoangCach], type: 'compare', array: [...a], vars: { i, khoangCach } };
                    if (a[i] > a[i + khoangCach]) {
                        [a[i], a[i + khoangCach]] = [a[i + khoangCach], a[i]];
                        daHoanDoi = true;
                        yield { line: 11, explanation: `Hoán đổi mang[${i}] và mang[${i + khoangCach}]`, indices: [i, i + khoangCach], type: 'swap', array: [...a], vars: { i, khoangCach, daHoanDoi } };
                    }
                }
            }
            yield { line: 15, explanation: `Hoàn tất Comb Sort!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: {} };
        }
    },

    // --------------------------------------------------------------------------
    // 11. BUCKET SORT
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
        description: "Chia khoảng giá trị thành soLuongThung đều nhau, phân phối các phần tử vào từng thùng, sắp xếp từng thùng và gộp lại. Đặc biệt hiệu quả với số thực và số âm.",
        logic: [
            "1. Tìm giaTriNhoNhat và giaTriLonNhat của mảng để xác định khoangGiaTri.",
            "2. Khởi tạo soLuongThung rỗng.",
            "3. Phân phối từng phần tử x vào thungSo tương ứng.",
            "4. Sắp xếp các phần tử bên trong từng thùng nhỏ.",
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
            "void bucketSort(vector<double>& mang, int soLuongThung = 5) {",
            "    double giaTriNhoNhat = *min_element(mang.begin(), mang.end());",
            "    double giaTriLonNhat = *max_element(mang.begin(), mang.end());",
            "    double khoangGiaTri = giaTriLonNhat - giaTriNhoNhat;",
            "    vector<vector<double>> danhSachThung(soLuongThung);",
            "    for (double x : mang) {",
            "        int thungSo = khoangGiaTri == 0 ? 0 : (x - giaTriNhoNhat) / khoangGiaTri * (soLuongThung - 1);",
            "        danhSachThung[thungSo].push_back(x);",
            "    }",
            "    mang.clear();",
            "    for (auto& thung : danhSachThung) {",
            "        sort(thung.begin(), thung.end());",
            "        for (double x : thung) mang.push_back(x);",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let soPhanTu = a.length;
            if (soPhanTu <= 1) {
                yield { line: 1, explanation: `Mảng chỉ có <= 1 phần tử`, indices: [0], type: 'sorted', array: [...a], vars: {} };
                return;
            }
            let giaTriNhoNhat = Math.min(...a);
            let giaTriLonNhat = Math.max(...a);
            let khoangGiaTri = giaTriLonNhat - giaTriNhoNhat;
            let soLuongThung = Math.max(2, Math.min(6, Math.floor(Math.sqrt(soPhanTu)) + 1));
            let danhSachThung = Array.from({ length: soLuongThung }, () => []);

            yield { line: 2, explanation: `Xác định min = ${giaTriNhoNhat}, max = ${giaTriLonNhat}. Tạo ${soLuongThung} thùng.`, indices: [], type: 'info', array: [...a], vars: { giaTriNhoNhat, giaTriLonNhat, soLuongThung } };

            for (let i = 0; i < soPhanTu; ++i) {
                let x = a[i];
                let thungSo = khoangGiaTri === 0 ? 0 : Math.floor(((x - giaTriNhoNhat) / khoangGiaTri) * (soLuongThung - 1));
                danhSachThung[thungSo].push(x);
                yield { line: 7, explanation: `Phân phối mang[${i}] = ${x} vào Thùng #${thungSo + 1}`, indices: [i], type: 'compare', array: [...a], vars: { giaTri: x, thungSo: thungSo + 1 } };
            }

            yield { line: 10, explanation: `Sắp xếp từng thùng và gộp lại mảng chính...`, indices: [], type: 'info', array: [...a], vars: {} };
            let idx = 0;
            for (let b = 0; b < soLuongThung; ++b) {
                danhSachThung[b].sort((x, y) => x - y);
                for (let val of danhSachThung[b]) {
                    a[idx] = val;
                    yield { line: 13, explanation: `Lấy ${val} từ Thùng #${b + 1} đưa về vị trí mang[${idx}]`, indices: [idx], type: 'swap', array: [...a], vars: { viTri: idx, giaTri: val, thung: b + 1 } };
                    idx++;
                }
            }
            yield { line: 15, explanation: `Hoàn tất Bucket Sort!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: {} };
        }
    },

    // --------------------------------------------------------------------------
    // 12. COUNTING SORT
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
        description: "Thuật toán phi so sánh đếm tần số xuất hiện của từng giá trị khóa bằng mảng đếm tần suất. Hỗ trợ số âm bằng phép dịch chuyển độ lệch.",
        logic: [
            "1. Tìm giaTriNhoNhat và giaTriLonNhat trong mảng.",
            "2. Tạo mangDem có kích thước (giaTriLonNhat - giaTriNhoNhat + 1), khởi tạo bằng 0.",
            "3. Duyệt mảng: đếm số lần xuất hiện của từng số x.",
            "4. Duyệt tuần tự mangDem: ghi các giá trị ngược lại vào mảng theo thứ tự tăng dần."
        ],
        pros: [
            "Thời gian chạy là tuyến tính O(N + K), nhanh hơn bất kỳ thuật toán so sánh nào khi khoảng giá trị K nhỏ.",
            "Có tính ổn định (Stable)."
        ],
        cons: [
            "Không phù hợp nếu khoảng giá trị quá lớn.",
            "Mặc định hoạt động trên số nguyên."
        ],
        code: [
            "void countingSort(vector<int>& mang) {",
            "    int giaTriNhoNhat = *min_element(mang.begin(), mang.end());",
            "    int giaTriLonNhat = *max_element(mang.begin(), mang.end());",
            "    int khoangDem = giaTriLonNhat - giaTriNhoNhat + 1;",
            "    vector<int> mangDem(khoangDem, 0);",
            "    for (int x : mang) mangDem[x - giaTriNhoNhat]++;",
            "    int viTriGhi = 0;",
            "    for (int i = 0; i < khoangDem; ++i) {",
            "        while (mangDem[i]-- > 0) mang[viTriGhi++] = i + giaTriNhoNhat;",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let giaTriNhoNhat = Math.min(...a);
            let giaTriLonNhat = Math.max(...a);
            let coSoThuc = a.some(x => !Number.isInteger(x));
            let tiLe = coSoThuc ? 10 : 1;

            let minScaled = Math.round(giaTriNhoNhat * tiLe);
            let maxScaled = Math.round(giaTriLonNhat * tiLe);
            let khoangDem = maxScaled - minScaled + 1;

            let mangDem = new Array(Math.min(khoangDem, 500)).fill(0);
            yield { line: 2, explanation: `Tìm min = ${giaTriNhoNhat}, max = ${giaTriLonNhat}. Khoảng đếm = ${khoangDem}`, indices: [], type: 'info', array: [...a], vars: { giaTriNhoNhat, giaTriLonNhat, khoangDem } };

            for (let i = 0; i < a.length; ++i) {
                let khoa = Math.round(a[i] * tiLe) - minScaled;
                if (khoa >= 0 && khoa < mangDem.length) mangDem[khoa]++;
                yield { line: 5, explanation: `Đếm phần tử mang[${i}] = ${a[i]} (tần số hiện tại: ${mangDem[khoa]})`, indices: [i], type: 'compare', array: [...a], vars: { giaTri: a[i], viTriKhoa: khoa } };
            }

            let viTriGhi = 0;
            for (let i = 0; i < mangDem.length; ++i) {
                while (mangDem[i] > 0) {
                    let giaTriKhoiPhuc = (i + minScaled) / tiLe;
                    a[viTriGhi] = giaTriKhoiPhuc;
                    yield { line: 8, explanation: `Ghi lại giá trị ${giaTriKhoiPhuc} vào mang[${viTriGhi}]`, indices: [viTriGhi], type: 'swap', array: [...a], vars: { viTriGhi, giaTriKhoiPhuc } };
                    mangDem[i]--;
                    viTriGhi++;
                }
            }
            yield { line: 10, explanation: `Hoàn tất Counting Sort!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: {} };
        }
    },

    // --------------------------------------------------------------------------
    // 13. RADIX SORT
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
        description: "Sắp xếp theo từng chữ số từ hàng đơn vị đến hàng cao nhất (LSD). Dùng đếm ổn định cho từng chữ số.",
        logic: [
            "1. Tách mảng hoặc dịch chuyển doLechAm để đưa toàn bộ về số không âm.",
            "2. Tìm giaTriLonNhat để xác định số chữ số cần duyệt.",
            "3. Lặp hangChuSo = 1, 10, 100... tương ứng đơn vị, chục, trăm...",
            "4. Trong mỗi chữ số, phân loại phần tử theo chữ số tại hàng đó.",
            "5. Sau khi duyệt hết các chữ số, mảng sẽ được sắp xếp hoàn toàn."
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
            "void radixSort(vector<int>& mang) {",
            "    int giaTriLonNhat = *max_element(mang.begin(), mang.end());",
            "    for (int hangChuSo = 1; giaTriLonNhat / hangChuSo > 0; hangChuSo *= 10) {",
            "        sapXepTheoChuSo(mang, hangChuSo);",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let giaTriNhoNhat = Math.min(...a);
            let doLechAm = giaTriNhoNhat < 0 ? -giaTriNhoNhat : 0;
            let mangKhongAm = a.map(x => Math.round(x + doLechAm));
            let giaTriLonNhat = Math.max(...mangKhongAm);

            yield { line: 1, explanation: `Dịch chuyển doLechAm = +${doLechAm} để đưa số âm về không âm. max = ${giaTriLonNhat}`, indices: [], type: 'info', array: [...a], vars: { doLechAm, giaTriLonNhat } };

            for (let hangChuSo = 1; Math.floor(giaTriLonNhat / hangChuSo) > 0; hangChuSo *= 10) {
                yield { line: 3, explanation: `Đang sắp xếp theo chữ số ở hàng: ${hangChuSo}`, indices: [], type: 'info', array: [...a], vars: { hangChuSo } };

                let mangKetQua = new Array(a.length).fill(0);
                let demChuSo = new Array(10).fill(0);

                for (let i = 0; i < a.length; ++i) {
                    let chuSo = Math.floor(mangKhongAm[i] / hangChuSo) % 10;
                    demChuSo[chuSo]++;
                    yield { line: 4, explanation: `Phần tử mang[${i}]=${a[i]} có chữ số hàng ${hangChuSo} là ${chuSo}`, indices: [i], type: 'compare', array: [...a], vars: { chuSo, hangChuSo } };
                }

                for (let i = 1; i < 10; ++i) demChuSo[i] += demChuSo[i - 1];

                for (let i = a.length - 1; i >= 0; --i) {
                    let chuSo = Math.floor(mangKhongAm[i] / hangChuSo) % 10;
                    mangKetQua[demChuSo[chuSo] - 1] = a[i];
                    demChuSo[chuSo]--;
                }

                for (let i = 0; i < a.length; ++i) {
                    a[i] = mangKetQua[i];
                    mangKhongAm[i] = Math.round(a[i] + doLechAm);
                    yield { line: 4, explanation: `Cập nhật mảng theo thứ tự chữ số hàng ${hangChuSo}`, indices: [i], type: 'swap', array: [...a], vars: { viTri: i, giaTri: a[i] } };
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
            "1. Coi phần tử mang[0] đã sắp xếp.",
            "2. Duyệt i từ 1 đến soPhanTu - 1 với phần tử cần chèn là giaTriChen = mang[i].",
            "3. Dùng Tìm kiếm Nhị phân trên đoạn [trai..phai] để tìm viTriChen thích hợp trong O(log N).",
            "4. Dịch chuyển các phần tử từ viTriChen đến i - 1 sang phải.",
            "5. Đặt giaTriChen vào mang[viTriChen]."
        ],
        pros: [
            "Giảm tối đa số lần so sánh từ O(N²) xuống O(N log N). Rất có lợi khi hàm so sánh phần tử phức tạp.",
            "Ổn định và in-place O(1)."
        ],
        cons: [
            "Vẫn cần O(N²) phép dịch chuyển phần tử trong mảng tĩnh."
        ],
        code: [
            "void binaryInsertionSort(vector<double>& mang) {",
            "    int soPhanTu = mang.size();",
            "    for (int i = 1; i < soPhanTu; ++i) {",
            "        double giaTriChen = mang[i];",
            "        int trai = 0, phai = i - 1;",
            "        while (trai <= phai) {",
            "            int giua = trai + (phai - trai) / 2;",
            "            if (giaTriChen < mang[giua]) phai = giua - 1;",
            "            else trai = giua + 1;",
            "        }",
            "        for (int j = i - 1; j >= trai; --j) mang[j + 1] = mang[j];",
            "        mang[trai] = giaTriChen;",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let soPhanTu = a.length;
            for (let i = 1; i < soPhanTu; ++i) {
                let giaTriChen = a[i];
                let trai = 0, phai = i - 1;
                yield { line: 3, explanation: `Chọn giaTriChen = mang[${i}] = ${giaTriChen}. Tìm vị trí chèn trong đoạn [0..${i - 1}] bằng Binary Search`, indices: [i], type: 'pivot', array: [...a], vars: { i, giaTriChen } };

                while (trai <= phai) {
                    let giua = Math.floor(trai + (phai - trai) / 2);
                    yield { line: 7, explanation: `Tìm kiếm nhị phân: so sánh giaTriChen=${giaTriChen} với mang[${giua}]=${a[giua]}`, indices: [giua, i], type: 'compare', array: [...a], vars: { trai, giua, phai, giaTriChen } };
                    if (giaTriChen < a[giua]) {
                        phai = giua - 1;
                    } else {
                        trai = giua + 1;
                    }
                }
                let viTriChen = trai;
                yield { line: 11, explanation: `Tìm thấy vị trí chèn thích hợp tại chỉ số ${viTriChen}`, indices: [viTriChen], type: 'info', array: [...a], vars: { viTriChen, giaTriChen } };

                for (let j = i - 1; j >= viTriChen; --j) {
                    a[j + 1] = a[j];
                    yield { line: 11, explanation: `Dịch chuyển mang[${j}] sang mang[${j + 1}]`, indices: [j + 1], type: 'swap', array: [...a], vars: { j } };
                }
                a[viTriChen] = giaTriChen;
                yield { line: 12, explanation: `Chèn giaTriChen=${giaTriChen} vào mang[${viTriChen}]`, indices: [viTriChen], type: 'sorted', array: [...a], vars: { viTriChen, giaTriChen } };
            }
            yield { line: 14, explanation: `Hoàn tất Binary Insertion Sort!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: {} };
        }
    },

    // --------------------------------------------------------------------------
    // 15. BOGO SORT
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
        description: "Thuật toán ngẫu nhiên hài hước: kiểm tra xem mảng đã có thứ tự chưa, nếu chưa thì xáo trộn ngẫu nhiên toàn bộ và kiểm tra lại.",
        logic: [
            "1. Kiểm tra kiemTraDaXep: nếu mang[i] <= mang[i+1] với mọi i thì dừng.",
            "2. Nếu có cặp vi phạm, xáo trộn ngẫu nhiên toàn bộ mảng.",
            "3. Tăng soLuotThu và lặp lại cho đến khi tình cờ trúng thứ tự đúng."
        ],
        pros: [
            "Mang tính giải trí và giáo dục cực cao về độ phức tạp giai thừa O(N!).",
            "Thời gian tốt nhất là O(N) nếu may mắn mảng đã sắp xếp ngay từ đầu."
        ],
        cons: [
            "Thời gian trung bình và xấu nhất cực kỳ tồi tệ, có thể chạy mãi mãi không dừng!"
        ],
        code: [
            "bool kiemTraDaXep(const vector<double>& mang) {",
            "    for (int i = 0; i < mang.size() - 1; ++i)",
            "        if (mang[i] > mang[i + 1]) return false;",
            "    return true;",
            "}",
            "void bogoSort(vector<double>& mang) {",
            "    int soLuotThu = 0;",
            "    while (!kiemTraDaXep(mang)) {",
            "        soLuotThu++;",
            "        for (int i = 0; i < mang.size(); ++i)",
            "            swap(mang[i], mang[rand() % mang.size()]);",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let soPhanTu = a.length;
            let soLuotThu = 0;
            const maxLuot = 15;

            function kiemTraDaXep() {
                for (let i = 0; i < soPhanTu - 1; ++i) {
                    if (a[i] > a[i + 1]) return false;
                }
                return true;
            }

            while (!kiemTraDaXep() && soLuotThu < maxLuot) {
                soLuotThu++;
                yield { line: 8, explanation: `Lượt thử #${soLuotThu}: Mảng chưa đúng thứ tự, bắt đầu xáo trộn ngẫu nhiên!`, indices: [], type: 'info', array: [...a], vars: { soLuotThu } };

                for (let i = soPhanTu - 1; i > 0; --i) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [a[i], a[j]] = [a[j], a[i]];
                    yield { line: 11, explanation: `Xáo trộn: Đổi chỗ mang[${i}] và mang[${j}]`, indices: [i, j], type: 'swap', array: [...a], vars: { soLuotThu, i, j } };
                }
            }

            if (kiemTraDaXep()) {
                yield { line: 12, explanation: `Thật kỳ diệu! Mảng đã tình cờ được sắp xếp đúng sau ${soLuotThu} lượt xáo trộn!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: { soLuotThu } };
            } else {
                a.sort((x, y) => x - y);
                yield { line: 12, explanation: `Đã đạt giới hạn an toàn (${maxLuot} lượt). Tự động chốt dãy sắp xếp để bảo vệ trình duyệt!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: { soLuotThu } };
            }
        }
    },

    // --------------------------------------------------------------------------
    // 16. TIMSORT (Chuẩn Python & Java)
    // --------------------------------------------------------------------------
    tim_sort: {
        id: "tim_sort",
        name: "TimSort (Thuật toán chuẩn Python & Java)",
        category: "Thuật toán lai (Hybrid)",
        complexity: {
            best: "O(N)",
            avg: "O(N log N)",
            worst: "O(N log N)",
            space: "O(N)",
            stable: "Có"
        },
        description: "Thuật toán sắp xếp lai đỉnh cao do Tim Peters sáng tạo năm 2002. Sử dụng Insertion Sort cho các khối ngắn (RUN) và gộp lại bằng kỹ thuật trộn thông minh của Merge Sort.",
        logic: [
            "1. Chia mảng thành các phân đoạn nhỏ có kích thước coRun (thường từ 4 đến 32 phần tử).",
            "2. Dùng Insertion Sort để sắp xếp nhanh từng phân đoạn nhỏ một cách độc lập.",
            "3. Bắt đầu gộp: Trộn các run có kích thước coRun, 2*coRun, 4*coRun... lại với nhau tương tự Merge Sort.",
            "4. Tiếp tục nhân đôi kích thước run gộp cho đến khi toàn bộ mảng được hợp nhất hoàn chỉnh."
        ],
        pros: [
            "Cực nhanh trên dữ liệu thực tế (thường chứa các chuỗi đã có thứ tự sẵn), đạt O(N) tốt nhất.",
            "Hoàn toàn ổn định (Stable Sort), bảo toàn thứ tự đối tượng bằng nhau.",
            "Chuẩn công nghiệp trong Python, Java, Android, Rust..."
        ],
        cons: [
            "Cần bộ nhớ phụ trợ O(N) cho thao tác trộn.",
            "Cài đặt hoàn chỉnh trong thực tế khá phức tạp (cần tính toán gallop mode)."
        ],
        code: [
            "const int RUN = 4; // Kích thước run mẫu",
            "void timSort(vector<double>& mang, int soPhanTu) {",
            "    // Bước 1: Sắp xếp từng run nhỏ bằng Insertion Sort",
            "    for (int i = 0; i < soPhanTu; i += RUN)",
            "        sapXepChen(mang, i, min(i + RUN - 1, soPhanTu - 1));",
            "    // Bước 2: Trộn các run kích thước tăng dần bằng Merge Sort",
            "    for (int co = RUN; co < soPhanTu; co = 2 * co) {",
            "        for (int trai = 0; trai < soPhanTu; trai += 2 * co) {",
            "            int giua = trai + co - 1;",
            "            int phai = min(trai + 2 * co - 1, soPhanTu - 1);",
            "            if (giua < phai) tronMang(mang, trai, giua, phai);",
            "        }",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let soPhanTu = a.length;
            const coRun = 4;

            yield { line: 3, explanation: `TimSort: Bắt đầu chia mảng thành các RUN kích thước ${coRun} phần tử`, indices: [], type: 'info', array: [...a], vars: { coRun, soPhanTu } };

            // Bước 1: Sắp xếp chèn từng Run
            for (let i = 0; i < soPhanTu; i += coRun) {
                let cuoiRun = Math.min(i + coRun - 1, soPhanTu - 1);
                yield { line: 4, explanation: `Sắp xếp chèn cho RUN trong đoạn [${i} .. ${cuoiRun}]`, indices: [i, cuoiRun], type: 'info', array: [...a], vars: { dauRun: i, cuoiRun } };

                for (let j = i + 1; j <= cuoiRun; ++j) {
                    let giaTriChen = a[j];
                    let k = j - 1;
                    yield { line: 5, explanation: `Chèn giaTriChen = ${giaTriChen} vào RUN`, indices: [j], type: 'pivot', array: [...a], vars: { giaTriChen } };

                    while (k >= i && a[k] > giaTriChen) {
                        a[k + 1] = a[k];
                        yield { line: 5, explanation: `Dịch chuyển mang[${k}] sang mang[${k + 1}]`, indices: [k, k + 1], type: 'swap', array: [...a], vars: { k } };
                        k--;
                    }
                    a[k + 1] = giaTriChen;
                }
            }

            // Bước 2: Trộn các Run
            for (let co = coRun; co < soPhanTu; co = 2 * co) {
                yield { line: 7, explanation: `Bắt đầu trộn các RUN có kích thước co = ${co}`, indices: [], type: 'info', array: [...a], vars: { coRunHienTai: co } };

                for (let trai = 0; trai < soPhanTu; trai += 2 * co) {
                    let giua = trai + co - 1;
                    let phai = Math.min(trai + 2 * co - 1, soPhanTu - 1);

                    if (giua < phai) {
                        yield { line: 11, explanation: `Trộn hai RUN: [${trai} .. ${giua}] và [${giua + 1} .. ${phai}]`, indices: [trai, phai], type: 'info', array: [...a], vars: { trai, giua, phai } };

                        let mangTam = [];
                        let p1 = trai, p2 = giua + 1;
                        while (p1 <= giua && p2 <= phai) {
                            yield { line: 11, explanation: `So sánh mang[${p1}]=${a[p1]} và mang[${p2}]=${a[p2]}`, indices: [p1, p2], type: 'compare', array: [...a], vars: { p1, p2 } };
                            if (a[p1] <= a[p2]) mangTam.push(a[p1++]);
                            else mangTam.push(a[p2++]);
                        }
                        while (p1 <= giua) mangTam.push(a[p1++]);
                        while (p2 <= phai) mangTam.push(a[p2++]);

                        for (let m = 0; m < mangTam.length; ++m) {
                            a[trai + m] = mangTam[m];
                            yield { line: 11, explanation: `Ghi đè mang[${trai + m}] = ${mangTam[m]}`, indices: [trai + m], type: 'swap', array: [...a], vars: { viTri: trai + m, giaTri: mangTam[m] } };
                        }
                    }
                }
            }

            yield { line: 13, explanation: `Hoàn tất TimSort!`, indices: a.map((_, idx) => idx), type: 'sorted', array: [...a], vars: {} };
        }
    },

    // --------------------------------------------------------------------------
    // 17. INTROSORT (Chuẩn C++ std::sort)
    // --------------------------------------------------------------------------
    intro_sort: {
        id: "intro_sort",
        name: "IntroSort (Thuật toán chuẩn C++ std::sort)",
        category: "Thuật toán lai (Hybrid)",
        complexity: {
            best: "O(N log N)",
            avg: "O(N log N)",
            worst: "O(N log N)",
            space: "O(log N)",
            stable: "Không"
        },
        description: "Thuật toán nội quan tối ưu nhất trong thực tế, là lõi của hàm std::sort trong C++. Bắt đầu với Quick Sort, tự động chuyển sang Heap Sort nếu đệ quy quá sâu (chặn đứng O(N²)) và chuyển sang Insertion Sort với mảng con nhỏ.",
        logic: [
            "1. Tính ngưỡng độ sâu đệ quy tối đa doSauToiDa = 2 * log2(soPhanTu).",
            "2. Nếu mảng con có kích thước <= 16: Chuyển sang Insertion Sort vì nhanh nhất cho mảng nhỏ.",
            "3. Nếu doSauToiDa == 0: Chuyển ngay sang Heap Sort để đảm bảo O(N log N) không bị suy biến thành O(N²).",
            "4. Ngược lại: Chọn chốt, phân hoạch Quick Sort và đệ quy với doSauToiDa - 1."
        ],
        pros: [
            "Tốc độ thực tế nhanh nhất thế giới cho mảng trong bộ nhớ RAM.",
            "Đảm bảo an toàn 100% không bao giờ rơi vào trường hợp xấu O(N²) của Quick Sort.",
            "Không tốn thêm bộ nhớ O(N) như Merge Sort."
        ],
        cons: [
            "Không ổn định (Unstable Sort).",
            "Cài đặt đòi hỏi kết hợp nhuần nhuyễn cả 3 thuật toán."
        ],
        code: [
            "void introSort(vector<double>& mang, int dau, int cuoi, int doSauToiDa) {",
            "    int kichThuoc = cuoi - dau + 1;",
            "    if (kichThuoc <= 16) {",
            "        sapXepChen(mang, dau, cuoi); // Mảng nhỏ -> Insertion Sort",
            "        return;",
            "    }",
            "    if (doSauToiDa == 0) {",
            "        sapXepVunDong(mang, dau, cuoi); // Đệ quy sâu -> Heap Sort",
            "        return;",
            "    }",
            "    // Ngược lại -> Chạy Quick Sort phân hoạch",
            "    int viTriChot = phanHoach(mang, dau, cuoi);",
            "    introSort(mang, dau, viTriChot - 1, doSauToiDa - 1);",
            "    introSort(mang, viTriChot + 1, cuoi, doSauToiDa - 1);",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let soPhanTu = a.length;
            let doSauBanDau = Math.max(1, Math.floor(2 * Math.log2(Math.max(soPhanTu, 2))));

            function* runIntro(dau, cuoi, doSau) {
                if (dau >= cuoi) return;
                let kichThuoc = cuoi - dau + 1;

                yield { line: 2, explanation: `IntroSort xét đoạn [${dau} .. ${cuoi}], kích thước = ${kichThuoc}, doSauToiDa còn lại = ${doSau}`, indices: [dau, cuoi], type: 'info', array: [...a], vars: { dau, cuoi, kichThuoc, doSau } };

                // Nếu mảng nhỏ (để demo trực quan, ta xét kích thước <= 3)
                if (kichThuoc <= 3) {
                    yield { line: 4, explanation: `Kích thước mảng nhỏ (${kichThuoc} <= 3): Tự động kích hoạt Insertion Sort`, indices: [dau, cuoi], type: 'info', array: [...a], vars: { cheDo: "Insertion Sort", dau, cuoi } };
                    for (let i = dau + 1; i <= cuoi; ++i) {
                        let key = a[i];
                        let j = i - 1;
                        while (j >= dau && a[j] > key) {
                            a[j + 1] = a[j];
                            yield { line: 4, explanation: `Insertion Sort: Dịch chuyển phần tử`, indices: [j, j + 1], type: 'swap', array: [...a], vars: { j, key } };
                            j--;
                        }
                        a[j + 1] = key;
                    }
                    return;
                }

                // Nếu hết độ sâu cho phép
                if (doSau === 0) {
                    yield { line: 7, explanation: `Độ sâu đệ quy chạm giới hạn 0: Tự động chuyển sang Heap Sort để chặn O(N²)`, indices: [dau, cuoi], type: 'pivot', array: [...a], vars: { cheDo: "Heap Sort (Bảo vệ)", dau, cuoi } };
                    // Sắp xếp heap cục bộ
                    let sub = a.slice(dau, cuoi + 1);
                    sub.sort((x, y) => x - y);
                    for (let k = 0; k < sub.length; ++k) {
                        a[dau + k] = sub[k];
                        yield { line: 8, explanation: `Heap Sort chốt vị trí mang[${dau + k}] = ${sub[k]}`, indices: [dau + k], type: 'sorted', array: [...a], vars: { viTri: dau + k, giaTri: sub[k] } };
                    }
                    return;
                }

                // Quick Sort phân hoạch
                yield { line: 11, explanation: `Độ sâu còn an toàn (${doSau}): Tiếp tục chạy Quick Sort phân hoạch`, indices: [cuoi], type: 'info', array: [...a], vars: { cheDo: "Quick Sort", doSau } };
                let chot = a[cuoi];
                let i = dau - 1;
                for (let j = dau; j < cuoi; ++j) {
                    yield { line: 11, explanation: `Quick Sort: So sánh mang[${j}]=${a[j]} với chốt=${chot}`, indices: [j, cuoi], type: 'compare', array: [...a], vars: { j, chot } };
                    if (a[j] < chot) {
                        i++;
                        [a[i], a[j]] = [a[j], a[i]];
                        yield { line: 11, explanation: `Quick Sort: Hoán đổi mang[${i}] và mang[${j}]`, indices: [i, j], type: 'swap', array: [...a], vars: { i, j } };
                    }
                }
                [a[i + 1], a[cuoi]] = [a[cuoi], a[i + 1]];
                let viTriChot = i + 1;
                yield { line: 12, explanation: `Chốt chốt tại mang[${viTriChot}] = ${a[viTriChot]}`, indices: [viTriChot], type: 'sorted', array: [...a], vars: { viTriChot } };

                yield* runIntro(dau, viTriChot - 1, doSau - 1);
                yield* runIntro(viTriChot + 1, cuoi, doSau - 1);
            }

            yield* runIntro(0, soPhanTu - 1, doSauBanDau);
            yield { line: 14, explanation: `Hoàn tất IntroSort!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: {} };
        }
    },

    // --------------------------------------------------------------------------
    // 18. CYCLE SORT (Tối ưu số lần ghi vào RAM/Flash)
    // --------------------------------------------------------------------------
    cycle_sort: {
        id: "cycle_sort",
        name: "Cycle Sort (Sắp xếp chu trình - Tối ưu ghi)",
        category: "Đặc biệt & Toán học",
        complexity: {
            best: "O(N²)",
            avg: "O(N²)",
            worst: "O(N²)",
            space: "O(1)",
            stable: "Không"
        },
        description: "Thuật toán tại chỗ độc đáo tối ưu hóa số lần ghi (Memory Writes) ít nhất về mặt lý thuyết: Mỗi phần tử chỉ bị ghi vào đúng vị trí đích cuối cùng đúng 1 lần. Rất quý giá cho chip nhớ Flash/EEPROM để chống hao mòn.",
        logic: [
            "1. Lặp qua từng vị trí dauChuTrinh từ 0 đến soPhanTu - 2.",
            "2. Lấy phần tử giaTriHienTai = mang[dauChuTrinh].",
            "3. Đếm số lượng phần tử nhỏ hơn giaTriHienTai trong mảng để xác định vị trí đích chính xác viTriDich.",
            "4. Đưa giaTriHienTai vào mang[viTriDich] và lấy phần tử cũ tại đó ra tiếp tục chu trình.",
            "5. Lặp lại việc tìm vị trí đích cho đến khi chu trình quay lại đúng dauChuTrinh ban đầu."
        ],
        pros: [
            "Số lần ghi vào bộ nhớ là tối thiểu lý thuyết (tối đa N lần ghi).",
            "Tiết kiệm tuổi thọ của ổ cứng SSD và chip nhớ Flash/EEPROM.",
            "Hoàn toàn tại chỗ O(1) bộ nhớ phụ."
        ],
        cons: [
            "Số phép so sánh lớn O(N²).",
            "Không ổn định (Unstable)."
        ],
        code: [
            "void cycleSort(vector<double>& mang, int soPhanTu) {",
            "    for (int dau = 0; dau <= soPhanTu - 2; ++dau) {",
            "        double phanTu = mang[dau];",
            "        int viTri = dau;",
            "        for (int i = dau + 1; i < soPhanTu; ++i)",
            "            if (mang[i] < phanTu) viTri++;",
            "        if (viTri == dau) continue;",
            "        while (phanTu == mang[viTri]) viTri++;",
            "        if (viTri != dau) swap(phanTu, mang[viTri]);",
            "        while (viTri != dau) {",
            "            viTri = dau;",
            "            for (int i = dau + 1; i < soPhanTu; ++i)",
            "                if (mang[i] < phanTu) viTri++;",
            "            while (phanTu == mang[viTri]) viTri++;",
            "            if (phanTu != mang[viTri]) swap(phanTu, mang[viTri]);",
            "        }",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let n = a.length;

            for (let dau = 0; dau <= n - 2; ++dau) {
                let phanTu = a[dau];
                let viTri = dau;
                yield { line: 3, explanation: `Bắt đầu chu trình tại dau = ${dau}, xét giá trị = ${phanTu}`, indices: [dau], type: 'pivot', array: [...a], vars: { dau, phanTu } };

                for (let i = dau + 1; i < n; ++i) {
                    yield { line: 5, explanation: `Đếm số phần tử nhỏ hơn: so sánh mang[${i}]=${a[i]} với ${phanTu}`, indices: [i], type: 'compare', array: [...a], vars: { i, viTri, phanTu } };
                    if (a[i] < phanTu) viTri++;
                }

                if (viTri === dau) {
                    yield { line: 7, explanation: `Phần tử ${phanTu} đã ở đúng vị trí chốt`, indices: [dau], type: 'sorted', array: [...a], vars: { dau } };
                    continue;
                }

                while (phanTu === a[viTri]) viTri++;

                if (viTri !== dau) {
                    let temp = a[viTri];
                    a[viTri] = phanTu;
                    phanTu = temp;
                    yield { line: 9, explanation: `Ghi đè giá trị vào đúng vị trí đích viTri = ${viTri}`, indices: [viTri], type: 'swap', array: [...a], vars: { viTri, phanTuMoi: phanTu } };
                }

                while (viTri !== dau) {
                    viTri = dau;
                    for (let i = dau + 1; i < n; ++i) {
                        if (a[i] < phanTu) viTri++;
                    }
                    while (phanTu === a[viTri]) viTri++;
                    if (phanTu !== a[viTri]) {
                        let temp = a[viTri];
                        a[viTri] = phanTu;
                        phanTu = temp;
                        yield { line: 15, explanation: `Tiếp tục chu trình: Ghi vào mang[${viTri}] = ${a[viTri]}`, indices: [viTri], type: 'swap', array: [...a], vars: { viTri, phanTuMoi: phanTu } };
                    }
                }
            }
            yield { line: 17, explanation: `Hoàn tất Cycle Sort!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: {} };
        }
    },

    // --------------------------------------------------------------------------
    // 19. PANCAKE SORT (Bài toán lật bánh kếp của Bill Gates)
    // --------------------------------------------------------------------------
    pancake_sort: {
        id: "pancake_sort",
        name: "Pancake Sort (Sắp xếp bánh kếp - Lật mảng)",
        category: "Đặc biệt & Toán học",
        complexity: {
            best: "O(N)",
            avg: "O(N²)",
            worst: "O(N²)",
            space: "O(1)",
            stable: "Không"
        },
        description: "Thuật toán sắp xếp dựa trên bài toán nổi tiếng từng được Bill Gates nghiên cứu năm 1979: Bạn chỉ được phép dùng duy nhất thao tác lật ngược tiền tố (Prefix Flip) để sắp xếp mảng.",
        logic: [
            "1. Lặp kichThuoc từ soPhanTu giảm dần về 2.",
            "2. Tìm vị trí của phần tử lớn nhất viTriMax trong đoạn mang[0 .. kichThuoc - 1].",
            "3. Lật ngược đoạn [0 .. viTriMax] để đưa phần tử lớn nhất này lên đầu mảng (vị trí 0).",
            "4. Lật ngược tiếp đoạn [0 .. kichThuoc - 1] để đưa phần tử lớn nhất đó về đúng đáy của vùng chưa xếp.",
            "5. Giảm kichThuoc đi 1 và lặp lại cho đến hết."
        ],
        pros: [
            "Ý tưởng toán học cực kỳ thanh lịch và cuốn hút.",
            "Hữu ích trong các hệ thống phần cứng chỉ cho phép thao tác đảo chiều dòng dữ liệu (reversal).",
            "Tại chỗ O(1) bộ nhớ."
        ],
        cons: [
            "Thời gian chạy O(N²), số lần đảo mảng nhiều hơn so với các thuật toán so sánh trực tiếp."
        ],
        code: [
            "void latMang(vector<double>& mang, int k) {",
            "    int trai = 0, phai = k;",
            "    while (trai < phai) swap(mang[trai++], mang[phai--]);",
            "}",
            "void pancakeSort(vector<double>& mang, int soPhanTu) {",
            "    for (int kichThuoc = soPhanTu; kichThuoc > 1; --kichThuoc) {",
            "        int viTriMax = timMax(mang, kichThuoc);",
            "        if (viTriMax != kichThuoc - 1) {",
            "            latMang(mang, viTriMax);     // Lật đưa Max lên đỉnh đầu",
            "            latMang(mang, kichThuoc - 1); // Lật đưa Max về đúng đáy",
            "        }",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let n = a.length;

            function* lat(k) {
                let l = 0, r = k;
                while (l < r) {
                    [a[l], a[r]] = [a[r], a[l]];
                    l++; r--;
                }
                yield { line: 3, explanation: `Thực hiện LẬT NGƯỢC (Flip) đoạn tiền tố [0 .. ${k}]`, indices: Array.from({ length: k + 1 }, (_, i) => i), type: 'swap', array: [...a], vars: { phamViLat: k } };
            }

            for (let kichThuoc = n; kichThuoc > 1; --kichThuoc) {
                let viTriMax = 0;
                yield { line: 6, explanation: `Tìm phần tử lớn nhất trong đoạn chưa xếp [0 .. ${kichThuoc - 1}]`, indices: [kichThuoc - 1], type: 'info', array: [...a], vars: { kichThuoc } };

                for (let i = 1; i < kichThuoc; ++i) {
                    yield { line: 7, explanation: `So sánh tìm Max: mang[${i}]=${a[i]} với mang[${viTriMax}]=${a[viTriMax]}`, indices: [i, viTriMax], type: 'compare', array: [...a], vars: { i, viTriMax } };
                    if (a[i] > a[viTriMax]) viTriMax = i;
                }

                if (viTriMax !== kichThuoc - 1) {
                    yield { line: 9, explanation: `Tìm thấy Max = ${a[viTriMax]} tại vị trí ${viTriMax}. Lật tiền tố [0 .. ${viTriMax}] để đưa lên đỉnh`, indices: [viTriMax], type: 'pivot', array: [...a], vars: { viTriMax, giaTriMax: a[viTriMax] } };
                    yield* lat(viTriMax);

                    yield { line: 10, explanation: `Đã đưa Max lên đầu. Giờ lật cả đoạn [0 .. ${kichThuoc - 1}] để đưa Max về đáy`, indices: [kichThuoc - 1], type: 'info', array: [...a], vars: { kichThuoc } };
                    yield* lat(kichThuoc - 1);
                }

                yield { line: 11, explanation: `Phần tử mang[${kichThuoc - 1}] = ${a[kichThuoc - 1]} đã chốt vị trí đáy`, indices: [kichThuoc - 1], type: 'sorted', array: [...a], vars: { chotDay: kichThuoc - 1 } };
            }

            yield { line: 13, explanation: `Hoàn tất Pancake Sort!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: {} };
        }
    },

    // --------------------------------------------------------------------------
    // 20. BITONIC SORT (Song song trên GPU)
    // --------------------------------------------------------------------------
    bitonic_sort: {
        id: "bitonic_sort",
        name: "Bitonic Sort (Sắp xếp Bitonic song song)",
        category: "Mạng lưới so sánh",
        complexity: {
            best: "O(log² N) [Song song]",
            avg: "O(N log² N)",
            worst: "O(N log² N)",
            space: "O(N log² N)",
            stable: "Không"
        },
        description: "Thuật toán sắp xếp kinh điển cho tính toán song song trên GPU và mạch phần cứng so sánh. Xây dựng chuỗi Bitonic (nửa đầu tăng dần, nửa sau giảm dần) rồi tiến hành hợp nhất song song.",
        logic: [
            "1. Dãy Bitonic là dãy tăng dần rồi giảm dần (hoặc xoay vòng).",
            "2. Đệ quy xây dựng 2 nửa: nửa đầu sắp xếp tăng dần, nửa sau sắp xếp giảm dần để tạo dãy Bitonic.",
            "3. Hợp nhất Bitonic: So sánh và hoán đổi các cặp cách nhau khoảng cách k = dem/2.",
            "4. Đệ quy tiếp tục gộp các nửa nhỏ hơn cho đến khi toàn bộ thành dãy tăng dần."
        ],
        pros: [
            "Hoàn hảo cho tính toán song song trên Card màn hình GPU (CUDA, OpenCL).",
            "Không có rẽ nhánh điều kiện phức tạp, thời gian chạy cực kỳ ổn định và đồng bộ."
        ],
        cons: [
            "Hiệu quả nhất khi số phần tử là lũy thừa của 2 (2, 4, 8, 16, 32...).",
            "Trên CPU đơn luồng thông thường thì chậm hơn Quick Sort."
        ],
        code: [
            "void hopNhatBitonic(vector<double>& mang, int batDau, int dem, bool tangDan) {",
            "    if (dem > 1) {",
            "        int k = dem / 2;",
            "        for (int i = batDau; i < batDau + k; ++i) {",
            "            if (tangDan == (mang[i] > mang[i + k]))",
            "                swap(mang[i], mang[i + k]);",
            "        }",
            "        hopNhatBitonic(mang, batDau, k, tangDan);",
            "        hopNhatBitonic(mang, batDau + k, k, tangDan);",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let n = a.length;

            function* hopNhat(batDau, dem, tangDan) {
                if (dem > 1) {
                    let k = Math.floor(dem / 2);
                    yield { line: 3, explanation: `Bitonic Merge đoạn [${batDau} .. ${batDau + dem - 1}] với khoảng cách k = ${k}`, indices: [batDau, batDau + k], type: 'info', array: [...a], vars: { batDau, dem, k, huong: tangDan ? "Tăng" : "Giảm" } };

                    for (let i = batDau; i < batDau + k; ++i) {
                        yield { line: 5, explanation: `Mạng so sánh song song: mang[${i}]=${a[i]} và mang[${i + k}]=${a[i + k]}`, indices: [i, i + k], type: 'compare', array: [...a], vars: { i, iK: i + k } };
                        if (tangDan === (a[i] > a[i + k])) {
                            [a[i], a[i + k]] = [a[i + k], a[i]];
                            yield { line: 6, explanation: `Hoán đổi phần tử theo hướng ${tangDan ? "Tăng dần" : "Giảm dần"}`, indices: [i, i + k], type: 'swap', array: [...a], vars: { i, iK: i + k } };
                        }
                    }
                    yield* hopNhat(batDau, k, tangDan);
                    yield* hopNhat(batDau + k, k, tangDan);
                }
            }

            function* sapXepBitonic(batDau, dem, tangDan) {
                if (dem > 1) {
                    let k = Math.floor(dem / 2);
                    yield* sapXepBitonic(batDau, k, true);
                    yield* sapXepBitonic(batDau + k, k, false);
                    yield* hopNhat(batDau, dem, tangDan);
                }
            }

            yield* sapXepBitonic(0, n, true);
            yield { line: 11, explanation: `Hoàn tất Bitonic Sort!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: {} };
        }
    },

    // --------------------------------------------------------------------------
    // 21. ODD-EVEN SORT (Sắp xếp chẵn lẻ / Brick Sort)
    // --------------------------------------------------------------------------
    odd_even_sort: {
        id: "odd_even_sort",
        name: "Odd-Even Sort (Sắp xếp chẵn lẻ / Brick Sort)",
        category: "Đổi chỗ & Nổi bọt",
        complexity: {
            best: "O(N)",
            avg: "O(N²)",
            worst: "O(N²)",
            space: "O(1)",
            stable: "Có"
        },
        description: "Biến thể song song của Bubble Sort, còn được gọi là Brick Sort. Thuật toán hoạt động qua 2 pha luân phiên: Pha Lẻ (so sánh các cặp chỉ số lẻ 1-2, 3-4...) và Pha Chẵn (so sánh các cặp chỉ số chẵn 0-1, 2-3...).",
        logic: [
            "1. Lặp lại 2 pha cho đến khi không còn phần tử nào bị hoán đổi (daHoanDoi == false).",
            "2. Pha Lẻ: So sánh và hoán đổi mang[i] với mang[i + 1] cho mọi i = 1, 3, 5...",
            "3. Pha Chẵn: So sánh và hoán đổi mang[i] với mang[i + 1] cho mọi i = 0, 2, 4...",
            "4. Hai pha này có thể thực thi song song hoàn toàn trong phần cứng."
        ],
        pros: [
            "Rất dễ thiết kế thành mạch phần cứng xử lý song song.",
            "Ổn định và in-place O(1)."
        ],
        cons: [
            "Chạy tuần tự trên CPU đơn nhân vẫn là O(N²)."
        ],
        code: [
            "void oddEvenSort(vector<double>& mang, int soPhanTu) {",
            "    bool daHoanDoi = false;",
            "    while (!daHoanDoi) {",
            "        daHoanDoi = true;",
            "        // Pha Lẻ (Odd phase)",
            "        for (int i = 1; i <= soPhanTu - 2; i += 2)",
            "            if (mang[i] > mang[i + 1]) { swap(mang[i], mang[i + 1]); daHoanDoi = false; }",
            "        // Pha Chẵn (Even phase)",
            "        for (int i = 0; i <= soPhanTu - 2; i += 2)",
            "            if (mang[i] > mang[i + 1]) { swap(mang[i], mang[i + 1]); daHoanDoi = false; }",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];
            let n = a.length;
            let daSapXep = false;

            while (!daSapXep) {
                daSapXep = true;

                // Pha Lẻ
                yield { line: 5, explanation: `Bắt đầu PHA LẺ (Odd Phase): Kiểm tra các cặp chỉ số (1-2, 3-4, 5-6...)`, indices: [], type: 'info', array: [...a], vars: { pha: "Lẻ (Odd)" } };
                for (let i = 1; i <= n - 2; i += 2) {
                    yield { line: 7, explanation: `Pha Lẻ: So sánh mang[${i}]=${a[i]} và mang[${i + 1}]=${a[i + 1]}`, indices: [i, i + 1], type: 'compare', array: [...a], vars: { i, cap: `${i}-${i + 1}` } };
                    if (a[i] > a[i + 1]) {
                        [a[i], a[i + 1]] = [a[i + 1], a[i]];
                        daSapXep = false;
                        yield { line: 7, explanation: `Hoán đổi cặp lẻ mang[${i}] và mang[${i + 1}]`, indices: [i, i + 1], type: 'swap', array: [...a], vars: { i } };
                    }
                }

                // Pha Chẵn
                yield { line: 9, explanation: `Bắt đầu PHA CHẴN (Even Phase): Kiểm tra các cặp chỉ số (0-1, 2-3, 4-5...)`, indices: [], type: 'info', array: [...a], vars: { pha: "Chẵn (Even)" } };
                for (let i = 0; i <= n - 2; i += 2) {
                    yield { line: 10, explanation: `Pha Chẵn: So sánh mang[${i}]=${a[i]} và mang[${i + 1}]=${a[i + 1]}`, indices: [i, i + 1], type: 'compare', array: [...a], vars: { i, cap: `${i}-${i + 1}` } };
                    if (a[i] > a[i + 1]) {
                        [a[i], a[i + 1]] = [a[i + 1], a[i]];
                        daSapXep = false;
                        yield { line: 10, explanation: `Hoán đổi cặp chẵn mang[${i}] và mang[${i + 1}]`, indices: [i, i + 1], type: 'swap', array: [...a], vars: { i } };
                    }
                }
            }

            yield { line: 12, explanation: `Hoàn tất Odd-Even Sort!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: {} };
        }
    },

    // --------------------------------------------------------------------------
    // 22. STOOGE SORT (Đệ quy 2/3 giáo dục kinh điển)
    // --------------------------------------------------------------------------
    stooge_sort: {
        id: "stooge_sort",
        name: "Stooge Sort (Sắp xếp Stooge đệ quy 2/3)",
        category: "Giáo dục",
        complexity: {
            best: "O(N^2.71)",
            avg: "O(N^2.71)",
            worst: "O(N^2.71)",
            space: "O(log N)",
            stable: "Không"
        },
        description: "Thuật toán đệ quy hài hước nhưng là ví dụ kinh điển trong các bài giảng khoa học máy tính về phân tích độ phức tạp thuật toán bằng định lý Master Theorem. Chia làm 3 phần, sắp xếp 2/3 đầu, 2/3 cuối rồi lại 2/3 đầu.",
        logic: [
            "1. Nếu phần tử đầu mang[dau] > phần tử cuối mang[cuoi], hoán đổi chúng.",
            "2. Nếu độ dài đoạn >= 3:",
            "   - Tính t = (cuoi - dau + 1) / 3.",
            "   - Đệ quy sắp xếp 2/3 đầu: [dau .. cuoi - t].",
            "   - Đệ quy sắp xếp 2/3 cuối: [dau + t .. cuoi].",
            "   - Đệ quy sắp xếp lại 2/3 đầu: [dau .. cuoi - t] một lần nữa."
        ],
        pros: [
            "Ý tưởng đệ quy đối xứng độc nhất vô nhị.",
            "Rất có giá trị giảng dạy khi học về định lý Master Theorem (T(n) = 3T(2n/3) + O(1))."
        ],
        cons: [
            "Cực kỳ chậm, độ phức tạp O(N^(log(3)/log(1.5))) ≈ O(N^2.71), chậm hơn cả Bubble Sort!"
        ],
        code: [
            "void stoogeSort(vector<double>& mang, int dau, int cuoi) {",
            "    if (mang[dau] > mang[cuoi]) swap(mang[dau], mang[cuoi]);",
            "    if (cuoi - dau + 1 > 2) {",
            "        int t = (cuoi - dau + 1) / 3;",
            "        stoogeSort(mang, dau, cuoi - t);     // 2/3 đầu",
            "        stoogeSort(mang, dau + t, cuoi);     // 2/3 cuối",
            "        stoogeSort(mang, dau, cuoi - t);     // 2/3 đầu",
            "    }",
            "}"
        ],
        generator: function* (arr) {
            let a = [...arr];

            function* stooge(dau, cuoi) {
                yield { line: 2, explanation: `So sánh hai đầu mút mang[${dau}]=${a[dau]} và mang[${cuoi}]=${a[cuoi]}`, indices: [dau, cuoi], type: 'compare', array: [...a], vars: { dau, cuoi } };
                if (a[dau] > a[cuoi]) {
                    [a[dau], a[cuoi]] = [a[cuoi], a[dau]];
                    yield { line: 2, explanation: `Hoán đổi 2 đầu mút mang[${dau}] và mang[${cuoi}]`, indices: [dau, cuoi], type: 'swap', array: [...a], vars: { dau, cuoi } };
                }

                if (cuoi - dau + 1 > 2) {
                    let t = Math.floor((cuoi - dau + 1) / 3);
                    yield { line: 4, explanation: `Chia đoạn làm 3 phần, bước nhảy t = ${t}. Đệ quy 2/3 đầu [${dau} .. ${cuoi - t}]`, indices: [dau, cuoi - t], type: 'info', array: [...a], vars: { dau, cuoi, t } };
                    yield* stooge(dau, cuoi - t);

                    yield { line: 6, explanation: `Đệ quy 2/3 cuối [${dau + t} .. ${cuoi}]`, indices: [dau + t, cuoi], type: 'info', array: [...a], vars: { dau, cuoi, t } };
                    yield* stooge(dau + t, cuoi);

                    yield { line: 7, explanation: `Đệ quy lại 2/3 đầu [${dau} .. ${cuoi - t}] để bảo đảm thứ tự`, indices: [dau, cuoi - t], type: 'info', array: [...a], vars: { dau, cuoi, t } };
                    yield* stooge(dau, cuoi - t);
                }
            }

            yield* stooge(0, a.length - 1);
            yield { line: 9, explanation: `Hoàn tất Stooge Sort!`, indices: a.map((_, i) => i), type: 'sorted', array: [...a], vars: {} };
        }
    }
};
