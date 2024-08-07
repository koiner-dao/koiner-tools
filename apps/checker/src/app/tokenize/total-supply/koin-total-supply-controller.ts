import { add, divide, multiply, round, subtract } from 'mathjs';
import { Controller, Get, Query, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TotalSupplyService } from '../service/total-supply.service';
import { tokenAmount } from '../../utils';
import { BlockProductionStatsService } from '../../network/service';
import { ClaimContractService } from '../service';

interface SuppliesResponse {
  koin: number;
  vhp: number;
  virtual: number;
  inflation: number;
  fdv: number;
  burnedPercentage: number;
  claimed: number;
  outstanding: number;
  claimedPercentage: number;
  snapshot: number;
}

@Controller()
export class KoinTotalSupplyController {
  constructor(
    private readonly configService: ConfigService,
    private readonly claimService: ClaimContractService,
    private readonly totalSupplyService: TotalSupplyService,
    private readonly blockProductionStatsService: BlockProductionStatsService
  ) {}

  private async getKoinSupply(useDecimals = true): Promise<number> {
    return this.totalSupplyService.getTokenSupply(
      this.configService.get<string>('koinos.contracts.koin'),
      8,
      useDecimals
    );
  }

  @Get('koin/total-supply')
  async getCirculatingSupply(
    @Req() req: Request,
    @Query('useDecimals') useDecimals?: string
  ): Promise<number | { supply: number }> {
    const boolUseDecimals = useDecimals !== 'false';

    const claimInfo = await this.claimService.getInfo();

    const snapshot = boolUseDecimals
      ? tokenAmount(Number(claimInfo.totalKoin), 8)
      : Number(claimInfo.totalKoin);
    const claimed = boolUseDecimals
      ? tokenAmount(Number(claimInfo.koinClaimed), 8)
      : Number(claimInfo.koinClaimed);
    const outstanding = subtract(snapshot, claimed);

    let koinSupply = await this.totalSupplyService.getTokenSupply(
      this.configService.get<string>('koinos.contracts.koin'),
      8,
      boolUseDecimals
    );

    koinSupply = add(koinSupply, outstanding);

    const acceptHeader = req.headers['accept'];

    if (acceptHeader && acceptHeader.includes('application/json')) {
      return { supply: koinSupply };
    } else {
      return koinSupply;
    }
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
    const claimInfo = await this.claimService.getInfo();

    const snapshot = useDecimals
      ? tokenAmount(Number(claimInfo.totalKoin), 8)
      : Number(claimInfo.totalKoin);
    const koin = await this.getKoinSupply(useDecimals);
    const claimed = useDecimals
      ? tokenAmount(Number(claimInfo.koinClaimed), 8)
      : Number(claimInfo.koinClaimed);
    const outstanding = subtract(snapshot, claimed);
    const vhp = await this.getVhpSupply(useDecimals);
    const circulating = add(koin, outstanding);
    const virtual = add(circulating, vhp);

    return virtual;
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
    const claimInfo = await this.claimService.getInfo();

    const snapshot = boolUseDecimals
      ? tokenAmount(Number(claimInfo.totalKoin), 8)
      : Number(claimInfo.totalKoin);
    const koin = await this.getKoinSupply(boolUseDecimals);
    const claimed = boolUseDecimals
      ? tokenAmount(Number(claimInfo.koinClaimed), 8)
      : Number(claimInfo.koinClaimed);
    const outstanding = subtract(snapshot, claimed);
    const vhp = await this.getVhpSupply(boolUseDecimals);
    const circulating = add(koin, outstanding);
    const virtual = add(circulating, vhp);
    const fdv = virtual;
    const inflation = subtract(fdv, snapshot);
    const burned = virtual && vhp ? multiply(divide(vhp, virtual), 100) : 0;
    const claimedPercentage = divide(claimed, snapshot) * 100;

    return {
      koin: circulating,
      vhp,
      virtual,
      inflation,
      fdv: useDecimals ? fdv : round(fdv, 0),
      burnedPercentage: round(burned, 2),
      claimed,
      outstanding,
      claimedPercentage: round(claimedPercentage, 2),
      snapshot,
    };
  }
}
