import { Transaction } from './transaction.entity';

export class Statistics {
  constructor(
    public readonly count: number = 0,
    public readonly sum: number = 0,
    public readonly avg: number = 0,
    public readonly min: number = 0,
    public readonly max: number = 0,
  ) {}

  // Cria uma estatística vazia
  static empty(): Statistics {
    return new Statistics();
  }

  // Transforma uma lista de transações em estatísticas
  static fromTransactions(amounts: number[]): Statistics {
    if (!amounts.length) {
      return new Statistics();
    }

    const count = amounts.length;
    const sum = amounts.reduce((acc, amount) => acc + amount, 0);
    const avg = sum / count;
    const min = Math.min(...amounts);
    const max = Math.max(...amounts);

    return new Statistics(count, sum, avg, min, max);
  }
}
