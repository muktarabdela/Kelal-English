import React from 'react'

const InteractiveQuizzes = ({ selectedExercise }) => {
    return (
        <div>
            <div>
                {selectedExercise.quizData.map((quiz, index) => (
                    <div key={index} className="mb-6">
                        <p className="font-bold">{quiz.question}</p>
                        <div className="mt-2">
                            {quiz.options.map((option, i) => (
                                <div key={i} className="flex items-center mb-2">
                                    <input type="radio" id={`option-${index}-${i}`} name={`quiz-${index}`} value={option} className="form-radio" />
                                    <label htmlFor={`option-${index}-${i}`} className="ml-2 text-gray-700">{option}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default InteractiveQuizzes