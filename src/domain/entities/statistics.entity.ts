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
  static fromTransactions(transactions: Transaction[]): Statistics {
    if (transactions.length === 0) {
      return Statistics.empty();
    }

    // Calcula as estatísticas
    const count = transactions.length;
    const sum = transactions.reduce((acc, curr) => acc + curr.amount, 0);
    const avg = sum / count;
    const min = Math.min(...transactions.map((t) => t.amount));
    const max = Math.max(...transactions.map((t) => t.amount));

    return new Statistics(count, sum, avg, min, max);
  }
}
