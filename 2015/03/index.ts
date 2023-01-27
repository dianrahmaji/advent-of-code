import { getInput } from "../../utils";

const content = getInput(__dirname);

class Delivery {
  private path: string;
  private _locations = [[0, 0]];
  unique: number = 1;

  constructor(path: string) {
    this.path = path;
  }

  get length(): number {
    return this._locations.length;
  }

  get locations(): number[][] {
    return this._locations;
  }

  private isVisited(next: number[]) {
    const [nextX, nextY] = next;
    return this._locations.some(
      ([currentX, currentY]) => currentX === nextX && currentY === nextY
    );
  }

  private up() {
    const [currentX, currentY] = this._locations[this.length - 1];
    const next = [currentX, currentY + 1];
    if (!this.isVisited(next)) this.unique++;
    this._locations.push(next);
  }

  private right() {
    const [currentX, currentY] = this._locations[this.length - 1];
    const next = [currentX + 1, currentY];
    if (!this.isVisited(next)) this.unique++;
    this._locations.push(next);
  }

  private down() {
    const [currentX, currentY] = this._locations[this.length - 1];
    const next = [currentX, currentY - 1];
    if (!this.isVisited(next)) this.unique++;
    this._locations.push(next);
  }

  private left() {
    const [currentX, currentY] = this._locations[this.length - 1];
    const next = [currentX - 1, currentY];
    if (!this.isVisited(next)) this.unique++;
    this._locations.push(next);
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
  }
}

/**Part 1 */
const delivery = content
  .split("\n")
  .map((path) => {
    const d = new Delivery(path);
    d.move();
    return d;
  })
  .map((d) => console.log(d.unique));

/**Part 2 */
let santaPath = "";
let roboPath = "";

content.split("").forEach((v, i) => {
  if (i % 2 === 0) {
    santaPath += v;
  } else roboPath += v;
});

const santaDelivery = new Delivery(santaPath);
santaDelivery.move();
const roboDelivery = new Delivery(roboPath);
roboDelivery.move();

const removeDuplicated = [
  ...santaDelivery.locations,
  ...roboDelivery.locations,
].map((v) => JSON.stringify(v));

const result2 = [...new Set(removeDuplicated)].length;

console.log(result2);
