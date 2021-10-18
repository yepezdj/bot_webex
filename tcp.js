require('dotenv').config();
const express = require('express');
const app = express();
app.listen(50001, () => console.log('Listening at 50001'));
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
        var settings = {
            "url": "https://webexapis.com/v1/messages",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": process.env.TOKEN_BEARER,
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
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
            }),
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    }
}

    function cards() {

    }