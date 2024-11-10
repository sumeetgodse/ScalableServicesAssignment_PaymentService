const mongoose = require('mongoose');

const upiTransactionSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: String
    },
    upiNumber: {
        required: true,
        type: String
    },
    orderId: {
        required: true,
        type: String
    },
    transactionDate: {
        required: false,
        type: String
    }
})

module.exports = mongoose.model('upiTransaction', upiTransactionSchema)
