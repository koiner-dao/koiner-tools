import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { BlockProductionStatsService } from './service';
import { BlockProductionStatsController } from './controller';

@Module({
  imports: [HttpModule],
  providers: [BlockProductionStatsService],
  exports: [BlockProductionStatsService],
  controllers: [BlockProductionStatsController],
})
export class NetworkModule {}
