var terminal = require("../terminal.js");
var delay = require('delay');
var runtime = 0;

var run = async function run(){
    terminal.log("add", "Runtime", "booting up");
    while (true){
        terminal.log("clear", "Runtime");
        terminal.log("add", "Runtime", runtime + " minutes");
        await delay(60000);
        runtime++;
    }

};

module.exports.run = run;