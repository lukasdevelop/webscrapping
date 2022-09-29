const puppeteer = require('puppeteer');
const ConvertDate = require('../helpers/ConvertDate')

class BrowserService {

    browser;
    page;
    checkin = '';
    checkout = '';

    static async getBrowser(checkin, checkout) {

        //Chamo e converto as datas de checkin e checkout para o formato que a url aceita 
        this.checkin = ConvertDate.execute(checkin)
        this.checkout = ConvertDate.execute(checkout)

        this.browser = await puppeteer.launch({})
        this.page = await this.browser.newPage()

        await this.page.goto(`${process.env.BASE_URL}?checkin=${this.checkin}&checkout=${this.checkout}&cidade=&hotel=12&adultos=1&criancas=&destino=Pratagy+Beach+Resort+All+Inclusive&promocode=&tarifa=&mesCalendario=9%2F1%2F2022`)

        const data = await this.page.evaluate(() => {

            //Busco os elementos no site    
            const nameRoom = document.getElementsByClassName('quartoNome')
            const descriptionRoom = document.getElementsByClassName('quartoDescricao')
            const price = document.getElementsByClassName('relative')
            const image = document.getElementsByClassName('room--image')
            const notFound = document.getElementsByClassName('hotel-selecionado-indisponivel-titulo')

            // Todos os resultados encontrados são inseridos em seus respectivos arrays
            const notFoundList = [...notFound]
            const nameRoomList = [...nameRoom]
            const descriptionRoomList = [...descriptionRoom]
            const priceList = [...price]
            const imgList = [...image]

            //mapeia as imagens principais

            const listImgs = imgList.map(({ dataset }) => ({
                dataset
            }))

            //mapeia a descrição

            const listDescriptionRoom = descriptionRoomList.map(({ innerText }) => ({
                innerText
            }))

            //mapeia os preços

            const listPrices = priceList.map(({ innerText }) => ({
                innerText
            }))

            //mapeia a mensagem de erro caso não encontre datas

            const listNotFound = notFoundList.map(({ innerText }) => ({
                erro: innerText
            }))

            //Caso nenhum resultado seja encontradom retorno a mensagem de data não disponivel do proprio sites

            if (notFoundList.length > 0) {

                return listNotFound

            } else {

                // Caso tenha datas retorno o objeto abaixo

                return nameRoomList.map((nomeQuarto, index) => ({

                    name: nomeQuarto.innerHTML,
                    description: listDescriptionRoom[index].innerText,
                    price: listPrices[index].innerText,
                    imagem: listImgs[index].dataset.src

                }))
            }

        })

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
