//@ts-check
const fs = require('fs');
const props = require('../props');
const FILE = props.dbpath + 'webhooks.json';

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
 * @property {boolean} isPutToQueue
 * @property {Condition} condition
 */

function writeDB() {
    try {
        const data = JSON.stringify(WEBHOOKS, null, 4)
        fs.writeFileSync(FILE, data, 'utf8')
        console.log('File is written successfully: ' + FILE)
    } catch (err) {
        console.log('Error writing file: ' + err)
    }
}

/** @type {WebHook[]} */
const WEBHOOKS = require(FILE);
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
    writeDB();
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
    writeDB();
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
    writeDB();
}

module.exports = {
    add,
    getByUserId,
    getById,
    getAll,
    save,
    remove
}