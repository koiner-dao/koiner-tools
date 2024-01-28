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
          koin: '/koin/balances?addresses[]=',
          mana: '/mana/balances?addresses[]=',
          vhp: '/vhp/balances?addresses[]=',
          token: '/token/:id/balances?addresses[]=',
          raw: {
            koin: '/koin/balances-raw?addresses[]=',
            mana: '/mana/balances-raw?addresses[]=',
            vhp: '/vhp/balances-raw?addresses[]=',
            token: '/token-raw/:id/balances?addresses[]=',
          }
        },
        'total-supply': {
          koinOverview: '/koin/supplies',
          koinOverviewRaw: '/koin/supplies-raw',
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
