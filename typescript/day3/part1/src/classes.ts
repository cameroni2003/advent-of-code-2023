export class LineNumber {
  number: string;
  indexes: number[];

  constructor(number: string, indexes: number[]) {
    this.number = number;
    this.indexes = indexes;
  }
}

export class Line {
  lineNumbers: LineNumber[];
  lineIndex: number;

  constructor(lineIndex: number, lineString: string) {
    this.lineIndex = lineIndex;
    this.lineNumbers = [];

    let numRegister = new LineNumber("", []);
    for (let i = 0; i < lineString.length; i++) {
      const char = lineString[i];

      if (!isNaN(parseInt(char))) {
        numRegister.number += char;
        numRegister.indexes.push(i);
      } else if (numRegister.number) {
        this.lineNumbers.push(numRegister);
        numRegister = new LineNumber("", []);
      }
    }
    if (numRegister.number) {
      this.lineNumbers.push(numRegister);
    }

    // log out lin numbers
    //console.log(this.lineNumbers);
  }

  getNumberFromIndexes(indexes: number[]): string {
    for (const lineNumber of this.lineNumbers) {
      if (lineNumber.indexes.every((i) => indexes.includes(i))) {
        return lineNumber.number;
      }
    }
    return "";
  }

  getNumberFromIndex(index: number): LineNumber[] {
    const foundLineNumbers: LineNumber[] = [];

    for (let i = index - 1; i <= index + 1; i++) {
      for (const lineNumber of this.lineNumbers) {
        if (
          !foundLineNumbers.includes(lineNumber) &&
          lineNumber.indexes.includes(i)
        ) {
          foundLineNumbers.push(lineNumber);
        }
      }
    }

    return foundLineNumbers;

    // for (const lineNumber of this.lineNumbers) {
    //   if (lineNumber.indexes.includes(index)) {
    //     return lineNumber.number;
    //   }
    // }
    // return "";
  }
}
