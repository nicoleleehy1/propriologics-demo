// scripts/convert-csv-to-json.ts
const fs = require("fs")
const parse = require("csv-parse").parse

const csvFilePath = "./src/lib/rollpitch.csv"
const outputFile = "./src/lib/rollpitchData.ts"

const results: { x: number; y: number }[] = []

fs.createReadStream(csvFilePath)
  .pipe(parse({ columns: true, trim: true }))
  .on("data", (row: { x: string; y: string }) => {
    results.push({
      x: parseFloat(row.x),
      y: parseFloat(row.y),
    })
  })
  .on("end", () => {
    const fileContent = `export const coordinateData = ${JSON.stringify(results, null, 2)}\n`
    fs.writeFileSync(outputFile, fileContent)
    console.log("✅ Saved JSON to", outputFile)
  })
