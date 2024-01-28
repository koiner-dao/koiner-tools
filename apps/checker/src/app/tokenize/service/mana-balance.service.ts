import { Injectable } from '@nestjs/common';
import { Provider } from 'koilib';
import { tokenAmount } from '../../utils';

@Injectable()
export class ManaBalanceService {
  constructor(private readonly provider: Provider) {}

  async getBalance(address: string, decimals = 8): Promise<number> {
    try {
      return this.makeContractCall(address, decimals);
    } catch (error) {
      console.error(error);
      return -1;
    }
  }

  async getBalances(
    addresses: string[],
    decimals = 8,
    useDecimals = true
  ): Promise<Record<string, number>> {
    try {
      const response: Record<string, number> = {};

      // Use Promise.all to wait for all async calls to complete
      await Promise.all(
        addresses
          .filter((address) => address !== '')
          .map(async (address) => {
            response[address] = await this.makeContractCall(
              address,
              decimals,
              useDecimals
            );
          })
      );

      // Sort results
      return Object.fromEntries(
        Object.entries(response).sort(([keyA], [keyB]) =>
          keyA.localeCompare(keyB)
        )
      );
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  private async makeContractCall(
    address: string,
    decimals = 8,
    useDecimals = true
  ): Promise<number> {
    try {
      const rc = await this.provider.getAccountRc(address);

      if (!rc) {
        return -1;
      } else {
        return useDecimals ? tokenAmount(parseInt(rc), decimals) : parseInt(rc);
      }
    } catch (error) {
      return -1;
    }
  }
}
