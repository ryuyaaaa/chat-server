var express = require('express');
var router = express.Router();
var app = require('./../app');

/*--- /api/roomsにGETアクションでアクセスしたときの設定 ---*/
router.get('/', function(req, res) {
    res.json({
        message:'rooms/get'
    });
});

/*--- /api/rooms/にPOSTアクションでアクセスしたときの設定 ---*/
router.post('/', function(req, res) {

    var sql = 'select * from chatdb.rooms where from_id = ? and to_id = ?';
    app.connection.query(sql, [req.body.from_id, req.body.to_id], function (error, results, fields) {
        
        if (results == '') {
            console.log('新規追加可能');

            // 新規追加可能であるとき
            sql = 'insert into chatdb.rooms set ?';
            var data = {from_id:req.body.from_id, to_id:req.body.to_id};
            app.connection.query(sql, data, function(error, results, fields) {

                if (error) {
                    console.log('通信が失敗しました');

                    var param = {"値":"POSTメソッドのリクエストに失敗しました"};
                    res.header('Content-Type', 'application/json; charset=utf-8')
                        .status(503)
                        .send(param);
                    console.log(req.body);
                } else {
                    console.log('通信が成功しました');
                    var param = {"from_id":req.body.from_id, "to_id":req.body.to_id};
                    res.header('Content-Type', 'application/json; charset=utf-8')
                        .status(200)
                        .send(param);
                    console.log(results);
                }
            });

        } else {
            console.log('ルームが既に存在');
            console.log(results);

            var param = {"値":"POSTメソッドのリクエストに失敗しました"};
            res.header('Content-Type', 'application/json; charset=utf-8')
                .status(400)
                .send(param);
            console.log(req.body);
        }
    });
});

/*--- /api/users/loginにGETアクションでアクセスしたときの設定 ---*/
router.post('/login', function(req, res) {

    var sql = 'select * from chatdb.users where email = ? and password = ?';
    app.connection.query(sql, [req.body.email, req.body.password], function (error, results, fields) {
        
        if (results == '') {
            console.log('データが存在しません');

            var param = {"値":"POSTメソッドのリクエストに失敗しました"};
            res.header('Content-Type', 'application/json; charset=utf-8')
                .status(401)
                .send(param);
            console.log(req.body);

        } else {
            // ログイン可能
            console.log('ログイン可能');
            console.log(results);

            var param = {"値":"POSTメソッドのリクエストに成功しました"};
            res.header('Content-Type', 'application/json; charset=utf-8')
                .status(200)
                .send(param);
            console.log(req.body);
        }
    });
});

//routerをモジュールとして扱う準備
module.exports = router;
