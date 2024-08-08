'use client';
import Loading from '@/components/Loading';
import { fetchUserProgress } from '@/store/UserSlice';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const WeekDetailsPage = () => {
    const { phase, week } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.ui.user);
    const slug = user?.userId;
    const { userDataLoading, error, userProgressData: userData } = useSelector((state) => state.user);
    console.log("from days detail", userData);

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

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>No user data found.</div>;
    }
    // Dummy data
    const data = {
        days: [
            {
                _id: 'day-1',
                dayNumber: 1,
                title: 'Introduction to the day\'s lesson',
                locked: false,
            },
            {
                _id: 'day-2',
                dayNumber: 2,
                title: 'Learning objectives and key takeaways',
                locked: true,
            },
            {
                _id: 'day-3',
                dayNumber: 3,
                title: 'Practical exercises and practice questions',
                locked: true,
            },
            {
                _id: 'day-4',
                dayNumber: 4,
                title: 'Advanced topics and further reading',
                locked: true,
            },
            {
                _id: 'day-5',
                dayNumber: 5,
                title: 'Assessment and review of the week',
                locked: true,
            },
            {
                _id: 'day-6',
                dayNumber: 6,
                title: 'Conclusion and next steps',
                locked: true,
            },
            {
                _id: 'day-7',
                dayNumber: 7,
                title: 'Extra resources and additional practice',
                locked: true,
            },
        ],
    };

    const handleDayClick = (dayId) => {
        router.push(`/learn/${phase}/${week}/${dayId}`);
    };

    return (
        <div className="w-full px-4">
            <h1 className="text-3xl text-center font-semibold mb-4">Week {week} Details</h1>
            <div className="grid grid-cols-2 gap-6">
                {data.days.map((day) => {
                    const isLocked = day.dayNumber > userData?.currentDay.dayNumber;

                    return (

                        <div
                            key={day._id}
                            className="flex flex-col p-10 rounded-lg shadow-md bg-secondary border-accent border-2 w-full md:w-[38vh]"
                        >
                            <h2 className="text-2xl font-bold text-primary">Day {day.dayNumber}</h2>
                            <p className="text-sm mb-4 text-gray-500">{day.title}</p>
                            <button
                                className={`mt-auto px-4 py-2 rounded-lg ${isLocked ? 'bg-gray-400 text-gray-700' : 'bg-primary text-white'}`}
                                disabled={isLocked}
                                onClick={() => !day.locked && handleDayClick(day._id)}
                            >
                                {isLocked ? 'Locked' : 'Start Learning'}
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default WeekDetailsPage;
