define(['jquery', 'MSG'], function() {
    var begin, end;
    var Optrequest = {
        Opt: false
    };
    var Resultboolean = {
        telTrue: false,
        emaliTrue: false,
        validateTrue: false
    };
    var CheckFunc = function() {
        this.$userName = $("#userName");
        this.$Tel = $("input[type='tel']");
        this.$Email = $("input[type='email']");
        this.$validateCode = $("#validateCode");
        this.$codeimg = $("#codeimg");
        this.$reloadBtn = $("#reloadBtn");
        this.$Password = $(".password");
        this.$SubmitBtn = $("#submit");
        userNamTrue = false;
        telTrue = false;
        emailTrue = false;
        validateTrue = false;
        pwdTrue = false;
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
        optresult: function() {
            console.log("opt");
            console.log(Resultboolean.telTrue+'++++'+Resultboolean.userTrue);
            Optrequest.Opt = Resultboolean.telTrue && Resultboolean.userTrue;
        },
        //用户名唯一性校验
        checkuserName: function() { //定义功能函数
            var that = this;
            var userNameVal = that.$userName.val();
            var userNameRE = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
            if (!userNameRE.test(userNameVal)) {
                userNamTrue = false;
                Resultboolean.userTrue = true;
                that.optresult();
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
                            userNamTrue = true;
                            that.optMsg(that.$userNam, true);
                        } else {
                            that.optMsg(that.$userNam, false, 202);
                        }
                    }
                });
            }
        },
        //手机唯一性校验
        checkTel: function() {
            var that = this;
            var TelVal = that.$Tel.val();
            var telVal = /^(((13[0-9]{1})|(15[0-9]{1})|(17[678]{1})|(18[0-9]{1}))+\d{8})$/;
            if (!telVal.test(TelVal) || TelVal.length != 11) {
                telTrue = false;
                Resultboolean.telTrue = true;
                that.optresult();
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
                            telTrue = true;
                            that.optMsg(that.$Tel, true);
                        } else {
                            telTrue = false;
                            that.optMsg(that.$Tel, false, 203);
                        }
                    }
                });
            }
        },
        //邮箱唯一性校验
        checkEmail: function() {
            var that = this;
            var EmailVal = that.$Email.val();
            var emailVal = /^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;
            if (!emailVal.test(EmailVal)) {
                emailTrue = false;
                that.optMsg(that.$Email, false, 302);
            } else {
                $.ajax({
                    url: '/checkTel',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        'attributeName': 'email',
                        'attributeValue': EmailVal
                    },
                    success: function(data) {
                        if (data.result) {
                            emailTrue = true;
                            that.optMsg(that.$Email, true);
                        } else {
                            emailTrue = false;
                            that.optMsg(that.$Email, false, 302);
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
                        validateTrue = true;
                        that.optMsg(that.$validateCode, true);
                    } else {
                        validateTrue = false;
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
                pwdTrue = false;
                that.optMsg(that.$Password, false, 502);
            } else if (pwdVal.length < 8 || pwdVal.length > 30) {
                pwdTrue = false;
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
                            pwdTrue = true;
                            that.optMsg(that.$Password, true);
                        } else {
                            pwdTrue = false;
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
            that.$validateCode.on("blur", function() {
                that.checkvalidateCode($(this));
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
            that.$Email.on("blur", function() {
                that.checkEmail();
            });
            that.$Email.on("focus", function() {
                that.removeClass($(this));
                $(this).next('.help-block').html(MSG["301"]);
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
            //使用Object.defineProperty对变量实时监听
            Object.defineProperty(Optrequest, "Opt", {
                set: function(newValue) {
                	console.log('oooooopus'+newValue);
                    if (newValue) {
                        console.log("你要赋值给我,我的新值是" + newValue);
                    }
                }
            });
        }
    };
    window.checkFunc = new CheckFunc();
});
