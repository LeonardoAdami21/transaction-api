import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class StatisticsDto {
  @ApiProperty({
    description: 'Number of transactions in the last 60 seconds',
    example: 10,
  })
  @IsNumber()
  count: number;

  @ApiProperty({
    description: 'Sum of all transaction amounts in the last 60 seconds',
    example: 1234.56,
  })
  @IsNumber()
  sum: number;

  @ApiProperty({
    description: 'Average of all transaction amounts in the last 60 seconds',
    example: 123.45,
  })
  @IsNumber()
  avg: number;

  @ApiProperty({
    description: 'Minimum transaction amount in the last 60 seconds',
    example: 12.34,
  })
  @IsNumber()
  min: number;

  @ApiProperty({
    description: 'Maximum transaction amount in the last 60 seconds',
    example: 456.78,
  })
  @IsNumber()
  max: number;
}
