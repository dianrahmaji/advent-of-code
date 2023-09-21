const instructionMap = new Map([['(', 1], [')', -1]])

export function partOne(input: string) {
  return input.split('').reduce((currentFloor, instruction) => {
    const direction = instructionMap.get(instruction);

    if (!direction) return currentFloor;

    const newFloor = currentFloor + direction;
    return newFloor;
  }, 0)
}