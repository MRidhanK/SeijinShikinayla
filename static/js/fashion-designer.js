/* ============================================================
   NAYLA FASHION DESIGNER
   fashion-designer.js

   PRO FASHION AVATAR ENGINE
   ------------------------------------------------------------
   - Three.js
   - TANPA OrbitControls
   - Female / Male
   - Human-like mannequin
   - Modest full-body base coverage
   - Female subtle bust silhouette
   - Male flat chest silhouette
   - Face + eyes + nose + mouth
   - Hair styles yang tidak menutup mata
   - Proper clothing layering
   - Tops
   - Dresses
   - Jackets
   - Bottoms
   - Shoes
   - Hats
   - Glasses
   - Bags
   - Accessories
   - 60+ fashion items
   - 360° drag rotation
   - Extended zoom
   - Zoom buttons
   - Gender switching
   - Search
   - Category filtering
   - Random outfit
   - Save outfit
   - Challenge
   - Score
   - LocalStorage
   ============================================================ */

"use strict";


/* ============================================================
   01. THREE.JS
   ============================================================ */

import * as THREE from "three";


/* ============================================================
   02. ROOT
   ============================================================ */

const ROOT =
    document.getElementById("fashionDesignerGame") ||
    document;


/* ============================================================
   03. DOM HELPERS
   ============================================================ */

function $(selector) {
    return ROOT.querySelector(selector);
}

function $all(selector) {
    return [...ROOT.querySelectorAll(selector)];
}

function firstExisting(selectors) {

    for (const selector of selectors) {

        const element = ROOT.querySelector(selector);

        if (element) {
            return element;
        }
    }

    return null;
}


/* ============================================================
   04. CONFIG
   ============================================================ */

const CONFIG = {

    camera: {

        /*
         * Semakin kecil = semakin dekat.
         * 1.65 membuat zoom jauh lebih dekat daripada versi lama.
         */

        minDistance: 1.65,

        /*
         * Semakin besar = semakin jauh.
         */

        maxDistance: 26,

        defaultDistance: 14
    },

    avatar: {

        floorY: 0,

        footY: 0.22,

        ankleY: 0.38,

        kneeY: 1.15,

        hipY: 1.78,

        waistY: 2.12,

        chestY: 2.72,

        shoulderY: 3.02,

        neckY: 3.48,

        headY: 4.15,

        hairY: 4.52
    },

    colors: {

        skin: "#efc2b4",

        skinDark: "#d89e91",

        skinLight: "#f7d7cc",

        white: "#f6f3ed",

        black: "#1c1d25",

        charcoal: "#30313b",

        navy: "#253a59",

        blue: "#78a8d5",

        denim: "#4f79a2",

        rose: "#d98fa4",

        pink: "#e8a8b9",

        lavender: "#b7a3d8",

        purple: "#80639f",

        cream: "#eee0c8",

        beige: "#cdb696",

        brown: "#67483d",

        mint: "#8fc7b1",

        green: "#609c83",

        red: "#b8616e",

        gold: "#d5ae61",

        silver: "#c4cad3"
    }
};


/* ============================================================
   05. STATE
   ============================================================ */

const state = {

    level: 1,

    points: 0,

    money: 0,

    combo: 0,


    /* ========================================================
       CATEGORY
       ======================================================== */

    category: "all",

    selectedCategory: "all",

    activeCategory: "all",


    /* ========================================================
       SEARCH
       ======================================================== */

    search: "",


    /* ========================================================
       SELECTED ITEM
       ======================================================== */

    selectedItemId: null,


    /* ========================================================
       COLOR
       ======================================================== */

    activeColor: "rose",


    /* ========================================================
       GENDER
       ======================================================== */

    gender: "female",


    /* ========================================================
       COLORS
       ======================================================== */

    colors: {

        hair: "#49342f",

        skin: "#f3c7a8",

        eyes: "#4b3028"

    },


    /* ========================================================
       SELECTED
       ======================================================== */

    selected: {

        hair: null,

        top: null,

        dress: null,

        jacket: null,

        bottom: null,

        shoes: null,

        hat: null,

        glasses: null,

        bag: null,

        accessory: null

    },


    /* ========================================================
       3D VIEW
       ======================================================== */

    rotation: 0,

    targetRotation: 0,

    cameraDistance:
        CONFIG.camera.defaultDistance,

    targetCameraDistance:
        CONFIG.camera.defaultDistance,


    /* ========================================================
       STATUS
       ======================================================== */

    initialized: false,

    equipped: {},

    saved: [],


    /* ========================================================
       CHALLENGE
       ======================================================== */

    challenge: null,

    challengeTime: 90,

    challengeInterval: null,

    challengeActive: false,

    challengeMedal: null,

    challengeFinished: false,
    challengeRewarded: false,

    /* ========================================================
       SCORE
       ======================================================== */

    score: 0

};


/* ============================================================
   06. FASHION DATABASE
   ============================================================ */

const ITEMS = [

    /* ========================================================
       HAIR
       ======================================================== */

    {
        id: "hair-soft-bob",
        name: "Soft Bob",
        category: "hair",
        rarity: "common",
        score: 10,
        type: "bob",
        colors: ["#e4a99c", "#513833", "#25232a"]
    },

    {
        id: "hair-side-wave",
        name: "Side Wave",
        category: "hair",
        rarity: "rare",
        score: 17,
        type: "sideWave",
        colors: ["#c98578", "#573a35", "#252229"]
    },

    {
        id: "hair-short-layer",
        name: "Short Layer",
        category: "hair",
        rarity: "common",
        score: 12,
        type: "short",
        colors: ["#46312e", "#1d1e24", "#83584e"]
    },

    {
        id: "hair-long-wave",
        name: "Long Wave",
        category: "hair",
        rarity: "epic",
        score: 24,
        type: "long",
        colors: ["#5d4038", "#241f23", "#a56b5b"]
    },

    {
        id: "hair-ponytail",
        name: "High Ponytail",
        category: "hair",
        rarity: "rare",
        score: 20,
        type: "pony",
        colors: ["#3d2b2a", "#1f2027", "#81534b"]
    },

    {
        id: "hair-low-ponytail",
        name: "Low Ponytail",
        category: "hair",
        rarity: "rare",
        score: 18,
        type: "lowPony",
        colors: ["#5b3e37", "#24242b", "#9a6a5c"]
    },

    {
        id: "hair-pixie",
        name: "Elegant Pixie",
        category: "hair",
        rarity: "epic",
        score: 25,
        type: "pixie",
        colors: ["#d49a7f", "#46302d", "#25242a"]
    },

    {
        id: "hair-curls",
        name: "Soft Curls",
        category: "hair",
        rarity: "legendary",
        score: 32,
        type: "curls",
        colors: ["#8b5b47", "#4c3029", "#c47d62"]
    },

    {
        id: "hair-male-short",
        name: "Classic Short",
        category: "hair",
        gender: "male",
        rarity: "common",
        score: 10,
        type: "maleShort",
        colors: ["#302927", "#17191e", "#62483f"]
    },

    {
        id: "hair-male-side",
        name: "Gentle Side Part",
        category: "hair",
        gender: "male",
        rarity: "rare",
        score: 17,
        type: "maleSide",
        colors: ["#44322e", "#202026", "#79574c"]
    },

    {
        id: "hair-male-textured",
        name: "Textured Crop",
        category: "hair",
        gender: "male",
        rarity: "epic",
        score: 23,
        type: "maleTextured",
        colors: ["#29282d", "#4c3934", "#755148"]
    },

    {
        id: "hair-male-wave",
        name: "Modern Wave",
        category: "hair",
        gender: "male",
        rarity: "legendary",
        score: 30,
        type: "maleWave",
        colors: ["#4e352f", "#211e24", "#835c4f"]
    },


    /* ========================================================
       TOPS
       ======================================================== */

    {
        id: "top-silk",
        name: "Silk Blouse",
        category: "top",
        rarity: "common",
        score: 11,
        type: "blouse",
        colors: ["#eab0bf", "#ffffff", "#c4a7d8"]
    },

    {
        id: "top-white-shirt",
        name: "Classic White Shirt",
        category: "top",
        rarity: "common",
        score: 13,
        type: "shirt",
        colors: ["#f7f5ef", "#d9e6ef", "#e8d5c5"]
    },

    {
        id: "top-satin",
        name: "Satin Blouse",
        category: "top",
        rarity: "rare",
        score: 18,
        type: "satin",
        colors: ["#d99db1", "#8272b3", "#86a9c8"]
    },

    {
        id: "top-turtleneck",
        name: "Soft Turtleneck",
        category: "top",
        rarity: "rare",
        score: 20,
        type: "turtleneck",
        colors: ["#eee6dc", "#29364c", "#b9a4c9"]
    },

    {
        id: "top-knit",
        name: "Fine Knit Top",
        category: "top",
        rarity: "common",
        score: 14,
        type: "knit",
        colors: ["#dca4ad", "#9eb7d1", "#b7d1c5"]
    },

    {
        id: "top-wrap",
        name: "Wrap Blouse",
        category: "top",
        rarity: "epic",
        score: 26,
        type: "wrap",
        colors: ["#b789a4", "#536d94", "#d7b67a"]
    },

    {
        id: "top-tailored",
        name: "Tailored Top",
        category: "top",
        rarity: "epic",
        score: 28,
        type: "tailored",
        colors: ["#292a35", "#eee9dd", "#6e7e9b"]
    },

    {
        id: "top-ribbon",
        name: "Ribbon Blouse",
        category: "top",
        rarity: "legendary",
        score: 35,
        type: "ribbon",
        colors: ["#d88da5", "#e9d5e3", "#6e527d"]
    },


    /* ========================================================
       DRESSES
       ======================================================== */

    {
        id: "dress-rose",
        name: "Rose Couture",
        category: "dress",
        rarity: "epic",
        score: 31,
        type: "aline",
        colors: ["#e8a6b7", "#c986a1", "#f1c9d3"]
    },

    {
        id: "dress-midnight",
        name: "Midnight Gown",
        category: "dress",
        rarity: "legendary",
        score: 45,
        type: "gown",
        colors: ["#171a25", "#252d45", "#352442"]
    },

    {
        id: "dress-lavender",
        name: "Lavender Muse",
        category: "dress",
        rarity: "epic",
        score: 29,
        type: "aline",
        colors: ["#bca7dc", "#9e87c4", "#d3c6e8"]
    },

    {
        id: "dress-satin",
        name: "Satin Evening",
        category: "dress",
        rarity: "rare",
        score: 34,
        type: "satin",
        colors: ["#8faecc", "#718cab", "#cad9e8"]
    },

    {
        id: "dress-classic",
        name: "A-Line Classic",
        category: "dress",
        rarity: "rare",
        score: 27,
        type: "aline",
        colors: ["#efe5c9", "#e3d6ba", "#f5f0df"]
    },

    {
        id: "dress-princess",
        name: "Princess Atelier",
        category: "dress",
        rarity: "legendary",
        score: 50,
        type: "princess",
        colors: ["#bca4df", "#e2b4c7", "#f3e0d0"]
    },

    {
        id: "dress-midi",
        name: "City Midi",
        category: "dress",
        rarity: "rare",
        score: 30,
        type: "midi",
        colors: ["#6c819e", "#9a7181", "#d1c7bb"]
    },

    {
        id: "dress-garden",
        name: "Garden Silk",
        category: "dress",
        rarity: "epic",
        score: 38,
        type: "garden",
        colors: ["#d49eae", "#93b9a8", "#ead7ad"]
    },


    /* ========================================================
       JACKETS
       ======================================================== */

    {
        id: "jacket-bomber",
        name: "Luxury Bomber",
        category: "jacket",
        rarity: "epic",
        score: 23,
        type: "bomber",
        colors: ["#24252d", "#393b49", "#5d5b70"]
    },

    {
        id: "jacket-blazer",
        name: "Atelier Blazer",
        category: "jacket",
        rarity: "rare",
        score: 28,
        type: "blazer",
        colors: ["#f0ece2", "#2b2c35", "#60738e"]
    },

    {
        id: "jacket-rose",
        name: "Rose Jacket",
        category: "jacket",
        rarity: "epic",
        score: 26,
        type: "blazer",
        colors: ["#d993a8", "#b9768c", "#e8bac6"]
    },

    {
        id: "jacket-denim",
        name: "Denim Jacket",
        category: "jacket",
        rarity: "common",
        score: 18,
        type: "denim",
        colors: ["#587da5", "#3d6289", "#86a7c7"]
    },

    {
        id: "jacket-leather",
        name: "Noir Leather",
        category: "jacket",
        rarity: "legendary",
        score: 39,
        type: "leather",
        colors: ["#17181e", "#2b2930", "#46343a"]
    },

    {
        id: "jacket-cropped",
        name: "Cropped Atelier",
        category: "jacket",
        rarity: "rare",
        score: 25,
        type: "cropped",
        colors: ["#d7c5b4", "#7d7385", "#b78e92"]
    },

    {
        id: "jacket-trench",
        name: "Mini Trench",
        category: "jacket",
        rarity: "epic",
        score: 36,
        type: "trench",
        colors: ["#c9b28d", "#8d7760", "#e2d3b9"]
    },


    /* ========================================================
       BOTTOMS
       ======================================================== */

    {
        id: "bottom-wide",
        name: "Wide Pants",
        category: "bottom",
        rarity: "common",
        score: 18,
        type: "wide",
        colors: ["#7ea8cf", "#d8d9d4", "#3d4d67"]
    },

    {
        id: "bottom-atelier",
        name: "Atelier Pants",
        category: "bottom",
        rarity: "rare",
        score: 19,
        type: "straight",
        colors: ["#3b3438", "#d8d0c7", "#637694"]
    },

    {
        id: "bottom-pleated",
        name: "Pleated Skirt",
        category: "bottom",
        rarity: "epic",
        score: 28,
        type: "pleated",
        colors: ["#b8a1dc", "#9a88bc", "#d7cce9"]
    },

    {
        id: "bottom-satin",
        name: "Satin Skirt",
        category: "bottom",
        rarity: "rare",
        score: 25,
        type: "skirt",
        colors: ["#dda4b3", "#c8899c", "#ead1d8"]
    },

    {
        id: "bottom-denim",
        name: "Denim Jeans",
        category: "bottom",
        rarity: "common",
        score: 17,
        type: "jeans",
        colors: ["#547da7", "#375c85", "#88a9c7"]
    },

    {
        id: "bottom-tailored",
        name: "Tailored Trousers",
        category: "bottom",
        rarity: "epic",
        score: 32,
        type: "tailored",
        colors: ["#262b35", "#4b5260", "#d5d0c8"]
    },

    {
        id: "bottom-cargo",
        name: "Atelier Cargo",
        category: "bottom",
        rarity: "rare",
        score: 24,
        type: "cargo",
        colors: ["#89917d", "#4f5b50", "#c0b79d"]
    },

    {
        id: "bottom-formal",
        name: "Formal Trousers",
        category: "bottom",
        gender: "male",
        rarity: "common",
        score: 18,
        type: "straight",
        colors: ["#242933", "#3f4654", "#e3ded2"]
    },


    /* ========================================================
       SHOES
       ======================================================== */

    {
        id: "shoe-pumps",
        name: "Classic Pumps",
        category: "shoes",
        rarity: "rare",
        score: 22,
        type: "heels",
        colors: ["#202127", "#c78998", "#efe3dc"]
    },

    {
        id: "shoe-loafers",
        name: "Atelier Loafers",
        category: "shoes",
        rarity: "common",
        score: 15,
        type: "loafer",
        colors: ["#573e36", "#20232b", "#bca27d"]
    },

    {
        id: "shoe-sneakers",
        name: "Studio Sneakers",
        category: "shoes",
        rarity: "common",
        score: 14,
        type: "sneaker",
        colors: ["#f1f0eb", "#6f8daa", "#343945"]
    },

    {
        id: "shoe-boots",
        name: "Runway Boots",
        category: "shoes",
        rarity: "epic",
        score: 29,
        type: "boots",
        colors: ["#25242a", "#4a3b40", "#8a6a5c"]
    },

    {
        id: "shoe-sandals",
        name: "Silk Sandals",
        category: "shoes",
        rarity: "rare",
        score: 20,
        type: "sandals",
        colors: ["#d8b8a6", "#c68a9b", "#b8a1cf"]
    },

    {
        id: "shoe-formal",
        name: "Formal Derby",
        category: "shoes",
        gender: "male",
        rarity: "rare",
        score: 23,
        type: "loafer",
        colors: ["#1c2026", "#463a36", "#6e5144"]
    },


    /* ========================================================
       HATS
       ======================================================== */

    {
        id: "hat-fedora",
        name: "Black Fedora",
        category: "hat",
        rarity: "epic",
        score: 27,
        type: "fedora",
        colors: ["#1b1b22", "#3b3438", "#51464a"]
    },

    {
        id: "hat-atelier",
        name: "Atelier Hat",
        category: "hat",
        rarity: "rare",
        score: 22,
        type: "wide",
        colors: ["#eee8dc", "#d3bca2", "#d8c8df"]
    },

    {
        id: "hat-beret",
        name: "Paris Beret",
        category: "hat",
        rarity: "rare",
        score: 20,
        type: "beret",
        colors: ["#a65d69", "#26354f", "#6f4f74"]
    },

    {
        id: "hat-cap",
        name: "Street Cap",
        category: "hat",
        rarity: "common",
        score: 12,
        type: "cap",
        colors: ["#293d5e", "#34353b", "#8e6c67"]
    },

    {
        id: "hat-sun",
        name: "Silk Sun Hat",
        category: "hat",
        rarity: "epic",
        score: 31,
        type: "sun",
        colors: ["#ead9b7", "#d7bda1", "#eee4d2"]
    },


    /* ========================================================
       GLASSES
       ======================================================== */

    {
        id: "glass-round",
        name: "Round Atelier",
        category: "glasses",
        rarity: "rare",
        score: 18,
        type: "round",
        colors: ["#262731", "#d4b66d", "#ffffff"]
    },

    {
        id: "glass-cat",
        name: "Cat Eye",
        category: "glasses",
        rarity: "epic",
        score: 25,
        type: "cat",
        colors: ["#23242c", "#a86679", "#74628d"]
    },

    {
        id: "glass-modern",
        name: "Modern Frame",
        category: "glasses",
        rarity: "common",
        score: 14,
        type: "square",
        colors: ["#313b4a", "#8b8e97", "#4e657b"]
    },

    {
        id: "glass-sun",
        name: "Runway Shades",
        category: "glasses",
        rarity: "legendary",
        score: 30,
        type: "sun",
        colors: ["#22242c", "#554b58", "#8e7a74"]
    },


    /* ========================================================
       BAGS
       ======================================================== */

    {
        id: "bag-mini",
        name: "Mini Shoulder Bag",
        category: "bag",
        rarity: "rare",
        score: 20,
        type: "shoulder",
        colors: ["#bd788b", "#26252c", "#c4a271"]
    },

    {
        id: "bag-tote",
        name: "Atelier Tote",
        category: "bag",
        rarity: "common",
        score: 15,
        type: "tote",
        colors: ["#e1d6c7", "#6c7181", "#a98677"]
    },

    {
        id: "bag-crossbody",
        name: "Crossbody Luxe",
        category: "bag",
        rarity: "epic",
        score: 27,
        type: "crossbody",
        colors: ["#26252c", "#704d61", "#d1af72"]
    },

    {
        id: "bag-clutch",
        name: "Evening Clutch",
        category: "bag",
        rarity: "legendary",
        score: 34,
        type: "clutch",
        colors: ["#1e2027", "#a26c80", "#d5b36e"]
    },


    /* ========================================================
       ACCESSORIES
       ======================================================== */

    {
        id: "acc-necklace",
        name: "Pearl Necklace",
        category: "accessory",
        rarity: "rare",
        score: 16,
        type: "necklace",
        colors: ["#f3ede0", "#d6b36b"]
    },

    {
        id: "acc-ribbon",
        name: "Silk Ribbon",
        category: "accessory",
        rarity: "common",
        score: 12,
        type: "ribbon",
        colors: ["#d68da1", "#9271b1", "#769bbf"]
    },

    {
        id: "acc-brooch",
        name: "Atelier Brooch",
        category: "accessory",
        rarity: "epic",
        score: 24,
        type: "brooch",
        colors: ["#d5b568", "#c88a9b", "#a7b4c8"]
    },

    {
        id: "acc-scarf",
        name: "Silk Scarf",
        category: "accessory",
        rarity: "rare",
        score: 21,
        type: "scarf",
        colors: ["#d19aab", "#7086a9", "#a896c4"]
    },
    /* ============================================================
   MALE SEIJIN SHIKI COLLECTION
   ============================================================ */

{
    id: "top-seijin-kimono-black",
    name: "Seijin Kimono Black",
    category: "top",
    gender: "male",
    rarity: "legendary",
    score: 45,
    type: "kimonoBlack",
    colors: ["#111318", "#232833", "#3c4656"]
},

{
    id: "top-seijin-kimono-navy",
    name: "Seijin Kimono Navy",
    category: "top",
    gender: "male",
    rarity: "epic",
    score: 38,
    type: "kimonoNavy",
    colors: ["#1f2f4c", "#3f567f", "#d7d8dd"]
},

{
    id: "top-haori-formal",
    name: "Formal Haori",
    category: "top",
    gender: "male",
    rarity: "legendary",
    score: 48,
    type: "haoriFormal",
    colors: ["#18191f", "#303543", "#5d6574"]
},

{
    id: "top-haori-white",
    name: "White Ceremony Haori",
    category: "top",
    gender: "male",
    rarity: "epic",
    score: 40,
    type: "haoriWhite",
    colors: ["#f6f5f0", "#dad6ce", "#bcc6d6"]
},

{
    id: "bottom-hakama-black",
    name: "Traditional Hakama",
    category: "bottom",
    gender: "male",
    rarity: "legendary",
    score: 42,
    type: "hakama",
    colors: ["#101115", "#22252d", "#353a45"]
},

{
    id: "bottom-hakama-navy",
    name: "Modern Hakama",
    category: "bottom",
    gender: "male",
    rarity: "epic",
    score: 36,
    type: "hakamaModern",
    colors: ["#23324d", "#40557d", "#d8d9df"]
},

{
    id: "shoe-zori-formal",
    name: "Formal Zori",
    category: "shoes",
    gender: "male",
    rarity: "epic",
    score: 32,
    type: "zori",
    colors: ["#f1efe8", "#d7c7aa", "#3f342e"]
},

{
    id: "shoe-geta-premium",
    name: "Premium Geta",
    category: "shoes",
    gender: "male",
    rarity: "legendary",
    score: 38,
    type: "geta",
    colors: ["#6d4f38", "#2a2420", "#b98a58"]
},

{
    id: "hat-seijin-eboshi",
    name: "Ceremony Eboshi",
    category: "hat",
    gender: "male",
    rarity: "legendary",
    score: 40,
    type: "eboshi",
    colors: ["#101114", "#252932", "#444c5c"]
},

{
    id: "acc-seijin-fan",
    name: "Traditional Sensu",
    category: "accessory",
    gender: "male",
    rarity: "epic",
    score: 26,
    type: "sensu",
    colors: ["#111318", "#d5b06b", "#f2efe7"]
},

/* ============================================================
   MALE BUSINESS SUIT COLLECTION
   ============================================================ */

{
    id: "top-executive-shirt",
    name: "Executive Shirt",
    category: "top",
    gender: "male",
    rarity: "common",
    score: 18,
    type: "executiveShirt",
    colors: ["#ffffff", "#dde7f2", "#ece6d8"]
},

{
    id: "top-business-shirt-blue",
    name: "Business Blue Shirt",
    category: "top",
    gender: "male",
    rarity: "rare",
    score: 22,
    type: "businessBlue",
    colors: ["#dce8f7", "#a7bdd8", "#f5f5f5"]
},

{
    id: "jacket-business-suit",
    name: "Executive Suit",
    category: "jacket",
    gender: "male",
    rarity: "legendary",
    score: 46,
    type: "executiveSuit",
    colors: ["#1d2129", "#2d3544", "#4d5a70"]
},

{
    id: "jacket-business-grey",
    name: "Grey Business Suit",
    category: "jacket",
    gender: "male",
    rarity: "epic",
    score: 38,
    type: "greySuit",
    colors: ["#6f7683", "#4f5663", "#dadada"]
},

{
    id: "jacket-double-breasted",
    name: "Double Breasted Suit",
    category: "jacket",
    gender: "male",
    rarity: "legendary",
    score: 50,
    type: "doubleBreasted",
    colors: ["#11161d", "#293446", "#44546d"]
},

{
    id: "bottom-business-pants",
    name: "Business Trousers",
    category: "bottom",
    gender: "male",
    rarity: "rare",
    score: 24,
    type: "businessPants",
    colors: ["#1f242d", "#364154", "#d7d3cb"]
},

{
    id: "shoe-oxford-premium",
    name: "Premium Oxford",
    category: "shoes",
    gender: "male",
    rarity: "legendary",
    score: 35,
    type: "oxfordPremium",
    colors: ["#2d211d", "#4e3830", "#7d5a4f"]
},

{
    id: "shoe-monk-strap",
    name: "Monk Strap",
    category: "shoes",
    gender: "male",
    rarity: "epic",
    score: 30,
    type: "monk",
    colors: ["#241d1b", "#503d35", "#916e5d"]
},

/* ============================================================
   MALE STREETWEAR COLLECTION
   ============================================================ */

{
    id: "top-oversized-hoodie",
    name: "Oversized Hoodie",
    category: "top",
    gender: "male",
    rarity: "rare",
    score: 25,
    type: "oversizedHoodie",
    colors: ["#1e2026", "#5f6675", "#d6d6d6"]
},

{
    id: "top-street-tee",
    name: "Street Graphic Tee",
    category: "top",
    gender: "male",
    rarity: "common",
    score: 18,
    type: "streetTee",
    colors: ["#ffffff", "#232323", "#425981"]
},

{
    id: "top-bomber-urban",
    name: "Urban Bomber",
    category: "top",
    gender: "male",
    rarity: "epic",
    score: 30,
    type: "urbanBomber",
    colors: ["#1b1e26", "#44506a", "#7f8794"]
},

{
    id: "jacket-techwear",
    name: "Techwear Jacket",
    category: "jacket",
    gender: "male",
    rarity: "legendary",
    score: 44,
    type: "techwear",
    colors: ["#0f1116", "#252a34", "#3d4554"]
},

{
    id: "jacket-varsity-premium",
    name: "Premium Varsity",
    category: "jacket",
    gender: "male",
    rarity: "epic",
    score: 34,
    type: "varsityPremium",
    colors: ["#233550", "#f1f1f1", "#7f90a7"]
},

{
    id: "bottom-ripped-jeans",
    name: "Ripped Denim",
    category: "bottom",
    gender: "male",
    rarity: "rare",
    score: 23,
    type: "rippedJeans",
    colors: ["#314f78", "#5276a4", "#21242d"]
},

{
    id: "bottom-techwear-cargo",
    name: "Techwear Cargo",
    category: "bottom",
    gender: "male",
    rarity: "legendary",
    score: 40,
    type: "techwearCargo",
    colors: ["#111318", "#2c313b", "#4a5361"]
},

{
    id: "bottom-jogger-urban",
    name: "Urban Jogger",
    category: "bottom",
    gender: "male",
    rarity: "rare",
    score: 24,
    type: "urbanJogger",
    colors: ["#1c1e24", "#5b6371", "#d5d5d5"]
},

{
    id: "shoe-high-top-premium",
    name: "High Top Premium",
    category: "shoes",
    gender: "male",
    rarity: "epic",
    score: 28,
    type: "highTopPremium",
    colors: ["#ffffff", "#1f2736", "#232323"]
},

{
    id: "shoe-techwear",
    name: "Techwear Boots",
    category: "shoes",
    gender: "male",
    rarity: "legendary",
    score: 38,
    type: "techwearBoots",
    colors: ["#111318", "#262a33", "#444b59"]
},

{
    id: "hat-bucket-street",
    name: "Street Bucket Hat",
    category: "hat",
    gender: "male",
    rarity: "rare",
    score: 22,
    type: "bucketHat",
    colors: ["#20242d", "#44506a", "#d8d8d8"]
},

{
    id: "bag-sling-street",
    name: "Street Sling Bag",
    category: "bag",
    gender: "male",
    rarity: "epic",
    score: 27,
    type: "streetSling",
    colors: ["#17191f", "#2f3441", "#5c6472"]
},

{
    id: "acc-smartwatch",
    name: "Smart Watch",
    category: "accessory",
    gender: "male",
    rarity: "rare",
    score: 18,
    type: "smartwatch",
    colors: ["#111318", "#9aa0ab", "#444b57"]
},
/* ============================================================
   FEMALE SEIJIN SHIKI COLLECTION
   ============================================================ */

{
    id: "dress-furisode-sakura",
    name: "Sakura Furisode",
    category: "dress",
    rarity: "legendary",
    score: 55,
    type: "furisodeSakura",
    colors: ["#f4d4de", "#d88fa5", "#fff4f7"]
},

{
    id: "dress-furisode-crimson",
    name: "Crimson Furisode",
    category: "dress",
    rarity: "legendary",
    score: 58,
    type: "furisodeCrimson",
    colors: ["#b82e4d", "#e4b6c1", "#f8e9ee"]
},

{
    id: "dress-furisode-royal",
    name: "Royal Blue Furisode",
    category: "dress",
    rarity: "legendary",
    score: 60,
    type: "furisodeRoyal",
    colors: ["#274f8c", "#6f91c8", "#e8edf8"]
},

{
    id: "dress-furisode-gold",
    name: "Golden Crane Furisode",
    category: "dress",
    rarity: "mythic",
    score: 75,
    type: "furisodeGold",
    colors: ["#e8c35d", "#fff1c7", "#f7fafb"]
},

{
    id: "dress-furisode-lavender",
    name: "Lavender Dream Furisode",
    category: "dress",
    rarity: "epic",
    score: 48,
    type: "furisodeLavender",
    colors: ["#bba0de", "#d8caef", "#f5effb"]
},

{
    id: "dress-furisode-midnight",
    name: "Midnight Sakura Furisode",
    category: "dress",
    rarity: "legendary",
    score: 62,
    type: "furisodeMidnight",
    colors: ["#1e2231", "#47516d", "#d9a8b9"]
},

/* ============================================================
   KIMONO & HAKAMA
   ============================================================ */

{
    id: "dress-kimono-modern",
    name: "Modern Kimono",
    category: "dress",
    rarity: "epic",
    score: 42,
    type: "modernKimono",
    colors: ["#e7d6c2", "#b78670", "#faf6ef"]
},

{
    id: "dress-hakama-female",
    name: "Ceremony Hakama",
    category: "dress",
    rarity: "epic",
    score: 45,
    type: "femaleHakama",
    colors: ["#7c2732", "#2a2f47", "#f4efe6"]
},

{
    id: "dress-kimono-silk",
    name: "Silk Ceremony Kimono",
    category: "dress",
    rarity: "legendary",
    score: 58,
    type: "silkKimono",
    colors: ["#f8f0e3", "#d8b06c", "#a95d73"]
},

/* ============================================================
   OBI
   ============================================================ */

{
    id: "acc-obi-gold",
    name: "Golden Obi",
    category: "accessory",
    rarity: "epic",
    score: 25,
    type: "obiGold",
    colors: ["#d8ae52", "#f2dd9e", "#fff5d6"]
},

{
    id: "acc-obi-sakura",
    name: "Sakura Obi",
    category: "accessory",
    rarity: "rare",
    score: 20,
    type: "obiSakura",
    colors: ["#d78da6", "#f1d4de", "#fff8fb"]
},

{
    id: "acc-obi-royal",
    name: "Royal Obi",
    category: "accessory",
    rarity: "legendary",
    score: 30,
    type: "obiRoyal",
    colors: ["#24427a", "#d4b36c", "#e8edf8"]
},

/* ============================================================
   HAIRSTYLES
   ============================================================ */

{
    id: "hair-seijin-bun",
    name: "Elegant Seijin Bun",
    category: "hair",
    rarity: "epic",
    score: 30,
    type: "seijinBun",
    colors: ["#3a2a26", "#1f2027", "#6a4c44"]
},

{
    id: "hair-seijin-updo",
    name: "Traditional Updo",
    category: "hair",
    rarity: "legendary",
    score: 35,
    type: "traditionalUpdo",
    colors: ["#2b2424", "#1a1a1f", "#5a4039"]
},

{
    id: "hair-seijin-wave",
    name: "Soft Ceremony Wave",
    category: "hair",
    rarity: "rare",
    score: 22,
    type: "ceremonyWave",
    colors: ["#503833", "#221f24", "#8a5f54"]
},

/* ============================================================
   HEAD ACCESSORIES
   ============================================================ */

{
    id: "hat-kanzashi-sakura",
    name: "Sakura Kanzashi",
    category: "hat",
    rarity: "epic",
    score: 28,
    type: "kanzashiSakura",
    colors: ["#f3d5de", "#d98ea6", "#ffffff"]
},

{
    id: "hat-kanzashi-gold",
    name: "Golden Kanzashi",
    category: "hat",
    rarity: "legendary",
    score: 35,
    type: "kanzashiGold",
    colors: ["#d9af58", "#f7e4a5", "#fff9ea"]
},

{
    id: "hat-flower-crown-japan",
    name: "Japanese Flower Crown",
    category: "hat",
    rarity: "epic",
    score: 32,
    type: "flowerCrownJapan",
    colors: ["#f4d4de", "#ffffff", "#e7c16d"]
},

/* ============================================================
   FOOTWEAR
   ============================================================ */

{
    id: "shoe-zori-sakura",
    name: "Sakura Zori",
    category: "shoes",
    rarity: "rare",
    score: 22,
    type: "zoriSakura",
    colors: ["#f2d6df", "#ffffff", "#d08ea1"]
},

{
    id: "shoe-zori-gold",
    name: "Golden Zori",
    category: "shoes",
    rarity: "legendary",
    score: 36,
    type: "zoriGold",
    colors: ["#d9ae58", "#fff4d6", "#ffffff"]
},

{
    id: "shoe-geta-luxury",
    name: "Luxury Geta",
    category: "shoes",
    rarity: "epic",
    score: 30,
    type: "femaleGeta",
    colors: ["#7a543a", "#c69461", "#2d2420"]
},

/* ============================================================
   BAGS
   ============================================================ */

{
    id: "bag-seijin-pouch",
    name: "Seijin Ceremony Pouch",
    category: "bag",
    rarity: "rare",
    score: 24,
    type: "ceremonyPouch",
    colors: ["#f0d7df", "#d18da3", "#ffffff"]
},

{
    id: "bag-silk-kinchaku",
    name: "Silk Kinchaku",
    category: "bag",
    rarity: "legendary",
    score: 38,
    type: "kinchaku",
    colors: ["#c73f5f", "#f2d3dc", "#f8f8f8"]
},
/* ============================================================
   MALE SEIJIN SHIKI — EXPANSION
   ============================================================ */

{
    id: "top-haori-crest-black",
    name: "Haori Lambang Hitam",
    category: "top",
    gender: "male",
    rarity: "legendary",
    score: 50,
    type: "haoriCrestBlack",
    colors: ["#101114", "#2a2f3a", "#c9a34d"]
},

{
    id: "top-haori-crest-navy",
    name: "Haori Lambang Navy",
    category: "top",
    gender: "male",
    rarity: "epic",
    score: 42,
    type: "haoriCrestNavy",
    colors: ["#1b2c4a", "#37517d", "#d8b25a"]
},

{
    id: "top-kimono-charcoal",
    name: "Kimono Formal Charcoal",
    category: "top",
    gender: "male",
    rarity: "epic",
    score: 39,
    type: "kimonoCharcoal",
    colors: ["#2b2d33", "#454852", "#8f939c"]
},

{
    id: "top-kimono-copper",
    name: "Kimono Tembaga Seijin",
    category: "top",
    gender: "male",
    rarity: "legendary",
    score: 47,
    type: "kimonoCopper",
    colors: ["#8a4a2f", "#c9793f", "#f0c48a"]
},

{
    id: "bottom-hakama-charcoal",
    name: "Hakama Charcoal Formal",
    category: "bottom",
    gender: "male",
    rarity: "epic",
    score: 37,
    type: "hakamaCharcoal",
    colors: ["#26282e", "#42454e", "#7c8089"]
},

{
    id: "bottom-hakama-crest",
    name: "Hakama Lambang Keluarga",
    category: "bottom",
    gender: "male",
    rarity: "legendary",
    score: 44,
    type: "hakamaCrest",
    colors: ["#1d1f24", "#3a3f4a", "#c9a34d"]
},

{
    id: "shoe-zori-premium-black",
    name: "Zori Formal Hitam",
    category: "shoes",
    gender: "male",
    rarity: "epic",
    score: 29,
    type: "zoriBlack",
    colors: ["#141416", "#2c2c30", "#d7c7aa"]
},

{
    id: "hat-seijin-kasa",
    name: "Topi Kasa Tradisional",
    category: "hat",
    gender: "male",
    rarity: "rare",
    score: 22,
    type: "kasaHat",
    colors: ["#e7ddc7", "#c9b48d", "#8a6e4b"]
},

{
    id: "acc-seijin-obi-male",
    name: "Obi Formal Pria",
    category: "accessory",
    gender: "male",
    rarity: "epic",
    score: 24,
    type: "obiMale",
    colors: ["#1b1c20", "#c9a34d", "#3a3f4a"]
},

{
    id: "acc-haori-himo",
    name: "Tali Haori Himo",
    category: "accessory",
    gender: "male",
    rarity: "rare",
    score: 18,
    type: "haoriHimo",
    colors: ["#c9a34d", "#7c5c2e", "#1b1c20"]
},

/* ============================================================
   MALE GENERAL ACCESSORIES — NEW
   ============================================================ */

{
    id: "acc-pocket-watch",
    name: "Jam Saku Vintage",
    category: "accessory",
    gender: "male",
    rarity: "epic",
    score: 23,
    type: "pocketWatch",
    colors: ["#d5ae61", "#2b2c35", "#c4cad3"]
},

{
    id: "acc-cufflinks",
    name: "Kancing Manset",
    category: "accessory",
    gender: "male",
    rarity: "rare",
    score: 15,
    type: "cufflinks",
    colors: ["#c4cad3", "#1c1d25", "#d5ae61"]
},

{
    id: "acc-tie-formal",
    name: "Dasi Formal",
    category: "accessory",
    gender: "male",
    rarity: "common",
    score: 13,
    type: "necktie",
    colors: ["#1c1d25", "#8a1f2b", "#253a59"]
},

{
    id: "acc-kamon-pin",
    name: "Pin Lambang Keluarga",
    category: "accessory",
    gender: "male",
    rarity: "legendary",
    score: 30,
    type: "kamonPin",
    colors: ["#c9a34d", "#1b1c20"]
},

{
    id: "acc-leather-belt",
    name: "Ikat Pinggang Kulit",
    category: "accessory",
    gender: "male",
    rarity: "common",
    score: 12,
    type: "leatherBelt",
    colors: ["#3a2a20", "#1c1410", "#6b4a30"]
}

];


