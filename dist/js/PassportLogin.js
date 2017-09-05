define([ /*'DES1','DES2','DES3','DES4',*/ '脚本tool', '脚本layer'], function() {
    var Passportlogin = function() {
        this.$returnUrl = $('input[name="returnUrl"]'); //跳转地址
        this.$sourceName = $('input[name="sourceName"]'); //跳转地址
        this.$show2FA = $('input[name="show2FA"]'); //true/false=======双因子验证码
        this.$Boxof2FA = $('#Boxof2FA'); //双因子验证容器
        this.$2FAVerifyCode = $('input[name="2FAVerifyCode"]'); //双因子验证码输入框
        this.$Btn2FA = $('#Btn2FA'); //双因子获取按钮
        this.$loginKey = $('input[name="loginKey"]');
        this.$loginType = $('input[name="loginType"]');
        this.$password = $('input[name="password"]');
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
                    self.login(true);
                }
            });
            $('input').on('focus', function() {
                self.$errorMsg.hide().removeClass('text-danger').html('');
            });

        },
        //DES密码加密
        encryptByDES: function(message, key) {
            var keyHex = CryptoJS.enc.Utf8.parse(key);
            var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            return encrypted.toString();
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
            var password = $.trim(self.$password.val());

            if (!loginKey) {
                self.$loginKey.focus();
                self.$errorMsg.show().addClass('text-danger').html('登录账号不能为空');
                //layer.msg('登录账号或密码不能为空');
                return;
            }
            if (!password) {
                self.$password.focus();
                self.$errorMsg.show().addClass('text-danger').html('密码不能为空');
                //layer.msg('登录账号或密码不能为空');
                return;
            }
            //正则表达式判别用户登录账号类型==用户名/手机/邮箱/身份证
            self.$loginType.val('userName');
            if (loginKey.length == 11 && (/^\d+$/.test(loginKey))) {
                self.$loginType.val('mobile');
            } else if (loginKey.length == 18 && (/^[0-9]+[\s\S]*$/.test(loginKey))) {
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
            //===============密码加密START===============//

            var desKey = "des55781";
            password = self.encryptByDES(password, desKey);
            self.$password.val(password);

            //===============密码加密END===============//

            var loginType = self.$loginType.val();
            var sourceName = self.$sourceName.val();
            var domainName = self.$domainName.val();
            var FAValue = self.$2FAVerifyCode.val();
            var verifycode = self.$verifycode.val();

            //发起请求查询是否需要双因子验证
            var loginAjax = $.ajax({
                    url: '/ids/admin/sendVerifyCodeFor2FA.jsp',
                    type: 'POST',
                    dataType: 'text',
                    data: {
                        "loginType": loginType,
                        "loginKey": loginKey,
                        "password": password,
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
            if (result[0] == 'NO') { //当返回值为"NO|true"则无需双因子验证
                if (result[1] == 'true') {
                    self.loginForm();
                } else { //考虑i厦门是否存在双因子验证场景？                	
                    //self.$errorMsg.show().html('不需要填写双因子验证码，请直接点击登录');
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
                self.$errorMsg.show().addClass('text-danger').html(result[0]);
                layer.msg(result[0]);
                if (result[2] == 1056 || result[2] == 1052) {
                    //密码太弱？
                    if (false) { //什么情况下才会显示密码弱要求跳转修改？？
                        window.location.href = self.baseUrl + "/dis/ids/tochangepwd&errCode=" + result[2] +
                            "&loginKey=" + self.$loginKey.val() +
                            "&loginType=" + self.$loginType.val() +
                            "&returnUrl=" + self.$returnUrl.val();
                    }
                }
            } else { //必须获取双因子验证执行登录
                var login = result[2];
                if (result[2] == "true") {
                    self.$Boxof2FA.show();
                    self.$errorMsg.show().html('需要输入双因子验证码，请点击获取');
                    self.reloadvalidate();
                    return;
                }
                if (!self.$Boxof2FA.is(':hidden')) {
                    if (login == "true") {
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
        //loginForm
        loginForm: function() {
            var self = this;
            if (!self.$verifycode.val()) {
                self.$verifycode.focus();
                self.$errorMsg.show().addClass('text-danger').html('请填写图片验证码');
                return;
            } else {
                $('form').submit();
            }
        }
    };
    window.Passportlogin = new Passportlogin();
});