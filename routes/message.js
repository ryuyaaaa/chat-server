var express = require('express');
var router = express.Router();
var app = require('./../app');

/*--- /api/messagesにGETアクションでアクセスしたときの設定 ---*/
router.get('/', function(req, res) {
    res.json({
        message:'messages/get'
    });
});

/*--- /api/messagesにPOSTアクションでアクセスしたときの設定 ---*/
router.post('/', function(req, res, next) {

    // データをDBに格納
    var sql = 'insert into chatdb.messages set ?';
    var data = {from_uid:req.body.from_uid, to_uid:req.body.to_uid, content:req.body.content};
    app.connection.query(sql, data,function(err, results, fields) {
        
        if (err) {
            console.error("通信に失敗しました");
        } else {
            console.log("通信が成功しました");

            console.log(results);

            //DB切断 (切る必要ない)
            // app.connection.end(function(err) {
            //     if(err){
            //         console.log(err);//DB切断エラーログ
            //     }
            // });
        }
    });

    var param = {"値":"POSTメソッドのリクエストを受け付けました","bodyの値":req.body};
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.send(param);
});

//routerをモジュールとして扱う準備
module.exports = router;
