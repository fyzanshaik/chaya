"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Inbox, User, Settings } from "lucide-react";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Inbox,
  },
  {
    title: "Profile",
    url: "/",
    icon: User,
  },
  {
    title: "Settings",
    url: "/",
    icon: Settings,
  },
];

const AppSidebar = () => {
  return (
    <>
      <div className="p-1">
        <ModeToggle />
      </div>
      <div className="text-3xl font-bold px-2">Chaya </div>
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map(item => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon />
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
};

export default AppSidebar;
