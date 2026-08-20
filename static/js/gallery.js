/* =========================================================
   GALLERY.JS
   Nayla Seijin Shiki
   ========================================================= */

"use strict";


/* =========================================================
   01. TRANSLATIONS
   ========================================================= */

const GALLERY_TRANSLATIONS = {

    /* =====================================================
       INDONESIAN
       ===================================================== */

    id: {
        gallery: {

            hero_japanese: "思い出",
            hero_eyebrow: "ARSIP KENANGAN",
            hero_title: "Kumpulan Kenangan",
            hero_description:
                "Setiap bab meninggalkan sesuatu yang layak dikenang.",
            scroll: "Gulir untuk menjelajah",

            archive: "ARSIP",
            heading: "Kenangan Nayla",
            heading_description:
                "Perjalanan visual melalui momen-momen yang membentuk tahun-tahun sebelum dewasa.",

            filter_all: "Semua",
            memories: "kenangan",

            chapter_01: "BAB 01",
            chapter_02: "BAB 02",
            chapter_03: "BAB 03",
            chapter_06: "BAB 06",

            memory_2023_alt:
                "Kenangan Nayla tahun 2023",
            memory_2023_title:
                "Awal Perjalanan",
            memory_2023_description:
                "Langkah pertama dari sebuah perjalanan yang indah.",

            memory_2024_alt:
                "Kenangan Nayla tahun 2024",
            memory_2024_title:
                "Bertumbuh",
            memory_2024_description:
                "Bertumbuh melalui JKT48 School.",

            memory_2025_alt:
                "Kenangan Nayla tahun 2025",
            memory_2025_title:
                "Sebuah Pencapaian Baru",
            memory_2025_description:
                "Dipromosikan menjadi Core Member dan dipercaya sebagai penerjemah di Sister Reunion Festival.",

            memory_2026_rh_alt:
                "Kenangan Request Hour Nayla tahun 2026",
            view_2026_rh:
                "Lihat kenangan Request Hour 2026",
            special_moment:
                "MOMEN SPESIAL",
            memory_2026_rh_title:
                "Request Hour 2026",
            memory_2026_rh_description:
                "Penampilan spesial <strong>Bird</strong>, berada di peringkat ke-15 Request Hour 2026, bersama Aurelia dan Aurhel Alana.",

            memory_2026_birthday_alt:
                "Kenangan ulang tahun Nayla ke-19 tahun 2026",
            view_2026_birthday:
                "Lihat kenangan ulang tahun 2026",
            birthday:
                "ULANG TAHUN",
            memory_2026_birthday_title:
                "#HappinessNaylalaland19",
            memory_2026_birthday_description:
                "Ulang tahun yang dipenuhi kenangan, cinta, dan kebahagiaan.",

            view_2023:
                "Lihat kenangan tahun 2023",
            view_2024:
                "Lihat kenangan tahun 2024",
            view_2025:
                "Lihat kenangan tahun 2025",

            future_kanji:
                "新章",
            future_label:
                "BAB BERIKUTNYA",
            future_description:
                "Halaman ini sedang menunggu kenangan baru.",
            future_small:
                "Sebuah awal yang baru.",
            future_title:
                "Awal Masa Dewasa",
            future_card_description:
                "Beberapa kenangan belum dituliskan.",

            closing_japanese:
                "これからも",
            closing_title:
                "Masih banyak kenangan yang menanti.",
            closing_description:
                "Cerita ini belum berakhir.",

            close: "Tutup",
            previous: "Sebelumnya",
            next: "Berikutnya"

        }
    },


    /* =====================================================
       ENGLISH
       ===================================================== */

    en: {
        gallery: {

            hero_japanese: "思い出",
            hero_eyebrow: "MEMORY ARCHIVE",
            hero_title: "A Collection of Memories",
            hero_description:
                "Every chapter leaves behind something worth remembering.",
            scroll: "Scroll to explore",

            archive: "THE ARCHIVE",
            heading: "Nayla's Memories",
            heading_description:
                "A visual journey through the moments that shaped the years before adulthood.",

            filter_all: "All",
            memories: "memories",

            chapter_01: "CHAPTER 01",
            chapter_02: "CHAPTER 02",
            chapter_03: "CHAPTER 03",
            chapter_06: "CHAPTER 06",

            memory_2023_alt:
                "Nayla 2023",
            memory_2023_title:
                "The Beginning",
            memory_2023_description:
                "The first step of a beautiful journey.",

            memory_2024_alt:
                "Nayla 2024",
            memory_2024_title:
                "Growing",
            memory_2024_description:
                "Growing through JKT48 School.",

            memory_2025_alt:
                "Nayla 2025",
            memory_2025_title:
                "A New Milestone",
            memory_2025_description:
                "Promoted to Core Member and trusted as a translator at Sister Reunion Festival.",

            memory_2026_rh_alt:
                "Nayla Request Hour 2026",
            view_2026_rh:
                "View Request Hour 2026 memory",
            special_moment:
                "SPECIAL MOMENT",
            memory_2026_rh_title:
                "Request Hour 2026",
            memory_2026_rh_description:
                "A special performance of <strong>Bird</strong>, ranked 15th in Request Hour 2026, alongside Aurelia and Aurhel Alana.",

            memory_2026_birthday_alt:
                "Nayla's 19th Birthday 2026",
            view_2026_birthday:
                "View 2026 birthday memory",
            birthday:
                "BIRTHDAY",
            memory_2026_birthday_title:
                "#HappinessNaylalaland19",
            memory_2026_birthday_description:
                "A birthday filled with memories, love and happiness.",

            view_2023:
                "View 2023 memory",
            view_2024:
                "View 2024 memory",
            view_2025:
                "View 2025 memory",

            future_kanji:
                "新章",
            future_label:
                "THE NEXT CHAPTER",
            future_description:
                "This page is waiting for a new memory.",
            future_small:
                "A new beginning.",
            future_title:
                "The Beginning of Adulthood",
            future_card_description:
                "Some memories have not been written yet.",

            closing_japanese:
                "これからも",
            closing_title:
                "More memories are waiting.",
            closing_description:
                "The story does not end here.",

            close: "Close",
            previous: "Previous",
            next: "Next"

        }
    },


    /* =====================================================
       JAPANESE
       ===================================================== */

    ja: {
        gallery: {

            hero_japanese: "思い出",
            hero_eyebrow: "思い出のアーカイブ",
            hero_title: "思い出のコレクション",
            hero_description:
                "すべての章には、心に残る大切な思い出があります。",
            scroll: "スクロールしてご覧ください",

            archive: "アーカイブ",
            heading: "ナイラの思い出",
            heading_description:
                "大人になるまでの時間を彩った瞬間を振り返るビジュアル・ジャーニー。",

            filter_all: "すべて",
            memories: "思い出",

            chapter_01: "第01章",
            chapter_02: "第02章",
            chapter_03: "第03章",
            chapter_06: "第06章",

            memory_2023_alt:
                "ナイラ 2023",
            memory_2023_title:
                "はじまり",
            memory_2023_description:
                "美しい旅の最初の一歩。",

            memory_2024_alt:
                "ナイラ 2024",
            memory_2024_title:
                "成長",
            memory_2024_description:
                "JKT48 Schoolを通して成長した日々。",

            memory_2025_alt:
                "ナイラ 2025",
            memory_2025_title:
                "新たな節目",
            memory_2025_description:
                "Core Memberへ昇格し、Sister Reunion Festivalで翻訳を担当しました。",

            memory_2026_rh_alt:
                "ナイラ Request Hour 2026",
            view_2026_rh:
                "Request Hour 2026の思い出を見る",
            special_moment:
                "特別な瞬間",
            memory_2026_rh_title:
                "Request Hour 2026",
            memory_2026_rh_description:
                "<strong>Bird</strong>の特別なパフォーマンス。Request Hour 2026で15位にランクインし、AureliaとAurhel Alanaと共に出演しました。",

            memory_2026_birthday_alt:
                "ナイラ 19歳の誕生日 2026",
            view_2026_birthday:
                "2026年の誕生日の思い出を見る",
            birthday:
                "誕生日",
            memory_2026_birthday_title:
                "#HappinessNaylalaland19",
            memory_2026_birthday_description:
                "思い出と愛、そして幸せに満ちた誕生日。",

            view_2023:
                "2023年の思い出を見る",
            view_2024:
                "2024年の思い出を見る",
            view_2025:
                "2025年の思い出を見る",

            future_kanji:
                "新章",
            future_label:
                "次の章",
            future_description:
                "このページは新しい思い出を待っています。",
            future_small:
                "新しい始まり。",
            future_title:
                "大人への第一歩",
            future_card_description:
                "まだ書かれていない思い出があります。",

            closing_japanese:
                "これからも",
            closing_title:
                "これからも新しい思い出が待っています。",
            closing_description:
                "物語はここで終わりません。",

            close: "閉じる",
            previous: "前へ",
            next: "次へ"

        }
    },


    /* =====================================================
       KOREAN
       ===================================================== */

    ko: {
        gallery: {

            hero_japanese: "思い出",
            hero_eyebrow: "추억 아카이브",
            hero_title: "추억의 컬렉션",
            hero_description:
                "모든 순간에는 기억할 가치가 있는 소중한 이야기가 남습니다.",
            scroll: "스크롤하여 둘러보기",

            archive: "아카이브",
            heading: "나일라의 추억",
            heading_description:
                "성인이 되기 전의 시간을 채운 소중한 순간들을 돌아보는 여정입니다.",

            filter_all: "전체",
            memories: "추억",

            chapter_01: "CHAPTER 01",
            chapter_02: "CHAPTER 02",
            chapter_03: "CHAPTER 03",
            chapter_06: "CHAPTER 06",

            memory_2023_alt:
                "나일라 2023",
            memory_2023_title:
                "시작",
            memory_2023_description:
                "아름다운 여정의 첫걸음.",

            memory_2024_alt:
                "나일라 2024",
            memory_2024_title:
                "성장",
            memory_2024_description:
                "JKT48 School과 함께 성장한 시간.",

            memory_2025_alt:
                "나일라 2025",
            memory_2025_title:
                "새로운 이정표",
            memory_2025_description:
                "Core Member로 승격되었고 Sister Reunion Festival에서 통역을 맡았습니다.",

            memory_2026_rh_alt:
                "나일라 Request Hour 2026",
            view_2026_rh:
                "Request Hour 2026 추억 보기",
            special_moment:
                "특별한 순간",
            memory_2026_rh_title:
                "Request Hour 2026",
            memory_2026_rh_description:
                "<strong>Bird</strong>의 특별한 공연으로 Request Hour 2026에서 15위를 기록했으며 Aurelia와 Aurhel Alana와 함께했습니다.",

            memory_2026_birthday_alt:
                "나일라 19번째 생일 2026",
            view_2026_birthday:
                "2026년 생일 추억 보기",
            birthday:
                "생일",
            memory_2026_birthday_title:
                "#HappinessNaylalaland19",
            memory_2026_birthday_description:
                "추억과 사랑, 행복으로 가득했던 생일.",

            view_2023:
                "2023년 추억 보기",
            view_2024:
                "2024년 추억 보기",
            view_2025:
                "2025년 추억 보기",

            future_kanji:
                "新章",
            future_label:
                "다음 장",
            future_description:
                "이 페이지는 새로운 추억을 기다리고 있습니다.",
            future_small:
                "새로운 시작.",
            future_title:
                "성인의 시작",
            future_card_description:
                "아직 기록되지 않은 추억들이 있습니다.",

            closing_japanese:
                "これからも",
            closing_title:
                "더 많은 추억이 기다리고 있습니다.",
            closing_description:
                "이 이야기는 여기서 끝나지 않습니다.",

            close: "닫기",
            previous: "이전",
            next: "다음"

        }
    },


    /* =====================================================
       CHINESE
       ===================================================== */

    zh: {
        gallery: {

            hero_japanese: "思い出",
            hero_eyebrow: "回忆档案",
            hero_title: "珍贵回忆集",
            hero_description:
                "每一个篇章都会留下值得珍藏的美好回忆。",
            scroll: "滚动探索",

            archive: "档案",
            heading: "Nayla 的回忆",
            heading_description:
                "回顾那些塑造成年之前岁月的珍贵瞬间。",

            filter_all: "全部",
            memories: "回忆",

            chapter_01: "第01章",
            chapter_02: "第02章",
            chapter_03: "第03章",
            chapter_06: "第06章",

            memory_2023_alt:
                "Nayla 2023",
            memory_2023_title:
                "开始",
            memory_2023_description:
                "一段美好旅程的第一步。",

            memory_2024_alt:
                "Nayla 2024",
            memory_2024_title:
                "成长",
            memory_2024_description:
                "在 JKT48 School 中不断成长。",

            memory_2025_alt:
                "Nayla 2025",
            memory_2025_title:
                "新的里程碑",
            memory_2025_description:
                "晋升为 Core Member，并在 Sister Reunion Festival 中担任翻译。",

            memory_2026_rh_alt:
                "Nayla Request Hour 2026",
            view_2026_rh:
                "查看 Request Hour 2026 回忆",
            special_moment:
                "特别时刻",
            memory_2026_rh_title:
                "Request Hour 2026",
            memory_2026_rh_description:
                "<strong>Bird</strong> 的特别演出，在 Request Hour 2026 中排名第15位，与 Aurelia 和 Aurhel Alana 一同出演。",

            memory_2026_birthday_alt:
                "Nayla 2026 年 19 岁生日",
            view_2026_birthday:
                "查看 2026 年生日回忆",
            birthday:
                "生日",
            memory_2026_birthday_title:
                "#HappinessNaylalaland19",
            memory_2026_birthday_description:
                "一个充满回忆、爱与幸福的生日。",

            view_2023:
                "查看 2023 年回忆",
            view_2024:
                "查看 2024 年回忆",
            view_2025:
                "查看 2025 年回忆",

            future_kanji:
                "新章",
            future_label:
                "下一篇章",
            future_description:
                "这个页面正在等待新的回忆。",
            future_small:
                "新的开始。",
            future_title:
                "成年之始",
            future_card_description:
                "还有一些回忆尚未被记录。",

            closing_japanese:
                "これからも",
            closing_title:
                "还有更多美好的回忆在等待。",
            closing_description:
                "故事并不会在这里结束。",

            close: "关闭",
            previous: "上一张",
            next: "下一张"

        }
    }

};


