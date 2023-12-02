export class Game {
  rolls: Roll[];
  id: number;

  constructor(gameLine: string) {
    const gameIdSplit = gameLine.split(":");
    try {
      this.id = Number(gameIdSplit[0].split(" ")[1]);
    } catch (e) {
      console.log(gameIdSplit);
      throw e;
    }

    const rollsSplit = gameIdSplit[1].split(";");
    const rolls = rollsSplit.map((roll) => {
      const rollSplit = roll
        .trim()
        .split(",")
        .map((r) => r.trim());

      const rollObj: { [key: string]: number } = { red: 0, blue: 0, green: 0 };

      rollSplit.forEach((r) => {
        const rollLineSplit = r.trim().split(" ");
        rollObj[rollLineSplit[1]] = Number(rollLineSplit[0]);
      });

      return new Roll(rollObj.red, rollObj.blue, rollObj.green);
    });
    this.rolls = rolls;
  }

  isPossible(input: Bag): boolean {
    for (let i = 0; i < this.rolls.length; i++) {
      const roll = this.rolls[i];
      if (
        roll.reds > input.reds ||
        roll.blues > input.blues ||
        roll.greens > input.greens
      ) {
        return false;
      }
    }
    return true;
  }
}

export type Bag = {
  reds: number;
  blues: number;
  greens: number;
};

class Roll {
  reds: number;
  blues: number;
  greens: number;

  constructor(reds: number, blues: number, greens: number) {
    this.reds = reds;
    this.blues = blues;
    this.greens = greens;
  }
}
