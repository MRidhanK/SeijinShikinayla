/* =========================================================
   NAYLA FESTIVAL BOOTH
   COMPLETE GAME JS + I18N SYSTEM
========================================================= */

"use strict";


/* =========================================================
   00. TRANSLATIONS
   (Pola sama seperti gallery.js -> GALLERY_TRANSLATIONS)
========================================================= */

const BOOTH_TRANSLATIONS = {

    /* =====================================================
       INDONESIAN
       ===================================================== */

    id: {
        booth: {

            header_eyebrow: "NAYLA FESTIVAL · SEIJIN SHIKI 2026",
            header_title: "🎪 Nayla Festival Booth",
            header_description:
                "Siapkan pesanan customer dan layani mereka untuk mendapatkan score dan money.",

            btn_open_booth: "🏪 BUKA BOOTH",
            btn_open_booth_active: "🔴 BOOTH AKTIF",
            btn_price_settings: "⚙️ ATUR HARGA",

            stat_score: "SCORE",
            stat_money: "MONEY",
            stat_combo: "COMBO",
            stat_customers: "CUSTOMERS",
            stat_time: "TIME",

            roof_text: "NAYLA FESTIVAL BOOTH",

            request_title: "🛍️ PESANAN CUSTOMER",
            customer_default_name: "Customer",

            start_eyebrow: "NAYLA FESTIVAL",
            start_title: "Nayla Festival Booth",
            start_description:
                "Kamu bertugas sebagai penjaga booth. Customer akan datang dan memesan barang. Siapkan barang yang mereka minta, lalu tekan serve.",
            start_button: "🎪 BUKA BOOTH & MULAI",

            prep_kicker: "BOOTH WORKSPACE",
            prep_title: "🧺 Preparation Tray",
            prep_status_empty: "Belum ada pesanan",
            prep_status_waiting_customer: "Menunggu customer...",
            prep_status_ready: "✓ Pesanan siap disajikan",
            prep_status_need_all: "Siapkan semua barang",
            prep_placeholder: "Pilih barang sesuai pesanan customer",

            btn_clear: "↺ CLEAR",
            btn_serve: "✓ SERVE CUSTOMER",

            inventory_kicker: "INVENTORY",
            inventory_title: "🛍️ Produk Booth",
            inventory_hint: "Klik produk untuk menyiapkan order",

            price_kicker: "CURRENT PRICE",
            price_title: "💰 Harga",
            price_hint: "Bisa diatur",

            modal_kicker: "BOOTH SETTINGS",
            modal_title: "⚙️ Atur Harga Barang",
            btn_cancel: "BATAL",
            btn_save: "SIMPAN HARGA",

            completion_label: "PESANAN SELESAI",
            completion_title: "Customer Senang! 🎉",
            completion_default_text: "Pesanan berhasil disajikan.",
            completion_served_text: "Pesanan {name} berhasil disajikan.",
            completion_timeup_text: "Waktu habis! Score akhir kamu {score}.",
            completion_score_label: "+SCORE",
            completion_money_label: "+MONEY",
            btn_continue: "LANJUTKAN",

            msg_open_first: "Buka booth terlebih dahulu.",
            msg_no_customer: "Belum ada customer.",
            msg_not_requested: "Customer tidak meminta barang ini.",
            msg_enough: "Jumlah barang ini sudah cukup.",
            msg_price_updated: "Harga barang berhasil diperbarui.",
            msg_tray_cleared: "Preparation tray dikosongkan.",
            msg_booth_opened: "Booth dibuka! Menunggu customer...",
            msg_booth_closed: "Booth ditutup.",
            msg_finish_order_first: "Selesaikan pesanan customer dulu.",
            msg_order_incomplete: "Pesanan belum sesuai.",

            product_balloon: "Balon",
            product_flower: "Bunga",
            product_teddy: "Boneka",
            product_gift: "Hadiah",
            product_candy: "Permen",
            product_fan: "Kipas"

        }
    },


    /* =====================================================
       ENGLISH
       ===================================================== */

    en: {
        booth: {

            header_eyebrow: "NAYLA FESTIVAL · SEIJIN SHIKI 2026",
            header_title: "🎪 Nayla Festival Booth",
            header_description:
                "Prepare customer orders and serve them to earn score and money.",

            btn_open_booth: "🏪 OPEN BOOTH",
            btn_open_booth_active: "🔴 BOOTH ACTIVE",
            btn_price_settings: "⚙️ SET PRICES",

            stat_score: "SCORE",
            stat_money: "MONEY",
            stat_combo: "COMBO",
            stat_customers: "CUSTOMERS",
            stat_time: "TIME",

            roof_text: "NAYLA FESTIVAL BOOTH",

            request_title: "🛍️ CUSTOMER ORDER",
            customer_default_name: "Customer",

            start_eyebrow: "NAYLA FESTIVAL",
            start_title: "Nayla Festival Booth",
            start_description:
                "You're in charge of the booth. Customers will arrive and order items. Prepare what they ask for, then press serve.",
            start_button: "🎪 OPEN BOOTH & START",

            prep_kicker: "BOOTH WORKSPACE",
            prep_title: "🧺 Preparation Tray",
            prep_status_empty: "No order yet",
            prep_status_waiting_customer: "Waiting for customer...",
            prep_status_ready: "✓ Order ready to serve",
            prep_status_need_all: "Prepare all items",
            prep_placeholder: "Pick items matching the customer's order",

            btn_clear: "↺ CLEAR",
            btn_serve: "✓ SERVE CUSTOMER",

            inventory_kicker: "INVENTORY",
            inventory_title: "🛍️ Booth Products",
            inventory_hint: "Click a product to prepare the order",

            price_kicker: "CURRENT PRICE",
            price_title: "💰 Prices",
            price_hint: "Adjustable",

            modal_kicker: "BOOTH SETTINGS",
            modal_title: "⚙️ Set Item Prices",
            btn_cancel: "CANCEL",
            btn_save: "SAVE PRICES",

            completion_label: "ORDER COMPLETE",
            completion_title: "Customer Happy! 🎉",
            completion_default_text: "Order served successfully.",
            completion_served_text: "{name}'s order was served successfully.",
            completion_timeup_text: "Time's up! Your final score is {score}.",
            completion_score_label: "+SCORE",
            completion_money_label: "+MONEY",
            btn_continue: "CONTINUE",

            msg_open_first: "Open the booth first.",
            msg_no_customer: "No customer yet.",
            msg_not_requested: "The customer didn't ask for this item.",
            msg_enough: "You already have enough of this item.",
            msg_price_updated: "Prices updated successfully.",
            msg_tray_cleared: "Preparation tray cleared.",
            msg_booth_opened: "Booth opened! Waiting for customers...",
            msg_booth_closed: "Booth closed.",
            msg_finish_order_first: "Finish the current order first.",
            msg_order_incomplete: "Order isn't complete yet.",

            product_balloon: "Balloon",
            product_flower: "Flower",
            product_teddy: "Teddy Bear",
            product_gift: "Gift",
            product_candy: "Candy",
            product_fan: "Fan"

        }
    },


    /* =====================================================
       JAPANESE
       ===================================================== */

    ja: {
        booth: {

            header_eyebrow: "NAYLA FESTIVAL · 成人式 2026",
            header_title: "🎪 ナイラ・フェスティバル・ブース",
            header_description:
                "お客様の注文を準備して接客し、スコアとお金を稼ごう。",

            btn_open_booth: "🏪 ブースを開く",
            btn_open_booth_active: "🔴 営業中",
            btn_price_settings: "⚙️ 価格設定",

            stat_score: "スコア",
            stat_money: "お金",
            stat_combo: "コンボ",
            stat_customers: "お客様",
            stat_time: "時間",

            roof_text: "NAYLA FESTIVAL BOOTH",

            request_title: "🛍️ お客様の注文",
            customer_default_name: "お客様",

            start_eyebrow: "NAYLA FESTIVAL",
            start_title: "ナイラ・フェスティバル・ブース",
            start_description:
                "あなたはブースの担当者です。お客様が来て商品を注文します。頼まれた商品を準備してからサーブを押してください。",
            start_button: "🎪 ブースを開いて開始",

            prep_kicker: "作業スペース",
            prep_title: "🧺 準備トレイ",
            prep_status_empty: "まだ注文がありません",
            prep_status_waiting_customer: "お客様を待っています...",
            prep_status_ready: "✓ 提供準備完了",
            prep_status_need_all: "すべての商品を準備してください",
            prep_placeholder: "お客様の注文に合わせて商品を選んでください",

            btn_clear: "↺ クリア",
            btn_serve: "✓ 提供する",

            inventory_kicker: "在庫",
            inventory_title: "🛍️ ブース商品",
            inventory_hint: "商品をクリックして注文を準備",

            price_kicker: "現在の価格",
            price_title: "💰 価格",
            price_hint: "変更可能",

            modal_kicker: "ブース設定",
            modal_title: "⚙️ 商品価格を設定",
            btn_cancel: "キャンセル",
            btn_save: "価格を保存",

            completion_label: "注文完了",
            completion_title: "お客様は満足！🎉",
            completion_default_text: "注文の提供が完了しました。",
            completion_served_text: "{name}様への提供が完了しました。",
            completion_timeup_text: "時間切れ！最終スコアは{score}です。",
            completion_score_label: "+スコア",
            completion_money_label: "+お金",
            btn_continue: "続ける",

            msg_open_first: "まずブースを開いてください。",
            msg_no_customer: "まだお客様がいません。",
            msg_not_requested: "お客様が注文していない商品です。",
            msg_enough: "この商品はすでに十分な数量です。",
            msg_price_updated: "価格を更新しました。",
            msg_tray_cleared: "準備トレイをクリアしました。",
            msg_booth_opened: "ブースを開きました！お客様を待っています...",
            msg_booth_closed: "ブースを閉じました。",
            msg_finish_order_first: "先に現在の注文を完了してください。",
            msg_order_incomplete: "注文がまだ揃っていません。",

            product_balloon: "風船",
            product_flower: "花",
            product_teddy: "テディベア",
            product_gift: "プレゼント",
            product_candy: "キャンディ",
            product_fan: "扇子"

        }
    },


    /* =====================================================
       KOREAN
       ===================================================== */

    ko: {
        booth: {

            header_eyebrow: "NAYLA FESTIVAL · 성인식 2026",
            header_title: "🎪 나일라 페스티벌 부스",
            header_description:
                "고객의 주문을 준비하고 응대하여 점수와 돈을 획득하세요.",

            btn_open_booth: "🏪 부스 열기",
            btn_open_booth_active: "🔴 영업 중",
            btn_price_settings: "⚙️ 가격 설정",

            stat_score: "점수",
            stat_money: "돈",
            stat_combo: "콤보",
            stat_customers: "고객 수",
            stat_time: "시간",

            roof_text: "NAYLA FESTIVAL BOOTH",

            request_title: "🛍️ 고객 주문",
            customer_default_name: "고객",

            start_eyebrow: "NAYLA FESTIVAL",
            start_title: "나일라 페스티벌 부스",
            start_description:
                "당신은 부스 담당자입니다. 고객이 찾아와 상품을 주문합니다. 요청한 상품을 준비한 뒤 서브 버튼을 누르세요.",
            start_button: "🎪 부스 열고 시작하기",

            prep_kicker: "부스 작업 공간",
            prep_title: "🧺 준비 트레이",
            prep_status_empty: "아직 주문이 없습니다",
            prep_status_waiting_customer: "고객을 기다리는 중...",
            prep_status_ready: "✓ 제공 준비 완료",
            prep_status_need_all: "모든 상품을 준비하세요",
            prep_placeholder: "고객 주문에 맞춰 상품을 선택하세요",

            btn_clear: "↺ 초기화",
            btn_serve: "✓ 고객에게 제공",

            inventory_kicker: "재고",
            inventory_title: "🛍️ 부스 상품",
            inventory_hint: "상품을 클릭해 주문을 준비하세요",

            price_kicker: "현재 가격",
            price_title: "💰 가격",
            price_hint: "조정 가능",

            modal_kicker: "부스 설정",
            modal_title: "⚙️ 상품 가격 설정",
            btn_cancel: "취소",
            btn_save: "가격 저장",

            completion_label: "주문 완료",
            completion_title: "고객이 만족했어요! 🎉",
            completion_default_text: "주문이 성공적으로 제공되었습니다.",
            completion_served_text: "{name}님의 주문이 성공적으로 제공되었습니다.",
            completion_timeup_text: "시간 종료! 최종 점수는 {score}입니다.",
            completion_score_label: "+점수",
            completion_money_label: "+돈",
            btn_continue: "계속하기",

            msg_open_first: "먼저 부스를 열어주세요.",
            msg_no_customer: "아직 고객이 없습니다.",
            msg_not_requested: "고객이 요청하지 않은 상품입니다.",
            msg_enough: "이 상품은 이미 충분한 수량입니다.",
            msg_price_updated: "가격이 성공적으로 업데이트되었습니다.",
            msg_tray_cleared: "준비 트레이가 초기화되었습니다.",
            msg_booth_opened: "부스가 열렸습니다! 고객을 기다리는 중...",
            msg_booth_closed: "부스가 닫혔습니다.",
            msg_finish_order_first: "먼저 현재 주문을 완료하세요.",
            msg_order_incomplete: "주문이 아직 완료되지 않았습니다.",

            product_balloon: "풍선",
            product_flower: "꽃",
            product_teddy: "테디베어",
            product_gift: "선물",
            product_candy: "사탕",
            product_fan: "부채"

        }
    },


    /* =====================================================
       CHINESE
       ===================================================== */

    zh: {
        booth: {

            header_eyebrow: "NAYLA FESTIVAL · 成人式 2026",
            header_title: "🎪 Nayla 庆典摊位",
            header_description:
                "准备顾客的订单并为他们服务，赚取分数和金钱。",

            btn_open_booth: "🏪 开启摊位",
            btn_open_booth_active: "🔴 营业中",
            btn_price_settings: "⚙️ 设置价格",

            stat_score: "分数",
            stat_money: "金钱",
            stat_combo: "连击",
            stat_customers: "顾客数",
            stat_time: "时间",

            roof_text: "NAYLA FESTIVAL BOOTH",

            request_title: "🛍️ 顾客订单",
            customer_default_name: "顾客",

            start_eyebrow: "NAYLA FESTIVAL",
            start_title: "Nayla 庆典摊位",
            start_description:
                "你负责经营摊位。顾客会前来点单，请准备好他们要求的商品，然后点击提供。",
            start_button: "🎪 开启摊位并开始",

            prep_kicker: "摊位工作区",
            prep_title: "🧺 准备托盘",
            prep_status_empty: "暂无订单",
            prep_status_waiting_customer: "等待顾客中...",
            prep_status_ready: "✓ 订单已准备好",
            prep_status_need_all: "请准备好所有商品",
            prep_placeholder: "根据顾客订单选择商品",

            btn_clear: "↺ 清空",
            btn_serve: "✓ 提供给顾客",

            inventory_kicker: "库存",
            inventory_title: "🛍️ 摊位商品",
            inventory_hint: "点击商品以准备订单",

            price_kicker: "当前价格",
            price_title: "💰 价格",
            price_hint: "可调整",

            modal_kicker: "摊位设置",
            modal_title: "⚙️ 设置商品价格",
            btn_cancel: "取消",
            btn_save: "保存价格",

            completion_label: "订单完成",
            completion_title: "顾客很满意！🎉",
            completion_default_text: "订单已成功提供。",
            completion_served_text: "已成功为{name}提供订单。",
            completion_timeup_text: "时间到！你的最终分数是{score}。",
            completion_score_label: "+分数",
            completion_money_label: "+金钱",
            btn_continue: "继续",

            msg_open_first: "请先开启摊位。",
            msg_no_customer: "目前没有顾客。",
            msg_not_requested: "顾客没有点这个商品。",
            msg_enough: "这个商品的数量已经足够了。",
            msg_price_updated: "价格已成功更新。",
            msg_tray_cleared: "准备托盘已清空。",
            msg_booth_opened: "摊位已开启！等待顾客中...",
            msg_booth_closed: "摊位已关闭。",
            msg_finish_order_first: "请先完成当前的订单。",
            msg_order_incomplete: "订单还未准备齐全。",

            product_balloon: "气球",
            product_flower: "鲜花",
            product_teddy: "泰迪熊",
            product_gift: "礼物",
            product_candy: "糖果",
            product_fan: "扇子"

        }
    }

};


