import { Card } from "./classes";

async function main() {
  const file = Bun.file("src/data.txt");
  if (!file.size) return console.log("no data to process");

  const lines = (await file.text()).split("\n");

  const result = lines.reduce((acc, line) => {
    const card = new Card(line);
    // console.log("card winning numbers", card.winningNumbers);
    // console.log("card numbers", card.numbers);
    // console.log("total", card.total);
    // console.log("----------------");
    return acc + card.total;
  }, 0);
  console.log(result);
}

main();