/* =========================================================
   02. LANGUAGE
   ========================================================= */

function normalizeGalleryLanguage(language) {

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


function getGalleryLanguage() {

    const stored =
        localStorage.getItem("language") ||
        localStorage.getItem("selectedLanguage") ||
        localStorage.getItem("currentLanguage") ||
        localStorage.getItem("lang");

    const htmlLanguage =
        document.documentElement
            ?.getAttribute("lang");

    return normalizeGalleryLanguage(
        stored ||
        htmlLanguage ||
        "en"
    );
}


/* =========================================================
   03. NESTED TRANSLATION
   ========================================================= */

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


function galleryT(key) {

    if (!key)
        return "";

    const language =
        getGalleryLanguage();

    let value =
        getNestedValue(
            GALLERY_TRANSLATIONS[language],
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
                GALLERY_TRANSLATIONS.en,
                key
            );

    }

    /*
     * Jangan pernah tampilkan raw key.
     */

    if (
        typeof value !== "string"
    ) {
        return "";
    }

    return value;
}


/* =========================================================
   04. APPLY TRANSLATIONS
   ========================================================= */

function applyGalleryTranslations() {

    /*
     * TEXT
     */

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.dataset.i18n;

            const text =
                galleryT(key);

            if (text) {

                /*
                 * data-i18n-html untuk HTML.
                 */

                if (
                    element.hasAttribute(
                        "data-i18n-html"
                    )
                ) {

                    element.innerHTML =
                        text;

                } else {

                    element.textContent =
                        text;

                }

            }

        });


    /*
     * HTML
     */

    document
        .querySelectorAll(
            "[data-i18n-html]"
        )
        .forEach(element => {

            const key =
                element.dataset.i18nHtml;

            const text =
                galleryT(key);

            if (text) {

                element.innerHTML =
                    text;

            }

        });


    /*
     * PLACEHOLDER
     */

    document
        .querySelectorAll(
            "[data-i18n-placeholder]"
        )
        .forEach(element => {

            const key =
                element.dataset.i18nPlaceholder;

            const text =
                galleryT(key);

            if (text) {

                element.placeholder =
                    text;

            }

        });


    /*
     * TITLE
     */

    document
        .querySelectorAll(
            "[data-i18n-title]"
        )
        .forEach(element => {

            const key =
                element.dataset.i18nTitle;

            const text =
                galleryT(key);

            if (text) {

                element.title =
                    text;

            }

        });


    /*
     * ARIA
     *
     * Support:
     * data-i18n-aria
     * data-i18n-aria-label
     */

    document
        .querySelectorAll(
            "[data-i18n-aria], [data-i18n-aria-label]"
        )
        .forEach(element => {

            const key =
                element.dataset.i18nAria ||
                element.dataset.i18nAriaLabel;

            const text =
                galleryT(key);

            if (text) {

                element.setAttribute(
                    "aria-label",
                    text
                );

            }

        });


    /*
     * IMAGE ALT
     */

    document
        .querySelectorAll(
            "[data-i18n-alt]"
        )
        .forEach(element => {

            const key =
                element.dataset.i18nAlt;

            const text =
                galleryT(key);

            if (text) {

                element.alt =
                    text;

            }

        });


    /*
     * Update lightbox if currently open.
     */

    if (
        currentGalleryIndex >= 0
    ) {

        updateLightbox(
            currentGalleryIndex
        );

    }

}


