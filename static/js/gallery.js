/* =========================================================
   GUESTBOOK.JS
   =========================================================

   5 LANGUAGE SYSTEM
   ID • EN • JA • KO • ZH

   LANGUAGE SOURCE:
   - localStorage.language
   - localStorage.selectedLanguage
   - localStorage.currentLanguage
   - localStorage.lang
   - document.documentElement.lang

   NAVBAR EVENTS:
   - languageChanged
   - languageChange
   - langChanged

   FLOW:

   Browser
      ↓
   Flask /api/guestbook
      ↓
   Validation + Moderation + Rate Limit
      ↓
   Supabase
      ↓
   Guestbook

   Supabase tetap digunakan untuk:
   - realtime update
   - like melalui RPC

   INSERT guestbook TIDAK dilakukan langsung
   ke Supabase dari browser.
========================================================= */


/* =========================================================
   01. TRANSLATION DICTIONARY
========================================================= */

const GUESTBOOK_TRANSLATIONS = {

    /* =====================================================
       INDONESIAN
    ===================================================== */

    id: {

        yourName: "Nama Kamu",
        yourMessage: "Pesanmu...",

        loadingWishes: "Memuat Harapan...",

        unableToLoadWishes:
            "Tidak Dapat Memuat Harapan",

        pleaseTryAgainLater:
            "Silakan coba lagi nanti.",

        tryAgain:
            "Coba Lagi",

        noWishesYet:
            "Belum Ada Harapan",

        beFirstToHang:
            "Jadilah yang pertama menggantung Ema.",

        noWishesFound:
            "Harapan Tidak Ditemukan",

        tryAnotherSearch:
            "Coba pencarian lain.",

        likeThisWish:
            "Sukai harapan ini",

        alreadyLiked:
            "Kamu sudah menyukai harapan ini ❤️",

        failedToLike:
            "Gagal menyukai harapan ini. Silakan coba lagi.",

        enterName:
            "Silakan masukkan nama kamu.",

        writeMessage:
            "Silakan tuliskan pesan kamu.",

        nameTooLong:
            "Nama harus maksimal {max} karakter.",

        messageTooLong:
            "Pesan harus maksimal {max} karakter.",

        hangingEma:
            "Sedang menggantung Ema... 🌸",

        failedSubmit:
            "Gagal mengirim harapan. Silakan coba lagi.",

        unableConnect:
            "Tidak dapat terhubung ke server. Silakan coba lagi.",

        wordsNotAllowed:
            "Pesan kamu mengandung kata-kata yang tidak diperbolehkan.",

        tooManyRequests:
            "Terlalu banyak permintaan. Silakan tunggu sebentar.",

        checkMessage:
            "Silakan periksa kembali pesan kamu.",

        serverError:
            "Server tidak dapat memproses harapan kamu.",

        somethingWrong:
            "Terjadi kesalahan. Silakan coba lagi.",

        anonymous:
            "Anonim",

        searchPlaceholder:
            "Cari harapan..."
    },


    /* =====================================================
       ENGLISH
    ===================================================== */

    en: {

        yourName:
            "Your Name",

        yourMessage:
            "Your message...",

        loadingWishes:
            "Loading Wishes...",

        unableToLoadWishes:
            "Unable to Load Wishes",

        pleaseTryAgainLater:
            "Please try again later.",

        tryAgain:
            "Try Again",

        noWishesYet:
            "No Wishes Yet",

        beFirstToHang:
            "Be the first to hang an Ema.",

        noWishesFound:
            "No Wishes Found",

        tryAnotherSearch:
            "Try another search.",

        likeThisWish:
            "Like this wish",

        alreadyLiked:
            "You already liked this wish ❤️",

        failedToLike:
            "Failed to like this wish. Please try again.",

        enterName:
            "Please enter your name.",

        writeMessage:
            "Please write your message.",

        nameTooLong:
            "Name must be {max} characters or less.",

        messageTooLong:
            "Message must be {max} characters or less.",

        hangingEma:
            "Hanging your Ema... 🌸",

        failedSubmit:
            "Failed to submit your wish. Please try again.",

        unableConnect:
            "Unable to connect to the server. Please try again.",

        wordsNotAllowed:
            "Your message contains words that are not allowed.",

        tooManyRequests:
            "Too many requests. Please wait a moment.",

        checkMessage:
            "Please check your message and try again.",

        serverError:
            "The server could not process your wish.",

        somethingWrong:
            "Something went wrong. Please try again.",

        anonymous:
            "Anonymous",

        searchPlaceholder:
            "Search wishes..."
    },


    /* =====================================================
       JAPANESE
    ===================================================== */

    ja: {

        yourName:
            "あなたの名前",

        yourMessage:
            "あなたのメッセージ...",

        loadingWishes:
            "願いを読み込んでいます...",

        unableToLoadWishes:
            "願いを読み込めません",

        pleaseTryAgainLater:
            "後でもう一度お試しください。",

        tryAgain:
            "もう一度試す",

        noWishesYet:
            "まだ願いはありません",

        beFirstToHang:
            "最初の絵馬を掛けてみましょう。",

        noWishesFound:
            "願いが見つかりません",

        tryAnotherSearch:
            "別のキーワードで検索してください。",

        likeThisWish:
            "この願いにいいね",

        alreadyLiked:
            "この願いにはすでにいいねしています ❤️",

        failedToLike:
            "いいねに失敗しました。もう一度お試しください。",

        enterName:
            "名前を入力してください。",

        writeMessage:
            "メッセージを書いてください。",

        nameTooLong:
            "名前は{max}文字以内で入力してください。",

        messageTooLong:
            "メッセージは{max}文字以内で入力してください。",

        hangingEma:
            "絵馬を掛けています... 🌸",

        failedSubmit:
            "願いを送信できませんでした。もう一度お試しください。",

        unableConnect:
            "サーバーに接続できません。もう一度お試しください。",

        wordsNotAllowed:
            "使用できない言葉が含まれています。",

        tooManyRequests:
            "リクエストが多すぎます。少しお待ちください。",

        checkMessage:
            "メッセージを確認してください。",

        serverError:
            "サーバーで願いを処理できませんでした。",

        somethingWrong:
            "問題が発生しました。もう一度お試しください。",

        anonymous:
            "匿名",

        searchPlaceholder:
            "願いを検索..."
    },


    /* =====================================================
       KOREAN
    ===================================================== */

    ko: {

        yourName:
            "이름",

        yourMessage:
            "메시지...",

        loadingWishes:
            "소원을 불러오는 중...",

        unableToLoadWishes:
            "소원을 불러올 수 없습니다",

        pleaseTryAgainLater:
            "잠시 후 다시 시도해주세요.",

        tryAgain:
            "다시 시도",

        noWishesYet:
            "아직 소원이 없습니다",

        beFirstToHang:
            "첫 번째 에마를 걸어보세요.",

        noWishesFound:
            "소원을 찾을 수 없습니다",

        tryAnotherSearch:
            "다른 검색어를 입력해보세요.",

        likeThisWish:
            "이 소원 좋아요",

        alreadyLiked:
            "이미 이 소원에 좋아요를 눌렀습니다 ❤️",

        failedToLike:
            "좋아요를 누르지 못했습니다. 다시 시도해주세요.",

        enterName:
            "이름을 입력해주세요.",

        writeMessage:
            "메시지를 작성해주세요.",

        nameTooLong:
            "이름은 최대 {max}자까지 입력할 수 있습니다.",

        messageTooLong:
            "메시지는 최대 {max}자까지 입력할 수 있습니다.",

        hangingEma:
            "에마를 걸고 있습니다... 🌸",

        failedSubmit:
            "소원을 제출하지 못했습니다. 다시 시도해주세요.",

        unableConnect:
            "서버에 연결할 수 없습니다. 다시 시도해주세요.",

        wordsNotAllowed:
            "사용할 수 없는 단어가 포함되어 있습니다.",

        tooManyRequests:
            "요청이 너무 많습니다. 잠시 기다려주세요.",

        checkMessage:
            "메시지를 확인해주세요.",

        serverError:
            "서버에서 소원을 처리할 수 없습니다.",

        somethingWrong:
            "문제가 발생했습니다. 다시 시도해주세요.",

        anonymous:
            "익명",

        searchPlaceholder:
            "소원 검색..."
    },


    /* =====================================================
       CHINESE
    ===================================================== */

    zh: {

        yourName:
            "你的名字",

        yourMessage:
            "你的留言...",

        loadingWishes:
            "正在加载愿望...",

        unableToLoadWishes:
            "无法加载愿望",

        pleaseTryAgainLater:
            "请稍后再试。",

        tryAgain:
            "重试",

        noWishesYet:
            "还没有愿望",

        beFirstToHang:
            "成为第一个挂上绘马的人。",

        noWishesFound:
            "没有找到愿望",

        tryAnotherSearch:
            "请尝试其他搜索内容。",

        likeThisWish:
            "喜欢这个愿望",

        alreadyLiked:
            "你已经喜欢过这个愿望了 ❤️",

        failedToLike:
            "点赞失败，请再试一次。",

        enterName:
            "请输入你的名字。",

        writeMessage:
            "请输入你的留言。",

        nameTooLong:
            "名字最多只能输入 {max} 个字符。",

        messageTooLong:
            "留言最多只能输入 {max} 个字符。",

        hangingEma:
            "正在挂上绘马... 🌸",

        failedSubmit:
            "愿望提交失败，请再试一次。",

        unableConnect:
            "无法连接服务器，请再试一次。",

        wordsNotAllowed:
            "你的留言包含不允许使用的词语。",

        tooManyRequests:
            "请求过于频繁，请稍等片刻。",

        checkMessage:
            "请检查你的留言后再试。",

        serverError:
            "服务器无法处理你的愿望。",

        somethingWrong:
            "发生了一些问题，请再试一次。",

        anonymous:
            "匿名",

        searchPlaceholder:
            "搜索愿望..."
    }

};


