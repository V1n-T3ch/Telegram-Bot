# Telegram Bot Forwarding Messages with Delay

This bot forwards the latest message from a private chat to multiple Telegram groups with a delay. It uses the Telegram Bot API and runs on Node.js.

## Prerequisites

- Node.js installed on your system
- A Telegram Bot token (create one using [BotFather](https://core.telegram.org/bots/tutorial#botfather))
- Group IDs for the groups where messages will be forwarded

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/V1n-T3ch/Telegram-Bot.git
   cd Telegram-Bot
   ```

2. Install the required dependencies:
   ```bash
   npm install axios node-fetch dotenv
   ```

3. Create a `.env` file in the project root and add the bot token and group IDs in the following format:
   ```env
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   FORWARD_CHAT_IDS=groupId_1,groupId_2,groupId_3,groupId_4,groupId_5
   ```
   - Replace `your_bot_token_here` with your Telegram bot token. A token looks like this: `123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefgHIJKLMNOPQ`.
   - Replace `groupId_1, groupId_2, ...` with the IDs of the Telegram groups. A groupId looks like this: `-123456789`. be sure to add the `-` at the start of the groupId

## Usage

1. Start the bot:
   ```bash
   node <script-name>.js
   ```
   Replace `<script-name>` with the name of your bot script file (e.g., `Telegram Bot.mjs`).

2. The bot will poll for updates every 10 seconds and forward the latest message from the private chat to the specified groups with a delay of 5 seconds.

## Features

- Polls Telegram for new updates every 10 seconds.
- Filters messages from private chats.
- Forwards the latest message to multiple groups.
- Adds a 5-second delay before forwarding the message.

## Customization

- **Polling Interval**: Adjust the `pollingInterval` value in milliseconds to change how frequently the bot checks for updates. Default is `10000` (10 seconds).
- **Forward Delay**: Adjust the `forwardDelay` value in milliseconds to change the delay before forwarding messages. Default is `5000` (5 seconds).

## Dependencies

- `axios`: For making HTTP POST requests.
- `node-fetch`: For making HTTP GET requests.
- `dotenv`: For managing environment variables.

## Notes

- Ensure your bot has the necessary permissions to post messages in the target groups.
- If running on a server, use a process manager like `pm2` to keep the bot running.

## License

This project is licensed under the MIT License.
