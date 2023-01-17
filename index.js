const puppeteer = require('puppeteer');
const delay = require('delay');
var fs = require('fs');
var terminal = require("./terminal.js");

var run = async function run(){
fs.readdir('./sites', (err, files) => {
    files.forEach(file => {
        var file = require("./sites/" + file);
        file.run();
    });
})

while (true){
    terminal.log("log");
    await delay(5000);
}
};
run();