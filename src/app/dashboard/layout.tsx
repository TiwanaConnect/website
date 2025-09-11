"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  // const cookieStore = await cookies();
  // const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/");
    }
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 w-full h-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
