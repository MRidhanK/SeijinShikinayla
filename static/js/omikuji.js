/* ==========================================
   OMIKUJI
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const drawButton = document.getElementById("drawOmikuji");

    const stick = document.querySelector(".omikuji-stick");

    const stickNumber = document.getElementById("omikujiNumber");

    const paper = document.getElementById("omikujiPaper");

    const fortuneTitle = document.getElementById("fortuneTitle");

    const fortuneIcon = document.getElementById("fortuneIcon");

    const fortuneMessage = document.getElementById("fortuneMessage");

    const fortuneBlessing = document.getElementById("fortuneBlessing");


    // Kalau halaman tidak memiliki Omikuji
    if (!drawButton) return;


    /* ==========================================
       FORTUNE DATA
    ========================================== */

    const fortunes = [

        {
            title: "大吉 • GREAT BLESSING",
            icon: "🌸",
            message:
                "A beautiful beginning is waiting for you. May your wishes bloom like cherry blossoms.",
            blessing:
                "Your path is filled with happiness and wonderful memories."
        },

        {
            title: "吉 • GOOD FORTUNE",
            icon: "🎋",
            message:
                "Good things are slowly finding their way to you. Keep believing in your dreams.",
            blessing:
                "Patience will bring beautiful results."
        },

        {
            title: "中吉 • MODERATE BLESSING",
            icon: "🌿",
            message:
                "Your journey may take time, but every small step brings you closer to something meaningful.",
            blessing:
                "Trust the process and keep moving forward."
        },

        {
            title: "小吉 • SMALL BLESSING",
            icon: "🌷",
            message:
                "A small moment of happiness may become an unforgettable memory.",
            blessing:
                "Treasure the little things."
        },

        {
            title: "末吉 • FUTURE BLESSING",
            icon: "🕊️",
            message:
                "Your best moments are still ahead. Keep your heart open to new possibilities.",
            blessing:
                "The future holds something beautiful."
        },

        {
            title: "吉 • HAPPY FORTUNE",
            icon: "💮",
            message:
                "Your kindness will return to you in unexpected ways.",
            blessing:
                "May your days be filled with smiles."
        }

    ];


    /* ==========================================
       DRAW FORTUNE
    ========================================== */

    drawButton.addEventListener("click", () => {

        // Cegah spam klik saat animasi
        if (drawButton.dataset.loading === "true") {
            return;
        }

        drawButton.dataset.loading = "true";

        drawButton.disabled = true;


        /* ==========================================
           STICK ANIMATION
        ========================================== */

        if (stick) {

            stick.classList.remove("drawing");

            // force reflow agar animasi bisa dimainkan ulang
            void stick.offsetWidth;

            stick.classList.add("drawing");

        }


        /* ==========================================
           RANDOM NUMBER
        ========================================== */

        const randomNumber =
            Math.floor(Math.random() * 99) + 1;

        if (stickNumber) {

            stickNumber.textContent = randomNumber;

        }


        /* ==========================================
           RANDOM FORTUNE
        ========================================== */

        const fortune =
            fortunes[
                Math.floor(Math.random() * fortunes.length)
            ];


        /* ==========================================
           DELAY REVEAL
        ========================================== */

        setTimeout(() => {

            if (fortuneTitle) {

                fortuneTitle.textContent =
                    fortune.title;

            }

            if (fortuneIcon) {

                fortuneIcon.textContent =
                    fortune.icon;

            }

            if (fortuneMessage) {

                fortuneMessage.textContent =
                    fortune.message;

            }

            if (fortuneBlessing) {

                fortuneBlessing.textContent =
                    fortune.blessing;

            }


            /* ==========================================
               PAPER ANIMATION
            ========================================== */

            if (paper) {

                paper.classList.remove("show");

                void paper.offsetWidth;

                paper.classList.add("show");

            }


            /* ==========================================
               CONFETTI
            ========================================== */

            if (typeof confetti === "function") {

                confetti({

                    particleCount: 80,

                    spread: 70,

                    origin: {
                        y: 0.65
                    }

                });

            }


            drawButton.textContent =
                "🌸 Draw Again";


            drawButton.disabled = false;

            delete drawButton.dataset.loading;


        }, 900);

    });

});