define(['vue', '脚本commonJS', '脚本MSG'], function(Vue) {

    var app = new Vue({
        el: '.wrap',
        created: function() {
            var that = this;
        },
        data: {
            CodeLogin: true,
            CitizenLogin: true,
            qcodebtn: {
                code: 'https://www.cmpassport.com/images/pc_change.png',
                img: 'https://www.cmpassport.com/images/qrcode_change.png'
            },
            accountMsg: {
                loginKey: '',
                password: '',
                CitizenLogin: true,
                loginCode: {
                    value: '',
                    MsgNum: 401,
                    imgsrc: 'http://www.ixm.gov.cn/ids/admin/abc.code'
                }
            },
            bannerstyle: {
                background: 'url(https://unsplash.it/1500/900?blur&random=' + Math.random() + ')'
            },
            userName: {
                value: '',
                MsgNum: 101
            },
            Tel: {
                value: '',
                MsgNum: 201
            },
            validateCode: {
                value: '',
                MsgNum: 401,
                imgsrc: 'http://www.ixm.gov.cn/dis/passport/authCode/show'
            },
            Password: {
                value: '',
                cvalue: '',
                MsgNum: 501
            },
            inputfile: {
                seen: false,
                src: ""
            },
            sendMsgBtn: {

            }

        },
        methods: {
            //输入框提醒方法
            commonMsg: function(obj, boolean, MsgNum) {
                var that = this;
                var element = $(obj);
                var parents = element.parents('.form-group');
                var next = parents.find('.help-block');
                if (boolean === true) {
                    parents.removeClass("has-success has-warring has-error").addClass('has-success');
                    next.html(MSG["true"]);
                } else {
                    parents.removeClass("has-success has-warring has-error").addClass('has-error');
                    next.html(MSG["false"] + MSG[MsgNum]);
                }
            },
            //输入框复位方法
            commonReset: function(obj) {
                var that = this;
                var element = $(obj.currentTarget);
                var parents = element.parents('.form-group');
                var next = parents.find('.help-block');
                var msgnum = element.attr('data-msgnum');
                parents.removeClass("has-success has-warring has-error");
                next.html(MSG[msgnum]);
            },
            //切换登录类型
            changeLoginType: function() {
                var that = this;
                that.CitizenLogin = !that.CitizenLogin;
            },
            //切换登录方式
            codeLoginType: function() {
                var that = this;
                that.CodeLogin = !that.CodeLogin;
            },
            //用户名唯一性检测
            checkuserName: function(obj) {
                var that = this;
                var element = obj.target;
                var userNameVal = that.userName.value;
                var userNameRE = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
                if (!userNameRE.test(userNameVal)) {
                    that.commonMsg(element, false, 102);
                } else {
                    $.ajax({
                        url: '/api/checkUserAttribute',
                        type: 'post',
                        dataType: 'json',
                        data: {
                            "attributeValue": userNameVal,
                            "attributeName": "userName"
                        },
                        success: function(data) {
                            if (data.code == 200) {
                                that.commonMsg(element, true, 101);
                            } else {
                                that.commonMsg(element, false, 103);
                            }
                        }
                    });
                }
            },
            //手机唯一性校验
            checkTel: function(obj) {
                var that = this;
                var element = obj.target;
                var TelVal = that.Tel.value;
                var telVal = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[2-9])|(18[0-9]))\d{8}$/;
                if (!telVal.test(TelVal)) {
                    that.commonMsg(element, false, 202);
                } else {
                    $.ajax({
                        url: '/api/checkUserAttribute',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            'attributeName': 'mobile',
                            'attributeValue': TelVal
                        },
                        success: function(data) {
                            if (data.code == 200) {
                                that.commonMsg(element, true);
                            } else {
                                that.commonMsg(element, false, 203);
                            }
                        }
                    });
                }
            },
            //图片验证码校验
            checkvalidateCode: function(obj) {
                var that = this;
                var element = obj.target;
                if (that.validateCode.value === '') {
                    return false;
                }
                $.ajax({
                    url: '/api/authCode/check',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        'Code': that.validateCode.value
                    },
                    success: function(data) {
                        if (data.code == 200) {
                            that.commonMsg(element, true);
                        } else {
                            that.commonMsg(element, false, 402);
                        }
                    }
                });
            },
            //刷新图片验证码
            reloadvalidate: function() {
                var that = this;
                that.validateCode.value = '';
                that.validateCode.imgsrc = 'http://www.ixm.gov.cn/dis/passport/authCode/show?random=' + Math.random();
                that.accountMsg.loginCode.value = '';
                that.accountMsg.loginCode.imgsrc = 'http://www.ixm.gov.cn/ids/admin/abc.code?random=' + Math.random();
            },
            //密码安全性校验
            checkpassword: function(obj) {
                var that = this;
                var element = obj.target;
                var pwdVal = that.Password.value;
                var pwdRE = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/;
                if (!pwdRE.test(pwdVal)) {
                    that.commonMsg(element, false, 502);
                } else if (pwdVal.length < 8 || pwdVal.length > 30) {
                    that.commonMsg(element, false, 504);
                } else {
                    $.ajax({
                        url: '/api/checkUserPwd',
                        type: 'GET',
                        dataType: 'text',
                        data: {
                            'userName': that.userName.value || '',
                            'password': pwdVal
                        },
                        success: function(data) {
                            var arr = data.split(",");
                            if (arr[0] === 'success') {
                                that.commonMsg(element, true);
                            } else {
                                that.commonMsg(element, false, 503);
                            }
                        }
                    });
                }
            },
            //再次确认密码
            confirmpwd: function() {
                alert('ok');
            },
            //身份证号格式检测
            checkIDnumber: function(IDnum) {
                if (IDnum.length != 18) {
                    return false;
                }
                if (IDnum[17] == 'x') {
                    IDnum = IDnum.replace('x', 'X');
                }
                //权重数组
                var IDweight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验码数组
                var IDcheckArray = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
                var IDsum = 0;
                var IDmod;
                for (var i = 0; i <= 16; i++) {
                    IDsum += IDnum[i] * IDweight[i];
                }
                IDmod = IDsum % 11;
                if (IDnum[17] == IDcheckArray[IDmod]) {
                    return true;
                } else {
                    return false;
                }

            }
        }
    });
    window.app = app;
});