/* ============================================================
   07. THREE VARIABLES
   ============================================================ */

let scene = null;

let camera = null;

let renderer = null;

let avatar = null;

let avatarRoot = null;

let bodyRoot = null;

let clothingRoot = null;

let underLayerRoot = null;

let hairRoot = null;

let hatRoot = null;

let glassesRoot = null;

let bagRoot = null;

let accessoryRoot = null;

let shoeRoot = null;

let topRoot = null;

let dressRoot = null;

let jacketRoot = null;

let bottomRoot = null;

let stageRoot = null;

let resizeObserver = null;

let animationFrame = null;


/* ============================================================
   07a. ENVIRONMENT / THEME (NEW)
   ------------------------------------------------------------
   Referensi terpisah (di luar materialCache) untuk elemen
   panggung & lighting, supaya warnanya bisa diubah-ubah sesuai
   tema outfit tanpa mengganggu material item lain yang mungkin
   kebetulan memakai warna cache yang sama.
   ============================================================ */

let ambientLight = null;

let keyLight = null;

let fillLight = null;

let rimLight = null;

let floorMaterial = null;

let platformMaterial = null;

let ringMaterial = null;

let ring2Material = null;

let particleSystem = null;

let particleTextureCache = null;

const skyTextureCache = new Map();

let clock = null;


/* ============================================================
   08. MATERIALS
   ============================================================ */

const materialCache = new Map();


function getMaterial(color, options = {}) {

    const key = [
        color,
        options.roughness ?? .68,
        options.metalness ?? 0,
        options.transparent ?? false,
        options.opacity ?? 1
    ].join("|");

    if (materialCache.has(key)) {
        return materialCache.get(key);
    }

    const mat =
        new THREE.MeshStandardMaterial({

            color: new THREE.Color(color),

            roughness:
                options.roughness ?? .68,

            metalness:
                options.metalness ?? 0,

            transparent:
                options.transparent ?? false,

            opacity:
                options.opacity ?? 1,

            side: THREE.DoubleSide
        });

    materialCache.set(key, mat);

    return mat;
}


function fabric(color) {

    return getMaterial(
        color,
        {
            roughness: .72,
            metalness: .02
        }
    );
}


function satin(color) {

    return getMaterial(
        color,
        {
            roughness: .25,
            metalness: .06
        }
    );
}


function leather(color) {

    return getMaterial(
        color,
        {
            roughness: .38,
            metalness: .08
        }
    );
}


function metal(color) {

    return getMaterial(
        color,
        {
            roughness: .2,
            metalness: .75
        }
    );
}


function skinMaterial() {

    return getMaterial(
        CONFIG.colors.skin,
        {
            roughness: .58
        }
    );
}


/* ============================================================
   09. GEOMETRY HELPERS
   ============================================================ */

function addMesh(
    parent,
    geometry,
    material,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = [1, 1, 1]
) {

    const object =
        new THREE.Mesh(
            geometry,
            material
        );

    object.position.set(
        position[0],
        position[1],
        position[2]
    );

    object.rotation.set(
        rotation[0],
        rotation[1],
        rotation[2]
    );

    object.scale.set(
        scale[0],
        scale[1],
        scale[2]
    );

    object.castShadow = true;

    object.receiveShadow = true;

    parent.add(object);

    return object;
}


function sphere(
    parent,
    scale,
    position,
    material,
    segments = 32
) {

    return addMesh(
        parent,

        new THREE.SphereGeometry(
            1,
            segments,
            24
        ),

        material,

        position,

        [0, 0, 0],

        scale
    );
}


function capsule(
    parent,
    radius,
    length,
    position,
    material
) {

    return addMesh(
        parent,

        new THREE.CapsuleGeometry(
            radius,
            length,
            8,
            20
        ),

        material,

        position
    );
}


function cylinder(
    parent,
    top,
    bottom,
    height,
    position,
    material,
    segments = 40
) {

    return addMesh(
        parent,

        new THREE.CylinderGeometry(
            top,
            bottom,
            height,
            segments
        ),

        material,

        position
    );
}


function box(
    parent,
    size,
    position,
    material,
    radius = 0
) {

    /*
     * Rounded box dibuat dengan bevelled BoxGeometry
     * melalui bevel modifier sederhana.
     *
     * Untuk stabilitas browser, gunakan BoxGeometry
     * lalu beri bevel visual melalui sphere/strap.
     */

    return addMesh(
        parent,

        new THREE.BoxGeometry(
            size[0],
            size[1],
            size[2]
        ),

        material,

        position
    );
}


function torus(
    parent,
    radius,
    tube,
    position,
    rotation,
    material
) {

    return addMesh(
        parent,

        new THREE.TorusGeometry(
            radius,
            tube,
            12,
            40
        ),

        material,

        position,

        rotation
    );
}


/* ============================================================
   09a. SHOULDER CONNECTOR (NEW — FIX untuk avatar "melayang")
   ------------------------------------------------------------
   Masalah: torso baju/dress/jaket (sphere) dan lengan (capsule)
   dibuat sebagai dua geometri terpisah, cuma ditumpuk posisinya.
   Dari depan mereka kelihatan nyambung karena siluetnya kebetulan
   pas, tapi dari SAMPING atau BELAKANG ada celah/step di sendi
   bahu — persis itu yang bikin kesan "mengambang" atau "item
   terpisah" di badan.

   Fix: tambahkan satu sphere kecil tepat di titik pertemuan
   torso-lengan, dengan radius sedikit lebih besar daripada
   capsule lengan supaya overlap-nya dalam ke torso maupun ke
   lengan — jadi transisinya menyatu dari sudut manapun, bukan
   cuma dari depan.

   Dipanggil di createTop(), createDress(), dan createJacket()
   persis setelah sleeve capsule dibuat, tanpa mengubah baris
   yang sudah ada.
   ============================================================ */

function shoulderConnector(
    parent,
    x,
    y,
    z,
    material,
    radius = .27
) {

    sphere(
        parent,
        [radius, radius, radius * .88],
        [x, y, z],
        material,
        24
    );
}


/* ============================================================
   10. CLEAR GROUP
   ============================================================ */

function clearGroup(group) {

    if (!group) {
        return;
    }

    while (group.children.length) {

        const child =
            group.children.pop();

        child.traverse(
            object => {

                if (object.geometry) {
                    object.geometry.dispose();
                }

                /*
                 * Material cache jangan dihancurkan.
                 */

            }
        );
    }
}


/* ============================================================
   10a. HIDE LOADING OVERLAY (FIX: "Loading 3D Studio" overlay
        never disappears because nothing ever hides it. This
        looks for the overlay via common selectors, and as a
        fallback searches by its visible text, then hides it
        once the avatar has actually finished initializing.
   ============================================================ */

function hideLoadingOverlay() {

    let loading =
        firstExisting([
            "#fashionLoading",
            "#fashionLoadingScreen",
            "#fashionLoadingOverlay",
            "#fashion3DLoading",
            "[data-fashion-loading]",
            ".fashion-loading",
            ".fashion-loading-screen",
            ".fashion-loading-overlay",
            ".loading-overlay",
            "#loadingScreen",
            "#loading-screen"
        ]);


    /*
     * Fallback: cari elemen yang isinya
     * teks "Loading 3D Studio" secara langsung,
     * jika selector di atas tidak ditemukan.
     */

    if (!loading) {

        const candidates =
            ROOT.querySelectorAll(
                "div, section"
            );

        for (const element of candidates) {

            const text =
                element.textContent || "";

            if (
                text.includes(
                    "Loading 3D Studio"
                ) &&
                element.children.length <= 4
            ) {

                loading = element;

                break;
            }
        }
    }

    if (!loading) {
        return;
    }


    /*
     * Sembunyikan overlay-nya (dan parent
     * langsungnya jika parent itu sepertinya
     * cuma wrapper khusus loading, mis. class
     * mengandung kata "loading").
     */

    const parent =
        loading.parentElement;

    const target =
        (
            parent &&
            /loading/i.test(
                parent.className || ""
            )
        )
            ? parent
            : loading;


    target.style.transition =
        "opacity .25s ease";

    target.style.opacity =
        "0";

    target.style.pointerEvents =
        "none";

    setTimeout(
        () => {

            target.style.display =
                "none";

        },
        260
    );
}


/* ============================================================
   10b. UI EVENTS (FIX: previously called but never defined —
        caused "Uncaught ReferenceError: setupUIEvents is not
        defined" inside initThree()). This is a safe no-op
        placeholder so the call in initThree() succeeds; all
        actual UI wiring already happens in setupStageControls(),
        setupGenderEvents(), setupSearch(), setupCategories(),
        setupZoomButtons() and setupExistingButtons(), which are
        untouched. If you intended setupUIEvents() to bind extra
        controls, add that logic inside this function.
   ============================================================ */

function setupUIEvents() {

    /*
     * Intentionally left as a no-op.
     * All other UI bindings are handled by the other setup*
     * functions already called in initThree().
     */

}


/* ============================================================
   11. SCENE
   ============================================================ */

function initThree() {

    const container =
        firstExisting([
            "#fashionThreeContainer",
            "#fashion3D",
            "#fashionCanvas",
            ".fashion-three-container"
        ]);

    if (!container) {

        console.warn(
            "[Fashion Designer] 3D container tidak ditemukan."
        );

        return;
    }

    scene =
        new THREE.Scene();

    scene.background = null;

    /*
     * NEW: clock dipakai untuk animasi partikel tema
     * (sakura/salju/kilau/bokeh) di updateParticles().
     */

    clock =
        new THREE.Clock();


    /* ========================================================
       CAMERA
       ======================================================== */

    camera =
        new THREE.PerspectiveCamera(
            30,
            1,
            .05,
            100
        );

    camera.position.set(
        0,
        2.55,
        CONFIG.camera.defaultDistance
    );


    /* ========================================================
       RENDERER
       ======================================================== */

    renderer =
        new THREE.WebGLRenderer({

            antialias: true,

            alpha: true,

            powerPreference:
                "high-performance",

            /*
             * NEW: wajib true supaya renderer.domElement.toDataURL()
             * di saveDesignAsImage() selalu berhasil mengambil
             * screenshot avatar — tanpa ini, buffer bisa sudah
             * dibersihkan browser sebelum sempat di-capture,
             * menghasilkan gambar kosong/transparan.
             */

            preserveDrawingBuffer: true
        });

    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio || 1,
            2
        )
    );

    renderer.outputColorSpace =
        THREE.SRGBColorSpace;

    renderer.toneMapping =
        THREE.ACESFilmicToneMapping;

    renderer.toneMappingExposure =
        1.08;

    renderer.shadowMap.enabled = true;

    renderer.shadowMap.type =
        THREE.PCFSoftShadowMap;

    container.appendChild(
        renderer.domElement
    );


    /* ========================================================
       LIGHTING
       ------------------------------------------------------
       NEW: disimpan ke variabel module-level (ambientLight,
       keyLight, fillLight, rimLight) alih-alih const lokal,
       supaya warnanya bisa diubah nanti oleh
       applyEnvironmentTheme() sesuai tema outfit yang sedang
       dipakai (lihat bagian ENVIRONMENT / THEME).
       ======================================================== */

    ambientLight =
        new THREE.HemisphereLight(
            0xdcecff,
            0x071321,
            2.6
        );

    scene.add(ambientLight);


    keyLight =
        new THREE.DirectionalLight(
            0xffffff,
            4.4
        );

    keyLight.position.set(
        -4,
        7,
        6
    );

    keyLight.castShadow = true;

    keyLight.shadow.mapSize.width = 2048;

    keyLight.shadow.mapSize.height = 2048;

    scene.add(keyLight);


    fillLight =
        new THREE.DirectionalLight(
            0x9ac9ff,
            2.4
        );

    fillLight.position.set(
        4,
        4,
        -3
    );

    scene.add(fillLight);


    rimLight =
        new THREE.PointLight(
            0xb89aff,
            18,
            14
        );

    rimLight.position.set(
        -3,
        4,
        -4
    );

    scene.add(rimLight);


    /* ========================================================
       STAGE
       ======================================================== */

    createStage();


    /* ========================================================
       AVATAR
       ======================================================== */

    createAvatar();


    /* ========================================================
       EVENTS
       ======================================================== */

    setupStageControls();

    setupUIEvents();

    setupGenderEvents();

    setupSearch();

    setupCategories();

    setupZoomButtons();

    setupExistingButtons();


resizeThree();

// FIX: paksa resize sekali lagi setelah layout benar-benar
// selesai (rAF + timeout kecil), karena saat initThree() jalan
// pertama kali, tinggi container kadang belum final (terutama
// di layout mobile/flex) — akibatnya canvas ter-render lebih
// pendek dari panel, dan background biru bawaan .fashion-stage
// jadi kelihatan di bawah canvas.
requestAnimationFrame(resizeThree);

setTimeout(resizeThree, 300);

if ("ResizeObserver" in window) {

    resizeObserver =
        new ResizeObserver(
            resizeThree
        );

    resizeObserver.observe(
        container
    );
}

    window.addEventListener(
        "resize",
        resizeThree
    );


    state.initialized = true;

    updateAllUI();

    animate();

    /*
     * Avatar & scene sudah siap —
     * sembunyikan overlay "Loading 3D Studio".
     */

    hideLoadingOverlay();
}


/* ============================================================
   12. STAGE
   ============================================================ */

function createStage() {

    stageRoot =
        new THREE.Group();

    scene.add(stageRoot);


    /*
     * NEW: material panggung dibuat langsung (bukan lewat
     * getMaterial() cache) dan disimpan ke variabel
     * module-level, supaya applyEnvironmentTheme() bisa
     * mengganti warnanya sesuai tema outfit tanpa ikut
     * mengubah warna objek lain yang kebetulan memakai kode
     * warna yang sama di cache.
     */

    floorMaterial =
        new THREE.MeshStandardMaterial({
            color: new THREE.Color("#172f56"),
            roughness: .8,
            side: THREE.DoubleSide
        });

    const floor =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                3.0,
                3.0,
                .12,
                96
            ),

            floorMaterial
        );

    floor.position.y = .05;

    floor.receiveShadow = true;

    stageRoot.add(floor);


    platformMaterial =
        new THREE.MeshStandardMaterial({
            color: new THREE.Color("#1f4b91"),
            roughness: .62,
            metalness: .08,
            side: THREE.DoubleSide
        });

    const platform =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                1.55,
                1.72,
                .16,
                96
            ),

            platformMaterial
        );

    platform.position.y = .17;

    platform.receiveShadow = true;

    platform.castShadow = true;

    stageRoot.add(platform);


    ringMaterial =
        new THREE.MeshStandardMaterial({
            color: new THREE.Color("#2993ef"),
            roughness: .3,
            metalness: .4,
            side: THREE.DoubleSide
        });

    const ring =
        new THREE.Mesh(

            new THREE.TorusGeometry(
                2.72,
                .018,
                10,
                96
            ),

            ringMaterial
        );

    ring.rotation.x =
        Math.PI / 2;

    ring.position.y =
        .14;

    stageRoot.add(ring);


    ring2Material =
        new THREE.MeshStandardMaterial({
            color: new THREE.Color("#4c9df0"),
            roughness: .3,
            metalness: .4,
            side: THREE.DoubleSide
        });

    const ring2 =
        new THREE.Mesh(

            new THREE.TorusGeometry(
                1.58,
                .012,
                8,
                80
            ),

            ring2Material
        );

    ring2.rotation.x =
        Math.PI / 2;

    ring2.position.y =
        .26;

    stageRoot.add(ring2);
}


/* ============================================================
   13. AVATAR ROOT
   ============================================================ */

function createAvatar() {

    if (!scene) {
        return;
    }

    /* =====================================================
       CLEAR OLD AVATAR
       ===================================================== */

    if (avatar) {

        scene.remove(avatar);

        avatar.traverse((object) => {

            if (object.geometry) {
                object.geometry.dispose();
            }

            if (object.material) {

                if (Array.isArray(object.material)) {

                    object.material.forEach(
                        material => material.dispose()
                    );

                } else {

                    object.material.dispose();

                }
            }
        });
    }

    /* =====================================================
       MAIN AVATAR
       ===================================================== */

    avatar =
        new THREE.Group();

    avatar.position.y =
        0.05;

    scene.add(avatar);

    /* =====================================================
       AVATAR ROOT
       ===================================================== */

    avatarRoot =
        new THREE.Group();

    avatar.add(
        avatarRoot
    );

    /* =====================================================
       BODY
       ===================================================== */

    bodyRoot =
        new THREE.Group();

    avatarRoot.add(
        bodyRoot
    );

    /* =====================================================
       CLOTHING
       ===================================================== */

    clothingRoot =
        new THREE.Group();

    avatarRoot.add(
        clothingRoot
    );

    /* =====================================================
       UNDERLAYER
       ===================================================== */

    underLayerRoot =
        new THREE.Group();

    avatarRoot.add(
        underLayerRoot
    );

    /* =====================================================
       FASHION ROOTS
       ===================================================== */

    hairRoot =
        new THREE.Group();

    hatRoot =
        new THREE.Group();

    glassesRoot =
        new THREE.Group();

    bagRoot =
        new THREE.Group();

    accessoryRoot =
        new THREE.Group();

    shoeRoot =
        new THREE.Group();

    bottomRoot =
        new THREE.Group();

    topRoot =
        new THREE.Group();

    dressRoot =
        new THREE.Group();

    jacketRoot =
        new THREE.Group();

    /* =====================================================
       ADD FASHION ROOTS
       ===================================================== */

    clothingRoot.add(
        hairRoot
    );

    clothingRoot.add(
        hatRoot
    );

    clothingRoot.add(
        glassesRoot
    );

    clothingRoot.add(
        bagRoot
    );

    clothingRoot.add(
        accessoryRoot
    );

    clothingRoot.add(
        shoeRoot
    );

    clothingRoot.add(
        bottomRoot
    );

    clothingRoot.add(
        topRoot
    );

    clothingRoot.add(
        dressRoot
    );

    clothingRoot.add(
        jacketRoot
    );

    /* =====================================================
       BASE BODY
       ===================================================== */

    createBaseBody();

    /* =====================================================
       DEFAULT HAIR
       ===================================================== */

    createHair(
        getItem("hair-soft-bob") || {
            id: "default-hair",
            type: "bob",
            color: "#49342f"
        }
    );

    /* =====================================================
       DEFAULT SHOES
       ===================================================== */

    if (
        typeof createDefaultShoes ===
        "function"
    ) {
        createDefaultShoes();
    }

    /* =====================================================
       BASE COVERAGE
       ===================================================== */

    createBaseCoverage();

    /* =====================================================
       UPDATE FASHION
       ===================================================== */

    if (
        typeof updateAvatar ===
        "function"
    ) {
        updateAvatar();
    }

    /* =====================================================
       RENDER ORDER
       ===================================================== */

    underLayerRoot.renderOrder = 1;

    bottomRoot.renderOrder = 4;

    shoeRoot.renderOrder = 5;

    topRoot.renderOrder = 6;

    dressRoot.renderOrder = 7;

    jacketRoot.renderOrder = 8;

    hairRoot.renderOrder = 20;

    hatRoot.renderOrder = 22;

    glassesRoot.renderOrder = 23;

    accessoryRoot.renderOrder = 24;

    bagRoot.renderOrder = 25;
}


/* ============================================================
   14. BASE BODY
   ============================================================ */