/* =========================================================
   02. LANGUAGE DETECTION
========================================================= */

function normalizeGuestbookLanguage(
    language
) {

    const value =
        String(
            language || ""
        )
            .toLowerCase()
            .trim();


    if (
        value === "id" ||
        value.startsWith("id-")
    ) {

        return "id";

    }


    if (
        value === "en" ||
        value.startsWith("en-")
    ) {

        return "en";

    }


    if (
        value === "ja" ||
        value.startsWith("ja-")
    ) {

        return "ja";

    }


    if (
        value === "ko" ||
        value.startsWith("ko-")
    ) {

        return "ko";

    }


    if (
        value === "zh" ||
        value.startsWith("zh-")
    ) {

        return "zh";

    }


    return "en";

}


function getCurrentGuestbookLanguage() {

    const storedLanguage =
        localStorage.getItem(
            "language"
        ) ||
        localStorage.getItem(
            "selectedLanguage"
        ) ||
        localStorage.getItem(
            "currentLanguage"
        ) ||
        localStorage.getItem(
            "lang"
        );


    const htmlLanguage =
        document.documentElement
            ?.getAttribute("lang");


    return normalizeGuestbookLanguage(
        storedLanguage ||
        htmlLanguage ||
        "en"
    );

}


/* =========================================================
   03. TRANSLATION HELPER
========================================================= */

