from flask import (
    Flask,
    render_template,
    request,
    jsonify,
    send_from_directory,
)

from dotenv import load_dotenv
from google import genai

import os
import re
import time
import unicodedata

from collections import defaultdict, deque
from datetime import datetime, timezone
from pathlib import Path

from supabase import create_client, Client


# =========================================================
# LOAD ENVIRONMENT
# =========================================================

BASE_DIR = Path(__file__).resolve().parent

load_dotenv(BASE_DIR / ".env")


# =========================================================
# FLASK
# =========================================================

app = Flask(__name__)

app.config.update(
    MAX_CONTENT_LENGTH=32 * 1024,
    JSON_SORT_KEYS=False,
)


# =========================================================
# ENVIRONMENT
# =========================================================

AI_RATE_LIMIT = int(
    os.getenv("AI_RATE_LIMIT", "8")
)

AI_RATE_WINDOW = int(
    os.getenv("AI_RATE_WINDOW", "60")
)

GUESTBOOK_RATE_LIMIT = int(
    os.getenv("GUESTBOOK_RATE_LIMIT", "5")
)

GUESTBOOK_RATE_WINDOW = int(
    os.getenv("GUESTBOOK_RATE_WINDOW", "60")
)

GENERIC_RATE_LIMIT = int(
    os.getenv("GENERIC_RATE_LIMIT", "20")
)

GENERIC_RATE_WINDOW = int(
    os.getenv("GENERIC_RATE_WINDOW", "60")
)

TRUST_PROXY_HEADERS = (
    os.getenv("TRUST_PROXY_HEADERS", "false").lower()
    in {"1", "true", "yes", "on"}
)


# =========================================================
# CONFIGURATION
# =========================================================

GEMINI_API_KEY = os.getenv(
    "GEMINI_API_KEY"
)

GEMINI_MODEL = os.getenv(
    "GEMINI_MODEL",
    "gemini-2.5-flash"
)

SUPABASE_URL = os.getenv(
    "SUPABASE_URL"
)

SUPABASE_SERVICE_ROLE_KEY = os.getenv(
    "SUPABASE_SERVICE_ROLE_KEY"
)


# =========================================================
# DEBUG
# =========================================================

FLASK_DEBUG = (
    os.getenv("FLASK_DEBUG", "false").lower()
    in {"1", "true", "yes", "on"}
)


# =========================================================
# CONFIG CHECK
# =========================================================

print("\n========================================")
print("CONFIG CHECK")
print("========================================")

print(
    "SUPABASE_URL:",
    "LOADED" if SUPABASE_URL else "MISSING"
)

print(
    "SUPABASE_SERVICE_ROLE_KEY:",
    "LOADED" if SUPABASE_SERVICE_ROLE_KEY else "MISSING"
)

print(
    "GEMINI_API_KEY:",
    "LOADED" if GEMINI_API_KEY else "MISSING"
)

print(
    "GEMINI_MODEL:",
    GEMINI_MODEL
)

print(
    "TRUST_PROXY_HEADERS:",
    TRUST_PROXY_HEADERS
)

print(
    "FLASK_DEBUG:",
    FLASK_DEBUG
)

print("========================================\n")


# =========================================================
# LIMITS
# =========================================================

MAX_PROMPT_LENGTH = 1000
MAX_SOURCE_TEXT_LENGTH = 5000
MAX_CONTEXT_LENGTH = 1000

MAX_NAME_LENGTH = 50
MAX_GUESTBOOK_MESSAGE_LENGTH = 1000

MAX_MEMBER_TYPE_LENGTH = 30
MAX_MOOD_LENGTH = 20
MAX_EMAIL_LENGTH = 150
MAX_FAVORITE_MEMORY_LENGTH = 500
MAX_BACKGROUND_STYLE_LENGTH = 50
MAX_FONT_STYLE_LENGTH = 50
MAX_STICKER_LENGTH = 100
MAX_MUSIC_REACTION_LENGTH = 100
MAX_COLOR_THEME_LENGTH = 50

MAX_BROWSER_LENGTH = 300
MAX_USER_AGENT_LENGTH = 500
MAX_COUNTRY_LENGTH = 10
MAX_IP_LENGTH = 100


# =========================================================
# CLIENTS
# =========================================================

gemini_client = None
supabase_client: Client | None = None


# =========================================================
# GEMINI INITIALIZATION
# =========================================================

if GEMINI_API_KEY:

    try:

        gemini_client = genai.Client(
            api_key=GEMINI_API_KEY
        )

        print("========================================")
        print("Gemini initialized successfully")
        print("MODEL:", GEMINI_MODEL)
        print("========================================")

    except Exception as e:

        print("========================================")
        print("FAILED TO INITIALIZE GEMINI")
        print("TYPE:", type(e).__name__)
        print("MESSAGE:", str(e))
        print("========================================")

else:

    print("WARNING: GEMINI_API_KEY is missing.")


# =========================================================
# SUPABASE INITIALIZATION
# =========================================================

if (
    SUPABASE_URL
    and SUPABASE_SERVICE_ROLE_KEY
):

    try:

        supabase_client = create_client(
            SUPABASE_URL,
            SUPABASE_SERVICE_ROLE_KEY
        )

        print("========================================")
        print("Supabase initialized successfully")
        print("========================================")

    except Exception as e:

        print("========================================")
        print("FAILED TO INITIALIZE SUPABASE")
        print("TYPE:", type(e).__name__)
        print("MESSAGE:", str(e))
        print("========================================")

else:

    print("========================================")
    print("WARNING: SUPABASE configuration missing")
    print("Required:")
    print("SUPABASE_URL")
    print("SUPABASE_SERVICE_ROLE_KEY")
    print("========================================")


# =========================================================
# MESSAGES
# =========================================================

MODERATION_MESSAGE = (
    "Maaf, pesan tersebut tidak dapat digunakan. "
    "Platform ini dibuat untuk merayakan Nayla dengan suasana "
    "yang positif, hangat, dan menyenangkan. 🌸 "
    "Silakan gunakan kata-kata yang sopan, baik, dan penuh dukungan."
)

EMPTY_MESSAGE = (
    "Please write a message first."
)

NAME_TOO_LONG_MESSAGE = (
    "Name is too long."
)

MESSAGE_TOO_LONG_MESSAGE = (
    "Your message is too long."
)


# =========================================================
# LANGUAGE DETECTION
# =========================================================

def detect_language(text):

    if not text:
        return "English"

    text = str(text).strip()

    if not text:
        return "English"

    text_lower = text.lower()

    # =====================================================
    # JAPANESE SCRIPT
    # =====================================================

    hiragana = re.findall(
        r"[\u3040-\u309F]",
        text
    )

    katakana = re.findall(
        r"[\u30A0-\u30FF]",
        text
    )

    japanese_kana_count = (
        len(hiragana)
        + len(katakana)
    )

    if japanese_kana_count >= 2:
        return "Japanese"

    # =====================================================
    # JAPANESE EXPRESSIONS
    # =====================================================

    japanese_particles = [
        "です",
        "ます",
        "でした",
        "ますね",
        "から",
        "まで",
        "そして",
        "これから",
        "ありがとう",
        "おめでとう",
        "ください",
        "ございます",
        "ちゃん",
        "さん",
        "ように",
        "と思います",
        "頑張って",
        "応援しています",
    ]

    japanese_particle_score = sum(
        1
        for particle in japanese_particles
        if particle in text
    )

    if japanese_particle_score >= 1:
        return "Japanese"

    # =====================================================
    # WORD DICTIONARIES
    # =====================================================

    indonesian_words = {
        "aku",
        "saya",
        "kami",
        "kita",
        "kamu",
        "anda",
        "dia",
        "untuk",
        "dengan",
        "dari",
        "kepada",
        "dan",
        "yang",
        "ini",
        "itu",
        "adalah",
        "akan",
        "telah",
        "sudah",
        "juga",
        "sangat",
        "lebih",
        "semoga",
        "selamat",
        "ulang",
        "tahun",
        "terima",
        "kasih",
        "membuat",
        "buatkan",
        "pesan",
        "ucapan",
        "doa",
        "harapan",
        "bahagia",
        "kebahagiaan",
        "sukses",
        "kedepannya",
        "kehidupan",
        "dewasa",
        "tumbuh",
        "perjalanan",
        "masa",
        "depan",
        "dukungan",
        "selalu",
        "tetap",
        "menjadi",
        "bangga",
        "senang",
        "cinta",
        "kenangan",
        "impian",
        "mimpi",
        "semangat",
        "perasaan",
        "ingin",
        "berharap",
        "untukmu",
        "dirimu",
        "bersama",
        "member",
        "perayaan",
        "merayakan",
        "ulangtahun",
        "mendoakan",
    }

    english_words = {
        "i",
        "me",
        "my",
        "we",
        "our",
        "you",
        "your",
        "yours",
        "for",
        "with",
        "from",
        "to",
        "and",
        "the",
        "this",
        "that",
        "is",
        "are",
        "was",
        "were",
        "will",
        "would",
        "can",
        "always",
        "wish",
        "wishes",
        "birthday",
        "happy",
        "thank",
        "thanks",
        "thankful",
        "hope",
        "happiness",
        "future",
        "dream",
        "dreams",
        "message",
        "write",
        "create",
        "congratulations",
        "congratulate",
        "adult",
        "adulthood",
        "growth",
        "journey",
        "life",
        "support",
        "memories",
        "memory",
        "proud",
        "joy",
        "love",
        "beautiful",
        "wonderful",
        "special",
        "everyone",
        "someone",
        "become",
        "becoming",
        "celebrate",
        "celebration",
        "fan",
        "member",
    }

    words = re.findall(
        r"\b[a-zA-ZÀ-ÿ]+\b",
        text_lower
    )

    if not words:
        return "English"

    indonesian_score = sum(
        1
        for word in words
        if word in indonesian_words
    )

    english_score = sum(
        1
        for word in words
        if word in english_words
    )

    # =====================================================
    # PATTERNS
    # =====================================================

    indonesian_patterns = [
        r"\bsemoga\b",
        r"\bterima\s+kasih\b",
        r"\bselamat\b",
        r"\bulang\s+tahun\b",
        r"\baku\b",
        r"\bsaya\b",
        r"\bkamu\b",
        r"\buntuk\b",
        r"\bdengan\b",
        r"\byang\b",
        r"\bdan\b",
        r"\bmasa\s+depan\b",
        r"\bke\s+depannya\b",
        r"\bterus\s+semangat\b",
        r"\bselalu\s+bahagia\b",
    ]

    english_patterns = [
        r"\bhappy\s+birthday\b",
        r"\bthank\s+you\b",
        r"\bi\s+hope\b",
        r"\bi\s+wish\b",
        r"\byou\s+are\b",
        r"\byou're\b",
        r"\bfor\s+you\b",
        r"\bin\s+the\s+future\b",
        r"\bkeep\s+going\b",
        r"\bcongratulations\b",
    ]

    for pattern in indonesian_patterns:

        if re.search(
            pattern,
            text_lower
        ):
            indonesian_score += 2

    for pattern in english_patterns:

        if re.search(
            pattern,
            text_lower
        ):
            english_score += 2

    if indonesian_score > english_score:
        return "Indonesian"

    if english_score > indonesian_score:
        return "English"

    return "English"


# =========================================================
# MODERATION NORMALIZER
# =========================================================

def normalize_text_for_moderation(text):

    if not text:
        return ""

    text = unicodedata.normalize(
        "NFKC",
        str(text)
    )

    text = text.lower()

    zero_width_chars = [
        "\u200b",
        "\u200c",
        "\u200d",
        "\ufeff",
        "\u2060",
        "\u180e",
    ]

    for char in zero_width_chars:

        text = text.replace(
            char,
            ""
        )

    translation_table = str.maketrans({
        "@": "a",
        "4": "a",
        "3": "e",
        "1": "i",
        "!": "i",
        "0": "o",
        "$": "s",
        "5": "s",
        "7": "t",
    })

    text = text.translate(
        translation_table
    )

    text = "".join(
        char
        for char in unicodedata.normalize(
            "NFKD",
            text
        )
        if not unicodedata.combining(char)
    )

    text = re.sub(
        r"[^\w\s]",
        " ",
        text,
        flags=re.UNICODE
    )

    text = re.sub(
        r"\s+",
        " ",
        text
    ).strip()

    return text


