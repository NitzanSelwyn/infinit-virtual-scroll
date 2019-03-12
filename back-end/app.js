const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const productRouter = require('./Routes/productRouter')
const app = express();


const db = mongoose.connect('mongodb+srv://nitzanSelwyn:123nitzan123@cluster0-vh41z.mongodb.net/test?retryWrites=true')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could Not Connect', err));

app.use(cors());
app.use('/api',productRouter)

app.get('/', (req, res) => {
    res.send('This is the SERVER');
});

module.exports = app;