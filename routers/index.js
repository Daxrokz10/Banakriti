const express = require('express');
const router = express.Router();
const homeRouter = require('./homeRouter');
const productRouter = require('./productRouter');
const authRouter = require('./authRouter');
const adminRouter = require('./adminRouter');
const cartRouter = require('./cartRouter');
const userRouter = require('./userRouter');

router.use('/',homeRouter);
router.use('/auth',authRouter);
router.use('/product',productRouter); 
router.use('/admin',adminRouter);
router.use('/cart',cartRouter);
router.use('/user',userRouter);

module.exports = router;