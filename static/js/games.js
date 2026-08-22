/* =========================================================
   NAYLA FESTIVAL BOOTH + SEIJIN SHIKI PHOTO STUDIO
   + NAYLA PHOTOCARD MATCH + TORO NAGASHI LANTERN TIMING
   COMBINED GAME JS + I18N SYSTEM

   Satu file ini menjalankan KEEMPAT game:
   - booth   : jual barang (prepare & serve)
   - studio  : dandani & foto (prepare & serve, tema beda)
   - memory  : cari pasangan photocard (flip & match)
   - timing  : nyalakan lentera pas jarum di zona hijau
               (precision-timing — mekanik BEDA lagi dari
               ketiganya di atas)

   booth & studio masih memakai mesin permainan yang sama
   (createShopGame factory). memory memakai mesin sendiri
   (createMemoryGame). timing memakai mesin sendiri lagi
   (createTimingGame) karena alurnya beda: bukan papan kartu
   atau preparation tray + produk, tapi jarum yang bergerak
   terus-menerus dan pemain menekan tombol pas momen yang
   tepat. Kalau elemen "open button" salah satu game tidak
   ada di halaman, game itu otomatis tidak dijalankan.
========================================================= */

"use strict";


/* =========================================================
   00. TRANSLATIONS
========================================================= */

