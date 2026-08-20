/* =========================================================
   AI EXPERIENCE
   Nayla Seijin Shiki
   FINAL CLEAN VERSION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("=================================");
    console.log("AI EXPERIENCE INITIALIZED");
    console.log("=================================");


    /* =====================================================
       ELEMENTS - AI
    ===================================================== */

    const toolCards =
        document.querySelectorAll(".ai-tool-card");

    const workspace =
        document.getElementById("aiWorkspace");

    const closeButton =
        document.getElementById("closeAI");

    const modeLabel =
        document.getElementById("aiModeLabel");

    const workspaceTitle =
        document.getElementById("aiWorkspaceTitle");

    const workspaceDescription =
        document.getElementById("aiWorkspaceDescription");

    const nameInput =
        document.getElementById("aiName");

    const promptInput =
        document.getElementById("aiPrompt");

    const styleSelect =
        document.getElementById("aiStyle");

    const generateButton =
        document.getElementById("generateAI");

    const loading =
        document.getElementById("aiLoading");

    const errorBox =
        document.getElementById("aiError");

    const result =
        document.getElementById("aiResult");

    const resultPlaceholder =
        document.getElementById("aiResultPlaceholder");

    const generatedContainer =
        document.getElementById("aiGeneratedContainer");

    const generatedText =
        document.getElementById("aiGeneratedText");

    const resultMode =
        document.getElementById("aiResultMode");

    const actions =
        document.getElementById("aiActions");

    const copyButton =
        document.getElementById("copyAI");

    const regenerateButton =
        document.getElementById("regenerateAI");

    const guestbookButton =
        document.getElementById("useGuestbook");

    const charCount =
        document.getElementById("aiCharCount");

    const toast =
        document.getElementById("aiToast");


    /* =====================================================
       REQUIRED ELEMENT CHECK
    ===================================================== */

    if (!workspace) {

        console.warn(
            "AI workspace not found."
        );

        return;

    }


    if (!generateButton) {

        console.warn(
            "Generate button not found."
        );

        return;

    }


    if (!promptInput) {

        console.warn(
            "AI prompt input not found."
        );

        return;

    }


    /* =====================================================
       AI STATE
    ===================================================== */

    let currentMode = "wish";

    let lastRequest = null;

    let lastGeneratedMessage = "";

    let isGenerating = false;

    let isSendingGuestbook = false;

    let typingTimer = null;


    /* =====================================================
       MODE CONFIG
    ===================================================== */

    const modes = {

        wish: {

            label:
                "🌸 AI WISH GENERATOR",

            title:
                "Create Your Wish",

            description:
                "Create a beautiful birthday or Seijin Shiki wish for Nayla.",

            placeholder:
                "Example: I want to wish Nayla happiness and success in her new chapter...",

            resultLabel:
                "🌸 Wish Generated"

        },


        enhance: {

            label:
                "✨ MESSAGE ENHANCER",

            title:
                "Enhance Your Message",

            description:
                "Turn your simple thoughts into a more heartfelt message for Nayla.",

            placeholder:
                "Write your simple message here and let AI make it more meaningful...",

            resultLabel:
                "✨ Message Enhanced"

        },


        fortune: {

            label:
                "🎋 SEIJIN MESSAGE",

            title:
                "Receive a Seijin Message",

            description:
                "Create a meaningful message about growth, adulthood and new beginnings.",

            placeholder:
                "Write what kind of message about adulthood or new beginnings you want...",

            resultLabel:
                "🎋 Seijin Message"

        },


        letter: {

            label:
                "💌 LETTER GENERATOR",

            title:
                "Write a Letter for Nayla",

            description:
                "Create a longer and more personal letter for Nayla's Seijin Shiki.",

            placeholder:
                "Write your thoughts, memories, gratitude, or wishes for Nayla...",

            resultLabel:
                "💌 Letter Generated"

        },


        trivia: {

            label:
                "🤖 NAYLA TRIVIA MASTER",

            title:
                "Nayla Trivia Master",

            description:
                "Test your knowledge about Nayla and see how far you can climb.",

            placeholder:
                "",

            resultLabel:
                "Trivia Battle"

        }

    };


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(message) {

        if (!toast) {
            return;
        }

        toast.textContent =
            message;

        toast.classList.add(
            "show"
        );

        clearTimeout(
            toast._timer
        );

        toast._timer =
            setTimeout(() => {

                toast.classList.remove(
                    "show"
                );

            }, 2500);

    }


    /* =====================================================
       ERROR
    ===================================================== */

    function showError(message) {

        console.error(
            "AI ERROR:",
            message
        );

        if (!errorBox) {

            alert(message);

            return;

        }

        errorBox.textContent =
            "⚠️ " + message;

        errorBox.style.display =
            "block";

        errorBox.classList.remove(
            "ai-error-show"
        );

        requestAnimationFrame(() => {

            errorBox.classList.add(
                "ai-error-show"
            );

        });

    }


    function hideError() {

        if (!errorBox) {
            return;
        }

        errorBox.classList.remove(
            "ai-error-show"
        );

        errorBox.style.display =
            "none";

        errorBox.textContent =
            "";

    }


    /* =====================================================
       RESULT RESET
    ===================================================== */

    function resetResult() {

        clearInterval(
            typingTimer
        );

        lastGeneratedMessage =
            "";

        if (resultPlaceholder) {

            resultPlaceholder.style.display =
                "flex";

        }

        if (generatedContainer) {

            generatedContainer.style.display =
                "none";

        }

        if (generatedText) {

            generatedText.textContent =
                "";

            generatedText.classList.remove(
                "typing"
            );

        }

        if (actions) {

            actions.classList.remove(
                "show"
            );

        }

        if (resultMode) {

            resultMode.textContent =
                "AI Generated";

        }

    }


    /* =====================================================
       WORKSPACE RESET
    ===================================================== */

    function resetWorkspace() {

        resetResult();

        hideError();

        if (loading) {

            loading.style.display =
                "none";

        }

        if (promptInput) {

            promptInput.value =
                "";

        }

        if (charCount) {

            charCount.textContent =
                "0";

            charCount.classList.remove(
                "warning"
            );

        }

        lastRequest =
            null;

    }


    /* =====================================================
       GENERATING STATE
    ===================================================== */

    function setGeneratingState(
        generating
    ) {

        isGenerating =
            generating;

        generateButton.disabled =
            generating;

        if (regenerateButton) {

            regenerateButton.disabled =
                generating;

        }

        if (guestbookButton) {

            guestbookButton.disabled =
                generating;

        }

        if (generating) {

            generateButton.innerHTML =
                `
                <span class="ai-button-spinner"></span>
                Writing something special...
                `;

        } else {

            generateButton.innerHTML =
                "✨ Generate";

        }

    }


    /* =====================================================
       TYPING EFFECT
    ===================================================== */

    function typeResult(text) {

        if (!generatedText) {
            return;
        }

        clearInterval(
            typingTimer
        );

        generatedText.textContent =
            "";

        let index = 0;

        const speed =
            text.length > 800
                ? 5
                : 12;

        generatedText.classList.add(
            "typing"
        );

        typingTimer =
            setInterval(() => {

                if (index >= text.length) {

                    clearInterval(
                        typingTimer
                    );

                    generatedText.classList.remove(
                        "typing"
                    );

                    lastGeneratedMessage =
                        text;

                    return;

                }

                generatedText.textContent +=
                    text[index];

                index++;

            }, speed);

    }


    /* =====================================================
       SHOW RESULT
    ===================================================== */

    function showResult(message) {

        if (!generatedContainer) {
            return;
        }

        if (resultPlaceholder) {

            resultPlaceholder.style.display =
                "none";

        }

        generatedContainer.style.display =
            "block";

        if (actions) {

            actions.classList.remove(
                "show"
            );

        }

        lastGeneratedMessage =
            message;

        typeResult(
            message
        );

        const delay =
            Math.min(
                message.length * 12 + 300,
                5000
            );

        setTimeout(() => {

            if (actions) {

                actions.classList.add(
                    "show"
                );

            }

        }, delay);

    }


    /* =====================================================
       TOOL CARDS
    ===================================================== */

    toolCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const mode =
                    card.dataset.aiMode;

                if (
                    !mode ||
                    !modes[mode]
                ) {

                    console.error(
                        "Unknown AI mode:",
                        mode
                    );

                    return;

                }

                currentMode =
                    mode;


                /* =============================================
                   TRIVIA
                ============================================= */

                if (mode === "trivia") {

                    workspace.classList.remove(
                        "active"
                    );

                    if (triviaWorkspace) {

                        triviaWorkspace.classList.add(
                            "active"
                        );

                        if (triviaStart) {

                            triviaStart.style.display =
                                "block";

                        }

                        if (triviaGame) {

                            triviaGame.style.display =
                                "none";

                        }

                        if (triviaResult) {

                            triviaResult.style.display =
                                "none";

                        }

                        setTimeout(() => {

                            triviaWorkspace.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });

                        }, 100);

                    }

                    toolCards.forEach(item => {

                        item.classList.remove(
                            "active"
                        );

                    });

                    card.classList.add(
                        "active"
                    );

                    return;

                }


                /* =============================================
                   NORMAL AI WORKSPACE
                ============================================= */

                const config =
                    modes[mode];

                if (!config) {
                    return;
                }

                if (triviaWorkspace) {

                    triviaWorkspace.classList.remove(
                        "active"
                    );

                }

                workspace.classList.add(
                    "active"
                );

                if (modeLabel) {

                    modeLabel.textContent =
                        config.label;

                }

                if (workspaceTitle) {

                    workspaceTitle.textContent =
                        config.title;

                }

                if (workspaceDescription) {

                    workspaceDescription.textContent =
                        config.description;

                }

                if (promptInput) {

                    promptInput.placeholder =
                        config.placeholder;

                }

                if (resultMode) {

                    resultMode.textContent =
                        config.resultLabel;

                }

                resetWorkspace();

                toolCards.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });

                card.classList.add(
                    "active"
                );

                workspace.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       CLOSE AI
    ===================================================== */

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            () => {

                workspace.classList.remove(
                    "active"
                );

                if (triviaWorkspace) {

                    triviaWorkspace.classList.remove(
                        "active"
                    );

                }

                toolCards.forEach(card => {

                    card.classList.remove(
                        "active"
                    );

                });

                resetWorkspace();

            }
        );

    }


    /* =====================================================
       CHARACTER COUNT
    ===================================================== */

    if (promptInput) {

        promptInput.addEventListener(
            "input",
            () => {

                const length =
                    promptInput.value.length;

                if (charCount) {

                    charCount.textContent =
                        String(length);

                    if (length >= 900) {

                        charCount.classList.add(
                            "warning"
                        );

                    } else {

                        charCount.classList.remove(
                            "warning"
                        );

                    }

                }

            }
        );

    }


    /* =====================================================
       AI GENERATION
    ===================================================== */

    async function generateAI() {

        if (isGenerating) {
            return;
        }

        hideError();

        const prompt =
            promptInput
                ? promptInput.value.trim()
                : "";

        const name =
            nameInput
                ? nameInput.value.trim()
                : "";

        const style =
            styleSelect
                ? styleSelect.value
                : "warm";


        if (!prompt) {

            showError(
                "Please write something first."
            );

            if (promptInput) {
                promptInput.focus();
            }

            return;

        }


        if (prompt.length > 1200) {

            showError(
                "Your message is too long. Please keep it under 1200 characters."
            );

            return;

        }


        const language =
            localStorage.getItem(
                "language"
            ) ||
            localStorage.getItem(
                "selectedLanguage"
            ) ||
            document.documentElement.lang ||
            "en";


        lastRequest = {

            mode:
                currentMode,

            prompt:
                prompt,

            name:
                name,

            style:
                style,

            language:
                language

        };


        setGeneratingState(
            true
        );


        if (loading) {

            loading.style.display =
                "flex";

        }


        try {

            const response =
                await fetch(
                    "/api/ai/generate",
                    {

                        method:
                            "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Accept":
                                "application/json"

                        },

                        body:
                            JSON.stringify({

                                mode:
                                    currentMode,

                                prompt:
                                    prompt,

                                name:
                                    name,

                                style:
                                    style,

                                language:
                                    language

                            })

                    }
                );


            let data;

            try {

                data =
                    await response.json();

            } catch {

                throw new Error(
                    "Server returned an invalid response."
                );

            }


            if (
                !response.ok ||
                !data.success
            ) {

                throw new Error(
                    data.error ||
                    "Unable to generate AI message."
                );

            }


            const message =
                data.message ||
                data.result ||
                data.text ||
                "";


            if (!message) {

                throw new Error(
                    "AI returned an empty response."
                );

            }


            if (loading) {

                loading.style.display =
                    "none";

            }

            showResult(
                message
            );

            showToast(
                "✨ Your message is ready!"
            );

        }
        catch (error) {

            console.error(
                "AI generation failed:",
                error
            );

            if (loading) {

                loading.style.display =
                    "none";

            }

            showError(
                error.message ||
                "Something went wrong while generating your message."
            );

        }
        finally {

            setGeneratingState(
                false
            );

        }

    }


    /* =====================================================
       GENERATE BUTTON
    ===================================================== */

    generateButton.addEventListener(
        "click",
        generateAI
    );


    /* =====================================================
       COPY RESULT
    ===================================================== */

    if (copyButton) {

        copyButton.addEventListener(
            "click",
            async () => {

                const text =
                    lastGeneratedMessage ||
                    (
                        generatedText
                            ? generatedText.textContent
                            : ""
                    );


                if (!text) {

                    showError(
                        "There is nothing to copy yet."
                    );

                    return;

                }


                try {

                    await navigator.clipboard.writeText(
                        text
                    );

                    showToast(
                        "📋 Copied to clipboard!"
                    );

                }
                catch {

                    const textarea =
                        document.createElement(
                            "textarea"
                        );

                    textarea.value =
                        text;

                    textarea.style.position =
                        "fixed";

                    textarea.style.opacity =
                        "0";

                    document.body.appendChild(
                        textarea
                    );

                    textarea.select();

                    try {

                        document.execCommand(
                            "copy"
                        );

                        showToast(
                            "📋 Copied to clipboard!"
                        );

                    }
                    catch {

                        showError(
                            "Unable to copy the message."
                        );

                    }

                    textarea.remove();

                }

            }
        );

    }


    /* =====================================================
       REGENERATE
    ===================================================== */

    if (regenerateButton) {

        regenerateButton.addEventListener(
            "click",
            () => {

                if (!lastRequest) {

                    showError(
                        "There is no previous request to regenerate."
                    );

                    return;

                }

                if (promptInput) {

                    promptInput.value =
                        lastRequest.prompt;

                }

                generateAI();

            }
        );

    }


    /* =====================================================
       USE GUESTBOOK
    ===================================================== */

    if (guestbookButton) {

        guestbookButton.addEventListener(
            "click",
            async () => {

                if (
                    isSendingGuestbook ||
                    !lastGeneratedMessage
                ) {

                    return;

                }

                isSendingGuestbook =
                    true;

                guestbookButton.disabled =
                    true;


                try {

                    const response =
                        await fetch(
                            "/api/guestbook",
                            {

                                method:
                                    "POST",

                                headers: {

                                    "Content-Type":
                                        "application/json",

                                    "Accept":
                                        "application/json"

                                },

                                body:
                                    JSON.stringify({

                                        message:
                                            lastGeneratedMessage,

                                        source:
                                            "ai"

                                    })

                            }
                        );


                    let data;

                    try {

                        data =
                            await response.json();

                    }
                    catch {

                        data = {};

                    }


                    if (
                        !response.ok ||
                        data.success === false
                    ) {

                        throw new Error(
                            data.error ||
                            "Unable to send the message to Guestbook."
                        );

                    }


                    showToast(
                        "💌 Message sent to Guestbook!"
                    );

                }
                catch (error) {

                    console.error(
                        "Guestbook error:",
                        error
                    );

                    showError(
                        error.message ||
                        "Unable to send the message to Guestbook."
                    );

                }
                finally {

                    isSendingGuestbook =
                        false;

                    guestbookButton.disabled =
                        false;

                }

            }
        );

    }


    /* =====================================================
       TRIVIA ELEMENTS
    ===================================================== */

    const triviaWorkspace =
        document.getElementById(
            "triviaWorkspace"
        );

    const triviaStart =
        document.getElementById(
            "triviaStart"
        );

    const triviaGame =
        document.getElementById(
            "triviaGame"
        );

    const triviaResult =
        document.getElementById(
            "triviaResult"
        );

    const startTriviaButton =
        document.getElementById(
            "startTrivia"
        );

    const closeTriviaButton =
        document.getElementById(
            "closeTrivia"
        );

    const restartTriviaButton =
        document.getElementById(
            "restartTrivia"
        );

    const triviaQuestion =
        document.getElementById(
            "triviaQuestion"
        );

    const triviaAnswers =
        document.getElementById(
            "triviaAnswers"
        );

    const triviaFeedback =
        document.getElementById(
            "triviaFeedback"
        );

    const nextTriviaButton =
        document.getElementById(
            "nextTrivia"
        );

    const triviaScoreElement =
        document.getElementById(
            "triviaScore"
        );

    const triviaQuestionNumber =
        document.getElementById(
            "triviaQuestionNumber"
        );

    const triviaDifficulty =
        document.getElementById(
            "triviaDifficulty"
        );

    const triviaProgressBar =
        document.getElementById(
            "triviaProgressBar"
        );

    const triviaFinalScore =
        document.getElementById(
            "triviaFinalScore"
        );

    const triviaFinalTitle =
        document.getElementById(
            "triviaFinalTitle"
        );

    const triviaFinalMessage =
        document.getElementById(
            "triviaFinalMessage"
        );

    const triviaRank =
        document.getElementById(
            "triviaRank"
        );

    const triviaRankIcon =
        document.getElementById(
            "triviaRankIcon"
        );

    const triviaRankTitle =
        document.getElementById(
            "triviaRankTitle"
        );

    const triviaRankDescription =
        document.getElementById(
            "triviaRankDescription"
        );

    const triviaAchievements =
        document.getElementById(
            "triviaAchievements"
        );

    const triviaAchievementList =
        document.getElementById(
            "triviaAchievementList"
        );

    const naylaMemory =
        document.getElementById(
            "naylaMemory"
        );

    const naylaMemoryList =
        document.getElementById(
            "naylaMemoryList"
        );


    /* =====================================================
       TRIVIA STATE
       GLOBAL SHARED STATE
    ===================================================== */

    let triviaState = {

        active:
            false,

        questionIndex:
            0,

        score:
            0,

        correct:
            0,

        difficulty:
            "easy",

        questions:
            [],

        currentQuestion:
            null,

        answered:
            false,

        answeredQuestions:
            []

    };


    /*
     * IMPORTANT
     *
     * The AI translation system lives inside another
     * DOMContentLoaded scope.
     *
     * Therefore triviaState must also be available
     * globally.
     */

    window.triviaState =
        triviaState;


    /* =====================================================
       TRIVIA DIFFICULTY
    ===================================================== */

    function getTriviaDifficulty() {

        const score =
            triviaState.correct;


        if (score >= 4) {

            return "expert";

        }


        if (score >= 3) {

            return "hard";

        }


        if (score >= 2) {

            return "normal";

        }


        return "easy";

    }


    /* =====================================================
       RESET TRIVIA UI
    ===================================================== */

    function resetTriviaUI() {

        if (triviaFeedback) {

            triviaFeedback.style.display =
                "none";

            triviaFeedback.textContent =
                "";

            triviaFeedback.innerHTML =
                "";

        }


        if (triviaAnswers) {

            triviaAnswers.innerHTML =
                "";

        }


        if (nextTriviaButton) {

            nextTriviaButton.style.display =
                "none";

            nextTriviaButton.disabled =
                true;

        }


        if (triviaQuestionNumber) {

            triviaQuestionNumber.textContent =
                "1 / 5";

        }


        if (triviaScoreElement) {

            triviaScoreElement.textContent =
                "0";

        }


        if (triviaDifficulty) {

            triviaDifficulty.textContent =
                "Easy";

        }


        if (triviaProgressBar) {

            triviaProgressBar.style.width =
                "0%";

        }


        if (triviaQuestion) {

            triviaQuestion.textContent =
                "I have a question for you...";

        }

    }


    /* =====================================================
       START TRIVIA
    ===================================================== */

    async function startTrivia() {

        if (!triviaWorkspace) {
            return;
        }


        /* =============================================
           HARD RESET STATE
        ============================================= */

        Object.assign(
            triviaState,
            {

                active:
                    true,

                questionIndex:
                    0,

                score:
                    0,

                correct:
                    0,

                difficulty:
                    "easy",

                questions:
                    [],

                currentQuestion:
                    null,

                answered:
                    false,

                answeredQuestions:
                    []

            }
        );


        window.triviaState =
            triviaState;


        const language =
            localStorage.getItem(
                "language"
            ) ||
            localStorage.getItem(
                "selectedLanguage"
            ) ||
            localStorage.getItem(
                "currentLanguage"
            ) ||
            localStorage.getItem(
                "lang"
            ) ||
            document.documentElement.lang ||
            "en";


        if (triviaStart) {

            triviaStart.style.display =
                "none";

        }


        if (triviaResult) {

            triviaResult.style.display =
                "none";

        }


        if (triviaGame) {

            triviaGame.style.display =
                "block";

        }


        resetTriviaUI();


        try {

            const response =
                await fetch(
                    "/api/ai/trivia/start",
                    {

                        method:
                            "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Accept":
                                "application/json"

                        },

                        body:
                            JSON.stringify({

                                difficulty:
                                    "easy",

                                question_count:
                                    5,

                                language:
                                    language

                            })

                    }
                );


            let data;

            try {

                data =
                    await response.json();

            }
            catch {

                throw new Error(
                    "Server returned an invalid trivia response."
                );

            }


            if (
                !response.ok ||
                !data.success
            ) {

                throw new Error(
                    data.error ||
                    "Unable to start trivia."
                );

            }


            const questions =
                Array.isArray(
                    data.questions
                )
                    ? data.questions
                    : [];


            if (!questions.length) {

                throw new Error(
                    "No trivia questions were returned."
                );

            }


            triviaState.questions =
                questions;


            triviaState.questionIndex =
                0;


            triviaState.difficulty =
                "easy";


            renderTriviaQuestion();


        }
        catch (error) {

            console.error(
                "Trivia start failed:",
                error
            );


            triviaState.active =
                false;


            if (triviaStart) {

                triviaStart.style.display =
                    "block";

            }


            if (triviaGame) {

                triviaGame.style.display =
                    "none";

            }


            showError(
                error.message ||
                "Unable to start trivia."
            );

        }

    }
    /* =========================================================
   PART 2 / 10
   TRIVIA ENGINE
========================================================= */


