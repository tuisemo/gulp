define(['脚本MSG'], function() {

    var CheckFunc = function() {
        this.$userName = $("#userName");
        this.$Tel = $("input[type='tel']");
        this.$Email = $("input[type='email']");
        this.$validateCode = $("#validateCode");
        this.$codeimg = $("#codeimg");
        this.$reloadBtn = $("#reloadBtn");
        this.$Password = $(".password");
        this.$SubmitBtn = $("#submit");
        this.$FileUploadBtn = $("#FileUploadBtn");
        this.init(); //定义声明，默认执行函数
    };
    CheckFunc.prototype = {
        init: function() { //默认执行的函数功能汇总
            this.listen();
        },
        //操作结果通用提示工具
        optMsg: function(Obj, boolean, MSGnum) {
            if (boolean === true) {
                Obj.parents('.form-group').addClass('has-success');
                Obj.next('.help-block').html(MSG["true"]);
            } else {
                Obj.parents('.form-group').addClass('has-error');
                Obj.next('.help-block').html(MSG["false"] + MSG[MSGnum]);
            }
        },
        //用户名唯一性校验
        checkuserName: function() { //定义功能函数
            var that = this;
            var userNameVal = that.$userName.val();
            var userNameRE = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
            if (!userNameRE.test(userNameVal)) {
                that.optMsg(that.$userName, false, "102");
            } else {
                $.ajax({
                    url: '/checkTel',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        'attributeName': 'userName',
                        'attributeValue': userNameVal
                    },
                    success: function(data) {
                        if (data.result) {
                            that.optMsg(that.$userName, true);
                        } else {
                            that.optMsg(that.$userName, false, 202);
                        }
                    }
                });
            }
        },
        //手机唯一性校验
        checkTel: function() {
            var that = this;
            var TelVal = that.$Tel.val();
            var telVal = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[2-9])|(18[0-9]))\d{8}$/;
            if (!telVal.test(TelVal) || TelVal.length != 11) {
                that.optMsg(that.$Tel, false, 202);
            } else {
                $.ajax({
                    url: '/checkTel',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        'attributeName': 'mobile',
                        'attributeValue': TelVal
                    },
                    success: function(data) {
                        if (data.result) {
                            that.optMsg(that.$Tel, true);
                        } else {
                            telTrue = false;
                            that.optMsg(that.$Tel, false, 203);
                        }
                    }
                });
            }
        },
        checkvalidateCode: function() {
            var that = this;
            $.ajax({
                url: '/checkTel',
                type: 'GET',
                dataType: 'json',
                data: {
                    'Code': that.$validateCode.val()
                },
                success: function(data) {
                    if (data.result) {
                        that.optMsg(that.$validateCode, true);
                    } else {
                        that.optMsg(that.$validateCode, false, 302);
                    }
                }
            });
        },
        //刷新图片验证码
        reloadvalidate: function() {
            var that = this;
            that.$validateCode.val("");
            that.$codeimg.attr('src', 'http://www.ixm.gov.cn/dis/passport/authCode/show?' + Math.random());
            validateTrue = false;
        },
        //密码安全性校验
        checkpassword: function(argument) {
            var that = this;
            var pwdVal = that.$Password.val();
            var pwdRE = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/;
            if (!pwdRE.test(pwdVal)) {
                that.optMsg(that.$Password, false, 502);
            } else if (pwdVal.length < 8 || pwdVal.length > 30) {
                that.optMsg(that.$Password, false, 502);
            } else {
                $.ajax({
                    url: '/checkTel',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        'userName': that.$userName.val() || '',
                        'password': pwdVal
                    },
                    success: function(data) {
                        if (data.result) {
                            that.optMsg(that.$Password, true);
                        } else {
                            that.optMsg(that.$Password, false, 302);
                        }
                    }
                });
            }
        },
        //再次确认密码
        confirmpwd: function() {
            alert('ok');
        },
        //提示复位清除样式
        removeClass: function(Obj) {
            Obj.parents('.form-group').removeClass("has-success has-warring has-error");
        },
        listen: function() { //设置监听
            var that = this;
            that.$userName.on("blur", function() {
                that.checkuserName();
            });
            that.$userName.on("focus", function() {
                that.removeClass($(this));
                $(this).next('.help-block').html(MSG["101"]);
            });
            that.$Tel.on("blur", function() {
                that.checkTel();
            });
            that.$Tel.on("focus", function() {
                that.removeClass($(this));
                $(this).next('.help-block').html(MSG["201"]);
            });
            that.$validateCode.on("focus", function() {
                that.removeClass($(this));
                $(this).next('.help-block').html(MSG["401"]);
            });
            that.$codeimg.on("click", function() {
                that.reloadvalidate($(this));
            });
            that.$reloadBtn.on("click", function() {
                that.reloadvalidate($(this));
            });
            that.$Password.on("blur", function() {
                that.checkpassword();
            });
            that.$Password.on("focus", function() {
                that.removeClass($(this));
                $(this).next('.help-block').html(MSG["501"]);
            });
            that.$SubmitBtn.on("click", function() {
                //that.checkTel();
            });
        }
    };
    window.checkFunc = new CheckFunc();
});
