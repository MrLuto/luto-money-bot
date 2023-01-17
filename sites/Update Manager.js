var terminal = require("../terminal.js");
const delay = require('delay');

var run = async function run(){
    terminal.log("clear", "Update Manager");
    terminal.log("add", "Update Manager", 'Checking for updates');
    await delay(500);
    terminal.log("clear", "Update Manager");
    terminal.log("add", "Update Manager", 'Running updates');
    await delay(500);
    terminal.log("clear", "Update Manager");
    terminal.log("add", "Update Manager", 'no more updates to run');
    await delay(500);
};

module.exports.run = run;