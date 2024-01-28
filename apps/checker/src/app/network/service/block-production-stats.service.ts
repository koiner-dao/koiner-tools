import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { BlockProductionStats } from './block-production-stats';
import { tokenAmount } from '../../utils';

@Injectable()
export class BlockProductionStatsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async getStats(useDecimals = true): Promise<BlockProductionStats> {
    const apiUrl = this.configService.get<string>('koiner.network.apiUrl');

    const { data: blockProductionStats } = await firstValueFrom(
      this.httpService.get(`${apiUrl}/block-production/stats`).pipe(
        catchError((error) => {
          console.error(error.response.data);
          throw 'Could not call Koiner Network API';
        })
      )
    );

    return {
      rewarded: useDecimals
        ? tokenAmount(blockProductionStats.rewarded, 8)
        : blockProductionStats.rewarded,
      producerCount: blockProductionStats.producerCount,
      blocksProduced: blockProductionStats.blocksProduced,
      mintedTotal: useDecimals
        ? tokenAmount(blockProductionStats.mintedTotal, 8)
        : blockProductionStats.mintedTotal,
      burnedTotal: useDecimals
        ? tokenAmount(blockProductionStats.burnedTotal, 8)
        : blockProductionStats.burnedTotal,
    };
  }
}
