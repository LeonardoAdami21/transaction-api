import { Injectable } from "@nestjs/common";
import { TransactionRepository } from "../infra/repositories/transaction.repository";

@Injectable()
export class DeleteTransactionUseCase {
    constructor(private readonly transactionRepository: TransactionRepository) {}

    async execute() {
        return await this.transactionRepository.deleteAll();
    }
}