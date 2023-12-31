//@ts-check
const DB = require("../data-base/database");

/**
 * @typedef {import ('../katya/katya').TelegaMessage} TelegaMessage
 */

/**
 * @param {DB.webhooks.WebHook} hook
 * @param {TelegaMessage} msg
 */
function webhookFilter(hook, msg) {
    const text = msg.text;
    if (!text) {
        return false;
    }

    const condition = hook.condition;
    if (!equalsChat(msg.chat.id, condition)) {
        return false;
    }

    const caseText = condition.caseSensitive ? text : text.toUpperCase();

    if (equalsStartWith(caseText, condition)) {
        return true;
    }
    if (equalsContains(caseText, condition)) {
        return true;
    }
    return false;
}



/**
 * @param {number} chatId
 * @param {DB.webhooks.Condition} condition
 * @returns {boolean}
 */
function equalsChat(chatId, condition) {
    const chat = DB.chats.getByName(condition.chatName);
    return chat?.id === chatId;
}

/**
 * @param {string} text
 * @param {DB.webhooks.Condition} condition
 */
function equalsStartWith(text, condition) {
    const { startWith } = condition;
    if (!startWith) {
        return false;
    }
    for (const cond of startWith) {
        if (text.includes(cond)) {
            return true;
        }
    }
    return false;
}

/**
 * @param {string} text
 * @param {DB.webhooks.Condition} condition
 */
function equalsContains(text, condition) {
    const { contains } = condition;
    if (!contains) {
        return false;
    }
    for (const cond of contains) {
        if (text.includes(cond)) {
            return true;
        }
    }
    return false;
}

module.exports = {
    webhookFilter
}
