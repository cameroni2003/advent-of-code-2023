import { Hand } from "./classes";

async function main() {
  const file = Bun.file("src/data.txt");
  if (!file.size) return console.log("no data to process");

  const lines = (await file.text()).split("\r\n");

  console.log("lines", lines);
  const hands = lines.map((line) => new Hand(line));

  const sortedHands = hands.sort((a, b) => {
    const sortVal = b.handRank - a.handRank;
    if (sortVal === 0) {
      for (let i = 0; i < a.hand.length; i++) {
        const valA = toValue(a.hand[i]);
        const valB = toValue(b.hand[i]);

        const valResult = valB! - valA!;
        if (valResult != 0) return valResult;
      }
    }

    return sortVal;
  });

  const result = sortedHands.reverse().reduce((acc, hand, index) => {
    return acc + hand.bet * (index + 1);
  }, 0);
  console.log(result);
}

function toValue(char: string) {
  if (Number(char)) return Number(char);

  switch (char) {
    case "T":
      return 10;
    case "J":
      return 11;
    case "Q":
      return 12;
    case "K":
      return 13;
    case "A":
      return 14;
  }
}

main();
