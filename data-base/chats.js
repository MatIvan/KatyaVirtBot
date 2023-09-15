//@ts-check
const props = require('../props');
const FILE = props.dbpath + 'chats.json';

/**
 * @typedef {object} Chat
 * @property {number} id
 * @property {string} name
 */

/** @type {Chat[]} */
const chats = require(FILE);

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