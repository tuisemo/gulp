const formidable = require('formidable');
const util = require('util');
const fs = require('fs');
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
//文件上传组件
EXP.post('/upload', function(req, res) {
    // parse a file upload  
    var form = new formidable.IncomingForm(),
        files = [],
        fields = [],
        docs = [];
    console.log('start upload');

    //存放目录  
    form.uploadDir = 'tmp/';

    form.on('field', function(field, value) {
        //console.log(field, value);  
        fields.push([field, value]);
    }).on('file', function(field, file) {
        console.log(field, file);
        files.push([field, file]);
        docs.push(file);


        var types = file.name.split('.');
        var date = new Date();
        var ms = Date.parse(date);
        fs.renameSync(file.path, "tmp/files" + ms + '_' + file.name);
    }).on('end', function() {
        console.log('-> upload done');
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        var out = {
            Resopnse: {
                'result-code': 0,
                timeStamp: new Date(),
            },
            files: docs
        };
        var sout = JSON.stringify(out);
        res.end(sout);
    });

    form.parse(req, function(err, fields, files) {
        err && console.log('formidabel error : ' + err);

        console.log('parsing done');
    });

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
