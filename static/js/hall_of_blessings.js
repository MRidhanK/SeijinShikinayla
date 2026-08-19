/* =========================================================
   HALL_OF_BLESSING.JS
   =========================================================

   Hall of Blessing
   ----------------

   Browser
      ↓
   Flask /api/guestbook
      ↓
   Supabase
      ↓
   Guestbook wishes
      ↓
   Hall of Blessing

   IMPORTANT:
   - Tidak akses Supabase langsung untuk membaca data.
   - Tidak menggunakan endpoint /api/blessing.
   - Tidak menggunakan innerHTML untuk data user.
   - Data diambil dari /api/guestbook.
========================================================= */


/* =========================================================
   CONFIG
========================================================= */

const HALL_API =
    "/api/guestbook";

const HALL_REFRESH_INTERVAL =
    30000;


/* =========================================================
   STATE
========================================================= */

let blessings = [];

let currentFilter =
    "all";

let currentSearch =
    "";

let refreshTimer =
    null;

let isLoading =
    false;


/* =========================================================
   ELEMENTS
========================================================= */

const hallContainer =
    document.getElementById(
        "hallOfBlessing"
    );

const blessingGrid =
    document.getElementById(
        "blessingGrid"
    );

const blessingCount =
    document.getElementById(
        "blessingCount"
    );

const blessingSearch =
    document.getElementById(
        "blessingSearch"
    );

const blessingSort =
    document.getElementById(
        "blessingSort"
    );

const featuredBlessing =
    document.getElementById(
        "featuredBlessing"
    );

const blessingLoading =
    document.getElementById(
        "blessingLoading"
    );

const blessingEmpty =
    document.getElementById(
        "blessingEmpty"
    );

const blessingError =
    document.getElementById(
        "blessingError"
    );

const blessingRetry =
    document.getElementById(
        "blessingRetry"
    );


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeHallOfBlessing();

    }
);


async function initializeHallOfBlessing() {

    bindEvents();

    showLoading();

    await loadBlessings();

    startAutoRefresh();

}


/* =========================================================
   EVENTS
========================================================= */

function bindEvents() {

    if (blessingSearch) {

        blessingSearch.addEventListener(
            "input",
            () => {

                currentSearch =
                    blessingSearch.value
                        .trim()
                        .toLowerCase();

                renderBlessings();

            }
        );

    }


    if (blessingSort) {

        blessingSort.addEventListener(
            "change",
            () => {

                renderBlessings();

            }
        );

    }


    if (blessingRetry) {

        blessingRetry.addEventListener(
            "click",
            () => {

                loadBlessings();

            }
        );

    }

}


/* =========================================================
   LOAD BLESSINGS
========================================================= */

