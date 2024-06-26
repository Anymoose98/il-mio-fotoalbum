const express = require("express");
const router = express.Router();
const {index, create, destroy} = require('../controllers/category.js')

router.get('/', index)

router.post('/', create)

router.delete('/:id', destroy)

module.exports = router; 