//@ts-check
const asyncHandler = require('express-async-handler');
const Validator = require('./send-validator');
const sendToKatya = require('../../katya/katya').send;
const { chats } = require('../../data-base/database');

/**
 * @typedef {import('../../data-base/users').User} User
 * @typedef {import("express").Request} Request
 */

/**
 * @typedef {object} SendRequest
 * @property {string} chatName
 * @property {string} message
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
    const chat = chats.getByName(sendRequest.chatName);
    if (!chat) {
        console.log("Unknown chat: " + sendRequest.chatName);
        return;
    }
    sendToKatya(chat.id, sendRequest.message);
}

module.exports.send = asyncHandler(async (req, res, next) => {
    res.end();
    const user = getUser(req);
    const sendRequest = Validator.validSendRequest(req.body);
    console.log(`Send from "${user.name}" : ${sendRequest.message}`);
    send(sendRequest);
});
