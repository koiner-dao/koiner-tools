import { Injectable } from '@nestjs/common';
import { Contract, Provider, Signer, utils } from 'koilib';
import { tokenAmount } from '../../utils';

@Injectable()
export class AddressBalanceService {
  constructor(
    private readonly provider: Provider,
    private readonly signer: Signer
  ) {}

  async getBalance(
    tokenId: string,
    address: string,
    decimals = 8
  ): Promise<number> {
    try {
      const contract = new Contract({
        id: tokenId,
        abi: utils.tokenAbi,
        provider: this.provider,
        signer: this.signer,
      });

      return this.makeContractCall(contract, address, decimals);
    } catch (error) {
      console.error(error);
      return -1;
    }
  }

  async getBalances(
    tokenId: string,
    addresses: string[],
    decimals = 8,
    useDecimals = true
  ): Promise<Record<string, number>> {
    try {
      const contract = new Contract({
        id: tokenId,
        abi: utils.tokenAbi,
        provider: this.provider,
        signer: this.signer,
      });

      const response: Record<string, number> = {};

      // Use Promise.all to wait for all async calls to complete
      await Promise.all(
        addresses
          .filter((address) => address !== '')
          .map(async (address) => {
            response[address] = await this.makeContractCall(
              contract,
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

  async getAddressBalances(
    address: string,
    tokenIds: string[],
    decimals = 8,
    useDecimals = true
  ): Promise<Record<string, number>> {
    try {
      const response: Record<string, number> = {};

      // Use Promise.all to wait for all async calls to complete
      await Promise.all(
        tokenIds
          .filter((tokenId) => tokenId !== '')
          .map(async (tokenId) => {
            const contract = new Contract({
              id: tokenId,
              abi: utils.tokenAbi,
              provider: this.provider,
              signer: this.signer,
            });

            response[tokenId] = await this.makeContractCall(
              contract,
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
    contract: Contract,
    address: string,
    decimals = 8,
    useDecimals = true
  ): Promise<number> {
    try {
      const result = await contract.functions.balanceOf({
        owner: address,
      });

      if (useDecimals && !decimals) {
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
