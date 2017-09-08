define(['脚本tools'], function() {
    var Passportlogin = function() {
        this.$returnUrl = $('input[name="returnUrl"]'); //跳转地址
        this.$sourceName = $('input[name="sourceName"]'); //跳转地址
        this.$show2FA = $('input[name="show2FA"]'); //true/false=======双因子验证码
        this.$Boxof2FA = $('#Boxof2FA'); //双因子验证容器
        this.$2FAVerifyCode = $('input[name="2FAVerifyCode"]'); //双因子验证码输入框
        this.$Btn2FA = $('#Btn2FA'); //双因子获取按钮
        this.$loginKey = $('input[name="loginKey"]');
        this.$loginType = $('input[name="loginType"]');
        this.$Password = $('input[name="password"]');
        this.$verifycode = $('input[name="verifycode"]');
        this.$codeimg = $(".codeimg");
        this.$reloadBtn = $(".reloadBtn");
        this.$domainName = $('input[name="domainName"]');
        this.$errorMsg = $('span.errorMsg');
        this.$submit = $('#submit');
        this.baseUrl = tools.baseUrl;
        this.init();
    };
    Passportlogin.prototype = {
        init: function() {
            this.listen();
        },
        listen: function() {
            var self = this;
            self.$reloadBtn.on('click', function() {
                self.reloadvalidate();
            });
            self.$Btn2FA.on('click', function() {
                self.send2FAVerifyCode('false');
            });
            self.$submit.on('click', function() {
                var opt = $(this).attr('data-type');
                self.send2FAVerifyCode('true');
            });
            $('body').keydown(function(event) { //监听键盘事件======回车提交表单
                if (event.keyCode == 13) {
                    self.send2FAVerifyCode('true');
                }
            });
            $('input').on('focus', function() {
                self.$errorMsg.hide().removeClass('text-danger').html('');
            });

        },
        //刷新图片验证码
        reloadvalidate: function() {
            var self = this;
            self.$verifycode.val("");
            self.$codeimg.attr('src', self.baseUrl + '/ids/admin/abc.code?' + Math.random());
        },
        send2FAVerifyCode: function(login) {
            var self = this;
            var loginKey = $.trim(self.$loginKey.val());
            var Password = $.trim(self.$Password.val());

            if (!loginKey) {
                self.$loginKey.focus();
                self.$errorMsg.show().addClass('text-danger').html('登录账号不能为空');
                return;
            }
            if (!Password) {
                self.$Password.focus();
                self.$errorMsg.show().addClass('text-danger').html('密码不能为空');
                return;
            }
            //正则表达式判别用户登录账号类型==用户名/手机/邮箱/身份证
            self.$loginType.val('userName');
            if (loginKey.length == 11 && (/^\d+$/.test(loginKey))) {
                self.$loginType.val('mobile');
            } else if (tools.checkIDnumber(loginKey)) { //严谨校验用户输入是否为有效身份证
                self.$loginType.val('creditID');
            } else if (loginKey.indexOf("@") >= 0) {
                self.$loginType.val('email');
            }
            //ids配置外部来源用户=====可默认填写ids_internal
            if (!self.$sourceName.val()) {
                self.$sourceName.val('ids_internal');
            }
            //图片验证码默认必填
            if (!self.$verifycode.val()) {
                self.$verifycode.focus();
                self.$errorMsg.show().addClass('text-danger').html('验证码不允许为空');
                layer.msg('验证码不允许为空');
                return;
            }

            var loginType = self.$loginType.val();
            var sourceName = self.$sourceName.val();
            var domainName = self.$domainName.val();
            var FAValue = self.$2FAVerifyCode.val(); //双因子验证
            var verifycode = self.$verifycode.val(); //图片验证

            //发起请求查询是否需要双因子验证
            var loginAjax = $.ajax({
                    url: '/ids/admin/sendVerifyCodeFor2FA.jsp',
                    type: 'POST',
                    dataType: 'text',
                    data: {
                        "loginType": loginType,
                        "loginKey": loginKey,
                        "password": tools.encryptByDES(self.$Password.val()), //加密密码
                        "sourceName": sourceName,
                        "domainName": domainName,
                        "login": login,
                        "FAValue": FAValue,
                        "verifycode": verifycode,
                        "time": new Date().getTime()
                    },
                })
                .done(function(oXmlHttp) {
                    self.checkUserFinish(oXmlHttp);
                })
                .fail(function() {
                    layer.msg('请求出错，请稍后重试');
                    console.log("error");
                });
        },
        checkUserFinish: function(oXmlHttp) {
            var self = this;
            var result = $.trim(oXmlHttp).split("|"); //IDS返回值格式为text，需要转化
            if (result[0] == 'NO') { //result[0]为提示语，当返回值结果为NO|true时，表示通过验证
                if (result[1] == 'true') {
                    self.loginForm();
                } else { //当返回值result[1]为false时，表示无需双因子验证，可直接登录                 
                    self.$errorMsg.show().addClass('text-danger').html('不需要填写双因子验证码，请直接点击登录');
                    return;
                }
            } else if (oXmlHttp.indexOf("YES") < 0) {
                if (self.$loginType.val() == "creditID") {
                    if (result[2] == 1011) {
                        self.$errorMsg.show().addClass('text-danger').html('该身份证尚未被注册');
                    }
                    if (result[2] == 1020) {
                        self.$errorMsg.show().addClass('text-danger').html('密码不正确');
                    }
                }
                self.$errorMsg.show().addClass('text-danger').html(result[0]);//一般是验证码错误
                self.reloadvalidate();
                layer.msg(result[0]);
                if ((result[2] == 1056 || result[2] == 1052)) {
                    //密码太弱？
                    if (false) { //什么情况下才会显示密码弱要求跳转修改？？
                        window.location.href = self.baseUrl + "/dis/ids/tochangepwd&errCode=" + result[2] +
                            "&loginKey=" + self.$loginKey.val() +
                            "&loginType=" + self.$loginType.val() +
                            "&returnUrl=" + self.$returnUrl.val();
                    }
                } else return false;
            } else { //必须获取双因子验证执行登录                
                if (result[2] == "true") {
                    self.$Boxof2FA.show();
                    self.$errorMsg.show().html('需要输入双因子验证码，请点击获取');
                    self.reloadvalidate();
                    return;
                }
                if (!self.$Boxof2FA.is(':hidden')) {
                    if (result[2] == "true") {
                        if (!self.$2FAVerifyCode.val()) {
                            self.$errorMsg.show().addClass('text-danger').html('请填写双因子验证码');
                            self.reloadvalidate();
                        } else {
                            self.loginForm();
                            return;
                        }
                    } else {
                        self.$errorMsg.show().addClass('text-danger').html(result[1]);
                        self.reloadvalidate();
                        return;
                    }
                }
            }
        },
        //执行表单提交
        loginForm: function() {
            var self = this;
            //===============密码加密START===============//
            var Password = self.$Password.val();
            self.$Password.val(tools.encryptByDES(Password));
            //===============密码加密END===============// 
            $('form').submit();
        }
    };
    window.Passportlogin = new Passportlogin();
});