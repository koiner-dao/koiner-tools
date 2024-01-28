import { Controller, Get, Param, Query } from '@nestjs/common';
import { AddressBalanceService } from '../service/address-balance.service';

@Controller('address')
export class AddressBalanceController {
  constructor(private readonly addressBalanceService: AddressBalanceService) {}

  @Get(':address/balances')
  async getAddressBalances(
    @Param('address') address: string,
    @Query('tokenIds') tokenIds: string[],
    @Query('useDecimals') useDecimals?: string
  ): Promise<Record<string, number>> {
    const boolUseDecimals = useDecimals !== 'false';

    return this.addressBalanceService.getAddressBalances(
      address,
      tokenIds,
      undefined,
      boolUseDecimals
    );
  }
}