# =========================================================
# BLOCKED CONTENT
# =========================================================

BLOCKED_WORDS = {

    "anjing",
    "kontol",
    "memek",
    "ngentot",
    "entot",
    "jancuk",
    "jancok",
    "bangsat",
    "bajingan",
    "brengsek",
    "tahi",
    "kampret",
    "keparat",
    "perek",
    "lonte",
    "pelacur",
    "sange",
    "bokep",
    "coli",
    "colmek",
    "ngocok",
    "burit",
    "itil",
    "titit",
    "pepek",
    "toket",

    "bodoh",
    "tolol",
    "goblok",
    "bego",
    "idiot",
    "dungu",
    "bloon",
    "sinting",
    "gila",
    "kampungan",
    "norak",
    "payah",
    "sampah",
    "pecundang",
    "hina",
    "menjijikkan",
    "jelek",
    "buruk",

    "fuck",
    "fucking",
    "fucked",
    "shit",
    "bullshit",
    "asshole",
    "bitch",
    "bastard",
    "dick",
    "cock",
    "pussy",
    "cunt",
    "motherfucker",
    "wtf",
    "stfu",

    "stupid",
    "idiot",
    "dumb",
    "ugly",
    "loser",
    "pathetic",
    "worthless",
    "disgusting",
    "useless",

    "ばか",
    "バカ",
    "馬鹿",
    "あほ",
    "アホ",
    "死ね",
    "しね",
    "くそ",
    "クソ",
    "うざい",
    "ウザい",
    "きもい",
    "キモい",
    "きしょい",
    "キショい",
    "ブス",
    "ぶす",
    "最低",
    "黙れ",
    "だまれ",
}


BLOCKED_PHRASES = [

    "tidak berguna",
    "nggak berguna",
    "gak berguna",
    "tidak pantas",
    "tidak layak",
    "dasar bodoh",
    "dasar tolol",
    "dasar goblok",
    "dasar jelek",
    "perempuan murahan",
    "cewek murahan",
    "orang bodoh",
    "orang tolol",
    "member bodoh",

    "you are stupid",
    "you're stupid",
    "you are ugly",
    "you're ugly",
    "you are useless",
    "you're useless",
    "you are pathetic",
    "you're pathetic",
    "you are disgusting",
    "you're disgusting",
    "you are worthless",
    "you're worthless",
    "shut up",
    "go away",

    "死んで",
    "死ねばいい",
    "消えろ",
    "黙ってろ",
]


# =========================================================
# FLEXIBLE REGEX
# =========================================================

def build_flexible_pattern(term):

    chars = []

    for char in term:

        if char.isspace():

            chars.append(
                r"\s+"
            )

        else:

            chars.append(
                re.escape(char)
                + r"[\s._\-*]*"
            )

    return (
        r"(?<!\w)"
        + "".join(chars)
        + r"(?!\w)"
    )


BLOCKED_PATTERNS = [
    re.compile(
        build_flexible_pattern(term),
        re.IGNORECASE
    )
    for term in BLOCKED_WORDS
]


BLOCKED_PHRASE_PATTERNS = [
    re.compile(
        build_flexible_pattern(term),
        re.IGNORECASE
    )
    for term in BLOCKED_PHRASES
]


# =========================================================
# MODERATION CHECK
# =========================================================

def contains_blocked_content(text):

    if not text:
        return False

    normalized = normalize_text_for_moderation(
        text
    )

    for pattern in BLOCKED_PATTERNS:

        if pattern.search(normalized):
            return True

    for pattern in BLOCKED_PHRASE_PATTERNS:

        if pattern.search(normalized):
            return True

    return False


# =========================================================
# MODERATION RESPONSE
# =========================================================

def moderation_rejection():

    return jsonify({
        "success": False,
        "blocked": True,
        "error": MODERATION_MESSAGE,
    }), 400


# =========================================================
# RATE LIMIT
# =========================================================

_request_history = defaultdict(deque)
_guestbook_history = defaultdict(deque)
_ai_history = defaultdict(deque)


def get_client_ip():

    if TRUST_PROXY_HEADERS:

        forwarded_for = request.headers.get(
            "X-Forwarded-For"
        )

        if forwarded_for:

            first_ip = (
                forwarded_for
                .split(",")[0]
                .strip()
            )

            if first_ip:
                return first_ip[:MAX_IP_LENGTH]

        real_ip = request.headers.get(
            "X-Real-IP"
        )

        if real_ip:
            return real_ip[:MAX_IP_LENGTH]

    return (
        request.remote_addr
        or "unknown"
    )[:MAX_IP_LENGTH]


def check_rate_limit(
    storage,
    limit,
    window
):

    ip = get_client_ip()
    now = time.time()

    history = storage[ip]

    while history and (
        now - history[0] > window
    ):
        history.popleft()

    if len(history) >= limit:
        return True

    history.append(now)

    return False


def is_rate_limited():

    return check_rate_limit(
        _request_history,
        GENERIC_RATE_LIMIT,
        GENERIC_RATE_WINDOW
    )


def is_guestbook_rate_limited():

    return check_rate_limit(
        _guestbook_history,
        GUESTBOOK_RATE_LIMIT,
        GUESTBOOK_RATE_WINDOW
    )


def is_ai_rate_limited():

    return check_rate_limit(
        _ai_history,
        AI_RATE_LIMIT,
        AI_RATE_WINDOW
    )


def rate_limit_response():

    return jsonify({
        "success": False,
        "error": (
            "Too many requests. "
            "Please wait a moment and try again."
        ),
    }), 429


# =========================================================
# HELPERS
# =========================================================

def safe_string(
    value,
    default=""
):

    if value is None:
        return default

    return str(value).strip()


def limit_string(
    value,
    maximum,
    default=""
):

    value = safe_string(
        value,
        default
    )

    if len(value) > maximum:
        return default

    return value


def clean_generated_text(text):

    if not text:
        return ""

    text = str(text).strip()

    if (
        len(text) >= 2
        and text[0] == '"'
        and text[-1] == '"'
    ):

        text = text[1:-1].strip()

    return text


def require_supabase():

    if supabase_client is None:

        return jsonify({
            "success": False,
            "error": (
                "Supabase is not configured "
                "on the server."
            ),
        }), 500

    return None


# =========================================================
# SECURITY HEADERS
# =========================================================

@app.after_request
def add_security_headers(response):

    response.headers[
        "X-Content-Type-Options"
    ] = "nosniff"

    response.headers[
        "X-Frame-Options"
    ] = "SAMEORIGIN"

    response.headers[
        "Referrer-Policy"
    ] = "strict-origin-when-cross-origin"

    response.headers[
        "Permissions-Policy"
    ] = (
        "camera=(self), "
        "microphone=(), "
        "geolocation=()"
    )

    response.headers[
        "Cache-Control"
    ] = "no-store"

    return response


# =========================================================
# PAGES
# =========================================================

@app.route("/")
def home():
    return render_template("home.html")


@app.route("/gallery")
def gallery():
    return render_template("gallery.html")


@app.route("/guestbook")
def guestbook():
    return render_template("guestbook.html")


@app.route("/ai")
def ai():
    return render_template("ai.html")


@app.route("/photobooth")
def photobooth():
    return render_template("photobooth.html")


@app.route("/games")
def games():
    return render_template("games.html")


@app.route("/secret-letter")
def secret_letter():
    return render_template("secret-letter.html")


# # =========================================================
# # FAVICON
# # =========================================================

@app.route("/favicon.ico")
def favicon():

    static_folder = app.static_folder

    if static_folder:

        favicon_path = os.path.join(
            static_folder,
            "favicon.ico"
        )

        if os.path.isfile(
            favicon_path
        ):

            return send_from_directory(
                static_folder,
                "favicon.ico"
            )

    return "", 204


# =========================================================
# GET GUESTBOOK
# =========================================================

@app.route(
    "/api/guestbook",
    methods=["GET"]
)
def get_guestbook():

    if is_rate_limited():
        return rate_limit_response()

    supabase_error = require_supabase()

    if supabase_error:
        return supabase_error

    try:

        response = (
            supabase_client
            .table("guestbook")
            .select("*")
            .limit(500)
            .execute()
        )

        wishes = response.data or []

        def get_sort_date(item):

            return str(
                item.get("created_at")
                or item.get("created_date")
                or item.get("updated_at")
                or ""
            )

        wishes.sort(
            key=get_sort_date,
            reverse=True
        )

        print("========================================")
        print("GUESTBOOK GET SUCCESS")
        print("TOTAL:", len(wishes))
        print("========================================")

        return jsonify({
            "success": True,
            "wishes": wishes,
        }), 200

    except Exception as e:

        print("========================================")
        print("GUESTBOOK GET ERROR")
        print("TYPE:", type(e).__name__)
        print("MESSAGE:", str(e))
        print("========================================")

        return jsonify({
            "success": False,
            "error": "Unable to load guestbook.",
        }), 500

# =========================================================
# SEIJIN SHIKI - CEREMONY ENTRY
# =========================================================

@app.route("/api/ceremony-entry", methods=["POST"])
def ceremony_entry():

    try:

        # =================================================
        # CHECK SUPABASE
        # =================================================

        if supabase_client is None:

            print(
                "CEREMONY ENTRY ERROR: "
                "supabase_client is None"
            )

            return jsonify({
                "success": False,
                "error": "Supabase client is not initialized."
            }), 500


        # =================================================
        # GET USER AGENT
        # =================================================

        user_agent = request.headers.get(
            "User-Agent",
            ""
        )

        user_agent = user_agent[:500]


        # =================================================
        # GET IP
        # =================================================

        ip_address = get_client_ip()

        ip_address = str(ip_address)[:100]


        # =================================================
        # DETECT BROWSER
        # =================================================

        ua = user_agent.lower()


        if "edg/" in ua:

            browser = "Microsoft Edge"

        elif "opr/" in ua or "opera" in ua:

            browser = "Opera"

        elif "firefox/" in ua:

            browser = "Mozilla Firefox"

        elif "chrome/" in ua:

            browser = "Google Chrome"

        elif "safari/" in ua:

            browser = "Safari"

        elif "trident/" in ua:

            browser = "Internet Explorer"

        else:

            browser = "Unknown"


        # =================================================
        # DETECT DEVICE
        # =================================================

        if "ipad" in ua:

            device = "iPad"

        elif "iphone" in ua:

            device = "iPhone"

        elif "android" in ua:

            if "mobile" in ua:

                device = "Android Phone"

            else:

                device = "Android Tablet"

        elif "windows" in ua:

            device = "Windows PC"

        elif (
            "macintosh" in ua
            or "mac os x" in ua
        ):

            device = "Mac"

        elif "linux" in ua:

            device = "Linux PC"

        else:

            device = "Unknown"


        # =================================================
        # TIME
        # =================================================

        entered_at = datetime.now(
            timezone.utc
        ).isoformat()


        # =================================================
        # DATA
        # =================================================

        entry_data = {

            "event": "Enter Ceremony",

            "ip_address": ip_address,

            "device": device,

            "browser": browser,

            "user_agent": user_agent,

            "entered_at": entered_at

        }


        # =================================================
        # DEBUG
        # =================================================

        print("")
        print("========================================")
        print("CEREMONY ENTRY")
        print("========================================")
        print("IP       :", ip_address)
        print("DEVICE   :", device)
        print("BROWSER  :", browser)
        print("USER AGENT:", user_agent)
        print("========================================")


        # =================================================
        # INSERT SUPABASE
        # =================================================

        result = (
            supabase_client
            .table("ceremony_entries")
            .insert(entry_data)
            .execute()
        )


        # =================================================
        # SUCCESS
        # =================================================

        print(
            "CEREMONY ENTRY SAVED:",
            result.data
        )


        return jsonify({

            "success": True,

            "message":
                "Ceremony entry saved."

        }), 200


    except Exception as e:

        # =================================================
        # PRINT ERROR ASLI
        # =================================================

        print("")
        print("========================================")
        print("!!! CEREMONY ENTRY ERROR !!!")
        print("========================================")
        print("ERROR TYPE:")
        print(type(e).__name__)
        print("")
        print("ERROR MESSAGE:")
        print(str(e))
        print("========================================")
        print("")


        return jsonify({

            "success": False,

            "error":
                str(e)

        }), 500

