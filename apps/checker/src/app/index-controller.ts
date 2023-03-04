import { Controller, Get } from '@nestjs/common';

@Controller()
export class IndexController {
  @Get('/')
  async getRoutes(): Promise<Record<string, any>> {
    return {
      chain: {
        id: '/chain/id',
        height: '/chain/height',
      },
      network: {
        blockProduction: {
          stats: '/network/block-production/stats',
        },
      },
      tokenize: {
        balance: {
          koin: '/koin/balance/:addressId',
          mana: '/mana/balance/:addressId',
          manaBalances: '/mana/balances',
          vhp: '/vhp/balance/:addressId',
          token: '/token/:id/balance/:addressId',
        },
        'total-supply': {
          koinOverview: '/koin/supplies',
          koin: '/koin/total-supply',
          koinInflation: '/koin/inflation',
          vhp: '/vhp/total-supply',
          virtualSupply: '/koin/virtual-supply',
          token: '/token/:id/total-supply',
        },
      },
    };
  }
}
