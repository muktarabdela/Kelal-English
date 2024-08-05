'use client'
import { getToken } from '@/api/userApi';
import { setIsAuthenticated } from '@/store/UiSlice';
import { fetchUserData } from '@/store/UserSlice';
import { jwtDecode } from 'jwt-decode';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Page = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.ui.isAuthenticated);
    const isSubscribed = useSelector((state) => state.ui.isSubscribed);
    const { loading, error, userData } = useSelector((state) => state.user);

    const token = getToken();
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (token) {
                const decodedToken = jwtDecode(token);
                dispatch(setIsAuthenticated(true));
                if (decodedToken.userId) {
                    dispatch(fetchUserData(decodedToken.userId));
                }
            }
        }
    }, [dispatch, token]);

    useEffect(() => {
        // Check if the user is authenticated
        if (isAuthenticated) {
            if (userData?.subscription?.status === "active") {
                router.push("/learn");
            }
        } else {
            redirect("/");
        }
    }, [isAuthenticated, userData]);

    return (
        <div className='flex h-screen items-center justify-center px-6'>
            Checking subscription status...
        </div>
    );
}

export default Page;
