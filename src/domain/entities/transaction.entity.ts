import { ConflictException } from '@nestjs/common';

export class Transaction {
  constructor(
    public readonly amount: number,
    public readonly timestamp: Date,
  ) {
    if (amount <= 0) {
      throw new ConflictException('Amount must be greater than 0');
    }

    if (timestamp > new Date()) {
      throw new ConflictException('Timestamp must be in the past');
    }
  }
}
