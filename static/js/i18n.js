/* =========================================================
   NAYLA SEIJIN SHIKI
   GLOBAL I18N SYSTEM

   Languages:
   ID = Indonesian
   EN = English
   JA = Japanese
   ZH = Chinese
   KO = Korean
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("=================================");
    console.log("NAYLA I18N SYSTEM INITIALIZED");
    console.log("=================================");


    /* =====================================================
       CONFIG
    ===================================================== */

    const STORAGE_KEY = "nayla_language";

    const DEFAULT_LANGUAGE = "id";

    const SUPPORTED_LANGUAGES = [
        "id",
        "en",
        "ja",
        "zh",
        "ko"
    ];


    /* =====================================================
       TRANSLATIONS
    ===================================================== */

    const translations = {

        /* =================================================
           INDONESIAN
        ================================================= */

        id: {

            secretLetter: {

                label:
                    "📜 秘密の手紙 • SURAT RAHASIA",

                title:
                    "Surat Dari Developer",

                subtitle:
                    "Sebuah surat kecil yang ditulis untuk Nayla, menunggu hari yang tepat untuk dibuka.",


                locked: {

                    badge:
                        "まだ開けません",

                    title:
                        "Surat Ini Masih Tersegel",

                    description:
                        "Surat ini ditulis oleh developer dan akan tetap tersegel sampai hari ulang tahun Nayla.",

                    countdown:
                        "Menunggu hari istimewa..."

                },


                opened: {

                    badge:
                        "開封 • DIBUKA",

                    title:
                        "Surat Dari Developer"

                },


                letter: {

                    p1:
                        "Dear Nayla,",

                    p2:
                        "Selamat ulang tahun yang ke-20, Nayla. Selamat juga karena akhirnya kamu telah sampai pada sebuah langkah besar dalam hidupmu dan telah melaksanakan upacara pendewasaanmu.",

                    p3:
                        "Dua puluh tahun mungkin hanyalah sebuah angka, tetapi perjalanan untuk sampai ke titik ini tentu bukan sesuatu yang sederhana. Ada begitu banyak cerita, perjuangan, tawa, air mata, dan kerja keras yang telah kamu lewati hingga menjadi Nayla yang sekarang.",

                    p4:
                        "Dan hari ini, melihat kamu berdiri di usia 20 tahun dengan begitu cantiknya, rasanya ada sedikit perasaan tidak percaya bahwa waktu bisa berjalan secepat ini. Kamu tumbuh begitu indah, bukan hanya dari luar, tetapi juga dari cara kamu menjalani perjalananmu.",

                    p5:
                        "Terima kasih, Nayla.",

                    p6:
                        "Terima kasih untuk semua kerja kerasmu selama ini. Terima kasih karena sudah terus berusaha memberikan yang terbaik, bahkan ketika mungkin semuanya tidak selalu mudah. Terima kasih untuk setiap senyum, setiap penampilan, setiap perjuangan, dan setiap momen kecil yang tanpa kamu sadari mungkin telah menjadi kenangan yang sangat berarti bagi seseorang di luar sana.",

                    p7:
                        "Sebagai seorang developer sekaligus seseorang yang selama ini mengagumimu dari jauh, aku ingin mengabadikan sedikit dari perjalanan itu melalui website kecil ini. Setiap halaman, setiap animasi, setiap pesan, dan setiap detail yang ada di dalamnya dibuat dengan satu tujuan: untuk meninggalkan sebuah kenangan tentang hari ini.",

                    p8:
                        "Mungkin setelah surat ini, perjalanan kita sebagai developer dan fan juga akan sampai pada sebuah titik yang berbeda.",

                    p9:
                        "Mungkin ini akan menjadi tribut terakhir yang aku buat untukmu, Nay.",

                    p10:
                        "Bukan karena aku berhenti menghargai atau mendoakanmu, tetapi karena terkadang sebuah perjalanan memang perlu memiliki halaman terakhir. Dan kalau memang ini adalah halaman terakhirnya, aku ingin menutupnya dengan sesuatu yang indah.",

                    p11:
                        "Aku berharap setelah hari ini, kamu akan terus berjalan menuju masa depan yang jauh lebih besar. Semoga di usia 20 tahun ini kamu menemukan lebih banyak kebahagiaan, kesempatan, dan alasan untuk tersenyum.",

                    p12:
                        "Jangan pernah berhenti menjadi dirimu sendiri. Tetaplah menjadi Nayla yang kami kenal, dengan senyum dan caramu sendiri dalam menjalani hidup.",

                    p13:
                        "Selamat memasuki babak baru kehidupanmu. Selamat telah menjadi dewasa. Dan terima kasih telah menjadi bagian dari sebuah perjalanan yang begitu berarti.",

                    p14:
                        "Ke mana pun perjalananmu membawamu selanjutnya, semoga kamu selalu menemukan kebahagiaanmu sendiri.",

                    p15:
                        "Selamat ulang tahun yang ke-20, Nayla. Semoga semua doa baik yang pernah ditujukan kepadamu menemukan jalannya untuk menjadi kenyataan.",

                    p16:
                        "Terima kasih untuk semuanya."

                },


                signature: {

                    with:
                        "Dengan penuh rasa terima kasih,",

                    description:
                        "Seorang developer yang pernah membuat sebuah shrine kecil untukmu."

                },


                footer: {

                    date:
                        "Ditulis dengan ketulusan • 18 Juni 2027",

                    last:
                        "Satu tribut terakhir, untuk sebuah awal yang indah."

                }

            }

        },


        /* =================================================
           ENGLISH
        ================================================= */

        en: {

            secretLetter: {

                label:
                    "📜 秘密の手紙 • SECRET LETTER",

                title:
                    "A Letter From The Developer",

                subtitle:
                    "A small letter written for Nayla, waiting for the right day to be opened.",


                locked: {

                    badge:
                        "まだ開けません",

                    title:
                        "This Letter Is Sealed",

                    description:
                        "This letter was written by the developer and will remain sealed until Nayla's birthday.",

                    countdown:
                        "Waiting for the special day..."

                },


                opened: {

                    badge:
                        "開封 • OPENED",

                    title:
                        "A Letter From The Developer"

                },


                letter: {

                    p1:
                        "Dear Nayla,",

                    p2:
                        "Happy 20th birthday, Nayla. Congratulations as well on reaching such an important milestone in your life and completing your coming-of-age ceremony.",

                    p3:
                        "Twenty years may be just a number, but the journey to reach this point is certainly not something simple. There have been so many stories, struggles, laughter, tears, and hard work that you have experienced along the way to becoming the Nayla you are today.",

                    p4:
                        "And today, seeing you standing beautifully at the age of 20, it feels almost unbelievable how quickly time has passed. You have grown beautifully, not only on the outside, but also through the way you have walked your own journey.",

                    p5:
                        "Thank you, Nayla.",

                    p6:
                        "Thank you for all the hard work you have given throughout these years. Thank you for always trying to give your best, even when things may not have been easy. Thank you for every smile, every performance, every effort, and every little moment that you may never realize has become a meaningful memory for someone out there.",

                    p7:
                        "As a developer and also someone who has admired you from afar, I wanted to preserve a small part of that journey through this little website. Every page, every animation, every message, and every detail was created with one purpose: to leave behind a memory of this day.",

                    p8:
                        "Perhaps after this letter, our journey as a developer and a fan will also arrive at a different point.",

                    p9:
                        "Perhaps this will be the last tribute I make for you, Nay.",

                    p10:
                        "Not because I have stopped appreciating or wishing the best for you, but because sometimes a journey needs to have a final page. And if this truly is its final page, I want to close it with something beautiful.",

                    p11:
                        "I hope that after today, you will continue walking toward an even greater future. May this year bring you more happiness, opportunities, and reasons to smile.",

                    p12:
                        "Never stop being yourself. Continue to be the Nayla we know, with your smile and your own way of living life.",

                    p13:
                        "Welcome to a new chapter of your life. Congratulations on becoming an adult. And thank you for being part of a journey that has meant so much.",

                    p14:
                        "Wherever your journey takes you next, I hope you will always find your own happiness.",

                    p15:
                        "Happy 20th birthday, Nayla. May every good wish that has ever been sent your way find its path toward becoming reality.",

                    p16:
                        "Thank you for everything."

                },


                signature: {

                    with:
                        "With gratitude,",

                    description:
                        "A developer who once made a little shrine for you."

                },


                footer: {

                    date:
                        "Written with sincerity • June 18, 2027",

                    last:
                        "One last tribute, for a beautiful beginning."

                }

            }

        },


        /* =================================================
           JAPANESE
        ================================================= */

        ja: {

            secretLetter: {

                label:
                    "📜 秘密の手紙 • 秘密の手紙",

                title:
                    "開発者からの手紙",

                subtitle:
                    "ナイラのために書いた小さな手紙。開くべき日を静かに待っています。",


                locked: {

                    badge:
                        "まだ開けません",

                    title:
                        "この手紙は封印されています",

                    description:
                        "この手紙は開発者によって書かれました。ナイラの誕生日まで大切に封印されています。",

                    countdown:
                        "特別な日を待っています..."

                },


                opened: {

                    badge:
                        "開封 • OPENED",

                    title:
                        "開発者からの手紙"

                },


                letter: {

                    p1:
                        "ナイラへ",

                    p2:
                        "20歳のお誕生日、本当におめでとうございます。そして、人生の大きな節目を迎え、成人式を終えたことも心からお祝いします。",

                    p3:
                        "20歳というのは、ただの数字なのかもしれません。でも、ここまで歩いてきた道のりは決して簡単なものではなかったと思います。たくさんの出来事、努力、笑顔、涙、そして頑張りがあったからこそ、今のナイラがいるのだと思います。",

                    p4:
                        "今日、20歳になったナイラの姿を見ていると、時間がこんなにも早く過ぎていくことが少し信じられないような気持ちになります。外見だけではなく、自分自身の歩み方を通して、とても素敵に成長してきたのだと思います。",

                    p5:
                        "ありがとう、ナイラ。",

                    p6:
                        "これまでたくさん努力してくれてありがとう。いつも最高のものを届けようとしてくれてありがとう。簡単ではない時もあったと思います。それでも見せてくれた笑顔、パフォーマンス、努力、そして何気ない一つ一つの瞬間が、きっと誰かにとって大切な思い出になっています。",

                    p7:
                        "一人の開発者として、そして遠くからナイラを応援してきた一人として、その歩みの一部をこの小さなウェブサイトに残したいと思いました。ページ、アニメーション、メッセージ、そして細かな部分まで、今日という日を思い出として残すために作りました。",

                    p8:
                        "この手紙を最後に、開発者とファンとしての私たちの歩みも、少し違う場所へ進んでいくのかもしれません。",

                    p9:
                        "もしかすると、これがナイラへ贈る最後のトリビュートになるのかもしれません。",

                    p10:
                        "それは、ナイラを大切に思う気持ちや応援する気持ちを失ったからではありません。ただ、どんな旅にも最後のページが必要な時があります。もし本当にこれが最後のページなら、私は美しい形で締めくくりたいと思います。",

                    p11:
                        "これからも、もっと大きな未来へ向かって歩いていってください。20歳というこの一年が、たくさんの幸せや新しい機会、そして笑顔になれる理由に恵まれますように。",

                    p12:
                        "どうか、これからも自分らしさを忘れないでください。私たちが知っているナイラの笑顔と、自分らしい生き方を大切にしてください。",

                    p13:
                        "新しい人生の章へようこそ。成人を迎えたこと、本当におめでとうございます。そして、とても大切な旅の一部になってくれてありがとう。",

                    p14:
                        "これからどんな道を歩んでいくとしても、いつも自分自身の幸せを見つけられますように。",

                    p15:
                        "20歳のお誕生日、本当におめでとうございます。これまでナイラに届けられたすべての温かい願いが、いつか現実になりますように。",

                    p16:
                        "今まで本当にありがとう。"

                },


                signature: {

                    with:
                        "感謝を込めて、",

                    description:
                        "かつてあなたのために小さなシュラインを作った開発者より。"

                },


                footer: {

                    date:
                        "心を込めて • 2027年6月18日",

                    last:
                        "美しい始まりへ贈る、最後のトリビュート。"

                }

            }

        },


        /* =================================================
           CHINESE
        ================================================= */

        zh: {

            secretLetter: {

                label:
                    "📜 秘密の手紙 • 秘密信件",

                title:
                    "来自开发者的一封信",

                subtitle:
                    "一封写给Nayla的小小信件，静静等待着适合打开的那一天。",


                locked: {

                    badge:
                        "まだ開けません",

                    title:
                        "这封信仍然封存着",

                    description:
                        "这封信由开发者写下，将一直封存到Nayla的生日。",

                    countdown:
                        "正在等待特别的日子..."

                },


                opened: {

                    badge:
                        "開封 • 已开启",

                    title:
                        "来自开发者的一封信"

                },


                letter: {

                    p1:
                        "亲爱的Nayla：",

                    p2:
                        "祝你20岁生日快乐！也恭喜你终于迎来了人生中的重要一步，并完成了成人仪式。",

                    p3:
                        "二十岁也许只是一个数字，但能够走到今天，绝不是一件简单的事情。一路上一定经历了许多故事、努力、欢笑、眼泪与坚持，才成为了今天的Nayla。",

                    p4:
                        "今天，看着20岁的你如此美丽地站在那里，真的会让人有些难以相信时间竟然过得这么快。你不仅在外表上成长了，也在自己走过的人生道路中变得越来越成熟。",

                    p5:
                        "谢谢你，Nayla。",

                    p6:
                        "谢谢你一直以来的努力，也谢谢你即使遇到困难，依然努力做到最好。谢谢你的每一个笑容、每一次表演、每一份努力，以及那些你可能没有意识到，却成为某个人珍贵回忆的小小瞬间。",

                    p7:
                        "作为一名开发者，也作为一个一直从远处欣赏和支持你的人，我想通过这个小小的网站记录下这段旅程的一部分。每一个页面、每一个动画、每一条留言和每一个细节，都只是为了留下关于今天的一份回忆。",

                    p8:
                        "也许在这封信之后，我们作为开发者和粉丝的旅程，也会走向一个不同的阶段。",

                    p9:
                        "也许，这会是我为你制作的最后一次Tribute。",

                    p10:
                        "并不是因为我不再珍惜你或为你送上祝福，而是有时候，一段旅程需要拥有最后一页。如果这真的就是最后一页，我希望能够用美好的方式将它写完。",

                    p11:
                        "希望从今天开始，你能够继续走向更加广阔的未来。愿20岁的这一年带给你更多幸福、机会，以及能够让你微笑的理由。",

                    p12:
                        "永远不要停止做自己。继续成为我们所认识的Nayla，带着你的笑容，用属于自己的方式生活。",

                    p13:
                        "欢迎来到人生的新篇章。恭喜你成为一个成年人。也谢谢你成为这段如此有意义的旅程的一部分。",

                    p14:
                        "无论未来的旅程将把你带向哪里，我都希望你能够一直找到属于自己的幸福。",

                    p15:
                        "祝你20岁生日快乐，Nayla。愿所有曾经送给你的美好祝福，都能够找到通往现实的道路。",

                    p16:
                        "谢谢你的一切。"

                },


                signature: {

                    with:
                        "怀着感激之情，",

                    description:
                        "一位曾经为你制作过小小Shrine的开发者。"

                },


                footer: {

                    date:
                        "怀着真诚写下 • 2027年6月18日",

                    last:
                        "献给美好开始的最后一份Tribute。"

                }

            }

        },


        /* =================================================
           KOREAN
        ================================================= */

        ko: {

            secretLetter: {

                label:
                    "📜 秘密の手紙 • 비밀의 편지",

                title:
                    "개발자가 보내는 편지",

                subtitle:
                    "나일라를 위해 쓴 작은 편지입니다. 열어야 할 특별한 날을 기다리고 있습니다.",


                locked: {

                    badge:
                        "まだ開けません",

                    title:
                        "이 편지는 아직 봉인되어 있습니다",

                    description:
                        "이 편지는 개발자가 작성했으며, 나일라의 생일까지 소중히 봉인되어 있습니다.",

                    countdown:
                        "특별한 날을 기다리는 중..."

                },


                opened: {

                    badge:
                        "開封 • OPENED",

                    title:
                        "개발자가 보내는 편지"

                },


                letter: {

                    p1:
                        "Dear Nayla,",

                    p2:
                        "스무 번째 생일을 진심으로 축하해, Nayla. 그리고 인생에서 중요한 한 걸음을 내딛고 성인식을 마친 것도 정말 축하해.",

                    p3:
                        "스무 살이라는 것은 어쩌면 하나의 숫자일 뿐일지도 몰라. 하지만 지금 이 순간까지 오는 길은 결코 단순하지 않았을 거야. 수많은 이야기와 노력, 웃음과 눈물, 그리고 열심히 달려온 시간들이 있었기에 지금의 Nayla가 있다고 생각해.",

                    p4:
                        "오늘 스무 살의 아름다운 모습으로 서 있는 너를 바라보면 시간이 이렇게 빠르게 흐른다는 것이 조금 믿기지 않을 정도야. 겉모습뿐만 아니라 자신만의 길을 걸어가는 모습에서도 정말 아름답게 성장해 왔다고 생각해.",

                    p5:
                        "고마워, Nayla.",

                    p6:
                        "그동안 정말 열심히 노력해줘서 고마워. 언제나 최선을 다하려고 노력해줘서 고마워. 모든 순간이 쉽지만은 않았을 텐데도 보여준 미소와 무대, 노력, 그리고 작은 순간 하나하나가 누군가에게는 소중한 추억이 되었을 거야.",

                    p7:
                        "한 명의 개발자이자 멀리서 너를 응원해 온 사람으로서, 그 여정의 작은 일부를 이 작은 웹사이트에 남기고 싶었어. 모든 페이지와 애니메이션, 메시지와 세부적인 요소들은 오늘이라는 날을 하나의 추억으로 남기기 위해 만들어졌어.",

                    p8:
                        "어쩌면 이 편지를 마지막으로 개발자와 팬으로서의 우리의 여정도 조금 다른 곳으로 나아가게 될지도 모르겠어.",

                    p9:
                        "어쩌면 이것이 내가 너에게 만드는 마지막 Tribute가 될지도 모르겠어.",

                    p10:
                        "너를 소중하게 생각하거나 응원하는 마음을 그만두기 때문은 아니야. 때로는 하나의 여정에도 마지막 페이지가 필요하니까. 그리고 정말 이것이 마지막 페이지라면, 아름다운 모습으로 마무리하고 싶어.",

                    p11:
                        "오늘 이후에도 더 넓은 미래를 향해 계속 걸어가길 바라. 스무 살의 한 해가 더 많은 행복과 기회, 그리고 웃을 수 있는 이유들로 가득하기를 바랄게.",

                    p12:
                        "절대 너 자신이 되는 것을 멈추지 않았으면 해. 우리가 알고 있는 Nayla답게, 너만의 미소와 너만의 방식으로 삶을 살아가길 바라.",

                    p13:
                        "새로운 인생의 장에 온 것을 축하해. 성인이 된 것도 진심으로 축하해. 그리고 이렇게 의미 있는 여정의 한 부분이 되어줘서 고마워.",

                    p14:
                        "앞으로 어떤 길을 걷게 되더라도 언제나 너만의 행복을 찾을 수 있기를 바라.",

                    p15:
                        "스무 번째 생일을 진심으로 축하해, Nayla. 지금까지 너에게 전해진 모든 좋은 마음과 소망들이 언젠가 현실이 되기를 바라.",

                    p16:
                        "모든 것에 고마워."

                },


                signature: {

                    with:
                        "감사한 마음을 담아,",

                    description:
                        "한때 당신을 위해 작은 Shrine을 만들었던 개발자로부터."

                },


                footer: {

                    date:
                        "진심을 담아 • 2027년 6월 18일",

                    last:
                        "아름다운 시작을 위한 마지막 Tribute."

                }

            }

        }

    };


    /* =====================================================
       GET NESTED VALUE
    ===================================================== */

    function getValue(object, path) {

        return path
            .split(".")
            .reduce(
                (current, key) =>
                    current?.[key],
                object
            );

    }


    /* =====================================================
       TRANSLATE ELEMENTS
    ===================================================== */

    function translatePage(language) {

        if (
            !SUPPORTED_LANGUAGES.includes(language)
        ) {
            language = DEFAULT_LANGUAGE;
        }


        const dictionary =
            translations[language];


        if (!dictionary) {
            return;
        }


        /* ---------------------------------------------
           TEXT CONTENT
        --------------------------------------------- */

        document
            .querySelectorAll("[data-i18n]")
            .forEach(element => {

                const key =
                    element.dataset.i18n;

                const value =
                    getValue(
                        dictionary,
                        key
                    );

                if (
                    value !== undefined
                ) {

                    element.textContent =
                        value;

                }

            });


        /* ---------------------------------------------
           HTML LANG
        --------------------------------------------- */

        document.documentElement
            .setAttribute(
                "lang",
                language
            );


        /* ---------------------------------------------
           SAVE
        --------------------------------------------- */

        localStorage.setItem(
            STORAGE_KEY,
            language
        );


        /* ---------------------------------------------
           EVENT
        --------------------------------------------- */

        document.dispatchEvent(
            new CustomEvent(
                "languageChanged",
                {
                    detail: {
                        language
                    }
                }
            )
        );


        console.log(
            "[I18N] Language:",
            language
        );

    }


    /* =====================================================
       CHANGE LANGUAGE
       Global function
    ===================================================== */

    window.setLanguage = function(language) {

        translatePage(language);

    };


    /* =====================================================
       GET CURRENT LANGUAGE
    ===================================================== */

    window.getCurrentLanguage = function() {

        return (
            localStorage.getItem(
                STORAGE_KEY
            ) || DEFAULT_LANGUAGE
        );

    };


    /* =====================================================
       LANGUAGE SELECTOR
    ===================================================== */

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-language]"
                );


            if (!button) {
                return;
            }


            const language =
                button.dataset.language;


            if (
                SUPPORTED_LANGUAGES
                    .includes(language)
            ) {

                setLanguage(language);

            }

        }
    );


    /* =====================================================
       INITIAL LANGUAGE
    ===================================================== */

    let savedLanguage =
        localStorage.getItem(
            STORAGE_KEY
        );


    if (
        !SUPPORTED_LANGUAGES
            .includes(savedLanguage)
    ) {

        savedLanguage =
            DEFAULT_LANGUAGE;

    }


    translatePage(
        savedLanguage
    );

});