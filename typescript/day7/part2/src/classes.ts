export class Hand {
  hand: string;
  bet: number;
  likeCards: { [key: string]: number };
  handRank: number;

  constructor(input: string) {
    const inputSplit = input.split(" ");

    this.handRank = 1;
    this.hand = inputSplit[0];
    this.bet = Number(inputSplit[1]);
    this.likeCards = {};

    for (let i = 0; i < this.hand.length; i++) {
      const card = this.hand[i];
      this.likeCards[card] = this.likeCards[card]
        ? this.likeCards[card] + 1
        : 1;
    }

    let sortedHand = sortHand(this.likeCards);

    // console.log("sortedHand", sortedHand);
    //
    // console.log("top sortedHand", sortedHand[0]);
    // console.log("second sortedHand", sortedHand[1]);
    //
    //console.log("hand info", this.hand, this.bet, this.likeCards);

    // update rank based on jokers
    const jokers = this.likeCards["J"];

    console.log("sorted hand[0]", sortedHand[0]);

    if (sortedHand.length > 1 && jokers) {
      if (sortedHand[0][0] !== "J") {
        this.likeCards[sortedHand[0][0]] += jokers;
      } else {
        this.likeCards[sortedHand[1][0]] += jokers;
      }
      this.likeCards["J"] = 0;
    }

    sortedHand = sortHand(this.likeCards);

    const firstSortedHand = sortedHand[0][1];
    const secondSortedHand = sortedHand.length > 1 ? sortedHand[1][1] : 0;

    //console.log("like cards", sortedHand);

    if (firstSortedHand > 2) {
      if (firstSortedHand === 5) {
        this.handRank = 7;
      }
      if (firstSortedHand === 4) {
        this.handRank = 6;
      }
      if (firstSortedHand === 3) {
        if (secondSortedHand === 2) {
          this.handRank = 5;
        } else {
          this.handRank = 4;
        }
      }
    } else if (firstSortedHand == 2) {
      if (secondSortedHand == 2) this.handRank = 3;
      else this.handRank = 2;
    }

    //console.log("hand rank", this.handRank);
  }
}

function sortHand(likeCards: { [key: string]: number }) {
  return Object.entries(likeCards).sort(([keyA, valA], [keyB, valB]) => {
    return valB - valA;
  });
}
