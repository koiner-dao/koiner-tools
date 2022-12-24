import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KoilibModule } from './koilib.module';

import { AddressBalanceService } from './tokenize/service/address-balance.service';
import { TotalSupplyService } from './tokenize/service/total-supply.service';

import { KoinBalanceController } from './tokenize/balance/koin-balance-controller';
import { KoinTotalSupplyController } from './tokenize/total-supply/koin-total-supply-controller';
import { TokenBalanceController } from './tokenize/balance/token-balance-controller';
import { TokenTotalSupplyController } from './tokenize/total-supply/token-total-supply-controller';
import { VhpBalanceController } from './tokenize/balance/vhp-balance-controller';

import { IndexController } from './index-controller';
import { HealthController } from './health.controller';

import koinosConfig from './config/koinos.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [koinosConfig],
    }),
    KoilibModule,
  ],
  providers: [AddressBalanceService, TotalSupplyService],
  controllers: [
    // Balance checks
    KoinBalanceController,
    TokenBalanceController,
    VhpBalanceController,

    // Total supply checks
    KoinTotalSupplyController,
    TokenTotalSupplyController,

    IndexController,
    HealthController,
  ],
})
export class AppModule {}
