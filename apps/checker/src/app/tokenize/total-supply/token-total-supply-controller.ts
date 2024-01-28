import { Controller, Get, Param, Query } from '@nestjs/common';
import { TotalSupplyService } from '../service/total-supply.service';

@Controller('token')
export class TokenTotalSupplyController {
  constructor(private readonly totalSupplyService: TotalSupplyService) {}

  @Get(':id/total-supply')
  async getTokenSupply(@Param('id') id: string): Promise<number> {
    return this.totalSupplyService.getTokenSupply(id);
  }

  @Get('total-supplies')
  async getBalances(
    @Query('ids') ids: string[]
  ): Promise<Record<string, number>> {
    return this.totalSupplyService.getTokenSupplies(ids);
  }
}
