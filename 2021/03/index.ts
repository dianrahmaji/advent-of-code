import { getLines } from "../../utils";

const report = getLines(__dirname);

type Rates = {
  gamma: string;
  epsilon: string;
};

function calculateRates(report: string[]): Rates {
  let gamma = "";
  let epsilon = "";

  for (let col = 0; col < report[0].length; col++) {
    let gammaCount = 0;
    for (let row = 0; row < report.length; row++) {
      if (report[row][col] === "1") gammaCount++;
    }

    if (gammaCount > report.length / 2) {
      gamma += "1";
      epsilon += "0";
    } else {
      gamma += "0";
      epsilon += "1";
    }
  }

  return { gamma, epsilon };
}

function binarytoDecimal(binary: string): number {
  return [...binary].reduce((acc, cur) => acc * 2 + parseInt(cur), 0);
}

function calculatePowerConsumption(rates: Rates): number {
  const { gamma, epsilon } = rates;

  const gamaInDecimal = binarytoDecimal(gamma);
  const epsilonInDecimal = binarytoDecimal(epsilon);

  return gamaInDecimal * epsilonInDecimal;
}

/** Part 1 */
const rates = calculateRates(report);
const result = calculatePowerConsumption(rates);

console.log(result);
