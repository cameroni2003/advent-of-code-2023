export class MappingRange {
  sourceStart: number;
  destinationStart: number;
  range: number;

  constructor(line: string) {
    const lineParts = line.split(" ").filter((part) => part !== "");

    this.destinationStart = parseInt(lineParts[0]);
    this.sourceStart = parseInt(lineParts[1]);
    this.range = parseInt(lineParts[2]);
  }

  contains(input: number): boolean {
    return this.sourceStart <= input && input <= this.sourceStart + this.range;
  }

  offset() {
    return this.destinationStart - this.sourceStart;
  }
}

export class Mapping {
  ranges: MappingRange[];

  constructor() {
    this.ranges = [];
  }

  doMap(input: number) {
    for (let i = 0; i < this.ranges.length; i++) {
      const range = this.ranges[i];

      if (range.contains(input)) {
        return input + range.offset();
      }
    }

    return input;
  }

  addRange(line: string) {
    this.ranges.push(new MappingRange(line));
  }
}
