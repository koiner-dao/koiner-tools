import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlockProductionStats, BlockProductionStatsService } from '../service';

@Controller()
export class BlockProductionStatsController {
  constructor(
    private readonly configService: ConfigService,
    private readonly blockProductionStatsService: BlockProductionStatsService
  ) {}

  @Get('network/block-production/stats')
  async getBlockProductionStats(): Promise<BlockProductionStats> {
    return await this.blockProductionStatsService.getStats();
  }
}
