require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

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
app.use('/api', routes)

app.listen(3005, () => {
    console.log(`Server Started at ${3005}`)
})
