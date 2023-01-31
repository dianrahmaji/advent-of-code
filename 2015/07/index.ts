import { getInput } from "../../utils";

const content = getInput(__dirname).split("\n");

type Operation =
  | {
      left: string | number;
      right: string | number;
      operator: string;
    }
  | {
      right: string | number;
      operator: string;
    }
  | { value: string | number };

function parseIntOrString(input: string): string | number {
  const value = parseInt(input);
  if (isNaN(value)) return input;
  return value;
}

function parseOperation(operation: string): Operation {
  const operationSplitted = operation.split(" ");

  let parsedOperation: Operation;

  if (operationSplitted.length === 1) {
    const operationObj: Operation = {
      value: parseIntOrString(operationSplitted[0]),
    };

    parsedOperation = operationObj;
  } else if (operationSplitted.length === 2) {
    const [operator, right] = operationSplitted;
    const operationObj: Operation = {
      operator,
      right: parseIntOrString(right),
    };

    parsedOperation = operationObj;
  } else {
    const [left, operator, right] = operationSplitted;
    const operationObj: Operation = {
      operator,
      left: parseIntOrString(left),
      right: parseIntOrString(right),
    };

    parsedOperation = operationObj;
  }

  return parsedOperation;
}

function parseCircuit(circuit: string[]): Map<string, Operation> {
  const circuitMap = new Map<string, Operation>();

  for (const connection of circuit) {
    const [operation, wire] = connection.split(" -> ");
    const parsedOperation = parseOperation(operation);

    circuitMap.set(wire, parsedOperation);
  }

  return circuitMap;
}

/** Part 1 */
const circuitMap = parseCircuit(content);
console.log(circuitMap);
