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
          koin: '/koin/balance/:address',
          mana: '/mana/balance/:address',
          vhp: '/vhp/balance/:address',
          token: '/token/:id/balance/:address',
        },
        balances: {
          address: '/address/:address/balances?tokenIds[]=',
          koin: '/koin/balances?addresses[]=',
          mana: '/mana/balances?addresses[]=',
          vhp: '/vhp/balances?addresses[]=',
          token: '/token/:id/balances?addresses[]=',
        },
        claim: '/claim',
        'total-supply': {
          koinOverview: '/koin/supplies',
          koin: '/koin/total-supply',
          koinInflation: '/koin/inflation',
          vhp: '/vhp/total-supply',
          virtualSupply: '/koin/virtual-supply',
          token: '/token/:id/total-supply',
        },
        'total-supplies': '/token/total-supplies',
      },
    };
  }
}