# =========================================================
# POST GUESTBOOK
# =========================================================

@app.route(
    "/api/guestbook",
    methods=["POST"]
)
def create_guestbook():

    if is_guestbook_rate_limited():
        return rate_limit_response()

    supabase_error = require_supabase()

    if supabase_error:
        return supabase_error

    try:

        data = request.get_json(
            silent=True
        )

        if not isinstance(data, dict):

            return jsonify({
                "success": False,
                "error": "No data received.",
            }), 400

        # =================================================
        # BASIC
        # =================================================

        name = safe_string(
            data.get("name")
        )

        message = safe_string(
            data.get("message")
        )

        member_type = safe_string(
            data.get(
                "member_type",
                "Fan"
            ),
            "Fan"
        )

        mood = safe_string(
            data.get(
                "mood",
                "🌸"
            ),
            "🌸"
        )

        submission_mode = safe_string(
            data.get(
                "submission_mode",
                "manual"
            ),
            "manual"
        ).lower()

        if submission_mode not in {
            "manual",
            "ai"
        }:
            submission_mode = "manual"

        # =================================================
        # OPTIONAL
        # =================================================

        email = safe_string(
            data.get("email")
        )

        favorite_memory = safe_string(
            data.get("favorite_memory")
        )

        background_style = safe_string(
            data.get(
                "background_style",
                "wood"
            ),
            "wood"
        )

        font_style = safe_string(
            data.get(
                "font_style",
                "default"
            ),
            "default"
        )

        sticker = safe_string(
            data.get("sticker")
        )

        music_reaction = safe_string(
            data.get("music_reaction")
        )

        color_theme = safe_string(
            data.get("color_theme")
        )

        visibility = safe_string(
            data.get(
                "visibility",
                "public"
            ),
            "public"
        ).lower()

        # =================================================
        # VALIDATION
        # =================================================

        if not name:

            return jsonify({
                "success": False,
                "error": "Please enter your name.",
            }), 400

        if not message:

            return jsonify({
                "success": False,
                "error": EMPTY_MESSAGE,
            }), 400

        if len(name) > MAX_NAME_LENGTH:

            return jsonify({
                "success": False,
                "error": NAME_TOO_LONG_MESSAGE,
            }), 400

        if len(message) > MAX_GUESTBOOK_MESSAGE_LENGTH:

            return jsonify({
                "success": False,
                "error": (
                    f"{MESSAGE_TOO_LONG_MESSAGE} "
                    f"Please keep it under "
                    f"{MAX_GUESTBOOK_MESSAGE_LENGTH} "
                    f"characters."
                ),
            }), 400

        # =================================================
        # MODERATION
        # =================================================

        if contains_blocked_content(name):

            print("GUESTBOOK BLOCKED: NAME")

            return moderation_rejection()

        if contains_blocked_content(message):

            print("GUESTBOOK BLOCKED: MESSAGE")

            return moderation_rejection()

        # =================================================
        # SANITIZE
        # =================================================

        member_type = limit_string(
            member_type,
            MAX_MEMBER_TYPE_LENGTH,
            "Fan"
        )

        mood = limit_string(
            mood,
            MAX_MOOD_LENGTH,
            "🌸"
        )

        email = limit_string(
            email,
            MAX_EMAIL_LENGTH
        )

        favorite_memory = limit_string(
            favorite_memory,
            MAX_FAVORITE_MEMORY_LENGTH
        )

        background_style = limit_string(
            background_style,
            MAX_BACKGROUND_STYLE_LENGTH,
            "wood"
        )

        font_style = limit_string(
            font_style,
            MAX_FONT_STYLE_LENGTH,
            "default"
        )

        sticker = limit_string(
            sticker,
            MAX_STICKER_LENGTH
        )

        music_reaction = limit_string(
            music_reaction,
            MAX_MUSIC_REACTION_LENGTH
        )

        color_theme = limit_string(
            color_theme,
            MAX_COLOR_THEME_LENGTH
        )

        if visibility not in {
            "public",
            "private"
        }:
            visibility = "public"

        # =================================================
        # REQUEST METADATA
        # =================================================

        user_agent = (
            request.headers.get(
                "User-Agent",
                ""
            )
            .strip()
            [:MAX_USER_AGENT_LENGTH]
        )

        browser = (
            request.headers.get(
                "Sec-CH-UA",
                ""
            )
            .strip()
            [:MAX_BROWSER_LENGTH]
        )

        country = (
            request.headers.get(
                "CF-IPCountry",
                ""
            )
            .strip()
            [:MAX_COUNTRY_LENGTH]
        )

        ip_address = get_client_ip()

        # =================================================
        # DATE
        # =================================================

        now_utc = datetime.now(
            timezone.utc
        )

        created_date = (
            now_utc.date().isoformat()
        )

        updated_at = (
            now_utc.isoformat()
        )

        # =================================================
        # INSERT
        # =================================================

        insert_data = {

            "name": name,

            "message": message,

            "member_type": member_type,

            "mood": mood,

            "submission_mode": submission_mode,

            "email": email or None,

            "favorite_memory":
                favorite_memory or None,

            "background_style":
                background_style,

            "font_style":
                font_style,

            "sticker":
                sticker or None,

            "music_reaction":
                music_reaction or None,

            "color_theme":
                color_theme or None,

            "visibility":
                visibility,

            "browser":
                browser or None,

            "device":
                user_agent or None,

            "country":
                country or None,

            "ip_address":
                ip_address,

            "created_date":
                created_date,

            "updated_at":
                updated_at,
        }

        print("========================================")
        print("GUESTBOOK INSERT")
        print("NAME:", name)
        print("MODE:", submission_mode)
        print("MESSAGE LENGTH:", len(message))
        print("MODERATION: PASSED")
        print("========================================")

        insert_response = (
            supabase_client
            .table("guestbook")
            .insert(insert_data)
            .execute()
        )

        inserted_rows = (
            insert_response.data or []
        )

        if not inserted_rows:

            print("========================================")
            print("GUESTBOOK INSERT FAILED")
            print("Supabase returned no row")
            print("========================================")

            return jsonify({
                "success": False,
                "error": "Failed to save your wish.",
            }), 500

        wish = inserted_rows[0]

        print("========================================")
        print("GUESTBOOK INSERT SUCCESS")
        print("ROW ID:", wish.get("id"))
        print("========================================")

        return jsonify({
            "success": True,
            "blocked": False,
            "message": (
                "Your wish has been added "
                "to the guestbook. 🌸"
            ),
            "wish": wish,
        }), 201

    except Exception as e:

        print("========================================")
        print("GUESTBOOK INSERT ERROR")
        print("TYPE:", type(e).__name__)
        print("MESSAGE:", str(e))
        print("========================================")

        return jsonify({
            "success": False,
            "error": (
                "Unable to save your wish. "
                "Please try again later."
            ),
        }), 500


# =========================================================
# GUESTBOOK VALIDATE
# =========================================================

@app.route(
    "/api/guestbook/validate",
    methods=["POST"]
)
def validate_guestbook():

    if is_guestbook_rate_limited():
        return rate_limit_response()

    try:

        data = request.get_json(
            silent=True
        )

        if not isinstance(data, dict):

            return jsonify({
                "success": False,
                "error": "No data received.",
            }), 400

        name = safe_string(
            data.get("name")
        )

        message = safe_string(
            data.get("message")
        )

        if not name:

            return jsonify({
                "success": False,
                "error": "Please enter your name.",
            }), 400

        if not message:

            return jsonify({
                "success": False,
                "error": EMPTY_MESSAGE,
            }), 400

        if len(name) > MAX_NAME_LENGTH:

            return jsonify({
                "success": False,
                "error": NAME_TOO_LONG_MESSAGE,
            }), 400

        if len(message) > MAX_GUESTBOOK_MESSAGE_LENGTH:

            return jsonify({
                "success": False,
                "error": (
                    f"{MESSAGE_TOO_LONG_MESSAGE} "
                    f"Please keep it under "
                    f"{MAX_GUESTBOOK_MESSAGE_LENGTH} "
                    f"characters."
                ),
            }), 400

        if contains_blocked_content(name):
            return moderation_rejection()

        if contains_blocked_content(message):
            return moderation_rejection()

        return jsonify({
            "success": True,
            "blocked": False,
            "message": (
                "Guestbook message passed validation."
            ),
        }), 200

    except Exception as e:

        print("========================================")
        print("GUESTBOOK VALIDATION ERROR")
        print("TYPE:", type(e).__name__)
        print("MESSAGE:", str(e))
        print("========================================")

        return jsonify({
            "success": False,
            "error": (
                "Unable to validate the message. "
                "Please try again."
            ),
        }), 500


@app.route(
    "/api/guestbook/check",
    methods=["POST"]
)
def check_guestbook():

    return validate_guestbook()


# =========================================================
# AI CONFIG
# =========================================================

PERSONALIZE_ACTIONS = {
    "heartfelt",
    "cute",
    "elegant",
    "casual",
    "emotional",
    "shorter",
    "longer",
}


PERSONALIZE_INSTRUCTIONS = {

    "heartfelt": """
Make the message more heartfelt.

Increase sincerity and emotional warmth,
but do not exaggerate the emotion.

Keep the original meaning and important details.
""",

    "cute": """
Make the message sweeter, gentler and slightly cute.

Keep it wholesome, natural and respectful.

Do not make it childish or overly exaggerated.
""",

    "elegant": """
Make the message more elegant and polished.

Use graceful and mature wording.

Keep the message natural rather than overly formal.
""",

    "casual": """
Make the message more casual and natural.

It should sound like a genuine fan speaking naturally,
not like a formal letter.

Preserve the original meaning.
""",

    "emotional": """
Make the message more emotionally meaningful.

Increase warmth and sincerity without becoming dramatic.

Do not invent memories or facts.
""",

    "shorter": """
Make the message shorter.

Preserve the most important meaning,
emotion and wishes.

Remove repetition and unnecessary wording.
""",

    "longer": """
Make the message moderately longer.

Expand the emotional expression naturally.

Do not invent memories, events, achievements,
relationships or personal information.
""",
}


# =========================================================
# AI GENERATE
# =========================================================