/* =========================================================
   05. GALLERY FILTER
   ========================================================= */

let currentFilter = "all";


function filterGallery(year) {

    currentFilter =
        year;

    const cards =
        document.querySelectorAll(
            ".gallery-card"
        );

    let visibleCount = 0;


    cards.forEach(card => {

        const cardYear =
            card.dataset.year;

        const visible =
            year === "all" ||
            cardYear === year;

        card.style.display =
            visible
                ? ""
                : "none";

        if (visible) {
            visibleCount++;
        }

    });


    const counter =
        document.getElementById(
            "memoryCount"
        );

    if (counter) {

        counter.textContent =
            visibleCount;

    }


    /*
     * Active button.
     */

    document
        .querySelectorAll(
            ".gallery-filter-btn"
        )
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.filter === year
            );

        });

}


function initializeFilters() {

    document
        .querySelectorAll(
            ".gallery-filter-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    filterGallery(
                        button.dataset.filter
                    );

                }
            );

        });


    filterGallery("all");

}


/* =========================================================
   06. LIGHTBOX
   ========================================================= */

let currentGalleryIndex = -1;


function getGalleryCards() {

    return Array.from(
        document.querySelectorAll(
            ".gallery-card:not(.gallery-card-future)"
        )
    );

}


function getGalleryData(index) {

    const cards =
        getGalleryCards();

    const card =
        cards[index];

    if (!card)
        return null;


    const image =
        card.querySelector(
            ".gallery-image img"
        );

    const title =
        card.querySelector(
            ".gallery-info h3"
        );

    const description =
        card.querySelector(
            ".gallery-info p"
        );

    const year =
        card.querySelector(
            ".gallery-year"
        );


    return {

        index,

        image:
            image?.src || "",

        alt:
            image?.alt || "",

        title:
            title?.textContent.trim() || "",

        description:
            description?.innerHTML || "",

        year:
            year?.textContent.trim() || ""

    };

}


