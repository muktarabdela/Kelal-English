'use client';
import Loading from '@/components/Loading';
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
                description: 'Introduction to the basics of the language, including common phrases and vocabulary.',
            },
            {
                _id: 'week-2',
                weekNumber: 2,
                description: 'Focuses on sentence structure and grammar, with exercises to practice writing simple sentences.',
            },
            {
                _id: 'week-3',
                weekNumber: 3,
                description: 'Expands on vocabulary and introduces more complex grammatical concepts.',
            },
            {
                _id: 'week-4',
                weekNumber: 4,
                description: 'Review of the concepts learned with additional practice exercises and assessments.',
            },
        ],
    }

    const handleWeekClick = (weekId) => {
        router.push(`/learn/${phase}/${weekId}`);
    };

    return (
        <div className="w-full px-4">
            <h1 className="text-3xl text-center font-semibold mb-4">
                {phase === 'phase-1' && 'Basic'}
                {phase === 'phase-2' && 'Intermediate'}
                {phase === 'phase-3' && 'Advanced'} Details
            </h1>
            <div className="grid grid-cols-2 gap-6">
                {data.weeks.map((week) => {
                    const isLocked = week.weekNumber > userData?.currentWeek.weekNumber;
                    return (
                        <div
                            key={week._id}
                            className={`flex flex-col p-10 rounded-lg shadow-md ${isLocked ? 'bg-gray-300 border-gray-400' : 'bg-secondary border-accent'} border-2 w-full md:w-[38vh]`}
                        >
                            <h2 className={`text-2xl font-bold ${isLocked ? 'text-gray-600' : 'text-primary'}`}>Week {week.weekNumber}</h2>
                            <p className="text-sm mb-4 text-gray-500">{week.description}</p>
                            <button
                                className={`mt-auto px-4 py-2 rounded-lg ${isLocked ? 'bg-gray-400 text-gray-700' : 'bg-primary text-white'}`}
                                onClick={() => handleWeekClick(week._id)}
                                disabled={isLocked}
                            >
                                {isLocked ? 'Locked' : 'Start Learning'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PhaseDetailsPage;
