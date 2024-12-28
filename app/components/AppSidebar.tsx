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
import { Inbox } from "lucide-react";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Inbox,
  },
];

const AppSidebar = () => {
  return (
    <>
      <div className="p-4">
        <ModeToggle />
      </div>
      <SidebarGroup>
        <div className="flex-1 mt-3 mb-3 px-4">
          <div className="text-base font-semibold">Faizan Shaik</div>
          <div className="text-sm text-gray-500">fyzanshaik.work@gmail.com</div>
        </div>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
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
