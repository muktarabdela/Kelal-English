'use client'
import { fetchUserData, fetchUserProgress } from '@/store/UserSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading';

const Phases = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.ui.user);
    const slug = user?.userId;
    const { userDataLoading, error, userProgressData: userData } = useSelector((state) => state.user);
    useEffect(() => {
        if (slug) {
            dispatch(fetchUserProgress(slug));
        }
    }, [dispatch, slug]);

    if (userDataLoading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <Loading />
            </div>
        );
    }
    console.log("userProgressData", userData)

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>No user data found.</div>;
    }
    const router = useRouter();

    const handlePhaseClick = (phaseId) => {
        router.push(`/learn/${phaseId}`);
    };

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
            id: 'phase-1',
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
            id: 'phase-2',
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
            id: 'phase-3',
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
                {phases.map((phase, index) => {
                    const isLocked = index + 1 > 1;

                    return (
                        <div className={`${isLocked ? 'border-gray-500 opacity-50' : 'cursor-pointer transition-all'} bg-white p-6 rounded-lg border-2 border-blue-500 relative `}>
                            <div className={`${isLocked ? 'bg-gray-500' : 'bg-blue-500'} absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 text-white px-4 py-1 whitespace-nowrap text-sm`}>{isLocked ? 'Locked' : `Phase ${index + 1}`}</div>
                            <img
                                src="https://tools-api.webcrumbs.org/image-placeholder/360/202/online/1"
                                width="360"
                                height="202"
                                className="rounded-md object-cover"
                                alt="Blog"
                            />
                            <div className="mt-4">
                                <div className="text-sm text-gray-500 mb-1">{phase.title}</div>
                                <h2 className="text-xl font-bold mb-2">
                                    {phase.description}
                                </h2>
                                <div className="flex items-center text-gray-500 text-sm mb-3">
                                    <span>Nov 22, 2023</span>
                                    {/* <span className="mx-2">&bull;</span> */}
                                    {/* <span className="flex items-center"><span className="material-symbols-outlined mr-1">schedule</span>8 min read</span> */}
                                    <span className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 ml-2">
                                        {phase.weeks} Weeks
                                    </span>
                                </div>
                                <p className="text-gray-700 mb-5">
                                    Interactive Exercises
                                    <ul className="list-disc list-inside mb-4 whitespace-nowrap">
                                        {phase.exercises.map((exercise, idx) => (
                                            <li key={idx}>{exercise}</li>
                                        ))}
                                    </ul>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Phases;