async function loadBlessings() {

    if (isLoading) {

        return;

    }


    isLoading = true;


    showLoading();


    try {

        const response =
            await fetch(
                HALL_API,
                {

                    method: "GET",

                    headers: {

                        "Accept":
                            "application/json"

                    },

                    cache: "no-store"

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

            throw new Error(

                result?.error ||

                `Unable to load blessings (${response.status})`

            );

        }


        /* =================================================
           API ERROR
        ================================================= */

        if (
            !result ||
            result.success !== true
        ) {

            throw new Error(

                result?.error ||

                "Invalid blessing response."

            );

        }


        /* =================================================
           DATA
        ================================================= */

        blessings =
            Array.isArray(
                result.wishes
            )
                ? result.wishes
                : [];


        console.log(
            "Hall of Blessing loaded:",
            blessings.length
        );


        updateBlessingCount();

        renderBlessings();

        renderWishTimeline();

        updateFeaturedBlessing();

        hideLoading();


    } catch (error) {

        console.error(
            "Hall of Blessing error:",
            error
        );


        showError(
            "Unable to load the Hall of Blessing. " +
            "Please try again later."
        );


    } finally {

        isLoading =
            false;

    }

}


/* =========================================================
   FILTER
========================================================= */

function getFilteredBlessings() {

    let result =
        [...blessings];


    /* =====================================================
       SEARCH
    ===================================================== */

    if (currentSearch) {

        result =
            result.filter(
                item => {

                    const name =
                        String(
                            item.name || ""
                        ).toLowerCase();


                    const message =
                        String(
                            item.message || ""
                        ).toLowerCase();


                    const memberType =
                        String(
                            item.member_type || ""
                        ).toLowerCase();


                    return (

                        name.includes(
                            currentSearch
                        )

                        ||

                        message.includes(
                            currentSearch
                        )

                        ||

                        memberType.includes(
                            currentSearch
                        )

                    );

                }
            );

    }


    /* =====================================================
       SORT
    ===================================================== */

    const sortValue =
        blessingSort?.value ||
        "newest";


    switch (
        sortValue
    ) {

        case "oldest":

            result.sort(
                (a, b) =>
                    getDateValue(a) -
                    getDateValue(b)
            );

            break;


        case "liked":

            result.sort(
                (a, b) =>
                    getLikes(b) -
                    getLikes(a)
            );

            break;


        case "longest":

            result.sort(
                (a, b) =>
                    getMessageLength(b) -
                    getMessageLength(a)
            );

            break;


        case "shortest":

            result.sort(
                (a, b) =>
                    getMessageLength(a) -
                    getMessageLength(b)
            );

            break;


        case "newest":

        default:

            result.sort(
                (a, b) =>
                    getDateValue(b) -
                    getDateValue(a)
            );

            break;

    }


    return result;

}


/* =========================================================
   RENDER
========================================================= */

function renderBlessings() {

    if (!blessingGrid) {

        return;

    }


    const filtered =
        getFilteredBlessings();


    blessingGrid.innerHTML =
        "";


    hideEmpty();

    hideError();


    if (!filtered.length) {

        showEmpty();

        return;

    }


    const fragment =
        document.createDocumentFragment();


    filtered.forEach(
        (blessing, index) => {

            const card =
                createBlessingCard(
                    blessing,
                    index
                );


            fragment.appendChild(
                card
            );

        }
    );


    blessingGrid.appendChild(
        fragment
    );

}

/* =========================================================
   RENDER WISH TIMELINE
========================================================= */

function renderWishTimeline() {

    const timeline =
        document.getElementById(
            "wishTimeline"
        );


    if (!timeline) {

        return;

    }


    timeline.innerHTML = "";


    /* =====================================================
       EMPTY
    ===================================================== */

    if (!blessings.length) {

        const empty =
            document.createElement(
                "div"
            );


        empty.className =
            "timeline-empty";


        empty.textContent =
            "No wishes have been shared yet.";


        timeline.appendChild(
            empty
        );


        return;

    }


    /* =====================================================
       SORT CHRONOLOGICALLY
       Oldest → Newest
    ===================================================== */

    const timelineBlessings =
        [...blessings].sort(
            (a, b) =>
                getDateValue(a) -
                getDateValue(b)
        );


    const fragment =
        document.createDocumentFragment();


    timelineBlessings.forEach(
        (item) => {

            const timelineItem =
                document.createElement(
                    "article"
                );


            timelineItem.className =
                "timeline-item";


            timelineItem.dataset.id =
                item.id || "";


            /* =============================================
               DOT
            ============================================= */

            const dot =
                document.createElement(
                    "div"
                );


            dot.className =
                "timeline-dot";


            /* =============================================
               CARD
            ============================================= */

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "timeline-card";


            /* =============================================
               NAME
            ============================================= */

            const name =
                document.createElement(
                    "div"
                );


            name.className =
                "timeline-name";


            name.textContent =
                item.name ||
                "Anonymous";


            /* =============================================
               MESSAGE
            ============================================= */

            const message =
                document.createElement(
                    "div"
                );


            message.className =
                "timeline-message";


            message.textContent =
                item.message ||
                "";


            /* =============================================
               DATE
            ============================================= */

            const date =
                document.createElement(
                    "div"
                );


            date.className =
                "timeline-date";


            const dateValue =
                getDate(item);


            if (dateValue) {

                date.textContent =
                    formatDate(
                        dateValue
                    );

            }


            /* =============================================
               APPEND
            ============================================= */

            card.appendChild(
                name
            );


            card.appendChild(
                message
            );


            card.appendChild(
                date
            );


            timelineItem.appendChild(
                dot
            );


            timelineItem.appendChild(
                card
            );


            fragment.appendChild(
                timelineItem
            );

        }
    );


    timeline.appendChild(
        fragment
    );

}


/* =========================================================
   CREATE CARD
========================================================= */

function createBlessingCard(
    item,
    index
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "blessing-card";


    card.dataset.id =
        item.id || "";


    /* =====================================================
       EMOJI / MOOD
    ===================================================== */

    const mood =
        document.createElement(
            "div"
        );


    mood.className =
        "blessing-mood";


    mood.textContent =
        item.mood ||
        "🌸";


    /* =====================================================
       NUMBER
    ===================================================== */

    const number =
        document.createElement(
            "span"
        );


    number.className =
        "blessing-number";


    number.textContent =
        `#${index + 1}`;


    /* =====================================================
       NAME
    ===================================================== */

    const name =
        document.createElement(
            "h3"
        );


    name.className =
        "blessing-name";


    name.textContent =
        item.name ||
        "Anonymous";


    /* =====================================================
       MESSAGE
    ===================================================== */

    const message =
        document.createElement(
            "p"
        );


    message.className =
        "blessing-message";


    message.textContent =
        item.message ||
        "";


    /* =====================================================
       MEMBER TYPE
    ===================================================== */

    const member =
        document.createElement(
            "span"
        );


    member.className =
        "blessing-member";


    member.textContent =
        item.member_type ||
        "Fan";


    /* =====================================================
       LIKE
    ===================================================== */

    const likes =
        document.createElement(
            "span"
        );


    likes.className =
        "blessing-likes";


    likes.textContent =
        `❤️ ${getLikes(item)}`;


    /* =====================================================
       DATE
    ===================================================== */

    const date =
        document.createElement(
            "time"
        );


    date.className =
        "blessing-date";


    const dateValue =
        getDate(item);


    if (dateValue) {

        date.dateTime =
            dateValue.toISOString();


        date.textContent =
            formatDate(
                dateValue
            );

    }


    /* =====================================================
       FOOTER
    ===================================================== */

    const footer =
        document.createElement(
            "div"
        );


    footer.className =
        "blessing-footer";


    const meta =
        document.createElement(
            "div"
        );


    meta.className =
        "blessing-meta";


    meta.appendChild(
        member
    );


    meta.appendChild(
        date
    );


    footer.appendChild(
        meta
    );


    footer.appendChild(
        likes
    );


    /* =====================================================
       CONTENT
    ===================================================== */

    const content =
        document.createElement(
            "div"
        );


    content.className =
        "blessing-content";


    content.appendChild(
        number
    );


    content.appendChild(
        mood
    );


    content.appendChild(
        name
    );


    content.appendChild(
        message
    );


    content.appendChild(
        footer
    );


    card.appendChild(
        content
    );


    return card;

}


/* =========================================================
   FEATURED BLESSING
========================================================= */

function updateFeaturedBlessing() {

    if (
        !featuredBlessing ||
        !blessings.length
    ) {

        return;

    }


    /*
     * Pilih blessing secara random.
     */

    const randomIndex =
        Math.floor(
            Math.random() *
            blessings.length
        );


    const blessing =
        blessings[
            randomIndex
        ];


    if (!blessing) {

        return;

    }


    featuredBlessing
        .textContent =
        `"${blessing.message || ""}" — ${
            blessing.name || "Anonymous"
        }`;

}


/* =========================================================
   FEATURED ROTATION
========================================================= */

setInterval(
    () => {

        updateFeaturedBlessing();

    },
    8000
);


/* =========================================================
   COUNT
========================================================= */

function updateBlessingCount() {

    if (!blessingCount) {

        return;

    }


    const value =
        blessings.length;


    blessingCount.textContent =
        String(value);

}


/* =========================================================
   DATE
========================================================= */

function getDate(item) {

    /*
     * Support kedua nama kolom:
     *
     * created_at
     * created_date
     *
     * Karena struktur database yang kamu tunjukkan
     * sebelumnya memiliki created_date.
     */

    const raw =
        item?.created_at ||
        item?.created_date ||
        item?.updated_at ||
        null;


    if (!raw) {

        return null;

    }


    const date =
        new Date(raw);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return null;

    }


    return date;

}