@app.route(
    "/api/ai/generate",
    methods=["POST"]
)
def generate_ai():

    if is_ai_rate_limited():
        return rate_limit_response()

    if gemini_client is None:

        return jsonify({
            "success": False,
            "error": (
                "Gemini API is not configured. "
                "Please check your GEMINI_API_KEY."
            ),
        }), 500

    try:

        data = request.get_json(
            silent=True
        )

        if not isinstance(data, dict):

            return jsonify({
                "success": False,
                "error": "No data received.",
            }), 400

        # =================================================
        # INPUT
        # =================================================

        mode = safe_string(
            data.get(
                "mode",
                "wish"
            ),
            "wish"
        ).lower()

        name = safe_string(
            data.get("name")
        )

        user_prompt = safe_string(
            data.get("prompt")
        )

        style = safe_string(
            data.get(
                "style",
                "heartfelt"
            ),
            "heartfelt"
        ).lower()

        source_text = safe_string(
            data.get("source_text")
        )

        personalize_action = safe_string(
            data.get(
                "personalize_action",
                ""
            )
        ).lower()

        context = safe_string(
            data.get("context")
        )

        # =================================================
        # MODE
        # =================================================

        allowed_modes = {
            "wish",
            "enhance",
            "fortune",
            "letter",
            "personalize",
        }

        if mode not in allowed_modes:
            mode = "wish"

        # =================================================
        # STYLE
        # =================================================

        allowed_styles = {
            "heartfelt",
            "sweet",
            "elegant",
            "simple",
            "poetic",
        }

        if style not in allowed_styles:
            style = "heartfelt"

        # =================================================
        # VALIDATION
        # =================================================

        if mode != "personalize" and not user_prompt:

            return jsonify({
                "success": False,
                "error": (
                    "Please write something first."
                ),
            }), 400

        if user_prompt and len(user_prompt) > MAX_PROMPT_LENGTH:

            return jsonify({
                "success": False,
                "error": (
                    "Your message is too long. "
                    f"Please keep it under "
                    f"{MAX_PROMPT_LENGTH} characters."
                ),
            }), 400

        if len(name) > MAX_NAME_LENGTH:

            return jsonify({
                "success": False,
                "error": NAME_TOO_LONG_MESSAGE,
            }), 400

        # =================================================
        # PERSONALIZE
        # =================================================

        if mode == "personalize":

            if not source_text:

                return jsonify({
                    "success": False,
                    "error": (
                        "Please generate a message first."
                    ),
                }), 400

            if len(source_text) > MAX_SOURCE_TEXT_LENGTH:

                return jsonify({
                    "success": False,
                    "error": (
                        "The message is too long to personalize."
                    ),
                }), 400

            if personalize_action not in PERSONALIZE_ACTIONS:

                return jsonify({
                    "success": False,
                    "error": (
                        "Invalid personalization option."
                    ),
                }), 400

        # =================================================
        # MODERATION
        # =================================================

        if user_prompt and contains_blocked_content(
            user_prompt
        ):

            return moderation_rejection()

        if source_text and contains_blocked_content(
            source_text
        ):

            return moderation_rejection()

        if name and contains_blocked_content(name):

            return moderation_rejection()

        # =================================================
        # LANGUAGE
        # =================================================

        # IMPORTANT:
        # Personalize harus membaca source_text.
        language_source = (
            source_text
            if mode == "personalize"
            else user_prompt
        )

        language = detect_language(
            language_source
        )

        # =================================================
        # LANGUAGE INSTRUCTION
        # =================================================

        language_instructions = {

            "Indonesian": """
The final message MUST be written entirely
in natural Bahasa Indonesia.

Use natural Indonesian sentence structure.

Sound like a genuine Indonesian fan.

Do not unnecessarily mix English or Japanese.

Use warm, respectful and positive language.
""",

            "English": """
The final message MUST be written entirely
in natural English.

Sound like a genuine English-speaking fan.

Do not unnecessarily mix Indonesian or Japanese.

Use warm, respectful and positive language.
""",

            "Japanese": """
最終的なメッセージは、
すべて自然な日本語で書いてください。

日本のファンが実際に書いたような、
温かく自然な文章にしてください。

不自然な直訳表現やAIらしい定型文は避けてください。

インドネシア語や英語を不必要に混ぜないでください。

「Nayla」などの固有名詞はそのまま使用してください。

成人式のお祝いにふさわしい、
丁寧で温かく前向きな表現を使用してください。
""",
        }

        language_instruction = (
            language_instructions[language]
        )

        # =================================================
        # MODE INSTRUCTION
        # =================================================

        mode_instructions = {

            "wish": """
Create a heartfelt birthday and
Seijin Shiki wish for Nayla.

Use the visitor's original thoughts
as the emotional foundation.

Possible themes:

- congratulations
- happiness
- gratitude
- encouragement
- adulthood
- growth
- dreams
- future
- support
- appreciation

Do not invent memories,
events, achievements,
relationships or private information.

Target:

100–160 words for Indonesian/English.

150–250 Japanese characters.
""",

            "enhance": """
Improve the visitor's original message.

Preserve:

- meaning
- intention
- important details
- emotional feeling

Improve:

- grammar
- sentence structure
- word choice
- flow
- readability

Do not invent facts or memories.

Keep the result reasonably close
to the original message.
""",

            "fortune": """
Create a short symbolic blessing
for Nayla's Seijin Shiki.

Focus on:

- courage
- growth
- happiness
- hope
- adulthood
- positive beginnings

Do not predict the actual future.

Do not claim specific events
will definitely happen.

Target:

50–90 words for Indonesian/English.

80–140 Japanese characters.
""",

            "letter": """
Write a heartfelt personal letter
to Nayla from a fan.

Structure:

1. Natural opening
2. Sincere middle
3. Warm closing

Possible themes:

- gratitude
- admiration
- support
- happiness
- adulthood
- encouragement
- future hopes
- new beginnings

Only mention specific memories
if the visitor provided them.

Never invent experiences.

Target:

180–280 words for Indonesian/English.

350–550 Japanese characters.
""",

            "personalize": """
Personalize the existing message.

Do NOT create an entirely unrelated message.

Preserve:

- original meaning
- original intention
- important details
- recipient
- emotional purpose

Only change the aspects requested
by the personalization action.

Never invent:

- memories
- events
- achievements
- relationships
- private information
- personal experiences

The result must remain suitable
for Nayla's birthday and Seijin Shiki.
""",
        }

        mode_instruction = (
            mode_instructions[mode]
        )

        # =================================================
        # PERSONALIZATION
        # =================================================

        personalization_instruction = ""

        if mode == "personalize":

            personalization_instruction = (
                PERSONALIZE_INSTRUCTIONS[
                    personalize_action
                ]
            )

        # =================================================
        # CONTEXT
        # =================================================

        context_instruction = ""

        if context:

            context_instruction = f"""
Additional visitor context:

{context[:MAX_CONTEXT_LENGTH]}

Use this context only when relevant.

Do not invent facts beyond the supplied information.
"""

        # =================================================
        # STYLE
        # =================================================

        style_instructions = {

            "heartfelt": """
Use a sincere,
warm and emotionally meaningful tone.

Do not exaggerate emotions.
""",

            "sweet": """
Use a gentle,
cheerful, cute and warm tone.

Keep it wholesome and natural.
""",

            "elegant": """
Use polished,
graceful and mature language.

Keep it sophisticated but natural.
""",

            "simple": """
Use simple,
clear and natural language.

Avoid complicated vocabulary.
""",

            "poetic": """
Use gentle poetic imagery
and beautiful expressions.

Do not make every sentence metaphorical.

Keep the message natural
and easy to understand.
""",
        }

        style_instruction = (
            style_instructions[style]
        )

        # =================================================
        # SYSTEM PROMPT
        # =================================================

        system_instruction = f"""
You are the official writing assistant
for the fan-made "Nayla Seijin Shiki Shrine".

This website is created by fans
to celebrate Nayla's birthday
and Seijin Shiki.

Your job is to help visitors
turn their own thoughts into
kind, positive, sincere,
warm and respectful messages.

You are NOT Nayla.

=========================================================
CORE RULE
=========================================================

The website is a celebration platform.

The generated message must NEVER
become an insult, attack, mockery,
harassment or negative personal comment.

=========================================================
STRICT SAFETY
=========================================================

NEVER generate:

- profanity
- vulgar language
- obscene language
- sexual language
- sexual content
- insults
- harassment
- bullying
- humiliation
- degrading language
- hateful language
- threats
- body shaming
- appearance insults
- intelligence insults
- personality attacks
- cruel jokes
- mocking
- derogatory nicknames
- attacks against JKT48 members
- inappropriate romantic claims
- sexual romantic claims

Never reproduce offensive language
from the visitor.

If the visitor attempts to make you
rewrite an insult in a softer form,
do not preserve the insulting intent.

=========================================================
FACTUAL SAFETY
=========================================================

Never:

- pretend to be Nayla
- speak as Nayla
- claim to personally know Nayla
- claim personal memories
- invent private information
- invent events
- invent conversations
- invent relationships
- invent achievements
- invent experiences

Only use information supplied
by the visitor or safe general wording.

=========================================================
NATURAL WRITING
=========================================================

Write like a real fan.

Avoid repetitive AI-style phrases.

Do not repeatedly rely on:

"incredible journey"
"beautiful journey"
"new chapter"
"boundless happiness"
"truly inspiring"
"always shine"
"continue to shine"
"wonderful future"

Avoid:

- repetitive sentences
- excessive metaphors
- exaggerated emotion
- unnecessary emojis
- robotic wording
- overly formal language

=========================================================
LANGUAGE
=========================================================

Detected language:

{language}

{language_instruction}

Use ONLY the detected language.

=========================================================
COMPLETENESS
=========================================================

The final message MUST be complete.

Never:

- stop mid-sentence
- stop at a comma
- stop at a colon
- leave an unfinished phrase

Always end naturally.

=========================================================
OUTPUT
=========================================================

Return ONLY the final message.

Do NOT return:

- explanation
- analysis
- heading
- bullet points
- labels
- quotation marks around the whole message
- "Here is your message"
- "Generated message"
- moderation explanation

The output must be ready
to copy into the guestbook.

=========================================================
FINAL PRINCIPLE
=========================================================

Be kind.

Be positive.

Be respectful.

Celebrate Nayla.

Make the message something
a fan would genuinely be happy
to give to her.
"""

        # =================================================
        # USER PROMPT
        # =================================================

        prompt = f"""
Create the final message.

=========================================================
VISITOR
=========================================================

Name:

{name if name else "Not provided"}

Original thoughts:

{user_prompt}

=========================================================
PERSONALIZATION SOURCE
=========================================================

Existing message:

{source_text}

Requested personalization:

{personalization_instruction}

=========================================================
REQUEST
=========================================================

Mode:

{mode}

Style:

{style}

Target language:

{language}

=========================================================
MODE
=========================================================

{mode_instruction}

=========================================================
STYLE
=========================================================

{style_instruction}

{context_instruction}

=========================================================
FINAL CHECK
=========================================================

Before responding, silently verify:

1. Original intention is preserved.
2. Output uses only {language}.
3. No unnecessary language mixing.
4. No fictional facts.
5. No insults.
6. No profanity.
7. No vulgar language.
8. No sexual content.
9. No bullying.
10. No harassment.
11. No negative attack.
12. Message is positive.
13. Message is appropriate for a birthday.
14. Message is appropriate for Seijin Shiki.
15. Every sentence is complete.
16. Final sentence is complete.
17. Message ends naturally.

Return ONLY the finished message.
"""

        # =================================================
        # GEMINI
        # =================================================

        response = (
            gemini_client
            .models
            .generate_content(
                model=GEMINI_MODEL,
                contents=prompt,
                config={
                    "system_instruction":
                        system_instruction,

                    "temperature":
                        0.72,

                    "max_output_tokens":
                        2048,
                },
            )
        )

        # =================================================
        # RESPONSE TEXT
        # =================================================

        generated_text = clean_generated_text(
            response.text
        )

        finish_reason = None

        try:

            if response.candidates:

                finish_reason = (
                    response
                    .candidates[0]
                    .finish_reason
                )

        except Exception:

            finish_reason = None

        # =================================================
        # EMPTY
        # =================================================

        if not generated_text:

            return jsonify({
                "success": False,
                "error": (
                    "Gemini returned an empty response."
                ),
            }), 500

        # =================================================
        # OUTPUT MODERATION
        # =================================================

        if contains_blocked_content(
            generated_text
        ):

            print("========================================")
            print("AI OUTPUT BLOCKED")
            print("========================================")

            return jsonify({
                "success": False,
                "blocked": True,
                "error": (
                    "The generated message did not "
                    "meet the positive community guidelines."
                ),
            }), 400

        # =================================================
        # OUTPUT LENGTH
        # =================================================

        if len(generated_text) > 5000:

            return jsonify({
                "success": False,
                "error": (
                    "The generated message was too long."
                ),
            }), 500

        # =================================================
        # SUCCESS
        # =================================================

        print("========================================")
        print("GEMINI RESPONSE")
        print("MODEL:", GEMINI_MODEL)
        print("LANGUAGE:", language)
        print("MODE:", mode)
        print("STYLE:", style)
        print("TEXT LENGTH:", len(generated_text))
        print("FINISH REASON:", finish_reason)
        print("OUTPUT MODERATION: PASSED")
        print("========================================")

        return jsonify({
            "success": True,
            "message": generated_text,
            "language": language,
            "mode": mode,
            "style": style,
            "model": GEMINI_MODEL,
            "finish_reason": (
                str(finish_reason)
                if finish_reason
                else None
            ),
        }), 200

    except Exception as e:

        print("========================================")
        print("GEMINI ERROR")
        print("TYPE:", type(e).__name__)
        print("MESSAGE:", str(e))
        print("========================================")

        return jsonify({
            "success": False,
            "error": (
                "Failed to generate AI message. "
                "Please try again."
            ),
        }), 500



