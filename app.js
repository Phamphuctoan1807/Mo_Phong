// ==============================================================================
// SORTING ALGORITHMS STUDIO - MAIN CONTROLLER (app.js)
// Quản lý mô phỏng chính, đồng bộ mã nguồn C++, và mini-visualizers tương tác
// ==============================================================================

document.addEventListener("DOMContentLoaded", () => {
    // --------------------------------------------------------------------------
    // DOM REFERENCES
    // --------------------------------------------------------------------------
    const tabButtons = document.querySelectorAll(".nav-tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    const arrayInput = document.getElementById("arrayInput");
    const algoSelect = document.getElementById("algoSelect");
    const presetButtons = document.querySelectorAll(".preset-btn");

    const btnPlayPause = document.getElementById("btnPlayPause");
    const playIcon = document.getElementById("playIcon");
    const playText = document.getElementById("playText");
    const btnStep = document.getElementById("btnStep");
    const btnReset = document.getElementById("btnReset");
    const speedSlider = document.getElementById("speedSlider");

    const statComparisons = document.getElementById("statComparisons");
    const statSwaps = document.getElementById("statSwaps");
    const statSteps = document.getElementById("statSteps");
    const statElements = document.getElementById("statElements");

    const barsContainer = document.getElementById("barsContainer");
    const codeEditorBox = document.getElementById("codeEditorBox");
    const codePanelTitle = document.getElementById("codePanelTitle");
    const explanationText = document.getElementById("explanationText");
    const varWatcher = document.getElementById("varWatcher");

    const algoCardsGrid = document.getElementById("algoCardsGrid");
    const categoryFilters = document.getElementById("categoryFilters");

    const btnOpenDeployModal = document.getElementById("btnOpenDeployModal");
    const btnCloseModal = document.getElementById("btnCloseModal");
    const deployModal = document.getElementById("deployModal");

    // Robot Scanner Machine DOM
    const canvasWrapper = document.getElementById("canvasWrapper");
    const scannerMachine = document.getElementById("scannerMachine");
    const machineHud = document.getElementById("machineHud");
    const machineIcon = document.getElementById("machineIcon");
    const machineMsg = document.getElementById("machineMsg");
    const machineArmLeft = document.getElementById("machineArmLeft");
    const machineArmRight = document.getElementById("machineArmRight");
    const machineBeam = document.getElementById("machineBeam");

    // Big Data Lab DOM
    const bigDataModal = document.getElementById("bigDataModal");
    const bigDataHeading = document.getElementById("bigDataHeading");
    const bigDataAlgoSelect = document.getElementById("bigDataAlgoSelect");
    const btnBigDataPlay = document.getElementById("btnBigDataPlay");
    const bigPlayIcon = document.getElementById("bigPlayIcon");
    const bigPlayText = document.getElementById("bigPlayText");
    const btnBigDataReset = document.getElementById("btnBigDataReset");
    const bigDataBatchSelect = document.getElementById("bigDataBatchSelect");
    const btnBigDataClose = document.getElementById("btnBigDataClose");
    const bigDataCanvas = document.getElementById("bigDataCanvas");
    const bigDataWarning = document.getElementById("bigDataWarning");
    const bigDataCountEl = document.getElementById("bigDataCount");
    const bigDataComparisonsEl = document.getElementById("bigDataComparisons");
    const bigDataSwapsEl = document.getElementById("bigDataSwaps");
    const bigDataStatusEl = document.getElementById("bigDataStatus");
    const floatingCodeTitle = document.getElementById("floatingCodeTitle");
    const floatingCodeContent = document.getElementById("floatingCodeContent");

    // --------------------------------------------------------------------------
    // APPLICATION STATE
    // --------------------------------------------------------------------------
    let currentAlgoId = algoSelect.value || "quick_sort";
    let initialArray = [];
    let currentArray = [];
    let generatorInstance = null;
    let isPlaying = false;
    let timerId = null;

    let comparisonsCount = 0;
    let swapsCount = 0;
    let stepsCount = 0;

    // Big Data Lab State
    let bigDataCount = 1000;
    let bigDataArray = [];
    let bigDataGen = null;
    let bigDataIsPlaying = false;
    let bigDataAnimationId = null;
    let bigDataComparisons = 0;
    let bigDataSwaps = 0;
    let bigDataSteps = 0;

    // --------------------------------------------------------------------------
    // TAB 3: SO SÁNH THUẬT TOÁN (DOM REFERENCES & STATE)
    // --------------------------------------------------------------------------
    const compareArrayInput = document.getElementById("compareArrayInput");
    const comparePresetButtons = document.querySelectorAll(".compare-preset-btn");
    const btnComparePlay = document.getElementById("btnComparePlay");
    const comparePlayIcon = document.getElementById("comparePlayIcon");
    const comparePlayText = document.getElementById("comparePlayText");
    const btnCompareStep = document.getElementById("btnCompareStep");
    const btnCompareReset = document.getElementById("btnCompareReset");
    const compareSpeedSlider = document.getElementById("compareSpeedSlider");
    const compareBatchSelect = document.getElementById("compareBatchSelect");

    const compareAlgoA = document.getElementById("compareAlgoA");
    const fighterStatusA = document.getElementById("fighterStatusA");
    const fighterCompA = document.getElementById("fighterCompA");
    const fighterSwapA = document.getElementById("fighterSwapA");
    const fighterStepA = document.getElementById("fighterStepA");
    const fighterTimeA = document.getElementById("fighterTimeA");
    const compareBarsA = document.getElementById("compareBarsA");
    const fighterExplainA = document.getElementById("fighterExplainA");

    const compareAlgoB = document.getElementById("compareAlgoB");
    const fighterStatusB = document.getElementById("fighterStatusB");
    const fighterCompB = document.getElementById("fighterCompB");
    const fighterSwapB = document.getElementById("fighterSwapB");
    const fighterStepB = document.getElementById("fighterStepB");
    const fighterTimeB = document.getElementById("fighterTimeB");
    const compareBarsB = document.getElementById("compareBarsB");
    const fighterExplainB = document.getElementById("fighterExplainB");

    const compareSummarySection = document.getElementById("compareSummarySection");
    const winnerAnnouncement = document.getElementById("winnerAnnouncement");
    const thAlgoA = document.getElementById("thAlgoA");
    const thAlgoB = document.getElementById("thAlgoB");
    const compareSummaryTableBody = document.getElementById("compareSummaryTableBody");
    const conclusionBody = document.getElementById("conclusionBody");

    // Comparison State
    let initialCompareArray = [];
    let compareArrayA = [];
    let compareArrayB = [];
    let genA = null;
    let genB = null;
    let isComparePlaying = false;
    let compareTimerId = null;
    let doneA = false;
    let doneB = false;
    let failedA = false;
    let failedB = false;
    let compCountA = 0, swapCountA = 0, stepCountA = 0, timeCountA = 0;
    let compCountB = 0, swapCountB = 0, stepCountB = 0, timeCountB = 0;
    let compareStartTime = 0;
    let hasAnnouncedWinner = false;

    // --------------------------------------------------------------------------
    // 1. INPUT PARSER (Hỗ trợ số âm, số thực, không giới hạn phần tử)
    // --------------------------------------------------------------------------
    function parseInputArray() {
        const raw = arrayInput.value.trim();
        if (!raw) {
            return [10, -5, 25, 0, 8.5, -14, 30];
        }
        // Phân tách bởi dấu phẩy, khoảng trắng, chấm phẩy hoặc tab/newline
        const tokens = raw.split(/[\s,;]+/);
        const parsed = [];
        for (const token of tokens) {
            if (token === "") continue;
            const num = parseFloat(token);
            if (!isNaN(num)) {
                // Giới hạn hiển thị 2 chữ số thập phân nếu là số thực
                parsed.push(Number.isInteger(num) ? num : parseFloat(num.toFixed(2)));
            }
        }
        return parsed.length > 0 ? parsed : [5, -2, 8, 1.5, -4];
    }

    // --------------------------------------------------------------------------
    // 2. CANVAS RENDERING WITH ZERO-AXIS BASELINE (Trục số âm & số dương)
    // --------------------------------------------------------------------------
    function renderBars(arr, activeIndices = [], type = "default") {
        barsContainer.innerHTML = "";
        if (!arr || arr.length === 0) return;

        const minVal = Math.min(...arr);
        const maxVal = Math.max(...arr);
        const hasNegative = minVal < 0;
        const hasPositive = maxVal > 0;

        // Tính vị trí trục số 0
        let zeroPercent = 0; // % tính từ đáy lên
        let range = 1;

        if (hasNegative && hasPositive) {
            range = maxVal - minVal;
            zeroPercent = (Math.abs(minVal) / range) * 100;
        } else if (hasNegative && !hasPositive) {
            // Toàn bộ là số âm hoặc 0
            range = Math.abs(minVal) || 1;
            zeroPercent = 100; // Trục 0 ở đỉnh, các thanh cắm xuống
        } else {
            // Toàn bộ là số dương hoặc 0
            range = maxVal || 1;
            zeroPercent = 0; // Trục 0 ở đáy, các thanh mọc lên
        }

        // Tạo đường kẻ trục 0
        const zeroAxis = document.createElement("div");
        zeroAxis.className = "zero-axis-line";
        zeroAxis.style.bottom = `${zeroPercent}%`;
        const zeroLabel = document.createElement("span");
        zeroLabel.className = "zero-axis-label";
        zeroLabel.textContent = "0.0";
        zeroAxis.appendChild(zeroLabel);
        barsContainer.appendChild(zeroAxis);

        // Sinh các cột bar
        const totalElements = arr.length;
        const hideLabels = totalElements > 35; // Ẩn bớt số trên cột nếu mảng quá dài để tránh vỡ giao diện

        arr.forEach((val, idx) => {
            const col = document.createElement("div");
            col.className = "bar-col";
            col.dataset.index = idx;

            // Đánh dấu trạng thái tương tác
            if (activeIndices.includes(idx) || type === "error") {
                if (type === "compare") col.classList.add("comparing");
                else if (type === "swap") col.classList.add("swapping");
                else if (type === "pivot") col.classList.add("pivot");
                else if (type === "sorted") col.classList.add("sorted");
                else if (type === "error") col.classList.add("error");
            }

            const barBody = document.createElement("div");
            barBody.className = "bar-body";

            let barHeightPercent = 0;
            if (hasNegative && hasPositive) {
                barHeightPercent = Math.max(2, (Math.abs(val) / range) * 90);
                if (val >= 0) {
                    barBody.classList.add("bar-positive");
                    barBody.style.bottom = `${zeroPercent}%`;
                    barBody.style.height = `${barHeightPercent}%`;
                } else {
                    barBody.classList.add("bar-negative");
                    barBody.style.top = `${100 - zeroPercent}%`;
                    barBody.style.height = `${barHeightPercent}%`;
                }
            } else if (hasNegative) {
                barHeightPercent = Math.max(2, (Math.abs(val) / range) * 90);
                barBody.classList.add("bar-negative");
                barBody.style.top = `0%`;
                barBody.style.height = `${barHeightPercent}%`;
            } else {
                barHeightPercent = Math.max(2, (val / range) * 90);
                barBody.classList.add("bar-positive");
                barBody.style.bottom = `0%`;
                barBody.style.height = `${barHeightPercent}%`;
            }

            col.appendChild(barBody);

            // Nhãn hiển thị giá trị số
            if (!hideLabels) {
                const label = document.createElement("span");
                label.className = "bar-val-label";
                label.textContent = val;

                if (val >= 0) {
                    label.style.bottom = `calc(${zeroPercent}% + ${barHeightPercent}% + 4px)`;
                } else {
                    label.style.top = `calc(${100 - zeroPercent}% + ${barHeightPercent}% + 4px)`;
                }
                col.appendChild(label);
            }

            barsContainer.appendChild(col);
        });

        statElements.textContent = totalElements;
    }

    // --------------------------------------------------------------------------
    // 2B. CỖ MÁY ROBOT QUÉT & HOÁN ĐỔI NGANG (ROBOT SCANNER MACHINE)
    // --------------------------------------------------------------------------
    function updateScannerMachine(activeIndices = [], type = "default", arr = []) {
        if (!scannerMachine || !canvasWrapper) return;

        if (type === "sorted") {
            scannerMachine.style.opacity = "1";
            scannerMachine.style.left = "50%";
            scannerMachine.style.transform = "translateX(-50%)";
            scannerMachine.style.width = "320px";
            machineHud.className = "machine-hud status-success";
            machineIcon.textContent = "🏆";
            machineMsg.innerHTML = `<strong>Hoàn tất!</strong> Dãy số đã sắp xếp chính xác`;
            if (machineBeam) {
                machineBeam.style.background = "linear-gradient(90deg, #3fb950, #7ee787)";
                machineBeam.style.boxShadow = "0 0 10px rgba(63, 185, 80, 0.8)";
            }
            if (machineArmLeft) machineArmLeft.style.background = "linear-gradient(180deg, #3fb950, transparent)";
            if (machineArmRight) machineArmRight.style.background = "linear-gradient(180deg, #3fb950, transparent)";
            return;
        }

        if (type === "error") {
            scannerMachine.style.opacity = "1";
            scannerMachine.style.left = "50%";
            scannerMachine.style.transform = "translateX(-50%)";
            scannerMachine.style.width = "380px";
            machineHud.className = "machine-hud status-error";
            machineIcon.textContent = "🛑";
            machineMsg.innerHTML = `<strong>DỪNG (STOP):</strong> Xác suất 1/N! quá nhỏ, thuật toán thất bại!`;
            if (machineBeam) {
                machineBeam.style.background = "linear-gradient(90deg, #f85149, #da3633)";
                machineBeam.style.boxShadow = "0 0 16px rgba(248, 81, 73, 0.9)";
            }
            if (machineArmLeft) machineArmLeft.style.background = "linear-gradient(180deg, #f85149, transparent)";
            if (machineArmRight) machineArmRight.style.background = "linear-gradient(180deg, #f85149, transparent)";
            return;
        }

        if (!activeIndices || activeIndices.length === 0) {
            scannerMachine.style.opacity = "0";
            return;
        }

        const idx1 = activeIndices[0];
        const idx2 = activeIndices.length > 1 ? activeIndices[1] : idx1;
        const col1 = barsContainer.querySelector(`.bar-col[data-index="${idx1}"]`);
        const col2 = barsContainer.querySelector(`.bar-col[data-index="${idx2}"]`);

        if (!col1) {
            scannerMachine.style.opacity = "0";
            return;
        }

        const wrapperRect = canvasWrapper.getBoundingClientRect();
        const rect1 = col1.getBoundingClientRect();
        const rect2 = col2 ? col2.getBoundingClientRect() : rect1;

        const scrollLeft = canvasWrapper.scrollLeft || 0;
        const center1 = rect1.left + rect1.width / 2 - wrapperRect.left + scrollLeft;
        const center2 = rect2.left + rect2.width / 2 - wrapperRect.left + scrollLeft;

        const minCenter = Math.min(center1, center2);
        const maxCenter = Math.max(center1, center2);

        if (minCenter === maxCenter) {
            scannerMachine.style.left = `${minCenter - 14}px`;
            scannerMachine.style.width = `28px`;
        } else {
            scannerMachine.style.left = `${minCenter}px`;
            scannerMachine.style.width = `${Math.max(20, maxCenter - minCenter)}px`;
        }
        scannerMachine.style.transform = "none";
        scannerMachine.style.opacity = "1";

        const minIdx = Math.min(idx1, idx2);
        const maxIdx = Math.max(idx1, idx2);
        const leftVal = arr[minIdx] !== undefined ? arr[minIdx] : "";
        const rightVal = arr[maxIdx] !== undefined ? arr[maxIdx] : "";
        const val1 = arr[idx1] !== undefined ? arr[idx1] : "";
        const val2 = arr[idx2] !== undefined ? arr[idx2] : "";

        if (type === "compare") {
            if (idx1 !== idx2 && leftVal > rightVal) {
                // Sai thứ tự: số đứng trước lại lớn hơn số đứng sau (Ví dụ 7 > 3)
                machineHud.className = "machine-hud status-error";
                machineIcon.textContent = "❌";
                machineMsg.innerHTML = `<span style="color:#ff7b72; font-weight:800;">${leftVal} &gt; ${rightVal}</span> &bull; Sai thứ tự &rarr; Cần đổi chỗ ⚡`;
                if (machineBeam) {
                    machineBeam.style.background = "linear-gradient(90deg, #f85149, #ff7b72)";
                    machineBeam.style.boxShadow = "0 0 14px rgba(248, 81, 73, 0.85)";
                }
                if (machineArmLeft) machineArmLeft.style.background = "linear-gradient(180deg, #f85149, transparent)";
                if (machineArmRight) machineArmRight.style.background = "linear-gradient(180deg, #f85149, transparent)";
            } else {
                // Đúng thứ tự: số đứng trước nhỏ hơn hoặc bằng số đứng sau (Ví dụ 3 <= 7)
                machineHud.className = "machine-hud status-success";
                machineIcon.textContent = "✅";
                machineMsg.innerHTML = `<span style="color:#7ee787; font-weight:800;">${leftVal} &le; ${rightVal}</span> &bull; Đúng vị trí &rarr; Bước tiếp`;
                if (machineBeam) {
                    machineBeam.style.background = "linear-gradient(90deg, #3fb950, #7ee787)";
                    machineBeam.style.boxShadow = "0 0 10px rgba(63, 185, 80, 0.8)";
                }
                if (machineArmLeft) machineArmLeft.style.background = "linear-gradient(180deg, #3fb950, transparent)";
                if (machineArmRight) machineArmRight.style.background = "linear-gradient(180deg, #3fb950, transparent)";
            }
        } else if (type === "swap") {
            machineHud.className = "machine-hud status-swapping";
            machineIcon.textContent = "🔄";
            machineMsg.innerHTML = `<span>Hoán đổi:</span> <strong>${val1}</strong> ⇄ <strong>${val2}</strong>`;
            if (machineBeam) {
                machineBeam.style.background = "linear-gradient(90deg, #e3b341, #f2cc60)";
                machineBeam.style.boxShadow = "0 0 16px rgba(227, 179, 65, 0.9)";
            }
            if (machineArmLeft) machineArmLeft.style.background = "linear-gradient(180deg, #e3b341, transparent)";
            if (machineArmRight) machineArmRight.style.background = "linear-gradient(180deg, #e3b341, transparent)";
        } else if (type === "pivot") {
            machineHud.className = "machine-hud status-pivot";
            machineIcon.textContent = "🎯";
            machineMsg.innerHTML = `<span>Chốt Pivot:</span> <strong>${val1}</strong> [${idx1}]`;
            if (machineBeam) {
                machineBeam.style.background = "linear-gradient(90deg, #a371f7, #d2a8ff)";
                machineBeam.style.boxShadow = "0 0 14px rgba(163, 113, 247, 0.85)";
            }
            if (machineArmLeft) machineArmLeft.style.background = "linear-gradient(180deg, #a371f7, transparent)";
            if (machineArmRight) machineArmRight.style.background = "linear-gradient(180deg, #a371f7, transparent)";
        } else {
            machineHud.className = "machine-hud status-range";
            machineIcon.textContent = "🤖";
            machineMsg.textContent = `Phạm vi [${activeIndices.join(", ")}]`;
            if (machineBeam) {
                machineBeam.style.background = "linear-gradient(90deg, var(--accent-cyan), var(--accent-blue))";
                machineBeam.style.boxShadow = "0 0 10px rgba(57, 197, 207, 0.7)";
            }
            if (machineArmLeft) machineArmLeft.style.background = "linear-gradient(180deg, var(--accent-cyan), transparent)";
            if (machineArmRight) machineArmRight.style.background = "linear-gradient(180deg, var(--accent-cyan), transparent)";
        }
    }

    // --------------------------------------------------------------------------
    // 3. SYNCHRONIZED C++ CODE STEPPER & TRACE
    // --------------------------------------------------------------------------
    function renderCodeSnippet(algoId) {
        const algo = ALGORITHMS[algoId];
        if (!algo || !algo.code) return;

        codePanelTitle.textContent = `MÃ NGUỒN C++: ${algo.name.toUpperCase()}`;
        codeEditorBox.innerHTML = "";

        algo.code.forEach((lineText, idx) => {
            const lineDiv = document.createElement("div");
            lineDiv.className = "code-line";
            lineDiv.id = `codeLine_${idx + 1}`;

            const numSpan = document.createElement("span");
            numSpan.className = "line-num";
            numSpan.textContent = idx + 1;

            const contentSpan = document.createElement("span");
            contentSpan.className = "line-content";
            contentSpan.textContent = lineText;

            lineDiv.appendChild(numSpan);
            lineDiv.appendChild(contentSpan);
            codeEditorBox.appendChild(lineDiv);
        });
    }

    function highlightCodeLine(lineNumber) {
        document.querySelectorAll(".code-line.active").forEach(el => el.classList.remove("active"));
        if (!lineNumber) return;

        const targetLine = document.getElementById(`codeLine_${lineNumber}`);
        if (targetLine) {
            targetLine.classList.add("active");
            // Cuộn tự động để nhìn thấy dòng đang chạy
            targetLine.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }

    // Bảng chuyển đổi nhãn biến sang Tiếng Việt có dấu trực quan
    const VIETNAMESE_VAR_LABELS = {
        dau: "đầu",
        cuoi: "cuối",
        chot: "chốt",
        viTriChot: "vị_trí_chốt",
        trai: "trái",
        phai: "phải",
        giua: "giữa",
        phanTuChon: "phần_tử_chọn",
        lonNhat: "lớn_nhất",
        conTrai: "con_trái",
        conPhai: "con_phải",
        kichThuoc: "kích_thước",
        giaTriChen: "giá_trị_chèn",
        viTriChen: "vị_trí_chèn",
        viTriNhoNhat: "vị_trí_nhỏ_nhất",
        viTriDaChot: "vị_trí_đã_chốt",
        daHoanDoi: "đã_đổi_chỗ",
        khoangCach: "khoảng_cách",
        tamThoi: "tạm_thời",
        viTriDat: "vị_trí_đặt",
        viTri: "vị_trí",
        soLuongThung: "số_thùng",
        thungSo: "thùng_số",
        khoangDem: "khoảng_đếm",
        hangChuSo: "hàng_số",
        doLechAm: "độ_lệch_âm",
        soLuotThu: "lượt_thử",
        coRun: "cỡ_run",
        coRunHienTai: "cỡ_run_hiện_tại",
        dauRun: "đầu_run",
        cuoiRun: "cuối_run",
        doSau: "độ_sâu_còn",
        doSauToiDa: "độ_sâu_tối_đa",
        cheDo: "chế_độ_chạy",
        phanTu: "phần_tử",
        phanTuMoi: "phần_tử_mới",
        phamViLat: "phạm_vi_lật",
        giaTriMax: "giá_trị_max",
        viTriMax: "vị_trí_max",
        chotDay: "chốt_đáy",
        huong: "hướng",
        batDau: "bắt_đầu",
        dem: "số_lượng",
        pha: "pha_chạy",
        cap: "cặp_so_sánh",
        t: "bước_nhảy_t"
    };

    function updateVariableWatcher(varsObj) {
        varWatcher.innerHTML = `<span style="color: var(--text-muted); align-self: center;">Biến theo dõi:</span>`;
        if (!varsObj || Object.keys(varsObj).length === 0) {
            varWatcher.innerHTML += `<div class="var-pill">Đang rảnh</div>`;
            return;
        }
        for (const [key, val] of Object.entries(varsObj)) {
            const pill = document.createElement("div");
            pill.className = "var-pill";
            const viLabel = VIETNAMESE_VAR_LABELS[key] || key;
            const displayVal = typeof val === 'number' ? (Number.isInteger(val) ? val : val.toFixed(2)) : val;
            pill.innerHTML = `<strong>${viLabel}</strong> = ${displayVal}`;
            varWatcher.appendChild(pill);
        }
    }

    // --------------------------------------------------------------------------
    // 4. SIMULATION STEP CONTROLLER
    // --------------------------------------------------------------------------
    function resetSimulation(shouldPause = true) {
        if (shouldPause) {
            pauseSimulation();
        }
        initialArray = parseInputArray();
        currentArray = [...initialArray];
        currentAlgoId = algoSelect.value;

        const algo = ALGORITHMS[currentAlgoId];
        if (algo) {
            generatorInstance = algo.generator(currentArray);
        }

        comparisonsCount = 0;
        swapsCount = 0;
        stepsCount = 0;

        statComparisons.textContent = "0";
        statSwaps.textContent = "0";
        statSteps.textContent = "0";

        explanationText.innerHTML = `Đã chuẩn bị mảng với <strong>${initialArray.length}</strong> phần tử. Nhấn <strong>"Chạy mô phỏng"</strong> hoặc <strong>"Bước tới"</strong>.`;
        updateVariableWatcher({});
        renderBars(currentArray);
        updateScannerMachine([], "default", currentArray);
        renderCodeSnippet(currentAlgoId);
    }

    function stepSimulation() {
        if (!generatorInstance) {
            resetSimulation(false);
        }

        const nextStep = generatorInstance.next();
        if (nextStep.done) {
            pauseSimulation();
            highlightCodeLine(null);
            explanationText.innerHTML = `🎉 <strong>Hoàn thành!</strong> Dãy số đã được sắp xếp tăng dần chính xác.`;
            renderBars(currentArray, currentArray.map((_, i) => i), "sorted");
            updateScannerMachine([], "sorted", currentArray);
            generatorInstance = null; // Đánh dấu đã xong để lượt chạy tiếp theo tự reset mới
            return false;
        }

        const step = nextStep.value;
        stepsCount++;
        statSteps.textContent = stepsCount;

        if (step.type === "compare") {
            comparisonsCount++;
            statComparisons.textContent = comparisonsCount;
        } else if (step.type === "swap") {
            swapsCount++;
            statSwaps.textContent = swapsCount;
        }

        if (step.array) {
            currentArray = [...step.array];
        }

        // Cập nhật giao diện trực quan
        renderBars(currentArray, step.indices || [], step.type || "default");
        updateScannerMachine(step.indices || [], step.type || "default", currentArray);
        highlightCodeLine(step.line);
        if (step.explanation) {
            explanationText.innerHTML = `👉 <strong>Bước ${stepsCount}:</strong> ${step.explanation}`;
        }
        updateVariableWatcher(step.vars);

        if (step.type === "error") {
            pauseSimulation();
            generatorInstance = null;
            return false;
        }

        return true;
    }

    function getDelay() {
        // Slider min=20 (nhanh), max=1000 (chậm)
        // Nghịch đảo để kéo sang phải là chạy nhanh
        const val = parseInt(speedSlider.value, 10);
        return 1020 - val;
    }

    function playSimulation() {
        if (!generatorInstance) {
            resetSimulation(false);
        }
        if (isPlaying) return;
        isPlaying = true;
        playIcon.textContent = "⏸";
        playText.textContent = "Tạm dừng";
        btnPlayPause.classList.remove("btn-primary");
        btnPlayPause.classList.add("btn-secondary");

        function loop() {
            if (!isPlaying) return;
            const hasMore = stepSimulation();
            if (hasMore && isPlaying) {
                timerId = setTimeout(loop, getDelay());
            } else {
                pauseSimulation();
            }
        }
        loop();
    }

    function pauseSimulation() {
        isPlaying = false;
        if (timerId) clearTimeout(timerId);
        timerId = null;
        playIcon.textContent = "▶";
        playText.textContent = "Chạy mô phỏng";
        btnPlayPause.classList.remove("btn-secondary");
        btnPlayPause.classList.add("btn-primary");
    }

    // --------------------------------------------------------------------------
    // 5. EVENT LISTENERS - MAIN CONTROLS
    // --------------------------------------------------------------------------
    btnPlayPause.addEventListener("click", () => {
        if (isPlaying) {
            pauseSimulation();
        } else {
            playSimulation();
        }
    });

    btnStep.addEventListener("click", () => {
        pauseSimulation();
        stepSimulation();
    });

    btnReset.addEventListener("click", () => {
        resetSimulation();
    });

    algoSelect.addEventListener("change", () => {
        currentAlgoId = algoSelect.value;
        resetSimulation();
    });

    arrayInput.addEventListener("change", () => {
        resetSimulation();
    });

    // Presets
    const PRESETS = {
        neg_float: "-15.5, 42, -3.2, 0, 88.5, -9, 23.4, 7.8, -35, 60, 14, -2.5",
        random_12: () => {
            const arr = [];
            for (let i = 0; i < 12; i++) {
                const val = (Math.random() * 150 - 50).toFixed(1);
                arr.push(parseFloat(val));
            }
            return arr.join(", ");
        },
        reversed: "95, 80.5, 65, 50, 35.2, 20, 5, -10, -25.5, -40",
        nearly_sorted: "-25, -15, -8, 0, 12, 24, 18, 35, 48, 60, 55, 75",
        large_35: () => {
            const arr = [];
            for (let i = 0; i < 35; i++) {
                arr.push(Math.floor(Math.random() * 180 - 60));
            }
            return arr.join(", ");
        },
        duplicates: "15, -10, 25, 15, -10, 40, 25, 15, -10, 50, 40, -10",
        bogo_safe: "4, 2, 7, 1"
    };

    presetButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const presetKey = btn.dataset.preset;
            if (presetKey === "big_100") {
                openBigDataModal(100);
                return;
            }
            if (presetKey === "big_1000") {
                openBigDataModal(1000);
                return;
            }
            if (presetKey === "big_10000") {
                openBigDataModal(10000);
                return;
            }
            const presetVal = PRESETS[presetKey];
            if (!presetVal) return;
            arrayInput.value = typeof presetVal === "function" ? presetVal() : presetVal;
            resetSimulation();
        });
    });

    // Tabs switching
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            tabPanels.forEach(p => p.classList.remove("active"));

            btn.classList.add("active");
            const targetId = btn.dataset.tab;
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add("active");
            }
        });
    });

    // --------------------------------------------------------------------------
    // 6. TAB 2: THUẬT TOÁN (ENCYCLOPEDIA & INTERACTIVE MINI VISUALIZERS)
    // --------------------------------------------------------------------------
    function renderEncyclopediaCards() {
        algoCardsGrid.innerHTML = "";

        Object.values(ALGORITHMS).forEach(algo => {
            const card = document.createElement("div");
            card.className = "algo-card";
            card.dataset.category = algo.category;

            // Complexity table
            const comp = algo.complexity;
            const compTableHtml = `
                <table class="complexity-table">
                    <thead>
                        <tr>
                            <th>Tốt nhất</th>
                            <th>Trung bình</th>
                            <th>Xấu nhất</th>
                            <th>Không gian</th>
                            <th>Ổn định</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${comp.best}</td>
                            <td>${comp.avg}</td>
                            <td>${comp.worst}</td>
                            <td>${comp.space}</td>
                            <td>${comp.stable}</td>
                        </tr>
                    </tbody>
                </table>
            `;

            // Logic list
            const logicListHtml = algo.logic.map(item => `<li>${item}</li>`).join("");

            // Pros & Cons
            const prosHtml = algo.pros.map(item => `<li>${item}</li>`).join("");
            const consHtml = algo.cons.map(item => `<li>${item}</li>`).join("");

            card.innerHTML = `
                <div class="card-top">
                    <div>
                        <h3 class="card-name">${algo.name}</h3>
                        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px;">${algo.description}</p>
                    </div>
                    <span class="card-category">${algo.category}</span>
                </div>

                ${compTableHtml}

                <div class="card-logic-box">
                    <h4>Chi tiết từng bước logic:</h4>
                    <ul>${logicListHtml}</ul>
                </div>

                <div class="pros-cons-grid">
                    <div class="pros-box">
                        <h5>Ưu điểm</h5>
                        <ul>${prosHtml}</ul>
                    </div>
                    <div class="cons-box">
                        <h5>Nhược điểm</h5>
                        <ul>${consHtml}</ul>
                    </div>
                </div>

                <!-- Interactive Mini Visualizer -->
                <div class="mini-viz-container" id="miniViz_${algo.id}">
                    <div class="mini-viz-header">
                        <span>Mô phỏng mẫu (7 phần tử âm/dương):</span>
                        <span id="miniStatus_${algo.id}" style="color: var(--accent-cyan); font-weight: 600;">Sẵn sàng</span>
                    </div>

                    <div class="mini-bars-box" id="miniBars_${algo.id}">
                        <!-- Mini bars rendered here -->
                    </div>

                    <div class="mini-controls">
                        <button class="btn-mini-play" id="btnMiniPlay_${algo.id}">
                            <span>▶</span> Chạy mô phỏng mini
                        </button>
                        <button class="btn-open-main" data-algo="${algo.id}">
                            <span>🎯</span> Mở trong tab Mô phỏng chính
                        </button>
                    </div>
                </div>
            `;

            algoCardsGrid.appendChild(card);

            // Khởi tạo mini visualizer cho card này
            setupMiniVisualizer(algo);
        });

        // Xử lý nút "Mở trong tab Mô phỏng chính"
        document.querySelectorAll(".btn-open-main").forEach(btn => {
            btn.addEventListener("click", () => {
                const targetAlgo = btn.dataset.algo;
                algoSelect.value = targetAlgo;
                currentAlgoId = targetAlgo;

                // Chuyển sang Tab 1
                document.querySelector('[data-tab="tab-simulation"]').click();
                resetSimulation();
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        });
    }

    // Thiết lập Mini Visualizer độc lập cho từng thẻ thuật toán
    function setupMiniVisualizer(algo) {
        const sampleArray = [12.5, -8.0, 25.0, 0, -18.5, 4.2, 32.0];
        const container = document.getElementById(`miniBars_${algo.id}`);
        const statusLabel = document.getElementById(`miniStatus_${algo.id}`);
        const playBtn = document.getElementById(`btnMiniPlay_${algo.id}`);

        let miniCurrent = [...sampleArray];
        let miniGen = null;
        let miniTimer = null;
        let isMiniPlaying = false;

        function renderMini(arr, activeIndices = [], type = "default") {
            if (!container) return;
            container.innerHTML = "";
            const minVal = Math.min(...arr);
            const maxVal = Math.max(...arr);
            const range = maxVal - minVal || 1;
            const zeroPercent = (Math.abs(minVal) / range) * 100;

            // Zero axis line
            const axis = document.createElement("div");
            axis.className = "zero-axis-line";
            axis.style.bottom = `${zeroPercent}%`;
            container.appendChild(axis);

            arr.forEach((val, idx) => {
                const col = document.createElement("div");
                col.className = "mini-bar-col";

                const body = document.createElement("div");
                body.className = "mini-bar-body";

                const heightPercent = Math.max(3, (Math.abs(val) / range) * 85);
                if (val >= 0) {
                    body.style.background = "var(--bar-positive-default)";
                    body.style.bottom = `${zeroPercent}%`;
                    body.style.height = `${heightPercent}%`;
                } else {
                    body.style.background = "var(--bar-negative-default)";
                    body.style.top = `${100 - zeroPercent}%`;
                    body.style.height = `${heightPercent}%`;
                }

                if (activeIndices.includes(idx)) {
                    if (type === "compare") body.style.background = "var(--bar-comparing)";
                    else if (type === "swap") body.style.background = "var(--bar-swapping)";
                    else if (type === "pivot") body.style.background = "var(--bar-pivot)";
                    else if (type === "sorted") body.style.background = "var(--bar-sorted)";
                }

                col.appendChild(body);

                const lbl = document.createElement("span");
                lbl.className = "mini-val-label";
                lbl.textContent = val;
                if (val >= 0) lbl.style.bottom = `calc(${zeroPercent}% + ${heightPercent}% + 2px)`;
                else lbl.style.top = `calc(${100 - zeroPercent}% + ${heightPercent}% + 2px)`;
                col.appendChild(lbl);

                container.appendChild(col);
            });
        }

        renderMini(miniCurrent);

        playBtn.addEventListener("click", () => {
            if (isMiniPlaying) {
                // Tạm dừng
                isMiniPlaying = false;
                clearTimeout(miniTimer);
                playBtn.innerHTML = `<span>▶</span> Tiếp tục`;
                statusLabel.textContent = "Tạm dừng";
                return;
            }

            if (!miniGen) {
                miniCurrent = [...sampleArray];
                miniGen = algo.generator(miniCurrent);
            }

            isMiniPlaying = true;
            playBtn.innerHTML = `<span>⏸</span> Dừng`;
            statusLabel.textContent = "Đang chạy...";

            function stepMini() {
                if (!isMiniPlaying) return;
                const res = miniGen.next();
                if (res.done) {
                    isMiniPlaying = false;
                    miniGen = null;
                    playBtn.innerHTML = `<span>🔄</span> Chạy lại`;
                    statusLabel.textContent = "Đã xong!";
                    renderMini(miniCurrent, miniCurrent.map((_, i) => i), "sorted");
                    return;
                }
                const step = res.value;
                if (step.array) miniCurrent = [...step.array];
                renderMini(miniCurrent, step.indices || [], step.type || "default");
                miniTimer = setTimeout(stepMini, 250);
            }
            stepMini();
        });
    }

    // Category filter buttons
    if (categoryFilters) {
        categoryFilters.addEventListener("click", (e) => {
            if (!e.target.classList.contains("cat-filter-btn")) return;
            document.querySelectorAll(".cat-filter-btn").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");

            const selectedCat = e.target.dataset.cat;
            const cards = document.querySelectorAll(".algo-card");
            cards.forEach(card => {
                if (selectedCat === "all" || card.dataset.category.includes(selectedCat)) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }

    // --------------------------------------------------------------------------
    // 7. MODAL GITHUB PAGES INSTRUCTIONS
    // --------------------------------------------------------------------------
    btnOpenDeployModal.addEventListener("click", () => {
        deployModal.classList.add("active");
    });
    btnCloseModal.addEventListener("click", () => {
        deployModal.classList.remove("active");
    });
    deployModal.addEventListener("click", (e) => {
        if (e.target === deployModal) deployModal.classList.remove("active");
    });

    // --------------------------------------------------------------------------
    // 8. BIG DATA LAB MODAL CONTROLLER (100, 1,000, 10,000 PHẦN TỬ)
    // --------------------------------------------------------------------------
    const O_N2_ALGOS = [
        "bubble_sort", "insertion_sort", "binary_insertion_sort", "selection_sort",
        "cocktail_sort", "gnome_sort", "cycle_sort", "stooge_sort", "bogo_sort"
    ];

    function populateBigDataAlgoSelect() {
        if (!bigDataAlgoSelect) return;
        bigDataAlgoSelect.innerHTML = "";

        const preferredOrder = [
            "intro_sort", "quick_sort", "merge_sort", "heap_sort", "tim_sort",
            "radix_sort", "counting_sort", "shell_sort", "bitonic_sort",
            "comb_sort", "bucket_sort", "odd_even_sort", "cycle_sort", "pancake_sort",
            "insertion_sort", "binary_insertion_sort", "selection_sort", "gnome_sort",
            "cocktail_sort", "bubble_sort", "stooge_sort", "bogo_sort"
        ];

        preferredOrder.forEach(key => {
            const algo = ALGORITHMS[key];
            if (!algo) return;
            const opt = document.createElement("option");
            opt.value = key;
            const prefix = key === "intro_sort" ? "👑 " : (O_N2_ALGOS.includes(key) ? "⚠️ " : "⚡ ");
            opt.textContent = `${prefix}${algo.name} (${algo.complexity.avg})`;
            if (key === "intro_sort") opt.selected = true;
            bigDataAlgoSelect.appendChild(opt);
        });
    }

    function openBigDataModal(count = 1000) {
        pauseSimulation(); // Dừng mô phỏng thường nếu đang chạy
        bigDataCount = count;
        bigDataModal.classList.add("active");
        bigDataHeading.textContent = `Mô phỏng ${count.toLocaleString()} phần tử`;
        if (bigDataCountEl) {
            bigDataCountEl.textContent = count.toLocaleString();
        }

        // Tự động gán gia tốc phù hợp theo số lượng
        if (count <= 100) {
            bigDataBatchSelect.value = "5";
        } else if (count <= 1000) {
            bigDataBatchSelect.value = "25";
        } else {
            bigDataBatchSelect.value = "100";
        }

        // Khởi tạo ngay lập tức trạng thái Big Data
        resizeBigDataCanvas();
        resetBigDataSimulation();
    }

    function generateBigDataArray(count) {
        const arr = [];
        const maxMag = count <= 100 ? 150 : (count <= 1000 ? 800 : 3000);
        for (let i = 0; i < count; i++) {
            const isNeg = Math.random() < 0.35;
            const val = Math.floor(Math.random() * maxMag) + 1;
            arr.push(isNeg ? -val : val);
        }
        return arr;
    }

    function resizeBigDataCanvas() {
        if (!bigDataCanvas) return;
        const rect = bigDataCanvas.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const dpr = window.devicePixelRatio || 1;
        bigDataCanvas.width = Math.floor(rect.width * dpr);
        bigDataCanvas.height = Math.floor(rect.height * dpr);
    }

    function drawBigDataCanvas(arr, activeIndices = [], type = "default") {
        if (!bigDataCanvas || !arr || arr.length === 0) return;
        const ctx = bigDataCanvas.getContext("2d");
        const width = bigDataCanvas.width;
        const height = bigDataCanvas.height;

        // Xóa nền đen không gian công nghệ
        ctx.fillStyle = "#080c12";
        ctx.fillRect(0, 0, width, height);

        const len = arr.length;
        let minVal = Infinity;
        let maxVal = -Infinity;
        for (let i = 0; i < len; i++) {
            const v = arr[i];
            if (v < minVal) minVal = v;
            if (v > maxVal) maxVal = v;
        }

        const hasNegative = minVal < 0;
        const hasPositive = maxVal > 0;
        let range = 1;
        let zeroY = height;

        const padTop = 32;
        const padBottom = 28;
        const usableH = Math.max(10, height - padTop - padBottom);

        if (hasNegative && hasPositive) {
            range = maxVal - minVal || 1;
            zeroY = padTop + (maxVal / range) * usableH;
        } else if (hasNegative) {
            range = Math.abs(minVal) || 1;
            zeroY = padTop;
        } else {
            range = maxVal || 1;
            zeroY = height - padBottom;
        }

        // Vẽ đường trục 0 (Zero-axis baseline)
        ctx.strokeStyle = "rgba(56, 139, 253, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.moveTo(0, zeroY);
        ctx.lineTo(width, zeroY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Vẽ nhãn trục 0
        ctx.fillStyle = "rgba(56, 139, 253, 0.85)";
        ctx.font = "12px JetBrains Mono, monospace";
        ctx.fillText("0.0 (Trục số 0)", 12, zeroY - 6);

        // Kích thước từng thanh
        const barW = Math.max(1, width / len);
        const activeSet = new Set(activeIndices);

        const colPositive = type === "sorted" ? "#3fb950" : "#388bfd";
        const colNegative = type === "sorted" ? "#2ea043" : "#e3b341";
        const colCompare = "#58a6ff";
        const colSwap = "#f85149";
        const colPivot = "#a371f7";

        for (let i = 0; i < len; i++) {
            const val = arr[i];
            const x = (i / len) * width;
            const barH = Math.max(1, (Math.abs(val) / range) * usableH);
            const barY = val >= 0 ? (zeroY - barH) : zeroY;

            if (activeSet.has(i)) {
                if (type === "swap") ctx.fillStyle = colSwap;
                else if (type === "compare") ctx.fillStyle = colCompare;
                else if (type === "pivot") ctx.fillStyle = colPivot;
                else ctx.fillStyle = "#ffffff";
            } else {
                ctx.fillStyle = val >= 0 ? colPositive : colNegative;
            }

            if (barW <= 2.5) {
                ctx.fillRect(x, barY, Math.max(1, barW), barH);
            } else {
                ctx.fillRect(x, barY, Math.max(1, barW - 1), barH);
            }
        }
    }

    function checkBigDataComplexityWarning(algoId, count) {
        if (!bigDataWarning) return;
        if (count >= 1000 && O_N2_ALGOS.includes(algoId)) {
            if (algoId === "bogo_sort") {
                bigDataWarning.innerHTML = `⚠️ <strong>Cảnh báo O(N!):</strong> BogoSort không thể chạy xong với ${count.toLocaleString()} phần tử!`;
            } else if (algoId === "stooge_sort") {
                bigDataWarning.innerHTML = `⚠️ <strong>Cảnh báo O(N<sup>2.71</sup>):</strong> StoogeSort cực kỳ chậm với N &ge; 1,000. Hãy tăng Gia tốc 500x hoặc chọn IntroSort!`;
            } else {
                bigDataWarning.innerHTML = `⚠️ <strong>Cảnh báo O(N²):</strong> Với ${count.toLocaleString()} phần tử, thuật toán này cần hàng chục triệu phép tính. Hãy chọn Gia tốc <strong>100x - 500x</strong> hoặc đổi sang <strong>IntroSort / QuickSort</strong>.`;
            }
            bigDataWarning.style.display = "block";
        } else {
            bigDataWarning.style.display = "none";
        }
    }

    function renderFloatingCode(algoId) {
        const algo = ALGORITHMS[algoId];
        if (!algo || !algo.code) return;

        floatingCodeTitle.textContent = `MÃ NGUỒN C++: ${algo.name.toUpperCase()}`;
        floatingCodeContent.innerHTML = "";

        algo.code.forEach((lineText, idx) => {
            const lineDiv = document.createElement("div");
            lineDiv.className = "floating-code-line";
            lineDiv.id = `floatingCodeLine_${idx + 1}`;

            const numSpan = document.createElement("span");
            numSpan.style.color = "#6e7681";
            numSpan.style.marginRight = "8px";
            numSpan.textContent = idx + 1;

            const textSpan = document.createElement("span");
            textSpan.textContent = lineText;

            lineDiv.appendChild(numSpan);
            lineDiv.appendChild(textSpan);
            floatingCodeContent.appendChild(lineDiv);
        });
    }

    function highlightFloatingCodeLine(lineNumber) {
        if (!floatingCodeContent) return;
        const currentActive = floatingCodeContent.querySelector(".floating-code-line.active");
        if (currentActive) currentActive.classList.remove("active");
        if (!lineNumber) return;

        const target = document.getElementById(`floatingCodeLine_${lineNumber}`);
        if (target) {
            target.classList.add("active");
            const containerTop = floatingCodeContent.scrollTop;
            const containerHeight = floatingCodeContent.clientHeight;
            const targetTop = target.offsetTop - floatingCodeContent.offsetTop;
            const targetHeight = target.offsetHeight;

            if (targetTop < containerTop) {
                floatingCodeContent.scrollTop = targetTop;
            } else if (targetTop + targetHeight > containerTop + containerHeight) {
                floatingCodeContent.scrollTop = targetTop + targetHeight - containerHeight;
            }
        }
    }

    function resetBigDataSimulation() {
        pauseBigDataSimulation();
        bigDataArray = generateBigDataArray(bigDataCount);
        const algoId = bigDataAlgoSelect.value;
        const algo = ALGORITHMS[algoId];

        checkBigDataComplexityWarning(algoId, bigDataCount);

        if (algo) {
            bigDataGen = algo.generator([...bigDataArray]);
        } else {
            bigDataGen = null;
        }

        bigDataComparisons = 0;
        bigDataSwaps = 0;
        bigDataSteps = 0;

        bigDataCountEl.textContent = bigDataCount.toLocaleString();
        bigDataComparisonsEl.textContent = "0";
        bigDataSwapsEl.textContent = "0";
        bigDataStatusEl.textContent = "Sẵn sàng";
        bigDataStatusEl.style.color = "var(--accent-cyan)";

        renderFloatingCode(algoId);
        drawBigDataCanvas(bigDataArray);
    }

    function playBigDataSimulation() {
        if (!bigDataGen) {
            resetBigDataSimulation();
        }
        if (bigDataIsPlaying) return;
        bigDataIsPlaying = true;
        bigPlayIcon.textContent = "⏸";
        bigPlayText.textContent = "Tạm dừng";
        btnBigDataPlay.classList.remove("btn-primary");
        btnBigDataPlay.classList.add("btn-secondary");
        bigDataStatusEl.textContent = "Đang chạy...";
        bigDataStatusEl.style.color = "var(--accent-cyan)";

        bigDataAnimationId = requestAnimationFrame(bigDataLoop);
    }

    function pauseBigDataSimulation() {
        bigDataIsPlaying = false;
        if (bigDataAnimationId) {
            cancelAnimationFrame(bigDataAnimationId);
            bigDataAnimationId = null;
        }
        bigPlayIcon.textContent = "▶";
        bigPlayText.textContent = "Chạy siêu tốc";
        btnBigDataPlay.classList.remove("btn-secondary");
        btnBigDataPlay.classList.add("btn-primary");
        if (bigDataStatusEl && bigDataStatusEl.textContent === "Đang chạy...") {
            bigDataStatusEl.textContent = "Tạm dừng";
            bigDataStatusEl.style.color = "var(--accent-amber)";
        }
    }

    function bigDataLoop() {
        if (!bigDataIsPlaying) return;

        const batchSize = parseInt(bigDataBatchSelect.value, 10) || 25;
        let lastStep = null;
        let finished = false;

        for (let k = 0; k < batchSize; k++) {
            if (!bigDataGen) {
                finished = true;
                break;
            }
            const res = bigDataGen.next();
            if (res.done) {
                finished = true;
                break;
            }
            lastStep = res.value;
            bigDataSteps++;
            if (lastStep.type === "compare") {
                bigDataComparisons++;
            } else if (lastStep.type === "swap") {
                bigDataSwaps++;
            }
            if (lastStep.array) {
                bigDataArray = lastStep.array;
            }
        }

        bigDataComparisonsEl.textContent = bigDataComparisons.toLocaleString();
        bigDataSwapsEl.textContent = bigDataSwaps.toLocaleString();

        if (lastStep) {
            drawBigDataCanvas(bigDataArray, lastStep.indices || [], lastStep.type || "default");
            highlightFloatingCodeLine(lastStep.line);
        }

        if (finished) {
            bigDataIsPlaying = false;
            bigDataGen = null;
            bigDataStatusEl.textContent = "Hoàn thành! ✅";
            bigDataStatusEl.style.color = "var(--accent-green)";
            bigPlayIcon.textContent = "🔄";
            bigPlayText.textContent = "Chạy lại";
            btnBigDataPlay.classList.remove("btn-secondary");
            btnBigDataPlay.classList.add("btn-primary");
            drawBigDataCanvas(bigDataArray, [], "sorted");
            highlightFloatingCodeLine(null);
            return;
        }

        bigDataAnimationId = requestAnimationFrame(bigDataLoop);
    }

    // Event listeners cho Big Data Lab
    if (btnBigDataPlay) {
        btnBigDataPlay.addEventListener("click", () => {
            if (bigDataIsPlaying) {
                pauseBigDataSimulation();
            } else {
                playBigDataSimulation();
            }
        });
    }

    if (btnBigDataReset) {
        btnBigDataReset.addEventListener("click", () => {
            resetBigDataSimulation();
        });
    }

    if (bigDataAlgoSelect) {
        bigDataAlgoSelect.addEventListener("change", () => {
            resetBigDataSimulation();
        });
    }

    if (btnBigDataClose) {
        btnBigDataClose.addEventListener("click", () => {
            pauseBigDataSimulation();
            bigDataModal.classList.remove("active");
        });
    }

    if (bigDataModal) {
        bigDataModal.addEventListener("click", (e) => {
            if (e.target === bigDataModal) {
                pauseBigDataSimulation();
                bigDataModal.classList.remove("active");
            }
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && bigDataModal && bigDataModal.classList.contains("active")) {
            pauseBigDataSimulation();
            bigDataModal.classList.remove("active");
        }
    });

    window.addEventListener("resize", () => {
        if (bigDataModal && bigDataModal.classList.contains("active")) {
            resizeBigDataCanvas();
            drawBigDataCanvas(bigDataArray);
        }
    });

    // --------------------------------------------------------------------------
    // 9. TAB 3: ĐẤU TRƯỜNG SO SÁNH THUẬT TOÁN (HEAD-TO-HEAD ARENA)
    // --------------------------------------------------------------------------
    const COMPARE_PRESETS = {
        random_16: () => {
            const arr = [];
            for (let i = 0; i < 16; i++) arr.push(Math.floor(Math.random() * 160 - 50));
            return arr.join(", ");
        },
        random_35: () => {
            const arr = [];
            for (let i = 0; i < 35; i++) arr.push(Math.floor(Math.random() * 200 - 80));
            return arr.join(", ");
        },
        random_70: () => {
            const arr = [];
            for (let i = 0; i < 70; i++) arr.push(Math.floor(Math.random() * 300 - 120));
            return arr.join(", ");
        },
        reversed: "92, 80, 68, 55, 42, 30, 18, 5, -8, -20, -35, -48, -60",
        nearly_sorted: "-35, -20, -8, 2, 14, 25, 20, 36, 48, 60, 56, 75, 88",
        duplicates: "25, -12, 40, 25, -12, 50, 25, -12, 40, 50, -12, 25, 40",
        neg_float: "-18.5, 45, -7.2, 0, 82.4, -12, 29.5, 8.8, -30, 64, 15, -4.5",
        bogo_safe: "4, 2, 7, 1"
    };

    function parseCompareArrayInput() {
        const raw = compareArrayInput ? compareArrayInput.value.trim() : "";
        if (!raw) {
            return [28, -14, 55, 0, -8.5, 42, 19, -32, 70, 5, -18, 63, 12, -3];
        }
        const tokens = raw.split(/[\s,;]+/);
        const parsed = [];
        for (const token of tokens) {
            if (token === "") continue;
            const num = parseFloat(token);
            if (!isNaN(num)) {
                parsed.push(Number.isInteger(num) ? num : parseFloat(num.toFixed(2)));
            }
        }
        return parsed.length > 0 ? parsed : [20, -10, 35, 5, -15, 40];
    }

    function populateCompareAlgoSelects() {
        if (!compareAlgoA || !compareAlgoB) return;
        compareAlgoA.innerHTML = "";
        compareAlgoB.innerHTML = "";

        const preferredOrder = [
            "intro_sort", "quick_sort", "merge_sort", "heap_sort", "tim_sort",
            "radix_sort", "counting_sort", "shell_sort", "bitonic_sort",
            "comb_sort", "bucket_sort", "odd_even_sort", "cycle_sort", "pancake_sort",
            "insertion_sort", "binary_insertion_sort", "selection_sort", "gnome_sort",
            "cocktail_sort", "bubble_sort", "stooge_sort", "bogo_sort"
        ];

        preferredOrder.forEach(key => {
            const algo = ALGORITHMS[key];
            if (!algo) return;

            const optA = document.createElement("option");
            optA.value = key;
            optA.textContent = `${algo.name} (${algo.complexity.avg})`;
            if (key === "quick_sort") optA.selected = true;
            compareAlgoA.appendChild(optA);

            const optB = document.createElement("option");
            optB.value = key;
            optB.textContent = `${algo.name} (${algo.complexity.avg})`;
            if (key === "bubble_sort") optB.selected = true;
            compareAlgoB.appendChild(optB);
        });
    }

    function renderCompareBars(container, arr, activeIndices = [], type = "default") {
        if (!container || !arr || arr.length === 0) return;
        container.innerHTML = "";

        const minVal = Math.min(...arr);
        const maxVal = Math.max(...arr);
        const hasNegative = minVal < 0;
        const hasPositive = maxVal > 0;

        let zeroPercent = 0;
        let range = 1;

        if (hasNegative && hasPositive) {
            range = maxVal - minVal || 1;
            zeroPercent = (Math.abs(minVal) / range) * 100;
        } else if (hasNegative) {
            range = Math.abs(minVal) || 1;
            zeroPercent = 100;
        } else {
            range = maxVal || 1;
            zeroPercent = 0;
        }

        const zeroAxis = document.createElement("div");
        zeroAxis.className = "zero-axis-line";
        zeroAxis.style.bottom = `${zeroPercent}%`;
        const zeroLabel = document.createElement("span");
        zeroLabel.className = "zero-axis-label";
        zeroLabel.textContent = "0";
        zeroAxis.appendChild(zeroLabel);
        container.appendChild(zeroAxis);

        const totalElements = arr.length;
        const hideLabels = totalElements > 25;

        arr.forEach((val, idx) => {
            const col = document.createElement("div");
            col.className = "bar-col";
            col.dataset.index = idx;

            if (activeIndices.includes(idx) || type === "error") {
                if (type === "compare") col.classList.add("comparing");
                else if (type === "swap") col.classList.add("swapping");
                else if (type === "pivot") col.classList.add("pivot");
                else if (type === "sorted") col.classList.add("sorted");
                else if (type === "error") col.classList.add("error");
            }

            const barBody = document.createElement("div");
            barBody.className = "bar-body";

            let barHeightPercent = 0;
            if (hasNegative && hasPositive) {
                barHeightPercent = Math.max(3, (Math.abs(val) / range) * 90);
                if (val >= 0) {
                    barBody.classList.add("bar-positive");
                    barBody.style.bottom = `${zeroPercent}%`;
                    barBody.style.height = `${barHeightPercent}%`;
                } else {
                    barBody.classList.add("bar-negative");
                    barBody.style.top = `${100 - zeroPercent}%`;
                    barBody.style.height = `${barHeightPercent}%`;
                }
            } else if (hasNegative) {
                barHeightPercent = Math.max(3, (Math.abs(val) / range) * 90);
                barBody.classList.add("bar-negative");
                barBody.style.top = `0%`;
                barBody.style.height = `${barHeightPercent}%`;
            } else {
                barHeightPercent = Math.max(3, (val / range) * 90);
                barBody.classList.add("bar-positive");
                barBody.style.bottom = `0%`;
                barBody.style.height = `${barHeightPercent}%`;
            }

            col.appendChild(barBody);

            if (!hideLabels) {
                const label = document.createElement("span");
                label.className = "bar-val-label";
                label.textContent = val;
                if (val >= 0) {
                    label.style.bottom = `calc(${zeroPercent}% + ${barHeightPercent}% + 3px)`;
                } else {
                    label.style.top = `calc(${100 - zeroPercent}% + ${barHeightPercent}% + 3px)`;
                }
                col.appendChild(label);
            }

            container.appendChild(col);
        });
    }

    function resetCompareSimulation(shouldPause = true) {
        if (shouldPause) {
            pauseCompareSimulation();
        }

        initialCompareArray = parseCompareArrayInput();
        compareArrayA = [...initialCompareArray];
        compareArrayB = [...initialCompareArray];

        const idA = compareAlgoA ? compareAlgoA.value : "quick_sort";
        const idB = compareAlgoB ? compareAlgoB.value : "bubble_sort";

        const algoA = ALGORITHMS[idA];
        const algoB = ALGORITHMS[idB];

        genA = algoA ? algoA.generator(compareArrayA) : null;
        genB = algoB ? algoB.generator(compareArrayB) : null;

        doneA = false;
        doneB = false;
        failedA = false;
        failedB = false;
        compCountA = 0; swapCountA = 0; stepCountA = 0; timeCountA = 0;
        compCountB = 0; swapCountB = 0; stepCountB = 0; timeCountB = 0;
        compareStartTime = 0;
        hasAnnouncedWinner = false;

        if (fighterCompA) fighterCompA.textContent = "0";
        if (fighterSwapA) fighterSwapA.textContent = "0";
        if (fighterStepA) fighterStepA.textContent = "0";
        if (fighterTimeA) fighterTimeA.textContent = "0.0 ms";
        if (fighterStatusA) {
            fighterStatusA.className = "fighter-status-badge ready";
            fighterStatusA.textContent = "Sẵn sàng";
        }
        if (fighterExplainA) fighterExplainA.textContent = "Chờ lệnh bắt đầu cuộc so tài...";

        if (fighterCompB) fighterCompB.textContent = "0";
        if (fighterSwapB) fighterSwapB.textContent = "0";
        if (fighterStepB) fighterStepB.textContent = "0";
        if (fighterTimeB) fighterTimeB.textContent = "0.0 ms";
        if (fighterStatusB) {
            fighterStatusB.className = "fighter-status-badge ready";
            fighterStatusB.textContent = "Sẵn sàng";
        }
        if (fighterExplainB) fighterExplainB.textContent = "Chờ lệnh bắt đầu cuộc so tài...";

        if (compareSummarySection) {
            compareSummarySection.style.display = "none";
        }

        renderCompareBars(compareBarsA, compareArrayA);
        renderCompareBars(compareBarsB, compareArrayB);
    }

    function stepCompareSimulation() {
        if (!genA || !genB) {
            resetCompareSimulation(false);
        }

        if (doneA && doneB) {
            return false;
        }

        if (compareStartTime === 0) {
            compareStartTime = performance.now();
        }

        // Bước tiếp cho Đấu thủ A
        if (!doneA && genA) {
            const nextA = genA.next();
            if (nextA.done) {
                doneA = true;
                if (!failedA) {
                    if (timeCountA === 0) {
                        timeCountA = Math.max(1, performance.now() - compareStartTime);
                    }
                    fighterTimeA.textContent = `${timeCountA.toFixed(1)} ms`;
                    renderCompareBars(compareBarsA, compareArrayA, compareArrayA.map((_, i) => i), "sorted");
                    fighterExplainA.textContent = `🎉 Hoàn thành sắp xếp! (${timeCountA.toFixed(1)} ms)`;

                    if (!doneB && !hasAnnouncedWinner) {
                        hasAnnouncedWinner = true;
                        fighterStatusA.className = "fighter-status-badge winner";
                        fighterStatusA.textContent = `🥇 Về đích trước (${timeCountA.toFixed(1)} ms)!`;
                    } else if (doneB && failedB && !hasAnnouncedWinner) {
                        hasAnnouncedWinner = true;
                        fighterStatusA.className = "fighter-status-badge winner";
                        fighterStatusA.textContent = `🥇 Chiến thắng (${timeCountA.toFixed(1)} ms)!`;
                    } else {
                        fighterStatusA.className = "fighter-status-badge finished";
                        fighterStatusA.textContent = `Hoàn thành (${timeCountA.toFixed(1)} ms)`;
                    }
                }
            } else {
                const step = nextA.value;
                stepCountA++;
                fighterStepA.textContent = stepCountA;
                if (step.type === "compare") {
                    compCountA++;
                    fighterCompA.textContent = compCountA;
                } else if (step.type === "swap") {
                    swapCountA++;
                    fighterSwapA.textContent = swapCountA;
                }
                if (step.array) {
                    compareArrayA = [...step.array];
                }
                timeCountA = performance.now() - compareStartTime;
                fighterTimeA.textContent = `${timeCountA.toFixed(1)} ms`;

                if (step.type === "error") {
                    failedA = true;
                    doneA = true;
                    fighterStatusA.className = "fighter-status-badge failed";
                    fighterStatusA.textContent = `🛑 Dừng (STOP)`;
                    fighterExplainA.textContent = step.explanation;
                    renderCompareBars(compareBarsA, compareArrayA, [], "error");
                } else {
                    renderCompareBars(compareBarsA, compareArrayA, step.indices || [], step.type || "default");
                    if (step.explanation) {
                        fighterExplainA.textContent = step.explanation;
                    }
                }
            }
        }

        // Bước tiếp cho Đấu thủ B
        if (!doneB && genB) {
            const nextB = genB.next();
            if (nextB.done) {
                doneB = true;
                if (!failedB) {
                    if (timeCountB === 0) {
                        timeCountB = Math.max(1, performance.now() - compareStartTime);
                    }
                    fighterTimeB.textContent = `${timeCountB.toFixed(1)} ms`;
                    renderCompareBars(compareBarsB, compareArrayB, compareArrayB.map((_, i) => i), "sorted");
                    fighterExplainB.textContent = `🎉 Hoàn thành sắp xếp! (${timeCountB.toFixed(1)} ms)`;

                    if (!doneA && !hasAnnouncedWinner) {
                        hasAnnouncedWinner = true;
                        fighterStatusB.className = "fighter-status-badge winner";
                        fighterStatusB.textContent = `🥇 Về đích trước (${timeCountB.toFixed(1)} ms)!`;
                    } else if (doneA && failedA && !hasAnnouncedWinner) {
                        hasAnnouncedWinner = true;
                        fighterStatusB.className = "fighter-status-badge winner";
                        fighterStatusB.textContent = `🥇 Chiến thắng (${timeCountB.toFixed(1)} ms)!`;
                    } else {
                        fighterStatusB.className = "fighter-status-badge finished";
                        fighterStatusB.textContent = `Hoàn thành (${timeCountB.toFixed(1)} ms)`;
                    }
                }
            } else {
                const step = nextB.value;
                stepCountB++;
                fighterStepB.textContent = stepCountB;
                if (step.type === "compare") {
                    compCountB++;
                    fighterCompB.textContent = compCountB;
                } else if (step.type === "swap") {
                    swapCountB++;
                    fighterSwapB.textContent = swapCountB;
                }
                if (step.array) {
                    compareArrayB = [...step.array];
                }
                timeCountB = performance.now() - compareStartTime;
                fighterTimeB.textContent = `${timeCountB.toFixed(1)} ms`;

                if (step.type === "error") {
                    failedB = true;
                    doneB = true;
                    fighterStatusB.className = "fighter-status-badge failed";
                    fighterStatusB.textContent = `🛑 Dừng (STOP)`;
                    fighterExplainB.textContent = step.explanation;
                    renderCompareBars(compareBarsB, compareArrayB, [], "error");
                } else {
                    renderCompareBars(compareBarsB, compareArrayB, step.indices || [], step.type || "default");
                    if (step.explanation) {
                        fighterExplainB.textContent = step.explanation;
                    }
                }
            }
        }

        // Kiểm tra xem cả hai đã xong chưa
        if (doneA && doneB) {
            pauseCompareSimulation();
            showComparisonSummary();
            return false;
        }

        return true;
    }

    function getCompareDelay() {
        const val = compareSpeedSlider ? parseInt(compareSpeedSlider.value, 10) : 820;
        return 1020 - val;
    }

    function playCompareSimulation() {
        if (!genA || !genB || (doneA && doneB)) {
            resetCompareSimulation(false);
        }
        if (isComparePlaying) return;
        isComparePlaying = true;
        if (compareStartTime === 0) {
            compareStartTime = performance.now();
        }

        comparePlayIcon.textContent = "⏸";
        comparePlayText.textContent = "Tạm dừng";
        btnComparePlay.classList.remove("btn-primary");
        btnComparePlay.classList.add("btn-secondary");

        if (!doneA) {
            fighterStatusA.className = "fighter-status-badge running";
            fighterStatusA.textContent = "⚡ Đang chạy...";
        }
        if (!doneB) {
            fighterStatusB.className = "fighter-status-badge running";
            fighterStatusB.textContent = "⚡ Đang chạy...";
        }

        function loop() {
            if (!isComparePlaying) return;

            const batch = compareBatchSelect ? parseInt(compareBatchSelect.value, 10) : 1;
            let hasMore = true;
            for (let i = 0; i < batch; i++) {
                hasMore = stepCompareSimulation();
                if (!hasMore) break;
            }

            if (hasMore && isComparePlaying) {
                compareTimerId = setTimeout(loop, getCompareDelay());
            } else {
                pauseCompareSimulation();
            }
        }
        loop();
    }

    function pauseCompareSimulation() {
        isComparePlaying = false;
        if (compareTimerId) {
            clearTimeout(compareTimerId);
            compareTimerId = null;
        }
        if (comparePlayIcon) comparePlayIcon.textContent = "▶";
        if (comparePlayText) comparePlayText.textContent = "Bắt đầu so tài song song";
        if (btnComparePlay) {
            btnComparePlay.classList.remove("btn-secondary");
            btnComparePlay.classList.add("btn-primary");
        }

        if (!doneA && fighterStatusA && fighterStatusA.textContent.includes("Đang chạy")) {
            fighterStatusA.className = "fighter-status-badge ready";
            fighterStatusA.textContent = "Tạm dừng";
        }
        if (!doneB && fighterStatusB && fighterStatusB.textContent.includes("Đang chạy")) {
            fighterStatusB.className = "fighter-status-badge ready";
            fighterStatusB.textContent = "Tạm dừng";
        }
    }

    function generateConclusionReport(algoA, algoB, metrics) {
        const {
            winner,
            timeA, timeB,
            compA, compB,
            swapA, swapB,
            stepA, stepB,
            stepPct, stepRatio,
            compPct, compRatio,
            swapPct, swapRatio,
            timeRatio
        } = metrics;

        let html = "";

        // 1. Nhận định kết quả tổng quan
        if (winner === "A") {
            html += `<p>🏆 <strong>Kết quả chung cuộc:</strong> Thuật toán <strong>${algoA.name}</strong> đã giành chiến thắng thuyết phục trước <strong>${algoB.name}</strong>. Cụ thể, ${algoA.name} về đích với thời gian <strong>${timeA.toFixed(1)} ms</strong> (nhanh hơn gấp <strong>${timeRatio}x</strong>), thực hiện <strong>${stepA}</strong> bước so với <strong>${stepB}</strong> bước của ${algoB.name} (tiết kiệm <strong>${stepPct}%</strong> tổng số thao tác).</p>`;
        } else if (winner === "B") {
            html += `<p>🏆 <strong>Kết quả chung cuộc:</strong> Thuật toán <strong>${algoB.name}</strong> đã giành chiến thắng thuyết phục trước <strong>${algoA.name}</strong>. Cụ thể, ${algoB.name} về đích với thời gian <strong>${timeB.toFixed(1)} ms</strong> (nhanh hơn gấp <strong>${timeRatio}x</strong>), thực hiện <strong>${stepB}</strong> bước so với <strong>${stepA}</strong> bước của ${algoA.name} (tiết kiệm <strong>${stepPct}%</strong> tổng số thao tác).</p>`;
        } else {
            html += `<p>🤝 <strong>Kết quả chung cuộc:</strong> Cả <strong>${algoA.name}</strong> và <strong>${algoB.name}</strong> đều có hiệu năng tương đương nhau trên bộ dữ liệu kiểm thử này, chênh lệch số bước không đáng kể.</p>`;
        }

        // 2. Phân tích độ phức tạp thời gian & bản chất thuật toán
        html += `<h5>1. Về độ phức tạp thời gian (Time Complexity):</h5><ul>`;
        html += `<li><strong>${algoA.name}:</strong> Trung bình <code>${algoA.complexity.avg}</code>, Tốt nhất <code>${algoA.complexity.best}</code>, Xấu nhất <code>${algoA.complexity.worst}</code>.</li>`;
        html += `<li><strong>${algoB.name}:</strong> Trung bình <code>${algoB.complexity.avg}</code>, Tốt nhất <code>${algoB.complexity.best}</code>, Xấu nhất <code>${algoB.complexity.worst}</code>.</li>`;

        const isANLogN = algoA.complexity.avg.includes("log");
        const isBNLogN = algoB.complexity.avg.includes("log");
        const isAN2 = algoA.complexity.avg.includes("n²") || algoA.complexity.avg.includes("N²");
        const isBN2 = algoB.complexity.avg.includes("n²") || algoB.complexity.avg.includes("N²");

        if (isANLogN && isBN2) {
            html += `<li><strong>Phân tích khoa học:</strong> ${algoA.name} sử dụng cơ chế phân hoạch chia để trị hoặc cây nhị phân đạt tiệm cận O(N log N). Trong khi đó, ${algoB.name} mang độ phức tạp bậc hai O(N²), số phép so sánh tăng theo cấp số nhân khiến số phép tính bùng nổ khi kích thước dãy tăng lên.</li>`;
        } else if (isBNLogN && isAN2) {
            html += `<li><strong>Phân tích khoa học:</strong> ${algoB.name} áp dụng kỹ thuật tiệm cận O(N log N) giúp giải quyết bài toán nhanh hơn gấp bội so với cấu trúc vòng lặp lồng nhau O(N²) của ${algoA.name}.</li>`;
        } else if (isANLogN && isBNLogN) {
            html += `<li><strong>Phân tích khoa học:</strong> Cả hai đều thuộc nhóm thuật toán tối ưu tiệm cận O(N log N). Chênh lệch thực tế đến từ <em>hằng số ẩn (hidden constant factor)</em>, tối ưu phân hoạch trên bộ nhớ đệm CPU (Cache Locality), và chiến lược chọn pivot hoặc chia run.</li>`;
        } else {
            html += `<li><strong>Phân tích khoa học:</strong> Cả hai đều thuộc nhóm thuật toán cơ bản, hiệu năng thực tế phụ thuộc mật thiết vào thứ tự ngẫu nhiên ban đầu của dữ liệu và chi phí thực hiện mỗi bước hoán đổi.</li>`;
        }
        html += `</ul>`;

        // 3. Phân tích chi phí thao tác: So sánh vs Hoán đổi
        html += `<h5>2. Về chi phí so sánh & hoán đổi (Comparisons vs Swaps):</h5><ul>`;
        html += `<li><strong>Số phép so sánh:</strong> ${algoA.name} thực hiện <strong>${compA}</strong> lần | ${algoB.name} thực hiện <strong>${compB}</strong> lần.</li>`;
        html += `<li><strong>Số lần đổi chỗ (Writes / Swaps):</strong> ${algoA.name} thực hiện <strong>${swapA}</strong> lần | ${algoB.name} thực hiện <strong>${swapB}</strong> lần.</li>`;
        if (swapA < swapB && compA >= compB) {
            html += `<li><em>Nhận xét:</em> ${algoA.name} chấp nhận so sánh nhiều hơn để giảm thiểu số lần ghi/đổi chỗ trên bộ nhớ, rất phù hợp cho bộ nhớ Flash hoặc EEPROM có giới hạn số lần ghi (Write Cycles).</li>`;
        } else if (swapB < swapA && compB >= compA) {
            html += `<li><em>Nhận xét:</em> ${algoB.name} tối ưu số lần ghi/đổi chỗ trên bộ nhớ, giúp bảo vệ tuổi thọ các thiết bị lưu trữ Flash/SSD.</li>`;
        }
        html += `</ul>`;

        // 4. Đánh đổi tài nguyên bộ nhớ (Space Complexity) & Độ ổn định (Stability)
        html += `<h5>3. Về bộ nhớ RAM & Tính ổn định:</h5><ul>`;
        html += `<li><strong>Bộ nhớ phụ:</strong> ${algoA.name} tốn <code>${algoA.complexity.space}</code> RAM | ${algoB.name} tốn <code>${algoB.complexity.space}</code> RAM.</li>`;
        html += `<li><strong>Tính ổn định:</strong> ${algoA.name} (<strong>${algoA.complexity.stable}</strong>) | ${algoB.name} (<strong>${algoB.complexity.stable}</strong>).</li>`;
        html += `</ul>`;

        // 5. Khuyến nghị thực tế
        html += `<h5>💡 Khuyến nghị ứng dụng thực tế:</h5><ul>`;
        if (algoA.id === "intro_sort" || algoB.id === "intro_sort") {
            html += `<li><strong>IntroSort:</strong> Là sự lựa chọn mặc định của thư viện chuẩn C++ <code>std::sort</code>. Tốc độ cực nhanh như QuickSort nhưng đảm bảo không bao giờ bị rơi vào trường hợp xấu nhất O(N²) nhờ cơ chế tự chuyển sang HeapSort.</li>`;
        }
        if (algoA.id === "tim_sort" || algoB.id === "tim_sort") {
            html += `<li><strong>TimSort:</strong> Thuật toán chuẩn trong Python (<code>list.sort()</code>) và Java (<code>Arrays.sort()</code>). Cực kỳ ổn định và đạt tốc độ không tưởng O(N) khi dữ liệu trong thực tế đã có sẵn các chuỗi tăng/giảm một phần.</li>`;
        }
        if (algoA.id === "quick_sort" || algoB.id === "quick_sort") {
            html += `<li><strong>QuickSort:</strong> Lựa chọn hàng đầu cho dữ liệu mảng nguyên thủy (primitive arrays) khi cần tốc độ tối đa và dung lượng RAM khiêm tốn O(log N).</li>`;
        }
        if (algoA.id === "merge_sort" || algoB.id === "merge_sort") {
            html += `<li><strong>MergeSort:</strong> Cần thiết khi bắt buộc phải bảo toàn tính ổn định (Stable) hoặc sắp xếp danh sách liên kết (Linked List), xử lý dữ liệu lớn ngoài đĩa cứng (External Sorting).</li>`;
        }
        if (algoA.id === "heap_sort" || algoB.id === "heap_sort") {
            html += `<li><strong>HeapSort:</strong> Tuyệt vời cho các hệ thống nhúng, vi điều khiển (IoT) hoặc hệ điều hành thời gian thực (RTOS) nơi bộ nhớ RAM cực kỳ quý giá và cần đảm bảo trần thời gian O(N log N) tuyệt đối.</li>`;
        }
        html += `</ul>`;

        return html;
    }

    function showComparisonSummary() {
        if (!compareSummarySection) return;

        const idA = compareAlgoA ? compareAlgoA.value : "quick_sort";
        const idB = compareAlgoB ? compareAlgoB.value : "bubble_sort";
        const algoA = ALGORITHMS[idA];
        const algoB = ALGORITHMS[idB];
        if (!algoA || !algoB) return;

        compareSummarySection.style.display = "block";
        if (thAlgoA) thAlgoA.textContent = algoA.name;
        if (thAlgoB) thAlgoB.textContent = algoB.name;

        // Xác định bên thắng dựa trên thời gian, trạng thái thất bại và tổng số bước
        let winner = "tie";
        if (failedA && !failedB) {
            winner = "B";
        } else if (failedB && !failedA) {
            winner = "A";
        } else if (failedA && failedB) {
            winner = "tie";
        } else if (stepCountA < stepCountB) {
            winner = "A";
        } else if (stepCountB < stepCountA) {
            winner = "B";
        }

        const maxSteps = Math.max(stepCountA, stepCountB) || 1;
        const minSteps = Math.min(stepCountA, stepCountB) || 1;
        const stepDiff = Math.abs(stepCountA - stepCountB);
        const stepPct = ((stepDiff / maxSteps) * 100).toFixed(1);
        const stepRatio = (maxSteps / minSteps).toFixed(1);

        const maxComp = Math.max(compCountA, compCountB) || 1;
        const minComp = Math.min(compCountA, compCountB) || 1;
        const compDiff = Math.abs(compCountA - compCountB);
        const compPct = ((compDiff / maxComp) * 100).toFixed(1);
        const compRatio = (maxComp / minComp).toFixed(1);

        const maxSwap = Math.max(swapCountA, swapCountB) || 1;
        const minSwap = Math.min(swapCountA, swapCountB) || 1;
        const swapDiff = Math.abs(swapCountA - swapCountB);
        const swapPct = ((swapDiff / maxSwap) * 100).toFixed(1);
        const swapRatio = (maxSwap / minSwap).toFixed(1);

        const maxTime = Math.max(timeCountA, timeCountB) || 1;
        const minTime = Math.min(timeCountA, timeCountB) || 1;
        const timeRatio = (maxTime / minTime).toFixed(1);

        // Hiển thị Winner Announcement banner
        if (winner === "A") {
            const extraNote = failedB
                ? `Đối thủ <strong>${algoB.name}</strong> đã thất bại hoặc bị cưỡng chế dừng lại (STOP) do bùng nổ độ phức tạp O(N!)!`
                : `Về đích trước với ${timeCountA.toFixed(1)} ms &bull; Nhanh gấp <strong>${stepRatio}x</strong> về số bước thao tác so với ${algoB.name} (tiết kiệm ${stepPct}%).`;
            winnerAnnouncement.innerHTML = `
                <span class="winner-icon">🏆</span>
                <div>
                    <div>CHIẾN THẮNG TUYỆT ĐỐI: <span style="color:#7ee787;">${algoA.name}</span></div>
                    <div style="font-size: 0.88rem; font-weight: 500; color: var(--text-secondary); margin-top: 4px;">
                        ${extraNote}
                    </div>
                </div>
            `;
        } else if (winner === "B") {
            const extraNote = failedA
                ? `Đối thủ <strong>${algoA.name}</strong> đã thất bại hoặc bị cưỡng chế dừng lại (STOP) do bùng nổ độ phức tạp O(N!)!`
                : `Về đích trước với ${timeCountB.toFixed(1)} ms &bull; Nhanh gấp <strong>${stepRatio}x</strong> về số bước thao tác so với ${algoA.name} (tiết kiệm ${stepPct}%).`;
            winnerAnnouncement.innerHTML = `
                <span class="winner-icon">🏆</span>
                <div>
                    <div>CHIẾN THẮNG TUYỆT ĐỐI: <span style="color:#7ee787;">${algoB.name}</span></div>
                    <div style="font-size: 0.88rem; font-weight: 500; color: var(--text-secondary); margin-top: 4px;">
                        ${extraNote}
                    </div>
                </div>
            `;
        } else {
            const extraNote = (failedA && failedB)
                ? `Cả hai thuật toán đều thất bại hoặc bị dừng do vượt quá ngưỡng an toàn!`
                : `Cả hai thuật toán có tổng số bước và hiệu năng gần như tương đương trên tập dữ liệu này.`;
            winnerAnnouncement.innerHTML = `
                <span class="winner-icon">${(failedA && failedB) ? "🛑" : "🤝"}</span>
                <div>
                    <div>KẾT QUẢ: <span style="color:var(--accent-cyan);">${(failedA && failedB) ? "CẢ HAI ĐỀU DỪNG" : "HÒA NHAU"}</span></div>
                    <div style="font-size: 0.88rem; font-weight: 500; color: var(--text-secondary); margin-top: 4px;">
                        ${extraNote}
                    </div>
                </div>
            `;
        }

        // Tạo các hàng trong bảng so sánh
        const rows = [
            {
                metric: "Trạng thái hoàn thành",
                valA: failedA ? `<span style="color:#f85149; font-weight:700;">🛑 Dừng (Thất bại)</span>` : `<span style="color:#7ee787; font-weight:700;">✅ Thành công</span>`,
                valB: failedB ? `<span style="color:#f85149; font-weight:700;">🛑 Dừng (Thất bại)</span>` : `<span style="color:#7ee787; font-weight:700;">✅ Thành công</span>`,
                win: failedA && !failedB ? "B" : (failedB && !failedA ? "A" : "none"),
                diff: (failedA || failedB) ? "Bùng nổ O(N!)" : "Cả hai đều sắp xếp đúng"
            },
            {
                metric: "Thời gian hoàn thành (ms)",
                valA: `${timeCountA.toFixed(1)} ms`,
                valB: `${timeCountB.toFixed(1)} ms`,
                win: timeCountA < timeCountB ? "A" : (timeCountB < timeCountA ? "B" : "none"),
                diff: timeRatio > 1.05 ? (timeCountA < timeCountB ? `A nhanh gấp ${timeRatio}x` : `B nhanh gấp ${timeRatio}x`) : "Tương đương"
            },
            {
                metric: "Tổng số bước thực thi",
                valA: stepCountA,
                valB: stepCountB,
                win: stepCountA < stepCountB ? "A" : (stepCountB < stepCountA ? "B" : "none"),
                diff: stepRatio > 1.05 ? (stepCountA < stepCountB ? `A ít hơn ${stepPct}% (${stepRatio}x)` : `B ít hơn ${stepPct}% (${stepRatio}x)`) : "Ngang nhau"
            },
            {
                metric: "Số phép so sánh",
                valA: compCountA,
                valB: compCountB,
                win: compCountA < compCountB ? "A" : (compCountB < compCountA ? "B" : "none"),
                diff: compRatio > 1.05 ? (compCountA < compCountB ? `A ít hơn ${compPct}%` : `B ít hơn ${compPct}%`) : "Ngang nhau"
            },
            {
                metric: "Số lần đổi chỗ / ghi nhớ",
                valA: swapCountA,
                valB: swapCountB,
                win: swapCountA < swapCountB ? "A" : (swapCountB < swapCountA ? "B" : "none"),
                diff: swapRatio > 1.05 ? (swapCountA < swapCountB ? `A ít hơn ${swapPct}%` : `B ít hơn ${swapPct}%`) : "Ngang nhau"
            },
            {
                metric: "Độ phức tạp Thời gian (Trung bình)",
                valA: algoA.complexity.avg,
                valB: algoB.complexity.avg,
                win: "none",
                diff: "Lý thuyết giải thuật"
            },
            {
                metric: "Độ phức tạp Thời gian (Tốt nhất)",
                valA: algoA.complexity.best,
                valB: algoB.complexity.best,
                win: "none",
                diff: "Khi dữ liệu lý tưởng"
            },
            {
                metric: "Độ phức tạp Thời gian (Xấu nhất)",
                valA: algoA.complexity.worst,
                valB: algoB.complexity.worst,
                win: "none",
                diff: "Trường hợp xấu nhất"
            },
            {
                metric: "Bộ nhớ phụ (RAM Space)",
                valA: algoA.complexity.space,
                valB: algoB.complexity.space,
                win: algoA.complexity.space === "O(1)" && algoB.complexity.space !== "O(1)" ? "A" : (algoB.complexity.space === "O(1)" && algoA.complexity.space !== "O(1)" ? "B" : "none"),
                diff: "Chi phí bộ nhớ RAM"
            },
            {
                metric: "Tính ổn định (Stable)",
                valA: algoA.complexity.stable,
                valB: algoB.complexity.stable,
                win: algoA.complexity.stable === "Có" && algoB.complexity.stable !== "Có" ? "A" : (algoB.complexity.stable === "Có" && algoA.complexity.stable !== "Có" ? "B" : "none"),
                diff: "Bảo toàn thứ tự bằng nhau"
            }
        ];

        compareSummaryTableBody.innerHTML = "";
        rows.forEach(r => {
            const tr = document.createElement("tr");

            const tdMetric = document.createElement("td");
            tdMetric.innerHTML = `<strong>${r.metric}</strong>`;

            const tdA = document.createElement("td");
            tdA.innerHTML = r.win === "A" ? `<span class="winner-cell">${r.valA}</span> <span class="winner-pill">Tốt hơn</span>` : `${r.valA}`;

            const tdB = document.createElement("td");
            tdB.innerHTML = r.win === "B" ? `<span class="winner-cell">${r.valB}</span> <span class="winner-pill">Tốt hơn</span>` : `${r.valB}`;

            const tdDiff = document.createElement("td");
            const diffClass = r.diff.includes("nhanh hơn") || r.diff.includes("ít hơn") ? "diff-better" : "diff-equal";
            tdDiff.innerHTML = `<span class="diff-badge ${diffClass}">${r.diff}</span>`;

            tr.appendChild(tdMetric);
            tr.appendChild(tdA);
            tr.appendChild(tdB);
            tr.appendChild(tdDiff);
            compareSummaryTableBody.appendChild(tr);
        });

        // Tạo nội dung kết luận khoa học
        const metrics = {
            winner,
            timeA: timeCountA,
            timeB: timeCountB,
            compA: compCountA,
            compB: compCountB,
            swapA: swapCountA,
            swapB: swapCountB,
            stepA: stepCountA,
            stepB: stepCountB,
            stepPct, stepRatio,
            compPct, compRatio,
            swapPct, swapRatio,
            timeRatio
        };

        conclusionBody.innerHTML = generateConclusionReport(algoA, algoB, metrics);

        // Cuộn mượt mà xuống bảng kết quả
        compareSummarySection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Event listeners cho Tab 3
    if (btnComparePlay) {
        btnComparePlay.addEventListener("click", () => {
            if (isComparePlaying) {
                pauseCompareSimulation();
            } else {
                playCompareSimulation();
            }
        });
    }

    if (btnCompareStep) {
        btnCompareStep.addEventListener("click", () => {
            pauseCompareSimulation();
            stepCompareSimulation();
        });
    }

    if (btnCompareReset) {
        btnCompareReset.addEventListener("click", () => {
            resetCompareSimulation();
        });
    }

    if (compareAlgoA) {
        compareAlgoA.addEventListener("change", () => {
            resetCompareSimulation();
        });
    }

    if (compareAlgoB) {
        compareAlgoB.addEventListener("change", () => {
            resetCompareSimulation();
        });
    }

    if (compareArrayInput) {
        compareArrayInput.addEventListener("change", () => {
            resetCompareSimulation();
        });
    }

    comparePresetButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const presetKey = btn.dataset.preset;
            const presetVal = COMPARE_PRESETS[presetKey];
            if (presetVal && compareArrayInput) {
                compareArrayInput.value = typeof presetVal === "function" ? presetVal() : presetVal;
                resetCompareSimulation();
            }
        });
    });

    // --------------------------------------------------------------------------
    // INITIALIZATION
    // --------------------------------------------------------------------------
    populateBigDataAlgoSelect();
    populateCompareAlgoSelects();
    renderEncyclopediaCards();
    resetSimulation();
    resetCompareSimulation();
});
