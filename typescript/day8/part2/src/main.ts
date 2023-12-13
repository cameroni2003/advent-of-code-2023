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
    //console.log(equalSplit);

    const routes = equalSplit[1].replace(")", "").replace("(", "").split(", ");

    mapping[equalSplit[0]] = routes;
  }

  let steps: string[] = Object.keys(mapping).filter((x) => lastChar(x) === "A");

  //steps = steps.slice(0, 4);
  console.log("steps", steps);

  let counter = 0;

  let numZ = 0;
  const numSteps = steps.length;

  const stepsToFirstZ: { [key: string]: number } = {};

  const stepsCopy = [...steps];

  while (numZ != numSteps) {
    counter++;
    numZ = 0;
    const curDirection = directions?.shift();

    for (let i = 0; i < steps.length; i++) {
      let mappingStep = mapping[steps[i]];

      if (curDirection == "L") steps[i] = mappingStep[0];
      else if (curDirection == "R") steps[i] = mappingStep[1];

      if (lastChar(steps[i]) === "Z" && !stepsToFirstZ[stepsCopy[i]]) {
        stepsToFirstZ[stepsCopy[i]] = counter;
      }
    }
    if (Object.keys(stepsToFirstZ).length === numSteps) break;
    directions?.push(curDirection!);

    if (counter % 1000000000 === 0) console.log(counter, steps);
    if (numZ > 3) console.log("more than 3 Z", counter, steps);
  }

  console.log("steps to first Z", stepsToFirstZ);

  const result = lcm(Object.values(stepsToFirstZ));

  console.log(result);
}

function lastChar(str: string) {
  return str.charAt(str.length - 1);
}

type Mapping = {
  [key: string]: string[];
};

// LCM helpers
function gcd2(a: number, b: number) {
  // Greatest common divisor of 2 integers
  if (!b) return b === 0 ? a : NaN;
  return gcd2(b, a % b);
}
function gcd(array: number[]) {
  // Greatest common divisor of a list of integers
  var n = 0;
  for (var i = 0; i < array.length; ++i) n = gcd2(array[i], n);
  return n;
}
function lcm2(a: number, b: number) {
  // Least common multiple of 2 integers
  return (a * b) / gcd2(a, b);
}
function lcm(array: number[]) {
  // Least common multiple of a list of integers
  var n = 1;
  for (var i = 0; i < array.length; ++i) n = lcm2(array[i], n);
  return n;
}
main();
