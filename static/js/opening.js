/* =========================================
   SEIJIN SHIKI OPENING CEREMONY
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const opening =
        document.getElementById("openingScreen");

    if (!opening) return;


    const enterButton =
        document.getElementById("enterCeremony");

    const audio =
        document.getElementById("openingAudio");

    const torii =
        document.querySelector(".torii");


    const nav =
        performance.getEntriesByType("navigation")[0];

    const navType =
        nav ? nav.type : "navigate";


    /*
        navigate
        reload
        back_forward
    */


    /*
        Kalau pindah dari Gallery -> Home
        jangan tampilkan opening lagi
    */

    if (
        navType === "navigate" &&
        sessionStorage.getItem("visitedHome")
    ) {

        opening.remove();

        document.body.classList.remove(
            "ceremony-locked"
        );

        return;
    }


    /*
        Kalau pertama kali buka home
        atau refresh
    */

    document.body.classList.add(
        "ceremony-locked"
    );

    opening.classList.add(
        "opening-visible"
    );


    if (audio) {

        audio.volume = 0.4;

    }


    /* =========================================
       SAVE CEREMONY ENTRY
       
       Data IP, device, browser dan user-agent
       DIAMBIL OLEH FLASK SERVER.
       
       Jangan mengambil IP dari frontend.
    ========================================= */

    async function saveCeremonyEntry() {

        try {

            const response =
                await fetch(
                    "/api/ceremony-entry",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            "Accept":
                                "application/json"
                        },

                        body: JSON.stringify({
                            event:
                                "Enter Ceremony"
                        }),

                        /*
                            Jangan membuat proses
                            opening ceremony menunggu
                            terlalu lama.
                        */

                        keepalive: true
                    }
                );


            let result = null;


            try {

                result =
                    await response.json();

            } catch {

                result = null;

            }


            if (
                !response.ok ||
                !result ||
                result.success !== true
            ) {

                console.warn(
                    "Ceremony entry was not saved.",
                    result
                );

                return false;

            }


            console.log(
                "Ceremony entry saved successfully."
            );


            return true;


        } catch (error) {

            /*
                Kalau Supabase/API error,
                CEREMONY TETAP BOLEH DIBUKA.

                Jadi database tidak akan
                mengganggu animasi opening.
            */

            console.warn(
                "Ceremony entry error:",
                error
            );


            return false;

        }

    }


    /* =========================================
       ENTER CEREMONY
    ========================================= */

    enterButton.addEventListener(
        "click",
        async () => {

            /*
                Mencegah double click
            */

            if (enterButton.disabled) {
                return;
            }


            enterButton.disabled = true;


            /*
                Simpan status Home
            */

            sessionStorage.setItem(
                "visitedHome",
                "true"
            );


            /*
                SAVE DATA KE SUPABASE
            */

            saveCeremonyEntry();


            /*
                AUDIO
            */

            if (audio) {

                audio.currentTime = 0;

                audio.play().catch(() => {});

            }


            /*
                TORII OPEN
            */

            torii?.classList.add(
                "open"
            );


            /*
                BUTTON ANIMATION
            */

            enterButton.classList.add(
                "enter-active"
            );


            /*
                OPENING ENTERING
            */

            opening.classList.add(
                "ceremony-entering"
            );


            /*
                UNLOCK BODY
            */

            setTimeout(() => {

                document.body.classList.remove(
                    "ceremony-locked"
                );

            }, 1200);


            /*
                HIDE OPENING
            */

            setTimeout(() => {

                opening.classList.add(
                    "opening-hidden"
                );

            }, 2200);


            /*
                REMOVE OPENING
            */

            setTimeout(() => {

                opening.remove();

            }, 3400);

        }
    );

});


/* =========================================
   BEFORE UNLOAD
========================================= */

window.addEventListener(
    "beforeunload",
    () => {

        if (
            performance
                .getEntriesByType(
                    "navigation"
                )[0]?.type === "reload"
        ) {

            sessionStorage.removeItem(
                "visitedHome"
            );

        }

    }
);