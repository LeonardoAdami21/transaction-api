import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Transaction } from '../../domain/entities/transaction.entity';
import { LoggerService } from '../../infra/logger/logger.service';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { CreateTransactionDto } from '../dto/create-transaction.dto';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly logger: LoggerService,
  ) {}

  async execute(dto: CreateTransactionDto) {
    const timestamp = new Date(dto.timestamp);
    const transaction = new Transaction(dto.amount, timestamp);

    // Validate business rules
    if (transaction.isInFuture()) {
      this.logger.warn('Transaction rejected: timestamp is in the future', {
        timestamp: dto.timestamp,
        amount: dto.amount,
      });
      throw new UnprocessableEntityException(
        'Transaction timestamp cannot be in the future',
      );
    }

    if (dto.amount < 0) {
      this.logger.warn('Transaction rejected: negative amount', {
        timestamp: dto.timestamp,
        amount: dto.amount,
      });
      throw new UnprocessableEntityException(
        'Transaction amount cannot be negative',
      );
    }

    await this.transactionRepository.save(transaction);

  }
}
