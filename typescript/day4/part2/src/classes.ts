export class Card {
  winningNumbers: string[];
  numbers: string[];
  total: number;
  matching: string[];
  index: number;

  constructor(cardInput: string) {
    const inputSplit = cardInput.split("|");
    const leftSideSplit = inputSplit[0].split(":");
    this.index = parseInt(
      leftSideSplit[0].split(" ").filter((x) => x != "")[1],
    );
    console.log("index", this.index);

    this.winningNumbers = leftSideSplit[1]
      .trim()
      .split(" ")
      .filter((x) => x != "");
    this.numbers = inputSplit[1]
      .trim()
      .split(" ")
      .filter((x) => x != "");

    this.matching = this.winningNumbers.filter((x) => this.numbers.includes(x));

    //console.log("matching", matching);

    this.total = 0;

    if (this.matching.length) {
      this.total = 1;
      if (this.matching.length == 1) return;

      this.matching.slice(1).forEach((x) => {
        this.total *= 2;
      });
    }
  }
}
