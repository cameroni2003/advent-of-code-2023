import { Card } from "./classes";

async function main() {
  const file = Bun.file("src/data.txt");
  if (!file.size) return console.log("no data to process");

  const lines = (await file.text()).split("\n");

  const cards = lines.map((line) => new Card(line));
  const cardsQueue = [...cards];

  const result = "";
  let totalCards = 0;
  while (cardsQueue.length) {
    totalCards++;
    //    console.log("cards queue length", cardsQueue.length);
    const card = cardsQueue.shift()!;
    //   console.log("card", card.matching);

    for (let i = 0; i < card.matching.length; i++) {
      //    console.log("pushing", cards[card.index + i].index);
      cardsQueue.push(cards[card.index + i]);
    }
  }
  console.log("total cards", totalCards);

  // const result = lines.reduce((acc, line) => {
  //   const card = new Card(line);
  //   // console.log("card winning numbers", card.winningNumbers);
  //   // console.log("card numbers", card.numbers);
  //   // console.log("total", card.total);
  //   // console.log("----------------");
  //   return acc + card.total;
  // }, 0);
  console.log(result);
}

main();