function guestbookT(
    key,
    replacements = {}
) {

    const language =
        getCurrentGuestbookLanguage();


    let text =
        GUESTBOOK_TRANSLATIONS[
            language
        ]?.[key];


    if (
        typeof text !==
        "string"
    ) {

        text =
            GUESTBOOK_TRANSLATIONS
                .en?.[key];

    }


    if (
        typeof text !==
        "string"
    ) {

        text = key;

    }


    Object.entries(
        replacements
    ).forEach(
        ([name, value]) => {

            text =
                text.replace(
                    new RegExp(
                        `\\{${name}\\}`,
                        "g"
                    ),
                    String(value)
                );

        }
    );


    return text;

}


/* =========================================================
   04. STATIC HTML TRANSLATION
========================================================= */

function applyGuestbookTranslations() {

    /*
     * Elemen HTML:
     *
     * <span data-i18n="yourName"></span>
     *
     * akan mengambil:
     *
     * GUESTBOOK_TRANSLATIONS[currentLanguage]
     */

    document
        .querySelectorAll(
            "[data-i18n]"
        )
        .forEach(
            element => {

                const key =
                    element.dataset.i18n;


                if (!key) {
                    return;
                }


                element.textContent =
                    guestbookT(key);

            }
        );


    /*
     * Placeholder
     *
     * <input
     *     data-i18n-placeholder="yourName"
     * >
     */

    document
        .querySelectorAll(
            "[data-i18n-placeholder]"
        )
        .forEach(
            element => {

                const key =
                    element.dataset
                        .i18nPlaceholder;


                if (!key) {
                    return;
                }


                element.placeholder =
                    guestbookT(key);

            }
        );


    updateGuestbookDynamicText();

}


/* =========================================================
   05. NAVBAR LANGUAGE SYNC
========================================================= */

function handleGuestbookLanguageChange() {

    applyGuestbookTranslations();


    /*
     * Preview harus langsung berubah.
     */

    initializePreview();


    /*
     * Placeholder search.
     */

    if (searchInput) {

        searchInput.placeholder =
            guestbookT(
                "searchPlaceholder"
            );

    }


    /*
     * Card harus dirender ulang
     * karena beberapa teks card
     * bersifat dynamic.
     */

    if (wishes.length) {

        filterAndRender();

    } else {

        renderGuestbook();

    }

}


/* =========================================================
   06. DYNAMIC TRANSLATION
========================================================= */

function updateGuestbookDynamicText() {

    if (previewName) {

        previewName.textContent =
            guestName?.value.trim() ||
            guestbookT("yourName");

    }


    if (previewMessage) {

        previewMessage.textContent =
            guestMessage?.value.trim() ||
            guestbookT("yourMessage");

    }


    if (searchInput) {

        searchInput.placeholder =
            guestbookT(
                "searchPlaceholder"
            );

    }

}


/* =========================================================
   07. ELEMENTS
========================================================= */

const form =
    document.getElementById(
        "guestbookForm"
    );


const wall =
    document.getElementById(
        "emaWall"
    );


const guestName =
    document.getElementById(
        "guestName"
    );


const guestMessage =
    document.getElementById(
        "guestMessage"
    );


const counter =
    document.getElementById(
        "charCounter"
    );


const previewName =
    document.getElementById(
        "previewName"
    );


const previewMessage =
    document.getElementById(
        "previewMessage"
    );


const wishCount =
    document.getElementById(
        "wishCount"
    );


const toast =
    document.getElementById(
        "toast"
    );


const searchInput =
    document.getElementById(
        "searchWish"
    );


const sortSelect =
    document.getElementById(
        "sortWish"
    );


/* =========================================================
   08. CONFIG
========================================================= */

const MAX_NAME_LENGTH =
    50;


const MAX_MESSAGE_LENGTH =
    1000;


const API_GUESTBOOK =
    "/api/guestbook";


/* =========================================================
   09. STATE
========================================================= */

let wishes = [];

