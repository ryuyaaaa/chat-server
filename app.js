// ライブラリ読み込み
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

const PORT = process.env.PORT || 8080;

// body-parserの設定
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chatdb'
});

connection.connect(function(err) {
    if (err) {
        console.error('error:connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

var router = require('./routes/index');
app.use('/api', router);

app.listen(PORT);
console.log('listen on port ' + PORT);

exports.connection = connection;