/* =====================================================
   RENDER TRIVIA QUESTION
===================================================== */

function renderTriviaQuestion() {

    const question =
        triviaState.questions[
            triviaState.questionIndex
        ];


    /* =================================================
       NO QUESTION
    ================================================= */

    if (!question) {

        finishTrivia();

        return;

    }


    /* =================================================
       VALIDATE QUESTION
    ================================================= */

    if (
        typeof question.question !== "string" ||
        !question.question.trim()
    ) {

        console.error(
            "Invalid trivia question:",
            question
        );

        showToast(
            "⚠️ Trivia question is invalid."
        );

        return;

    }


    /* =================================================
       SAVE CURRENT QUESTION
    ================================================= */

    triviaState.currentQuestion =
        question;

    triviaState.answered =
        false;

    triviaState.difficulty =
        getTriviaDifficulty();


    /* =================================================
       QUESTION NUMBER
    ================================================= */

    if (triviaQuestionNumber) {

        triviaQuestionNumber.textContent =
            `${triviaState.questionIndex + 1} / ${triviaState.questions.length}`;

    }


    /* =================================================
       DIFFICULTY
    ================================================= */

    if (triviaDifficulty) {

        triviaDifficulty.textContent =
            triviaState.difficulty.toUpperCase();

    }


    /* =================================================
       SCORE
    ================================================= */

    if (triviaScoreElement) {

        triviaScoreElement.textContent =
            triviaState.score;

    }


    /* =================================================
       PROGRESS
    ================================================= */

    if (triviaProgressBar) {

        const total =
            triviaState.questions.length;


        const current =
            triviaState.questionIndex;


        const progress =
            total > 0
                ? (current / total) * 100
                : 0;


        triviaProgressBar.style.width =
            `${progress}%`;

    }


    /* =================================================
       QUESTION TEXT
       
       IMPORTANT:
       Do NOT call getTranslation() here.
       
       The question comes directly from the backend
       according to the currently selected language.
    ================================================= */

    if (triviaQuestion) {

        triviaQuestion.textContent =
            question.question;

    }


    /* =================================================
       CLEAR OLD ANSWERS
    ================================================= */

    if (triviaAnswers) {

        triviaAnswers.innerHTML =
            "";

    }


    /* =================================================
       CLEAR FEEDBACK
    ================================================= */

    if (triviaFeedback) {

        triviaFeedback.style.display =
            "none";

        triviaFeedback.textContent =
            "";

        triviaFeedback.innerHTML =
            "";

    }


    /* =================================================
       HIDE NEXT BUTTON
    ================================================= */

    if (nextTriviaButton) {

        nextTriviaButton.style.display =
            "none";

        nextTriviaButton.disabled =
            true;

    }


    /* =================================================
       OPTIONS
    ================================================= */

    const options =
        Array.isArray(
            question.options
        )
            ? question.options
            : [];


    if (
        options.length === 0
    ) {

        console.error(
            "Trivia question has no options:",
            question
        );

        showToast(
            "⚠️ No answer choices available."
        );

        return;

    }


    /* =================================================
       CREATE ANSWER BUTTONS
    ================================================= */

    options.forEach(
        (option, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "trivia-answer";


            button.dataset.answer =
                option;


            /* -----------------------------------------
               ANSWER LETTER
            ----------------------------------------- */

            const letter =
                String.fromCharCode(
                    65 + index
                );


            button.innerHTML =
                `
                <span class="trivia-answer-letter">
                    ${letter}
                </span>

                <span class="trivia-answer-text">
                    ${escapeHtml(option)}
                </span>
                `;


            /* -----------------------------------------
               CLICK
            ----------------------------------------- */

            button.addEventListener(
                "click",
                () => {

                    answerTrivia(
                        option,
                        button
                    );

                }
            );


            if (triviaAnswers) {

                triviaAnswers.appendChild(
                    button
                );

            }

        }
    );

}


/* =====================================================
   HTML ESCAPE
===================================================== */

function escapeHtml(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =====================================================
   ANSWER TRIVIA
===================================================== */

async function answerTrivia(
    answer,
    selectedButton
) {

    /* =================================================
       SAFETY
    ================================================= */

    if (
        !triviaState.active ||
        triviaState.answered ||
        !triviaState.currentQuestion
    ) {

        return;

    }


    triviaState.answered =
        true;


    /* =================================================
       DISABLE ALL ANSWERS
    ================================================= */

    const buttons =
        triviaAnswers
            ? triviaAnswers.querySelectorAll(
                ".trivia-answer"
            )
            : [];


    buttons.forEach(
        button => {

            button.disabled =
                true;

        }
    );


    if (selectedButton) {

        selectedButton.classList.add(
            "selected"
        );

    }


    /* =================================================
       CHECK ANSWER
    ================================================= */

    try {

        const response =
            await fetch(
                "/api/ai/trivia/answer",
                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Accept":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            question:
                                triviaState.currentQuestion.question,

                            correct_answer:
                                triviaState.currentQuestion.correct_answer,

                            user_answer:
                                answer,

                            difficulty:
                                triviaState.difficulty

                        })

                }
            );


        let data;

        try {

            data =
                await response.json();

        }
        catch {

            throw new Error(
                "Server returned an invalid trivia response."
            );

        }


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.error ||
                "Unable to check the answer."
            );

        }


        const correct =
            data.correct === true;


        /* =================================================
           RECORD ANSWER
        ================================================= */

        triviaState.answeredQuestions.push({

            question:
                triviaState.currentQuestion.question,

            answer:
                answer,

            correctAnswer:
                triviaState.currentQuestion.correct_answer,

            correct:
                correct,

            category:
                triviaState.currentQuestion.category ||
                data.category ||
                "",

            difficulty:
                triviaState.difficulty

        });


        /* =================================================
           CORRECT ANSWER
        ================================================= */

        if (correct) {

            triviaState.correct++;


            triviaState.score +=
                Number(
                    data.points
                ) || 100;


            if (selectedButton) {

                selectedButton.classList.add(
                    "correct"
                );

            }


            if (triviaFeedback) {

                triviaFeedback.innerHTML =
                    `
                    <strong>
                        Correct! 🔥
                    </strong>

                    <span>
                        ${escapeHtml(
                            data.explanation ||
                            "You know Nayla well!"
                        )}
                    </span>
                    `;

            }

        }


        /* =================================================
           WRONG ANSWER
        ================================================= */

        else {

            if (selectedButton) {

                selectedButton.classList.add(
                    "wrong"
                );

            }


            /* ---------------------------------------------
               HIGHLIGHT CORRECT ANSWER
            --------------------------------------------- */

            buttons.forEach(
                button => {

                    if (
                        button.dataset.answer ===
                        triviaState.currentQuestion.correct_answer
                    ) {

                        button.classList.add(
                            "correct"
                        );

                    }

                }
            );


            if (triviaFeedback) {

                triviaFeedback.innerHTML =
                    `
                    <strong>
                        Not quite! 🌸
                    </strong>

                    <span>
                        Correct answer:
                        ${escapeHtml(
                            triviaState.currentQuestion.correct_answer
                        )}
                    </span>

                    <span>
                        ${escapeHtml(
                            data.explanation ||
                            ""
                        )}
                    </span>
                    `;

            }

        }


        /* =================================================
           UPDATE SCORE
        ================================================= */

        if (triviaScoreElement) {

            triviaScoreElement.textContent =
                triviaState.score;

        }


        /* =================================================
           UPDATE DIFFICULTY
        ================================================= */

        triviaState.difficulty =
            getTriviaDifficulty();


        if (triviaDifficulty) {

            triviaDifficulty.textContent =
                triviaState.difficulty.toUpperCase();

        }


        /* =================================================
           SHOW FEEDBACK
        ================================================= */

        if (triviaFeedback) {

            triviaFeedback.style.display =
                "flex";

        }


        /* =================================================
           NEXT BUTTON
        ================================================= */

        if (nextTriviaButton) {

            nextTriviaButton.style.display =
                "block";

            nextTriviaButton.disabled =
                false;

        }


        /*
         * Save progress in session.
         */

        saveTriviaProgress();

    }


    catch (error) {

        console.error(
            "TRIVIA ANSWER ERROR:",
            error
        );


        triviaState.answered =
            false;


        buttons.forEach(
            button => {

                button.disabled =
                    false;

            }
        );


        if (selectedButton) {

            selectedButton.classList.remove(
                "selected"
            );

        }


        showToast(
            error.message ||
            "Unable to check the answer."
        );

    }

}


