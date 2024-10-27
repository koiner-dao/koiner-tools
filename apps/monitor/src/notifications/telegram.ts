import axios from 'axios';

export async function sendTelegramMessage(message) {
  const TELEGRAM_API_KEY = process.env.TELEGRAM_API_KEY;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_API_KEY || !TELEGRAM_CHAT_ID) {
    return;
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_API_KEY}/sendMessage`;
  await axios.post(url, {
    chat_id: TELEGRAM_CHAT_ID,
    text: message,
  });
}
