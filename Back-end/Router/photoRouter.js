const express = require("express");
const router = express.Router();
const { index, create, show, update, destroy } = require('../controllers/photo');
const validator = require('../middlewares/validator');
const bodyData = require('../validations/photo');
const upload = require('../middlewares/upload')

router.get('/', index);
router.post('/', upload.single('image'), validator(bodyData), create);
router.get('/:id', show);
router.put('/:id', upload.single('image'), validator(bodyData), update);
router.delete('/:id', destroy);

module.exports = router;