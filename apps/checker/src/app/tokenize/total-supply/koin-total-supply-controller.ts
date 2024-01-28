import { add, divide, multiply, round, subtract } from 'mathjs';
import { Controller, Get, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TotalSupplyService } from '../service/total-supply.service';
import { tokenAmount } from '../../utils';
import { BlockProductionStatsService } from '../../network/service';

interface SuppliesResponse {
  koin: number;
  vhp: number;
  virtual: number;
  inflation: number;
  fdv: number;
  burnedPercentage: number;
  claimed: number;
  claimedPercentage: number;
  snapshot: number;
}

@Controller()
export class KoinTotalSupplyController {
  constructor(
    private readonly configService: ConfigService,
    private readonly totalSupplyService: TotalSupplyService,
    private readonly blockProductionStatsService: BlockProductionStatsService
  ) {}

  @Get('koin/total-supply')
  async getKoinSupply(useDecimals = true): Promise<number> {
    return this.totalSupplyService.getTokenSupply(
      this.configService.get<string>('koinos.contracts.koin'),
      8,
      useDecimals
    );
  }

  @Get('vhp/total-supply')
  async getVhpSupply(useDecimals = true): Promise<number> {
    return this.totalSupplyService.getTokenSupply(
      this.configService.get<string>('koinos.contracts.vhp'),
      8,
      useDecimals
    );
  }

  @Get('koin/virtual-supply')
  async getVirtualSupply(useDecimals = true): Promise<number> {
    return (
      (await this.getKoinSupply(useDecimals)) +
      (await this.getVhpSupply(useDecimals))
    );
  }

  @Get('koin/inflation')
  async getInflation(useDecimals = true): Promise<number> {
    const blockProductionStats =
      await this.blockProductionStatsService.getStats(useDecimals);

    return blockProductionStats ? blockProductionStats.rewarded : 0;
  }

  @Get('koin/supplies')
  async getSuppliesByDecimal(
    @Query('useDecimals') useDecimals?: string
  ): Promise<SuppliesResponse> {
    const boolUseDecimals = useDecimals !== 'false';

    const snapshot = boolUseDecimals
      ? tokenAmount(9973874402587864, 8)
      : 9973874402587864;
    const koin = await this.getKoinSupply(boolUseDecimals);
    const vhp = await this.getVhpSupply(boolUseDecimals);
    const virtual = add(koin, vhp);
    const inflation = await this.getInflation(boolUseDecimals);
    const fdv = add(snapshot, inflation);
    const burned = virtual && vhp ? multiply(divide(vhp, virtual), 100) : 0;
    const claimed = subtract(virtual, inflation);
    const claimedPercentage = divide(claimed, snapshot) * 100;

    return {
      koin,
      vhp,
      virtual,
      inflation,
      fdv: useDecimals ? fdv : round(fdv, 0),
      burnedPercentage: round(burned, 2),
      claimed,
      claimedPercentage: round(claimedPercentage, 2),
      snapshot,
    };
  }
}