function createBaseBody() {

    clearGroup(bodyRoot);

    const skin =
        skinMaterial();


    /* ========================================================
       TORSO
       ======================================================== */

    const torsoWidth =
        state.gender === "female"
            ? .72
            : .76;

    const torsoDepth =
        state.gender === "female"
            ? .51
            : .53;

    const torso =
        sphere(
            bodyRoot,

            [
                torsoWidth,
                .83,
                torsoDepth
            ],

            [
                0,
                2.67,
                0
            ],

            skin
        );


    /*
     * NEW: bust silhouette DIHAPUS TOTAL — sebelumnya di sini
     * ada 2 sphere kecil untuk siluet dada wanita, tapi mudah
     * "nembus" atau kelihatan aneh terutama saat dikombinasi
     * dengan jaket/dress berlapis. Perbedaan gender tetap cukup
     * terwakili lewat: lebar torso/pinggul, bentuk kepala, ukuran
     * hidung, radius kaki, default hair, dan sekarang blush di
     * pipi (lihat bagian BLUSH di bawah).
     */


    /* ========================================================
       WAIST / HIPS
       ======================================================== */

    const hipWidth =
        state.gender === "female"
            ? .68
            : .63;

    sphere(
        bodyRoot,

        [
            hipWidth,
            .43,
            .47
        ],

        [
            0,
            2.02,
            0
        ],

        skin
    );


    /* ========================================================
       NECK
       ======================================================== */

    cylinder(
        bodyRoot,

        .18,
        .20,
        .30,

        [
            0,
            3.43,
            0
        ],

        skin
    );


    /* ========================================================
       HEAD
       ======================================================== */

    const headScale =
        state.gender === "female"
            ? [.61, .68, .57]
            : [.66, .63, .60];

    sphere(
        bodyRoot,

        headScale,

        [
            0,
            4.16,
            0
        ],

        skin
    );


    /* ========================================================
       EARS
       ======================================================== */

    sphere(
        bodyRoot,
        [.10, .16, .12],
        [-.59, 4.15, 0],
        skin
    );

    sphere(
        bodyRoot,
        [.10, .16, .12],
        [.59, 4.15, 0],
        skin
    );


    /* ========================================================
       NOSE
       ======================================================== */

    const noseScale =
        state.gender === "female"
            ? [.055, .085, .11]
            : [.065, .095, .13];

    const nosePosition =
        state.gender === "female"
            ? [0, 4.08, .56]
            : [0, 4.06, .58];

    sphere(
        bodyRoot,
        noseScale,
        nosePosition,
        skin
    );


    /* ========================================================
       EYEBROWS
       ======================================================== */

    const browMaterial =
        getMaterial(
            state.colors?.hair ||
            "#3a2a26",
            {
                roughness: .75
            }
        );

    const browScale =
        state.gender === "female"
            ? [.09, .018, .02]
            : [.10, .028, .022];

    const browY =
        state.gender === "female"
            ? 4.30
            : 4.28;

    box(
        bodyRoot,
        browScale,
        [-.215, browY, .55],
        browMaterial
    );

    box(
        bodyRoot,
        browScale,
        [.215, browY, .55],
        browMaterial
    );


    /* ========================================================
       EYES
       ======================================================== */

    const eyeWhite =
        getMaterial(
            "#ffffff",
            {
                roughness: .28
            }
        );

    const eyeDark =
        getMaterial(
            "#2c2630",
            {
                roughness: .3
            }
        );

    const eyeScale =
        state.gender === "female"
            ? [.095, .105, .055]
            : [.086, .090, .05];

    const pupilScale =
        state.gender === "female"
            ? [.038, .052, .028]
            : [.034, .046, .026];


    sphere(
        bodyRoot,
        eyeScale,
        [-.215, 4.22, .535],
        eyeWhite
    );

    sphere(
        bodyRoot,
        eyeScale,
        [.215, 4.22, .535],
        eyeWhite
    );


    sphere(
        bodyRoot,
        pupilScale,
        [-.215, 4.22, .585],
        eyeDark
    );

    sphere(
        bodyRoot,
        pupilScale,
        [.215, 4.22, .585],
        eyeDark
    );


    /* ========================================================
       BLUSH (NEW — khusus wanita)
       ------------------------------------------------------
       Menggantikan peran bust silhouette sebagai penanda
       gender yang lebih aman (tidak berisiko clipping/nembus
       di baju). Berupa dua bulatan pink transparan tipis di
       pipi, di bawah mata dan sedikit ke arah luar wajah.
       Tidak dirender untuk model pria.
       ======================================================== */

    if (
        state.gender === "female"
    ) {

        const blushMaterial =
            getMaterial(
                "#e8879a",
                {
                    roughness: .9,
                    transparent: true,
                    opacity: .38
                }
            );

        sphere(
            bodyRoot,
            [.085, .06, .02],
            [-.34, 4.10, .50],
            blushMaterial,
            20
        );

        sphere(
            bodyRoot,
            [.085, .06, .02],
            [.34, 4.10, .50],
            blushMaterial,
            20
        );
    }


    /* ========================================================
       MOUTH
       ======================================================== */

    const mouthColor =
        state.gender === "female"
            ? "#a84e67"
            : "#8a5a52";

    const mouthScale =
        state.gender === "female"
            ? [.11, .028, .02]
            : [.115, .020, .02];

    const mouthY =
        state.gender === "female"
            ? 3.965
            : 3.95;

    box(
        bodyRoot,
        mouthScale,
        [0, mouthY, .575],
        getMaterial(
            mouthColor,
            {
                roughness: .4
            }
        )
    );


    /* ========================================================
       ARMS
       ======================================================== */

    const arm =
        .18;

    const SHOULDER_X = .60;
    const SHOULDER_Y = 3.02;

    const HAND_X = .82;
    const HAND_Y = 2.05;

    const armMidX =
        (SHOULDER_X + HAND_X) / 2;

    const armMidY =
        (SHOULDER_Y + HAND_Y) / 2;

    const armAngle =
        Math.atan2(
            HAND_X - SHOULDER_X,
            SHOULDER_Y - HAND_Y
        );


    const leftArm =
        capsule(
            bodyRoot,

            arm,

            1.05,

            [
                -armMidX,
                armMidY,
                0
            ],

            skin
        );

    leftArm.rotation.z =
        armAngle;


    const rightArm =
        capsule(
            bodyRoot,

            arm,

            1.05,

            [
                armMidX,
                armMidY,
                0
            ],

            skin
        );

    rightArm.rotation.z =
        -armAngle;


    /* ========================================================
       SHOULDER FILL
       ======================================================== */

    sphere(
        bodyRoot,
        [.225, .225, .20],
        [-SHOULDER_X, SHOULDER_Y, .04],
        skin
    );

    sphere(
        bodyRoot,
        [.225, .225, .20],
        [SHOULDER_X, SHOULDER_Y, .04],
        skin
    );


    /* ========================================================
       HANDS
       ======================================================== */

    sphere(
        bodyRoot,
        [.205, .21, .19],
        [-.82, 2.05, 0],
        skin
    );

    sphere(
        bodyRoot,
        [.205, .21, .19],
        [.82, 2.05, 0],
        skin
    );


    /* ========================================================
       LEGS
       ======================================================== */

    const legRadius =
        state.gender === "female"
            ? .27
            : .29;


    capsule(
        bodyRoot,

        legRadius,

        1.35,

        [
            -.32,
            1.17,
            0
        ],

        skin
    );

    capsule(
        bodyRoot,

        legRadius,

        1.35,

        [
            .32,
            1.17,
            0
        ],

        skin
    );


    /* ========================================================
       MODEST BASE UNDERLAYER
       ======================================================== */

    createBaseCoverage();
}

/* ============================================================
   15. BASE COVERAGE
   ============================================================ */

function createBaseCoverage() {

    if (!underLayerRoot) {
        return;
    }

    clearGroup(
        underLayerRoot
    );

    const white =
        fabric(
            CONFIG.colors.white ||
            "#ffffff"
        );


    const hasUpperClothing =
        !!(
            state.selected.top ||
            state.selected.dress
        );

    const hasLowerClothing =
        !!(
            state.selected.bottom ||
            state.selected.dress
        );


    const jacketItem =
        getSelected("jacket");

    const upperCoverageColor =
        jacketItem
            ? (
                state.colors[jacketItem.id] ||
                jacketItem.colors?.[0] ||
                (CONFIG.colors.white || "#ffffff")
            )
            : (CONFIG.colors.white || "#ffffff");

    const upperCoverage =
        fabric(upperCoverageColor);


    /* =====================================================
       UPPER COVERAGE
       ===================================================== */

    if (!hasUpperClothing) {

        const upperCoverageScale =
            hasLowerClothing
                ? [
                    state.gender === "female"
                        ? .76
                        : .78,

                    .32,

                    .55
                ]
                : [
                    state.gender === "female"
                        ? .76
                        : .78,

                    .73,

                    .55
                ];

        const upperCoveragePositionY =
            2.68;

        sphere(
            underLayerRoot,
            upperCoverageScale,
            [0, upperCoveragePositionY, .005],
            upperCoverage
        );

        /* ================================================
           MIDRIFF BRIDGE
           ================================================ */

        if (hasLowerClothing) {

            cylinder(
                underLayerRoot,
                .63,
                .69,
                .30,
                [0, 2.38, 0],
                upperCoverage,
                48
            );
        }

        /*
         * NEW: FEMALE CHEST COVERAGE DIHAPUS TOTAL — dulu ada
         * 2 sphere di sini mengikuti bentuk bust yang sekarang
         * sudah tidak ada lagi (lihat createBaseBody()). Upper
         * coverage sphere utama di atas sudah cukup menutupi
         * torso tanpa perlu tambahan bentuk dada.
         */
    }

    /* =====================================================
       LOWER COVERAGE
       ===================================================== */

    if (!hasLowerClothing) {

        sphere(
            underLayerRoot,

            [
                state.gender === "female"
                    ? .67
                    : .63,

                .38,

                .49
            ],

            [
                0,
                1.99,
                .01
            ],

            white
        );

    }

    /* =====================================================
       HIP COVERAGE
       ===================================================== */

    if (!hasLowerClothing) {

        cylinder(
            underLayerRoot,

            .61,
            .65,
            .20,

            [
                0,
                2.02,
                0
            ],

            white
        );

    }
}

/* ============================================================
   16. HAIR
   ============================================================ */

function createDefaultHair() {

    createHair(
        getItem(
            "hair-soft-bob"
        )
    );

}


function createHair(item) {

    if (!hairRoot) {
        return;
    }

    clearGroup(hairRoot);

    if (!item) {
        return;
    }


    /* =====================================================
       SAFE COLORS
       ===================================================== */

    if (!state.colors) {
        state.colors = {};
    }

    const color =
        state.colors.hair ||
        item.color ||
        item.colors?.[0] ||
        "#49342f";

    const mat =
        fabric(color);


    /* =====================================================
       HAIR CAP
       ===================================================== */

    sphere(
        hairRoot,
        [
            .65,
            .48,
            .59
        ],
        [
            0,
            4.57,
            -.015
        ],
        mat
    );


    /* =====================================================
       HAIR TYPE
       ===================================================== */

    const type =
        item.type ||
        item.variant ||
        "bob";


    /* =====================================================
       BOB
       ===================================================== */

    if (type === "bob") {

        sphere(
            hairRoot,
            [
                .31,
                .48,
                .42
            ],
            [
                -.48,
                4.28,
                .02
            ],
            mat
        );

        sphere(
            hairRoot,
            [
                .31,
                .48,
                .42
            ],
            [
                .48,
                4.28,
                .02
            ],
            mat
        );


        /* Bangs tidak menutup mata */

        sphere(
            hairRoot,
            [
                .46,
                .18,
                .28
            ],
            [
                0,
                4.54,
                .42
            ],
            mat
        );

    }


    /* =====================================================
       SIDE WAVE
       ===================================================== */

    if (type === "sideWave") {

        sphere(
            hairRoot,
            [
                .34,
                .65,
                .38
            ],
            [
                -.52,
                4.24,
                -.03
            ],
            mat
        );

        sphere(
            hairRoot,
            [
                .28,
                .45,
                .34
            ],
            [
                .48,
                4.31,
                -.04
            ],
            mat
        );

        sphere(
            hairRoot,
            [
                .25,
                .18,
                .26
            ],
            [
                -.35,
                4.55,
                .42
            ],
            mat
        );

    }


    /* =====================================================
       SHORT
       ===================================================== */

    if (type === "short") {

        sphere(
            hairRoot,
            [
                .65,
                .38,
                .58
            ],
            [
                0,
                4.56,
                0
            ],
            mat
        );

        sphere(
            hairRoot,
            [
                .30,
                .26,
                .25
            ],
            [
                -.48,
                4.35,
                .05
            ],
            mat
        );

        sphere(
            hairRoot,
            [
                .30,
                .26,
                .25
            ],
            [
                .48,
                4.35,
                .05
            ],
            mat
        );

    }


    /* =====================================================
       LONG
       ===================================================== */

    if (
        type === "long" ||
        type === "longWave"
    ) {

        sphere(
            hairRoot,
            [
                .67,
                .50,
                .60
            ],
            [
                0,
                4.55,
                -.02
            ],
            mat
        );

        sphere(
            hairRoot,
            [
                .34,
                .92,
                .40
            ],
            [
                -.53,
                3.98,
                -.02
            ],
            mat
        );

        sphere(
            hairRoot,
            [
                .34,
                .92,
                .40
            ],
            [
                .53,
                3.98,
                -.02
            ],
            mat
        );

    }


    /* =====================================================
       PONYTAIL
       ===================================================== */

    if (type === "pony") {

        sphere(
            hairRoot,
            [
                .65,
                .45,
                .58
            ],
            [
                0,
                4.57,
                0
            ],
            mat
        );

        sphere(
            hairRoot,
            [
                .29,
                .75,
                .30
            ],
            [
                .48,
                4.22,
                -.30
            ],
            mat
        );

        sphere(
            hairRoot,
            [
                .28,
                .48,
                .25
            ],
            [
                .10,
                4.53,
                .43
            ],
            mat
        );

    }


    /* =====================================================
       LOW PONY
       ===================================================== */

    if (type === "lowPony") {

        sphere(
            hairRoot,
            [
                .65,
                .44,
                .58
            ],
            [
                0,
                4.57,
                0
            ],
            mat
        );

        sphere(
            hairRoot,
            [
                .34,
                .68,
                .32
            ],
            [
                .52,
                4.00,
                -.28
            ],
            mat
        );

    }


    /* =====================================================
       PIXIE
       ===================================================== */

    if (type === "pixie") {

        sphere(
            hairRoot,
            [
                .66,
                .45,
                .59
            ],
            [
                0,
                4.58,
                0
            ],
            mat
        );

        sphere(
            hairRoot,
            [
                .25,
                .28,
                .28
            ],
            [
                -.50,
                4.35,
                .05
            ],
            mat
        );

        sphere(
            hairRoot,
            [
                .25,
                .28,
                .28
            ],
            [
                .50,
                4.35,
                .05
            ],
            mat
        );

    }


    /* =====================================================
       CURLS
       ===================================================== */

    if (type === "curls") {

        const positions = [

            [-.48, 4.47, .03],
            [-.28, 4.64, .10],
            [0, 4.68, .05],
            [.28, 4.64, .10],
            [.48, 4.47, .03],

            [-.56, 4.18, -.02],
            [.56, 4.18, -.02],

            [-.46, 3.98, -.02],
            [.46, 3.98, -.02]

        ];


        positions.forEach(
            position => {

                sphere(
                    hairRoot,
                    [
                        .23,
                        .25,
                        .23
                    ],
                    position,
                    mat
                );

            }
        );

    }


    /* =====================================================
       MALE HAIR
       ===================================================== */

    if (
        type === "maleShort" ||
        type === "maleSide" ||
        type === "maleTextured" ||
        type === "maleWave"
    ) {

        sphere(
            hairRoot,
            [
                .63,
                .39,
                .57
            ],
            [
                0,
                4.58,
                0
            ],
            mat
        );


        /* =================================================
           MALE SIDE / WAVE
           ================================================= */

        if (
            type === "maleSide" ||
            type === "maleWave"
        ) {

            sphere(
                hairRoot,
                [
                    .35,
                    .15,
                    .27
                ],
                [
                    .28,
                    4.53,
                    .40
                ],
                mat
            );

        }


        /* =================================================
           MALE TEXTURED / WAVE
           ================================================= */

        if (
            type === "maleTextured" ||
            type === "maleWave"
        ) {

            const spikes = [

                [-.34, 4.78, .02],
                [-.12, 4.82, .03],
                [.12, 4.82, .03],
                [.34, 4.77, .02]

            ];


            spikes.forEach(
                p => {

                    sphere(
                        hairRoot,
                        [
                            .13,
                            .23,
                            .14
                        ],
                        p,
                        mat
                    );

                }
            );

        }

    }

}

const MALE_KIMONO_TYPES = [
    "kimonoBlack", "kimonoNavy", "kimonoCharcoal", "kimonoCopper",
    "haoriFormal", "haoriWhite", "haoriCrestBlack", "haoriCrestNavy"
];

function createMaleKimonoTop(item) {

    const color = state.colors[item.id] || item.colors?.[0] || "#18191f";
    const mat = satin(color);

    const isHaori = item.type.startsWith("haori");
    const hasCrest = item.type.includes("Crest");

    const innerMat = satin(item.colors?.[1] || "#30354a");
    const crestColor = item.colors?.[2] || "#c9a34d";

    /*
     * BADAN UTAMA — satu cylinder tirus TUNGGAL dari bahu sampai
     * pinggul, melebar ke bawah seperti jubah asli. TIDAK dipecah
     * jadi beberapa box terpisah supaya tidak muncul celah/panel
     * pipih seperti sebelumnya.
     */

    const bodyMain = cylinder(topRoot, .58, .82, 1.75, [0, 2.25, 0], mat, 48);
    bodyMain.scale.z = .68;

    /*
     * KERAH V — dua box tipis miring membentuk kerah silang khas
     * kimono/haori, menempel rapat ke bahu (bukan mengambang).
     */

    const collarLeft = box(topRoot, [.11, .80, .05], [-.16, 3.05, .38], innerMat);
    collarLeft.rotation.z = .55;

    const collarRight = box(topRoot, [.11, .80, .05], [.16, 3.05, .38], innerMat);
    collarRight.rotation.z = -.55;

    /*
     * LENGAN — cylinder tunggal per sisi, MENYATU ke badan lewat
     * shoulderConnector radius besar (bukan capsule kecil terpisah
     * jauh dari badan, yang tadi bikin kesan panel terpisah).
     */

    const leftSleeve = cylinder(topRoot, .30, .40, 1.20, [-.90, 2.45, 0], mat, 40);
    leftSleeve.rotation.z = -.06;
    leftSleeve.scale.z = .62;

    const rightSleeve = cylinder(topRoot, .30, .40, 1.20, [.90, 2.45, 0], mat, 40);
    rightSleeve.rotation.z = .06;
    rightSleeve.scale.z = .62;

    shoulderConnector(topRoot, -.72, 2.98, .04, mat, .34);
    shoulderConnector(topRoot, .72, 2.98, .04, mat, .34);

    const leftCuff = cylinder(topRoot, .34, .34, .08, [-.90, 1.87, 0], mat, 40);
    leftCuff.scale.z = .62;

    const rightCuff = cylinder(topRoot, .34, .34, .08, [.90, 1.87, 0], mat, 40);
    rightCuff.scale.z = .62;

    /*
     * OBI / HIMO
     */

    if (isHaori) {

        box(topRoot, [.48, .045, .035], [0, 2.85, .38], satin(crestColor));
        sphere(topRoot, [.05, .05, .04], [0, 2.81, .41], metal(crestColor), 16);

    } else {

        const obi = cylinder(topRoot, .60, .64, .30, [0, 1.95, 0], satin(item.colors?.[2] || "#1b1c20"), 48);
        obi.scale.z = .68;
    }

    if (hasCrest) {

        sphere(topRoot, [.055, .055, .02], [0, 2.72, .44], metal(crestColor), 20);
        sphere(topRoot, [.045, .045, .018], [-.58, 2.70, .08], metal(crestColor), 16);
        sphere(topRoot, [.045, .045, .018], [.58, 2.70, .08], metal(crestColor), 16);
    }
}

/* ============================================================
   17. TOP
   ============================================================ */

function createTop(item) {

    clearGroup(topRoot);

    if (!item) {
        return;
    }

    if (MALE_KIMONO_TYPES.includes(item.type)) {
        createMaleKimonoTop(item);
        return;
    }

    const color =
        state.colors[item.id] ||
        item.colors?.[0] ||
        "#ffffff";

    const mat =
        item.type === "satin"
            ? satin(color)
            : fabric(color);


    /*
     * TOP BASE
     *
     * Lebih besar daripada tubuh.
     * Ini membuat pakaian benar-benar membungkus torso.
     */

    const torso =
        sphere(
            topRoot,

            [
                state.gender === "female"
                    ? .79
                    : .81,

                .77,

                .60
            ],

            [
                0,
                2.67,
                .015
            ],

            mat
        );


    /*
     * NEW: chest contour untuk wanita DIHAPUS TOTAL — perbedaan
     * gender sekarang cukup terwakili lewat siluet torso/head/
     * nose/leg dari createBaseBody() dan blush di pipi, tanpa
     * risiko clipping di baju.
     */


    /* ========================================================
       WAIST BAND
       ======================================================== */

    cylinder(
        topRoot,

        .60,
        .67,
        .22,

        [
            0,
            2.15,
            0
        ],

        mat
    );


    /* ========================================================
       SHOULDERS / SLEEVES
       ======================================================== */

    const left =
        capsule(
            topRoot,
            .225,
            .62,
            [-.76, 2.77, 0],
            mat
        );

    left.rotation.z =
        THREE.MathUtils.degToRad(7);


    const right =
        capsule(
            topRoot,
            .225,
            .62,
            [.76, 2.77, 0],
            mat
        );

    right.rotation.z =
        THREE.MathUtils.degToRad(-7);


    /* ========================================================
       SHOULDER CONNECTOR
       ======================================================== */

    const SHOULDER_Y = 3.05;

    shoulderConnector(
        topRoot,
        -.76,
        SHOULDER_Y,
        .05,
        mat,
        .27
    );

    shoulderConnector(
        topRoot,
        .76,
        SHOULDER_Y,
        .05,
        mat,
        .27
    );


    /* ========================================================
       COLLAR
       ======================================================== */

    if (
        item.type === "shirt" ||
        item.type === "blouse" ||
        item.type === "turtleneck"
    ) {

        const collar =
            torus(
                topRoot,
                item.type === "turtleneck"
                    ? .29
                    : .25,
                .055,
                [0, 3.32, .22],
                [Math.PI / 2, 0, 0],
                mat
            );

        collar.scale.z = .8;
    }


    /* ========================================================
       BUTTONS
       ======================================================== */

    if (
        item.type === "shirt" ||
        item.type === "blouse" ||
        item.type === "tailored"
    ) {

        const buttonMat =
            metal("#eee8dc");

        for (
            let i = 0;
            i < 5;
            i++
        ) {

            sphere(
                topRoot,
                [.035, .035, .025],
                [
                    0,
                    3.15 - i * .17,
                    .61
                ],
                buttonMat,
                16
            );
        }
    }


    /* ========================================================
       WRAP DETAIL
       ======================================================== */

    if (
        item.type === "wrap"
    ) {

        const sash =
            box(
                topRoot,
                [.70, .07, .045],
                [0, 2.48, .61],
                mat
            );

        sash.rotation.z =
            -.12;
    }


    /* ========================================================
       RIBBON
       ======================================================== */

    if (
        item.type === "ribbon"
    ) {

        const ribbonMat =
            satin(color);

        torus(
            topRoot,
            .13,
            .035,
            [0, 3.28, .57],
            [Math.PI / 2, 0, 0],
            ribbonMat
        );

        sphere(
            topRoot,
            [.14, .09, .05],
            [-.13, 3.28, .57],
            ribbonMat
        );

        sphere(
            topRoot,
            [.14, .09, .05],
            [.13, 3.28, .57],
            ribbonMat
        );
    }
}


/* ============================================================
   18. DRESS
   ============================================================ */

function createDress(item, options = {}) {

    clearGroup(dressRoot);

    if (!item) {
        return;
    }

    const hideBodice =
        !!options.hideBodice;


    const kimonoTypes = [
        "furisodeSakura",
        "furisodeCrimson",
        "furisodeRoyal",
        "furisodeGold",
        "furisodeLavender",
        "furisodeMidnight",
        "modernKimono",
        "femaleHakama",
        "silkKimono"
    ];

    if (kimonoTypes.includes(item.type)) {

        createKimonoDress(item);

        return;
    }

    const color =
        state.colors[item.id] ||
        item.colors?.[0] ||
        "#e8a6b7";

    const mat =
        item.type === "satin" ||
        item.type === "gown"
            ? satin(color)
            : fabric(color);


    /* ========================================================
       BODICE
       ------------------------------------------------------
       Menutupi torso sepenuhnya — SKIP kalau hideBodice true
       (jaket sedang menutupi bagian ini).
       ======================================================== */

    if (!hideBodice) {

        sphere(
            dressRoot,

            [
                state.gender === "female"
                    ? .80
                    : .82,

                .80,

                .61
            ],

            [
                0,
                2.69,
                .02
            ],

            mat
        );

        /*
         * NEW: chest contour untuk wanita DIHAPUS TOTAL —
         * sama seperti di createTop(), untuk menghindari
         * clipping/nembus di kain dress.
         */
    }


    /*
     * WAIST — tetap dirender di kedua mode.
     */

    cylinder(
        dressRoot,
        .62,
        .68,
        .20,
        [0, 2.10, 0],
        mat
    );


    /* ========================================================
       SKIRT
       ======================================================== */

    let radius = 1.02;

    let height = 1.28;


    if (item.type === "gown") {

        radius = 1.38;

        height = 1.62;
    }


    if (item.type === "princess") {

        radius = 1.28;

        height = 1.50;
    }


    if (item.type === "midi") {

        radius = .96;

        height = 1.18;
    }


    const skirt =
        cylinder(
            dressRoot,
            radius * .72,
            radius,
            height,
            [
                0,
                1.43,
                0
            ],
            mat,
            64
        );


    /*
     * Bottom skirt flare.
     */

    const hem =
        torus(
            dressRoot,
            radius * .82,
            .035,
            [
                0,
                .78,
                0
            ],
            [Math.PI / 2, 0, 0],
            satin(color)
        );

    hem.scale.z = .72;


    /* ========================================================
       SLEEVES — SKIP kalau hideBodice true
       ======================================================== */

    if (!hideBodice) {

        const sleeveMat =
            mat.clone();


        capsule(
            dressRoot,
            .225,
            1.05,
            [-.79, 2.70, 0],
            sleeveMat
        );

        capsule(
            dressRoot,
            .225,
            1.05,
            [.79, 2.70, 0],
            sleeveMat
        );


        /* ====================================================
           SHOULDER CONNECTOR
           ==================================================== */

        const SHOULDER_Y = 3.05;

        shoulderConnector(
            dressRoot,
            -.79,
            SHOULDER_Y,
            .04,
            mat,
            .275
        );

        shoulderConnector(
            dressRoot,
            .79,
            SHOULDER_Y,
            .04,
            mat,
            .275
        );
    }


    /* ========================================================
       PRINCESS DETAIL
       ======================================================== */

    if (
        item.type === "princess"
    ) {

        const layer =
            cylinder(
                dressRoot,
                1.18,
                1.38,
                .30,
                [0, .92, 0],
                satin(color),
                64
            );

        layer.scale.z =
            .72;
    }


    /* ========================================================
       GARDEN / A-LINE DETAIL
       ======================================================== */

    if (
        item.type === "garden" ||
        item.type === "aline"
    ) {

        for (
            let i = -5;
            i <= 5;
            i++
        ) {

            box(
                dressRoot,

                [.018, .72, .018],

                [
                    i * .17,
                    1.42,
                    .72
                ],

                getMaterial(
                    "#ffffff",
                    {
                        roughness: .8,
                        transparent: true,
                        opacity: .16
                    }
                )
            );
        }
    }


    /* ========================================================
       NECKLINE — SKIP kalau hideBodice true
       ======================================================== */

    if (!hideBodice) {

        torus(
            dressRoot,
            .25,
            .045,
            [0, 3.30, .27],
            [Math.PI / 2, 0, 0],
            mat
        );
    }
}

const suitFrontTextureCache = new Map();

function buildSuitFrontTexture(shirtColor, lapelColor, tieColor, buttonColor, isDoubleBreasted) {

    const key = [shirtColor, lapelColor, tieColor, buttonColor, isDoubleBreasted].join("|");

    if (suitFrontTextureCache.has(key)) {
        return suitFrontTextureCache.get(key);
    }

    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 384;

    const ctx = canvas.getContext("2d");

    // background transparan — cuma detail jas yang digambar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;

    // LAPEL — dua segitiga membuka dari bahu turun ke titik tengah
    ctx.fillStyle = lapelColor;

    ctx.beginPath();
    ctx.moveTo(cx - 100, 10);
    ctx.lineTo(cx - 15, 10);
    ctx.lineTo(cx - 35, 190);
    ctx.lineTo(cx - 90, 90);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx + 100, 10);
    ctx.lineTo(cx + 15, 10);
    ctx.lineTo(cx + 35, 190);
    ctx.lineTo(cx + 90, 90);
    ctx.closePath();
    ctx.fill();

    // KEMEJA — segitiga putih terbuka di tengah, di antara lapel
    ctx.fillStyle = shirtColor;
    ctx.beginPath();
    ctx.moveTo(cx - 15, 10);
    ctx.lineTo(cx + 15, 10);
    ctx.lineTo(cx + 22, 210);
    ctx.lineTo(cx - 22, 210);
    ctx.closePath();
    ctx.fill();

    // DASI
    ctx.fillStyle = tieColor;
    ctx.beginPath();
    ctx.moveTo(cx - 10, 20);
    ctx.lineTo(cx + 10, 20);
    ctx.lineTo(cx + 6, 55);
    ctx.lineTo(cx, 45);
    ctx.lineTo(cx - 6, 55);
    ctx.closePath();
    ctx.fill();

    ctx.fillRect(cx - 9, 55, 18, 130);

    // KANCING
    ctx.fillStyle = buttonColor;

    if (isDoubleBreasted) {

        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(cx - 30, 230 + i * 32, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(cx + 30, 230 + i * 32, 6, 0, Math.PI * 2);
            ctx.fill();
        }

    } else {

        for (let i = 0; i < 2; i++) {
            ctx.beginPath();
            ctx.arc(cx + 20, 225 + i * 35, 6, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    suitFrontTextureCache.set(key, texture);

    return texture;
}

/* ============================================================
   19. JACKET
   ============================================================ */

function createJacket(item) {

    clearGroup(jacketRoot);

    if (!item) return;

    const color = state.colors[item.id] || item.colors?.[0] || "#24252d";
    const mat = item.type === "leather" ? leather(color) : fabric(color);

    const isSuit = ["executiveSuit", "greySuit", "doubleBreasted"].includes(item.type);

    // BADAN — tetap sphere, TIDAK diubah dari versi yang sudah benar
    sphere(jacketRoot, [.83, .79, .64], [0, 2.70, .045], mat);

    // LENGAN — tetap pakai sudut natural, TIDAK diubah
    const arm = isSuit ? .23 : .245;

    const SHOULDER_X = .60, SHOULDER_Y = 3.02;
    const HAND_X = .82, HAND_Y = 2.05;

    const armMidX = (SHOULDER_X + HAND_X) / 2;
    const armMidY = (SHOULDER_Y + HAND_Y) / 2;
    const armAngle = Math.atan2(HAND_X - SHOULDER_X, SHOULDER_Y - HAND_Y);

    const leftSleeve = capsule(jacketRoot, arm, 1.15, [-armMidX, armMidY, 0], mat);
    leftSleeve.rotation.z = armAngle;

    const rightSleeve = capsule(jacketRoot, arm, 1.15, [armMidX, armMidY, 0], mat);
    rightSleeve.rotation.z = -armAngle;

    shoulderConnector(jacketRoot, -SHOULDER_X, SHOULDER_Y, .05, mat, .27);
    shoulderConnector(jacketRoot, SHOULDER_X, SHOULDER_Y, .05, mat, .27);

    cylinder(jacketRoot, .25, .25, .13, [-.85, 2.34, 0], mat);
    cylinder(jacketRoot, .25, .25, .13, [.85, 2.34, 0], mat);

    /*
     * ===== DARI SINI DETAIL JAS DITAMBAHKAN =====
     * Semua posisi Y disesuaikan ke pusat sphere badan (y=2.70)
     * dan permukaan depannya (z≈.60-.66), bukan angka sembarangan.
     */
    if (isSuit) {

        const shirtColor = "#f5f5f5";
        const lapelColor = item.colors?.[1] || "#2d3544";
        const tieColor = item.colors?.[2] || "#8a1f2b";
        const buttonColor = item.colors?.[2] || "#c4cad3";
        const isDoubleBreasted = item.type === "doubleBreasted";

        const texture = buildSuitFrontTexture(shirtColor, lapelColor, tieColor, buttonColor, isDoubleBreasted);

        const planeGeo = new THREE.PlaneGeometry(.85, 1.28);

        const planeMat = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide
        });

        const plane = new THREE.Mesh(planeGeo, planeMat);
        plane.position.set(0, 2.82, .70);

        jacketRoot.add(plane);

    } else if (item.type === "blazer" || item.type === "trench") {

        const lapelMat = satin(color);

        const leftLapel = box(jacketRoot, [.16, .68, .055], [-.24, 3.02, .60], lapelMat);
        leftLapel.rotation.z = -.32;

        const rightLapel = box(jacketRoot, [.16, .68, .055], [.24, 3.02, .60], lapelMat);
        rightLapel.rotation.z = .32;

        for (let i = 0; i < 3; i++) {
            sphere(jacketRoot, [.045, .045, .035], [0, 2.98 - i * .22, .69],
                metal(item.type === "blazer" ? "#d3aa58" : "#ece7df"), 16);
        }

    } else if (item.type === "bomber" || item.type === "leather" || item.type === "denim") {

        box(jacketRoot, [.035, .66, .035], [0, 2.72, .69],
            metal(item.type === "leather" ? "#c3a66a" : "#e7e2d9"));
    }

    if (item.type === "trench") {
        box(jacketRoot, [1.15, .09, .68], [0, 2.35, .02], mat);
    }
}

