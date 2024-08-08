import { handleGenerateAudioApi } from '@/api/userApi';
import { useState } from 'react';

export default function VoiceInput() {
    const [text, setText] = useState('');
    const [speech, setSpeech] = useState('');
    const [feedback, setFeedback] = useState('');
    const [userInput, setUserInput] = useState('');

    const handleGenerateSpeech = async () => {
        try {
            const data = await handleGenerateAudioApi({ text });
            setSpeech(data.speech); // Adjust based on the actual response structure
        } catch (error) {
            console.error('Error generating speech:', error);
        }
    };

    const handleProvideFeedback = async () => {
        try {
            const response = await fetch('/api/provide-feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ expectedText: text, userInput }),
            });

            const data = await response.json();
            setFeedback(data.feedback);
        } catch (error) {
            console.error('Error providing feedback:', error);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Voice Interaction</h2>
            <textarea
                className="w-full p-2 border border-gray-300 rounded mb-4"
                rows="4"
                placeholder="Enter text for TTS"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button
                onClick={handleGenerateSpeech}
                className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
            >
                Generate Speech
            </button>
            {speech && (
                <div className="mb-4">
                    <h3 className="font-semibold">Generated Speech:</h3>
                    <p>{speech}</p>
                </div>
            )}
            <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Enter your voice input"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
            />
            <button
                onClick={handleProvideFeedback}
                className="px-4 py-2 bg-green-500 text-white rounded"
            >
                Provide Feedback
            </button>
            {feedback && (
                <div className="mt-4">
                    <h3 className="font-semibold">Feedback:</h3>
                    <p>{feedback}</p>
                </div>
            )}
        </div>
    );
}
