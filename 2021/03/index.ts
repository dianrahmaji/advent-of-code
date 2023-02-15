import { getLines, binarytoDecimal } from "../../utils";

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

function calculatePowerConsumption(rates: Rates): number {
  const { gamma, epsilon } = rates;

  const gamaInDecimal = binarytoDecimal(gamma);
  const epsilonInDecimal = binarytoDecimal(epsilon);

  return gamaInDecimal * epsilonInDecimal;
}

function calculateOxygenRate(report: string[]) {
  let res: string[] = report;

  for (let col = 0; col < res[0].length; col++) {
    let diff = new Map<string, string[]>();
    for (let row = 0; row < res.length; row++) {
      if (!diff.has(res[row][col])) {
        diff.set(res[row][col], [res[row]]);
      } else {
        diff.get(res[row][col])?.push(res[row]);
      }
    }

    if (diff.get("0")?.length === 1 && diff.get("1")?.length === 1) {
      return diff.get("1")![0];
    }

    res =
      (diff.get("0")?.length || 0) > (diff.get("1")?.length || 0)
        ? (diff.get("0") as string[])
        : (diff.get("1") as string[]);
  }

  return res[0];
}

function calculateCarbonDioxideRate() {
  let res: string[] = report;

  for (let col = 0; col < res[0].length; col++) {
    let diff = new Map<string, string[]>();
    for (let row = 0; row < res.length; row++) {
      if (!diff.has(res[row][col])) {
        diff.set(res[row][col], [res[row]]);
      } else {
        diff.get(res[row][col])?.push(res[row]);
      }
    }

    if (diff.get("0")?.length === 1 && diff.get("1")?.length === 1) {
      return diff.get("0")![0];
    }

    res =
      (diff.get("0")?.length || 0) < (diff.get("1")?.length || 0)
        ? (diff.get("0") as string[])
        : (diff.get("1") as string[]);
  }

  return res[0];
}

function calculateLifeSupportRate(
  oxigenRate: string,
  carbonDioxideRate: string
): number {
  const oxigenRateInDecimal = binarytoDecimal(oxigenRate);
  const carbonDioxideRateInDecimal = binarytoDecimal(carbonDioxideRate);

  return oxigenRateInDecimal * carbonDioxideRateInDecimal;
}

/** Part 1 */
const rates = calculateRates(report);
const result = calculatePowerConsumption(rates);

console.log(result);

/** Part 2 */
const oxygenRate = calculateOxygenRate(report);
const carbonDioxideRate = calculateCarbonDioxideRate();
const result2 = calculateLifeSupportRate(oxygenRate, carbonDioxideRate);
console.log(result2);