let isSubmitting = false;

let realtimeChannel = null;


/* =========================================================
   10. INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeGuestbook();

    }
);


async function initializeGuestbook() {

    /*
     * Terapkan bahasa navbar terlebih dahulu.
     */

    applyGuestbookTranslations();


    updateCharacterCounter();

    initializePreview();


    await loadGuestbook();


    initGuestbookRealtime();

}


/* =========================================================
   NAVBAR EVENTS
========================================================= */

window.addEventListener(
    "languageChanged",
    handleGuestbookLanguageChange
);


window.addEventListener(
    "languageChange",
    handleGuestbookLanguageChange
);


window.addEventListener(
    "langChanged",
    handleGuestbookLanguageChange
);


/* =========================================================
   STORAGE EVENT
========================================================= */

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

            handleGuestbookLanguageChange();

        }

    }
);


/* =========================================================
   HTML LANG OBSERVER
========================================================= */

const guestbookLanguageObserver =
    new MutationObserver(
        mutations => {

            for (
                const mutation
                of mutations
            ) {

                if (
                    mutation.attributeName ===
                    "lang"
                ) {

                    handleGuestbookLanguageChange();

                    break;

                }

            }

        }
    );


if (
    document.documentElement
) {

    guestbookLanguageObserver.observe(
        document.documentElement,
        {
            attributes: true,
            attributeFilter: [
                "lang"
            ]
        }
    );

}


/* =========================================================
   11. PREVIEW
========================================================= */

function initializePreview() {

    updateGuestbookDynamicText();

}


/* =========================================================
   NAME INPUT
========================================================= */

if (guestName) {

    guestName.addEventListener(
        "input",
        () => {

            let value =
                guestName.value;


            if (
                value.length >
                MAX_NAME_LENGTH
            ) {

                value =
                    value.substring(
                        0,
                        MAX_NAME_LENGTH
                    );


                guestName.value =
                    value;

            }


            if (previewName) {

                previewName.textContent =
                    value.trim() ||
                    guestbookT(
                        "yourName"
                    );

            }

        }
    );

}


/* =========================================================
   MESSAGE INPUT
========================================================= */

if (guestMessage) {

    guestMessage.addEventListener(
        "input",
        () => {

            if (
                guestMessage.value.length >
                MAX_MESSAGE_LENGTH
            ) {

                guestMessage.value =
                    guestMessage.value.substring(
                        0,
                        MAX_MESSAGE_LENGTH
                    );

            }


            updateCharacterCounter();


            if (previewMessage) {

                previewMessage.textContent =
                    guestMessage.value.trim() ||
                    guestbookT(
                        "yourMessage"
                    );

            }

        }
    );

}


/* =========================================================
   CHARACTER COUNTER
========================================================= */

function updateCharacterCounter() {

    if (
        !counter ||
        !guestMessage
    ) {

        return;

    }


    counter.textContent =
        `${guestMessage.value.length}/${MAX_MESSAGE_LENGTH}`;

}


/* =========================================================
   11. FORM SUBMIT
========================================================= */

if (form) {

    form.addEventListener(
        "submit",
        handleGuestbookSubmit
    );

}


async function handleGuestbookSubmit(
    event
) {

    event.preventDefault();


    if (isSubmitting) {
        return;
    }


    const name =
        guestName?.value.trim() ||
        "";


    const message =
        guestMessage?.value.trim() ||
        "";


    /* =====================================================
       CLIENT VALIDATION
    ===================================================== */

    if (!name) {

        showGuestbookError(
            guestbookT(
                "enterName"
            )
        );


        guestName?.focus();

        return;

    }


    if (!message) {

        showGuestbookError(
            guestbookT(
                "writeMessage"
            )
        );


        guestMessage?.focus();

        return;

    }


    if (
        name.length >
        MAX_NAME_LENGTH
    ) {

        showGuestbookError(
            guestbookT(
                "nameTooLong",
                {
                    max:
                        MAX_NAME_LENGTH
                }
            )
        );


        return;

    }


    if (
        message.length >
        MAX_MESSAGE_LENGTH
    ) {

        showGuestbookError(
            guestbookT(
                "messageTooLong",
                {
                    max:
                        MAX_MESSAGE_LENGTH
                }
            )
        );


        return;

    }


    /* =====================================================
       SUBMIT
    ===================================================== */

    isSubmitting = true;

    setSubmitState(true);


    try {

        const response =
            await fetch(
                API_GUESTBOOK,
                {
                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Accept":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            name,

                            message,

                            member_type:
                                "Fan",

                            mood:
                                "🌸"

                        })

                }
            );


        let result =
            null;


        try {

            result =
                await response.json();

        } catch {

            result =
                null;

        }


        /* =================================================
           HTTP ERROR
        ================================================= */

        if (!response.ok) {

            handleGuestbookApiError(
                response,
                result
            );

            return;

        }


        /* =================================================
           APPLICATION ERROR
        ================================================= */

        if (
            !result ||
            result.success !== true
        ) {

            showGuestbookError(
                result?.error ||
                guestbookT(
                    "failedSubmit"
                )
            );

            return;

        }


        /* =================================================
           SUCCESS
        ================================================= */

        sessionStorage.removeItem(
            "prayerBellRung"
        );


        form.reset();


        initializePreview();


        updateCharacterCounter();


        showToast();


        /* =================================================
           ADD NEW WISH LOCALLY
        ================================================= */

        if (result.wish) {

            const existing =
                wishes.some(
                    item =>
                        String(
                            item.id
                        ) ===
                        String(
                            result.wish.id
                        )
                );


            if (!existing) {

                wishes.unshift(
                    result.wish
                );

            }


            filterAndRender();

        } else {

            await loadGuestbook();

        }


    } catch (error) {

        console.error(
            "Guestbook submission error:",
            error
        );


        showGuestbookError(
            guestbookT(
                "unableConnect"
            )
        );


    } finally {

        isSubmitting =
            false;


        setSubmitState(
            false
        );

    }

}


