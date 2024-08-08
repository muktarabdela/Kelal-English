import React, { useState } from 'react';
import image from '../../../public/learn.svg'

const FlashCard = ({ selectedExercise }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const vocabularies = selectedExercise.vocabularies;

    const handleNext = () => {
        if (currentIndex < vocabularies.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const currentCard = vocabularies[currentIndex];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 p-6">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <img src={image} alt={"ghj"} className="h-48 w-full object-cover rounded-t-lg mb-4" />
                <div className="p-4">
                    <h3 className="text-2xl font-bold text-blue-600 mb-2">{currentCard.word}</h3>
                    <p className="text-gray-700 mb-4">{currentCard.definition}</p>
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors duration-300"
                    >
                        Prev
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentIndex === vocabularies.length - 1}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors duration-300"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FlashCard;
