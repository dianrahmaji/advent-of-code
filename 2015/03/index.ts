import { getInput } from "../../utils";

const content = getInput(__dirname);

class Delivery {
  private path: string;
  unique: number = 1;

  constructor(private locations = [[0, 0]], path: string) {
    this.path = path;
  }

  get length(): number {
    return this.locations.length;
  }

  private isVisited(next: number[]) {
    const [nextX, nextY] = next;
    return this.locations.some(
      ([currentX, currentY]) => currentX === nextX && currentY === nextY
    );
  }

  private up() {
    const [currentX, currentY] = this.locations[this.length - 1];
    const next = [currentX, currentY + 1];
    if (!this.isVisited(next)) this.unique++;
    this.locations.push(next);
  }
  private right() {
    const [currentX, currentY] = this.locations[this.length - 1];
    const next = [currentX + 1, currentY];
    if (!this.isVisited(next)) this.unique++;
    this.locations.push(next);
  }
  private down() {
    const [currentX, currentY] = this.locations[this.length - 1];
    const next = [currentX, currentY - 1];
    if (!this.isVisited(next)) this.unique++;
    this.locations.push(next);
  }
  private left() {
    const [currentX, currentY] = this.locations[this.length - 1];
    const next = [currentX - 1, currentY];
    if (!this.isVisited(next)) this.unique++;
    this.locations.push(next);
  }

  move() {
    this.path.split("").forEach((m) => {
      if (m === "^") {
        this.up();
      } else if (m === ">") {
        this.right();
      } else if (m === "v") {
        this.down();
      } else {
        this.left();
      }
    });

    return this;
  }
}

const delivery = content
  .split("\n")
  .map((path) => new Delivery([[0, 0]], path).move())
  .map((d) => console.log(d.unique));
