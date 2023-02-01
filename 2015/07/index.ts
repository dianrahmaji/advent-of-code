import { getInput } from "../../utils";

const content = getInput(__dirname).split("\n");

type Operation =
  | {
      left: string | number;
      right: string | number;
      operator: BitwiseOperation;
    }
  | {
      right: string | number;
      operator: BitwiseOperation;
    }
  | { value: string | number };

type BitwiseOperation = "AND" | "OR" | "LSHIFT" | "RSHIFT" | "OR";

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
      operator: operator as BitwiseOperation,
      right: parseIntOrString(right),
    };

    parsedOperation = operationObj;
  } else {
    const [left, operator, right] = operationSplitted;
    const operationObj: Operation = {
      operator: operator as BitwiseOperation,
      left: parseIntOrString(left),
      right: parseIntOrString(right),
    };

    parsedOperation = operationObj;
  }

  return parsedOperation;
}

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

function calculateOutputFromWire(wire: string | number): number {
  if (typeof wire === "number") return wire;

  if (wireCache.has(wire)) {
    return wireCache.get(wire)!;
  }

  let result: number;

  const operation = circuit.get(wire)!;

  if ("value" in operation) {
    if (typeof operation.value === "number") result = operation.value;
    return calculateOutputFromWire(operation.value);
  }

  if ("left" in operation) {
    switch (operation.operator) {
      case "AND":
        result =
          calculateOutputFromWire(operation.left) &
          calculateOutputFromWire(operation.right);
        break;
      case "OR":
        result =
          calculateOutputFromWire(operation.left) |
          calculateOutputFromWire(operation.right);
        break;
      case "LSHIFT":
        result =
          calculateOutputFromWire(operation.left) <<
          calculateOutputFromWire(operation.right);
        break;
      case "RSHIFT":
        result =
          calculateOutputFromWire(operation.left) >>
          calculateOutputFromWire(operation.right);
        break;
    }
  } else {
    result = 65536 + ~calculateOutputFromWire(operation.right);
  }

  if (!wireCache.has(wire)) {
    wireCache.set(wire, result);
  }

  return result;
}

/** Part 1 */
const wireCache = new Map<string, number>();
const circuit = new Map<string, Operation>();

parseCircuit(content, circuit);
const result = calculateOutputFromWire("a");
console.log("Part 1", result);

/**Part 2 */
wireCache.clear();

circuit.set("b", { value: result });
const result2 = calculateOutputFromWire("a");
console.log("Part 2", result2);
