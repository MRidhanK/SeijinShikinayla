/* =====================================================
   SEIJIN SHIKI NAVBAR
   Mobile Navigation + Global Language System
===================================================== */

(function () {

    "use strict";


    /* =================================================
       TRANSLATIONS
    ================================================= */

    const translations = {

        /* =================================================
           INDONESIA
        ================================================= */

        id: {

            navbar: {
                home: "Beranda",
                gallery: "Galeri",
                guestbook: "Buku Tamu",
                ai: "AI",
                photobooth: "Photobooth",
                games: "Permainan",
                secretLetter: "Surat Rahasia"
            }

        },


        /* =================================================
           ENGLISH
        ================================================= */

        en: {

            navbar: {
                home: "Home",
                gallery: "Gallery",
                guestbook: "Guestbook",
                ai: "AI",
                photobooth: "Photobooth",
                games: "Games",
                secretLetter: "Secret Letter"
            }

        },


        /* =================================================
           JAPANESE
        ================================================= */

        ja: {

            navbar: {
                home: "ホーム",
                gallery: "ギャラリー",
                guestbook: "ゲストブック",
                ai: "AI",
                photobooth: "フォトブース",
                games: "ゲーム",
                secretLetter: "秘密の手紙"
            }

        },


        /* =================================================
           CHINESE
        ================================================= */

        zh: {

            navbar: {
                home: "首页",
                gallery: "相册",
                guestbook: "留言簿",
                ai: "AI",
                photobooth: "照片亭",
                games: "游戏",
                secretLetter: "秘密信件"
            }

        },


        /* =================================================
           KOREAN
        ================================================= */

        ko: {

            navbar: {
                home: "홈",
                gallery: "갤러리",
                guestbook: "방명록",
                ai: "AI",
                photobooth: "포토부스",
                games: "게임",
                secretLetter: "비밀 편지"
            }

        }

    };


    /* =================================================
       LANGUAGE NAMES
    ================================================= */

    const languageNames = {

        id: "Indonesia",

        en: "English",

        ja: "日本語",

        zh: "中文",

        ko: "한국어"

    };


    /* =================================================
       GET NESTED TRANSLATION
    ================================================= */

    function getTranslation(language, key) {

        const languageData =
            translations[language];

        if (!languageData) {
            return null;
        }


        const parts =
            key.split(".");


        let value =
            languageData;


        for (const part of parts) {

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


        return typeof value === "string"
            ? value
            : null;

    }


    /* =================================================
       APPLY TRANSLATION
    ================================================= */

    function applyTranslations(language) {

        if (!translations[language]) {

            language = "en";

        }


        /* =============================================
           TEXT TRANSLATION
        ============================================= */

        const elements =
            document.querySelectorAll(
                "[data-i18n]"
            );


        elements.forEach(
            function (element) {

                const key =
                    element.dataset.i18n;

                if (!key) {
                    return;
                }


                const translated =
                    getTranslation(
                        language,
                        key
                    );


                if (
                    translated !== null
                ) {

                    element.textContent =
                        translated;

                }

            }
        );


        /* =============================================
           LANGUAGE LABEL
        ============================================= */

        const currentLanguageLabel =
            document.getElementById(
                "currentLanguageLabel"
            );


        if (currentLanguageLabel) {

            currentLanguageLabel.textContent =
                languageNames[language] ||
                languageNames.en;

        }


        /* =============================================
           SAVE LANGUAGE
        ============================================= */

        localStorage.setItem(
            "language",
            language
        );


        /* =============================================
           HTML LANG ATTRIBUTE
        ============================================= */

        document.documentElement.lang =
            language;


        /* =============================================
           UPDATE ACTIVE OPTION
        ============================================= */

        const languageOptions =
            document.querySelectorAll(
                ".language-option"
            );


        languageOptions.forEach(
            function (option) {

                const optionLanguage =
                    option.dataset.language;


                option.classList.toggle(
                    "active",
                    optionLanguage === language
                );


                option.setAttribute(
                    "aria-selected",
                    optionLanguage === language
                        ? "true"
                        : "false"
                );

            }
        );


        /* =============================================
           INFORM OTHER COMPONENTS
        ============================================= */

        window.dispatchEvent(
            new CustomEvent(
                "languageChanged",
                {
                    detail: {
                        language: language
                    }
                }
            )
        );


        console.log(
            "[Language] Applied:",
            language
        );

    }


    /* =================================================
       GET CURRENT LANGUAGE
    ================================================= */

    function getCurrentLanguage() {

        const savedLanguage =
            localStorage.getItem(
                "language"
            );


        if (
            savedLanguage &&
            translations[savedLanguage]
        ) {

            return savedLanguage;

        }


        return "en";

    }


    /* =================================================
       INITIALIZE NAVBAR
    ================================================= */

    function initNavbar() {

        const navbar =
            document.querySelector(
                ".navbar"
            );


        const navbarToggle =
            document.getElementById(
                "navbarToggle"
            );


        const navbarLinks =
            document.getElementById(
                "navbarLinks"
            );


        const languageCurrent =
            document.getElementById(
                "languageCurrent"
            );


        const languageMenu =
            document.getElementById(
                "languageMenu"
            );


        const currentLanguageLabel =
            document.getElementById(
                "currentLanguageLabel"
            );


        const languageOptions =
            document.querySelectorAll(
                ".language-option"
            );


        /* =============================================
           DEBUG
        ============================================= */

        console.log(
            "================================="
        );

        console.log(
            "[NAVBAR] Initializing..."
        );

        console.log(
            "[NAVBAR] navbar:",
            navbar
        );

        console.log(
            "[NAVBAR] toggle:",
            navbarToggle
        );

        console.log(
            "[NAVBAR] links:",
            navbarLinks
        );

        console.log(
            "[LANGUAGE] language button:",
            languageCurrent
        );

        console.log(
            "[LANGUAGE] language menu:",
            languageMenu
        );


        /* =============================================
           VALIDATION
        ============================================= */

        if (
            !navbar ||
            !navbarToggle ||
            !navbarLinks
        ) {

            console.error(
                "[NAVBAR] Element tidak ditemukan!"
            );

            return;

        }


        /* =================================================
           MOBILE MENU
        ================================================= */

        function openMenu() {

            navbarLinks.classList.add(
                "active"
            );


            navbarToggle.classList.add(
                "active"
            );


            navbarToggle.setAttribute(
                "aria-expanded",
                "true"
            );


            navbarToggle.setAttribute(
                "aria-label",
                "Close menu"
            );


            console.log(
                "[NAVBAR] OPEN"
            );

        }


        function closeMenu() {

            navbarLinks.classList.remove(
                "active"
            );


            navbarToggle.classList.remove(
                "active"
            );


            navbarToggle.setAttribute(
                "aria-expanded",
                "false"
            );


            navbarToggle.setAttribute(
                "aria-label",
                "Open menu"
            );


            console.log(
                "[NAVBAR] CLOSE"
            );

        }


        function toggleMenu(event) {

            if (event) {

                event.preventDefault();

                event.stopPropagation();

            }


            const isOpen =
                navbarLinks.classList.contains(
                    "active"
                );


            if (isOpen) {

                closeMenu();

            } else {

                openMenu();

            }

        }


        /* =============================================
           HAMBURGER CLICK
        ============================================= */

        navbarToggle.onclick =
            toggleMenu;


        /* =============================================
           MENU LINKS
        ============================================= */

        const links =
            navbarLinks.querySelectorAll(
                "a"
            );


        links.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        closeMenu();

                    }
                );

            }
        );


        /* =============================================
           CLICK OUTSIDE NAVBAR
        ============================================= */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !navbar.contains(
                        event.target
                    )
                ) {

                    closeMenu();

                }

            }
        );


        /* =============================================
           ESCAPE
        ============================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    closeMenu();


                    if (
                        languageMenu
                    ) {

                        languageMenu.classList.remove(
                            "active"
                        );


                        if (
                            languageCurrent
                        ) {

                            languageCurrent.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }

                    }

                }

            }
        );


        /* =============================================
           RESIZE
        ============================================= */

        window.addEventListener(
            "resize",
            function () {

                if (
                    window.innerWidth > 800
                ) {

                    closeMenu();

                }

            }
        );


        /* =================================================
           LANGUAGE DROPDOWN
        ================================================= */

        if (
            languageCurrent &&
            languageMenu
        ) {


            /* =============================================
               OPEN / CLOSE DROPDOWN
            ============================================= */

            languageCurrent.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    const isOpen =
                        languageMenu.classList.contains(
                            "active"
                        );


                    languageMenu.classList.toggle(
                        "active"
                    );


                    languageCurrent.setAttribute(
                        "aria-expanded",
                        isOpen
                            ? "false"
                            : "true"
                    );

                }
            );


            /* =============================================
               LANGUAGE SELECTION
            ============================================= */

            languageOptions.forEach(
                function (option) {

                    option.addEventListener(
                        "click",
                        function (event) {

                            event.preventDefault();

                            event.stopPropagation();


                            const language =
                                option.dataset.language;


                            if (
                                !language ||
                                !translations[language]
                            ) {

                                return;

                            }


                            /* =================================
                               APPLY LANGUAGE
                            ================================= */

                            applyTranslations(
                                language
                            );


                            /* =================================
                               CLOSE DROPDOWN
                            ================================= */

                            languageMenu.classList.remove(
                                "active"
                            );


                            languageCurrent.setAttribute(
                                "aria-expanded",
                                "false"
                            );


                            console.log(
                                "[Language] Changed to:",
                                language
                            );

                        }
                    );

                }
            );


            /* =============================================
               CLICK OUTSIDE LANGUAGE DROPDOWN
            ============================================= */

            document.addEventListener(
                "click",
                function (event) {

                    if (
                        !event.target.closest(
                            ".language-switcher"
                        )
                    ) {

                        languageMenu.classList.remove(
                            "active"
                        );


                        languageCurrent.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                }
            );

        }


        /* =================================================
           INITIAL LANGUAGE
        ================================================= */

        const savedLanguage =
            getCurrentLanguage();


        applyTranslations(
            savedLanguage
        );


        console.log(
            "[NAVBAR] Successfully initialized."
        );

        console.log(
            "[LANGUAGE] Current:",
            savedLanguage
        );


        /* =============================================
           INITIAL STATE
        ============================================= */

        closeMenu();


        if (languageMenu) {

            languageMenu.classList.remove(
                "active"
            );

        }


        if (languageCurrent) {

            languageCurrent.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }


    /* =================================================
       START
    ================================================= */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initNavbar
        );

    } else {

        initNavbar();

    }


    /* =================================================
       GLOBAL API
       Bisa dipakai file JS lain
    ================================================= */

    window.SeijinLanguage = {

        getCurrentLanguage:
            getCurrentLanguage,

        applyTranslations:
            applyTranslations,

        getTranslation:
            getTranslation,

        translations:
            translations

    };


})();