'use client';
import Loading from '@/components/Loading';
import OverView from '@/components/OverView';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { fetchUserProgress } from '@/store/UserSlice';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PhaseDetailsPage = () => {
    const { phase } = useParams();
    const router = useRouter();
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
        )
    }
    console.log("userProgressData", userData)

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>No user data found.</div>;
    }

    // Dummy data
    const data = {
        weeks: [
            {
                _id: 'week-1',
                weekNumber: 1,
                numberOfDays: 7,
                weekTopic: 'Introduction',
                description: 'Introduction to the basics of the language, including common phrases and vocabulary.',
            },
            {
                _id: 'week-2',
                weekNumber: 2,
                numberOfDays: 7,
                weekTopic: 'Sentence Structure',
                description: 'Focuses on sentence structure and grammar, with exercises to practice writing simple sentences.',
            },
            {
                _id: 'week-3',
                weekNumber: 3,
                numberOfDays: 7,
                weekTopic: 'Vocabulary',
                description: 'Expands on vocabulary and introduces more complex grammatical concepts.',
            },
            {
                _id: 'week-4',
                weekNumber: 4,
                numberOfDays: 7,
                weekTopic: 'Review',
                description: 'Review of the concepts learned with additional practice exercises and assessments.',
            },
        ],
    }

    const handleWeekClick = (weekId, isLocked) => {
        if (!isLocked && weekId !== undefined) {
            router.push(`/learn/${phase}/${weekId}`);
        } else {
            alert("Please complete the previous phase to unlock this one.");
        }
    };

    return (
        <div className="w-full px-4">
            <OverView page="phases" hederText={`weeks for ${phase === 'phase-1' && 'Phase 1'} `} description="Welcome to the class of the first batch November 2024. On this page, you can see the 3 phases of the class for 3 months." />
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 max-w-5xl mx-auto">
                {data.weeks.map((week) => {
                    const isLocked = week.weekNumber > userData?.currentWeek;
                    return (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div onClick={() => handleWeekClick(week._id, isLocked)}
                                        id="webcrumbs" className={`relative rounded-lg border-2 w- ${isLocked ? 'border-gray-500 opacity-50' : 'border-blue-500 cursor-pointer transition-transform transform hover:scale-105 w-full'}`}>
                                        < div className="bg-neutral-50 p-4 rounded-lg shadow" >
                                            <div className={`${isLocked ? 'bg-gray-500' : 'bg-blue-500'} absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full text-white px-4 py-1 whitespace-nowrap text-sm`}>
                                                {isLocked ? 'Locked' : `Open Week`}
                                            </div>
                                            <div className="flex justify-between items-start">
                                                <div className="text-sm text-neutral-500">Total day {week.numberOfDays} </div>
                                                <button className="bg-neutral-300 text-neutral-900 text-sm px-2 py-1 rounded-md">Week {week.weekNumber}</button>
                                            </div>
                                            <h2 className="font-title text-xl font-bold mt-2">{week.weekTopic}</h2>
                                            <p className="text-neutral-700 mt-2">
                                                {week.description}
                                            </p>
                                            <div className="flex items-center mt-4">
                                                <img src="https://tools-api.webcrumbs.org/image-placeholder/40/40/person/1" alt="Author's avatar" className="w-10 h-10 rounded-full object-cover mr-2" /> {/* Photo provided by Pexels */}
                                                <span className="text-neutral-700 mt-2">
                                                    {isLocked ? '6 amole to open' : 'opened'}

                                                </span>
                                            </div>
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
            </div >
        </div >
    );
};

export default PhaseDetailsPage;
