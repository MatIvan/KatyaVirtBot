//@ts-check
const Props = require('../props');

const TelegramBot = require('node-telegram-bot-api');
const WebHookService = require('../service/webhook-service');

/**
 * @typedef {TelegramBot.Message} TelegaMessage
 * @typedef {TelegramBot.Metadata} TelegaMetadata
 */

/** @type {TelegramBot} */
let bot;

function start() {
    bot = new TelegramBot(Props.token, { polling: true });
    bot.on('message', onMessage);
}

/**
 * @param {TelegaMessage} msg 
 * @param {TelegaMetadata} metadata
 */
function onMessage(msg, metadata) {
    const { username, title } = msg.chat;
    //console.debug(msg, metadata);
    console.log((username || title) + " : " + msg.text);
    WebHookService.onMessage(msg);
}

/**
 * @param {TelegramBot.ChatId} chatId
 * @param {string} text
 */
function send(chatId, text) {
    bot.sendMessage(chatId, text);
}

module.exports = {
    start,
    send
}