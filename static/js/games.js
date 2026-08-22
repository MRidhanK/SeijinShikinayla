/* =========================================================
   NAYLA FESTIVAL BOOTH
   COMPLETE GAME JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       PRODUCTS
    ====================================================== */

    const PRODUCTS = [

        {
            id: "balloon",
            name: "Balon",
            emoji: "🎈",
            price: 15000
        },

        {
            id: "flower",
            name: "Bunga",
            emoji: "🌸",
            price: 20000
        },

        {
            id: "teddy",
            name: "Boneka",
            emoji: "🧸",
            price: 35000
        },

        {
            id: "gift",
            name: "Hadiah",
            emoji: "🎁",
            price: 40000
        },

        {
            id: "candy",
            name: "Permen",
            emoji: "🍭",
            price: 10000
        },

        {
            id: "fan",
            name: "Kipas",
            emoji: "🪭",
            price: 18000
        }

    ];


    /* =====================================================
       CUSTOMERS
    ====================================================== */

    const CUSTOMERS = [

        {
            name: "Kaito",
            avatar: "👨🏻"
        },

        {
            name: "Mika",
            avatar: "👩🏻"
        },

        {
            name: "Rina",
            avatar: "👩🏼"
        },

        {
            name: "Haru",
            avatar: "👨🏻‍🦱"
        },

        {
            name: "Yuki",
            avatar: "👩🏻‍🦰"
        },

        {
            name: "Sora",
            avatar: "👨🏻"
        }

    ];


    /* =====================================================
       STATE
    ====================================================== */

    const state = {

        isOpen: false,

        score: 0,

        money: 0,

        combo: 0,

        customersServed: 0,

        timeLeft: 60,

        timer: null,

        customerTimer: null,

        currentCustomer: null,

        currentOrder: null,

        preparation: {},

        prices: {},

        gameOver: false,

        busy: false

    };


    /* =====================================================
       INITIAL PRICE
    ====================================================== */

    PRODUCTS.forEach(product => {

        state.prices[product.id] =
            product.price;

    });


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const $ = id =>
        document.getElementById(id);


    const openBoothButton =
        $("openBoothButton");

    const priceSettingsButton =
        $("priceSettingsButton");

    const startGameButton =
        $("startGameButton");

    const boothStartOverlay =
        $("boothStartOverlay");

    const customer =
        $("customer");

    const customerAvatar =
        $("customerAvatar");

    const customerName =
        $("customerName");

    const customerRequest =
        $("customerRequest");

    const requestItems =
        $("requestItems");

    const requestTotal =
        $("requestTotal");

    const preparationItems =
        $("preparationItems");

    const preparationStatus =
        $("preparationStatus");

    const serveButton =
        $("serveButton");

    const clearPreparationButton =
        $("clearPreparationButton");

    const productsGrid =
        $("productsGrid");

    const priceList =
        $("priceList");

    const priceModal =
        $("priceModal");

    const modalPriceList =
        $("modalPriceList");

    const closePriceModal =
        $("closePriceModal");

    const cancelPriceButton =
        $("cancelPriceButton");

    const savePriceButton =
        $("savePriceButton");

    const completionPopup =
        $("completionPopup");

    const closeCompletionButton =
        $("closeCompletionButton");

    const popupScore =
        $("popupScore");

    const popupMoney =
        $("popupMoney");

    const completionText =
        $("completionText");

    const gameMessage =
        $("gameMessage");


    /* =====================================================
       HELPERS
    ====================================================== */

    function formatMoney(value) {

        return "Rp " +
            Number(value || 0)
                .toLocaleString("id-ID");

    }


    function randomFrom(array) {

        return array[
            Math.floor(
                Math.random() * array.length
            )
        ];

    }


    function randomInt(min, max) {

        return Math.floor(
            Math.random() *
            (max - min + 1)
        ) + min;

    }


    function findProduct(id) {

        return PRODUCTS.find(
            product =>
                product.id === id
        );

    }


    /* =====================================================
       SCOREBOARD
    ====================================================== */

    function updateScoreboard() {

        $("scoreValue").textContent =
            state.score.toLocaleString("id-ID");

        $("moneyValue").textContent =
            formatMoney(state.money);

        $("comboValue").textContent =
            "x" + state.combo;

        $("customerValue").textContent =
            state.customersServed;

        $("timerValue").textContent =
            state.timeLeft;

        if (state.timeLeft <= 10) {

            $("timerValue").style.color =
                "#ff5470";

        } else {

            $("timerValue").style.color =
                "";

        }

    }


    /* =====================================================
       MESSAGE
    ====================================================== */

    let messageTimeout = null;

    function showMessage(text) {

        if (!gameMessage) return;

        gameMessage.textContent =
            text;

        gameMessage.classList.add(
            "show"
        );

        clearTimeout(
            messageTimeout
        );

        messageTimeout =
            setTimeout(() => {

                gameMessage.classList.remove(
                    "show"
                );

            }, 1800);

    }


    /* =====================================================
       PRODUCTS UI
    ====================================================== */

    function renderProducts() {

        productsGrid.innerHTML = "";

        PRODUCTS.forEach(product => {

            const card =
                document.createElement("button");

            card.type =
                "button";

            card.className =
                "product-card";

            card.dataset.productId =
                product.id;

            const quantity =
                state.preparation[
                    product.id
                ] || 0;

            if (
                state.currentOrder &&
                !state.currentOrder[
                    product.id
                ]
            ) {

                card.classList.add(
                    "not-requested"
                );

            }

            if (quantity > 0) {

                card.classList.add(
                    "selected"
                );

            }

            card.innerHTML = `

                <span class="product-icon">
                    ${product.emoji}
                </span>

                <div class="product-name">
                    ${product.name}
                </div>

                <div class="product-price">
                    ${formatMoney(
                        state.prices[product.id]
                    )}
                </div>

                ${
                    quantity > 0
                    ? `
                        <span class="product-quantity">
                            ${quantity}
                        </span>
                    `
                    : ""
                }

            `;

            card.addEventListener(
                "click",
                () => {

                    prepareProduct(
                        product.id
                    );

                }
            );

            productsGrid.appendChild(
                card
            );

        });

    }


    /* =====================================================
       PRICE LIST
    ====================================================== */

    function renderPriceList() {

        priceList.innerHTML = "";

        PRODUCTS.forEach(product => {

            const row =
                document.createElement("div");

            row.className =
                "price-row";

            row.innerHTML = `

                <div class="price-row-left">

                    <span class="price-row-icon">
                        ${product.emoji}
                    </span>

                    <span class="price-row-name">
                        ${product.name}
                    </span>

                </div>

                <span class="price-row-value">
                    ${formatMoney(
                        state.prices[product.id]
                    )}
                </span>

            `;

            priceList.appendChild(
                row
            );

        });

    }


    /* =====================================================
       PRICE MODAL
    ====================================================== */

    function openPriceModal() {

        modalPriceList.innerHTML = "";

        PRODUCTS.forEach(product => {

            const row =
                document.createElement("div");

            row.className =
                "modal-price-row";

            row.innerHTML = `

                <div class="modal-price-info">

                    <span>
                        ${product.emoji}
                    </span>

                    <strong>
                        ${product.name}
                    </strong>

                </div>

                <input
                    class="price-input"
                    type="number"
                    min="1000"
                    step="1000"
                    data-price-id="${product.id}"
                    value="${state.prices[product.id]}"
                >

            `;

            modalPriceList.appendChild(
                row
            );

        });

        priceModal.classList.add(
            "show"
        );

    }


    function closePriceModalWindow() {

        priceModal.classList.remove(
            "show"
        );

    }


    function savePrices() {

        const inputs =
            modalPriceList.querySelectorAll(
                ".price-input"
            );

        inputs.forEach(input => {

            const id =
                input.dataset.priceId;

            let value =
                Number(input.value);

            if (
                !Number.isFinite(value) ||
                value < 1000
            ) {

                value = 1000;

            }

            value =
                Math.round(value / 1000) *
                1000;

            state.prices[id] =
                value;

        });

        renderPriceList();

        renderProducts();

        closePriceModalWindow();

        showMessage(
            "Harga barang berhasil diperbarui."
        );

    }


    /* =====================================================
       CREATE ORDER
    ====================================================== */

    function createOrder() {

        const order = {};

        /*
         * Customer meminta 1 sampai 3
         * jenis barang.
         */

        const shuffled =
            [...PRODUCTS]
                .sort(
                    () =>
                        Math.random() - .5
                );

        const itemCount =
            randomInt(1, 3);

        const selected =
            shuffled.slice(
                0,
                itemCount
            );


        selected.forEach(product => {

            order[product.id] =
                randomInt(1, 2);

        });


        return order;

    }


    /* =====================================================
       ORDER TOTAL
    ====================================================== */

    function getOrderTotal(order) {

        let total = 0;

        Object.entries(order)
            .forEach(([id, quantity]) => {

                total +=
                    (
                        state.prices[id] || 0
                    ) * quantity;

            });

        return total;

    }


    /* =====================================================
       RENDER CUSTOMER REQUEST
    ====================================================== */

    function renderCustomerRequest() {

        if (
            !state.currentOrder
        ) {

            customerRequest.classList.remove(
                "visible"
            );

            return;

        }


        requestItems.innerHTML = "";


        Object.entries(
            state.currentOrder
        ).forEach(
            ([id, quantity]) => {

                const product =
                    findProduct(id);

                if (!product) return;

                const item =
                    document.createElement("div");

                item.className =
                    "request-item";

                item.innerHTML = `

                    <span>
                        ${product.emoji}
                    </span>

                    <span>
                        ${product.name}
                    </span>

                    <strong>
                        ×${quantity}
                    </strong>

                `;

                requestItems.appendChild(
                    item
                );

            }
        );


        requestTotal.textContent =
            formatMoney(
                getOrderTotal(
                    state.currentOrder
                )
            );


        customerRequest.classList.add(
            "visible"
        );

    }


    /* =====================================================
       PREPARATION
    ====================================================== */

    function clearPreparation() {

        state.preparation = {};

        renderPreparation();

        renderProducts();

    }


    function prepareProduct(productId) {

        if (!state.isOpen) {

            showMessage(
                "Buka booth terlebih dahulu."
            );

            return;

        }


        if (!state.currentCustomer) {

            showMessage(
                "Belum ada customer."
            );

            return;

        }


        const requestedQuantity =
            state.currentOrder[
                productId
            ] || 0;


        if (requestedQuantity <= 0) {

            showMessage(
                "Customer tidak meminta barang ini."
            );

            return;

        }


        const currentQuantity =
            state.preparation[
                productId
            ] || 0;


        if (
            currentQuantity >=
            requestedQuantity
        ) {

            showMessage(
                "Jumlah barang ini sudah cukup."
            );

            return;

        }


        state.preparation[
            productId
        ] =
            currentQuantity + 1;


        renderPreparation();

        renderProducts();

    }


    function renderPreparation() {

        preparationItems.innerHTML = "";


        if (
            !state.currentOrder
        ) {

            preparationItems.innerHTML = `

                <div class="empty-tray">
                    Menunggu customer...
                </div>

            `;

            preparationStatus.textContent =
                "Belum ada pesanan";

            preparationStatus.classList.remove(
                "ready"
            );

            serveButton.disabled =
                true;

            return;

        }


        const entries =
            Object.entries(
                state.preparation
            );


        if (entries.length === 0) {

            preparationItems.innerHTML = `

                <div class="empty-tray">
                    Pilih barang sesuai pesanan customer
                </div>

            `;

        }


        entries.forEach(
            ([id, quantity]) => {

                if (quantity <= 0) return;

                const product =
                    findProduct(id);

                if (!product) return;

                const item =
                    document.createElement("div");

                item.className =
                    "prepared-item";

                item.innerHTML = `

                    <span>
                        ${product.emoji}
                    </span>

                    <span>
                        ${product.name}
                    </span>

                    <strong>
                        ×${quantity}
                    </strong>

                `;

                preparationItems.appendChild(
                    item
                );

            }
        );


        const ready =
            isPreparationCorrect();


        if (ready) {

            preparationStatus.textContent =
                "✓ Pesanan siap disajikan";

            preparationStatus.classList.add(
                "ready"
            );

        } else {

            preparationStatus.textContent =
                "Siapkan semua barang";

            preparationStatus.classList.remove(
                "ready"
            );

        }


        serveButton.disabled =
            !ready;

    }


    /* =====================================================
       CHECK ORDER
    ====================================================== */

    function isPreparationCorrect() {

        if (
            !state.currentOrder
        ) {

            return false;

        }


        const orderKeys =
            Object.keys(
                state.currentOrder
            );


        const prepKeys =
            Object.keys(
                state.preparation
            )
                .filter(
                    id =>
                        state.preparation[id] > 0
                );


        if (
            orderKeys.length !==
            prepKeys.length
        ) {

            return false;

        }


        for (
            const id of orderKeys
        ) {

            if (
                state.preparation[id] !==
                state.currentOrder[id]
            ) {

                return false;

            }

        }


        return true;

    }


    /* =====================================================
       CREATE CUSTOMER
    ====================================================== */

    function createCustomer() {

        if (
            state.gameOver ||
            !state.isOpen
        ) {

            return;

        }


        state.busy =
            true;


        const data =
            randomFrom(
                CUSTOMERS
            );


        state.currentCustomer = data;

        state.currentOrder =
            createOrder();

        state.preparation = {};


        customerName.textContent =
            data.name;

        customerAvatar.textContent =
            data.avatar;


        /*
         * Customer mulai dari kiri.
         */

        customer.classList.remove(
            "customer-hidden"
        );

        customer.classList.remove(
            "customer-at-booth"
        );

        customer.classList.add(
            "customer-entering"
        );


        /*
         * Pastikan request
         * langsung tersedia.
         */

        renderCustomerRequest();

        renderPreparation();

        renderProducts();


        /*
         * Setelah sedikit delay,
         * customer berjalan ke booth.
         */

        requestAnimationFrame(() => {

            setTimeout(() => {

                if (
                    !state.currentCustomer
                ) return;

                customer.classList.add(
                    "customer-at-booth"
                );

            }, 150);

        });

    }


    /* =====================================================
       REMOVE CUSTOMER
    ====================================================== */

    function removeCustomer() {

        customerRequest.classList.remove(
            "visible"
        );

        customer.classList.remove(
            "customer-at-booth"
        );

        customer.classList.remove(
            "customer-entering"
        );

        setTimeout(() => {

            customer.classList.add(
                "customer-hidden"
            );

        }, 450);


        state.currentCustomer =
            null;

        state.currentOrder =
            null;

        state.preparation =
            {};

        renderPreparation();

        renderProducts();

    }


    /* =====================================================
       NEXT CUSTOMER
    ====================================================== */

    function nextCustomer() {

        if (
            !state.isOpen ||
            state.gameOver
        ) {

            return;

        }


        setTimeout(() => {

            createCustomer();

        }, 900);

    }


    /* =====================================================
       SERVE
    ====================================================== */

    function serveCustomer() {

        if (
            !state.currentCustomer
        ) {

            showMessage(
                "Belum ada customer."
            );

            return;

        }


        if (
            !isPreparationCorrect()
        ) {

            showMessage(
                "Pesanan belum sesuai."
            );

            return;

        }


        const total =
            getOrderTotal(
                state.currentOrder
            );


        /*
         * Score berdasarkan nilai order.
         */

        const baseScore =
            Math.max(
                10,
                Math.round(
                    total / 1000
                )
            );


        const comboBonus =
            state.combo * 5;


        const earnedScore =
            baseScore +
            comboBonus;


        state.score +=
            earnedScore;

        state.money +=
            total;

        state.combo += 1;

        state.customersServed += 1;


        updateScoreboard();


        /*
         * Tampilkan popup.
         */

        popupScore.textContent =
            "+" +
            earnedScore;

        popupMoney.textContent =
            formatMoney(total);

        completionText.textContent =
            `Pesanan ${state.currentCustomer.name} berhasil disajikan.`;


        completionPopup.classList.add(
            "show"
        );


        /*
         * Customer dihapus setelah
         * popup dibuka.
         */

        removeCustomer();

        state.busy =
            false;


        /*
         * Customer berikutnya
         * muncul setelah popup ditutup.
         */

    }


    /* =====================================================
       TIMER
    ====================================================== */

    function startTimer() {

        clearInterval(
            state.timer
        );


        state.timer =
            setInterval(() => {

                if (
                    !state.isOpen ||
                    state.gameOver
                ) {

                    return;

                }


                state.timeLeft--;

                updateScoreboard();


                if (
                    state.timeLeft <= 0
                ) {

                    endGame();

                }

            }, 1000);

    }


    /* =====================================================
       END GAME
    ====================================================== */

    function endGame() {

        state.gameOver =
            true;

        state.isOpen =
            false;

        clearInterval(
            state.timer
        );


        if (
            state.customerTimer
        ) {

            clearTimeout(
                state.customerTimer
            );

        }


        removeCustomer();


        completionText.textContent =
            `Waktu habis! Score akhir kamu ${state.score}.`;


        popupScore.textContent =
            state.score;


        popupMoney.textContent =
            formatMoney(
                state.money
            );


        completionPopup.classList.add(
            "show"
        );


        openBoothButton.textContent =
            "🏪 BUKA BOOTH";

    }


    /* =====================================================
       START GAME
    ====================================================== */

    function startGame() {

        state.isOpen =
            true;

        state.gameOver =
            false;

        state.busy =
            false;

        state.score =
            0;

        state.money =
            0;

        state.combo =
            0;

        state.customersServed =
            0;

        state.timeLeft =
            60;

        state.currentCustomer =
            null;

        state.currentOrder =
            null;

        state.preparation =
            {};


        updateScoreboard();

        renderProducts();

        renderPreparation();


        boothStartOverlay.classList.add(
            "hidden"
        );


        openBoothButton.textContent =
            "🔴 BOOTH AKTIF";


        showMessage(
            "Booth dibuka! Menunggu customer..."
        );


        startTimer();


        /*
         * Customer pertama.
         */

        setTimeout(() => {

            createCustomer();

        }, 700);

    }


    /* =====================================================
       OPEN / CLOSE BOOTH
    ====================================================== */

    function toggleBooth() {

        if (state.isOpen) {

            /*
             * Jangan tutup ketika
             * sedang ada order.
             */

            if (
                state.currentCustomer
            ) {

                showMessage(
                    "Selesaikan pesanan customer dulu."
                );

                return;

            }


            state.isOpen =
                false;

            clearInterval(
                state.timer
            );

            openBoothButton.textContent =
                "🏪 BUKA BOOTH";

            showMessage(
                "Booth ditutup."
            );

            return;

        }


        startGame();

    }


    /* =====================================================
       EVENTS
    ====================================================== */

    startGameButton.addEventListener(
        "click",
        startGame
    );


    openBoothButton.addEventListener(
        "click",
        toggleBooth
    );


    priceSettingsButton.addEventListener(
        "click",
        openPriceModal
    );


    closePriceModal.addEventListener(
        "click",
        closePriceModalWindow
    );


    cancelPriceButton.addEventListener(
        "click",
        closePriceModalWindow
    );


    savePriceButton.addEventListener(
        "click",
        savePrices
    );


    clearPreparationButton.addEventListener(
        "click",
        () => {

            clearPreparation();

            showMessage(
                "Preparation tray dikosongkan."
            );

        }
    );


    serveButton.addEventListener(
        "click",
        serveCustomer
    );


    closeCompletionButton.addEventListener(
        "click",
        () => {

            completionPopup.classList.remove(
                "show"
            );


            if (
                state.gameOver
            ) {

                boothStartOverlay.classList.remove(
                    "hidden"
                );

                openBoothButton.textContent =
                    "🏪 BUKA BOOTH";

                return;

            }


            /*
             * Setelah popup ditutup,
             * customer berikutnya datang.
             */

            nextCustomer();

        }
    );


    /*
     * Klik background modal
     * untuk menutup.
     */

    priceModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                priceModal
            ) {

                closePriceModalWindow();

            }

        }
    );


    /* =====================================================
       INITIAL RENDER
    ====================================================== */

    renderProducts();

    renderPriceList();

    renderPreparation();

    updateScoreboard();


});