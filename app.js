var config = require('./config.json');
var fs = require('fs');
var login = require('facebook-chat-api');
var mathmode = require('mathmode');
var async = require('async');

function isValidLatex(inputString) {
    return (inputString.slice(0, 1) === '$' &&
        inputString.slice(-1) === '$' &&
        inputString !== '$');
}

function extractLatex(inputString) {
    var length = inputString.length;
    return inputString.slice(1, length - 1);
}

login({
    email: config.username,
    password: config.password
}, function callback(err, api) {
    if (err) return console.error(err);
    api.setOptions({
        listenEvents: true
    });
    var interpret = api.listen(function(err, event) {
        if (err) return console.error(err);

        switch (event.type) {
            case "message":
                console.log(isValidLatex(event.body));
                if (isValidLatex(event.body)) {

                    var inputString = extractLatex(event.body);
                    var outputFile = fs.createWriteStream('output.png');
                    
                    outputFile.on('finish', function() {
                        var msg = {
                            attachment: fs.createReadStream('output.png')
                        };
                        api.sendMessage(msg, event.threadID);
                    });

                    var options = {
                        packages: ["amsmath", "amssymb"]
                    }

                    mathmode(inputString, options).pipe(outputFile);

                }
                api.markAsRead(event.threadID, function(err) {
                    if (err) console.log(err);
                });
                //api.sendMessage("TEST BOT: " + event.body, event.threadID);
                break;
            case "event":
                //console.log(event);
                break;
        }
    });
});