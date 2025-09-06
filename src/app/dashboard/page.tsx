"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <p className="p-8">Loading...</p>;
  if (!user) return null;

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
