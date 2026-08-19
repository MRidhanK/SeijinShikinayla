/* =========================================================
   SEIJIN SHIKI
   GLOBAL LANGUAGE SYSTEM
   ---------------------------------------------------------
   Languages:
   ID = Indonesia
   EN = English
   JA = Japanese
   ZH = Chinese
   KO = Korean

   Only selected language is stored in localStorage.
   Translation results are NOT stored.
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       CONFIG
    ===================================================== */

    const STORAGE_KEY = "seijin_language";

    const DEFAULT_LANGUAGE = "id";

    const SUPPORTED_LANGUAGES = [
        "id",
        "en",
        "ja",
        "zh",
        "ko"
    ];


    /* =====================================================
       LANGUAGE LABELS
    ===================================================== */

    const LANGUAGE_LABELS = {

        id: "Indonesia",

        en: "English",

        ja: "日本語",

        zh: "中文",

        ko: "한국어"

    };


    /* =====================================================
       TRANSLATIONS
    ===================================================== */

    const translations = {

        /* =================================================
           NAVBAR
        ================================================= */

        navbar: {

            home: {
                id: "Home",
                en: "Home",
                ja: "ホーム",
                zh: "首页",
                ko: "홈"
            },

            gallery: {
                id: "Gallery",
                en: "Gallery",
                ja: "ギャラリー",
                zh: "相册",
                ko: "갤러리"
            },

            guestbook: {
                id: "Guestbook",
                en: "Guestbook",
                ja: "ゲストブック",
                zh: "留言簿",
                ko: "방명록"
            },

            ai: {
                id: "AI",
                en: "AI",
                ja: "AI",
                zh: "AI",
                ko: "AI"
            },

            photobooth: {
                id: "Photobooth",
                en: "Photobooth",
                ja: "フォトブース",
                zh: "照片亭",
                ko: "포토부스"
            },

            games: {
                id: "Games",
                en: "Games",
                ja: "ゲーム",
                zh: "游戏",
                ko: "게임"
            },

            secretLetter: {
                id: "Secret Letter",
                en: "Secret Letter",
                ja: "秘密の手紙",
                zh: "秘密信件",
                ko: "비밀 편지"
            },

            language: {
                id: "Indonesia",
                en: "English",
                ja: "日本語",
                zh: "中文",
                ko: "한국어"
            }

        },


        /* =================================================
           SECRET LETTER
        ================================================= */

        secretLetter: {

            sectionLabel: {
                id: "📜 秘密の手紙 • SURAT RAHASIA",
                en: "📜 秘密の手紙 • SECRET LETTER",
                ja: "📜 秘密の手紙 • 秘密の手紙",
                zh: "📜 秘密の手紙 • 秘密信件",
                ko: "📜 秘密の手紙 • 비밀 편지"
            },

            pageTitle: {
                id: "Surat Dari Developer",
                en: "A Letter From The Developer",
                ja: "開発者からの手紙",
                zh: "来自开发者的一封信",
                ko: "개발자가 보내는 편지"
            },

            pageDescription: {
                id: "Sebuah surat kecil yang ditulis untuk Nayla, menunggu hari yang tepat untuk dibuka.",
                en: "A small letter written for Nayla, waiting for the right day to be opened.",
                ja: "ナイラのために書かれた小さな手紙。開かれるその日を待っています。",
                zh: "一封写给 Nayla 的小小信件，等待着适合打开的那一天。",
                ko: "Nayla를 위해 작성된 작은 편지입니다. 열릴 특별한 날을 기다리고 있습니다."
            },

            lockedLabel: {
                id: "まだ開けません",
                en: "まだ開けません",
                ja: "まだ開けません",
                zh: "还不能打开",
                ko: "아직 열 수 없습니다"
            },

            lockedTitle: {
                id: "Surat Ini Masih Tersegel",
                en: "This Letter Is Sealed",
                ja: "この手紙は封印されています",
                zh: "这封信仍然封存着",
                ko: "이 편지는 아직 봉인되어 있습니다"
            },

            lockedDescription: {
                id: "Surat ini ditulis oleh developer dan akan tetap tersegel sampai ulang tahun Nayla.",
                en: "This letter was written by the developer and will remain sealed until Nayla's birthday.",
                ja: "この手紙は開発者によって書かれ、ナイラの誕生日まで封印されています。",
                zh: "这封信由开发者写下，将一直封存到 Nayla 的生日。",
                ko: "이 편지는 개발자가 작성했으며 Nayla의 생일까지 봉인된 상태로 남아 있습니다."
            },

            countdown: {
                id: "Menunggu hari istimewa...",
                en: "Waiting for the special day...",
                ja: "特別な日を待っています…",
                zh: "等待特别的日子……",
                ko: "특별한 날을 기다리고 있습니다..."
            },

            openedLabel: {
                id: "開封 • TERBUKA",
                en: "開封 • OPENED",
                ja: "開封 • OPENED",
                zh: "开封 • 已打开",
                ko: "開封 • OPENED"
            },

            openedTitle: {
                id: "Surat Dari Developer",
                en: "A Letter From The Developer",
                ja: "開発者からの手紙",
                zh: "来自开发者的一封信",
                ko: "개발자가 보내는 편지"
            },

            signatureGreeting: {
                id: "Dengan penuh rasa terima kasih,",
                en: "With gratitude,",
                ja: "感謝を込めて、",
                zh: "怀着感激之情，",
                ko: "감사의 마음을 담아,"
            },

            signatureDescription: {
                id: "Seorang developer yang pernah membuat sebuah shrine kecil untukmu.",
                en: "A developer who once made a little shrine for you.",
                ja: "あなたのために小さなシュラインを作った、ひとりの開発者より。",
                zh: "一位曾经为你制作过小小 Shrine 的开发者。",
                ko: "한때 당신을 위해 작은 Shrine을 만들었던 개발자로부터."
            },

            writtenDate: {
                id: "Ditulis dengan tulus • 18 Juni 2027",
                en: "Written with sincerity • June 18, 2027",
                ja: "心を込めて • 2027年6月18日",
                zh: "真诚写下 • 2027年6月18日",
                ko: "진심을 담아 • 2027년 6월 18일"
            },

            footerDescription: {
                id: "Satu tribut terakhir, untuk sebuah awal yang indah.",
                en: "One last tribute, for a beautiful beginning.",
                ja: "美しい始まりのために、最後のトリビュートを。",
                zh: "最后的一份致意，献给一个美好的开始。",
                ko: "아름다운 시작을 위한 마지막 헌정."
            }

        }

    };


    /* =====================================================
       GET SAVED LANGUAGE
    ===================================================== */

    function getLanguage() {

        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (
            saved &&
            SUPPORTED_LANGUAGES.includes(saved)
        ) {

            return saved;

        }

        return DEFAULT_LANGUAGE;

    }


    /* =====================================================
       SAVE LANGUAGE
    ===================================================== */

    function setLanguage(language) {

        if (
            !SUPPORTED_LANGUAGES.includes(language)
        ) {

            language =
                DEFAULT_LANGUAGE;

        }

        localStorage.setItem(
            STORAGE_KEY,
            language
        );

        applyLanguage(language);

    }


    /* =====================================================
       GET TRANSLATION
    ===================================================== */

    function getTranslation(
        key,
        language
    ) {

        const parts =
            key.split(".");

        let value =
            translations;

        for (
            const part of parts
        ) {

            if (
                value &&
                Object.prototype.hasOwnProperty.call(
                    value,
                    part
                )
            ) {

                value =
                    value[part];

            } else {

                return null;

            }

        }

        if (
            value &&
            typeof value === "object"
        ) {

            return (
                value[language] ||
                value[DEFAULT_LANGUAGE] ||
                null
            );

        }

        return null;

    }


    /* =====================================================
       APPLY TRANSLATION
    ===================================================== */

    function applyLanguage(language) {

        document.documentElement
            .setAttribute(
                "lang",
                language
            );


        /* -----------------------------------------------
           TEXT
        ------------------------------------------------ */

        document
            .querySelectorAll("[data-i18n]")
            .forEach(element => {

                const key =
                    element.dataset.i18n;

                const translated =
                    getTranslation(
                        key,
                        language
                    );

                if (
                    translated !== null
                ) {

                    element.textContent =
                        translated;

                }

            });


        /* -----------------------------------------------
           PLACEHOLDER
        ------------------------------------------------ */

        document
            .querySelectorAll("[data-i18n-placeholder]")
            .forEach(element => {

                const key =
                    element.dataset.i18nPlaceholder;

                const translated =
                    getTranslation(
                        key,
                        language
                    );

                if (
                    translated !== null
                ) {

                    element.placeholder =
                        translated;

                }

            });


        /* -----------------------------------------------
           TITLE
        ------------------------------------------------ */

        document
            .querySelectorAll("[data-i18n-title]")
            .forEach(element => {

                const key =
                    element.dataset.i18nTitle;

                const translated =
                    getTranslation(
                        key,
                        language
                    );

                if (
                    translated !== null
                ) {

                    element.title =
                        translated;

                }

            });


        /* -----------------------------------------------
           ALT
        ------------------------------------------------ */

        document
            .querySelectorAll("[data-i18n-alt]")
            .forEach(element => {

                const key =
                    element.dataset.i18nAlt;

                const translated =
                    getTranslation(
                        key,
                        language
                    );

                if (
                    translated !== null
                ) {

                    element.alt =
                        translated;

                }

            });


        updateLanguageSwitcher(language);


        /* -----------------------------------------------
           CUSTOM EVENT
        ------------------------------------------------ */

        document.dispatchEvent(
            new CustomEvent(
                "languageChanged",
                {
                    detail: {
                        language
                    }
                }
            )
        );

    }


    /* =====================================================
       LANGUAGE SWITCHER
    ===================================================== */

    function updateLanguageSwitcher(language) {

        const label =
            document.getElementById(
                "currentLanguageLabel"
            );

        if (label) {

            label.textContent =
                LANGUAGE_LABELS[language];

        }


        document
            .querySelectorAll(".language-option")
            .forEach(option => {

                const optionLanguage =
                    option.dataset.language;

                option.classList.toggle(
                    "active",
                    optionLanguage === language
                );

            });

    }


    /* =====================================================
       INIT SWITCHER
    ===================================================== */

    function initLanguageSwitcher() {

        const current =
            document.getElementById(
                "languageCurrent"
            );

        const menu =
            document.getElementById(
                "languageMenu"
            );


        if (
            !current ||
            !menu
        ) {

            return;

        }


        current.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();

                menu.classList.toggle(
                    "active"
                );

            }
        );


        menu
            .querySelectorAll(
                ".language-option"
            )
            .forEach(option => {

                option.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        event.stopPropagation();

                        const language =
                            option.dataset.language;

                        setLanguage(
                            language
                        );

                        menu.classList.remove(
                            "active"
                        );

                    }
                );

            });


        document.addEventListener(
            "click",
            event => {

                if (
                    !event.target.closest(
                        ".language-switcher"
                    )
                ) {

                    menu.classList.remove(
                        "active"
                    );

                }

            }
        );

    }


    /* =====================================================
       INIT
    ===================================================== */

    function init() {

        const language =
            getLanguage();

        initLanguageSwitcher();

        applyLanguage(language);

        console.log(
            "[Language] Global language:",
            language
        );

    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    window.SeijinLanguage = {

        getLanguage,

        setLanguage,

        getTranslation,

        applyLanguage,

        getSupportedLanguages() {

            return [
                ...SUPPORTED_LANGUAGES
            ];

        }

    };


    /* =====================================================
       START
    ===================================================== */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();

    }

})();