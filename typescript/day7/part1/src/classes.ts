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

    const sortedHand = Object.entries(this.likeCards).sort(
      ([keyA, valA], [keyB, valB]) => {
        return valB - valA;
      },
    );

    console.log("sortedHand", sortedHand);

    console.log("top sortedHand", sortedHand[0]);
    console.log("second sortedHand", sortedHand[1]);

    //console.log("hand info", this.hand, this.bet, this.likeCards);
    const firstSortedHand = sortedHand[0][1];
    const secondSortedHand = sortedHand.length > 1 ? sortedHand[1][1] : 0;

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

    console.log("hand rank", this.handRank);
  }
}

const handTypes = {};
