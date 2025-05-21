import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class StatisticsDto {
  @ApiProperty({
    description: 'Quantidade total de transações nos últimos 60s',
    example: 10,
  })
  @IsNumber()
  count: number;

  @ApiProperty({
    description: 'Soma total dos valores transacionados',
    example: 1234.56,
  })
  @IsNumber()
  sum: number;

  @ApiProperty({
    description: 'Média dos valores transacionados',
    example: 123.45,
  })
  @IsNumber()
  avg: number;

  @ApiProperty({
    description: 'Menor valor transacionado',
    example: 12.34,
  })
  @IsNumber()
  min: number;

  @ApiProperty({
    description: 'Maior valor transacionado',
    example: 456.78,
  })
  @IsNumber()
  max: number;
}
