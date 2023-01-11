import { Controller, Get } from '@nestjs/common';

@Controller()
export class IndexController {
  @Get('/')
  async getRoutes(): Promise<Record<string, any>> {
    return {
      tokenize: {
        balance: {
          koin: '/koin/balance/:addressId',
          mana: '/mana/balance/:addressId',
          vhp: '/vhp/balance/:addressId',
          token: '/token/:id/balance/:addressId',
        },
        'total-supply': {
          koin: '/koin/total-supply',
          vhp: '/vhp/total-supply',
          virtualSupply: '/koin/virtual-supply',
          token: '/token/:id/total-supply',
        },
      },
    };
  }
}
