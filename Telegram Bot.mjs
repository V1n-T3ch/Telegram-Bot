import fetch from 'node-fetch';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const pollingInterval = 10000; // 10 seconds before checking for message updates
const forwardDelay = 5000; // 5 seconds delay before forwarding messages

const forwardChatIds = process.env.FORWARD_CHAT_IDS.split(',');

let lastMessageId = null;

const getUpdates = async () => {
  const url = `https://api.telegram.org/bot${token}/getUpdates`;

  try {
    console.log("Fetching Message Updates...");
    const response = await fetch(url);
    console.log("Fetched Message Updates...");
    const data = await response.json();

    if (data.ok && data.result) {
      const latestMessage = data.result
        .filter((update) => update.message && update.message.chat && update.message.chat.type === 'private')
        .map((update) => update.message)
        .sort((a, b) => b.date - a.date)[0];

      if (latestMessage && latestMessage.message_id !== lastMessageId) {
        lastMessageId = latestMessage.message_id;

        setTimeout(() => {
          forwardMessage(latestMessage.chat.id, latestMessage.message_id);
        }, forwardDelay);
      }
    }
  } catch (error) {
    console.error('Error fetching updates:', error);
  }
};

const forwardMessage = async (fromChatId, messageId) => {
  const url = `https://api.telegram.org/bot${token}/forwardMessage`;

  try {
    for (const chatId of forwardChatIds) {
      const response = await axios.post(url, {
        chat_id: chatId,
        from_chat_id: fromChatId,
        message_id: messageId,
      });
      console.log('Message forwarded to group:', chatId, response.data);
    }
  } catch (error) {
    console.error('Error forwarding message:', error);
  }
};

const startPolling = () => {
  setInterval(getUpdates, pollingInterval);
};

startPolling();
