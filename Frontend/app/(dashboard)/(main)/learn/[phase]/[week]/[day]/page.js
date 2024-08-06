'use client';
import { textToSpeech } from '@/api/userApi';
import { Button } from '@/components/ui/button';
import VoiceInput from '@/components/VoiceInput'; // Assuming VoiceInput is a custom component
import { useParams } from 'next/navigation';
import { useState } from 'react';

const DayDetailsPage = () => {
    const { phase, week, day } = useParams();
    const [text, setText] = useState('');
    const [audioSrc, setAudioSrc] = useState(null);

    const handleGenerateAudio = async () => {
        try {
            const response = await textToSpeech({ text });
            console.log(response);
            const audioSrc = `data:audio/mp3;base64,${response.data.audioContent}`;
            setAudioSrc(audioSrc);
            setText(response.text);
        } catch (error) {
            console.error('Error generating audio:', error);
        }
    };



    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            <h1 className="text-3xl font-bold mb-4">Text to Speech</h1>
            <textarea
                className="w-full max-w-lg p-2 border border-gray-300 rounded mb-4"
                placeholder={text}
            />
            <div className="flex space-x-4">
                <p className='text-2xl text-black'>{text}</p>
                <Button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleGenerateAudio}>
                    Submit
                </Button>
            </div>
            {audioSrc && (
                <audio className="mt-4" src={audioSrc} controls />
            )}
        </div>
    );
};

export default DayDetailsPage;
