var express = require('express');
var router = express.Router();
var app = require('./../app');

/*--- /api/friendsにGETアクションでアクセスしたときの設定 ---*/
router.get('/', function(req, res) {
    
    var sql = 'select * from chatdb.friends where from_uid = ?';
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

/*--- /api/friendsにPOSTアクションでアクセスしたときの設定 ---*/
router.post('/', function(req, res) {
    
    var sql = 'select * from chatdb.users where uid = ?';
    app.connection.query(sql, req.header('Target'), function (error, results, fields) {
        
        if (results == '') {
            console.log('ユーザが存在しない');

            var param = {"値":"POSTメソッドのリクエストに失敗しました"};
            res.header('Content-Type', 'application/json; charset=utf-8')
                .status(421)
                .send(param);
            console.log(req.body);

        } else {
            console.log('ユーザが存在');
            console.log(results);

            sql = 'select * from chatdb.friends where from_uid = ? and to_uid = ?';
            app.connection.query(sql, [req.header('Uid'), req.header('Target')], function(error, results, fields) {

                if (error) {
                    console.log('通信が失敗しました');

                    var param = {"値":"POSTメソッドのリクエストに失敗しました"};
                    res.header('Content-Type', 'application/json; charset=utf-8')
                        .status(503)
                        .send(param);
                    console.log(req.body);
                } else {
                    console.log('通信が成功しました');

                    if (results == '') {
                        console.log('新規追加可能');

                        sql = 'insert into chatdb.friends set ?';
                        var data = {from_uid:req.header('Uid'), to_uid:req.header('Target')};
                        app.connection.query(sql, data, function(error, results, fields) {

                            if (error) {
                                console.log('通信が失敗しました');

                                var param = {"値":"POSTメソッドのリクエストに失敗しました"};
                                res.header('Content-Type', 'application/json; charset=utf-8')
                                    .status(422)
                                    .send(param);
                                console.log(req.body);
                            } else {
                                console.log('通信が成功しました');
                                var param = {"値":"POSTメソッドのリクエストに成功しました"};
                                res.header('Content-Type', 'application/json; charset=utf-8')
                                    .status(200)
                                    .send(param);
                                console.log(results);
                            }
                        });

                    } else {
                        var param = {"値":'すでに友達です'};
                        res.header('Content-Type', 'application/json; charset=utf-8')
                            .status(412)
                            .send(param);
                        console.log(req.body);
                    }
                    
                }
            });
        }
    });
});

//routerをモジュールとして扱う準備
module.exports = router;