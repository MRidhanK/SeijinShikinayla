document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       COUNTDOWN NAYLA
       Target: 18 June 2027
    ===================================================== */

    const targetDate = new Date("2027-06-18T00:00:00+07:00").getTime();

    /* Berapa lama sebelum target lagu mulai diputar (ms) */
    const SONG_LEAD_TIME_MS = 3000;


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
       ================  JEMBATAN AUDIO  ===================
       Objek global yang dipakai bareng opening.js supaya
       lagu ulang tahun HANYA diputar setelah user benar-benar
       "masuk" ke halaman (klik Enter Ceremony), bukan otomatis
       begitu countdown menyentuh nol.

       - entered : true kalau user sudah klik Enter Ceremony
                   (atau opening sudah di-skip sebelumnya)
       - pending : true kalau perayaan sudah mau mulai tapi
                   user belum masuk, jadi lagu "ditahan" dulu
       - play    : referensi ke fungsi playBirthdaySong(),
                   dipanggil oleh opening.js saat user masuk
    ===================================================== */

    window.NaylaCeremonyAudio = window.NaylaCeremonyAudio || {
        entered: false,
        pending: false,
        play: null
    };


    /* =====================================================
       ================  LAGU ULANG TAHUN  =================
       Coba mainkan file MP3 dulu, kalau tidak ada,
       fallback ke melodi instrumental via Web Audio API.
    ===================================================== */

    let birthdayAudioEl = null;
    let birthdayAudioCtx = null;
    let songStarted = false;

    /* Ganti path ini sesuai lokasi file MP3 kamu (opsional) */
    const BIRTHDAY_SONG_PATH = "/static/audio/voice/Happy_Birthday.mp3";

    function playBirthdaySongFile() {

        return new Promise(function (resolve, reject) {

            birthdayAudioEl = new Audio(BIRTHDAY_SONG_PATH);
            birthdayAudioEl.volume = 0.8;

            birthdayAudioEl.addEventListener("canplaythrough", function () {
                birthdayAudioEl.play().then(resolve).catch(reject);
            }, { once: true });

            birthdayAudioEl.addEventListener("error", function () {
                reject(new Error("File lagu tidak ditemukan: " + BIRTHDAY_SONG_PATH));
            }, { once: true });

            /* Timeout jaga-jaga kalau event tidak pernah terpanggil */
            setTimeout(function () {
                reject(new Error("Timeout memuat file lagu."));
            }, 2500);

        });

    }

    /* -----------------------------------------------------
       FALLBACK: Melodi instrumental sederhana (Web Audio API)
       Tidak memakai lirik/vokal, murni nada.
    ----------------------------------------------------- */

    function playBirthdayTuneSynth() {

        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;

        birthdayAudioCtx = new AudioCtx();

        /* Setiap baris: [frekuensi Hz, durasi detik] */
        const melody = [
            [523.25, 0.3], [523.25, 0.2], [587.33, 0.5], [523.25, 0.5], [698.46, 0.5], [659.25, 1.0],
            [523.25, 0.3], [523.25, 0.2], [587.33, 0.5], [523.25, 0.5], [783.99, 0.5], [698.46, 1.0],
            [523.25, 0.3], [523.25, 0.2], [1046.50, 0.5], [880.00, 0.5], [698.46, 0.5], [659.25, 0.5], [587.33, 0.8],
            [932.33, 0.3], [932.33, 0.2], [880.00, 0.5], [698.46, 0.5], [783.99, 0.5], [698.46, 1.0]
        ];

        let startTime = birthdayAudioCtx.currentTime + 0.1;

        melody.forEach(function (note) {

            const freq = note[0];
            const dur = note[1];

            const osc = birthdayAudioCtx.createOscillator();
            const gain = birthdayAudioCtx.createGain();

            osc.type = "sine";
            osc.frequency.value = freq;

            gain.gain.setValueAtTime(0.0001, startTime);
            gain.gain.exponentialRampToValueAtTime(0.3, startTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.0001, startTime + dur);

            osc.connect(gain);
            gain.connect(birthdayAudioCtx.destination);

            osc.start(startTime);
            osc.stop(startTime + dur + 0.05);

            startTime += dur;

        });

    }

    function playBirthdaySong() {

        if (songStarted) return;
        songStarted = true;

        playBirthdaySongFile().catch(function (err) {
            console.warn(err.message + " — memakai melodi bawaan sebagai gantinya.");
            playBirthdayTuneSynth();
        });

    }

    /* Daftarkan fungsi ini supaya opening.js bisa memanggilnya
       begitu user klik "Enter Ceremony" */
    window.NaylaCeremonyAudio.play = playBirthdaySong;

    function stopBirthdaySong() {

        if (birthdayAudioEl) {
            birthdayAudioEl.pause();
            birthdayAudioEl.currentTime = 0;
            birthdayAudioEl = null;
        }

        if (birthdayAudioCtx) {
            birthdayAudioCtx.close();
            birthdayAudioCtx = null;
        }

        songStarted = false;

    }

    /* -----------------------------------------------------
       TRIGGER LAGU LEBIH AWAL (SEBELUM COUNTDOWN 00:00:00)
       Dipanggil begitu sisa waktu <= SONG_LEAD_TIME_MS.
       Menggunakan gerbang entered/pending yang sama seperti
       startCelebration, supaya tetap konsisten dengan
       opening.js (lagu baru benar-benar bunyi setelah user
       klik Enter Ceremony).
    ----------------------------------------------------- */

    let songTriggered = false;

    function triggerBirthdaySongEarly() {

        if (songTriggered) return;
        songTriggered = true;

        if (window.NaylaCeremonyAudio.entered) {
            playBirthdaySong();
        } else {
            window.NaylaCeremonyAudio.pending = true;
        }

    }


    /* =====================================================
       ================  CELEBRATION  =====================
       Confetti + Fireworks + Balon + Sparkle + Banner
    ===================================================== */

    let celebrationStarted = false;

    let celebCanvas = null;
    let celebCtx = null;
    let celebAnimationId = null;

    let confettiParticles = [];
    let fireworkParticles = [];
    let sparkleParticles = [];
    let balloonEls = [];

    let bannerEl = null;
    let overlayEl = null;

    const palette = [
        "#ffd700", // emas
        "#ff6b6b",
        "#feca57",
        "#48dbfb",
        "#1dd1a1",
        "#ff9ff3",
        "#f368e0",
        "#54a0ff",
        "#ffffff"
    ];


    /* -----------------------------------------------------
       SETUP CANVAS
    ----------------------------------------------------- */

    function createCelebCanvas() {

        celebCanvas = document.createElement("canvas");
        celebCanvas.id = "celebration-canvas";

        celebCanvas.style.position = "fixed";
        celebCanvas.style.top = "0";
        celebCanvas.style.left = "0";
        celebCanvas.style.width = "100%";
        celebCanvas.style.height = "100%";
        celebCanvas.style.pointerEvents = "none";
        celebCanvas.style.zIndex = "9998";

        document.body.appendChild(celebCanvas);

        celebCanvas.width = window.innerWidth;
        celebCanvas.height = window.innerHeight;

        celebCtx = celebCanvas.getContext("2d");

        window.addEventListener("resize", function () {

            if (!celebCanvas) return;

            celebCanvas.width = window.innerWidth;
            celebCanvas.height = window.innerHeight;

        });

    }


    /* -----------------------------------------------------
       CONFETTI
    ----------------------------------------------------- */

    function createConfettiParticle() {

        return {
            x: Math.random() * celebCanvas.width,
            y: -20 - Math.random() * celebCanvas.height,
            size: 6 + Math.random() * 7,
            color: palette[Math.floor(Math.random() * palette.length)],
            speedY: 2 + Math.random() * 3.5,
            speedX: -1.5 + Math.random() * 3,
            rotation: Math.random() * 360,
            rotationSpeed: -6 + Math.random() * 12,
            shape: Math.random() > 0.5 ? "rect" : "circle"
        };

    }

    function drawConfettiParticle(p) {

        celebCtx.save();

        celebCtx.translate(p.x, p.y);
        celebCtx.rotate((p.rotation * Math.PI) / 180);

        celebCtx.fillStyle = p.color;

        if (p.shape === "rect") {

            celebCtx.fillRect(
                -p.size / 2,
                -p.size / 4,
                p.size,
                p.size / 2
            );

        } else {

            celebCtx.beginPath();
            celebCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            celebCtx.fill();

        }

        celebCtx.restore();

    }

    function updateConfetti() {

        confettiParticles.forEach(function (p) {

            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotationSpeed;

            if (p.y > celebCanvas.height + 20) {
                p.y = -20;
                p.x = Math.random() * celebCanvas.width;
            }

            drawConfettiParticle(p);

        });

    }


    /* -----------------------------------------------------
       SPARKLE EMAS (mengambang pelan, mewah)
    ----------------------------------------------------- */

    function createSparkleParticle() {

        return {
            x: Math.random() * celebCanvas.width,
            y: Math.random() * celebCanvas.height,
            radius: 1 + Math.random() * 2.5,
            alpha: Math.random(),
            alphaSpeed: 0.01 + Math.random() * 0.02,
            speedY: -0.3 - Math.random() * 0.5
        };

    }

    function updateSparkles() {

        sparkleParticles.forEach(function (s) {

            s.alpha += s.alphaSpeed;

            if (s.alpha >= 1 || s.alpha <= 0) {
                s.alphaSpeed *= -1;
            }

            s.y += s.speedY;

            if (s.y < -10) {
                s.y = celebCanvas.height + 10;
                s.x = Math.random() * celebCanvas.width;
            }

            celebCtx.save();
            celebCtx.globalAlpha = Math.max(0, s.alpha);
            celebCtx.fillStyle = "#ffd700";
            celebCtx.beginPath();
            celebCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            celebCtx.fill();
            celebCtx.restore();

        });

    }


    /* -----------------------------------------------------
       FIREWORKS (meledak berkala di titik acak)
    ----------------------------------------------------- */

    function spawnFirework() {

        const originX = celebCanvas.width * (0.15 + Math.random() * 0.7);
        const originY = celebCanvas.height * (0.15 + Math.random() * 0.4);
        const color = palette[Math.floor(Math.random() * palette.length)];
        const particleCount = 45;

        for (let i = 0; i < particleCount; i++) {

            const angle = (Math.PI * 2 * i) / particleCount;
            const speed = 2 + Math.random() * 3;

            fireworkParticles.push({
                x: originX,
                y: originY,
                speedX: Math.cos(angle) * speed,
                speedY: Math.sin(angle) * speed,
                color: color,
                alpha: 1,
                size: 2 + Math.random() * 2,
                gravity: 0.04
            });

        }

    }

    function updateFireworks() {

        for (let i = fireworkParticles.length - 1; i >= 0; i--) {

            const p = fireworkParticles[i];

            p.x += p.speedX;
            p.y += p.speedY;
            p.speedY += p.gravity;
            p.alpha -= 0.015;

            if (p.alpha <= 0) {
                fireworkParticles.splice(i, 1);
                continue;
            }

            celebCtx.save();
            celebCtx.globalAlpha = p.alpha;
            celebCtx.fillStyle = p.color;
            celebCtx.beginPath();
            celebCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            celebCtx.fill();
            celebCtx.restore();

        }

    }


    /* -----------------------------------------------------
       BALON TERBANG (elemen DOM, bukan canvas)
    ----------------------------------------------------- */

    function spawnBalloon() {

        const balloon = document.createElement("div");

        const color = palette[Math.floor(Math.random() * palette.length)];
        const left = Math.random() * 90;
        const size = 40 + Math.random() * 30;
        const duration = 6 + Math.random() * 5;
        const sway = 20 + Math.random() * 30;

        balloon.style.position = "fixed";
        balloon.style.bottom = "-120px";
        balloon.style.left = left + "vw";
        balloon.style.width = size + "px";
        balloon.style.height = size * 1.25 + "px";
        balloon.style.background = `radial-gradient(circle at 30% 30%, #ffffff55, ${color})`;
        balloon.style.borderRadius = "50% 50% 50% 50% / 60% 60% 40% 40%";
        balloon.style.boxShadow = "0 0 12px rgba(255,255,255,0.4)";
        balloon.style.zIndex = "9997";
        balloon.style.pointerEvents = "none";
        balloon.style.setProperty("--sway", sway + "px");

        balloon.style.animation =
            `balloon-rise ${duration}s ease-in forwards, balloon-sway 2.5s ease-in-out infinite alternate`;

        document.body.appendChild(balloon);
        balloonEls.push(balloon);

        setTimeout(function () {
            balloon.remove();
            balloonEls = balloonEls.filter(function (b) { return b !== balloon; });
        }, duration * 1000 + 200);

    }

    function injectBalloonKeyframes() {

        const style = document.createElement("style");
        style.id = "celebration-keyframes";

        style.textContent = `
            @keyframes balloon-rise {
                0% { transform: translateY(0); }
                100% { transform: translateY(-115vh); }
            }
            @keyframes balloon-sway {
                0% { margin-left: calc(var(--sway) * -1); }
                100% { margin-left: var(--sway); }
            }
            @keyframes banner-pop-in {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.6); }
                60% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
                100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
            @keyframes banner-glow {
                0%, 100% { text-shadow: 0 0 12px #ffd700, 0 0 24px #ffd700; }
                50% { text-shadow: 0 0 24px #fff59d, 0 0 48px #ffd700; }
            }
            @keyframes overlay-fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes banner-glow-halo {
                0%, 100% { opacity: 0.55; transform: translate(-50%, -50%) scale(1); }
                50% { opacity: 0.85; transform: translate(-50%, -50%) scale(1.08); }
            }
            @keyframes divider-widen {
                from { width: 0; opacity: 0; }
                to { width: 120px; opacity: 1; }
            }
        `;

        document.head.appendChild(style);

    }