const HAKAMA_TYPES = ["hakama", "hakamaModern", "hakamaCharcoal", "hakamaCrest"];

function createHakamaBottom(item) {

    const color = state.colors[item.id] || item.colors?.[0] || "#101115";
    const mat = fabric(color);

    // tali pinggang (himo)
    box(bottomRoot, [.66, .10, .50], [0, 2.10, 0], satin(item.colors?.[1] || "#3a3a45"));

    // panel lebar depan — ciri khas hakama, bukan dua kaki terpisah
    box(bottomRoot, [1.05, 1.55, .30], [0, 1.35, .22], mat);

    // panel belakang sedikit lebih sempit
    box(bottomRoot, [.95, 1.50, .26], [0, 1.32, -.18], mat);

    // lipatan vertikal (pleats)
    for (let i = -3; i <= 3; i++) {
        box(
            bottomRoot,
            [.025, 1.45, .02],
            [i * .15, 1.35, .38],
            getMaterial("#000000", { transparent: true, opacity: .12 })
        );
    }

    // kaki tetap ada di dalam supaya tidak floating
    capsule(bottomRoot, .30, 1.30, [-.24, 1.10, 0], mat);
    capsule(bottomRoot, .30, 1.30, [.24, 1.10, 0], mat);

    if (item.type === "hakamaCrest") {
        sphere(bottomRoot, [.05, .05, .02], [0, 1.85, .38], metal(item.colors?.[2] || "#c9a34d"), 16);
    }

    cylinder(bottomRoot, .58, .58, .08, [0, .30, 0], mat, 40);
}

/* ============================================================
   20. BOTTOM
   ============================================================ */

function createBottom(item) {

    clearGroup(
        bottomRoot
    );

    if (!item) {
        return;
    }

    if (HAKAMA_TYPES.includes(item.type)) {
        createHakamaBottom(item);
        return;
    }

    const color =
        state.colors[item.id] ||
        item.colors?.[0] ||
        "#5d7190";

    const mat =
        item.type === "skirt" ||
        item.type === "pleated"
            ? satin(color)
            : fabric(color);


    /* ========================================================
       WAIST COVER
       ======================================================== */

    cylinder(
        bottomRoot,
        .63,
        .69,
        .24,
        [0, 2.04, 0],
        mat,
        48
    );


    /* ========================================================
       SKIRT
       ======================================================== */

    if (
        item.type === "skirt" ||
        item.type === "pleated"
    ) {

        const radius =
            item.type === "pleated"
                ? 1.02
                : .92;

        cylinder(
            bottomRoot,
            radius * .68,
            radius,
            1.05,
            [0, 1.53, 0],
            mat,
            64
        );


        if (
            item.type === "pleated"
        ) {

            for (
                let i = -6;
                i <= 6;
                i++
            ) {

                box(
                    bottomRoot,

                    [.018, .68, .018],

                    [
                        i * .14,
                        1.52,
                        .68
                    ],

                    getMaterial(
                        "#ffffff",
                        {
                            transparent: true,
                            opacity: .14
                        }
                    )
                );
            }
        }

        return;
    }


    /* ========================================================
       PANTS
       ======================================================== */

    const wide =
        item.type === "wide";


    const radius =
        wide
            ? .38
            : .31;


    const length =
        wide
            ? 1.36
            : 1.48;


    /*
     * FIX: jarak antar kaki celana dirapatkan sedikit
     * (dari .33 -> .29) supaya kedua kapsul overlap lebih
     * banyak persis di titik pertemuannya di tengah — ini
     * memperkecil celah berbentuk V yang sebelumnya muncul
     * di bawah waistband.
     */

    const legX = .29;


    const left =
        capsule(
            bottomRoot,
            radius,
            length,
            [-legX, 1.20, 0],
            mat
        );

    const right =
        capsule(
            bottomRoot,
            radius,
            length,
            [legX, 1.20, 0],
            mat
        );


    /* ========================================================
       PELVIS FILL (REVISI — pengganti crotch fill/gusset lama)

       FIX UTAMA: pendekatan "tambal celah kecil" sebelumnya
       masih menyisakan garis tipis warna kulit karena ukurannya
       pas-pasan dengan jarak antar kaki. Sekarang pendekatannya
       diubah total: seluruh area pinggul-ke-paha diisi PADAT
       dengan satu sphere + satu blok besar warna celana.

       - Sphere pertama sengaja dibuat SEDIKIT LEBIH BESAR
         daripada hip sphere tubuh (createBaseBody), supaya
         menutup TOTAL bola pinggul warna kulit di baliknya
         tanpa sisa.
       - Box kedua jauh LEBIH LEBAR (1.30) daripada jarak kedua
         kaki celana + radiusnya masing-masing (maks ~1.20),
         dan tingginya (.95) sengaja menjorok jauh ke bawah
         sampai overlap dalam ke kapsul kaki (bukan cuma
         menyentuh ujungnya). Jadi walau posisi/lebar kaki
         berubah-ubah tergantung tipe celana, tidak akan pernah
         ada celah kulit yang kelihatan lagi dari depan, samping,
         maupun belakang.
       ======================================================== */

    sphere(
        bottomRoot,
        [
            (state.gender === "female" ? .68 : .63) * 1.06,
            .43 * 1.08,
            .47 * 1.08
        ],
        [0, 2.02, 0],
        mat
    );

    box(
        bottomRoot,
        [
            1.30,                     // lebar penuh — melampaui kedua kaki
            .95,                      // tinggi — dari pinggul turun jauh ke paha
            wide ? .66 : .58          // depth — mengikuti ketebalan kaki (wide vs slim)
        ],
        [0, 1.55, 0],
        mat
    );


    /*
     * Outer side panels.
     */

    if (
        item.type === "cargo"
    ) {

        box(
            bottomRoot,
            [.28, .30, .12],
            [-.42, 1.48, .30],
            mat
        );

        box(
            bottomRoot,
            [.28, .30, .12],
            [.42, 1.48, .30],
            mat
        );
    }


    /*
     * Center seam.
     */

    box(
        bottomRoot,
        [.012, 1.12, .018],
        [-legX, 1.23, .32],
        getMaterial(
            "#ffffff",
            {
                transparent: true,
                opacity: .16
            }
        )
    );

    box(
        bottomRoot,
        [.012, 1.12, .018],
        [legX, 1.23, .32],
        getMaterial(
            "#ffffff",
            {
                transparent: true,
                opacity: .16
            }
        )
    );
}


/* ============================================================
   21. SHOES
   ============================================================ */

function createShoes(item) {

    clearGroup(
        shoeRoot
    );

    if (!item) {
        return;
    }

    const color =
        state.colors[item.id] ||
        item.colors?.[0] ||
        "#ffffff";

    const mat =
        fabric(color);


    function createOne(x) {

        box(
            shoeRoot,
            [.48, .17, .76],
            [x, .30, .13],
            mat
        );


        sphere(
            shoeRoot,
            [.25, .13, .29],
            [x, .34, .42],
            mat
        );


        if (
            item.type === "heels"
        ) {

            box(
                shoeRoot,
                [.12, .35, .12],
                [x, .17, -.15],
                metal(color)
            );
        }


        if (
            item.type === "boots"
        ) {

            capsule(
                shoeRoot,
                .22,
                .38,
                [x, .58, -.05],
                mat
            );
        }


        if (
            item.type === "sneaker"
        ) {

            box(
                shoeRoot,
                [.34, .06, .38],
                [x, .43, .28],
                getMaterial(
                    "#ffffff"
                )
            );
        }
    }


    createOne(-.33);

    createOne(.33);
}


/* ============================================================
   22. HAT
   ------------------------------------------------------------
   FIX (posisi topi "tenggelam" ke rambut):

   Sebelumnya semua elemen topi (brim, crown, band, seam-fill)
   diposisikan di kisaran y = 4.77 - 5.10. Padahal puncak hair
   cap yang dipakai SEMUA gaya rambut (lihat createHair(),
   sphere dasar di y=4.57 dengan tinggi .48) berakhir di
   y ≈ 4.57 + .48 = 5.05. Karena brim topi ada di y=4.85
   (jauh di bawah 5.05), sebagian besar topi jadi terkubur di
   dalam rambut alih-alih duduk di atasnya — persis seperti
   yang terlihat di screenshot user.

   Fix: tambahkan satu offset tunggal HAT_LIFT yang menaikkan
   seluruh geometri topi. Nilainya dikalibrasi supaya brim
   (bagian terendah topi) cuma overlap tipis (~0.03) ke puncak
   rambut — cukup untuk terlihat menyatu/seamless, tapi tidak
   lagi tenggelam setengah badan topi seperti sebelumnya.
   Karena semua posisi Y memakai offset yang sama, bentuk dan
   proporsi topi (brim/crown/band) tetap identik seperti
   sebelumnya — cuma "naik" sedikit sebagai satu kesatuan.
   ============================================================ */

function createHat(item) {

    clearGroup(
        hatRoot
    );

    if (!item) {
        return;
    }

    const color =
        state.colors[item.id] ||
        item.colors?.[0] ||
        "#22232b";

    const mat =
        fabric(color);


    /*
     * HAT_LIFT: menaikkan topi bertipe brim/crown (fedora,
     * atelier wide, sun hat) supaya bagian terendahnya (brim)
     * duduk tepat di atas puncak hair cap (y≈5.05), bukan
     * tenggelam di dalamnya. Sesuai feedback user, model fedora
     * dengan nilai ini sudah pas (boleh sedikit turun/nempel),
     * jadi nilainya TIDAK diubah dari sebelumnya.
     */

    const HAT_LIFT =
        .28;


    /*
     * BERET_LIFT: khusus beret dinaikkan lebih tinggi lagi
     * daripada HAT_LIFT biasa. Sesuai feedback user, beret
     * sebelumnya masih kelihatan agak turun/nempel rambut,
     * jadi dinaikkan tambahan ~.10 dibanding HAT_LIFT supaya
     * duduk sedikit lebih ke atas.
     */

    const BERET_LIFT =
        .38;


    /*
     * CAP_LIFT: topi jenis "cap" (topi baseball) tidak ada
     * keluhan dari user, jadi tetap memakai nilai HAT_LIFT
     * biasa (tidak diubah).
     */

    const CAP_LIFT =
        HAT_LIFT;


    /*
     * FIX: puncak gumpalan rambut (hair cap dasar yang dipakai
     * SEMUA jenis rambut di createHair — sphere [.65,.48,.59]
     * di y=4.57) tingginya sampai y ≈ 4.57 + .48 = 5.05.
     * Semua posisi di bawah ini sekarang memakai lift per-jenis
     * supaya bagian terendah topi selalu berada tepat di atas
     * puncak rambut, dengan sedikit jarak/overlap aman —
     * bukan malah terkubur di dalamnya.
     */

    if (
        item.type === "beret"
    ) {

        sphere(
            hatRoot,
            [.64, .18, .56],
            [0, 4.75 + BERET_LIFT, -.01],
            mat
        );

        return;
    }


    if (
        item.type === "cap"
    ) {

        sphere(
            hatRoot,
            [.58, .20, .55],
            [0, 4.78 + CAP_LIFT, .01],
            mat
        );

        box(
            hatRoot,
            [.52, .07, .30],
            [0, 4.70 + CAP_LIFT, .48],
            mat
        );

        return;
    }


    /*
     * Brim — bagian terendah topi.
     *
     * Dengan HAT_LIFT, brim sekarang duduk di
     * y = 4.85 + .28 = 5.13 — sedikit di atas puncak
     * rambut (y≈5.05), dengan overlap tipis yang cukup
     * untuk blending tanpa terlihat melayang maupun
     * tenggelam.
     */

    cylinder(
        hatRoot,
        .67,
        .70,
        .10,
        [0, 4.85 + HAT_LIFT, 0],
        mat,
        64
    );


    let crownRadius =
        .40;


    if (
        item.type === "sun"
    ) {
        crownRadius = .45;
    }


    cylinder(
        hatRoot,
        crownRadius,
        crownRadius + .03,
        .42,
        [0, 5.10 + HAT_LIFT, 0],
        mat,
        48
    );


    /*
     * Band
     */

    cylinder(
        hatRoot,
        crownRadius + .01,
        crownRadius + .01,
        .07,
        [0, 4.91 + HAT_LIFT, 0],
        metal(
            item.type === "fedora"
                ? "#d5ae61"
                : color
        ),
        48
    );


    /* ========================================================
       BRIM-HAIR SEAM FILL
       ------------------------------------------------------
       Sphere penambal ini sekarang ikut naik bersama HAT_LIFT,
       supaya tetap menutup transisi antara puncak rambut dan
       brim topi yang baru (bukan celah besar seperti sebelum
       brim dinaikkan, dan bukan pula tenggelam dalam-dalam ke
       rambut seperti versi paling awal).
       ======================================================== */

    sphere(
        hatRoot,
        [.70, .16, .62],
        [0, 4.77 + HAT_LIFT, -.005],
        mat,
        48
    );
}


/* ============================================================
   23. GLASSES
   ============================================================ */

function createGlasses(item) {

    clearGroup(
        glassesRoot
    );

    if (!item) {
        return;
    }

    const color =
        state.colors[item.id] ||
        item.colors?.[0] ||
        "#262731";

    const frame =
        metal(color);


    const left =
        torus(
            glassesRoot,
            .19,
            .035,
            [-.215, 4.22, .59],
            [0, 0, 0],
            frame
        );

    const right =
        torus(
            glassesRoot,
            .19,
            .035,
            [.215, 4.22, .59],
            [0, 0, 0],
            frame
        );


    box(
        glassesRoot,
        [.18, .035, .035],
        [0, 4.22, .59],
        frame
    );


    box(
        glassesRoot,
        [.38, .025, .025],
        [-.45, 4.22, .47],
        frame
    );

    box(
        glassesRoot,
        [.38, .025, .025],
        [.45, 4.22, .47],
        frame
    );


    if (
        item.type === "sun"
    ) {

        const glass =
            getMaterial(
                "#2d3140",
                {
                    roughness: .18,
                    transparent: true,
                    opacity: .72
                }
            );

        sphere(
            glassesRoot,
            [.15, .14, .025],
            [-.215, 4.22, .60],
            glass
        );

        sphere(
            glassesRoot,
            [.15, .14, .025],
            [.215, 4.22, .60],
            glass
        );
    }
}


/* ============================================================
   24. BAG
   ============================================================ */

function createBag(item) {

    clearGroup(
        bagRoot
    );

    if (!item) {
        return;
    }

    const color =
        state.colors[item.id] ||
        item.colors?.[0] ||
        "#a26c80";

    const mat =
        leather(color);


    let x = .94;

    let y = 2.18;


    if (
        item.type === "clutch"
    ) {

        x = .72;

        y = 2.22;
    }


    box(
        bagRoot,
        [.46, .50, .25],
        [x, y, .12],
        mat
    );


    if (
        item.type !== "clutch"
    ) {

        torus(
            bagRoot,
            .22,
            .035,
            [x, 2.56, .12],
            [0, 0, 0],
            metal("#d5ae61")
        );
    }


    if (
        item.type === "crossbody" ||
        item.type === "shoulder"
    ) {

        const strap =
            torus(
                bagRoot,
                .72,
                .025,
                [.55, 2.95, -.04],
                [Math.PI / 2, 0, .25],
                metal("#d5ae61")
            );

        strap.scale.set(
            .75,
            1,
            .70
        );
    }
}


/* ============================================================
   25. ACCESSORY
   ============================================================ */

/* ============================================================
   25. ACCESSORY
   ============================================================ */

function createAccessory(item) {

    clearGroup(
        accessoryRoot
    );

    if (!item) {
        return;
    }

    const color =
        state.colors[item.id] ||
        item.colors?.[0] ||
        "#d6b36b";


    if (
        item.type === "necklace"
    ) {

        const pearl =
            getMaterial(
                "#f4efe5",
                {
                    roughness: .18
                }
            );

        for (
            let i = -4;
            i <= 4;
            i++
        ) {

            sphere(
                accessoryRoot,
                [.045, .045, .045],
                [
                    i * .075,
                    3.36 -
                    Math.abs(i) * .018,
                    .60
                ],
                pearl,
                16
            );
        }

        return;
    }


    if (
        item.type === "ribbon"
    ) {

        const mat =
            satin(color);

        torus(
            accessoryRoot,
            .14,
            .03,
            [0, 3.34, .59],
            [Math.PI / 2, 0, 0],
            mat
        );

        sphere(
            accessoryRoot,
            [.13, .08, .04],
            [-.12, 3.34, .59],
            mat
        );

        sphere(
            accessoryRoot,
            [.13, .08, .04],
            [.12, 3.34, .59],
            mat
        );

        return;
    }


    if (
        item.type === "brooch"
    ) {

        sphere(
            accessoryRoot,
            [.10, .10, .045],
            [.30, 2.94, .69],
            metal(color),
            24
        );

        return;
    }


    if (
        item.type === "scarf"
    ) {

        torus(
            accessoryRoot,
            .30,
            .06,
            [0, 3.32, .25],
            [Math.PI / 2, 0, 0],
            satin(color)
        );

        return;
    }


    /* ========================================================
       NEW — OBI FORMAL PRIA
       ------------------------------------------------------
       Sabuk kain di pinggang, mirip obi wanita tapi lebih
       tipis dan tanpa simpul besar, cocok dipakai di atas
       kimono/haori pria.
       ======================================================== */

    if (
        item.type === "obiMale"
    ) {

        const obiMat =
            fabric(color);

        cylinder(
            accessoryRoot,
            .63,
            .68,
            .22,
            [0, 2.05, 0],
            obiMat,
            48
        );

        box(
            accessoryRoot,
            [.16, .40, .05],
            [0, 1.85, .66],
            metal(
                item.colors?.[1] ||
                "#c9a34d"
            )
        );

        return;
    }


    /* ========================================================
       NEW — TALI HAORI (HIMO)
       ------------------------------------------------------
       Tali kecil yang menyilang di dada bagian atas kimono,
       simbol khas haori formal.
       ======================================================== */

    if (
        item.type === "haoriHimo"
    ) {

        const cordMat =
            satin(color);

        box(
            accessoryRoot,
            [.55, .045, .04],
            [0, 3.00, .58],
            cordMat
        );

        sphere(
            accessoryRoot,
            [.06, .06, .05],
            [0, 2.96, .60],
            metal(
                item.colors?.[1] ||
                "#7c5c2e"
            ),
            16
        );

        return;
    }


    /* ========================================================
       NEW — JAM SAKU VINTAGE
       ------------------------------------------------------
       Lingkaran kecil (jam) dengan rantai pendek, digantung
       di area pinggang/dada.
       ======================================================== */

    if (
        item.type === "pocketWatch"
    ) {

        const watchMat =
            metal(color);

        torus(
            accessoryRoot,
            .085,
            .018,
            [.34, 2.30, .58],
            [0, 0, 0],
            watchMat
        );

        sphere(
            accessoryRoot,
            [.055, .055, .02],
            [.34, 2.30, .60],
            getMaterial(
                item.colors?.[2] ||
                "#c4cad3",
                {
                    roughness: .2
                }
            )
        );

        for (
            let i = 0;
            i < 4;
            i++
        ) {

            sphere(
                accessoryRoot,
                [.012, .012, .012],
                [
                    .30 + i * .012,
                    2.55 - i * .05,
                    .55
                ],
                watchMat,
                8
            );
        }

        return;
    }


    /* ========================================================
       NEW — KANCING MANSET (CUFFLINKS)
       ------------------------------------------------------
       Dua kancing kecil di dekat pergelangan tangan.
       ======================================================== */

    if (
        item.type === "cufflinks"
    ) {

        const cuffMat =
            metal(color);

        sphere(
            accessoryRoot,
            [.045, .045, .03],
            [-.82, 2.16, .05],
            cuffMat,
            16
        );

        sphere(
            accessoryRoot,
            [.045, .045, .03],
            [.82, 2.16, .05],
            cuffMat,
            16
        );

        return;
    }


    /* ========================================================
       NEW — DASI FORMAL
       ------------------------------------------------------
       Strip kain dari leher turun ke dada.
       ======================================================== */

    if (
        item.type === "necktie"
    ) {

        const tieMat =
            satin(color);

        box(
            accessoryRoot,
            [.10, .60, .03],
            [0, 3.00, .60],
            tieMat
        );

        box(
            accessoryRoot,
            [.16, .12, .035],
            [0, 3.28, .60],
            tieMat
        );

        return;
    }


    /* ========================================================
       NEW — PIN LAMBANG KELUARGA (KAMON)
       ------------------------------------------------------
       Bulatan kecil emas/perak di dada, simbol lambang
       keluarga khas seijin shiki.
       ======================================================== */

    if (
        item.type === "kamonPin"
    ) {

        sphere(
            accessoryRoot,
            [.075, .075, .03],
            [-.28, 2.98, .68],
            metal(color),
            24
        );

        return;
    }


    /* ========================================================
       NEW — IKAT PINGGANG KULIT
       ------------------------------------------------------
       Sabuk kulit tipis, cocok untuk outfit bisnis/streetwear.
       ======================================================== */

    if (
        item.type === "leatherBelt"
    ) {

        cylinder(
            accessoryRoot,
            .64,
            .69,
            .12,
            [0, 2.02, 0],
            leather(color),
            48
        );

        box(
            accessoryRoot,
            [.10, .12, .04],
            [0, 2.02, .67],
            metal(
                item.colors?.[2] ||
                "#c4cad3"
            )
        );

        return;
    }
}


/* ============================================================
   25a. ENVIRONMENT / THEME SYSTEM (NEW)
   ------------------------------------------------------------
   Mengganti suasana panggung 3D (langit/background, warna
   lantai & ring, warna lighting, dan partikel ambient) supaya
   terasa seperti "berada di tempatnya" sesuai tema outfit yang
   sedang dipakai — misalnya nuansa sakura untuk outfit Seijin
   Shiki, kota neon untuk streetwear, gala mewah untuk evening
   wear, dst.

   Tidak memakai foto/tekstur eksternal (supaya tidak bergantung
   pada aset gambar yang tidak tersedia) — semuanya dibuat
   procedural lewat canvas (gradient langit) dan partikel
   THREE.Points sederhana (sakura/salju/kilau/bokeh).
   ============================================================ */

const THEME_ENVIRONMENTS = {

    studio: {

        label: "Classic Atelier",

        skyTop: "#0b1626",
        skyBottom: "#1c3559",

        floor: "#172f56",
        platform: "#1f4b91",
        ring: "#2993ef",
        ring2: "#4c9df0",

        ambientSky: "#dcecff",
        ambientGround: "#071321",

        key: "#ffffff",
        fill: "#9ac9ff",
        rim: "#b89aff",

        particles: null
    },

    seijin: {

        label: "Sakura Garden",

        skyTop: "#3a1830",
        skyBottom: "#7c3350",

        floor: "#3a2233",
        platform: "#6e2c4c",
        ring: "#e58fb0",
        ring2: "#f6c8d9",

        ambientSky: "#ffd9e8",
        ambientGround: "#2a1220",

        key: "#fff1e0",
        fill: "#f7b8cf",
        rim: "#ffd28a",

        particles: {
            count: 70,
            color: "#f6b9d1",
            size: .11,
            speed: .32,
            opacity: .85,
            motion: "fall",
            topY: 5.6
        }
    },

    gala: {

        label: "Grand Runway",

        skyTop: "#05030a",
        skyBottom: "#221336",

        floor: "#0d0912",
        platform: "#1c1226",
        ring: "#d4af37",
        ring2: "#f4e2b8",

        ambientSky: "#e8d3ff",
        ambientGround: "#0a0410",

        key: "#ffe6b0",
        fill: "#8fa8ff",
        rim: "#c98bff",

        particles: {
            count: 60,
            color: "#f0d38a",
            size: .05,
            speed: .12,
            opacity: .8,
            motion: "twinkle",
            topY: 5.2
        }
    },

    winter: {

        label: "Winter Wonderland",

        skyTop: "#0e1c28",
        skyBottom: "#3c6485",

        floor: "#16222e",
        platform: "#22384a",
        ring: "#8fd9ff",
        ring2: "#e8f6ff",

        ambientSky: "#dff2ff",
        ambientGround: "#0b1720",

        key: "#eaf6ff",
        fill: "#a9d8ff",
        rim: "#c9e9ff",

        particles: {
            count: 80,
            color: "#ffffff",
            size: .085,
            speed: .38,
            opacity: .9,
            motion: "fall",
            topY: 5.8
        }
    },

    business: {

        label: "Modern Office",

        skyTop: "#0a1420",
        skyBottom: "#33475e",

        floor: "#101820",
        platform: "#1c2733",
        ring: "#3fa9f5",
        ring2: "#88c4ff",

        ambientSky: "#cfe6ff",
        ambientGround: "#050c14",

        key: "#f3f7ff",
        fill: "#7fb3ff",
        rim: "#9fc4ff",

        particles: {
            count: 45,
            color: "#bcdcff",
            size: .07,
            speed: .1,
            opacity: .55,
            motion: "float",
            topY: 5.2
        }
    },

    streetwear: {

        label: "Neon City",

        skyTop: "#0a0416",
        skyBottom: "#2c1450",

        floor: "#120a24",
        platform: "#241236",
        ring: "#ff2e88",
        ring2: "#33e1ff",

        ambientSky: "#ffb3e6",
        ambientGround: "#0a0416",

        key: "#ff9ad6",
        fill: "#33e1ff",
        rim: "#a259ff",

        particles: {
            count: 65,
            color: "#4be8ff",
            size: .07,
            speed: .14,
            opacity: .7,
            motion: "float",
            topY: 5.4
        }
    },

    minimalist: {

        label: "Minimalist Muse",

        skyTop: "#141a22",
        skyBottom: "#2c3844",

        floor: "#181f27",
        platform: "#232c36",
        ring: "#cfd8e0",
        ring2: "#eef2f5",

        ambientSky: "#eef2f5",
        ambientGround: "#0c1116",

        key: "#ffffff",
        fill: "#c7d3dc",
        rim: "#dfe6ec",

        particles: null
    }

};


/*
 * Tag (dari getItemTags()) yang dipetakan ke tiap tema.
 * Urutan array di bawah menentukan prioritas kalau ada
 * beberapa tema yang skornya sama (yang dicek lebih dulu
 * menang).
 */

const THEME_TAG_MAP = {

    seijin: [
        "seijin",
        "traditional",
        "ceremony"
    ],

    gala: [
        "evening",
        "luxury",
        "designer",
        "runway"
    ],

    winter: [
        "winter"
    ],

    business: [
        "business",
        "professional",
        "executive"
    ],

    streetwear: [
        "streetwear",
        "urban"
    ],

    minimalist: [
        "minimalist",
        "clean"
    ]
};

const THEME_PRIORITY = [
    "seijin",
    "gala",
    "winter",
    "business",
    "streetwear",
    "minimalist"
];


