export interface HealthResponse {
  chainSync: {
    healthy: boolean;
    timestamp?: number;
    latestBlock?: number;
    latestDate?: string;
  };
  networkSync: {
    healthy: boolean;
    timestamp?: number;
    latestBlock?: number;
    latestDate?: string;
  };
}
