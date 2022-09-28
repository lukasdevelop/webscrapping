const express = require('express');
const BrowserService = require('../services/BrowserService');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello Asksuite World!');
});

router.post('/search', async (req, res) => {

    const { checkin, checkout } = req.body

    const data = await BrowserService.getBrowser(checkin, checkout)

    res.send(
        data
    )
})


module.exports = router;
