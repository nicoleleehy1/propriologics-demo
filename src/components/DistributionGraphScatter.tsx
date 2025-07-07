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
  ReferenceDot,
} from "recharts"
import { useEffect, useState } from "react"
import { rollpitchData } from "@/lib/rollpitchData"

//normal values for the region
var xmin = -0.3
var xmax = 0.3
var ymin = -0.1
var ymax = 0.4



function convertToCSV(data: { x: number; y: number }[]): string {
  return `roll,pitch\n${data.map((d) => `${d.x},${d.y}`).join("\n")}`
}












// Custom SVG badge for chart labels (mimics secondary badge)
function ChartBadgeLabel({ value, label, x, y, dx = 0, dy = 0, labelBelow = false }: { value: string; label: string; x: number; y: number; dx?: number; dy?: number; labelBelow?: boolean }) {
  return (
    <g transform={`translate(${x + dx},${y + dy})`}>
      {labelBelow ? (
        <>
          <rect x={-32} y={-28} width={64} height={32} rx={8} fill="#e5e7eb" />
          <text x={0} y={-10} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#111827">{value}</text>
          <text x={0} y={18} textAnchor="middle" fontSize="13" fill="#374151">{label}</text>
        </>
      ) : (
        <>
          <text x={0} y={-18} textAnchor="middle" fontSize="13" fill="#374151">{label}</text>
          <rect x={-32} y={-10} width={64} height={32} rx={8} fill="#e5e7eb" />
          <text x={0} y={10} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#111827">{value}</text>
        </>
      )}
    </g>
  )
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

  // Calculate percentages for each direction
  const front = (((massData["A"] ?? 0)+(massData["B"] ?? 0)+(massData["C"] ?? 0)+(massData["D"] ?? 0))/4).toFixed(1)
  const back = (((massData["I"] ?? 0)+(massData["J"] ?? 0)+(massData["K"] ?? 0)+(massData["L"] ?? 0))/4).toFixed(1)
  const left = (((massData["A"] ?? 0)+(massData["E"] ?? 0)+(massData["I"] ?? 0))/3).toFixed(1)
  const right = (((massData["D"] ?? 0)+(massData["H"] ?? 0)+(massData["L"] ?? 0))/3).toFixed(1)

  return (
      <CardContent className="relative h-[700px]">
        {/* Chart with in-chart scalable badges */}
        <ScatterChart
          width={600}
          height={500}
          margin={{ top: 50, right: 50, bottom: 60, left: 80 }}
        >
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="x"
            name="Lateral"
            label={{ value: "Lateral", position: "insideBottom", offset: -15, dy: 45 }}
            domain={[-1.1, 1.1]}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="Anteroposterior"
            label={{
              value: "Anteroposterior",
              angle: -90,
              position: "insideLeft",
              offset: -50,
              dy: 50
              
            }}
            domain={[-1.5, 1.5]}
          />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <ReferenceLine x={0} stroke="#000" strokeWidth={1} />
          <ReferenceLine y={0} stroke="#000" strokeWidth={1} />
          <ReferenceArea


//draws the red rectangle that denotes the normal region of the distribution graph  

              x1 = {xmin}
              x2={xmax}
              y1={ymin}
              y2={ymax}
              stroke="red"
              fill="red"
              fillOpacity={0.2}
          />
          {/* In-chart badges using ReferenceDot and custom SVG label */}
          <ReferenceDot x={0} y={1.35} r={0} label={({ viewBox }) => <ChartBadgeLabel value={`${front}%`} label="Front" x={viewBox.x} y={viewBox.y} dy={-40} />} />
          <ReferenceDot x={0} y={-1.45} r={0} label={({ viewBox }) => <ChartBadgeLabel label="Back" x={viewBox.x} y={viewBox.y} dy={60} value={`${back}%`} labelBelow />} />
          <ReferenceDot x={-1.1} y={0} r={0} label={({ viewBox }) => <ChartBadgeLabel value={`${left}%`} label="Left" x={viewBox.x} y={viewBox.y} dx={-60} />} />
          <ReferenceDot x={1.1} y={0} r={0} label={({ viewBox }) => <ChartBadgeLabel value={`${right}%`} label="Right" x={viewBox.x} y={viewBox.y} dx={25} />} />
          <Scatter name="Points" data={rollpitchData} fill="#4F46E5" />
        </ScatterChart>
      </CardContent>
  )
}
