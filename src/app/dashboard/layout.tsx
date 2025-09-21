"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Layout({ children }: { children: React.ReactNode }) {
  // const cookieStore = await cookies();
  // const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  useEffect(() => {
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
