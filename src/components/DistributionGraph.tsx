"use client"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  ReferenceArea,
  Tooltip,
} from "recharts"
import { useEffect, useState } from "react"
import { rollpitchData } from "@/lib/rollpitchData"

function convertToCSV(data: { x: number; y: number }[]): string {
  return `roll,pitch\n${data.map((d) => `${d.x},${d.y}`).join("\n")}`
}

export default function DistributionDiagram() {
  const [massData, setMassData] = useState<Record<string, number>>({})

  useEffect(() => {
    const fetchMassAssignment = async () => {
      const csvContent = convertToCSV(rollpitchData)
      const res = await fetch("/api/compute-weight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csvContent }),
      })

      if (!res.ok) {
        console.error("Failed to fetch mass data")
        return
      }

      const data = await res.json()
      setMassData(data)
    }

    fetchMassAssignment()
  }, [])

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>Distribution Diagram</CardTitle>
      </CardHeader>
      <CardContent className="relative h-[500px]">
        {/* Labels using massData */}
        {/* Front Badge (A, B, C, D) */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <Badge variant="secondary">
            {(
            ((massData["A"] ?? 0) +
                (massData["B"] ?? 0) +
                (massData["C"] ?? 0) +
                (massData["D"] ?? 0)) /
            4
            ).toFixed(1)}%
        </Badge>
        <span className="text-sm mt-1">Front</span>
        </div>

        {/* Back Badge (I, J, K, L) */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <Badge variant="secondary">
            {(
            ((massData["I"] ?? 0) +
                (massData["J"] ?? 0) +
                (massData["K"] ?? 0) +
                (massData["L"] ?? 0)) /
            4
            ).toFixed(1)}%
        </Badge>
        <span className="text-sm mt-1">Back</span>
        </div>

        {/* Left Badge (A, E, I) */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex items-center">
        <div className="flex flex-col items-center">
            <Badge variant="secondary">
            {(
                ((massData["A"] ?? 0) +
                (massData["E"] ?? 0) +
                (massData["I"] ?? 0)) /
                3
            ).toFixed(1)}%
            </Badge>
            <span className="text-sm mt-1">Left</span>
        </div>
        </div>

        {/* Right Badge (D, H, L) */}
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex items-center">
        <div className="flex flex-col items-center">
            <Badge variant="secondary">
            {(
                ((massData["D"] ?? 0) +
                (massData["H"] ?? 0) +
                (massData["L"] ?? 0)) /
                3
            ).toFixed(1)}%
            </Badge>
            <span className="text-sm mt-1">Right</span>
        </div>
        </div>


        {/* Chart */}
        <ScatterChart
          width={500}
          height={450}
          margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
        >
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="x"
            name="Lateral"
            label={{ value: "Lateral", position: "insideBottom", offset: -15 }}
            domain={[-1.0, 0.8]}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="Anteroposterior"
            label={{
              value: "Anteroposterior",
              angle: -90,
              position: "insideLeft",
              offset: 10,
            }}
            domain={[-1.2, 1.4]}
          />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <ReferenceLine x={0} stroke="#000" strokeWidth={1} />
          <ReferenceLine y={0} stroke="#000" strokeWidth={1} />
          <ReferenceArea
            x1={-1.5}
            x2={1.5}
            y1={-3.5}
            y2={-3.0}
            stroke="red"
            fill="red"
            fillOpacity={1}
          />
          <Scatter name="Points" data={rollpitchData} fill="#4F46E5" />
        </ScatterChart>
      </CardContent>
    </Card>
  )
}
