const mongoose = require('mongoose');
const db = mongoose.mongoose.connect('DATABASE_URL/products', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected successfully');
}).catch(err => {
    console.error('Database connection error:', err);
});