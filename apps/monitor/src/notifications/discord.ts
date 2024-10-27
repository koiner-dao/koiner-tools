import axios from 'axios';

export async function sendDiscordMessage(message) {
  const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

  if (!DISCORD_WEBHOOK_URL) {
    return;
  }

  await axios.post(DISCORD_WEBHOOK_URL, {
    content: message,
  });
}