/* =====================================================
   SAVE TRIVIA PROGRESS
===================================================== */

function saveTriviaProgress() {

    try {

        const state = {

            active:
                triviaState.active,

            questionIndex:
                triviaState.questionIndex,

            score:
                triviaState.score,

            correct:
                triviaState.correct,

            difficulty:
                triviaState.difficulty,

            answered:
                triviaState.answered

        };


        sessionStorage.setItem(
            "naylaTriviaProgress",
            JSON.stringify(
                state
            )
        );

    }
    catch (error) {

        console.warn(
            "Unable to save trivia progress:",
            error
        );

    }

}


/* =====================================================
   NEXT TRIVIA QUESTION
===================================================== */

if (nextTriviaButton) {

    nextTriviaButton.addEventListener(
        "click",
        () => {

            if (
                !triviaState.active ||
                !triviaState.answered
            ) {

                return;

            }


            nextTriviaButton.disabled =
                true;


            nextTriviaButton.style.display =
                "none";


            /* -----------------------------------------
               MOVE TO NEXT QUESTION
            ----------------------------------------- */

            triviaState.questionIndex++;


            /* -----------------------------------------
               FINISHED?
            ----------------------------------------- */

            if (
                triviaState.questionIndex >=
                triviaState.questions.length
            ) {

                finishTrivia();

                return;

            }


            /* -----------------------------------------
               RENDER NEXT
            ----------------------------------------- */

            renderTriviaQuestion();

        }
    );

}


/* =====================================================
   FINISH TRIVIA
===================================================== */

function finishTrivia() {

    triviaState.active =
        false;


    triviaState.answered =
        false;


    if (triviaGame) {

        triviaGame.style.display =
            "none";

    }


    if (triviaResult) {

        triviaResult.style.display =
            "block";

    }


    /* =================================================
       FINAL SCORE
    ================================================= */

    const total =
        triviaState.questions.length;


    const score =
        triviaState.score;


    const correct =
        triviaState.correct;


    if (triviaFinalScore) {

        triviaFinalScore.textContent =
            score;

    }


    /* =================================================
       FINAL TITLE
    ================================================= */

    let title =
        "Trivia Complete!";


    let message =
        "Thank you for playing Nayla Trivia Master!";


    if (
        total > 0 &&
        correct === total
    ) {

        title =
            "Perfect Score! 🎉";


        message =
            "Amazing! You really know Nayla well.";

    }

    else if (
        correct >= Math.ceil(
            total * 0.7
        )
    ) {

        title =
            "Amazing Job! 🌸";


        message =
            "You know Nayla really well!";

    }

    else if (
        correct >= Math.ceil(
            total * 0.4
        )
    ) {

        title =
            "Good Try! ✨";


        message =
            "You know quite a bit about Nayla.";

    }

    else {

        title =
            "Keep Exploring! 💫";


        message =
            "There is still more to discover about Nayla.";

    }


    if (triviaFinalTitle) {

        triviaFinalTitle.textContent =
            title;

    }


    if (triviaFinalMessage) {

        triviaFinalMessage.textContent =
            message;

    }


    /* =================================================
       RANK
    ================================================= */

    updateTriviaRank(
        correct,
        total
    );


    /* =================================================
       ACHIEVEMENTS
    ================================================= */

    updateTriviaAchievements(
        correct,
        total
    );


    /* =================================================
       MEMORY
    ================================================= */

    updateNaylaMemory();


    /* =================================================
       PROGRESS
    ================================================= */

    if (triviaProgressBar) {

        triviaProgressBar.style.width =
            "100%";

    }


    saveTriviaProgress();

}


/* =====================================================
   TRIVIA RANK
===================================================== */

function updateTriviaRank(
    correct,
    total
) {

    let icon =
        "🌱";

    let title =
        "Nayla Beginner";

    let description =
        "You are just beginning your journey.";


    if (
        total > 0 &&
        correct === total
    ) {

        icon =
            "👑";

        title =
            "Nayla Master";

        description =
            "Perfect knowledge of Nayla!";

    }

    else if (
        total > 0 &&
        correct >=
            Math.ceil(
                total * 0.8
            )
    ) {

        icon =
            "🌸";

        title =
            "Nayla Expert";

        description =
            "You know Nayla exceptionally well.";

    }

    else if (
        total > 0 &&
        correct >=
            Math.ceil(
                total * 0.6
            )
    ) {

        icon =
            "✨";

        title =
            "Nayla Friend";

        description =
            "You know quite a lot about Nayla.";

    }

    else if (
        total > 0 &&
        correct >=
            Math.ceil(
                total * 0.4
            )
    ) {

        icon =
            "🌱";

        title =
            "Nayla Explorer";

        description =
            "Keep exploring and learning more.";

    }


    if (triviaRankIcon) {

        triviaRankIcon.textContent =
            icon;

    }


    if (triviaRankTitle) {

        triviaRankTitle.textContent =
            title;

    }


    if (triviaRankDescription) {

        triviaRankDescription.textContent =
            description;

    }


    if (triviaRank) {

        triviaRank.style.display =
            "block";

    }

}
/* =========================================================
   PART 3 / 10
   TRIVIA ACHIEVEMENTS + NAYLA MEMORY
========================================================= */


/* =====================================================
   TRIVIA ACHIEVEMENTS
===================================================== */

function updateTriviaAchievements(
    correct,
    total
) {

    if (!triviaAchievementList) {
        return;
    }


    triviaAchievementList.innerHTML =
        "";


    const achievements = [];


    /* =================================================
       PERFECT SCORE
    ================================================= */

    if (
        total > 0 &&
        correct === total
    ) {

        achievements.push({

            icon:
                "👑",

            title:
                "Perfect Score",

            description:
                "You answered every question correctly."

        });

    }


    /* =================================================
       HIGH SCORE
    ================================================= */

    else if (
        total > 0 &&
        correct >=
            Math.ceil(
                total * 0.8
            )
    ) {

        achievements.push({

            icon:
                "🌸",

            title:
                "Nayla Expert",

            description:
                "You answered most questions correctly."

        });

    }


    /* =================================================
       FIRST STEP
    ================================================= */

    if (correct >= 1) {

        achievements.push({

            icon:
                "✨",

            title:
                "First Step",

            description:
                "You got your first trivia answer right."

        });

    }


    /* =================================================
       KNOW NAYLA
    ================================================= */

    if (
        total > 0 &&
        correct >=
            Math.ceil(
                total * 0.6
            )
    ) {

        achievements.push({

            icon:
                "💖",

            title:
                "You Know Nayla",

            description:
                "You clearly remember many things about Nayla."

        });

    }


    /* =================================================
       TRIVIA PLAYER
    ================================================= */

    if (total >= 5) {

        achievements.push({

            icon:
                "🎮",

            title:
                "Trivia Player",

            description:
                "You completed the full trivia challenge."

        });

    }


    /* =================================================
       EMPTY ACHIEVEMENT
    ================================================= */

    if (
        achievements.length === 0
    ) {

        achievements.push({

            icon:
                "🌱",

            title:
                "Keep Exploring",

            description:
                "Play again to unlock more achievements."

        });

    }


    /* =================================================
       RENDER ACHIEVEMENTS
    ================================================= */

    achievements.forEach(
        achievement => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "trivia-achievement";


            item.innerHTML =
                `
                <span class="trivia-achievement-icon">
                    ${achievement.icon}
                </span>

                <div class="trivia-achievement-content">

                    <strong>
                        ${escapeHtml(
                            achievement.title
                        )}
                    </strong>

                    <span>
                        ${escapeHtml(
                            achievement.description
                        )}
                    </span>

                </div>
                `;


            triviaAchievementList.appendChild(
                item
            );

        }
    );


    if (triviaAchievements) {

        triviaAchievements.style.display =
            "block";

    }

}


/* =====================================================
   NAYLA MEMORY
===================================================== */

function updateNaylaMemory() {

    if (!naylaMemoryList) {
        return;
    }


    naylaMemoryList.innerHTML =
        "";


    const answered =
        triviaState.answeredQuestions || [];


    /* =================================================
       NO MEMORY
    ================================================= */

    if (!answered.length) {

        const empty =
            document.createElement(
                "div"
            );


        empty.className =
            "nayla-memory-empty";


        empty.textContent =
            "Your trivia memories will appear here.";


        naylaMemoryList.appendChild(
            empty
        );


        if (naylaMemory) {

            naylaMemory.style.display =
                "block";

        }

        return;

    }


    /* =================================================
       CREATE MEMORY ITEMS
    ================================================= */

    answered.forEach(
        (item, index) => {

            const memory =
                document.createElement(
                    "div"
                );


            memory.className =
                "nayla-memory-item";


            if (item.correct) {

                memory.classList.add(
                    "correct"
                );

            }
            else {

                memory.classList.add(
                    "wrong"
                );

            }


            const status =
                item.correct
                    ? "✓"
                    : "×";


            const question =
                item.question ||
                "";


            const answer =
                item.answer ||
                "";


            const correctAnswer =
                item.correctAnswer ||
                "";


            memory.innerHTML =
                `
                <div class="nayla-memory-number">
                    ${index + 1}
                </div>

                <div class="nayla-memory-body">

                    <div class="nayla-memory-question">
                        ${escapeHtml(
                            question
                        )}
                    </div>

                    <div class="nayla-memory-answer">

                        <span class="nayla-memory-status">
                            ${status}
                        </span>

                        <span>
                            ${escapeHtml(
                                answer
                            )}
                        </span>

                    </div>

                    ${
                        !item.correct
                            ? `
                            <div class="nayla-memory-correct">

                                Correct:
                                ${escapeHtml(
                                    correctAnswer
                                )}

                            </div>
                            `
                            : ""
                    }

                </div>
                `;


            naylaMemoryList.appendChild(
                memory
            );

        }
    );


    if (naylaMemory) {

        naylaMemory.style.display =
            "block";

    }

}


/* =====================================================
   RESTART TRIVIA
===================================================== */

if (restartTriviaButton) {

    restartTriviaButton.addEventListener(
        "click",
        () => {

            /*
             * Hide result first.
             */

            if (triviaResult) {

                triviaResult.style.display =
                    "none";

            }


            /*
             * Show game container.
             */

            if (triviaGame) {

                triviaGame.style.display =
                    "block";

            }


            /*
             * Start a completely new game.
             */

            startTrivia();

        }
    );

}


/* =====================================================
   CLOSE TRIVIA
===================================================== */

if (closeTriviaButton) {

    closeTriviaButton.addEventListener(
        "click",
        () => {

            triviaState.active =
                false;


            triviaState.answered =
                false;


            if (triviaWorkspace) {

                triviaWorkspace.classList.remove(
                    "active"
                );

            }


            if (triviaGame) {

                triviaGame.style.display =
                    "none";

            }


            if (triviaResult) {

                triviaResult.style.display =
                    "none";

            }


            if (triviaStart) {

                triviaStart.style.display =
                    "block";

            }


            resetTriviaUI();


            /*
             * Remove active tool state.
             */

            toolCards.forEach(
                card => {

                    card.classList.remove(
                        "active"
                    );

                }
            );

        }
    );

}


/* =====================================================
   START TRIVIA BUTTON
===================================================== */

if (startTriviaButton) {

    startTriviaButton.addEventListener(
        "click",
        () => {

            startTrivia();

        }
    );

}


/* =====================================================
   KEYBOARD SUPPORT
===================================================== */

if (triviaWorkspace) {

    triviaWorkspace.addEventListener(
        "keydown",
        event => {

            /*
             * Do not interfere with text inputs.
             */

            if (
                event.target.matches(
                    "input, textarea, select"
                )
            ) {

                return;

            }


            /*
             * Only process keyboard shortcuts
             * while trivia is active.
             */

            if (
                !triviaState.active
            ) {

                return;

            }


            /*
             * A / B / C / D
             */

            const key =
                event.key.toUpperCase();


            if (
                key >= "A" &&
                key <= "D"
            ) {

                const index =
                    key.charCodeAt(0) -
                    65;


                const buttons =
                    triviaAnswers
                        ? triviaAnswers.querySelectorAll(
                            ".trivia-answer"
                        )
                        : [];


                const button =
                    buttons[index];


                if (
                    button &&
                    !button.disabled
                ) {

                    button.click();

                }

            }


            /*
             * Enter / Space for Next.
             */

            if (
                (
                    event.key ===
                    "Enter"
                ||
                    event.key ===
                    " "
                ) &&
                triviaState.answered &&
                nextTriviaButton &&
                !nextTriviaButton.disabled
            ) {

                event.preventDefault();

                nextTriviaButton.click();

            }

        }
    );

}


/* =====================================================
   TRIVIA INITIAL UI
===================================================== */

if (triviaWorkspace) {

    resetTriviaUI();

}


/* =====================================================
   TRIVIA GLOBAL API
===================================================== */

window.NaylaAI =
    window.NaylaAI || {};


window.NaylaAI.trivia =
    window.NaylaAI.trivia || {};


window.NaylaAI.trivia.start =
    startTrivia;


window.NaylaAI.trivia.render =
    renderTriviaQuestion;


window.NaylaAI.trivia.answer =
    answerTrivia;


window.NaylaAI.trivia.finish =
    finishTrivia;


window.NaylaAI.trivia.reset =
    resetTriviaUI;


/*
 * Backward-compatible global functions.
 *
 * Translation system uses these when the language
 * changes while trivia is active.
 */

window.startTrivia =
    startTrivia;


window.renderTriviaQuestion =
    renderTriviaQuestion;


window.finishTrivia =
    finishTrivia;


window.resetTriviaUI =
    resetTriviaUI;


/*
 * VERY IMPORTANT:
 *
 * Keep the exact same state object available globally.
 * Do not create another triviaState object elsewhere.
 */

window.triviaState =
    triviaState;
/* =========================================================
   PART 4 / 10
   SAFE AI LANGUAGE BRIDGE
========================================================= */


/* =====================================================
   LANGUAGE CONFIG
===================================================== */

const AI_SUPPORTED_LANGUAGES = [
    "en",
    "id",
    "ja",
    "zh",
    "ko"
];


/* =====================================================
   GET CURRENT AI LANGUAGE
===================================================== */

