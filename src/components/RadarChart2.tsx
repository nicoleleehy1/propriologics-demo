"use client"

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

export const description = "A radar chart"

export function ChartRadarRollPitch() {
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
    value: {
      label: "Directional Magnitude",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig

  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Roll-Pitch Radar</CardTitle>
        <CardDescription>Average directional magnitude from (0, 0)</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
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