/* =====================================================
   TAMBAHKAN BLOK INI DI FILE COUNTDOWN/CELEBRATION-MU
   (taruh di atas fungsi showBanner(), boleh persis di bawah
   deklarasi `const palette = [...]`)
===================================================== */

/* =====================================================
   GANTI ISI BANNER_TRANSLATIONS YANG SUDAH ADA DI FILE-MU
   DENGAN VERSI INI SAJA — nama variabel & struktur objek
   (jp / label / title / message) tetap sama persis, jadi
   showBanner(), getBannerText(), dan refreshBannerLanguage()
   TIDAK PERLU diubah sama sekali.
===================================================== */

/* =====================================================
   GANTI ISI BANNER_TRANSLATIONS YANG SUDAH ADA DI FILE-MU
   DENGAN VERSI INI — struktur (jp / label / title / message)
   tetap sama, jadi showBanner() & fungsi lain tidak perlu
   diubah. Bedanya: sekarang menyebut nama "Nayla" langsung,
   jadi terasa personal, bukan ucapan umum.
===================================================== */

const BANNER_TRANSLATIONS = {

    id: {
        jp: "成人式",
        label: "Untuk Nayla, di Ulang Tahun ke-20",
        title: "Selamat Menjadi Dewasa, Nayla",
        message: "Semoga setiap langkah barumu dipenuhi keberanian, cinta, dan kebahagiaan ✨"
    },

    en: {
        jp: "成人式",
        label: "For Nayla, on Her 20th Birthday",
        title: "Happy 20th Birthday, Nayla",
        message: "May every step of this new chapter be filled with courage, love, and happiness ✨"
    },

    ja: {
        jp: "成人式",
        label: "ナイラへ、20歳の誕生日に",
        title: "ナイラ、20歳のお誕生日おめでとう",
        message: "この新しい章が、勇気と愛と幸せに満ちていますように ✨"
    },

    zh: {
        jp: "成人式",
        label: "献给 Nayla，二十岁生日",
        title: "Nayla，二十岁生日快乐",
        message: "愿这新的篇章充满勇气、爱与幸福 ✨"
    },

    ko: {
        jp: "成人式",
        label: "나일라에게, 20번째 생일에",
        title: "나일라, 20번째 생일을 축하해",
        message: "이 새로운 장이 용기와 사랑, 행복으로 가득하기를 바랍니다 ✨"
    }

};


