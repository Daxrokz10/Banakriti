const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('./config/db');

app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use('/',require('./routers'));



app.listen(port,()=>{
    db;
    console.log(`Server is running on port http://localhost:${port}`);
})