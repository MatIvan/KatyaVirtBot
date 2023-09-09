//@ts-check
const router = require('express').Router();

const controller = require('./send-controller');

router.post("/", controller.send);

module.exports = router;
