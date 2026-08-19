document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       COUNTDOWN NAYLA
       Target: 18 June 2027
    ===================================================== */

    const targetDate = new Date(
        "2027-06-18T00:00:00"
    ).getTime();


    /* =====================================================
       AMBIL ELEMENT
    ===================================================== */

    const daysEl = document.getElementById("countdown-days");
    const hoursEl = document.getElementById("countdown-hours");
    const minutesEl = document.getElementById("countdown-minutes");
    const secondsEl = document.getElementById("countdown-seconds");

    const timerEl = document.querySelector(".countdown-timer");
    const finishedEl = document.getElementById("countdown-finished");


    /* =====================================================
       CEK ELEMENT
    ===================================================== */

    if (
        !daysEl ||
        !hoursEl ||
        !minutesEl ||
        !secondsEl
    ) {
        console.error(
            "Countdown error: element countdown tidak ditemukan."
        );

        return;
    }


    /* =====================================================
       FORMAT ANGKA
    ===================================================== */

    function formatNumber(number) {

        return String(number).padStart(2, "0");

    }


    /* =====================================================
       UPDATE COUNTDOWN
    ===================================================== */

    function updateCountdown() {

        const now = Date.now();

        const distance = targetDate - now;


        /* -------------------------------------------------
           JIKA SUDAH MENCAPAI TANGGAL TARGET
        ------------------------------------------------- */

        if (distance <= 0) {

            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";


            if (timerEl) {
                timerEl.style.display = "none";
            }


            if (finishedEl) {
                finishedEl.style.display = "flex";
            }


            return;
        }


        /* -------------------------------------------------
           HITUNG HARI
        ------------------------------------------------- */

        const days = Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );


        /* -------------------------------------------------
           HITUNG JAM
        ------------------------------------------------- */

        const hours = Math.floor(
            (distance / (1000 * 60 * 60)) % 24
        );


        /* -------------------------------------------------
           HITUNG MENIT
        ------------------------------------------------- */

        const minutes = Math.floor(
            (distance / (1000 * 60)) % 60
        );


        /* -------------------------------------------------
           HITUNG DETIK
        ------------------------------------------------- */

        const seconds = Math.floor(
            (distance / 1000) % 60
        );


        /* -------------------------------------------------
           MASUKKAN KE HTML
        ------------------------------------------------- */

        daysEl.textContent = formatNumber(days);

        hoursEl.textContent = formatNumber(hours);

        minutesEl.textContent = formatNumber(minutes);

        secondsEl.textContent = formatNumber(seconds);


        /* Debug di Console */

        console.log(
            `Countdown: ${days} hari ${hours} jam ${minutes} menit ${seconds} detik`
        );

    }


    /* =====================================================
       JALANKAN LANGSUNG
    ===================================================== */

    updateCountdown();


    /* =====================================================
       UPDATE SETIAP 1 DETIK
    ===================================================== */

    const countdownInterval = setInterval(
        updateCountdown,
        1000
    );


    /* =====================================================
       CLEANUP
    ===================================================== */

    window.addEventListener(
        "beforeunload",
        function () {

            clearInterval(countdownInterval);

        }
    );

});
