//@ts-check
const router = require('express').Router();

const controller = require('../get/get-controller');

router.get("/", controller.get);

module.exports = router;
