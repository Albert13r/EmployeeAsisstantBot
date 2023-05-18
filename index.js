const TelegramApi = require("node-telegram-bot-api");

const token = "6271955978:AAGhFBQtII5XQihyCiBECJh8rze7YyzFZQY";

const bot = new TelegramApi(token, { polling: true });

const start = () => {
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
      return bot.sendMessage(
        chatId,
        `Hello!\nMy name is Employee Management Bot\nI'll help you with your work!`
      );
    }

    if (text === "/info") {
      return bot.sendMessage(chatId, `Your name is ${msg.from.username}`);
    }


    return bot.sendMessage(chatId, "I don't understand you")
  });
};

start();
