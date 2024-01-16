import { Controller, Get } from '@nestjs/common';
import { HealthService } from '../service/health.service';
import { HealthResponse } from '../service/health-response';

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('status')
  async getHealth(): Promise<HealthResponse> {
    return await this.healthService.getHealth();
  }
}
