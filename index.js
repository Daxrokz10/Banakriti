const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',require('./routes/index'));
app.use('/products', require('./routes/products'));


app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`);
})