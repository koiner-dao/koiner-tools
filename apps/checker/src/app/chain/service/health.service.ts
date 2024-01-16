import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { HealthResponse } from './health-response';

@Injectable()
export class HealthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async getHealth(): Promise<HealthResponse> {
    const apiUrl = this.configService.get<string>('koiner.apiUrl');

    const postData = {
      query:
        'query getStatus {\n  blocks(first: 1) {\n    nodes {\n      header {\n        height\n        timestamp\n      }\n    }\n  }\n  blockRewards(first: 1) {\n    nodes {\n      height\n      timestamp\n    }\n  }\n}',
      variables: null,
      operationName: 'getStatus',
      extensions: { headers: null },
    };

    const { data } = await firstValueFrom(
      this.httpService.post(`${apiUrl}/graphql`, postData).pipe(
        catchError((error) => {
          console.error(error.response.data);
          throw 'Could not call Koiner API';
        })
      )
    );

    let latestBlock: any;
    let blockTimestamp: number | null;
    let latestReward: any;
    let rewardTimestamp: number | null;

    if (data?.data?.blocks?.nodes?.length > 0) {
      latestBlock = data?.data?.blocks?.nodes[0];
    }

    if (latestBlock) {
      blockTimestamp = latestBlock.header.timestamp;
    }

    if (data?.data?.blockRewards?.nodes?.length > 0) {
      latestReward = data?.data?.blockRewards?.nodes[0];
    }

    if (latestReward) {
      rewardTimestamp = latestReward.timestamp;
    }

    return {
      chainSync: {
        healthy: blockTimestamp && blockTimestamp < Date.now() - 60000,
        timestamp: blockTimestamp,
        latestBlock: latestBlock ? latestBlock.header.height : null,
        latestDate: blockTimestamp
          ? new Date(blockTimestamp).toISOString()
          : null,
      },
      networkSync: {
        healthy: rewardTimestamp && rewardTimestamp < Date.now() - 60000,
        timestamp: rewardTimestamp,
        latestBlock: latestBlock ? latestReward.height : null,
        latestDate: rewardTimestamp
          ? new Date(rewardTimestamp).toISOString()
          : null,
      },
    };
  }
}
