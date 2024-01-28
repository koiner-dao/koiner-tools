import { Module } from '@nestjs/common';
import { KoilibModule } from '../koilib.module';
import { NetworkModule } from '../network/network.module';

import { AddressBalanceService } from './service/address-balance.service';
import { ManaBalanceService } from './service/mana-balance.service';
import { TotalSupplyService } from './service/total-supply.service';

import { KoinBalanceController } from './balance/koin-balance-controller';
import { KoinTotalSupplyController } from './total-supply/koin-total-supply-controller';
import { AddressBalanceController } from './balance/address-balance-controller';
import { ManaBalanceController } from './balance/mana-balance-controller';
import { TokenBalanceController } from './balance/token-balance-controller';
import { TokenTotalSupplyController } from './total-supply/token-total-supply-controller';
import { VhpBalanceController } from './balance/vhp-balance-controller';

@Module({
  imports: [KoilibModule, NetworkModule],
  providers: [AddressBalanceService, ManaBalanceService, TotalSupplyService],
  controllers: [
    // Balance checks
    AddressBalanceController,
    KoinBalanceController,
    ManaBalanceController,
    TokenBalanceController,
    VhpBalanceController,

    // Total supply checks
    KoinTotalSupplyController,
    TokenTotalSupplyController,
  ],
})
export class TokenizeModule {}
