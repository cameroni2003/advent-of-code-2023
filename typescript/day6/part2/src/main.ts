async function main() {
  const file = Bun.file("src/data.txt");
  if (!file.size) return console.log("no data to process");

  const lines = (await file.text()).split("\r\n");

  let result = "not implemented";

  //console.log(lines);

  const timeSplit = lines[0];
  const distanceSplit = lines[1];

  const times = cleanInput(timeSplit);
  const distances = cleanInput(distanceSplit);

  // console.log("times", times);
  // console.log("distances", distances);

  const numOfValidTimes: number[] = [];

  const time = times[0];
  const distance = distances[0];

  const validButtonTime: number[] = [];

  for (let ms = 1; ms < time; ms++) {
    const boatDistance = ms * (time - ms);
    if (boatDistance > distance) {
      validButtonTime.push(ms);
    }
  }

  //console.log("validButtonTime", validButtonTime);

  //console.log("numOfValidTimes", numOfValidTimes);
  console.log(validButtonTime.length);
}

function cleanInput(input: string) {
  return input
    .split(":")[1]
    .trim()
    .split(" ")
    .filter((x) => x !== "")
    .map((x) => parseInt(x));
}

main();
