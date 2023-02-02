import { getInput } from "../../utils";

const content = getInput(__dirname).split("\n");

type BinaryOperator = "AND" | "OR" | "LSHIFT" | "RSHIFT";
type UnaryOperator = "NOT";

type Operation =
  | {
      left: string | number;
      right: string | number;
      operator: BinaryOperator;
    }
  | {
      right: string | number;
      operator: UnaryOperator;
    }
  | { value: string | number };

function parseIntOrString(input: string): string | number {
  return isNaN(parseInt(input)) ? input : parseInt(input);
}

//TODO: Parse with RegEx
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
      operator: operator as UnaryOperator,
      right: parseIntOrString(right),
    };

    parsedOperation = operationObj;
  } else {
    const [left, operator, right] = operationSplitted;
    const operationObj: Operation = {
      operator: operator as BinaryOperator,
      left: parseIntOrString(left),
      right: parseIntOrString(right),
    };

    parsedOperation = operationObj;
  }

  return parsedOperation;
}

// TODO: Parse with RegEx
function parseCircuit(
  input: string[],
  circuitMap: Map<string, Operation>
): void {
  for (const connection of input) {
    const [operation, wire] = connection.split(" -> ");
    const parsedOperation = parseOperation(operation);

    circuitMap.set(wire, parsedOperation);
  }
}

function calculateSignal(
  wire: string | number,
  cache = new Map<string, number>()
): number {
  if (typeof wire === "number") return wire;

  if (cache.has(wire)) {
    return cache.get(wire)!;
  }

  let result: number;

  const operation = circuit.get(wire)!;

  if ("value" in operation) {
    if (typeof operation.value === "number") result = operation.value;
    return calculateSignal(operation.value, cache);
  }

  //TODO: Extract to new function
  switch (operation.operator) {
    case "AND":
      result =
        calculateSignal(operation.left, cache) &
        calculateSignal(operation.right, cache);
      break;
    case "OR":
      result =
        calculateSignal(operation.left, cache) |
        calculateSignal(operation.right, cache);
      break;
    case "LSHIFT":
      result =
        calculateSignal(operation.left, cache) <<
        calculateSignal(operation.right, cache);
      break;
    case "RSHIFT":
      result =
        calculateSignal(operation.left, cache) >>
        calculateSignal(operation.right, cache);
      break;
    case "NOT":
      result = result = 65536 + ~calculateSignal(operation.right, cache);
  }

  if (!cache.has(wire)) {
    cache.set(wire, result);
  }

  return result;
}

/** Part 1 */
const circuit = new Map<string, Operation>();

parseCircuit(content, circuit);
const result = calculateSignal("a");
console.log("Part 1", result);

/**Part 2 */
circuit.set("b", { value: result });
const result2 = calculateSignal("a");
console.log("Part 2", result2);
