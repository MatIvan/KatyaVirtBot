//@ts-check
const TelegramBot = require('node-telegram-bot-api');
const DB = require("../data-base/database");

/**
 * @typedef {TelegramBot.Message} TelegaMessage
 */


/**
 * @param {TelegramBot} bot
 * @param {TelegaMessage} msg
 * @returns {boolean} true - if needs to stop propagnation
 */
function say(bot, msg) {
    if (!msg.text) {
        return true;
    }
    const text = msg.text.substring(msg.text.indexOf(' '))
    const chatId = DB.chats.getByName('COMMON')?.id;
    if (chatId !== undefined) {
        bot.sendMessage(chatId, text);
    }
    return true;
}

module.exports = {
    say
}
