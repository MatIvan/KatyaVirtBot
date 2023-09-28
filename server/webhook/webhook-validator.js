//@ts-check

const { RestError } = require('../rest-error');
const { chats } = require('../../data-base/database');

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
        name: validName(body['name']),
        userId: user.id,
        url: validUrl(body['url']),
        isPutToQueue: validIsPutToQueue(body['isPutToQueue']),
        condition: validCondition(body['condition'])
    }
}

/**
 * @param {any} name
 * @returns {string}
 */
function validName(name) {
    if (typeof name !== 'string') {
        throw new RestError('The "name" parameter is missing or is not a string.', 400);
    }
    if (name.length < 3) {
        throw new RestError('The "name" parameter length must be 3 symbols minimum.', 400);
    }
    return name;
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
    const contains = validContains(condition['contains']);
    const startWith = validStartWith(condition['startWith']);
    if (!contains && !startWith) {
        throw new RestError('Require one of parameters: "contains" or "startWith" (or both).', 400);
    }
    return {
        chatName: validChat(condition['chatName']),
        contains,
        startWith,
        caseSensitive: validCaseSensitive(condition['caseSensitive']),
    }
}

/**
 * @param {any} chat
 * @returns {string}
 */
function validChat(chat) {
    if (typeof chat !== 'string') {
        throw new RestError('The "condition.chatName" parameter is missing or is not a string.', 400);
    }
    const upperChart = chat.toUpperCase();
    const availableChats = chats.getNames();
    if (!availableChats.includes(upperChart)) {
        throw new RestError('The value of parameter "condition.chatName" is not supported. Use one of: ' + availableChats, 400);
    }
    return upperChart;
}

/**
 * @param {any} contains
 * @returns {string[] | undefined}
 */
function validContains(contains) {
    if (typeof contains === 'undefined') {
        return undefined;
    }
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
 * @returns {string[] | undefined}
 */
function validStartWith(startWith) {
    if (typeof startWith === 'undefined') {
        return undefined;
    }
    if (!Array.isArray(startWith)) {
        throw new RestError('The "condition.startWith" parameter is missing or is not a string[].', 400);
    }
    return startWith.map(str => {
        if (typeof str !== 'string') {
            throw new RestError('The "condition.startWith" array can contain only strings.', 400);
        }
        return str;
    })
}

/**
 * @param {any} caseSensitive
 * @returns {boolean}
 */
function validCaseSensitive(caseSensitive) {
    if (typeof caseSensitive === 'undefined') {
        return false;
    }
    if (typeof caseSensitive !== 'boolean') {
        throw new RestError('The "condition.caseSensitive" parameter is not a boolean.', 400);
    }
    return caseSensitive;
}

/**
 * @param {any} isPutToQueue
 * @returns {boolean}
 */
function validIsPutToQueue(isPutToQueue) {
    if (typeof isPutToQueue === 'undefined') {
        return false;
    }
    if (typeof isPutToQueue !== 'boolean') {
        throw new RestError('The "isPutToQueue" parameter is not a boolean.', 400);
    }
    return isPutToQueue;
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