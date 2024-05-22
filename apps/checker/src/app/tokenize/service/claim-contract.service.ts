import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Contract, Provider, Signer } from 'koilib';
import { ConfigService } from '@nestjs/config';
import * as claimAbi from './claim-abi.json';
import { Abi } from 'koilib/lib/interface';

export interface ClaimInfo {
  totalEthAccounts: number;
  ethAccountsClaimed: number;
  totalKoin: string;
  koinClaimed: string;
}

@Injectable()
export class ClaimContractService {
  constructor(
    private readonly configService: ConfigService,
    private readonly provider: Provider,
    private readonly signer: Signer
  ) {}

  async getInfo(): Promise<ClaimInfo> {
    try {
      const contract = new Contract({
        id: this.configService.get<string>('koinos.contracts.claim'),
        abi: claimAbi as unknown as Abi,
        provider: this.provider,
        signer: this.signer,
      });

      const result = await contract.functions.get_info();

      if (result && result.result?.value) {
        const data: any = result.result?.value;

        return {
          totalEthAccounts: data.total_eth_accounts,
          ethAccountsClaimed: data.eth_accounts_claimed,
          totalKoin: data.total_koin,
          koinClaimed: data.koin_claimed,
        };
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Could not fetch claim data');
    }

    throw new InternalServerErrorException('Could not fetch claim data');
  }
}
