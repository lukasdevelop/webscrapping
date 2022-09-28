const puppeteer = require('puppeteer');
const ConvertDate = require('../helpers/ConvertDate')
const fs = require('fs')

class BrowserService {

     browser;
     page;
     checkin = '';
     checkout = '';

    static async getBrowser(checkin, checkout) {

        this.checkin = ConvertDate.execute(checkin)
        this.checkout = ConvertDate.execute(checkout)

        this.browser = await puppeteer.launch({ headless: false});
        this.page = await this.browser.newPage();

        await this.page.goto(`https://pratagy.letsbook.com.br/D/Reserva?checkin=${this.checkin}&checkout=${this.checkout}&cidade=&hotel=12&adultos=1&criancas=&destino=Pratagy+Beach+Resort+All+Inclusive&promocode=&tarifa=&mesCalendario=9%2F1%2F2022`)
        
       
        const data = await this.page.evaluate(() => {

            const nameRoom = document.getElementsByClassName('quartoNome')
            const descriptionRoom = document.getElementsByClassName('quartoDescricao')
            const price = document.getElementsByClassName('relative')
            const image = document.getElementsByClassName('room--image')
    
            const nameRoomList = [...nameRoom]
            const descriptionRoomList = [...descriptionRoom]
            const priceList = [...price]
            const imgList = [...image]
    
            const listImgs = imgList.map(({ dataset }) => ({
                dataset
            }))
    
            const listDescriptionRoom = descriptionRoomList.map(({ innerText }) => ({
                innerText
            }))
    
            const listPrices = priceList.map(({ innerText }) => ({
                innerText
            }))
    
            return nameRoomList.map((nomeQuarto, index) => ({
    
                name: nomeQuarto.innerHTML,
                description: listDescriptionRoom[index].innerText,
                price: listPrices[index].innerText,
                imagem: listImgs[index].dataset.src
    
            }))
        })

        if(data.length > 0){
    
            await fs.writeFile('backup.json', JSON.stringify(data, null, 2), err => {
                if(err) throw new Error(err)

                console.log('file backup created!')
            })
        }

        return data

    }

    static closeBrowser(browser) {
        if (!browser) {
            return;
        }
        return browser.close();
    }
}

module.exports = BrowserService;
