'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';
import { login } from "@/api/userApi";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
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
            console.log(response);
            if (response) {
                console.log(response);
                alert('Login Successful')
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
