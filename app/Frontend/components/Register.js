'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/api/userApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { jwtDecode } from "jwt-decode";


export default function Register() {
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
                const decodedToken = jwtDecode(token);
                if (decodedToken.subscription === "inactive") {
                    router.push('/subscribe');
                } if (decodedToken.subscription === "active") {
                    dispatch(setIsAuthenticated(true));
                    router.push('/learn');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="full_name">Full name</Label>
                            <Input
                                id="full_name"
                                placeholder="Max"
                                value={formData.full_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone number</Label>
                            <Input
                                id="phone"
                                placeholder="0918******"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">telegram Username</Label>
                        <Input
                            id="telegram_username"
                            type="telegram_username"
                            placeholder="@username"
                            value={formData.telegram_username}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                        Create an account
                    </Button>
                    <Button variant="outline" className="w-full">
                        Sign up with GitHub
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
