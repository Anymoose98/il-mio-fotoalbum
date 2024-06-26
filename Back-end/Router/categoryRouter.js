const express = require("express");
const router = express.Router();
const {index, create, destroy} = require('../controllers/category.js')
const verifyToken = require('../middlewares/verificaJwtToken');

router.get('/', index)

router.use(verifyToken);

router.post('/', create)

router.delete('/:id', destroy)

module.exports = router; 