async function main() {
  const text = await Bun.file("src/data.txt").text();
  const lines = text.split("\n");

  const calibrartion = lines.reduce((acc, line) => {
    let firstNum = null;
    let secondNum = null;

    for (var i = 0; i < line.length; i++) {
      const num = line.charAt(i);
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

main();
