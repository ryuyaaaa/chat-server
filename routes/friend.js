var express = require('express');
var router = express.Router();
var app = require('./../app');

/*--- /api/friendsにGETアクションでアクセスしたときの設定 ---*/
router.get('/', function(req, res) {
    
    var sql = 'select * from chatdb.users where uid = ?';
    app.connection.query(sql, req.header('Uid'), function (error, results, fields) {
        
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

/*--- /api/friendsにPATCHアクションでアクセスしたときの設定 ---*/
router.post('/', function(req, res) {
    
    var sql = 'update users set name = ?, comment = ? where uid = ?';
    app.connection.query(sql, [req.body.name, req.body.comment, req.header('Uid')], function (error, results, fields) {
        
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