# =========================================================
# NAYLA TRIVIA MASTER
# =========================================================
#
# Frontend contract:
#   POST /api/ai/trivia/start
#       {"difficulty":"easy","question_count":5}
#
#   POST /api/ai/trivia/answer
#       {
#           "question": "...",
#           "correct_answer": "...",
#           "user_answer": "...",
#           "difficulty": "easy"
#       }
#
# The trivia generator is deliberately fact-grounded:
# - Gemini may only use NAYLA_TRIVIA_FACTS.
# - Every generated question is validated server-side.
# - If Gemini fails or returns invalid JSON, a verified local
#   question bank is used so START BATTLE still works.
# =========================================================

NAYLA_TRIVIA_FACTS = os.getenv(
    "NAYLA_TRIVIA_FACTS",
    """
=== NAYLA PROFILE ===

Nayla Suji is a member of JKT48.
Nayla Suji is associated with JKT48 12th Generation.
Nayla Suji was born on 18 June 2007.
Nayla Suji was born in Kumamoto, Japan.
Nayla Suji's zodiac sign is Gemini.
Nayla Suji's blood type is AB.

=== NAYLA SHOWROOM ===

Nayla's JKT48 SHOWROOM account is:
Nayla / ナイラ（JKT48).

=== NAYLA STAGE / UNIT SONGS ===

Pajama Drive:
Nayla's unit song is Pajama Drive.

Ramune no Nomikata:
Nayla's unit song is Cross.

TWT:
Nayla's unit song is Glory Days.

Itadaki♥Love:
Nayla's unit song is Kataomoi no Karaage.

=== BDTS NAYLA ===

The animal associated with Nayla's BDTS is a peacock.

=== NAYLA BIRTHDAY PROJECT ===

2025:
#HappinessNaylalaland18

2026:
#HappinessUndertheSpotl19htht

=== JKT48 JOURNEY ===

Nayla is a JKT48 idol.
Nayla joined JKT48 as a 12th Generation member.
Nayla is associated with JKT48 theater stages and unit songs.
""".strip(),
)

TRIVIA_ALLOWED_DIFFICULTIES = {
    "easy",
    "normal",
    "hard",
    "expert",
}

TRIVIA_MAX_QUESTIONS = 5
TRIVIA_OPTIONS_PER_QUESTION = 4


def _trivia_json_from_text(text):
    if not text:
        return None

    raw = str(text).strip()

    raw = re.sub(
        r"^```(?:json)?\s*",
        "",
        raw,
        flags=re.IGNORECASE,
    )
    raw = re.sub(
        r"\s*```$",
        "",
        raw,
        flags=re.IGNORECASE,
    ).strip()

    try:
        import json
        return json.loads(raw)
    except Exception:
        pass

    start = raw.find("[")
    end = raw.rfind("]")

    if start >= 0 and end > start:
        try:
            import json
            return json.loads(raw[start:end + 1])
        except Exception:
            pass

    start = raw.find("{")
    end = raw.rfind("}")

    if start >= 0 and end > start:
        try:
            import json
            return json.loads(raw[start:end + 1])
        except Exception:
            pass

    return None


def _clean_trivia_value(value, maximum=500):
    if value is None:
        return ""

    value = str(value).strip()

    if len(value) > maximum:
        value = value[:maximum].strip()

    return value


def _validate_trivia_question(question):
    if not isinstance(question, dict):
        return None

    question_text = _clean_trivia_value(
        question.get("question"),
        500,
    )

    options = question.get("options")

    correct_answer = _clean_trivia_value(
        question.get("correct_answer"),
        200,
    )

    explanation = _clean_trivia_value(
        question.get("explanation"),
        500,
    )

    category = _clean_trivia_value(
        question.get("category"),
        80,
    ) or "General"

    if not question_text:
        return None

    if contains_blocked_content(question_text):
        return None

    if not isinstance(options, list):
        return None

    cleaned_options = []

    for option in options:
        option = _clean_trivia_value(option, 200)

        if not option:
            return None

        if contains_blocked_content(option):
            return None

        if option not in cleaned_options:
            cleaned_options.append(option)

    if len(cleaned_options) != TRIVIA_OPTIONS_PER_QUESTION:
        return None

    if correct_answer not in cleaned_options:
        return None

    if not explanation:
        explanation = (
            f"The correct answer is {correct_answer}."
        )

    if contains_blocked_content(explanation):
        return None

    return {
        "category": category,
        "question": question_text,
        "options": cleaned_options,
        "correct_answer": correct_answer,
        "explanation": explanation,
    }


def _validate_trivia_questions(payload, requested_count):
    if isinstance(payload, dict):
        questions = payload.get("questions")
    else:
        questions = payload

    if not isinstance(questions, list):
        return []

    validated = []
    seen_questions = set()

    for item in questions:
        item = _validate_trivia_question(item)

        if not item:
            continue

        normalized_question = normalize_text_for_moderation(
            item["question"]
        )

        if normalized_question in seen_questions:
            continue

        seen_questions.add(normalized_question)
        validated.append(item)

        if len(validated) >= requested_count:
            break

    return validated


# =========================================================
# LOCAL FALLBACK BANK
# =========================================================

TRIVIA_FALLBACK_QUESTIONS = [
    {
        "category": "Profile",
        "question": "Nayla Suji lahir di kota mana?",
        "options": [
            "Kumamoto",
            "Tokyo",
            "Osaka",
            "Kyoto",
        ],
        "correct_answer": "Kumamoto",
        "explanation": "Nayla Suji tercatat lahir di Kumamoto, Jepang.",
    },
    {
        "category": "Profile",
        "question": "Apa zodiak Nayla Suji?",
        "options": [
            "Gemini",
            "Cancer",
            "Leo",
            "Taurus",
        ],
        "correct_answer": "Gemini",
        "explanation": "Tanggal lahir Nayla adalah 18 Juni 2007 dan fakta bank mencantumkan zodiaknya Gemini.",
    },
    {
        "category": "Profile",
        "question": "Kapan Nayla Suji lahir?",
        "options": [
            "18 June 2007",
            "18 July 2007",
            "8 June 2007",
            "28 June 2007",
        ],
        "correct_answer": "18 June 2007",
        "explanation": "Fakta bank mencantumkan ulang tahun Nayla pada 18 Juni 2007.",
    },
    {
        "category": "JKT48",
        "question": "Nayla Suji merupakan member dari grup apa?",
        "options": [
            "JKT48",
            "AKB48",
            "HKT48",
            "NMB48",
        ],
        "correct_answer": "JKT48",
        "explanation": "Nayla Suji merupakan member JKT48.",
    },
    {
        "category": "Generation",
        "question": "Nayla Suji berasal dari generasi JKT48 ke berapa?",
        "options": [
            "Generation 12",
            "Generation 10",
            "Generation 11",
            "Generation 14",
        ],
        "correct_answer": "Generation 12",
        "explanation": "Nayla Suji merupakan bagian dari JKT48 Generation 12.",
    },
    {
        "category": "SHOWROOM",
        "question": "Apa nama akun JKT48 SHOWROOM Nayla?",
        "options": [
            "Nayla / ナイラ（JKT48)",
            "Nayla Suji Official",
            "JKT48_Nayla",
            "Nayla JKT48 Live",
        ],
        "correct_answer": "Nayla / ナイラ（JKT48)",
        "explanation": "Nama akun SHOWROOM Nayla yang digunakan dalam trivia adalah Nayla / ナイラ（JKT48).",
    },
    {
        "category": "Pajama Drive",
        "question": "Apa judul lagu unit Nayla di Pajama Drive?",
        "options": [
            "Pajama Drive",
            "Cross",
            "Glory Days",
            "Kataomoi no Karaage",
        ],
        "correct_answer": "Pajama Drive",
        "explanation": "Untuk Pajama Drive, judul lagu unit Nayla adalah Pajama Drive.",
    },
    {
        "category": "Ramune",
        "question": "Apa judul lagu unit Nayla di Ramune no Nomikata?",
        "options": [
            "Cross",
            "Pajama Drive",
            "Glory Days",
            "Kataomoi no Karaage",
        ],
        "correct_answer": "Cross",
        "explanation": "Untuk Ramune no Nomikata, lagu unit Nayla adalah Cross.",
    },
    {
        "category": "TWT",
        "question": "Apa judul lagu unit Nayla di TWT?",
        "options": [
            "Glory Days",
            "Cross",
            "Pajama Drive",
            "Kataomoi no Karaage",
        ],
        "correct_answer": "Glory Days",
        "explanation": "Untuk TWT, lagu unit Nayla adalah Glory Days.",
    },
    {
        "category": "Itadaki Love",
        "question": "Apa judul lagu unit Nayla di Itadaki♥Love?",
        "options": [
            "Kataomoi no Karaage",
            "Cross",
            "Glory Days",
            "Pajama Drive",
        ],
        "correct_answer": "Kataomoi no Karaage",
        "explanation": "Untuk Itadaki♥Love, lagu unit Nayla adalah Kataomoi no Karaage.",
    },
    {
        "category": "BDTS",
        "question": "Hewan apa yang berkaitan dengan BDTS Nayla?",
        "options": [
            "Burung merak",
            "Kelinci",
            "Kucing",
            "Rubah",
        ],
        "correct_answer": "Burung merak",
        "explanation": "Hewan yang berkaitan dengan BDTS Nayla adalah burung merak.",
    },
    {
        "category": "Birthday Project",
        "question": "Apa hashtag birthday project Nayla tahun 2025?",
        "options": [
            "#HappinessNaylalaland18",
            "#HappinessNayla17",
            "#NaylaLand2025",
            "#HappyNayla18",
        ],
        "correct_answer": "#HappinessNaylalaland18",
        "explanation": "Birthday project Nayla tahun 2025 menggunakan hashtag #HappinessNaylalaland18.",
    },
    {
        "category": "Birthday Project",
        "question": "Apa hashtag birthday project Nayla tahun 2026?",
        "options": [
            "#HappinessUndertheSpotl19ht",
            "#HappinessUnderTheSpotlight19",
            "#NaylaSpotlight2026",
            "#HappinessNayla2026",
        ],
        "correct_answer": "#HappinessUndertheSpotl19ht",
        "explanation": "Birthday project Nayla tahun 2026 menggunakan hashtag #HappinessUndertheSpotl19ht.",
    },
    {
        "category": "Matching",
        "question": "Manakah pasangan stage dan lagu unit Nayla yang benar?",
        "options": [
            "Ramune no Nomikata — Cross",
            "Ramune no Nomikata — Glory Days",
            "TWT — Cross",
            "Pajama Drive — Glory Days",
        ],
        "correct_answer": "Ramune no Nomikata — Cross",
        "explanation": "Lagu unit Nayla di Ramune no Nomikata adalah Cross.",
    },
    {
        "category": "Matching",
        "question": "Manakah pasangan yang benar untuk TWT?",
        "options": [
            "TWT — Glory Days",
            "TWT — Cross",
            "TWT — Pajama Drive",
            "TWT — Kataomoi no Karaage",
        ],
        "correct_answer": "TWT — Glory Days",
        "explanation": "Lagu unit Nayla di TWT adalah Glory Days.",
    },
    {
        "category": "Matching",
        "question": "Manakah pasangan yang benar untuk Itadaki♥Love?",
        "options": [
            "Itadaki♥Love — Kataomoi no Karaage",
            "Itadaki♥Love — Cross",
            "Itadaki♥Love — Glory Days",
            "Itadaki♥Love — Pajama Drive",
        ],
        "correct_answer": "Itadaki♥Love — Kataomoi no Karaage",
        "explanation": "Lagu unit Nayla di Itadaki♥Love adalah Kataomoi no Karaage.",
    },
    {
        "category": "Matching",
        "question": "Manakah pasangan yang benar untuk Pajama Drive?",
        "options": [
            "Pajama Drive — Pajama Drive",
            "Pajama Drive — Cross",
            "Pajama Drive — Glory Days",
            "Pajama Drive — Kataomoi no Karaage",
        ],
        "correct_answer": "Pajama Drive — Pajama Drive",
        "explanation": "Lagu unit Nayla di Pajama Drive adalah Pajama Drive.",
    },
    {
        "category": "Matching",
        "question": "Manakah daftar unit song Nayla yang sepenuhnya benar?",
        "options": [
            "Pajama Drive, Cross, Glory Days, Kataomoi no Karaage",
            "Cross, Glory Days, Beginner, River",
            "Pajama Drive, Heavy Rotation, River, Cross",
            "Glory Days, Aitakatta, River, Ponytail to Shushu",
        ],
        "correct_answer": "Pajama Drive, Cross, Glory Days, Kataomoi no Karaage",
        "explanation": "Keempat lagu tersebut adalah unit song Nayla pada stage yang tercantum dalam fakta bank.",
    },
    {
        "category": "BDTS",
        "question": "Kalau kamu mengikuti BDTS Nayla, hewan apa yang harus langsung teringat?",
        "options": [
            "Burung merak",
            "Panda",
            "Kucing",
            "Rusa",
        ],
        "correct_answer": "Burung merak",
        "explanation": "BDTS Nayla berkaitan dengan burung merak.",
    },
    {
        "category": "Birthday Project",
        "question": "Hashtag mana yang berkaitan dengan birthday project Nayla tahun 2025?",
        "options": [
            "#HappinessNaylalaland18",
            "#HappinessUndertheSpotl19ht",
            "#NaylaCross2025",
            "#NaylaPajamaDrive",
        ],
        "correct_answer": "#HappinessNaylalaland18",
        "explanation": "#HappinessNaylalaland18 adalah hashtag project ulang tahun Nayla tahun 2025.",
    },
    {
        "category": "Birthday Project",
        "question": "Hashtag mana yang berkaitan dengan birthday project Nayla tahun 2026?",
        "options": [
            "#HappinessUndertheSpotl19ht",
            "#HappinessNaylalaland18",
            "#NaylaLand2026",
            "#GloryDaysNayla",
        ],
        "correct_answer": "#HappinessUndertheSpotl19ht",
        "explanation": "#HappinessUndertheSpotl19ht adalah hashtag project ulang tahun Nayla tahun 2026.",
    },
    {
        "category": "Hardcore Fan",
        "question": "Jika stage-nya Ramune no Nomikata, jawaban yang tepat untuk lagu unit Nayla adalah...",
        "options": [
            "Cross",
            "Glory Days",
            "Pajama Drive",
            "Kataomoi no Karaage",
        ],
        "correct_answer": "Cross",
        "explanation": "Ramune no Nomikata dipasangkan dengan Cross untuk unit song Nayla.",
    },
    {
        "category": "Hardcore Fan",
        "question": "Jika stage-nya TWT, lagu unit Nayla adalah...",
        "options": [
            "Glory Days",
            "Cross",
            "Pajama Drive",
            "Kataomoi no Karaage",
        ],
        "correct_answer": "Glory Days",
        "explanation": "TWT dipasangkan dengan Glory Days untuk unit song Nayla.",
    },
    {
        "category": "Hardcore Fan",
        "question": "Jika stage-nya Itadaki♥Love, lagu unit Nayla adalah...",
        "options": [
            "Kataomoi no Karaage",
            "Cross",
            "Glory Days",
            "Pajama Drive",
        ],
        "correct_answer": "Kataomoi no Karaage",
        "explanation": "Itadaki♥Love dipasangkan dengan Kataomoi no Karaage.",
    },
    {
        "category": "Hardcore Fan",
        "question": "Jika stage-nya Pajama Drive, lagu unit Nayla adalah...",
        "options": [
            "Pajama Drive",
            "Cross",
            "Glory Days",
            "Kataomoi no Karaage",
        ],
        "correct_answer": "Pajama Drive",
        "explanation": "Pajama Drive dipasangkan dengan Pajama Drive untuk unit song Nayla.",
    },
    {
        "category": "Profile",
        "question": "Apa golongan darah Nayla Suji?",
        "options": [
            "AB",
            "A",
            "B",
            "O",
        ],
        "correct_answer": "AB",
        "explanation": "Fakta bank mencantumkan golongan darah Nayla sebagai AB.",
    },
]

