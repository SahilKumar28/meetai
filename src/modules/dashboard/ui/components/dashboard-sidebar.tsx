'use client';

import { Separator } from "@/components/ui/separator";
import { SidebarHeader, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./dashbboard-user-button";

const firstSection = [
    {
        icon: VideoIcon,
        label: "Meetings",
        href: "/meetings",
    },
    {
        icon: BotIcon,
        label: "Agents",
        href: "/agents"
    }
]

const secondSection = [
    {
        icon: StarIcon,
        label: "Upgrade",
        href: "/upgrade",
    },
]

export const DashboardSidebar = () => {

    const pathname = usePathname()
    // const pathname = '/meetings'

    return (
        <Sidebar>
            <SidebarHeader>
                <Link href={"/"} className="flex items-center gap-2 p-2">
                    <Image src={"/logo.svg"} height={36} width={36} alt="Meet AI" />
                    <p className="text-2xl font-semibold">Meet.AI</p>
                </Link>
            </SidebarHeader>

            <div className="px-4 mb-2">
                <Separator className="opacity-30 text-[#5D6B68]" />
            </div>

            <SidebarContent>

                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild className={pathname === item.href ? "bg-primary/20 text-primary rounded-md" : ``}>
                                        <Link href={item.href} >
                                            <item.icon />
                                            <span className="text-sm font-medium tracking-tight">{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <div className="px-4 mb-2">
                    <Separator className="opacity-30 text-[#5D6B68]" />
                </div>

                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild className={pathname === item.href ? "bg-primary/20 text-primary rounded-md" : ``}>
                                        <Link href={item.href} >
                                            <item.icon />
                                            <span className="text-sm font-medium tracking-tight">{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>

            <SidebarFooter>
                <DashboardUserButton />
            </SidebarFooter>

        </Sidebar>
    )
}

