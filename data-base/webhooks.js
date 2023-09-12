//@ts-check
const props = require('../props');

/**
 * @typedef {import("./chats").Chat} Chat
 */

/**
 * @typedef {object} Condition
 * @property {string} chatName
 * @property {string[] | undefined} contains 
 * @property {string[] | undefined} startWith
 * @property {boolean} caseSensitive
 */

/**
 * @typedef {object} WebHook
 * @property {number} id
 * @property {string} name
 * @property {number} userId
 * @property {string} url
 * @property {Condition} condition
 */

/** @type {WebHook[]} */
const WEBHOOKS = require(props.dbpath + 'webhooks.json');;

/**
 * @param {WebHook} webhook
 * @returns {WebHook}
 */
function add(webhook) {
    const newWebhook = {
        ...webhook,
        id: WEBHOOKS.length
    }
    WEBHOOKS.push(newWebhook);
    return newWebhook;
}

/**
 * @param {number} userId
 * @returns {WebHook[]}
 */
function getByUserId(userId) {
    return getAll().filter(h => h.userId === userId);
}

/**
 * @param {number} hookId
 * @returns {WebHook | undefined}
 */
function getById(hookId) {
    return getAll().find(h => h.id === hookId);
}

/**
 * @returns {WebHook[]}
 */
function getAll() {
    return [...WEBHOOKS];
}

module.exports = {
    add,
    getByUserId,
    getById,
    getAll
}