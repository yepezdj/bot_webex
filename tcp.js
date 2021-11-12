require('dotenv').config();
//const fetch = require('node-fetch');
var XMLHttpRequest = require('xhr2');
var xhr = new XMLHttpRequest();
const express = require('express');
const mysql = require('mysql');
const app = express();
app.listen(50001, () => console.log('Listening at 50001!'));
app.use(express.static('public'));
app.use(express.json({
    limit: '5mb'
}));


let database = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

database.connect(function (err) {
    if (err) throw err;
    console.log("Database connected");
});



app.post('/', (request, response) => {
    console.log(request.body.resource);
    var data = request.body.data
    if (request.body.resource == 'messages') {
        verify(data)
    }
    if (request.body.resource == 'attachmentActions') {
        get_card(data)
    }
    response.end();
});

function verify(data) {
    var email = data.personEmail;
    let sql = `SELECT * FROM users WHERE email LIKE '${email}'`;
    let query = database.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        //Verify if user exist in DB
        if (Array.isArray(result) && result.length) {
            console.log('pistola');
            var now = Date.now();
            var dif = now - result[0].timestamp;
            //Verify last interaction
            if (dif >= 300000) {
                let sql2 = `UPDATE users SET timestamp ='${now}' WHERE email ='${email}'`;
                database.query(sql2, function (err, result) {
                    if (err) throw err;
                });
                welcome(data);
            }
        } else {
            console.log('no pistola')
            database.connect(function (err) {
                let post = {
                    email: data.personEmail,
                    timestamp: parseInt(Date.now())
                };
                let sql1 = 'INSERT INTO users SET ?';
                database.query(sql1, post, function (err, result) {
                    if (err) throw err;
                });
            });
            welcome(data);
            ////si quieres pon que ya está chateando con el bot
        }
    });
}

function welcome(data) {

    var attach

    let sql = `SELECT * FROM actions WHERE idactions = 10`;
    let query = database.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        attach = JSON.parse(result[0].content)

        if (data.text) {
            xhr.open("POST", "https://webexapis.com/v1/messages", true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Authorization', process.env.TOKEN_BEARER);
            xhr.send(JSON.stringify({
                "toPersonEmail": data.personEmail,
                "text": "Message",
                "attachments": attach
            }));
        }
    });

}

function get_card(data) {
    var attach2
    var action = data.inputs.action
    console.log(action);

    let sql = `SELECT * FROM actions WHERE keyword = '${action}'`;
    let query = database.query(sql, (err, result2) => {
        if (err) {
            throw err;
        }
        attach2 = JSON.parse(result2[0].content)

        if (data.type == 'submit') {
            console.log('a')
            xhr.open("POST", "https://webexapis.com/v1/messages", true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Authorization', process.env.TOKEN_BEARER);
            xhr.send(JSON.stringify({
                "roomId": data.roomId,
                "text": "Message",
                "attachments": attach2
            }));
        }
    });

}
