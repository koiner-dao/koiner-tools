import { Controller, Get, Param, Query } from '@nestjs/common';
import { ManaBalanceService } from '../service/mana-balance.service';

@Controller('mana')
export class ManaBalanceController {
  constructor(private readonly manaBalanceService: ManaBalanceService) {}

  @Get('balance/:address')
  async getBalance(@Param('address') address: string): Promise<number> {
    return this.manaBalanceService.getBalance(address, 8);
  }

  @Get('balances')
  async getBalances(
    @Query('addresses') addresses: string[]
  ): Promise<Record<string, number>> {
    return this.manaBalanceService.getBalances(addresses, 8);
  }
}
