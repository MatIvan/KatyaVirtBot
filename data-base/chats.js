//@ts-check
const props = require('../props');

/**
 * @typedef {object} Chat
 * @property {number} id
 * @property {string} name
 */

/** @type {Chat[]} */
const chats = require(props.dbpath + 'chats.json');

/**
 * @returns {Chat[]}
 */
function getAll() {
    return [...chats];
}

/**
 * @returns {string[]}
 */
function getNames() {
    return getAll().map(chat => chat.name);
}

/**
 * @param {string} name
 */
function getByName(name) {
    return getAll().find(chat => chat.name === name);
}

module.exports = {
    getAll,
    getNames,
    getByName
}