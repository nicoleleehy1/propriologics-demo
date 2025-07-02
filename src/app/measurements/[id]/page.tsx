"use client"

import DistributionGraph from "@/components/DistributionGraphScatter"
import { ChartAreaInteractive } from "@/components/LineChart"
import { ChartLineInteractive } from "@/components/LineChart2"
import Navbar from "@/components/Navbar"
import { AppSidebar } from "@/components/menu/app-sidebar"

import { Radar, RadarChart, PolarAngleAxis, PolarGrid } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { ChartRollPitch } from "@/components/RadarChart"

import { chartData } from "@/lib/rollpitchData"
import { rollpitchData } from "@/lib/rollpitchData"





const AdminPage = () => {

  const chartData = rollpitchData.map((point, index) => ({
      angle: `angle_${index + 1}`,
      rollpitch: point.y,
    }))
  
  const chartConfig = {
      rollpitch: {
        label: "Roll-Pitch Y",
        color: "var(--chart-1)",
      },
  } satisfies ChartConfig

  return (
    <div>
      <Navbar theme='light'/>
      <div className='p-4 flex gap-4 flex-col md:flex-row'>
        {/* LEFT */}
        <div className='w-full lg:w-2/3 flex flex-col gap-8'>
        <span className="text-[20px]">Dashboard</span>
        
        
        {/* USER CARDS */}
          <div className="flex gap-4 justify-between flex-wrap">
              {/* Card */}

          </div>

        {/* MIDDLE CHARTS */}
          <div className="flex gap-4 flex-col lg:flex-row">
            <DistributionGraph />
            {/* PROGRESS TRACKER CHART */}
            <div className="w-full lg:w-1/3 h-[450px]">
              {/* Pie Chart */}
            </div>

            {/* ATTENDANCE CHART */}
            <div className="w-full lg:w-2/3 h-[400px]">
            </div>

          </div>

          {/* BOTTOM CHARTS */}
          <div className="">
            
          </div>
        </div>
        
        {/* RIGHT */}
        <div className='w-full lg:w-1/3 flex flex-col gap-8'>
          <ChartAreaInteractive
              title="Lateral"
              description="Lateral movement graphed over XY Time."
          />
          <ChartAreaInteractive
              title="Directional"
          />
          <ChartAreaInteractive
              title="Anteroposterior"
          />
        </div>
      </div>
      
    </div>
    
  )
}

export default AdminPage