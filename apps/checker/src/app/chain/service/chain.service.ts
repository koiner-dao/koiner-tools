import { Injectable } from '@nestjs/common';
import { Provider } from 'koilib';

@Injectable()
export class ChainService {
  constructor(private readonly provider: Provider) {}

  async getChainId(): Promise<string> {
    try {
      return this.provider.getChainId();
    } catch (error) {
      console.error(error);
      return 'error';
    }
  }

  async getChainHeight(): Promise<string> {
    try {
      const headInfo = await this.provider.getHeadInfo();
      return headInfo.head_topology.height;
    } catch (error) {
      console.error(error);
      return 'error';
    }
  }
}