function getAILanguage() {

    const candidates = [

        localStorage.getItem(
            "language"
        ),

        localStorage.getItem(
            "selectedLanguage"
        ),

        localStorage.getItem(
            "currentLanguage"
        ),

        localStorage.getItem(
            "lang"
        ),

        document.documentElement.lang

    ];


    for (
        const language of candidates
    ) {

        if (
            typeof language ===
                "string" &&
            AI_SUPPORTED_LANGUAGES.includes(
                language
            )
        ) {

            return language;

        }

    }


    return "en";

}


/* =====================================================
   SET AI LANGUAGE
===================================================== */

function setAILanguage(
    language
) {

    if (
        !AI_SUPPORTED_LANGUAGES.includes(
            language
        )
    ) {

        language =
            "en";

    }


    /*
     * Keep all known language keys synchronized.
     */

    localStorage.setItem(
        "language",
        language
    );


    localStorage.setItem(
        "selectedLanguage",
        language
    );


    localStorage.setItem(
        "currentLanguage",
        language
    );


    localStorage.setItem(
        "lang",
        language
    );


    document.documentElement.lang =
        language;


    return language;

}


/* =====================================================
   SAFE TRANSLATION LOOKUP
===================================================== */

function getTranslation(
    key,
    fallback = ""
) {

    const language =
        getAILanguage();


    /*
     * AI_TRANSLATIONS must already exist.
     *
     * If a translation is missing,
     * NEVER print the key itself.
     *
     * This is what prevents:
     *
     * trivia.game.next
     * trivia.game.defaultQuestion
     *
     * from appearing in the UI.
     */

    if (
        typeof AI_TRANSLATIONS ===
            "undefined"
    ) {

        return fallback;

    }


    const languagePack =
        AI_TRANSLATIONS[
            language
        ] ||
        AI_TRANSLATIONS.en;


    if (!languagePack) {

        return fallback;

    }


    const parts =
        String(key)
            .split(".");


    let value =
        languagePack;


    for (
        const part of parts
    ) {

        if (
            value &&
            Object.prototype.hasOwnProperty.call(
                value,
                part
            )
        ) {

            value =
                value[part];

        }
        else {

            value =
                undefined;

            break;

        }

    }


    /*
     * Valid translation.
     */

    if (
        typeof value ===
            "string" &&
        value.trim()
    ) {

        return value;

    }


    /*
     * Try English fallback.
     */

    if (
        language !== "en" &&
        AI_TRANSLATIONS.en
    ) {

        let englishValue =
            AI_TRANSLATIONS.en;


        for (
            const part of parts
        ) {

            if (
                englishValue &&
                Object.prototype.hasOwnProperty.call(
                    englishValue,
                    part
                )
            ) {

                englishValue =
                    englishValue[part];

            }
            else {

                englishValue =
                    undefined;

                break;

            }

        }


        if (
            typeof englishValue ===
                "string" &&
            englishValue.trim()
        ) {

            return englishValue;

        }

    }


    /*
     * NEVER return the translation key.
     */

    return fallback;

}


/* =====================================================
   SAFE TEXT APPLICATION
===================================================== */

function setTranslatedText(
    element,
    key,
    fallback = ""
) {

    if (!element) {

        return;

    }


    const text =
        getTranslation(
            key,
            fallback
        );


    if (
        text &&
        text.trim()
    ) {

        element.textContent =
            text;

    }

}


/* =====================================================
   SAFE PLACEHOLDER APPLICATION
===================================================== */

function setTranslatedPlaceholder(
    element,
    key,
    fallback = ""
) {

    if (!element) {

        return;

    }


    const text =
        getTranslation(
            key,
            fallback
        );


    if (
        text &&
        text.trim()
    ) {

        element.placeholder =
            text;

    }

}


/* =====================================================
   TRANSLATE TRIVIA STATIC UI
===================================================== */

function translateTriviaDynamic() {

    /*
     * IMPORTANT:
     *
     * We translate ONLY static labels.
     *
     * We DO NOT translate:
     *
     * triviaQuestion
     * triviaAnswers
     * currentQuestion
     * correctAnswer
     *
     * because those are generated by the backend
     * using the selected language.
     */


    const triviaLabel =
        document.querySelector(
            "[data-i18n='trivia.header.label']"
        );


    const triviaTitle =
        document.querySelector(
            "[data-i18n='trivia.header.title']"
        );


    const triviaDescription =
        document.querySelector(
            "[data-i18n='trivia.header.description']"
        );


    const triviaStartLabel =
        document.querySelector(
            "[data-i18n='trivia.start.label']"
        );


    const triviaStartTitle =
        document.querySelector(
            "[data-i18n='trivia.start.title']"
        );


    const triviaStartDescription =
        document.querySelector(
            "[data-i18n='trivia.start.description']"
        );


    const triviaStartButton =
        document.getElementById(
            "startTrivia"
        );


    const triviaQuestionLabel =
        document.querySelector(
            "[data-i18n='trivia.game.question']"
        );


    const triviaScoreLabel =
        document.querySelector(
            "[data-i18n='trivia.game.score']"
        );


    const triviaLevelLabel =
        document.querySelector(
            "[data-i18n='trivia.game.level']"
        );


    const nextButton =
        document.getElementById(
            "nextTrivia"
        );


    const resultLabel =
        document.querySelector(
            "[data-i18n='trivia.result.label']"
        );


    const finalScoreLabel =
        document.querySelector(
            "[data-i18n='trivia.result.finalScore']"
        );


    const achievementsLabel =
        document.querySelector(
            "[data-i18n='trivia.result.achievements']"
        );


    const memoryLabel =
        document.querySelector(
            "[data-i18n='trivia.result.memory']"
        );


    const restartButton =
        document.getElementById(
            "restartTrivia"
        );


    /*
     * Header.
     */

    setTranslatedText(
        triviaLabel,
        "trivia.header.label",
        "🤖 AI TRIVIA BATTLE"
    );


    setTranslatedText(
        triviaTitle,
        "trivia.header.title",
        "Nayla Trivia Master"
    );


    setTranslatedText(
        triviaDescription,
        "trivia.header.description",
        "How well do you really know Nayla?"
    );


    /*
     * Start screen.
     */

    setTranslatedText(
        triviaStartLabel,
        "trivia.start.label",
        "NAYLA AI"
    );


    setTranslatedText(
        triviaStartTitle,
        "trivia.start.title",
        "I'll test your knowledge!"
    );


    setTranslatedText(
        triviaStartDescription,
        "trivia.start.description",
        "Answer questions about Nayla, JKT48, her journey, performances, and memorable moments."
    );


    setTranslatedText(
        triviaStartButton,
        "trivia.start.button",
        "⚔️ START BATTLE"
    );


    /*
     * Game labels.
     */

    setTranslatedText(
        triviaQuestionLabel,
        "trivia.game.question",
        "QUESTION"
    );


    setTranslatedText(
        triviaScoreLabel,
        "trivia.game.score",
        "SCORE"
    );


    setTranslatedText(
        triviaLevelLabel,
        "trivia.game.level",
        "LEVEL"
    );


    /*
     * VERY IMPORTANT:
     *
     * nextTriviaButton is a real button,
     * but its text must be changed only here.
     *
     * renderTriviaQuestion() never touches this
     * translation.
     */

    setTranslatedText(
        nextButton,
        "trivia.game.next",
        "Next Question →"
    );


    /*
     * Result screen.
     */

    setTranslatedText(
        resultLabel,
        "trivia.result.label",
        "TRIVIA COMPLETE"
    );


    setTranslatedText(
        finalScoreLabel,
        "trivia.result.finalScore",
        "Final Score"
    );


    setTranslatedText(
        achievementsLabel,
        "trivia.result.achievements",
        "🏆 Achievements"
    );


    setTranslatedText(
        memoryLabel,
        "trivia.result.memory",
        "🌸 A Little More About Nayla"
    );


    setTranslatedText(
        restartButton,
        "trivia.result.playAgain",
        "🔄 PLAY AGAIN"
    );

}


/* =====================================================
   TRANSLATE NORMAL AI WORKSPACE
===================================================== */

function translateDynamicWorkspace() {

    if (
        typeof currentMode ===
            "undefined"
    ) {

        return;

    }


    /*
     * Trivia has its own workspace.
     */

    if (
        currentMode ===
            "trivia"
    ) {

        translateTriviaDynamic();

        return;

    }


    /*
     * These elements are already declared
     * in the main AI workspace.
     */

    if (modeLabel) {

        const key =
            `ai.dynamic.${currentMode}Label`;


        const fallback =
            modeLabel.textContent ||
            "";


        setTranslatedText(
            modeLabel,
            key,
            fallback
        );

    }


    if (workspaceTitle) {

        const key =
            `ai.dynamic.${currentMode}Title`;


        const fallback =
            workspaceTitle.textContent ||
            "";


        setTranslatedText(
            workspaceTitle,
            key,
            fallback
        );

    }


    if (workspaceDescription) {

        const key =
            `ai.dynamic.${currentMode}Description`;


        const fallback =
            workspaceDescription.textContent ||
            "";


        setTranslatedText(
            workspaceDescription,
            key,
            fallback
        );

    }

}


/* =====================================================
   TRANSLATE ALL AI STATIC ELEMENTS
===================================================== */

function translateAIPage() {

    const language =
        getAILanguage();


    /*
     * Keep HTML language synchronized.
     */

    if (
        document.documentElement.lang !==
        language
    ) {

        document.documentElement.lang =
            language;

    }


    /*
     * Apply data-i18n elements.
     *
     * This is intentionally generic.
     *
     * Example:
     *
     * <span data-i18n="ai.heroTitle">
     *
     * becomes:
     *
     * AI_TRANSLATIONS[language].ai.heroTitle
     */

    document
        .querySelectorAll(
            "[data-i18n]"
        )
        .forEach(
            element => {

                const key =
                    element.dataset.i18n;


                if (
                    !key
                ) {

                    return;

                }


                const original =
                    element.dataset.i18nFallback ||
                    element.textContent ||
                    "";


                if (
                    !element.dataset.i18nFallback
                ) {

                    element.dataset.i18nFallback =
                        original;

                }


                const translated =
                    getTranslation(
                        key,
                        element.dataset.i18nFallback
                    );


                if (
                    translated &&
                    translated.trim()
                ) {

                    element.textContent =
                        translated;

                }

            }
        );


    /*
     * Placeholders.
     */

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


                const fallback =
                    element.dataset.i18nPlaceholderFallback ||
                    element.placeholder ||
                    "";


                if (
                    !element.dataset
                        .i18nPlaceholderFallback
                ) {

                    element.dataset
                        .i18nPlaceholderFallback =
                            fallback;

                }


                setTranslatedPlaceholder(
                    element,
                    key,
                    element.dataset
                        .i18nPlaceholderFallback
                );

            }
        );


    /*
     * Dynamic workspace.
     */

    translateDynamicWorkspace();


    /*
     * Trivia static UI.
     */

    translateTriviaDynamic();

}


/* =====================================================
   SAFE LANGUAGE CHANGE HANDLER
===================================================== */

function handleAILanguageChanged(
    event
) {

    let language =
        null;


    /*
     * Support several possible event formats.
     */

    if (
        event &&
        event.detail
    ) {

        if (
            typeof event.detail ===
                "string"
        ) {

            language =
                event.detail;

        }
        else {

            language =
                event.detail.language ||
                event.detail.lang ||
                event.detail.code ||
                null;

        }

    }


    /*
     * If event doesn't provide a language,
     * read navbar/localStorage state.
     */

    if (
        !language
    ) {

        language =
            getAILanguage();

    }


    language =
        setAILanguage(
            language
        );


    /*
     * Translate static UI immediately.
     */

    translateAIPage();


    /*
     * =================================================
     * CRITICAL TRIVIA FIX
     * =================================================
     *
     * DO NOT call:
     *
     * renderTriviaQuestion()
     *
     * when language changes.
     *
     * DO NOT replace the current question
     * with a translation key.
     *
     * DO NOT restart the game blindly.
     *
     * If a trivia game is active, the question
     * currently displayed must remain untouched.
     */


    if (
        window.triviaState &&
        window.triviaState.active === true
    ) {

        /*
         * Keep the current question and answers.
         *
         * Only static labels such as:
         *
         * QUESTION
         * SCORE
         * LEVEL
         * NEXT QUESTION
         *
         * are translated.
         */

        translateTriviaDynamic();

        return;

    }

}


/* =====================================================
   LANGUAGE EVENTS
===================================================== */

window.addEventListener(
    "languageChanged",
    handleAILanguageChanged
);


window.addEventListener(
    "languagechange",
    handleAILanguageChanged
);


/* =====================================================
   CUSTOM EVENT SUPPORT
===================================================== */

document.addEventListener(
    "languageChanged",
    handleAILanguageChanged
);


/* =====================================================
   INITIAL TRANSLATION
===================================================== */

function initializeAITranslations() {

    /*
     * Synchronize current language.
     */

    setAILanguage(
        getAILanguage()
    );


    /*
     * Apply translations after DOM
     * has finished rendering.
     */

    translateAIPage();

}


/* =====================================================
   DOM READY
===================================================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeAITranslations,
        {
            once:
                true
        }
    );

}
else {

    initializeAITranslations();

}


/* =====================================================
   GLOBAL AI TRANSLATION API
===================================================== */

window.NaylaAI =
    window.NaylaAI || {};


window.NaylaAI.language =
    window.NaylaAI.language || {};


window.NaylaAI.language.get =
    getAILanguage;


window.NaylaAI.language.set =
    setAILanguage;


window.NaylaAI.language.translate =
    translateAIPage;


window.NaylaAI.language.translateTrivia =
    translateTriviaDynamic;


window.getAILanguage =
    getAILanguage;


window.setAILanguage =
    setAILanguage;


window.getTranslation =
    getTranslation;


window.translateAIPage =
    translateAIPage;


window.translateTriviaDynamic =
    translateTriviaDynamic;
/* =========================================================
   PART 5 / 10
   AI WORKSPACE + FORM TRANSLATION
========================================================= */


/* =====================================================
   AI TOOL TRANSLATION MAP
===================================================== */

const AI_TOOL_TRANSLATION_MAP = {

    wish: {

        label:
            "ai.dynamic.wishLabel",

        title:
            "ai.dynamic.wishTitle",

        description:
            "ai.dynamic.wishDescription"

    },


    enhance: {

        label:
            "ai.dynamic.enhanceLabel",

        title:
            "ai.dynamic.enhanceTitle",

        description:
            "ai.dynamic.enhanceDescription"

    },


    fortune: {

        label:
            "ai.dynamic.fortuneLabel",

        title:
            "ai.dynamic.fortuneTitle",

        description:
            "ai.dynamic.fortuneDescription"

    },


    letter: {

        label:
            "ai.dynamic.letterLabel",

        title:
            "ai.dynamic.letterTitle",

        description:
            "ai.dynamic.letterDescription"

    }

};


/* =====================================================
   FIND AI WORKSPACE ELEMENTS SAFELY
===================================================== */

