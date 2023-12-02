async function main() {
  const text = await Bun.file("src/data.txt").text();
  const lines = text.split("\n");

  const calibrartion = lines.reduce((acc, line) => {
    let firstNum = null;
    let secondNum = null;

    for (var i = 0; i < line.length; i++) {
      const num = line.charAt(i);
      const numSubString = line.substring(i);

      const numString = stringNumber(numSubString);

      if (numString != null) {
        if (firstNum == null) firstNum = numString;
        secondNum = numString;
        continue;
      }

      if (!isNaN(Number(num))) {
        if (firstNum == null) firstNum = num;
        secondNum = num;
      }
    }

    const combined = firstNum! + secondNum!;

    return acc + Number(combined);
  }, 0);

  console.log(calibrartion);
}

function stringNumber(input: string): string | null {
  const keys = Object.keys(numbers);
  for (var i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (input.startsWith(key)) {
      return numbers[key];
    }
  }

  return null;
}

const numbers: { [key: string]: string } = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

main();
