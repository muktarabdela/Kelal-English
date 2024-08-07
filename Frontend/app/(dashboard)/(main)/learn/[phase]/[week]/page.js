'use client';
import Loading from '@/components/Loading';
import OverView from '@/components/OverView';
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
                description: 'This is the description for day 1',
            },
            {
                _id: 'day-2',
                dayNumber: 2,
                title: 'Learning objectives and key takeaways',
                locked: true,
                description: 'This is the description for day 2',
            },
            {
                _id: 'day-3',
                dayNumber: 3,
                title: 'Practical exercises and practice questions',
                locked: true,
                description: 'This is the description for day 3',
            },
            {
                _id: 'day-4',
                dayNumber: 4,
                title: 'Advanced topics and further reading',
                locked: true,
                description: 'This is the description for day 4',
            },
            {
                _id: 'day-5',
                dayNumber: 5,
                title: 'Assessment and review of the week',
                locked: true,
                description: 'This is the description for day 5',
            },
            {
                _id: 'day-6',
                dayNumber: 6,
                title: 'Conclusion and next steps',
                locked: true,
                description: 'This is the description for day 6',
            },
            {
                _id: 'day-7',
                dayNumber: 7,
                title: 'Extra resources and additional practice',
                locked: true,
                description: 'This is the description for day 7',
            },
        ],
    };

    const handleDayClick = (dayId, isLocked) => {
        if (!isLocked && dayId !== undefined) {
            router.push(`/learn/${phase}/${week}/${dayId}`);
        } else {
            alert("Please complete the previous week to unlock this one");
        }
    };

    return (
        <div className="w-full px-4">
            <OverView page="phases" hederText="Class of First Batch Dashboard
            " description="Welcome to the class of the first batch November 2024. On this page, you can see the 3 phases of the class for 3 months." />

            <div id="webcrumbs" className="min-h-[500px] bg--50">
                <div className="grid grid-cols-3 gap-4 p-4">
                    {data.days.map((day, index) => {
                        const isLocked = day.dayNumber > userData?.currentDay;
                        return (
                            <div className={`relative rounded-lg border-2 w- ${isLocked ? 'border-gray-500 opacity-50' : 'border-blue-500 cursor-pointer transition-transform transform hover:scale-105 w-full'}`}>
                                <div onClick={() => handleDayClick(day._id, isLocked)}
                                    key={index} className="bg-neutral-50 rounded-md p-4 flex flex-col shadow">
                                    <div className={`${isLocked ? 'bg-gray-500' : 'bg-blue-500'} absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full text-white px-4 py-1 whitespace-nowrap text-sm`}>
                                        {isLocked ? 'Locked' : `Open Week`}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-md font-title">{day.title}</div>
                                        </div>
                                        <p className="w-[60px] h-[60px] rounded-full object-cover"  >
                                            Day {day.dayNumber}
                                        </p>
                                    </div>
                                    <div className="mt-2 text-sm">{day.description}</div>
                                    <div className="border-t border-neutral-200 mt-4 pt-4 flex justify-between items-center">
                                        <button className="flex items-center text-primary">
                                            <span className="material-symbols-outlined mr-1">email</span>Email
                                        </button>
                                        <button className="flex items-center text-primary">
                                            <span className="material-symbols-outlined mr-1">call</span>Call
                                        </button>
                                    </div>
                                </div>
                            </div>

                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default WeekDetailsPage;
