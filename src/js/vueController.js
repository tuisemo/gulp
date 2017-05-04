define(['vue'], function(Vue) {

    var app = new Vue({
        el: '.wrap',
        data: {
            userNameVal: '',
            inputfile: {
                seen: false,
                src: ""
            },
            validate: {
                imgsrc: 'http://www.ixm.gov.cn/dis/passport/authCode/show'
            },
            sendMsgBtn: {

            }

        },
        methods: {
            //用户名唯一性检测
            checkuserName: function() {
                var that = this;
                var userNameVal = that.userNameVal;
                var userNameRE = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
                if (!userNameRE.test(userNameVal)) {
                    console.log('wrong');
                } else {
                    $.ajax({
                        url: '/api',
                        type: 'get',
                        dataType: 'json',
                        data: {
                            'key': '7552c97c9be5d98b8d643249fb2bfb07',
                            'cityname': '%E5%8E%A6%E9%97%A8',
                            'dtype': 'json'
                        },
                        success: function(data) {
                            if (data.result) {
                                console.log('right');
                            } else {
                                console.log('wrong');
                            }
                        }
                    });
                }
            },
            //Ajax-post方式，以base64格式上传图片文件
            uploadpic: function(obj) {
                var that = this;
                var element = obj.target;
                var file = element.files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    app.inputfile.seen = true;
                    app.inputfile.src = reader.result;
                    var imgData = reader.result;
                    $.ajax({
                        url: '/uploadpic',
                        type: 'POST',
                        //contentType: false,
                        //processData: false,
                        data: { imgData: imgData },
                        success: function(data) {
                            console.log(data);
                        }
                    });
                };
            },
            //刷新图片验证码
            reloadvalidate: function() {
                var that = this;
                that.validate.imgsrc = 'http://www.ixm.gov.cn/dis/passport/authCode/show?random=' + Math.random();
            }
        }
        /*,
                components: {
                    'input-username': Vuetemplate.input_username,
                    'input-tel': Vuetemplate.input_tel,
                    'input-validatecode': Vuetemplate.input_validatecode
                }*/
    });
    window.app = app;
});
