const express = require('express');
const cardTransactionModel = require('../model/cardTransactionModel');

const router = express.Router();

router.post('/', async (req, res) => {
    const cardTransactionData = new cardTransactionModel({
        userId: req.body.userId,
        cardNum: req.body.cardNum,
        orderId: req.body.orderId,
        cvv: req.body.cvv,
        cardExpiry: req.body.cardExpiry,
        transactionDate: new Date().toISOString()
    })
    try {
        await cardTransactionData.save();
        // TODO : make a Notifications API call for payment SUCCESS
        res.status(200).json({ message: "Payment SUCCESS!" })
    } catch (error) {
        // TODO : make a Notifications API call for payment FAILED
        res.status(400).json({ message: "Payment FAILED!", errorMessage: error.message })
    }
})

module.exports = router;
