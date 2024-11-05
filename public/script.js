let openaiApiKey;

async function getApiKey() {
    const response = await fetch('/api-key');
    const data = await response.json();
    openaiApiKey = data.key;
    generateQuestion();
}

async function generateQuestion() {
    if (!openaiApiKey) {
        console.error("API Key not loaded.");
        return;
    }

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiApiKey}`
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: "Generate a quiz question about human anatomy with four answer options, and specify the correct answer.",
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

window.onload = getApiKey;
