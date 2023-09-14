//@ts-check
const asyncHandler = require('express-async-handler');
const DB = require('../../data-base/database');
const Validator = require('./webhook-validator');
const { RestError } = require('../rest-error');


/**
 * @typedef {import('../../data-base/users').User} User
 * @typedef {import("express").Request} Request
 * @typedef {import('../../data-base/webhooks').WebHook} WebHook
 */

/**
 * @param {Request} req
 * @returns {User}
 */
function getUser(req) {
    return req['user'];
}

module.exports.getAll = asyncHandler(async (req, res, next) => {
    const user = getUser(req);
    res.json(DB.webhooks.getByUserId(user.id));
});

module.exports.add = asyncHandler(async (req, res, next) => {
    const user = getUser(req);
    const webhook = getWebHook(req.body, user);
    res.json(DB.webhooks.add(webhook));
});

module.exports.save = asyncHandler(async (req, res, next) => {
    const id = Validator.validId(req.params.id);
    const oldHook = DB.webhooks.getById(id);
    if (!oldHook) {
        throw new RestError('Not found hook id=' + id, 404);
    }
    const user = getUser(req);
    const webhook = getWebHook(req.body, user);
    res.json(DB.webhooks.save(id, webhook));
});

module.exports.delete = asyncHandler(async (req, res, next) => {
    const id = Validator.validId(req.params.id);
    DB.webhooks.remove(id)
    res.end();
});

/**
 * @param {*} body 
 * @param {User} user
 * @returns {WebHook}
 */
function getWebHook(body, user) {
    const webhook = Validator.validWebhook(body, user);
    if (!webhook.condition.caseSensitive) {
        const upperContains = webhook.condition.contains?.map(txt => txt.toUpperCase());
        const upperStartWith = webhook.condition.startWith?.map(txt => txt.toUpperCase());
        webhook.condition.contains = upperContains;
        webhook.condition.startWith = upperStartWith;
    }
    return webhook;
}