/* -----------------------------------------------------
   Pola sama persis seperti normalizeGalleryLanguage()
   & getGalleryLanguage() di gallery.js, supaya konsisten
   dengan sumber bahasa yang sama di seluruh situs
----------------------------------------------------- */

function normalizeBannerLanguage(language) {

    const value =
        String(language || "").toLowerCase().trim();

    if (value === "id" || value.startsWith("id-")) return "id";
    if (value === "ja" || value.startsWith("ja-")) return "ja";
    if (value === "ko" || value.startsWith("ko-")) return "ko";
    if (value === "zh" || value.startsWith("zh-")) return "zh";

    return "en";

}

function getBannerLanguage() {

    const stored =
        localStorage.getItem("language") ||
        localStorage.getItem("selectedLanguage") ||
        localStorage.getItem("currentLanguage") ||
        localStorage.getItem("lang");

    const htmlLanguage =
        document.documentElement?.getAttribute("lang");

    return normalizeBannerLanguage(stored || htmlLanguage || "en");

}

function getBannerText() {

    const lang = getBannerLanguage();

    return BANNER_TRANSLATIONS[lang] || BANNER_TRANSLATIONS.en;

}


/* =====================================================
   GANTI FUNGSI showBanner() DENGAN VERSI INI
   (sekarang membaca teks dari getBannerText() alih-alih
   hardcode Bahasa Indonesia)
===================================================== */

