const express = require('express');
const cardTransactionModel = require('./model/cardTransactionModel');
const upiTransactionModel = require('./model/upiTransactionModel');

const router = express.Router()

module.exports = router;

// pay via card
router.post('/pay/card', async (req, res) => {
    const cardTransactionData = new cardTransactionModel({
        userId: req.body.userId,
        cardNum: req.body.cardNum,
        orderId: req.body.orderId,
        cvv: req.body.cvv,
        cardExpiry: req.body.cardExpiry,
        transactionStatus: 'SUCCESS', // TODO : generated after save success
        transactionDate: new Date().toISOString() // TODO : generated by this service
    })
    try { 
        const dataToSave = await cardTransactionData.save();
        // TODO : make a Notifications API Call saying that payment is SUCCESS
        res.status(200).json(dataToSave)
    } catch (error) {
        // TODO : make a Notifications API Call saying that payment is FAILED
        res.status(400).json({ message: error.message })
    }
})

// pay via card
router.post('/pay/upi', async (req, res) => {
    const upiTransactionData = new upiTransactionModel({
        userId: req.body.userId,
        upiNumber: req.body.upiNumber,
        orderId: req.body.orderId,
        transactionStatus: 'SUCCESS', // TODO : generated after save success
        transactionDate: new Date().toISOString() // TODO : generated by this service
    })
    try { 
        const dataToSave = await upiTransactionData.save();
        // TODO : make a Notifications API Call saying that payment is SUCCESS
        res.status(200).json(dataToSave)
    } catch (error) {
        // TODO : make a Notifications API Call saying that payment is FAILED
        res.status(400).json({ message: error.message })
    }
})