function getAIWorkspaceElements() {

    return {

        nameInput:
            document.querySelector(
                "#aiName, #nameInput, [name='name']"
            ),


        messageInput:
            document.querySelector(
                "#aiMessage, #messageInput, textarea[name='message']"
            ),


        styleSelect:
            document.querySelector(
                "#aiStyle, #styleSelect, select[name='style']"
            ),


        generateButton:
            document.querySelector(
                "#generateAI, #generateButton, [data-action='generate-ai']"
            ),


        modeLabel:
            document.querySelector(
                "#modeLabel, .mode-label, [data-ai-mode-label]"
            ),


        workspaceTitle:
            document.querySelector(
                "#workspaceTitle, .workspace-title, [data-ai-workspace-title]"
            ),


        workspaceDescription:
            document.querySelector(
                "#workspaceDescription, .workspace-description, [data-ai-workspace-description]"
            ),


        loadingTitle:
            document.querySelector(
                "#loadingTitle, .loading-title, [data-i18n='ai.loading.title']"
            ),


        loadingDescription:
            document.querySelector(
                "#loadingDescription, .loading-description, [data-i18n='ai.loading.description']"
            ),


        resultTitle:
            document.querySelector(
                "#resultTitle, .result-title, [data-i18n='ai.result.message']"
            ),


        resultPlaceholderTitle:
            document.querySelector(
                "#resultPlaceholderTitle, .result-placeholder-title"
            ),


        resultPlaceholderDescription:
            document.querySelector(
                "#resultPlaceholderDescription, .result-placeholder-description"
            ),


        copyButton:
            document.querySelector(
                "#copyAI, #copyButton, [data-action='copy-ai']"
            ),


        regenerateButton:
            document.querySelector(
                "#regenerateAI, #regenerateButton, [data-action='regenerate-ai']"
            ),


        guestbookButton:
            document.querySelector(
                "#useInGuestbook, #guestbookButton, [data-action='guestbook']"
            )

    };

}


/* =====================================================
   TRANSLATE AI FORM
===================================================== */

function translateAIForm() {

    const elements =
        getAIWorkspaceElements();


    /* =================================================
       NAME
    ================================================= */

    setTranslatedText(
        document.querySelector(
            "[data-i18n='ai.form.name']"
        ),
        "ai.form.name",
        "Your name"
    );


    setTranslatedPlaceholder(
        elements.nameInput,
        "ai.form.namePlaceholder",
        "Your name (optional)"
    );


    /* =================================================
       MESSAGE
    ================================================= */

    setTranslatedText(
        document.querySelector(
            "[data-i18n='ai.form.message']"
        ),
        "ai.form.message",
        "What would you like to say?"
    );


    setTranslatedPlaceholder(
        elements.messageInput,
        "ai.form.messagePlaceholder",
        "Write your thoughts here..."
    );


    /* =================================================
       STYLE
    ================================================= */

    setTranslatedText(
        document.querySelector(
            "[data-i18n='ai.form.style']"
        ),
        "ai.form.style",
        "Writing style"
    );


    /* =================================================
       GENERATE
    ================================================= */

    setTranslatedText(
        elements.generateButton,
        "ai.form.generate",
        "✨ Generate"
    );


    /* =================================================
       STYLE OPTIONS
       
       IMPORTANT:
       We use option VALUE, not current text,
       so changing language doesn't break form state.
    ================================================= */

    if (
        elements.styleSelect
    ) {

        const styleMap = {

            heartfelt:
                "ai.styles.heartfelt",

            sweet:
                "ai.styles.sweet",

            elegant:
                "ai.styles.elegant",

            simple:
                "ai.styles.simple",

            poetic:
                "ai.styles.poetic"

        };


        Array.from(
            elements.styleSelect.options
        ).forEach(
            option => {

                const key =
                    styleMap[
                        option.value
                    ];


                if (!key) {

                    return;

                }


                const fallback =
                    option.dataset
                        .i18nFallback ||
                    option.textContent;


                if (
                    !option.dataset
                        .i18nFallback
                ) {

                    option.dataset
                        .i18nFallback =
                            fallback;

                }


                const translated =
                    getTranslation(
                        key,
                        option.dataset
                            .i18nFallback
                    );


                if (
                    translated
                ) {

                    option.textContent =
                        translated;

                }

            }
        );

    }

}


/* =====================================================
   TRANSLATE LOADING STATE
===================================================== */

function translateAILoading() {

    const elements =
        getAIWorkspaceElements();


    setTranslatedText(
        elements.loadingTitle,
        "ai.loading.title",
        "Writing something special..."
    );


    setTranslatedText(
        elements.loadingDescription,
        "ai.loading.description",
        "Please wait a moment."
    );

}


/* =====================================================
   TRANSLATE RESULT ACTIONS
===================================================== */

function translateAIResultActions() {

    const elements =
        getAIWorkspaceElements();


    setTranslatedText(
        elements.resultTitle,
        "ai.result.message",
        "🌸 Your Message"
    );


    setTranslatedText(
        elements.copyButton,
        "ai.actions.copy",
        "📋 Copy"
    );


    setTranslatedText(
        elements.regenerateButton,
        "ai.actions.regenerate",
        "🔄 Regenerate"
    );


    setTranslatedText(
        elements.guestbookButton,
        "ai.actions.guestbook",
        "🌸 Use in Guestbook"
    );

}


/* =====================================================
   TRANSLATE AI RESULT PLACEHOLDER
===================================================== */

function translateAIResultPlaceholder() {

    const elements =
        getAIWorkspaceElements();


    setTranslatedText(
        elements.resultPlaceholderTitle,
        "ai.result.placeholderTitle",
        "Your message will appear here."
    );


    setTranslatedText(
        elements.resultPlaceholderDescription,
        "ai.result.placeholderDescription",
        "Choose an AI tool above, write your thoughts, and let the AI create something special."
    );

}


/* =====================================================
   TRANSLATE CURRENT WORKSPACE
===================================================== */

function translateCurrentAIWorkspace() {

    translateAIForm();

    translateAILoading();

    translateAIResultActions();

    translateAIResultPlaceholder();

    translateDynamicWorkspace();

}


/* =====================================================
   UPDATE MODE TEXT
===================================================== */

function translateCurrentMode() {

    /*
     * If no current mode exists,
     * there is nothing to translate.
     */

    if (
        typeof currentMode ===
            "undefined" ||
        !currentMode
    ) {

        return;

    }


    /*
     * Trivia has a separate translation system.
     */

    if (
        currentMode ===
            "trivia"
    ) {

        translateTriviaDynamic();

        return;

    }


    const map =
        AI_TOOL_TRANSLATION_MAP[
            currentMode
        ];


    if (!map) {

        return;

    }


    const elements =
        getAIWorkspaceElements();


    const labelFallback =
        elements.modeLabel
            ? (
                elements.modeLabel
                    .dataset
                    .i18nFallback ||
                elements.modeLabel.textContent
            )
            : "";


    const titleFallback =
        elements.workspaceTitle
            ? (
                elements.workspaceTitle
                    .dataset
                    .i18nFallback ||
                elements.workspaceTitle.textContent
            )
            : "";


    const descriptionFallback =
        elements.workspaceDescription
            ? (
                elements.workspaceDescription
                    .dataset
                    .i18nFallback ||
                elements.workspaceDescription.textContent
            )
            : "";


    setTranslatedText(
        elements.modeLabel,
        map.label,
        labelFallback
    );


    setTranslatedText(
        elements.workspaceTitle,
        map.title,
        titleFallback
    );


    setTranslatedText(
        elements.workspaceDescription,
        map.description,
        descriptionFallback
    );

}


/* =====================================================
   OVERRIDE / EXTEND TRANSLATION PIPELINE
===================================================== */

const originalTranslateAIPage =
    window.translateAIPage;


/*
 * Keep a reference so other parts of the original
 * script don't lose the translation function.
 */

function translateAIPageComplete() {

    /*
     * First execute the safe base translation.
     */

    if (
        typeof originalTranslateAIPage ===
            "function"
    ) {

        try {

            originalTranslateAIPage();

        }
        catch (error) {

            console.warn(
                "Base AI translation warning:",
                error
            );

        }

    }


    /*
     * Then translate the AI workspace.
     */

    translateCurrentAIWorkspace();


    /*
     * Finally translate the current mode.
     */

    translateCurrentMode();


    /*
     * Trivia gets static labels only.
     */

    if (
        window.triviaState &&
        window.triviaState.active === true
    ) {

        translateTriviaDynamic();

    }

}


/* =====================================================
   GLOBAL REPLACEMENT
===================================================== */

window.translateAIPage =
    translateAIPageComplete;


/* =====================================================
   LANGUAGE EVENT — WORKSPACE UPDATE
===================================================== */

function handleAIWorkspaceLanguageChanged() {

    /*
     * Give navbar/localStorage a moment to settle
     * before reading the selected language.
     */

    requestAnimationFrame(
        () => {

            try {

                translateCurrentAIWorkspace();

                translateCurrentMode();

            }
            catch (error) {

                console.error(
                    "AI workspace translation error:",
                    error
                );

            }

        }
    );

}


window.addEventListener(
    "languageChanged",
    handleAIWorkspaceLanguageChanged
);


document.addEventListener(
    "languageChanged",
    handleAIWorkspaceLanguageChanged
);


/* =====================================================
   OBSERVE DYNAMIC WORKSPACE
===================================================== */

let aiWorkspaceObserver = null;


function initializeAIWorkspaceObserver() {

    /*
     * Prevent duplicate observers.
     */

    if (
        aiWorkspaceObserver
    ) {

        return;

    }


    const target =
        document.querySelector(
            "#aiWorkspace, .ai-workspace, main"
        );


    if (!target) {

        return;

    }


    aiWorkspaceObserver =
        new MutationObserver(
            mutations => {

                /*
                 * Ignore mutations generated by our own
                 * translation whenever possible.
                 */

                let shouldTranslate =
                    false;


                for (
                    const mutation of mutations
                ) {

                    if (
                        mutation.type ===
                            "childList"
                    ) {

                        shouldTranslate =
                            true;

                        break;

                    }

                }


                if (
                    !shouldTranslate
                ) {

                    return;

                }


                /*
                 * Don't continuously translate while
                 * trivia answers are being generated.
                 *
                 * Static labels are already translated.
                 */

                if (
                    window.triviaState &&
                    window.triviaState.active
                ) {

                    translateTriviaDynamic();

                    return;

                }


                /*
                 * Normal AI workspace.
                 */

                translateCurrentAIWorkspace();

            }
        );


    aiWorkspaceObserver.observe(
        target,
        {
            childList:
                true,

            subtree:
                true
        }
    );

}


/* =====================================================
   INITIALIZE WORKSPACE TRANSLATION
===================================================== */

function initializeAIWorkspaceTranslation() {

    translateCurrentAIWorkspace();

    translateCurrentMode();

    initializeAIWorkspaceObserver();

}


/* =====================================================
   DOM READY
===================================================== */

if (
    document.readyState ===
        "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeAIWorkspaceTranslation,
        {
            once:
                true
        }
    );

}
else {

    initializeAIWorkspaceTranslation();

}


/* =====================================================
   PUBLIC API
===================================================== */

window.NaylaAI =
    window.NaylaAI || {};


window.NaylaAI.translation =
    window.NaylaAI.translation || {};


window.NaylaAI.translation
    .translateWorkspace =
        translateCurrentAIWorkspace;


window.NaylaAI.translation
    .translateMode =
        translateCurrentMode;


window.NaylaAI.translation
    .translateLoading =
        translateAILoading;


window.NaylaAI.translation
    .translateResult =
        translateAIResultActions;
/* =========================================================
   PART 6 / 10
   AI GENERATION ENGINE
========================================================= */


/* =====================================================
   AI GENERATION STATE
===================================================== */

const aiGenerationState = {

    loading:
        false,

    lastRequest:
        null,

    lastResult:
        "",

    currentMode:
        null

};


/* =====================================================
   GET CURRENT AI MODE
===================================================== */

function getCurrentAIMode() {

    if (
        typeof currentMode !==
        "undefined" &&
        currentMode
    ) {

        return currentMode;

    }


    /*
     * Try common active-tool selectors.
     */

    const activeTool =
        document.querySelector(
            "[data-ai-tool].active, " +
            ".ai-tool.active, " +
            ".tool-card.active"
        );


    if (activeTool) {

        return (
            activeTool.dataset.aiTool ||
            activeTool.dataset.tool ||
            activeTool.dataset.mode ||
            null
        );

    }


    return null;

}


/* =====================================================
   GET AI FORM DATA
===================================================== */

function getAIFormData() {

    const elements =
        getAIWorkspaceElements();


    const name =
        elements.nameInput
            ? elements.nameInput.value.trim()
            : "";


    const message =
        elements.messageInput
            ? elements.messageInput.value.trim()
            : "";


    const style =
        elements.styleSelect
            ? elements.styleSelect.value
            : "heartfelt";


    const mode =
        getCurrentAIMode();


    const language =
        getAILanguage();


    return {

        name,

        message,

        style,

        mode,

        language

    };

}


/* =====================================================
   VALIDATE AI FORM
===================================================== */

function validateAIForm(
    data
) {

    /*
     * Trivia does not use the normal AI form.
     */

    if (
        data.mode ===
        "trivia"
    ) {

        return true;

    }


    /*
     * Some tools can work without a message,
     * therefore don't blindly reject every empty field.
     *
     * Only reject if the user has absolutely no
     * useful input for a message-based tool.
     */

    const messageBasedModes = [

        "wish",

        "enhance",

        "letter"

    ];


    if (
        messageBasedModes.includes(
            data.mode
        ) &&
        !data.message
    ) {

        showAIError(
            getTranslation(
                "ai.form.messageRequired",
                "Please write something first."
            )
        );


        if (
            document.querySelector(
                "#aiMessage, #messageInput, textarea[name='message']"
            )
        ) {

            document
                .querySelector(
                    "#aiMessage, #messageInput, textarea[name='message']"
                )
                .focus();

        }


        return false;

    }


    return true;

}


/* =====================================================
   SHOW AI LOADING
===================================================== */

function showAILoading() {

    aiGenerationState.loading =
        true;


    const loading =
        document.querySelector(
            "#aiLoading, .ai-loading, .loading-state"
        );


    const result =
        document.querySelector(
            "#aiResult, .ai-result, .result-state"
        );


    const generateButton =
        document.querySelector(
            "#generateAI, #generateButton, [data-action='generate-ai']"
        );


    const regenerateButton =
        document.querySelector(
            "#regenerateAI, #regenerateButton, [data-action='regenerate-ai']"
        );


    if (loading) {

        loading.style.display =
            "block";

    }


    if (result) {

        result.classList.add(
            "is-loading"
        );

    }


    if (generateButton) {

        generateButton.disabled =
            true;

        generateButton.classList.add(
            "loading"
        );

    }


    if (regenerateButton) {

        regenerateButton.disabled =
            true;

    }


    translateAILoading();

}


/* =====================================================
   HIDE AI LOADING
===================================================== */