/* =========================================================
   SUBMIT BUTTON STATE
========================================================= */

function setSubmitState(
    loading
) {

    if (!form) {
        return;
    }


    const submitButton =
        form.querySelector(
            'button[type="submit"], input[type="submit"]'
        );


    if (!submitButton) {
        return;
    }


    if (loading) {

        submitButton.disabled =
            true;


        submitButton.dataset
            .originalText =
                submitButton.textContent;


        submitButton.textContent =
            guestbookT(
                "hangingEma"
            );

    } else {

        submitButton.disabled =
            false;


        if (
            submitButton.dataset
                .originalText
        ) {

            submitButton.textContent =
                submitButton.dataset
                    .originalText;

        }

    }

}


/* =========================================================
   12. API ERROR HANDLER
========================================================= */

function handleGuestbookApiError(
    response,
    result
) {

    const status =
        response.status;


    /* =====================================================
       MODERATION
    ===================================================== */

    if (
        status === 400 &&
        result?.blocked
    ) {

        showGuestbookError(
            result.error ||
            guestbookT(
                "wordsNotAllowed"
            )
        );


        return;

    }


    /* =====================================================
       RATE LIMIT
    ===================================================== */

    if (
        status === 429
    ) {

        showGuestbookError(
            result?.error ||
            guestbookT(
                "tooManyRequests"
            )
        );


        return;

    }


    /* =====================================================
       VALIDATION
    ===================================================== */

    if (
        status === 400
    ) {

        showGuestbookError(
            result?.error ||
            guestbookT(
                "checkMessage"
            )
        );


        return;

    }


    /* =====================================================
       SERVER ERROR
    ===================================================== */

    if (
        status >= 500
    ) {

        showGuestbookError(
            result?.error ||
            guestbookT(
                "serverError"
            )
        );


        return;

    }


    /* =====================================================
       FALLBACK
    ===================================================== */

    showGuestbookError(
        result?.error ||
        guestbookT(
            "somethingWrong"
        )
    );

}


/* =========================================================
   13. LOAD GUESTBOOK
========================================================= */

