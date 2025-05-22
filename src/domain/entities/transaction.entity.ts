export class Transaction {
  constructor(
    public readonly amount: number,
    public readonly timestamp: Date,
  ) {
    this.validateAmount(amount);
    this.validateTimestamp(timestamp);
  }

  private validateAmount(amount: number) {
    if (amount < 0) {
      throw new Error('Amount cannot be negative');
    }
  }

  private validateTimestamp(timestamp: Date) {
    const date = new Date();
    if (timestamp > date) {
      throw new Error('Transaction cannot be in the future');
    }
  }

  isInFuture(currentTime: Date = new Date()): boolean {
    return this.timestamp > currentTime;
  }

  isWithinTimeWindow(seconds: number): boolean {
    const now = new Date();
    const windowStart = new Date(now.getTime() - seconds * 1000);
    return this.timestamp >= windowStart;
  }
}
