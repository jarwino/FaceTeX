var config = require('./config.json');
var fs = require('fs');
var login = require('facebook-chat-api');
var mathmode = require('mathmode');
var async = require('async');
var http = require('http');


var results = [];
var options = {
    packages: ["amsmath", "amssymb"]
};

http.createServer(function (request, response) {


function isValidLatex(inputString) {
    return (inputString.slice(0, 1) === '$' &&
        inputString.slice(-1) === '$' &&
        inputString !== '$');
}

function extractLatex(inputString) {
    var length = inputString.length;
    return inputString.slice(1, length - 1);
}

function populateResults(inputString) {
    var resultArray = inputString.split("");
    var curr;

    var inMiddle = false;

    for (var i = 0; i < resultArray.length; i++) {
        if (resultArray[i] === '$') {
            
            if (!inMiddle) {
                curr = "";
            } else {
                results.push(curr);
            }

            inMiddle = !inMiddle; //flip switch

        } else {
            if (inMiddle) {
                curr += resultArray[i];
            }
        }

    }

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
                //console.log(isValidLatex(event.body));
                populateResults(event.body);


                console.log(results);

                for (var i = 0; i < results.length; i++) {

                    var outputFile = fs.createWriteStream('output.png');

                    outputFile.on('finish', function() {
                        var msg = {
                            attachment: fs.createReadStream('output.png')
                        };
                        api.sendMessage(msg, event.threadID, function(err, messageInfo) {

                        });
                    });

                    mathmode(results[i], options).pipe(outputFile);

                }

                results = [];

                api.markAsRead(event.threadID, function(err) {
                    if (err) console.log(err);
                });
                //api.sendMessage("TEST BOT: " + event.body, event.threadID);
                break;
            case "event":

                break;
        }
    });
});

}).listen(process.env.PORT || 5000);

 console.log('Server running at http://127.0.0.1:5000/');