/* =========================================================
   OPEN LIGHTBOX
   ========================================================= */

function openLightbox(index) {

    const lightbox =
        document.getElementById(
            "galleryLightbox"
        );

    if (!lightbox)
        return;


    const data =
        getGalleryData(index);

    if (!data)
        return;


    currentGalleryIndex =
        index;


    updateLightbox(index);


    lightbox.classList.add(
        "active"
    );

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "lightbox-open"
    );


    document.body.style.overflow =
        "hidden";

}


function updateLightbox(index) {

    const data =
        getGalleryData(index);

    if (!data)
        return;


    const image =
        document.getElementById(
            "lightboxImage"
        );

    const year =
        document.getElementById(
            "lightboxYear"
        );

    const title =
        document.getElementById(
            "lightboxTitle"
        );

    const description =
        document.getElementById(
            "lightboxDescription"
        );


    if (image) {

        image.src =
            data.image;

        image.alt =
            data.alt;

    }


    if (year) {

        year.textContent =
            data.year;

    }


    if (title) {

        title.textContent =
            data.title;

    }


    if (description) {

        description.innerHTML =
            data.description;

    }

}


/* =========================================================
   CLOSE
   ========================================================= */

function closeLightbox() {

    const lightbox =
        document.getElementById(
            "galleryLightbox"
        );

    if (!lightbox)
        return;


    lightbox.classList.remove(
        "active"
    );

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "lightbox-open"
    );


    document.body.style.overflow =
        "";


    currentGalleryIndex =
        -1;

}