function detectOutfitTheme() {

    const tally = {};


    Object.values(
        state.selected || {}
    ).forEach(
        itemId => {

            const item =
                getItem(itemId);

            if (!item) {
                return;
            }

            const tags =
                getItemTags(item);


            Object.entries(
                THEME_TAG_MAP
            ).forEach(
                ([themeKey, themeTags]) => {

                    const matches =
                        tags.filter(
                            tag =>
                                themeTags.includes(tag)
                        ).length;

                    if (matches > 0) {

                        tally[themeKey] =
                            (tally[themeKey] || 0) +
                            matches;
                    }
                }
            );
        }
    );


    let bestKey = "studio";

    let bestScore = 0;


    THEME_PRIORITY.forEach(
        key => {

            const score =
                tally[key] || 0;

            if (score > bestScore) {

                bestScore = score;

                bestKey = key;
            }
        }
    );


    return bestKey;
}


function createSkyTexture(
    topColor,
    bottomColor
) {

    const key =
        `${topColor}|${bottomColor}`;

    if (
        skyTextureCache.has(key)
    ) {

        return skyTextureCache.get(key);
    }


    const canvas =
        document.createElement("canvas");

    canvas.width = 2;

    canvas.height = 256;

    const ctx =
        canvas.getContext("2d");

    const gradient =
        ctx.createLinearGradient(
            0, 0, 0, canvas.height
        );

    gradient.addColorStop(0, topColor);

    gradient.addColorStop(1, bottomColor);

    ctx.fillStyle = gradient;

    ctx.fillRect(
        0, 0, canvas.width, canvas.height
    );

    const texture =
        new THREE.CanvasTexture(canvas);

    texture.needsUpdate = true;

    skyTextureCache.set(
        key,
        texture
    );

    return texture;
}


function createParticleTexture() {

    if (particleTextureCache) {

        return particleTextureCache;
    }

    const size = 64;

    const canvas =
        document.createElement("canvas");

    canvas.width = size;

    canvas.height = size;

    const ctx =
        canvas.getContext("2d");

    const gradient =
        ctx.createRadialGradient(
            size / 2, size / 2, 0,
            size / 2, size / 2, size / 2
        );

    gradient.addColorStop(0, "rgba(255,255,255,1)");

    gradient.addColorStop(.4, "rgba(255,255,255,.7)");

    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = gradient;

    ctx.fillRect(0, 0, size, size);

    particleTextureCache =
        new THREE.CanvasTexture(canvas);

    return particleTextureCache;
}


function buildParticleSystem(theme) {

    if (!theme.particles) {
        return null;
    }

    const config =
        theme.particles;

    const count =
        config.count || 60;

    const topY =
        config.topY ?? 6;

    const positions =
        new Float32Array(count * 3);


    for (
        let i = 0;
        i < count;
        i++
    ) {

        positions[i * 3 + 0] =
            (Math.random() - .5) * 5.6;

        positions[i * 3 + 1] =
            Math.random() * topY;

        positions[i * 3 + 2] =
            (Math.random() - .5) * 5.6;
    }


    const geometry =
        new THREE.BufferGeometry();

    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );


    const material =
        new THREE.PointsMaterial({

            size:
                config.size || .08,

            map:
                createParticleTexture(),

            color:
                new THREE.Color(
                    config.color || "#ffffff"
                ),

            transparent: true,

            opacity:
                config.opacity ?? .8,

            depthWrite: false,

            sizeAttenuation: true
        });


    const points =
        new THREE.Points(
            geometry,
            material
        );

    points.userData = {

        motion:
            config.motion || "fall",

        speed:
            config.speed || .35,

        topY:
            topY,

        elapsed: 0
    };

    return points;
}


function updateParticles(delta) {

    if (!particleSystem) {
        return;
    }

    const positionAttribute =
        particleSystem.geometry
            .attributes.position;

    const config =
        particleSystem.userData;

    config.elapsed =
        (config.elapsed || 0) + delta;


    for (
        let i = 0;
        i < positionAttribute.count;
        i++
    ) {

        let x =
            positionAttribute.getX(i);

        let y =
            positionAttribute.getY(i);

        const z =
            positionAttribute.getZ(i);


        if (config.motion === "fall") {

            y -= config.speed * delta;

            x +=
                Math.sin(
                    config.elapsed * .6 + i
                ) * .0025;

            if (y < .1) {

                y = config.topY;
            }

        } else if (config.motion === "float") {

            y += config.speed * delta;

            x +=
                Math.sin(
                    config.elapsed * .4 + i
                ) * .003;

            if (y > config.topY) {

                y = .2;
            }

        } else if (config.motion === "twinkle") {

            x +=
                Math.sin(
                    config.elapsed * .2 + i
                ) * .0012;
        }


        positionAttribute.setXYZ(
            i, x, y, z
        );
    }


    positionAttribute.needsUpdate = true;


    if (
        config.motion === "twinkle" &&
        particleSystem.material
    ) {

        particleSystem.material.opacity =
            .35 +
            Math.sin(config.elapsed * 1.4) * .25;
    }
}


function applyEnvironmentTheme(
    themeKey,
    force = false
) {

    if (!scene) {
        return;
    }

    if (
        !force &&
        state.currentEnvironment === themeKey
    ) {
        return;
    }

    const theme =
        THEME_ENVIRONMENTS[themeKey] ||
        THEME_ENVIRONMENTS.studio;


    /*
     * SKY
     */

    scene.background =
        createSkyTexture(
            theme.skyTop,
            theme.skyBottom
        );


    /*
     * STAGE COLORS
     */

    if (floorMaterial) {

        floorMaterial.color.set(
            theme.floor
        );
    }

    if (platformMaterial) {

        platformMaterial.color.set(
            theme.platform
        );
    }

    if (ringMaterial) {

        ringMaterial.color.set(
            theme.ring
        );
    }

    if (ring2Material) {

        ring2Material.color.set(
            theme.ring2
        );
    }


    /*
     * LIGHTS
     */

    if (ambientLight) {

        ambientLight.color.set(
            theme.ambientSky || "#dcecff"
        );

        ambientLight.groundColor.set(
            theme.ambientGround || "#071321"
        );
    }

    if (keyLight) {

        keyLight.color.set(
            theme.key || "#ffffff"
        );
    }

    if (fillLight) {

        fillLight.color.set(
            theme.fill || "#9ac9ff"
        );
    }

    if (rimLight) {

        rimLight.color.set(
            theme.rim || "#b89aff"
        );
    }


    /*
     * PARTICLES
     */

    if (particleSystem) {

        scene.remove(particleSystem);

        particleSystem.geometry.dispose();

        particleSystem.material.dispose();

        particleSystem = null;
    }

    const newParticles =
        buildParticleSystem(theme);

    if (newParticles) {

        scene.add(newParticles);

        particleSystem = newParticles;
    }


    state.currentEnvironment =
        themeKey;


    /*
     * "CURRENT STYLE" LABEL
     */

    const styleLabel =
        document.getElementById(
            "fashionStyleName"
        );

    if (styleLabel) {

        styleLabel.textContent =
            theme.label ||
            "Classic Atelier";
    }
}


/* ============================================================
   26. UPDATE AVATAR
   ============================================================ */

function updateAvatar() {

    if (!avatarRoot) {
        return;
    }


    createBaseBody();


    const hair =
        getSelected("hair");

    createHair(
        hair ||
        getItem("hair-soft-bob")
    );


    const top =
        getSelected("top");

    const dress =
        getSelected("dress");

    const jacket =
        getSelected("jacket");

    const bottom =
        getSelected("bottom");

    const shoes =
        getSelected("shoes");

    const hat =
        getSelected("hat");

    const glasses =
        getSelected("glasses");

    const bag =
        getSelected("bag");

    const accessory =
        getSelected("accessory");


    /*
     * Dress dan top tidak bersamaan.
     */

    if (dress) {

        delete state.selected.top;

        clearGroup(topRoot);

        /*
         * NEW: kalau jaket JUGA sedang dipakai, render dress
         * dalam mode "rok saja" (hideBodice: true) — bodice,
         * lengan, dan neckline dress disembunyikan supaya tidak
         * bentrok/tembus dengan torso & lengan jaket. Kalau
         * jaket tidak dipakai, dress dirender penuh seperti
         * biasa (hideBodice: false).
         */

        createDress(
            dress,
            {
                hideBodice: !!jacket
            }
        );

    } else {

        clearGroup(dressRoot);

        createTop(top);
    }


    /*
     * Jacket selalu berada
     * di atas top/dress.
     */

    createJacket(jacket);


    /*
     * Dress menutupi bottom.
     */

    if (dress) {

        clearGroup(bottomRoot);

    } else {

        createBottom(bottom);
    }


    createShoes(
        shoes ||
        getItem("shoe-sneakers")
    );

    createHat(hat);

    createGlasses(glasses);

    createBag(bag);

    createAccessory(accessory);


    /*
     * Render order.
     */

    underLayerRoot.renderOrder = 1;

    bottomRoot.renderOrder = 4;

    shoeRoot.renderOrder = 5;

    topRoot.renderOrder = 6;

    dressRoot.renderOrder = 7;

    jacketRoot.renderOrder = 8;

    hairRoot.renderOrder = 20;

    hatRoot.renderOrder = 22;

    glassesRoot.renderOrder = 23;

    accessoryRoot.renderOrder = 24;

    bagRoot.renderOrder = 25;


    /*
     * NEW: deteksi & terapkan tema environment (background,
     * lighting, partikel) sesuai outfit yang sekarang dipakai.
     * applyEnvironmentTheme() sendiri sudah skip kalau temanya
     * tidak berubah, jadi aman dipanggil di setiap update.
     */

    applyEnvironmentTheme(
        detectOutfitTheme()
    );
}


/* ============================================================
   27. ITEM HELPERS
   ============================================================ */

function getItem(id) {

    if (!id) {
        return null;
    }

    return ITEMS.find(
        item =>
            item.id === id
    ) || null;
}


function getSelected(category) {

    return getItem(
        state.selected[category]
    );
}


/* ============================================================
   27a. GENDER RESTRICTION (NEW)
   ------------------------------------------------------------
   FIX: sebelumnya item HANYA dianggap gender-locked kalau
   field "gender" diisi manual di data ITEMS. Semua item
   kategori "dress" (termasuk furisode/kimono/hakama wanita)
   TIDAK PERNAH diberi field "gender" secara eksplisit — jadi
   selectItem()/randomItem()/switchGender() menganggapnya
   unisex, padahal desainnya (bust silhouette, nama item
   seperti "Ceremony Hakama" dress, dst.) memang khusus untuk
   model wanita. Akibatnya avatar pria bisa pakai dress lewat
   klik manual maupun Random Outfit, dan tetap memakainya kalau
   gender di-switch ke pria.

   getItemGenderRestriction() jadi SATU sumber kebenaran soal
   gender item: pakai field eksplisit kalau ada, kalau tidak
   ada tapi kategorinya "dress", anggap perempuan (avatar pria
   memakai kombinasi top+bottom untuk baju tradisional, bukan
   "dress"). Kategori lain tetap unisex seperti sebelumnya.
   ============================================================ */

function getItemGenderRestriction(item) {

    if (!item) {
        return null;
    }

    if (item.gender) {
        return item.gender;
    }

    // NEW: bag & accessory umum (tas, kalung, ribbon, brooch, scarf)
    // defaultnya feminin kecuali ditag "male" secara eksplisit —
    // sama seperti aturan dress.
    if (
        item.category === "dress" ||
        item.category === "bag" ||
        item.category === "accessory"
    ) {
        return "female";
    }

    return null;
}


/* ============================================================
   28. ITEM SELECTION
   ============================================================ */

function selectItem(id) {

    const item =
        getItem(id);

    if (!item) {
        return;
    }


    const itemGenderRestriction =
        getItemGenderRestriction(item);

    if (
        itemGenderRestriction &&
        itemGenderRestriction !== state.gender
    ) {

        showToast(
            "⚠",
            state.gender === "female"
                ? "Item ini untuk model pria."
                : "Item ini untuk model wanita."
        );

        return;
    }


    /*
     * Dress menggantikan top.
     * Top menggantikan dress.
     *
     * (Aturan bawaan: setiap kategori HANYA boleh diisi satu
     * item. state.selected[item.category] = item.id di bawah
     * SUDAH otomatis melepas item lama di kategori yang sama
     * — jadi baju-dengan-baju atau celana-dengan-celana
     * otomatis saling gantian tanpa kode tambahan.)
     */

    if (
        item.category === "dress"
    ) {

        delete state.selected.top;
    }

    if (
        item.category === "top"
    ) {

        delete state.selected.dress;
    }


    /* ========================================================
       NEW — JACKET & DRESS SEKARANG BOLEH DIPAKAI BERSAMAAN
       ------------------------------------------------------
       FIX: sebelumnya jaket & dress saling melepas satu sama
       lain (mutual exclusive) untuk menghindari bodice dress
       "tembus" keluar dari torso jaket. Sekarang keduanya boleh
       dipakai bersamaan — masalah tembus/clipping ditangani di
       createDress() (parameter hideBodice, disembunyikan otomatis
       saat jaket aktif — lihat updateAvatar()) dan createJacket()
       (torso sedikit dibesarkan saat dress aktif). Jadi baris
       saling-hapus yang dulu ada di sini SUDAH DIHAPUS.
       ======================================================== */


    state.selected[
        item.category
    ] = item.id;


    state.colors[
        item.id
    ] =
        state.colors[item.id] ||
        item.colors?.[0];


    updateAvatar();

    updateAllUI();

    saveTemporaryState();

    updateChallengeScoreUI();

    updateChallengeUI();

    showToast(
        "✦",
        `${item.name} dipakai`
    );
}


/* ============================================================
   29. REMOVE ITEM
   ============================================================ */

function removeCategory(category) {

    if (
        !state.selected[category]
    ) {
        return;
    }

    delete state.selected[
        category
    ];

    updateAvatar();

    updateAllUI();

    saveTemporaryState();

    showToast(
        "×",
        "Item dilepas"
    );
}


/* ============================================================
   30. GENDER
   ============================================================ */

function switchGender(gender) {

    // NEW: gender terkunci selama challenge berlangsung
    if (state.challengeActive) {

        showToast("🔒", "Gender terkunci selama challenge berlangsung.");

        return;
    }

    if (gender !== "female" && gender !== "male") {
        return;
    }

    // ...sisa fungsi tetap sama seperti sebelumnya


    state.gender =
        gender;


    /*
     * Hapus item khusus gender
     * jika tidak cocok.
     *
     * FIX: sebelumnya hanya cek "item.gender" eksplisit, jadi
     * dress yang sedang dipakai (tidak punya field "gender",
     * lihat getItemGenderRestriction()) TIDAK ikut terlepas
     * saat gender di-switch ke pria — avatar pria bisa tetap
     * memakai dress wanita. Sekarang pakai
     * getItemGenderRestriction() supaya konsisten dengan
     * selectItem() dan randomItem().
     */

    Object.keys(
        state.selected
    ).forEach(
        category => {

            const item =
                getSelected(category);

            const restriction =
                getItemGenderRestriction(item);

            if (
                item &&
                restriction &&
                restriction !== gender
            ) {

                delete state.selected[
                    category
                ];
            }
        }
    );


    /*
     * Gender pria otomatis mendapat
     * rambut pria jika sebelumnya
     * menggunakan rambut wanita.
     */

    if (
        gender === "male"
    ) {

        const hair =
            getSelected("hair");

        if (
            !hair ||
            (
                hair.gender &&
                hair.gender !== "male"
            )
        ) {

            state.selected.hair =
                "hair-male-short";
        }

    } else {

        const hair =
            getSelected("hair");

        if (
            !hair ||
            hair.gender === "male"
        ) {

            state.selected.hair =
                "hair-soft-bob";
        }
    }


    createBaseBody();

    updateAvatar();

    updateAllUI();

    saveTemporaryState();

    showToast(
        "✦",
        gender === "female"
            ? "Female model selected"
            : "Male model selected"
    );
}


/* ============================================================
   31. RANDOM OUTFIT
   ============================================================ */

function randomItem(category) {

    const available =
        ITEMS.filter(
            item => {

                if (
                    item.category !==
                    category
                ) {
                    return false;
                }

                const restriction =
                    getItemGenderRestriction(item);

                if (
                    restriction &&
                    restriction !==
                    state.gender
                ) {
                    return false;
                }

                return true;
            }
        );

    if (!available.length) {
        return null;
    }

    return available[
        Math.floor(
            Math.random() *
            available.length
        )
    ];
}


function randomOutfit() {

    const categories = [

        "hair",
        "top",
        "dress",
        "jacket",
        "bottom",
        "shoes",
        "hat",
        "glasses",
        "bag",
        "accessory"
    ];


    state.selected = {};


    /*
     * FIX: dress kategori sekarang female-only (lihat
     * getItemGenderRestriction()). Kalau avatar pria dan
     * useDress kebetulan true, randomItem("dress") akan
     * selalu null (semua dress difilter keluar) — hasilnya
     * avatar pria bisa berakhir TANPA top maupun bottom sama
     * sekali (badan polos). Jadi jalur "dress" cuma dicoba
     * kalau gender-nya memang perempuan.
     */

    const useDress =
        state.gender === "female" &&
        Math.random() > .45;


    if (useDress) {

        const dress =
            randomItem("dress");

        if (dress) {

            state.selected.dress =
                dress.id;
        }

    } else {

        const top =
            randomItem("top");

        const bottom =
            randomItem("bottom");

        if (top) {

            state.selected.top =
                top.id;
        }

        if (bottom) {

            state.selected.bottom =
                bottom.id;
        }
    }


    const jacket =
        (!useDress && Math.random() > .55)
            ? randomItem("jacket")
            : null;

    if (jacket) {

        state.selected.jacket =
            jacket.id;
    }


    categories
        .filter(
            category =>
                category !== "top" &&
                category !== "dress" &&
                category !== "jacket" &&
                category !== "bottom"
        )
        .forEach(
            category => {

                const item =
                    randomItem(category);

                if (item) {

                    state.selected[
                        category
                    ] = item.id;
                }
            }
        );


    updateAvatar();

    updateAllUI();

    saveTemporaryState();

    showToast(
        "✦",
        "Random style dibuat"
    );
}


/* ============================================================
   32. SCORE
   ============================================================ */

function calculateScore() {

    let score = 0;


    // Ambil hanya item yang benar-benar dipilih
    const selectedEntries =
        Object.entries(state.selected)
            .filter(([category, id]) => id);


    selectedEntries.forEach(
        ([category, id]) => {

            const item =
                getItem(id);


            if (item) {

                score +=
                    Number(item.score) || 0;

            }

        }
    );


    /*
     * Ambil kategori yang benar-benar memiliki item.
     */

    const categories =
        new Set(
            selectedEntries.map(
                ([category]) => category
            )
        );


    /* ========================================================
       BONUS EQUIPMENT
    ======================================================== */

    if (categories.has("hair")) {
        score += 5;
    }


    if (categories.has("shoes")) {
        score += 5;
    }


    if (categories.has("bag")) {
        score += 5;
    }


    if (categories.has("accessory")) {
        score += 5;
    }


    /*
     * Dress + Jacket bonus
     */

    if (
        categories.has("dress") &&
        categories.has("jacket")
    ) {

        score += 10;

    }


    /*
     * Maksimal Style Score = 100
     */

    return Math.min(
        100,
        Math.round(score)
    );

}


/* ============================================================
   32a. PROGRESSION SYSTEM (LEVEL & COMBO) — NEW
   ------------------------------------------------------------
   FIX: sebelumnya sistem level & combo setengah jadi.

   - Level: dulu cuma di-set "Math.max(state.level, 2)" — jadi
     level SATU-SATUNYA yang bisa dicapai selamanya cuma 1 atau
     2, tidak peduli berapa pun total poin yang dikumpulkan.
     Sekarang level dihitung dari total "state.points" yang
     terkumpul (naik terus setiap LEVEL_POINTS_STEP poin),
     jadi progres pemain benar-benar terasa berkembang.

   - Combo: dulu "state.combo += 1" di setiap submit, apa pun
     skornya — jadi bukan combo/streak sungguhan, cuma
     penghitung total submit. Sekarang combo naik hanya kalau
     skor submit itu bagus (>= COMBO_SCORE_THRESHOLD), dan reset
     ke 0 kalau skornya jelek — combo betulan jadi reward untuk
     konsistensi outfit bagus. Combo juga memberi bonus uang
     kecil (persentase) supaya combo terasa berguna, bukan cuma
     angka kosmetik.

   Dipakai bersama oleh submitDesign() (mode normal) dan
   finishChallenge() (mode challenge) supaya progresnya
   konsisten di kedua jalur.
   ============================================================ */

const LEVEL_POINTS_STEP =
    400;

const COMBO_SCORE_THRESHOLD =
    60;

const COMBO_MAX_BONUS_PERCENT =
    50;


function applyProgressReward(
    score,
    baseMoneyReward
) {

    /*
     * COMBO
     */

    if (score >= COMBO_SCORE_THRESHOLD) {

        state.combo += 1;

    } else {

        state.combo = 0;
    }


    const comboBonusPercent =
        Math.min(
            COMBO_MAX_BONUS_PERCENT,
            state.combo * 5
        );

    const moneyReward =
        Math.round(
            baseMoneyReward *
            (1 + comboBonusPercent / 100)
        );


    /*
     * POINTS & MONEY
     */

    state.points +=
        score;

    state.money +=
        moneyReward;


    /*
     * LEVEL — terus naik mengikuti total poin, tidak lagi
     * mentok di level 2.
     */

    const newLevel =
        1 +
        Math.floor(
            state.points / LEVEL_POINTS_STEP
        );

    const leveledUp =
        newLevel > state.level;

    state.level =
        newLevel;


    return {

        moneyReward:
            moneyReward,

        comboBonusPercent:
            comboBonusPercent,

        leveledUp:
            leveledUp
    };
}


function updateScore() {

    state.score =
        calculateScore();


    const scoreElements =
        $all(
            "[data-fashion-score], " +
            "#fashionScore, " +
            "#fashionStyleScore, " +
            "#styleScore, " +
            ".style-score-value"
        );


    scoreElements.forEach(
        element => {

            element.textContent =
                state.score;
        }
    );


    let rank = "C";


    if (
        state.score >= 90
    ) {

        rank = "S";

    } else if (
        state.score >= 75
    ) {

        rank = "A";

    } else if (
        state.score >= 55
    ) {

        rank = "B";
    }


    $all(
        "[data-fashion-rank], " +
        "#fashionRank, " +
        ".style-rank"
    ).forEach(
        element => {

            element.textContent =
                rank;
        }
    );
}


/* ============================================================
   33. WARDROBE
   ============================================================ */

function renderWardrobe() {

    const grid =
        firstExisting([
            "#fashionItemsGrid",
            "[data-fashion-items-grid]",
            ".fashion-items-grid"
        ]);

    if (!grid) {
        return;
    }


    const query =
        state.search
            .trim()
            .toLowerCase();


    const filtered =
        ITEMS.filter(
            item => {

                /*
                 * Gender filtering.
                 */

                const genderRestriction =
                    getItemGenderRestriction(item);

                if (
                    genderRestriction &&
                    genderRestriction !== state.gender
                ) {
                    return false;
                }


                /*
                 * Category filtering.
                 */

                const categoryMatch =
                    state.category ===
                    "all" ||

                    item.category ===
                    state.category;


                if (!categoryMatch) {
                    return false;
                }


                /*
                 * Search.
                 */

                if (!query) {
                    return true;
                }


                return item.name
                    .toLowerCase()
                    .includes(query);
            }
        );


    grid.innerHTML = "";


    filtered.forEach(
        item => {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "fashion-item-card";


            if (
                state.selected[
                    item.category
                ] === item.id
            ) {

                button.classList.add(
                    "equipped"
                );
            }


            button.dataset.fashionItem =
                item.id;

            button.dataset.itemId =
                item.id;


            const color =
                item.colors?.[0] ||
                "#aaa";


            button.innerHTML = `

                <div
                    class="fashion-item-preview"
                    style="
                        --item-color:${escapeHTML(color)};
                    "
                >

                    <div
                        class="
                            fashion-item-visual
                            item-${escapeHTML(item.category)}
                        "
                        style="
                            background:
                                linear-gradient(
                                    145deg,
                                    ${escapeHTML(color)},
                                    rgba(255,255,255,.08)
                                );
                        "
                    ></div>

                </div>

                <div
                    class="fashion-item-info"
                >

                    <span
                        class="fashion-item-name"
                    >
                        ${escapeHTML(item.name)}
                    </span>

                    <div
                        class="fashion-item-meta"
                    >

                        <span>
                            ${escapeHTML(item.rarity)}
                        </span>

                        <span
                            class="fashion-item-price"
                        >
                            +${item.score}
                        </span>

                    </div>

                </div>

                <span
                    class="
                        fashion-rarity-dot
                        ${escapeHTML(item.rarity)}
                    "
                ></span>

            `;


            button.addEventListener(
                "click",
                () =>
                    selectItem(item.id)
            );


            grid.appendChild(
                button
            );
        }
    );


    updateWardrobeCount();
}


function updateWardrobeCount() {

    const element =
        firstExisting([
            "#fashionWardrobeCount",
            "[data-fashion-count]"
        ]);

    if (!element) {
        return;
    }


    const count =
        Object.keys(
            state.selected
        ).length;


    element.textContent =
        `${count} / ${ITEMS.length}`;
}



/* ============================================================
   34. CATEGORY
   ============================================================ */

function setupCategories() {

    $all(
        "[data-fashion-category], " +
        ".fashion-category-button"
    ).forEach(
        button => {

            if (
                button.dataset.categoryBound
            ) {
                return;
            }

            button.dataset.categoryBound =
                "1";


            button.addEventListener(
                "click",
                () => {

                    state.category =
                        button.dataset
                            .fashionCategory ||
                        button.dataset
                            .category ||
                        "all";


                    updateCategoryButtons();

                    renderWardrobe();
                }
            );
        }
    );
}


function updateCategoryButtons() {

    $all(
        "[data-fashion-category]"
    ).forEach(
        button => {

            const category =
                button.dataset
                    .fashionCategory;

            button.classList.toggle(
                "active",
                category ===
                state.category
            );
        }
    );
}


/* ============================================================
   35. SEARCH
   ============================================================ */

function setupSearch() {

    const input =
        firstExisting([
            "#fashionSearchInput",
            "#fashionSearch",
            "#fashion-search",
            ".fashion-search input",
            "[data-fashion-search]"
        ]);


    if (!input) {
        return;
    }


    input.addEventListener(
        "input",
        event => {

            state.search =
                event.target.value;

            renderWardrobe();
        }
    );
}


/* ============================================================
   36. STAGE CONTROLS
   ============================================================ */

/* ============================================================
   36. STAGE CONTROLS
   ============================================================ */

function setupStageControls() {

    const container =
        firstExisting([
            "#fashionThreeContainer",
            "#fashion3D",
            "#fashionCanvas",
            ".fashion-three-container"
        ]);


    if (!container) {
        return;
    }


    let dragging = false;

    let startX = 0;

    let startRotation = 0;


    container.addEventListener(
        "pointerdown",
        event => {

            /*
             * Hanya drag jika bukan tombol/UI.
             */

            if (
                event.target.closest(
                    "button, input, select"
                )
            ) {
                return;
            }


            dragging = true;

            startX =
                event.clientX;

            startRotation =
                state.targetRotation;

            /*
             * NEW: tandai interaksi supaya auto-rotate idle
             * (lihat animate()) berhenti selama user drag.
             */

            state.lastInteraction =
                Date.now();


            try {

                container.setPointerCapture(
                    event.pointerId
                );

            } catch (_) {}
        }
    );


    container.addEventListener(
        "pointermove",
        event => {

            if (!dragging) {
                return;
            }


            state.lastInteraction =
                Date.now();


            const delta =
                event.clientX -
                startX;


            /*
             * FIX: drag jari di HP cenderung lebih pendek
             * jaraknya dibanding drag mouse untuk hasil putaran
             * yang sama, jadi terasa "berat"/kurang responsif
             * kalau sensitivitasnya disamakan dengan mouse.
             * Naikkan sedikit khusus untuk pointerType "touch".
             */

            const isTouch =
                event.pointerType === "touch";

            state.targetRotation =
                startRotation +
                delta * (isTouch ? .018 : .012);
        }
    );


    const stop =
        () => {

            dragging = false;
        };


    container.addEventListener(
        "pointerup",
        stop
    );

    container.addEventListener(
        "pointercancel",
        stop
    );


    /*
     * Zoom.
     *
     * Bisa zoom jauh lebih dekat.
     */

    container.addEventListener(
    "wheel",
    event => {

        event.preventDefault();

        state.lastInteraction =
            Date.now();

        // FIX: dipercepat dari .0038 -> .006 karena rentang zoom sekarang lebih panjang
        state.targetCameraDistance +=
            event.deltaY * .006;

        state.targetCameraDistance =
            THREE.MathUtils.clamp(
                state.targetCameraDistance,
                CONFIG.camera.minDistance,
                CONFIG.camera.maxDistance
            );
    },
    { passive: false }
);


    /*
     * Double click = reset.
     */

    container.addEventListener(
        "dblclick",
        () => {

            resetView();
        }
    );
}

/* ============================================================
   37. ZOOM BUTTONS
   ============================================================ */

function setupZoomButtons() {

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-fashion-zoom]"
                );


            if (!button) {
                return;
            }


            const action =
                button.dataset
                    .fashionZoom;


            if (
                action === "in"
            ) {

                state.targetCameraDistance -=
                    .9;
            }


            if (
                action === "out"
            ) {

                state.targetCameraDistance +=
                    .9;
            }


            if (
                action === "reset"
            ) {

                resetView();

                return;
            }


            state.targetCameraDistance =
                THREE.MathUtils.clamp(
                    state.targetCameraDistance,

                    CONFIG.camera.minDistance,

                    CONFIG.camera.maxDistance
                );
        }
    );
}


/* ============================================================
   38. RESET VIEW
   ============================================================ */

function resetView() {

    state.targetRotation =
        0;

    state.targetCameraDistance =
        CONFIG.camera.defaultDistance;
}


/* ============================================================
   39. GENDER EVENTS
   ============================================================ */