document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       01. LANGUAGE HELPERS
       (Pola sama seperti gallery.js)
    ====================================================== */

    function normalizeBoothLanguage(language) {

        const value =
            String(language || "")
                .toLowerCase()
                .trim();

        if (value === "id" || value.startsWith("id-"))
            return "id";

        if (value === "en" || value.startsWith("en-"))
            return "en";

        if (value === "ja" || value.startsWith("ja-"))
            return "ja";

        if (value === "ko" || value.startsWith("ko-"))
            return "ko";

        if (value === "zh" || value.startsWith("zh-"))
            return "zh";

        return "en";

    }


    function getBoothLanguage() {

        const stored =
            localStorage.getItem("language") ||
            localStorage.getItem("selectedLanguage") ||
            localStorage.getItem("currentLanguage") ||
            localStorage.getItem("lang");

        const htmlLanguage =
            document.documentElement
                ?.getAttribute("lang");

        return normalizeBoothLanguage(
            stored ||
            htmlLanguage ||
            "en"
        );

    }


    function getNestedValue(object, path) {

        if (!object || !path)
            return undefined;

        return String(path)
            .split(".")
            .reduce(
                (current, key) => {

                    if (
                        current === null ||
                        current === undefined
                    ) {
                        return undefined;
                    }

                    return current[key];

                },
                object
            );

    }


    /*
     * boothT(key, params)
     * params opsional untuk template {placeholder}
     */

    function boothT(key, params) {

        if (!key)
            return "";

        const language =
            getBoothLanguage();

        let value =
            getNestedValue(
                BOOTH_TRANSLATIONS[language],
                key
            );

        /*
         * Fallback English.
         */

        if (
            typeof value !== "string"
        ) {

            value =
                getNestedValue(
                    BOOTH_TRANSLATIONS.en,
                    key
                );

        }

        if (
            typeof value !== "string"
        ) {
            return "";
        }


        if (params) {

            Object.keys(params).forEach(
                paramKey => {

                    value =
                        value.replace(
                            new RegExp(
                                `\\{${paramKey}\\}`,
                                "g"
                            ),
                            params[paramKey]
                        );

                }
            );

        }


        return value;

    }


    /* =====================================================
       02. APPLY STATIC TRANSLATIONS
    ====================================================== */

    function applyBoothTranslations() {

        document
            .querySelectorAll("[data-i18n]")
            .forEach(element => {

                const key =
                    element.dataset.i18n;

                const text =
                    boothT(key);

                if (text) {

                    element.textContent =
                        text;

                }

            });

    }


    /* =====================================================
       PRODUCTS
    ====================================================== */

    const PRODUCTS = [

        {
            id: "balloon",
            nameKey: "booth.product_balloon",
            emoji: "🎈",
            price: 15000
        },

        {
            id: "flower",
            nameKey: "booth.product_flower",
            emoji: "🌸",
            price: 20000
        },

        {
            id: "teddy",
            nameKey: "booth.product_teddy",
            emoji: "🧸",
            price: 35000
        },

        {
            id: "gift",
            nameKey: "booth.product_gift",
            emoji: "🎁",
            price: 40000
        },

        {
            id: "candy",
            nameKey: "booth.product_candy",
            emoji: "🍭",
            price: 10000
        },

        {
            id: "fan",
            nameKey: "booth.product_fan",
            emoji: "🪭",
            price: 18000
        }

    ];


    /* =====================================================
       CUSTOMERS
       (Nama tetap sama di semua bahasa)
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

    function showMessage(key, params) {

        if (!gameMessage) return;

        gameMessage.textContent =
            boothT(key, params);

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
                    ${boothT(product.nameKey)}
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
                        ${boothT(product.nameKey)}
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
                        ${boothT(product.nameKey)}
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
            "booth.msg_price_updated"
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
                        ${boothT(product.nameKey)}
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
                "booth.msg_open_first"
            );

            return;

        }


        if (!state.currentCustomer) {

            showMessage(
                "booth.msg_no_customer"
            );

            return;

        }


        const requestedQuantity =
            state.currentOrder[
                productId
            ] || 0;


        if (requestedQuantity <= 0) {

            showMessage(
                "booth.msg_not_requested"
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
                "booth.msg_enough"
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
                    ${boothT("booth.prep_status_waiting_customer")}
                </div>

            `;

            preparationStatus.textContent =
                boothT("booth.prep_status_empty");

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
                    ${boothT("booth.prep_placeholder")}
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
                        ${boothT(product.nameKey)}
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
                boothT("booth.prep_status_ready");

            preparationStatus.classList.add(
                "ready"
            );

        } else {

            preparationStatus.textContent =
                boothT("booth.prep_status_need_all");

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
                "booth.msg_no_customer"
            );

            return;

        }


        if (
            !isPreparationCorrect()
        ) {

            showMessage(
                "booth.msg_order_incomplete"
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
            boothT(
                "booth.completion_served_text",
                { name: state.currentCustomer.name }
            );


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
            boothT(
                "booth.completion_timeup_text",
                { score: state.score }
            );


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
            boothT("booth.btn_open_booth");

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
            boothT("booth.btn_open_booth_active");


        showMessage(
            "booth.msg_booth_opened"
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
                    "booth.msg_finish_order_first"
                );

                return;

            }


            state.isOpen =
                false;

            clearInterval(
                state.timer
            );

            openBoothButton.textContent =
                boothT("booth.btn_open_booth");

            showMessage(
                "booth.msg_booth_closed"
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
                "booth.msg_tray_cleared"
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
                    boothT("booth.btn_open_booth");

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
       03. LANGUAGE CHANGE HANDLING
       (Dengarkan event yang sama seperti gallery.js supaya
       nyambung dengan language switcher di navbar)
    ====================================================== */

    function refreshDynamicTexts() {

        /*
         * Refresh label tombol buka booth
         * sesuai status aktif/tidak.
         */

        if (state.isOpen) {

            openBoothButton.textContent =
                boothT("booth.btn_open_booth_active");

        } else {

            openBoothButton.textContent =
                boothT("booth.btn_open_booth");

        }


        renderProducts();

        renderPriceList();

        renderPreparation();

        renderCustomerRequest();

    }


    function handleBoothLanguageChange(event) {

        const language =
            event?.detail?.language;


        if (language) {

            const normalized =
                normalizeBoothLanguage(
                    language
                );


            localStorage.setItem(
                "language",
                normalized
            );


            document.documentElement
                .setAttribute(
                    "lang",
                    normalized
                );

        }


        applyBoothTranslations();

        refreshDynamicTexts();

    }


    /*
     * Support beberapa nama event navbar
     * yang sudah ada (sama seperti gallery.js).
     */

    window.addEventListener(
        "languageChanged",
        handleBoothLanguageChange
    );

    window.addEventListener(
        "languageChange",
        handleBoothLanguageChange
    );

    window.addEventListener(
        "langChanged",
        handleBoothLanguageChange
    );

    window.addEventListener(
        "galleryLanguageChanged",
        handleBoothLanguageChange
    );

    window.addEventListener(
        "boothLanguageChanged",
        handleBoothLanguageChange
    );


    window.addEventListener(
        "storage",
        event => {

            if (
                [
                    "language",
                    "selectedLanguage",
                    "currentLanguage",
                    "lang"
                ].includes(
                    event.key
                )
            ) {

                applyBoothTranslations();

                refreshDynamicTexts();

            }

        }
    );


    /* =====================================================
       04. PUBLIC API
       (Konsisten dengan window.GalleryI18n)
    ====================================================== */

    window.BoothI18n = {

        translate:
            boothT,

        apply:
            applyBoothTranslations,

        getLanguage:
            getBoothLanguage,

        setLanguage:
            function(language) {

                const normalized =
                    normalizeBoothLanguage(
                        language
                    );


                localStorage.setItem(
                    "language",
                    normalized
                );

                localStorage.setItem(
                    "selectedLanguage",
                    normalized
                );


                document.documentElement
                    .setAttribute(
                        "lang",
                        normalized
                    );


                applyBoothTranslations();

                refreshDynamicTexts();

            }

    };


    /* =====================================================
       INITIAL RENDER
    ====================================================== */

    document.documentElement.setAttribute(
        "lang",
        getBoothLanguage()
    );

    applyBoothTranslations();

    renderProducts();

    renderPriceList();

    renderPreparation();

    updateScoreboard();


});