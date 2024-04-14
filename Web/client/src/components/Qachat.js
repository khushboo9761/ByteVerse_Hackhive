import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

function QaChat() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post('/api/getGeminiResponse', { input });
      setResponse(data.response);
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  return (
    <div>
      <h1>Gemini Application</h1>
      <input type="text" value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleSubmit}>Ask the question</button>
      {response && <p>The Response is: {response}</p>}
    </div>
  );
}

export default QaChat;
