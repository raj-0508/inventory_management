"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  // Don't redirect automatically - let user stay on signup page
  // The middleware will handle redirects

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateMobile = (mobile: string) => /^[0-9]{10}$/.test(mobile);

  const handleSignup = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (!validateEmail(email)) {
      alert("Please enter a valid email (example@domain.com)");
      return;
    }
    if (!validateMobile(mobile)) {
      alert("Mobile number must be exactly 10 digits");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      await signup(email, password, name, mobile, age);
      // Redirect after successful signup
      window.location.href = "/dashboard";
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Signup error:", err.message);
        alert(err.message || "Signup failed. Please try again.");
      } else {
        console.error("Signup error:", err);
        alert("Signup failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto mt-24">
      <CardHeader>
        <CardTitle>Sign up for an account</CardTitle>
        <CardDescription>
          Enter your details to create a new account
        </CardDescription>
        <CardAction>
          <Link href="/login">
            <Button variant="link" className="cursor-pointer">
              Login
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Enter Your Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="abc@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                autoComplete="new-password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                type="tel"
                required
                autoComplete="tel"
                placeholder="Enter 10-digit Mobile Number"
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                required
                placeholder="Enter Your Age"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
          </div>
          <CardFooter className="flex-col gap-2 mt-6">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Sign up"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
