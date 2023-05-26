import { welcomeMessage } from "./bussines.service.js"
import pkg from 'node-telegram-bot-api';

const TelegramApi  = pkg;

const token = "6271955978:AAEaBvVWWB806juiZ0NQzw4tntSEU4YpSu4";

const bot = new TelegramApi(token, { polling: true });

export const start = () => {

  bot.setMyCommands([
    { command: "/start", description: "Welcome message" },
    { command: "/info", description: "Info about current user" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        "https://tlgrm.eu/_/stickers/274/cb2/274cb20c-774c-3e25-87f6-1818ddb6c0a7/4.webp"
      );
      const res = welcomeMessage()
      return bot.sendMessage(
        chatId,
        res
      );
    }

    if (text === "/info") {
      return bot.sendMessage(chatId, `Your name is ${msg.from.username}`);
    }


    return bot.sendMessage(chatId, "I don't understand you")
  });
};