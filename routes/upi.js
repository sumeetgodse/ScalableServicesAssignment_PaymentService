const express = require('express');
const upiTransactionModel = require('../model/upiTransactionModel');

const router = express.Router();

router.post('/', async (req, res) => {
    const upiTransactionData = new upiTransactionModel({
        userId: req.body.userId,
        upiNumber: req.body.upiNumber,
        orderId: req.body.orderId,
        transactionDate: new Date().toISOString()
    })
    try {
        await upiTransactionData.save();
        // make a Notifications API call for payment SUCCESS
        await fetch('http://localhost:3006/notify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "userId": req.body.userId,
                "orderId": req.body.orderId,
                "message": "UPI Payment SUCCESS!"
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
                "message": "UPI Payment FAILED!"
            }),
        });
        res.status(400).json({ message: "Payment FAILED!", errorMessage: error.message })
        console.log(error.message)
    }
})

module.exports = router;
