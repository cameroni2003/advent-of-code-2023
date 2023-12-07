import console from "console";
import { Mapping } from "./classes";

async function main() {
  const file = Bun.file("src/data.txt");
  if (!file.size) return console.log("no data to process");

  const lines = (await file.text()).split("\r\n");

  const seedLine = lines.shift();
  const seeds = seedLine!.split(":")[1].trim().split(" ");
  lines.shift();

  const mappings: Mapping[] = [];
  let curMapping: Mapping = new Mapping();
  while (lines.length) {
    const line = lines.shift();

    if (line!.includes("map")) {
      continue;
    } else if (line == "") {
      mappings.push(curMapping);
      curMapping = new Mapping();
    } else curMapping.addRange(line!);
  }

  mappings.push(curMapping);

  console.log("num mappings", mappings.length);

  let result: number | null = null;
  seeds.forEach((seed) => {
    let num = parseInt(seed);
    for (let i = 0; i < mappings.length; i++) {
      num = mappings[i].doMap(num);
    }

    if (result === null || num < result) result = num;
  });

  console.log(result);
}

main();