const GAMES_TRANSLATIONS = {

    /* ===================================================== */
    id: {

        booth: {
            header_eyebrow: "NAYLA FESTIVAL · SEIJIN SHIKI 2026",
            header_title: "🎪 Nayla Festival Booth",
            header_description: "Siapkan pesanan customer dan layani mereka untuk mendapatkan score dan money.",
            btn_open_booth: "🏪 BUKA BOOTH",
            btn_open_booth_active: "🔴 BOOTH AKTIF",
            btn_price_settings: "⚙️ ATUR HARGA",
            stat_score: "SCORE",
            stat_money: "MONEY",
            stat_combo: "COMBO",
            stat_customers: "CUSTOMERS",
            stat_time: "TIME",
            roof_text: "NAYLA FESTIVAL BOOTH",
            request_title: "🛍️ PESANAN CUSTOMER",
            customer_default_name: "Customer",
            start_eyebrow: "NAYLA FESTIVAL",
            start_title: "Nayla Festival Booth",
            start_description: "Kamu bertugas sebagai penjaga booth. Customer akan datang dan memesan barang. Siapkan barang yang mereka minta, lalu tekan serve.",
            start_button: "🎪 BUKA BOOTH & MULAI",
            prep_kicker: "BOOTH WORKSPACE",
            prep_title: "🧺 Preparation Tray",
            prep_status_empty: "Belum ada pesanan",
            prep_status_waiting_customer: "Menunggu customer...",
            prep_status_ready: "✓ Pesanan siap disajikan",
            prep_status_need_all: "Siapkan semua barang",
            prep_placeholder: "Pilih barang sesuai pesanan customer",
            btn_clear: "↺ CLEAR",
            btn_serve: "✓ SERVE CUSTOMER",
            inventory_kicker: "INVENTORY",
            inventory_title: "🛍️ Produk Booth",
            inventory_hint: "Klik produk untuk menyiapkan order",
            price_kicker: "CURRENT PRICE",
            price_title: "💰 Harga",
            price_hint: "Bisa diatur",
            modal_kicker: "BOOTH SETTINGS",
            modal_title: "⚙️ Atur Harga Barang",
            btn_cancel: "BATAL",
            btn_save: "SIMPAN HARGA",
            completion_label: "PESANAN SELESAI",
            completion_title: "Customer Senang! 🎉",
            completion_default_text: "Pesanan berhasil disajikan.",
            completion_served_text: "Pesanan {name} berhasil disajikan.",
            completion_timeup_text: "Waktu habis! Score akhir kamu {score}.",
            completion_score_label: "+SCORE",
            completion_money_label: "+MONEY",
            btn_continue: "LANJUTKAN",
            msg_open_first: "Buka booth terlebih dahulu.",
            msg_no_customer: "Belum ada customer.",
            msg_not_requested: "Customer tidak meminta barang ini.",
            msg_enough: "Jumlah barang ini sudah cukup.",
            msg_price_updated: "Harga barang berhasil diperbarui.",
            msg_tray_cleared: "Preparation tray dikosongkan.",
            msg_booth_opened: "Booth dibuka! Menunggu customer...",
            msg_booth_closed: "Booth ditutup.",
            msg_finish_order_first: "Selesaikan pesanan customer dulu.",
            msg_order_incomplete: "Pesanan belum sesuai.",
            request_total_label: "Total",
            mobile_order_empty: "Menunggu pesanan customer...",
            product_balloon: "Balon",
            product_flower: "Bunga",
            product_teddy: "Boneka",
            product_gift: "Hadiah",
            product_candy: "Permen",
            product_fan: "Kipas"
        },

        studio: {
            header_eyebrow: "NAYLA FESTIVAL · SEIJIN SHIKI 2026",
            header_title: "📸 Seijin Shiki Photo Studio",
            header_description: "Dandani member sesuai permintaan fotografer, lalu ambil foto untuk mendapatkan score dan money.",
            btn_open_studio: "🎬 BUKA STUDIO",
            btn_open_studio_active: "🔴 STUDIO AKTIF",
            btn_price_settings: "⚙️ ATUR HARGA",
            stat_score: "SCORE",
            stat_money: "MONEY",
            stat_combo: "COMBO",
            stat_customers: "SESI FOTO",
            stat_time: "TIME",
            studio_sign_text: "SEIJIN SHIKI PHOTO STUDIO",
            request_title: "📋 PERMINTAAN FOTO",
            customer_default_name: "Fotografer",
            start_eyebrow: "NAYLA FESTIVAL",
            start_title: "Seijin Shiki Photo Studio",
            start_description: "Kamu bertugas sebagai stylist studio foto. Fotografer akan datang dan meminta kombinasi busana tertentu. Siapkan item yang diminta, lalu ambil foto.",
            start_button: "🎬 BUKA STUDIO & MULAI",
            prep_kicker: "STYLING WORKSPACE",
            prep_title: "👘 Meja Rias",
            prep_status_empty: "Belum ada permintaan",
            prep_status_waiting_customer: "Menunggu fotografer...",
            prep_status_ready: "✓ Gaya siap difoto",
            prep_status_need_all: "Siapkan semua item busana",
            prep_placeholder: "Pilih busana sesuai permintaan foto",
            btn_clear: "↺ CLEAR",
            btn_serve: "📸 AMBIL FOTO",
            inventory_kicker: "WARDROBE",
            inventory_title: "👘 Item Busana",
            inventory_hint: "Klik item untuk menyiapkan gaya",
            price_kicker: "HARGA SAAT INI",
            price_title: "💰 Harga",
            price_hint: "Bisa diatur",
            modal_kicker: "STUDIO SETTINGS",
            modal_title: "⚙️ Atur Harga Item",
            btn_cancel: "BATAL",
            btn_save: "SIMPAN HARGA",
            completion_label: "FOTO SELESAI",
            completion_title: "Hasil Foto Memukau! ✨",
            completion_default_text: "Sesi foto berhasil diselesaikan.",
            completion_served_text: "Sesi foto untuk {name} berhasil diselesaikan.",
            completion_timeup_text: "Waktu habis! Score akhir kamu {score}.",
            completion_score_label: "+SCORE",
            completion_money_label: "+MONEY",
            btn_continue: "LANJUTKAN",
            msg_open_first: "Buka studio terlebih dahulu.",
            msg_no_customer: "Belum ada fotografer.",
            msg_not_requested: "Fotografer tidak meminta item ini.",
            msg_enough: "Jumlah item ini sudah cukup.",
            msg_price_updated: "Harga item berhasil diperbarui.",
            msg_tray_cleared: "Meja rias dikosongkan.",
            msg_booth_opened: "Studio dibuka! Menunggu fotografer...",
            msg_booth_closed: "Studio ditutup.",
            msg_finish_order_first: "Selesaikan sesi foto dulu.",
            msg_order_incomplete: "Gaya belum sesuai permintaan.",
            request_total_label: "Total",
            mobile_order_empty: "Menunggu permintaan foto...",
            product_kimono: "Kimono",
            product_obi: "Obi",
            product_kanzashi: "Kanzashi",
            product_zori: "Zori",
            product_furoshiki: "Furoshiki",
            product_fan: "Kipas"
        },

        memory: {
            header_eyebrow: "NAYLA FESTIVAL · SEIJIN SHIKI 2026",
            header_title: "🎴 Nayla Photocard Match",
            header_description: "Balik kartu dan temukan pasangan photocard member sebelum waktu habis untuk mendapatkan score dan money.",
            btn_open_memory: "🎴 BUKA PERMAINAN",
            btn_open_memory_active: "🔴 SEDANG BERMAIN",
            stat_score: "SCORE",
            stat_money: "MONEY",
            stat_combo: "COMBO",
            stat_matches: "MATCHES",
            stat_time: "TIME",
            sign_small_top: "成人式",
            sign_title: "MEMORY",
            sign_small_bottom: "PHOTOCARD MATCH",
            request_title: "🎴 PAPAN PHOTOCARD",
            start_eyebrow: "NAYLA FESTIVAL",
            start_title: "Nayla Photocard Match",
            start_description: "Balik dua kartu untuk menemukan pasangan member yang sama. Semakin cepat dan berturut-turut kamu menemukan pasangan, semakin besar combo dan score yang kamu dapat.",
            start_button: "🎴 MULAI BERMAIN",
            board_kicker: "MEMORY BOARD",
            board_hint: "Klik kartu untuk membuka",
            msg_open_first: "Mulai permainan terlebih dahulu.",
            msg_match_found: "✨ Pasangan ditemukan!",
            msg_mismatch: "Bukan pasangan, coba lagi.",
            msg_new_round: "🎉 Papan baru dimulai!",
            msg_game_opened: "Permainan dimulai! Cari semua pasangannya.",
            msg_game_closed: "Permainan dihentikan.",
            completion_label: "WAKTU HABIS",
            completion_title: "Kerja Bagus! 🎴",
            completion_timeup_text: "Waktu habis! Score akhir kamu {score}.",
            completion_score_label: "+SCORE",
            completion_money_label: "+MONEY",
            btn_continue: "LANJUTKAN"
        },

        timing: {
            header_eyebrow: "NAYLA FESTIVAL · SEIJIN SHIKI 2026",
            header_title: "🏮 Toro Nagashi Lantern Timing",
            header_description: "Klik NYALAKAN pas jarum ada di zona hijau untuk menyalakan lentera dan mengirimnya ke sungai. Semakin presisi, semakin besar combo dan score.",
            btn_open_timing: "🏮 MULAI ACARA",
            btn_open_timing_active: "🔴 SEDANG BERLANGSUNG",
            stat_score: "SCORE",
            stat_money: "MONEY",
            stat_combo: "COMBO",
            stat_lanterns: "LENTERA",
            stat_time: "TIME",
            sign_small_top: "成人式",
            sign_title: "TORO NAGASHI",
            sign_small_bottom: "LANTERN TIMING",
            start_eyebrow: "NAYLA FESTIVAL",
            start_title: "Toro Nagashi Lantern Timing",
            start_description: "Jarum akan bergerak bolak-balik di sepanjang bar. Tekan tombol NYALAKAN tepat saat jarum berada di zona hijau untuk menyalakan lentera. Semakin presisi dan berturut-turut, semakin sempit zona & semakin cepat jarumnya — tapi score dan combo-mu juga makin besar.",
            start_button: "🏮 MULAI ACARA",
            instructions: "Klik NYALAKAN saat jarum berada di zona hijau",
            btn_hit: "🏮 NYALAKAN",
            msg_open_first: "Mulai acara terlebih dahulu.",
            msg_hit_success: "✨ Lentera menyala!",
            msg_hit_miss: "Meleset, coba lagi.",
            msg_game_opened: "Acara dimulai! Perhatikan jarumnya.",
            msg_game_closed: "Acara dihentikan.",
            completion_label: "WAKTU HABIS",
            completion_title: "Sungai Dipenuhi Cahaya! 🏮",
            completion_timeup_text: "Waktu habis! Score akhir kamu {score}.",
            completion_score_label: "+SCORE",
            completion_money_label: "+MONEY",
            btn_continue: "LANJUTKAN"
        }

    },


    /* ===================================================== */
    en: {

        booth: {
            header_eyebrow: "NAYLA FESTIVAL · SEIJIN SHIKI 2026",
            header_title: "🎪 Nayla Festival Booth",
            header_description: "Prepare customer orders and serve them to earn score and money.",
            btn_open_booth: "🏪 OPEN BOOTH",
            btn_open_booth_active: "🔴 BOOTH ACTIVE",
            btn_price_settings: "⚙️ SET PRICES",
            stat_score: "SCORE",
            stat_money: "MONEY",
            stat_combo: "COMBO",
            stat_customers: "CUSTOMERS",
            stat_time: "TIME",
            roof_text: "NAYLA FESTIVAL BOOTH",
            request_title: "🛍️ CUSTOMER ORDER",
            customer_default_name: "Customer",
            start_eyebrow: "NAYLA FESTIVAL",
            start_title: "Nayla Festival Booth",
            start_description: "You're in charge of the booth. Customers will arrive and order items. Prepare what they ask for, then press serve.",
            start_button: "🎪 OPEN BOOTH & START",
            prep_kicker: "BOOTH WORKSPACE",
            prep_title: "🧺 Preparation Tray",
            prep_status_empty: "No order yet",
            prep_status_waiting_customer: "Waiting for customer...",
            prep_status_ready: "✓ Order ready to serve",
            prep_status_need_all: "Prepare all items",
            prep_placeholder: "Pick items matching the customer's order",
            btn_clear: "↺ CLEAR",
            btn_serve: "✓ SERVE CUSTOMER",
            inventory_kicker: "INVENTORY",
            inventory_title: "🛍️ Booth Products",
            inventory_hint: "Click a product to prepare the order",
            price_kicker: "CURRENT PRICE",
            price_title: "💰 Prices",
            price_hint: "Adjustable",
            modal_kicker: "BOOTH SETTINGS",
            modal_title: "⚙️ Set Item Prices",
            btn_cancel: "CANCEL",
            btn_save: "SAVE PRICES",
            completion_label: "ORDER COMPLETE",
            completion_title: "Customer Happy! 🎉",
            completion_default_text: "Order served successfully.",
            completion_served_text: "{name}'s order was served successfully.",
            completion_timeup_text: "Time's up! Your final score is {score}.",
            completion_score_label: "+SCORE",
            completion_money_label: "+MONEY",
            btn_continue: "CONTINUE",
            msg_open_first: "Open the booth first.",
            msg_no_customer: "No customer yet.",
            msg_not_requested: "The customer didn't ask for this item.",
            msg_enough: "You already have enough of this item.",
            msg_price_updated: "Prices updated successfully.",
            msg_tray_cleared: "Preparation tray cleared.",
            msg_booth_opened: "Booth opened! Waiting for customers...",
            msg_booth_closed: "Booth closed.",
            msg_finish_order_first: "Finish the current order first.",
            msg_order_incomplete: "Order isn't complete yet.",
            request_total_label: "Total",
            mobile_order_empty: "Waiting for customer order...",
            product_balloon: "Balloon",
            product_flower: "Flower",
            product_teddy: "Teddy Bear",
            product_gift: "Gift",
            product_candy: "Candy",
            product_fan: "Fan"
        },

        studio: {
            header_eyebrow: "NAYLA FESTIVAL · SEIJIN SHIKI 2026",
            header_title: "📸 Seijin Shiki Photo Studio",
            header_description: "Style the member as the photographer requests, then take the shot to earn score and money.",
            btn_open_studio: "🎬 OPEN STUDIO",
            btn_open_studio_active: "🔴 STUDIO ACTIVE",
            btn_price_settings: "⚙️ SET PRICES",
            stat_score: "SCORE",
            stat_money: "MONEY",
            stat_combo: "COMBO",
            stat_customers: "SESSIONS",
            stat_time: "TIME",
            studio_sign_text: "SEIJIN SHIKI PHOTO STUDIO",
            request_title: "📋 PHOTO REQUEST",
            customer_default_name: "Photographer",
            start_eyebrow: "NAYLA FESTIVAL",
            start_title: "Seijin Shiki Photo Studio",
            start_description: "You're the studio stylist. Photographers will arrive and request specific outfit combos. Prepare what they ask for, then take the shot.",
            start_button: "🎬 OPEN STUDIO & START",
            prep_kicker: "STYLING WORKSPACE",
            prep_title: "👘 Styling Table",
            prep_status_empty: "No request yet",
            prep_status_waiting_customer: "Waiting for photographer...",
            prep_status_ready: "✓ Look ready for the shot",
            prep_status_need_all: "Prepare all wardrobe items",
            prep_placeholder: "Pick items matching the photo request",
            btn_clear: "↺ CLEAR",
            btn_serve: "📸 TAKE PHOTO",
            inventory_kicker: "WARDROBE",
            inventory_title: "👘 Wardrobe Items",
            inventory_hint: "Click an item to prepare the look",
            price_kicker: "CURRENT PRICE",
            price_title: "💰 Prices",
            price_hint: "Adjustable",
            modal_kicker: "STUDIO SETTINGS",
            modal_title: "⚙️ Set Item Prices",
            btn_cancel: "CANCEL",
            btn_save: "SAVE PRICES",
            completion_label: "PHOTO COMPLETE",
            completion_title: "Stunning Shot! ✨",
            completion_default_text: "The photo session was completed successfully.",
            completion_served_text: "{name}'s photo session was completed successfully.",
            completion_timeup_text: "Time's up! Your final score is {score}.",
            completion_score_label: "+SCORE",
            completion_money_label: "+MONEY",
            btn_continue: "CONTINUE",
            msg_open_first: "Open the studio first.",
            msg_no_customer: "No photographer yet.",
            msg_not_requested: "The photographer didn't ask for this item.",
            msg_enough: "You already have enough of this item.",
            msg_price_updated: "Prices updated successfully.",
            msg_tray_cleared: "Styling table cleared.",
            msg_booth_opened: "Studio opened! Waiting for photographers...",
            msg_booth_closed: "Studio closed.",
            msg_finish_order_first: "Finish the current session first.",
            msg_order_incomplete: "The look isn't complete yet.",
            request_total_label: "Total",
            mobile_order_empty: "Waiting for photo request...",
            product_kimono: "Kimono",
            product_obi: "Obi Sash",
            product_kanzashi: "Kanzashi",
            product_zori: "Zori",
            product_furoshiki: "Furoshiki Bag",
            product_fan: "Fan"
        },

        memory: {
            header_eyebrow: "NAYLA FESTIVAL · SEIJIN SHIKI 2026",
            header_title: "🎴 Nayla Photocard Match",
            header_description: "Flip the cards and find matching member photocards before time runs out to earn score and money.",
            btn_open_memory: "🎴 OPEN GAME",
            btn_open_memory_active: "🔴 PLAYING",
            stat_score: "SCORE",
            stat_money: "MONEY",
            stat_combo: "COMBO",
            stat_matches: "MATCHES",
            stat_time: "TIME",
            sign_small_top: "成人式",
            sign_title: "MEMORY",
            sign_small_bottom: "PHOTOCARD MATCH",
            request_title: "🎴 PHOTOCARD BOARD",
            start_eyebrow: "NAYLA FESTIVAL",
            start_title: "Nayla Photocard Match",
            start_description: "Flip two cards to find the same member's pair. The faster and more consecutive matches you find, the bigger your combo and score.",
            start_button: "🎴 START PLAYING",
            board_kicker: "MEMORY BOARD",
            board_hint: "Click a card to flip it",
            msg_open_first: "Start the game first.",
            msg_match_found: "✨ Match found!",
            msg_mismatch: "Not a match, try again.",
            msg_new_round: "🎉 New board started!",
            msg_game_opened: "Game started! Find all the pairs.",
            msg_game_closed: "Game stopped.",
            completion_label: "TIME'S UP",
            completion_title: "Great Job! 🎴",
            completion_timeup_text: "Time's up! Your final score is {score}.",
            completion_score_label: "+SCORE",
            completion_money_label: "+MONEY",
            btn_continue: "CONTINUE"
        },

        timing: {
            header_eyebrow: "NAYLA FESTIVAL · SEIJIN SHIKI 2026",
            header_title: "🏮 Toro Nagashi Lantern Timing",
            header_description: "Press LIGHT IT when the needle is in the green zone to light a lantern and send it down the river. The more precise you are, the bigger your combo and score.",
            btn_open_timing: "🏮 START THE CEREMONY",
            btn_open_timing_active: "🔴 IN PROGRESS",
            stat_score: "SCORE",
            stat_money: "MONEY",
            stat_combo: "COMBO",
            stat_lanterns: "LANTERNS",
            stat_time: "TIME",
            sign_small_top: "成人式",
            sign_title: "TORO NAGASHI",
            sign_small_bottom: "LANTERN TIMING",
            start_eyebrow: "NAYLA FESTIVAL",
            start_title: "Toro Nagashi Lantern Timing",
            start_description: "A needle will move back and forth along the bar. Press LIGHT IT exactly when the needle is inside the green zone to light a lantern. The more precise and consecutive your hits, the narrower the zone and the faster the needle gets — but your score and combo grow too.",
            start_button: "🏮 START THE CEREMONY",
            instructions: "Click LIGHT IT when the needle is in the green zone",
            btn_hit: "🏮 LIGHT IT",
            msg_open_first: "Start the ceremony first.",
            msg_hit_success: "✨ Lantern lit!",
            msg_hit_miss: "Missed, try again.",
            msg_game_opened: "Ceremony started! Watch the needle.",
            msg_game_closed: "Ceremony stopped.",
            completion_label: "TIME'S UP",
            completion_title: "The River Glows! 🏮",
            completion_timeup_text: "Time's up! Your final score is {score}.",
            completion_score_label: "+SCORE",
            completion_money_label: "+MONEY",
            btn_continue: "CONTINUE"
        }

    },


    /* ===================================================== */
    ja: {

        booth: {
            header_eyebrow: "NAYLA FESTIVAL · 成人式 2026",
            header_title: "🎪 ナイラ・フェスティバル・ブース",
            header_description: "お客様の注文を準備して接客し、スコアとお金を稼ごう。",
            btn_open_booth: "🏪 ブースを開く",
            btn_open_booth_active: "🔴 営業中",
            btn_price_settings: "⚙️ 価格設定",
            stat_score: "スコア",
            stat_money: "お金",
            stat_combo: "コンボ",
            stat_customers: "お客様",
            stat_time: "時間",
            roof_text: "NAYLA FESTIVAL BOOTH",
            request_title: "🛍️ お客様の注文",
            customer_default_name: "お客様",
            start_eyebrow: "NAYLA FESTIVAL",
            start_title: "ナイラ・フェスティバル・ブース",
            start_description: "あなたはブースの担当者です。お客様が来て商品を注文します。頼まれた商品を準備してからサーブを押してください。",
            start_button: "🎪 ブースを開いて開始",
            prep_kicker: "作業スペース",
            prep_title: "🧺 準備トレイ",
            prep_status_empty: "まだ注文がありません",
            prep_status_waiting_customer: "お客様を待っています...",
            prep_status_ready: "✓ 提供準備完了",
            prep_status_need_all: "すべての商品を準備してください",
            prep_placeholder: "お客様の注文に合わせて商品を選んでください",
            btn_clear: "↺ クリア",
            btn_serve: "✓ 提供する",
            inventory_kicker: "在庫",
            inventory_title: "🛍️ ブース商品",
            inventory_hint: "商品をクリックして注文を準備",
            price_kicker: "現在の価格",
            price_title: "💰 価格",
            price_hint: "変更可能",
            modal_kicker: "ブース設定",
            modal_title: "⚙️ 商品価格を設定",
            btn_cancel: "キャンセル",
            btn_save: "価格を保存",
            completion_label: "注文完了",
            completion_title: "お客様は満足！🎉",
            completion_default_text: "注文の提供が完了しました。",
            completion_served_text: "{name}様への提供が完了しました。",
            completion_timeup_text: "時間切れ！最終スコアは{score}です。",
            completion_score_label: "+スコア",
            completion_money_label: "+お金",
            btn_continue: "続ける",
            msg_open_first: "まずブースを開いてください。",
            msg_no_customer: "まだお客様がいません。",
            msg_not_requested: "お客様が注文していない商品です。",
            msg_enough: "この商品はすでに十分な数量です。",
            msg_price_updated: "価格を更新しました。",
            msg_tray_cleared: "準備トレイをクリアしました。",
            msg_booth_opened: "ブースを開きました！お客様を待っています...",
            msg_booth_closed: "ブースを閉じました。",
            msg_finish_order_first: "先に現在の注文を完了してください。",
            msg_order_incomplete: "注文がまだ揃っていません。",
            request_total_label: "合計",
            mobile_order_empty: "注文をお待ちしています...",
            product_balloon: "風船",
            product_flower: "花",
            product_teddy: "テディベア",
            product_gift: "プレゼント",
            product_candy: "キャンディ",
            product_fan: "扇子"
        },

        studio: {
            header_eyebrow: "NAYLA FESTIVAL · 成人式 2026",
            header_title: "📸 成人式フォトスタジオ",
            header_description: "カメラマンの要望に合わせてスタイリングし、撮影してスコアとお金を稼ごう。",
            btn_open_studio: "🎬 スタジオを開く",
            btn_open_studio_active: "🔴 営業中",
            btn_price_settings: "⚙️ 価格設定",
            stat_score: "スコア",
            stat_money: "お金",
            stat_combo: "コンボ",
            stat_customers: "撮影数",
            stat_time: "時間",
            studio_sign_text: "SEIJIN SHIKI PHOTO STUDIO",
            request_title: "📋 撮影リクエスト",
            customer_default_name: "カメラマン",
            start_eyebrow: "NAYLA FESTIVAL",
            start_title: "成人式フォトスタジオ",
            start_description: "あなたはスタジオのスタイリストです。カメラマンが来て特定の衣装の組み合わせを要望します。頼まれたアイテムを準備してから撮影してください。",
            start_button: "🎬 スタジオを開いて開始",
            prep_kicker: "スタイリングスペース",
            prep_title: "👘 支度台",
            prep_status_empty: "まだリクエストがありません",
            prep_status_waiting_customer: "カメラマンを待っています...",
            prep_status_ready: "✓ 撮影準備完了",
            prep_status_need_all: "すべてのアイテムを準備してください",
            prep_placeholder: "撮影リクエストに合わせてアイテムを選んでください",
            btn_clear: "↺ クリア",
            btn_serve: "📸 撮影する",
            inventory_kicker: "衣装",
            inventory_title: "👘 衣装アイテム",
            inventory_hint: "アイテムをクリックしてスタイルを準備",
            price_kicker: "現在の価格",
            price_title: "💰 価格",
            price_hint: "変更可能",
            modal_kicker: "スタジオ設定",
            modal_title: "⚙️ アイテム価格を設定",
            btn_cancel: "キャンセル",
            btn_save: "価格を保存",
            completion_label: "撮影完了",
            completion_title: "素敵な一枚！✨",
            completion_default_text: "撮影セッションが完了しました。",
            completion_served_text: "{name}様の撮影セッションが完了しました。",
            completion_timeup_text: "時間切れ！最終スコアは{score}です。",
            completion_score_label: "+スコア",
            completion_money_label: "+お金",
            btn_continue: "続ける",
            msg_open_first: "まずスタジオを開いてください。",
            msg_no_customer: "まだカメラマンがいません。",
            msg_not_requested: "カメラマンが要望していないアイテムです。",
            msg_enough: "このアイテムはすでに十分な数量です。",
            msg_price_updated: "価格を更新しました。",
            msg_tray_cleared: "支度台をクリアしました。",
            msg_booth_opened: "スタジオを開きました！カメラマンを待っています...",
            msg_booth_closed: "スタジオを閉じました。",
            msg_finish_order_first: "先に現在のセッションを完了してください。",
            msg_order_incomplete: "まだスタイルが揃っていません。",
            request_total_label: "合計",
            mobile_order_empty: "撮影リクエストをお待ちしています...",
            product_kimono: "着物",
            product_obi: "帯",
            product_kanzashi: "簪",
            product_zori: "草履",
            product_furoshiki: "風呂敷バッグ",
            product_fan: "扇子"
        },

        memory: {
            header_eyebrow: "NAYLA FESTIVAL · 成人式 2026",
            header_title: "🎴 ナイラ・フォトカード・マッチ",
            header_description: "カードをめくってメンバーのフォトカードのペアを時間内に見つけ、スコアとお金を稼ごう。",
            btn_open_memory: "🎴 ゲームを開く",
            btn_open_memory_active: "🔴 プレイ中",
            stat_score: "スコア",
            stat_money: "お金",
            stat_combo: "コンボ",
            stat_matches: "マッチ数",
            stat_time: "時間",
            sign_small_top: "成人式",
            sign_title: "MEMORY",
            sign_small_bottom: "PHOTOCARD MATCH",
            request_title: "🎴 フォトカードボード",
            start_eyebrow: "NAYLA FESTIVAL",
            start_title: "ナイラ・フォトカード・マッチ",
            start_description: "2枚のカードをめくって同じメンバーのペアを探そう。連続で早く見つけるほどコンボとスコアが大きくなる。",
            start_button: "🎴 プレイ開始",
            board_kicker: "メモリーボード",
            board_hint: "カードをクリックしてめくる",
            msg_open_first: "まずゲームを開始してください。",
            msg_match_found: "✨ ペア成立！",
            msg_mismatch: "ペアじゃありません、もう一度。",
            msg_new_round: "🎉 新しいボードが始まりました！",
            msg_game_opened: "ゲーム開始！すべてのペアを見つけよう。",
            msg_game_closed: "ゲームを停止しました。",
            completion_label: "時間切れ",
            completion_title: "よくできました！🎴",
            completion_timeup_text: "時間切れ！最終スコアは{score}です。",
            completion_score_label: "+スコア",
            completion_money_label: "+お金",
            btn_continue: "続ける"
        },

        timing: {
            header_eyebrow: "NAYLA FESTIVAL · 成人式 2026",
            header_title: "🏮 灯籠流しランタンタイミング",
            header_description: "針が緑のゾーンにあるときに「点灯」を押して灯籠に火を灯し、川へ流そう。正確であるほどコンボとスコアが大きくなる。",
            btn_open_timing: "🏮 儀式を始める",
            btn_open_timing_active: "🔴 進行中",
            stat_score: "スコア",
            stat_money: "お金",
            stat_combo: "コンボ",
            stat_lanterns: "灯籠",
            stat_time: "時間",
            sign_small_top: "成人式",
            sign_title: "TORO NAGASHI",
            sign_small_bottom: "LANTERN TIMING",
            start_eyebrow: "NAYLA FESTIVAL",
            start_title: "灯籠流しランタンタイミング",
            start_description: "針がバーの上を左右に動き続けます。針が緑のゾーンに入った瞬間に「点灯」を押して灯籠に火を灯しましょう。正確に連続で成功するほどゾーンは狭くなり針は速くなりますが、スコアとコンボも大きくなります。",
            start_button: "🏮 儀式を始める",
            instructions: "針が緑のゾーンにあるときに「点灯」をクリック",
            btn_hit: "🏮 点灯する",
            msg_open_first: "まず儀式を始めてください。",
            msg_hit_success: "✨ 灯籠が灯りました！",
            msg_hit_miss: "外れました、もう一度。",
            msg_game_opened: "儀式が始まりました！針をよく見て。",
            msg_game_closed: "儀式を停止しました。",
            completion_label: "時間切れ",
            completion_title: "川が光で満たされた！🏮",
            completion_timeup_text: "時間切れ！最終スコアは{score}です。",
            completion_score_label: "+スコア",
            completion_money_label: "+お金",
            btn_continue: "続ける"
        }

    },


    /* ===================================================== */
    ko: {

        booth: {
            header_eyebrow: "NAYLA FESTIVAL · 성인식 2026",
            header_title: "🎪 나일라 페스티벌 부스",
            header_description: "고객의 주문을 준비하고 응대하여 점수와 돈을 획득하세요.",
            btn_open_booth: "🏪 부스 열기",
            btn_open_booth_active: "🔴 영업 중",
            btn_price_settings: "⚙️ 가격 설정",
            stat_score: "점수",
            stat_money: "돈",
            stat_combo: "콤보",
            stat_customers: "고객 수",
            stat_time: "시간",
            roof_text: "NAYLA FESTIVAL BOOTH",
            request_title: "🛍️ 고객 주문",
            customer_default_name: "고객",
            start_eyebrow: "NAYLA FESTIVAL",
            start_title: "나일라 페스티벌 부스",
            start_description: "당신은 부스 담당자입니다. 고객이 찾아와 상품을 주문합니다. 요청한 상품을 준비한 뒤 서브 버튼을 누르세요.",
            start_button: "🎪 부스 열고 시작하기",
            prep_kicker: "부스 작업 공간",
            prep_title: "🧺 준비 트레이",
            prep_status_empty: "아직 주문이 없습니다",
            prep_status_waiting_customer: "고객을 기다리는 중...",
            prep_status_ready: "✓ 제공 준비 완료",
            prep_status_need_all: "모든 상품을 준비하세요",
            prep_placeholder: "고객 주문에 맞춰 상품을 선택하세요",
            btn_clear: "↺ 초기화",
            btn_serve: "✓ 고객에게 제공",
            inventory_kicker: "재고",
            inventory_title: "🛍️ 부스 상품",
            inventory_hint: "상품을 클릭해 주문을 준비하세요",
            price_kicker: "현재 가격",
            price_title: "💰 가격",
            price_hint: "조정 가능",
            modal_kicker: "부스 설정",
            modal_title: "⚙️ 상품 가격 설정",
            btn_cancel: "취소",
            btn_save: "가격 저장",
            completion_label: "주문 완료",
            completion_title: "고객이 만족했어요! 🎉",
            completion_default_text: "주문이 성공적으로 제공되었습니다.",
            completion_served_text: "{name}님의 주문이 성공적으로 제공되었습니다.",
            completion_timeup_text: "시간 종료! 최종 점수는 {score}입니다.",
            completion_score_label: "+점수",
            completion_money_label: "+돈",
            btn_continue: "계속하기",
            msg_open_first: "먼저 부스를 열어주세요.",
            msg_no_customer: "아직 고객이 없습니다.",
            msg_not_requested: "고객이 요청하지 않은 상품입니다.",
            msg_enough: "이 상품은 이미 충분한 수량입니다.",
            msg_price_updated: "가격이 성공적으로 업데이트되었습니다.",
            msg_tray_cleared: "준비 트레이가 초기화되었습니다.",
            msg_booth_opened: "부스가 열렸습니다! 고객을 기다리는 중...",
            msg_booth_closed: "부스가 닫혔습니다.",
            msg_finish_order_first: "먼저 현재 주문을 완료하세요.",
            msg_order_incomplete: "주문이 아직 완료되지 않았습니다.",
            request_total_label: "합계",
            mobile_order_empty: "고객 주문을 기다리는 중...",
            product_balloon: "풍선",
            product_flower: "꽃",
            product_teddy: "테디베어",
            product_gift: "선물",
            product_candy: "사탕",
            product_fan: "부채"
        },

        studio: {
            header_eyebrow: "NAYLA FESTIVAL · 성인식 2026",
            header_title: "📸 성인식 포토 스튜디오",
            header_description: "포토그래퍼의 요청에 맞춰 스타일링하고 촬영하여 점수와 돈을 획득하세요.",
            btn_open_studio: "🎬 스튜디오 열기",
            btn_open_studio_active: "🔴 영업 중",
            btn_price_settings: "⚙️ 가격 설정",
            stat_score: "점수",
            stat_money: "돈",
            stat_combo: "콤보",
            stat_customers: "촬영 수",
            stat_time: "시간",
            studio_sign_text: "SEIJIN SHIKI PHOTO STUDIO",
            request_title: "📋 촬영 요청",
            customer_default_name: "포토그래퍼",
            start_eyebrow: "NAYLA FESTIVAL",
            start_title: "성인식 포토 스튜디오",
            start_description: "당신은 스튜디오 스타일리스트입니다. 포토그래퍼가 찾아와 특정 의상 조합을 요청합니다. 요청한 아이템을 준비한 뒤 촬영하세요.",
            start_button: "🎬 스튜디오 열고 시작하기",
            prep_kicker: "스타일링 작업 공간",
            prep_title: "👘 메이크업 테이블",
            prep_status_empty: "아직 요청이 없습니다",
            prep_status_waiting_customer: "포토그래퍼를 기다리는 중...",
            prep_status_ready: "✓ 촬영 준비 완료",
            prep_status_need_all: "모든 의상 아이템을 준비하세요",
            prep_placeholder: "촬영 요청에 맞춰 아이템을 선택하세요",
            btn_clear: "↺ 초기화",
            btn_serve: "📸 촬영하기",
            inventory_kicker: "의상",
            inventory_title: "👘 의상 아이템",
            inventory_hint: "아이템을 클릭해 스타일을 준비하세요",
            price_kicker: "현재 가격",
            price_title: "💰 가격",
            price_hint: "조정 가능",
            modal_kicker: "스튜디오 설정",
            modal_title: "⚙️ 아이템 가격 설정",
            btn_cancel: "취소",
            btn_save: "가격 저장",
            completion_label: "촬영 완료",
            completion_title: "멋진 사진이에요! ✨",
            completion_default_text: "촬영 세션이 성공적으로 완료되었습니다.",
            completion_served_text: "{name}님의 촬영 세션이 성공적으로 완료되었습니다.",
            completion_timeup_text: "시간 종료! 최종 점수는 {score}입니다.",
            completion_score_label: "+점수",
            completion_money_label: "+돈",
            btn_continue: "계속하기",
            msg_open_first: "먼저 스튜디오를 열어주세요.",
            msg_no_customer: "아직 포토그래퍼가 없습니다.",
            msg_not_requested: "포토그래퍼가 요청하지 않은 아이템입니다.",
            msg_enough: "이 아이템은 이미 충분한 수량입니다.",
            msg_price_updated: "가격이 성공적으로 업데이트되었습니다.",
            msg_tray_cleared: "메이크업 테이블이 초기화되었습니다.",
            msg_booth_opened: "스튜디오가 열렸습니다! 포토그래퍼를 기다리는 중...",
            msg_booth_closed: "스튜디오가 닫혔습니다.",
            msg_finish_order_first: "먼저 현재 세션을 완료하세요.",
            msg_order_incomplete: "스타일이 아직 완료되지 않았습니다.",
            request_total_label: "합계",
            mobile_order_empty: "촬영 요청을 기다리는 중...",
            product_kimono: "기모노",
            product_obi: "오비",
            product_kanzashi: "칸자시",
            product_zori: "조리",
            product_furoshiki: "후로시키 가방",
            product_fan: "부채"
        },

        memory: {
            header_eyebrow: "NAYLA FESTIVAL · 성인식 2026",
            header_title: "🎴 나일라 포토카드 매치",
            header_description: "카드를 뒤집어 시간 안에 멤버 포토카드 짝을 맞춰 점수와 돈을 획득하세요.",
            btn_open_memory: "🎴 게임 시작하기",
            btn_open_memory_active: "🔴 플레이 중",
            stat_score: "점수",
            stat_money: "돈",
            stat_combo: "콤보",
            stat_matches: "매치 수",
            stat_time: "시간",
            sign_small_top: "成人式",
            sign_title: "MEMORY",
            sign_small_bottom: "PHOTOCARD MATCH",
            request_title: "🎴 포토카드 보드",
            start_eyebrow: "NAYLA FESTIVAL",
            start_title: "나일라 포토카드 매치",
            start_description: "카드 두 장을 뒤집어 같은 멤버의 짝을 찾으세요. 빠르고 연속으로 짝을 맞출수록 콤보와 점수가 커집니다.",
            start_button: "🎴 플레이 시작",
            board_kicker: "메모리 보드",
            board_hint: "카드를 클릭해 뒤집으세요",
            msg_open_first: "먼저 게임을 시작하세요.",
            msg_match_found: "✨ 짝을 찾았어요!",
            msg_mismatch: "짝이 아니에요, 다시 시도하세요.",
            msg_new_round: "🎉 새로운 보드가 시작되었습니다!",
            msg_game_opened: "게임 시작! 모든 짝을 찾아보세요.",
            msg_game_closed: "게임이 중지되었습니다.",
            completion_label: "시간 종료",
            completion_title: "잘했어요! 🎴",
            completion_timeup_text: "시간 종료! 최종 점수는 {score}입니다.",
            completion_score_label: "+점수",
            completion_money_label: "+돈",
            btn_continue: "계속하기"
        },

        timing: {
            header_eyebrow: "NAYLA FESTIVAL · 성인식 2026",
            header_title: "🏮 토로나가시 랜턴 타이밍",
            header_description: "바늘이 초록 구역에 있을 때 '점등'을 눌러 등불을 밝히고 강으로 흘려보내세요. 정확할수록 콤보와 점수가 커집니다.",
            btn_open_timing: "🏮 의식 시작하기",
            btn_open_timing_active: "🔴 진행 중",
            stat_score: "점수",
            stat_money: "돈",
            stat_combo: "콤보",
            stat_lanterns: "등불",
            stat_time: "시간",
            sign_small_top: "成人式",
            sign_title: "TORO NAGASHI",
            sign_small_bottom: "LANTERN TIMING",
            start_eyebrow: "NAYLA FESTIVAL",
            start_title: "토로나가시 랜턴 타이밍",
            start_description: "바늘이 바를 따라 좌우로 계속 움직입니다. 바늘이 초록 구역 안에 있을 때 정확히 '점등'을 눌러 등불을 밝히세요. 연속으로 정확하게 성공할수록 구역은 좁아지고 바늘은 빨라지지만, 점수와 콤보도 커집니다.",
            start_button: "🏮 의식 시작하기",
            instructions: "바늘이 초록 구역에 있을 때 '점등'을 클릭하세요",
            btn_hit: "🏮 점등하기",
            msg_open_first: "먼저 의식을 시작하세요.",
            msg_hit_success: "✨ 등불이 밝혀졌어요!",
            msg_hit_miss: "빗나갔어요, 다시 시도하세요.",
            msg_game_opened: "의식이 시작되었습니다! 바늘을 잘 보세요.",
            msg_game_closed: "의식이 중지되었습니다.",
            completion_label: "시간 종료",
            completion_title: "강이 빛으로 가득 찼어요! 🏮",
            completion_timeup_text: "시간 종료! 최종 점수는 {score}입니다.",
            completion_score_label: "+점수",
            completion_money_label: "+돈",
            btn_continue: "계속하기"
        }

    },


    /* ===================================================== */
    zh: {

        booth: {
            header_eyebrow: "NAYLA FESTIVAL · 成人式 2026",
            header_title: "🎪 Nayla 庆典摊位",
            header_description: "准备顾客的订单并为他们服务，赚取分数和金钱。",
            btn_open_booth: "🏪 开启摊位",
            btn_open_booth_active: "🔴 营业中",
            btn_price_settings: "⚙️ 设置价格",
            stat_score: "分数",
            stat_money: "金钱",
            stat_combo: "连击",
            stat_customers: "顾客数",
            stat_time: "时间",
            roof_text: "NAYLA FESTIVAL BOOTH",
            request_title: "🛍️ 顾客订单",
            customer_default_name: "顾客",
            start_eyebrow: "NAYLA FESTIVAL",
            start_title: "Nayla 庆典摊位",
            start_description: "你负责经营摊位。顾客会前来点单，请准备好他们要求的商品，然后点击提供。",
            start_button: "🎪 开启摊位并开始",
            prep_kicker: "摊位工作区",
            prep_title: "🧺 准备托盘",
            prep_status_empty: "暂无订单",
            prep_status_waiting_customer: "等待顾客中...",
            prep_status_ready: "✓ 订单已准备好",
            prep_status_need_all: "请准备好所有商品",
            prep_placeholder: "根据顾客订单选择商品",
            btn_clear: "↺ 清空",
            btn_serve: "✓ 提供给顾客",
            inventory_kicker: "库存",
            inventory_title: "🛍️ 摊位商品",
            inventory_hint: "点击商品以准备订单",
            price_kicker: "当前价格",
            price_title: "💰 价格",
            price_hint: "可调整",
            modal_kicker: "摊位设置",
            modal_title: "⚙️ 设置商品价格",
            btn_cancel: "取消",
            btn_save: "保存价格",
            completion_label: "订单完成",
            completion_title: "顾客很满意！🎉",
            completion_default_text: "订单已成功提供。",
            completion_served_text: "已成功为{name}提供订单。",
            completion_timeup_text: "时间到！你的最终分数是{score}。",
            completion_score_label: "+分数",
            completion_money_label: "+金钱",
            btn_continue: "继续",
            msg_open_first: "请先开启摊位。",
            msg_no_customer: "目前没有顾客。",
            msg_not_requested: "顾客没有点这个商品。",
            msg_enough: "这个商品的数量已经足够了。",
            msg_price_updated: "价格已成功更新。",
            msg_tray_cleared: "准备托盘已清空。",
            msg_booth_opened: "摊位已开启！等待顾客中...",
            msg_booth_closed: "摊位已关闭。",
            msg_finish_order_first: "请先完成当前的订单。",
            msg_order_incomplete: "订单还未准备齐全。",
            request_total_label: "总计",
            mobile_order_empty: "等待顾客下单...",
            product_balloon: "气球",
            product_flower: "鲜花",
            product_teddy: "泰迪熊",
            product_gift: "礼物",
            product_candy: "糖果",
            product_fan: "扇子"
        },

        studio: {
            header_eyebrow: "NAYLA FESTIVAL · 成人式 2026",
            header_title: "📸 成人式摄影棚",
            header_description: "按摄影师的要求为成员搭配造型，然后拍摄以赚取分数和金钱。",
            btn_open_studio: "🎬 开启摄影棚",
            btn_open_studio_active: "🔴 营业中",
            btn_price_settings: "⚙️ 设置价格",
            stat_score: "分数",
            stat_money: "金钱",
            stat_combo: "连击",
            stat_customers: "拍摄次数",
            stat_time: "时间",
            studio_sign_text: "SEIJIN SHIKI PHOTO STUDIO",
            request_title: "📋 拍摄需求",
            customer_default_name: "摄影师",
            start_eyebrow: "NAYLA FESTIVAL",
            start_title: "成人式摄影棚",
            start_description: "你是摄影棚的造型师。摄影师会前来提出特定的服装搭配需求，请准备好要求的单品，然后拍摄。",
            start_button: "🎬 开启摄影棚并开始",
            prep_kicker: "造型工作区",
            prep_title: "👘 化妆台",
            prep_status_empty: "暂无需求",
            prep_status_waiting_customer: "等待摄影师中...",
            prep_status_ready: "✓ 造型已准备好拍摄",
            prep_status_need_all: "请准备好所有服装单品",
            prep_placeholder: "根据拍摄需求选择单品",
            btn_clear: "↺ 清空",
            btn_serve: "📸 拍摄",
            inventory_kicker: "衣橱",
            inventory_title: "👘 服装单品",
            inventory_hint: "点击单品以准备造型",
            price_kicker: "当前价格",
            price_title: "💰 价格",
            price_hint: "可调整",
            modal_kicker: "摄影棚设置",
            modal_title: "⚙️ 设置单品价格",
            btn_cancel: "取消",
            btn_save: "保存价格",
            completion_label: "拍摄完成",
            completion_title: "拍出绝美照片！✨",
            completion_default_text: "拍摄环节已成功完成。",
            completion_served_text: "已成功为{name}完成拍摄环节。",
            completion_timeup_text: "时间到！你的最终分数是{score}。",
            completion_score_label: "+分数",
            completion_money_label: "+金钱",
            btn_continue: "继续",
            msg_open_first: "请先开启摄影棚。",
            msg_no_customer: "目前没有摄影师。",
            msg_not_requested: "摄影师没有要求这件单品。",
            msg_enough: "这件单品的数量已经足够了。",
            msg_price_updated: "价格已成功更新。",
            msg_tray_cleared: "化妆台已清空。",
            msg_booth_opened: "摄影棚已开启！等待摄影师中...",
            msg_booth_closed: "摄影棚已关闭。",
            msg_finish_order_first: "请先完成当前的拍摄环节。",
            msg_order_incomplete: "造型还未准备齐全。",
            request_total_label: "总计",
            mobile_order_empty: "等待拍摄需求...",
            product_kimono: "和服",
            product_obi: "腰带",
            product_kanzashi: "簪子",
            product_zori: "草履",
            product_furoshiki: "包袱布包",
            product_fan: "扇子"
        },

        memory: {
            header_eyebrow: "NAYLA FESTIVAL · 成人式 2026",
            header_title: "🎴 Nayla 写真卡配对",
            header_description: "翻开卡片，在时间结束前找出成员写真卡的配对，赚取分数和金钱。",
            btn_open_memory: "🎴 开始游戏",
            btn_open_memory_active: "🔴 游戏中",
            stat_score: "分数",
            stat_money: "金钱",
            stat_combo: "连击",
            stat_matches: "配对数",
            stat_time: "时间",
            sign_small_top: "成人式",
            sign_title: "MEMORY",
            sign_small_bottom: "PHOTOCARD MATCH",
            request_title: "🎴 写真卡棋盘",
            start_eyebrow: "NAYLA FESTIVAL",
            start_title: "Nayla 写真卡配对",
            start_description: "翻开两张卡片，找到同一成员的配对。连续配对越快，连击和分数就越高。",
            start_button: "🎴 开始游玩",
            board_kicker: "记忆棋盘",
            board_hint: "点击卡片翻开",
            msg_open_first: "请先开始游戏。",
            msg_match_found: "✨ 配对成功！",
            msg_mismatch: "不是一对，请再试一次。",
            msg_new_round: "🎉 新的一局开始了！",
            msg_game_opened: "游戏开始！找出所有配对。",
            msg_game_closed: "游戏已停止。",
            completion_label: "时间到",
            completion_title: "做得好！🎴",
            completion_timeup_text: "时间到！你的最终分数是{score}。",
            completion_score_label: "+分数",
            completion_money_label: "+金钱",
            btn_continue: "继续"
        },

        timing: {
            header_eyebrow: "NAYLA FESTIVAL · 成人式 2026",
            header_title: "🏮 灯笼放流计时",
            header_description: "当指针位于绿色区域时点击“点亮”，让灯笼漂向河流。越精准，连击和分数就越高。",
            btn_open_timing: "🏮 开始仪式",
            btn_open_timing_active: "🔴 进行中",
            stat_score: "分数",
            stat_money: "金钱",
            stat_combo: "连击",
            stat_lanterns: "灯笼",
            stat_time: "时间",
            sign_small_top: "成人式",
            sign_title: "TORO NAGASHI",
            sign_small_bottom: "LANTERN TIMING",
            start_eyebrow: "NAYLA FESTIVAL",
            start_title: "灯笼放流计时",
            start_description: "指针会沿着长条来回移动。当指针正好在绿色区域内时点击“点亮”，即可点亮一盏灯笼。连续精准命中，区域会变窄、指针会变快，但你的分数和连击也会随之提高。",
            start_button: "🏮 开始仪式",
            instructions: "指针在绿色区域时点击“点亮”",
            btn_hit: "🏮 点亮",
            msg_open_first: "请先开始仪式。",
            msg_hit_success: "✨ 灯笼点亮了！",
            msg_hit_miss: "没点中，再试一次。",
            msg_game_opened: "仪式开始！注意指针。",
            msg_game_closed: "仪式已停止。",
            completion_label: "时间到",
            completion_title: "河流被点亮了！🏮",
            completion_timeup_text: "时间到！你的最终分数是{score}。",
            completion_score_label: "+分数",
            completion_money_label: "+金钱",
            btn_continue: "继续"
        }

    }

};


