//@ts-check
const asyncHandler = require('express-async-handler');
const DB = require('../../data-base/database');
const Validator = require('./webhook-validator');


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

module.exports.getAll = asyncHandler(async (req, res, next) => {
    console.log("getAll");
    const user = getUser(req);
    res.json(DB.webhooks.getByUserId(user.id));
});

module.exports.add = asyncHandler(async (req, res, next) => {
    const user = getUser(req);
    const webhook = Validator.validWebhook(req.body, user);
    if (!webhook.condition.caseSensitive) {
        const upperContains = webhook.condition.contains?.map(txt => txt.toUpperCase());
        const upperStartWith = webhook.condition.startWith?.map(txt => txt.toUpperCase());
        webhook.condition.contains = upperContains;
        webhook.condition.startWith = upperStartWith;
    }
    res.json(DB.webhooks.add(webhook));
});

module.exports.getById = asyncHandler(async (req, res, next) => {
    const id = Validator.validId(req.params.id);
    res.json(DB.webhooks.getById(id));
});
