"use client"
import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import { NavMain } from "@/components/menu/nav-main"
import { NavProjects } from "@/components/menu/nav-projects"
import { NavUser } from "@/components/menu/nav-user"
import { TeamSwitcher } from "@/components/menu/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Patient 1",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Patient 2",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Patient 3",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Measurement 1",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Data Adjustment 1-2",
          url: "#",
        },
        {
          title: "Stimuli Placement 1-4",
          url: "#",
        },
        {
          title: "Data Adjustment 1-3",
          url: "#",
        },
      ],
    },
    {
      title: "Measurement 2",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "Data Adjustment 1",
          url: "#",
        },
        {
          title: "Data Adjustment 2",
          url: "#",
        },
        {
          title: "Data Adjustment 3",
          url: "#",
        },
      ],
    },
    {
      title: "Measurement 3",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Measurement 4",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
