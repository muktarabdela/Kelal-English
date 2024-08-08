'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, fetchUserProgress } from '@/store/UserSlice';
import Loading from '@/components/Loading';

const ProfilePage = () => {
    // const { slug } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.ui.user);
    const slug = user?.userId;
    const { loading, error, userData } = useSelector((state) => state.user);

    useEffect(() => {
        if (slug) {
            dispatch(fetchUserProgress(slug));
        }
    }, [dispatch, slug]);

    if (loading) {
        <div className='flex justify-center items-center h-screen'>
            <Loading />
        </div>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>No user data found.</div>;
    }

    return (
        // <div className="flex flex-col lg:flex-row items-center p-8 bg-secondary min-h-screen">
        //     {/* Profile Info Section */}
        //     <div className="flex flex-col items-center lg:w-1/3 bg-white rounded-lg shadow-lg p-6 mb-6 lg:mb-0 lg:mr-6">
        //         <img
        //             src="https://github.com/shadcn.png" // Placeholder image
        //             alt="Profile Picture"
        //             className="w-32 h-32 rounded-full object-cover border-4 border-primary"
        //         />
        //         <h1 className="text-2xl font-semibold mt-4 text-primary">{userData?.full_name}</h1>
        //         <p className="text-lg text-gray-600 mt-2">{userData?.email}</p>
        //         <div className="mt-4">
        //             <p className="text-gray-600"><strong>Phone:</strong> {userData?.phone}</p>
        //             <p className="text-gray-600"><strong>Telegram Username:</strong> {userData?.telegram_username}</p>
        //             <p className="text-gray-600"><strong>Role:</strong> {userData?.role}</p>
        //         </div>
        //     </div>

        //     {/* Details Section */}
        //     <div className="flex-1 lg:w-2/3 bg-white rounded-lg shadow-lg p-6">
        //         <div className="mb-6">
        //             <h2 className="text-xl font-semibold text-primary">Subscription Status</h2>
        //             <div className="mt-4 p-4 bg-accent rounded-lg">
        //                 <p className={`text-lg ${userData?.subscription.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
        //                     {userData?.subscription.status === 'active' ? 'Active Subscription' : 'Inactive Subscription'}
        //                 </p>
        //                 <p className="text-gray-600"><strong>Subscription Date:</strong> {new Date(userData?.subscription.subscription_date).toLocaleDateString()}</p>
        //             </div>
        //         </div>
        //         <div>
        //             <h2 className="text-xl font-semibold text-primary">Batches</h2>
        //             <ul className="mt-4 list-disc pl-5">
        //                 {userData?.batches.map((batch) => (
        //                     <li key={batch._id} className="text-gray-600">
        //                         <p><strong>Batch Name:</strong> {batch.name}</p>
        //                         <p><strong>Start Date:</strong> {new Date(batch.start_date).toLocaleDateString()}</p>
        //                         <p><strong>Telegram Group:</strong> {batch.telegram_group}</p>
        //                     </li>
        //                 ))}
        //             </ul>
        //         </div>
        //     </div>
        // </div>
        <div id="webcrumbs" className="w-[50em] bg-neutral-50 p-4 rounded-lg shadow">

            <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-md">
                    <p className="text-2xl font-semibold text-center">24</p>
                    <p className="text-center">Enrolled Course</p>
                    <a href="#" className="text-primary text-sm inline-block mt-4">View details →</a>
                </div>
                <div className="bg-white p-4 rounded-md">
                    <p className="text-2xl font-semibold text-center">56</p>
                    <p className="text-center">Lesson</p>
                    <a href="#" className="text-primary text-sm inline-block mt-4">View details →</a>
                </div>
                <div className="bg-white p-4 rounded-md">
                    <p className="text-2xl font-semibold text-center">17</p>
                    <p className="text-center">Certificates</p>
                    <a href="#" className="text-primary text-sm inline-block mt-4">View details →</a>
                </div>
                <div className="bg-white p-4 rounded-md">
                    <p className="text-2xl font-semibold text-center">Progress</p>
                    <div className="flex justify-center mt-4">
                        {/* Photo provided by Pexels */}
                        <img src="https://tools-api.webcrumbs.org/image-placeholder/60/60/portrait/2" alt="User Progress" className="w-14 h-14 rounded-full object-cover" />
                    </div>
                    <p className="text-center mt-2">Alesia Karapova</p>
                    <p className="text-center text-neutral-500 text-sm">Basic Member</p>
                    <p className="text-center text-2xl mt-4">30</p>
                    <p className="text-center text-neutral-500">Hours spend</p>
                </div>
            </div>

            <div className="bg-white p-4 rounded-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium">Continue Learning</h2>
                    <a href="#" className="text-primary text-sm">See All</a>
                </div>
                <div className="border-t border-neutral-200 pt-4">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-2">
                            {/* Photo provided by Pexels */}
                            <img src="https://tools-api.webcrumbs.org/image-placeholder/40/40/education/4" alt="Design Accessibility" className="w-10 h-10 rounded-md object-cover" />
                            <div>
                                <p>Design Accessibility</p>
                                <p className="text-neutral-500 text-sm">Advanced • 5 hours</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-32 bg-neutral-200 rounded-full h-4 overflow-hidden">
                                <div className="bg-primary h-full rounded-full" style={{ width: '30%' }}></div>
                            </div>
                            <span className="text-sm">30%</span>
                            <span className="px-2 py-1 text-primary bg-neutral-200 rounded-md">In Progress</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-2">
                            {/* Photo provided by Pexels */}
                            <img src="https://tools-api.webcrumbs.org/image-placeholder/40/40/education/2" alt="UX Research" className="w-10 h-10 rounded-md object-cover" />
                            <div>
                                <p>UX Research</p>
                                <p className="text-neutral-500 text-sm">Intermediate • 6 hours</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-32 bg-neutral-200 rounded-full h-4 overflow-hidden">
                                <div className="bg-primary h-full rounded-full" style={{ width: '70%' }}></div>
                            </div>
                            <span className="text-sm">70%</span>
                            <span className="px-2 py-1 text-primary bg-neutral-200 rounded-md">In Progress</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            {/* Photo provided by Pexels */}
                            <img src="https://tools-api.webcrumbs.org/image-placeholder/40/40/education/5" alt="Figma for Beginner" className="w-10 h-10 rounded-md object-cover" />
                            <div>
                                <p>Figma for Beginner</p>
                                <p className="text-neutral-500 text-sm">Beginner • 7 hours</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-32 bg-neutral-200 rounded-full h-4 overflow-hidden">
                                <div className="bg-primary h-full rounded-full" style={{ width: '100%' }}></div>
                            </div>
                            <span className="text-sm">100%</span>
                            <span className="px-2 py-1 text-green-500 bg-neutral-200 rounded-md">Completed</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
