const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const express = require('express')
const bodyParser = require('body-parser');
require('dotenv').config();

const token = process.env.TELEGRAM_TOKEN;
let bot;

if (process.env.NODE_ENV === 'production') {
   bot = new TelegramBot(token);
   bot.setWebHook(process.env.HEROKU_URL + bot.token);
} else {
   bot = new TelegramBot(token, { polling: true });
}

bot.on('message', (msg) => {
 if(msg.text === 'Cho cho'){
     bot.sendMessage(chatId, "opa nihua")
 }
});
const app = express();

app.use(bodyParser.json());

app.listen(process.env.PORT);

app.post('/' + bot.token, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});