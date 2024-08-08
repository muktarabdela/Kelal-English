'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/api/userApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { jwtDecode } from "jwt-decode";
import { setIsAuthenticated, setIsSubscribed } from "@/store/UiSlice";
import { useDispatch } from "react-redux";

export default function Register() {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        full_name: "",
        phone: "",
        email: "",
        password: "",
        telegram_username: "",
    });
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await register(formData);
            if (response) {
                console.log(response);
                const token = response.token;
                localStorage.setItem('token', token);
                const decodedToken = jwtDecode(token);
                if (decodedToken) {
                    dispatch(setIsAuthenticated(true));
                    dispatch(setIsSubscribed(decodedToken.subscription));
                }
                // console.log(decodedToken)
                if (decodedToken.subscription === "inactive") {
                    router.push('/subscribe');
                } if (decodedToken.subscription === "active") {
                    router.push('/learn');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div id="webcrumbs" className="w-[400px] bg-neutral-50 shadow-lg rounded-lg p-8">
            <div className="flex flex-col items-center">
                <img src="https://tools-api.webcrumbs.org/image-placeholder/40/40/logo/1" alt="logo" className="w-10 h-10 object-cover rounded-full" />{/* Photo provided by Pexels */}
            </div>
            <h1 className="text-2xl font-title text-center mt-4">create new  account</h1>
            <form onSubmit={handleSubmit} className="mt-8">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="grid gap-2">
                        <label className="block mb-1 text-sm font-medium" htmlFor="full_name">Full name</label>
                        <input
                            id="full_name"
                            placeholder="Max"
                            value={formData.full_name}
                            onChange={handleChange}
                            required
                            className="w-full border border-neutral-300 rounded-md px-3 py-2" type="full_name" />
                    </div>
                    <div className="grid gap-2">
                        <label className="block mb-1 text-sm font-medium" htmlFor="phone">Phone number</label>
                        <input
                            id="phone"
                            placeholder="0918******"
                            value={formData.phone}
                            onChange={handleChange}
                            required

                            className="w-full border border-neutral-300 rounded-md px-3 py-2" type="phone" />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium" htmlFor="telegram_username">telegram username </label>
                    <input
                        id="telegram_username"
                        type="telegram_username"
                        placeholder="@username"
                        value={formData.telegram_username}
                        onChange={handleChange}
                        required
                        className="w-full border border-neutral-300 rounded-md px-3 py-2" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium" htmlFor="email">Email address</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-neutral-300 rounded-md px-3 py-2" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium" htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full border border-neutral-300 rounded-md px-3 py-2" />
                </div>
                <button type="submit" className="w-full py-2 rounded-md bg-primary text-white font-medium">
                    Create an account
                </button>

            </form>
        </div>
    );
}
