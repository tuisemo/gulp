define(['DES1', 'DES2', 'DES3', 'DES4', '脚本tool', '脚本layer'], function() {
    var Passportlogin = function() {
        this.$returnUrl = $('input[name="returnUrl"]'); //跳转地址
        this.$sourceName = $('input[name="sourceName"]'); //跳转地址
        this.$show2FA = $('input[name="show2FA"]'); //true/false=======双因子验证码
        this.$2FAVerifyCode = $('input[name="2FAVerifyCode"]');
        this.$loginKey = $('input[name="loginKey"]');
        this.$loginType = $('input[name="loginType"]');
        this.$password = $('input[name="password"]');
        this.$verifycode = $('input[name="verifycode"]');
        this.$verifycodeimg = $(".verifycodeimg");
        this.$domainName = $('input[name="domainName"]');
        this.$errorMsg = $('span.errorMsg');
    };
    Passportlogin.prototype = {
        init: function() {
            this.listen();
        },
        listen: function() {

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
        login: function(login) {
            var self = this;
            var loginKey = $.trim(self.$loginKey.val());
            var password = $.trim(self.$password.val());

            if (!loginKey || !password) {
                self.$loginKey.focus();
                self.$errorMsg.show().addClass('has-error').html('登录账号或密码不能为空');
                layer.msg('登录账号或密码不能为空');
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
                self.$errorMsg.show().addClass('has-error').html('验证码不允许为空');
                layer.msg('验证码不允许为空');
                return;
            }
            //===============密码加密START===============//

            var desKey = "des55781";
            self.$password.val(self.encryptByDES(password, desKey));

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
                        "time": new Date()
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
            var result = $.trim(oXmlHttp.responseText).split("|"); //IDS返回值格式为text，需要转化
            if (result[0] == 'NO') { //当返回值为"NO|true"则无需双因子验证
                if (result[1] == 'true') {
                    self.loginForm();
                } else { //考虑i厦门是否存在双因子验证场景？
                    self.$errorMsg.show().html('不需要填写双因子验证码，请直接点击登录');
                }
            } else if (true) {
                console.log("error");
            }
        },
        //loginForm
        loginForm: function() {

        }
    };
    window.Passportlogin = new Passportlogin();
});