const openaiApiKey = "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";

async function generateQuestion() {
    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiApiKey}`
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: "Generate a quiz question with four answer options, and specify the correct answer.",
                max_tokens: 100
            })
        });
        
        const data = await response.json();
        const question = parseQuestion(data.choices[0].text);
        displayQuestion(question);
    } catch (error) {
        console.error("Error generating question:", error);
    }
}

function parseQuestion(text) {
    // Basic parsing - adjust based on OpenAI's response format
    const lines = text.trim().split("\n");
    return {
        question: lines[0],
        options: lines.slice(1, 5),
        correctAnswer: lines[5] || lines[4] // assumes last line is the answer
    };
}

function displayQuestion({ question, options, correctAnswer }) {
    document.getElementById("question").innerText = question;
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = '';

    options.forEach(option => {
        const optionButton = document.createElement("button");
        optionButton.innerText = option;
        optionButton.onclick = () => checkAnswer(option, correctAnswer);
        optionsContainer.appendChild(optionButton);
    });
}

function checkAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        alert("Correct!");
    } else {
        alert("Wrong answer.");
    }
    generateQuestion();
}

function nextQuestion() {
    generateQuestion();
}

window.onload = generateQuestion;