function showBanner() {

    /* -------------------------------------------------
       OVERLAY — gelap + blur supaya teks di belakang
       (judul countdown, tanggal) tidak tembus/bentrok
    ------------------------------------------------- */

    overlayEl = document.createElement("div");
    overlayEl.style.position = "fixed";
    overlayEl.style.top = "0";
    overlayEl.style.left = "0";
    overlayEl.style.width = "100%";
    overlayEl.style.height = "100%";
    overlayEl.style.background =
        "radial-gradient(circle, rgba(7,20,38,.78) 0%, rgba(5,15,29,.94) 100%)";
    overlayEl.style.backdropFilter = "blur(6px)";
    overlayEl.style.webkitBackdropFilter = "blur(6px)";
    overlayEl.style.zIndex = "9996";
    overlayEl.style.pointerEvents = "none";
    overlayEl.style.animation = "overlay-fade-in 1s ease forwards";

    document.body.appendChild(overlayEl);

    /* Halo emas lembut di belakang banner */

    const haloEl = document.createElement("div");
    haloEl.id = "celebration-banner-halo";
    haloEl.style.position = "fixed";
    haloEl.style.top = "50%";
    haloEl.style.left = "50%";
    haloEl.style.width = "min(70vw, 640px)";
    haloEl.style.height = "min(70vw, 640px)";
    haloEl.style.transform = "translate(-50%, -50%)";
    haloEl.style.background =
        "radial-gradient(circle, rgba(229,189,85,.22) 0%, rgba(229,189,85,0) 70%)";
    haloEl.style.zIndex = "9998";
    haloEl.style.pointerEvents = "none";
    haloEl.style.animation = "banner-glow-halo 3s ease-in-out infinite";

    document.body.appendChild(haloEl);
    overlayEl._halo = haloEl;

    /* -------------------------------------------------
       BANNER — teks diambil dari getBannerText(),
       tipografi tetap Cinzel / Noto Serif JP / Poppins
       supaya konsisten dengan identitas situs
    ------------------------------------------------- */

    const text = getBannerText();

    bannerEl = document.createElement("div");
    bannerEl.id = "celebration-banner";
    bannerEl.style.position = "fixed";
    bannerEl.style.top = "50%";
    bannerEl.style.left = "50%";
    bannerEl.style.transform = "translate(-50%, -50%)";
    bannerEl.style.zIndex = "9999";
    bannerEl.style.textAlign = "center";
    bannerEl.style.padding = "0 24px";
    bannerEl.style.pointerEvents = "none";
    bannerEl.style.animation = "banner-pop-in .8s ease forwards";

    bannerEl.innerHTML = `
        <div style="
            font-family:'Noto Serif JP', serif;
            font-size: 30px;
            letter-spacing:.2em;
            color: rgba(229,189,85,.85);
            margin-bottom: 16px;
        ">
            ${text.jp}
        </div>

        <div style="
            font-family:'Cinzel', serif;
            font-size: 11px;
            letter-spacing:.4em;
            text-transform: uppercase;
            color: rgba(245,241,232,.55);
            margin-bottom: 22px;
        ">
            ${text.label}
        </div>

        <div style="
            font-family:'Cinzel', serif;
            font-weight: 500;
            font-size: clamp(30px, 6vw, 56px);
            line-height: 1.3;
            background: linear-gradient(180deg, #f7e29a, #e5bd55 55%, #b8903a);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: banner-glow 2.4s ease-in-out infinite .8s;
        ">
            ${text.title}
        </div>

        <div style="
            width: 0;
            height: 1px;
            margin: 28px auto;
            background: linear-gradient(90deg, transparent, #e5bd55, transparent);
            animation: divider-widen 1.2s ease forwards .6s;
            opacity: 0;
        "></div>

        <div style="
            font-family:'Poppins', sans-serif;
            font-weight: 300;
            font-size: 15px;
            letter-spacing: .04em;
            color: rgba(245,241,232,.7);
        ">
            ${text.message}
        </div>
    `;

    document.body.appendChild(bannerEl);

}


