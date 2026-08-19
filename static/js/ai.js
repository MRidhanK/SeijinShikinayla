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

                promptInput.placeholder =
                    config.placeholder;

                resetWorkspace();

                toolCards.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });

                card.classList.add(
                    "active"
                );

                workspace.classList.add(
                    "active"
                );

                if (triviaWorkspace) {

                    triviaWorkspace.classList.remove(
                        "active"
                    );

                }

                setTimeout(() => {

                    workspace.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }, 100);

                setTimeout(() => {

                    promptInput.focus();

                }, 500);

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

                toolCards.forEach(card => {

                    card.classList.remove(
                        "active"
                    );

                });

            }
        );

    }


    /* =====================================================
       ESCAPE
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }

            if (
                workspace.classList.contains(
                    "active"
                )
            ) {

                workspace.classList.remove(
                    "active"
                );

            }

            if (
                triviaWorkspace &&
                triviaWorkspace.classList.contains(
                    "active"
                )
            ) {

                triviaWorkspace.classList.remove(
                    "active"
                );

            }

        }
    );


    /* =====================================================
       CHARACTER COUNTER
    ===================================================== */

    promptInput.addEventListener(
        "input",
        () => {

            if (!charCount) {
                return;
            }

            const length =
                promptInput.value.length;

            charCount.textContent =
                length;

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
    );


    /* =====================================================
       GENERATE
    ===================================================== */

    generateButton.addEventListener(
        "click",
        generateMessage
    );


    async function generateMessage() {

        if (isGenerating) {
            return;
        }

        const name =
            nameInput
                ? nameInput.value.trim()
                : "";

        const prompt =
            promptInput.value.trim();

        const style =
            styleSelect
                ? styleSelect.value
                : "heartfelt";


        if (!prompt) {

            showError(
                "Please write something first."
            );

            promptInput.focus();

            return;

        }


        if (prompt.length < 5) {

            showError(
                "Please write a little more about what you want to say."
            );

            promptInput.focus();

            return;

        }


        if (prompt.length > 1000) {

            showError(
                "Your message is too long. Please keep it under 1000 characters."
            );

            promptInput.focus();

            return;

        }


        if (name.length > 50) {

            showError(
                "Name is too long."
            );

            return;

        }


        hideError();


        lastRequest = {

            mode:
                currentMode,

            name:
                name,

            prompt:
                prompt,

            style:
                style

        };


        resetResult();


        if (loading) {

            loading.style.display =
                "block";

        }


        setGeneratingState(
            true
        );


        try {

        const language =
            localStorage.getItem("language") || "en";

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
                                ...lastRequest,
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
                    "The server returned an invalid response."
                );

            }


            if (!response.ok) {

                throw new Error(
                    data.error ||
                    `Server error (${response.status}).`
                );

            }


            if (!data.success) {

                throw new Error(
                    data.error ||
                    "AI failed to generate the message."
                );

            }


            if (
                !data.message ||
                !data.message.trim()
            ) {

                throw new Error(
                    "AI returned an empty message."
                );

            }


            const message =
                data.message.trim();


            lastGeneratedMessage =
                message;


            if (resultMode) {

                resultMode.textContent =
                    modes[currentMode]
                        ? modes[currentMode].resultLabel
                        : "AI Generated";

            }


            showResult(
                message
            );


            showToast(
                "🌸 Your message is ready."
            );


            setTimeout(() => {

                if (!result) {
                    return;
                }

                result.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 250);

        }


        catch (error) {

            console.error(
                "AI GENERATION ERROR:",
                error
            );

            resetResult();

            showError(
                error.message ||
                "Something went wrong while generating the message."
            );

        }


        finally {

            if (loading) {

                loading.style.display =
                    "none";

            }

            setGeneratingState(
                false
            );

        }

    }


    /* =====================================================
       REGENERATE
    ===================================================== */

    if (regenerateButton) {

        regenerateButton.addEventListener(
            "click",
            async () => {

                if (isGenerating) {
                    return;
                }

                if (!lastRequest) {

                    showError(
                        "Please generate a message first."
                    );

                    return;

                }

                showToast(
                    "✨ Creating another version..."
                );

                await generateMessage();

            }
        );

    }


    /* =====================================================
       COPY
    ===================================================== */

    if (copyButton) {

        copyButton.addEventListener(
            "click",
            async () => {

                const text =
                    lastGeneratedMessage ||
                    (
                        generatedText
                            ? generatedText.textContent.trim()
                            : ""
                    );

                if (!text) {
                    return;
                }


                try {

                    await navigator.clipboard.writeText(
                        text
                    );

                    copyButton.classList.add(
                        "success"
                    );

                    copyButton.textContent =
                        "✓ Copied!";

                    showToast(
                        "📋 Message copied."
                    );


                    setTimeout(() => {

                        copyButton.classList.remove(
                            "success"
                        );

                        copyButton.textContent =
                            "📋 Copy";

                    }, 2000);

                }


                catch (error) {

                    console.error(
                        "COPY ERROR:",
                        error
                    );

                    showError(
                        "Unable to copy the message."
                    );

                }

            }
        );

    }


    /* =====================================================
       USE IN GUESTBOOK
    ===================================================== */

    if (guestbookButton) {

        guestbookButton.addEventListener(
            "click",
            sendToGuestbook
        );

    }


    async function sendToGuestbook() {

        if (isSendingGuestbook) {
            return;
        }


        const name =
            nameInput
                ? nameInput.value.trim()
                : "";

        const message =
            lastGeneratedMessage ||
            (
                generatedText
                    ? generatedText.textContent.trim()
                    : ""
            );


        if (!message) {

            showError(
                "Please generate a message first."
            );

            return;

        }


        if (!name) {

            showError(
                "Please enter your name before sending the message."
            );

            if (nameInput) {

                nameInput.focus();

            }

            return;

        }


        if (name.length > 50) {

            showError(
                "Name is too long."
            );

            return;

        }


        if (message.length > 1000) {

            showError(
                "The generated message is too long for the guestbook."
            );

            return;

        }


        hideError();


        isSendingGuestbook =
            true;

        guestbookButton.disabled =
            true;


        const originalText =
            guestbookButton.textContent;


        guestbookButton.innerHTML =
            `
            <span class="ai-button-spinner"></span>
            Sending...
            `;


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

                                name:
                                    name,

                                message:
                                    message,

                                member_type:
                                    "Fan",

                                mood:
                                    "🌸",

                                submission_mode:
                                    "ai"

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


            if (!response.ok) {

                throw new Error(
                    data.error ||
                    `Unable to save message (${response.status}).`
                );

            }


            if (!data.success) {

                throw new Error(
                    data.error ||
                    "Unable to save your message."
                );

            }


            guestbookButton.classList.add(
                "success"
            );

            guestbookButton.textContent =
                "✓ Sent to Guestbook";


            showToast(
                "🌸 Your message was added to the guestbook."
            );


            setTimeout(() => {

                window.location.href =
                    "/guestbook";

            }, 1000);

        }


        catch (error) {

            console.error(
                "AI GUESTBOOK SEND ERROR:",
                error
            );

            showError(
                error.message ||
                "Unable to send the message to the guestbook."
            );

            guestbookButton.disabled =
                false;

            guestbookButton.textContent =
                originalText;

        }


        finally {

            isSendingGuestbook =
                false;

        }

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
                "EASY";

        }


        if (triviaProgressBar) {

            triviaProgressBar.style.width =
                "0%";

        }


        if (triviaQuestion) {

            triviaQuestion.textContent =
                "Preparing your first challenge...";

        }


        if (triviaRank) {

            triviaRank.style.display =
                "none";

        }


        if (triviaAchievements) {

            triviaAchievements.style.display =
                "none";

        }


        if (naylaMemory) {

            naylaMemory.style.display =
                "none";

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

    triviaState = {

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

    };


    resetTriviaUI();


    /* =============================================
       SWITCH SCREEN
    ============================================= */

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


    try {

        /*
            IMPORTANT:
            Always follow the master navbar language.
        */

        const language =
            localStorage.getItem("language") || "en";


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
                                localStorage.getItem(
                                    "language"
                                ) || "en"
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
                "Unable to start trivia."
            );

        }


        triviaState.questions =
            Array.isArray(
                data.questions
            )
                ? data.questions
                : [];


        if (
            triviaState.questions.length === 0
        ) {

            throw new Error(
                "No trivia questions were returned."
            );

        }


        triviaState.questionIndex =
            0;

        triviaState.correct =
            0;

        triviaState.score =
            0;

        triviaState.answered =
            false;

        triviaState.currentQuestion =
            null;

        triviaState.answeredQuestions =
            [];


        renderTriviaQuestion();

    }


    catch (error) {

        console.error(
            "TRIVIA START ERROR:",
            error
        );


        triviaState.active =
            false;

        triviaState.answered =
            false;

        triviaState.questions =
            [];

        triviaState.currentQuestion =
            null;

        triviaState.answeredQuestions =
            [];


        if (triviaGame) {

            triviaGame.style.display =
                "none";

        }


        if (triviaStart) {

            triviaStart.style.display =
                "block";

        }


        showToast(
            "⚠️ Unable to start trivia."
        );

    }

}


    /* =====================================================
       RENDER QUESTION
    ===================================================== */

    /* =====================================================
   RENDER TRIVIA QUESTION
===================================================== */

