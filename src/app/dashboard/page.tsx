"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('Dashboard: loading =', loading, 'user =', user);
    if (!loading && !user) {
      console.log('No user found, redirecting to login...');
      window.location.href = "/login";
    }
  }, [user, loading]);

  if (loading) {
    console.log('Dashboard: Still loading...');
    return <p className="p-8">Loading...</p>;
  }
  
  if (!user) {
    console.log('Dashboard: No user, returning null');
    return null;
  }

  console.log('Dashboard: Rendering dashboard for user:', user.name);

  return (
    <Card className="w-full max-w-sm mx-auto mt-24">
      <CardHeader>
        <h1 className="text-2xl">
          Hello! <span className="text-blue-500">{user?.name}</span>
        </h1>
        <p>Welcome to Dashboard </p>
      </CardHeader>
    </Card>
  );
}
