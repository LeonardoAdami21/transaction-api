import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { TransactionRepository } from '../infra/repositories/transaction.repository';
import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class CreateTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(dto: CreateTransactionDto) {
    try {
      const transaction = new Transaction(dto.amount, new Date(dto.timestamp));
      await this.transactionRepository.save(transaction);
    } catch (error) {
      throw new UnprocessableEntityException('Erro ao criar transação');
    }
  }
}
