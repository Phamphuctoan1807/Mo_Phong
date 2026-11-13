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
            if (activeIndices.includes(idx)) {
                if (type === "compare") col.classList.add("comparing");
                else if (type === "swap") col.classList.add("swapping");
                else if (type === "pivot") col.classList.add("pivot");
                else if (type === "sorted") col.classList.add("sorted");
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
        soLuotThu: "lượt_thử"
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
    function resetSimulation() {
        pauseSimulation();
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
        renderCodeSnippet(currentAlgoId);
    }

    function stepSimulation() {
        if (!generatorInstance) {
            resetSimulation();
        }

        const nextStep = generatorInstance.next();
        if (nextStep.done) {
            pauseSimulation();
            highlightCodeLine(null);
            explanationText.innerHTML = `🎉 <strong>Hoàn thành!</strong> Dãy số đã được sắp xếp tăng dần chính xác.`;
            renderBars(currentArray, currentArray.map((_, i) => i), "sorted");
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
        highlightCodeLine(step.line);
        if (step.explanation) {
            explanationText.innerHTML = `👉 <strong>Bước ${stepsCount}:</strong> ${step.explanation}`;
        }
        updateVariableWatcher(step.vars);

        return true;
    }

    function getDelay() {
        // Slider min=20 (nhanh), max=1000 (chậm)
        // Nghịch đảo để kéo sang phải là chạy nhanh
        const val = parseInt(speedSlider.value, 10);
        return 1020 - val;
    }

    function playSimulation() {
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
        duplicates: "15, -10, 25, 15, -10, 40, 25, 15, -10, 50, 40, -10"
    };

    presetButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const presetKey = btn.dataset.preset;
            const presetVal = PRESETS[presetKey];
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
    // INITIALIZATION
    // --------------------------------------------------------------------------
    renderEncyclopediaCards();
    resetSimulation();
});
