define(['脚本tool', '脚本layer'], function() {
    var Passportlogin = function() {
        this.$loginKey = $('input[name="loginKey"]');
        this.$loginType = $('input[name="loginType"]');
        this.$domainName = $('input[name="domainName"]');
    };
    Passportlogin.prototype = {
        init: function() {
            this.listen();
        },
        listen: function() {

        },
        login: function() {
            var self = this;
            var loginKey = self.$loginKey.val();
            self.$loginType.val('userName');
            if (!loginKey) {
            	self.$loginKey.focus();
            	layer.msg('用户名或密码不能为空');
            }
            if (loginKey.length == 11 && (/^\d+$/.test(loginKey))) {
                self.$loginType.val('mobile');
            } else if (loginKey.length == 18 && (/^[0-9]+[\s\S]*$/.test(loginKey))) {
                self.$loginType.val('creditID');
            } else if (loginKey.indexOf("@") >= 0) {
                self.$loginType.val('email');
            }
        }
    }
})