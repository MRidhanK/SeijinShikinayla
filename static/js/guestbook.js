/* =========================================================
   GUESTBOOK.JS
   =========================================================

   5 LANGUAGE SYSTEM
   ID • EN • JA • ZH • KO

   LANGUAGE SOURCE:
   - localStorage.language
   - localStorage.selectedLanguage
   - localStorage.currentLanguage
   - localStorage.lang
   - document.documentElement.lang

   NAVBAR:
   - .language-option[data-language]
   - languageChanged
   - languageChange
   - langChanged

   IMPORTANT:
   Guestbook TIDAK melakukan INSERT langsung ke Supabase.

   INSERT:
       Browser
          ↓
       Flask /api/guestbook
          ↓
       Supabase

   READ:
       Browser
          ↓
       Flask /api/guestbook
          ↓
       Supabase

   LIKE:
       Browser
          ↓
       Supabase RPC

   REALTIME:
       Supabase Realtime
========================================================= */


/* =========================================================
   01. TRANSLATION DICTIONARY
========================================================= */

const GUESTBOOK_TRANSLATIONS = {

    /* =====================================================
       INDONESIAN
    ===================================================== */

    id: {

        "navbar.home": "Beranda",
        "navbar.gallery": "Galeri",
        "navbar.guestbook": "Buku Tamu",
        "navbar.ai": "AI",
        "navbar.photobooth": "Photobooth",
        "navbar.games": "Permainan",
        "navbar.secretLetter": "Surat Rahasia",

        emaShrine: "絵馬 • EMA SHRINE",
        wishesForNayla: "Harapan untuk Nayla",
        heroDescription:
            "Setiap pesan akan menjadi sebuah Ema kayu yang tergantung di dalam kuil.",

        wishes: "Harapan",

        hangYourEma: "Gantung Ema Kamu",

        formDescription:
            "Tinggalkan doa dan harapanmu untuk Seijin Shiki Nayla.",

        yourName: "Nama Kamu",

        yourMessage: "Pesanmu...",

        writeYourWish: "Tuliskan harapanmu...",

        hangMyEma: "Gantung Ema-ku",

        preview: "Pratinjau",

        featuredWishLabel: "🌸 Harapan Pilihan",

        emaWall: "DINDING EMA",

        wishesFromEveryone: "Harapan dari Semua Orang",

        searchByName: "Cari berdasarkan nama...",

        searchPlaceholder: "Cari harapan...",

        newest: "Terbaru",

        oldest: "Terlama",

        longest: "Terlengkap",

        shortest: "Terpendek",

        mostLiked: "Paling Disukai",

        emaSuccess:
            "Ema kamu berhasil digantung.",

        loadingWishes:
            "Memuat harapan...",

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

        omikujiLabel:
            "おみくじ • OMIKUJI",

        drawYourFortune:
            "Ambil Keberuntunganmu",

        omikujiDescription:
            "Luangkan sejenak waktu, ambil keberuntunganmu, dan terima sedikit berkat untuk Seijin Shiki Nayla.",

        yourFortune:
            "Keberuntunganmu",

        drawFortuneMessage:
            "Ambil keberuntunganmu untuk menemukan berkatmu.",

        fortuneBlessing:
            "Semoga harapanmu menjadi kenyataan.",

        drawFortuneButton:
            "🎋 Ambil Keberuntungan",

        blessingsLabel:
            "祝福 • BLESSINGS",

        hallOfBlessings:
            "Aula Berkat",

        blessingsDescription:
            "Harapan yang menerima paling banyak cinta dari semua orang yang mengunjungi kuil ini.",

        searchBlessings:
            "Cari berkat...",

        blessings:
            "berkat",

        loadingBlessings:
            "🌸 Memuat berkat...",

        wishTimelineLabel:
            "願いの軌跡 • WISH TIMELINE",

        journeyOfWishes:
            "Perjalanan Harapan",

        timelineDescription:
            "Setiap pesan menandai sebuah momen kecil dalam perjalanan Nayla.",

        untilNextChapterLabel:
            "🌸 旅の終わり • UNTIL THE NEXT CHAPTER",

        untilNextChapter:
            "Sampai Bab Berikutnya",

        closing1:
            "Kuil ini dibangun dari harapan, kenangan, dan rasa syukur.",

        closing2:
            "Setiap pesan yang ditulis di sini, setiap berkat kecil, dan setiap momen yang dibagikan telah menjadi bagian dari ceritanya.",

        closing3:
            "Untuk setiap penggemar yang meninggalkan pesan, terima kasih telah menjadi bagian darinya.",

        closingToNayla:
            "Dan untuk Nayla,",

        closing4:
            "semoga setiap harapan yang ditulis di sini menemukan jalannya kepadamu.",

        thankYouForVisiting:
            "Terima kasih telah mengunjungi",

        shrineName:
            "Nayla's Seijin Shiki Shrine.",

        noBlessingsFound:
            "Tidak ada berkat yang ditemukan.",

        allWishes:
            "Semua Harapan",

        greatFortune:
            "Keberuntungan Besar",

        goodFortune:
            "Keberuntungan Baik",

        smallFortune:
            "Keberuntungan Kecil",

        futureFortune:
            "Keberuntungan Masa Depan",

        fortuneMessage1:
            "Hari ini membawa energi yang baik. Percayalah pada langkah kecilmu.",

        fortuneMessage2:
            "Sebuah harapan sedang menemukan jalannya kepadamu.",

        fortuneMessage3:
            "Senyum kecil hari ini dapat menjadi kenangan besar di masa depan.",

        fortuneMessage4:
            "Jangan takut pada halaman baru. Sebuah cerita indah sedang dimulai.",

        fortuneBlessing1:
            "Semoga langkahmu selalu dipenuhi cahaya.",

        fortuneBlessing2:
            "Semoga orang-orang baik selalu menemukanmu.",

        fortuneBlessing3:
            "Semoga senyummu tidak pernah kehilangan alasannya.",

        fortuneBlessing4:
            "Semoga bab berikutnya menjadi lebih indah.",

        timelineEmpty:
            "Belum ada perjalanan harapan.",

        timelineWish:
            "Harapan",

        likes:
            "suka"
    },


    /* =====================================================
       ENGLISH
    ===================================================== */

    en: {

        "navbar.home": "Home",
        "navbar.gallery": "Gallery",
        "navbar.guestbook": "Guestbook",
        "navbar.ai": "AI",
        "navbar.photobooth": "Photobooth",
        "navbar.games": "Games",
        "navbar.secretLetter": "Secret Letter",

        emaShrine: "絵馬 • EMA SHRINE",
        wishesForNayla: "Wishes for Nayla",

        heroDescription:
            "Every message becomes a wooden Ema hanging inside the shrine.",

        wishes: "Wishes",

        hangYourEma:
            "Hang Your Ema",

        formDescription:
            "Leave your blessing for Nayla's Seijin Shiki.",

        yourName:
            "Your Name",

        yourMessage:
            "Your Message...",

        writeYourWish:
            "Write your wish...",

        hangMyEma:
            "Hang My Ema",

        preview:
            "Preview",

        featuredWishLabel:
            "🌸 Featured Wish",

        emaWall:
            "EMA WALL",

        wishesFromEveryone:
            "Wishes from Everyone",

        searchByName:
            "Search by name...",

        searchPlaceholder:
            "Search wishes...",

        newest:
            "Newest",

        oldest:
            "Oldest",

        longest:
            "Longest",

        shortest:
            "Shortest",

        mostLiked:
            "Most Liked",

        emaSuccess:
            "Your Ema has been hung successfully.",

        loadingWishes:
            "Loading wishes...",

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

        omikujiLabel:
            "おみくじ • OMIKUJI",

        drawYourFortune:
            "Draw Your Fortune",

        omikujiDescription:
            "Take a moment, draw your fortune, and receive a little blessing for Nayla's Seijin Shiki.",

        yourFortune:
            "Your Fortune",

        drawFortuneMessage:
            "Draw your fortune to discover your blessing.",

        fortuneBlessing:
            "May your wish come true.",

        drawFortuneButton:
            "🎋 Draw Your Fortune",

        blessingsLabel:
            "祝福 • BLESSINGS",

        hallOfBlessings:
            "Hall of Blessings",

        blessingsDescription:
            "Wishes that received the most love from everyone who visited this shrine.",

        searchBlessings:
            "Search blessings...",

        blessings:
            "blessings",

        loadingBlessings:
            "🌸 Loading blessings...",

        wishTimelineLabel:
            "願いの軌跡 • WISH TIMELINE",

        journeyOfWishes:
            "The Journey of Wishes",

        timelineDescription:
            "Every message marks a small moment in Nayla's journey.",

        untilNextChapterLabel:
            "🌸 旅の終わり • UNTIL THE NEXT CHAPTER",

        untilNextChapter:
            "Until The Next Chapter",

        closing1:
            "This shrine was built from wishes, memories, and gratitude.",

        closing2:
            "Every message written here, every little blessing, and every moment shared has become part of its story.",

        closing3:
            "To every fan who left a message, thank you for becoming part of it.",

        closingToNayla:
            "And to Nayla,",

        closing4:
            "may every wish written here find its way to you.",

        thankYouForVisiting:
            "Thank you for visiting",

        shrineName:
            "Nayla's Seijin Shiki Shrine.",

        noBlessingsFound:
            "No blessings found.",

        allWishes:
            "All Wishes",

        greatFortune:
            "Great Fortune",

        goodFortune:
            "Good Fortune",

        smallFortune:
            "Small Fortune",

        futureFortune:
            "Future Fortune",

        fortuneMessage1:
            "Today carries good energy. Trust your small steps.",

        fortuneMessage2:
            "A wish is finding its way toward you.",

        fortuneMessage3:
            "A small smile today may become a beautiful memory tomorrow.",

        fortuneMessage4:
            "Do not be afraid of a new page. A beautiful story is beginning.",

        fortuneBlessing1:
            "May every step you take be filled with light.",

        fortuneBlessing2:
            "May good people always find their way to you.",

        fortuneBlessing3:
            "May your smile never run out of reasons.",

        fortuneBlessing4:
            "May the next chapter be even more beautiful.",

        timelineEmpty:
            "The journey of wishes has not begun yet.",

        timelineWish:
            "Wish",

        likes:
            "likes"
    },


    /* =====================================================
       JAPANESE
    ===================================================== */

    ja: {

        "navbar.home": "ホーム",
        "navbar.gallery": "ギャラリー",
        "navbar.guestbook": "ゲストブック",
        "navbar.ai": "AI",
        "navbar.photobooth": "フォトブース",
        "navbar.games": "ゲーム",
        "navbar.secretLetter": "秘密の手紙",

        emaShrine:
            "絵馬 • EMA SHRINE",

        wishesForNayla:
            "ナイラへの願い",

        heroDescription:
            "すべてのメッセージが木製の絵馬となり、神社に飾られます。",

        wishes:
            "願い",

        hangYourEma:
            "絵馬を掛ける",

        formDescription:
            "ナイラの成人式へ、あなたの祝福と願いを残してください。",

        yourName:
            "あなたの名前",

        yourMessage:
            "あなたのメッセージ...",

        writeYourWish:
            "願いを書いてください...",

        hangMyEma:
            "私の絵馬を掛ける",

        preview:
            "プレビュー",

        featuredWishLabel:
            "🌸 注目の願い",

        emaWall:
            "絵馬の壁",

        wishesFromEveryone:
            "みんなからの願い",

        searchByName:
            "名前で検索...",

        searchPlaceholder:
            "願いを検索...",

        newest:
            "新しい順",

        oldest:
            "古い順",

        longest:
            "長い順",

        shortest:
            "短い順",

        mostLiked:
            "人気順",

        emaSuccess:
            "あなたの絵馬が無事に掛けられました。",

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

        omikujiLabel:
            "おみくじ • OMIKUJI",

        drawYourFortune:
            "おみくじを引く",

        omikujiDescription:
            "少し立ち止まり、おみくじを引いて、ナイラの成人式への小さな祝福を受け取りましょう。",

        yourFortune:
            "あなたの運勢",

        drawFortuneMessage:
            "おみくじを引いて、あなたの祝福を見つけましょう。",

        fortuneBlessing:
            "あなたの願いが叶いますように。",

        drawFortuneButton:
            "🎋 おみくじを引く",

        blessingsLabel:
            "祝福 • BLESSINGS",

        hallOfBlessings:
            "祝福の殿堂",

        blessingsDescription:
            "この神社を訪れた皆さんから、たくさんの愛を受け取った願いです。",

        searchBlessings:
            "祝福を検索...",

        blessings:
            "祝福",

        loadingBlessings:
            "🌸 祝福を読み込んでいます...",

        wishTimelineLabel:
            "願いの軌跡 • WISH TIMELINE",

        journeyOfWishes:
            "願いの旅",

        timelineDescription:
            "すべてのメッセージが、ナイラの旅の小さな瞬間を刻みます。",

        untilNextChapterLabel:
            "🌸 旅の終わり • UNTIL THE NEXT CHAPTER",

        untilNextChapter:
            "次の章まで",

        closing1:
            "この神社は、願い、思い出、そして感謝から作られました。",

        closing2:
            "ここに書かれたすべてのメッセージ、小さな祝福、そして共有された瞬間が、その物語の一部になりました。",

        closing3:
            "メッセージを残してくれたすべてのファンへ。本当にありがとうございます。",

        closingToNayla:
            "そしてナイラへ、",

        closing4:
            "ここに書かれたすべての願いが、あなたのもとへ届きますように。",

        thankYouForVisiting:
            "訪れてくれてありがとう",

        shrineName:
            "ナイラの成人式神社。",

        noBlessingsFound:
            "祝福が見つかりません。",

        allWishes:
            "すべての願い",

        greatFortune:
            "大吉",

        goodFortune:
            "中吉",

        smallFortune:
            "小吉",

        futureFortune:
            "未来の幸運",

        fortuneMessage1:
            "今日は良いエネルギーに満ちています。小さな一歩を信じてください。",

        fortuneMessage2:
            "ひとつの願いがあなたへ向かっています。",

        fortuneMessage3:
            "今日の小さな笑顔が、明日の美しい思い出になるかもしれません。",

        fortuneMessage4:
            "新しいページを恐れないでください。美しい物語が始まります。",

        fortuneBlessing1:
            "あなたの歩む道がいつも光で満たされますように。",

        fortuneBlessing2:
            "良い人たちがいつもあなたを見つけられますように。",

        fortuneBlessing3:
            "あなたの笑顔にいつも理由がありますように。",

        fortuneBlessing4:
            "次の章がさらに美しいものになりますように。",

        timelineEmpty:
            "まだ願いの旅は始まっていません。",

        timelineWish:
            "願い",

        likes:
            "いいね"
    },


    /* =====================================================
       CHINESE
    ===================================================== */

    zh: {

        "navbar.home": "首页",
        "navbar.gallery": "相册",
        "navbar.guestbook": "留言簿",
        "navbar.ai": "AI",
        "navbar.photobooth": "拍照亭",
        "navbar.games": "游戏",
        "navbar.secretLetter": "秘密信件",

        emaShrine:
            "絵馬 • EMA SHRINE",

        wishesForNayla:
            "给 Nayla 的愿望",

        heroDescription:
            "每一条留言都会变成一块木制绘马，挂在神社之中。",

        wishes:
            "愿望",

        hangYourEma:
            "挂上你的绘马",

        formDescription:
            "为 Nayla 的成人礼留下你的祝福与愿望。",

        yourName:
            "你的名字",

        yourMessage:
            "你的留言...",

        writeYourWish:
            "写下你的愿望...",

        hangMyEma:
            "挂上我的绘马",

        preview:
            "预览",

        featuredWishLabel:
            "🌸 精选愿望",

        emaWall:
            "绘马墙",

        wishesFromEveryone:
            "来自大家的愿望",

        searchByName:
            "按名字搜索...",

        searchPlaceholder:
            "搜索愿望...",

        newest:
            "最新",

        oldest:
            "最早",

        longest:
            "最长",

        shortest:
            "最短",

        mostLiked:
            "最受喜欢",

        emaSuccess:
            "你的绘马已经成功挂上。",

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

        omikujiLabel:
            "おみくじ • OMIKUJI",

        drawYourFortune:
            "抽取你的运势",

        omikujiDescription:
            "静下心来抽取你的运势，为 Nayla 的成人礼收到一份小小的祝福。",

        yourFortune:
            "你的运势",

        drawFortuneMessage:
            "抽取你的运势，发现属于你的祝福。",

        fortuneBlessing:
            "愿你的愿望能够实现。",

        drawFortuneButton:
            "🎋 抽取运势",

        blessingsLabel:
            "祝福 • BLESSINGS",

        hallOfBlessings:
            "祝福大厅",

        blessingsDescription:
            "这些愿望收到了来自所有访客最多的爱与祝福。",

        searchBlessings:
            "搜索祝福...",

        blessings:
            "祝福",

        loadingBlessings:
            "🌸 正在加载祝福...",

        wishTimelineLabel:
            "願いの軌跡 • WISH TIMELINE",

        journeyOfWishes:
            "愿望之旅",

        timelineDescription:
            "每一条留言都记录着 Nayla 旅程中的一个小小瞬间。",

        untilNextChapterLabel:
            "🌸 旅の終わり • UNTIL THE NEXT CHAPTER",

        untilNextChapter:
            "直到下一章",

        closing1:
            "这座神社由愿望、回忆与感激共同建立。",

        closing2:
            "这里写下的每一条留言、每一份小小的祝福，以及分享过的每个瞬间，都成为了它故事的一部分。",

        closing3:
            "感谢每一位留下留言的粉丝，谢谢你成为这个故事的一部分。",

        closingToNayla:
            "而对于 Nayla，",

        closing4:
            "愿写在这里的每一个愿望，都能找到通往你身边的道路。",

        thankYouForVisiting:
            "感谢你的到访",

        shrineName:
            "Nayla 的成人礼神社。",

        noBlessingsFound:
            "没有找到祝福。",

        allWishes:
            "所有愿望",

        greatFortune:
            "大吉",

        goodFortune:
            "中吉",

        smallFortune:
            "小吉",

        futureFortune:
            "未来的好运",

        fortuneMessage1:
            "今天充满了美好的能量。相信自己的每一步。",

        fortuneMessage2:
            "一个愿望正在向你走来。",

        fortuneMessage3:
            "今天的小小笑容，也许会成为明天的美好回忆。",

        fortuneMessage4:
            "不要害怕新的一页。一个美丽的故事正在开始。",

        fortuneBlessing1:
            "愿你的每一步都被光明照耀。",

        fortuneBlessing2:
            "愿善良的人们总能找到你。",

        fortuneBlessing3:
            "愿你的笑容永远都有理由。",

        fortuneBlessing4:
            "愿下一章更加美丽。",

        timelineEmpty:
            "愿望之旅还没有开始。",

        timelineWish:
            "愿望",

        likes:
            "喜欢"
    },


    /* =====================================================
       KOREAN
    ===================================================== */

    ko: {

        "navbar.home": "홈",
        "navbar.gallery": "갤러리",
        "navbar.guestbook": "방명록",
        "navbar.ai": "AI",
        "navbar.photobooth": "포토부스",
        "navbar.games": "게임",
        "navbar.secretLetter": "비밀 편지",

        emaShrine:
            "絵馬 • EMA SHRINE",

        wishesForNayla:
            "나일라를 위한 소원",

        heroDescription:
            "모든 메시지는 나무 에마가 되어 신사에 걸립니다.",

        wishes:
            "소원",

        hangYourEma:
            "에마 걸기",

        formDescription:
            "나일라의 성인식을 위해 축복과 소원을 남겨주세요.",

        yourName:
            "이름",

        yourMessage:
            "메시지...",

        writeYourWish:
            "소원을 작성해주세요...",

        hangMyEma:
            "내 에마 걸기",

        preview:
            "미리보기",

        featuredWishLabel:
            "🌸 추천 소원",

        emaWall:
            "에마 월",

        wishesFromEveryone:
            "모두의 소원",

        searchByName:
            "이름으로 검색...",

        searchPlaceholder:
            "소원 검색...",

        newest:
            "최신순",

        oldest:
            "오래된 순",

        longest:
            "긴 순",

        shortest:
            "짧은 순",

        mostLiked:
            "좋아요 순",

        emaSuccess:
            "에마가 성공적으로 걸렸습니다.",

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

        omikujiLabel:
            "おみくじ • OMIKUJI",

        drawYourFortune:
            "운세 뽑기",

        omikujiDescription:
            "잠시 마음을 가라앉히고 운세를 뽑아 나일라의 성인식을 위한 작은 축복을 받아보세요.",

        yourFortune:
            "당신의 운세",

        drawFortuneMessage:
            "운세를 뽑고 당신의 축복을 확인해보세요.",

        fortuneBlessing:
            "당신의 소원이 이루어지길 바랍니다.",

        drawFortuneButton:
            "🎋 운세 뽑기",

        blessingsLabel:
            "祝福 • BLESSINGS",

        hallOfBlessings:
            "축복의 전당",

        blessingsDescription:
            "이 신사를 방문한 모든 사람들에게 가장 많은 사랑을 받은 소원입니다.",

        searchBlessings:
            "축복 검색...",

        blessings:
            "축복",

        loadingBlessings:
            "🌸 축복을 불러오는 중...",

        wishTimelineLabel:
            "願いの軌跡 • WISH TIMELINE",

        journeyOfWishes:
            "소원의 여정",

        timelineDescription:
            "모든 메시지는 나일라의 여정 속 작은 순간을 기록합니다.",

        untilNextChapterLabel:
            "🌸 旅の終わり • UNTIL THE NEXT CHAPTER",

        untilNextChapter:
            "다음 장까지",

        closing1:
            "이 신사는 소원과 추억, 그리고 감사로 만들어졌습니다.",

        closing2:
            "이곳에 남겨진 모든 메시지와 작은 축복, 그리고 함께한 모든 순간이 이 이야기의 일부가 되었습니다.",

        closing3:
            "메시지를 남겨준 모든 팬 여러분, 이 이야기의 일부가 되어주셔서 감사합니다.",

        closingToNayla:
            "그리고 나일라에게,",

        closing4:
            "이곳에 적힌 모든 소원이 당신에게 닿기를 바랍니다.",

        thankYouForVisiting:
            "방문해주셔서 감사합니다",

        shrineName:
            "나일라의 성인식 신사.",

        noBlessingsFound:
            "축복을 찾을 수 없습니다.",

        allWishes:
            "모든 소원",

        greatFortune:
            "대길",

        goodFortune:
            "길",

        smallFortune:
            "소길",

        futureFortune:
            "미래의 행운",

        fortuneMessage1:
            "오늘은 좋은 에너지로 가득합니다. 작은 발걸음을 믿어보세요.",

        fortuneMessage2:
            "하나의 소원이 당신을 향해 오고 있습니다.",

        fortuneMessage3:
            "오늘의 작은 미소가 내일의 아름다운 추억이 될 수 있습니다.",

        fortuneMessage4:
            "새로운 페이지를 두려워하지 마세요. 아름다운 이야기가 시작됩니다.",

        fortuneBlessing1:
            "당신의 모든 발걸음이 빛으로 가득하길 바랍니다.",

        fortuneBlessing2:
            "좋은 사람들이 언제나 당신을 찾아오길 바랍니다.",

        fortuneBlessing3:
            "당신의 미소에 언제나 이유가 있기를 바랍니다.",

        fortuneBlessing4:
            "다음 장이 더욱 아름답기를 바랍니다.",

        timelineEmpty:
            "아직 소원의 여정이 시작되지 않았습니다.",

        timelineWish:
            "소원",

        likes:
            "좋아요"
    }

};


