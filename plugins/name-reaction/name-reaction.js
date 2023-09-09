//@ts-check
const express = require('express');

/**
 * @typedef {object} Body
 * @property {string} message
 * @property {Hook} hook
 */

/**
 * @typedef {object} Hook
 * @property {number} id
 * @property {number} userId
 * @property {string} url
 * @property {Condition} condition
 */

/**
 * @typedef {object} Condition
 * @property {string} chatName
 * @property {string[] | undefined} contains 
 * @property {string[] | undefined} startWith
 * @property {boolean} caseSensitive
 */

const app = express();
app.use(express.json());
app.post("/", (req, resp) => {
    console.log("request");
    onHook(req.body)
        .then(() => { console.log("ok") })
        .catch(() => { console.log("error") })
    console.log("end");
    resp.end();
})

const port = 11001;
app.listen(port, function () {
    console.info('Server start on port ' + port);
});


/**
 * @param {Hook} hook
 */
function onHook(hook) {
    return new Promise((resolve, reject) => {
        console.log(hook);
        resolve(null);
    });
}