function renderTriviaQuestion() {

    const question =
        triviaState.questions[
            triviaState.questionIndex
        ];

    /*
    =====================================================
    NO QUESTION
    =====================================================
    */

    if (!question) {

        finishTrivia();

        return;

    }

    /*
    =====================================================
    VALIDATE QUESTION DATA
    =====================================================
    */

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

    /*
    =====================================================
    SAVE CURRENT QUESTION
    =====================================================
    */

    triviaState.currentQuestion =
        question;

    triviaState.answered =
        false;

    triviaState.difficulty =
        getTriviaDifficulty();


    /*
    =====================================================
    QUESTION NUMBER
    =====================================================
    */

    if (triviaQuestionNumber) {

        triviaQuestionNumber.textContent =
            `${triviaState.questionIndex + 1} / ${triviaState.questions.length}`;

    }


    /*
    =====================================================
    DIFFICULTY
    =====================================================
    */

    if (triviaDifficulty) {

        triviaDifficulty.textContent =
            triviaState.difficulty.toUpperCase();

    }


    /*
    =====================================================
    SCORE
    =====================================================
    */

    if (triviaScoreElement) {

        triviaScoreElement.textContent =
            triviaState.score;

    }


    /*
    =====================================================
    PROGRESS
    =====================================================
    */

    if (triviaProgressBar) {

        const progress =
            (
                triviaState.questionIndex /
                triviaState.questions.length
            ) * 100;

        triviaProgressBar.style.width =
            `${progress}%`;

    }


    /*
    =====================================================
    QUESTION

    IMPORTANT:
    This must be the ONLY place that controls the
    actual trivia question text after the game starts.
    =====================================================
    */

    if (triviaQuestion) {

        triviaQuestion.textContent =
            question.question;

    }


    /*
    =====================================================
    CLEAR OLD ANSWERS
    =====================================================
    */

    if (triviaAnswers) {

        triviaAnswers.innerHTML =
            "";

    }


    /*
    =====================================================
    CLEAR FEEDBACK
    =====================================================
    */

    if (triviaFeedback) {

        triviaFeedback.style.display =
            "none";

        triviaFeedback.textContent =
            "";

        triviaFeedback.innerHTML =
            "";

    }


    /*
    =====================================================
    HIDE NEXT BUTTON
    =====================================================
    */

    if (nextTriviaButton) {

        nextTriviaButton.style.display =
            "none";

        nextTriviaButton.disabled =
            true;

    }


    /*
    =====================================================
    OPTIONS
    =====================================================
    */

    const options =
        Array.isArray(
            question.options
        )
            ? question.options
            : [];


    if (options.length === 0) {

        console.error(
            "Trivia question has no options:",
            question
        );

        showToast(
            "⚠️ No answer choices available."
        );

        return;

    }


    /*
    =====================================================
    CREATE ANSWER BUTTONS
    =====================================================
    */

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


            /*
            A / B / C / D

            These letters are intentionally universal.
            They do NOT need translation.
            */

            const letter =
                String.fromCharCode(
                    65 + index
                );


            button.innerHTML =
                `
                <span class="trivia-answer-letter">
                    ${letter}
                </span>

                <span>
                    ${escapeHtml(option)}
                </span>
                `;


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

        if (
            !triviaState.active ||
            triviaState.answered ||
            !triviaState.currentQuestion
        ) {

            return;

        }


        triviaState.answered =
            true;


        const buttons =
            triviaAnswers
                ? triviaAnswers.querySelectorAll(
                    ".trivia-answer"
                )
                : [];


        buttons.forEach(button => {

            button.disabled =
                true;

        });


        selectedButton.classList.add(
            "selected"
        );


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
                    "Unable to check answer."
                );

            }


            const correct =
                data.correct === true;


            /* =============================================
               RECORD ANSWER
            ============================================= */

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


            /* =============================================
               CORRECT
            ============================================= */

            if (correct) {

                triviaState.correct++;

                triviaState.score +=
                    Number(
                        data.points
                    ) || 100;


                selectedButton.classList.add(
                    "correct"
                );


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


            /* =============================================
               WRONG
            ============================================= */

            else {

                selectedButton.classList.add(
                    "wrong"
                );


                buttons.forEach(button => {

                    if (
                        button.dataset.answer ===
                        triviaState.currentQuestion.correct_answer
                    ) {

                        button.classList.add(
                            "correct"
                        );

                    }

                });


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
                                data.explanation || ""
                            )}
                        </span>
                        `;

                }

            }


            if (triviaScoreElement) {

                triviaScoreElement.textContent =
                    triviaState.score;

            }


            if (triviaDifficulty) {

                triviaDifficulty.textContent =
                    getTriviaDifficulty()
                        .toUpperCase();

            }


            if (triviaFeedback) {

                triviaFeedback.style.display =
                    "flex";

            }


            if (nextTriviaButton) {

                nextTriviaButton.style.display =
                    "block";

                nextTriviaButton.disabled =
                    false;

            }

        }


        catch (error) {

            console.error(
                "TRIVIA ANSWER ERROR:",
                error
            );


            triviaState.answered =
                false;


            showToast(
                "⚠️ Unable to check answer."
            );


            buttons.forEach(button => {

                button.disabled =
                    false;

            });


            selectedButton.classList.remove(
                "selected"
            );

        }

    }


    /* =====================================================
       NEXT QUESTION
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


                if (triviaFeedback) {

                    triviaFeedback.style.display =
                        "none";

                    triviaFeedback.textContent =
                        "";

                    triviaFeedback.innerHTML =
                        "";

                }


                triviaState.questionIndex++;


                if (
                    triviaState.questionIndex >=
                    triviaState.questions.length
                ) {

                    finishTrivia();

                    return;

                }


                renderTriviaQuestion();

            }
        );

    }


    /* =====================================================
       NAYLA MEMORY
    ===================================================== */

    const NAYLA_MEMORY_FACTS = [

        {
            icon: "🌸",
            text:
                "Nayla lahir di Kumamoto, Jepang."
        },

        {
            icon: "🎤",
            text:
                "Di Ramune no Nomikata, unit song Nayla adalah Cross."
        },

        {
            icon: "🎤",
            text:
                "Di TWT, unit song Nayla adalah Glory Days."
        },

        {
            icon: "🎤",
            text:
                "Di Itadaki♥Love, unit song Nayla adalah Kataomoi no Karaage."
        },

        {
            icon: "🎤",
            text:
                "Di Pajama Drive, unit song Nayla adalah Pajama Drive."
        },

        {
            icon: "🦚",
            text:
                "Hewan yang berkaitan dengan BDTS Nayla adalah burung merak."
        },

        {
            icon: "📺",
            text:
                "Nama akun JKT48 SHOWROOM Nayla adalah Nayla / ナイラ（JKT48)."
        },

        {
            icon: "🎂",
            text:
                "Birthday Project Nayla tahun 2025 menggunakan #HappinessNaylalaland18."
        },

        {
            icon: "🎂",
            text:
                "Birthday Project Nayla tahun 2026 menggunakan #HappinessUndertheSpotl19."
        },

        {
            icon: "✨",
            text:
                "Nayla merupakan bagian dari JKT48 Generation 12."
        },

        {
            icon: "♊",
            text:
                "Zodiak Nayla adalah Gemini."
        },

        {
            icon: "💗",
            text:
                "Nayla Suji lahir pada 18 Juni 2007."
        }

    ];


    /* =====================================================
       RENDER NAYLA MEMORY
    ===================================================== */

    function renderNaylaMemory() {

        if (!naylaMemoryList) {
            return;
        }


        naylaMemoryList.innerHTML =
            "";


        const shuffled =
            [...NAYLA_MEMORY_FACTS]
                .sort(
                    () => Math.random() - 0.5
                );


        const selected =
            shuffled.slice(
                0,
                4
            );


        selected.forEach(
            fact => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "nayla-memory-card";


                item.innerHTML =
                    `
                    <div class="nayla-memory-icon">
                        ${fact.icon}
                    </div>

                    <p>
                        ${escapeHtml(
                            fact.text
                        )}
                    </p>
                    `;


                naylaMemoryList.appendChild(
                    item
                );

            }
        );

    }


    /* =====================================================
       TRIVIA RANK
    ===================================================== */

    function getTriviaRank(
        correct,
        total
    ) {

        if (
            correct >= total &&
            total > 0
        ) {

            return {

                icon:
                    "👑",

                title:
                    "Nayla Master",

                description:
                    "Perfect score! You really know Nayla."

            };

        }


        if (correct >= 4) {

            return {

                icon:
                    "🔥",

                title:
                    "Nayla Expert",

                description:
                    "Amazing! Your Nayla knowledge is impressive."

            };

        }


        if (correct >= 2) {

            return {

                icon:
                    "🌸",

                title:
                    "Nayla Supporter",

                description:
                    "You know Nayla pretty well!"

            };

        }


        return {

            icon:
                "🌱",

            title:
                "Casual Fan",

            description:
                "Keep exploring Nayla's journey!"

        };

    }


    /* =====================================================
       TRIVIA ACHIEVEMENTS
    ===================================================== */

    function calculateTriviaAchievements() {

        const records =
            triviaState.answeredQuestions || [];

        const total =
            triviaState.questions.length;

        const achievements = [];


        /* =============================================
           STAGE SPECIALIST
        ============================================= */

        const stageQuestions =
            records.filter(record => {

                const category =
                    String(
                        record.category || ""
                    ).toLowerCase();

                return (
                    category.includes("pajama") ||
                    category.includes("ramune") ||
                    category.includes("twt") ||
                    category.includes("itadaki") ||
                    category.includes("unit") ||
                    category.includes("stage") ||
                    category.includes("matching")
                );

            });


        const stageCorrect =
            stageQuestions.length > 0 &&
            stageQuestions.every(
                record =>
                    record.correct
            );


        if (stageCorrect) {

            achievements.push({

                icon:
                    "🎤",

                title:
                    "Stage Specialist",

                description:
                    "You answered every stage question correctly."

            });

        }


        /* =============================================
           BIRTHDAY DETECTIVE
        ============================================= */

        const birthdayQuestions =
            records.filter(record => {

                const category =
                    String(
                        record.category || ""
                    ).toLowerCase();

                return category.includes(
                    "birthday"
                );

            });


        const birthdayCorrect =
            birthdayQuestions.length > 0 &&
            birthdayQuestions.every(
                record =>
                    record.correct
            );


        if (birthdayCorrect) {

            achievements.push({

                icon:
                    "🎂",

                title:
                    "Birthday Detective",

                description:
                    "You answered every birthday project question correctly."

            });

        }


        /* =============================================
           PEACOCK KNOWLEDGE
        ============================================= */

        const peacockCorrect =
            records.some(record => {

                const category =
                    String(
                        record.category || ""
                    ).toLowerCase();

                return (
                    category.includes("bdts") &&
                    record.correct
                );

            });


        if (peacockCorrect) {

            achievements.push({

                icon:
                    "🦚",

                title:
                    "Peacock Knowledge",

                description:
                    "You know the BDTS peacock!"

            });

        }


        /* =============================================
           NAYLA MASTER
        ============================================= */

        if (
            total > 0 &&
            triviaState.correct === total
        ) {

            achievements.push({

                icon:
                    "👑",

                title:
                    "Nayla Master",

                description:
                    "Perfect 5/5! You truly know Nayla."

            });

        }


        return achievements;

    }


    /* =====================================================
       RENDER ACHIEVEMENTS
    ===================================================== */

    function renderTriviaAchievements() {

        if (!triviaAchievementList) {
            return;
        }


        triviaAchievementList.innerHTML =
            "";


        const achievements =
            calculateTriviaAchievements();


        if (achievements.length === 0) {

            const empty =
                document.createElement(
                    "div"
                );


            empty.className =
                "trivia-achievement-empty";


            empty.innerHTML =
                `
                <span>
                    🌱
                </span>

                <p>
                    Keep playing to unlock achievements!
                </p>
                `;


            triviaAchievementList.appendChild(
                empty
            );

            return;

        }


        achievements.forEach(
            achievement => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "trivia-achievement unlocked";


                item.innerHTML =
                    `
                    <div class="trivia-achievement-icon">
                        ${achievement.icon}
                    </div>

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

                    <div class="trivia-achievement-check">
                        ✓
                    </div>
                    `;


                triviaAchievementList.appendChild(
                    item
                );

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


        if (nextTriviaButton) {

            nextTriviaButton.disabled =
                true;

            nextTriviaButton.style.display =
                "none";

        }


        if (triviaGame) {

            triviaGame.style.display =
                "none";

        }


        if (triviaResult) {

            triviaResult.style.display =
                "block";

        }


        const total =
            triviaState.questions.length;

        const correct =
            triviaState.correct;


        if (triviaFinalScore) {

            triviaFinalScore.textContent =
                `${correct} / ${total}`;

        }


        let title =
            "Trivia Challenger";

        let message =
            "Good try! Let's learn more about Nayla.";


        if (correct === total) {

            title =
                "👑 NAYLA MASTER";

            message =
                "Perfect score! You really know Nayla! 🔥";

        }

        else if (correct >= 4) {

            title =
                "🌟 NAYLA EXPERT";

            message =
                "Amazing knowledge! You're almost at Master level.";

        }

        else if (correct >= 3) {

            title =
                "🔥 HARD MODE SURVIVOR";

            message =
                "Very impressive! Your Nayla knowledge is getting strong.";

        }

        else if (correct >= 2) {

            title =
                "🌸 TRIVIA RISING";

            message =
                "Not bad! Keep learning more about Nayla.";

        }


        if (triviaFinalTitle) {

            triviaFinalTitle.textContent =
                title;

        }


        if (triviaFinalMessage) {

            triviaFinalMessage.textContent =
                message;

        }


        /* =============================================
           RANK
        ============================================= */

        const rank =
            getTriviaRank(
                correct,
                total
            );


        if (triviaRank) {

            triviaRank.style.display =
                "block";

        }


        if (triviaRankIcon) {

            triviaRankIcon.textContent =
                rank.icon;

        }


        if (triviaRankTitle) {

            triviaRankTitle.textContent =
                rank.title;

        }


        if (triviaRankDescription) {

            triviaRankDescription.textContent =
                rank.description;

        }


        /* =============================================
           ACHIEVEMENTS
        ============================================= */

        renderTriviaAchievements();


        if (triviaAchievements) {

            triviaAchievements.style.display =
                "block";

        }


        /* =============================================
           NAYLA MEMORY
        ============================================= */

        renderNaylaMemory();


        if (naylaMemory) {

            naylaMemory.style.display =
                "block";

        }


        /* =============================================
           PROGRESS
        ============================================= */

        if (triviaProgressBar) {

            triviaProgressBar.style.width =
                "100%";

        }

    }


    /* =====================================================
       RESTART / PLAY AGAIN
    ===================================================== */

    if (restartTriviaButton) {

        restartTriviaButton.addEventListener(
            "click",
            () => {

                startTrivia();

            }
        );

    }


    /* =====================================================
       START BUTTON
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
       CLOSE TRIVIA
    ===================================================== */

    if (closeTriviaButton) {

        closeTriviaButton.addEventListener(
            "click",
            () => {

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

            }
        );

    }


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    resetResult();


    if (triviaWorkspace) {

        resetTriviaUI();

    }


    console.log(
        "AI JS READY"
    );

});
/* =========================================================
   AI PAGE TRANSLATION
   Nayla Seijin Shiki
   5 LANGUAGES
   ---------------------------------------------------------
   Supported:
   en = English
   id = Indonesian
   ja = Japanese
   zh = Chinese
   ko = Korean

   IMPORTANT:
   Navbar is the MASTER language system.

   Navbar uses:
       localStorage.getItem("language")

   Navbar dispatches:
       window "languageChanged"

   This file ONLY listens to that system.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    console.log("=================================");
    console.log("AI TRANSLATION INITIALIZED");
    console.log("=================================");


    /* =====================================================
       SUPPORTED LANGUAGES
    ===================================================== */

    const supportedLanguages = [
        "en",
        "id",
        "ja",
        "zh",
        "ko"
    ];


    /* =====================================================
       CURRENT LANGUAGE
       FOLLOW NAVBAR
    ===================================================== */

    let currentLanguage =
        localStorage.getItem("language") || "en";


    if (
        !supportedLanguages.includes(currentLanguage)
    ) {

        currentLanguage = "en";

    }


    /* =====================================================
       TRANSLATION DICTIONARY
    ===================================================== */

    const AI_TRANSLATIONS = {


        /* =================================================
           ENGLISH
        ================================================= */

        en: {

            ai: {

                heroLabel:
                    "人工知能 • AI SHRINE",

                heroTitle:
                    "A Little AI For Nayla",

                heroDescription:
                    "Create a beautiful message, wish, or letter for Nayla's Seijin Shiki.",

                introLabel:
                    "✦ CREATE SOMETHING SPECIAL ✦",

                introTitle:
                    "What would you like to write?",

                introDescription:
                    "Let the AI help you turn your thoughts into a meaningful message for Nayla.",


                tools: {

                    wish: {
                        title:
                            "Wish Generator",

                        description:
                            "Create a beautiful birthday or Seijin Shiki wish.",

                        button:
                            "Create Wish →"
                    },


                    enhance: {
                        title:
                            "Message Enhancer",

                        description:
                            "Turn your simple message into something more heartfelt.",

                        button:
                            "Enhance Message →"
                    },


                    fortune: {
                        title:
                            "Seijin Message",

                        description:
                            "Receive a small message about growth and new beginnings.",

                        button:
                            "Get Message →"
                    },


                    letter: {
                        title:
                            "Letter Generator",

                        description:
                            "Create a longer personal letter for Nayla.",

                        button:
                            "Write Letter →"
                    },


                    trivia: {
                        title:
                            "Nayla Trivia Master",

                        description:
                            "Challenge your knowledge about Nayla in an AI-powered quiz battle.",

                        button:
                            "Start Trivia Battle →"
                    }

                },


                form: {

                    name:
                        "Your name",

                    namePlaceholder:
                        "Your name (optional)",

                    message:
                        "What would you like to say?",

                    messagePlaceholder:
                        "Write your thoughts here...",

                    style:
                        "Writing style",

                    generate:
                        "✨ Generate"

                },


                styles: {

                    heartfelt:
                        "Heartfelt",

                    sweet:
                        "Sweet & Cute",

                    elegant:
                        "Elegant",

                    simple:
                        "Simple",

                    poetic:
                        "Poetic"

                },


                loading: {

                    title:
                        "Writing something special...",

                    description:
                        "Please wait a moment."

                },


                result: {

                    placeholderTitle:
                        "Your message will appear here.",

                    placeholderDescription:
                        "Choose an AI tool above, write your thoughts, and let the AI create something special.",

                    message:
                        "🌸 Your Message"

                },


                actions: {

                    copy:
                        "📋 Copy",

                    regenerate:
                        "🔄 Regenerate",

                    guestbook:
                        "🌸 Use in Guestbook"

                },


                dynamic: {

                    wishLabel:
                        "🌸 AI WISH GENERATOR",

                    wishTitle:
                        "Create Your Wish",

                    wishDescription:
                        "Create a beautiful birthday or Seijin Shiki wish for Nayla.",


                    enhanceLabel:
                        "✨ MESSAGE ENHANCER",

                    enhanceTitle:
                        "Enhance Your Message",

                    enhanceDescription:
                        "Turn your simple thoughts into a more heartfelt message for Nayla.",


                    fortuneLabel:
                        "🎋 SEIJIN MESSAGE",

                    fortuneTitle:
                        "Receive a Seijin Message",

                    fortuneDescription:
                        "Create a meaningful message about growth, adulthood and new beginnings.",


                    letterLabel:
                        "💌 LETTER GENERATOR",

                    letterTitle:
                        "Write a Letter for Nayla",

                    letterDescription:
                        "Create a longer and more personal letter for Nayla's Seijin Shiki."

                },


                closing: {

                    title:
                        "Words become memories.",

                    description:
                        "Maybe your message is only a few lines, but it may become a small memory someone remembers for a long time."

                }

            },


            trivia: {

                header: {

                    label:
                        "🤖 AI TRIVIA BATTLE",

                    title:
                        "Nayla Trivia Master",

                    description:
                        "How well do you really know Nayla?"

                },


                start: {

                    label:
                        "NAYLA AI",

                    title:
                        "I'll test your knowledge!",

                    description:
                        "Answer questions about Nayla, JKT48, her journey, performances, and memorable moments.",

                    button:
                        "⚔️ START BATTLE"

                },


                rules: {

                    questions:
                        "Questions",

                    challenges:
                        "Challenges",

                    rank:
                        "Master Rank"

                },


                game: {

                    question:
                        "QUESTION",

                    score:
                        "SCORE",

                    level:
                        "LEVEL",

                    defaultQuestion:
                        "I have a question for you...",

                    next:
                        "Next Question →"

                },


                result: {

                    label:
                        "TRIVIA COMPLETE",

                    finalScore:
                        "Final Score",

                    achievements:
                        "🏆 Achievements",

                    memory:
                        "🌸 A Little More About Nayla",

                    playAgain:
                        "🔄 PLAY AGAIN"

                },


                messages: {

                    correct:
                        "Correct! 🔥",

                    wrong:
                        "Not quite! 🌸",

                    correctFallback:
                        "You know Nayla well!",

                    wrongAnswer:
                        "Correct answer:",

                    preparing:
                        "Preparing your first challenge...",

                    unableStart:
                        "⚠️ Unable to start trivia.",

                    unableAnswer:
                        "⚠️ Unable to check answer."

                },


                ranks: {

                    master: {
                        title:
                            "Nayla Master",

                        description:
                            "Perfect score! You really know Nayla."
                    },

                    expert: {
                        title:
                            "Nayla Expert",

                        description:
                            "Amazing! Your Nayla knowledge is impressive."
                    },

                    supporter: {
                        title:
                            "Nayla Supporter",

                        description:
                            "You know Nayla pretty well!"
                    },

                    casual: {
                        title:
                            "Casual Fan",

                        description:
                            "Keep exploring Nayla's journey!"
                    }

                },


                achievements: {

                    stage: {
                        title:
                            "Stage Specialist",

                        description:
                            "You answered every stage question correctly."
                    },

                    birthday: {
                        title:
                            "Birthday Detective",

                        description:
                            "You answered every birthday project question correctly."
                    },

                    peacock: {
                        title:
                            "Peacock Knowledge",

                        description:
                            "You know the BDTS peacock!"
                    },

                    master: {
                        title:
                            "Nayla Master",

                        description:
                            "Perfect 5/5! You truly know Nayla."
                    },

                    empty:
                        "Keep playing to unlock achievements!"

                },


                final: {

                    challenger:
                        "Trivia Challenger",

                    challengerMessage:
                        "Good try! Let's learn more about Nayla.",

                    master:
                        "👑 NAYLA MASTER",

                    masterMessage:
                        "Perfect score! You really know Nayla! 🔥",

                    expert:
                        "🌟 NAYLA EXPERT",

                    expertMessage:
                        "Amazing knowledge! You're almost at Master level.",

                    survivor:
                        "🔥 HARD MODE SURVIVOR",

                    survivorMessage:
                        "Very impressive! Your Nayla knowledge is getting strong.",

                    rising:
                        "🌸 TRIVIA RISING",

                    risingMessage:
                        "Not bad! Keep learning more about Nayla."

                }

            }

        },


        /* =================================================
           INDONESIAN
        ================================================= */

        id: {

            ai: {

                heroLabel:
                    "人工知能 • AI SHRINE",

                heroTitle:
                    "Sedikit AI Untuk Nayla",

                heroDescription:
                    "Buat pesan, ucapan, atau surat yang indah untuk Seijin Shiki Nayla.",

                introLabel:
                    "✦ BUAT SESUATU YANG SPESIAL ✦",

                introTitle:
                    "Apa yang ingin kamu tulis?",

                introDescription:
                    "Biarkan AI membantu mengubah pikiranmu menjadi pesan yang bermakna untuk Nayla.",


                tools: {

                    wish: {
                        title:
                            "Pembuat Ucapan",

                        description:
                            "Buat ucapan ulang tahun atau Seijin Shiki yang indah.",

                        button:
                            "Buat Ucapan →"
                    },

                    enhance: {
                        title:
                            "Penyempurna Pesan",

                        description:
                            "Ubah pesan sederhana menjadi lebih menyentuh.",

                        button:
                            "Sempurnakan Pesan →"
                    },

                    fortune: {
                        title:
                            "Pesan Seijin",

                        description:
                            "Dapatkan pesan kecil tentang pertumbuhan dan awal yang baru.",

                        button:
                            "Dapatkan Pesan →"
                    },

                    letter: {
                        title:
                            "Pembuat Surat",

                        description:
                            "Buat surat pribadi yang lebih panjang untuk Nayla.",

                        button:
                            "Tulis Surat →"
                    },

                    trivia: {
                        title:
                            "Nayla Trivia Master",

                        description:
                            "Uji pengetahuanmu tentang Nayla dalam pertarungan kuis bertenaga AI.",

                        button:
                            "Mulai Trivia →"
                    }

                },


                form: {

                    name:
                        "Nama kamu",

                    namePlaceholder:
                        "Nama kamu (opsional)",

                    message:
                        "Apa yang ingin kamu sampaikan?",

                    messagePlaceholder:
                        "Tulis pikiranmu di sini...",

                    style:
                        "Gaya tulisan",

                    generate:
                        "✨ Buat Pesan"

                },


                styles: {

                    heartfelt:
                        "Penuh Perasaan",

                    sweet:
                        "Manis & Imut",

                    elegant:
                        "Elegan",

                    simple:
                        "Sederhana",

                    poetic:
                        "Puitis"

                },


                loading: {

                    title:
                        "Sedang menulis sesuatu yang spesial...",

                    description:
                        "Tunggu sebentar."

                },


                result: {

                    placeholderTitle:
                        "Pesanmu akan muncul di sini.",

                    placeholderDescription:
                        "Pilih AI tool di atas, tuliskan pikiranmu, lalu biarkan AI membuat sesuatu yang spesial.",

                    message:
                        "🌸 Pesanmu"

                },


                actions: {

                    copy:
                        "📋 Salin",

                    regenerate:
                        "🔄 Buat Lagi",

                    guestbook:
                        "🌸 Gunakan di Guestbook"

                },


                dynamic: {

                    wishLabel:
                        "🌸 AI PEMBUAT UCAPAN",

                    wishTitle:
                        "Buat Ucapanmu",

                    wishDescription:
                        "Buat ucapan ulang tahun atau Seijin Shiki yang indah untuk Nayla.",

                    enhanceLabel:
                        "✨ PENYEMPURNA PESAN",

                    enhanceTitle:
                        "Sempurnakan Pesanmu",

                    enhanceDescription:
                        "Ubah pikiran sederhanamu menjadi pesan yang lebih menyentuh untuk Nayla.",

                    fortuneLabel:
                        "🎋 PESAN SEIJIN",

                    fortuneTitle:
                        "Terima Pesan Seijin",

                    fortuneDescription:
                        "Buat pesan bermakna tentang pertumbuhan, kedewasaan, dan awal yang baru.",

                    letterLabel:
                        "💌 PEMBUAT SURAT",

                    letterTitle:
                        "Tulis Surat untuk Nayla",

                    letterDescription:
                        "Buat surat yang lebih panjang dan personal untuk Seijin Shiki Nayla."

                },


                closing: {

                    title:
                        "Kata-kata menjadi kenangan.",

                    description:
                        "Mungkin pesanmu hanya terdiri dari beberapa baris, tetapi bisa menjadi kenangan kecil yang diingat seseorang untuk waktu yang lama."

                }

            },


            trivia: {

                header: {

                    label:
                        "🤖 PERTARUNGAN TRIVIA AI",

                    title:
                        "Nayla Trivia Master",

                    description:
                        "Seberapa baik kamu benar-benar mengenal Nayla?"

                },


                start: {

                    label:
                        "NAYLA AI",

                    title:
                        "Aku akan menguji pengetahuanmu!",

                    description:
                        "Jawab pertanyaan tentang Nayla, JKT48, perjalanannya, penampilan, dan momen-momen berkesan.",

                    button:
                        "⚔️ MULAI BERTARUNG"

                },


                rules: {

                    questions:
                        "Pertanyaan",

                    challenges:
                        "Tantangan",

                    rank:
                        "Peringkat Master"

                },


                game: {

                    question:
                        "PERTANYAAN",

                    score:
                        "SKOR",

                    level:
                        "LEVEL",

                    defaultQuestion:
                        "Aku punya pertanyaan untukmu...",

                    next:
                        "Pertanyaan Berikutnya →"

                },


                result: {

                    label:
                        "TRIVIA SELESAI",

                    finalScore:
                        "Skor Akhir",

                    achievements:
                        "🏆 Pencapaian",

                    memory:
                        "🌸 Sedikit Lagi Tentang Nayla",

                    playAgain:
                        "🔄 MAIN LAGI"

                },


                messages: {

                    correct:
                        "Benar! 🔥",

                    wrong:
                        "Belum tepat! 🌸",

                    correctFallback:
                        "Kamu mengenal Nayla dengan baik!",

                    wrongAnswer:
                        "Jawaban yang benar:",

                    preparing:
                        "Menyiapkan tantangan pertamamu...",

                    unableStart:
                        "⚠️ Trivia tidak dapat dimulai.",

                    unableAnswer:
                        "⚠️ Jawaban tidak dapat diperiksa."

                },


                ranks: {

                    master: {
                        title:
                            "Nayla Master",

                        description:
                            "Skor sempurna! Kamu benar-benar mengenal Nayla."
                    },

                    expert: {
                        title:
                            "Nayla Expert",

                        description:
                            "Luar biasa! Pengetahuanmu tentang Nayla sangat mengesankan."
                    },

                    supporter: {
                        title:
                            "Nayla Supporter",

                        description:
                            "Kamu cukup mengenal Nayla!"
                    },

                    casual: {
                        title:
                            "Casual Fan",

                        description:
                            "Terus jelajahi perjalanan Nayla!"
                    }

                },


                achievements: {

                    stage: {
                        title:
                            "Stage Specialist",

                        description:
                            "Kamu menjawab semua pertanyaan tentang stage dengan benar."
                    },

                    birthday: {
                        title:
                            "Birthday Detective",

                        description:
                            "Kamu menjawab semua pertanyaan tentang birthday project dengan benar."
                    },

                    peacock: {
                        title:
                            "Peacock Knowledge",

                        description:
                            "Kamu tahu tentang burung merak BDTS!"
                    },

                    master: {
                        title:
                            "Nayla Master",

                        description:
                            "Sempurna 5/5! Kamu benar-benar mengenal Nayla."
                    },

                    empty:
                        "Terus bermain untuk membuka pencapaian!"

                },


                final: {

                    challenger:
                        "Trivia Challenger",

                    challengerMessage:
                        "Percobaan yang bagus! Yuk, kenali Nayla lebih jauh.",

                    master:
                        "👑 NAYLA MASTER",

                    masterMessage:
                        "Skor sempurna! Kamu benar-benar mengenal Nayla! 🔥",

                    expert:
                        "🌟 NAYLA EXPERT",

                    expertMessage:
                        "Pengetahuanmu luar biasa! Sedikit lagi menuju Master.",

                    survivor:
                        "🔥 HARD MODE SURVIVOR",

                    survivorMessage:
                        "Sangat mengesankan! Pengetahuanmu tentang Nayla semakin kuat.",

                    rising:
                        "🌸 TRIVIA RISING",

                    risingMessage:
                        "Lumayan! Terus belajar lebih banyak tentang Nayla."

                }

            }

        },


        /* =================================================
           JAPANESE
        ================================================= */

        ja: {

            ai: {

                heroLabel:
                    "人工知能 • AI SHRINE",

                heroTitle:
                    "Naylaのための小さなAI",

                heroDescription:
                    "Naylaの成人式のために、素敵なメッセージやお祝い、手紙を作りましょう。",

                introLabel:
                    "✦ 特別なものを作ろう ✦",

                introTitle:
                    "何を書きたいですか？",

                introDescription:
                    "AIがあなたの想いをNaylaへの心のこもったメッセージに変えるお手伝いをします.",


                tools: {

                    wish: {
                        title:
                            "お祝いメッセージ",

                        description:
                            "誕生日や成人式のお祝いメッセージを作ります。",

                        button:
                            "お祝いを作る →"
                    },

                    enhance: {
                        title:
                            "メッセージを整える",

                        description:
                            "シンプルなメッセージを、より心のこもった文章にします。",

                        button:
                            "メッセージを整える →"
                    },

                    fortune: {
                        title:
                            "成人式メッセージ",

                        description:
                            "成長や新しい始まりについてのメッセージを作ります。",

                        button:
                            "メッセージを受け取る →"
                    },

                    letter: {
                        title:
                            "手紙ジェネレーター",

                        description:
                            "Naylaへの長くてパーソナルな手紙を作ります。",

                        button:
                            "手紙を書く →"
                    },

                    trivia: {
                        title:
                            "Nayla Trivia Master",

                        description:
                            "AIクイズでNaylaについての知識を試しましょう。",

                        button:
                            "トリビアを始める →"
                    }

                },


                form: {

                    name:
                        "あなたの名前",

                    namePlaceholder:
                        "あなたの名前（任意）",

                    message:
                        "何を伝えたいですか？",

                    messagePlaceholder:
                        "ここにあなたの想いを書いてください...",

                    style:
                        "文章のスタイル",

                    generate:
                        "✨ メッセージを作る"

                },


                styles: {

                    heartfelt:
                        "心のこもった",

                    sweet:
                        "かわいくて優しい",

                    elegant:
                        "エレガント",

                    simple:
                        "シンプル",

                    poetic:
                        "詩的"

                },


                loading: {

                    title:
                        "特別なメッセージを書いています...",

                    description:
                        "少々お待ちください。"

                },


                result: {

                    placeholderTitle:
                        "ここにメッセージが表示されます。",

                    placeholderDescription:
                        "上のAIツールを選び、想いを書いて、AIに特別なメッセージを作ってもらいましょう。",

                    message:
                        "🌸 あなたのメッセージ"

                },


                actions: {

                    copy:
                        "📋 コピー",

                    regenerate:
                        "🔄 もう一度作る",

                    guestbook:
                        "🌸 ゲストブックで使用"

                },


                dynamic: {

                    wishLabel:
                        "🌸 AI お祝いメッセージ",

                    wishTitle:
                        "お祝いメッセージを作る",

                    wishDescription:
                        "Naylaの誕生日や成人式のための素敵なお祝いメッセージを作ります。",

                    enhanceLabel:
                        "✨ メッセージを整える",

                    enhanceTitle:
                        "メッセージをより素敵に",

                    enhanceDescription:
                        "あなたの想いを、より心のこもったNaylaへのメッセージにします。",

                    fortuneLabel:
                        "🎋 成人式メッセージ",

                    fortuneTitle:
                        "成人式メッセージを受け取る",

                    fortuneDescription:
                        "成長、大人への一歩、新しい始まりについてのメッセージを作ります。",

                    letterLabel:
                        "💌 手紙ジェネレーター",

                    letterTitle:
                        "Naylaへの手紙を書く",

                    letterDescription:
                        "Naylaの成人式のために、より長くパーソナルな手紙を作ります。"

                },


                closing: {

                    title:
                        "言葉は思い出になる。",

                    description:
                        "あなたのメッセージは数行だけかもしれません。でも、それは誰かの心に長く残る小さな思い出になるかもしれません。"

                }

            },


            trivia: {

                header: {

                    label:
                        "🤖 AI トリビアバトル",

                    title:
                        "Nayla Trivia Master",

                    description:
                        "あなたはNaylaのことをどれくらい知っていますか？"

                },


                start: {

                    label:
                        "NAYLA AI",

                    title:
                        "あなたの知識を試します！",

                    description:
                        "Nayla、JKT48、これまでの歩み、パフォーマンス、思い出に残る瞬間について答えてください。",

                    button:
                        "⚔️ バトル開始"

                },


                rules: {

                    questions:
                        "問題",

                    challenges:
                        "チャレンジ",

                    rank:
                        "マスターランク"

                },


                game: {

                    question:
                        "問題",

                    score:
                        "スコア",

                    level:
                        "レベル",

                    defaultQuestion:
                        "あなたに質問があります...",

                    next:
                        "次の問題 →"

                },


                result: {

                    label:
                        "トリビア終了",

                    finalScore:
                        "最終スコア",

                    achievements:
                        "🏆 アチーブメント",

                    memory:
                        "🌸 Naylaについてもう少し",

                    playAgain:
                        "🔄 もう一度プレイ"

                },


                messages: {

                    correct:
                        "正解！ 🔥",

                    wrong:
                        "惜しい！ 🌸",

                    correctFallback:
                        "Naylaのことをよく知っていますね！",

                    wrongAnswer:
                        "正解：",

                    preparing:
                        "最初のチャレンジを準備しています...",

                    unableStart:
                        "⚠️ トリビアを開始できませんでした。",

                    unableAnswer:
                        "⚠️ 回答を確認できませんでした。"

                },


                ranks: {

                    master: {
                        title:
                            "Nayla Master",

                        description:
                            "パーフェクトスコア！Naylaのことを本当によく知っていますね。"
                    },

                    expert: {
                        title:
                            "Nayla Expert",

                        description:
                            "素晴らしい！Naylaについての知識がすごいです。"
                    },

                    supporter: {
                        title:
                            "Nayla Supporter",

                        description:
                            "Naylaのことをかなり知っていますね！"
                    },

                    casual: {
                        title:
                            "Casual Fan",

                        description:
                            "これからもNaylaの歩みを楽しみましょう！"
                    }

                },


                achievements: {

                    stage: {
                        title:
                            "Stage Specialist",

                        description:
                            "ステージに関する問題をすべて正解しました。"
                    },

                    birthday: {
                        title:
                            "Birthday Detective",

                        description:
                            "バースデープロジェクトに関する問題をすべて正解しました。"
                    },

                    peacock: {
                        title:
                            "Peacock Knowledge",

                        description:
                            "BDTSのクジャクについて知っていますね！"
                    },

                    master: {
                        title:
                            "Nayla Master",

                        description:
                            "5/5パーフェクト！Naylaのことを本当によく知っています。"
                    },

                    empty:
                        "プレイを続けてアチーブメントを解除しましょう！"

                },


                final: {

                    challenger:
                        "Trivia Challenger",

                    challengerMessage:
                        "よく頑張りました！もっとNaylaについて知っていきましょう。",

                    master:
                        "👑 NAYLA MASTER",

                    masterMessage:
                        "パーフェクトスコア！Naylaのことを本当によく知っています！🔥",

                    expert:
                        "🌟 NAYLA EXPERT",

                    expertMessage:
                        "素晴らしい知識です！マスターまであと少し！",

                    survivor:
                        "🔥 HARD MODE SURVIVOR",

                    survivorMessage:
                        "すごい！Naylaについての知識がどんどん深まっています。",

                    rising:
                        "🌸 TRIVIA RISING",

                    risingMessage:
                        "なかなかです！もっとNaylaについて学んでみましょう。"

                }

            }

        },


        /* =================================================
           CHINESE
        ================================================= */

        zh: {

            ai: {

                heroLabel:
                    "人工智能 • AI 神社",

                heroTitle:
                    "给 Nayla 的小小 AI",

                heroDescription:
                    "为 Nayla 的成人礼创作一段美好的祝福、留言或信件。",

                introLabel:
                    "✦ 创造一些特别的回忆 ✦",

                introTitle:
                    "你想写些什么？",

                introDescription:
                    "让 AI 帮助你把心中的想法变成一段送给 Nayla 的特别留言。",


                tools: {

                    wish: {
                        title:
                            "祝福生成器",

                        description:
                            "为生日或成人礼创作一段美好的祝福。",

                        button:
                            "生成祝福 →"
                    },

                    enhance: {
                        title:
                            "留言润色",

                        description:
                            "把简单的留言变成更加真挚动人的文字。",

                        button:
                            "润色留言 →"
                    },

                    fortune: {
                        title:
                            "成人礼寄语",

                        description:
                            "获得一段关于成长与新开始的小小寄语。",

                        button:
                            "获取寄语 →"
                    },

                    letter: {
                        title:
                            "信件生成器",

                        description:
                            "为 Nayla 创作一封更长、更个人化的信。",

                        button:
                            "写一封信 →"
                    },

                    trivia: {
                        title:
                            "Nayla Trivia Master",

                        description:
                            "通过 AI 问答挑战你对 Nayla 的了解。",

                        button:
                            "开始 Trivia →"
                    }

                },


                form: {

                    name:
                        "你的名字",

                    namePlaceholder:
                        "你的名字（可选）",

                    message:
                        "你想说些什么？",

                    messagePlaceholder:
                        "在这里写下你的想法...",

                    style:
                        "写作风格",

                    generate:
                        "✨ 生成留言"

                },


                styles: {

                    heartfelt:
                        "真挚感人",

                    sweet:
                        "甜美可爱",

                    elegant:
                        "优雅",

                    simple:
                        "简单",

                    poetic:
                        "诗意"

                },


                loading: {

                    title:
                        "正在写一些特别的内容...",

                    description:
                        "请稍等片刻。"

                },


                result: {

                    placeholderTitle:
                        "你的留言会出现在这里。",

                    placeholderDescription:
                        "选择上面的 AI 工具，写下你的想法，让 AI 为你创造一些特别的内容。",

                    message:
                        "🌸 你的留言"

                },


                actions: {

                    copy:
                        "📋 复制",

                    regenerate:
                        "🔄 重新生成",

                    guestbook:
                        "🌸 用于留言簿"

                },


                dynamic: {

                    wishLabel:
                        "🌸 AI 祝福生成器",

                    wishTitle:
                        "创建你的祝福",

                    wishDescription:
                        "为 Nayla 的生日或成人礼创作一段美好的祝福。",

                    enhanceLabel:
                        "✨ 留言润色",

                    enhanceTitle:
                        "让你的留言更特别",

                    enhanceDescription:
                        "把简单的想法变成一段更加真挚的 Nayla 留言。",

                    fortuneLabel:
                        "🎋 成人礼寄语",

                    fortuneTitle:
                        "获取成人礼寄语",

                    fortuneDescription:
                        "创作一段关于成长、成年和新开始的有意义寄语。",

                    letterLabel:
                        "💌 信件生成器",

                    letterTitle:
                        "写一封给 Nayla 的信",

                    letterDescription:
                        "为 Nayla 的成人礼创作一封更长、更个人化的信。"

                },


                closing: {

                    title:
                        "文字会成为回忆。",

                    description:
                        "你的留言也许只有几行，但它可能会成为某个人长久记住的一段小小回忆。"

                }

            },


            trivia: {

                header: {

                    label:
                        "🤖 AI Trivia 对战",

                    title:
                        "Nayla Trivia Master",

                    description:
                        "你到底有多了解 Nayla？"

                },


                start: {

                    label:
                        "NAYLA AI",

                    title:
                        "让我来测试你的知识！",

                    description:
                        "回答关于 Nayla、JKT48、她的成长历程、舞台表演和难忘瞬间的问题。",

                    button:
                        "⚔️ 开始挑战"

                },


                rules: {

                    questions:
                        "问题",

                    challenges:
                        "挑战",

                    rank:
                        "大师等级"

                },


                game: {

                    question:
                        "问题",

                    score:
                        "分数",

                    level:
                        "等级",

                    defaultQuestion:
                        "我有一个问题想问你...",

                    next:
                        "下一题 →"

                },


                result: {

                    label:
                        "Trivia 完成",

                    finalScore:
                        "最终得分",

                    achievements:
                        "🏆 成就",

                    memory:
                        "🌸 更多关于 Nayla",

                    playAgain:
                        "🔄 再玩一次"

                },


                messages: {

                    correct:
                        "答对了！ 🔥",

                    wrong:
                        "差一点！ 🌸",

                    correctFallback:
                        "你很了解 Nayla！",

                    wrongAnswer:
                        "正确答案：",

                    preparing:
                        "正在准备第一个挑战...",

                    unableStart:
                        "⚠️ 无法开始 Trivia。",

                    unableAnswer:
                        "⚠️ 无法检查答案。"

                },


                ranks: {

                    master: {
                        title:
                            "Nayla Master",

                        description:
                            "满分！你真的非常了解 Nayla。"
                    },

                    expert: {
                        title:
                            "Nayla Expert",

                        description:
                            "太棒了！你对 Nayla 的了解令人印象深刻。"
                    },

                    supporter: {
                        title:
                            "Nayla Supporter",

                        description:
                            "你对 Nayla 相当了解！"
                    },

                    casual: {
                        title:
                            "Casual Fan",

                        description:
                            "继续探索 Nayla 的成长旅程吧！"
                    }

                },


                achievements: {

                    stage: {
                        title:
                            "Stage Specialist",

                        description:
                            "你正确回答了所有舞台相关问题。"
                    },

                    birthday: {
                        title:
                            "Birthday Detective",

                        description:
                            "你正确回答了所有生日企划相关问题。"
                    },

                    peacock: {
                        title:
                            "Peacock Knowledge",

                        description:
                            "你知道 BDTS 的孔雀！"
                    },

                    master: {
                        title:
                            "Nayla Master",

                        description:
                            "5/5 完美！你真的很了解 Nayla。"
                    },

                    empty:
                        "继续游戏来解锁更多成就！"

                },


                final: {

                    challenger:
                        "Trivia Challenger",

                    challengerMessage:
                        "不错的尝试！继续了解更多关于 Nayla 的故事吧。",

                    master:
                        "👑 NAYLA MASTER",

                    masterMessage:
                        "满分！你真的非常了解 Nayla！🔥",

                    expert:
                        "🌟 NAYLA EXPERT",

                    expertMessage:
                        "知识太棒了！距离 Master 只差一步！",

                    survivor:
                        "🔥 HARD MODE SURVIVOR",

                    survivorMessage:
                        "非常厉害！你对 Nayla 的了解越来越深了。",

                    rising:
                        "🌸 TRIVIA RISING",

                    risingMessage:
                        "还不错！继续学习更多关于 Nayla 的故事吧。"

                }

            }

        },


        /* =================================================
           KOREAN
        ================================================= */

        ko: {

            ai: {

                heroLabel:
                    "인공지능 • AI SHRINE",

                heroTitle:
                    "Nayla를 위한 작은 AI",

                heroDescription:
                    "Nayla의 성인식을 위한 아름다운 메시지, 축하 글 또는 편지를 만들어보세요.",

                introLabel:
                    "✦ 특별한 것을 만들어보세요 ✦",

                introTitle:
                    "무엇을 쓰고 싶나요?",

                introDescription:
                    "AI가 여러분의 생각을 Nayla에게 전하는 의미 있는 메시지로 만들어드립니다.",


                tools: {

                    wish: {
                        title:
                            "축하 메시지 생성기",

                        description:
                            "생일이나 성인식을 위한 아름다운 축하 메시지를 만들어보세요.",

                        button:
                            "축하 메시지 만들기 →"
                    },

                    enhance: {
                        title:
                            "메시지 다듬기",

                        description:
                            "간단한 메시지를 더욱 진심 어린 글로 바꿔드립니다.",

                        button:
                            "메시지 다듬기 →"
                    },

                    fortune: {
                        title:
                            "성인식 메시지",

                        description:
                            "성장과 새로운 시작에 관한 작은 메시지를 받아보세요.",

                        button:
                            "메시지 받기 →"
                    },

                    letter: {
                        title:
                            "편지 생성기",

                        description:
                            "Nayla를 위한 더 길고 개인적인 편지를 만들어보세요.",

                        button:
                            "편지 쓰기 →"
                    },

                    trivia: {
                        title:
                            "Nayla Trivia Master",

                        description:
                            "AI 퀴즈를 통해 Nayla에 대해 얼마나 알고 있는지 도전해보세요.",

                        button:
                            "Trivia 시작하기 →"
                    }

                },


                form: {

                    name:
                        "이름",

                    namePlaceholder:
                        "이름 (선택사항)",

                    message:
                        "무엇을 전하고 싶나요?",

                    messagePlaceholder:
                        "여기에 여러분의 생각을 적어주세요...",

                    style:
                        "글쓰기 스타일",

                    generate:
                        "✨ 메시지 만들기"

                },


                styles: {

                    heartfelt:
                        "진심 어린",

                    sweet:
                        "달콤하고 귀여운",

                    elegant:
                        "우아한",

                    simple:
                        "심플한",

                    poetic:
                        "시적인"

                },


                loading: {

                    title:
                        "특별한 메시지를 작성하고 있습니다...",

                    description:
                        "잠시만 기다려주세요."

                },


                result: {

                    placeholderTitle:
                        "여기에 메시지가 표시됩니다.",

                    placeholderDescription:
                        "위의 AI 도구를 선택하고 생각을 적어주세요. AI가 특별한 메시지를 만들어드립니다.",

                    message:
                        "🌸 여러분의 메시지"

                },


                actions: {

                    copy:
                        "📋 복사",

                    regenerate:
                        "🔄 다시 만들기",

                    guestbook:
                        "🌸 방명록에서 사용"

                },


                dynamic: {

                    wishLabel:
                        "🌸 AI 축하 메시지 생성기",

                    wishTitle:
                        "축하 메시지 만들기",

                    wishDescription:
                        "Nayla의 생일이나 성인식을 위한 아름다운 축하 메시지를 만들어보세요.",

                    enhanceLabel:
                        "✨ 메시지 다듬기",

                    enhanceTitle:
                        "메시지를 더 특별하게",

                    enhanceDescription:
                        "여러분의 생각을 더욱 진심 어린 Nayla를 위한 메시지로 만들어드립니다.",

                    fortuneLabel:
                        "🎋 성인식 메시지",

                    fortuneTitle:
                        "성인식 메시지 받기",

                    fortuneDescription:
                        "성장, 성인이 되는 과정과 새로운 시작에 관한 의미 있는 메시지를 만들어보세요.",

                    letterLabel:
                        "💌 편지 생성기",

                    letterTitle:
                        "Nayla에게 편지 쓰기",

                    letterDescription:
                        "Nayla의 성인식을 위한 더 길고 개인적인 편지를 만들어보세요."

                },


                closing: {

                    title:
                        "말은 추억이 됩니다.",

                    description:
                        "여러분의 메시지는 몇 줄뿐일 수도 있지만, 누군가에게 오랫동안 기억되는 작은 추억이 될 수 있습니다."

                }

            },


            trivia: {

                header: {

                    label:
                        "🤖 AI TRIVIA BATTLE",

                    title:
                        "Nayla Trivia Master",

                    description:
                        "당신은 Nayla를 얼마나 잘 알고 있나요?"

                },


                start: {

                    label:
                        "NAYLA AI",

                    title:
                        "여러분의 지식을 테스트해볼게요!",

                    description:
                        "Nayla, JKT48, 그녀의 여정, 공연 그리고 기억에 남는 순간에 관한 질문에 답해보세요.",

                    button:
                        "⚔️ 배틀 시작"

                },


                rules: {

                    questions:
                        "문제",

                    challenges:
                        "도전",

                    rank:
                        "마스터 랭크"

                },


                game: {

                    question:
                        "문제",

                    score:
                        "점수",

                    level:
                        "레벨",

                    defaultQuestion:
                        "여러분에게 질문이 있어요...",

                    next:
                        "다음 문제 →"

                },


                result: {

                    label:
                        "TRIVIA 완료",

                    finalScore:
                        "최종 점수",

                    achievements:
                        "🏆 업적",

                    memory:
                        "🌸 Nayla에 대해 조금 더",

                    playAgain:
                        "🔄 다시 플레이"

                },


                messages: {

                    correct:
                        "정답입니다! 🔥",

                    wrong:
                        "아쉽네요! 🌸",

                    correctFallback:
                        "Nayla를 정말 잘 알고 있네요!",

                    wrongAnswer:
                        "정답:",

                    preparing:
                        "첫 번째 도전을 준비하고 있습니다...",

                    unableStart:
                        "⚠️ Trivia를 시작할 수 없습니다.",

                    unableAnswer:
                        "⚠️ 답변을 확인할 수 없습니다."

                },


                ranks: {

                    master: {
                        title:
                            "Nayla Master",

                        description:
                            "만점입니다! Nayla를 정말 잘 알고 있네요."
                    },

                    expert: {
                        title:
                            "Nayla Expert",

                        description:
                            "대단해요! Nayla에 대한 지식이 정말 놀랍습니다."
                    },

                    supporter: {
                        title:
                            "Nayla Supporter",

                        description:
                            "Nayla를 꽤 잘 알고 있네요!"
                    },

                    casual: {
                        title:
                            "Casual Fan",

                        description:
                            "Nayla의 여정을 계속 알아가보세요!"
                    }

                },


                achievements: {

                    stage: {
                        title:
                            "Stage Specialist",

                        description:
                            "무대에 관한 모든 문제를 맞혔습니다."
                    },

                    birthday: {
                        title:
                            "Birthday Detective",

                        description:
                            "생일 프로젝트에 관한 모든 문제를 맞혔습니다."
                    },

                    peacock: {
                        title:
                            "Peacock Knowledge",

                        description:
                            "BDTS의 공작새에 대해 알고 있네요!"
                    },

                    master: {
                        title:
                            "Nayla Master",

                        description:
                            "5/5 완벽합니다! Nayla를 정말 잘 알고 있네요."
                    },

                    empty:
                        "계속 플레이하여 업적을 잠금 해제하세요!"

                },


                final: {

                    challenger:
                        "Trivia Challenger",

                    challengerMessage:
                        "좋은 도전이었어요! Nayla에 대해 더 알아가 봐요.",

                    master:
                        "👑 NAYLA MASTER",

                    masterMessage:
                        "완벽한 점수! Nayla를 정말 잘 알고 있네요! 🔥",

                    expert:
                        "🌟 NAYLA EXPERT",

                    expertMessage:
                        "놀라운 지식이에요! Master까지 거의 다 왔어요.",

                    survivor:
                        "🔥 HARD MODE SURVIVOR",

                    survivorMessage:
                        "정말 대단해요! Nayla에 대한 지식이 점점 깊어지고 있어요.",

                    rising:
                        "🌸 TRIVIA RISING",

                    risingMessage:
                        "나쁘지 않아요! Nayla에 대해 더 많이 배워보세요."

                }

            }

        }

    };


    /* =====================================================
       GET NESTED TRANSLATION
    ===================================================== */

    function getTranslation(
        path,
        language = currentLanguage
    ) {

        const dictionary =
            AI_TRANSLATIONS[language] ||
            AI_TRANSLATIONS.en;


        return path
            .split(".")
            .reduce(
                (object, key) => {

                    if (
                        object &&
                        Object.prototype.hasOwnProperty.call(
                            object,
                            key
                        )
                    ) {

                        return object[key];

                    }

                    return null;

                },
                dictionary
            );

    }


    /* =====================================================
       APPLY AI TRANSLATION
    ===================================================== */

    function translateAIPage() {

        currentLanguage =
            localStorage.getItem("language") ||
            "en";


        if (
            !supportedLanguages.includes(
                currentLanguage
            )
        ) {

            currentLanguage = "en";

        }


        /* ================================================
           NORMAL TEXT
        ================================================= */

document
    .querySelectorAll("[data-i18n]")
    .forEach(element => {

        const key =
            element.dataset.i18n;

        if (!key) {
            return;
        }

        /*
        =====================================================
        IMPORTANT - TRIVIA QUESTION PROTECTION
        =====================================================

        #triviaQuestion menggunakan data-i18n hanya untuk
        placeholder awal.

        Setelah Trivia dimulai, isi element ini berasal dari
        backend /api/ai/trivia/start.

        JANGAN biarkan sistem translation menimpanya kembali
        menjadi "I have a question for you..."
        */

        if (
            element.id === "triviaQuestion" &&
            triviaState &&
            triviaState.active === true
        ) {
            return;
        }

        const translation =
            getTranslation(key);

        if (
            translation !== null &&
            translation !== undefined
        ) {
            element.textContent =
                translation;
        }

    });


        /* ================================================
           PLACEHOLDERS
        ================================================= */

        document
            .querySelectorAll(
                "[data-i18n-placeholder]"
            )
            .forEach(
                element => {

                    const key =
                        element.dataset.i18nPlaceholder;


                    const translation =
                        getTranslation(
                            key
                        );


                    if (
                        translation !== null &&
                        translation !== undefined
                    ) {

                        element.placeholder =
                            translation;

                    }

                }
            );


        /* ================================================
           SELECT OPTIONS
        ================================================= */

        document
            .querySelectorAll(
                "#aiStyle option[data-i18n]"
            )
            .forEach(
                option => {

                    const translation =
                        getTranslation(
                            option.dataset.i18n
                        );


                    if (
                        translation !== null &&
                        translation !== undefined
                    ) {

                        option.textContent =
                            translation;

                    }

                }
            );


        /* ================================================
           DYNAMIC AI WORKSPACE
        ================================================= */

        translateDynamicWorkspace();


        /* ================================================
           DYNAMIC TRIVIA
        ================================================= */

        translateTriviaDynamic();


        /* ================================================
           HTML LANG
        ================================================= */

        document.documentElement.lang =
            currentLanguage;


        console.log(
            "[AI Translation] Applied:",
            currentLanguage
        );

    }


    /* =====================================================
       DYNAMIC AI WORKSPACE
    ===================================================== */

    function translateDynamicWorkspace() {

        const activeTool =
            document.querySelector(
                ".ai-tool-card.active"
            );


        const mode =
            activeTool?.dataset.aiMode;


        if (!mode) {
            return;
        }


        const map = {

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


        const config =
            map[mode];


        if (!config) {
            return;
        }


        const label =
            document.getElementById(
                "aiModeLabel"
            );


        const title =
            document.getElementById(
                "aiWorkspaceTitle"
            );


        const description =
            document.getElementById(
                "aiWorkspaceDescription"
            );


        if (label) {

            label.textContent =
                getTranslation(
                    config.label
                );

        }


        if (title) {

            title.textContent =
                getTranslation(
                    config.title
                );

        }


        if (description) {

            description.textContent =
                getTranslation(
                    config.description
                );

        }

    }


    /* =====================================================
       DYNAMIC TRIVIA
    ===================================================== */

/* =====================================================
   DYNAMIC TRIVIA TRANSLATION
===================================================== */

function translateTriviaDynamic() {

    const question =
        document.getElementById(
            "triviaQuestion"
        );

    if (!question) {
        return;
    }

    /*
    =====================================================
    ACTIVE TRIVIA

    Jangan pernah mengganti pertanyaan aktif.

    Pertanyaan aktif berasal dari:
        /api/ai/trivia/start

    dan sudah diterjemahkan oleh backend.
    =====================================================
    */

    if (
        triviaState &&
        triviaState.active === true
    ) {
        return;
    }

    /*
    =====================================================
    BEFORE TRIVIA START

    Hanya tampilkan placeholder sesuai bahasa.
    =====================================================
    */

    const translation =
        getTranslation(
            "trivia.game.defaultQuestion"
        );

    if (
        translation !== null &&
        translation !== undefined &&
        String(translation).trim()
    ) {

        question.textContent =
            translation;

    }

}

    /* =====================================================
       LISTEN TO NAVBAR LANGUAGE SYSTEM
    ===================================================== */

    window.addEventListener(
        "languageChanged",
        function (event) {

            const language =
                event.detail?.language;


            if (!language) {
                return;
            }


            if (
                !supportedLanguages.includes(
                    language
                )
            ) {

                console.warn(
                    "[AI Translation] Unsupported language:",
                    language
                );

                return;

            }


            currentLanguage =
                language;

            /*
=====================================================
IF TRIVIA IS CURRENTLY ACTIVE
=====================================================

Restart trivia using the newly selected language.

This guarantees that:
- question
- options
- correct answer
- explanation

all come from the same language bank.
*/

if (
    triviaState &&
    triviaState.active === true
) {

    startTrivia();

    return;

}
                
            /*
                Navbar already saves:

                localStorage.setItem(
                    "language",
                    language
                );

                So AI does NOT need to save
                another language key.
            */


            translateAIPage();


            document.dispatchEvent(
                new CustomEvent(
                    "aiLanguageChanged",
                    {
                        detail: {
                            language:
                                language
                        }
                    }
                )
            );


            console.log(
                "[AI Translation] Navbar language changed:",
                language
            );

        }
    );


    /* =====================================================
       GLOBAL AI LANGUAGE API
       OPTIONAL
    ===================================================== */

    window.setAILanguage =
        function(language) {

            if (
                !supportedLanguages.includes(
                    language
                )
            ) {

                console.warn(
                    "[AI Translation] Unsupported language:",
                    language
                );

                return;

            }


            /*
                Update the MASTER navbar system.

                This keeps navbar + AI synchronized.
            */

            localStorage.setItem(
                "language",
                language
            );


            currentLanguage =
                language;


            translateAIPage();


            /*
                Notify other components.
            */

            window.dispatchEvent(
                new CustomEvent(
                    "languageChanged",
                    {
                        detail: {
                            language:
                                language
                        }
                    }
                )
            );

        };


    /* =====================================================
       GET AI LANGUAGE
    ===================================================== */

    window.getAILanguage =
        function() {

            return currentLanguage;

        };


    /* =====================================================
       TRANSLATION HELPER
    ===================================================== */

    window.aiTranslate =
        function(
            path,
            fallback = ""
        ) {

            const result =
                getTranslation(
                    path
                );


            return (
                result !== null &&
                result !== undefined
            )
                ? result
                : fallback;

        };


    /* =====================================================
       OBSERVE DYNAMIC AI CONTENT
    ===================================================== */

    const aiPage =
        document.querySelector(
            ".ai-page"
        );


    if (aiPage) {

        const observer =
            new MutationObserver(
                mutations => {

                    let shouldTranslate =
                        false;


                    mutations.forEach(
                        mutation => {

                            if (
                                mutation.type ===
                                "childList" ||

                                mutation.type ===
                                "attributes"
                            ) {

                                shouldTranslate =
                                    true;

                            }

                        }
                    );


                    if (shouldTranslate) {

                        clearTimeout(
                            window._aiTranslationTimer
                        );


                        window._aiTranslationTimer =
                            setTimeout(
                                () => {

                                    translateAIPage();

                                },
                                30
                            );

                    }

                }
            );


        observer.observe(
            aiPage,
            {

                childList:
                    true,

                subtree:
                    true,

                attributes:
                    true,

                attributeFilter: [
                    "class",
                    "style"
                ]

            }
        );

    }


    /* =====================================================
       INITIAL TRANSLATION
    ===================================================== */

    translateAIPage();


    console.log(
        "================================="
    );

    console.log(
        "AI TRANSLATION READY"
    );

    console.log(
        "Language:",
        currentLanguage
    );

    console.log(
        "================================="
    );


    /* =====================================================
       INITIAL GLOBAL API
    ===================================================== */

    window.AITranslations =
        AI_TRANSLATIONS;

});