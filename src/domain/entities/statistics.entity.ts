export class Statistics {
  constructor(
    public readonly count: number,
    public readonly sum: number,
    public readonly avg: number,
    public readonly min: number,
    public readonly max: number,
  ) {}

  static empty(): Statistics {
    return new Statistics(0, 0, 0, 0, 0);
  }

  static fromAmounts(amounts: number[]): Statistics {
    if (amounts.length === 0) {
      return Statistics.empty();
    }

    const count = amounts.length;
    const sum = amounts.reduce((acc, amount) => acc + amount, 0);
    const avg = sum / count;
    const min = Math.min(...amounts);
    const max = Math.max(...amounts);

    return new Statistics(count, sum, avg, min, max);
  }
}
