'use client'
import { textToSpeech } from '@/api/userApi';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import Shadowing from './Shadowing';
import FlashCard from './FlashCard';
import InteractiveQuizzes from './InteractiveQuizzes';
import Listening from './Listening';

const InterActive = ({ interactiveExercise }) => {
    const [selectedExercise, setSelectedExercise] = useState(null);

    useEffect(() => {
        if (Array.isArray(interactiveExercise) && interactiveExercise.length > 0) {
            setSelectedExercise(interactiveExercise[0]);
        }
    }, [interactiveExercise]);

    if (!Array.isArray(interactiveExercise)) {
        return <p className="text-red-500">Interactive exercises data is not available.</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
            <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Interactive Exercises</h1>
                <div className="flex flex-wrap justify-center mb-6">
                    {interactiveExercise.map((exercise) => (
                        <Button
                            key={exercise._id}
                            className={`px-4 py-2 m-2 rounded-lg ${selectedExercise && selectedExercise._id === exercise._id ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                            onClick={() => setSelectedExercise(exercise)}
                        >
                            {exercise.type}
                        </Button>
                    ))}
                </div>
                {selectedExercise && (
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold mb-2">{selectedExercise.name}</h2>
                        <p className="text-gray-700 mb-4">{selectedExercise.description}</p>
                        {selectedExercise.type === 'Shadowing' && (
                            <Shadowing selectedExercise={selectedExercise} />
                        )}
                        {selectedExercise.type === 'Flashcards' && (
                            <FlashCard selectedExercise={selectedExercise} />
                        )}
                        {selectedExercise.type === 'Interactive Quizzes' && (
                            <InteractiveQuizzes selectedExercise={selectedExercise} />

                        )}
                        {selectedExercise.type === 'Listening Comprehension' && (
                            <Listening selectedExercise={selectedExercise} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InterActive;
