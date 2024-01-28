import { Controller, Get, Param } from '@nestjs/common';
import { AddressBalanceService } from '../service/address-balance.service';

@Controller('token')
export class TokenBalanceController {
  constructor(private readonly addressBalanceService: AddressBalanceService) {}

  @Get(':id/balance/:address')
  async getBalance(
    @Param('id') id: string,
    @Param('address') address: string
  ): Promise<number> {
    return this.addressBalanceService.getBalance(id, address);
  }
}