async function loadGuestbook() {

    if (!wall) {
        return;
    }


    wall.innerHTML = `

        <div class="loading">

            🌸

            ${guestbookT(
                "loadingWishes"
            )}

        </div>

    `;


    try {

        /*
         * GET dilakukan melalui Flask.
         *
         * INSERT dan GET tetap melalui:
         *
         * /api/guestbook
         */

        const response =
            await fetch(
                API_GUESTBOOK,
                {
                    method:
                        "GET",

                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            );


        let result =
            null;


        try {

            result =
                await response.json();

        } catch {

            result =
                null;

        }


        if (
            !response.ok
        ) {

            throw new Error(
                result?.error ||
                `Guestbook request failed (${response.status})`
            );

        }


        if (
            !result ||
            result.success !== true
        ) {

            throw new Error(
                result?.error ||
                "Invalid guestbook response."
            );

        }


        wishes =
            Array.isArray(
                result.wishes
            )
                ? result.wishes
                : [];


        renderGuestbook();


        updateFeaturedWish();


    } catch (error) {

        console.error(
            "Guestbook loading error:",
            error
        );


        wall.innerHTML = `

            <div class="empty-wall">

                <div class="empty-icon">
                    🌸
                </div>

                <h3>
                    ${guestbookT(
                        "unableToLoadWishes"
                    )}
                </h3>

                <p>
                    ${guestbookT(
                        "pleaseTryAgainLater"
                    )}
                </p>

                <button
                    type="button"
                    onclick="loadGuestbook()"
                >
                    ${guestbookT(
                        "tryAgain"
                    )}
                </button>

            </div>

        `;

    }

}


/* =========================================================
   RENDER GUESTBOOK
========================================================= */

function renderGuestbook() {

    if (!wishCount) {

        buildRows();

        return;

    }


    animateCounter(
        wishCount,
        wishes.length
    );


    if (
        wishes.length === 0
    ) {

        wall.innerHTML = `

            <div class="empty-wall">

                <div class="empty-icon">
                    🌸
                </div>

                <h3>
                    ${guestbookT(
                        "noWishesYet"
                    )}
                </h3>

                <p>
                    ${guestbookT(
                        "beFirstToHang"
                    )}
                </p>

            </div>

        `;


        return;

    }


    buildRows();

}


/* =========================================================
   COUNTER ANIMATION
========================================================= */

function animateCounter(
    target,
    value
) {

    if (!target) {
        return;
    }


    const numericValue =
        Number(value) || 0;


    if (
        numericValue === 0
    ) {

        target.textContent =
            "0";

        return;

    }


    const current =
        Number(
            target.textContent
        ) || 0;


    if (
        current ===
        numericValue
    ) {

        target.textContent =
            String(
                numericValue
            );

        return;

    }


    const duration =
        500;


    const startTime =
        performance.now();


    function updateCounter(
        currentTime
    ) {

        const elapsed =
            currentTime -
            startTime;


        const progress =
            Math.min(
                elapsed /
                duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 -
                progress,
                3
            );


        const number =
            Math.round(
                current +
                (
                    numericValue -
                    current
                ) *
                eased
            );


        target.textContent =
            String(
                number
            );


        if (
            progress < 1
        ) {

            requestAnimationFrame(
                updateCounter
            );

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}


/* =========================================================
   CREATE EMA CARD
========================================================= */

function createCard(
    item
) {

    const rotate = [
        -5,
        -3,
        -2,
        2,
        3,
        5
    ];


    const card =
        document.createElement(
            "div"
        );


    card.className =
        "ema-card";


    card.style.setProperty(
        "--ema-id",
        String(
            item.id || ""
        )
    );


    card.dataset.id =
        item.id;


    card.dataset.name =
        String(
            item.name || ""
        )
            .toLowerCase();


    card.style.transform =
        `rotate(${
            rotate[
                Math.floor(
                    Math.random() *
                    rotate.length
                )
            ]
        }deg)`;


    /*
     * IMPORTANT:
     *
     * name/message berasal dari user.
     *
     * Gunakan textContent.
     *
     * Jangan menggunakan:
     *
     * innerHTML =
     * item.message
     *
     * agar HTML/script dari user
     * tidak dirender sebagai HTML.
     */


    const string =
        document.createElement(
            "div"
        );


    string.className =
        "ema-string";


    const woodTop =
        document.createElement(
            "div"
        );


    woodTop.className =
        "wood-top";


    const content =
        document.createElement(
            "div"
        );


    content.className =
        "ema-content";


    const nameElement =
        document.createElement(
            "h3"
        );


    nameElement.className =
        "ema-name";


    nameElement.textContent =
        item.name ||
        guestbookT(
            "anonymous"
        );


    const messageElement =
        document.createElement(
            "p"
        );


    messageElement.className =
        "ema-message";


    messageElement.textContent =
        item.message ||
        "";


    content.appendChild(
        nameElement
    );


    content.appendChild(
        messageElement
    );


    const footer =
        document.createElement(
            "div"
        );


    footer.className =
        "ema-footer";


    const mood =
        document.createElement(
            "span"
        );


    mood.textContent =
        item.mood ||
        "🌸";


    const likeButton =
        document.createElement(
            "button"
        );


    likeButton.type =
        "button";


    likeButton.className =
        "like-btn";


    likeButton.dataset.id =
        item.id;


    likeButton.setAttribute(
        "aria-label",
        guestbookT(
            "likeThisWish"
        )
    );


    const heart =
        document.createTextNode(
            "❤️ "
        );


    const likeCount =
        document.createElement(
            "span"
        );


    likeCount.className =
        "like-count";


    likeCount.textContent =
        String(
            Number(
                item.likes
            ) || 0
        );


    likeButton.appendChild(
        heart
    );


    likeButton.appendChild(
        likeCount
    );


    footer.appendChild(
        mood
    );


    footer.appendChild(
        likeButton
    );


    const date =
        document.createElement(
            "div"
        );


    date.className =
        "ema-date";


    date.textContent =
        formatDate(
            item.created_at
        );


    card.appendChild(
        string
    );


    card.appendChild(
        woodTop
    );


    card.appendChild(
        content
    );


    card.appendChild(
        footer
    );


    card.appendChild(
        date
    );


    return card;

}


/* =========================================================
   DATE FORMAT
========================================================= */

function formatDate(
    dateValue
) {

    if (!dateValue) {
        return "";
    }


    const date =
        new Date(
            dateValue
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "";

    }


    const language =
        getCurrentGuestbookLanguage();


    const localeMap = {

        id:
            "id-ID",

        en:
            "en-US",

        ja:
            "ja-JP",

        ko:
            "ko-KR",

        zh:
            "zh-CN"

    };


    return date.toLocaleDateString(
        localeMap[
            language
        ] ||
        "en-US",
        {

            month:
                "short",

            day:
                "numeric",

            year:
                "numeric"

        }
    );

}


/* =========================================================
   14. SEARCH
========================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterAndRender
    );

}


if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        filterAndRender
    );

}


function filterAndRender() {

    let filtered =
        [...wishes];


    const keyword =
        searchInput?.value
            .trim()
            .toLowerCase() ||
        "";


    /* =====================================================
       SEARCH
    ===================================================== */

    if (keyword) {

        filtered =
            filtered.filter(
                item => {

                    const name =
                        String(
                            item.name ||
                            ""
                        )
                            .toLowerCase();


                    const message =
                        String(
                            item.message ||
                            ""
                        )
                            .toLowerCase();


                    return (
                        name.includes(
                            keyword
                        ) ||
                        message.includes(
                            keyword
                        )
                    );

                }
            );

    }


    /* =====================================================
       SORT
    ===================================================== */

    switch (
        sortSelect?.value
    ) {

        case "newest":

            filtered.sort(
                (a, b) =>
                    new Date(
                        b.created_at
                    ) -
                    new Date(
                        a.created_at
                    )
            );

            break;


        case "oldest":

            filtered.sort(
                (a, b) =>
                    new Date(
                        a.created_at
                    ) -
                    new Date(
                        b.created_at
                    )
            );

            break;


        case "longest":

            filtered.sort(
                (a, b) =>
                    String(
                        b.message ||
                        ""
                    ).length -
                    String(
                        a.message ||
                        ""
                    ).length
            );

            break;


        case "shortest":

            filtered.sort(
                (a, b) =>
                    String(
                        a.message ||
                        ""
                    ).length -
                    String(
                        b.message ||
                        ""
                    ).length
            );

            break;

    }


    buildRows(
        filtered
    );

}


/* =========================================================
   BUILD ROWS
========================================================= */

function buildRows(
    data = wishes
) {

    if (!wall) {
        return;
    }


    wall.innerHTML =
        "";


    if (
        !data.length
    ) {

        wall.innerHTML = `

            <div class="empty-wall">

                <div class="empty-icon">
                    🌸
                </div>

                <h3>
                    ${guestbookT(
                        "noWishesFound"
                    )}
                </h3>

                <p>
                    ${guestbookT(
                        "tryAnotherSearch"
                    )}
                </p>

            </div>

        `;


        return;

    }


    const cardsPerRow =
        3;


    for (
        let i = 0;
        i < data.length;
        i += cardsPerRow
    ) {

        const row =
            document.createElement(
                "div"
            );


        row.className =
            "ema-row";


        const rope =
            document.createElement(
                "div"
            );


        rope.className =
            "rope-line";


        const grid =
            document.createElement(
                "div"
            );


        grid.className =
            "ema-row-grid";


        data
            .slice(
                i,
                i + cardsPerRow
            )
            .forEach(
                item => {

                    grid.appendChild(
                        createCard(
                            item
                        )
                    );

                }
            );


        row.appendChild(
            rope
        );


        row.appendChild(
            grid
        );


        wall.appendChild(
            row
        );

    }

}


/* =========================================================
   15. FEATURED WISH
========================================================= */

setInterval(
    updateFeaturedWish,
    8000
);


function updateFeaturedWish() {

    if (
        !wishes.length
    ) {

        return;

    }


    const featured =
        document.getElementById(
            "featuredWish"
        );


    if (!featured) {
        return;
    }


    const random =
        wishes[
            Math.floor(
                Math.random() *
                wishes.length
            )
        ];


    /*
     * User content tetap menggunakan
     * textContent.
     */

    featured.textContent =
        `"${random.message}" — ${random.name}`;

}


/* =========================================================
   TOAST
========================================================= */

function showToast() {

    if (!toast) {
        return;
    }


    /*
     * Jika toast mempunyai
     * data-i18n, applyTranslation
     * navbar tetap dapat mengubahnya.
     */


    toast.classList.add(
        "show"
    );


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        2500
    );

}


/* =========================================================
   ERROR MESSAGE
========================================================= */

function showGuestbookError(
    message
) {

    if (toast) {

        toast.textContent =
            message;


        toast.classList.add(
            "show"
        );


        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3500
        );


        return;

    }


    alert(
        message
    );

}


