import React from 'react';

const Phases = () => {

    const phases = [
        {
            title: "Basic",
            description: "Basic level of English",
            weeks: 4,
            exercises: [
                "Shadowing",
                "Interactive Quizzes",
                "Listening ",
                "Flashcards"
            ],
            locked: false
        },
        {
            title: "Intermediate",
            description: "Intermediate level of English",
            weeks: 4,
            exercises: [
                "Shadowing",
                "Interactive Quizzes",
                "Listening ",
                "Flashcards"
            ],
            locked: true
        },
        {
            title: "Advanced",
            description: "Advanced level of English",
            weeks: 4,
            exercises: [
                "Shadowing",
                "Interactive Quizzes",
                "Listening ",
                "Flashcards"
            ],
            locked: true
        }
    ];

    return (
        <div className="w-full px-4">
            <p className="text-3xl text-center font-semibold mb-4">
                Class of First Batch Dashboard
            </p>
            <p className="text-md text-gray-500 text-center mb-8 px-4">
                Welcome to the class of the first batch November 2024. On this page, you can see the 3 phases of the class for 3 months.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                {phases.map((phase, index) => (
                    <div key={index} className={`flex flex-col p-10 rounded-lg shadow-md ${phase.locked ? 'bg-gray-300 border-gray-400 ' : 'bg-secondary border-accent'} border-2 md:w-[38vh] w-full`}>
                        <h2 className={`flex justify-between text-2xl font-bold ${phase.locked ? 'text-gray-600' : 'text-primary'}`}>
                            {phase.title} {phase.locked && <span className="relative  bottom-8 ml-3 text-gray-600">
                                <svg width="30" height="30" fill="none" stroke="#938585" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </span>}
                        </h2>
                        <p className="text-sm mb-4 text-gray-500">{phase.description}</p>
                        <p className="text-md mb-4">Duration: {phase.weeks} weeks</p>
                        <h3 className="text-md font-semibold mb-2">Interactive Exercises</h3>
                        <ul className="list-disc list-inside mb-4 whitespace-nowrap">
                            {phase.exercises.map((exercise, idx) => (
                                <li key={idx}>{exercise}</li>
                            ))}
                        </ul>
                        <button className={`mt-auto px-4 py-2 rounded-lg ${phase.locked ? 'bg-gray-400 text-gray-700' : 'bg-primary text-white'}`} disabled={phase.locked}>
                            {phase.locked ? 'Locked' : 'Start Learning'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Phases;
