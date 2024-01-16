import { Module } from '@nestjs/common';
import { KoilibModule } from '../koilib.module';
import { HttpModule } from '@nestjs/axios';

import { ChainService } from './service/chain.service';
import { ChainController } from './controller/chain-controller';
import { HealthService } from './service/health.service';
import { HealthController } from './controller/health.controller';

@Module({
  imports: [HttpModule, KoilibModule],
  providers: [ChainService, HealthService],
  controllers: [ChainController, HealthController],
})
export class ChainModule {}
