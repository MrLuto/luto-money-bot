const puppeteer = require('puppeteer');
const delay = require('delay');
var terminal = require("../terminal.js");
require('dotenv').config()

var run = async function run(){
    const browser = await puppeteer.launch({headless: true,ignoreHTTPSErrors: true,})
    let page = await browser.newPage();
    await page.goto('https://server.duinocoin.com/webminer.html');
    await delay(500);
    login = await page.$('input#usernameinput.input.is-fullwidth.has-icons');
    await login.type(process.env.Duinocoin_username || "pvplogger");
    login = await page.$('input#threadsinput.input.is-fullwidth.has-icons');
    await login.type(process.env.Duinocoin_threads || "4");
    login = await page.$('input#riginput.input.is-fullwidth.has-icons');
    await login.type(process.env.Duinocoin_rigname || "lmb");
    button = await page.$$('button#minebuttonclass.button.is-fullwidth');
    await button[0].click();
    terminal.log("clear", "Duinocoin");
    terminal.log("add", "Duinocoin", 'logged in');
    while (true){
        await delay(5000);
        data = await page.$('p#hashrate.title.has-text-centered');
        data = await data.evaluate( node => node.innerText);
        terminal.log("clear", "Duinocoin");
        terminal.log("add", "Duinocoin", "Total hashrate: " + data);
    };
};
module.exports.run = run;