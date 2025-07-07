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

// --- Sector-based algorithm for badge ratios (converted from JS, no lodash) ---
function getGreatestPerSector(data: any[]) {
  const positiveArr = new Array(6).fill(null);
  const negativeArr = new Array(6).fill(null);

  data.forEach((point) => {
    const calculatedIndex = Math.floor(Math.abs(point.angle / 30));
    const sectorIndex = Math.min(5, calculatedIndex);
    if (point.angle < 0) {
      if (
        negativeArr[sectorIndex] === null ||
        negativeArr[sectorIndex].vectorLengthOrigin < point.vectorLengthOrigin
      ) {
        negativeArr[sectorIndex] = point;
      }
    } else {
      if (
        positiveArr[sectorIndex] === null ||
        positiveArr[sectorIndex].vectorLengthOrigin < point.vectorLengthOrigin
      ) {
        positiveArr[sectorIndex] = point;
      }
    }
  });

  const greatest = [
    { sector: 'A', point: negativeArr[2] },
    { sector: 'B', point: negativeArr[1] },
    { sector: 'C', point: negativeArr[0] },
    { sector: 'D', point: positiveArr[0] },
    { sector: 'E', point: positiveArr[1] },
    { sector: 'F', point: positiveArr[2] },
    { sector: 'G', point: positiveArr[3] },
    { sector: 'H', point: positiveArr[4] },
    { sector: 'I', point: positiveArr[5] },
    { sector: 'J', point: negativeArr[5] },
    { sector: 'K', point: negativeArr[4] },
    { sector: 'L', point: negativeArr[3] },
  ];

  return greatest;
}

function getIntersectionPoint(point: any, normalRange: any) {
  if (!point) return null;
  const pointRatio = point.y / point.x;
  // Upper-left quadrant
  if (point.x < 0 && point.y >= 0) {
    const normalRatio = normalRange.y.max / normalRange.x.min;
    if (pointRatio > normalRatio) {
      const x2 = normalRange.x.min;
      return { x: x2, y: (point.y / point.x) * x2 };
    } else {
      const y2 = normalRange.y.max;
      return { x: (point.x / point.y) * y2, y: y2 };
    }
  } else if (point.x >= 0 && point.y >= 0) {
    const normalRatio = normalRange.y.max / normalRange.x.max;
    if (pointRatio > normalRatio) {
      const y2 = normalRange.y.max;
      return { x: (point.x / point.y) * y2, y: y2 };
    } else {
      const x2 = normalRange.x.max;
      return { x: x2, y: (point.y / point.x) * x2 };
    }
  } else if (point.x >= 0 && point.y < 0) {
    const normalRatio = normalRange.y.min / normalRange.x.max;
    if (pointRatio < normalRatio) {
      const y2 = normalRange.y.min;
      return { x: (point.x / point.y) * y2, y: y2 };
    } else {
      const x2 = normalRange.x.max;
      return { x: x2, y: (point.y / point.x) * x2 };
    }
  } else if (point.x < 0 && point.y < 0) {
    const normalRatio = normalRange.y.min / normalRange.x.min;
    if (pointRatio > normalRatio) {
      const y2 = normalRange.y.min;
      return { x: (point.x / point.y) * y2, y: y2 };
    } else {
      const x2 = normalRange.x.min;
      return { x: x2, y: (point.y / point.x) * x2 };
    }
  }
  return null;
}

