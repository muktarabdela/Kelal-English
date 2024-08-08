'use client';

import { jwtDecode } from "jwt-decode";
import Header from '@/components/Header';
import RightSidebar from '@/components/RightSidebar';
import Sidebar from '@/components/Sidebar';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated, setIsSubscribed, setUser } from "@/store/UiSlice";
import { fetchUserData } from "@/store/UserSlice";
import { useRouter } from "next/navigation";
import MobileSidebar from "@/components/MobileSidebar";

const MainLayout = ({ children }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const isAuthenticated = useSelector((state) => state.ui.isAuthenticated);
    const isSubscribed = useSelector((state) => state.ui.isSubscribed);
    const { loading, error, userData } = useSelector((state) => state.user);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("token");
            if (token) {
                const decodedToken = jwtDecode(token);
                dispatch(setUser(decodedToken));
                dispatch(setIsAuthenticated(true));
                dispatch(fetchUserData(decodedToken.userId));
            }
        }
    }, [dispatch]);


    useEffect(() => {
        if (userData) {
            dispatch(setIsSubscribed(userData?.subscription?.status));
        }
    }, [dispatch, userData]);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/");
        } else if (isAuthenticated && isSubscribed === "inactive") {
            router.push("/subscribe");
        }
    }, [isAuthenticated, isSubscribed]);


    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <main className="min-h-screen flex flex-col bg-[#f5f5f5]">
            <div className="fixed top-0 z-50 h-[5em] w-full items-center p-">
                <Header />
            </div>
            <div className="flex flex-grow mt-[7em] w-full">
                <div className="hidden lg:block lg:w-1/4">
                    <Sidebar />
                </div>
                <div className="mr-2 flex justify-center items-center h-full pt-6">
                    <div className="w-full">
                        {children}
                    </div>
                </div>
                <div className="hidden lg:block lg:w-1/4">
                    <RightSidebar />
                </div>
            </div>
        </main>
    );
};

export default MainLayout;
