'use client';

import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation"; // Import useRouter hook

import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function MarketingPage() {
    const isAuthenticated = useSelector((state) => state.ui.isAuthenticated);
    const isSubscribed = useSelector((state) => state.ui.isSubscribed);

    useEffect(() => {
        if (isAuthenticated && isSubscribed === "inactive") {
            redirect("/subscribe");
        } else if (isAuthenticated && isSubscribed === "active") {
            redirect("/learn");
        }
    }, [isAuthenticated, isSubscribed]);

    const router = useRouter();

    const handleGetStartedClick = () => {
        router.push("/register"); // Navigate to /register
    };

    return (
        <div className="mx-auto flex w-full max-w-[988px] flex-1 flex-col items-center justify-center gap-2 p-4 lg:flex-row">
            <div className="relative mb-8 h-[240px] w-[240px] lg:mb-0 lg:h-[424px] lg:w-[424px]">
                <Image src="/hero.svg" alt="Hero" fill />
            </div>

            <div className="flex flex-col items-center gap-y-8">
                <h1 className="max-w-[480px] text-center text-xl font-bold text-neutral-600 lg:text-3xl">
                    Learn, practice and master new languages with Lingo.
                </h1>

                <div className="flex w-full max-w-[330px] flex-col items-center gap-y-3">
                    <div>
                        <div>
                            <div>
                                <Button onClick={handleGetStartedClick} size="lg" variant="secondary" className="w-full">
                                    Get Started
                                </Button>
                            </div>

                            <Button size="lg" variant="primaryOutline" className="w-full">
                                I already have an account
                            </Button>
                        </div>

                        {/* <Button size="lg" variant="secondary" className="w-full" >
                            Sign Out
                        </Button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
