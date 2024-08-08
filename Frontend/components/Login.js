'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';
import { login } from "@/api/userApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { setIsAuthenticated, setIsSubscribed } from "@/store/UiSlice";
import { jwtDecode } from "jwt-decode";

export default function Login() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
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
            const response = await login(formData);
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
            <h1 className="text-2xl font-title text-center mt-4">Sign in to your account</h1>
            <p className="text-center text-sm mt-2">
                Not a member? <a href="#" className="text-primary font-medium">Start a 14 day free trial</a>
            </p>
            <form onSubmit={handleSubmit} className="mt-8">
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
                <div className="flex items-center justify-between mb-6">
                    <label className="flex items-center cursor-pointer">
                        <input className="mr-2" type="checkbox" />
                        <span className="text-sm">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-primary">Forgot password?</a>
                </div>
                <button type="submit" className="w-full py-2 rounded-md bg-primary text-white font-medium">Sign in</button>
            </form>

        </div>
    );
}