function hideAILoading() {

    aiGenerationState.loading =
        false;


    const loading =
        document.querySelector(
            "#aiLoading, .ai-loading, .loading-state"
        );


    const result =
        document.querySelector(
            "#aiResult, .ai-result, .result-state"
        );


    const generateButton =
        document.querySelector(
            "#generateAI, #generateButton, [data-action='generate-ai']"
        );


    const regenerateButton =
        document.querySelector(
            "#regenerateAI, #regenerateButton, [data-action='regenerate-ai']"
        );


    if (loading) {

        loading.style.display =
            "none";

    }


    if (result) {

        result.classList.remove(
            "is-loading"
        );

    }


    if (generateButton) {

        generateButton.disabled =
            false;

        generateButton.classList.remove(
            "loading"
        );

    }


    if (regenerateButton) {

        regenerateButton.disabled =
            false;

    }

}


/* =====================================================
   SHOW AI ERROR
===================================================== */

function showAIError(
    message
) {

    hideAILoading();


    const result =
        document.querySelector(
            "#aiResult, .ai-result, .result-state"
        );


    const resultContent =
        document.querySelector(
            "#aiResultContent, " +
            ".ai-result-content, " +
            ".result-content"
        );


    const errorText =
        message ||
        getTranslation(
            "ai.error.generic",
            "Something went wrong. Please try again."
        );


    if (result) {

        result.style.display =
            "block";

        result.classList.add(
            "error"
        );

    }


    if (resultContent) {

        resultContent.textContent =
            errorText;

    }
    else if (result) {

        /*
         * textContent is used intentionally.
         * Never inject server error HTML.
         */

        result.textContent =
            errorText;

    }


    showToast(
        errorText
    );

}


/* =====================================================
   EXTRACT AI RESULT
===================================================== */

function extractAIResult(
    data
) {

    if (!data) {

        return "";

    }


    /*
     * Most common backend response fields.
     */

    const candidates = [

        data.message,

        data.result,

        data.text,

        data.content,

        data.generated_text,

        data.output,

        data.response

    ];


    for (
        const value of candidates
    ) {

        if (
            typeof value ===
                "string" &&
            value.trim()
        ) {

            return value.trim();

        }

    }


    /*
     * Some APIs return nested data.
     */

    if (
        data.data &&
        typeof data.data ===
            "object"
    ) {

        return extractAIResult(
            data.data
        );

    }


    return "";

}


/* =====================================================
   RENDER AI RESULT
===================================================== */

function renderAIResult(
    text
) {

    const result =
        document.querySelector(
            "#aiResult, .ai-result, .result-state"
        );


    const resultContent =
        document.querySelector(
            "#aiResultContent, " +
            ".ai-result-content, " +
            ".result-content"
        );


    if (!text) {

        showAIError(
            getTranslation(
                "ai.error.emptyResult",
                "The AI did not return a message."
            )
        );

        return;

    }


    /*
     * Save result.
     */

    aiGenerationState.lastResult =
        text;


    /*
     * Render as text.
     *
     * Do NOT use innerHTML because AI output
     * must be treated as untrusted text.
     */

    if (resultContent) {

        resultContent.textContent =
            text;

    }
    else if (result) {

        result.textContent =
            text;

    }


    if (result) {

        result.style.display =
            "block";

        result.classList.remove(
            "error"
        );

        result.classList.remove(
            "is-loading"
        );

    }


    /*
     * Update result actions.
     */

    translateAIResultActions();


    /*
     * Save result globally so Guestbook / Copy
     * can use it.
     */

    window.NaylaAI =
        window.NaylaAI || {};


    window.NaylaAI.lastResult =
        text;


    /*
     * Scroll result into view.
     */

    if (
        result &&
        typeof result.scrollIntoView ===
            "function"
    ) {

        result.scrollIntoView({

            behavior:
                "smooth",

            block:
                "center"

        });

    }

}


/* =====================================================
   AI API ENDPOINT
===================================================== */

function getAIGenerationEndpoint(
    mode
) {

    /*
     * Keep endpoint selection in one place.
     *
     * The normal AI tools use /api/ai/generate.
     *
     * Trivia has its own endpoints and must NEVER
     * reach this function during answer generation.
     */

    if (
        mode ===
            "trivia"
    ) {

        return null;

    }


    return "/api/ai/generate";

}


/* =====================================================
   GENERATE AI CONTENT
===================================================== */

async function generateAI(
    overrideData = null
) {

    /*
     * Prevent double generation.
     */

    if (
        aiGenerationState.loading
    ) {

        return null;

    }


    const data =
        overrideData ||
        getAIFormData();


    /*
     * Normalize mode.
     */

    data.mode =
        data.mode ||
        getCurrentAIMode();


    /*
     * Validate.
     */

    if (
        !validateAIForm(
            data
        )
    ) {

        return null;

    }


    /*
     * Trivia has its own engine.
     */

    if (
        data.mode ===
            "trivia"
    ) {

        if (
            typeof startTrivia ===
                "function"
        ) {

            return startTrivia();

        }


        if (
            window.startTrivia &&
            typeof window.startTrivia ===
                "function"
        ) {

            return window.startTrivia();

        }


        showAIError(
            "Trivia engine is unavailable."
        );


        return null;

    }


    const endpoint =
        getAIGenerationEndpoint(
            data.mode
        );


    if (!endpoint) {

        showAIError(
            getTranslation(
                "ai.error.invalidMode",
                "Invalid AI mode."
            )
        );


        return null;

    }


    /*
     * Save request BEFORE fetch.
     *
     * Regenerate will reuse this exact structure,
     * except language is refreshed.
     */

    aiGenerationState.lastRequest = {

        ...data

    };


    aiGenerationState.currentMode =
        data.mode;


    showAILoading();


    try {

        const response =
            await fetch(
                endpoint,
                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Accept":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            mode:
                                data.mode,

                            language:
                                data.language,

                            name:
                                data.name,

                            message:
                                data.message,

                            style:
                                data.style

                        })

                }
            );


        let responseData =
            null;


        try {

            responseData =
                await response.json();

        }
        catch {

            throw new Error(
                getTranslation(
                    "ai.error.invalidResponse",
                    "The server returned an invalid response."
                )
            );

        }


        if (
            !response.ok
        ) {

            throw new Error(
                responseData.error ||
                responseData.message ||
                getTranslation(
                    "ai.error.server",
                    "The AI server returned an error."
                )
            );

        }


        /*
         * Some backends don't use success:true.
         *
         * Therefore only reject explicit success:false.
         */

        if (
            responseData.success ===
                false
        ) {

            throw new Error(
                responseData.error ||
                responseData.message ||
                getTranslation(
                    "ai.error.server",
                    "The AI server returned an error."
                )
            );

        }


        const result =
            extractAIResult(
                responseData
            );


        if (!result) {

            throw new Error(
                getTranslation(
                    "ai.error.emptyResult",
                    "The AI did not return a message."
                )
            );

        }


        hideAILoading();


        renderAIResult(
            result
        );


        return result;

    }
    catch (error) {

        console.error(
            "AI GENERATION ERROR:",
            error
        );


        showAIError(
            error.message ||
            getTranslation(
                "ai.error.generic",
                "Something went wrong. Please try again."
            )
        );


        return null;

    }

}


/* =====================================================
   REGENERATE AI CONTENT
===================================================== */

async function regenerateAI() {

    /*
     * No previous request.
     */

    if (
        !aiGenerationState.lastRequest
    ) {

        /*
         * Fall back to current form.
         */

        return generateAI();

    }


    /*
     * Refresh language.
     *
     * This is important when the user generated
     * an English message, then changed navbar
     * language to Indonesian and pressed Regenerate.
     */

    const request = {

        ...aiGenerationState.lastRequest,

        language:
            getAILanguage()

    };


    /*
     * Update the saved request.
     */

    aiGenerationState.lastRequest =
        request;


    return generateAI(
        request
    );

}


/* =====================================================
   COPY AI RESULT
===================================================== */

async function copyAIResult() {

    const text =
        aiGenerationState.lastResult ||
        window.NaylaAI?.lastResult ||
        "";


    if (!text) {

        showToast(
            getTranslation(
                "ai.error.nothingToCopy",
                "There is no message to copy yet."
            )
        );


        return false;

    }


    try {

        if (
            navigator.clipboard &&
            typeof navigator.clipboard.writeText ===
                "function"
        ) {

            await navigator.clipboard.writeText(
                text
            );

        }
        else {

            /*
             * Legacy fallback.
             */

            const textarea =
                document.createElement(
                    "textarea"
                );


            textarea.value =
                text;


            textarea.style.position =
                "fixed";

            textarea.style.opacity =
                "0";


            document.body.appendChild(
                textarea
            );


            textarea.select();


            const copied =
                document.execCommand(
                    "copy"
                );


            textarea.remove();


            if (!copied) {

                throw new Error(
                    "Copy command failed."
                );

            }

        }


        showToast(
            getTranslation(
                "ai.messages.copied",
                "Copied! ✓"
            )
        );


        return true;

    }
    catch (error) {

        console.error(
            "COPY AI RESULT ERROR:",
            error
        );


        showToast(
            getTranslation(
                "ai.error.copyFailed",
                "Unable to copy the message."
            )
        );


        return false;

    }

}


/* =====================================================
   USE AI RESULT IN GUESTBOOK
===================================================== */

function useAIResultInGuestbook() {

    const text =
        aiGenerationState.lastResult ||
        window.NaylaAI?.lastResult ||
        "";


    if (!text) {

        showToast(
            getTranslation(
                "ai.error.noGuestbookMessage",
                "Generate a message first."
            )
        );


        return false;

    }


    /*
     * Try common Guestbook textarea IDs.
     */

    const guestbookInput =
        document.querySelector(
            "#guestbookMessage, " +
            "#guestbook-message, " +
            "textarea[name='guestbook_message'], " +
            "textarea[name='message']"
        );


    if (guestbookInput) {

        guestbookInput.value =
            text;


        /*
         * Trigger input/change events so frameworks
         * and existing Guestbook code notice it.
         */

        guestbookInput.dispatchEvent(
            new Event(
                "input",
                {
                    bubbles:
                        true
                }
            )
        );


        guestbookInput.dispatchEvent(
            new Event(
                "change",
                {
                    bubbles:
                        true
                }
            )
        );


        guestbookInput.focus();


        showToast(
            getTranslation(
                "ai.messages.guestbookReady",
                "Your message is ready for the Guestbook! 🌸"
            )
        );


        return true;

    }


    /*
     * Fallback:
     *
     * Save it so the existing Guestbook page
     * can pick it up.
     */

    try {

        sessionStorage.setItem(
            "aiGuestbookMessage",
            text
        );

        localStorage.setItem(
            "aiGuestbookMessage",
            text
        );

    }
    catch (error) {

        console.warn(
            "Unable to save Guestbook message:",
            error
        );

    }


    /*
     * If the project already exposes a Guestbook
     * function, use it.
     */

    const guestbookFunctions = [

        window.openGuestbook,

        window.showGuestbook,

        window.goToGuestbook

    ];


    for (
        const fn of guestbookFunctions
    ) {

        if (
            typeof fn ===
                "function"
        ) {

            try {

                fn(
                    text
                );

                return true;

            }
            catch (error) {

                console.warn(
                    "Guestbook integration warning:",
                    error
                );

            }

        }

    }


    showToast(
        getTranslation(
            "ai.messages.guestbookSaved",
            "Message saved for Guestbook. 🌸"
        )
    );


    return true;

}


/* =====================================================
   GENERATE BUTTON EVENT
===================================================== */

function bindAIGenerateButton() {

    const button =
        document.querySelector(
            "#generateAI, #generateButton, [data-action='generate-ai']"
        );


    if (
        !button ||
        button.dataset.aiGenerateBound ===
            "true"
    ) {

        return;

    }


    button.dataset.aiGenerateBound =
        "true";


    button.addEventListener(
        "click",
        event => {

            event.preventDefault();


            generateAI();

        }
    );

}


/* =====================================================
   REGENERATE BUTTON EVENT
===================================================== */

function bindAIRegenerateButton() {

    const button =
        document.querySelector(
            "#regenerateAI, #regenerateButton, [data-action='regenerate-ai']"
        );


    if (
        !button ||
        button.dataset.aiRegenerateBound ===
            "true"
    ) {

        return;

    }


    button.dataset.aiRegenerateBound =
        "true";


    button.addEventListener(
        "click",
        event => {

            event.preventDefault();


            regenerateAI();

        }
    );

}


/* =====================================================
   COPY BUTTON EVENT
===================================================== */

function bindAICopyButton() {

    const button =
        document.querySelector(
            "#copyAI, #copyButton, [data-action='copy-ai']"
        );


    if (
        !button ||
        button.dataset.aiCopyBound ===
            "true"
    ) {

        return;

    }


    button.dataset.aiCopyBound =
        "true";


    button.addEventListener(
        "click",
        event => {

            event.preventDefault();


            copyAIResult();

        }
    );

}


/* =====================================================
   GUESTBOOK BUTTON EVENT
===================================================== */

function bindAIGuestbookButton() {

    const button =
        document.querySelector(
            "#useInGuestbook, #guestbookButton, [data-action='guestbook']"
        );


    if (
        !button ||
        button.dataset.aiGuestbookBound ===
            "true"
    ) {

        return;

    }


    button.dataset.aiGuestbookBound =
        "true";


    button.addEventListener(
        "click",
        event => {

            event.preventDefault();


            useAIResultInGuestbook();

        }
    );

}


/* =====================================================
   BIND ALL AI ACTIONS
===================================================== */

function bindAIActions() {

    bindAIGenerateButton();

    bindAIRegenerateButton();

    bindAICopyButton();

    bindAIGuestbookButton();

}


/* =====================================================
   INITIALIZE AI GENERATION ENGINE
===================================================== */

function initializeAIGenerationEngine() {

    bindAIActions();

}


/* =====================================================
   DOM READY
===================================================== */

if (
    document.readyState ===
        "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeAIGenerationEngine,
        {
            once:
                true
        }
    );

}
else {

    initializeAIGenerationEngine();

}


/* =====================================================
   PUBLIC AI API
===================================================== */

window.NaylaAI =
    window.NaylaAI || {};


window.NaylaAI.generate =
    generateAI;


window.NaylaAI.regenerate =
    regenerateAI;


window.NaylaAI.copy =
    copyAIResult;


window.NaylaAI.useInGuestbook =
    useAIResultInGuestbook;


window.NaylaAI.getFormData =
    getAIFormData;


window.NaylaAI.state =
    aiGenerationState;


/*
 * Backward-compatible global functions.
 */

window.generateAI =
    generateAI;


window.regenerateAI =
    regenerateAI;


window.copyAIResult =
    copyAIResult;


window.useAIResultInGuestbook =
    useAIResultInGuestbook;
/* =========================================================
   PART 7 / 10
   AI TOOL / MODE SWITCHING
========================================================= */


/* =====================================================
   TOOL DEFINITIONS
===================================================== */

const AI_TOOL_MODES = [

    "wish",

    "enhance",

    "fortune",

    "letter",

    "trivia"

];


/* =====================================================
   GET ALL AI TOOL BUTTONS
===================================================== */

function getAIToolButtons() {

    return Array.from(
        document.querySelectorAll(
            "[data-ai-tool], " +
            "[data-tool], " +
            "[data-mode]"
        )
    );

}


/* =====================================================
   NORMALIZE TOOL MODE
===================================================== */

