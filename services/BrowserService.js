const puppeteer = require('puppeteer');

class BrowserService {

     browser;
     page;

    static async getBrowser() {
        this.browser = await puppeteer.launch({ headless: false});
        this.page = await this.browser.newPage();
        await this.page.goto(`https://pratagy.letsbook.com.br/D/Reserva?checkin=01%2F10%2F2022&checkout=04%2F10%2F2022&cidade=&hotel=12&adultos=1&criancas=&destino=Pratagy+Beach+Resort+All+Inclusive&promocode=&tarifa=&mesCalendario=9%2F1%2F2022`)
        
    }

    static closeBrowser(browser) {
        if (!browser) {
            return;
        }
        return browser.close();
    }
}

module.exports = BrowserService;
