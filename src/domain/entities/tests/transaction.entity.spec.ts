import { Transaction } from '../transaction.entity';

describe('Transaction Entity', () => {
  it('should create a valid transaction', () => {
    const amount = 100.50;
    const timestamp = new Date('2024-02-20T12:34:56.789Z');

    const transaction = new Transaction(amount, timestamp);

    expect(transaction.amount).toBe(amount);
    expect(transaction.timestamp).toBe(timestamp);
  });

  it('should throw error for negative amount', () => {
    const amount = -10;
    const timestamp = new Date();

    expect(() => new Transaction(amount, timestamp)).toThrow('Amount cannot be negative');
  });

  it('should throw error for future timestamp', () => {
    const amount = 100;
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);

    expect(() => new Transaction(amount, futureDate)).toThrow('Transaction cannot be in the future');
  });

  it('should allow zero amount', () => {
    const amount = 0;
    const timestamp = new Date();

    const transaction = new Transaction(amount, timestamp);

    expect(transaction.amount).toBe(0);
  });

  it('should correctly identify transaction within time window', () => {
    const now = new Date();
    const thirtySecondsAgo = new Date(now.getTime() - 30 * 1000);
    const transaction = new Transaction(100, thirtySecondsAgo);

    expect(transaction.isWithinTimeWindow(60)).toBe(true);
    expect(transaction.isWithinTimeWindow(20)).toBe(false);
  });
});