import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChainModule } from './chain/chain.module';
import { NetworkModule } from './network/network.module';
import { TokenizeModule } from './tokenize/tokenize.module';

import { IndexController } from './index-controller';
import { HealthController } from './health.controller';

import koinosConfig from './config/koinos.config';
import koinerConfig from './config/koiner.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [koinosConfig, koinerConfig],
    }),
    ChainModule,
    NetworkModule,
    TokenizeModule,
  ],
  controllers: [IndexController, HealthController],
})
export class AppModule {}
