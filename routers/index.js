const express = require('express');
const router = express.Router();
const homeRouter = require('./homeRouter');
const productRouter = require('./productRouter');

router.use('/',homeRouter);
router.use('/product',productRouter);

module.exports = router;