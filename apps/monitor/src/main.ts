import cron from 'node-cron';
import dotenv from 'dotenv';
import { checkBlockTime } from './monitors';
import { notify } from './notifications';

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

const nodeName = process.env.NODE_NAME ?? 'Koinos Node';
const message = `🚀 ${nodeName} Monitor is running`;

notify(message).then();

console.log(message);
