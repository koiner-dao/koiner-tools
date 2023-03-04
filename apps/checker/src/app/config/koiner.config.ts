import { registerAs } from '@nestjs/config';

export default registerAs('koiner', () => ({
  network: {
    apiUrl: process.env.KOINER_NETWORK_API_URL,
  },
}));
