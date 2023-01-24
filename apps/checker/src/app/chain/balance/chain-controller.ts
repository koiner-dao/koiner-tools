import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChainService } from '../service/chain.service';

@Controller('chain')
export class ChainController {
  constructor(
    private readonly configService: ConfigService,
    private readonly chainService: ChainService
  ) {}

  @Get('/id')
  async getBalance(): Promise<string> {
    return this.chainService.getChainId();
  }

  @Get('/height')
  async getHeight(): Promise<string> {
    return this.chainService.getChainHeight();
  }
}