/* =====================================================
   OPSIONAL — supaya banner ikut update kalau user ganti
   bahasa lewat navbar SAAT banner sedang tampil (durasinya
   cuma ~6 detik, tapi ini jaga-jaga). Taruh di dekat
   listener lain, misalnya setelah injectBalloonKeyframes().
===================================================== */

function refreshBannerLanguage() {

    if (!bannerEl) return;

    const text = getBannerText();

    const nodes = bannerEl.querySelectorAll("div");
    // urutan: jp, label, title, divider(kosong), message
    if (nodes[0]) nodes[0].textContent = text.jp;
    if (nodes[1]) nodes[1].textContent = text.label;
    if (nodes[2]) nodes[2].textContent = text.title;
    if (nodes[4]) nodes[4].textContent = text.message;

}

["languageChanged", "languageChange", "langChanged", "galleryLanguageChanged"]
    .forEach(eventName => {
        window.addEventListener(eventName, refreshBannerLanguage);
    });


/* =====================================================
   KEYFRAME banner-glow DI injectBalloonKeyframes()
   TETAP PAKAI VERSI drop-shadow INI (bukan text-shadow),
   karena judul sekarang gradient-clip:
===================================================== */

/*
@keyframes banner-glow {
    0%, 100% { filter: drop-shadow(0 0 10px rgba(229,189,85,.55)); }
    50%      { filter: drop-shadow(0 0 22px rgba(247,226,154,.75)); }
}
*/



    /* -----------------------------------------------------
       LOOP UTAMA
    ----------------------------------------------------- */

    function celebrationLoop() {

        celebCtx.clearRect(0, 0, celebCanvas.width, celebCanvas.height);

        updateSparkles();
        updateConfetti();
        updateFireworks();

        celebAnimationId = requestAnimationFrame(celebrationLoop);

    }


    /* -----------------------------------------------------
       START / STOP
    ----------------------------------------------------- */

    let fireworkIntervalId = null;
    let balloonIntervalId = null;

    function startCelebration() {

        if (celebrationStarted) return;
        celebrationStarted = true;

        injectBalloonKeyframes();
        createCelebCanvas();

        for (let i = 0; i < 150; i++) {
            confettiParticles.push(createConfettiParticle());
        }

        for (let i = 0; i < 60; i++) {
            sparkleParticles.push(createSparkleParticle());
        }

        celebrationLoop();

        showBanner();

        /* =====================================================
           Lagu ulang tahun normalnya sudah mulai lebih awal lewat
           triggerBirthdaySongEarly() (SONG_LEAD_TIME_MS sebelum
           target). Baris ini tinggal jaga-jaga (fallback) kalau
           karena suatu sebab trigger awal belum sempat jalan,
           supaya lagu tetap pasti bunyi begitu countdown 00:00:00.
        ===================================================== */

        triggerBirthdaySongEarly();

        /* Kembang api meledak setiap 700ms */
        fireworkIntervalId = setInterval(spawnFirework, 700);
        spawnFirework();

        /* Balon muncul terus-menerus setiap 500ms */
        balloonIntervalId = setInterval(spawnBalloon, 500);

        /* Hilangkan banner overlay setelah 6 detik, tapi confetti/sparkle tetap lanjut lebih lama */
        setTimeout(function () {

            if (bannerEl) {
                bannerEl.style.transition = "opacity 1s ease";
                bannerEl.style.opacity = "0";
                setTimeout(function () {
                    if (bannerEl) bannerEl.remove();
                    bannerEl = null;
                }, 1000);
            }

            if (overlayEl) {

                if (overlayEl._halo) {
                    overlayEl._halo.style.transition = "opacity 1s ease";
                    overlayEl._halo.style.opacity = "0";
                    const haloRef = overlayEl._halo;
                    setTimeout(function () {
                        haloRef.remove();
                    }, 1000);
                }

                overlayEl.style.transition = "opacity 1s ease";
                overlayEl.style.opacity = "0";
                setTimeout(function () {
                    if (overlayEl) overlayEl.remove();
                    overlayEl = null;
                }, 1000);
            }

        }, 6000);

        /* Stop kembang api & balon setelah 15 detik */
        setTimeout(function () {

            if (fireworkIntervalId) {
                clearInterval(fireworkIntervalId);
                fireworkIntervalId = null;
            }

            if (balloonIntervalId) {
                clearInterval(balloonIntervalId);
                balloonIntervalId = null;
            }

        }, 15000);

        /* Confetti & sparkle terus berjalan sebagai ambience, tidak dimatikan otomatis */

    }

    function stopCelebration() {

        if (celebAnimationId) {
            cancelAnimationFrame(celebAnimationId);
            celebAnimationId = null;
        }

        if (fireworkIntervalId) {
            clearInterval(fireworkIntervalId);
            fireworkIntervalId = null;
        }

        if (balloonIntervalId) {
            clearInterval(balloonIntervalId);
            balloonIntervalId = null;
        }

        if (celebCanvas) {
            celebCanvas.remove();
            celebCanvas = null;
            celebCtx = null;
        }

        balloonEls.forEach(function (b) { b.remove(); });
        balloonEls = [];

        if (bannerEl) {
            bannerEl.remove();
            bannerEl = null;
        }

        if (overlayEl) {
            if (overlayEl._halo) overlayEl._halo.remove();
            overlayEl.remove();
            overlayEl = null;
        }

        confettiParticles = [];
        fireworkParticles = [];
        sparkleParticles = [];

        stopBirthdaySong();

    }


    /* =====================================================
       UPDATE COUNTDOWN
    ===================================================== */

    function updateCountdown() {

        const now = Date.now();

        const distance = targetDate - now;


        /* -------------------------------------------------
           MULAI LAGU LEBIH AWAL (SONG_LEAD_TIME_MS sebelum
           target). Dicek duluan supaya tetap jalan walau
           distance sudah <= 0 saat interval berikutnya
           (mis. tab sempat tidak aktif / delay browser).
        ------------------------------------------------- */

        if (distance <= SONG_LEAD_TIME_MS) {
            triggerBirthdaySongEarly();
        }


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


            /* Trigger event perayaan sekali saja */
            startCelebration();


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
            stopCelebration();

        }
    );

});