function getDateValue(item) {

    const date =
        getDate(item);


    return date
        ? date.getTime()
        : 0;

}


function formatDate(value) {

    if (!value) {

        return "";

    }


    const date =
        value instanceof Date
            ? value
            : new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "";

    }


    return date.toLocaleDateString(
        "en-US",
        {

            month: "short",

            day: "numeric",

            year: "numeric"

        }
    );

}


/* =========================================================
   HELPERS
========================================================= */

function getLikes(item) {

    return Number(
        item?.likes || 0
    );

}


function getMessageLength(item) {

    return String(
        item?.message || ""
    ).length;

}


/* =========================================================
   LOADING
========================================================= */

function showLoading() {

    if (blessingLoading) {

        blessingLoading.style.display =
            "";

    }

    if (blessingGrid) {

        blessingGrid.style.display =
            "none";

    }

    hideEmpty();

    hideError();

}


function hideLoading() {

    if (blessingLoading) {

        blessingLoading.style.display =
            "none";

    }

    if (blessingGrid) {

        blessingGrid.style.display =
            "";

    }

}


/* =========================================================
   EMPTY
========================================================= */

function showEmpty() {

    if (blessingEmpty) {

        blessingEmpty.style.display =
            "";

    }

}


function hideEmpty() {

    if (blessingEmpty) {

        blessingEmpty.style.display =
            "none";

    }

}