function setupGenderEvents() {

    /*
     * Support:
     * data-fashion-gender="female"
     *
     * dan:
     * data-gender="female"
     */

    $all(
        "[data-fashion-gender], [data-gender]"
    ).forEach(
        button => {

            if (
                button.dataset.genderBound
            ) {
                return;
            }

            button.dataset.genderBound =
                "1";


            button.addEventListener(
                "click",
                () => {

                    const gender =
                        button.dataset
                            .fashionGender ||
                        button.dataset
                            .gender;

                    switchGender(
                        gender
                    );
                }
            );
        }
    );


    /*
     * Fallback untuk tombol HTML lama:
     *
     * ♀ Female
     * ♂ Male
     */

    $all("button").forEach(
        button => {

            if (
                button.dataset.genderBound
            ) {
                return;
            }


            const text =
                button.textContent
                    .trim()
                    .toLowerCase();


            if (
                text === "female" ||
                text.includes("♀ female")
            ) {

                button.dataset.genderBound =
                    "1";

                button.addEventListener(
                    "click",
                    () =>
                        switchGender(
                            "female"
                        )
                );
            }


            if (
                text === "male" ||
                text.includes("♂ male")
            ) {

                button.dataset.genderBound =
                    "1";

                button.addEventListener(
                    "click",
                    () =>
                        switchGender(
                            "male"
                        )
                );
            }
        }
    );
}


/* ============================================================
   40. EXISTING BUTTONS
   ============================================================ */

function setupExistingButtons() {

    /*
     * Random.
     */

    $all(
        "#fashionRandomButton, " +
        "[data-fashion-random]"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                randomOutfit
            );
        }
    );


    /*
     * Clear.
     */

    $all(
        "#fashionClearButton, " +
        "[data-fashion-clear]"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                clearOutfit
            );
        }
    );


    /*
     * Submit.
     */

    $all(
        "#fashionSubmitButton, " +
        "[data-fashion-submit]"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                submitDesign
            );
        }
    );


    /*
     * Save (Sketch — outfit data + thumbnail).
     */

    $all(
        "#fashionSaveButton, " +
        "[data-fashion-save]"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                saveOutfit
            );
        }
    );


    /*
     * NEW — Save as Image (PNG download langsung).
     *
     * Tambahkan tombol di HTML dengan salah satu dari:
     * id="fashionSaveImageButton"
     * data-fashion-save-image
     */

    $all(
        "#fashionSaveImageButton, " +
        "[data-fashion-save-image]"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                saveDesignAsImage
            );
        }
    );


    /*
     * Remove selected.
     */

    $all(
        "#fashionDeselectButton, " +
        "[data-fashion-remove-selected]"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                removeLastSelected
            );
        }
    );


    /*
     * Rotate buttons.
     */

    $all(
        "#fashionRotateLeft"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    state.targetRotation -=
                        Math.PI / 6;
                }
            );
        }
    );


    $all(
        "#fashionRotateRight"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    state.targetRotation +=
                        Math.PI / 6;
                }
            );
        }
    );


    $all(
        "#fashionResetView"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                resetView
            );
        }
    );


    /*
     * Direct zoom IDs.
     */

    $all(
        "#fashionZoomIn"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    state.targetCameraDistance -=
                        .55;
                }
            );
        }
    );


    $all(
        "#fashionZoomOut"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    state.targetCameraDistance +=
                        .55;
                }
            );
        }
    );
}


/* ============================================================
   41. CLEAR
   ============================================================ */

function clearOutfit() {

    state.selected = {};

    state.colors = {};

    /*
     * Tetap tampilkan hair default
     * dan shoes default.
     */

    updateAvatar();

    updateAllUI();

    saveTemporaryState();

    showToast(
        "↻",
        "Outfit dibersihkan"
    );
}


/* ============================================================
   42. REMOVE LAST
   ============================================================ */

function removeLastSelected() {

    const categories =
        Object.keys(
            state.selected
        );


    if (!categories.length) {
        return;
    }


    const category =
        categories[
            categories.length - 1
        ];


    removeCategory(
        category
    );
}


/* ============================================================
   43. SELECTED ITEMS UI
   ============================================================ */

function updateSelectedItems() {

    const selected =
        Object.values(
            state.selected
        )
            .map(getItem)
            .filter(Boolean);


    const containers =
        $all(
            "[data-fashion-selected-list], " +
            "#fashionSelectedItems"
        );


    containers.forEach(
        container => {

            container.innerHTML =
                "";


            selected.forEach(
                item => {

                    const row =
                        document.createElement(
                            "div"
                        );

                    row.className =
                        "fashion-selected-item";


                    row.innerHTML = `

                        <div
                            class="fashion-selected-thumb"
                            style="
                                background:
                                ${escapeHTML(
                                    item.colors?.[0] ||
                                    "#aaa"
                                )};
                            "
                        ></div>

                        <div
                            class="fashion-selected-info"
                        >

                            <strong>
                                ${escapeHTML(
                                    item.name
                                )}
                            </strong>

                            <small>
                                ${escapeHTML(
                                    item.category
                                )}
                            </small>

                        </div>

                        <button
                            type="button"
                            data-fashion-remove="
                                ${escapeHTML(
                                    item.category
                                )}
                            "
                            aria-label="
                                Remove ${escapeHTML(
                                    item.name
                                )}
                            "
                        >
                            ×
                        </button>
                    `;


                    const removeButton =
                        row.querySelector(
                            "[data-fashion-remove]"
                        );


                    removeButton?.addEventListener(
                        "click",
                        () =>
                            removeCategory(
                                item.category
                            )
                    );


                    container.appendChild(
                        row
                    );
                }
            );
        }
    );


    /*
     * Count.
     */

    $all(
        "#fashionSelectedCount, " +
        "[data-fashion-selected-count]"
    ).forEach(
        element => {

            element.textContent =
                selected.length;
        }
    );
}


/* ============================================================
   44. EQUIPMENT UI
   ============================================================ */

/* ============================================================
   44. EQUIPMENT UI
   ------------------------------------------------------------
   FIX (semua kolom Equipment tampil "—" padahal item sudah
   dipakai): sebelumnya fungsi ini HANYA mencari elemen lewat
   3 selector spesifik (data-fashion-equipment, data-equipment,
   #equipment-<key>). Kalau HTML panel "My Design" ternyata
   memakai struktur/atribut yang berbeda (misalnya label teks
   "HAIR" di satu elemen dan nilai "—" di elemen lain tanpa
   data attribute apapun), fungsi ini gagal total dan semua
   kolom tetap kosong meski state.selected sudah terisi.

   Sekarang ditambahkan FALLBACK bertingkat:
   1) Selector data-attribute seperti sebelumnya (paling akurat
      jika HTML sudah punya attribute yang benar).
   2) Selector tambahan yang lebih umum (class, data-slot, dsb)
      untuk berjaga-jaga jika penamaan attribute sedikit beda.
   3) Fallback teks: cari elemen yang isinya persis nama
      kategori ("HAIR", "TOP", dst — case-insensitive), lalu
      cari elemen nilai di dekatnya (saudara langsung, atau
      elemen dengan class mengandung "value") yang isinya "—"
      atau kosong, dan isi itu.

   Jika masih tidak ketemu sama sekali, fungsi akan mencetak
   peringatan ke console (sekali per kategori) supaya mudah
   didiagnosis lewat DevTools, alih-alih diam-diam gagal.
   ============================================================ */

function updateEquipment() {

    const mapping = {

        hair: "hair",

        top: "top",

        dress: "dress",

        jacket: "jacket",

        bottom: "bottom",

        shoes: "shoes",

        hat: "hat",

        glasses: "glasses",

        bag: "bag",

        accessory: "accessory"
    };


    /*
     * Label teks yang mungkin dipakai di UI untuk tiap
     * kategori, dipakai HANYA untuk fallback pencarian
     * berbasis teks (langkah 3).
     */

    const labelText = {

        hair: "hair",

        top: "top",

        dress: "dress",

        jacket: "jacket",

        bottom: "bottom",

        shoes: "shoes",

        hat: "hat",

        glasses: "glasses",

        bag: "bag",

        accessory: "accessory"
    };


    Object.entries(
        mapping
    ).forEach(
        ([category, key]) => {

            const item =
                getSelected(
                    category
                );

            const displayValue =
                item
                    ? item.name
                    : "—";


            /* =================================================
               LANGKAH 1 & 2: selector attribute
               ================================================= */

            let element =
                firstExisting([

                    `[data-fashion-equipment="${key}"]`,

                    `[data-equipment="${key}"]`,

                    `#equipment-${key}`,

                    `[data-fashion-slot="${key}"]`,

                    `[data-slot="${key}"]`,

                    `[data-equip="${key}"]`,

                    `.equipment-${key}`,

                    `.equipment-value-${key}`,

                    `#fashion-equipment-${key}`
                ]);


            /* =================================================
               LANGKAH 3: fallback berbasis teks label
               ------------------------------------------------
               Cari elemen kecil (label) yang isi teksnya PERSIS
               sama dengan nama kategori (mis. "HAIR"), lalu
               cari elemen nilai di dekatnya:
               - saudara (sibling) berikutnya di DOM, ATAU
               - elemen dengan class mengandung "value" di
                 dalam parent yang sama.
               ================================================= */

            if (!element) {

                const wantedLabel =
                    (labelText[category] || category)
                        .trim()
                        .toLowerCase();

                const candidates =
                    ROOT.querySelectorAll(
                        "span, div, p, label, small, strong"
                    );

                for (const candidate of candidates) {

                    const text =
                        (candidate.textContent || "")
                            .trim()
                            .toLowerCase();

                    if (text !== wantedLabel) {
                        continue;
                    }

                    /*
                     * Kandidat label ditemukan.
                     * Cari elemen nilai di dekatnya.
                     */

                    let valueElement =
                        candidate.nextElementSibling;


                    if (
                        !valueElement &&
                        candidate.parentElement
                    ) {

                        valueElement =
                            candidate.parentElement
                                .querySelector(
                                    '[class*="value"]'
                                );
                    }


                    if (valueElement) {

                        element =
                            valueElement;

                        break;
                    }
                }
            }


            /* =================================================
               HASIL
               ================================================= */

            if (!element) {

                console.warn(
                    `[Fashion Designer] Elemen equipment untuk kategori "${category}" tidak ditemukan. ` +
                    `Tambahkan attribute data-fashion-equipment="${key}" ` +
                    `pada elemen yang menampilkan nilai kategori ini di panel "My Design".`
                );

                return;
            }


            element.textContent =
                displayValue;
        }
    );
}

/* ============================================================
   NEW — STAGE AVATAR TITLE
   ------------------------------------------------------------
   Update teks judul "3D FEMALE FASHION AVATAR" / "3D MALE
   FASHION AVATAR" di atas panel Design Studio, mengikuti
   state.gender yang sedang aktif.

   Karena teks ini kemungkinan hardcoded di HTML, function ini
   mencari elemennya lewat beberapa cara:
   1) Selector data-attribute / id spesifik (paling akurat kalau
      HTML sudah dikasih attribute yang sesuai).
   2) Fallback: cari elemen mana pun yang teksnya mengandung
      "FASHION AVATAR" (case-insensitive) — supaya tetap jalan
      walau HTML memakai teks statis tanpa attribute apapun.
   ============================================================ */

function updateStageAvatarTitle() {

    const label =
        state.gender === "male"
            ? "3D MALE FASHION AVATAR"
            : "3D FEMALE FASHION AVATAR";


    /* =====================================================
       LANGKAH 1: selector attribute
       ===================================================== */

    let element =
        firstExisting([

            "[data-fashion-avatar-title]",

            "#fashionAvatarTitle",

            "#fashionStageAvatarTitle",

            ".fashion-avatar-title"
        ]);


    /* =====================================================
       LANGKAH 2: fallback berbasis teks
       ------------------------------------------------------
       Cari elemen kecil (h1-h6/span/div/p/strong) yang teksnya
       mengandung "FASHION AVATAR", lalu pakai elemen itu.
       ===================================================== */

    if (!element) {

        const candidates =
            ROOT.querySelectorAll(
                "h1, h2, h3, h4, h5, h6, span, div, p, strong"
            );

        for (const candidate of candidates) {

            const text =
                (candidate.textContent || "")
                    .trim()
                    .toUpperCase();

            if (
                text.includes("FASHION AVATAR") &&
                candidate.children.length === 0
            ) {

                element =
                    candidate;

                break;
            }
        }
    }


    /* =====================================================
       HASIL
       ===================================================== */

    if (!element) {

        console.warn(
            "[Fashion Designer] Elemen judul avatar (\"3D FEMALE/MALE FASHION AVATAR\") tidak ditemukan. " +
            "Tambahkan attribute data-fashion-avatar-title pada elemen judulnya di HTML."
        );

        return;
    }

    element.textContent =
        label;
}

/* ============================================================
   45. GENDER UI
   ============================================================ */

function updateGenderUI() {

    $all("[data-fashion-gender], [data-gender]").forEach(button => {

        const gender = button.dataset.fashionGender || button.dataset.gender;

        button.classList.toggle("active", gender === state.gender);

        button.disabled = !!state.challengeActive;

        button.style.opacity = state.challengeActive ? ".4" : "";
        button.style.cursor = state.challengeActive ? "not-allowed" : "pointer";
        button.title = state.challengeActive
            ? "Gender terkunci selama challenge berlangsung"
            : "";
    });
}


/* ============================================================
   46. STATS
   ============================================================ */

function updateStats() {

    const score =
        state.score;


    $all(
        "#fashionPoints, " +
        "[data-fashion-points]"
    ).forEach(
        element => {

            element.textContent =
                formatNumber(
                    state.points
                );
        }
    );


    $all(
        "#fashionMoney, " +
        "[data-fashion-money]"
    ).forEach(
        element => {

            element.textContent =
                "Rp " +
                formatNumber(
                    state.money
                );
        }
    );


    $all(
        "#fashionLevel, " +
        "[data-fashion-level]"
    ).forEach(
        element => {

            element.textContent =
                state.level;
        }
    );


    $all(
        "#fashionCombo, " +
        "[data-fashion-combo]"
    ).forEach(
        element => {

            element.textContent =
                state.combo;
        }
    );


    $all(
        "#fashionScore, " +
        "#fashionStyleScore, " +
        "[data-fashion-score]"
    ).forEach(
        element => {

            element.textContent =
                score;
        }
    );
}


/* ============================================================
   SUBMIT DESIGN
   ------------------------------------------------------------
   - Submit normal  → gunakan calculateScore()
   - Challenge aktif → gunakan Challenge Score
   - Perfect Match  → otomatis mendapat bonus
   - Reward diberikan setelah submit
   ============================================================ */

/* ============================================================
   SUBMIT DESIGN
   ------------------------------------------------------------
   Normal Mode:
   - Calculate normal fashion score
   - Give points + money
   - Show result popup

   Challenge Mode:
   - Calculate Challenge Score /1000
   - Include Perfect Match Bonus
   - Give challenge reward
   - Finish challenge
   - Show challenge result popup
============================================================ */

function submitDesign() {

    const selectedCategories =
        Object.keys(state.selected || {})
            .filter(category =>
                state.selected[category]
            );


    if (selectedCategories.length === 0) {

        showToast(
            "⚠️",
            "Please select at least one item."
        );

        return;
    }


    /* ========================================================
       CHALLENGE MODE
    ======================================================== */

if (
    state.challengeActive &&
    state.challenge
) {

    const challengeResult =
        calculateChallengeScore();


    state.challengeActive = false;


    if (state.challengeTimer) {

        clearInterval(
            state.challengeTimer
        );

        state.challengeTimer = null;

    }


    finishChallenge(
        challengeResult,
        false
    );


    return;
}


    /* ========================================================
       NORMAL MODE
    ======================================================== */

    const score =
        calculateScore();


    const baseMoneyReward =
        Math.round(
            score * 0.5
        );


    state.score = score;


    /*
     * FIX: level & combo sekarang dihitung lewat
     * applyProgressReward() — level naik sesuai total poin
     * (tidak lagi mentok di 2), dan combo jadi streak
     * sungguhan (naik kalau skor bagus, reset kalau jelek),
     * dengan bonus uang kecil mengikuti besar combo.
     */

    const reward =
        applyProgressReward(
            score,
            baseMoneyReward
        );


    updateAllUI();

    /*
     * FIX: sebelumnya progres (outfit terpilih, warna, dsb)
     * tidak disimpan ke localStorage setelah submit normal,
     * beda dengan jalur challenge yang selalu memanggil ini.
     */

    saveTemporaryState();


    showDesignResultPopup(
        score,
        score,
        reward.moneyReward,
        false
    );
}


/* ============================================================
   48. SAVE
   ============================================================ */

/* ============================================================
   OUTFIT SNAPSHOT HELPERS
   ------------------------------------------------------------
   Dipakai bersama oleh saveOutfit() (tombol Save manual) dan
   resetDesignAfterSubmit() (auto-save saat Submit), supaya
   logikanya konsisten dan tidak duplikat.

   FIX (NEW): sebelumnya data outfit tersimpan di localStorage
   ("naylaFashionSaved"), tapi TIDAK ADA kode sama sekali yang
   membaca ulang dan menampilkannya ke panel HTML
   #fashionSavedOutfits / #fashionSavedCount ("COLLECTION —
   Saved Outfits — 0 / 6") — jadi panel itu selalu kosong
   walaupun outfit sudah tersimpan. Sekarang ditambahkan:
   - SAVED_OUTFITS_MAX = 6, disamakan dengan label "/ 6" di HTML
     (sebelumnya cap-nya 12, tidak nyambung dengan UI).
   - getSavedOutfits() — baca + backfill id untuk data lama.
   - renderSavedOutfits() — render grid + hitungan "x / 6".
   - loadSavedOutfit()/deleteSavedOutfit() — supaya user bisa
     memakai ulang atau menghapus outfit tersimpan.
   ============================================================ */

const SAVED_OUTFITS_KEY =
    "naylaFashionSaved";

const SAVED_OUTFITS_MAX =
    6;


function buildOutfitSnapshot(
    nameOverride,
    scoreOverride
) {

    return {

        /*
         * NEW: id unik per outfit, dipakai tombol
         * Pakai/Hapus di panel Saved Outfits.
         */

        id:
            (
                typeof crypto !== "undefined" &&
                typeof crypto.randomUUID === "function"
            )
                ? crypto.randomUUID()
                : `${Date.now()}-${Math.random()
                    .toString(36)
                    .slice(2, 8)}`,

        name:
            nameOverride ||
            `Outfit ${new Date()
                .toLocaleDateString(
                    "id-ID"
                )}`,

        gender:
            state.gender,

        selected:
            {
                ...state.selected
            },

        colors:
            {
                ...state.colors
            },

        score:
            typeof scoreOverride === "number"
                ? scoreOverride
                : calculateScore(),

        createdAt:
            Date.now()
    };
}


function getSavedOutfits() {

    let parsed;

    try {

        const raw =
            localStorage.getItem(
                SAVED_OUTFITS_KEY
            );

        parsed =
            raw
                ? JSON.parse(raw)
                : [];

    } catch (error) {

        console.warn(
            "[Fashion Designer] Gagal membaca Saved Outfits.",
            error
        );

        return [];
    }

    if (!Array.isArray(parsed)) {
        return [];
    }


    /*
     * Backfill id untuk outfit lama yang tersimpan
     * sebelum field "id" ditambahkan.
     */

    let mutated =
        false;

    parsed.forEach(
        outfit => {

            if (
                outfit &&
                !outfit.id
            ) {

                outfit.id =
                    `${outfit.createdAt || Date.now()}-${Math.random()
                        .toString(36)
                        .slice(2, 8)}`;

                mutated = true;
            }
        }
    );

    if (mutated) {

        try {

            localStorage.setItem(
                SAVED_OUTFITS_KEY,
                JSON.stringify(parsed)
            );

        } catch (_) {}
    }

    return parsed;
}


function persistOutfitSnapshot(outfit) {

    const saved =
        getSavedOutfits();


    saved.push(
        outfit
    );


    while (
        saved.length > SAVED_OUTFITS_MAX
    ) {

        saved.shift();
    }


    localStorage.setItem(
        SAVED_OUTFITS_KEY,
        JSON.stringify(
            saved
        )
    );


    renderSavedOutfits();
}


function saveOutfit() {

    const outfit =
        buildOutfitSnapshot();


    persistOutfitSnapshot(
        outfit
    );


    showToast(
        "💾",
        "Outfit berhasil disimpan"
    );
}


/* ============================================================
   RENDER SAVED OUTFITS PANEL
   ============================================================ */

function renderSavedOutfits() {

    const countElement =
        document.getElementById(
            "fashionSavedCount"
        );

    const grid =
        document.getElementById(
            "fashionSavedOutfits"
        );

    const saved =
        getSavedOutfits();


    if (countElement) {

        countElement.textContent =
            `${saved.length} / ${SAVED_OUTFITS_MAX}`;
    }


    if (!grid) {
        return;
    }


    grid.innerHTML =
        "";


    if (!saved.length) {

        const empty =
            document.createElement(
                "div"
            );

        empty.className =
            "fashion-saved-empty";

        Object.assign(
            empty.style,
            {

                gridColumn:
                    "1 / -1",

                padding:
                    "18px 8px",

                textAlign:
                    "center",

                color:
                    "rgba(180,205,235,.55)",

                fontSize:
                    "13px"
            }
        );

        empty.textContent =
            "Belum ada outfit tersimpan. Submit atau Save outfit untuk mulai koleksi.";

        grid.appendChild(
            empty
        );

        return;
    }


    /*
     * Tampilkan yang terbaru dulu.
     */

    [...saved]
        .reverse()
        .forEach(
            outfit => {

                grid.appendChild(
                    createSavedOutfitCard(
                        outfit
                    )
                );
            }
        );
}


function createSavedOutfitCard(outfit) {

    const items =
        Object.values(
            outfit.selected || {}
        )
            .map(getItem)
            .filter(Boolean);


    const previewColors =
        items
            .slice(0, 5)
            .map(
                item =>
                    (
                        outfit.colors &&
                        outfit.colors[item.id]
                    ) ||
                    item.colors?.[0] ||
                    "#888"
            );


    const card =
        document.createElement(
            "div"
        );

    card.className =
        "fashion-saved-card";

    card.dataset.savedId =
        outfit.id;

    Object.assign(
        card.style,
        {

            display:
                "flex",

            flexDirection:
                "column",

            gap:
                "8px",

            padding:
                "12px",

            borderRadius:
                "14px",

            border:
                "1px solid rgba(100,180,255,.16)",

            background:
                "rgba(4,17,31,.72)"
        }
    );


    const swatches =
        previewColors.length
            ? previewColors
                .map(
                    color =>
                        `<span style="` +
                        `display:inline-block;` +
                        `width:15px;height:15px;` +
                        `border-radius:50%;` +
                        `background:${escapeHTML(color)};` +
                        `border:1px solid rgba(255,255,255,.25);` +
                        `margin-right:4px;` +
                        `"></span>`
                )
                .join("")
            : `<span style="opacity:.4;font-size:12px;">Kosong</span>`;


    card.innerHTML = `

        <div>
            ${swatches}
        </div>

        <strong
            style="
                color:#eaf3ff;
                font-size:14px;
                line-height:1.25;
                word-break:break-word;
            "
        >
            ${escapeHTML(outfit.name)}
        </strong>

        <span
            style="
                color:#7fa3c9;
                font-size:12px;
            "
        >
            ${outfit.gender === "male" ? "♂" : "♀"}
            ·
            ${items.length} item
            ·
            Score ${escapeHTML(outfit.score ?? 0)}
        </span>

        <div
            style="
                display:flex;
                gap:6px;
                margin-top:2px;
            "
        >

            <button
                type="button"
                data-saved-load="${escapeHTML(outfit.id)}"
                style="
                    flex:1;
                    padding:6px 8px;
                    border-radius:8px;
                    border:1px solid rgba(100,180,255,.28);
                    background:rgba(41,147,239,.18);
                    color:#9bd0ff;
                    cursor:pointer;
                    font-size:12px;
                "
            >
                Pakai
            </button>

            <button
                type="button"
                data-saved-delete="${escapeHTML(outfit.id)}"
                style="
                    padding:6px 9px;
                    border-radius:8px;
                    border:1px solid rgba(255,120,120,.28);
                    background:rgba(60,10,10,.32);
                    color:#ff9a9a;
                    cursor:pointer;
                    font-size:12px;
                "
            >
                ×
            </button>

        </div>
    `;


    return card;
}


/* ============================================================
   SAVED OUTFITS — EVENTS (LOAD / DELETE)
   ============================================================ */

function setupSavedOutfitsEvents() {

    const grid =
        document.getElementById(
            "fashionSavedOutfits"
        );

    if (!grid) {
        return;
    }

    if (
        grid.dataset.savedEventsBound
    ) {
        return;
    }

    grid.dataset.savedEventsBound =
        "1";


    grid.addEventListener(
        "click",
        event => {

            const loadButton =
                event.target.closest(
                    "[data-saved-load]"
                );

            if (loadButton) {

                loadSavedOutfit(
                    loadButton.dataset
                        .savedLoad
                );

                return;
            }


            const deleteButton =
                event.target.closest(
                    "[data-saved-delete]"
                );

            if (deleteButton) {

                deleteSavedOutfit(
                    deleteButton.dataset
                        .savedDelete
                );
            }
        }
    );
}


function loadSavedOutfit(id) {

    const outfit =
        getSavedOutfits().find(
            item =>
                item.id === id
        );

    if (!outfit) {

        showToast(
            "⚠",
            "Outfit tidak ditemukan."
        );

        return;
    }


    if (
        outfit.gender === "male" ||
        outfit.gender === "female"
    ) {

        state.gender =
            outfit.gender;
    }


    state.selected =
        {
            ...(outfit.selected || {})
        };

    state.colors =
        {
            ...(outfit.colors || {})
        };


    createBaseBody();

    updateAvatar();

    updateAllUI();

    saveTemporaryState();


    showToast(
        "✦",
        `${outfit.name} dipakai`
    );
}


function deleteSavedOutfit(id) {

    const remaining =
        getSavedOutfits().filter(
            outfit =>
                outfit.id !== id
        );

    localStorage.setItem(
        SAVED_OUTFITS_KEY,
        JSON.stringify(
            remaining
        )
    );

    renderSavedOutfits();

    showToast(
        "×",
        "Outfit dihapus dari koleksi"
    );
}


/* ============================================================
   49. CHALLENGE
   ============================================================ */

function startChallenge() {

    const challenges = [

    {
        name: "Elegant Evening",

        description:
            "Create a luxury evening outfit.",

        difficulty: "Easy",

        required: [
            "dress",
            "shoes",
            "accessory"
        ],

        themeTags: [
            "elegant",
            "formal",
            "luxury",
            "evening"
        ],

        reward: {
            points: 150,
            money: 75
        }
    },

    {
        name: "Atelier Street",

        description:
            "Modern street fashion with layered styling.",

        difficulty: "Easy",

        required: [
            "top",
            "bottom",
            "jacket",
            "shoes"
        ],

        themeTags: [
            "streetwear",
            "urban",
            "casual",
            "layered"
        ],

        reward: {
            points: 180,
            money: 90
        }
    },

    {
        name: "Runway Muse",

        description:
            "High-fashion runway inspired look.",

        difficulty: "Medium",

        required: [
            "dress",
            "hat",
            "bag",
            "shoes"
        ],

        themeTags: [
            "runway",
            "fashion",
            "luxury",
            "designer"
        ],

        reward: {
            points: 250,
            money: 120
        }
    },

    {
        name: "Classic Designer",

        description:
            "Classic designer outfit with balanced styling.",

        difficulty: "Medium",

        required: [
            "top",
            "bottom",
            "jacket",
            "accessory"
        ],

        themeTags: [
            "classic",
            "designer",
            "elegant",
            "formal"
        ],

        reward: {
            points: 220,
            money: 110
        }
    },

    {
        name: "Business Power",

        description:
            "Confident, office-ready executive look.",

        difficulty: "Medium",

        required: [
            "top",
            "jacket",
            "bottom",
            "shoes"
        ],

        themeTags: [
            "business",
            "formal",
            "executive",
            "professional"
        ],

        reward: {
            points: 300,
            money: 150
        }
    },

    {
        name: "Boho Weekend",

        description:
            "Relaxed, breezy outfit for a weekend out.",

        difficulty: "Easy",

        required: [
            "dress",
            "bag",
            "glasses"
        ],

        themeTags: [
            "boho",
            "casual",
            "weekend",
            "relaxed"
        ],

        reward: {
            points: 170,
            money: 85
        }
    },

    {
        name: "Winter Luxe",

        description:
            "Cozy, layered high-fashion winter styling.",

        difficulty: "Hard",

        required: [
            "dress",
            "jacket",
            "hat",
            "bag"
        ],

        themeTags: [
            "winter",
            "luxury",
            "layered",
            "elegant"
        ],

        reward: {
            points: 350,
            money: 180
        }
    },

    {
        name: "Seijin Ceremony",

        description:
            "Traditional formal ceremony-inspired look.",

        difficulty: "Hard",

        required: [
            "dress",
            "hat",
            "accessory"
        ],

        themeTags: [
            "seijin",
            "traditional",
            "ceremony",
            "formal"
        ],

        reward: {
            points: 400,
            money: 220
        }
    },

    {
        name: "Streetwear Icon",

        description:
            "Bold, layered street style with statement accessories.",

        difficulty: "Hard",

        required: [
            "top",
            "bottom",
            "jacket",
            "hat",
            "accessory"
        ],

        themeTags: [
            "streetwear",
            "urban",
            "bold",
            "modern"
        ],

        reward: {
            points: 320,
            money: 170
        }
    },

    {
        name: "Minimalist Muse",

        description:
            "Clean, refined outfit with minimal styling.",

        difficulty: "Easy",

        required: [
            "top",
            "bottom",
            "shoes"
        ],

        themeTags: [
            "minimalist",
            "clean",
            "simple",
            "elegant"
        ],

        reward: {
            points: 160,
            money: 80
        }
    },

    {
        name: "Royal Seijin",

        description:
            "The ultimate Seijin Shiki ceremonial outfit.",

        difficulty: "Legendary",

        required: [
            "dress",
            "hat",
            "bag",
            "accessory",
            "shoes"
        ],

        themeTags: [
            "seijin",
            "traditional",
            "luxury",
            "ceremony"
        ],

        reward: {
            points: 600,
            money: 350
        }
    },

    {
        name: "Global Fashion Week",

        description:
            "Create a world-class fashion week runway look.",

        difficulty: "Legendary",

        required: [
            "dress",
            "hat",
            "bag",
            "shoes"
        ],

        themeTags: [
            "runway",
            "designer",
            "fashion",
            "luxury"
        ],

        reward: {
            points: 700,
            money: 400
        }
    }

];

    state.pendingChallenge =
        challenges[
            Math.floor(
                Math.random() *
                challenges.length
            )
        ];

    openChallengeModal(
        state.pendingChallenge
    );
}