function getSectors(inputData: any[], normalRange: any) {
  if (inputData.length === 0) return [];
  const data = inputData
    .map((dataPoint) => ({ x: dataPoint.roll, y: dataPoint.pitch }))
    .filter(
      (dataPoint) =>
        !(
          dataPoint.x >= normalRange.x.min &&
          dataPoint.x <= normalRange.x.max &&
          dataPoint.y >= normalRange.y.min &&
          dataPoint.y <= normalRange.y.max
        )
    )
    .map((coord) => ({
      ...coord,
      angle: (Math.atan2(coord.x, coord.y) * 180) / Math.PI,
      vectorLengthOrigin: Math.hypot(coord.x, coord.y),
    }));

  const greatestPoints = getGreatestPerSector(data);
  const sumOfVectors = greatestPoints
    .filter((p) => p.point)
    .map((p) => p.point.vectorLengthOrigin)
    .reduce((total, vector) => total + vector, 0);

  const greatestPointsWithPct = greatestPoints.map((p) => {
    const intersectionPoint = getIntersectionPoint(p.point, normalRange);
    if (!intersectionPoint) {
      return {
        ...p,
        w_1pct: 0,
        intersectionPoint,
        w_2: null,
        w_com: 0,
      };
    }
    const w_2 = Math.hypot(intersectionPoint.x, intersectionPoint.y);
    return {
      ...p,
      w_1pct: sumOfVectors > 0 ? p.point.vectorLengthOrigin / sumOfVectors : 0,
      intersectionPoint,
      w_2,
      w_com: p.point.vectorLengthOrigin - w_2,
    };
  });

  const sumOfWcom = greatestPointsWithPct
    .map((p) => p.w_com)
    .reduce((total, next) => total + next, 0);

  const greatestPointsWithPctAndWcomPct = greatestPointsWithPct.map((p) => {
    return {
      ...p,
      wComPct: sumOfWcom > 0 ? p.w_com / sumOfWcom : 0,
    };
  });

  return greatestPointsWithPctAndWcomPct;
}

const Ratios = {
  RIGHT: {
    sectorsIncluded: ['A', 'B', 'C', 'J', 'K', 'L'],
    dataToModify: 'roll',
  },
  FRONT: {
    sectorsIncluded: ['G', 'H', 'I', 'J', 'K', 'L'],
    dataToModify: 'pitch',
  },
};

function getFrontRatio(sectors: any[]) {
  let total = 0;
  sectors.forEach((sector) => {
    if (Ratios.FRONT.sectorsIncluded.includes(sector.sector)) {
      total += sector.wComPct;
    }
  });
  return total;
}

function getRightRatio(sectors: any[]) {
  let total = 0;
  sectors.forEach((sector) => {
    if (Ratios.RIGHT.sectorsIncluded.includes(sector.sector)) {
      total += sector.wComPct;
    }
  });
  return total;
}

function calculateRatios(data: any[], normalRange: any) {
  const sectors = getSectors(data, normalRange);
  const frontR = Math.round(getFrontRatio(sectors) * 1000) / 1000;
  const backR = Math.round((1 - frontR) * 1000) / 1000;
  const rightR = Math.round(getRightRatio(sectors) * 1000) / 1000;
  const leftR = Math.round((1 - rightR) * 1000) / 1000;
  return {
    front: `${(frontR * 100).toFixed(1)}`,
    back: `${(backR * 100).toFixed(1)}`,
    right: `${(rightR * 100).toFixed(1)}`,
    left: `${(leftR * 100).toFixed(1)}`,
  };
}
// --- End sector-based algorithm ---



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

  // --- Use sector-based algorithm for badge ratios ---
  const normalRange = { x: { min: xmin, max: xmax }, y: { min: ymin, max: ymax } };
  // Convert rollpitchData to expected format for sector algorithm
  const rollpitchSectorData = rollpitchData.map((d: any) => ({ roll: d.x, pitch: d.y }));
  const badgeRatios = calculateRatios(rollpitchSectorData, normalRange);

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
          <ReferenceDot x={0} y={1.35} r={0} label={({ viewBox }) => <ChartBadgeLabel value={`${badgeRatios.front}%`} label="Front" x={viewBox.x} y={viewBox.y} dy={-40} />} />
          <ReferenceDot x={0} y={-1.45} r={0} label={({ viewBox }) => <ChartBadgeLabel label="Back" x={viewBox.x} y={viewBox.y} dy={60} value={`${badgeRatios.back}%`} labelBelow />} />
          <ReferenceDot x={-1.1} y={0} r={0} label={({ viewBox }) => <ChartBadgeLabel value={`${badgeRatios.left}%`} label="Left" x={viewBox.x} y={viewBox.y} dx={-60} />} />
          <ReferenceDot x={1.1} y={0} r={0} label={({ viewBox }) => <ChartBadgeLabel value={`${badgeRatios.right}%`} label="Right" x={viewBox.x} y={viewBox.y} dx={25} />} />
          <Scatter name="Points" data={rollpitchData} fill="#4F46E5" />
        </ScatterChart>
      </CardContent>
  )
}
