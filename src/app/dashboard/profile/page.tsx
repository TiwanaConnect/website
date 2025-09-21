"use client";

import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="mb-6 flex items-center space-x-3">
        <h1 className="text-3xl font-bold">Welcome, {user && user.name}</h1>
      </div>
    </div>
  );
}