/* =========================================================
   01. LANGUAGE HELPERS (shared by all games in this file)
========================================================= */

function normalizeGamesLanguage(language) {

    const value = String(language || "").toLowerCase().trim();

    if (value === "id" || value.startsWith("id-")) return "id";
    if (value === "en" || value.startsWith("en-")) return "en";
    if (value === "ja" || value.startsWith("ja-")) return "ja";
    if (value === "ko" || value.startsWith("ko-")) return "ko";
    if (value === "zh" || value.startsWith("zh-")) return "zh";

    return "en";

}


function getGamesLanguage() {

    const stored =
        localStorage.getItem("language") ||
        localStorage.getItem("selectedLanguage") ||
        localStorage.getItem("currentLanguage") ||
        localStorage.getItem("lang");

    const htmlLanguage = document.documentElement?.getAttribute("lang");

    return normalizeGamesLanguage(stored || htmlLanguage || "en");

}


function getNestedValue(object, path) {

    if (!object || !path) return undefined;

    return String(path)
        .split(".")
        .reduce((current, key) => {
            if (current === null || current === undefined) return undefined;
            return current[key];
        }, object);

}


/*
 * gamesT(key, params)
 * key format: "<namespace>.<field>", e.g. "booth.btn_serve",
 * "studio.btn_serve", "memory.btn_continue" or
 * "timing.btn_hit". params opsional untuk template
 * {placeholder}.
 */