function normalizeAIMode(
    mode
) {

    if (
        typeof mode !==
            "string"
    ) {

        return null;

    }


    const normalized =
        mode
            .trim()
            .toLowerCase();


    /*
     * Direct match.
     */

    if (
        AI_TOOL_MODES.includes(
            normalized
        )
    ) {

        return normalized;

    }


    /*
     * Common aliases.
     */

    const aliases = {

        "ai-wish":
            "wish",

        "wish-ai":
            "wish",

        "enhancer":
            "enhance",

        "ai-enhance":
            "enhance",

        "fortune":
            "fortune",

        "seijin":
            "fortune",

        "seijin-ai":
            "fortune",

        "letter-ai":
            "letter",

        "ai-letter":
            "letter",

        "ai-trivia":
            "trivia",

        "trivia-battle":
            "trivia"

    };


    return (
        aliases[normalized] ||
        null
    );

}


/* =====================================================
   SET ACTIVE TOOL UI
===================================================== */

function setActiveAITool(
    mode
) {

    const normalizedMode =
        normalizeAIMode(
            mode
        );


    if (!normalizedMode) {

        return;

    }


    getAIToolButtons()
        .forEach(
            button => {

                const buttonMode =
                    normalizeAIMode(

                        button.dataset.aiTool ||
                        button.dataset.tool ||
                        button.dataset.mode

                    );


                const active =
                    buttonMode ===
                    normalizedMode;


                button.classList.toggle(
                    "active",
                    active
                );


                button.classList.toggle(
                    "selected",
                    active
                );


                button.setAttribute(
                    "aria-selected",
                    active
                        ? "true"
                        : "false"
                );

            }
        );

}


/* =====================================================
   CLEAR AI WORKSPACE STATE
===================================================== */

function clearAIWorkspaceState(
    options = {}
) {

    const {

        keepForm =
            false,

        keepResult =
            false,

        keepMode =
            false

    } = options;


    /*
     * Hide loading.
     */

    hideAILoading();


    /*
     * Remove error/loading classes.
     */

    const result =
        document.querySelector(
            "#aiResult, .ai-result, .result-state"
        );


    if (result) {

        result.classList.remove(
            "error"
        );

        result.classList.remove(
            "is-loading"
        );

    }


    /*
     * Clear result if requested.
     */

    if (
        !keepResult
    ) {

        const resultContent =
            document.querySelector(
                "#aiResultContent, " +
                ".ai-result-content, " +
                ".result-content"
            );


        if (resultContent) {

            resultContent.textContent =
                "";

        }


        if (result) {

            result.style.display =
                "none";

        }


        aiGenerationState.lastResult =
            "";


        if (
            window.NaylaAI
        ) {

            window.NaylaAI.lastResult =
                "";

        }

    }


    /*
     * Clear form if requested.
     */

    if (
        !keepForm
    ) {

        const elements =
            getAIWorkspaceElements();


        if (
            elements.nameInput
        ) {

            elements.nameInput.value =
                "";

        }


        if (
            elements.messageInput
        ) {

            elements.messageInput.value =
                "";

        }

    }


    /*
     * Clear previous request when changing
     * to another tool.
     */

    if (
        !keepMode
    ) {

        aiGenerationState.lastRequest =
            null;

        aiGenerationState.currentMode =
            null;

    }

}


/* =====================================================
   RESET NORMAL AI FORM
===================================================== */

function resetAINormalForm(
    keepName = false
) {

    const elements =
        getAIWorkspaceElements();


    if (
        !keepName &&
        elements.nameInput
    ) {

        elements.nameInput.value =
            "";

    }


    if (
        elements.messageInput
    ) {

        elements.messageInput.value =
            "";

    }


    /*
     * Reset style to the first valid option.
     */

    if (
        elements.styleSelect
    ) {

        const firstEnabled =
            Array.from(
                elements.styleSelect.options
            )
            .find(
                option =>
                    !option.disabled
            );


        if (
            firstEnabled
        ) {

            elements.styleSelect.value =
                firstEnabled.value;

        }

    }

}


/* =====================================================
   SHOW / HIDE WORKSPACE
===================================================== */

function updateAIWorkspaceVisibility(
    mode
) {

    const normalizedMode =
        normalizeAIMode(
            mode
        );


    const normalWorkspace =
        document.querySelector(
            "#aiWorkspace, " +
            ".ai-workspace, " +
            "[data-workspace='ai']"
        );


    const triviaWorkspace =
        document.querySelector(
            "#triviaWorkspace, " +
            ".trivia-workspace, " +
            "[data-workspace='trivia']"
        );


    /*
     * If dedicated Trivia workspace exists,
     * switch visibility.
     */

    if (
        triviaWorkspace
    ) {

        triviaWorkspace.style.display =
            normalizedMode ===
                "trivia"
                ? ""
                : "none";

    }


    /*
     * Normal AI workspace.
     */

    if (
        normalWorkspace
    ) {

        normalWorkspace.style.display =
            normalizedMode ===
                "trivia"
                ? "none"
                : "";

    }

}


/* =====================================================
   STOP ACTIVE TRIVIA SAFELY
===================================================== */

function stopTriviaSafely() {

    /*
     * We intentionally DO NOT call a random
     * stopTrivia() function unless it exists.
     */

    if (
        typeof window.stopTrivia ===
            "function"
    ) {

        try {

            window.stopTrivia();

        }
        catch (error) {

            console.warn(
                "stopTrivia warning:",
                error
            );

        }

    }


    /*
     * Reset only if the global state exists.
     */

    if (
        window.triviaState
    ) {

        window.triviaState.active =
            false;

        window.triviaState.currentQuestion =
            null;

        window.triviaState.currentQuestionIndex =
            0;

        window.triviaState.score =
            0;

    }


    /*
     * Hide Trivia UI if it has its own
     * wrapper.
     */

    const triviaWorkspace =
        document.querySelector(
            "#triviaWorkspace, .trivia-workspace"
        );


    if (
        triviaWorkspace
    ) {

        triviaWorkspace.style.display =
            "none";

    }

}


/* =====================================================
   ENTER TRIVIA MODE
===================================================== */

function enterTriviaMode() {

    /*
     * Clear normal AI result.
     */

    clearAIWorkspaceState({

        keepForm:
            false,

        keepResult:
            false,

        keepMode:
            true

    });


    /*
     * Set mode globally.
     */

    if (
        typeof currentMode !==
            "undefined"
    ) {

        currentMode =
            "trivia";

    }


    aiGenerationState.currentMode =
        "trivia";


    aiGenerationState.lastRequest =
        null;


    /*
     * Update UI.
     */

    setActiveAITool(
        "trivia"
    );


    updateAIWorkspaceVisibility(
        "trivia"
    );


    /*
     * Apply translated Trivia static labels.
     */

    translateTriviaDynamic();


    /*
     * IMPORTANT:
     *
     * We do NOT automatically restart an existing
     * trivia game here.
     *
     * User must explicitly press START.
     */

}


/* =====================================================
   ENTER NORMAL AI MODE
===================================================== */

function enterNormalAIMode(
    mode
) {

    const normalizedMode =
        normalizeAIMode(
            mode
        );


    if (
        !normalizedMode ||
        normalizedMode ===
            "trivia"
    ) {

        return;

    }


    /*
     * If Trivia is active, stop it before
     * changing to another AI tool.
     */

    if (
        window.triviaState &&
        window.triviaState.active ===
            true
    ) {

        stopTriviaSafely();

    }


    /*
     * Clear old AI state.
     */

    clearAIWorkspaceState({

        keepForm:
            false,

        keepResult:
            false,

        keepMode:
            true

    });


    /*
     * Set global mode.
     */

    if (
        typeof currentMode !==
            "undefined"
    ) {

        currentMode =
            normalizedMode;

    }


    aiGenerationState.currentMode =
        normalizedMode;


    aiGenerationState.lastRequest =
        null;


    /*
     * Update tool buttons.
     */

    setActiveAITool(
        normalizedMode
    );


    /*
     * Show normal workspace.
     */

    updateAIWorkspaceVisibility(
        normalizedMode
    );


    /*
     * Reset form.

     * Name can be preserved because users often
     * use the same name for multiple tools.
     */

    resetAINormalForm(
        true
    );


    /*
     * Translate the newly selected mode.
     */

    translateCurrentMode();

    translateCurrentAIWorkspace();

}


/* =====================================================
   SWITCH AI MODE
===================================================== */

function switchAIMode(
    mode
) {

    const normalizedMode =
        normalizeAIMode(
            mode
        );


    if (!normalizedMode) {

        console.warn(
            "Unknown AI mode:",
            mode
        );


        return false;

    }


    /*
     * Avoid unnecessary resets when clicking
     * the already-active tool.
     */

    const existingMode =
        getCurrentAIMode();


    if (
        existingMode ===
        normalizedMode
    ) {

        setActiveAITool(
            normalizedMode
        );


        return true;

    }


    if (
        normalizedMode ===
            "trivia"
    ) {

        enterTriviaMode();

    }
    else {

        enterNormalAIMode(
            normalizedMode
        );

    }


    return true;

}


/* =====================================================
   TOOL CLICK HANDLER
===================================================== */

function handleAIToolClick(
    event
) {

    const button =
        event.currentTarget;


    const mode =
        button.dataset.aiTool ||
        button.dataset.tool ||
        button.dataset.mode;


    const normalizedMode =
        normalizeAIMode(
            mode
        );


    if (!normalizedMode) {

        return;

    }


    event.preventDefault();


    switchAIMode(
        normalizedMode
    );

}


/* =====================================================
   BIND TOOL BUTTONS
===================================================== */

function bindAIToolButtons() {

    getAIToolButtons()
        .forEach(
            button => {

                /*
                 * Avoid duplicate event handlers.
                 */

                if (
                    button.dataset.aiToolBound ===
                        "true"
                ) {

                    return;

                }


                const mode =
                    normalizeAIMode(

                        button.dataset.aiTool ||
                        button.dataset.tool ||
                        button.dataset.mode

                    );


                /*
                 * Only bind actual AI tool buttons.
                 *
                 * This prevents random elements with
                 * data-mode values from becoming tools.
                 */

                if (
                    !AI_TOOL_MODES.includes(
                        mode
                    )
                ) {

                    return;

                }


                button.dataset.aiToolBound =
                    "true";


                button.addEventListener(
                    "click",
                    handleAIToolClick
                );

            }
        );

}


/* =====================================================
   INITIAL TOOL STATE
===================================================== */

function initializeAIToolMode() {

    /*
     * Prefer the existing currentMode if valid.
     */

    let mode =
        getCurrentAIMode();


    mode =
        normalizeAIMode(
            mode
        );


    /*
     * If nothing is selected,
     * default to Wish.
     */

    if (!mode) {

        mode =
            "wish";

    }


    if (
        mode ===
            "trivia"
    ) {

        /*
         * Do not start Trivia automatically.
         */

        if (
            typeof currentMode !==
                "undefined"
        ) {

            currentMode =
                "trivia";

        }


        aiGenerationState.currentMode =
            "trivia";


        setActiveAITool(
            "trivia"
        );


        updateAIWorkspaceVisibility(
            "trivia"
        );


        translateTriviaDynamic();

    }
    else {

        if (
            typeof currentMode !==
                "undefined"
        ) {

            currentMode =
                mode;

        }


        aiGenerationState.currentMode =
            mode;


        setActiveAITool(
            mode
        );


        updateAIWorkspaceVisibility(
            mode
        );


        translateCurrentMode();

    }

}


/* =====================================================
   OBSERVE DYNAMIC TOOL BUTTONS
===================================================== */

let aiToolObserver =
    null;


function initializeAIToolObserver() {

    if (
        aiToolObserver
    ) {

        return;

    }


    aiToolObserver =
        new MutationObserver(
            mutations => {

                let added =
                    false;


                for (
                    const mutation of mutations
                ) {

                    if (
                        mutation.addedNodes &&
                        mutation.addedNodes.length
                    ) {

                        added =
                            true;

                        break;

                    }

                }


                if (
                    !added
                ) {

                    return;

                }


                bindAIToolButtons();

            }
        );


    aiToolObserver.observe(
        document.body,
        {

            childList:
                true,

            subtree:
                true

        }
    );

}


/* =====================================================
   INITIALIZE TOOL SYSTEM
===================================================== */

function initializeAIToolSystem() {

    bindAIToolButtons();

    initializeAIToolMode();

    initializeAIToolObserver();

}


/* =====================================================
   DOM READY
===================================================== */

if (
    document.readyState ===
        "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeAIToolSystem,
        {
            once:
                true
        }
    );

}
else {

    initializeAIToolSystem();

}


/* =====================================================
   PUBLIC TOOL API
===================================================== */

window.NaylaAI =
    window.NaylaAI || {};


window.NaylaAI.tools =
    window.NaylaAI.tools || {};


window.NaylaAI.tools.switch =
    switchAIMode;


window.NaylaAI.tools.current =
    getCurrentAIMode;


window.NaylaAI.tools.setActive =
    setActiveAITool;


window.NaylaAI.tools.reset =
    clearAIWorkspaceState;


window.switchAIMode =
    switchAIMode;
/* =========================================================
   PART 8A
   TRIVIA STATE
========================================================= */

window.triviaState =
    window.triviaState || {

        active: false,

        loading: false,

        questions: [],

        currentQuestionIndex: 0,

        currentQuestion: null,

        selectedAnswer: null,

        score: 0,

        totalQuestions: 0,

        answered: false

    };
/* =========================================================
   TRIVIA ELEMENTS
========================================================= */

function getTriviaElements() {

    return {

        startButton:
            document.getElementById(
                "startTrivia"
            ),

        nextButton:
            document.getElementById(
                "nextTrivia"
            ),

        restartButton:
            document.getElementById(
                "restartTrivia"
            ),

        question:
            document.getElementById(
                "triviaQuestion"
            ),

        answers:
            document.getElementById(
                "triviaAnswers"
            ),

        score:
            document.getElementById(
                "triviaScore"
            ),

        level:
            document.getElementById(
                "triviaLevel"
            ),

        result:
            document.getElementById(
                "triviaResult"
            )

    };

}
/* =========================================================
   START TRIVIA
========================================================= */

async function startTrivia() {

    if (
        triviaState.loading
    ) {

        return;
    }

    triviaState.loading =
        true;

    try {

        const language =
            getAILanguage();

        const response =
            await fetch(
                "/api/ai/trivia/start",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({

                        language

                    })
                }
            );

        const data =
            await response.json();

        if (
            !response.ok
        ) {

            throw new Error(
                data.error ||
                "Trivia failed"
            );

        }

        triviaState.active =
            true;

        triviaState.questions =
            data.questions || [];

        triviaState.totalQuestions =
            triviaState.questions.length;

        triviaState.currentQuestionIndex =
            0;

        triviaState.score =
            0;

        triviaState.answered =
            false;

        renderCurrentTriviaQuestion();

    }
    catch (error) {

        console.error(
            error
        );

        showToast(
            error.message
        );

    }
    finally {

        triviaState.loading =
            false;

    }

}
/* =========================================================
   RENDER QUESTION
========================================================= */