# ============================================================
# NAYLA TRIVIA MASTER
# FAST LOCAL MULTILINGUAL VERSION
# ============================================================

import copy
import random
import unicodedata


TRIVIA_ALLOWED_LANGUAGES = {
    "id",
    "en",
    "ja",
    "zh",
    "ko",
}

TRIVIA_ALLOWED_DIFFICULTIES = {
    "easy",
    "normal",
    "hard",
    "expert",
}

TRIVIA_MAX_QUESTIONS = 5


# ============================================================
# MULTILINGUAL LOCAL QUESTION BANK
#
# IMPORTANT:
# - No Gemini request
# - No translation API
# - No network request for question generation
# - All languages are pre-translated
# ============================================================

TRIVIA_LOCAL_BANK = {

    # ========================================================
    # INDONESIAN
    # ========================================================

    "id": [

        {
            "category": "TWT",
            "question":
                "Apa judul lagu unit Nayla di TWT?",
            "options": [
                "Glory Days",
                "Cross",
                "Pajama Drive",
                "Kataomoi no Karaage",
            ],
            "correct_answer":
                "Glory Days",
            "explanation":
                "Untuk TWT, lagu unit Nayla adalah Glory Days.",
        },

        {
            "category": "Ramune",
            "question":
                "Apa judul lagu unit Nayla di Ramune no Nomikata?",
            "options": [
                "Cross",
                "Glory Days",
                "Pajama Drive",
                "Kataomoi no Karaage",
            ],
            "correct_answer":
                "Cross",
            "explanation":
                "Untuk Ramune no Nomikata, lagu unit Nayla adalah Cross.",
        },

        {
            "category": "Itadaki Love",
            "question":
                "Apa judul lagu unit Nayla di Itadaki♥Love?",
            "options": [
                "Kataomoi no Karaage",
                "Cross",
                "Glory Days",
                "Pajama Drive",
            ],
            "correct_answer":
                "Kataomoi no Karaage",
            "explanation":
                "Untuk Itadaki♥Love, lagu unit Nayla adalah Kataomoi no Karaage.",
        },

        {
            "category": "Pajama Drive",
            "question":
                "Apa judul lagu unit Nayla di Pajama Drive?",
            "options": [
                "Pajama Drive",
                "Cross",
                "Glory Days",
                "Kataomoi no Karaage",
            ],
            "correct_answer":
                "Pajama Drive",
            "explanation":
                "Untuk Pajama Drive, lagu unit Nayla adalah Pajama Drive.",
        },

        {
            "category": "BDTS",
            "question":
                "Hewan apa yang berkaitan dengan BDTS Nayla?",
            "options": [
                "Burung merak",
                "Kelinci",
                "Kucing",
                "Rubah",
            ],
            "correct_answer":
                "Burung merak",
            "explanation":
                "Hewan yang berkaitan dengan BDTS Nayla adalah burung merak.",
        },

        {
            "category": "Birthday Project",
            "question":
                "Apa hashtag birthday project Nayla tahun 2025?",
            "options": [
                "#HappinessNaylalaland18",
                "#HappinessNayla17",
                "#NaylaLand2025",
                "#HappyNayla18",
            ],
            "correct_answer":
                "#HappinessNaylalaland18",
            "explanation":
                "Birthday project Nayla tahun 2025 menggunakan hashtag #HappinessNaylalaland18.",
        },

        {
            "category": "Birthday Project",
            "question":
                "Apa hashtag birthday project Nayla tahun 2026?",
            "options": [
                "#HappinessUndertheSpotl19ht",
                "#HappinessUnderTheSpotlight19",
                "#NaylaSpotlight2026",
                "#HappinessNayla2026",
            ],
            "correct_answer":
                "#HappinessUndertheSpotl19ht",
            "explanation":
                "Birthday project Nayla tahun 2026 menggunakan hashtag #HappinessUndertheSpotl19ht.",
        },

        {
            "category": "Profile",
            "question":
                "Apa golongan darah Nayla Suji?",
            "options": [
                "AB",
                "A",
                "B",
                "O",
            ],
            "correct_answer":
                "AB",
            "explanation":
                "Fakta bank mencantumkan golongan darah Nayla sebagai AB.",
        },

    ],


    # ========================================================
    # ENGLISH
    # ========================================================

    "en": [

        {
            "category": "TWT",
            "question":
                "What is Nayla's unit song in TWT?",
            "options": [
                "Glory Days",
                "Cross",
                "Pajama Drive",
                "Kataomoi no Karaage",
            ],
            "correct_answer":
                "Glory Days",
            "explanation":
                "Nayla's unit song in TWT is Glory Days.",
        },

        {
            "category": "Ramune",
            "question":
                "What is Nayla's unit song in Ramune no Nomikata?",
            "options": [
                "Cross",
                "Glory Days",
                "Pajama Drive",
                "Kataomoi no Karaage",
            ],
            "correct_answer":
                "Cross",
            "explanation":
                "Nayla's unit song in Ramune no Nomikata is Cross.",
        },

        {
            "category": "Itadaki Love",
            "question":
                "What is Nayla's unit song in Itadaki♥Love?",
            "options": [
                "Kataomoi no Karaage",
                "Cross",
                "Glory Days",
                "Pajama Drive",
            ],
            "correct_answer":
                "Kataomoi no Karaage",
            "explanation":
                "Nayla's unit song in Itadaki♥Love is Kataomoi no Karaage.",
        },

        {
            "category": "Pajama Drive",
            "question":
                "What is Nayla's unit song in Pajama Drive?",
            "options": [
                "Pajama Drive",
                "Cross",
                "Glory Days",
                "Kataomoi no Karaage",
            ],
            "correct_answer":
                "Pajama Drive",
            "explanation":
                "Nayla's unit song in Pajama Drive is Pajama Drive.",
        },

        {
            "category": "BDTS",
            "question":
                "Which animal is associated with Nayla's BDTS?",
            "options": [
                "Peacock",
                "Rabbit",
                "Cat",
                "Fox",
            ],
            "correct_answer":
                "Peacock",
            "explanation":
                "The animal associated with Nayla's BDTS is a peacock.",
        },

        {
            "category": "Birthday Project",
            "question":
                "What was Nayla's birthday project hashtag for 2025?",
            "options": [
                "#HappinessNaylalaland18",
                "#HappinessNayla17",
                "#NaylaLand2025",
                "#HappyNayla18",
            ],
            "correct_answer":
                "#HappinessNaylalaland18",
            "explanation":
                "Nayla's 2025 birthday project used #HappinessNaylalaland18.",
        },

        {
            "category": "Birthday Project",
            "question":
                "What was Nayla's birthday project hashtag for 2026?",
            "options": [
                "#HappinessUndertheSpotl19ht",
                "#HappinessUnderTheSpotlight19",
                "#NaylaSpotlight2026",
                "#HappinessNayla2026",
            ],
            "correct_answer":
                "#HappinessUndertheSpotl19ht",
            "explanation":
                "Nayla's 2026 birthday project used #HappinessUndertheSpotl19ht.",
        },

        {
            "category": "Profile",
            "question":
                "What is Nayla Suji's blood type?",
            "options": [
                "AB",
                "A",
                "B",
                "O",
            ],
            "correct_answer":
                "AB",
            "explanation":
                "The fact bank lists Nayla's blood type as AB.",
        },

    ],


    # ========================================================
    # JAPANESE
    # ========================================================

    "ja": [

        {
            "category": "TWT",
            "question":
                "TWTでのNaylaのユニット曲は何ですか？",
            "options": [
                "Glory Days",
                "Cross",
                "Pajama Drive",
                "Kataomoi no Karaage",
            ],
            "correct_answer":
                "Glory Days",
            "explanation":
                "TWTでのNaylaのユニット曲はGlory Daysです。",
        },

        {
            "category": "Ramune",
            "question":
                "Ramune no NomikataでのNaylaのユニット曲は何ですか？",
            "options": [
                "Cross",
                "Glory Days",
                "Pajama Drive",
                "Kataomoi no Karaage",
            ],
            "correct_answer":
                "Cross",
            "explanation":
                "Ramune no NomikataでのNaylaのユニット曲はCrossです。",
        },

        {
            "category": "Itadaki Love",
            "question":
                "Itadaki♥LoveでのNaylaのユニット曲は何ですか？",
            "options": [
                "Kataomoi no Karaage",
                "Cross",
                "Glory Days",
                "Pajama Drive",
            ],
            "correct_answer":
                "Kataomoi no Karaage",
            "explanation":
                "Itadaki♥LoveでのNaylaのユニット曲はKataomoi no Karaageです。",
        },

        {
            "category": "Pajama Drive",
            "question":
                "Pajama DriveでのNaylaのユニット曲は何ですか？",
            "options": [
                "Pajama Drive",
                "Cross",
                "Glory Days",
                "Kataomoi no Karaage",
            ],
            "correct_answer":
                "Pajama Drive",
            "explanation":
                "Pajama DriveでのNaylaのユニット曲はPajama Driveです。",
        },

        {
            "category": "BDTS",
            "question":
                "NaylaのBDTSに関連する動物は何ですか？",
            "options": [
                "クジャク",
                "ウサギ",
                "ネコ",
                "キツネ",
            ],
            "correct_answer":
                "クジャク",
            "explanation":
                "NaylaのBDTSに関連する動物はクジャクです。",
        },

        {
            "category": "Birthday Project",
            "question":
                "2025年のNaylaのバースデープロジェクトのハッシュタグは何ですか？",
            "options": [
                "#HappinessNaylalaland18",
                "#HappinessNayla17",
                "#NaylaLand2025",
                "#HappyNayla18",
            ],
            "correct_answer":
                "#HappinessNaylalaland18",
            "explanation":
                "2025年のNaylaのバースデープロジェクトは#HappinessNaylalaland18を使用しました。",
        },

        {
            "category": "Birthday Project",
            "question":
                "2026年のNaylaのバースデープロジェクトのハッシュタグは何ですか？",
            "options": [
                "#HappinessUndertheSpotl19ht",
                "#HappinessUnderTheSpotlight19",
                "#NaylaSpotlight2026",
                "#HappinessNayla2026",
            ],
            "correct_answer":
                "#HappinessUndertheSpotl19ht",
            "explanation":
                "2026年のNaylaのバースデープロジェクトは#HappinessUndertheSpotl19htを使用しました。",
        },

        {
            "category": "Profile",
            "question":
                "Nayla Sujiの血液型は何ですか？",
            "options": [
                "AB",
                "A",
                "B",
                "O",
            ],
            "correct_answer":
                "AB",
            "explanation":
                "ファクトバンクでは、Naylaの血液型はAB型とされています。",
        },

    ],


    # ========================================================
    # CHINESE
    # ========================================================

    "zh": [

        {
            "category": "TWT",
            "question":
                "Nayla在TWT的unit song是什么？",
            "options": [
                "Glory Days",
                "Cross",
                "Pajama Drive",
                "Kataomoi no Karaage",
            ],
            "correct_answer":
                "Glory Days",
            "explanation":
                "Nayla在TWT的unit song是Glory Days。",
        },

        {
            "category": "Ramune",
            "question":
                "Nayla在Ramune no Nomikata的unit song是什么？",
            "options": [
                "Cross",
                "Glory Days",
                "Pajama Drive",
                "Kataomoi no Karaage",
            ],
            "correct_answer":
                "Cross",
            "explanation":
                "Nayla在Ramune no Nomikata的unit song是Cross。",
        },

        {
            "category": "Itadaki Love",
            "question":
                "Nayla在Itadaki♥Love的unit song是什么？",
            "options": [
                "Kataomoi no Karaage",
                "Cross",
                "Glory Days",
                "Pajama Drive",
            ],
            "correct_answer":
                "Kataomoi no Karaage",
            "explanation":
                "Nayla在Itadaki♥Love的unit song是Kataomoi no Karaage。",
        },

        {
            "category": "Pajama Drive",
            "question":
                "Nayla在Pajama Drive的unit song是什么？",
            "options": [
                "Pajama Drive",
                "Cross",
                "Glory Days",
                "Kataomoi no Karaage",
            ],
            "correct_answer":
                "Pajama Drive",
            "explanation":
                "Nayla在Pajama Drive的unit song是Pajama Drive。",
        },

        {
            "category": "BDTS",
            "question":
                "哪一种动物与Nayla的BDTS有关？",
            "options": [
                "孔雀",
                "兔子",
                "猫",
                "狐狸",
            ],
            "correct_answer":
                "孔雀",
            "explanation":
                "与Nayla的BDTS有关的动物是孔雀。",
        },

        {
            "category": "Birthday Project",
            "question":
                "Nayla 2025年的生日企划使用了什么hashtag？",
            "options": [
                "#HappinessNaylalaland18",
                "#HappinessNayla17",
                "#NaylaLand2025",
                "#HappyNayla18",
            ],
            "correct_answer":
                "#HappinessNaylalaland18",
            "explanation":
                "Nayla 2025年的生日企划使用了#HappinessNaylalaland18。",
        },

        {
            "category": "Birthday Project",
            "question":
                "Nayla 2026年的生日企划使用了什么hashtag？",
            "options": [
                "#HappinessUndertheSpotl19ht",
                "#HappinessUnderTheSpotlight19",
                "#NaylaSpotlight2026",
                "#HappinessNayla2026",
            ],
            "correct_answer":
                "#HappinessUndertheSpotl19ht",
            "explanation":
                "Nayla 2026年的生日企划使用了#HappinessUndertheSpotl19ht。",
        },

        {
            "category": "Profile",
            "question":
                "Nayla Suji的血型是什么？",
            "options": [
                "AB型",
                "A型",
                "B型",
                "O型",
            ],
            "correct_answer":
                "AB型",
            "explanation":
                "资料库中记录Nayla的血型为AB型。",
        },

    ],


    # ========================================================
    # KOREAN
    # ========================================================

    "ko": [

        {
            "category": "TWT",
            "question":
                "TWT에서 Nayla의 유닛곡은 무엇인가요?",
            "options": [
                "Glory Days",
                "Cross",
                "Pajama Drive",
                "Kataomoi no Karaage",
            ],
            "correct_answer":
                "Glory Days",
            "explanation":
                "TWT에서 Nayla의 유닛곡은 Glory Days입니다.",
        },

        {
            "category": "Ramune",
            "question":
                "Ramune no Nomikata에서 Nayla의 유닛곡은 무엇인가요?",
            "options": [
                "Cross",
                "Glory Days",
                "Pajama Drive",
                "Kataomoi no Karaage",
            ],
            "correct_answer":
                "Cross",
            "explanation":
                "Ramune no Nomikata에서 Nayla의 유닛곡은 Cross입니다.",
        },

        {
            "category": "Itadaki Love",
            "question":
                "Itadaki♥Love에서 Nayla의 유닛곡은 무엇인가요?",
            "options": [
                "Kataomoi no Karaage",
                "Cross",
                "Glory Days",
                "Pajama Drive",
            ],
            "correct_answer":
                "Kataomoi no Karaage",
            "explanation":
                "Itadaki♥Love에서 Nayla의 유닛곡은 Kataomoi no Karaage입니다.",
        },

        {
            "category": "Pajama Drive",
            "question":
                "Pajama Drive에서 Nayla의 유닛곡은 무엇인가요?",
            "options": [
                "Pajama Drive",
                "Cross",
                "Glory Days",
                "Kataomoi no Karaage",
            ],
            "correct_answer":
                "Pajama Drive",
            "explanation":
                "Pajama Drive에서 Nayla의 유닛곡은 Pajama Drive입니다.",
        },

        {
            "category": "BDTS",
            "question":
                "Nayla의 BDTS와 관련된 동물은 무엇인가요?",
            "options": [
                "공작새",
                "토끼",
                "고양이",
                "여우",
            ],
            "correct_answer":
                "공작새",
            "explanation":
                "Nayla의 BDTS와 관련된 동물은 공작새입니다.",
        },

        {
            "category": "Birthday Project",
            "question":
                "Nayla의 2025년 생일 프로젝트 해시태그는 무엇인가요?",
            "options": [
                "#HappinessNaylalaland18",
                "#HappinessNayla17",
                "#NaylaLand2025",
                "#HappyNayla18",
            ],
            "correct_answer":
                "#HappinessNaylalaland18",
            "explanation":
                "Nayla의 2025년 생일 프로젝트는 #HappinessNaylalaland18을 사용했습니다.",
        },

        {
            "category": "Birthday Project",
            "question":
                "Nayla의 2026년 생일 프로젝트 해시태그는 무엇인가요?",
            "options": [
                "#HappinessUndertheSpotl19ht",
                "#HappinessUnderTheSpotlight19",
                "#NaylaSpotlight2026",
                "#HappinessNayla2026",
            ],
            "correct_answer":
                "#HappinessUndertheSpotl19ht",
            "explanation":
                "Nayla의 2026년 생일 프로젝트는 #HappinessUndertheSpotl19ht를 사용했습니다.",
        },

        {
            "category": "Profile",
            "question":
                "Nayla Suji의 혈액형은 무엇인가요?",
            "options": [
                "AB형",
                "A형",
                "B형",
                "O형",
            ],
            "correct_answer":
                "AB형",
            "explanation":
                "자료에 따르면 Nayla의 혈액형은 AB형입니다.",
        },

    ],
}


