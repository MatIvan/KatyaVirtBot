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
    const { username } = msg.chat;
    console.debug(msg, metadata);
    console.log(username + " : " + msg.text);
    WebHookService.onMessage(msg);
}

module.exports = {
    start
}