/* =========================================================
   SAKURA
========================================================= */

const sakuraLayer =
    document.querySelector(
        ".guestbook-sakura"
    );


if (sakuraLayer) {

    setInterval(
        () => {

            const petal =
                document.createElement(
                    "span"
                );


            petal.className =
                "petal";


            petal.style.left =
                Math.random() *
                100 +
                "%";


            petal.style.animationDuration =
                7 +
                Math.random() *
                5 +
                "s";


            sakuraLayer.appendChild(
                petal
            );


            setTimeout(
                () => {

                    petal.remove();

                },
                12000
            );

        },
        500
    );

}


/* =========================================================
   16. LIKE
========================================================= */

document.addEventListener(
    "click",
    handleLikeClick
);


async function handleLikeClick(
    event
) {

    const btn =
        event.target.closest(
            ".like-btn"
        );


    if (!btn) {
        return;
    }


    const id =
        btn.dataset.id;


    if (!id) {
        return;
    }


    if (
        btn.dataset.loading ===
        "true"
    ) {

        return;

    }


    /*
     * Local protection.
     *
     * Bukan security utama.
     * Hanya mencegah user normal
     * menekan tombol berkali-kali.
     */

    if (
        localStorage.getItem(
            "liked_" + id
        )
    ) {

        showGuestbookError(
            guestbookT(
                "alreadyLiked"
            )
        );


        return;

    }


    btn.dataset.loading =
        "true";


    btn.classList.add(
        "liked"
    );


    try {

        if (
            typeof supabaseClient ===
            "undefined"
        ) {

            throw new Error(
                "Supabase client is not available."
            );

        }


        const {
            data,
            error
        } =
            await supabaseClient.rpc(
                "increment_guestbook_like",
                {
                    row_id:
                        Number(id)
                }
            );


        if (error) {
            throw error;
        }


        /*
         * RPC mengembalikan jumlah
         * like terbaru.
         */

        const newCount =
            Array.isArray(
                data
            )
                ? data[0]
                : data;


        const count =
            btn.querySelector(
                ".like-count"
            );


        if (count) {

            count.textContent =
                String(
                    Number(
                        newCount
                    ) || 0
                );

        }


        const wish =
            wishes.find(
                item =>
                    String(
                        item.id
                    ) ===
                    String(
                        id
                    )
            );


        if (wish) {

            wish.likes =
                Number(
                    newCount
                ) || 0;

        }


        localStorage.setItem(
            "liked_" + id,
            "true"
        );


        spawnHeart(
            btn
        );


    } catch (error) {

        console.error(
            "Like error:",
            error
        );


        showGuestbookError(
            guestbookT(
                "failedToLike"
            )
        );


    } finally {

        delete btn.dataset.loading;


        setTimeout(
            () => {

                btn.classList.remove(
                    "liked"
                );

            },
            300
        );

    }

}


