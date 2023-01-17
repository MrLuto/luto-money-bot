const messages = [];

var log = function log(functionName, id, message){
    if (functionName == "log"){
        console.clear();
        console.log('LUTO Money bot');
        console.log('-----------------');
        messages.forEach(element => { console.log(element) });

    } else if (functionName == "add"){
        messages.push(id + ": " + message);
        messages.sort();
    } else if (functionName == "clear"){
        messages.forEach(element => { 
            if (element.includes(id)){
                messages.splice(messages.indexOf(element), 1);
            } 
        
        });
    } else {
        console.error("error");
    }

};

module.exports.log = log;