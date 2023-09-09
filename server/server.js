//@ts-check
const Props = require('../props');
const express = require('express');

const webhookFilter = require('./webhook/webhook-filter');
const webhookRouter = require('./webhook/webhook-router');
const restErrorHandler = require('./rest-error').restErrorHandler;

const app = express();
app.use(express.json());
app.use('/webhook*', webhookFilter);
app.use('/webhook', webhookRouter);
app.use(restErrorHandler);

function start() {
    app.listen(Props.port, function () {
        console.info('Server start on port', Props.port);
    });
}

module.exports = {
    start
}

