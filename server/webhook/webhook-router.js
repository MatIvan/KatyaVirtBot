//@ts-check
const router = require('express').Router();

const controller = require('./webhook-controller');

router.get("/", controller.getAll);
router.post("/", controller.add);
router.put("/:id", controller.save);
router.delete("/:id", controller.delete);

module.exports = router;
