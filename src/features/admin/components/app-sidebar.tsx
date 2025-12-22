"use client";

import { Home, List } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { H3 } from "../../../components/Typography";
import { Button } from "@/components/ui/button";

const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Participants list",
    url: "/admin/participantsList",
    icon: List,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar shadow-inner">
      {/* Header */}
      <SidebarHeader className="m-2 rounded-xl border border-sidebar-border bg-sidebar-accent/40 px-4 py-3">
        <a href="/">
          <H3 className="tracking-wide text-sidebar-primary">DCF</H3>
        </a>
        <span className="text-xs text-muted-foreground">Dalmia Code Fest</span>
      </SidebarHeader>

      <SidebarContent className="mt-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs uppercase tracking-widest text-muted-foreground">
            Application
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="px-2 space-y-1">
              {items.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={[
                        "group rounded-lg px-3 py-2 transition-all",
                        "hover:bg-sidebar-accent hover:shadow-sm",
                        isActive &&
                          "bg-sidebar-primary text-sidebar-primary-foreground shadow-md",
                      ].join(" ")}
                    >
                      <a href={item.url} className="flex items-center gap-3">
                        <item.icon
                          className={[
                            "h-4 w-4 transition-colors",
                            isActive
                              ? "text-sidebar-primary-foreground"
                              : "text-muted-foreground group-hover:text-foreground",
                          ].join(" ")}
                        />
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="destructive">Logout</Button>
      </SidebarFooter>
    </Sidebar>
  );
}
