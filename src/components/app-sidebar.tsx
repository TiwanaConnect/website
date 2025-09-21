"use client";
import * as React from "react";
import { Home, Settings, User, Network, Users, LogOut } from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Members",
    url: "/dashboard/members",
    icon: Users,
    // badge: "24",
  },
  {
    title: "Tree",
    url: "/dashboard/tree",
    icon: Network,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center ">
          <img
            src="/logo.svg"
            alt="TiwanaConnect Logo"
            width={32}
            height={32}
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                {/* <SidebarSeparator /> */}
                <SidebarMenuButton
                  //   variant={"outline"}
                  //   size={"lg"}
                  asChild
                  className={cn(
                    "hover:bg-primary hover:text-white",
                    isActive ? "bg-primary text-white" : ""
                  )}
                >
                  <Link
                    href={item.url}
                    className="
                        flex items-center gap-3 px-3 py-2 rounded-xl 
                        text-gray-700 hover:bg-gray-100 hover:text-gray-900
                        transition-all duration-200
                      "
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
                {/* {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>} */}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={cn("hover:bg-primary hover:text-white")}
            >
              <div
                className="
                        flex items-center gap-3 px-3 py-2 rounded-xl 
                        text-gray-700 hover:bg-gray-100 hover:text-gray-900
                        transition-all duration-200 cursor-pointer
                      "
                onClick={() => {
                  dispatch(logout());
                  router.push("/");
                }}
              >
                <LogOut className="h-5 w-5" />
                <span className="text-sm font-medium">Logout</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