function gamesT(key, params) {

    if (!key) return "";

    const language = getGamesLanguage();

    let value = getNestedValue(GAMES_TRANSLATIONS[language], key);

    if (typeof value !== "string") {
        value = getNestedValue(GAMES_TRANSLATIONS.en, key);
    }

    if (typeof value !== "string") return "";

    if (params) {
        Object.keys(params).forEach(paramKey => {
            value = value.replace(
                new RegExp(`\\{${paramKey}\\}`, "g"),
                params[paramKey]
            );
        });
    }

    return value;

}


function applyGamesTranslations() {

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.dataset.i18n;
        const text = gamesT(key);

        if (text) element.textContent = text;

    });

}


/* =========================================================
   02. SHARED CUSTOMER / MEMBER POOL — JKT48 MEMBERS
   (Nama tetap sama di semua bahasa & dipakai oleh keempat
   game, baik sebagai "customer" booth, "fotografer" studio,
   photocard di memory, maupun photocard lentera di timing.
   Setiap member sudah punya path foto sendiri di
   /static/img/members/<slug>.png — begitu file fotonya
   diupload, foto otomatis muncul; selama belum ada, otomatis
   fallback ke avatar default lewat onerror di JS.)
========================================================= */

function slugifyMemberName(name) {

    return String(name)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "");

}


