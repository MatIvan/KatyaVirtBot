//@ts-check

/**
 * @param {string} message 
 * @param {number} code 
 */
function RestError(message, code) {
    this.name = 'RestError';
    this.message = message;
    this.stack = (new Error()).stack;
    this.code = code;
}
RestError.prototype = new Error;

/**
 * @typedef {import("express").ErrorRequestHandler} ErrorRequestHandler
 */

/**
 * @type {ErrorRequestHandler}
 */
function restErrorHandler(err, req, res, next) {
    if (err instanceof RestError) {
        // @ts-ignore
        res.status(err.code).end(err.message);
        return;
    }
    console.error(err);
    const msg = (typeof err?.message === 'string') ? err.message : 'Server error.';
    res.status(500).end(msg);
}

module.exports = {
    RestError,
    restErrorHandler
}
