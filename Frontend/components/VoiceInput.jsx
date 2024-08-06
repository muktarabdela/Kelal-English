import React, { useState } from 'react';

const VoiceInput = ({ onInput }) => {
    const [isListening, setIsListening] = useState(false);

    const handleVoiceInput = () => {
        // Check if the browser supports SpeechRecognition
        if (!('webkitSpeechRecognition' in window)) {
            alert('Sorry, your browser does not support speech recognition.');
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            onInput(transcript);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    return (
        <button
            className={`px-4 py-2 rounded ${isListening ? 'bg-red-500' : 'bg-green-500'} text-white`}
            onClick={handleVoiceInput}
        >
            {isListening ? 'Listening...' : 'Start Voice Input'}
        </button>
    );
};

export default VoiceInput;
