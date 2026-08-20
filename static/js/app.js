console.log("Seijin Shiki Project Started");

document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.querySelector(".navbar");
    const hero = document.querySelector(".hero-content");

    window.addEventListener("scroll", () => {

        if (navbar) {

            navbar.classList.toggle(
                "scrolled",
                window.scrollY > 60
            );

        }

        if (hero) {

            const y = window.scrollY;

            hero.style.opacity =
                Math.max(0, 1 - y / 700);

            hero.style.transform =
                `translateY(${y * 0.2}px)`;

        }

    });

});
/* =========================================================
   CEREMONY PAGE
   SEIJIN SHIKI
   5 LANGUAGE SUPPORT

   Languages:
   - id = Indonesian
   - en = English
   - ja = Japanese
   - zh = Chinese
   - ko = Korean
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("=================================");
    console.log("CEREMONY PAGE INITIALIZED");
    console.log("=================================");


    /* =====================================================
       TRANSLATIONS
    ===================================================== */

    const translations = {

        /* =================================================
           INDONESIAN
        ================================================= */

        id: {
           
            "gallery.nayla_name":
                "Araki Nayla Suji Aurelia",
            
            "ceremony.hero.jp":
                "成人式",

            "ceremony.hero.subtitle":
                "Upacara Seijin Shiki",

            "ceremony.hero.intro":
                "Sebuah perayaan untuk babak baru, perjalanan menuju kedewasaan, dan kenangan yang membentuk diri kita.",

            "ceremony.hero.description":
                "Terinspirasi dari keanggunan dan tradisi Jepang, ruang ini dibuat untuk merayakan sebuah pencapaian penting dan awal dari perjalanan baru yang indah.",

            "ceremony.hero.divider":
                "成人",

            "ceremony.hero.scroll":
                "Gulir untuk menemukan",

            "ceremony.meaning.label":
                "UPACARA",

            "ceremony.meaning.title":
                "Apa itu Seijin Shiki?",

            "ceremony.meaning.lead":
                "Seijin Shiki adalah perayaan memasuki usia dewasa.",

            "ceremony.meaning.paragraph1":
                "Ini merupakan sebuah transisi bermakna dari masa kanak-kanak menuju tahap kehidupan yang baru, yang dipenuhi dengan kebebasan, tanggung jawab, impian, dan berbagai kemungkinan yang lebih besar.",

            "ceremony.meaning.paragraph2":
                "Lebih dari sekadar sebuah upacara, ini adalah momen untuk berhenti sejenak, melihat kembali perjalanan yang telah dilalui, dan menatap segala sesuatu yang masih menanti di depan.",

            "ceremony.meaning.adulthood":
                "KEDewasaan".toUpperCase(),

            "ceremony.countdown.label":
                "MENUJU BABAK BARU",

            "ceremony.countdown.title":
                "Ulang Tahun Nayla yang ke-20",

            "ceremony.countdown.days":
                "HARI",

            "ceremony.countdown.hours":
                "JAM",

            "ceremony.countdown.minutes":
                "MENIT",

            "ceremony.countdown.seconds":
                "DETIK",

            "ceremony.countdown.finished":
                "Babak baru telah dimulai.",

            "ceremony.countdown.birthday":
                "Selamat Ulang Tahun Nayla yang ke-20.",

            "ceremony.twenty.label":
                "SEBUAH PENCAPAIAN",

            "ceremony.twenty.title":
                "Dua Puluh Tahun",

            "ceremony.twenty.lead":
                "Dua puluh tahun kenangan. Dua puluh tahun perjalanan menjadi diri sendiri.",

            "ceremony.twenty.paragraph1":
                "Setiap senyuman, setiap tantangan, setiap persahabatan, setiap impian, dan setiap momen kecil telah membantu membentuk sosok yang berdiri di sini hari ini.",

            "ceremony.twenty.paragraph2":
                "Dan sekarang, babak lainnya dimulai.",

            "ceremony.chapter.twenty":
                "DUA PULUH",

            "ceremony.chapter.label":
                "BABAK BARU",

            "ceremony.chapter.title":
                "Perjalanan Terus Berlanjut",

            "ceremony.chapter.paragraph1":
                "Menjadi dewasa bukan berarti memiliki semua jawabannya.",

            "ceremony.chapter.paragraph2":
                "Ini berarti memiliki keberanian untuk terus mencari, belajar, tumbuh, dan menjadi versi diri yang lebih baik.",

            "ceremony.chapter.paragraph3":
                "Akan ada tempat-tempat baru untuk ditemukan, orang-orang baru untuk ditemui, impian-impian baru untuk dikejar, dan begitu banyak kenangan yang masih menunggu untuk diciptakan.",

            "ceremony.message.jp":
                "これからも",

            "ceremony.message.title":
                "Semoga perjalanan ke depan menjadi indah.",

            "ceremony.message.paragraph1":
                "Semoga setiap babak baru menghadirkan alasan lain untuk tersenyum.",

            "ceremony.message.paragraph2":
                "Semoga setiap impian menemukan jalannya untuk menjadi kenyataan.",

            "ceremony.message.with":
                "Dengan cinta,",

            "ceremony.message.for":
                "Untuk Nayla",

            "ceremony.next":
                "Lanjutkan perjalanan",

            "ceremony.memories.label":
                "KENANGAN JKT48",

            "ceremony.memories.title":
                "Sebuah Perjalanan Bersama JKT48",

            "ceremony.memories.intro":
                "Dari langkah pertama hingga momen-momen tak terlupakan di atas panggung, setiap babak menjadi bagian dari perjalanan.",

            "ceremony.gallery.2023":
                "Langkah Pertama dari Sebuah Perjalanan yang Indah",

            "ceremony.gallery.2024":
                "Bertumbuh Bersama JKT48 School",

            "ceremony.gallery.2025":
                "Dipromosikan menjadi Core Member & dipercaya sebagai penerjemah di Sister Reunion Festival",

            "ceremony.gallery.2026.rh":
                "Nayla membawakan Bird, meraih peringkat ke-15 di Request Hour 2026, bersama Aurelia dari Generasi 10 dan Aurhel Alana dari Generasi 12. Sebuah penampilan istimewa dan berkesan yang membuat banyak penggemar bangga dan terharu. 🕊️🩵",

            "ceremony.gallery.2026.birthday":
                "#HappinessNaylalaland19 🎂",

            "ceremony.gallery.2027.placeholder":
                "Sebuah babak baru sedang menanti...",

            "ceremony.gallery.2027":
                "Disiapkan untuk ulang tahun Nayla yang ke-20"

        },


        /* =================================================
           ENGLISH
        ================================================= */

        en: {

            "gallery.nayla_name":
                "Araki Nayla Suji Aurelia",

            "ceremony.hero.jp":
                "成人式",

            "ceremony.hero.subtitle":
                "Seijin Shiki Ceremony",

            "ceremony.hero.intro":
                "A celebration of a new chapter, a journey into adulthood, and the memories that shape who we become.",

            "ceremony.hero.description":
                "Inspired by the elegance and traditions of Japan, this space was created to celebrate an important milestone and the beginning of a beautiful new journey.",

            "ceremony.hero.divider":
                "成人",

            "ceremony.hero.scroll":
                "Scroll to discover",

            "ceremony.meaning.label":
                "THE CEREMONY",

            "ceremony.meaning.title":
                "What is Seijin Shiki?",

            "ceremony.meaning.lead":
                "Seijin Shiki is a celebration of entering adulthood.",

            "ceremony.meaning.paragraph1":
                "It represents a meaningful transition from childhood into a new stage of life, filled with greater freedom, responsibility, dreams, and possibilities.",

            "ceremony.meaning.paragraph2":
                "More than simply a ceremony, it is a moment to pause, look back at the journey that has already been taken, and look forward to everything that is still waiting ahead.",

            "ceremony.meaning.adulthood":
                "ADULTHOOD",

            "ceremony.countdown.label":
                "COUNTING DOWN TO A NEW CHAPTER",

            "ceremony.countdown.title":
                "Nayla's 20th Birthday",

            "ceremony.countdown.days":
                "DAYS",

            "ceremony.countdown.hours":
                "HOURS",

            "ceremony.countdown.minutes":
                "MINUTES",

            "ceremony.countdown.seconds":
                "SECONDS",

            "ceremony.countdown.finished":
                "The new chapter has begun.",

            "ceremony.countdown.birthday":
                "Happy 20th Birthday, Nayla.",

            "ceremony.twenty.label":
                "A MILESTONE",

            "ceremony.twenty.title":
                "Twenty Years",

            "ceremony.twenty.lead":
                "Twenty years of memories. Twenty years of becoming.",

            "ceremony.twenty.paragraph1":
                "Every smile, every challenge, every friendship, every dream, and every little moment has helped shape the person standing here today.",

            "ceremony.twenty.paragraph2":
                "And now, another chapter begins.",

            "ceremony.chapter.twenty":
                "TWENTY",

            "ceremony.chapter.label":
                "A NEW CHAPTER",

            "ceremony.chapter.title":
                "The Journey Continues",

            "ceremony.chapter.paragraph1":
                "Adulthood does not mean having every answer.",

            "ceremony.chapter.paragraph2":
                "It means having the courage to continue searching, learning, growing, and becoming.",

            "ceremony.chapter.paragraph3":
                "There will be new places to discover, new people to meet, new dreams to chase, and countless memories still waiting to be created.",

            "ceremony.message.jp":
                "これからも",

            "ceremony.message.title":
                "May the journey ahead be beautiful.",

            "ceremony.message.paragraph1":
                "May every new chapter bring another reason to smile.",

            "ceremony.message.paragraph2":
                "May every dream find its way toward becoming reality.",

            "ceremony.message.with":
                "With love,",

            "ceremony.message.for":
                "For Nayla",

            "ceremony.next":
                "Continue the journey",

            "ceremony.memories.label":
                "JKT48 MEMORIES",

            "ceremony.memories.title":
                "A Journey With JKT48",

            "ceremony.memories.intro":
                "From the first steps to unforgettable moments on stage, every chapter became a part of the journey.",

            "ceremony.gallery.2023":
                "The First Step of a Beautiful Journey",

            "ceremony.gallery.2024":
                "Growing Through JKT48 School",

            "ceremony.gallery.2025":
                "Promoted to Core Member & Trusted Translator at Sister Reunion Festival",

            "ceremony.gallery.2026.rh":
                "Nayla performed Bird, ranked 15th in Request Hour 2026, alongside Aurelia from Generation 10 and Aurhel Alana from Generation 12. A special and memorable performance that made many fans proud and emotional. 🕊️🩵",

            "ceremony.gallery.2026.birthday":
                "#HappinessNaylalaland19 🎂",

            "ceremony.gallery.2027.placeholder":
                "A new chapter is waiting...",

            "ceremony.gallery.2027":
                "Reserved for Nayla's 20th Birthday"

        },


        /* =================================================
           JAPANESE
        ================================================= */

        ja: {

            "gallery.nayla_name":
                "荒木・ナイラ・スジ・アウレリア",

            "ceremony.hero.jp":
                "成人式",

            "ceremony.hero.subtitle":
                "成人式",

            "ceremony.hero.intro":
                "新しい章の始まり、大人への旅立ち、そして今の私たちを形作ってきた思い出を祝うひととき。",

            "ceremony.hero.description":
                "日本の美しさと伝統に inspired されたこの場所は、大切な節目と美しい新しい旅の始まりを祝うために作られました。",

            "ceremony.hero.divider":
                "成人",

            "ceremony.hero.scroll":
                "スクロールしてご覧ください",

            "ceremony.meaning.label":
                "セレモニー",

            "ceremony.meaning.title":
                "成人式とは？",

            "ceremony.meaning.lead":
                "成人式は、大人への一歩を祝う式典です。",

            "ceremony.meaning.paragraph1":
                "子どもから新しい人生のステージへと進む大切な節目を表し、より大きな自由、責任、夢、そして可能性へとつながっていきます。",

            "ceremony.meaning.paragraph2":
                "単なる式典ではなく、これまで歩んできた道を振り返り、これから待っている未来を見つめるための大切な時間でもあります。",

            "ceremony.meaning.adulthood":
                "大人",

            "ceremony.countdown.label":
                "新しい章へのカウントダウン",

            "ceremony.countdown.title":
                "ナイラの20歳の誕生日",

            "ceremony.countdown.days":
                "日",

            "ceremony.countdown.hours":
                "時間",

            "ceremony.countdown.minutes":
                "分",

            "ceremony.countdown.seconds":
                "秒",

            "ceremony.countdown.finished":
                "新しい章が始まりました。",

            "ceremony.countdown.birthday":
                "ナイラ、20歳のお誕生日おめでとう。",

            "ceremony.twenty.label":
                "大切な節目",

            "ceremony.twenty.title":
                "20年",

            "ceremony.twenty.lead":
                "20年の思い出。20年の成長。",

            "ceremony.twenty.paragraph1":
                "すべての笑顔、挑戦、友情、夢、そして小さな瞬間の一つひとつが、今日ここにいる姿を形作ってきました。",

            "ceremony.twenty.paragraph2":
                "そして今、新しい章が始まります。",

            "ceremony.chapter.twenty":
                "20歳",

            "ceremony.chapter.label":
                "新しい章",

            "ceremony.chapter.title":
                "旅は続いていく",

            "ceremony.chapter.paragraph1":
                "大人になることは、すべての答えを持つことではありません。",

            "ceremony.chapter.paragraph2":
                "探し続け、学び続け、成長し続け、自分らしくなっていく勇気を持つことです。",

            "ceremony.chapter.paragraph3":
                "これから新しい場所、新しい出会い、新しい夢、そしてまだ作られていないたくさんの思い出が待っています。",

            "ceremony.message.jp":
                "これからも",

            "ceremony.message.title":
                "これからの旅が、美しいものでありますように。",

            "ceremony.message.paragraph1":
                "新しい章が始まるたびに、また一つ笑顔になれる理由が生まれますように。",

            "ceremony.message.paragraph2":
                "すべての夢が、いつか現実へとつながっていきますように。",

            "ceremony.message.with":
                "愛を込めて、",

            "ceremony.message.for":
                "ナイラへ",

            "ceremony.next":
                "旅を続ける",

            "ceremony.memories.label":
                "JKT48の思い出",

            "ceremony.memories.title":
                "JKT48と歩んだ旅",

            "ceremony.memories.intro":
                "最初の一歩から忘れられないステージまで、一つひとつの章がこの旅の一部になりました。",

            "ceremony.gallery.2023":
                "美しい旅の最初の一歩",

            "ceremony.gallery.2024":
                "JKT48 Schoolとともに成長",

            "ceremony.gallery.2025":
                "コアメンバーへ昇格 & Sister Reunion Festivalで信頼される通訳として活躍",

            "ceremony.gallery.2026.rh":
                "ナイラはRequest Hour 2026で15位にランクインした「Bird」を、10期生のアウレリア、12期生のアウレル・アラナとともに披露しました。多くのファンを誇らしく、そして感動させた特別で忘れられないステージでした。🕊️🩵",

            "ceremony.gallery.2026.birthday":
                "#HappinessNaylalaland19 🎂",

            "ceremony.gallery.2027.placeholder":
                "新しい章が待っています…",

            "ceremony.gallery.2027":
                "ナイラの20歳の誕生日のために準備中"

        },


        /* =================================================
           CHINESE
        ================================================= */

        zh: {

            "gallery.nayla_name":
                "阿拉基·奈拉·苏吉·奥蕾莉娅",

            "ceremony.hero.jp":
                "成人式",

            "ceremony.hero.subtitle":
                "成人式典",

            "ceremony.hero.intro":
                "庆祝人生新的篇章，踏上成年的旅程，以及那些塑造今天我们的珍贵回忆。",

            "ceremony.hero.description":
                "这个空间受到日本优雅与传统文化的启发，用来纪念一个重要的人生里程碑，以及一段美丽新旅程的开始。",

            "ceremony.hero.divider":
                "成人",

            "ceremony.hero.scroll":
                "向下探索",

            "ceremony.meaning.label":
                "典礼",

            "ceremony.meaning.title":
                "什么是成人式？",

            "ceremony.meaning.lead":
                "成人式是庆祝迈入成年阶段的重要仪式。",

            "ceremony.meaning.paragraph1":
                "它象征着从童年迈向人生新阶段的重要转变，也意味着更多的自由、责任、梦想与可能性。",

            "ceremony.meaning.paragraph2":
                "它不仅仅是一场典礼，更是一个让我们停下脚步、回望已经走过的旅程，并期待未来一切可能发生的珍贵时刻。",

            "ceremony.meaning.adulthood":
                "成年",

            "ceremony.countdown.label":
                "倒数迎接新的篇章",

            "ceremony.countdown.title":
                "Nayla 的20岁生日",

            "ceremony.countdown.days":
                "天",

            "ceremony.countdown.hours":
                "小时",

            "ceremony.countdown.minutes":
                "分钟",

            "ceremony.countdown.seconds":
                "秒",

            "ceremony.countdown.finished":
                "新的篇章已经开始。",

            "ceremony.countdown.birthday":
                "祝 Nayla 20岁生日快乐。",

            "ceremony.twenty.label":
                "人生里程碑",

            "ceremony.twenty.title":
                "二十年",

            "ceremony.twenty.lead":
                "二十年的回忆。二十年的成长。",

            "ceremony.twenty.paragraph1":
                "每一个微笑、每一次挑战、每一段友情、每一个梦想，以及每一个微小的瞬间，都塑造了今天站在这里的她。",

            "ceremony.twenty.paragraph2":
                "而现在，新的篇章即将开始。",

            "ceremony.chapter.twenty":
                "二十",

            "ceremony.chapter.label":
                "新的篇章",

            "ceremony.chapter.title":
                "旅程仍将继续",

            "ceremony.chapter.paragraph1":
                "成为成年人并不意味着拥有所有答案。",

            "ceremony.chapter.paragraph2":
                "而是拥有继续寻找、学习、成长，并不断成为更好的自己的勇气。",

            "ceremony.chapter.paragraph3":
                "未来还会有新的地方、新的相遇、新的梦想，以及无数等待被创造的美好回忆。",

            "ceremony.message.jp":
                "これからも",

            "ceremony.message.title":
                "愿前方的旅程依旧美好。",

            "ceremony.message.paragraph1":
                "愿每一个新的篇章，都带来另一个值得微笑的理由。",

            "ceremony.message.paragraph2":
                "愿每一个梦想，都能找到通往现实的道路。",

            "ceremony.message.with":
                "带着爱，",

            "ceremony.message.for":
                "献给 Nayla",

            "ceremony.next":
                "继续这段旅程",

            "ceremony.memories.label":
                "JKT48 回忆",

            "ceremony.memories.title":
                "与 JKT48 一起走过的旅程",

            "ceremony.memories.intro":
                "从最初的脚步，到舞台上难忘的时刻，每一个篇章都成为这段旅程的一部分。",

            "ceremony.gallery.2023":
                "一段美好旅程的第一步",

            "ceremony.gallery.2024":
                "在 JKT48 School 中不断成长",

            "ceremony.gallery.2025":
                "晋升为 Core Member，并在 Sister Reunion Festival 中担任值得信赖的翻译",

            "ceremony.gallery.2026.rh":
                "Nayla 与10期生 Aurelia 以及12期生 Aurhel Alana 一同表演了在 Request Hour 2026 中排名第15位的《Bird》。这是一场特别而令人难忘的演出，让许多粉丝感到骄傲与感动。🕊️🩵",

            "ceremony.gallery.2026.birthday":
                "#HappinessNaylalaland19 🎂",

            "ceremony.gallery.2027.placeholder":
                "新的篇章正在等待着…",

            "ceremony.gallery.2027":
                "为 Nayla 的20岁生日预留"

        },


        /* =================================================
           KOREAN
        ================================================= */

        ko: {

            "gallery.nayla_name":
                "아라키 나일라 수지 아우렐리아",

            "ceremony.hero.jp":
                "成人式",

            "ceremony.hero.subtitle":
                "성인식 세레모니",

            "ceremony.hero.intro":
                "새로운 장의 시작과 성인으로 향하는 여정, 그리고 지금의 우리를 만들어 준 소중한 추억을 기념합니다.",

            "ceremony.hero.description":
                "일본의 우아함과 전통에서 영감을 받은 이 공간은 소중한 인생의 순간과 아름다운 새로운 여정의 시작을 기념하기 위해 만들어졌습니다.",

            "ceremony.hero.divider":
                "成人",

            "ceremony.hero.scroll":
                "스크롤하여 만나보세요",

            "ceremony.meaning.label":
                "세레모니",

            "ceremony.meaning.title":
                "성인식이란?",

            "ceremony.meaning.lead":
                "성인식은 성인이 되는 순간을 기념하는 행사입니다.",

            "ceremony.meaning.paragraph1":
                "어린 시절에서 새로운 삶의 단계로 넘어가는 의미 있는 전환을 나타내며, 더 많은 자유와 책임, 꿈과 가능성을 향해 나아가는 순간입니다.",

            "ceremony.meaning.paragraph2":
                "단순한 행사를 넘어 지금까지 걸어온 길을 잠시 돌아보고, 앞으로 기다리고 있는 모든 것들을 바라보는 소중한 시간이기도 합니다.",

            "ceremony.meaning.adulthood":
                "성인",

            "ceremony.countdown.label":
                "새로운 장을 향한 카운트다운",

            "ceremony.countdown.title":
                "Nayla의 20번째 생일",

            "ceremony.countdown.days":
                "일",

            "ceremony.countdown.hours":
                "시간",

            "ceremony.countdown.minutes":
                "분",

            "ceremony.countdown.seconds":
                "초",

            "ceremony.countdown.finished":
                "새로운 장이 시작되었습니다.",

            "ceremony.countdown.birthday":
                "Nayla, 20번째 생일을 축하해.",

            "ceremony.twenty.label":
                "소중한 이정표",

            "ceremony.twenty.title":
                "스무 해",

            "ceremony.twenty.lead":
                "20년의 추억. 20년의 성장.",

            "ceremony.twenty.paragraph1":
                "모든 미소와 도전, 우정과 꿈, 그리고 모든 작은 순간들이 오늘 이곳에 서 있는 그녀를 만들어 왔습니다.",

            "ceremony.twenty.paragraph2":
                "그리고 이제 새로운 장이 시작됩니다.",

            "ceremony.chapter.twenty":
                "스무",

            "ceremony.chapter.label":
                "새로운 장",

            "ceremony.chapter.title":
                "여정은 계속됩니다",

            "ceremony.chapter.paragraph1":
                "어른이 된다는 것은 모든 답을 알고 있다는 뜻이 아닙니다.",

            "ceremony.chapter.paragraph2":
                "계속해서 찾고, 배우고, 성장하며, 더 나은 자신이 되어갈 용기를 갖는다는 뜻입니다.",

            "ceremony.chapter.paragraph3":
                "앞으로 새로운 장소와 새로운 만남, 새로운 꿈, 그리고 아직 만들어지지 않은 수많은 추억들이 기다리고 있습니다.",

            "ceremony.message.jp":
                "これからも",

            "ceremony.message.title":
                "앞으로의 여정이 아름답기를 바랍니다.",

            "ceremony.message.paragraph1":
                "새로운 장이 시작될 때마다 또 하나의 미소 지을 이유가 생기기를 바랍니다.",

            "ceremony.message.paragraph2":
                "모든 꿈이 현실이 될 수 있는 길을 찾기를 바랍니다.",

            "ceremony.message.with":
                "사랑을 담아,",

            "ceremony.message.for":
                "Nayla에게",

            "ceremony.next":
                "여정을 계속하기",

            "ceremony.memories.label":
                "JKT48의 추억",

            "ceremony.memories.title":
                "JKT48과 함께한 여정",

            "ceremony.memories.intro":
                "첫걸음부터 무대 위의 잊을 수 없는 순간들까지, 모든 장면이 이 여정의 일부가 되었습니다.",

            "ceremony.gallery.2023":
                "아름다운 여정의 첫걸음",

            "ceremony.gallery.2024":
                "JKT48 School과 함께 성장하다",

            "ceremony.gallery.2025":
                "Core Member로 승격 & Sister Reunion Festival에서 신뢰받는 통역으로 활약",

            "ceremony.gallery.2026.rh":
                "Nayla는 Request Hour 2026에서 15위를 기록한 Bird를 10기생 Aurelia, 12기생 Aurhel Alana와 함께 공연했습니다. 많은 팬들에게 자랑스러움과 감동을 안겨준 특별하고 잊을 수 없는 무대였습니다. 🕊️🩵",

            "ceremony.gallery.2026.birthday":
                "#HappinessNaylalaland19 🎂",

            "ceremony.gallery.2027.placeholder":
                "새로운 장이 기다리고 있습니다...",

            "ceremony.gallery.2027":
                "Nayla의 20번째 생일을 위해 준비 중"

        }

    };


    /* =====================================================
       GET LANGUAGE
    ===================================================== */

    function getCurrentLanguage() {

        const savedLanguage =
            localStorage.getItem("language");

        if (
            savedLanguage &&
            translations[savedLanguage]
        ) {

            return savedLanguage;

        }

        return "en";

    }


    /* =====================================================
       TRANSLATE CEREMONY PAGE
    ===================================================== */

    function translateCeremony(language) {

        const lang =
            translations[language]
                ? language
                : "en";

        const dictionary =
            translations[lang];


        document
            .querySelectorAll("[data-i18n]")
            .forEach(element => {

                const key =
                    element.getAttribute("data-i18n");

                if (
                    dictionary[key] !== undefined
                ) {

                    element.textContent =
                        dictionary[key];

                }

            });


        document.documentElement
            .setAttribute(
                "lang",
                lang
            );


        console.log(
            "Ceremony language:",
            lang
        );

    }


    /* =====================================================
       INITIAL TRANSLATION
    ===================================================== */

    translateCeremony(
        getCurrentLanguage()
    );


    /* =====================================================
       LISTEN TO NAVBAR LANGUAGE CHANGES
    ===================================================== */

    window.addEventListener(
        "languageChanged",
        event => {

            const language =
                event.detail?.language ||
                getCurrentLanguage();

            translateCeremony(language);

        }
    );


    /* =====================================================
       COUNTDOWN
    ===================================================== */

    const targetDate =
        new Date(
            "2027-06-18T00:00:00+07:00"
        ).getTime();


    const daysElement =
        document.getElementById(
            "countdown-days"
        );

    const hoursElement =
        document.getElementById(
            "countdown-hours"
        );

    const minutesElement =
        document.getElementById(
            "countdown-minutes"
        );

    const secondsElement =
        document.getElementById(
            "countdown-seconds"
        );

    const finishedElement =
        document.getElementById(
            "countdown-finished"
        );


    function updateCountdown() {

        const now =
            Date.now();

        const distance =
            targetDate - now;


        if (distance <= 0) {

            if (daysElement)
                daysElement.textContent = "00";

            if (hoursElement)
                hoursElement.textContent = "00";

            if (minutesElement)
                minutesElement.textContent = "00";

            if (secondsElement)
                secondsElement.textContent = "00";


            if (finishedElement) {

                finishedElement.classList.add(
                    "show"
                );

            }

            return;

        }


        const days =
            Math.floor(
                distance /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (distance %
                    (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );


        const minutes =
            Math.floor(
                (distance %
                    (1000 * 60 * 60)) /
                (1000 * 60)
            );


        const seconds =
            Math.floor(
                (distance %
                    (1000 * 60)) /
                1000
            );


        if (daysElement) {

            daysElement.textContent =
                String(days).padStart(
                    2,
                    "0"
                );

        }


        if (hoursElement) {

            hoursElement.textContent =
                String(hours).padStart(
                    2,
                    "0"
                );

        }


        if (minutesElement) {

            minutesElement.textContent =
                String(minutes).padStart(
                    2,
                    "0"
                );

        }


        if (secondsElement) {

            secondsElement.textContent =
                String(seconds).padStart(
                    2,
                    "0"
                );

        }

    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );


    /* =====================================================
       NAVBAR SCROLL
    ===================================================== */

    const navbar =
        document.querySelector(
            ".navbar"
        );


    const hero =
        document.querySelector(
            ".hero-content"
        );


    window.addEventListener(
        "scroll",
        () => {

            if (navbar) {

                navbar.classList.toggle(
                    "scrolled",
                    window.scrollY > 60
                );

            }


            if (hero) {

                const y =
                    window.scrollY;


                hero.style.opacity =
                    Math.max(
                        0,
                        1 - y / 700
                    );


                hero.style.transform =
                    `translateY(${y * 0.2}px)`;

            }

        }
    );


});