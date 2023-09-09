//@ts-check
const router = require('express').Router();

const controller = require('./webhook-controller');

router.get("/", controller.getAll);
router.post("/", controller.add);
router.get("/:id", controller.getById);

module.exports = router;
