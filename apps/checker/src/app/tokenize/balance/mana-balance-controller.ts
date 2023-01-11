import { Controller, Get, Param } from '@nestjs/common';
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
    return this.manaBalanceService.getBalance(
      addressId,
      8
    );
  }
}
