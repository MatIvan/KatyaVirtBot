//@ts-check
const DB = require("../data-base/database");
const FILTER = require("./message-filter");
/**
 * @typedef {import ('../katya/katya').TelegaMessage} TelegaMessage
 */

/**
 * @param {TelegaMessage} msg 
 */
function onMessage(msg) {
    const hooks = DB.webhooks.getAll().filter(webhook => FILTER.webhookFilter(webhook, msg));
    for (const hook of hooks) {
        send(hook, msg);
    }
}

/**
 * @param {DB.webhooks.WebHook} hook
 * @param {TelegaMessage} msg
 */
function send(hook, msg) {
    console.log('Sending. hookId=' + hook.id);
    const body = {
        hook,
        message: msg.text
    }
    fetch(hook.url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(resp => {
            console.log(`Sended. hookId=${hook.id} status=${resp.status}`);
        })
        .catch(e => {
            console.log(`Sending error. hookId=${hook.id} error=${e}`);
        })
}

module.exports = {
    onMessage
}
