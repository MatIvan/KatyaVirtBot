//@ts-check
const props = require('../props');

/**
 * @typedef {object} User
 * @property {number} id
 * @property {string} name
 * @property {string} token
 */

/** @type {User[]} */
const users = require(props.dbpath + 'users.json');

/**
 * @returns {User[]}
 */
function getAll() {
    return [...users];
}


/**
 * @param {string} token 
 * @returns {User | undefined}
 */
function getByToken(token) {
    return getAll().find(user => user.token === token);
}

module.exports = {
    getByToken
}