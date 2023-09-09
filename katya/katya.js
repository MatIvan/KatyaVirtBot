//@ts-check
const Props = require('../props');

const TelegramBot = require('node-telegram-bot-api');

/** @type {TelegramBot} */
let bot;

function start() {
    bot = new TelegramBot(Props.token, { polling: true });
    bot.on('message', onMessage);
}

/**
 * 
 * @param {TelegramBot.Message} msg 
 * @param { TelegramBot.Metadata}metadata
 */
function onMessage(msg, metadata) {
    console.debug(msg, metadata);
    console.log(msg.chat.title + " : " + msg.text);
    //const chatId = msg.chat.id;
    //bot.sendMessage(chatId, 'Received your message');
}

module.exports = {
    start
}