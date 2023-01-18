const puppeteer = require('puppeteer');
const delay = require('delay');
var terminal = require("../terminal.js");
require('dotenv').config()

var run = async function run(){
    const browser = await puppeteer.launch({headless: false,ignoreHTTPSErrors: true,defaultViewport: null,})
    let page2 = await browser.newPage();
    let page = await browser.newPage();
    await page.goto('https://timewall.io/users/login');
    await delay(500);
    button = await page.$$('button[class="sc-button sc-button-large"]');
    await button[0].click();
    await delay(1000);
    login = await page.$('input#sc-login-username');
    await login.type(process.env.Timewall_username || "configure your .env file");
    login = await page.$('input#sc-login-password');
    await login.type(process.env.Timewall_password);
    login = await page.$('iframe');
    await login.click();
    await delay(500);
    login = await page.$('button.btnLogin.sc-button.sc-button-large.sc-button-block.sc-button-danger');
    await login.click();
    terminal.log("clear", "Timewall");
    terminal.log("add", "Timewall", 'log in');
    while (page.url() != 'https://timewall.io/surveys'){
        await delay(500);
    }
    terminal.log("clear", "Timewall");
    terminal.log("add", "Timewall", 'logged in');
    await page.goto('https://timewall.io/clicks');
    await delay(500);
    // check if there are any ads
    noAdsAvailible = await page.$eval('div.uk-alert-danger.uk-alert.clicksNotAvailable', el => getComputedStyle(el).getPropertyValue('display'));
    capcha = await page.$eval('div.uk-alert-danger.uk-alert.clicksNotAvailable', el => getComputedStyle(el).getPropertyValue('display'));
    AOA = 0;
    NoAdsOpened = 0;
    await delay(5000);
    startpunten = await page.$('span.walletPoints');
    startpunten = await startpunten.evaluate( node => node.innerText);
    while (true){
        terminal.log("clear", "Timewall");
        if (noAdsAvailible == 'block' || capcha == 'block'){
            NoAdsOpened = NoAdsOpened + 1;
            await delay(5000);
            TOTpunten = await page.$('span.walletPoints');
            TOTpunten = await TOTpunten.evaluate( node => node.innerText);
            terminal.log("clear", "Timewall");
            terminal.log("add", "Timewall", 'Ad Status: NO ads availible');
            terminal.log("add", "Timewall", "Minutes since last ad: " + NoAdsOpened + " minutes");
            terminal.log("add", "Timewall", "total amount of points: " + TOTpunten + "   total amount of cents: " + TOTpunten / 236);
            terminal.log("add", "Timewall", "Total amount of ads opened: " + AOA);
            await delay(60000);
            await page.reload();
            await delay(500);
        } else {
            AOA++;
            NoAdsOpened = 0;
            await delay(5000);
            tijd = await page.$('span.clickTimer');
            tijd = await tijd.evaluate( node => node.innerText);
            punten = await page.$('p.uk-margin-remove.clickRate');
            punten = await punten.evaluate( node => node.innerText);
            punten = punten.replace(' points', '');
            punten = parseInt(punten);
            await delay(1000);
            TOTpunten = await page.$('span.walletPoints');
            TOTpunten = await TOTpunten.evaluate( node => node.innerText);
            terminal.log("clear", "Timewall");
            terminal.log("add", "Timewall", 'Ad Status: ads availible');
            terminal.log("add", "Timewall", "Waiting for " + tijd + " seconds for the current task to be completed");
            terminal.log("add", "Timewall", "You will get " + punten + " points for this task");
            terminal.log("add", "Timewall", "total amount of points: " + TOTpunten + "   total amount of cents: " + TOTpunten / 236);
            terminal.log("add", "Timewall", "Total amount of ads opened: " + AOA);
            tijd = tijd * 1000;
            button = await page.$('a[class="clickBtn sc-button sc-button-primary"]');
            await button.click();
            await page2.bringToFront();
            if (tijd > 1000){
                await delay(tijd);
            };
            await delay(1000);
            await page.bringToFront();
            await delay(500);
            await page.reload();
            await delay(500);
            
        }
        noAdsAvailible = await page.$eval('div.uk-alert-danger.uk-alert.clicksNotAvailable', el => getComputedStyle(el).getPropertyValue('display'));
    }
};

module.exports.run = run;