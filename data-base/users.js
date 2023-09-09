//@ts-check
const props = require('../props');

/**
 * @typedef {object} User
 * @property {string} name
 * @property {string} token
 */

/** @type {User[]} */
const users = require(props.dbpath + 'users.json');

/**
 * @param {string} token 
 * @returns {User | undefined}
 */
function getByToken(token) {
    return users.find(user => user.token === token);
}

module.exports = {
    getByToken
}