# ============================================================
# LOCAL QUESTION BUILDER
# ============================================================

def _trivia_local_questions(
    count=5,
    language="en",
):
    """
    Return instant local questions.

    No Gemini.
    No external API.
    No translation request.
    """

    language = str(
        language or "en"
    ).lower()

    if language not in TRIVIA_ALLOWED_LANGUAGES:
        language = "en"

    source = TRIVIA_LOCAL_BANK.get(
            language,
            TRIVIA_LOCAL_BANK["en"],
        )

    questions = copy.deepcopy(
        source
    )

    random.shuffle(
        questions
    )

    selected = []
    used_categories = set()

    # --------------------------------------------------------
    # First pass:
    # maximize category diversity
    # --------------------------------------------------------

    for question in questions:

        category = question.get(
            "category",
            "General",
        )

        if category in used_categories:
            continue

        used_categories.add(
            category
        )

        selected.append(
            question
        )

        if len(selected) >= count:
            break

    # --------------------------------------------------------
    # Second pass:
    # fill remaining questions
    # --------------------------------------------------------

    if len(selected) < count:

        selected_ids = {
            id(question)
            for question in selected
        }

        for question in questions:

            if id(question) in selected_ids:
                continue

            selected.append(
                question
            )

            if len(selected) >= count:
                break

    # --------------------------------------------------------
    # Shuffle options
    # --------------------------------------------------------

    for question in selected:

        random.shuffle(
            question["options"]
        )

    random.shuffle(
        selected
    )

    return selected[:count]


