/* =========================================================
   SECRET DEVELOPER LETTER
   =========================================================

   FEATURES
   ---------------------------------------------------------
   • Birthday countdown
   • Automatic unlock on 18 June 2027
   • Multi-language translation
   • Indonesia
   • English
   • Japanese
   • Chinese
   • Korean
   • localStorage.language
   • Global languageChanged event
   • Storage event fallback
   • Public translation API

   UNLOCK DATE
   ---------------------------------------------------------
   18 June 2027
   00:00:00

========================================================= */

(function () {

    "use strict";


    /* =====================================================
       DOM ELEMENTS
    ===================================================== */

    let locked;
    let unlocked;
    let countdown;


    /* =====================================================
       TRANSLATION DATA
    ===================================================== */

    const translations = {

        /* =================================================
           INDONESIA
        ================================================= */

        id: {

            "secret.sectionLabel":
                "📜 秘密の手紙 • SURAT RAHASIA",

            "secret.title":
                "Surat Dari Pengembang",

            "secret.description":
                "Sebuah surat kecil yang ditulis untuk Nayla, menunggu hari yang tepat untuk dibuka.",

            "secret.lockedLabel":
                "まだ開けません",

            "secret.lockedTitle":
                "Surat Ini Masih Tersegel",

            "secret.lockedDescription":
                "Surat ini ditulis oleh developer dan akan tetap tersegel sampai ulang tahun Nayla.",

            "secret.countdown":
                "Menunggu hari istimewa...",

            "secret.openedLabel":
                "開封 • TERBUKA",

            "secret.openedTitle":
                "Surat Dari Pengembang",


            /* =============================================
               LETTER
            ============================================= */

            "secret.letter.p1":
                "Dear Nayla,",

            "secret.letter.p2":
                "Selamat ulang tahun yang ke-20, Nayla. Selamat juga karena akhirnya kamu telah sampai pada sebuah langkah besar dalam hidupmu dan telah melaksanakan upacara pendewasaanmu.",

            "secret.letter.p3":
                "Dua puluh tahun mungkin hanyalah sebuah angka, tetapi perjalanan untuk sampai ke titik ini tentu bukan sesuatu yang sederhana. Ada begitu banyak cerita, perjuangan, tawa, air mata, dan kerja keras yang telah kamu lewati hingga menjadi Nayla yang sekarang.",

            "secret.letter.p4":
                "Dan hari ini, melihat kamu berdiri di usia 20 tahun dengan begitu cantiknya, rasanya ada sedikit perasaan tidak percaya bahwa waktu bisa berjalan secepat ini. Kamu tumbuh begitu indah, bukan hanya dari luar, tetapi juga dari cara kamu menjalani perjalananmu.",

            "secret.letter.p5":
                "Terima kasih, Nayla.",

            "secret.letter.p6":
                "Terima kasih untuk semua kerja kerasmu selama ini. Terima kasih karena sudah terus berusaha memberikan yang terbaik, bahkan ketika mungkin semuanya tidak selalu mudah. Terima kasih untuk setiap senyum, setiap penampilan, setiap perjuangan, dan setiap momen kecil yang tanpa kamu sadari mungkin telah menjadi kenangan yang sangat berarti bagi seseorang di luar sana.",

            "secret.letter.p7":
                "Sebagai seorang developer sekaligus seseorang yang selama ini mengagumimu dari jauh, aku ingin mengabadikan sedikit dari perjalanan itu melalui website kecil ini. Setiap halaman, setiap animasi, setiap pesan, dan setiap detail yang ada di dalamnya dibuat dengan satu tujuan: untuk meninggalkan sebuah kenangan tentang hari ini.",

            "secret.letter.p8":
                "Mungkin setelah surat ini, perjalanan kita sebagai developer dan fan juga akan sampai pada sebuah titik yang berbeda.",

            "secret.letter.p9":
                "Mungkin ini akan menjadi tribut terakhir yang aku buat untukmu, Nay.",

            "secret.letter.p10":
                "Bukan karena aku berhenti menghargai atau mendoakanmu, tetapi karena terkadang sebuah perjalanan memang perlu memiliki halaman terakhir. Dan kalau memang ini adalah halaman terakhirnya, aku ingin menutupnya dengan sesuatu yang indah.",

            "secret.letter.p11":
                "Aku berharap setelah hari ini, kamu akan terus berjalan menuju masa depan yang jauh lebih besar. Semoga di usia 20 tahun ini kamu menemukan lebih banyak kebahagiaan, kesempatan, dan alasan untuk tersenyum.",

            "secret.letter.p12":
                "Jangan pernah berhenti menjadi dirimu sendiri. Tetaplah menjadi Nayla yang kami kenal, dengan senyum dan caramu sendiri dalam menjalani hidup.",

            "secret.letter.p13":
                "Selamat memasuki babak baru kehidupanmu. Selamat telah menjadi dewasa. Dan terima kasih telah menjadi bagian dari sebuah perjalanan yang begitu berarti.",

            "secret.letter.p14":
                "Ke mana pun perjalananmu membawamu selanjutnya, aku berharap kamu akan selalu menemukan kebahagiaanmu sendiri.",

            "secret.letter.p15":
                "Selamat ulang tahun yang ke-20, Nayla. Semoga semua doa baik yang pernah ditujukan kepadamu menemukan jalannya untuk menjadi kenyataan.",

            "secret.letter.p16":
                "Terima kasih untuk semuanya.",


            /* =============================================
               SIGNATURE
            ============================================= */

            "secret.signatureGreeting":
                "Dengan penuh rasa terima kasih,",

            "secret.signatureDescription":
                "Seorang developer yang pernah membuat sebuah shrine kecil untukmu.",


            /* =============================================
               FOOTER
            ============================================= */

            "secret.writtenDate":
                "Ditulis dengan tulus • 18 Juni 2027",

            "secret.footerDescription":
                "Satu tribut terakhir, untuk sebuah awal yang indah.",


            /* =============================================
               COUNTDOWN
            ============================================= */

            "secret.countdown.opens":
                "Dibuka pada",

            "secret.countdown.date":
                "18 Juni 2027",

            "secret.countdown.days":
                "hari",

            "secret.countdown.hours":
                "jam",

            "secret.countdown.minutes":
                "menit",

            "secret.countdown.seconds":
                "detik"

        },


        /* =================================================
           ENGLISH
        ================================================= */

        en: {

            "secret.sectionLabel":
                "📜 秘密の手紙 • SECRET LETTER",

            "secret.title":
                "A Letter From The Developer",

            "secret.description":
                "A small letter written for Nayla, waiting for the right day to be opened.",

            "secret.lockedLabel":
                "まだ開けません",

            "secret.lockedTitle":
                "This Letter Is Sealed",

            "secret.lockedDescription":
                "This letter was written by the developer and will remain sealed until Nayla's birthday.",

            "secret.countdown":
                "Waiting for the special day...",

            "secret.openedLabel":
                "開封 • OPENED",

            "secret.openedTitle":
                "A Letter From The Developer",


            "secret.letter.p1":
                "Dear Nayla,",

            "secret.letter.p2":
                "Happy 20th birthday, Nayla. Congratulations as well on finally reaching such an important milestone in your life and completing your coming-of-age ceremony.",

            "secret.letter.p3":
                "Twenty years may be just a number, but the journey to reach this point has certainly been anything but simple. There have been so many stories, struggles, laughter, tears, and moments of hard work that have shaped you into the Nayla you are today.",

            "secret.letter.p4":
                "And today, seeing you standing at the age of 20, looking so beautiful, I cannot help but feel a little disbelief at how quickly time has passed. You have grown so beautifully, not only in appearance, but also in the way you have walked through your journey.",

            "secret.letter.p5":
                "Thank you, Nayla.",

            "secret.letter.p6":
                "Thank you for all your hard work throughout these years. Thank you for always trying to give your best, even when things may not have been easy. Thank you for every smile, every performance, every struggle, and every little moment that you may never have realized could become such a meaningful memory for someone out there.",

            "secret.letter.p7":
                "As a developer, and as someone who has admired you from afar all this time, I wanted to preserve a small part of that journey through this little website. Every page, every animation, every message, and every detail within it was created with one purpose: to leave behind a memory of this day.",

            "secret.letter.p8":
                "Perhaps after this letter, our journey as developer and fan will also reach a different point.",

            "secret.letter.p9":
                "Perhaps this will be the last tribute I ever make for you, Nay.",

            "secret.letter.p10":
                "Not because I have stopped appreciating or wishing the best for you, but because sometimes a journey needs to have a final page. And if this truly is that final page, I want to close it with something beautiful.",

            "secret.letter.p11":
                "I hope that after today, you will continue walking toward an even greater future. May you find more happiness, opportunities, and reasons to smile as you enter your twentieth year.",

            "secret.letter.p12":
                "Never stop being yourself. Continue to be the Nayla we know, with your own smile and your own way of living your life.",

            "secret.letter.p13":
                "Congratulations on entering a new chapter of your life. Congratulations on becoming an adult. And thank you for being part of a journey that has meant so much.",

            "secret.letter.p14":
                "Wherever your journey takes you next, I hope you will always find your own happiness.",

            "secret.letter.p15":
                "Happy 20th birthday, Nayla. May every good wish that has ever been sent your way find its path toward becoming reality.",

            "secret.letter.p16":
                "Thank you for everything.",


            "secret.signatureGreeting":
                "With gratitude,",

            "secret.signatureDescription":
                "A developer who once made a little shrine for you.",

            "secret.writtenDate":
                "Written with sincerity • June 18, 2027",

            "secret.footerDescription":
                "One last tribute, for a beautiful beginning.",


            "secret.countdown.opens":
                "Opens on",

            "secret.countdown.date":
                "June 18, 2027",

            "secret.countdown.days":
                "days",

            "secret.countdown.hours":
                "hours",

            "secret.countdown.minutes":
                "minutes",

            "secret.countdown.seconds":
                "seconds"

        },


        /* =================================================
           JAPANESE
        ================================================= */

        ja: {

            "secret.sectionLabel":
                "📜 秘密の手紙 • 秘密の手紙",

            "secret.title":
                "開発者からの手紙",

            "secret.description":
                "ナイラのために書いた小さな手紙。開くべきその日を静かに待っています。",

            "secret.lockedLabel":
                "まだ開けません",

            "secret.lockedTitle":
                "この手紙は封印されています",

            "secret.lockedDescription":
                "この手紙は開発者によって書かれ、ナイラの誕生日まで封印されたままです。",

            "secret.countdown":
                "特別な日を待っています…",

            "secret.openedLabel":
                "開封 • OPENED",

            "secret.openedTitle":
                "開発者からの手紙",


            "secret.letter.p1":
                "ナイラへ。",

            "secret.letter.p2":
                "20歳のお誕生日おめでとう、ナイラ。そして、人生の大きな節目を迎え、成人式を終えたことも本当におめでとう。",

            "secret.letter.p3":
                "20歳というのは、ただの数字なのかもしれません。でも、ここまで歩いてくる道のりは決して簡単なものではなかったと思います。たくさんの物語、努力、笑顔、涙、そして頑張りを重ねて、今のナイラになったのだと思います。",

            "secret.letter.p4":
                "そして今日、20歳になったナイラがとても綺麗に立っている姿を見ると、時間がこんなにも早く過ぎていくことに少し驚いてしまいます。外見だけではなく、その歩んできた姿そのものが、とても美しく成長したのだと思います。",

            "secret.letter.p5":
                "ありがとう、ナイラ。",

            "secret.letter.p6":
                "これまでのすべての頑張りにありがとう。いつも最高のものを届けようと努力してくれてありがとう。たとえすべてが簡単ではなかったとしても、頑張り続けてくれてありがとう。すべての笑顔、パフォーマンス、努力、そして何気ない一瞬一瞬が、知らない誰かにとって大切な思い出になっているかもしれません。",

            "secret.letter.p7":
                "一人の開発者として、そして遠くからずっとあなたを応援してきた一人として、その歩みのほんの一部をこの小さなウェブサイトに残したいと思いました。ページ、アニメーション、メッセージ、そしてそこにあるすべての細かな部分は、この日の思い出を残すために作りました。",

            "secret.letter.p8":
                "この手紙を最後に、開発者とファンとしての私たちの旅も、少し違う場所へ進んでいくのかもしれません。",

            "secret.letter.p9":
                "もしかすると、これがナイラのために作る最後のトリビュートになるのかもしれません。",

            "secret.letter.p10":
                "それは、あなたを大切に思う気持ちや幸せを願う気持ちがなくなったからではありません。ただ、時には旅には最後のページが必要だからです。もし本当にこれが最後のページなら、私は美しいものとしてこの物語を閉じたいと思います。",

            "secret.letter.p11":
                "今日という日を過ぎたあとも、ナイラがもっと大きな未来へ向かって歩き続けていくことを願っています。20歳という一年の中で、たくさんの幸せ、機会、そして笑顔になれる理由に出会えますように。",

            "secret.letter.p12":
                "決して自分らしさを失わないでください。私たちが知っているナイラのままで、自分自身の笑顔と自分自身の生き方を大切にしてください。",

            "secret.letter.p13":
                "新しい人生の章へようこそ。大人になったこと、本当におめでとう。そして、かけがえのない旅の一部になってくれてありがとう。",

            "secret.letter.p14":
                "これからあなたの旅がどこへ向かうとしても、いつも自分自身の幸せを見つけられますように。",

            "secret.letter.p15":
                "20歳のお誕生日おめでとう、ナイラ。これまであなたに贈られたすべての優しい願いが、いつか現実になりますように。",

            "secret.letter.p16":
                "すべてにありがとう。",


            "secret.signatureGreeting":
                "感謝を込めて、",

            "secret.signatureDescription":
                "かつてあなたのために小さなシュラインを作った開発者より。",

            "secret.writtenDate":
                "心を込めて • 2027年6月18日",

            "secret.footerDescription":
                "美しい始まりへ贈る、最後のトリビュート。",


            "secret.countdown.opens":
                "開封日時",

            "secret.countdown.date":
                "2027年6月18日",

            "secret.countdown.days":
                "日",

            "secret.countdown.hours":
                "時間",

            "secret.countdown.minutes":
                "分",

            "secret.countdown.seconds":
                "秒"

        },


        /* =================================================
           CHINESE
        ================================================= */

        zh: {

            "secret.sectionLabel":
                "📜 秘密的信 • 秘密信件",

            "secret.title":
                "来自开发者的一封信",

            "secret.description":
                "一封写给Nayla的小小信件，静静等待着适合打开它的那一天。",

            "secret.lockedLabel":
                "还不能打开",

            "secret.lockedTitle":
                "这封信仍然封存着",

            "secret.lockedDescription":
                "这封信由开发者写下，在Nayla生日之前都会保持封存。",

            "secret.countdown":
                "等待那个特别的日子……",

            "secret.openedLabel":
                "开封 • 已打开",

            "secret.openedTitle":
                "来自开发者的一封信",


            "secret.letter.p1":
                "亲爱的Nayla：",

            "secret.letter.p2":
                "祝你20岁生日快乐，Nayla。也恭喜你终于走到了人生中一个重要的阶段，并完成了成人仪式。",

            "secret.letter.p3":
                "二十岁也许只是一个数字，但能够走到今天，绝不是一件简单的事情。一路上有那么多故事、努力、欢笑、泪水和坚持，才造就了今天的Nayla。",

            "secret.letter.p4":
                "而今天，看着20岁的你如此美丽地站在那里，我不禁有些感慨，时间竟然可以过得这么快。你不仅在外表上成长得如此美丽，也在自己走过的道路中变得越来越耀眼。",

            "secret.letter.p5":
                "谢谢你，Nayla。",

            "secret.letter.p6":
                "谢谢你一直以来的努力。谢谢你即使有些时候并不容易，也依然努力做到最好。谢谢你的每一个笑容、每一次舞台、每一份努力，以及那些你可能从未意识到，却可能成为某个人珍贵回忆的小小瞬间。",

            "secret.letter.p7":
                "作为一名开发者，也作为一个一直从远处欣赏着你的人，我想通过这个小小的网站，将这段旅程的一部分保存下来。每一个页面、每一个动画、每一条留言，以及其中的每一个细节，都只有一个目的：为今天留下一个美好的回忆。",

            "secret.letter.p8":
                "也许在这封信之后，我们作为开发者与粉丝的旅程，也会走向一个不同的阶段。",

            "secret.letter.p9":
                "也许，这会成为我为你制作的最后一份祝福，Nay。",

            "secret.letter.p10":
                "并不是因为我不再珍惜你，也不是因为我不再祝福你，而是因为有时候，一段旅程确实需要拥有最后一页。如果这真的就是最后一页，那么我希望用一些美好的东西来结束它。",

            "secret.letter.p11":
                "我希望从今天以后，你能够继续走向更加广阔的未来。愿你的20岁能够拥有更多幸福、更多机会，以及更多值得微笑的理由。",

            "secret.letter.p12":
                "永远不要停止做自己。继续成为我们所认识的Nayla，用属于自己的笑容和自己的方式去生活。",

            "secret.letter.p13":
                "祝贺你进入人生的新篇章。祝贺你成为一个成年人。也谢谢你成为这段如此珍贵旅程的一部分。",

            "secret.letter.p14":
                "无论未来的旅程将带你去往哪里，我都希望你永远能够找到属于自己的幸福。",

            "secret.letter.p15":
                "祝你20岁生日快乐，Nayla。愿所有曾经送给你的美好祝福，都能够找到通往现实的道路。",

            "secret.letter.p16":
                "谢谢你所做的一切。",


            "secret.signatureGreeting":
                "怀着满满的感谢，",

            "secret.signatureDescription":
                "一位曾经为你制作过一个小小Shrine的开发者。",

            "secret.writtenDate":
                "真心书写 • 2027年6月18日",

            "secret.footerDescription":
                "献给美好开始的最后一份祝福。",


            "secret.countdown.opens":
                "开放时间",

            "secret.countdown.date":
                "2027年6月18日",

            "secret.countdown.days":
                "天",

            "secret.countdown.hours":
                "小时",

            "secret.countdown.minutes":
                "分钟",

            "secret.countdown.seconds":
                "秒"

        },


        /* =================================================
           KOREAN
        ================================================= */

        ko: {

            "secret.sectionLabel":
                "📜 秘密의 편지 • 비밀의 편지",

            "secret.title":
                "개발자가 보내는 편지",

            "secret.description":
                "나일라를 위해 쓴 작은 편지입니다. 열어야 할 특별한 날을 조용히 기다리고 있습니다.",

            "secret.lockedLabel":
                "아직 열 수 없습니다",

            "secret.lockedTitle":
                "이 편지는 봉인되어 있습니다",

            "secret.lockedDescription":
                "이 편지는 개발자가 작성했으며 나일라의 생일까지 봉인된 상태로 남아 있습니다.",

            "secret.countdown":
                "특별한 날을 기다리는 중...",

            "secret.openedLabel":
                "開封 • OPENED",

            "secret.openedTitle":
                "개발자가 보내는 편지",


            "secret.letter.p1":
                "나일라에게.",

            "secret.letter.p2":
                "스무 번째 생일을 진심으로 축하해, 나일라. 그리고 드디어 인생의 큰 한 걸음을 내딛고 성인식을 마친 것도 정말 축하해.",

            "secret.letter.p3":
                "스무 살이라는 것은 어쩌면 단순한 숫자일지도 몰라. 하지만 여기까지 오는 길이 결코 평범하거나 쉽지만은 않았을 거야. 수많은 이야기와 노력, 웃음과 눈물, 그리고 열심히 걸어온 시간들이 지금의 나일라를 만들었을 거야.",

            "secret.letter.p4":
                "그리고 오늘, 스무 살이 된 네가 이렇게 아름답게 서 있는 모습을 보면서 시간이 이렇게 빨리 흘렀다는 것이 조금 믿기지 않기도 해. 너는 겉모습뿐만 아니라, 네가 걸어온 방식과 그 과정에서도 정말 아름답게 성장했어.",

            "secret.letter.p5":
                "고마워, 나일라.",

            "secret.letter.p6":
                "그동안 보여준 모든 노력에 고마워. 언제나 최선을 다하려고 노력해줘서 고마워. 모든 일이 항상 쉽지만은 않았을 텐데도 계속 노력해줘서 고마워. 모든 미소와 모든 무대, 모든 노력, 그리고 네가 알지 못했을 수도 있는 작은 순간들까지도 누군가에게는 정말 소중한 추억이 되었을 거야.",

            "secret.letter.p7":
                "한 명의 개발자로서, 그리고 오랫동안 멀리서 너를 바라보고 응원해 온 한 사람으로서, 그 여정의 작은 일부를 이 작은 웹사이트에 남기고 싶었어. 모든 페이지와 애니메이션, 메시지와 세부적인 요소들은 단 하나의 목적을 가지고 만들어졌어. 바로 오늘을 하나의 추억으로 남기는 것.",

            "secret.letter.p8":
                "어쩌면 이 편지를 마지막으로, 개발자와 팬으로서 우리의 여정도 조금 다른 곳으로 향하게 될지도 모르겠어.",

            "secret.letter.p9":
                "어쩌면 이것이 내가 너를 위해 만드는 마지막 헌사가 될지도 모르겠어, Nay.",

            "secret.letter.p10":
                "너를 소중하게 생각하거나 행복을 바라는 마음이 사라져서가 아니야. 때로는 하나의 여정에도 마지막 페이지가 필요하기 때문이야. 그리고 만약 정말 이것이 마지막 페이지라면, 나는 아름다운 것으로 이 이야기를 마무리하고 싶어.",

            "secret.letter.p11":
                "오늘 이후에도 네가 더 넓고 큰 미래를 향해 계속 걸어가기를 바라. 스무 살의 한 해 동안 더 많은 행복과 기회, 그리고 미소 지을 수 있는 이유들을 만나길 바랄게.",

            "secret.letter.p12":
                "절대 너 자신이 되는 것을 멈추지 마. 우리가 알고 있는 나일라 그대로, 너만의 미소와 너만의 방식으로 삶을 살아가길 바라.",

            "secret.letter.p13":
                "새로운 인생의 장으로 들어가는 것을 축하해. 어른이 된 것도 정말 축하해. 그리고 이렇게 의미 있는 여정의 한 부분이 되어줘서 고마워.",

            "secret.letter.p14":
                "앞으로 네 여정이 어디로 향하든, 언제나 너만의 행복을 찾을 수 있기를 바라.",

            "secret.letter.p15":
                "스무 번째 생일을 진심으로 축하해, 나일라. 지금까지 너에게 전해진 모든 좋은 마음과 기도가 언젠가 현실이 되기를 바라.",

            "secret.letter.p16":
                "모든 것에 고마워.",


            "secret.signatureGreeting":
                "감사한 마음을 담아,",

            "secret.signatureDescription":
                "한때 너를 위해 작은 Shrine을 만들었던 개발자로부터.",

            "secret.writtenDate":
                "진심을 담아 • 2027년 6월 18일",

            "secret.footerDescription":
                "아름다운 시작을 위한 마지막 헌사.",


            "secret.countdown.opens":
                "열리는 날짜",

            "secret.countdown.date":
                "2027년 6월 18일",

            "secret.countdown.days":
                "일",

            "secret.countdown.hours":
                "시간",

            "secret.countdown.minutes":
                "분",

            "secret.countdown.seconds":
                "초"

        }

    };


    /* =====================================================
       BIRTHDAY
    ===================================================== */

    const birthday = new Date(
        2027,
        5,      // June = 5
        18,     // 18
        0,      // hour
        0,      // minute
        0       // second
    );


    /* =====================================================
       GET CURRENT LANGUAGE
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
       UPDATE DOM REFERENCES
    ===================================================== */

    function initializeElements() {

        locked =
            document.getElementById(
                "letterLocked"
            );

        unlocked =
            document.getElementById(
                "letterUnlocked"
            );

        countdown =
            document.getElementById(
                "letterCountdown"
            );

    }


    /* =====================================================
       TRANSLATE SECRET LETTER
    ===================================================== */

    function translateSecretLetter(language) {

        const dictionary =
            translations[language];

        if (!dictionary) {

            console.warn(
                "[Secret Letter] Language not found:",
                language
            );

            return;

        }


        /* =============================================
           TRANSLATE ALL SECRET ELEMENTS
        ============================================= */

        const elements =
            document.querySelectorAll(
                "[data-i18n^='secret.']"
            );


        elements.forEach(
            (element) => {

                const key =
                    element.getAttribute(
                        "data-i18n"
                    );


                if (
                    !Object.prototype.hasOwnProperty.call(
                        dictionary,
                        key
                    )
                ) {

                    return;

                }


                /*
                 * textContent digunakan agar
                 * translation tetap aman.
                 */

                element.textContent =
                    dictionary[key];

            }
        );


        /* =============================================
           DOCUMENT LANGUAGE
        ============================================= */

        document.documentElement
            .setAttribute(
                "lang",
                language
            );


        /* =============================================
           UPDATE COUNTDOWN
        ============================================= */

        updateCountdown();


        console.log(
            "[Secret Letter] Language:",
            language
        );

    }


    /* =====================================================
       UPDATE COUNTDOWN
    ===================================================== */

    function updateCountdown() {

        if (
            !countdown ||
            !locked ||
            !unlocked
        ) {

            return;

        }


        const now =
            new Date();


        const difference =
            birthday.getTime() -
            now.getTime();


        /* =============================================
           BIRTHDAY HAS ARRIVED
        ============================================= */

        if (
            difference <= 0
        ) {

            unlockLetter();

            return;

        }


        /* =============================================
           CALCULATE TIME
        ============================================= */

        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (
                    difference /
                    (1000 * 60 * 60)
                ) % 24
            );


        const minutes =
            Math.floor(
                (
                    difference /
                    (1000 * 60)
                ) % 60
            );


        const seconds =
            Math.floor(
                (
                    difference /
                    1000
                ) % 60
            );


        /* =============================================
           CURRENT LANGUAGE
        ============================================= */

        const language =
            getCurrentLanguage();


        const dictionary =
            translations[language] ||
            translations.en;


        /* =============================================
           COUNTDOWN DISPLAY
        ============================================= */

        countdown.innerHTML = `

            🔒 ${dictionary["secret.countdown.opens"]}

            <strong>
                ${dictionary["secret.countdown.date"]}
            </strong>

            <br>

            <span class="letter-countdown-time">

                ${days}
                ${dictionary["secret.countdown.days"]}

                ${hours}
                ${dictionary["secret.countdown.hours"]}

                ${minutes}
                ${dictionary["secret.countdown.minutes"]}

                ${seconds}
                ${dictionary["secret.countdown.seconds"]}

            </span>

        `;

    }


    /* =====================================================
       UNLOCK LETTER
    ===================================================== */

    function unlockLetter() {

        if (
            !locked ||
            !unlocked
        ) {

            return;

        }


        /* =============================================
           HIDE LOCKED STATE
        ============================================= */

        locked.style.display =
            "none";


        /* =============================================
           SHOW LETTER
        ============================================= */

        unlocked.classList.add(
            "show"
        );


        /* =============================================
           REMOVE COUNTDOWN
        ============================================= */

        if (countdown) {

            countdown.innerHTML =
                "";

        }


        console.log(
            "[Secret Letter] 🔓 LETTER UNLOCKED"
        );

    }


    /* =====================================================
       CHECK BIRTHDAY
    ===================================================== */

    function checkBirthday() {

        if (
            !locked ||
            !unlocked ||
            !countdown
        ) {

            return;

        }


        const now =
            new Date();


        const difference =
            birthday.getTime() -
            now.getTime();


        if (
            difference <= 0
        ) {

            unlockLetter();

            return;

        }


        updateCountdown();

    }


    /* =====================================================
       GLOBAL LANGUAGE EVENT
    ===================================================== */

    function listenToGlobalLanguage() {


        /* =============================================
           CUSTOM EVENT
        ============================================= */

        window.addEventListener(
            "languageChanged",
            (event) => {

                const language =
                    event.detail?.language;


                if (
                    language &&
                    translations[language]
                ) {

                    /*
                     * Simpan language agar
                     * tetap konsisten.
                     */

                    localStorage.setItem(
                        "language",
                        language
                    );


                    translateSecretLetter(
                        language
                    );

                }

            }
        );


        /* =============================================
           STORAGE EVENT
        ============================================= */

        window.addEventListener(
            "storage",
            (event) => {

                if (
                    event.key !==
                    "language"
                ) {

                    return;

                }


                if (
                    event.newValue &&
                    translations[event.newValue]
                ) {

                    translateSecretLetter(
                        event.newValue
                    );

                }

            }
        );

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    function initSecretLetter() {

        initializeElements();


        /*
         * Jika section tidak ada,
         * jangan jalankan script.
         */

        if (
            !locked ||
            !unlocked ||
            !countdown
        ) {

            console.log(
                "[Secret Letter] Section not found."
            );

            return;

        }


        /* =============================================
           INITIAL TRANSLATION
        ============================================= */

        const language =
            getCurrentLanguage();


        translateSecretLetter(
            language
        );


        /* =============================================
           INITIAL COUNTDOWN CHECK
        ============================================= */

        checkBirthday();


        /* =============================================
           LISTEN GLOBAL LANGUAGE
        ============================================= */

        listenToGlobalLanguage();


        /* =============================================
           UPDATE EVERY SECOND
        ============================================= */

        setInterval(
            checkBirthday,
            1000
        );


        console.log(
            "================================="
        );

        console.log(
            "SECRET DEVELOPER LETTER INITIALIZED"
        );

        console.log(
            "Birthday:",
            birthday.toString()
        );

        console.log(
            "Language:",
            language
        );

        console.log(
            "================================="
        );

    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    window.translateSecretLetter =
        translateSecretLetter;


    /* =====================================================
       DOM READY
    ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initSecretLetter
        );

    } else {

        initSecretLetter();

    }


})();