function getItemTags(item) {

    const tags = [];

    if (!item) {
        return tags;
    }

    /* ==========================
       CATEGORY TAGS
    ========================== */

    switch (item.category) {

        case "dress":
            tags.push(
                "fashion",
                "elegant"
            );
            break;

        case "top":
            tags.push(
                "fashion"
            );
            break;

        case "bottom":
            tags.push(
                "fashion"
            );
            break;

        case "jacket":
            tags.push(
                "layered",
                "designer"
            );
            break;

        case "shoes":
            tags.push(
                "style"
            );
            break;

        case "bag":
            tags.push(
                "luxury"
            );
            break;

        case "hat":
            tags.push(
                "fashion"
            );
            break;

        case "accessory":
            tags.push(
                "detail"
            );
            break;
    }

    /* ==========================
       TYPE TAGS
    ========================== */

    const type =
        (item.type || "")
            .toLowerCase();

    const name =
        (item.name || "")
            .toLowerCase();

    /* Business */

    if (
        type.includes("blazer") ||
        type.includes("tailored") ||
        type.includes("executive") ||
        type.includes("oxford") ||
        name.includes("business")
    ) {

        tags.push(
            "business",
            "professional",
            "executive",
            "formal"
        );

    }

    /* Streetwear */

    if (
        type.includes("hoodie") ||
        type.includes("cargo") ||
        type.includes("street") ||
        type.includes("cap") ||
        type.includes("techwear") ||
        type.includes("sneaker") ||
        type.includes("jogger")
    ) {

        tags.push(
            "streetwear",
            "urban",
            "modern",
            "casual"
        );

    }

    /* Luxury */

    if (
        name.includes("luxe") ||
        name.includes("luxury") ||
        name.includes("atelier") ||
        name.includes("couture") ||
        name.includes("princess") ||
        name.includes("runway")
    ) {

        tags.push(
            "luxury",
            "designer",
            "fashion"
        );

    }

    /* Evening */

    if (
        type.includes("gown") ||
        type.includes("satin") ||
        name.includes("evening") ||
        name.includes("midnight")
    ) {

        tags.push(
            "evening",
            "formal",
            "elegant"
        );

    }

    /* Winter */

    if (
        type.includes("trench") ||
        type.includes("turtleneck") ||
        type.includes("boots")
    ) {

        tags.push(
            "winter",
            "layered"
        );

    }

    /* Seijin */

    if (

        type.includes("kimono") ||
        type.includes("hakama") ||
        type.includes("haori") ||
        type.includes("furisode") ||
        type.includes("zori") ||
        type.includes("geta") ||
        type.includes("kanzashi") ||
        type.includes("obi") ||

        name.includes("seijin") ||
        name.includes("kimono") ||
        name.includes("hakama") ||
        name.includes("furisode") ||
        name.includes("ceremony")

    ) {

        tags.push(
            "seijin",
            "traditional",
            "ceremony",
            "formal"
        );

    }

    /* Minimalist */

    if (
        name.includes("classic") ||
        name.includes("white") ||
        name.includes("simple")
    ) {

        tags.push(
            "minimalist",
            "clean"
        );

    }

    return [...new Set(tags)];
}
function beginChallenge() {

    if (!state.pendingChallengeGender) {

        showToast("⚠", "Pilih model Female atau Male dulu.");

        return;
    }

    if (state.challengeTimer) {
        clearInterval(state.challengeTimer);
        state.challengeTimer = null;
    }

    closeChallengeModal();

    // Terapkan gender pilihan (tanpa lewat switchGender, supaya tidak kena guard baru)
    if (state.gender !== state.pendingChallengeGender) {

        state.gender = state.pendingChallengeGender;

        Object.keys(state.selected).forEach(category => {

            const item = getSelected(category);
            const restriction = getItemGenderRestriction(item);

            if (item && restriction && restriction !== state.gender) {
                delete state.selected[category];
            }
        });

        if (state.gender === "male") {

            const hair = getSelected("hair");

            if (!hair || (hair.gender && hair.gender !== "male")) {
                state.selected.hair = "hair-male-short";
            }

        } else {

            const hair = getSelected("hair");

            if (!hair || hair.gender === "male") {
                state.selected.hair = "hair-soft-bob";
            }
        }

        createBaseBody();
        updateAvatar();
    }

    state.challengeActive = true;
    state.challenge = state.pendingChallenge;
    state.challengeTime = 90;
    state.challengeFinished = false;
    state.challengeRewarded = false;
    state.challengeScore = 0;

    const panel = document.getElementById("fashionChallengePanel");

    if (panel) {
        panel.hidden = false;
        panel.classList.add("show");
    }

    updateAllUI();
    updateTimerUI();

    showToast("🎯", `${state.challenge.name} Started!`);

    state.challengeTimer = setInterval(() => {

        if (!state.challengeActive) {
            clearInterval(state.challengeTimer);
            state.challengeTimer = null;
            return;
        }

        state.challengeTime--;

        if (state.challengeTime < 0) {
            state.challengeTime = 0;
        }

        updateTimerUI();

        if (state.challengeTime <= 0) {

            clearInterval(state.challengeTimer);
            state.challengeTimer = null;
            state.challengeActive = false;

            updateTimerUI();
            updateGenderUI();

            finishChallenge(null, true);
        }

    }, 1000);
}

function updateChallengeUI() {

    if (!state.challenge) {
        return;
    }

    const title =
        document.getElementById(
            "fashionChallengeTitle"
        );

    const desc =
        document.getElementById(
            "fashionChallengeDescription"
        );

    const reqBox =
        document.getElementById(
            "fashionChallengeRequirements"
        );

    if (title) {

        title.textContent =
            state.challenge.name;
    }

    if (desc) {

        desc.textContent =
            state.challenge.description;
    }

    if (reqBox) {

        reqBox.innerHTML = "";

        state.challenge.required.forEach(
            item => {

                reqBox.innerHTML += `
                    <div class="challenge-tag">
                        ${item.toUpperCase()}
                    </div>
                `;
            }
        );
    }

    const matched =
        state.challenge.required.filter(
            category =>
                state.selected &&
                state.selected[category]
        ).length;

    const percent =
        Math.round(
            (
                matched /
                state.challenge.required.length
            ) * 100
        );

    const match =
        document.getElementById(
            "fashionChallengeMatch"
        );

    const fill =
        document.getElementById(
            "fashionChallengeFill"
        );

    /*
     * NEW: "REQUIRED ITEMS x / y" — elemen ini sudah ada di
     * HTML (#fashionChallengeRequirementCount) tapi sebelumnya
     * tidak pernah diisi sama sekali.
     */

    const requirementCount =
        document.getElementById(
            "fashionChallengeRequirementCount"
        );

    if (requirementCount) {

        requirementCount.textContent =
            `${matched} / ${state.challenge.required.length}`;
    }

    if (match) {

        match.textContent =
            percent + "%";
    }

    if (fill) {

        fill.style.width =
            percent + "%";
    }
       updateChallengeScoreUI();

       updatePerfectMatchUI();
}

function updateTimerUI() {

    const timer =
        document.getElementById(
            "fashionChallengeTimer"
        );

    if (timer) {

        timer.textContent =
            state.challengeTime;
    }

    const topTimer =
        document.getElementById(
            "fashionTimer"
        );

    if (topTimer) {

        topTimer.textContent =
            state.challengeTime;
    }
    updateChallengeScoreUI();
}

function getChallengeMatchPercent(){

    if(
        !state.challenge
    ){
        return 0;
    }

    const required =
        state.challenge.required;

    const matched =
        required.filter(
            category =>
                !!state.selected[
                    category
                ]
        ).length;

    return Math.round(
        (matched / required.length) * 100
    );
}

/* ============================================================
   CHECK PERFECT MATCH
   ============================================================ */

function isPerfectChallengeMatch() {

    const challenge = state.challenge;

    if (!challenge || !challenge.required) {
        return false;
    }

    const required = challenge.required;

    if (required.length === 0) {
        return false;
    }

    return required.every(category => {
        return !!state.selected[category];
    });
}

/* ============================================================
   PERFECT MATCH BONUS
   ============================================================ */

function getPerfectMatchBonus() {

    if (!isPerfectChallengeMatch()) {
        return 0;
    }

    return 100;
}

/* ============================================================
   UPDATE PERFECT MATCH UI
   ============================================================ */

function updatePerfectMatchUI() {

    const perfectMatch =
        isPerfectChallengeMatch();

    const bonus =
        getPerfectMatchBonus();

    const box =
        document.getElementById(
            "fashionPerfectMatchBox"
        );

    const title =
        document.getElementById(
            "fashionPerfectMatch"
        );

    const description =
        document.getElementById(
            "fashionPerfectMatchDescription"
        );

    const bonusElement =
        document.getElementById(
            "fashionPerfectBonus"
        );


    /* ========================================================
       BONUS
       ======================================================== */

    if (bonusElement) {

        bonusElement.textContent =
            `+${bonus}`;

    }


    /* ========================================================
       PERFECT MATCH STATE
       ======================================================== */

    if (!box) {
        return;
    }


    if (perfectMatch) {

        box.classList.add("active");

        if (title) {

            title.textContent =
                "PERFECT MATCH";

        }

        if (description) {

            description.textContent =
                "All required items completed!";

        }

    } else {

        box.classList.remove("active");

        if (title) {

            title.textContent =
                "PERFECT MATCH";

        }

        if (description) {

            description.textContent =
                "Complete all required items";

        }

    }

}

/* ============================================================
   CHALLENGE SCORE
   ============================================================ */

function calculateChallengeScore() {

    /* ========================================================
       BASE STYLE SCORE
    ======================================================== */

    const styleScore =
        calculateScore();


    /* ========================================================
       NO CHALLENGE
    ======================================================== */

    if (!state.challenge) {

        return {
            styleScore: styleScore,
            matchPercent: 0,
            finalScore: styleScore,

            // Format yang dibutuhkan finishChallenge
            total: styleScore,
            perfect: 0,
            requirement: 0,
            fashion: styleScore,
            rarity: 0,
            time: 0,
            theme: 0
        };

    }


    /* ========================================================
       REQUIREMENTS
    ======================================================== */

    let matchedRequirements = 0;


    /*
     * FIX: data challenge (lihat startChallenge()) memakai
     * field "required" — array nama kategori seperti
     * ["dress","shoes","accessory"] — bukan "requirements"
     * (array object {category, items}) yang dulu dibaca di
     * sini. Karena "state.challenge.requirements" tidak
     * pernah ada, requirements selalu kosong, sehingga
     * matchPercent selalu 0% walaupun user sudah memakai
     * semua item yang diminta. Sekarang dibaca dari field
     * yang benar-benar dipakai: "required".
     */

    const requirements =
        Array.isArray(
            state.challenge.required
        )
            ? state.challenge.required
            : [];


    requirements.forEach(
        category => {

            if (
                state.selected &&
                state.selected[category]
            ) {

                matchedRequirements++;

            }

        }
    );


    /* ========================================================
       MATCH PERCENTAGE
    ======================================================== */

    const totalRequirements =
        requirements.length;


    const matchPercent =
        totalRequirements > 0
            ? Math.round(
                (
                    matchedRequirements /
                    totalRequirements
                ) * 100
            )
            : 0;


    /* ========================================================
       CHALLENGE BONUS

       Bonus maksimal = Style Score.

       Contoh:

       Style Score 15
       Match 0%
       Bonus 0
       Total 15

       Style Score 15
       Match 100%
       Bonus 15
       Total 30
    ======================================================== */

    const challengeBonus =
        Math.round(
            styleScore *
            (matchPercent / 100)
        );


    /*
     * FIX: bonus perfect-match (dari getPerfectMatchBonus())
     * dulu tidak pernah ditambahkan ke total/finalScore sama
     * sekali, walaupun UI "PERFECT MATCH" (updatePerfectMatchUI)
     * sudah menjanjikan bonus +100. Sekarang dihitung di sini
     * dan langsung dimasukkan ke total.
     */

    const perfectBonus =
        matchPercent === 100
            ? getPerfectMatchBonus()
            : 0;


    /*
     * NEW: rarity bonus, dari item yang sedang dipakai
     * (lihat calculateRarityScore()). Dulu selalu 0.
     */

    const rarityScore =
        calculateRarityScore();


    const finalScore =
        styleScore +
        challengeBonus +
        perfectBonus +
        rarityScore;


    return {

        styleScore:
            styleScore,

        matchPercent:
            matchPercent,

        finalScore:
            finalScore,


        /* ====================================================
           FORMAT UNTUK finishChallenge()
        ==================================================== */

        total:
            finalScore,

        /*
         * FIX: dulu bernilai boolean (matchPercent === 100),
         * padahal tempat pemakaiannya (updateChallengeScoreUI
         * -> "+${score.perfect}", showDesignResultPopup ->
         * "+${challengeData.perfect} bonus") mengharapkan
         * ANGKA bonus, bukan true/false. Sekarang berupa
         * angka bonus aktual (0 atau 100).
         */

        perfect:
            perfectBonus,

        requirement:
            matchPercent,

        fashion:
            styleScore,

        /*
         * FIX: dulu hardcode 0 walaupun UI-nya punya kotak
         * "rarity / 100". Sekarang dihitung dari rarity item
         * yang sedang dipakai (lihat calculateRarityScore()).
         */

        rarity:
            rarityScore,

        time:
            state.challengeTime || 0,

        /*
         * FIX: updateChallengeScoreUI() menampilkan
         * "${score.theme} / 200" tapi field ini tidak pernah
         * dikirim sebelumnya, sehingga selalu tampil sebagai
         * teks "undefined / 200".
         */

        theme:
            calculateThemeScore()

    };

}
/* ============================================================
   RARITY SCORE (NEW)
   ------------------------------------------------------------
   Sebelumnya field "rarity" di skor challenge selalu di-hardcode
   ke 0, walaupun UI-nya ("fashionChallengeScore" panel) sudah
   punya kotak "rarity / 100" — jadi rarity item yang dipakai
   user sama sekali tidak berpengaruh ke skor. Sekarang dihitung
   dari rarity setiap item yang sedang dipakai (common/rare/
   epic/legendary/mythic), dijumlah, lalu dibatasi maksimal 100
   supaya sesuai dengan label "/ 100" di UI.
   ============================================================ */

const RARITY_WEIGHTS = {

    common: 6,

    rare: 10,

    epic: 15,

    legendary: 20,

    mythic: 26
};


function calculateRarityScore() {

    let total = 0;


    Object.values(
        state.selected || {}
    ).forEach(
        itemId => {

            if (!itemId) {
                return;
            }

            const item =
                getItem(itemId);

            if (!item) {
                return;
            }

            total +=
                RARITY_WEIGHTS[item.rarity] || 0;

        }
    );


    return Math.min(
        100,
        total
    );
}


/* ============================================================
   OUTFIT RARITY BADGE (NEW)
   ------------------------------------------------------------
   HTML sudah punya badge "#fashionRarity" (contoh: "COMMON",
   class "rarity-common") di panel "My Design", tapi tidak ada
   kode JS sama sekali yang mengisinya — jadi selalu tampil
   hardcode "COMMON" walau outfit-nya sudah dipenuhi item
   legendary/mythic. Sekarang dihitung dari rarity TERTINGGI
   di antara semua item yang sedang dipakai.
   ============================================================ */

const RARITY_TIER_ORDER = [
    "common",
    "rare",
    "epic",
    "legendary",
    "mythic"
];


function computeOutfitRarityTier() {

    let highestIndex = 0;


    Object.values(
        state.selected || {}
    ).forEach(
        itemId => {

            const item =
                getItem(itemId);

            if (!item) {
                return;
            }

            const index =
                RARITY_TIER_ORDER.indexOf(
                    item.rarity
                );

            if (index > highestIndex) {

                highestIndex = index;
            }
        }
    );


    return RARITY_TIER_ORDER[highestIndex];
}


function updateRarityBadge() {

    const badge =
        document.getElementById(
            "fashionRarity"
        );

    if (!badge) {
        return;
    }

    const tier =
        computeOutfitRarityTier();

    badge.textContent =
        tier.toUpperCase();

    RARITY_TIER_ORDER.forEach(
        rarity => {

            badge.classList.remove(
                `rarity-${rarity}`
            );
        }
    );

    badge.classList.add(
        `rarity-${tier}`
    );
}


function calculateThemeScore() {

    const challenge =
        state.challenge;

    if (
        !challenge ||
        !challenge.themeTags
    ) {
        return 0;
    }

    let matches = 0;
    let possible = 0;

    Object.values(
        state.selected
    ).forEach(itemId => {

        if (!itemId) {
            return;
        }

        const item =
            getItem(itemId);

        if (!item) {
            return;
        }

        const itemTags =
            getItemTags(item);

        challenge.themeTags.forEach(tag => {

            possible++;

            if (
                itemTags.includes(tag)
            ) {

                matches++;

            }

        });

    });

    if (possible <= 0) {
        return 0;
    }

    return Math.round(
        (matches / possible) * 200
    );
}

/* ============================================================
   UPDATE CHALLENGE SCORE UI
   ============================================================ */

function updateChallengeScoreUI() {

    const score = calculateChallengeScore();

    const totalEl =
        document.getElementById(
            "fashionChallengeScore"
        );

    const requirementEl =
        document.getElementById(
            "challengeRequirementScore"
        );

    const fashionEl =
        document.getElementById(
            "challengeFashionScore"
        );

    const rarityEl =
        document.getElementById(
            "challengeRarityScore"
        );

    const timeEl =
        document.getElementById(
            "challengeTimeScore"
        );

    const themeEl =
    document.getElementById(
        "challengeThemeScore"
    );

    const fillEl =
        document.getElementById(
            "fashionChallengeScoreFill"
        );

    const perfectEl =
    document.getElementById(
        "challengePerfectScore"
    );

if (perfectEl) {

    perfectEl.textContent =
        `+${score.perfect}`;

}
    if (totalEl) {
        totalEl.textContent = score.total;
    }

    if (requirementEl) {
        requirementEl.textContent =
            `${score.requirement} / 500`;
    }

    if (fashionEl) {
        fashionEl.textContent =
            `${score.fashion} / 300`;
    }

    if (rarityEl) {
        rarityEl.textContent =
            `${score.rarity} / 100`;
    }

    if (timeEl) {
        timeEl.textContent =
            `${score.time} / 100`;
    }

    if (themeEl) {

    themeEl.textContent =
        `${score.theme} / 200`;

}

    if (fillEl) {
        fillEl.style.width =
            `${(score.total / 1000) * 100}%`;
    }
}

function finishChallenge(
    finalScore = null,
    fromTimeout = false
) {

    /* ========================================================
       VALIDATION
    ======================================================== */

    if (!state.challenge) {
        return;
    }


    /*
     * Jangan proses dua kali.
     */

    if (
        state.challengeFinished
    ) {
        return;
    }


    state.challengeFinished = true;


    /*
     * Challenge selesai.
     */

    state.challengeActive = false;


    /* ========================================================
       STOP TIMER
    ======================================================== */

    if (state.challengeTimer) {

        clearInterval(
            state.challengeTimer
        );

        state.challengeTimer = null;

    }


    /* ========================================================
       CALCULATE SCORE
    ======================================================== */

    let score;


    /*
     * Kalau submitDesign mengirim hasil object
     */

    if (
        finalScore &&
        typeof finalScore === "object"
    ) {

        score = finalScore;

    }

    /*
     * Kalau belum ada hasil, hitung sekarang
     */

    else {

        score =
            calculateChallengeScore();

    }


    /*
     * Pengaman.
     */

    if (
        typeof score.total !== "number"
    ) {

        score.total =
            Number(score.finalScore) || 0;

    }


    /* ========================================================
       MATCH
    ======================================================== */

    const percent =
        typeof score.matchPercent === "number"
            ? score.matchPercent
            : getChallengeMatchPercent();


    /* ========================================================
       MEDAL
    ======================================================== */

    let medal = "Bronze";


    if (percent >= 100) {

        medal = "Diamond";

    }

    else if (percent >= 75) {

        medal = "Gold";

    }

    else if (percent >= 50) {

        medal = "Silver";

    }


    /* ========================================================
       REWARD
    ======================================================== */

    const pointsReward =
        score.total;


    const baseMoneyReward =
        Math.round(
            score.total * 0.5
        );

    /*
     * Nilai ini dipakai untuk ditampilkan di popup hasil;
     * kalau reward memang diberikan (belum pernah di-reward
     * sebelumnya), akan diganti dengan hasil final dari
     * applyProgressReward() (termasuk bonus combo).
     */

    let moneyReward =
        baseMoneyReward;


    /* ========================================================
       GIVE REWARD ONCE
    ======================================================== */

    if (!state.challengeRewarded) {

        /*
         * FIX: level & combo sekarang lewat
         * applyProgressReward() yang sama dipakai submit
         * normal — level naik sesuai total poin (tidak lagi
         * mentok di 2), combo jadi streak sungguhan.
         */

        const reward =
            applyProgressReward(
                pointsReward,
                baseMoneyReward
            );

        moneyReward =
            reward.moneyReward;


        state.challengeRewarded =
            true;

    }


    /* ========================================================
       SAVE SCORE
    ======================================================== */

    state.challengeScore =
        score.total;


    state.score =
        score.total;


    /* ========================================================
       RESULT POPUP
    ======================================================== */

    showDesignResultPopup(
        score.total,
        pointsReward,
        moneyReward,
        true,
        {

            medal:
                medal,

            match:
                percent,

            perfect:
                score.perfect,

            requirement:
                score.requirement,

            fashion:
                score.fashion,

            rarity:
                score.rarity,

            time:
                score.time,

            timeout:
                fromTimeout

        }
    );


    /* ========================================================
       UPDATE UI
    ======================================================== */

    updateAllUI();


    saveTemporaryState();

}

/* ============================================================
   50. SAVE TEMPORARY STATE
   ============================================================ */

function saveTemporaryState() {

    try {

        localStorage.setItem(

            "naylaFashionTemporary",

            JSON.stringify({

                gender:
                    state.gender,

                selected:
                    state.selected,

                colors:
                    state.colors,

                rotation:
                    state.targetRotation,

                cameraDistance:
                    state.targetCameraDistance
            })
        );

    } catch (_) {}
}


/* ============================================================
   51. LOAD TEMPORARY STATE
   ============================================================ */

function loadTemporaryState() {

    try {

        const raw =
            localStorage.getItem(
                "naylaFashionTemporary"
            );


        if (!raw) {
            return;
        }


        const saved =
            JSON.parse(raw);


        if (
            saved.gender === "male" ||
            saved.gender === "female"
        ) {

            state.gender =
                saved.gender;
        }


        if (
            saved.selected &&
            typeof saved.selected ===
            "object"
        ) {

            state.selected =
                saved.selected;
        }


        if (
            saved.colors &&
            typeof saved.colors ===
            "object"
        ) {

            state.colors =
                saved.colors;
        }


        if (
            Number.isFinite(
                saved.rotation
            )
        ) {

            state.targetRotation =
                saved.rotation;
        }


        if (
            Number.isFinite(
                saved.cameraDistance
            )
        ) {

            state.targetCameraDistance =
                THREE.MathUtils.clamp(
                    saved.cameraDistance,
                    CONFIG.camera.minDistance,
                    CONFIG.camera.maxDistance
                );
        }

    } catch (error) {

        console.warn(
            "[Fashion Designer] State load failed",
            error
        );
    }
}


/* ============================================================
   52. UPDATE ALL UI
   ============================================================ */

function updateAllUI() {

    renderWardrobe();

    updateSelectedItems();

    updateEquipment();

    updateStageAvatarTitle();

    updateGenderUI();

    updateCategoryButtons();

    updateScore();

    updateStats();

    updateChallengeUI();

    updateWardrobeCount();

    updateRarityBadge();
}


/* ============================================================
   53. RESIZE
   ============================================================ */

function resizeThree() {

    if (!renderer || !camera) return;

    const container = firstExisting([
        "#fashionThreeContainer",
        "#fashion3D",
        "#fashionCanvas",
        ".fashion-three-container"
    ]);

    if (!container) return;

    // FIX: pakai getBoundingClientRect supaya dapat tinggi
    // aktual meski clientHeight belum ter-update oleh browser.
    const rect = container.getBoundingClientRect();

    const width = rect.width || container.clientWidth || 800;
    const height = rect.height || container.clientHeight || 700;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    if (width < 640) {

        const mobileDefault = 7.4;

        if (state.targetCameraDistance === CONFIG.camera.defaultDistance) {
            state.targetCameraDistance = mobileDefault;
        }
    }

    renderer.setSize(width, height, false);
}

/* ============================================================
   54. ANIMATION
   ============================================================ */

function animate() {

    animationFrame =
        requestAnimationFrame(
            animate
        );


    const delta =
        clock
            ? clock.getDelta()
            : .016;


    /*
     * NEW: animasi partikel tema (sakura/salju/kilau/bokeh).
     */

    updateParticles(delta);


    /*
     * NEW: auto-rotate halus kalau avatar idle (tidak sedang
     * di-drag/di-zoom) lebih dari 4 detik — kesan "showcase"
     * seperti game fashion sungguhan, berhenti otomatis begitu
     * user berinteraksi lagi (lihat setupStageControls()).
     */

    if (
        Date.now() -
        (state.lastInteraction || 0) >
        4000
    ) {

        state.targetRotation +=
            delta * .18;
    }


    /*
     * Smooth rotation.
     */

    state.rotation =
        THREE.MathUtils.lerp(
            state.rotation,
            state.targetRotation,
            .12
        );


    /*
     * Smooth zoom.
     */

    state.cameraDistance =
        THREE.MathUtils.lerp(
            state.cameraDistance,
            state.targetCameraDistance,
            .12
        );


    if (
        avatarRoot
    ) {

        avatarRoot.rotation.y =
            state.rotation;
    }


    if (
        camera
    ) {

        camera.position.z =
            state.cameraDistance;


        /*
         * Keep the camera centered
         * on the whole body.
         */

        camera.lookAt(
            0,
            2.45,
            0
        );
    }


    if (
        renderer &&
        scene &&
        camera
    ) {

        renderer.render(
            scene,
            camera
        );
    }
}


/* ============================================================
   55. TOAST
   ============================================================ */

function showToast(
    icon,
    text
) {

    const toast =
        document.getElementById(
            "fashionToast"
        );

    const toastIcon =
        document.getElementById(
            "fashionToastIcon"
        );

    const toastText =
        document.getElementById(
            "fashionToastText"
        );

    if (
        !toast ||
        !toastIcon ||
        !toastText
    ) {

        console.warn(
            "Toast element not found"
        );

        return;
    }

    toastIcon.textContent =
        icon;

    toastText.textContent =
        text;

    toast.classList.add(
        "show"
    );

    clearTimeout(
        toast._hideTimeout
    );

    toast._hideTimeout =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 3000);
}

/* ============================================================
   56. FORMAT
   ============================================================ */

function formatNumber(value) {

    return Number(
        value || 0
    ).toLocaleString(
        "id-ID"
    );
}


function escapeHTML(value) {

    return String(
        value ?? ""
    )
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );
}


/* ============================================================
   57. KEYBOARD
   ============================================================ */

function setupKeyboard() {

    window.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "ArrowLeft"
            ) {

                state.targetRotation -=
                    Math.PI / 10;
            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                state.targetRotation +=
                    Math.PI / 10;
            }


            if (
                event.key ===
                "+"
                ||
                event.key ===
                "="
            ) {

                state.targetCameraDistance -=
                    .35;
            }


            if (
                event.key ===
                "-"
            ) {

                state.targetCameraDistance +=
                    .35;
            }


            if (
                event.key ===
                "0"
            ) {

                resetView();
            }


            state.targetCameraDistance =
                THREE.MathUtils.clamp(
                    state.targetCameraDistance,
                    CONFIG.camera.minDistance,
                    CONFIG.camera.maxDistance
                );
        }
    );
}


/* ============================================================
   58. CHALLENGE BUTTON
   ============================================================ */

function setupChallengeButton() {

    const button =
        document.getElementById(
            "fashionChallengeButton"
        );

    if (!button) {
        return;
    }

        button.addEventListener(
            "click",
            () => {

                console.log(
                    "CHALLENGE BUTTON CLICKED"
                );

                startChallenge();

            }
        );
}

