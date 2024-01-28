import { Controller, Get, Param, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ManaBalanceService } from '../service/mana-balance.service';

@Controller('mana')
export class ManaBalanceController {
  constructor(
    private readonly configService: ConfigService,
    private readonly manaBalanceService: ManaBalanceService
  ) {}

  @Get('balance/:address')
  async getBalance(@Param('address') address: string): Promise<number> {
    return this.manaBalanceService.getBalance(address, 8);
  }

  @Get('balances')
  async getBalances(
    @Query('addresss') addresss: string[]
  ): Promise<{ address: string; balance: number }[]> {
    const balances = [];

    for (const address of addresss ?? []) {
      const balance = await this.manaBalanceService.getBalance(address, 8);

      balances.push({
        address,
        balance,
      });
    }

    return balances;
  }
}
