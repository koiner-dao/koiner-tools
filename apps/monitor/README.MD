# Koiner Monitor
The Koinos Node Monitor alerts you via Telegram and Discord whenever your node experiences downtime.

## Environment Variables
Add these variables to the .env file in your project directory to configure the Koinos Node Monitor:
```
MONITOR_TAG=v0.1.0
TELEGRAM_API_KEY=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_channel_id
DISCORD_WEBHOOK_URL=your_discord_webhook_url
NODE_NAME=My Koinos Node
```
Optionally you can override the following variables in your .env file:
```
CRON_INTERVAL='*/15 * * * * *'
THRESHOLD_TIME=60000
```
Make sure to include `monitor` and `jsonrpc` in `COMPOSE_PROFILES` when you are using `COMPOSE_PROFILES`.

```
COMPOSE_PROFILES=jsonrpc,block_producer,monitor
```
### Explanation of Environment Variables
- **MONITOR_TAG**: version of the docker image to use.
- **TELEGRAM_API_KEY:** Your Telegram bot token, obtained from BotFather.
- **TELEGRAM_CHAT_ID:** The ID or username of your Telegram channel.
- **DISCORD_WEBHOOK_URL:** The webhook URL for the Discord channel where you want notifications to appear.
- **JSONRPC_URL:** The URL of the Koinos RPC node you’re monitoring.
- **CRON_INTERVAL:** Cron interval for node check frequency, defaulting to 15 seconds.
- **THRESHOLD_TIME:** The time threshold (in milliseconds) beyond which the node is considered down. Default is 60,000 ms (1 minute).
- **NODE_NAME:** The name of the node, which will appear in alert messages.

## Adding the Monitor to Docker Compose
To integrate the Koinos Node Monitor into a Docker Compose setup, add the following example to your `docker-compose.yml` configuration:

```yaml
version: '3'
services:
  koinos-node-monitor:
    image: frenkzcom/koinos-monitor:${MONITOR_TAG:-latest}
    restart: always
    profiles: ["monitor", "all"]
    environment:
       - JSONRPC_URL=http://jsonrpc:8080/
```