const MEMBER_NAMES = [
    "Alya", "Anin", "Lia", "Lana", "Elin", "Cynthia",
    "Fiony", "Fritzy", "Grecie", "Lily", "Indah", "Trisha",
    "Michie", "Delyn", "Olla", "Freya", "Ella", "Gita",
    "Gresel", "Eli", "Lyn", "Marsha", "Nachia", "Oline",
    "Nala", "Aralie", "Christy", "Erine", "Oniel", "Danela",
    "Daisy", "Feni", "Jessy", "Kathrina", "Lulu", "Levi",
    "Muthe", "Raisha", "Ribka", "Fera", "Virgi", "Auwia",
    "Rilly", "Carissa", "Bella", "Fahira", "Rara", "Gia",
    "Heidi", "Maira", "Ekin", "Jemima", "Maxine", "Mikaela",
    "Intan", "Jazzy", "Ralyne", "Sona"
];


const MEMBER_POOL = MEMBER_NAMES.map(name => ({
    name,
    image: `/static/img/members/${slugifyMemberName(name)}.png`
}));


const DEFAULT_MEMBER_AVATAR =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <rect width="100" height="100" fill="#f2f5fb"/>
            <circle cx="50" cy="38" r="20" fill="#c7d2e3"/>
            <path d="M50 62c-22 0-36 14-36 30v8h72v-8c0-16-14-30-36-30z" fill="#c7d2e3"/>
        </svg>
    `);


/* =========================================================
   03. PRODUCT SETS (booth & studio only — memory & timing
   tidak pakai "produk")
========================================================= */

const BOOTH_PRODUCTS = [
    { id: "balloon", nameKey: "booth.product_balloon", emoji: "🎈", price: 15000 },
    { id: "flower", nameKey: "booth.product_flower", emoji: "🌸", price: 20000 },
    { id: "teddy", nameKey: "booth.product_teddy", emoji: "🧸", price: 35000 },
    { id: "gift", nameKey: "booth.product_gift", emoji: "🎁", price: 40000 },
    { id: "candy", nameKey: "booth.product_candy", emoji: "🍭", price: 10000 },
    { id: "fan", nameKey: "booth.product_fan", emoji: "🪭", price: 18000 }
];


const STUDIO_PRODUCTS = [
    { id: "kimono", nameKey: "studio.product_kimono", emoji: "👘", price: 45000 },
    { id: "obi", nameKey: "studio.product_obi", emoji: "🎀", price: 25000 },
    { id: "kanzashi", nameKey: "studio.product_kanzashi", emoji: "🌸", price: 20000 },
    { id: "zori", nameKey: "studio.product_zori", emoji: "👡", price: 22000 },
    { id: "furoshiki", nameKey: "studio.product_furoshiki", emoji: "👜", price: 28000 },
    { id: "fan", nameKey: "studio.product_fan", emoji: "🪭", price: 18000 }
];


/* =========================================================
   04. DOM ID MAPS
========================================================= */

const BOOTH_IDS = {
    openButton: "openBoothButton",
    priceSettingsButton: "priceSettingsButton",
    startGameButton: "startGameButton",
    startOverlay: "boothStartOverlay",
    customer: "customer",
    customerAvatar: "customerAvatar",
    customerName: "customerName",
    customerRequest: "customerRequest",
    requestItems: "requestItems",
    requestTotal: "requestTotal",
    mobileRequestItems: "mobileRequestItems",
    mobileRequestTotal: "mobileRequestTotal",
    preparationItems: "preparationItems",
    preparationStatus: "preparationStatus",
    serveButton: "serveButton",
    clearPreparationButton: "clearPreparationButton",
    productsGrid: "productsGrid",
    priceList: "priceList",
    priceModal: "priceModal",
    modalPriceList: "modalPriceList",
    closePriceModal: "closePriceModal",
    cancelPriceButton: "cancelPriceButton",
    savePriceButton: "savePriceButton",
    completionPopup: "completionPopup",
    closeCompletionButton: "closeCompletionButton",
    popupScore: "popupScore",
    popupMoney: "popupMoney",
    completionText: "completionText",
    gameMessage: "gameMessage",
    scoreValue: "scoreValue",
    moneyValue: "moneyValue",
    comboValue: "comboValue",
    customerValue: "customerValue",
    timerValue: "timerValue"
};


const STUDIO_IDS = {
    openButton: "openStudioButton",
    priceSettingsButton: "priceSettingsButtonS",
    startGameButton: "startGameButtonS",
    startOverlay: "studioStartOverlay",
    customer: "studioCustomer",
    customerAvatar: "studioCustomerAvatar",
    customerName: "studioCustomerName",
    customerRequest: "studioCustomerRequest",
    requestItems: "studioRequestItems",
    requestTotal: "studioRequestTotal",
    mobileRequestItems: "studioMobileRequestItems",
    mobileRequestTotal: "studioMobileRequestTotal",
    preparationItems: "studioPreparationItems",
    preparationStatus: "studioPreparationStatus",
    serveButton: "studioServeButton",
    clearPreparationButton: "studioClearPreparationButton",
    productsGrid: "studioProductsGrid",
    priceList: "studioPriceList",
    priceModal: "studioPriceModal",
    modalPriceList: "studioModalPriceList",
    closePriceModal: "closeStudioPriceModal",
    cancelPriceButton: "cancelStudioPriceButton",
    savePriceButton: "saveStudioPriceButton",
    completionPopup: "studioCompletionPopup",
    closeCompletionButton: "closeStudioCompletionButton",
    popupScore: "studioPopupScore",
    popupMoney: "studioPopupMoney",
    completionText: "studioCompletionText",
    gameMessage: "studioGameMessage",
    scoreValue: "studioScoreValue",
    moneyValue: "studioMoneyValue",
    comboValue: "studioComboValue",
    customerValue: "studioCustomerValue",
    timerValue: "studioTimerValue"
};


const MEMORY_IDS = {
    openButton: "openMemoryButton",
    startGameButton: "startGameButtonM",
    startOverlay: "memoryStartOverlay",
    board: "memoryBoard",
    gameMessage: "memoryGameMessage",
    completionPopup: "memoryCompletionPopup",
    closeCompletionButton: "closeMemoryCompletionButton",
    popupScore: "memoryPopupScore",
    popupMoney: "memoryPopupMoney",
    completionText: "memoryCompletionText",
    scoreValue: "memoryScoreValue",
    moneyValue: "memoryMoneyValue",
    comboValue: "memoryComboValue",
    matchesValue: "memoryMatchesValue",
    timerValue: "memoryTimerValue"
};


const TIMING_IDS = {
    openButton: "openTimingButton",
    startGameButton: "startGameButtonT",
    startOverlay: "timingStartOverlay",
    barWrap: "timingBarWrap",
    track: "timingTrack",
    zone: "timingZone",
    needle: "timingNeedle",
    hitButton: "timingHitButton",
    lanternRow: "timingLanternRow",
    gameMessage: "timingGameMessage",
    completionPopup: "timingCompletionPopup",
    closeCompletionButton: "closeTimingCompletionButton",
    popupScore: "timingPopupScore",
    popupMoney: "timingPopupMoney",
    completionText: "timingCompletionText",
    scoreValue: "timingScoreValue",
    moneyValue: "timingMoneyValue",
    comboValue: "timingComboValue",
    lanternsValue: "timingLanternsValue",
    timerValue: "timingTimerValue"
};


/* =========================================================
   05. GENERIC SHOP GAME ENGINE (booth & studio)
   (dipakai untuk booth maupun studio — satu-satunya bedanya
   cuma namespace teks, daftar produk, dan id elemen DOM)
========================================================= */

function createShopGame(config) {

    const { namespace, products, ids, activeButtonKey } = config;

    const $ = id => document.getElementById(id);

    // Kalau elemen utama game ini tidak ada di halaman,
    // jangan jalankan apa pun (aman dipasang di halaman manapun).
    const openButton = $(ids.openButton);
    if (!openButton) return null;

    const priceSettingsButton = $(ids.priceSettingsButton);
    const startGameButton = $(ids.startGameButton);
    const startOverlay = $(ids.startOverlay);
    const customerEl = $(ids.customer);
    const customerAvatar = $(ids.customerAvatar);
    const customerName = $(ids.customerName);
    const customerRequest = $(ids.customerRequest);
    const requestItems = $(ids.requestItems);
    const requestTotal = $(ids.requestTotal);
    const mobileRequestItems = $(ids.mobileRequestItems);
    const mobileRequestTotal = $(ids.mobileRequestTotal);
    const preparationItems = $(ids.preparationItems);
    const preparationStatus = $(ids.preparationStatus);
    const serveButton = $(ids.serveButton);
    const clearPreparationButton = $(ids.clearPreparationButton);
    const productsGrid = $(ids.productsGrid);
    const priceList = $(ids.priceList);
    const priceModal = $(ids.priceModal);
    const modalPriceList = $(ids.modalPriceList);
    const closePriceModalBtn = $(ids.closePriceModal);
    const cancelPriceButton = $(ids.cancelPriceButton);
    const savePriceButton = $(ids.savePriceButton);
    const completionPopup = $(ids.completionPopup);
    const closeCompletionButton = $(ids.closeCompletionButton);
    const popupScore = $(ids.popupScore);
    const popupMoney = $(ids.popupMoney);
    const completionText = $(ids.completionText);
    const gameMessage = $(ids.gameMessage);


    const state = {
        isOpen: false,
        score: 0,
        money: 0,
        combo: 0,
        customersServed: 0,
        timeLeft: 60,
        timer: null,
        currentCustomer: null,
        currentOrder: null,
        preparation: {},
        prices: {},
        gameOver: false,
        busy: false
    };

    products.forEach(product => { state.prices[product.id] = product.price; });


    function t(key, params) { return gamesT(`${namespace}.${key}`, params); }

    function findProduct(id) { return products.find(product => product.id === id); }

    function formatMoney(value) {
        return "Rp " + Number(value || 0).toLocaleString("id-ID");
    }

    function randomFrom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    /* ===== SCOREBOARD ===== */

    function updateScoreboard() {

        $(ids.scoreValue).textContent = state.score.toLocaleString("id-ID");
        $(ids.moneyValue).textContent = formatMoney(state.money);
        $(ids.comboValue).textContent = "x" + state.combo;
        $(ids.customerValue).textContent = state.customersServed;
        $(ids.timerValue).textContent = state.timeLeft;

        $(ids.timerValue).style.color = state.timeLeft <= 10 ? "#ff5470" : "";

    }


    /* ===== MESSAGE ===== */

    let messageTimeout = null;

    function showMessage(key, params) {

        if (!gameMessage) return;

        gameMessage.textContent = t(key, params);
        gameMessage.classList.add("show");

        clearTimeout(messageTimeout);
        messageTimeout = setTimeout(() => {
            gameMessage.classList.remove("show");
        }, 1800);

    }


    /* ===== PRODUCTS UI ===== */

    function renderProducts() {

        productsGrid.innerHTML = "";

        products.forEach(product => {

            const card = document.createElement("button");
            card.type = "button";
            card.className = "product-card";
            card.dataset.productId = product.id;

            const quantity = state.preparation[product.id] || 0;

            if (state.currentOrder && !state.currentOrder[product.id]) {
                card.classList.add("not-requested");
            }

            if (quantity > 0) card.classList.add("selected");

            card.innerHTML = `
                <span class="product-icon">${product.emoji}</span>
                <div class="product-name">${gamesT(product.nameKey)}</div>
                <div class="product-price">${formatMoney(state.prices[product.id])}</div>
                ${quantity > 0 ? `<span class="product-quantity">${quantity}</span>` : ""}
            `;

            card.addEventListener("click", () => prepareProduct(product.id));

            productsGrid.appendChild(card);

        });

    }


    /* ===== PRICE LIST ===== */

    function renderPriceList() {

        priceList.innerHTML = "";

        products.forEach(product => {

            const row = document.createElement("div");
            row.className = "price-row";

            row.innerHTML = `
                <div class="price-row-left">
                    <span class="price-row-icon">${product.emoji}</span>
                    <span class="price-row-name">${gamesT(product.nameKey)}</span>
                </div>
                <span class="price-row-value">${formatMoney(state.prices[product.id])}</span>
            `;

            priceList.appendChild(row);

        });

    }


    /* ===== PRICE MODAL ===== */

    function openPriceModal() {

        modalPriceList.innerHTML = "";

        products.forEach(product => {

            const row = document.createElement("div");
            row.className = "modal-price-row";

            row.innerHTML = `
                <div class="modal-price-info">
                    <span>${product.emoji}</span>
                    <strong>${gamesT(product.nameKey)}</strong>
                </div>
                <input
                    class="price-input"
                    type="number"
                    min="1000"
                    step="1000"
                    data-price-id="${product.id}"
                    value="${state.prices[product.id]}">
            `;

            modalPriceList.appendChild(row);

        });

        priceModal.classList.add("show");

    }


    function closePriceModalWindow() {
        priceModal.classList.remove("show");
    }


    function savePrices() {

        const inputs = modalPriceList.querySelectorAll(".price-input");

        inputs.forEach(input => {

            const id = input.dataset.priceId;
            let value = Number(input.value);

            if (!Number.isFinite(value) || value < 1000) value = 1000;

            value = Math.round(value / 1000) * 1000;

            state.prices[id] = value;

        });

        renderPriceList();
        renderProducts();
        closePriceModalWindow();

        showMessage("msg_price_updated");

    }


    /* ===== ORDER ===== */

    function createOrder() {

        const order = {};

        const shuffled = [...products].sort(() => Math.random() - .5);
        const itemCount = randomInt(1, 3);
        const selected = shuffled.slice(0, itemCount);

        selected.forEach(product => {
            order[product.id] = randomInt(1, 2);
        });

        return order;

    }


    function getOrderTotal(order) {

        let total = 0;

        Object.entries(order).forEach(([id, quantity]) => {
            total += (state.prices[id] || 0) * quantity;
        });

        return total;

    }


    /* ===== MOBILE ORDER SUMMARY ===== */

    function renderMobileOrderSummary() {

        if (!mobileRequestItems || !mobileRequestTotal) return;

        if (!state.currentOrder) {

            mobileRequestItems.innerHTML = `
                <div class="mobile-order-summary-empty">${t("mobile_order_empty")}</div>
            `;

            mobileRequestTotal.textContent = formatMoney(0);

            return;

        }

        mobileRequestItems.innerHTML = "";

        Object.entries(state.currentOrder).forEach(([id, quantity]) => {

            const product = findProduct(id);
            if (!product) return;

            const item = document.createElement("div");
            item.className = "request-item";

            item.innerHTML = `
                <span>${product.emoji}</span>
                <span>${gamesT(product.nameKey)}</span>
                <strong>×${quantity}</strong>
            `;

            mobileRequestItems.appendChild(item);

        });

        mobileRequestTotal.textContent = formatMoney(getOrderTotal(state.currentOrder));

    }


    /* ===== CUSTOMER REQUEST ===== */

    function renderCustomerRequest() {

        renderMobileOrderSummary();

        if (!state.currentOrder) {
            customerRequest.classList.remove("visible");
            return;
        }

        requestItems.innerHTML = "";

        Object.entries(state.currentOrder).forEach(([id, quantity]) => {

            const product = findProduct(id);
            if (!product) return;

            const item = document.createElement("div");
            item.className = "request-item";

            item.innerHTML = `
                <span>${product.emoji}</span>
                <span>${gamesT(product.nameKey)}</span>
                <strong>×${quantity}</strong>
            `;

            requestItems.appendChild(item);

        });

        requestTotal.textContent = formatMoney(getOrderTotal(state.currentOrder));

        customerRequest.classList.add("visible");

    }


    /* ===== PREPARATION ===== */

    function clearPreparation() {

        state.preparation = {};
        renderPreparation();
        renderProducts();

    }


    function prepareProduct(productId) {

        if (!state.isOpen) {
            showMessage("msg_open_first");
            return;
        }

        if (!state.currentCustomer) {
            showMessage("msg_no_customer");
            return;
        }

        const requestedQuantity = state.currentOrder[productId] || 0;

        if (requestedQuantity <= 0) {
            showMessage("msg_not_requested");
            return;
        }

        const currentQuantity = state.preparation[productId] || 0;

        if (currentQuantity >= requestedQuantity) {
            showMessage("msg_enough");
            return;
        }

        state.preparation[productId] = currentQuantity + 1;

        renderPreparation();
        renderProducts();

    }


    function renderPreparation() {

        preparationItems.innerHTML = "";

        if (!state.currentOrder) {

            preparationItems.innerHTML = `
                <div class="empty-tray">${t("prep_status_waiting_customer")}</div>
            `;

            preparationStatus.textContent = t("prep_status_empty");
            preparationStatus.classList.remove("ready");
            serveButton.disabled = true;

            return;

        }

        const entries = Object.entries(state.preparation);

        if (entries.length === 0) {
            preparationItems.innerHTML = `
                <div class="empty-tray">${t("prep_placeholder")}</div>
            `;
        }

        entries.forEach(([id, quantity]) => {

            if (quantity <= 0) return;

            const product = findProduct(id);
            if (!product) return;

            const item = document.createElement("div");
            item.className = "prepared-item";

            item.innerHTML = `
                <span>${product.emoji}</span>
                <span>${gamesT(product.nameKey)}</span>
                <strong>×${quantity}</strong>
            `;

            preparationItems.appendChild(item);

        });

        const ready = isPreparationCorrect();

        if (ready) {
            preparationStatus.textContent = t("prep_status_ready");
            preparationStatus.classList.add("ready");
        } else {
            preparationStatus.textContent = t("prep_status_need_all");
            preparationStatus.classList.remove("ready");
        }

        serveButton.disabled = !ready;

    }


    function isPreparationCorrect() {

        if (!state.currentOrder) return false;

        const orderKeys = Object.keys(state.currentOrder);
        const prepKeys = Object.keys(state.preparation).filter(id => state.preparation[id] > 0);

        if (orderKeys.length !== prepKeys.length) return false;

        for (const id of orderKeys) {
            if (state.preparation[id] !== state.currentOrder[id]) return false;
        }

        return true;

    }


    /* ===== CUSTOMER LIFECYCLE ===== */

    function createCustomer() {

        if (state.gameOver || !state.isOpen) return;

        state.busy = true;

        const data = randomFrom(MEMBER_POOL);

        state.currentCustomer = data;
        state.currentOrder = createOrder();
        state.preparation = {};

        customerName.textContent = data.name;

        customerAvatar.onerror = function() {
            customerAvatar.onerror = null;
            customerAvatar.src = DEFAULT_MEMBER_AVATAR;
        };

        customerAvatar.src = data.image;
        customerAvatar.alt = data.name;

        customerEl.classList.remove("customer-hidden");
        customerEl.classList.remove("customer-at-booth");
        customerEl.classList.add("customer-entering");

        renderCustomerRequest();
        renderPreparation();
        renderProducts();

        requestAnimationFrame(() => {
            setTimeout(() => {
                if (!state.currentCustomer) return;
                customerEl.classList.add("customer-at-booth");
            }, 150);
        });

    }


    function removeCustomer() {

        customerRequest.classList.remove("visible");
        customerEl.classList.remove("customer-at-booth");
        customerEl.classList.remove("customer-entering");

        setTimeout(() => {
            customerEl.classList.add("customer-hidden");
        }, 450);

        state.currentCustomer = null;
        state.currentOrder = null;
        state.preparation = {};

        renderMobileOrderSummary();
        renderPreparation();
        renderProducts();

    }


    function nextCustomer() {

        if (!state.isOpen || state.gameOver) return;

        setTimeout(() => {
            createCustomer();
        }, 900);

    }


    /* ===== SERVE ===== */

    function serveCustomer() {

        if (!state.currentCustomer) {
            showMessage("msg_no_customer");
            return;
        }

        if (!isPreparationCorrect()) {
            showMessage("msg_order_incomplete");
            return;
        }

        const total = getOrderTotal(state.currentOrder);

        const baseScore = Math.max(10, Math.round(total / 1000));
        const comboBonus = state.combo * 5;
        const earnedScore = baseScore + comboBonus;

        state.score += earnedScore;
        state.money += total;
        state.combo += 1;
        state.customersServed += 1;

        updateScoreboard();

        popupScore.textContent = "+" + earnedScore;
        popupMoney.textContent = formatMoney(total);

        completionText.textContent = t("completion_served_text", { name: state.currentCustomer.name });

        completionPopup.classList.add("show");

        removeCustomer();

        state.busy = false;

    }


    /* ===== TIMER ===== */

    function startTimer() {

        clearInterval(state.timer);

        state.timer = setInterval(() => {

            if (!state.isOpen || state.gameOver) return;

            state.timeLeft--;
            updateScoreboard();

            if (state.timeLeft <= 0) endGame();

        }, 1000);

    }


    /* ===== END GAME ===== */

    function endGame() {

        state.gameOver = true;
        state.isOpen = false;

        clearInterval(state.timer);

        removeCustomer();

        completionText.textContent = t("completion_timeup_text", { score: state.score });

        popupScore.textContent = state.score;
        popupMoney.textContent = formatMoney(state.money);

        completionPopup.classList.add("show");

        openButton.textContent = t("btn_" + activeButtonKey);

    }


    /* ===== START GAME ===== */

    function startGame() {

        state.isOpen = true;
        state.gameOver = false;
        state.busy = false;
        state.score = 0;
        state.money = 0;
        state.combo = 0;
        state.customersServed = 0;
        state.timeLeft = 60;
        state.currentCustomer = null;
        state.currentOrder = null;
        state.preparation = {};

        updateScoreboard();
        renderProducts();
        renderPreparation();

        startOverlay.classList.add("hidden");

        openButton.textContent = t("btn_" + activeButtonKey + "_active");

        showMessage("msg_booth_opened");

        startTimer();

        setTimeout(() => {
            createCustomer();
        }, 700);

    }


    /* ===== OPEN / CLOSE ===== */

    function toggleGame() {

        if (state.isOpen) {

            if (state.currentCustomer) {
                showMessage("msg_finish_order_first");
                return;
            }

            state.isOpen = false;
            clearInterval(state.timer);

            openButton.textContent = t("btn_" + activeButtonKey);

            showMessage("msg_booth_closed");

            return;

        }

        startGame();

    }


    /* ===== EVENTS ===== */

    startGameButton.addEventListener("click", startGame);
    openButton.addEventListener("click", toggleGame);
    priceSettingsButton.addEventListener("click", openPriceModal);
    closePriceModalBtn.addEventListener("click", closePriceModalWindow);
    cancelPriceButton.addEventListener("click", closePriceModalWindow);
    savePriceButton.addEventListener("click", savePrices);

    clearPreparationButton.addEventListener("click", () => {
        clearPreparation();
        showMessage("msg_tray_cleared");
    });

    serveButton.addEventListener("click", serveCustomer);

    closeCompletionButton.addEventListener("click", () => {

        completionPopup.classList.remove("show");

        if (state.gameOver) {
            startOverlay.classList.remove("hidden");
            openButton.textContent = t("btn_" + activeButtonKey);
            return;
        }

        nextCustomer();

    });

    priceModal.addEventListener("click", event => {
        if (event.target === priceModal) closePriceModalWindow();
    });


    /* ===== LANGUAGE REFRESH (called by the shared i18n system) ===== */

    function refreshDynamicTexts() {

        if (state.isOpen) {
            openButton.textContent = t("btn_" + activeButtonKey + "_active");
        } else {
            openButton.textContent = t("btn_" + activeButtonKey);
        }

        renderProducts();
        renderPriceList();
        renderPreparation();
        renderCustomerRequest();

    }


    /* ===== INITIAL RENDER ===== */

    renderProducts();
    renderPriceList();
    renderPreparation();
    updateScoreboard();


    return { refreshDynamicTexts };

}


/* =========================================================
   05b. MEMORY MATCH GAME ENGINE (mekanik BEDA dari shop game
   di atas — bukan prepare & serve, tapi flip 2 kartu & cari
   pasangan photocard member yang sama sebelum waktu habis)
========================================================= */

function createMemoryGame(ids) {

    const $ = id => document.getElementById(id);

    const openButton = $(ids.openButton);
    if (!openButton) return null;

    const startGameButton = $(ids.startGameButton);
    const startOverlay = $(ids.startOverlay);
    const board = $(ids.board);
    const gameMessage = $(ids.gameMessage);
    const completionPopup = $(ids.completionPopup);
    const closeCompletionButton = $(ids.closeCompletionButton);
    const popupScore = $(ids.popupScore);
    const popupMoney = $(ids.popupMoney);
    const completionText = $(ids.completionText);

    const PAIR_COUNT = 8;
    const MATCH_SCORE_BASE = 12;
    const MATCH_MONEY = 15000;

    const state = {
        isOpen: false,
        gameOver: false,
        score: 0,
        money: 0,
        combo: 0,
        matches: 0,
        timeLeft: 60,
        timer: null,
        cards: [],
        flipped: [],
        locked: false
    };


    function t(key, params) { return gamesT(`memory.${key}`, params); }

    function formatMoney(value) {
        return "Rp " + Number(value || 0).toLocaleString("id-ID");
    }


    /* ===== SCOREBOARD ===== */

    function updateScoreboard() {

        $(ids.scoreValue).textContent = state.score.toLocaleString("id-ID");
        $(ids.moneyValue).textContent = formatMoney(state.money);
        $(ids.comboValue).textContent = "x" + state.combo;
        $(ids.matchesValue).textContent = state.matches;
        $(ids.timerValue).textContent = state.timeLeft;

        $(ids.timerValue).style.color = state.timeLeft <= 10 ? "#ff5470" : "";

    }


    /* ===== MESSAGE ===== */

    let messageTimeout = null;

    function showMessage(key, params) {

        if (!gameMessage) return;

        gameMessage.textContent = t(key, params);
        gameMessage.classList.add("show");

        clearTimeout(messageTimeout);
        messageTimeout = setTimeout(() => {
            gameMessage.classList.remove("show");
        }, 1600);

    }


    /* ===== DECK HELPERS ===== */

    function shuffle(array) {

        const copy = [...array];

        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }

        return copy;

    }


    function buildDeck() {

        const chosen = shuffle(MEMBER_POOL).slice(0, PAIR_COUNT);

        const deck = [];

        chosen.forEach((member, pairId) => {
            deck.push({ pairId, member });
            deck.push({ pairId, member });
        });

        return shuffle(deck).map((card, cardId) => ({
            cardId,
            pairId: card.pairId,
            member: card.member,
            matched: false
        }));

    }


    /* ===== BOARD RENDER ===== */

    function getCardEl(cardId) {
        return board.querySelector(`[data-card-id="${cardId}"]`);
    }


    function renderBoard() {

        board.innerHTML = "";

        state.cards.forEach(card => {

            const cardEl = document.createElement("div");
            cardEl.className = "memory-card";
            cardEl.dataset.cardId = card.cardId;

            cardEl.innerHTML = `
                <div class="memory-card-inner">
                    <div class="memory-card-face memory-card-back">🎴</div>
                    <div class="memory-card-face memory-card-front">
                        <img src="${card.member.image}" alt="${card.member.name}" draggable="false">
                    </div>
                </div>
            `;

            const img = cardEl.querySelector("img");

            img.onerror = function() {
                img.onerror = null;
                img.src = DEFAULT_MEMBER_AVATAR;
            };

            cardEl.addEventListener("click", () => flipCard(card.cardId));

            board.appendChild(cardEl);

        });

    }


    /* ===== FLIP / MATCH LOGIC ===== */

    function flipCard(cardId) {

        if (!state.isOpen || state.gameOver) {
            showMessage("msg_open_first");
            return;
        }

        if (state.locked) return;

        const card = state.cards.find(c => c.cardId === cardId);

        if (!card || card.matched) return;
        if (state.flipped.includes(cardId)) return;
        if (state.flipped.length >= 2) return;

        const cardEl = getCardEl(cardId);
        cardEl.classList.add("flipped");
        state.flipped.push(cardId);

        if (state.flipped.length < 2) return;

        state.locked = true;

        const [firstId, secondId] = state.flipped;
        const first = state.cards.find(c => c.cardId === firstId);
        const second = state.cards.find(c => c.cardId === secondId);

        if (first.pairId === second.pairId) {

            first.matched = true;
            second.matched = true;

            state.combo += 1;
            state.matches += 1;

            const earned = MATCH_SCORE_BASE + state.combo * 4;

            state.score += earned;
            state.money += MATCH_MONEY;

            updateScoreboard();
            showMessage("msg_match_found");

            getCardEl(firstId).classList.add("matched");
            getCardEl(secondId).classList.add("matched");

            state.flipped = [];
            state.locked = false;

            if (state.cards.every(c => c.matched)) {
                setTimeout(() => startRound(), 700);
            }

        } else {

            state.combo = 0;
            updateScoreboard();
            showMessage("msg_mismatch");

            getCardEl(firstId).classList.add("mismatch");
            getCardEl(secondId).classList.add("mismatch");

            setTimeout(() => {

                getCardEl(firstId)?.classList.remove("flipped", "mismatch");
                getCardEl(secondId)?.classList.remove("flipped", "mismatch");

                state.flipped = [];
                state.locked = false;

            }, 900);

        }

    }


    /* ===== ROUND / TIMER / GAME LIFECYCLE ===== */

    function startRound() {

        state.cards = buildDeck();
        state.flipped = [];
        state.locked = false;

        renderBoard();

        if (state.matches > 0) showMessage("msg_new_round");

    }


    function startTimer() {

        clearInterval(state.timer);

        state.timer = setInterval(() => {

            if (!state.isOpen || state.gameOver) return;

            state.timeLeft--;
            updateScoreboard();

            if (state.timeLeft <= 0) endGame();

        }, 1000);

    }


    function endGame() {

        state.gameOver = true;
        state.isOpen = false;

        clearInterval(state.timer);

        completionText.textContent = t("completion_timeup_text", { score: state.score });
        popupScore.textContent = state.score;
        popupMoney.textContent = formatMoney(state.money);

        completionPopup.classList.add("show");

        openButton.textContent = t("btn_open_memory");

    }


    function startGame() {

        state.isOpen = true;
        state.gameOver = false;
        state.score = 0;
        state.money = 0;
        state.combo = 0;
        state.matches = 0;
        state.timeLeft = 60;

        updateScoreboard();
        startRound();

        startOverlay.classList.add("hidden");
        openButton.textContent = t("btn_open_memory_active");

        showMessage("msg_game_opened");

        startTimer();

    }


    function toggleGame() {

        if (state.isOpen) {

            state.isOpen = false;
            clearInterval(state.timer);

            openButton.textContent = t("btn_open_memory");

            showMessage("msg_game_closed");

            return;

        }

        startGame();

    }


    /* ===== EVENTS ===== */

    openButton.addEventListener("click", toggleGame);
    startGameButton.addEventListener("click", startGame);

    closeCompletionButton.addEventListener("click", () => {

        completionPopup.classList.remove("show");
        startOverlay.classList.remove("hidden");
        openButton.textContent = t("btn_open_memory");

    });


    /* ===== LANGUAGE REFRESH ===== */

    function refreshDynamicTexts() {

        openButton.textContent = state.isOpen
            ? t("btn_open_memory_active")
            : t("btn_open_memory");

    }


    /* ===== INITIAL RENDER ===== */

    updateScoreboard();


    return { refreshDynamicTexts };

}


/* =========================================================
   05c. TIMING GAME ENGINE (mekanik BEDA lagi — bukan prepare
   & serve, bukan flip & match, tapi precision-timing: jarum
   bergerak bolak-balik terus-menerus di sepanjang bar, dan
   pemain harus menekan tombol "NYALAKAN" tepat saat jarum
   berada di dalam zona hijau yang posisinya berpindah-pindah.
   Tidak ada "customer" atau "produk" di game ini — cuma satu
   loop animasi + satu tombol aksi.)
========================================================= */

function createTimingGame(ids) {

    const $ = id => document.getElementById(id);

    const openButton = $(ids.openButton);
    if (!openButton) return null;

    const startGameButton = $(ids.startGameButton);
    const startOverlay = $(ids.startOverlay);
    const barWrap = $(ids.barWrap);
    const track = $(ids.track);
    const zoneEl = $(ids.zone);
    const needleEl = $(ids.needle);
    const hitButton = $(ids.hitButton);
    const lanternRow = $(ids.lanternRow);
    const gameMessage = $(ids.gameMessage);
    const completionPopup = $(ids.completionPopup);
    const closeCompletionButton = $(ids.closeCompletionButton);
    const popupScore = $(ids.popupScore);
    const popupMoney = $(ids.popupMoney);
    const completionText = $(ids.completionText);

    const HIT_SCORE_BASE = 10;
    const HIT_MONEY = 12000;
    const LANTERN_SLOTS = 8;

    const BASE_SPEED = 55;     // % bar per detik
    const MAX_SPEED = 145;
    const SPEED_PER_LANTERN = 4;

    const BASE_ZONE_WIDTH = 24; // % lebar bar
    const MIN_ZONE_WIDTH = 9;
    const ZONE_SHRINK_PER_LANTERN = 0.8;

    const state = {
        isOpen: false,
        gameOver: false,
        score: 0,
        money: 0,
        combo: 0,
        lanterns: 0,
        timeLeft: 60,
        timer: null,
        rafId: null,
        lastFrameTime: null,
        needlePos: 0,
        direction: 1,
        zone: { left: 40, width: BASE_ZONE_WIDTH },
        flashTimeout: null
    };


    function t(key, params) { return gamesT(`timing.${key}`, params); }

    function formatMoney(value) {
        return "Rp " + Number(value || 0).toLocaleString("id-ID");
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    /* ===== SCOREBOARD ===== */

    function updateScoreboard() {

        $(ids.scoreValue).textContent = state.score.toLocaleString("id-ID");
        $(ids.moneyValue).textContent = formatMoney(state.money);
        $(ids.comboValue).textContent = "x" + state.combo;
        $(ids.lanternsValue).textContent = state.lanterns;
        $(ids.timerValue).textContent = state.timeLeft;

        $(ids.timerValue).style.color = state.timeLeft <= 10 ? "#ff5470" : "";

    }


    /* ===== MESSAGE ===== */

    let messageTimeout = null;

    function showMessage(key, params) {

        if (!gameMessage) return;

        gameMessage.textContent = t(key, params);
        gameMessage.classList.add("show");

        clearTimeout(messageTimeout);
        messageTimeout = setTimeout(() => {
            gameMessage.classList.remove("show");
        }, 1400);

    }


    /* ===== LANTERN ROW (decorative progress) ===== */

    function renderLanterns() {

        if (!lanternRow) return;

        lanternRow.innerHTML = "";

        const litCount = state.lanterns % LANTERN_SLOTS === 0 && state.lanterns > 0
            ? LANTERN_SLOTS
            : state.lanterns % LANTERN_SLOTS;

        for (let i = 0; i < LANTERN_SLOTS; i++) {

            const span = document.createElement("span");
            span.className = "timing-lantern" + (i < litCount ? " lit" : "");
            span.textContent = "🏮";

            lanternRow.appendChild(span);

        }

    }


    /* ===== ZONE ===== */

    function currentZoneWidth() {

        const width = BASE_ZONE_WIDTH - (state.lanterns * ZONE_SHRINK_PER_LANTERN);

        return Math.max(MIN_ZONE_WIDTH, width);

    }


    function currentSpeed() {

        const speed = BASE_SPEED + (state.lanterns * SPEED_PER_LANTERN);

        return Math.min(MAX_SPEED, speed);

    }


    function generateZone() {

        const width = currentZoneWidth();
        const left = randomInt(2, Math.max(2, 98 - width));

        state.zone = { left, width };

        zoneEl.style.left = left + "%";
        zoneEl.style.width = width + "%";

    }


    /* ===== NEEDLE ANIMATION LOOP ===== */

    function needleLoop(timestamp) {

        if (!state.isOpen || state.gameOver) return;

        if (state.lastFrameTime === null) state.lastFrameTime = timestamp;

        const deltaSeconds = (timestamp - state.lastFrameTime) / 1000;
        state.lastFrameTime = timestamp;

        const speed = currentSpeed();

        state.needlePos += state.direction * speed * deltaSeconds;

        if (state.needlePos >= 100) {
            state.needlePos = 100;
            state.direction = -1;
        } else if (state.needlePos <= 0) {
            state.needlePos = 0;
            state.direction = 1;
        }

        needleEl.style.left = state.needlePos + "%";

        state.rafId = requestAnimationFrame(needleLoop);

    }


    function startNeedle() {

        cancelAnimationFrame(state.rafId);
        state.lastFrameTime = null;
        state.rafId = requestAnimationFrame(needleLoop);

    }


    function stopNeedle() {

        cancelAnimationFrame(state.rafId);
        state.rafId = null;
        state.lastFrameTime = null;

    }


    /* ===== HIT LOGIC ===== */

    function flashTrack(className) {

        track.classList.remove("hit-success", "hit-miss");
        track.classList.add(className);

        clearTimeout(state.flashTimeout);
        state.flashTimeout = setTimeout(() => {
            track.classList.remove("hit-success", "hit-miss");
        }, 350);

    }


    function attemptHit() {

        if (!state.isOpen || state.gameOver) {
            showMessage("msg_open_first");
            return;
        }

        const withinZone =
            state.needlePos >= state.zone.left &&
            state.needlePos <= state.zone.left + state.zone.width;

        if (withinZone) {

            state.combo += 1;
            state.lanterns += 1;

            const earned = HIT_SCORE_BASE + state.combo * 3;

            state.score += earned;
            state.money += HIT_MONEY;

            updateScoreboard();
            renderLanterns();
            showMessage("msg_hit_success");
            flashTrack("hit-success");

            generateZone();

        } else {

            state.combo = 0;

            updateScoreboard();
            showMessage("msg_hit_miss");
            flashTrack("hit-miss");

            barWrap.classList.remove("miss-shake");
            void barWrap.offsetWidth;
            barWrap.classList.add("miss-shake");

        }

    }


    /* ===== TIMER / LIFECYCLE ===== */

    function startTimer() {

        clearInterval(state.timer);

        state.timer = setInterval(() => {

            if (!state.isOpen || state.gameOver) return;

            state.timeLeft--;
            updateScoreboard();

            if (state.timeLeft <= 0) endGame();

        }, 1000);

    }


    function endGame() {

        state.gameOver = true;
        state.isOpen = false;

        clearInterval(state.timer);
        stopNeedle();

        completionText.textContent = t("completion_timeup_text", { score: state.score });
        popupScore.textContent = state.score;
        popupMoney.textContent = formatMoney(state.money);

        completionPopup.classList.add("show");

        openButton.textContent = t("btn_open_timing");

    }


    function startGame() {

        state.isOpen = true;
        state.gameOver = false;
        state.score = 0;
        state.money = 0;
        state.combo = 0;
        state.lanterns = 0;
        state.timeLeft = 60;
        state.needlePos = 0;
        state.direction = 1;

        updateScoreboard();
        renderLanterns();
        generateZone();

        needleEl.style.left = "0%";
        track.classList.remove("hit-success", "hit-miss");

        startOverlay.classList.add("hidden");
        openButton.textContent = t("btn_open_timing_active");

        showMessage("msg_game_opened");

        startTimer();
        startNeedle();

    }


    function toggleGame() {

        if (state.isOpen) {

            state.isOpen = false;
            clearInterval(state.timer);
            stopNeedle();

            openButton.textContent = t("btn_open_timing");

            showMessage("msg_game_closed");

            return;

        }

        startGame();

    }


    /* ===== EVENTS ===== */

    openButton.addEventListener("click", toggleGame);
    startGameButton.addEventListener("click", startGame);
    hitButton.addEventListener("click", attemptHit);

    closeCompletionButton.addEventListener("click", () => {

        completionPopup.classList.remove("show");
        startOverlay.classList.remove("hidden");
        openButton.textContent = t("btn_open_timing");

    });


    /* ===== LANGUAGE REFRESH ===== */

    function refreshDynamicTexts() {

        openButton.textContent = state.isOpen
            ? t("btn_open_timing_active")
            : t("btn_open_timing");

    }


    /* ===== INITIAL RENDER ===== */

    updateScoreboard();
    renderLanterns();
    generateZone();


    return { refreshDynamicTexts };

}


/* =========================================================
   06. BOOTSTRAP — runs once the DOM is ready
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    document.documentElement.setAttribute("lang", getGamesLanguage());
    applyGamesTranslations();

    // activeButtonKey menentukan key "btn_open_<x>" / "btn_open_<x>_active"
    // di dalam namespace masing-masing. Untuk booth key-nya "open_booth",
    // untuk studio key-nya "open_studio". Memory & timing tidak pakai
    // activeButtonKey karena key-nya sudah tetap ("btn_open_memory" /
    // "btn_open_timing").

    const boothGame = createShopGame({
        namespace: "booth",
        products: BOOTH_PRODUCTS,
        ids: BOOTH_IDS,
        activeButtonKey: "open_booth"
    });

    const studioGame = createShopGame({
        namespace: "studio",
        products: STUDIO_PRODUCTS,
        ids: STUDIO_IDS,
        activeButtonKey: "open_studio"
    });

    const memoryGame = createMemoryGame(MEMORY_IDS);

    const timingGame = createTimingGame(TIMING_IDS);

    const activeGames = [boothGame, studioGame, memoryGame, timingGame].filter(Boolean);


    function refreshAll() {

        applyGamesTranslations();

        activeGames.forEach(game => game.refreshDynamicTexts());

    }


    function handleGamesLanguageChange(event) {

        const language = event?.detail?.language;

        if (language) {

            const normalized = normalizeGamesLanguage(language);

            localStorage.setItem("language", normalized);
            document.documentElement.setAttribute("lang", normalized);

        }

        refreshAll();

    }


    [
        "languageChanged",
        "languageChange",
        "langChanged",
        "galleryLanguageChanged",
        "boothLanguageChanged",
        "studioLanguageChanged",
        "memoryLanguageChanged",
        "timingLanguageChanged"
    ].forEach(eventName => {
        window.addEventListener(eventName, handleGamesLanguageChange);
    });


    window.addEventListener("storage", event => {

        if (["language", "selectedLanguage", "currentLanguage", "lang"].includes(event.key)) {
            refreshAll();
        }

    });


    /* ===== PUBLIC API (kompatibel dengan window.BoothI18n lama) ===== */

    window.GamesI18n = {

        translate: gamesT,
        apply: applyGamesTranslations,
        getLanguage: getGamesLanguage,

        setLanguage: function(language) {

            const normalized = normalizeGamesLanguage(language);

            localStorage.setItem("language", normalized);
            localStorage.setItem("selectedLanguage", normalized);
            document.documentElement.setAttribute("lang", normalized);

            refreshAll();

        }

    };

    // Alias supaya kode lama yang masih memanggil window.BoothI18n tetap jalan.
    window.BoothI18n = window.GamesI18n;

});