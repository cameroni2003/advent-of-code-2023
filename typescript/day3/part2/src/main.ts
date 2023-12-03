import { Line, LineNumber } from "./classes";

async function main() {
  const file = Bun.file("src/data.txt");
  if (!file.size) return console.log("no data to process");

  const textLines = (await file.text()).split("\n");

  const lines = textLines.map((line, index) => new Line(index, line));

  const symbolRegex = /[^\d\s\.]/;
  let gearRatioTotals = 0;

  for (let i = 0; i < textLines.length; i++) {
    const line = textLines[i];

    for (let y = 0; y < line.length; y++) {
      const char = line[y];
      if (char === "*") {
        const gearParts: LineNumber[] = [];
        if (i - 1 >= 0) {
          gearParts.push(...lines[i - 1].getNumberFromIndex(y));
        }
        gearParts.push(...lines[i].getNumberFromIndex(y));
        if (i + 1 < lines.length) {
          gearParts.push(...lines[i + 1].getNumberFromIndex(y));
        }

        console.log(gearParts);

        if (gearParts.length == 2) {
          gearRatioTotals +=
            parseInt(gearParts[0].number) * parseInt(gearParts[1].number);
        }
      }
    }
  }

  const result = gearRatioTotals;

  console.log(result);
}

main();
