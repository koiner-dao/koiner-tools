import { add, divide, multiply, round, subtract } from 'mathjs';
import { Controller, Get } from '@nestjs/common';
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
  async getKoinSupply(): Promise<number> {
    return this.totalSupplyService.getTokenSupply(
      this.configService.get<string>('koinos.contracts.koin'),
      8
    );
  }

  @Get('vhp/total-supply')
  async getVhpSupply(): Promise<number> {
    return this.totalSupplyService.getTokenSupply(
      this.configService.get<string>('koinos.contracts.vhp'),
      8
    );
  }

  @Get('koin/virtual-supply')
  async getVirtualSupply(): Promise<number> {
    return (await this.getKoinSupply()) + (await this.getVhpSupply());
  }

  @Get('koin/inflation')
  async getInflation(useDecimals = true): Promise<number> {
    const blockProductionStats =
      await this.blockProductionStatsService.getStats(useDecimals);

    return blockProductionStats ? blockProductionStats.rewarded : 0;
  }

  @Get('koin/supplies')
  async getSuppliesByDecimal(): Promise<SuppliesResponse> {
    const snapshot = tokenAmount(9973874402587864, 8);
    const koin = await this.getKoinSupply();
    const vhp = await this.getVhpSupply();
    const virtual = add(koin, vhp);
    const inflation = await this.getInflation();
    const fdv = add(snapshot, inflation);
    const burned = virtual && vhp ? multiply(divide(vhp, virtual), 100) : 0;
    const claimed = subtract(virtual, inflation);
    const claimedPercentage = divide(claimed, snapshot) * 100;

    return {
      koin,
      vhp,
      virtual,
      inflation,
      fdv,
      burnedPercentage: round(burned, 2),
      claimed,
      claimedPercentage: round(claimedPercentage, 2),
      snapshot,
    };
  }

  @Get('koin/supplies-raw')
  async getSuppliesRaw(): Promise<SuppliesResponse> {
    const snapshot = 9973874402587864;
    const koin = await this.totalSupplyService.getTokenSupply(
      this.configService.get<string>('koinos.contracts.koin'),
      0
    );
    const vhp = await this.totalSupplyService.getTokenSupply(
      this.configService.get<string>('koinos.contracts.vhp'),
      0
    );
    const virtual = add(koin, vhp);
    const inflation = await this.getInflation(false);
    const fdv = add(snapshot, inflation);
    const burned = virtual && vhp ? multiply(divide(vhp, virtual), 100) : 0;
    const claimed = subtract(virtual, inflation);
    const claimedPercentage = divide(claimed, snapshot) * 100;

    return {
      koin,
      vhp,
      virtual,
      inflation,
      fdv,
      burnedPercentage: round(burned, 2),
      claimed,
      claimedPercentage: round(claimedPercentage, 2),
      snapshot,
    };
  }
}
