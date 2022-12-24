import { Injectable } from '@nestjs/common';
import { Contract, Provider, Signer, utils } from 'koilib';
import { round } from 'mathjs';

@Injectable()
export class AddressBalanceService {
  constructor(
    private readonly provider: Provider,
    private readonly signer: Signer
  ) {}

  async getBalance(
    tokenContractId: string,
    addressId: string,
    decimals = 8
  ): Promise<number> {
    try {
      const tokenAmount = (units: number, decimals: number): number => {
        return round(units / Math.pow(10, decimals), decimals);
      };

      const contract = new Contract({
        id: tokenContractId,
        abi: utils.tokenAbi,
        provider: this.provider,
        signer: this.signer,
      });

      const result = await contract.functions.balanceOf({
        owner: addressId,
      });

      if (!decimals) {
        const decimalsResult = await contract.functions.decimals();

        if (!decimalsResult || !decimalsResult.result.value) {
          return -1;
        }

        decimals = <number>decimalsResult.result.value;
      }

      if (!result || !result.result.value) {
        return -1;
      } else {
        return tokenAmount(<number>result.result.value, decimals);
      }
    } catch (error) {
      console.error(error);
      return -1;
    }
  }
}
