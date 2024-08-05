'use client';
import { useParams } from 'next/navigation';

const DayDetailsPage = () => {
    const { phase, week, day } = useParams();

    // Dummy data
    const data = {
        dayNumber: 1,
        title: 'Introduction to the day\'s lesson',
        textExplanation: 'Detailed explanation of the day\'s topic and objectives.'
    };

    return (
        <div className="w-full px-4">
            <h1 className="text-3xl text-center font-semibold mb-4">Day {day} Details</h1>
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold text-primary">Day {data.dayNumber}</h2>
                <p className="text-sm mb-4 text-gray-500">{data.title}</p>
                <p className="text-md mb-4">{data.textExplanation}</p>
            </div>
        </div>
    );
};

export default DayDetailsPage;
