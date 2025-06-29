import { rollpitchData } from "@/lib/rollpitchData"

export const chartData = [
  {
    direction: "Left",
    value:
      -rollpitchData
        .filter((p) => p.x < 0)
        .reduce((sum, p) => sum + p.x, 0) / rollpitchData.filter((p) => p.x < 0).length || 0,
  },
  {
    direction: "Right",
    value:
      rollpitchData
        .filter((p) => p.x > 0)
        .reduce((sum, p) => sum + p.x, 0) / rollpitchData.filter((p) => p.x > 0).length || 0,
  },
  {
    direction: "Top",
    value:
      rollpitchData
        .filter((p) => p.y > 0)
        .reduce((sum, p) => sum + p.y, 0) / rollpitchData.filter((p) => p.y > 0).length || 0,
  },
  {
    direction: "Bottom",
    value:
      -rollpitchData
        .filter((p) => p.y < 0)
        .reduce((sum, p) => sum + p.y, 0) / rollpitchData.filter((p) => p.y < 0).length || 0,
  },
]
