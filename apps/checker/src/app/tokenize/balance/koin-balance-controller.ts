import { Controller, Get, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AddressBalanceService } from '../service/address-balance.service';

@Controller('koin')
export class KoinBalanceController {
  constructor(
    private readonly configService: ConfigService,
    private readonly addressBalanceService: AddressBalanceService
  ) {}

  @Get('balance/:addressId')
  async getBalance(@Param('addressId') addressId: string): Promise<number> {
    return this.addressBalanceService.getBalance(
      this.configService.get<string>('koinos.contracts.koin'),
      addressId,
      8
    );
  }
}
