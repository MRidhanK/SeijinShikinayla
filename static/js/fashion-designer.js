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
       ======================================================== */

    const ambient =
        new THREE.HemisphereLight(
            0xdcecff,
            0x071321,
            2.6
        );

    scene.add(ambient);


    const key =
        new THREE.DirectionalLight(
            0xffffff,
            4.4
        );

    key.position.set(
        -4,
        7,
        6
    );

    key.castShadow = true;

    key.shadow.mapSize.width = 2048;

    key.shadow.mapSize.height = 2048;

    scene.add(key);


    const fill =
        new THREE.DirectionalLight(
            0x9ac9ff,
            2.4
        );

    fill.position.set(
        4,
        4,
        -3
    );

    scene.add(fill);


    const rim =
        new THREE.PointLight(
            0xb89aff,
            18,
            14
        );

    rim.position.set(
        -3,
        4,
        -4
    );

    scene.add(rim);


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


    const floor =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                3.0,
                3.0,
                .12,
                96
            ),

            getMaterial(
                "#172f56",
                {
                    roughness: .8
                }
            )
        );

    floor.position.y = .05;

    floor.receiveShadow = true;

    stageRoot.add(floor);


    const platform =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                1.55,
                1.72,
                .16,
                96
            ),

            getMaterial(
                "#1f4b91",
                {
                    roughness: .62,
                    metalness: .08
                }
            )
        );

    platform.position.y = .17;

    platform.receiveShadow = true;

    platform.castShadow = true;

    stageRoot.add(platform);


    const ring =
        new THREE.Mesh(

            new THREE.TorusGeometry(
                2.72,
                .018,
                10,
                96
            ),

            getMaterial(
                "#2993ef",
                {
                    roughness: .3,
                    metalness: .4
                }
            )
        );

    ring.rotation.x =
        Math.PI / 2;

    ring.position.y =
        .14;

    stageRoot.add(ring);


    const ring2 =
        new THREE.Mesh(

            new THREE.TorusGeometry(
                1.58,
                .012,
                8,
                80
            ),

            getMaterial(
                "#4c9df0",
                {
                    roughness: .3,
                    metalness: .4
                }
            )
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
     * Female:
     * subtle bust silhouette.
     *
     * Tidak membuat anatomi terbuka.
     * Bust langsung berada di bawah base garment.
     *
     * FIX: ukurannya dikecilkan & ditarik lebih ke dalam
     * (z lebih kecil) supaya selalu tersembunyi di bawah
     * baju/dress apapun, tidak nembus keluar kain lagi.
     */

    if (state.gender === "female") {

        sphere(
            bodyRoot,

            [.26, .18, .12],

            [-.30, 2.80, .32],

            skin
        );

        sphere(
            bodyRoot,

            [.26, .18, .12],

            [.30, 2.80, .32],

            skin
        );
    }


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
       (FIX: male head is now a different, broader/squarer
       shape instead of reusing the exact female head)
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
       (FIX: male nose is now slightly bigger/different than
       the female nose instead of sharing the same values)
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
       ------------------------------------------------------
       FIX (engsel bahu ada di tengah badan, bukan di atas):

       Sebelumnya kapsul lengan diposisikan di y=2.70 dengan
       rotasi hanya 5°. Titik y=2.70 itu kira-kira TENGAH DADA
       (torso center ada di y=2.67), jauh di bawah titik bahu
       sebenarnya (CONFIG.avatar.shoulderY ≈ 3.02). Karena
       rotasinya kecil, pangkal atas kapsul cuma sedikit miring
       dan tetap nongkrong di area dada — bukan menempel di
       puncak bahu — sehingga terlihat ada celah besar antara
       torso dan lengan seperti di kotak merah screenshot user.

       Fix: kapsul lengan sekarang dihitung supaya UJUNG ATASNYA
       bertemu tepat di titik bahu (SHOULDER_X, SHOULDER_Y) —
       dekat tepi atas torso — lalu turun ke posisi tangan
       (HAND_X, HAND_Y) yang sama seperti sebelumnya. Posisi
       tengah kapsul dan sudut rotasinya dihitung dari dua titik
       ini, jadi lengan benar-benar "menggantung" dari puncak
       bahu, bukan dari tengah badan.
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
       SHOULDER FILL (FIX: dipindah ke titik bahu sebenarnya
       [SHOULDER_X, SHOULDER_Y], bukan di y=2.76 yang masih
       terlalu rendah / tengah dada. Sekarang bola ini duduk
       tepat di puncak bahu, menyatukan torso dan pangkal
       lengan tanpa celah — dari sudut manapun.)
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


    /*
     * FIX: dulu bagian coverage ini SELALU dibuat,
     * tanpa peduli apakah top/dress/bottom sudah
     * dipakai. Karena bulatan dada di lapisan ini
     * lebih menonjol ke depan daripada permukaan
     * baju (top), hasilnya dada "nembus" baju.
     *
     * Sekarang coverage hanya dibuat kalau slot
     * terkait memang masih kosong (belum ada top/
     * dress untuk atas, belum ada bottom/dress
     * untuk bawah) — begitu dipakaikan baju,
     * coverage ini otomatis tidak dibuat lagi.
     */

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


    /*
     * FIX: kalau user cuma pakai JAKET saja (tanpa top/
     * dress), lapisan coverage ini masih perlu dibuat
     * karena kadang terlihat lewat celah kerah/lapel
     * jaket yang terbuka. Sebelumnya warnanya selalu
     * putih hardcode, jadi kelihatan ganjil kalau
     * jaketnya warna lain (mis. hitam).
     *
     * Sekarang warnanya mengikuti warna jaket yang
     * sedang dipakai, supaya menyatu/nge-blend —
     * hanya default ke putih kalau memang tidak ada
     * jaket sama sekali (badan benar-benar polos).
     */

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

        /*
         * FIX: kalau bottom (celana/rok) SUDAH dipakai,
         * bagian pinggul sudah ditangani oleh waistband
         * celana itu sendiri. Kalau coverage atas ini tetap
         * dibuat sebesar & seturun biasanya, bentuknya yang
         * bulat penuh akan "nyembul" keluar dari waistband
         * celana (kelihatan seperti jendolan/perut di atas
         * celana). Jadi kalau bottom sudah ada, tingginya
         * dipendekkan (posisi tetap sama) supaya ujung
         * bawahnya meruncing pas menyentuh ujung atas
         * waistband celana — tidak nyembul lebar, dan tidak
         * ada celah kulit yang kelihatan di antara keduanya.
         */

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
           (FIX: sphere upper coverage meruncing ke nol pas
           ketemu pinggang celana, jadi ada celah kulit
           kelihatan / step yang kentara di antara perut dan
           waistband celana. Sekarang radiusnya disamakan
           persis dengan radius waistband di createBottom()
           [.63 / .69], tingginya ditambah dari .22 -> .30,
           dan posisinya diturunkan sedikit [2.42 -> 2.38]
           supaya overlap-nya lebih dalam ke waistband —
           hasilnya sambungan perut-ke-celana jadi mulus,
           tanpa celah maupun "tangga".)
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

        /* =================================================
           FEMALE CHEST COVERAGE
           ================================================= */

        if (
            state.gender === "female"
        ) {

            sphere(
                underLayerRoot,

                [
                    .30,
                    .23,
                    .13
                ],

                [
                    -.30,
                    2.81,
                    .51
                ],

                upperCoverage
            );

            sphere(
                underLayerRoot,

                [
                    .30,
                    .23,
                    .13
                ],

                [
                    .30,
                    2.81,
                    .51
                ],

                upperCoverage
            );
        }
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


/* ============================================================
   17. TOP
   ============================================================ */

function createTop(item) {

    clearGroup(topRoot);

    if (!item) {
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


    /* ========================================================
       SUBTLE CHEST CONTOUR (FEMALE ONLY)
       (NEW: sebelumnya dada "nembus" dari lapisan underwear
       yang lebih menonjol daripada bajunya. Sekarang cukup
       jendolan halus, memakai material yang sama persis
       dengan bajunya, dan diposisikan jauh di dalam siluet
       torso utama supaya tidak pernah nongol keluar dari
       kain — jadi menyatu, bukan dua bola terpisah.)
       ======================================================== */

    if (
        state.gender === "female"
    ) {

        sphere(
            topRoot,
            [.20, .15, .085],
            [-.26, 2.78, .28],
            mat
        );

        sphere(
            topRoot,
            [.20, .15, .085],
            [.26, 2.78, .28],
            mat
        );
    }


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
       SHOULDER CONNECTOR (FIX: bola bahu duduk di TENGAH lengan,
       bukan di ATAS/puncak bahu)
       ------------------------------------------------------
       Sebelumnya connector ini ditaruh persis di y=2.77, sama
       dengan titik TENGAH capsule lengan (yang membentang kira-
       kira dari y≈2.24 sampai y≈3.30). Karena posisinya di
       tengah, bola bahu ini kelihatan seperti benjolan di
       pertengahan lengan/bisep, bukan di puncak bahu — persis
       keluhan user ("bahunya itu diatas bukan ditengah").

       Fix: naikkan connector ke SHOULDER_Y (dekat puncak
       capsule lengan, selaras dengan CONFIG.avatar.shoulderY
       ≈3.02) supaya bola ini menyatu di titik pertemuan
       torso-bahu yang sebenarnya, bukan di tengah lengan.
       Posisi X/Z dan radius tidak diubah — hanya Y yang naik.
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

function createDress(item) {

    clearGroup(dressRoot);

    if (!item) {
        return;
    }

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


    /*
     * BODICE
     *
     * Menutupi torso sepenuhnya.
     */

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


    /* ========================================================
       SUBTLE CHEST CONTOUR (FEMALE ONLY)
       (NEW: sama seperti fix di baju/top — jendolan halus
       memakai material dress itu sendiri, ditanam di dalam
       siluet bodice supaya tidak pernah nembus ke luar kain.)
       ======================================================== */

    if (
        state.gender === "female"
    ) {

        sphere(
            dressRoot,
            [.21, .16, .09],
            [-.27, 2.80, .30],
            mat
        );

        sphere(
            dressRoot,
            [.21, .16, .09],
            [.27, 2.80, .30],
            mat
        );
    }


    /*
     * WAIST
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
       SLEEVES
       (FIX: sleeve dulu terlalu pendek — cuma menutup bahu,
       jadi lengan bawah kelihatan polos/telanjang. Sekarang
       ukurannya disamakan dengan panjang lengan tubuh supaya
       lengan tertutup penuh sampai pergelangan.)
       ======================================================== */

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


    /* ========================================================
       SHOULDER CONNECTOR (FIX: bola bahu duduk di TENGAH lengan,
       bukan di ATAS/puncak bahu — sama seperti fix di createTop())
       ------------------------------------------------------
       Sebelumnya connector ini ditaruh di y=2.72, nyaris sama
       dengan titik tengah capsule lengan panjang (yang
       membentang kira-kira dari y≈1.95 sampai y≈3.45 karena
       sleeve dress panjang sampai pergelangan). Karena posisinya
       di tengah, bola bahu ini kelihatan seperti benjolan di
       pertengahan lengan, bukan di puncak bahu.

       Fix: naikkan connector ke SHOULDER_Y (dekat puncak
       capsule lengan / titik pertemuan bodice-bahu yang
       sebenarnya, selaras dengan CONFIG.avatar.shoulderY
       ≈3.02), supaya menyatu di bahu, bukan di tengah lengan.
       Posisi X/Z dan radius tidak diubah — hanya Y yang naik.
       ======================================================== */

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
       NECKLINE
       ======================================================== */

    torus(
        dressRoot,
        .25,
        .045,
        [0, 3.30, .27],
        [Math.PI / 2, 0, 0],
        mat
    );
}


/* ============================================================
   19. JACKET
   ============================================================ */

function createJacket(item) {

    clearGroup(
        jacketRoot
    );

    if (!item) {
        return;
    }

    const color =
        state.colors[item.id] ||
        item.colors?.[0] ||
        "#24252d";

    const mat =
        item.type === "leather"
            ? leather(color)
            : fabric(color);


    /* ========================================================
       JACKET BODY
       ======================================================== */

    sphere(
        jacketRoot,

        [
            .83,
            .79,
            .64
        ],

        [
            0,
            2.70,
            .045
        ],

        mat
    );


    /* ========================================================
       JACKET SLEEVES
       ======================================================== */

    const left =
        capsule(
            jacketRoot,
            .245,
            .78,
            [-.82, 2.72, 0],
            mat
        );

    left.rotation.z =
        THREE.MathUtils.degToRad(7);


    const right =
        capsule(
            jacketRoot,
            .245,
            .78,
            [.82, 2.72, 0],
            mat
        );

    right.rotation.z =
        THREE.MathUtils.degToRad(-7);


    /* ========================================================
       SHOULDER CONNECTOR (NEW — FIX utama kasus "melayang"
       yang terlihat di screenshot: jaket terlihat seperti bola
       terpisah dari lengan saat dilihat dari samping/belakang)
       ------------------------------------------------------
       Titik pertemuan body jaket [0,2.70,.045] dan sleeve
       [-.82/.82, 2.72, 0] ditambal dengan sphere sedikit lebih
       besar (radius .29) karena sleeve jaket (.245) lebih tebal
       daripada sleeve top/dress, supaya overlap-nya tetap dalam
       ke kedua sisi.
       ======================================================== */

    shoulderConnector(
        jacketRoot,
        -.82,
        2.75,
        .05,
        mat,
        .29
    );

    shoulderConnector(
        jacketRoot,
        .82,
        2.75,
        .05,
        mat,
        .29
    );


    /* ========================================================
       LAPELS
       ======================================================== */

    if (
        item.type === "blazer" ||
        item.type === "trench"
    ) {

        const lapelMat =
            satin(color);

        const leftLapel =
            box(
                jacketRoot,
                [.16, .68, .055],
                [-.24, 3.02, .60],
                lapelMat
            );

        leftLapel.rotation.z =
            -.32;


        const rightLapel =
            box(
                jacketRoot,
                [.16, .68, .055],
                [.24, 3.02, .60],
                lapelMat
            );

        rightLapel.rotation.z =
            .32;
    }


    /* ========================================================
       CENTER ZIP / BUTTONS
       ======================================================== */

    if (
        item.type === "bomber" ||
        item.type === "leather" ||
        item.type === "denim"
    ) {

        box(
            jacketRoot,
            [.035, .66, .035],
            [0, 2.72, .69],
            metal(
                item.type === "leather"
                    ? "#c3a66a"
                    : "#e7e2d9"
            )
        );
    }


    for (
        let i = 0;
        i < 3;
        i++
    ) {

        sphere(
            jacketRoot,
            [.045, .045, .035],
            [
                0,
                2.98 - i * .22,
                .69
            ],
            metal(
                item.type === "blazer"
                    ? "#d3aa58"
                    : "#ece7df"
            ),
            16
        );
    }


    /* ========================================================
       CUFFS
       ======================================================== */

    cylinder(
        jacketRoot,
        .25,
        .25,
        .13,
        [-.85, 2.34, 0],
        mat
    );

    cylinder(
        jacketRoot,
        .25,
        .25,
        .13,
        [.85, 2.34, 0],
        mat
    );


    /* ========================================================
       TRENCH BELT
       ======================================================== */

    if (
        item.type === "trench"
    ) {

        box(
            jacketRoot,
            [1.15, .09, .68],
            [0, 2.35, .02],
            mat
        );
    }
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

        createDress(dress);

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
   28. ITEM SELECTION
   ============================================================ */

function selectItem(id) {

    const item =
        getItem(id);

    if (!item) {
        return;
    }


    if (
        item.gender &&
        item.gender !== state.gender
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
       NEW — JACKET & DRESS SALING MELEPAS
       ------------------------------------------------------
       Kalau user memakai jaket, dress yang sedang dipakai
       otomatis dilepas — dan sebaliknya, kalau user memakai
       dress, jaket yang sedang dipakai otomatis dilepas.
       Ini mencegah kombinasi jaket+dress yang tidak diinginkan
       (tumpang tindih siluet di area bahu/dada).
       ======================================================== */

    if (
        item.category === "jacket" &&
        state.selected.dress
    ) {

        delete state.selected.dress;
    }

    if (
        item.category === "dress" &&
        state.selected.jacket
    ) {

        delete state.selected.jacket;
    }


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

    if (
        gender !== "female" &&
        gender !== "male"
    ) {
        return;
    }


    state.gender =
        gender;


    /*
     * Hapus item khusus gender
     * jika tidak cocok.
     */

    Object.keys(
        state.selected
    ).forEach(
        category => {

            const item =
                getSelected(category);

            if (
                item &&
                item.gender &&
                item.gender !== gender
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

                if (
                    item.gender &&
                    item.gender !==
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


    const useDress =
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
        Math.random() > .55
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


    Object.values(
        state.selected
    ).forEach(
        id => {

            const item =
                getItem(id);

            if (item) {

                score +=
                    item.score;
            }
        }
    );


    /*
     * Bonus outfit lengkap.
     */

    const categories =
        new Set(
            Object.keys(
                state.selected
            )
        );


    if (
        categories.has("hair")
    ) {
        score += 5;
    }

    if (
        categories.has("shoes")
    ) {
        score += 5;
    }

    if (
        categories.has("bag")
    ) {
        score += 5;
    }

    if (
        categories.has("accessory")
    ) {
        score += 5;
    }


    /*
     * Outfit dengan dress + jacket
     * mendapat bonus styling.
     */

    if (
        categories.has("dress") &&
        categories.has("jacket")
    ) {

        score += 10;
    }


    return Math.min(
        100,
        score
    );
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

                if (
                    item.gender &&
                    item.gender !==
                    state.gender
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


            const delta =
                event.clientX -
                startX;


            state.targetRotation =
                startRotation +
                delta * .012;
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
   45. GENDER UI
   ============================================================ */

function updateGenderUI() {

    $all(
        "[data-fashion-gender], [data-gender]"
    ).forEach(
        button => {

            const gender =
                button.dataset
                    .fashionGender ||
                button.dataset
                    .gender;


            button.classList.toggle(
                "active",
                gender ===
                state.gender
            );
        }
    );
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
   47. SUBMIT
   ------------------------------------------------------------
   Setelah submit berhasil, user diberi tahu bahwa dia juga
   bisa menyimpan hasil desainnya sebagai PNG (download langsung)
   atau sebagai Sketch (tersimpan di galeri dengan thumbnail).
   ============================================================ */

   function submitDesign() {

    const score =
        calculateScore();

    state.points += score;

    state.money +=
        Math.round(
            score * .5
        );

    state.combo += 1;

    if(score >= 75){

        state.level =
            Math.max(
                state.level,
                2
            );
    }

    if(
        state.challengeActive
    ){

        finishChallenge();
    }

    updateAllUI();

    saveTemporaryState();

    showToast(
        "✨",
        "Design submitted!"
    );
}

/* ============================================================
   48. SAVE
   ============================================================ */

function saveOutfit() {

    const outfit = {

        name:
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
            calculateScore(),

        createdAt:
            Date.now()
    };


    const saved =
        JSON.parse(
            localStorage.getItem(
                "naylaFashionSaved"
            ) ||
            "[]"
        );


    saved.push(
        outfit
    );


    while (
        saved.length > 12
    ) {

        saved.shift();
    }


    localStorage.setItem(
        "naylaFashionSaved",
        JSON.stringify(
            saved
        )
    );


    showToast(
        "💾",
        "Outfit berhasil disimpan"
    );
}


/* ============================================================
   49. CHALLENGE
   ============================================================ */

function startChallenge() {

    const challenges = [

        {
            name:
                "Elegant Evening",

            description:
                "Create a luxury evening outfit.",

            required:
                [
                    "dress",
                    "shoes",
                    "accessory"
                ]
        },

        {
            name:
                "Atelier Street",

            description:
                "Modern street fashion with layered styling.",

            required:
                [
                    "top",
                    "bottom",
                    "jacket",
                    "shoes"
                ]
        },

        {
            name:
                "Runway Muse",

            description:
                "High-fashion runway inspired look.",

            required:
                [
                    "dress",
                    "hat",
                    "bag",
                    "shoes"
                ]
        },

        {
            name:
                "Classic Designer",

            description:
                "Classic designer outfit with balanced styling.",

            required:
                [
                    "top",
                    "bottom",
                    "jacket",
                    "accessory"
                ]
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

function beginChallenge() {

    closeChallengeModal();

    state.challenge =
        state.pendingChallenge;

    state.challengeTime = 90;

    document.getElementById(
        "fashionChallengePanel"
    ).hidden = false;

    updateChallengeUI();

    updateTimerUI();

    showToast(
        "🎯",
        `${state.challenge.name} Started!`
    );

    if (
        state.challengeTimer
    ) {

        clearInterval(
            state.challengeTimer
        );
    }

    state.challengeTimer =
        setInterval(() => {

            state.challengeTime--;

            updateTimerUI();

            if (
                state.challengeTime <= 0
            ) {

                clearInterval(
                    state.challengeTimer
                );

                showToast(
                    "⌛",
                    "Challenge Finished"
                );
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

    if (match) {

        match.textContent =
            percent + "%";
    }

    if (fill) {

        fill.style.width =
            percent + "%";
    }
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

function finishChallenge() {

    if (!state.challenge) {
        return;
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

    let medal = "🥉 Bronze";

    if (percent >= 70) {

        medal = "🥈 Silver";
    }

    if (percent >= 100) {

        medal = "🥇 Gold";
    }

    showToast(
        "🏆",
        `Challenge Complete! ${medal}`
    );

    const resultModal =
        document.getElementById(
            "fashionResultModal"
        );

    if (resultModal) {

        resultModal.style.display =
            "flex";

        resultModal.setAttribute(
            "aria-hidden",
            "false"
        );
    }

    const title =
        document.getElementById(
            "fashionResultTitle"
        );

    if (title) {

        title.textContent =
            medal;
    }

    const desc =
        document.getElementById(
            "fashionResultDescription"
        );

    if (desc) {

        desc.textContent =
            `Challenge Score ${percent}%`;
    }
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

    updateGenderUI();

    updateCategoryButtons();

    updateScore();

    updateStats();

    updateChallengeUI();

    updateWardrobeCount();
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

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 700;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // NEW: di layar sempit (HP), mundurkan kamera default sedikit
    // supaya avatar full-body tidak terpotong.
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

    console.log("OPEN MODAL");
    console.log(challenge);

    const modal =
        document.getElementById(
            "fashionChallengeModal"
        );

    console.log("MODAL =", modal);

    const preview =
        document.getElementById(
            "challengePreview"
        );

    console.log("PREVIEW =", preview);

    if (!modal || !preview) {
        console.error(
            "Challenge modal element not found"
        );
        return;
    }

    preview.innerHTML = `
        <h3>${challenge.name}</h3>
        <p>${challenge.description}</p>
    `;

    modal.classList.add("show");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );
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

    const material = fabricMaterial(
        "white",
        0.82
    );


    /* -----------------------------------------------------
       FEMALE / MALE SAFE COVERAGE
       ----------------------------------------------------- */

    const gender =
        state?.gender ||
        "female";


    /* -----------------------------------------------------
       LOWER COVERAGE
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


    /* -----------------------------------------------------
       FEMALE CHEST COVERAGE
       ----------------------------------------------------- */

    if (gender === "female") {

        const chest = new THREE.Mesh(

            new THREE.SphereGeometry(
                0.72,
                32,
                24
            ),

            material
        );

        chest.position.set(
            0,
            2.55,
            0.02
        );

        chest.scale.set(
            0.98,
            0.82,
            0.70
        );

        chest.castShadow = true;
        chest.receiveShadow = true;

        bodyRoot.add(chest);

    }

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


/* ============================================================
   END
   ============================================================ */