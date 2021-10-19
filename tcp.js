require('dotenv').config();
//const fetch = require('node-fetch');
const express = require('express');
const app = express();
app.listen(50001, () => console.log('Listening at 50001!'));
app.use(express.static('public'));
app.use(express.json({
    limit: '5mb'
}));



app.post('/', (request, response) => {
    console.log(request.body.resource);
    var data = request.body.data
    if (request.body.resource == 'messages') {
        //send welcome card
        welcome(data)
    }
    if (request.body.resource == 'attachmentActions') {

    }
    response.end();
})

function welcome(data) {

    if (data.text) {
        console.log(data.text)
        //var myHeaders = new Headers();

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://webexapis.com/v1/messages", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', process.env.TOKEN_BEARER);
        xhr.send(JSON.stringify({
            "toPersonEmail": data.personEmail,
            "text": "test from postman",
            "attachments": [{
                "contentType": "application/vnd.microsoft.card.adaptive",
                "content": {
                    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                    "type": "AdaptiveCard",
                    "version": "1.2",
                    "body": [{
                            "type": "TextBlock",
                            "text": "Bot assistant Security team",
                            "size": "Large",
                            "weight": "Bolder"
                        },
                        {
                            "type": "TextBlock",
                            "text": "Hi! I am SEC-BOT, I am a bot that can help you solve some",
                            "isSubtle": true
                        },
                        {
                            "type": "TextBlock",
                            "text": "inquires about working in Sykes, the cisco security team and",
                            "isSubtle": true,
                            "spacing": "None"
                        },
                        {
                            "type": "TextBlock",
                            "text": "also help you with you cases give you some basic ",
                            "isSubtle": true,
                            "spacing": "None"
                        },
                        {
                            "type": "TextBlock",
                            "text": " troubleshooting steps.",
                            "isSubtle": true,
                            "spacing": "None"
                        },
                        {
                            "type": "TextBlock",
                            "text": "Tell me. How can I help you today?"
                        }
                    ],
                    "actions": [{
                            "type": "Action.Submit",
                            "title": "Sykes",
                            "data": {
                                "action": "sykes"
                            }
                        },
                        {
                            "type": "Action.Submit",
                            "title": "Security team",
                            "data": {
                                "action": "sec"
                            }
                        },
                        {
                            "type": "Action.Submit",
                            "title": "Troubleshoting",
                            "data": {
                                "action": "ts"
                            }
                        }
                    ]
                }
            }]
        }));
        xhr.onload = function () {
            console.log("HELLO")
            console.log(this.responseText);
            var data = JSON.parse(this.responseText);
            console.log(data);
        }
        /* var myHeaders = new fetch.Headers();
        myHeaders.append("Authorization", process.env.TOKEN_BEARER);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "toPersonEmail": data.personEmail,
            "text": "test from postman",
            "attachments": [{
                "contentType": "application/vnd.microsoft.card.adaptive",
                "content": {
                    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                    "type": "AdaptiveCard",
                    "version": "1.2",
                    "body": [{
                            "type": "TextBlock",
                            "text": "Bot assistant Security team",
                            "size": "Large",
                            "weight": "Bolder"
                        },
                        {
                            "type": "TextBlock",
                            "text": "Hi! I am SEC-BOT, I am a bot that can help you solve some",
                            "isSubtle": true
                        },
                        {
                            "type": "TextBlock",
                            "text": "inquires about working in Sykes, the cisco security team and",
                            "isSubtle": true,
                            "spacing": "None"
                        },
                        {
                            "type": "TextBlock",
                            "text": "also help you with you cases give you some basic ",
                            "isSubtle": true,
                            "spacing": "None"
                        },
                        {
                            "type": "TextBlock",
                            "text": " troubleshooting steps.",
                            "isSubtle": true,
                            "spacing": "None"
                        },
                        {
                            "type": "TextBlock",
                            "text": "Tell me. How can I help you today?"
                        }
                    ],
                    "actions": [{
                            "type": "Action.Submit",
                            "title": "Sykes",
                            "data": {
                                "action": "sykes"
                            }
                        },
                        {
                            "type": "Action.Submit",
                            "title": "Security team",
                            "data": {
                                "action": "sec"
                            }
                        },
                        {
                            "type": "Action.Submit",
                            "title": "Troubleshoting",
                            "data": {
                                "action": "ts"
                            }
                        }
                    ]
                }
            }]
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://webexapis.com/v1/messages", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
            */
    } 
}

function cards() {

}