/* =========================================================
   FLOATING HEART
========================================================= */

function spawnHeart(
    btn
) {

    if (!btn) {
        return;
    }


    const heart =
        document.createElement(
            "span"
        );


    heart.className =
        "floating-heart";


    heart.textContent =
        "❤️";


    const rect =
        btn.getBoundingClientRect();


    heart.style.left =
        rect.left +
        window.scrollX +
        20 +
        "px";


    heart.style.top =
        rect.top +
        window.scrollY +
        "px";


    document.body.appendChild(
        heart
    );


    setTimeout(
        () => {

            heart.remove();

        },
        1000
    );

}


/* =========================================================
   17. REALTIME
========================================================= */

function initGuestbookRealtime() {

    if (
        typeof supabaseClient ===
        "undefined"
    ) {

        console.error(
            "supabaseClient belum tersedia."
        );


        return;

    }


    /*
     * Hindari channel dibuat dua kali.
     */

    if (realtimeChannel) {
        return;
    }


    realtimeChannel =
        supabaseClient
            .channel(
                "guestbook-realtime"
            )


            /* =============================================
               INSERT
            ============================================= */

            .on(
                "postgres_changes",
                {

                    event:
                        "INSERT",

                    schema:
                        "public",

                    table:
                        "guestbook"

                },

                payload => {

                    handleRealtimeInsert(
                        payload.new
                    );

                }
            )


            /* =============================================
               UPDATE
            ============================================= */

            .on(
                "postgres_changes",
                {

                    event:
                        "UPDATE",

                    schema:
                        "public",

                    table:
                        "guestbook"

                },

                payload => {

                    handleRealtimeUpdate(
                        payload.new
                    );

                }
            )


            .subscribe();

}


/* =========================================================
   REALTIME INSERT
========================================================= */

function handleRealtimeInsert(
    newWish
) {

    if (!newWish) {
        return;
    }


    const exists =
        wishes.some(
            item =>
                String(
                    item.id
                ) ===
                String(
                    newWish.id
                )
        );


    if (exists) {
        return;
    }


    wishes.unshift(
        newWish
    );


    if (wishCount) {

        animateCounter(
            wishCount,
            wishes.length
        );

    }


    filterAndRender();


    updateFeaturedWish();

}


/* =========================================================
   REALTIME UPDATE
========================================================= */

function handleRealtimeUpdate(
    updatedWish
) {

    if (!updatedWish) {
        return;
    }


    const index =
        wishes.findIndex(
            item =>
                String(
                    item.id
                ) ===
                String(
                    updatedWish.id
                )
        );


    if (
        index === -1
    ) {

        return;

    }


    wishes[index] = {

        ...wishes[index],

        ...updatedWish

    };


    /*
     * Update like count tanpa
     * reload seluruh guestbook.
     */

    const btn =
        document.querySelector(
            `.like-btn[data-id="${updatedWish.id}"]`
        );


    if (btn) {

        const count =
            btn.querySelector(
                ".like-count"
            );


        if (count) {

            count.textContent =
                String(
                    Number(
                        updatedWish.likes
                    ) || 0
                );

        }

    }

}


/* =========================================================
   MANUAL REFRESH
========================================================= */

function resizeGuestbook() {

    filterAndRender();

}


/* =========================================================
   CLEANUP
========================================================= */

window.addEventListener(
    "beforeunload",
    () => {

        if (
            realtimeChannel &&
            typeof supabaseClient !==
            "undefined"
        ) {

            supabaseClient.removeChannel(
                realtimeChannel
            );


            realtimeChannel =
                null;

        }

    }
);