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

let lastId = 1000;

/**
 * @param {WebHook} webhook
 * @returns {WebHook}
 */
function add(webhook) {
    const newWebhook = {
        ...webhook,
        id: lastId++
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

/**
 * @param {number} id
 * @param {WebHook} webhook
 * @returns {WebHook}
 */
function save(id, webhook) {
    const newWebhook = {
        ...webhook,
        id
    }
    remove(id);
    WEBHOOKS.push(newWebhook);
    return newWebhook;
}

/**
 * @param {number} id
 */
function remove(id) {
    const index = WEBHOOKS.findIndex(h => h.id === id);
    if (index > -1) {
        WEBHOOKS.splice(index, 1);
    }
}

module.exports = {
    add,
    getByUserId,
    getById,
    getAll,
    save,
    remove
}