import { Controller, Get, Param, Query } from '@nestjs/common';
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

  @Get(':id/balances')
  async getBalances(
    @Param('id') id: string,
    @Query('addresses') addresses: string[],
    @Query('useDecimals') useDecimals?: string
  ): Promise<Record<string, number>> {
    const boolUseDecimals = useDecimals !== 'false';

    return this.addressBalanceService.getBalances(
      id,
      addresses,
      undefined,
      boolUseDecimals
    );
  }
}
