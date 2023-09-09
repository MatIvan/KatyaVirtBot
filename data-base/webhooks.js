//@ts-check

/**
 * @typedef {'COMMON'} Chat
 */
const CHAT_TYPES = ['COMMON'];

/**
 * @typedef {object} Condition
 * @property {Chat} chat
 * @property {string[]} contains
 * @property {string} startWith
 * @property {boolean} caseSensitive
 */

/**
 * @typedef {object} WebHook
 * @property {number} id
 * @property {number} userId
 * @property {string} url
 * @property {Condition} condition
 */

/** @type {WebHook[]} */
const WEBHOOKS = [
    {
        id: 0,
        userId: 0,
        url: "http://localhost:11001/",
        condition: {
            chat: "COMMON",
            contains: ["DEMO"],
            startWith: "/DEMO",
            caseSensitive: true
        }
    }
];

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
 */
function getByUserId(userId) {
    return WEBHOOKS.filter(h => h.userId === userId);
}

/**
 * @param {number} hookId
 */
function getById(hookId) {
    return WEBHOOKS.find(h => h.id === hookId);
}

module.exports = {
    add,
    getByUserId,
    getById,
    CHAT_TYPES
}