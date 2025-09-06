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
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogin = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setUser(user);
      
      // Use window.location for more reliable redirect in production
      window.location.href = "/dashboard";
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Login error:", err.message);
        alert(err.message || "Login failed. Please try again.");
      } else {
        console.error("Login error:", err);
        alert("Login failed. Please try again.");
      }
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto mt-24">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Link href="/signup">
            <Button variant="link" className="cursor-pointer">
              Signup
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="abc@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <CardFooter className="flex-col gap-2 mt-6">
            <Button type="submit" className="w-full">
              Login
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