# ============================================================
# START TRIVIA
# ============================================================

@app.route(
    "/api/ai/trivia/start",
    methods=["POST"],
)
def start_trivia():

    """
    Start Trivia instantly.

    IMPORTANT:
    This endpoint NEVER calls Gemini.
    """

    try:

        data = request.get_json(
            silent=True
        )

        if not isinstance(
            data,
            dict,
        ):
            data = {}

        # ----------------------------------------------------
        # Difficulty
        # ----------------------------------------------------

        difficulty = safe_string(
            data.get(
                "difficulty",
                "easy",
            ),
            "easy",
        ).lower()

        if difficulty not in (
            TRIVIA_ALLOWED_DIFFICULTIES
        ):
            difficulty = "easy"

        # ----------------------------------------------------
        # Question count
        # ----------------------------------------------------

        try:

            question_count = int(
                data.get(
                    "question_count",
                    5,
                )
            )

        except (
            TypeError,
            ValueError,
        ):

            question_count = 5

        question_count = max(
            1,
            min(
                question_count,
                TRIVIA_MAX_QUESTIONS,
            ),
        )

        # ----------------------------------------------------
        # Language
        # ----------------------------------------------------

        language = safe_string(
            data.get(
                "language",
                "en",
            ),
            "en",
        ).lower()

        if language not in (
            TRIVIA_ALLOWED_LANGUAGES
        ):
            language = "en"

        # ----------------------------------------------------
        # LOCAL GENERATION
        #
        # This is the important part:
        # NO GEMINI.
        # ----------------------------------------------------

        questions = _trivia_local_questions(
            count=question_count,
            language=language,
        )

        if not questions:

            return jsonify({
                "success": False,
                "error":
                    "No local trivia questions available.",
                "language":
                    language,
            }), 500

        # ----------------------------------------------------
        # LOG
        # ----------------------------------------------------

        print(
            "========================================"
        )

        print(
            "TRIVIA START SUCCESS"
        )

        print(
            "SOURCE:",
            "LOCAL"
        )

        print(
            "LANGUAGE:",
            language
        )

        print(
            "DIFFICULTY:",
            difficulty
        )

        print(
            "QUESTION COUNT:",
            len(questions)
        )

        print(
            "========================================"
        )

        # ----------------------------------------------------
        # RESPONSE
        # ----------------------------------------------------

        return jsonify({

            "success":
                True,

            "source":
                "local",

            "questions":
                questions,

            "language":
                language,

            "difficulty":
                difficulty,

            "question_count":
                len(questions),

        }), 200

    except Exception as e:

        print(
            "========================================"
        )

        print(
            "TRIVIA START ERROR"
        )

        print(
            "TYPE:",
            type(e).__name__
        )

        print(
            "MESSAGE:",
            str(e)
        )

        print(
            "========================================"
        )

        return jsonify({

            "success":
                False,

            "error":
                "Failed to prepare trivia.",

        }), 500


# ============================================================
# ANSWER TRIVIA
# ============================================================

@app.route(
    "/api/ai/trivia/answer",
    methods=["POST"],
)
def answer_trivia():

    """
    Check one trivia answer locally.

    Gemini is NOT used.
    """

    try:

        data = request.get_json(
            silent=True
        )

        if not isinstance(
            data,
            dict,
        ):

            return jsonify({
                "success": False,
                "error":
                    "No data received.",
            }), 400

        question = safe_string(
            data.get(
                "question"
            )
        )

        correct_answer = safe_string(
            data.get(
                "correct_answer"
            )
        )

        user_answer = safe_string(
            data.get(
                "user_answer"
            )
        )

        difficulty = safe_string(
            data.get(
                "difficulty",
                "easy",
            ),
            "easy",
        ).lower()

        if difficulty not in (
            TRIVIA_ALLOWED_DIFFICULTIES
        ):
            difficulty = "easy"

        if not question:

            return jsonify({
                "success": False,
                "error":
                    "Question is missing.",
            }), 400

        if not correct_answer:

            return jsonify({
                "success": False,
                "error":
                    "Correct answer is missing.",
            }), 400

        if not user_answer:

            return jsonify({
                "success": False,
                "error":
                    "Answer is missing.",
            }), 400

        # ----------------------------------------------------
        # Normalize
        # ----------------------------------------------------

        normalized_correct = (
            unicodedata
            .normalize(
                "NFKC",
                correct_answer,
            )
            .strip()
            .casefold()
        )

        normalized_user = (
            unicodedata
            .normalize(
                "NFKC",
                user_answer,
            )
            .strip()
            .casefold()
        )

        correct = (
            normalized_correct
            == normalized_user
        )

        # ----------------------------------------------------
        # Points
        # ----------------------------------------------------

        points_map = {

            "easy":
                100,

            "normal":
                150,

            "hard":
                200,

            "expert":
                300,
        }

        points = points_map.get(
            difficulty,
            100,
        )

        earned_points = (
            points
            if correct
            else 0
        )

        # ----------------------------------------------------
        # Explanation
        # ----------------------------------------------------

        if correct:

            explanation = {
                "id":
                    "Benar! Jawabanmu tepat.",

                "en":
                    "Correct! Your answer is right.",

                "ja":
                    "正解です！答えは合っています。",

                "zh":
                    "回答正确！你的答案是对的。",

                "ko":
                    "정답입니다! 답이 맞습니다.",
            }

        else:

            explanation = {
                "id":
                    f"Belum tepat. Jawaban yang benar adalah {correct_answer}.",

                "en":
                    f"Not quite. The correct answer is {correct_answer}.",

                "ja":
                    f"不正解です。正しい答えは {correct_answer} です。",

                "zh":
                    f"回答不正确。正确答案是 {correct_answer}。",

                "ko":
                    f"아쉽네요. 정답은 {correct_answer}입니다.",
            }

        language = safe_string(
            data.get(
                "language",
                "en",
            ),
            "en",
        ).lower()

        if language not in (
            TRIVIA_ALLOWED_LANGUAGES
        ):
            language = "en"

        return jsonify({

            "success":
                True,

            "correct":
                correct,

            "points":
                earned_points,

            "explanation":
                explanation.get(
                    language,
                    explanation["en"],
                ),

            "correct_answer":
                correct_answer,

        }), 200

    except Exception as e:

        print(
            "TRIVIA ANSWER ERROR:",
            type(e).__name__,
            str(e),
        )

        return jsonify({

            "success":
                False,

            "error":
                "Unable to check answer.",

        }), 500

def answer_trivia():
    """
    Score one trivia answer locally.

    The server does not ask Gemini to determine correctness.
    """
    if is_ai_rate_limited():
        return rate_limit_response()

    try:
        data = request.get_json(
            silent=True
        )

        if not isinstance(data, dict):
            return jsonify({
                "success": False,
                "error": "No data received.",
            }), 400

        question = safe_string(
            data.get("question")
        )

        correct_answer = safe_string(
            data.get("correct_answer")
        )

        user_answer = safe_string(
            data.get("user_answer")
        )

        difficulty = safe_string(
            data.get(
                "difficulty",
                "easy",
            ),
            "easy",
        ).lower()

        if difficulty not in TRIVIA_ALLOWED_DIFFICULTIES:
            difficulty = "easy"

        if not question:
            return jsonify({
                "success": False,
                "error": "Question is missing.",
            }), 400

        if not correct_answer:
            return jsonify({
                "success": False,
                "error": "Correct answer is missing.",
            }), 400

        if not user_answer:
            return jsonify({
                "success": False,
                "error": "Answer is missing.",
            }), 400

        if len(question) > 500:
            return jsonify({
                "success": False,
                "error": "Question is too long.",
            }), 400

        if len(correct_answer) > 200:
            return jsonify({
                "success": False,
                "error": "Correct answer is too long.",
            }), 400

        if len(user_answer) > 200:
            return jsonify({
                "success": False,
                "error": "Answer is too long.",
            }), 400

        if contains_blocked_content(question):
            return moderation_rejection()

        if contains_blocked_content(
            correct_answer
        ):
            return moderation_rejection()

        if contains_blocked_content(
            user_answer
        ):
            return moderation_rejection()

        points_map = {
            "easy": 100,
            "normal": 150,
            "hard": 200,
            "expert": 300,
        }

        points = points_map.get(
            difficulty,
            100,
        )

        normalized_correct = (
            unicodedata.normalize(
                "NFKC",
                correct_answer,
            )
            .strip()
            .casefold()
        )

        normalized_user = (
            unicodedata.normalize(
                "NFKC",
                user_answer,
            )
            .strip()
            .casefold()
        )

        correct = (
            normalized_correct
            == normalized_user
        )

        if correct:
            explanation = (
                f"Correct! {correct_answer} is the right answer."
            )
        else:
            explanation = (
                f"Not quite. The correct answer is "
                f"{correct_answer}."
            )

        print("========================================")
        print("TRIVIA ANSWER")
        print("CORRECT:", correct)
        print("DIFFICULTY:", difficulty)
        print("POINTS:", points if correct else 0)
        print("========================================")

        return jsonify({
            "success": True,
            "correct": correct,
            "points": points if correct else 0,
            "explanation": explanation,
            "correct_answer": correct_answer,
        }), 200

    except Exception as e:
        print("========================================")
        print("TRIVIA ANSWER ERROR")
        print("TYPE:", type(e).__name__)
        print("MESSAGE:", str(e))
        print("========================================")

        return jsonify({
            "success": False,
            "error": (
                "Unable to check the trivia answer."
            ),
        }), 500


# =========================================================
# HEALTH
# =========================================================

@app.route(
    "/api/health",
    methods=["GET"]
)
def health():

    return jsonify({

        "success": True,

        "gemini_configured":
            gemini_client is not None,

        "supabase_configured":
            supabase_client is not None,

        "model":
            GEMINI_MODEL,

        "guestbook":
            True,

        "guestbook_validation":
            True,

        "moderation":
            True,

        "rate_limit":
            True,

        "security_headers":
            True,

        "trivia":
            True,

        "trivia_gemini":
            gemini_client is not None,

    }), 200


# =========================================================
# ERROR HANDLERS
# =========================================================

@app.errorhandler(400)
def bad_request(error):

    return jsonify({
        "success": False,
        "error": "Bad request.",
    }), 400


@app.errorhandler(404)
def not_found(error):

    return jsonify({
        "success": False,
        "error": "Endpoint not found.",
    }), 404


@app.errorhandler(405)
def method_not_allowed(error):

    return jsonify({
        "success": False,
        "error": "Method not allowed.",
    }), 405


@app.errorhandler(413)
def request_too_large(error):

    return jsonify({
        "success": False,
        "error": "Request is too large.",
    }), 413


@app.errorhandler(429)
def too_many_requests(error):

    return jsonify({
        "success": False,
        "error": (
            "Too many requests. "
            "Please wait a moment and try again."
        ),
    }), 429


@app.errorhandler(500)
def internal_server_error(error):

    print("========================================")
    print("INTERNAL SERVER ERROR")
    print("========================================")

    return jsonify({
        "success": False,
        "error": (
            "Internal server error. "
            "Please try again later."
        ),
    }), 500


# =========================================================
# RUN
# =========================================================

if __name__ == "__main__":

    app.run(
        debug=FLASK_DEBUG,
        host="127.0.0.1",
        port=5000
    )