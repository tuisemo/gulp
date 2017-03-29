const http = require('http');
const url = require('url');
const querystring = require('querystring');
const express = require('express');
const EXP = express();
const pathName = 'E:/gulp/dist'
    //静态资源文件路由
EXP.use(express.static(pathName + '/'));
EXP.use(express.static(pathName + '/css'));
EXP.use(express.static(pathName + '/js'));
EXP.use(express.static(pathName + '/js/lib'));
EXP.use(express.static(pathName + '/images'));

/*============请求路由===========*/
EXP.get('/', function(req, res) {
    res.send(pathName + '/index.html');
});
//手机校验
EXP.get('/checkTel', function(req, res) {
    var data = url.parse(req.url, true).query;
    var resObj = {};
    var tel = data['tel'];
    if (tel == '18248639098') {
        resObj['result'] = false;
        resObj['msg'] = '此账号已被占用';
        resObj['data'] = '';
    } else {
        resObj['result'] = true;
        resObj['msg'] = '';
        resObj['data'] = '';
    };
    res.json(resObj);
});
//
EXP.post('/sever/data', function(req, res) {
    res.send('this is post request');
});

//预置404
EXP.use(function(req, res, next) {
    res.status(404).sendFile(pathName + '/404.html');
});
var server = EXP.listen(3000, '127.0.0.1', function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