/* =========================================================
   ERROR
========================================================= */

function showError(message) {

    hideLoading();

    hideEmpty();


    if (blessingError) {

        blessingError.textContent =
            message;

        blessingError.style.display =
            "";

    } else if (blessingGrid) {

        blessingGrid.innerHTML =
            "";


        const error =
            document.createElement(
                "div"
            );


        error.className =
            "blessing-error";


        error.textContent =
            message;


        blessingGrid.appendChild(
            error
        );

    }

}


function hideError() {

    if (blessingError) {

        blessingError.style.display =
            "none";

    }

}


/* =========================================================
   AUTO REFRESH
========================================================= */

function startAutoRefresh() {

    if (refreshTimer) {

        clearInterval(
            refreshTimer
        );

    }


    refreshTimer =
        setInterval(
            () => {

                /*
                 * Jangan refresh ketika
                 * tab tidak terlihat.
                 */

                if (
                    document.hidden
                ) {

                    return;

                }


                loadBlessings();

            },
            HALL_REFRESH_INTERVAL
        );

}


/* =========================================================
   VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            !document.hidden &&
            blessings.length === 0
        ) {

            loadBlessings();

        }

    }
);


/* =========================================================
   MANUAL GLOBAL REFRESH
========================================================= */

window.refreshHallOfBlessing =
    function () {

        loadBlessings();

    };


/* =========================================================
   CLEANUP
========================================================= */

window.addEventListener(
    "beforeunload",
    () => {

        if (refreshTimer) {

            clearInterval(
                refreshTimer
            );

            refreshTimer =
                null;

        }

    }
);