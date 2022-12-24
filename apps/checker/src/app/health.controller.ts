import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('health')
  getHealthCheck(): string {
    return 'OK';
  }
}
