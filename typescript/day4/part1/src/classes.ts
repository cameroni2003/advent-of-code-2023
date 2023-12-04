export class Card {
  winningNumbers: string[];
  numbers: string[];
  total: number;

  constructor(cardInput: string) {
    const inputSplit = cardInput.split("|");
    const leftSideSplit = inputSplit[0].split(":");

    this.winningNumbers = leftSideSplit[1]
      .trim()
      .split(" ")
      .filter((x) => x != "");
    this.numbers = inputSplit[1]
      .trim()
      .split(" ")
      .filter((x) => x != "");

    const matching = this.winningNumbers.filter((x) =>
      this.numbers.includes(x),
    );

    //console.log("matching", matching);

    this.total = 0;

    if (matching.length) {
      this.total = 1;
      if (matching.length == 1) return;

      matching.slice(1).forEach((x) => {
        this.total *= 2;
      });
    }
  }
}
