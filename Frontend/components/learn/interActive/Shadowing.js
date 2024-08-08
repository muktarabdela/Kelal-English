import { textToSpeech } from '@/api/userApi';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';

const Shadowing = ({ selectedExercise }) => {
    const words = selectedExercise?.contents?.words || [];
    const vocabulary = selectedExercise?.contents?.vocabulary || [];
    const verbs = selectedExercise?.contents?.verbs || [];
    const sentences = selectedExercise?.contents?.sentences || [];

    const [audioSrc, setAudioSrc] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [contentType, setContentType] = useState('words');
    const [isLoading, setIsLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedAudio, setRecordedAudio] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const contentsMap = {
        words,
        vocabulary,
        verbs,
        sentences,
    };

    const handleGenerateAudio = async (text) => {
        setIsLoading(true);
        try {
            const response = await textToSpeech({ text });
            const audioSrc = `data:audio/mp3;base64,${response.data.audioContent}`;
            setAudioSrc(audioSrc);
        } catch (error) {
            console.error('Error generating audio:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const currentContent = contentsMap[contentType][currentIndex];
        if (currentContent) {
            handleGenerateAudio(currentContent);
        }
    }, [contentType, currentIndex]);

    const handleNext = () => {
        const contentArray = contentsMap[contentType];
        if (currentIndex < contentArray.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const startRecording = async () => {
        setIsRecording(true);
        audioChunksRef.current = [];
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunksRef.current.push(event.data);
            }
        };
        mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            setRecordedAudio(audioUrl);
        };
        mediaRecorderRef.current.start();
    };

    const stopRecording = () => {
        setIsRecording(false);
        mediaRecorderRef.current.stop();
    };

    if (!selectedExercise) return null;

    const currentContent = contentsMap[contentType][currentIndex];

    return (
        <>
            <div className="w-full p-4 border mb-4 rounded-lg bg-white shadow">
                <select
                    className="p-2 border mb-4 rounded-lg w-full"
                    value={contentType}
                    onChange={(e) => {
                        setContentType(e.target.value);
                        setCurrentIndex(0);
                    }}
                >
                    <option value="words">Words</option>
                    <option value="vocabulary">Vocabulary</option>
                    <option value="verbs">Verbs</option>
                    <option value="sentences">Sentences</option>
                </select>
                <p className="text-lg font-semibold">{currentContent}</p>
            </div>

            <div className="flex flex-col space-y-4 items-center">
                {isLoading ? (
                    <Loader className="animate-spin mt-4" />
                ) : (
                    audioSrc && <audio className="mt-4 w-full" src={audioSrc} controls />
                )}
                <div className="flex space-x-4">
                    <Button onClick={handlePrev} disabled={currentIndex === 0 || isLoading}>Prev</Button>
                    <Button onClick={handleNext} disabled={currentIndex === contentsMap[contentType].length - 1 || isLoading}>Next</Button>
                </div>
                <div className="mt-4">
                    <Button onClick={isRecording ? stopRecording : startRecording}>
                        {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </Button>
                    {recordedAudio && (
                        <audio className="mt-4 w-full" src={recordedAudio} controls />
                    )}
                </div>
            </div>
        </>
    );
};

export default Shadowing;
