import { Injectable } from '@nestjs/common';
import { Provider } from 'koilib';
import { round } from 'mathjs';

@Injectable()
export class ManaBalanceService {
  constructor(
    private readonly provider: Provider,
  ) {}

  async getBalance(
    addressId: string,
    decimals = 8
  ): Promise<number> {
    try {
      const tokenAmount = (units: number, decimals: number): number => {
        return round(units / Math.pow(10, decimals), decimals);
      };

      const rc = await this.provider.getAccountRc(addressId);

      if (!rc) {
        return -1;
      } else {
        return tokenAmount(parseInt(rc), decimals);
      }
    } catch (error) {
      console.error(error);
      return -1;
    }
  }
}
