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

const port = 11001;
const katyaServerUrl = 'http://katya:8888';
const userToken = 'DEMOTOKEN';

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

app.listen(port, function () {
    console.info('Server start on port ' + port);
});


/**
 * @param {Body} request
 */
function onHook(request) {
    const { hook, message } = request;
    console.log('Sending. hookId=' + hook.id);
    const body = {
        chatName: hook.condition.chatName,
        message: 'Я Катя!'
    }
    return fetch(katyaServerUrl, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + userToken
        },
    })
        .then(resp => {
            console.log(`Sended. hookId=${hook.id} status=${resp.status}`);
        })
        .catch(e => {
            console.error(e);
            console.log(`Sending error. hookId=${hook.id} error=${e}`);
        })
}
