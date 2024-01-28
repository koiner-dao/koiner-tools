import {Controller, Get, Param, Query} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AddressBalanceService } from '../service/address-balance.service';

@Controller('vhp')
export class VhpBalanceController {
  constructor(
    private readonly configService: ConfigService,
    private readonly addressBalanceService: AddressBalanceService
  ) {}

  @Get('balance/:address')
  async getBalance(@Param('address') address: string): Promise<number> {
    return this.addressBalanceService.getBalance(
      this.configService.get<string>('koinos.contracts.vhp'),
      address,
      8
    );
  }

  @Get('balances')
  async getBalances(
    @Query('addresses') addresses: string[]
  ): Promise<Record<string, number>> {
    return this.addressBalanceService.getBalances(
      this.configService.get<string>('koinos.contracts.vhp'),
      addresses,
      8
    );
  }
}
