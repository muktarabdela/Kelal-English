// app/(dashboard)/(main)/[profile]/[slug]/page.js
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getUserWithDetails } from '@/api/userApi';

const ProfilePage = () => {
    const { slug } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (slug) {
            const fetchUserDetails = async () => {
                try {
                    const userDetails = await getUserWithDetails(slug);
                    setUser(userDetails);
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            };

            fetchUserDetails();
        }
    }, [slug]);
    console.log(user)
    if (!user) {
        return <div>Loading...</div>;
    }


    return (
        <div className="flex flex-col lg:flex-row items-center p-8 bg-secondary min-h-screen">
            {/* Profile Info Section */}
            <div className="flex flex-col items-center lg:w-1/3 bg-white rounded-lg shadow-lg p-6 mb-6 lg:mb-0 lg:mr-6">
                <img
                    src="https://github.com/shadcn.png" // Placeholder image
                    alt="Profile Picture"
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary"
                />
                <h1 className="text-2xl font-semibold mt-4 text-primary">{user.full_name}</h1>
                <p className="text-lg text-gray-600 mt-2">{user.email}</p>
                <div className="mt-4">
                    <p className="text-gray-600"><strong>Phone:</strong> {user.phone}</p>
                    <p className="text-gray-600"><strong>Telegram Username:</strong> {user.telegram_username}</p>
                    <p className="text-gray-600"><strong>Role:</strong> {user.role}</p>
                </div>
            </div>

            {/* Details Section */}
            <div className="flex-1 lg:w-2/3 bg-white rounded-lg shadow-lg p-6">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-primary">Subscription Status</h2>
                    <div className="mt-4 p-4 bg-accent rounded-lg">
                        <p className={`text-lg ${user.subscription.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                            {user.subscription.status === 'active' ? 'Active Subscription' : 'Inactive Subscription'}
                        </p>
                        <p className="text-gray-600"><strong>Subscription Date:</strong> {new Date(user.subscription.subscription_date).toLocaleDateString()}</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-primary">Batches</h2>
                    <ul className="mt-4 list-disc pl-5">
                        {user.batches.map((batch) => (
                            <li key={batch._id} className="text-gray-600">
                                <p><strong>Batch Name:</strong> {batch.name}</p>
                                <p><strong>Start Date:</strong> {new Date(batch.start_date).toLocaleDateString()}</p>
                                <p><strong>Telegram Group:</strong> {batch.telegram_group}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
