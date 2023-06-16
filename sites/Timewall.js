const puppeteer = require('puppeteer');
const delay = require('delay');
var terminal = require("../terminal.js");
require('dotenv').config({path: './../.env'});

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
    await login.type(process.env.Timewall_username);
    login = await page.$('input#sc-login-password');
    await login.type(process.env.Timewall_password);
    if (process.env.Try_Captcha.toLowerCase() == 'true'){
        login = await page.$('iframe');
        await login.click();
        await delay(500);
        login = await page.$('button.btnLogin.sc-button.sc-button-large.sc-button-block.sc-button-danger');
        await login.click();
    }
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
    AOA = 0;
    NoAdsOpened = 0;
    await delay(5000);
    startpunten = await page.$('span.walletPoints');
    startpunten = await startpunten.evaluate( node => node.innerText);
    while (true){
        terminal.log("clear", "Timewall");
        if (process.env.Auto_Whithdraw == 'true' && startpunten >= process.env.Whithdraw_amount){
            try {
                console.log("test");
                terminal.log("clear", "Timewall");
                terminal.log("add", "Timewall", 'Whithdrawing ' + process.env.Whithdraw_amount + ' points');
                await page.goto('https://timewall.io/withdraw');
                await delay(500);
                Withdraw = await page.$('a.sc-button.withdrawbtn.sc-button-primary');
                await Withdraw.click();
                page.on('dialog', async dialog => {   //on event listener trigger
                    console.log(dialog.message());  //get alert message
                    await dialog.accept();        //accept alert
                })
                await delay(1000);
                await page.goto('https://timewall.io/clicks');
                await delay(500);
            } catch (error) {
                console.error(error);
                console.log("Error While Whithdrawing");
            }
        } else if (await page.$eval('div.uk-alert-danger.uk-alert.clicksNotAvailable', el => getComputedStyle(el).getPropertyValue('display')) == 'block'){
            try {
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
            } catch (error) {
                console.error(error);
                console.log("Error While NO ads availible");
            }
        } else {
            try {
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
                TOTpunten = parseInt(TOTpunten);
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
                await delay(4000);
                if (parseInt(await page.title()) !== NaN){
                    await delay(tijd);
                };
                await page.bringToFront();
                await delay(500);
                await page.reload();
                await delay(500);
            } catch (error) {
                console.error(error);
                console.log("Error While Running");
            }
            
        }
        noAdsAvailible = await page.$eval('div.uk-alert-danger.uk-alert.clicksNotAvailable', el => getComputedStyle(el).getPropertyValue('display'));
        const pages = await browser.pages();
        const numTabs = pages.length;
        if (numTabs > 4) {
          console.log('Closing extra tabs...');
          const tabsToClose = numTabs - 4;
          for (let i = numTabs - 1; i >= 4; i--) {
            await pages[i].close();
          }
        }
    }
};
run();
module.exports.run = run;