/* =========================================================
   NEXT
   ========================================================= */

function nextGalleryImage() {

    const cards =
        getGalleryCards();

    if (!cards.length)
        return;


    let next =
        currentGalleryIndex + 1;


    if (
        next >= cards.length
    ) {

        next = 0;

    }


    currentGalleryIndex =
        next;


    updateLightbox(
        currentGalleryIndex
    );

}


/* =========================================================
   PREVIOUS
   ========================================================= */

function previousGalleryImage() {

    const cards =
        getGalleryCards();

    if (!cards.length)
        return;


    let previous =
        currentGalleryIndex - 1;


    if (previous < 0) {

        previous =
            cards.length - 1;

    }


    currentGalleryIndex =
        previous;


    updateLightbox(
        currentGalleryIndex
    );

}


/* =========================================================
   07. LIGHTBOX EVENTS
   ========================================================= */

function initializeLightbox() {

    const cards =
        getGalleryCards();


    /*
     * Card buttons
     */

    cards.forEach(
        (card, index) => {

            const button =
                card.querySelector(
                    ".gallery-view"
                );


            if (button) {

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        openLightbox(
                            index
                        );

                    }
                );

            }


            /*
             * Optional: clicking image
             */

            const image =
                card.querySelector(
                    ".gallery-image img"
                );


            if (image) {

                image.style.cursor =
                    "pointer";

                image.addEventListener(
                    "click",
                    () => {

                        openLightbox(
                            index
                        );

                    }
                );

            }

        }
    );


    /*
     * Close
     */

    document
        .getElementById(
            "lightboxClose"
        )
        ?.addEventListener(
            "click",
            closeLightbox
        );


    /*
     * Backdrop
     */

    document
        .querySelector(
            ".lightbox-backdrop"
        )
        ?.addEventListener(
            "click",
            closeLightbox
        );


    /*
     * Previous
     */

    document
        .getElementById(
            "lightboxPrev"
        )
        ?.addEventListener(
            "click",
            previousGalleryImage
        );


    /*
     * Next
     */

    document
        .getElementById(
            "lightboxNext"
        )
        ?.addEventListener(
            "click",
            nextGalleryImage
        );


    /*
     * Keyboard
     */

    document.addEventListener(
        "keydown",
        event => {

            const lightbox =
                document.getElementById(
                    "galleryLightbox"
                );


            if (
                !lightbox ||
                !lightbox.classList.contains(
                    "active"
                )
            ) {
                return;
            }


            switch (
                event.key
            ) {

                case "Escape":

                    closeLightbox();

                    break;


                case "ArrowLeft":

                    previousGalleryImage();

                    break;


                case "ArrowRight":

                    nextGalleryImage();

                    break;

            }

        }
    );

}


