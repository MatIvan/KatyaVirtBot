//@ts-check
const Props = require('../props');
const express = require('express');
const TokenFilter = require('./token-filter');
const webhookRouter = require('./webhook/webhook-router');
const sendRouter = require('./send/send-router');
const restErrorHandler = require('./rest-error').restErrorHandler;

const app = express();

if (Props.useCors) {
    const cors = require('cors');
    app.use(cors());
}

app.use(express.json());
app.use('/*', TokenFilter);
app.use('/webhook', webhookRouter);
app.use('/send', sendRouter);
app.use(restErrorHandler);

function start() {
    app.listen(Props.port, function () {
        console.info('Server start on port', Props.port);
    });
}

module.exports = {
    start
}
