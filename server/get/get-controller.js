//@ts-check
const asyncHandler = require('express-async-handler');
const getForUser = require('../../katya/katya').getForUser;

/**
 * @typedef {import('../../data-base/users').User} User
 * @typedef {import("express").Request} Request
 */

/**
 * @param {Request} req
 * @returns {User}
 */
function getUser(req) {
    return req['user'];
}

module.exports.get = asyncHandler(async (req, res, next) => {
    const user = getUser(req);
    console.log(`Get by "${user.name}"`);
    const result = getForUser(user);
    res.json(result);
});
