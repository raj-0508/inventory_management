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
import { account, ID } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const router = useRouter();
  const { setUser } = useAuth();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateMobile = (mobile: string) => {
    return /^[0-9]{10}$/.test(mobile);
  };

  const handleSignup = async () => {
    if (!validateEmail(email)) {
      alert("Please enter a valid email (example@domain.com)");
      return;
    }
    if (!validateMobile(mobile)) {
      alert("Mobile number must be exactly 10 digits");
      return;
    }

    try {
      await account.create(ID.unique(), email, password, name);
      await account.createEmailPasswordSession(email, password);
      await account.updatePrefs({
        mobile,
        age,
      });

      const user = await account.get();
      setUser(user);
      router.push("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
      alert("Signup failed. Please try again.");
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
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                type="text"
                required
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
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button onClick={handleSignup} type="submit" className="w-full">
          Sign up
        </Button>
      </CardFooter>
    </Card>
  );
}