function renderCurrentTriviaQuestion() {

    const elements =
        getTriviaElements();

    const question =
        triviaState.questions[
            triviaState.currentQuestionIndex
        ];

    if (
        !question
    ) {

        finishTrivia();

        return;
    }

    triviaState.currentQuestion =
        question;

    triviaState.answered =
        false;

    triviaState.selectedAnswer =
        null;

    /*
     * IMPORTANT
     * NEVER TRANSLATE QUESTION
     */

    elements.question.textContent =
        question.question;

    elements.answers.innerHTML =
        "";

    question.answers.forEach(
        (
            answer,
            index
        ) => {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "trivia-answer";

            button.textContent =
                answer;

            button.addEventListener(
                "click",
                () => {

                    selectTriviaAnswer(
                        index
                    );

                }
            );

            elements.answers.appendChild(
                button
            );

        }
    );

    updateTriviaStats();

    updateTriviaNextButton();

}
/* =========================================================
   SELECT ANSWER
========================================================= */

function selectTriviaAnswer(
    answerIndex
) {

    if (
        triviaState.answered
    ) {

        return;
    }

    triviaState.selectedAnswer =
        answerIndex;

    triviaState.answered =
        true;

    const question =
        triviaState.currentQuestion;

    const buttons =
        document.querySelectorAll(
            ".trivia-answer"
        );

    buttons.forEach(
        (
            button,
            index
        ) => {

            button.disabled =
                true;

            if (
                index ===
                question.correctAnswer
            ) {

                button.classList.add(
                    "correct"
                );

            }

            if (
                index ===
                    answerIndex &&
                index !==
                    question.correctAnswer
            ) {

                button.classList.add(
                    "wrong"
                );

            }

        }
    );

    if (
        answerIndex ===
        question.correctAnswer
    ) {

        triviaState.score++;

    }

    updateTriviaStats();

    updateTriviaNextButton();

}
/* =========================================================
   NEXT BUTTON
========================================================= */

function updateTriviaNextButton() {

    const elements =
        getTriviaElements();

    if (
        !elements.nextButton
    ) {

        return;
    }

    elements.nextButton.disabled =
        !triviaState.answered;

    elements.nextButton.textContent =
        getTranslation(
            "trivia.game.next",
            "Next Question →"
        );

}
/* =========================================================
   NEXT QUESTION
========================================================= */

function nextTriviaQuestion() {

    if (
        !triviaState.answered
    ) {

        return;
    }

    triviaState.currentQuestionIndex++;

    if (
        triviaState.currentQuestionIndex >=
        triviaState.totalQuestions
    ) {

        finishTrivia();

        return;
    }

    renderCurrentTriviaQuestion();

}
/* =========================================================
   SCORE
========================================================= */

function updateTriviaStats() {

    const elements =
        getTriviaElements();

    if (
        elements.score
    ) {

        elements.score.textContent =
            triviaState.score;
    }

    if (
        elements.level
    ) {

        elements.level.textContent =
            `${triviaState.currentQuestionIndex + 1}/${triviaState.totalQuestions}`;
    }

}
/* =========================================================
   SCORE
========================================================= */

function updateTriviaStats() {

    const elements =
        getTriviaElements();

    if (
        elements.score
    ) {

        elements.score.textContent =
            triviaState.score;
    }

    if (
        elements.level
    ) {

        elements.level.textContent =
            `${triviaState.currentQuestionIndex + 1}/${triviaState.totalQuestions}`;
    }

}
/* =========================================================
   TRIVIA LANGUAGE FIX
========================================================= */

function refreshTriviaLanguage() {

    if (
        !triviaState.active
    ) {

        return;
    }

    /*
     * ONLY LABELS
     */

    translateTriviaDynamic();

    updateTriviaNextButton();

}
/* =========================================================
   FINISH TRIVIA
========================================================= */

function finishTrivia() {

    triviaState.active =
        false;

    const percentage =
        triviaState.totalQuestions > 0
            ? Math.round(
                (
                    triviaState.score /
                    triviaState.totalQuestions
                ) * 100
            )
            : 0;

    renderTriviaResult(
        percentage
    );

}
/* =========================================================
   ACHIEVEMENTS
========================================================= */

function getTriviaAchievement(
    score,
    total
) {

    const percentage =
        total > 0
            ? score / total
            : 0;

    if (
        percentage === 1
    ) {

        return {

            title:
                "👑 Nayla Ultimate Master",

            description:
                "Perfect score. You know Nayla extremely well."

        };

    }

    if (
        percentage >= 0.8
    ) {

        return {

            title:
                "🌸 Nayla Expert",

            description:
                "Amazing knowledge about Nayla."

        };

    }

    if (
        percentage >= 0.6
    ) {

        return {

            title:
                "⭐ Nayla Fan",

            description:
                "You know many things about Nayla."

        };

    }

    if (
        percentage >= 0.4
    ) {

        return {

            title:
                "🎀 Casual Supporter",

            description:
                "A good start. Keep learning."

        };

    }

    return {

        title:
            "🌱 New Challenger",

        description:
            "Try again and improve your score."

    };

}
/* =========================================================
   MEMORY MESSAGE
========================================================= */

function getTriviaMemoryMessage(
    percentage
) {

    if (
        percentage >= 90
    ) {

        return getTranslation(
            "trivia.memory.legend",
            "Your memories of Nayla shine brightly."
        );

    }

    if (
        percentage >= 70
    ) {

        return getTranslation(
            "trivia.memory.excellent",
            "You clearly follow Nayla closely."
        );

    }

    if (
        percentage >= 50
    ) {

        return getTranslation(
            "trivia.memory.good",
            "You know quite a lot already."
        );

    }

    return getTranslation(
        "trivia.memory.beginner",
        "Every fan journey starts somewhere."
    );

}
/* =========================================================
   RESULT SCREEN
========================================================= */

function renderTriviaResult(
    percentage
) {

    const achievement =
        getTriviaAchievement(

            triviaState.score,

            triviaState.totalQuestions

        );

    const result =
        document.getElementById(
            "triviaResult"
        );

    if (!result) {

        return;

    }

    result.innerHTML =
        `
        <div class="trivia-result-card">

            <div class="trivia-result-score">

                ${triviaState.score}
                /
                ${triviaState.totalQuestions}

            </div>

            <div class="trivia-result-percentage">

                ${percentage}%

            </div>

            <div class="trivia-achievement">

                <h3>
                    ${achievement.title}
                </h3>

                <p>
                    ${achievement.description}
                </p>

            </div>

            <div class="trivia-memory">

                ${getTriviaMemoryMessage(
                    percentage
                )}

            </div>

        </div>
        `;

    result.style.display =
        "block";

    translateTriviaDynamic();

}
/* =========================================================
   RESTART TRIVIA
========================================================= */

function restartTrivia() {

    triviaState.active =
        false;

    triviaState.loading =
        false;

    triviaState.questions =
        [];

    triviaState.currentQuestion =
        null;

    triviaState.currentQuestionIndex =
        0;

    triviaState.selectedAnswer =
        null;

    triviaState.score =
        0;

    triviaState.totalQuestions =
        0;

    triviaState.answered =
        false;

    const result =
        document.getElementById(
            "triviaResult"
        );

    if (
        result
    ) {

        result.style.display =
            "none";

        result.innerHTML =
            "";

    }

    startTrivia();

}
/* =========================================================
   START BUTTON
========================================================= */

function bindTriviaStartButton() {

    const button =
        document.getElementById(
            "startTrivia"
        );

    if (
        !button ||
        button.dataset.bound ===
            "true"
    ) {

        return;

    }

    button.dataset.bound =
        "true";

    button.addEventListener(
        "click",
        event => {

            event.preventDefault();

            startTrivia();

        }
    );

}
/* =========================================================
   NEXT BUTTON
========================================================= */

function bindTriviaNextButton() {

    const button =
        document.getElementById(
            "nextTrivia"
        );

    if (
        !button ||
        button.dataset.bound ===
            "true"
    ) {

        return;

    }

    button.dataset.bound =
        "true";

    button.addEventListener(
        "click",
        event => {

            event.preventDefault();

            nextTriviaQuestion();

        }
    );

}
/* =========================================================
   RESTART BUTTON
========================================================= */

function bindTriviaRestartButton() {

    const button =
        document.getElementById(
            "restartTrivia"
        );

    if (
        !button ||
        button.dataset.bound ===
            "true"
    ) {

        return;

    }

    button.dataset.bound =
        "true";

    button.addEventListener(
        "click",
        event => {

            event.preventDefault();

            restartTrivia();

        }
    );

}
/* =========================================================
   TRIVIA EVENTS
========================================================= */

function initializeTriviaEvents() {

    bindTriviaStartButton();

    bindTriviaNextButton();

    bindTriviaRestartButton();

}
/* =========================================================
   DOM READY
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeTriviaEvents,
        {
            once: true
        }
    );

}
else {

    initializeTriviaEvents();

}
/* =========================================================
   PUBLIC API
========================================================= */

window.startTrivia =
    startTrivia;

window.restartTrivia =
    restartTrivia;

window.nextTriviaQuestion =
    nextTriviaQuestion;

window.renderTriviaResult =
    renderTriviaResult;
/* =========================================================
   PART 10 / 10
   FINAL INTEGRATION
========================================================= */


/* =====================================================
   GLOBAL INIT LOCK
===================================================== */

window.NaylaAI =
    window.NaylaAI || {};


window.NaylaAI.initialized =
    window.NaylaAI.initialized || false;


/* =====================================================
   SAFE TOAST
===================================================== */

if (
    typeof window.showToast !==
    "function"
) {

    window.showToast =
        function (
            message
        ) {

            console.log(
                "[Toast]",
                message
            );

        };

}


/* =====================================================
   SAFE ERROR LOGGER
===================================================== */

function logAIError(
    error,
    context = ""
) {

    console.error(

        "[NaylaAI]",

        context,

        error

    );

}


/* =====================================================
   REBIND ALL EVENTS
===================================================== */

function rebindAllAIEvents() {

    try {

        bindAIActions();

    }
    catch (error) {

        logAIError(
            error,
            "bindAIActions"
        );

    }


    try {

        bindAIToolButtons();

    }
    catch (error) {

        logAIError(
            error,
            "bindAIToolButtons"
        );

    }


    try {

        bindTriviaStartButton();

    }
    catch (error) {

        logAIError(
            error,
            "bindTriviaStartButton"
        );

    }


    try {

        bindTriviaNextButton();

    }
    catch (error) {

        logAIError(
            error,
            "bindTriviaNextButton"
        );

    }


    try {

        bindTriviaRestartButton();

    }
    catch (error) {

        logAIError(
            error,
            "bindTriviaRestartButton"
        );

    }

}


/* =====================================================
   SAFE LANGUAGE REFRESH
===================================================== */

function refreshEntireAIUI() {

    try {

        translateAIPage();

    }
    catch (error) {

        logAIError(
            error,
            "translateAIPage"
        );

    }


    try {

        translateCurrentAIWorkspace();

    }
    catch (error) {

        logAIError(
            error,
            "translateCurrentAIWorkspace"
        );

    }


    try {

        translateCurrentMode();

    }
    catch (error) {

        logAIError(
            error,
            "translateCurrentMode"
        );

    }


    /*
     * IMPORTANT
     *
     * Only labels.
     *
     * NEVER re-render question.
     */

    try {

        refreshTriviaLanguage();

    }
    catch (error) {

        logAIError(
            error,
            "refreshTriviaLanguage"
        );

    }

}


/* =====================================================
   LANGUAGE OBSERVER
===================================================== */

let lastKnownLanguage =
    getAILanguage();


function monitorLanguageChanges() {

    setInterval(
        () => {

            const currentLanguage =
                getAILanguage();

            if (
                currentLanguage ===
                lastKnownLanguage
            ) {

                return;

            }

            lastKnownLanguage =
                currentLanguage;

            refreshEntireAIUI();

        },
        500
    );

}


/* =====================================================
   DOM OBSERVER
===================================================== */

let globalAIObserver =
    null;


function initializeGlobalObserver() {

    if (
        globalAIObserver
    ) {

        return;

    }

    globalAIObserver =
        new MutationObserver(
            mutations => {

                let needsRebind =
                    false;

                for (
                    const mutation of mutations
                ) {

                    if (
                        mutation.addedNodes &&
                        mutation.addedNodes.length
                    ) {

                        needsRebind =
                            true;

                        break;

                    }

                }

                if (
                    !needsRebind
                ) {

                    return;

                }

                rebindAllAIEvents();

            }
        );

    globalAIObserver.observe(
        document.body,
        {

            childList:
                true,

            subtree:
                true

        }
    );

}


/* =====================================================
   FIX NEXT BUTTON TEXT
===================================================== */

function ensureTriviaNextButtonText() {

    const button =
        document.getElementById(
            "nextTrivia"
        );

    if (!button) {

        return;

    }

    const invalidTexts = [

        "trivia.game.next",

        "undefined",

        "null"

    ];

    if (
        invalidTexts.includes(
            button.textContent.trim()
        )
    ) {

        button.textContent =
            getTranslation(

                "trivia.game.next",

                "Next Question →"

            );

    }

}


/* =====================================================
   FIX QUESTION PLACEHOLDER
===================================================== */

function ensureTriviaQuestionText() {

    const question =
        document.getElementById(
            "triviaQuestion"
        );

    if (!question) {

        return;

    }

    const invalidTexts = [

        "trivia.game.defaultQuestion",

        "undefined",

        "null"

    ];

    if (
        invalidTexts.includes(
            question.textContent.trim()
        )
    ) {

        /*
         * IMPORTANT
         *
         * Don't translate fake question.
         * Only clear it.
         */

        question.textContent =
            "";

    }

}


/* =====================================================
   PERIODIC REPAIR
===================================================== */

function startPeriodicRepair() {

    setInterval(
        () => {

            ensureTriviaNextButtonText();

            ensureTriviaQuestionText();

        },
        1000
    );

}


/* =====================================================
   SAFE GLOBAL EVENTS
===================================================== */

window.addEventListener(
    "error",
    event => {

        logAIError(
            event.error,
            "window.error"
        );

    }
);


window.addEventListener(
    "unhandledrejection",
    event => {

        logAIError(
            event.reason,
            "promise"
        );

    }
);


/* =====================================================
   FINAL INITIALIZATION
===================================================== */

function initializeNaylaAI() {

    if (
        window.NaylaAI.initialized
    ) {

        return;
    }

    window.NaylaAI.initialized =
        true;


    rebindAllAIEvents();

    refreshEntireAIUI();

    initializeGlobalObserver();

    monitorLanguageChanges();

    startPeriodicRepair();

    console.log(
        "NaylaAI initialized"
    );

}


/* =====================================================
   DOM READY
===================================================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeNaylaAI,
        {
            once: true
        }
    );

}
else {

    initializeNaylaAI();

}


/* =====================================================
   PUBLIC API
===================================================== */

window.NaylaAI.refresh =
    refreshEntireAIUI;

window.NaylaAI.rebind =
    rebindAllAIEvents;

window.NaylaAI.initialize =
    initializeNaylaAI;

window.NaylaAI.repair =
    startPeriodicRepair;
    });