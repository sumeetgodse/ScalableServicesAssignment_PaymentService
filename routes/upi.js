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
        // TODO : make a Notifications API call for payment SUCCESS
        res.status(200).json({ message: "Payment SUCCESS!" })
    } catch (error) {
        // TODO : make a Notifications API call for payment FAILED
        res.status(400).json({ message: "Payment FAILED!", errorMessage: error.message })
    }
})

module.exports = router;
