define(['脚本tool', '脚本layer'], function() {
    var Passport = function() {
        this.wait = 10;
        this.timeBoo = true;
        this.$userName = $('input[name="userName"]');
        this.$mobile = $('input[name="mobile"]');
        this.$validateCode = $('input[name="validateCode"]');
        this.$sendmsgBtn = $("#sendmsg");
        this.$msgCode = $('input[name="msgCode"]');
        this.$codeimg = $(".codeimg");
        this.$reloadBtn = $(".reloadBtn");
        this.$Password = $('input[name="password"]');
        this.$FPassword = $("#FPassword");
        this.$CPassword = $("#CPassword");
        this.$SubmitBtn = $("#submit");
        this.$Check = $("#check"); //服务协议勾选
        this.$forgetInput = $("#forgetInput");
        this.$ForgetBtn = $("#ForgetBtn");
        this.$infoSpan = $('span.help-block');
        this.init();
    };
    Passport.prototype = {
        init: function() {
            this.scan(this.$infoSpan);
            this.listen();
        },
        //对象扫描，提示信息复位功能
        scan: function(elements) {
            var self = this;
            console.time();
            $(elements).each(function(index,element) {
                $(element).html(MSG[$(element).attr('data-msg')]);
            });
            console.timeEnd();
        },
        //捕获提示对象span
        catchspan: function(element) {
            return $(element).parents('.form-group').find('.help-block');
        },
        //对象时间监听
        listen: function() {
            var self = this;
            self.$userName.on("blur", function() {
                self.checkuserName();
            }).on("focus", function() {
                self.removeClass(this);
                self.scan(self.catchspan(this));
            });
            self.$mobile.on("blur", function() {
                self.checkTel();
            }).on("focus", function() {
                self.removeClass(this);
                self.scan(self.catchspan(this));
            });
            self.$validateCode.on("focus", function() {
                self.removeClass(this);
                self.scan(self.catchspan(this));
            });
            self.$codeimg.on("click", function() {
                self.reloadvalidate();
            });
            self.$reloadBtn.on("click", function() {
                self.reloadvalidate();
            });
            //==========短信发送按钮监听============
            self.$sendmsgBtn.on("click", function(event) {
                self.sendMsgFor($(this).attr('data-type'), $(this).attr('data-domainname'));
            });
            self.$msgCode.on("focus", function() {
                self.removeClass(this);
                self.scan(self.catchspan(this));
            });
            self.$FPassword.on("blur", function() {
                self.checkpassword();
            });
            self.$CPassword.on("blur", function() {
                self.confirmpwd();
            });
            self.$Password.on("focus", function() {
                self.removeClass(this);
                self.scan(self.catchspan(this));
            });
            self.$SubmitBtn.on("click", function() {
                self.SignUp();
            });
            self.$ForgetBtn.on("click", function() {
                self.ForgetAccount();
            });
        },
        //操作结果通用提示工具
        optMsg: function(Obj, boolean, MSGnum) {
            if (boolean === true) {
                Obj.parents('.form-group').addClass('has-success')
                    .find('.help-block').html(MSG["true"]);
            } else {
                Obj.parents('.form-group').addClass('has-error')
                    .find('.help-block').html(MSG["false"] + MSG[MSGnum]);
            }
        },
        //提示复位清除样式
        removeClass: function(Obj) {
            $(Obj).parents('.form-group').removeClass("has-success has-warring has-error");
        },
        Timesetter: function(o) {
            var self = this;
            this.timeBoo = false;
            if (self.wait === 0) {
                $("#msgtimer").html("发送校验码").hide();
                $("#sendmsg").show();
                self.wait = 10;
                self.timeBoo = true;
            } else {
                if (self.wait == 10) {
                    $("#sendmsg").hide();
                    $("#msgtimer").show();
                }
                $("#msgtimer").html(self.wait + "秒后再重试");
                self.wait--;
                setTimeout(function() {
                    self.Timesetter(o);
                }, 1000);
            }
        },
        //用户名唯一性校验
        checkuserName: function() { //定义功能函数
            var self = this;
            var userNameVal = self.$userName.val();
            var userNameRE = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
            if (!userNameRE.test(userNameVal)) {
                self.optMsg(self.$userName, false, 1003);
            }
        },
        //手机唯一性校验
        checkTel: function() {
            var self = this;
            var TelVal = self.$mobile.val();
            var telVal = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[2-9])|(18[0-9]))\d{8}$/;
            if (!telVal.test(TelVal) || TelVal.length != 11) {
                self.optMsg(self.$mobile, false, 2003);
            }
        },
        //刷新图片验证码
        reloadvalidate: function() {
            var self = this;
            self.$validateCode.val("");
            self.$codeimg.attr('src', 'http://ixm.terton.com.cn/dis/passport/authCode/show?' + Math.random());
            validateTrue = false;
        },
        //密码安全性校验
        checkpassword: function() {
            var self = this;
            var pwdVal = self.$FPassword.val();
            var pwdRE1 = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/;
            var pwdRE2 = /^[A-Za-z0-9`~!@#\$%\^&\*\(\)_\+-=\[\]\{\}\\\|;:'"<,>\.\?\/]{8,30}$/;
            if (!(pwdRE1.test(pwdVal) && pwdRE2.test(pwdVal))) {
                self.optMsg(self.$FPassword, false, 6001);
            } else {
                $.ajax({
                    url: '/dis/ids/checkUserPwd',
                    type: 'GET',
                    dataType: 'json',
                    cache: false,
                    data: {
                        'userName': self.$userName.val() || '',
                        'password': self.$FPassword.val()
                    },
                    success: function(data) {
                        if (data.result) {
                            self.optMsg(self.$FPassword, true);
                        } else {
                            tools.msg(data);
                            self.optMsg(self.$FPassword, false, 6002);

                        }
                    }
                });
            }
        },
        //再次确认密码
        confirmpwd: function() {
            var self = this;
            if (self.$FPassword.val() != self.$CPassword.val()) {
                self.optMsg(self.$FPassword, false, 6003);
                self.optMsg(self.$CPassword, false, 6003);
            } else {
                self.removeClass(self.$FPassword);
                self.checkpassword();
            }
        },
        /*==================================*/
        sendMsgFor: function(operationType, domainName, sendType) {
            var self = this;
            if (!(self.timeBoo)) {
                return false;
            } else {
                $.ajax({
                        url: "/dis/passport/sendMsg",
                        dataType: "json",
                        async: true,
                        cache: false,
                        data: {
                            "operationType": operationType,
                            "domainName": domainName,
                            "sendType": sendType,
                            "mobile": self.$mobile.val() || "",
                            "code": self.$validateCode.val() || "",
                        },
                        type: "POST",
                        success: function(data) {
                            if (data.code == 200 || data.result) {
                                $("#msgtimer").hide();
                                $("#sendmsg").show();
                                self.Timesetter();
                                return;
                            }
                            tools.msg(data);
                        },
                        error: function(data) {
                            layer.msg('请求出错，请稍后重试');
                            return;
                        }
                    })
                    .done(function(data) {});
            }
        },
        //身份证号格式检测
        checkIDnumber: function(IDnum) {
            var self = this;
            if (IDnum.length != 18) {
                self.optMsg(self.$certificateNum, false, 'IdReg');
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
                self.optMsg(self.$certificateNum, false, 'IdReg');
            }
        },
        /*================市民注册==================*/
        SignUp: function() {
            var self = this;
            if (!self.$Check.is(':checked')) {
                layer.msg('请勾选通行证协议');
                return;
            }
            var attributeValue = self.$userName.val() + ";" + self.$mobile.val();
            $.ajax({
                url: "dis/passport/checkUserAttribute",
                dataType: "json",
                async: true,
                data: {
                    "attributeValue": attributeValue,
                    "attributeName": "userName;mobile",
                    "domainName": "Citizen"
                },
                type: "POST"
            }).done(function(data) {
                if (data.code == 200 || data.result) {
                    $.ajax({
                        url: 'dis/passport/reg',
                        type: 'POST',
                        dataType: 'json',
                        cache:false,
                        data: {
                            domainName: "Citizen",
                            userName: self.$userName.val() || '',
                            mobile: self.$mobile.val() || '',
                            validateCode: self.$validateCode.val() || '',
                            msgCode: self.$msgCode.val() || '',
                            password: self.$Password.val() || '',
                            confirm_password: self.$CPassword.val() || ''
                        },
                        success: function(data) {
                            if (data.result) {
                                window.location = '/KILL-IE.html';
                            } else {
                                console.time();
                                $(data.data).each(function(index,e){
                                    tools.msg(e);
                                });
                                console.timeEnd();
                            }
                        }
                    });

                } else {
                    tools.msg(data);
                }
            }).fail(function(error) {
                console.log(error);
                layer.msg('请求出错，请稍后重试');
                return;
            });
        },
        /*===============找回密码===================*/
        ForgetAccount: function(domainName) {
            var self = this;
            $.ajax({
                url: '/dis/passport/checkUser',
                type: 'POST',
                dataType: 'json',
                data: {
                    "userName": self.$forgetInput.val(),
                    "code": self.$validateCode.val(),
                    "domainName": domainName
                },
                success: function(data) {
                    if (data.code === 200 || data.result) {
                        $('form').submit();
                    } else {
                        tools.msg(data);
                    }
                },
                error: function(error) {
                    layer.msg('请求出错，请稍后重试');
                    return;
                }
            });
        }
    };
    window.Passport = new Passport();
});