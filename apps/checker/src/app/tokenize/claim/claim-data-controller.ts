import { Controller, Get } from '@nestjs/common';
import { ClaimContractService, ClaimInfo } from '../service';

@Controller()
export class ClaimDataController {
  constructor(private readonly claimService: ClaimContractService) {}

  @Get('claim')
  async getClaimInfo(): Promise<ClaimInfo> {
    return this.claimService.getInfo();
  }
}
