import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiUnprocessableEntityResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CreateTransactionUseCase } from '../../applications/usecase/create-transaction.use-case';
import { DeleteTransactionsUseCase } from '../../applications/usecase/delete-all-transactions.use-case';
import { CreateTransactionDto } from '../../applications/dto/create-transaction.dto';

@ApiTags('Transações')
@Controller('v2/transactions')
@UseGuards(ThrottlerGuard)
export class TransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly deleteTransactionsUseCase: DeleteTransactionsUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova transação' })
  @ApiCreatedResponse({
    description: 'Transação criada com sucesso',
  })
  @ApiBadRequestResponse({
    description: 'Invalido JSON, campo amount ou timestamp obrigatorio',
  })
  @ApiUnprocessableEntityResponse({
    description:
      'Transação viola as regras de negócio (future timestamp or negative amount)',
  })
  async createTransaction(@Body() dto: CreateTransactionDto) {
    await this.createTransactionUseCase.execute(dto);
    return {
      message: 'Transação criada com sucesso',
      amount: dto.amount,
      timestamp: dto.timestamp,
    };
  }

  @Delete()
  @ApiOperation({ summary: 'Deleta todas as transações' })
  @ApiOkResponse({
    description: 'Todas as transações deletadas com sucesso',
  })
  async deleteTransactions(): Promise<void> {
    await this.deleteTransactionsUseCase.execute();
  }
}
