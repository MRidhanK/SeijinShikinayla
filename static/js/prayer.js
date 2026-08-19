/* ==========================================
   PRAYER BELL
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const bell =
        document.getElementById("prayerBell");

    const status =
        document.getElementById("prayerStatus");

    const japanese =
        document.getElementById("prayerJapanese");

    const section =
        document.querySelector(".prayer-section");


    if (!bell) return;


    /* ==========================================
       AUDIO
    ========================================== */

    let audioContext = null;


    function playBellSound() {

        try {

            if (!audioContext) {

                audioContext =
                    new (
                        window.AudioContext ||
                        window.webkitAudioContext
                    )();

            }


            if (
                audioContext.state ===
                "suspended"
            ) {

                audioContext.resume();

            }


            const now =
                audioContext.currentTime;


            /*
             * Main gong
             */

            const oscillator =
                audioContext.createOscillator();

            const gain =
                audioContext.createGain();


            oscillator.type =
                "sine";


            oscillator.frequency.setValueAtTime(
                280,
                now
            );


            oscillator.frequency.exponentialRampToValueAtTime(
                180,
                now + 1.8
            );


            gain.gain.setValueAtTime(
                0,
                now
            );


            gain.gain.linearRampToValueAtTime(
                0.3,
                now + 0.02
            );


            gain.gain.exponentialRampToValueAtTime(
                0.001,
                now + 2
            );


            oscillator.connect(gain);

            gain.connect(
                audioContext.destination
            );


            oscillator.start(now);

            oscillator.stop(
                now + 2
            );


            /*
             * Harmonic
             */

            const harmonic =
                audioContext.createOscillator();

            const harmonicGain =
                audioContext.createGain();


            harmonic.type =
                "sine";


            harmonic.frequency.setValueAtTime(
                560,
                now
            );


            harmonicGain.gain.setValueAtTime(
                0,
                now
            );


            harmonicGain.gain.linearRampToValueAtTime(
                0.08,
                now + 0.02
            );


            harmonicGain.gain.exponentialRampToValueAtTime(
                0.001,
                now + 1.4
            );


            harmonic.connect(
                harmonicGain
            );

            harmonicGain.connect(
                audioContext.destination
            );


            harmonic.start(now);

            harmonic.stop(
                now + 1.5
            );


        } catch (error) {

            console.warn(
                "Prayer bell sound unavailable:",
                error
            );

        }

    }


    /* ==========================================
       RING BELL
    ========================================== */

bell.addEventListener(
    "click",
    () => {

        playBellSound();

        bell.classList.remove("ringing");

        void bell.offsetWidth;

        bell.classList.add("ringing");

        status.textContent =
            "Your prayer has been delivered. 🔔";

        japanese.textContent =
            "願いを届けました";

        window.prayerCompleted = true;

        if (section) {

            section.classList.add(
                "prayer-complete"
            );

        }

        setTimeout(() => {

            bell.classList.remove(
                "ringing"
            );

        }, 1200);

    }
);
window.prayerCompleted = false; 
});
