import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags('Saude da aplicação')
@Controller('v2/health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Verifica a saúde da aplicação' })
  @ApiOkResponse({ description: 'Aplicação em saude' })
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
