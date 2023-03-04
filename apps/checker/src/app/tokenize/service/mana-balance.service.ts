import { Injectable } from '@nestjs/common';
import { Provider } from 'koilib';
import { tokenAmount } from '../../utils';

@Injectable()
export class ManaBalanceService {
  constructor(private readonly provider: Provider) {}

  async getBalance(addressId: string, decimals = 8): Promise<number> {
    try {
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
