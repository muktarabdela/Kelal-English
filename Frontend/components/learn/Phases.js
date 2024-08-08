'use client'
import { fetchUserProgress } from '@/store/UserSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import OverView from '../OverView';

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
    // console.log("userProgressData", userData)

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>No user data found.</div>;
    }
    const router = useRouter();


    const handlePhaseClick = (phaseId, isLocked) => {
        if (!isLocked && phaseId !== undefined) {
            router.push(`/learn/${phaseId}`);
        } else {
            alert("Please complete the previous phase to unlock this one.");
        }
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
    console.log(phases[0].id)
    return (
        <div className="w-full px-4">
            <OverView page="phases" hederText="Class of First Batch Dashboard
            " description="Welcome to the class of the first batch November 2024. On this page, you can see the 3 phases of the class for 3 months." />

            <div className="flex flex-col md:flex-row justify-center items-center gap-6 ">
                {phases.map((phase, index) => {
                    const isLocked = index + 1 > userData?.currentPhase
                    return (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div
                                        key={phase.id}
                                        onClick={() => handlePhaseClick(phase.id, isLocked)}
                                        className={`relative bg-white p-6 rounded-lg border-2 ${isLocked ? 'border-gray-500 opacity-50' : 'border-blue-500 cursor-pointer transition-transform transform hover:scale-105'}`}
                                    >
                                        <div className={`${isLocked ? 'bg-gray-500' : 'bg-blue-500'} absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full text-white px-4 py-1 whitespace-nowrap text-sm`}>
                                            {isLocked ? 'Locked' : `Phase ${index + 1}`}
                                        </div>
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
                                            <div className="flex  items-center justify-center text-gray-500 text-sm mb-3">
                                                <span>Total Weeks</span>
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
                                    <TooltipContent sideOffset={5} className="mb-4">
                                        <p>{isLocked ? ' you have to wait to open' : ` Start Learning Now`}</p>
                                    </TooltipContent>
                                </TooltipTrigger>
                            </Tooltip>
                        </TooltipProvider>

                    );
                })}
            </div>
        </div>
    );
};

export default Phases;
