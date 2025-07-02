"use client"

import * as React from "react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, Tooltip } from "recharts"
import { rollpitchData } from "@/lib/rollpitchData"

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
import DistributionGraph from "./DistributionGraphScatter"

export const description = "A radar chart"

const chartData = [
  {
    direction: "Top",
    value:
      rollpitchData
        .filter((p) => p.y > 0)
        .reduce((sum, p) => sum + p.y, 0) / rollpitchData.filter((p) => p.y > 0).length || 0,
  },
  {
    direction: "Right",
    value:
      rollpitchData
        .filter((p) => p.x > 0)
        .reduce((sum, p) => sum + p.x, 0) / rollpitchData.filter((p) => p.x > 0).length || 0,
  },
  {
    direction: "Bottom",
    value:
      -rollpitchData
        .filter((p) => p.y < 0)
        .reduce((sum, p) => sum + p.y, 0) / rollpitchData.filter((p) => p.y < 0).length || 0,
  },
  {
    direction: "Left",
    value:
      -rollpitchData
        .filter((p) => p.x < 0)
        .reduce((sum, p) => sum + p.x, 0) / rollpitchData.filter((p) => p.x < 0).length || 0,
  },
]

const chartConfig = {
  radar: {
    label: "Radar",
    color: "var(--chart-1)",
  },
  distribution: {
    label: "Distribution", 
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

const total = {
  radar: 1234,
  distribution: 567,
}

export function ChartRadarRollPitch() {

  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("radar")

  return (
    <CardContent className="pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[450px]"
          >
            <RadarChart width={400} height={400} data={chartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="direction" />
              <Radar
                dataKey="value"
                stroke="var(--chart-1)"
                fill="var(--chart-1)"
                fillOpacity={0.6}
              />
              <Tooltip content={<ChartTooltipContent />} />
            </RadarChart>
          </ChartContainer>
    </CardContent>
  )
}
