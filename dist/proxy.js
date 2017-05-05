/*已迁移至Express4*/
const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');
const request = require('request');//解决服务请求转发
//const multer = require('multer'); 
const EXP = express();
const pathName = 'E:/gulp/dist'
    //静态资源文件路由
EXP.use(express.static(pathName + '/'));
EXP.use(express.static(pathName + '/css'));
EXP.use(express.static(pathName + '/js'));
EXP.use(express.static(pathName + '/js/lib'));
EXP.use(express.static(pathName + '/images'));
EXP.use(bodyParser.json({ limit: '50mb' }));
EXP.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
//EXP.use(multer());
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
//豆瓣电影搜索
/*EXP.get('https://api.douban.com/v2/movie/search', function(req, res) {
    req.pipe(request.post(url, { form: req.body })).pipe(res);
    res.send();
});*/
//跨域请求
EXP.get('/api', function(req, res) {
    console.log(req.url);
    var url='http://www.ixm.gov.cn/dis/passport/authCode/check';
    req.pipe(request(url)).pipe(res);
});

//预置404
EXP.use(function(req, res, next) {
    res.status(404).sendFile(pathName + '/404.html');
});
var server = EXP.listen(8080, '127.0.0.1', function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
