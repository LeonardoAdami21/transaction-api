import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CreateTransactionUseCase } from '../usecases/create-transaction.usecase';
import { DeleteTransactionUseCase } from '../usecases/delete-transaction.usecase';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Logger,
  Post,
} from '@nestjs/common';
import { CreateTransactionDto } from '../usecases/dto/create-transaction.dto';

@ApiTags('Transações')
@Controller('v2/transactions')
export class TransactionController {
  private readonly logger = new Logger(TransactionController.name);
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly deleteTransactionUseCase: DeleteTransactionUseCase,
  ) {}

  @ApiOperation({ summary: 'Cria uma nova transação' })
  @ApiCreatedResponse({ description: 'Transação criada com sucesso' })
  @ApiBadRequestResponse({ description: 'JSON mal formatado' })
  @ApiUnprocessableEntityResponse({
    description: 'Transação inválida(Violação de regra)',
  })
  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    this.logger.log(
      `Criando nova transação...${JSON.stringify(createTransactionDto)}`,
    );
    try {
      const timestamp = new Date(createTransactionDto.timestamp);
      const transaction = await this.createTransactionUseCase.execute(
        createTransactionDto.amount,
        timestamp,
      );
      return {
        message: 'Transação criada com sucesso',
      };
    } catch (error) {
      this.logger.error(`Erro ao criar transação: ${error.message}`);
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new BadRequestException('JSON mal formatado');
      }
    }
  }

  @Delete()
  @ApiOperation({ summary: 'Remove todas as transações' })
  @ApiOkResponse({ description: 'Transações removidas com sucesso' })
  async deleteAll(): Promise<void> {
    this.logger.log('Deleting all transactions');
    const result = await this.deleteTransactionUseCase.execute();
    return result;
  }
}
