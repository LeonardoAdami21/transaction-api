import { IsNumber, IsDateString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Transaction amount (must be non-negative)',
    example: 123.45,
    minimum: 0,
  })
  @IsNumber({}, { message: 'Amount must be a number' })
  @Min(0, { message: 'Amount cannot be negative' })
  amount: number;

  @ApiProperty({
    description: 'Transaction timestamp in ISO 8601 format (UTC)',
    example: '2024-02-20T12:34:56.789Z',
  })
  @IsDateString(
    {},
    { message: 'Timestamp must be a valid ISO 8601 date string' },
  )
  @Transform(({ value }) => {
    const date = new Date(value);
    const now = new Date();
    if (date > now) {
      throw new Error('Transaction cannot be in the future');
    }
    return value;
  })
  timestamp: string;
}
