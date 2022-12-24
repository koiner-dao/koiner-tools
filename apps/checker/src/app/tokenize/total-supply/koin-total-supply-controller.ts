import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TotalSupplyService } from '../service/total-supply.service';

@Controller()
export class KoinTotalSupplyController {
  constructor(
    private readonly configService: ConfigService,
    private readonly totalSupplyService: TotalSupplyService
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
}
