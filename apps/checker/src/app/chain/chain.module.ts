import { Module } from '@nestjs/common';
import { KoilibModule } from '../koilib.module';

import { ChainService } from './service/chain.service';
import { ChainController } from './balance/chain-controller';

@Module({
  imports: [KoilibModule],
  providers: [ChainService],
  controllers: [ChainController],
})
export class ChainModule {}
