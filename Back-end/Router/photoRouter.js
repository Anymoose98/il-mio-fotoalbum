const express = require("express");
const router = express.Router();
const { index, create, show, update, destroy } = require('../controllers/photo');
const validator = require('../middlewares/validator');
const bodyData = require('../validations/photo');

router.get('/', index);
router.post('/', validator(bodyData), create);
router.get('/:id', show);
router.put('/:id', validator(bodyData), update);
router.delete('/:id', destroy);

module.exports = router;