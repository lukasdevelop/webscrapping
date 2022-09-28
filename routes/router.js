const express = require('express');
const BrowserService = require('../services/BrowserService');
const fs = require('fs')

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello Asksuite World!');
});

router.post('/search', async (req, res) => {

    const { checkin, checkout } = req.body

    const data = await BrowserService.getBrowser(checkin, checkout)

    if (data.length === 0) {
        await fs.readFile('backup.json', 'utf-8', (err, file) => {
            if (err) throw new Error(err);

            console.log('Backup activate! - API with delay...')

            res.send(file)

        })
    }else {

        res.send(data)
    }



})


module.exports = router;
