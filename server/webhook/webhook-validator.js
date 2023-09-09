//@ts-check

const { CHAT_TYPES } = require('../../data-base/webhooks');
const { RestError } = require('../rest-error');

/**
 * @typedef {import('../../data-base/webhooks').WebHook} WebHook
 * @typedef {import('../../data-base/webhooks').Condition} Condition
 * @typedef {import('../../data-base/webhooks').Chat} Chat
 * @typedef {import('../../data-base/users').User} User
 */

/**
 * @param {any} body
 * @param {User} user
 * @returns {WebHook}
 */
function validWebhook(body, user) {
    return {
        id: -1,
        userId: user.id,
        url: validUrl(body['url']),
        condition: validCondition(body['condition'])
    }
}

/**
 * @param {any} url
 * @returns {string}
 */
function validUrl(url) {
    if (typeof url !== 'string') {
        throw new RestError('The "url" parameter is missing or is not a string.', 400);
    }
    if (!url.startsWith("http://")) {
        throw new RestError('The "url" parameter must start with "http://".', 400);
    }
    return url;
}

/**
 * @param {any} condition
 * @returns {Condition}
 */
function validCondition(condition) {
    if (typeof condition !== 'object') {
        throw new RestError('The "condition" parameter is missing or is not a object.', 400);
    }
    return {
        chat: validChat(condition['chat']),
        contains: validContains(condition['contains']),
        startWith: validStartWith(condition['startWith']),
        caseSensitive: validCaseSensitive(condition['caseSensitive']),
    }
}

/**
 * @param {any} chat
 * @returns {Chat}
 */
function validChat(chat) {
    if (typeof chat !== 'string') {
        throw new RestError('The "condition.chat" parameter is missing or is not a string.', 400);
    }
    /**@type {Chat} */
    // @ts-ignore
    const upperChart = chat.toUpperCase();
    if (!CHAT_TYPES.includes(upperChart)) {
        throw new RestError('The value of parameter "condition.chat" is not supported. Use one of: ' + CHAT_TYPES, 400);
    }
    return upperChart;
}

/**
 * @param {any} contains
 * @returns {string[]}
 */
function validContains(contains) {
    if (!Array.isArray(contains)) {
        throw new RestError('The "condition.contains" parameter is missing or is not a string[].', 400);
    }
    return contains.map(str => {
        if (typeof str !== 'string') {
            throw new RestError('The "condition.contains" array can contain only strings.', 400);
        }
        return str;
    })
}

/**
 * @param {any} startWith
 * @returns {string}
 */
function validStartWith(startWith) {
    if (typeof startWith !== 'string') {
        throw new RestError('The "condition.startWith" parameter is missing or is not a string.', 400);
    }
    return startWith;
}

/**
 * @param {any} caseSensitive
 * @returns {boolean}
 */
function validCaseSensitive(caseSensitive) {
    if (typeof caseSensitive !== 'boolean') {
        throw new RestError('The "condition.caseSensitive" parameter is missing or is not a boolean.', 400);
    }
    return caseSensitive;
}

/**
 * @param {any} id
 * @returns {number}
 */
function validId(id) {
    if (typeof id !== 'string') {
        throw new RestError('The "id" parameter is missing.', 400)
    }
    let numId = Number.parseInt(id);
    if (typeof numId !== 'number') {
        throw new RestError('The "id" parameter must be a number.', 400)
    }
    return numId;
}


module.exports = {
    validWebhook,
    validId
}