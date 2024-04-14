
import React, { useState } from 'react';
import { GenerativeModel } from 'google.generativeai'; // Assuming GenerativeModel is provided by the google.generativeai package
import { setPageConfig, header, textInput, button, subheader, write } from 'streamlit'; // Assuming these Streamlit functions are provided by a custom package or library

// Configure Google API key
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
GenerativeModel.configure({ api_key: apiKey });

// Component
function App1() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);

    const model = new GenerativeModel('gemini-pro');
    const chat = model.startChat({ history: [] });

    // Function to handle question submission
    const handleSubmit = () => {
        const response = chat.sendMessage(input, { stream: true });
        setResponse(response);
        setChatHistory(chat.history);
    };

    return (
        <div>
            {header("Gemini Application")}
            {textInput("Input: ", { value: input, onChange: e => setInput(e.target.value) })}
            {button("Ask the question", { onClick: handleSubmit })}
            {subheader("The Response is")}
            {response.map(chunk => (
                <div key={chunk.text}>
                    {write(chunk.text)}
                    {write("_".repeat(80))}
                </div>
            ))}
            {write(chatHistory)}
        </div>
    );
}

// Set Streamlit page config
setPageConfig({ page_title: "Q&A Demo" });

// Render the GeminiApp component
export default App1;
