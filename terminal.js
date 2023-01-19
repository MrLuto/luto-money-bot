const messages = [];
require('dotenv').config();

var log = function log(functionName, id, message){
    if (functionName == "log"){
        if(process.env.Log_to_console.toLowerCase() == 'true'){
            console.clear();
            console.log('LUTO Money bot');
            console.log('-----------------');
            messages.forEach(element => { console.log(element) });
        }
    } else if (functionName == "add"){
        if(process.env.Log_to_console.toLowerCase() == 'true'){
            messages.push(id + ": " + message);
            messages.sort();
        }
    } else if (functionName == "clear"){
        if(process.env.Log_to_console.toLowerCase() == 'true'){
            messages.forEach(element => { 
                if (element.includes(id)){
                    messages.splice(messages.indexOf(element), 1);
                } 
            
            });
        }
    } else {
        console.error("error");
    };

};

module.exports.log = log;