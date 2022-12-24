import { Controller, Get, Param } from '@nestjs/common';
import { AddressBalanceService } from '../service/address-balance.service';

@Controller('token')
export class TokenBalanceController {
  constructor(private readonly addressBalanceService: AddressBalanceService) {}

  @Get(':id/balance/:addressId')
  async getBalance(
    @Param('id') id: string,
    @Param('addressId') addressId: string
  ): Promise<number> {
    return this.addressBalanceService.getBalance(id, addressId);
  }
}
