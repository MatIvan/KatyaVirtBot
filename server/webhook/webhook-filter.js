//@ts-check

const RestError = require('../rest-error').RestError;
const DB = require('../../data-base/database');

/**
 * @typedef {import("express").RequestHandler} RequestHandler
 * @typedef {import("express").Request} Request
 */

/**
 * @param {Request} req 
 * @returns {string | null} token
 */
function getHeaderToken(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return null;
    }
    const [type, token] = authHeader.split(' ');
    if (type !== 'Token') {
        throw new RestError('Authorization header type require "Token".', 401);
    }
    if (!token) {
        throw new RestError('Authorization header token is empty.', 401);
    }
    return token;
}

/**
 * @param {Request} req
 */
function getUserByToken(req) {
    const token = getHeaderToken(req);
    if (!token) {
        throw new RestError('Authorization require.', 401);
    }
    return DB.users.getByToken(token);
}

/**
 * @type {RequestHandler}
 */
module.exports = (req, res, next) => {
    const user = getUserByToken(req);
    if (!user) {
        throw new RestError('Authorization failed: user not found.', 401);
    }
    req['user'] = user;
    console.debug("Webhook access user: " + user.name);
    next();
}
