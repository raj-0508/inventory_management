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

  const handleLogin = async () => {
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setUser(user);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
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
        <form>
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
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
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
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button onClick={handleLogin} type="submit" className="w-full">
          Login
        </Button>
        {/* <Button variant="outline" className="w-full">
          Login with Google
        </Button> */}
      </CardFooter>
    </Card>
  );
}
