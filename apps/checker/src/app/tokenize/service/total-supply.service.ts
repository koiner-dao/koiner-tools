import { Injectable } from '@nestjs/common';
import { Contract, Provider, Signer, utils } from 'koilib';
import { tokenAmount } from '../../utils';

@Injectable()
export class TotalSupplyService {
  constructor(
    private readonly provider: Provider,
    private readonly signer: Signer
  ) {}

  async getTokenSupply(id: string, decimals = 8): Promise<number> {
    try {
      const contract = new Contract({
        id,
        abi: utils.tokenAbi,
        provider: this.provider,
        signer: this.signer,
      });

      const result = await contract.functions.totalSupply();

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
