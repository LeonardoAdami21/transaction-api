import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { CreateTransactionDto } from '../dto/create-transaction.dto';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(dto: CreateTransactionDto) {
    const timestamp = new Date(dto.timestamp);
    const transaction = new Transaction(dto.amount, timestamp);

    

    if (dto.amount < 0) {
      throw new UnprocessableEntityException(
        'Transaction amount cannot be negative',
      );
    }

    await this.transactionRepository.save(transaction);

  }
}
