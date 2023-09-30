enum DirectionOption {
	Up = "(",
	Down = ")",
}

const BASEMENT = -1;

export function partOne(input: string) {
	return input.split("").reduce((currentFloor, instruction) => {
		switch (instruction) {
			case DirectionOption.Up:
				return ++currentFloor;
			case DirectionOption.Down:
				return --currentFloor;
			default:
				return currentFloor;
		}
	}, 0);
}

export function partTwo(input: string) {
	let currentFloor = 0;
	let instuctionPosition = 0;

	while (currentFloor !== BASEMENT) {
		switch (input[instuctionPosition]) {
			case DirectionOption.Up:
				currentFloor++;
				break;
			case DirectionOption.Down:
				currentFloor--;
				break;
		}

		instuctionPosition++;
	}

	return instuctionPosition;
}
