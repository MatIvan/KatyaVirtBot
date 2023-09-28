//@ts-check
const DB = require("../data-base/database");
const FILTER = require("./message-filter");

/**
 * @typedef {import ('../katya/katya').TelegaMessage} TelegaMessage
 * @typedef {import("../data-base/users").User} User
 * @typedef {import("../data-base/webhooks").WebHook} WebHook
 */

/**
 * @typedef {object} QueueMessage
 * @property {WebHook} hook
 * @property {TelegaMessage} message
 */


/**
 * @type {Map<number, QueueMessage[]>}
 */
const map = new Map();

/**
 * @param {TelegaMessage} msg 
 */
function onMessage(msg) {
    const hooks = DB.webhooks.getAll()
        .filter(webhook => webhook.isPutToQueue)
        .filter(webhook => FILTER.webhookFilter(webhook, msg));
    for (const hook of hooks) {
        putToQueue(hook, msg);
    }
}

/**
 * @param {DB.webhooks.WebHook} hook
 * @param {TelegaMessage} message
 */
function putToQueue(hook, message) {
    const { userId } = hook;
    const queue = map.get(userId);
    if (!queue) {
        return;
    }
    /** @type {QueueMessage} */
    const newMsg = { hook, message };
    map.set(userId, [...queue, newMsg]);
}

/**
 * @param {User} user
 * @return {QueueMessage[]}
 */
function getForUser(user) {
    const userId = user.id;
    const queue = map.get(userId);
    if (!queue) {
        return [];
    }
    map.delete(userId);
    return [...queue];
}

module.exports = {
    onMessage,
    getForUser
}
