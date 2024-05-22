import { Module } from '@nestjs/common';
import { KoilibModule } from '../koilib.module';
import { NetworkModule } from '../network/network.module';

import {
  AddressBalanceService,
  ClaimContractService,
  ManaBalanceService,
  TotalSupplyService,
} from './service';
import {
  AddressBalanceController,
  KoinBalanceController,
  ManaBalanceController,
  TokenBalanceController,
  VhpBalanceController,
} from './balance';
import { ClaimDataController } from './claim';
import {
  KoinTotalSupplyController,
  TokenTotalSupplyController,
} from './total-supply';

@Module({
  imports: [KoilibModule, NetworkModule],
  providers: [
    AddressBalanceService,
    ClaimContractService,
    ManaBalanceService,
    TotalSupplyService,
  ],
  controllers: [
    // Balance checks
    AddressBalanceController,
    KoinBalanceController,
    ManaBalanceController,
    TokenBalanceController,
    VhpBalanceController,

    // Claim info
    ClaimDataController,

    // Total supply checks
    KoinTotalSupplyController,
    TokenTotalSupplyController,
  ],
})
export class TokenizeModule {}
