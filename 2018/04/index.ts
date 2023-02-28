import { getLines } from "../../utils";

let datePattern = /((\d{4}-\d{2}-\d{2}\s\d{2}\:\d{2}))/gi;
let valuePattern = /\]\s(\w|\D|\s]){1,}/gi;
let idPattern = /\#([0-9]{1,})/gi;
let minutePattern = /([0-9]{2,})$/gi;

const records = getLines(__dirname)
  .map((record) => ({
    date: record.match(datePattern)![0],
    value: record.match(valuePattern)![0].slice(1).trim(),
  }))
  .sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf());

function createSleepRecord(
  records: {
    date: string;
    value: string;
  }[]
) {
  const map = new Map<
    number,
    { start: number; end: number; total: number }[]
  >();
  let id = 0;
  let start = 0;
  let end = 0;

  let sleeps = [];

  for (const record of records) {
    if (record.value.match(idPattern)) {
      id = parseInt(record.value.match(idPattern)![0].slice(1));
      continue;
    }

    if (record.value === "falls asleep") {
      const minute = record.date.match(minutePattern);
      if (!minute) continue;
      start = parseInt(minute[0]);
      continue;
    }

    if (record.value === "wakes up") {
      const minute = record.date.match(minutePattern);
      if (!minute) continue;
      end = parseInt(minute[0]);

      map.set(id, [...(map.get(id) || []), { start, end, total: end - start }]);
    }
  }

  for (const [id, value] of map.entries()) {
    sleeps.push({
      id,
      record: value,
      total: value.reduce((acc, cur) => acc + cur.total, 0),
    });
  }

  return sleeps;
}

function calculate(guard: {
  id: number;
  record: { start: number; end: number; total: number }[];
  total: number;
}): number {
  const map = new Map<number, number>();
  const { id, record } = guard;

  for (const { start, end } of record) {
    for (let time = start; time < end; time++) {
      map.set(time, (map.get(time) || 0) + 1);
    }
  }

  const selectedMinute = [...map].sort((a, b) => b[1] - a[1])[0][0];

  return selectedMinute * id;
}

/** Part 1 */
let mostSleep = createSleepRecord(records).sort((a, b) => b.total - a.total)[0];
let result = calculate(mostSleep);
console.log(result);

/** Part 2 */
mostSleep = createSleepRecord(records).sort(
  (a, b) => b.record.length - a.record.length
)[0];
result = calculate(mostSleep);
console.log(result);
