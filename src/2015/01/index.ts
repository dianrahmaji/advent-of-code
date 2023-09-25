enum DirectionOption {
	Up = "(",
	Down = ")",
}

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
