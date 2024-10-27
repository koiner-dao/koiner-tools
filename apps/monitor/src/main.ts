import cron from 'node-cron';
import dotenv from 'dotenv';
import { checkBlockTime } from './monitors';

dotenv.config();

// Constants
const CHECK_INTERVAL = process.env.CRON_INTERVAL ?? '*/15 * * * * *'; // Every 15 seconds

// Cron job to check the head block time
cron.schedule(CHECK_INTERVAL, async () => {
  try {
    await checkBlockTime();
  } catch (error) {
    console.error('Error checking headBlockTime:', error);
  }
});

console.log('🚀 Koinos Node Monitor is running');
