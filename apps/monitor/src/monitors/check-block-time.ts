import { notify } from '../notifications';
import { Provider } from 'koilib';

let failedCheckCount = 0; // Counter for backoff
let lastFailedCheck = null; // Timestamp of the last failed check

export async function checkBlockTime(): Promise<void> {
  const rpcNodes = process.env.JSONRPC_URL ?? 'http://jsonrpc:8080/';
  const provider = new Provider(rpcNodes);
  const headInfo = await provider.getHeadInfo();

  const nodeName = process.env.NODE_NAME ?? 'Koinos Node';
  const THRESHOLD_TIME = process.env.THRESHOLD_TIME
    ? Number(process.env.THRESHOLD_TIME)
    : 60000; // 1 minute in milliseconds

  const headBlockTime = Number(headInfo.head_block_time);
  const currentTime = Date.now();
  const timeDifference = currentTime - headBlockTime;
  const timeDifferenceFormatted = formatTimeDifference(timeDifference);

  // Check if the headBlockTime is older than the threshold
  if (timeDifference > THRESHOLD_TIME) {
    const alertInterval = calculateAlertInterval(failedCheckCount);

    if (failedCheckCount === 0 || lastFailedCheck === null) {
      // First failure
      const message = `⚠️ ${nodeName} in trouble! Last block produced ${timeDifferenceFormatted} ago.`;
      await notify(message);
      failedCheckCount = 1;
      lastFailedCheck = Date.now();
    } else if (Date.now() - lastFailedCheck >= alertInterval) {
      // If enough time has passed to send the next alert
      const message = `${
        failedCheckCount > 3 ? '🚨' : '⚠️'
      } ${nodeName} still in trouble. Last block produced ${timeDifferenceFormatted} ago.`;
      await notify(message);
      failedCheckCount++; // Increase count only after an alert is sent
      lastFailedCheck = Date.now(); // Update lastFailedCheck after alert is sent
    }
  } else if (failedCheckCount > 0) {
    // Node recovered
    const message = `🚀 ${nodeName} is back up again!`;
    await notify(message);
    failedCheckCount = 0;
    lastFailedCheck = null;
  }
}

// Helper function to calculate alert interval based on failed check count
function calculateAlertInterval(failedCheckCount: number) {
  if (failedCheckCount < 5) {
    return 2 * 60000; // Every 2 minutes for the first 10 minutes
  } else if (failedCheckCount < 10) {
    return 10 * 60000; // Every 10 minutes for the next 50 minutes
  } else {
    return 60 * 60000; // Every 1 hour after 1 hour
  }
}

// Helper function to format time differences
function formatTimeDifference(milliseconds: number) {
  const seconds = Math.floor(milliseconds / 1000);
  if (seconds < 60) {
    return `${seconds} seconds`;
  }
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minutes`;
  }
  const hours = Math.floor(minutes / 60);
  return `${hours} hours, ${minutes % 60} minutes`;
}
