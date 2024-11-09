require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const cardRoutes = require('./routes/card');
const upiRoutes = require('./routes/upi');

const transactionsDatabaseUrl = process.env.TRANSACTIONS_DATABASE_URL;

mongoose.connect(transactionsDatabaseUrl);
const transactions = mongoose.connection;

transactions.on('error', (error) => {
    console.log("Database connection error" + error)
})

transactions.once('connected', () => {
    console.log('Database Connected');
})

const app = express();

app.use(cors());
app.use(express.json());

app.use('/pay/card', cardRoutes);
app.use('/pay/upi', upiRoutes);

app.listen(3005, () => {
    console.log(`Server Started at ${3005}`)
})
