'use client'
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const page = () => {
    // use select isAuthenticated and isSubscribed
    const isAuthenticated = useSelector((state) => state.ui.isAuthenticated);
    const isSubscribed = useSelector((state) => state.ui.isSubscribed);
    // if user is not authenticated, redirect to login and if user is not subscribed, redirect to subscribe and if user is subscribed, redirect to learn

    useEffect(() => {
        if (isAuthenticated && isSubscribed === "active") {
            redirect("/learn");
        } else if (!isAuthenticated) {
            redirect("/");
        }
    }, [isAuthenticated, isSubscribed]);
    return (
        <div className='flex h-screen items-center justify-center px-6'>subscribe for the class</div>
    )
}

export default page