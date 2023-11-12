//@ts-check
const asyncHandler = require('express-async-handler');
const Validator = require('./send-validator');
const Katya = require('../../katya/katya');
const { chats } = require('../../data-base/database');

/**
 * @typedef {import('../../data-base/users').User} User
 * @typedef {import("express").Request} Request
 */

/**
 * @typedef {'TEXT' | 'MARKDOWN' | undefined} SendType
 */

/**
 * @typedef {object} SendRequest
 * @property {string} chatName
 * @property {string} message
 * @property {SendType} type
 * @property {boolean} disableWebPagePreview
 */

/**
 * @param {Request} req
 * @returns {User}
 */
function getUser(req) {
    return req['user'];
}


/**
 * @param {SendRequest} sendRequest
 */
function send(sendRequest) {
    const { chatName, message, type, disableWebPagePreview: webPagePreview } = sendRequest;
    const chat = chats.getByName(chatName);
    if (!chat) {
        console.log("Unknown chat: " + chatName);
        return;
    }
    Katya.sendText(chat.id, message, type, webPagePreview);
}

module.exports.send = asyncHandler(async (req, res, next) => {
    res.end();
    const user = getUser(req);
    const sendRequest = Validator.validSendRequest(req.body);
    console.log(`Send from "${user.name}" : ${sendRequest.message}`);
    send(sendRequest);
});
