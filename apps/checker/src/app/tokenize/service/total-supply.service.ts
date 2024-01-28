import { Injectable } from '@nestjs/common';
import { Contract, Provider, Signer, utils } from 'koilib';
import { tokenAmount } from '../../utils';

@Injectable()
export class TotalSupplyService {
  constructor(
    private readonly provider: Provider,
    private readonly signer: Signer
  ) {}

  async getTokenSupply(
    id: string,
    decimals = 8,
    useDecimals = true
  ): Promise<number> {
    return this.makeContractCall(id, decimals, useDecimals);
  }

  async getTokenSupplies(
    ids: string[],
    useDecimals = true
  ): Promise<Record<string, number>> {
    try {
      const response: Record<string, number> = {};

      // Use Promise.all to wait for all async calls to complete
      await Promise.all(
        ids
          .filter((id) => id !== '')
          .map(async (id) => {
            response[id] = await this.makeContractCall(
              id,
              undefined,
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
      return {};
    }
  }

  private async makeContractCall(
    id: string,
    decimals = 8,
    useDecimals = true
  ): Promise<number> {
    try {
      const contract = new Contract({
        id,
        abi: utils.tokenAbi,
        provider: this.provider,
        signer: this.signer,
      });

      const result = await contract.functions.totalSupply();

      if (useDecimals && !decimals && decimals !== 0) {
        const decimalsResult = await contract.functions.decimals();

        if (!decimalsResult || !decimalsResult.result.value) {
          return -1;
        }

        decimals = <number>decimalsResult.result.value;
      }

      if (!result || !result.result?.value) {
        return -1;
      } else {
        return useDecimals
          ? tokenAmount(<number>result.result.value, decimals)
          : Number(result.result.value);
      }
    } catch (error) {
      return -1;
    }
  }
}
