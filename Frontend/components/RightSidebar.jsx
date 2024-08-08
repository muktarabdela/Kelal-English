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

            {/* <div id="webcrumbs" className="w-[300px] bg-neutral-50 rounded-lg shadow p-6">
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-title">Progress</h2>
                        <i className="material-symbols-outlined">more_vert</i>
                    </div>
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative mb-4">
                            <img src="https://tools-api.webcrumbs.org/image-placeholder/72/72/person/1" alt="Profile" className="rounded-full object-cover w-[72px] h-[72px]" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent rounded-full border-2 border-neutral-50"></div>
                        </div>
                        <h3 className="text-lg font-bold">Alesia Karapova</h3>
                        <p className="text-sm text-neutral-500">Basic Member</p>
                    </div>
                    <div className="bg-neutral-100 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h4 className="text-2xl font-bold">30</h4>
                                <p className="text-sm text-neutral-500">Hours spend</p>
                            </div>
                            <div>
                                <p className="text-sm text-neutral-500 bg-neutral-200 px-2 py-1 rounded-full">This week</p>
                            </div>
                        </div>
                        <div className="flex gap-1 mx-2 mb-1 text-neutral-500">
                            <p>30</p>
                            <p className="ml-auto">0</p>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex-1 mx-1">
                                <div className="h-[8em] bg-primary-700 rounded-md mb-1"></div>
                                <p className="text-center text-xs text-neutral-500">Sun 15</p>
                            </div>
                            <div className="flex-1 mx-1">
                                <div className="h-[4em] bg-primary-700 rounded-md mb-1"></div>
                                <p className="text-center text-xs text-neutral-500">Mon 16</p>
                            </div>
                            <div className="flex-1 mx-1">
                                <div className="h-[6em] bg-primary-700 rounded-md mb-1"></div>
                                <p className="text-center text-xs text-neutral-500">Tue 17</p>
                            </div>
                            <div className="flex-1 mx-1">
                                <div className="h-[2em] bg-primary-700 rounded-md mb-1"></div>
                                <p className="text-center text-xs text-neutral-500">Wed 18</p>
                            </div>
                            <div className="flex-1 mx-1">
                                <div className="h-[8em] bg-primary-700 rounded-md mb-1"></div>
                                <p className="text-center text-xs text-neutral-500">Thu 19</p>
                            </div>
                            <div className="flex-1 mx-1">
                                <div className="h-[2em] bg-primary-700 rounded-md mb-1"></div>
                                <p className="text-center text-xs text-neutral-500">Fri 20</p>
                            </div>
                            <div className="flex-1 mx-1">
                                <div className="h-[6em] bg-primary-700 rounded-md mb-1"></div>
                                <p className="text-center text-xs text-neutral-500">Sat 21</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default RightSidebar;