function openChallengeModal(challenge) {

    const modal = document.getElementById("fashionChallengeModal");
    const preview = document.getElementById("challengePreview");

    if (!modal || !preview) {
        console.error("Challenge modal element not found");
        return;
    }

    // Reset pilihan setiap kali modal dibuka
    state.pendingChallengeGender = null;

    preview.innerHTML = `
        <h3>${challenge.name}</h3>
        <p>${challenge.description}</p>

        <div class="challenge-gender-picker" style="display:flex;gap:8px;margin-top:14px;">
            <button type="button" data-challenge-gender="female" class="challenge-gender-btn">♀ Female</button>
            <button type="button" data-challenge-gender="male" class="challenge-gender-btn">♂ Male</button>
        </div>

        <p style="margin-top:8px;font-size:12px;color:rgba(180,205,235,.7);">
            Pilih model dulu — gender tidak bisa diubah lagi setelah challenge dimulai.
        </p>
    `;

    const startBtn = document.getElementById("challengeStartButton");

    if (startBtn) {
        startBtn.disabled = true;
        startBtn.style.opacity = ".5";
        startBtn.style.cursor = "not-allowed";
    }

    preview.querySelectorAll("[data-challenge-gender]").forEach(button => {

        Object.assign(button.style, {
            flex: "1",
            padding: "10px 12px",
            borderRadius: "10px",
            border: "1px solid rgba(100,180,255,.25)",
            background: "rgba(255,255,255,.05)",
            color: "#dceeff",
            cursor: "pointer"
        });

        button.addEventListener("click", () => {

            state.pendingChallengeGender = button.dataset.challengeGender;

            preview.querySelectorAll("[data-challenge-gender]").forEach(btn => {

                const active = btn.dataset.challengeGender === state.pendingChallengeGender;

                btn.style.background = active ? "rgba(41,147,239,.35)" : "rgba(255,255,255,.05)";
                btn.style.borderColor = active ? "rgba(100,180,255,.6)" : "rgba(100,180,255,.25)";
            });

            if (startBtn) {
                startBtn.disabled = false;
                startBtn.style.opacity = "";
                startBtn.style.cursor = "pointer";
            }
        });
    });

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
}

function closeChallengeModal() {

    const modal =
        document.getElementById(
            "fashionChallengeModal"
        );

    modal.classList.remove(
        "show"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );
}

function setupChallengeModal() {

    const startBtn =
        document.getElementById(
            "challengeStartButton"
        );

    const cancelBtn =
        document.getElementById(
            "challengeCancelButton"
        );

    if (startBtn) {

        startBtn.addEventListener(
            "click",
            beginChallenge
        );
    }

    if (cancelBtn) {

        cancelBtn.addEventListener(
            "click",
            closeChallengeModal
        );
    }
}

/* ============================================================
   59. AUTO ZOOM UI
   ============================================================ */

function createZoomUIIfMissing() {

    const host =
        firstExisting([
            "#fashionThreeContainer",
            "#fashion3D",
            "#fashionCanvas"
        ]);


    if (!host) {
        return;
    }
    

    /*
     * Jika HTML sudah punya zoom,
     * jangan membuat duplikat.
     */

    if (
        ROOT.querySelector(
            "[data-fashion-zoom]"
        )
    ) {
        return;
    }


    const wrapper =
        document.createElement(
            "div"
        );


    wrapper.className =
        "fashion-runtime-zoom";


    wrapper.innerHTML = `

        <button
            type="button"
            data-fashion-zoom="out"
            aria-label="Zoom out"
        >
            −
        </button>

        <button
            type="button"
            data-fashion-zoom="reset"
            aria-label="Reset view"
        >
            ⟳
        </button>

        <button
            type="button"
            data-fashion-zoom="in"
            aria-label="Zoom in"
        >
            +
        </button>

    `;


    Object.assign(
        wrapper.style,
        {

            position: "absolute",

            right: "14px",

            top: "50%",

            transform:
                "translateY(-50%)",

            display: "flex",

            flexDirection:
                "column",

            gap: "7px",

            zIndex: "40"
        }
    );


    wrapper
        .querySelectorAll(
            "button"
        )
        .forEach(
            button => {

                Object.assign(
                    button.style,
                    {

                        width: "38px",

                        height: "38px",

                        borderRadius:
                            "11px",

                        border:
                            "1px solid rgba(100,180,255,.16)",

                        background:
                            "rgba(4,17,31,.86)",

                        color: "#9bd0ff",

                        fontSize: "20px",

                        cursor: "pointer",

                        backdropFilter:
                            "blur(10px)"
                    }
                );
            }
        );


    if (
        getComputedStyle(host)
            .position ===
        "static"
    ) {

        host.style.position =
            "relative";
    }


    host.appendChild(
        wrapper
    );


    setupZoomButtons();
}


/* ============================================================
   60. AUTO GENDER UI
   ============================================================ */

function createGenderUIIfMissing() {

    const exists =
        ROOT.querySelector(
            "[data-fashion-gender], [data-gender]"
        );


    if (exists) {
        return;
    }


    const header =
        firstExisting([
            ".fashion-header",
            ".designer-header",
            ".fashion-toolbar",
            "header"
        ]);


    if (!header) {
        return;
    }


    const wrapper =
        document.createElement(
            "div"
        );


    wrapper.className =
        "fashion-gender-switch";


    wrapper.innerHTML = `

        <button
            type="button"
            data-fashion-gender="female"
            class="active"
        >
            ♀ Female
        </button>

        <button
            type="button"
            data-fashion-gender="male"
        >
            ♂ Male
        </button>

    `;


    Object.assign(
        wrapper.style,
        {

            display: "flex",

            gap: "6px",

            alignItems: "center",

            marginLeft: "12px"
        }
    );


    wrapper
        .querySelectorAll(
            "button"
        )
        .forEach(
            button => {

                Object.assign(
                    button.style,
                    {

                        border:
                            "1px solid rgba(90,170,240,.20)",

                        padding:
                            "8px 12px",

                        borderRadius:
                            "10px",

                        background:
                            "rgba(255,255,255,.05)",

                        color:
                            "#dceeff",

                        cursor:
                            "pointer"
                    }
                );
            }
        );


    header.appendChild(
        wrapper
    );


    setupGenderEvents();
}

/* =========================================================
   SAFE DEFAULT COVERAGE
   ========================================================= */

function createDefaultCoverage() {

    if (!bodyRoot) {
        return;
    }

    /*
     * Pakaian dasar putih.
     *
     * Tujuannya supaya ketika semua fashion item
     * dihapus, avatar tidak terlihat seperti
     * mannequin telanjang.
     */

    const material = fabric(
        CONFIG.colors.white || "#ffffff"
    );


    /* -----------------------------------------------------
       LOWER COVERAGE (sama untuk female & male)
       ----------------------------------------------------- */

    const lower = new THREE.Mesh(

        new THREE.CapsuleGeometry(
            0.43,
            0.28,
            8,
            24
        ),

        material
    );

    lower.position.set(
        0,
        1.15,
        0.01
    );

    lower.scale.set(
        1.0,
        0.75,
        0.82
    );

    lower.castShadow = true;
    lower.receiveShadow = true;

    bodyRoot.add(lower);


    /*
     * NEW: FEMALE CHEST COVERAGE DIHAPUS TOTAL — sebelumnya
     * ada sphere tambahan khusus wanita di sini yang mengikuti
     * bentuk bust. Karena bust silhouette sudah dihapus di
     * createBaseBody(), tambahan ini juga tidak diperlukan lagi.
     */
}

function createKimonoDress(item) {

    clearGroup(dressRoot);

    const color =
        state.colors[item.id] ||
        item.colors?.[0] ||
        "#f6d6df";

    const mat = satin(color);

    const type = item.type || "";

    /* =========================================
       COLORS
    ========================================= */

    let obiColor = "#d14f8d";

    if (type === "furisodeGold") {
        obiColor = "#d9b14d";
    }

    if (type === "furisodeRoyal") {
        obiColor = "#2f5da0";
    }

    const obiMat = satin(obiColor);
    const collarMat = satin("#fffafd");
    const innerMat = satin("#fff7fb");


    /* =========================================
       SHOULDER LIFT

       Menaikkan bagian ATAS kimono (penutup bahu,
       kerah, lengan atas, seam) supaya menempel ke
       titik bahu badan yang sekarang lebih tinggi
       (lihat fix di createBaseBody(), SHOULDER_Y
       ≈3.02). Bagian bawah (badan utama, obi, rok,
       lengan panjang) TIDAK diubah.
    ========================================= */

    const SHOULDER_LIFT = 0.48;


    /* =========================================
       MAIN KIMONO BODY
       ========================================= */

    const bodyTop = cylinder(
        dressRoot,
        0.68,
        0.86,
        1.28,
        [0, 2.18, 0],
        mat,
        64
    );

    bodyTop.scale.z = 0.76;


    const bodyBottom = cylinder(
        dressRoot,
        0.78,
        0.96,
        2.15,
        [0, 0.98, 0],
        mat,
        64
    );

    bodyBottom.scale.z = 0.76;


    /* =========================================
       SMALL SHOULDER COVER

       JANGAN BESAR.
       Ini hanya untuk menutup engsel bahu.
    ========================================= */

    const shoulderCloth = cylinder(
        dressRoot,
        0.58,
        0.72,
        0.42,
        [0, 2.63 + SHOULDER_LIFT, 0],
        mat,
        48
    );

    shoulderCloth.scale.x = 1.08;
    shoulderCloth.scale.z = 0.76;


    /* =========================================
       LEFT SHOULDER COVER

       Ukuran kecil agar tidak menjadi
       "bola bahu".
    ========================================= */

    const leftShoulder = sphere(
        dressRoot,
        [0.36, 0.30, 0.30],
        [-0.58, 2.61 + SHOULDER_LIFT, 0.02],
        mat,
        32
    );

    leftShoulder.scale.x *= 1.10;
    leftShoulder.scale.y *= 0.85;
    leftShoulder.scale.z *= 0.70;


    /* =========================================
       RIGHT SHOULDER COVER
    ========================================= */

    const rightShoulder = sphere(
        dressRoot,
        [0.36, 0.30, 0.30],
        [0.58, 2.61 + SHOULDER_LIFT, 0.02],
        mat,
        32
    );

    rightShoulder.scale.x *= 1.10;
    rightShoulder.scale.y *= 0.85;
    rightShoulder.scale.z *= 0.70;


    /* =========================================
       LEFT SHOULDER → SLEEVE

       FIX (celah/step antara bahu & lengan panjang):
       sebelumnya potongan ini cuma DIGESER naik
       sebesar SHOULDER_LIFT — itu menggeser ujung
       ATAS maupun ujung BAWAHnya sama rata. Padahal
       ujung bawahnya harus tetap nempel ke lengan
       panjang (leftSleeve) yang TIDAK ikut naik,
       jadi muncul celah sebesar SHOULDER_LIFT.

       Sekarang: TINGGI silinder ditambah sebesar
       SHOULDER_LIFT (supaya bisa menjangkau lebih
       jauh ke atas), dan posisinya cuma naik
       SETENGAH dari SHOULDER_LIFT — hasilnya ujung
       BAWAH tetap di tempat semula (nyambung ke
       lengan panjang), sementara ujung ATAS naik
       penuh mengikuti bahu yang baru. Tidak ada
       celah maupun step lagi.
    ========================================= */

    const leftUpperSleeve = cylinder(
        dressRoot,
        0.28,
        0.42,
        0.82 + SHOULDER_LIFT,
        [-0.78, 2.28 + (SHOULDER_LIFT / 2), 0],
        mat,
        48
    );

    leftUpperSleeve.rotation.z = -0.12;
    leftUpperSleeve.scale.z = 0.72;


    /* =========================================
       RIGHT SHOULDER → SLEEVE

       FIX: sama seperti leftUpperSleeve di atas.
    ========================================= */

    const rightUpperSleeve = cylinder(
        dressRoot,
        0.28,
        0.42,
        0.82 + SHOULDER_LIFT,
        [0.78, 2.28 + (SHOULDER_LIFT / 2), 0],
        mat,
        48
    );

    rightUpperSleeve.rotation.z = 0.12;
    rightUpperSleeve.scale.z = 0.72;


    /* =========================================
       FURISODE SLEEVES

       Tidak terlalu lebar.
       Tetap panjang dan menggantung.

       TIDAK diubah — posisi lengan panjang bagian
       bawah sudah benar dan tidak terkait bahu.
    ========================================= */

    const leftSleeve = cylinder(
        dressRoot,
        0.36,
        0.50,
        1.55,
        [-0.96, 1.50, 0],
        mat,
        64
    );

    leftSleeve.rotation.z = -0.045;
    leftSleeve.scale.z = 0.68;


    const rightSleeve = cylinder(
        dressRoot,
        0.36,
        0.50,
        1.55,
        [0.96, 1.50, 0],
        mat,
        64
    );

    rightSleeve.rotation.z = 0.045;
    rightSleeve.scale.z = 0.68;


    /* =========================================
       OUTER SLEEVE

       Lapisan luar sedikit lebih besar,
       tetapi tidak seperti bola.
    ========================================= */

    const leftOuterSleeve = cylinder(
        dressRoot,
        0.40,
        0.54,
        1.42,
        [-1.00, 1.46, -0.02],
        mat,
        64
    );

    leftOuterSleeve.rotation.z = -0.04;
    leftOuterSleeve.scale.z = 0.68;


    const rightOuterSleeve = cylinder(
        dressRoot,
        0.40,
        0.54,
        1.42,
        [1.00, 1.46, -0.02],
        mat,
        64
    );

    rightOuterSleeve.rotation.z = 0.04;
    rightOuterSleeve.scale.z = 0.68;


    /* =========================================
       INNER SLEEVE

       Menutup bagian dalam sehingga tangan
       tidak terlihat.
    ========================================= */

    const leftInnerSleeve = cylinder(
        dressRoot,
        0.28,
        0.38,
        1.30,
        [-1.00, 1.40, 0.16],
        innerMat,
        48
    );

    leftInnerSleeve.rotation.z = -0.04;
    leftInnerSleeve.scale.z = 0.62;


    const rightInnerSleeve = cylinder(
        dressRoot,
        0.28,
        0.38,
        1.30,
        [1.00, 1.40, 0.16],
        innerMat,
        48
    );

    rightInnerSleeve.rotation.z = 0.04;
    rightInnerSleeve.scale.z = 0.62;


    /* =========================================
       SLEEVE BOTTOM

       Ditutup kain.
       Tidak ada lubang yang memperlihatkan tangan.
    ========================================= */

    const leftSleeveEnd = cylinder(
        dressRoot,
        0.38,
        0.38,
        0.10,
        [-1.01, 0.76, 0],
        mat,
        48
    );

    leftSleeveEnd.scale.z = 0.68;


    const rightSleeveEnd = cylinder(
        dressRoot,
        0.38,
        0.38,
        0.10,
        [1.01, 0.76, 0],
        mat,
        48
    );

    rightSleeveEnd.scale.z = 0.68;


    /* =========================================
       SLEEVE HEM
    ========================================= */

    const leftCuff = torus(
        dressRoot,
        0.37,
        0.025,
        [-1.01, 0.78, 0.02],
        [Math.PI / 2, 0, 0],
        collarMat
    );

    leftCuff.scale.z = 0.68;


    const rightCuff = torus(
        dressRoot,
        0.37,
        0.025,
        [1.01, 0.78, 0.02],
        [Math.PI / 2, 0, 0],
        collarMat
    );

    rightCuff.scale.z = 0.68;


    /* =========================================
       FRONT KIMONO WRAP

       Tinggi ditambah dan posisi Y dinaikkan
       setengahnya, supaya bagian atas tetap
       menyentuh area kerah yang baru (naik) tanpa
       mengubah ujung bawah yang menutup badan.
    ========================================= */

    const wrapLeft = box(
        dressRoot,
        [0.28, 2.05 + SHOULDER_LIFT, 0.055],
        [-0.15, 1.70 + (SHOULDER_LIFT / 2), 0.52],
        mat
    );

    wrapLeft.rotation.z = 0.18;


    const wrapRight = box(
        dressRoot,
        [0.26, 1.98 + SHOULDER_LIFT, 0.055],
        [0.11, 1.70 + (SHOULDER_LIFT / 2), 0.54],
        mat
    );

    wrapRight.rotation.z = -0.13;


    /* =========================================
       COLLAR
    ========================================= */

    const collarLeft = box(
        dressRoot,
        [0.13, 1.00, 0.065],
        [-0.19, 2.47 + SHOULDER_LIFT, 0.57],
        collarMat
    );

    collarLeft.rotation.z = 0.70;


    const collarRight = box(
        dressRoot,
        [0.13, 1.00, 0.065],
        [0.19, 2.47 + SHOULDER_LIFT, 0.57],
        collarMat
    );

    collarRight.rotation.z = -0.70;


    /* =========================================
       NECK CENTER
    ========================================= */

    const neckCenter = cylinder(
        dressRoot,
        0.18,
        0.22,
        0.16,
        [0, 2.68 + SHOULDER_LIFT, 0.42],
        collarMat,
        32
    );

    neckCenter.scale.z = 0.72;


    /* =========================================
       OBI

       TIDAK diubah — posisi pinggang tidak
       terkait dengan perbaikan bahu.
    ========================================= */

    const obi = cylinder(
        dressRoot,
        0.64,
        0.70,
        0.42,
        [0, 1.91, 0],
        obiMat,
        64
    );

    obi.scale.z = 0.76;


    /* =========================================
       OBI FRONT BAND
    ========================================= */

    box(
        dressRoot,
        [1.30, 0.085, 0.52],
        [0, 2.12, 0.36],
        satin("#ffdce7")
    );


    box(
        dressRoot,
        [1.30, 0.085, 0.52],
        [0, 1.70, 0.36],
        satin("#ffdce7")
    );


    /* =========================================
       OBI CENTER
    ========================================= */

    const obiCenter = sphere(
        dressRoot,
        [0.14, 0.14, 0.10],
        [0, 1.91, 0.48],
        obiMat,
        32
    );

    obiCenter.scale.z = 0.65;


    /* =========================================
       OBI BOW
    ========================================= */

    const bowCenter = sphere(
        dressRoot,
        [0.20, 0.30, 0.17],
        [0, 1.93, -0.63],
        obiMat,
        32
    );

    bowCenter.scale.z = 0.60;


    const bowLeft = sphere(
        dressRoot,
        [0.48, 0.30, 0.17],
        [-0.34, 1.93, -0.63],
        obiMat,
        32
    );

    bowLeft.rotation.y = 0.35;
    bowLeft.scale.z = 0.60;


    const bowRight = sphere(
        dressRoot,
        [0.48, 0.30, 0.17],
        [0.34, 1.93, -0.63],
        obiMat,
        32
    );

    bowRight.rotation.y = -0.35;
    bowRight.scale.z = 0.60;


    /* =========================================
       OBI RIBBONS
    ========================================= */

    const ribbonLeft = box(
        dressRoot,
        [0.18, 0.65, 0.12],
        [-0.18, 1.51, -0.62],
        obiMat
    );

    ribbonLeft.rotation.z = -0.16;


    const ribbonRight = box(
        dressRoot,
        [0.18, 0.65, 0.12],
        [0.18, 1.51, -0.62],
        obiMat
    );

    ribbonRight.rotation.z = 0.16;


    /* =========================================
       SAKURA

       TIDAK diubah — posisi bunga relatif terhadap
       badan kimono, tetap sama.
    ========================================= */

    if (type.startsWith("furisode")) {

        const flowerMat = satin("#ffb7d0");
        const centerMat = satin("#ffe27a");

        const flowers = [
            [-0.38, 2.43],
            [0.38, 2.34],
            [-0.52, 2.00],
            [0.30, 1.76],
            [-0.38, 1.40],
            [0.48, 1.30],
            [-0.22, 0.96],
            [0.36, 0.72],
            [-0.48, 0.64]
        ];

        flowers.forEach(function(pos) {

            const x = pos[0];
            const y = pos[1];

            for (let p = 0; p < 5; p++) {

                const angle =
                    p * Math.PI * 2 / 5;

                sphere(
                    dressRoot,
                    [0.045, 0.045, 0.016],
                    [
                        x + Math.cos(angle) * 0.055,
                        y + Math.sin(angle) * 0.055,
                        0.62
                    ],
                    flowerMat,
                    12
                );
            }

            sphere(
                dressRoot,
                [0.022, 0.022, 0.016],
                [x, y, 0.65],
                centerMat,
                12
            );
        });
    }


    /* =========================================
       SUBTLE FABRIC FOLDS
    ========================================= */

    for (let i = 0; i < 5; i++) {

        const x =
            -0.42 + i * 0.21;

        const fold = box(
            dressRoot,
            [0.018, 1.35, 0.014],
            [x, 0.96, 0.61],
            satin("#eadde3")
        );

        fold.rotation.z =
            (i - 2) * 0.008;
    }


    /* =========================================
       SHOULDER SEAMS
    ========================================= */

    const leftSeam = torus(
        dressRoot,
        0.27,
        0.015,
        [-0.58, 2.61 + SHOULDER_LIFT, 0.37],
        [Math.PI / 2, 0, 0],
        collarMat
    );

    leftSeam.scale.z = 0.70;


    const rightSeam = torus(
        dressRoot,
        0.27,
        0.015,
        [0.58, 2.61 + SHOULDER_LIFT, 0.37],
        [Math.PI / 2, 0, 0],
        collarMat
    );

    rightSeam.scale.z = 0.70;


    /* =========================================
       BOTTOM HEM

       TIDAK diubah.
    ========================================= */

    const hem = torus(
        dressRoot,
        0.82,
        0.035,
        [0, -0.08, 0],
        [Math.PI / 2, 0, 0],
        collarMat
    );

    hem.scale.z = 0.76;


    const innerHem = torus(
        dressRoot,
        0.77,
        0.018,
        [0, 0.00, 0.01],
        [Math.PI / 2, 0, 0],
        mat
    );

    innerHem.scale.z = 0.76;
}


/* ============================================================
   48a. SAVE AS IMAGE (PNG)
   ------------------------------------------------------------
   Mengambil screenshot avatar 3D langsung dari canvas WebGL
   dan men-trigger download sebagai file .png ke perangkat user.
   ============================================================ */

function saveDesignAsImage() {

    if (!renderer) {

        showToast(
            "⚠",
            "3D belum siap, coba lagi sebentar."
        );

        return;
    }


    /*
     * Render ulang sekali lagi tepat sebelum capture,
     * memastikan frame yang diambil adalah frame terbaru
     * (avatar dengan outfit yang sedang dipakai).
     */

    if (
        scene &&
        camera
    ) {

        renderer.render(
            scene,
            camera
        );
    }


    let dataURL;

    try {

        dataURL =
            renderer.domElement.toDataURL(
                "image/png"
            );

    } catch (error) {

        console.warn(
            "[Fashion Designer] Gagal mengambil gambar avatar.",
            error
        );

        showToast(
            "⚠",
            "Gagal menyimpan gambar."
        );

        return;
    }


    const link =
        document.createElement(
            "a"
        );

    const timestamp =
        new Date()
            .toISOString()
            .replace(
                /[:.]/g,
                "-"
            );

    link.href =
        dataURL;

    link.download =
        `nayla-fashion-design-${timestamp}.png`;

    document.body.appendChild(
        link
    );

    link.click();

    document.body.removeChild(
        link
    );

    showToast(
        "🖼",
        "Design disimpan sebagai PNG"
    );
}

function showDesignResultPopup(
    score,
    points,
    money,
    isChallenge = false,
    challengeData = null
) {

    const popup =
        document.getElementById(
            "designResultPopup"
        );


    if (!popup) {
        return;
    }


    const scoreEl =
        document.getElementById(
            "designResultScore"
        );


    const pointsEl =
        document.getElementById(
            "designResultPoints"
        );


    const moneyEl =
        document.getElementById(
            "designResultMoney"
        );


    /*
     * Score
     */
    if (scoreEl) {

        scoreEl.textContent =
            score;

    }


    /*
     * Points
     */
    if (pointsEl) {

        pointsEl.textContent =
            `+${points}`;

    }


    /*
     * Money
     */
    if (moneyEl) {

        moneyEl.textContent =
            `+${money}`;

    }


    /*
     * Score maximum
     */
    const scoreMax =
        popup.querySelector(
            ".design-result-score-max"
        );


    if (scoreMax) {

        scoreMax.textContent =
            isChallenge
                ? "/ 1000"
                : "/ 100";

    }


    /* ========================================================
       CHALLENGE RESULT
    ======================================================== */

    if (isChallenge) {

        const kicker =
            popup.querySelector(
                ".design-result-kicker"
            );


        const title =
            popup.querySelector(
                ".design-result-card h2"
            );


        const message =
            popup.querySelector(
                ".design-result-message"
            );


        if (kicker) {

            kicker.textContent =
                "CHALLENGE COMPLETE";

        }


        if (title) {

            title.textContent =
                challengeData?.medal ||
                "Challenge Complete";

        }


        if (message) {

            if (
                challengeData?.perfect > 0
            ) {

                message.textContent =
                    `Perfect Match! +${challengeData.perfect} bonus`;

            } else if (
                challengeData?.timeout
            ) {

                message.textContent =
                    `Time's up! Match ${challengeData.match}%`;

            } else {

                message.textContent =
                    `Challenge completed with ${challengeData?.match || 0}% match.`;

            }

        }


        /*
         * Tambahkan class challenge
         */
        popup.classList.add(
            "challenge-result"
        );


    } else {

        /*
         * Normal Design
         */
        const kicker =
            popup.querySelector(
                ".design-result-kicker"
            );


        const title =
            popup.querySelector(
                ".design-result-card h2"
            );


        const message =
            popup.querySelector(
                ".design-result-message"
            );


        if (kicker) {

            kicker.textContent =
                "DESIGN SUBMITTED";

        }


        if (title) {

            title.textContent =
                "Great Design!";

        }


        if (message) {

            message.textContent =
                "Your fashion design has been successfully submitted.";

        }


        popup.classList.remove(
            "challenge-result"
        );

    }


    /*
     * Show popup
     */
    popup.classList.add(
        "show"
    );


    popup.setAttribute(
        "aria-hidden",
        "false"
    );

}

function closeDesignResultPopup() {

    const popup =
        document.getElementById(
            "designResultPopup"
        );


    if (!popup) {
        return;
    }


    /*
     * Close popup
     */
    popup.classList.remove(
        "show"
    );


    popup.setAttribute(
        "aria-hidden",
        "true"
    );


    /*
     * Remove challenge class
     */
    popup.classList.remove(
        "challenge-result"
    );


    /*
     * Reset outfit
     */
    resetDesignAfterSubmit();

}

function setupDesignResultPopup() {

    document.addEventListener(
        "click",
        function(event) {

            const button =
                event.target.closest(
                    "#designResultContinue"
                );


            if (!button) {
                return;
            }


            event.preventDefault();

            event.stopPropagation();


            closeDesignResultPopup();

        }
    );

}

function resetDesignAfterSubmit() {

    /*
     * NEW: auto-save outfit yang baru saja di-submit ke
     * "Saved Outfit" (localStorage "naylaFashionSaved"),
     * SEBELUM canvas/state dikosongkan di bawah. Jadi outfit
     * hilang dari canvas setelah submit, tapi tetap ada di
     * daftar Saved Outfit — bukan hilang total.
     *
     * Nama disesuaikan: kalau berasal dari challenge, pakai
     * nama challenge-nya; kalau submit biasa, pakai nama
     * tanggal seperti biasa. Skor yang disimpan memakai
     * state.score (skor final yang baru saja ditampilkan di
     * popup hasil), bukan calculateScore() ulang — karena
     * pada titik ini outfit belum dikosongkan jadi hasilnya
     * akan sama, tapi untuk skor challenge (yang sudah
     * termasuk bonus match & perfect match) state.score
     * adalah sumber yang benar.
     */

    const hasOutfit =
        state.selected &&
        Object.keys(state.selected)
            .some(
                category =>
                    state.selected[category]
            );


    if (hasOutfit) {

        const outfitName =
            state.challenge
                ? `${state.challenge.name} (Challenge)`
                : undefined;


        const snapshot =
            buildOutfitSnapshot(
                outfitName,
                state.score
            );


        persistOutfitSnapshot(
            snapshot
        );


        showToast(
            "💾",
            "Outfit disimpan ke Saved Outfit"
        );

    }


    /*
     * Clear outfit
     */
    state.selected = {};


    /*
     * Clear colors
     */
    state.colors = {};


    /*
     * Reset score
     */
    state.score = 0;


    /*
     * Reset challenge
     */
    state.challenge = null;

    state.challengeActive = false;

    state.challengeTime = 0;

    state.challengeScore = 0;

    state.challengeRewarded = false;


    /*
     * Stop timer
     */
    if (state.challengeTimer) {

        clearInterval(
            state.challengeTimer
        );

        state.challengeTimer = null;

    }


    /*
     * Hide challenge panel
     */
    const panel =
        document.getElementById(
            "fashionChallengePanel"
        );


    if (panel) {

        panel.classList.remove(
            "show"
        );

        panel.hidden = true;

    }


    /*
     * Reset avatar
     */
    updateAvatar();


    /*
     * Update UI
     */
    updateAllUI();


    /*
     * Save clean state
     */
    saveTemporaryState();

}

function setupMobileTabs() {

    const tabs = $all(".fashion-mobile-tab");
    const workspace = firstExisting([".fashion-workspace"]);

    if (!tabs.length || !workspace) return;

    workspace.classList.add("tab-stage");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {

            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            workspace.classList.remove("tab-stage", "tab-wardrobe", "tab-outfit");
            workspace.classList.add("tab-" + tab.dataset.mobileTab);
        });
    });
}

/* ============================================================
   61. INITIALIZE
   ============================================================ */

function init() {

    loadTemporaryState();

    createGenderUIIfMissing();

    /*
     * createThree membuat event UI juga.
     */

    setupChallengeModal(); 

    initThree();

    createZoomUIIfMissing();

    setupKeyboard();

    setupChallengeButton();

    setupDesignResultPopup();

    setupMobileTabs();

    /*
     * NEW: hubungkan panel "Saved Outfits" (#fashionSavedOutfits
     * / #fashionSavedCount) — sebelumnya tidak pernah dipanggil
     * sama sekali sehingga panel itu selalu kosong walau data
     * sudah tersimpan di localStorage.
     */

    setupSavedOutfitsEvents();

    renderSavedOutfits();

    /*
     * Default hair tetap ada.
     */

    if (
        !state.selected.hair
    ) {

        state.selected.hair =
            state.gender === "female"
                ? "hair-soft-bob"
                : "hair-male-short";
    }


    /*
     * Default shoes.
     */

    if (
        !state.selected.shoes
    ) {

        state.selected.shoes =
            "shoe-sneakers";
    }


    updateAvatar();

    updateAllUI();
}


/* ============================================================
   62. DOM READY
   ============================================================ */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        init,
        {
            once: true
        }
    );

} else {

    init();
}