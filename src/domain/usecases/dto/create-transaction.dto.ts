import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'O valor da transação (positivo ou zero)',
    example: 123.45,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'O valor da transação não pode ser negativo' })
  amount: number;

  @ApiProperty({
    description: 'Data e hora da transação no formato ISO 8601 (UTC)',
    example: '2024-05-20T12:34:56.789Z',
  })
  @IsNotEmpty()
  @IsDateString()
  timestamp: string;
}