/* =========================================================
   08. LANGUAGE EVENTS
   ========================================================= */

function handleGalleryLanguageChange(
    event
) {

    const language =
        event?.detail?.language;


    if (language) {

        const normalized =
            normalizeGalleryLanguage(
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


    applyGalleryTranslations();

}


/*
 * Support multiple existing
 * navbar event names.
 */

window.addEventListener(
    "languageChanged",
    handleGalleryLanguageChange
);

window.addEventListener(
    "languageChange",
    handleGalleryLanguageChange
);

window.addEventListener(
    "langChanged",
    handleGalleryLanguageChange
);

window.addEventListener(
    "galleryLanguageChanged",
    handleGalleryLanguageChange
);


/*
 * Storage
 */

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

            applyGalleryTranslations();

        }

    }
);


/* =========================================================
   09. PUBLIC API
   ========================================================= */

window.GalleryI18n = {

    translate:
        galleryT,

    apply:
        applyGalleryTranslations,

    getLanguage:
        getGalleryLanguage,

    setLanguage:
        function(language) {

            const normalized =
                normalizeGalleryLanguage(
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


            applyGalleryTranslations();

        }

};


/* =========================================================
   10. INITIALIZATION
   ========================================================= */

function initializeGallery() {

    const language =
        getGalleryLanguage();


    document.documentElement
        .setAttribute(
            "lang",
            language
        );


    applyGalleryTranslations();

    initializeFilters();

    initializeLightbox();

}


/* =========================================================
   DOM READY
   ========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeGallery
    );

} else {

    initializeGallery();

}