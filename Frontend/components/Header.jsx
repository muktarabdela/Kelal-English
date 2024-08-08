'use client'
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import coin from "../public/coin-svgrepo-com.svg"
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';
import MobileSidebar from './MobileSidebar';
import Link from 'next/link';
const Header = () => {
    const user = useSelector((state) => state.ui.user);
    const handleAvatarClick = () => {
        console.log("Avatar clicked");
        if (user && user.userId) {
            router.push(`/profile/${user.userId}`);
        } else {
            console.error('User ID not found');
        }
    };
    const router = useRouter()
    return (
        <div className='max-w-5xl mx-auto flex flex-col bg-[#f5f5f5] border-b z-50'>
            <header>
                <nav className="px-4 lg:px-6 py-2.5">

                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <div className='lg:hidden flex items-center'>
                            <MobileSidebar />
                        </div>
                        <Link href="/learn" className="flex items-center">
                            <img
                                src="https://flowbite.com/docs/images/logo.svg"
                                className="mr-3 h-6 sm:h-9"
                                alt="Flowbite Logo"
                            />
                            <span className="self-center text-xl font-semibold whitespace-nowrap">
                                Kelal English
                            </span>
                        </Link>
                        <div className="flex items-center lg:order-2">
                            <div
                                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                            >
                                <Avatar >
                                    <AvatarImage src={coin} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                            <div onClick={handleAvatarClick}>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Header;
