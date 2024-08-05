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
        <Card className="mx-auto max-w-sm ">
            <CardHeader>
                <CardTitle className="text-xl">Sign in</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Sign in
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
