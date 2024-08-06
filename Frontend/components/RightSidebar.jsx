// app/(dashboard)/(main)/RightSidebar.js
'use client';

import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchUserProgress } from '@/store/UserSlice';
import Loading from './Loading';

const RightSidebar = () => {
    const dispatch = useDispatch();
    const { userProgressDataLoading, error, userProgressData: progress } = useSelector((state) => state.user);

    const user = useSelector((state) => state.ui.user);
    const slug = user?.userId;
    useEffect(() => {
        if (slug) {
            dispatch(fetchUserProgress(slug));
        }
    }, [dispatch, slug]);

    if (userProgressDataLoading) {
        return (
            <div className='fixed right-0 top-[7.9em] w-[18em] h-full bg-white rounded-xl border border-gray-200 shadow-lg p-4 space-y-6'>
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

    return (
        <div className="fixed right-0 top-[7.9em] w-[18em] h-full bg-white rounded-xl border border-gray-200 shadow-lg p-4 space-y-6 overflow-y-auto">
            <h3 className="text-lg font-bold text-primary mb-4">User Progress</h3>

            {/* Current Phase */}
            <div className="bg-secondary p-4 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-primary mb-2">Current Phase</h4>
                <p className="text-gray-700"><strong>Name:</strong> {progress?.currentPhase.name}</p>
                <p className="text-gray-700"><strong>Phase:</strong> {progress?.currentPhase.currentPhase} of {progress?.currentPhase.TotalPhases}</p>
                <p className="text-gray-700"><strong>Description:</strong> {progress?.currentPhase.description}</p>
                <p className="text-gray-700"><strong>Duration:</strong> {progress?.currentPhase.durationInWeeks} weeks</p>
            </div>

            {/* Current Week */}
            <div className="bg-secondary p-4 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-primary mb-2">Current Week</h4>
                <p className="text-gray-700"><strong>Week:</strong> {progress?.currentWeek.currentWeek}</p>
                <p className="text-gray-700"><strong>Overview:</strong> {progress?.currentWeek.overview}</p>
                <p className="text-gray-700"><strong>Objectives:</strong> {progress?.currentWeek.objectives}</p>
            </div>

            {/* Current Day */}
            <div className="bg-secondary p-4 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-primary mb-2">Current Day</h4>
                <p className="text-gray-700"><strong>Day:</strong> {progress?.currentDay.currentDay}</p>
                <p className="text-gray-700"><strong>Title:</strong> {progress?.currentDay.title}</p>
                <p className="text-gray-700"><strong>Description:</strong> {progress?.currentDay.textExplanation}</p>
            </div>

            {/* Coins */}
            <div className="bg-secondary p-4 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-primary mb-2">Coins</h4>
                <p className="text-gray-700"><strong>Total Coins:</strong> {progress?.coins.total_coins}</p>
            </div>

            {/* Achievements */}
            <div className="bg-secondary p-4 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-primary mb-2">Achievements</h4>
                {progress?.achievements.length > 0 ? (
                    <ul className="list-disc pl-5 text-gray-700">
                        {progress?.achievements.map((achievement, index) => (
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
