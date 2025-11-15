const express = require('express');
const router = express.Router();
const homeRouter = require('./homeRouter');
const productRouter = require('./productRouter');
const authRouter = require('./authRouter');
const adminRouter = require('./adminRouter');
const cartRouter = require('./cartRouter');
const userRouter = require('./userRouter');

// Main entry point for homepage
router.use('/',homeRouter);
// Authentication routes (login, signup, OAuth)
router.use('/auth',authRouter);
// Product-related routes
router.use('/product',productRouter); 
// Admin dashboard and management routes
router.use('/admin',adminRouter);
// Shopping cart routes
router.use('/cart',cartRouter);
// User profile and account routes
router.use('/user',userRouter);

module.exports = router;