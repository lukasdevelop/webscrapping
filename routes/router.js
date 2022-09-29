const express = require('express');
const BrowserService = require('../services/BrowserService');

const router = express.Router();

//A data abaixo foi a usada durante o desenolvimento para sucesso
router.get('/', (req, res) => {
    res.send('Data SUGERIDA PARA TESTES: 01/10/2022 a 04/10/2022');
});

router.post('/search', async (req, res) => {

    const { checkin, checkout } = req.body

    //chamo o service
    const data = await BrowserService.getBrowser(checkin, checkout)

    //o site tem um delay de resposta caso aconteça ele retorna um array vazio. Exibo a mensagem abaixo. (Poderia pensar em algo melhor com mais tempo)
    if (data.length === 0) {
        res.send('API with delay, try again!')
    }else {
        //Tudo certo exibo o resultado.
        console.log('API Online')
        res.send(data)
    }
})
module.exports = router;
