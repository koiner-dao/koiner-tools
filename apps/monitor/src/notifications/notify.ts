import { sendTelegramMessage } from './telegram';
import { sendDiscordMessage } from './discord';

export async function notify(message) {
  await sendTelegramMessage(message);
  await sendDiscordMessage(message);
}
