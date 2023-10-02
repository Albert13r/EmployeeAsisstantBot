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
    {
      command: "/building_areas",
      description: "show all areas of the building and their code",
    },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const userName = msg.from.username;

    const user = await Employee.findOne({
      where: { username: userName },
    });
    let date = new Date();

    if (text === "/start_work") {
      const daily = await DailyReport.findOne({
        where: {
          employeeId: user.dataValues.id,
        },
      });
      if (daily) {
        await DailyReport.update(
          { finishWork: date },
          {
            where: {
              reportId: daily.reportId,
            },
          }
        );
      }
      await bot.sendMessage(
        msg.chat.id,
        `Please enter the number of your work area:`
      );
    }
    if( text.match(/[0-9]/)){
      const area = msg.text;
        let currentArea = await BuildingArea.findOne({
          where: { buildingAreaId: area },
        });
        if (!currentArea) {
          return bot.sendMessage(chatId, "Uncorrect adress");
        }
        try {
          const dailyRes = await DailyReport.create(
            {
              startWork: date,
              employeeId: user.dataValues.id,
              buildingAreaId: area,
            },
            {
              returning: true,
            }
          );
          return bot.sendMessage(
            chatId,
            `Your working day started at - ${date
              .toLocaleString()
              .replace(",", "")} on ${currentArea.dataValues.adressCity}, ${
              currentArea.dataValues.adressHouse
            } ${currentArea.dataValues.adressStreet}`
          );
        } catch (error) {
          console.error("Произошла ошибка при вставке данных:", error);
        }
    } 

    if (text === "/finish_work") {
      const daily = await DailyReport.findOne({
        where: {
          employeeId: user.dataValues.id,
        },
      });

      await DailyReport.update(
        { finishWork: date },
        {
          where: {
            reportId: daily.reportId,
          },
        }
      );
      return bot.sendMessage(
        chatId,
        `Your working day ended at -${date.toLocaleString().replace(",", "")} `
      );
    }

    if (text === "/building_areas") {
      const buildingAreasData = await BuildingArea.findAll({
        attributes: [
          "buildingAreaId",
          "title",
          "adressCountry",
          "adressCity",
          "adressStreet",
          "adressHouse",
        ],
      });

      const idTitlePairs = {};
      buildingAreasData.forEach((area) => {
        idTitlePairs[
          area.buildingAreaId
        ] = `${area.title} ( ${area.adressHouse} ${area.adressStreet} ${area.adressCity}, ${area.adressCountry})`;
      });

      function objectToKeyValueString(obj) {
        let keyValueString = ``;

        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            keyValueString += `${key}. ${obj[key]}\n\n`;
          }
        }

        return keyValueString;
      }

      const keyValueString = objectToKeyValueString(idTitlePairs);

      return bot.sendMessage(
        chatId,
        `The following is a list of building areas.\nThe number is the building area code, the next text is the name.\n\n${keyValueString}`
      );
    }

    if (text === "/start") {
      if (user.username === userName) {
        return bot.sendMessage(
          chatId,
          `Welcome - ${user.dataValues.firstName} ${
            user.dataValues.lastName
          }\n\n${welcomeMessage()}`
        );
      }
      return bot.sendMessage(
        chatId,
        "User is not defined! Contact your administrator for support."
      );
    }
    // return bot.sendMessage(chatId, "I don't understand you");
  });
};
module.exports = start;
