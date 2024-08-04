// app/(dashboard)/(main)/RightSidebar.js
'use client';

import { getUserWithProgress } from '@/api/userApi';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

const RightSidebar = () => {
    const [userProgress, setUserProgress] = useState(null);
    const user = useSelector((state) => state.ui.user);
    const id = user?.userId;

    useEffect(() => {
        if (id) {
            const fetchUserDetails = async () => {
                try {
                    const userDetailsProgress = await getUserWithProgress(id);
                    setUserProgress(userDetailsProgress);
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            };

            fetchUserDetails();
        }
    }, [id]);

    if (!userProgress) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    return (
        <div className="fixed right-0 top-[7.9em] w-[16em] h-full bg-white rounded-xl border border-gray-200 shadow-lg p-4 space-y-6">
            <h3 className="text-lg font-bold text-primary mb-4">User Progress</h3>
            
            {/* Current Phase */}
            <div className="bg-secondary p-4 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-primary mb-2">Current Phase</h4>
                <p className="text-gray-700"><strong>Name:</strong> {userProgress.currentPhase.name}</p>
                <p className="text-gray-700"><strong>Phase:</strong> {userProgress.currentPhase.currentPhase} of {userProgress.currentPhase.TotalPhases}</p>
                <p className="text-gray-700"><strong>Description:</strong> {userProgress.currentPhase.description}</p>
                <p className="text-gray-700"><strong>Duration:</strong> {userProgress.currentPhase.durationInWeeks} weeks</p>
            </div>

            {/* Current Week */}
            <div className="bg-secondary p-4 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-primary mb-2">Current Week</h4>
                <p className="text-gray-700"><strong>Week:</strong> {userProgress.currentWeek.currentWeek}</p>
                <p className="text-gray-700"><strong>Overview:</strong> {userProgress.currentWeek.overview}</p>
                <p className="text-gray-700"><strong>Objectives:</strong> {userProgress.currentWeek.objectives}</p>
            </div>

            {/* Current Day */}
            <div className="bg-secondary p-4 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-primary mb-2">Current Day</h4>
                <p className="text-gray-700"><strong>Day:</strong> {userProgress.currentDay.currentDay}</p>
                <p className="text-gray-700"><strong>Title:</strong> {userProgress.currentDay.title}</p>
                <p className="text-gray-700"><strong>Description:</strong> {userProgress.currentDay.textExplanation}</p>
            </div>

            {/* Coins */}
            <div className="bg-secondary p-4 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-primary mb-2">Coins</h4>
                <p className="text-gray-700"><strong>Total Coins:</strong> {userProgress.coins.total_coins}</p>
            </div>

            {/* Achievements */}
            <div className="bg-secondary p-4 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-primary mb-2">Achievements</h4>
                {userProgress.achievements.length > 0 ? (
                    <ul className="list-disc pl-5 text-gray-700">
                        {userProgress.achievements.map((achievement, index) => (
                            <li key={index}>{achievement}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No achievements yet.</p>
                )}
            </div>
        </div>
    );
};

export default RightSidebar;
