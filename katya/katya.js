//@ts-check
const Props = require('../props');

const TelegramBot = require('node-telegram-bot-api');
const WebHookService = require('../service/webhook-service');
const QueueService = require('../service/queue-service');
const AdminService = require('./admin-service');

/**
 * @typedef {TelegramBot.Message} TelegaMessage
 * @typedef {TelegramBot.Metadata} TelegaMetadata
 * @typedef {import('../data-base/users').User} User
 * @typedef {import('../service/queue-service').QueueMessage} QueueMessage
 * @typedef {import('../server/send/send-controller').SendType} SendType
 * @typedef {TelegramBot.SendMessageOptions} TelegaMessageOptions
 * @typedef {TelegramBot.ParseMode} TelegaParseMode
 */

/** @type {TelegramBot} */
let bot;

function start() {
    bot = new TelegramBot(Props.token, { polling: true });
    bot.on('message', onMessage);
}

/**
 * @param {string} text 
 * @returns {string}
 */
function getCommand(text) {
    let wordEndIndex = text.indexOf(' ');
    if (wordEndIndex < 0) {
        wordEndIndex = text.length;
    }
    return text.substring(1, wordEndIndex);
}

/**
 * @param {TelegaMessage} msg 
 * @returns {boolean} true - if needs to stop propagnation
 */
function process(msg) {
    const { text } = msg;
    if (!text) {
        return false;
    }
    if (text.charAt(0) !== '/') {
        return false;
    }
    const cmd = getCommand(text);
    if (typeof AdminService[cmd] !== "function") {
        return false;
    }
    return AdminService[cmd](bot, msg);
}

/**
 * @param {TelegaMessage} msg 
 * @param {TelegaMetadata} metadata
 */
function onMessage(msg, metadata) {
    const { username, title, id } = msg.chat;
    //console.debug(msg, metadata);
    console.log('chat ' + id + ' ' + (username || title) + " : " + msg.text);
    if (process(msg)) {
        return;
    }
    WebHookService.onMessage(msg);
    QueueService.onMessage(msg);
}

/**
 * @param {TelegramBot.ChatId} chatId
 * @param {string} text
 * @param {SendType} type
 * @param {boolean} webPagePreview
 */
function sendText(chatId, text, type, webPagePreview) {
    let messageOptions = getSendMessageOptions(type, webPagePreview);
    bot.sendMessage(chatId, text, messageOptions);
}

/**
 * @param {SendType} type
 * @param {boolean} webPagePreview
 * @returns {TelegaMessageOptions}
 */
function getSendMessageOptions(type, webPagePreview) {
    return {
        parse_mode: getMessageType(type),
        disable_web_page_preview: webPagePreview
    }
}

/**
 * @param {SendType} type
 * @returns {TelegaParseMode | undefined}
 */
function getMessageType(type) {
    switch(type) {
        case 'MARKDOWN':
            return 'Markdown'
        default:
            return undefined;
    }
}

/**
 * @param {User} user 
 * @return {QueueMessage[]}
 */
function getForUser(user) {
    return QueueService.getForUser(user);
}

module.exports = {
    start,
    sendText,
    getForUser
}