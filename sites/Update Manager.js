var terminal = require("../terminal.js");
const delay = require('delay');
const shell = require('shelljs');

var run = async function run(){
    terminal.log("clear", "Update Manager");
    terminal.log("add", "Update Manager", 'Checking for updates');
    //shell.exec('git checkout .');
    await delay(500);
    terminal.log("clear", "Update Manager");
    terminal.log("add", "Update Manager", 'Running updates');
    shell.exec('git pull');
    await delay(10000);
    terminal.log("clear", "Update Manager");
    terminal.log("add", "Update Manager", 'no more updates to run');
    await delay(500);
};

module.exports.run = run;