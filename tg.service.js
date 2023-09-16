const welcomeMessage = require("./bussines.service");
const pkg = require("node-telegram-bot-api");
const sequelize = require("./db");
const {
  Employee,
  Customer,
  BuildingArea,
  Admin,
  DailyReport,
} = require("./models/employee.model");

const TelegramApi = pkg;

const token = "6271955978:AAGotmjENH-dXAQnQYgTgiHyY2GO4YPo_mQ";

const bot = new TelegramApi(token, { polling: true });

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (err) {
    console.log("Database connection error");
  }

  bot.setMyCommands([
    { command: "/start", description: "Welcome message" },
    { command: "/start_work", description: "Open your work day" },
    { command: "/finish_work", description: "Close your work day" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const currentUserId = msg.from.id;
    const userName = msg.from.username;
    const user = await Employee.findOne({ username: userName });

    if (text === "/start_work") {
      return bot.sendMessage(chatId, `Work day open`);
    }

    if (text === "/finish_work") {
      return bot.sendMessage(chatId, `Work day close`);
    }

    if (text === "/start") {
      if (user.username === userName) {
        return bot.sendMessage(
          chatId,
          `Welcome - ${msg.from.username}\n\n${welcomeMessage()}`
        );
      }
      return bot.sendMessage(
        chatId,
        "User is not defined! Contact your administrator for support."
      );
    }
    return bot.sendMessage(chatId, "I don't understand you");
  });
};
module.exports = start;
