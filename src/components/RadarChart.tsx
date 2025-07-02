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
import { ChartRadarRollPitch } from "./DistributionGraphRadar"

export const description = "A radar chart"

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

export function ChartRollPitch() {

  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("radar")

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Distribution Graph</CardTitle>
          <CardDescription>
            Roll vs Pitch
          </CardDescription>
        </div>
        <div className="flex">
          {["radar", "distribution"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-3 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                {/* <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span> */}
              </button>
            )
          })}
        </div>
      </CardHeader>

      <CardContent className="pb-0">
        {activeChart === "radar" ? (
          <ChartRadarRollPitch />
        ) : (
          <DistributionGraph />
        )}
      </CardContent>



      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Radar based on X and Y distribution
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
          Data source: rollpitchData
        </div>
      </CardFooter>
    </Card>
  )
}
