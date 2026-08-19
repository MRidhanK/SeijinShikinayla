/* =========================================
   SEIJIN SHIKI OPENING CEREMONY
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const opening = document.getElementById("openingScreen");

    if (!opening) return;

    const enterButton = document.getElementById("enterCeremony");
    const audio = document.getElementById("openingAudio");
    const torii = document.querySelector(".torii");

    const nav =
        performance.getEntriesByType("navigation")[0];

    const navType = nav ? nav.type : "navigate";

    /*
        navigate
        reload
        back_forward
    */

    /*
        Kalau pindah dari Gallery -> Home
        jangan tampilkan opening lagi
    */

    if (navType === "navigate" &&
        sessionStorage.getItem("visitedHome")) {

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

    enterButton.addEventListener("click", () => {

        enterButton.disabled = true;

        sessionStorage.setItem(
            "visitedHome",
            "true"
        );

        if (audio) {

            audio.currentTime = 0;

            audio.play().catch(() => {});

        }

        torii?.classList.add("open");

        enterButton.classList.add(
            "enter-active"
        );

        opening.classList.add(
            "ceremony-entering"
        );

        setTimeout(() => {

            document.body.classList.remove(
                "ceremony-locked"
            );

        }, 1200);

        setTimeout(() => {

            opening.classList.add(
                "opening-hidden"
            );

        }, 2200);

        setTimeout(() => {

            opening.remove();

        }, 3400);

    });

});
window.addEventListener("beforeunload", () => {

    if (performance.getEntriesByType("navigation")[0]?.type === "reload") {

        sessionStorage.removeItem("visitedHome");

    }

});