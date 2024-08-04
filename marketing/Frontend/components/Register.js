'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/api/userApi";
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

export default function Register() {
    const [formData, setFormData] = useState({
        full_name: "",
        phone: "",
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
            const response = await register(formData);
            if (response) {
                console.log(response);
                alert('Registration Successful')
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
