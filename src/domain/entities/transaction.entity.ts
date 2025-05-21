import { ConflictException } from '@nestjs/common';

export class Transaction {
  constructor(
    public readonly amount: number,
    public readonly timestamp: Date,
    public readonly id: string = generateUUID(),
  ) {
    this.validateAmount(amount);
    this.validateTimestamp(timestamp);
  }

  private validateAmount(amount: number) {
    if (amount < 0) {
      throw new ConflictException('Amount must be greater than zero');
    }
  }

  private validateTimestamp(timestamp: Date) {
    if (timestamp > new Date()) {
      throw new ConflictException('Timestamp must be in the future');
    }
  }
}
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
