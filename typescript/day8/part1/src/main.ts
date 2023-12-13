async function main() {
  const file = Bun.file("src/data.txt");
  if (!file.size) return console.log("no data to process");

  const lines = (await file.text()).split("\n").filter((x) => x !== "");

  //get our directions
  const directions = lines.shift()?.split("");

  // build out the mapping
  const mapping: Mapping = {};
  for (const line of lines) {
    const equalSplit = line.split(" = ");
    console.log(equalSplit);

    const routes = equalSplit[1].replace(")", "").replace("(", "").split(", ");

    mapping[equalSplit[0]] = routes;
  }

  let counter = 0;
  let step = "AAA";

  while (step !== "ZZZ") {
    counter++;

    let mappingStep = mapping[step];
    const curDirection = directions?.shift();

    if (curDirection == "L") step = mappingStep[0];
    else if (curDirection == "R") step = mappingStep[1];

    directions?.push(curDirection!);
  }

  console.log(counter);
}

type Mapping = {
  [key: string]: string[];
};

main();
