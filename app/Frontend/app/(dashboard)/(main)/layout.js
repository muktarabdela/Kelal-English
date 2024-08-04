'use client';

import { jwtDecode } from "jwt-decode";
import Header from '@/components/Header';
import RightSidebar from '@/components/RightSidebar';
import Sidebar from '@/components/Sidebar';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated, setIsSubscribed, setUser } from "@/store/UiSlice";

const MainLayout = ({ children }) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.ui.isAuthenticated);
    const isSubscribed = useSelector((state) => state.ui.isSubscribed);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("token");
            if (token) {
                const decodedToken = jwtDecode(token);
                dispatch(setUser(decodedToken))
                dispatch(setIsAuthenticated(true));
                dispatch(setIsSubscribed(decodedToken.subscription));
            }
        }
    }, [dispatch]);

    useEffect(() => {
        if (!isAuthenticated) {
            redirect("/");
        } else if (isAuthenticated && isSubscribed === "inactive") {
            redirect("/subscribe");
        }
    }, [isAuthenticated, isSubscribed]);

    return (
        <main className="min-h-screen flex flex-col bg-[#f5f5f5]">
            <div className="fixed top-0 z-50 h-[5em] w-full items-center p-2">
                <Header />
            </div>
            <div className="flex flex-grow mt-[7em] w-full">
                <div className="hidden lg:block lg:w-1/4">
                    <Sidebar />
                </div>
                <div className="mr-2 flex justify-center items-center h-full pt-6">
                    <div className="w-">
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
