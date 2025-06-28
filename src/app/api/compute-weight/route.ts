import { NextRequest, NextResponse } from "next/server"
import { spawn } from "child_process"
import path from "path"
import fs from "fs/promises"

export async function POST(req: NextRequest) {
  const { csvContent } = await req.json()

  const tmpFilePath = path.join("/tmp", "input.csv")
  await fs.writeFile(tmpFilePath, csvContent)

  return new Promise((resolve) => {
    const process = spawn("python3", [
      "scripts/compute-weight.py",
      "--input_csv_file",
      tmpFilePath,
    ])

    let output = ""
    let error = ""

    process.stdout.on("data", (data) => (output += data.toString()))
    process.stderr.on("data", (data) => (error += data.toString()))

    process.on("close", () => {
      if (error) {
        console.error(error)
        resolve(NextResponse.json({ error }, { status: 500 }))
        return
      }

      try {
        const json = JSON.parse(output)
        resolve(NextResponse.json(json))
      } catch {
        resolve(NextResponse.json({ error: "Invalid JSON from Python" }, { status: 500 }))
      }
    })
  })
}
