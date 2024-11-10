const mongoose = require('mongoose');

const cardTransactionSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: String
    },
    cardNum: {
        required: true,
        type: String
    },
    orderId: {
        required: true,
        type: String
    },
    cvv: {
        required: true,
        type: String
    },
    cardExpiry: {
        required: true,
        type: String
    },
    transactionDate: {
        required: false,
        type: String
    }
})

module.exports = mongoose.model('cardTransaction', cardTransactionSchema)
