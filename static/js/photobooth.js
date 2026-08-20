document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =========================================================
       TRANSLATION
       ========================================================= */

    const photoboothTranslations = {

        id: {

            "photobooth.title":
                "Abadikan Momen",

            "photobooth.subtitle":
                "Ambil tiga foto dan buat kenangan ulang tahun kecilmu sendiri.",

            "photobooth.camera":
                "KAMERA",

            "photobooth.ready":
                "Siap kapan saja",

            "photobooth.cameraPreview":
                "Pratinjau kamera",

            "photobooth.startCamera":
                "Mulai Kamera",

            "photobooth.stopCamera":
                "Matikan Kamera",

            "photobooth.startCameraHint":
                'Klik "Mulai Kamera" untuk memulai',

            "photobooth.cameraActive":
                "Kamera Aktif",

            "photobooth.takePhoto":
                "Ambil Foto",

            "photobooth.countdown":
                "HITUNG MUNDUR",

            "photobooth.mirror":
                "CERMIN",

            "photobooth.filter":
                "FILTER",

            "photobooth.yourFrame":
                "FRAME ANDA",

            "photobooth.changeFrame":
                "Ganti Frame",

            "photobooth.photo01":
                "FOTO 01",

            "photobooth.photo02":
                "FOTO 02",

            "photobooth.photo03":
                "FOTO 03",

            "photobooth.retakeTitle":
                "AMBIL ULANG FOTO",

            "photobooth.retakeSubtitle":
                "Pilih foto yang ingin diambil ulang",

            "photobooth.retakePhoto":
                "Ambil Ulang Foto",

            "photobooth.finished":
                "Photobooth selesai!",

            "photobooth.finishedDescription":
                "Kamu bisa mengulang foto atau menyimpan hasilnya.",

            "photobooth.retakePhotos":
                "↻ Ambil Ulang Foto",

            "photobooth.downloadPhoto":
                "↓ Unduh Foto",

            "photobooth.complete":
                "Photobooth Selesai",

            "photobooth.cameraNotReady":
                "Kamera belum siap. Silakan tunggu sebentar.",

            "photobooth.cameraError":
                "Kamera tidak dapat diakses.\n\nPastikan izin kamera diberikan dan halaman dibuka melalui HTTPS atau localhost.",

            "photobooth.browserError":
                "Browser ini tidak mendukung akses kamera.",

            "photobooth.captureError":
                "Foto gagal diambil. Silakan coba lagi.",

            "photobooth.downloadError":
                "Foto gagal disimpan.",

            "common.on":
                "ON",

            "common.off":
                "OFF",

            "filters.original":
                "Original",

            "filters.soft":
                "Soft",

            "filters.warm":
                "Warm",

            "filters.bw":
                "B&W"

        },


        en: {

            "photobooth.title":
                "Capture the Moment",

            "photobooth.subtitle":
                "Take three photos and create your own little birthday memory.",

            "photobooth.camera":
                "CAMERA",

            "photobooth.ready":
                "Ready when you are",

            "photobooth.cameraPreview":
                "Camera preview",

            "photobooth.startCamera":
                "Start Camera",

            "photobooth.stopCamera":
                "Turn Off Camera",

            "photobooth.startCameraHint":
                'Click "Start Camera" to begin',

            "photobooth.cameraActive":
                "Camera Active",

            "photobooth.takePhoto":
                "Take Photo",

            "photobooth.countdown":
                "COUNTDOWN",

            "photobooth.mirror":
                "MIRROR",

            "photobooth.filter":
                "FILTER",

            "photobooth.yourFrame":
                "YOUR FRAME",

            "photobooth.changeFrame":
                "Change Frame",

            "photobooth.photo01":
                "PHOTO 01",

            "photobooth.photo02":
                "PHOTO 02",

            "photobooth.photo03":
                "PHOTO 03",

            "photobooth.retakeTitle":
                "RETAKE A PHOTO",

            "photobooth.retakeSubtitle":
                "Choose the photo you want to retake",

            "photobooth.retakePhoto":
                "Retake Photo",

            "photobooth.finished":
                "Photobooth complete!",

            "photobooth.finishedDescription":
                "You can retake your photos or save the result.",

            "photobooth.retakePhotos":
                "↻ Retake Photos",

            "photobooth.downloadPhoto":
                "↓ Download Photo",

            "photobooth.complete":
                "Photobooth Complete",

            "photobooth.cameraNotReady":
                "Camera is not ready yet. Please wait a moment.",

            "photobooth.cameraError":
                "The camera could not be accessed.\n\nPlease make sure camera permission is enabled and the page is opened through HTTPS or localhost.",

            "photobooth.browserError":
                "This browser does not support camera access.",

            "photobooth.captureError":
                "The photo could not be taken. Please try again.",

            "photobooth.downloadError":
                "The photo could not be saved.",

            "common.on":
                "ON",

            "common.off":
                "OFF",

            "filters.original":
                "Original",

            "filters.soft":
                "Soft",

            "filters.warm":
                "Warm",

            "filters.bw":
                "B&W"

        },


        ja: {

            "photobooth.title":
                "瞬間を残そう",

            "photobooth.subtitle":
                "3枚の写真を撮って、素敵な誕生日の思い出を作りましょう。",

            "photobooth.camera":
                "カメラ",

            "photobooth.ready":
                "準備はできましたか？",

            "photobooth.cameraPreview":
                "カメラプレビュー",

            "photobooth.startCamera":
                "カメラを起動",

            "photobooth.stopCamera":
                "カメラを停止",

            "photobooth.startCameraHint":
                "「カメラを起動」をクリックして開始",

            "photobooth.cameraActive":
                "カメラ起動中",

            "photobooth.takePhoto":
                "写真を撮る",

            "photobooth.countdown":
                "カウントダウン",

            "photobooth.mirror":
                "ミラー",

            "photobooth.filter":
                "フィルター",

            "photobooth.yourFrame":
                "あなたのフレーム",

            "photobooth.changeFrame":
                "フレームを変更",

            "photobooth.photo01":
                "写真 01",

            "photobooth.photo02":
                "写真 02",

            "photobooth.photo03":
                "写真 03",

            "photobooth.retakeTitle":
                "写真を撮り直す",

            "photobooth.retakeSubtitle":
                "撮り直したい写真を選択してください",

            "photobooth.retakePhoto":
                "写真を撮り直す",

            "photobooth.finished":
                "フォトブース完了！",

            "photobooth.finishedDescription":
                "写真を撮り直すか、結果を保存できます。",

            "photobooth.retakePhotos":
                "↻ 写真を撮り直す",

            "photobooth.downloadPhoto":
                "↓ 写真をダウンロード",

            "photobooth.complete":
                "フォトブース完了",

            "photobooth.cameraNotReady":
                "カメラの準備ができていません。少々お待ちください。",

            "photobooth.cameraError":
                "カメラにアクセスできません。\n\nカメラの権限を確認し、HTTPSまたはlocalhostでページを開いてください。",

            "photobooth.browserError":
                "このブラウザはカメラアクセスに対応していません。",

            "photobooth.captureError":
                "写真を撮影できませんでした。もう一度お試しください。",

            "photobooth.downloadError":
                "写真を保存できませんでした。",

            "common.on":
                "オン",

            "common.off":
                "オフ",

            "filters.original":
                "オリジナル",

            "filters.soft":
                "ソフト",

            "filters.warm":
                "ウォーム",

            "filters.bw":
                "モノクロ"

        },


        zh: {

            "photobooth.title":
                "记录这一刻",

            "photobooth.subtitle":
                "拍摄三张照片，留下属于你的生日回忆。",

            "photobooth.camera":
                "相机",

            "photobooth.ready":
                "准备好了吗？",

            "photobooth.cameraPreview":
                "相机预览",

            "photobooth.startCamera":
                "启动相机",

            "photobooth.stopCamera":
                "关闭相机",

            "photobooth.startCameraHint":
                '点击“启动相机”开始',

            "photobooth.cameraActive":
                "相机已启动",

            "photobooth.takePhoto":
                "拍照",

            "photobooth.countdown":
                "倒计时",

            "photobooth.mirror":
                "镜像",

            "photobooth.filter":
                "滤镜",

            "photobooth.yourFrame":
                "您的相框",

            "photobooth.changeFrame":
                "更换相框",

            "photobooth.photo01":
                "照片 01",

            "photobooth.photo02":
                "照片 02",

            "photobooth.photo03":
                "照片 03",

            "photobooth.retakeTitle":
                "重新拍照",

            "photobooth.retakeSubtitle":
                "选择想要重新拍摄的照片",

            "photobooth.retakePhoto":
                "重新拍照",

            "photobooth.finished":
                "拍照完成！",

            "photobooth.finishedDescription":
                "你可以重新拍照或保存结果。",

            "photobooth.retakePhotos":
                "↻ 重新拍摄",

            "photobooth.downloadPhoto":
                "↓ 下载照片",

            "photobooth.complete":
                "拍照完成",

            "photobooth.cameraNotReady":
                "相机还没有准备好，请稍等。",

            "photobooth.cameraError":
                "无法访问相机。\n\n请确认已允许相机权限，并通过 HTTPS 或 localhost 打开页面。",

            "photobooth.browserError":
                "此浏览器不支持相机访问。",

            "photobooth.captureError":
                "照片拍摄失败，请重试。",

            "photobooth.downloadError":
                "照片保存失败。",

            "common.on":
                "开启",

            "common.off":
                "关闭",

            "filters.original":
                "原图",

            "filters.soft":
                "柔和",

            "filters.warm":
                "暖色",

            "filters.bw":
                "黑白"

        },


        ko: {

            "photobooth.title":
                "순간을 담아보세요",

            "photobooth.subtitle":
                "사진 세 장을 찍고 나만의 생일 추억을 만들어보세요.",

            "photobooth.camera":
                "카메라",

            "photobooth.ready":
                "준비되셨나요?",

            "photobooth.cameraPreview":
                "카메라 미리보기",

            "photobooth.startCamera":
                "카메라 시작",

            "photobooth.stopCamera":
                "카메라 끄기",

            "photobooth.startCameraHint":
                '"카메라 시작"을 눌러 시작하세요',

            "photobooth.cameraActive":
                "카메라 활성화",

            "photobooth.takePhoto":
                "사진 촬영",

            "photobooth.countdown":
                "카운트다운",

            "photobooth.mirror":
                "미러",

            "photobooth.filter":
                "필터",

            "photobooth.yourFrame":
                "나의 프레임",

            "photobooth.changeFrame":
                "프레임 변경",

            "photobooth.photo01":
                "사진 01",

            "photobooth.photo02":
                "사진 02",

            "photobooth.photo03":
                "사진 03",

            "photobooth.retakeTitle":
                "사진 다시 찍기",

            "photobooth.retakeSubtitle":
                "다시 찍을 사진을 선택하세요",

            "photobooth.retakePhoto":
                "사진 다시 찍기",

            "photobooth.finished":
                "포토부스 완료!",

            "photobooth.finishedDescription":
                "사진을 다시 찍거나 결과를 저장할 수 있습니다.",

            "photobooth.retakePhotos":
                "↻ 사진 다시 찍기",

            "photobooth.downloadPhoto":
                "↓ 사진 다운로드",

            "photobooth.complete":
                "포토부스 완료",

            "photobooth.cameraNotReady":
                "카메라가 아직 준비되지 않았습니다. 잠시 기다려주세요.",

            "photobooth.cameraError":
                "카메라에 접근할 수 없습니다.\n\n카메라 권한을 확인하고 HTTPS 또는 localhost에서 페이지를 열어주세요.",

            "photobooth.browserError":
                "이 브라우저는 카메라 접근을 지원하지 않습니다.",

            "photobooth.captureError":
                "사진을 촬영하지 못했습니다. 다시 시도해주세요.",

            "photobooth.downloadError":
                "사진을 저장하지 못했습니다.",

            "common.on":
                "켜짐",

            "common.off":
                "꺼짐",

            "filters.original":
                "원본",

            "filters.soft":
                "소프트",

            "filters.warm":
                "따뜻하게",

            "filters.bw":
                "흑백"

        }

    };


    /* =========================================================
       LANGUAGE
       ========================================================= */

    let currentLanguage =
        localStorage.getItem("language") || "id";


    function t(key) {

        return (
            photoboothTranslations[currentLanguage]?.[key] ||
            photoboothTranslations.en[key] ||
            key
        );

    }


    function translatePhotobooth(language) {

        if (
            !photoboothTranslations[language]
        ) {

            language = "id";

        }


        currentLanguage =
            language;


        localStorage.setItem(
            "language",
            language
        );


        document.documentElement.lang =
            language;


        document
            .querySelectorAll(
                "[data-i18n]"
            )
            .forEach(
                element => {

                    const key =
                        element.dataset.i18n;

                    if (
                        photoboothTranslations[language][key]
                    ) {

                        element.textContent =
                            photoboothTranslations[language][key];

                    }

                }
            );


        updateCaptureButton();

        updateMirrorText();

        updateFrameName();

        updateCameraUI();

        updateRetakeButtons();

    }


    window.addEventListener(
        "languageChanged",
        event => {

            const language =
                event.detail?.language;

            if (!language) {
                return;
            }

            translatePhotobooth(
                language
            );

        }
    );


    /* =========================================================
       ELEMENTS
       ========================================================= */

    const video =
        document.getElementById(
            "camera"
        );

    const startCameraBtn =
        document.getElementById(
            "startCameraBtn"
        );

    const stopCameraBtn =
        document.getElementById(
            "stopCameraBtn"
        );

    const cameraButtonText =
        document.getElementById(
            "cameraButtonText"
        );

    const stopCameraButtonText =
        document.getElementById(
            "stopCameraButtonText"
        );

    const captureBtn =
        document.getElementById(
            "captureBtn"
        );

    const captureBtnText =
        document.getElementById(
            "captureBtnText"
        );

    const countdown =
        document.getElementById(
            "countdown"
        );

    const captureFlash =
        document.getElementById(
            "captureFlash"
        );

    const cameraPlaceholder =
        document.getElementById(
            "cameraPlaceholder"
        );

    const changeFrameBtn =
        document.getElementById(
            "changeFrameBtn"
        );

    const frameName =
        document.getElementById(
            "frameName"
        );

    const resultFrame =
        document.getElementById(
            "photoboothResult"
        );

    const mirrorBtn =
        document.getElementById(
            "mirrorBtn"
        );

    const mirrorText =
        document.getElementById(
            "mirrorText"
        );

    const resultActions =
        document.getElementById(
            "resultActions"
        );

    const retakePanel =
        document.getElementById(
            "retakePanel"
        );

    const retakeBtn =
        document.getElementById(
            "retakeBtn"
        );

    const downloadBtn =
        document.getElementById(
            "downloadBtn"
        );


    if (
        !video ||
        !resultFrame
    ) {

        console.error(
            "Nayla Photobooth: element utama tidak ditemukan."
        );

        return;

    }


    /* =========================================================
       STATE
       ========================================================= */

    let stream = null;

    let currentPhoto = 0;

    let retakeIndex = null;

    let countdownSeconds = 3;

    let mirrorEnabled = true;

    let currentFilter = "original";

    let currentFrameIndex = 0;

    let isCapturing = false;

    let countdownTimer = null;

    let isStartingCamera = false;


    const photos = [
        null,
        null,
        null
    ];


    /* =========================================================
       FRAME DATA
       ========================================================= */

    const frames = [

        {
            name: "Seijin Sakura",
            theme: "seijin",
            brand: "SEIJIN",
            small: "BIRTHDAY",
            footer: "SEIJIN SHIKI · BIRTHDAY",
            date: "20th Birthday"
        },

        {
            name: "Sakura Celebration",
            theme: "sakura",
            brand: "SAKURA",
            small: "SAKURA CELEBRATION",
            footer: "SAKURA · BIRTHDAY",
            date: "20th Birthday"
        },

        {
            name: "Fuji Celebration",
            theme: "fuji",
            brand: "FUJI",
            small: "FUJI CELEBRATION",
            footer: "FUJI · BIRTHDAY",
            date: "20th Birthday"
        }

    ];


    /* =========================================================
       FRAME TRANSLATION
       ========================================================= */

    const frameNames = {

        id: [
            "Seijin Sakura",
            "Perayaan Sakura",
            "Perayaan Fuji"
        ],

        en: [
            "Seijin Sakura",
            "Sakura Celebration",
            "Fuji Celebration"
        ],

        ja: [
            "成人式さくら",
            "桜のお祝い",
            "富士のお祝い"
        ],

        zh: [
            "成人樱花",
            "樱花庆典",
            "富士庆典"
        ],

        ko: [
            "성인식 사쿠라",
            "사쿠라 축하",
            "후지 축하"
        ]

    };


    function updateFrameName() {

        if (!frameName) {
            return;
        }


        const names =
            frameNames[currentLanguage] ||
            frameNames.en;


        frameName.textContent =
            names[currentFrameIndex];

    }


    function applyFrame(frame) {

        if (!frame) {
            return;
        }


        resultFrame.dataset.theme =
            frame.theme;


        updateFrameName();

    }


    applyFrame(
        frames[currentFrameIndex]
    );


    /* =========================================================
       CAMERA STATE
       ========================================================= */

    function isCameraActive() {

        if (!stream) {
            return false;
        }


        const tracks =
            stream.getVideoTracks();


        if (!tracks.length) {
            return false;
        }


        return tracks.some(
            track =>
                track.readyState === "live"
        );

    }


    function updateCameraUI() {

        const active =
            isCameraActive();


        if (startCameraBtn) {

            startCameraBtn.disabled =
                active;

            startCameraBtn.classList.toggle(
                "active",
                active
            );

        }


        if (stopCameraBtn) {

            stopCameraBtn.disabled =
                !active;

        }


        if (captureBtn) {

            captureBtn.disabled =
                !active || isCapturing;

        }


        if (cameraButtonText) {

            cameraButtonText.textContent =
                active
                    ? t("photobooth.cameraActive")
                    : t("photobooth.startCamera");

        }


        if (stopCameraButtonText) {

            stopCameraButtonText.textContent =
                t("photobooth.stopCamera");

        }


        if (cameraPlaceholder) {

            cameraPlaceholder.classList.toggle(
                "hidden",
                active
            );

        }


        if (active) {

            updateCaptureButton();

        }

    }


    /* =========================================================
       CAMERA RATIO
       ========================================================= */

    function syncCameraRatio() {

        if (
            !video.videoWidth ||
            !video.videoHeight
        ) {

            return;

        }


        const ratio =
            video.videoWidth /
            video.videoHeight;


        document.documentElement
            .style
            .setProperty(
                "--photo-ratio",
                `${ratio}`
            );


        document
            .querySelectorAll(
                ".photo-slot"
            )
            .forEach(
                slot => {

                    slot.style.aspectRatio =
                        `${ratio}`;

                }
            );

    }


    /* =========================================================
       FILTER
       ========================================================= */

    function getCssFilter() {

        switch (currentFilter) {

            case "soft":

                return (
                    "brightness(1.05) " +
                    "contrast(.95) " +
                    "saturate(.85)"
                );


            case "warm":

                return (
                    "sepia(.18) " +
                    "saturate(1.15) " +
                    "brightness(1.03)"
                );


            case "bw":

                return "grayscale(1)";


            case "original":

            default:

                return "none";

        }

    }


    function updateVideoFilter() {

        video.style.filter =
            getCssFilter();

    }


    function getCanvasFilter() {

        return getCssFilter();

    }


    /* =========================================================
       COUNTDOWN
       ========================================================= */

    async function runCountdown() {

        if (
            countdownSeconds <= 0
        ) {

            return;

        }


        clearInterval(
            countdownTimer
        );


        if (countdown) {

            countdown.classList.remove(
                "hidden"
            );

        }


        let remaining =
            countdownSeconds;


        if (countdown) {

            countdown.textContent =
                remaining;

        }


        return new Promise(
            resolve => {

                countdownTimer =
                    setInterval(
                        () => {

                            remaining -= 1;


                            if (
                                remaining <= 0
                            ) {

                                clearInterval(
                                    countdownTimer
                                );


                                countdownTimer =
                                    null;


                                if (countdown) {

                                    countdown.classList.add(
                                        "hidden"
                                    );

                                }


                                resolve();

                                return;

                            }


                            if (countdown) {

                                countdown.textContent =
                                    remaining;

                            }

                        },
                        1000
                    );

            }
        );

    }


    function cancelCountdown() {

        if (countdownTimer) {

            clearInterval(
                countdownTimer
            );

            countdownTimer =
                null;

        }


        if (countdown) {

            countdown.classList.add(
                "hidden"
            );

        }

    }


    /* =========================================================
       WAIT VIDEO
       ========================================================= */

    function waitForVideoSize() {

        return new Promise(
            resolve => {

                if (
                    video.videoWidth &&
                    video.videoHeight
                ) {

                    resolve();

                    return;

                }


                let attempts = 0;


                const timer =
                    setInterval(
                        () => {

                            attempts += 1;


                            if (
                                video.videoWidth &&
                                video.videoHeight
                            ) {

                                clearInterval(
                                    timer
                                );

                                resolve();

                                return;

                            }


                            if (
                                attempts >= 30
                            ) {

                                clearInterval(
                                    timer
                                );

                                resolve();

                            }

                        },
                        100
                    );

            }
        );

    }


    /* =========================================================
       START CAMERA
       ========================================================= */

    async function startCamera() {

        if (isStartingCamera) {

            return;

        }


        /*
         * Kalau kamera masih aktif,
         * jangan request kamera lagi.
         */

        if (isCameraActive()) {

            try {

                video.muted =
                    true;

                video.playsInline =
                    true;

                video.autoplay =
                    true;


                if (video.paused) {

                    await video.play();

                }

            } catch (error) {

                console.warn(
                    "Video play error:",
                    error
                );

            }


            updateCameraUI();

            return;

        }


        /*
         * Kalau ada stream lama tetapi track
         * sudah mati, bersihkan dahulu.
         */

        if (stream) {

            stream
                .getTracks()
                .forEach(
                    track => {

                        try {

                            track.stop();

                        } catch (error) {

                            console.warn(
                                error
                            );

                        }

                    }
                );


            stream =
                null;

        }


        if (
            !navigator.mediaDevices ||
            !navigator.mediaDevices.getUserMedia
        ) {

            alert(
                t(
                    "photobooth.browserError"
                )
            );

            return;

        }


        isStartingCamera =
            true;


        try {

            /*
             * Request kamera.
             */

            const newStream =
                await navigator
                    .mediaDevices
                    .getUserMedia({

                        video: {

                            facingMode: {
                                ideal: "user"
                            },

                            width: {
                                ideal: 1280
                            },

                            height: {
                                ideal: 960
                            },

                            aspectRatio: {
                                ideal: 4 / 3
                            }

                        },

                        audio: false

                    });


            stream =
                newStream;


            /*
             * Pasang stream ke video.
             */

            video.srcObject =
                stream;


            video.autoplay =
                true;

            video.playsInline =
                true;

            video.muted =
                true;


            updateVideoMirror();

            updateVideoFilter();


            /*
             * Tunggu video benar-benar play.
             */

            await video.play();


            /*
             * Tunggu ukuran video tersedia.
             */

            await waitForVideoSize();


            syncCameraRatio();


            /*
             * Listener hanya sekali.
             */

            video.removeEventListener(
                "loadedmetadata",
                syncCameraRatio
            );

            video.removeEventListener(
                "resize",
                syncCameraRatio
            );


            video.addEventListener(
                "loadedmetadata",
                syncCameraRatio
            );

            video.addEventListener(
                "resize",
                syncCameraRatio
            );


            /*
             * Jika track mati secara tiba-tiba,
             * update UI.
             */

            stream
                .getVideoTracks()
                .forEach(
                    track => {

                        track.addEventListener(
                            "ended",
                            () => {

                                if (
                                    stream
                                ) {

                                    stream =
                                        null;

                                }


                                updateCameraUI();

                            }
                        );

                    }
                );


            updateCameraUI();


        } catch (error) {

            console.error(
                "Camera error:",
                error
            );


            if (stream) {

                stream
                    .getTracks()
                    .forEach(
                        track => {

                            try {

                                track.stop();

                            } catch (stopError) {

                                console.warn(
                                    stopError
                                );

                            }

                        }
                    );

            }


            stream =
                null;


            video.srcObject =
                null;


            updateCameraUI();


            alert(
                t(
                    "photobooth.cameraError"
                )
            );

        } finally {

            isStartingCamera =
                false;

        }

    }


    /* =========================================================
       STOP CAMERA
       ========================================================= */

    function stopCamera() {

        /*
         * Batalkan countdown.
         */

        cancelCountdown();


        /*
         * Hentikan semua track kamera.
         */

        if (stream) {

            stream
                .getTracks()
                .forEach(
                    track => {

                        try {

                            track.stop();

                        } catch (error) {

                            console.warn(
                                "Track stop error:",
                                error
                            );

                        }

                    }
                );

        }


        /*
         * Hapus stream dari variable.
         */

        stream =
            null;


        /*
         * Lepaskan stream dari video.
         */

        video.pause();

        video.srcObject =
            null;


        /*
         * Reset UI kamera.
         */

        if (cameraPlaceholder) {

            cameraPlaceholder.classList.remove(
                "hidden"
            );

        }


        if (startCameraBtn) {

            startCameraBtn.disabled =
                false;

            startCameraBtn.classList.remove(
                "active"
            );

        }


        if (stopCameraBtn) {

            stopCameraBtn.disabled =
                true;

        }


        if (captureBtn) {

            captureBtn.disabled =
                true;

        }


        if (cameraButtonText) {

            cameraButtonText.textContent =
                t(
                    "photobooth.startCamera"
                );

        }


        if (stopCameraButtonText) {

            stopCameraButtonText.textContent =
                t(
                    "photobooth.stopCamera"
                );

        }


        console.log(
            "Photobooth camera stopped."
        );

    }


    /* =========================================================
       CAMERA BUTTON EVENTS
       ========================================================= */

    if (startCameraBtn) {

        startCameraBtn.addEventListener(
            "click",
            startCamera
        );

    }


    if (stopCameraBtn) {

        stopCameraBtn.addEventListener(
            "click",
            stopCamera
        );

    }


    /* =========================================================
       MIRROR
       ========================================================= */

    function updateVideoMirror() {

        video.style.transform =
            mirrorEnabled
                ? "scaleX(-1)"
                : "scaleX(1)";

    }


    function updateMirrorText() {

        if (!mirrorText) {
            return;
        }


        mirrorText.textContent =
            mirrorEnabled
                ? t("common.on")
                : t("common.off");

    }


    if (mirrorBtn) {

        mirrorBtn.addEventListener(
            "click",
            () => {

                mirrorEnabled =
                    !mirrorEnabled;


                mirrorBtn.classList.toggle(
                    "active",
                    mirrorEnabled
                );


                updateVideoMirror();

                updateMirrorText();

            }
        );

    }


    /* =========================================================
       FILTER BUTTON
       ========================================================= */

    document
        .querySelectorAll(
            ".filter-option"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        currentFilter =
                            button.dataset.filter;


                        document
                            .querySelectorAll(
                                ".filter-option"
                            )
                            .forEach(
                                option => {

                                    option.classList.toggle(
                                        "active",
                                        option === button
                                    );

                                }
                            );


                        updateVideoFilter();

                    }
                );

            }
        );


    /* =========================================================
       COUNTDOWN BUTTON
       ========================================================= */

    document
        .querySelectorAll(
            ".setting-option[data-countdown]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        countdownSeconds =
                            Number(
                                button.dataset.countdown
                            );


                        document
                            .querySelectorAll(
                                ".setting-option[data-countdown]"
                            )
                            .forEach(
                                option => {

                                    option.classList.toggle(
                                        "active",
                                        option === button
                                    );

                                }
                            );

                    }
                );

            }
        );


    /* =========================================================
       ENSURE CAMERA READY
       ========================================================= */

    async function ensureCameraReady() {

        /*
         * Kalau kamera aktif, langsung gunakan.
         */

        if (isCameraActive()) {

            if (video.paused) {

                try {

                    await video.play();

                } catch (error) {

                    console.warn(
                        "Could not resume video:",
                        error
                    );

                }

            }


            await waitForVideoSize();


            return true;

        }


        /*
         * Kalau kamera mati,
         * hidupkan otomatis.
         */

        await startCamera();


        /*
         * Cek sekali lagi setelah startCamera.
         */

        if (!isCameraActive()) {

            return false;

        }


        await waitForVideoSize();


        return (
            !!video.videoWidth &&
            !!video.videoHeight
        );

    }


    /* =========================================================
       CAPTURE PHOTO
       ========================================================= */

    async function capturePhoto() {

        if (isCapturing) {

            return;

        }


        /*
         * Pastikan kamera aktif.
         *
         * INI BAGIAN PENTING UNTUK RETAKE.
         */

        const cameraReady =
            await ensureCameraReady();


        if (!cameraReady) {

            alert(
                t(
                    "photobooth.cameraNotReady"
                )
            );

            return;

        }


        isCapturing =
            true;


        if (captureBtn) {

            captureBtn.disabled =
                true;

        }


        try {

            /*
             * Countdown.
             */

            await runCountdown();


            /*
             * Pastikan kamera masih aktif
             * setelah countdown.
             */

            if (!isCameraActive()) {

                const restarted =
                    await ensureCameraReady();


                if (!restarted) {

                    throw new Error(
                        "Camera became unavailable."
                    );

                }

            }


            await waitForVideoSize();


            if (
                !video.videoWidth ||
                !video.videoHeight
            ) {

                throw new Error(
                    "Video dimensions are unavailable."
                );

            }


            /*
             * Flash.
             */

            if (captureFlash) {

                captureFlash.classList.remove(
                    "active"
                );


                void captureFlash.offsetWidth;


                captureFlash.classList.add(
                    "active"
                );

            }


            syncCameraRatio();


            const width =
                video.videoWidth;

            const height =
                video.videoHeight;


            /*
             * Canvas.
             */

            const canvas =
                document.createElement(
                    "canvas"
                );


            canvas.width =
                width;

            canvas.height =
                height;


            const ctx =
                canvas.getContext(
                    "2d"
                );


            if (!ctx) {

                throw new Error(
                    "Canvas context unavailable."
                );

            }


            /*
             * Filter.
             */

            ctx.filter =
                getCanvasFilter();


            /*
             * Mirror.
             */

            if (mirrorEnabled) {

                ctx.save();


                ctx.translate(
                    width,
                    0
                );


                ctx.scale(
                    -1,
                    1
                );


                ctx.drawImage(
                    video,
                    0,
                    0,
                    width,
                    height
                );


                ctx.restore();

            } else {

                ctx.drawImage(
                    video,
                    0,
                    0,
                    width,
                    height
                );

            }


            /*
             * Convert to image.
             */

            const imageData =
                canvas.toDataURL(
                    "image/jpeg",
                    0.94
                );


            /*
             * Tentukan target foto.
             *
             * Kalau retake:
             * gunakan retakeIndex.
             *
             * Kalau foto normal:
             * gunakan currentPhoto.
             */

            const targetIndex =
                retakeIndex !== null
                    ? retakeIndex
                    : currentPhoto;


            /*
             * Simpan foto.
             */

            photos[targetIndex] =
                imageData;


            /*
             * Update tampilan foto.
             */

            updatePhotoSlot(
                targetIndex,
                imageData
            );


            /* =================================================
               RETAKE MODE
               ================================================= */

            if (
                retakeIndex !== null
            ) {

                console.log(
                    `Retake photo ${targetIndex + 1} completed.`
                );


                /*
                 * Keluar dari retake mode.
                 */

                retakeIndex =
                    null;


                /*
                 * Jangan menaikkan currentPhoto.
                 *
                 * Ini sangat penting.
                 */

                updateProgress();

                updateRetakeButtons();

                updateCaptureButton();


                /*
                 * Kamera TETAP AKTIF.
                 */

                if (captureBtn) {

                    captureBtn.disabled =
                        false;

                }


                return;

            }


            /* =================================================
               NORMAL PHOTO MODE
               ================================================= */

            currentPhoto +=
                1;


            updateProgress();

            updateRetakeButtons();


            /*
             * Sudah 3 foto.
             */

            if (
                currentPhoto >= 3
            ) {

                finishPhotobooth();

            } else {

                if (captureBtn) {

                    captureBtn.disabled =
                        false;

                }


                updateCaptureButton();

            }


        } catch (error) {

            console.error(
                "Capture error:",
                error
            );


            alert(
                t(
                    "photobooth.captureError"
                )
            );


            if (captureBtn) {

                captureBtn.disabled =
                    false;

            }

        } finally {

            isCapturing =
                false;


            /*
             * Jangan matikan kamera di sini.
             */

            if (
                isCameraActive()
            ) {

                updateCameraUI();

            }

        }

    }


    if (captureBtn) {

        captureBtn.addEventListener(
            "click",
            capturePhoto
        );

    }


    /* =========================================================
       UPDATE PHOTO SLOT
       ========================================================= */

    function updatePhotoSlot(
        index,
        imageData
    ) {

        const image =
            document.getElementById(
                `photo${index + 1}`
            );


        if (!image) {

            console.warn(
                `photo${index + 1} tidak ditemukan.`
            );

            return;

        }


        image.src =
            imageData;


        image.style.width =
            "100%";

        image.style.height =
            "100%";

        image.style.objectFit =
            "fill";


        image.classList.add(
            "visible"
        );


        const slot =
            image.closest(
                ".photo-slot"
            );


        if (slot) {

            slot.style.aspectRatio =
                "var(--photo-ratio, 4 / 3)";

            slot.style.width =
                "100%";

            slot.style.height =
                "auto";


            const placeholder =
                slot.querySelector(
                    ".slot-placeholder"
                );


            if (placeholder) {

                placeholder.classList.add(
                    "hidden"
                );

            }

        }


        syncCameraRatio();

    }


    /* =========================================================
       PROGRESS
       ========================================================= */

    function updateProgress() {

        document
            .querySelectorAll(
                ".progress-step"
            )
            .forEach(
                step => {

                    const stepNumber =
                        Number(
                            step.dataset.step
                        );


                    step.classList.toggle(
                        "active",
                        stepNumber ===
                        currentPhoto + 1
                    );


                    step.classList.toggle(
                        "completed",
                        stepNumber <=
                        currentPhoto
                    );

                }
            );

    }


    /* =========================================================
       CAPTURE BUTTON TEXT
       ========================================================= */

    function updateCaptureButton() {

        if (!captureBtnText) {

            return;

        }


        if (
            retakeIndex !== null
        ) {

            captureBtnText.textContent =
                `${t(
                    "photobooth.retakePhoto"
                )} ${
                    String(
                        retakeIndex + 1
                    ).padStart(
                        2,
                        "0"
                    )
                }`;


            return;

        }


        if (
            currentPhoto >= 3
        ) {

            captureBtnText.textContent =
                t(
                    "photobooth.complete"
                );


            return;

        }


        captureBtnText.textContent =
            `${t(
                "photobooth.takePhoto"
            )} ${
                currentPhoto + 1
            }`;

    }


    /* =========================================================
       CHANGE FRAME
       ========================================================= */

    if (changeFrameBtn) {

        changeFrameBtn.addEventListener(
            "click",
            () => {

                currentFrameIndex +=
                    1;


                if (
                    currentFrameIndex >=
                    frames.length
                ) {

                    currentFrameIndex =
                        0;

                }


                applyFrame(
                    frames[
                        currentFrameIndex
                    ]
                );

            }
        );

    }


    /* =========================================================
       RETAKE BUTTONS
       ========================================================= */

    function updateRetakeButtons() {

        document
            .querySelectorAll(
                ".retake-photo-btn"
            )
            .forEach(
                button => {

                    const index =
                        Number(
                            button.dataset.retake
                        );


                    button.textContent =
                        `↻ ${
                            t(
                                "photobooth.retakePhoto"
                            )
                        } ${
                            String(
                                index + 1
                            ).padStart(
                                2,
                                "0"
                            )
                        }`;


                    button.disabled =
                        !photos[index];

                }
            );

    }


    document
        .querySelectorAll(
            ".retake-photo-btn"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    async () => {

                        const index =
                            Number(
                                button.dataset.retake
                            );


                        if (
                            !photos[index]
                        ) {

                            return;

                        }


                        /*
                         * Tentukan foto yang akan
                         * diambil ulang.
                         */

                        retakeIndex =
                            index;


                        /*
                         * Pastikan kamera hidup.
                         *
                         * Kalau kamera mati,
                         * akan otomatis hidup.
                         */

                        const cameraReady =
                            await ensureCameraReady();


                        if (!cameraReady) {

                            retakeIndex =
                                null;


                            alert(
                                t(
                                    "photobooth.cameraNotReady"
                                )
                            );

                            return;

                        }


                        /*
                         * Aktifkan tombol capture.
                         */

                        if (captureBtn) {

                            captureBtn.disabled =
                                false;

                        }


                        updateCaptureButton();


                        /*
                         * Scroll ke kamera.
                         */

                        document
                            .querySelector(
                                ".camera-card"
                            )
                            ?.scrollIntoView({
                                behavior:
                                    "smooth",
                                block:
                                    "start"
                            });

                    }
                );

            }
        );


    /* =========================================================
       FINISH
       ========================================================= */

    function finishPhotobooth() {

        if (retakePanel) {

            retakePanel.classList.remove(
                "hidden"
            );

        }


        if (resultActions) {

            resultActions.classList.remove(
                "hidden"
            );

        }


        updateRetakeButtons();

        updateCaptureButton();


        /*
         * Kamera TIDAK dimatikan.
         *
         * User bisa langsung retake.
         */

        updateCameraUI();

    }


    /* =========================================================
       RETAKE ALL
       ========================================================= */

    if (retakeBtn) {

        retakeBtn.addEventListener(
            "click",
            async () => {

                /*
                 * Reset progress.
                 */

                currentPhoto =
                    0;


                retakeIndex =
                    null;


                /*
                 * Hapus data foto.
                 */

                photos.fill(
                    null
                );


                /*
                 * Hapus gambar.
                 */

                document
                    .querySelectorAll(
                        ".photo-slot img"
                    )
                    .forEach(
                        image => {

                            image.removeAttribute(
                                "src"
                            );


                            image.classList.remove(
                                "visible"
                            );

                        }
                    );


                /*
                 * Tampilkan placeholder.
                 */

                document
                    .querySelectorAll(
                        ".slot-placeholder"
                    )
                    .forEach(
                        placeholder => {

                            placeholder.classList.remove(
                                "hidden"
                            );

                        }
                    );


                /*
                 * Sembunyikan result actions.
                 */

                if (resultActions) {

                    resultActions.classList.add(
                        "hidden"
                    );

                }


                /*
                 * Sembunyikan retake panel.
                 */

                if (retakePanel) {

                    retakePanel.classList.add(
                        "hidden"
                    );

                }


                updateProgress();

                updateRetakeButtons();

                updateCaptureButton();


                /*
                 * Kamera tetap hidup.
                 *
                 * Kalau ternyata kamera mati,
                 * hidupkan otomatis.
                 */

                await ensureCameraReady();


                updateCameraUI();

            }
        );

    }


    /* =========================================================
       DOWNLOAD
       ========================================================= */

    if (downloadBtn) {

        downloadBtn.addEventListener(
            "click",
            async () => {

                if (
                    typeof html2canvas !==
                    "function"
                ) {

                    alert(
                        t(
                            "photobooth.downloadError"
                        )
                    );

                    return;

                }


                try {

                    const canvas =
                        await html2canvas(
                            resultFrame,
                            {

                                backgroundColor:
                                    null,

                                scale:
                                    Math.max(
                                        2,
                                        window.devicePixelRatio ||
                                        1
                                    ),

                                useCORS:
                                    true,

                                allowTaint:
                                    true,

                                logging:
                                    false

                            }
                        );


                    const link =
                        document.createElement(
                            "a"
                        );


                    link.download =
                        "nayla-photobooth.jpg";


                    link.href =
                        canvas.toDataURL(
                            "image/jpeg",
                            0.95
                        );


                    link.click();

                } catch (error) {

                    console.error(
                        error
                    );


                    alert(
                        t(
                            "photobooth.downloadError"
                        )
                    );

                }

            }
        );

    }


    /* =========================================================
       CLEANUP
       ========================================================= */

    window.addEventListener(
        "beforeunload",
        () => {

            cancelCountdown();


            if (!stream) {
                return;
            }


            stream
                .getTracks()
                .forEach(
                    track => {

                        try {

                            track.stop();

                        } catch (error) {

                            console.warn(
                                error
                            );

                        }

                    }
                );


            stream =
                null;

        }
    );


    /* =========================================================
       VISIBILITY CHANGE
       ========================================================= */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.visibilityState ===
                "visible"
            ) {

                if (
                    isCameraActive() &&
                    video.paused
                ) {

                    video.play()
                        .catch(
                            () => {}
                        );

                }

            }

        }
    );


    /* =========================================================
       INITIAL
       ========================================================= */

    translatePhotobooth(
        currentLanguage
    );


    updateVideoMirror();

    updateVideoFilter();

    updateProgress();

    updateRetakeButtons();

    updateCaptureButton();

    updateCameraUI();

});