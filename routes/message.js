var express = require('express');
var router = express.Router();
var app = require('./../app');

/*--- /api/messagesにGETアクションでアクセスしたときの設定 ---*/
router.get('/', function(req, res) {

    var sql = 'select * from chatdb.messages where from_uid = ? or from_uid = ?';
    app.connection.query(sql, [req.header('Uid'), req.header('toUid')], function (error, results, fields) {
        
        if (error) {
            console.log('通信に失敗しました');
            console.log(error);
            var param = {"値":"GETメソッドのリクエストに失敗しました"};
            res.header('Content-Type', 'application/json; charset=utf-8')
                .status(503)
                .send(param);
            console.log(req.body);
        } else {
            console.log('通信に成功しました');
            console.log(results);
            var param = {results};
            res.header('Content-Type', 'application/json; charset=utf-8')
                .status(200)
                .send(param);
        }

    });
});

/*--- /api/messagesにPOSTアクションでアクセスしたときの設定 ---*/
router.post('/', function(req, res, next) {

    sql = 'insert into chatdb.messages set ?';
    var data = {from_uid:req.header('Uid'), to_uid:req.header('toUid'), content:req.body.content};
    app.connection.query(sql, data, function(error, results, fields) {

        if (error) {
            console.log('通信が失敗しました');
            console.log(error);

            var param = {"値":"POSTメソッドのリクエストに失敗しました"};
            res.header('Content-Type', 'application/json; charset=utf-8')
                .status(503)
                .send(param);
            console.log(req.body);
        } else {
            console.log('通信が成功しました');
            var param = {results};
            res.header('Content-Type', 'application/json; charset=utf-8')
                .status(200)
                .send(param);
            console.log(results);
        }
    });
});

//routerをモジュールとして扱う準備
module.exports = router;
