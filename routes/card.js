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
        // make a Notifications API call for payment SUCCESS
        await fetch('http://localhost:3006/notify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "userId": req.body.userId,
                "orderId": req.body.orderId,
                "message": "CARD Payment SUCCESS!"
            }),
        });
        res.status(200).json({ message: "Payment SUCCESS!" })
    } catch (error) {
        // make a Notifications API call for payment FAILED
        await fetch('http://localhost:3006/notify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "userId": req.body.userId,
                "orderId": req.body.orderId,
                "message": "CARD Payment FAILED!"
            }),
        });
        res.status(400).json({ message: "Payment FAILED!", errorMessage: error.message })
    }
})

module.exports = router;
