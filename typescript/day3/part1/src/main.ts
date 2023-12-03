import { Line, LineNumber } from "./classes";

async function main() {
  const file = Bun.file("src/data.txt");
  if (!file.size) return console.log("no data to process");

  const textLines = (await file.text()).split("\n");

  const lines = textLines.map((line, index) => new Line(index, line));

  const symbolRegex = /[^\d\s\.]/;
  const foundLineNumbers: LineNumber[] = [];

  for (let i = 0; i < textLines.length; i++) {
    const line = textLines[i];

    for (let y = 0; y < line.length; y++) {
      const char = line[y];
      if (symbolRegex.test(char)) {
        if (i - 1 >= 0) {
          foundLineNumbers.push(...lines[i - 1].getNumberFromIndex(y));
        }
        foundLineNumbers.push(...lines[i].getNumberFromIndex(y));
        if (i + 1 < lines.length) {
          foundLineNumbers.push(...lines[i + 1].getNumberFromIndex(y));
        }
      }
    }
  }

  const result = foundLineNumbers.reduce((acc, curr) => {
    return (acc += parseInt(curr.number));
  }, 0);

  console.log(result);
}

main();
