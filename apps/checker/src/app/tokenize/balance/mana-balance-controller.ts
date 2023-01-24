import { Controller, Get, HostParam, Param, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ManaBalanceService } from '../service/mana-balance.service';

@Controller('mana')
export class ManaBalanceController {
  constructor(
    private readonly configService: ConfigService,
    private readonly manaBalanceService: ManaBalanceService
  ) {}

  @Get('balance/:addressId')
  async getBalance(@Param('addressId') addressId: string): Promise<number> {
    return this.manaBalanceService.getBalance(addressId, 8);
  }

  @Get('balances')
  async getBalances(
    @Query('addressIds') addressIds: string[]
  ): Promise<{ addressId: string; balance: number }[]> {
    const balances = [];

    for (const addressId of addressIds ?? []) {
      const balance = await this.manaBalanceService.getBalance(addressId, 8);

      balances.push({
        addressId,
        balance,
      });
    }

    return balances;
  }
}
