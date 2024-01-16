import { registerAs } from '@nestjs/config';

export default registerAs('koiner', () => ({
  apiUrl: process.env.KOINER_API_URL,
  network: {
    apiUrl: process.env.KOINER_NETWORK_API_URL,
  },
}));
