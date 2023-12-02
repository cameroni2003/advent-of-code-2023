import { Bag, Game } from "./game";

async function main() {
  const file = Bun.file("src/data.txt");
  if (!file.size) return console.log("no data to process");

  const lines = (await file.text()).split("\n");

  let result = 0;

  const bag: Bag = { reds: 12, blues: 14, greens: 13 };

  result = lines.reduce((acc, line) => {
    if (!line) return acc;

    const g = new Game(line);
    const fewestRollsPower = g.getFewestRollsPower();
    return (acc += fewestRollsPower);
  }, 0);

  console.log(result);
}

main();