/* =========================================================
   02. LANGUAGE SYSTEM
========================================================= */

const SUPPORTED_GUESTBOOK_LANGUAGES = [
    "id",
    "en",
    "ja",
    "zh",
    "ko"
];


function normalizeGuestbookLanguage(language) {

    const value = String(language || "")
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
        value === "zh" ||
        value.startsWith("zh-")
    ) {
        return "zh";
    }

    if (
        value === "ko" ||
        value.startsWith("ko-")
    ) {
        return "ko";
    }

    return "en";
}


function getCurrentGuestbookLanguage() {

    const keys = [
        "language",
        "selectedLanguage",
        "currentLanguage",
        "lang"
    ];

    for (const key of keys) {

        const value =
            localStorage.getItem(key);

        if (value) {

            const normalized =
                normalizeGuestbookLanguage(value);

            if (
                SUPPORTED_GUESTBOOK_LANGUAGES
                    .includes(normalized)
            ) {
                return normalized;
            }
        }
    }

    const htmlLanguage =
        document.documentElement
            ?.getAttribute("lang");

    if (htmlLanguage) {

        return normalizeGuestbookLanguage(
            htmlLanguage
        );
    }

    return "en";
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
        typeof text !== "string"
    ) {

        text =
            GUESTBOOK_TRANSLATIONS.en?.[key];
    }

    if (
        typeof text !== "string"
    ) {

        return key;
    }

    Object.entries(
        replacements
    ).forEach(
        ([name, value]) => {

            text = text.replace(
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
   04. ELEMENTS
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

const blessingSearch =
    document.getElementById(
        "blessingSearch"
    );

const blessingSort =
    document.getElementById(
        "blessingSort"
    );

const blessingGrid =
    document.getElementById(
        "blessingGrid"
    );

const blessingCount =
    document.getElementById(
        "blessingCount"
    );

const blessingEmpty =
    document.getElementById(
        "blessingEmpty"
    );

const blessingLoading =
    document.getElementById(
        "blessingLoading"
    );

const blessingError =
    document.getElementById(
        "blessingError"
    );

const blessingRetry =
    document.getElementById(
        "blessingRetry"
    );

const wishTimeline =
    document.getElementById(
        "wishTimeline"
    );

const featuredWish =
    document.getElementById(
        "featuredWish"
    );

const featuredBlessing =
    document.getElementById(
        "featuredBlessing"
    );

const omikujiNumber =
    document.getElementById(
        "omikujiNumber"
    );

const fortuneTitle =
    document.getElementById(
        "fortuneTitle"
    );

const fortuneIcon =
    document.getElementById(
        "fortuneIcon"
    );

const fortuneMessage =
    document.getElementById(
        "fortuneMessage"
    );

const fortuneBlessing =
    document.getElementById(
        "fortuneBlessing"
    );

const drawOmikuji =
    document.getElementById(
        "drawOmikuji"
    );


/* =========================================================
   05. CONFIG
========================================================= */

const MAX_NAME_LENGTH = 50;

const MAX_MESSAGE_LENGTH = 1000;

const API_GUESTBOOK =
    "/api/guestbook";


/* =========================================================
   06. STATE
========================================================= */

let wishes = [];

let isSubmitting = false;

let realtimeChannel = null;

let featuredInterval = null;


/* =========================================================
   07. APPLY ALL TRANSLATIONS
========================================================= */

function applyGuestbookTranslations() {

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


    document
        .querySelectorAll(
            "[data-i18n-title]"
        )
        .forEach(
            element => {

                const key =
                    element.dataset
                        .i18nTitle;

                if (!key) {
                    return;
                }

                element.title =
                    guestbookT(key);

            }
        );


    document
        .querySelectorAll(
            "[data-i18n-aria-label]"
        )
        .forEach(
            element => {

                const key =
                    element.dataset
                        .i18nAriaLabel;

                if (!key) {
                    return;
                }

                element.setAttribute(
                    "aria-label",
                    guestbookT(key)
                );

            }
        );


    updateGuestbookDynamicText();

    updateLanguageAttribute();

}


/* =========================================================
   08. HTML LANG
========================================================= */

function updateLanguageAttribute() {

    const language =
        getCurrentGuestbookLanguage();

    document.documentElement
        .setAttribute(
            "lang",
            language
        );
}


/* =========================================================
   09. DYNAMIC TEXT
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
                "searchByName"
            );

    }


    if (blessingSearch) {

        blessingSearch.placeholder =
            guestbookT(
                "searchBlessings"
            );

    }


    if (counter && guestMessage) {

        counter.textContent =
            `${guestMessage.value.length} / ${MAX_MESSAGE_LENGTH}`;

    }


    updateLikeLabels();

}


/* =========================================================
   10. LIKE LABEL TRANSLATION
========================================================= */

function updateLikeLabels() {

    document
        .querySelectorAll(
            ".like-btn"
        )
        .forEach(
            button => {

                button.setAttribute(
                    "aria-label",
                    guestbookT(
                        "likeThisWish"
                    )
                );

                const count =
                    button.querySelector(
                        ".like-count"
                    );

                if (!count) {
                    return;
                }

            }
        );
}


/* =========================================================
   11. LANGUAGE CHANGE
========================================================= */

function handleGuestbookLanguageChange(
    event
) {

    let requestedLanguage = null;

    if (event?.detail) {

        requestedLanguage =
            event.detail.language ||
            event.detail.lang ||
            event.detail.value ||
            null;
    }

    if (requestedLanguage) {

        setGuestbookLanguage(
            requestedLanguage,
            false
        );

    } else {

        applyGuestbookTranslations();

    }


    if (wishes.length) {

        filterAndRender();

        renderBlessings();

        renderTimeline();

        updateFeaturedWish();

    } else {

        renderGuestbook();

    }


    updateOmikujiText();

}


/* =========================================================
   12. SET LANGUAGE
========================================================= */

function setGuestbookLanguage(
    language,
    persist = true
) {

    const normalized =
        normalizeGuestbookLanguage(
            language
        );

    if (
        !SUPPORTED_GUESTBOOK_LANGUAGES
            .includes(normalized)
    ) {
        return;
    }


    if (persist) {

        localStorage.setItem(
            "language",
            normalized
        );

        localStorage.setItem(
            "selectedLanguage",
            normalized
        );
    }


    document.documentElement
        .setAttribute(
            "lang",
            normalized
        );


    applyGuestbookTranslations();


    if (wishes.length) {

        filterAndRender();

        renderBlessings();

        renderTimeline();

        updateFeaturedWish();
    }

}


/* =========================================================
   13. NAVBAR DIRECT INTEGRATION
========================================================= */

/*
 * Ini bagian penting.
 *
 * Kalau navbar JS milikmu TIDAK mengirim:
 *
 * window.dispatchEvent(
 *     new CustomEvent("languageChanged")
 * );
 *
 * guestbook tetap bisa mendeteksi klik dropdown
 * secara langsung.
 */

document.addEventListener(
    "click",
    event => {

        const languageOption =
            event.target.closest(
                ".language-option[data-language]"
            );

        if (!languageOption) {
            return;
        }

        const language =
            languageOption.dataset.language;

        if (!language) {
            return;
        }


        /*
         * Tunggu navbar utama menyelesaikan
         * proses localStorage-nya.
         */

        setTimeout(
            () => {

                setGuestbookLanguage(
                    language,
                    true
                );

            },
            0
        );

    }
);


/* =========================================================
   14. NAVBAR CUSTOM EVENTS
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
   15. STORAGE SYNC
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
   16. HTML LANG OBSERVER
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

                    applyGuestbookTranslations();

                    if (wishes.length) {

                        renderBlessings();

                        renderTimeline();

                    }

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
   17. INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeGuestbook
);


async function initializeGuestbook() {

    /*
     * Ambil bahasa dari navbar/localStorage.
     */

    const language =
        getCurrentGuestbookLanguage();

    setGuestbookLanguage(
        language,
        false
    );


    updateCharacterCounter();

    initializePreview();

    initializeGuestbookInputs();

    initializeOmikuji();

    initializeBlessings();

    await loadGuestbook();

    initGuestbookRealtime();

    startFeaturedRotation();

    createSakura();

}


/* =========================================================
   18. INPUT INITIALIZATION
========================================================= */

function initializeGuestbookInputs() {

    if (guestName) {

        guestName.addEventListener(
            "input",
            () => {

                if (
                    guestName.value.length >
                    MAX_NAME_LENGTH
                ) {

                    guestName.value =
                        guestName.value.substring(
                            0,
                            MAX_NAME_LENGTH
                        );
                }


                if (previewName) {

                    previewName.textContent =
                        guestName.value.trim() ||
                        guestbookT(
                            "yourName"
                        );

                }

            }
        );

    }


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


    if (blessingSearch) {

        blessingSearch.addEventListener(
            "input",
            renderBlessings
        );

    }


    if (blessingSort) {

        blessingSort.addEventListener(
            "change",
            renderBlessings
        );

    }


    if (blessingRetry) {

        blessingRetry.addEventListener(
            "click",
            () => {

                renderBlessings();

            }
        );

    }


    if (form) {

        form.addEventListener(
            "submit",
            handleGuestbookSubmit
        );

    }

}


/* =========================================================
   19. PREVIEW
========================================================= */

function initializePreview() {

    updateGuestbookDynamicText();

}


/* =========================================================
   20. COUNTER
========================================================= */

function updateCharacterCounter() {

    if (
        !counter ||
        !guestMessage
    ) {
        return;
    }

    counter.textContent =
        `${guestMessage.value.length} / ${MAX_MESSAGE_LENGTH}`;
}


/* =========================================================
   21. SUBMIT
========================================================= */

async function handleGuestbookSubmit(
    event
) {

    event.preventDefault();

    if (isSubmitting) {
        return;
    }


    const name =
        guestName?.value.trim() || "";

    const message =
        guestMessage?.value.trim() || "";


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


    isSubmitting = true;

    setSubmitState(true);


    try {

        const response =
            await fetch(
                API_GUESTBOOK,
                {
                    method: "POST",

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


        let result = null;

        try {

            result =
                await response.json();

        } catch {

            result = null;

        }


        if (!response.ok) {

            handleGuestbookApiError(
                response,
                result
            );

            return;
        }


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


        sessionStorage.removeItem(
            "prayerBellRung"
        );


        form.reset();

        initializePreview();

        updateCharacterCounter();

        showToast();


        if (result.wish) {

            const exists =
                wishes.some(
                    item =>
                        String(item.id) ===
                        String(
                            result.wish.id
                        )
                );


            if (!exists) {

                wishes.unshift(
                    result.wish
                );

            }

            filterAndRender();

            renderBlessings();

            renderTimeline();

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

        isSubmitting = false;

        setSubmitState(false);

    }

}


/* =========================================================
   22. SUBMIT BUTTON
========================================================= */

function setSubmitState(
    loading
) {

    if (!form) {
        return;
    }


    const button =
        form.querySelector(
            "#submitWish"
        );


    if (!button) {
        return;
    }


    if (loading) {

        button.disabled = true;

        button.dataset
            .originalText =
                button.textContent;

        button.textContent =
            guestbookT(
                "hangingEma"
            );

    } else {

        button.disabled = false;

        if (
            button.dataset
                .originalText
        ) {

            button.textContent =
                button.dataset
                    .originalText;

        } else {

            button.textContent =
                guestbookT(
                    "hangMyEma"
                );

        }

    }

}


/* =========================================================
   23. API ERROR
========================================================= */

function handleGuestbookApiError(
    response,
    result
) {

    const status =
        response.status;


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


    if (status === 429) {

        showGuestbookError(
            result?.error ||
            guestbookT(
                "tooManyRequests"
            )
        );

        return;
    }


    if (status === 400) {

        showGuestbookError(
            result?.error ||
            guestbookT(
                "checkMessage"
            )
        );

        return;
    }


    if (status >= 500) {

        showGuestbookError(
            result?.error ||
            guestbookT(
                "serverError"
            )
        );

        return;
    }


    showGuestbookError(
        result?.error ||
        guestbookT(
            "somethingWrong"
        )
    );

}


/* =========================================================
   24. LOAD GUESTBOOK
========================================================= */

async function loadGuestbook() {

    if (!wall) {
        return;
    }


    wall.innerHTML = `
        <div class="loading">
            <span class="loading-flower">🌸</span>
            <span>
                ${guestbookT(
                    "loadingWishes"
                )}
            </span>
        </div>
    `;


    try {

        const response =
            await fetch(
                API_GUESTBOOK,
                {
                    method: "GET",

                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            );


        let result = null;

        try {

            result =
                await response.json();

        } catch {

            result = null;

        }


        if (!response.ok) {

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

        renderBlessings();

        renderTimeline();

        updateFeaturedWish();


    } catch (error) {

        console.error(
            "Guestbook loading error:",
            error
        );


        wall.innerHTML = `
            <div class="empty-wall error-state">

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
                    class="retry-button"
                    onclick="loadGuestbook()">

                    ${guestbookT(
                        "tryAgain"
                    )}

                </button>

            </div>
        `;

    }

}


/* =========================================================
   25. RENDER GUESTBOOK
========================================================= */

function renderGuestbook() {

    if (wishCount) {

        animateCounter(
            wishCount,
            wishes.length
        );

    }


    if (!wishes.length) {

        if (wall) {

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

        }

        return;
    }


    filterAndRender();

}


/* =========================================================
   26. COUNTER ANIMATION
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

        target.textContent = "0";

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


    const duration = 500;

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
                1 - progress,
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
            String(number);


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
   27. CREATE EMA CARD
========================================================= */

function createCard(
    item
) {

    const rotations = [
        -4,
        -2,
        2,
        3,
        -3,
        4
    ];


    const card =
        document.createElement(
            "article"
        );


    card.className =
        "ema-card";


    card.dataset.id =
        item.id || "";


    card.style.setProperty(
        "--ema-rotation",
        `${
            rotations[
                Math.floor(
                    Math.random() *
                    rotations.length
                )
            ]
        }deg`
    );


    card.dataset.name =
        String(
            item.name || ""
        ).toLowerCase();


    card.dataset.message =
        String(
            item.message || ""
        ).toLowerCase();


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
        item.message || "";


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

    mood.className =
        "ema-mood";

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
        item.id || "";


    likeButton.setAttribute(
        "aria-label",
        guestbookT(
            "likeThisWish"
        )
    );


    if (
        localStorage.getItem(
            "liked_" + item.id
        )
    ) {

        likeButton.classList.add(
            "already-liked"
        );

    }


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
            "time"
        );

    date.className =
        "ema-date";

    date.textContent =
        formatDate(
            item.created_at
        );


    if (item.created_at) {

        date.dateTime =
            item.created_at;

    }


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
   28. DATE
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

        id: "id-ID",

        en: "en-US",

        ja: "ja-JP",

        zh: "zh-CN",

        ko: "ko-KR"

    };


    return date.toLocaleDateString(
        localeMap[language] ||
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    );

}


/* =========================================================
   29. FILTER + SORT
========================================================= */

function filterAndRender() {

    if (!wall) {
        return;
    }


    let filtered =
        [...wishes];


    const keyword =
        searchInput?.value
            .trim()
            .toLowerCase() ||
        "";


    if (keyword) {

        filtered =
            filtered.filter(
                item => {

                    const name =
                        String(
                            item.name ||
                            ""
                        ).toLowerCase();

                    const message =
                        String(
                            item.message ||
                            ""
                        ).toLowerCase();

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
                        b.message || ""
                    ).length -
                    String(
                        a.message || ""
                    ).length
            );

            break;


        case "shortest":

            filtered.sort(
                (a, b) =>
                    String(
                        a.message || ""
                    ).length -
                    String(
                        b.message || ""
                    ).length
            );

            break;

    }


    buildRows(
        filtered
    );

}


/* =========================================================
   30. BUILD ROWS
========================================================= */

function buildRows(
    data = wishes
) {

    if (!wall) {
        return;
    }


    wall.innerHTML = "";


    if (!data.length) {

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


    const cardsPerRow = 3;


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
   31. FEATURED WISH
========================================================= */

function updateFeaturedWish() {

    if (
        !featuredWish ||
        !wishes.length
    ) {
        return;
    }


    const random =
        wishes[
            Math.floor(
                Math.random() *
                wishes.length
            )
        ];


    featuredWish.textContent =
        `"${random.message || ""}" — ${random.name || guestbookT("anonymous")}`;


    if (featuredBlessing) {

        featuredBlessing.textContent =
            `"${random.message || ""}" — ${random.name || guestbookT("anonymous")}`;

    }

}


/* =========================================================
   32. FEATURED ROTATION
========================================================= */

function startFeaturedRotation() {

    if (featuredInterval) {

        clearInterval(
            featuredInterval
        );

    }


    featuredInterval =
        setInterval(
            updateFeaturedWish,
            8000
        );

}


/* =========================================================
   33. LIKE
========================================================= */

document.addEventListener(
    "click",
    handleLikeClick
);


async function handleLikeClick(
    event
) {

    const button =
        event.target.closest(
            ".like-btn"
        );


    if (!button) {
        return;
    }


    const id =
        button.dataset.id;


    if (!id) {
        return;
    }


    if (
        button.dataset.loading ===
        "true"
    ) {
        return;
    }


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


    button.dataset.loading =
        "true";


    button.classList.add(
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


        const newCount =
            Array.isArray(data)
                ? data[0]
                : data;


        const count =
            button.querySelector(
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
                    String(id)
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
            button
        );


        renderBlessings();


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

        delete button.dataset.loading;


        setTimeout(
            () => {

                button.classList.remove(
                    "liked"
                );

            },
            350
        );

    }

}


/* =========================================================
   34. FLOATING HEART
========================================================= */

function spawnHeart(
    button
) {

    if (!button) {
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
        button.getBoundingClientRect();


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
        1100
    );

}


/* =========================================================
   35. REALTIME
========================================================= */

function initGuestbookRealtime() {

    if (
        typeof supabaseClient ===
        "undefined"
    ) {

        console.warn(
            "supabaseClient belum tersedia. Realtime dilewati."
        );

        return;
    }


    if (realtimeChannel) {
        return;
    }


    realtimeChannel =
        supabaseClient
            .channel(
                "guestbook-realtime"
            )


            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "guestbook"
                },
                payload => {

                    handleRealtimeInsert(
                        payload.new
                    );

                }
            )


            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "guestbook"
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
   36. REALTIME INSERT
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
                String(item.id) ===
                String(newWish.id)
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

    renderBlessings();

    renderTimeline();

    updateFeaturedWish();

}


/* =========================================================
   37. REALTIME UPDATE
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
                String(item.id) ===
                String(
                    updatedWish.id
                )
        );


    if (index === -1) {
        return;
    }


    wishes[index] = {
        ...wishes[index],
        ...updatedWish
    };


    const button =
        document.querySelector(
            `.like-btn[data-id="${CSS.escape(String(updatedWish.id))}"]`
        );


    if (button) {

        const count =
            button.querySelector(
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


    renderBlessings();

}


/* =========================================================
   38. OMikuji
========================================================= */

const OMikujiResults = {

    id: [
        {
            number: "01",
            title: "greatFortune",
            icon: "🌸",
            message: "fortuneMessage1",
            blessing: "fortuneBlessing1"
        },
        {
            number: "02",
            title: "goodFortune",
            icon: "🎋",
            message: "fortuneMessage2",
            blessing: "fortuneBlessing2"
        },
        {
            number: "03",
            title: "smallFortune",
            icon: "🦋",
            message: "fortuneMessage3",
            blessing: "fortuneBlessing3"
        },
        {
            number: "04",
            title: "futureFortune",
            icon: "⛩️",
            message: "fortuneMessage4",
            blessing: "fortuneBlessing4"
        }
    ]

};


function initializeOmikuji() {

    if (!drawOmikuji) {
        return;
    }


    drawOmikuji.addEventListener(
        "click",
        drawFortune
    );


    updateOmikujiText();

}


function updateOmikujiText() {

    if (!fortuneTitle) {
        return;
    }


    if (
        fortuneTitle.dataset.drawn !==
        "true"
    ) {

        fortuneTitle.textContent =
            guestbookT(
                "yourFortune"
            );

        fortuneMessage.textContent =
            guestbookT(
                "drawFortuneMessage"
            );

        fortuneBlessing.textContent =
            guestbookT(
                "fortuneBlessing"
            );

    }

}


function drawFortune() {

    if (!fortuneTitle) {
        return;
    }


    const results =
        OMikujiResults.id;


    const result =
        results[
            Math.floor(
                Math.random() *
                results.length
            )
        ];


    if (omikujiNumber) {

        omikujiNumber.textContent =
            result.number;

    }


    fortuneTitle.textContent =
        guestbookT(
            result.title
        );


    fortuneTitle.dataset.drawn =
        "true";


    if (fortuneIcon) {

        fortuneIcon.textContent =
            result.icon;

    }


    if (fortuneMessage) {

        fortuneMessage.textContent =
            guestbookT(
                result.message
            );

    }


    if (fortuneBlessing) {

        fortuneBlessing.textContent =
            guestbookT(
                result.blessing
            );

    }


    if (drawOmikuji) {

        drawOmikuji.classList.add(
            "fortune-drawn"
        );

        setTimeout(
            () => {

                drawOmikuji.classList.remove(
                    "fortune-drawn"
                );

            },
            600
        );

    }

}


/* =========================================================
   39. BLESSINGS
========================================================= */

function initializeBlessings() {

    renderBlessings();

}


function renderBlessings() {

    if (!blessingGrid) {
        return;
    }


    if (blessingLoading) {

        blessingLoading.style.display =
            "none";

    }


    if (blessingError) {

        blessingError.style.display =
            "none";

    }


    if (blessingRetry) {

        blessingRetry.style.display =
            "none";

    }


    let data =
        [...wishes];


    const keyword =
        blessingSearch?.value
            .trim()
            .toLowerCase() ||
        "";


    if (keyword) {

        data =
            data.filter(
                item => {

                    const name =
                        String(
                            item.name ||
                            ""
                        ).toLowerCase();

                    const message =
                        String(
                            item.message ||
                            ""
                        ).toLowerCase();

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


    switch (
        blessingSort?.value
    ) {

        case "newest":

            data.sort(
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

            data.sort(
                (a, b) =>
                    new Date(
                        a.created_at
                    ) -
                    new Date(
                        b.created_at
                    )
            );

            break;


        case "liked":

            data.sort(
                (a, b) =>
                    Number(
                        b.likes
                    ) -
                    Number(
                        a.likes
                    )
            );

            break;


        case "longest":

            data.sort(
                (a, b) =>
                    String(
                        b.message || ""
                    ).length -
                    String(
                        a.message || ""
                    ).length
            );

            break;


        case "shortest":

            data.sort(
                (a, b) =>
                    String(
                        a.message || ""
                    ).length -
                    String(
                        b.message || ""
                    ).length
            );

            break;

    }


    if (blessingCount) {

        blessingCount.textContent =
            String(data.length);

    }


    if (!data.length) {

        blessingGrid.innerHTML = "";

        if (blessingEmpty) {

            blessingEmpty.style.display =
                "block";

            blessingEmpty.textContent =
                guestbookT(
                    "noBlessingsFound"
                );

        }

        return;
    }


    if (blessingEmpty) {

        blessingEmpty.style.display =
            "none";

    }


    blessingGrid.innerHTML = "";


    data.forEach(
        item => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "blessing-card";


            const icon =
                document.createElement(
                    "div"
                );

            icon.className =
                "blessing-icon";

            icon.textContent =
                item.mood ||
                "🌸";


            const message =
                document.createElement(
                    "p"
                );

            message.className =
                "blessing-message";

            message.textContent =
                item.message ||
                "";


            const name =
                document.createElement(
                    "strong"
                );

            name.className =
                "blessing-name";

            name.textContent =
                item.name ||
                guestbookT(
                    "anonymous"
                );


            const meta =
                document.createElement(
                    "small"
                );

            meta.className =
                "blessing-meta";

            meta.textContent =
                `❤️ ${
                    Number(
                        item.likes
                    ) || 0
                } ${guestbookT(
                    "likes"
                )}`;


            card.appendChild(
                icon
            );

            card.appendChild(
                message
            );

            card.appendChild(
                name
            );

            card.appendChild(
                meta
            );


            blessingGrid.appendChild(
                card
            );

        }
    );


    if (
        featuredBlessing &&
        data.length
    ) {

        const best =
            [...data].sort(
                (a, b) =>
                    Number(
                        b.likes
                    ) -
                    Number(
                        a.likes
                    )
            )[0];


        featuredBlessing.textContent =
            `"${best.message || ""}" — ${
                best.name ||
                guestbookT(
                    "anonymous"
                )
            }`;

    }

}


/* =========================================================
   40. TIMELINE
========================================================= */

function renderTimeline() {

    if (!wishTimeline) {
        return;
    }


    wishTimeline.innerHTML = "";


    if (!wishes.length) {

        const empty =
            document.createElement(
                "div"
            );

        empty.className =
            "timeline-empty";

        empty.textContent =
            guestbookT(
                "timelineEmpty"
            );

        wishTimeline.appendChild(
            empty
        );

        return;
    }


    const data =
        [...wishes]
            .sort(
                (a, b) =>
                    new Date(
                        a.created_at
                    ) -
                    new Date(
                        b.created_at
                    )
            );


    data.forEach(
        (item, index) => {

            const itemElement =
                document.createElement(
                    "article"
                );

            itemElement.className =
                "timeline-item";


            const dot =
                document.createElement(
                    "div"
                );

            dot.className =
                "timeline-dot";

            dot.textContent =
                "🌸";


            const content =
                document.createElement(
                    "div"
                );

            content.className =
                "timeline-content";


            const date =
                document.createElement(
                    "time"
                );

            date.className =
                "timeline-date";

            date.textContent =
                formatDate(
                    item.created_at
                );


            const title =
                document.createElement(
                    "h3"
                );

            title.textContent =
                item.name ||
                guestbookT(
                    "anonymous"
                );


            const message =
                document.createElement(
                    "p"
                );

            message.textContent =
                item.message ||
                "";


            content.appendChild(
                date
            );

            content.appendChild(
                title
            );

            content.appendChild(
                message
            );


            itemElement.appendChild(
                dot
            );

            itemElement.appendChild(
                content
            );


            wishTimeline.appendChild(
                itemElement
            );

        }
    );

}


/* =========================================================
   41. TOAST
========================================================= */

function showToast() {

    if (!toast) {
        return;
    }


    const content =
        toast.querySelector(
            "[data-i18n]"
        );


    if (content) {

        content.textContent =
            guestbookT(
                "emaSuccess"
            );

    } else {

        toast.textContent =
            guestbookT(
                "emaSuccess"
            );

    }


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
   42. ERROR
========================================================= */

function showGuestbookError(
    message
) {

    if (!toast) {

        alert(message);

        return;
    }


    toast.textContent =
        message;


    toast.classList.add(
        "show",
        "toast-error"
    );


    setTimeout(
        () => {

            toast.classList.remove(
                "show",
                "toast-error"
            );

            /*
             * Kembalikan toast success
             * supaya data-i18n bisa bekerja.
             */

            toast.innerHTML = `
                <span data-i18n="emaSuccess">
                    ${guestbookT(
                        "emaSuccess"
                    )}
                </span>
            `;

        },
        3500
    );

}


/* =========================================================
   43. SAKURA
========================================================= */

function createSakura() {

    const layer =
        document.querySelector(
            ".guestbook-sakura"
        );


    if (!layer) {
        return;
    }


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


            petal.style.animationDelay =
                Math.random() *
                2 +
                "s";


            layer.appendChild(
                petal
            );


            setTimeout(
                () => {

                    petal.remove();

                },
                14000
            );

        },
        600
    );

}


/* =========================================================
   44. MANUAL REFRESH
========================================================= */

function resizeGuestbook() {

    filterAndRender();

    renderBlessings();

    renderTimeline();

}


/* =========================================================
   45. CLEANUP
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


        if (featuredInterval) {

            clearInterval(
                featuredInterval
            );

            featuredInterval =
                null;

        }

    }
);


/* =========================================================
   46. GLOBAL FUNCTIONS
========================================================= */

window.loadGuestbook =
    loadGuestbook;

window.resizeGuestbook =
    resizeGuestbook;

window.setGuestbookLanguage =
    setGuestbookLanguage;

window.guestbookT =
    guestbookT;


/* =========================================================
   END
========================================================= */