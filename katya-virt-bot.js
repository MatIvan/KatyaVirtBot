//@ts-check
const Props = require('./props');
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(Props.token, { polling: true });

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(msg);
    //bot.sendMessage(chatId, 'Received your message');
});
