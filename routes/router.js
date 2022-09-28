const express = require('express');
const BrowserService = require('../services/BrowserService');

const se = new BrowserService()

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello Asksuite World!');
});

router.post('/search', async (req, res) => {

    const { checkin, checkout } = req.body

    await BrowserService.getBrowser()

    res.send(
        'teste'
    )
})


module.exports = router;
