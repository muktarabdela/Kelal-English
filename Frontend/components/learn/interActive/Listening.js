import React from 'react'

const Listening = ({ selectedExercise }) => {
    return (
        <div>
            <div>
                <p className="border p-4 rounded-lg bg-gray-100 mb-6 shadow-sm">{selectedExercise.storyText}</p>
                {selectedExercise.questions.map((question) => (
                    <div key={question._id} className="mb-6">
                        <p className="font-bold">{question.question}</p>
                        <ul className="list-disc list-inside ml-4 text-gray-700">
                            {(question.expectedAnswer || []).map((answer, i) => (
                                <li key={i}>{answer}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Listening