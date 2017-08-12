$(function() {
    window.MSG = {
        "true": '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>',
        "false": '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>',
        "101": '以英文字母开头，可包含3-20个字符',
        "102": '用户名格式不正确！',
        "103": '该用户名已被占用！',
        "104": '该账号不存在！',
        "201": '请输入您的手机号(仅支持中国大陆)',
        "202": '手机号码格式有误！',
        "203": '该手机号已被占用！',
        "301": '请输入您的邮箱地址',
        "302": '请输入正确的邮箱地址！',
        "303": '该邮箱已被占用！',
        "401": '', //请输入图片验证码
        "402": '验证码过期或有误！',
        "501": '8-30位字符包含数字和英文字符',
        "502": '密码格式不符合，请重设！',
        "503": '密码强度太弱，请重设！',
        "504": '密码要求8-30位！',
        "505": '两次密码不一致！',
        "601": '校验码过期或有误！',
    };
});
$(function() {
    var ResultOpt = function() {
        this.$userName = $("#userName");
        this.$Tel = $("input[type='tel']");
        this.$validateCode = $("#validateCode");
        this.$msgCode = $("#msgCode");
        this.$codeimg = $("#codeimg");
        this.$reloadBtn = $("#reloadBtn");
        this.$Password = $(".password");
        this.$FPassword = $("#FPassword");
        this.$CPassword = $("#CPassword");
    };
    ResultOpt.prototype = {
        Opt: function(data) {
            switch (data.code) {
                case 200:
                    {
                        break;
                    }
                case -1:
                    {
                        this.$userName.parents('.form-group').addClass('has-error');
                        this.$userName.next('.help-block').html(MSG["false"] + data.result);
                        break;
                    }
                case 1001:
                    {
                        this.$userName.parents('.form-group').addClass('has-error');
                        this.$userName.next('.help-block').html(MSG["false"] + data.result);
                        break;
                    }
                case 1002:
                    {
                        this.$userName.parents('.form-group').addClass('has-error');
                        this.$userName.next('.help-block').html(MSG["false"] + data.result);
                        break;
                    }
                case 1003:
                    {
                        this.$userName.parents('.form-group').addClass('has-error');
                        this.$userName.next('.help-block').html(MSG["false"] + data.result);
                        break;
                    }
                case 2001:
                    {
                        this.$Tel.parents('.form-group').addClass('has-error');
                        this.$Tel.next('.help-block').html(MSG["false"] + data.result);
                        break;
                    }
                case 2002:
                    {
                        this.$Tel.parents('.form-group').addClass('has-error');
                        this.$Tel.next('.help-block').html(MSG["false"] + data.result);
                        break;
                    }
                case 2003:
                    {
                        this.$Tel.parents('.form-group').addClass('has-error');
                        this.$Tel.next('.help-block').html(MSG["false"] + data.result);
                        break;
                    }
                case 2005:
                    {
                        this.$Tel.parents('.form-group').addClass('has-error');
                        this.$Tel.next('.help-block').html(MSG["false"] + data.result);
                        break;
                    }
                case 3001:
                    {
                        this.$Tel.parents('.form-group').addClass('has-error');
                        this.$Tel.next('.help-block').html(MSG["false"] + data.result);
                        break;
                    }
                case 3002:
                    {
                        this.$Tel.parents('.form-group').addClass('has-error');
                        this.$Tel.next('.help-block').html(MSG["false"] + data.result);
                        break;
                    }
                case 3003:
                    {
                        this.$Tel.parents('.form-group').addClass('has-error');
                        this.$Tel.next('.help-block').html(MSG["false"] + data.result);
                        break;
                    }
                case 3005:
                    {
                        this.$Tel.parents('.form-group').addClass('has-error');
                        this.$Tel.next('.help-block').html(MSG["false"] + data.result);
                        break;
                    }
                case 4004:
                    {
                        this.$validateCode.parents('.form-group').addClass('has-error');
                        this.$validateCode.next('.help-block').html(MSG["false"] + data.result);
                        break;
                    }
                case 4006:
                    {
                        this.$validateCode.parents('.form-group').addClass('has-error');
                        this.$validateCode.next('.help-block').html(MSG["false"] + data.result);
                        break;
                    }
                default:
                    {
                        this.$msgCode.addClass('text-danger').html(MSG["false"] + data.result);
                        break;
                    }
            }
        }
    };
    window.ResultOpt = new ResultOpt();
});
$(function() {
    var CitizenSignUp = function() {
        this.wait = 10;
        this.timeBoo = true;
        this.$userName = $("#userName");
        this.$Tel = $("input[type='tel']");
        this.$validateCode = $("#validateCode");
        this.$msgCode = $("#msgCode");
        this.$codeimg = $("#codeimg");
        this.$reloadBtn = $("#reloadBtn");
        this.$Password = $(".password");
        this.$FPassword = $("#FPassword");
        this.$CPassword = $("#CPassword");
        this.$SubmitBtn = $("#submit");
        this.$Check = $("#check");
        this.init();
    };
    CitizenSignUp.prototype = {
        init: function() {
            this.listen();
        },
        listen: function() {
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
            that.$FPassword.on("blur", function() {
                that.checkpassword();
            });
            that.$CPassword.on("blur", function() {
                that.confirmpwd();
            });
            that.$Password.on("focus", function() {
                that.removeClass($(this));
                $(this).next('.help-block').html(MSG["501"]);
            });
            that.$SubmitBtn.on("click", function() {
                that.SignUp();
            });
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
        //提示复位清除样式
        removeClass: function(Obj) {
            Obj.parents('.form-group').removeClass("has-success has-warring has-error");
        },
        Timesetter: function(o) {
            var that = this;
            if (that.wait === 0) {
                $("#msgtimer").html("发送校验码");
                $("#sendmsg").show();
                $("#msgtimer").hide();
                that.wait = 10;
                that.timeBoo = true;
            } else {
                if (that.wait == 10) {
                    $("#sendmsg").hide();
                    $("#msgtimer").show();
                }
                that.timeBoo = false;
                $("#msgtimer").html(that.wait + "秒后再重试");
                that.wait--;
                setTimeout(function() {
                    that.Timesetter(o);
                }, 1000);
            }
        },
        //用户名唯一性校验
        checkuserName: function() { //定义功能函数
            var that = this;
            var userNameVal = that.$userName.val();
            var userNameRE = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
            if (!userNameRE.test(userNameVal)) {
                that.optMsg(that.$userName, false, "102");
            }
        },
        //手机唯一性校验
        checkTel: function() {
            var that = this;
            var TelVal = that.$Tel.val();
            var telVal = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[2-9])|(18[0-9]))\d{8}$/;
            if (!telVal.test(TelVal) || TelVal.length != 11) {
                that.optMsg(that.$Tel, false, 202);
            }
        },
        //刷新图片验证码
        reloadvalidate: function() {
            var that = this;
            that.$validateCode.val("");
            that.$codeimg.attr('src', 'http://www.ixm.gov.cn/dis/passport/authCode/show?' + Math.random());
            validateTrue = false;
        },
        //密码安全性校验
        checkpassword: function() {
            var that = this;
            var pwdVal = that.$FPassword.val();
            var pwdRE = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/;
            if (!pwdRE.test(pwdVal)) {
                that.optMsg(that.$FPassword, false, 502);
            } else if (pwdVal.length < 8 || pwdVal.length > 30) {
                that.optMsg(that.$FPassword, false, 502);
            } else {
                $.ajax({
                    url: '/api/checkUserPwd',
                    type: 'GET',
                    dataType: 'text',
                    cache:false,
                    data: {
                        'userName': that.$userName.val() || '',
                        'password': that.$FPassword.val()
                    },
                    success: function(data) {
                        if (data.indexOf("success") != -1) {
                            that.optMsg(that.$FPassword, true);
                        } else {
                            that.optMsg(that.$FPassword, false, 503);
                        }
                        /*if (data.result) {
                            that.optMsg(that.$FPassword, true);
                        } else {
                            that.optMsg(that.$FPassword, false, 503);
                        }*/
                    }
                });
            }
        },
        //再次确认密码
        confirmpwd: function() {
            var that = this;
            if (that.$FPassword.val() != that.$CPassword.val()) {
                that.optMsg(that.$FPassword, false, 505);
                that.optMsg(that.$CPassword, false, 505);
            }
        },
        /*==================================*/
        sendMsgFor: function(operationType, domainName, sendType) {
            var that = this;
            var TelOrEmail = $("#TelOrEmail").val();
            var validateCode = $("#validateCode").val();
            if (that.timeBoo === false) {
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
                        "mobile": TelOrEmail,
                        "code": validateCode,
                    },
                    type: "POST",
                    success: function(data) {
                        //请求成功时处理
                        if (data.code == 200) {
                            $("#msgtimer").hide();
                            $("#sendmsg").show();
                            $("#mobilemsg").addClass('text-success').html(MSG["true"] + data.result);
                            that.Timesetter();
                            return;
                        }
                        ResultOpt.Opt(data);
                    },
                    error: function(data) {
                        //请求出错处理
                        $("#codemsg").addClass('text-danger').html(MSG["false"] + "请求出错请重试！");
                        return false;
                    }
                });
            }
        },
        /*==================================*/
        SignUp: function() {
            var that = this;
            if (!that.$Check.is(':checked')) {
                return;
            }
            var attributeValue = that.$userName.val() + ";" + that.$Tel.val();
            $.ajax({
                    url: "/api/checkUserAttribute",
                    dataType: "json",
                    async: true,
                    data: {
                        "attributeValue": attributeValue,
                        "attributeName": "userName;mobile",
                        "domainName": "Citizen"
                    },
                    type: "POST"
                })
                /*.done(function(data) {
                                if (data.code == 200) {
                                    return $.ajax({
                                        url: "/api/checkUserAttribute",
                                        dataType: "json",
                                        async: true,
                                        data: {
                                            "attributeValue": "13900000008",
                                            "attributeName": "mobile",
                                            "domainName": "Citizen"
                                        },
                                        type: "POST"
                                    });
                                }
                                ResultOpt.Opt(data);
                            })*/
                .done(function(data) {
                    $.ajax({
                        url: '/api/reg',
                        type: 'POST',
                        dataType: 'json',
                        cache: false,
                        data: {
                            'userName': $(that.$userName).val() || "tuisemo",
                            'mobile': $(that.$Tel).val() || "18248639098",
                            'Code': $(that.$validateCode).val() || "resj",
                            'msgCode': $(that.$msgCode).val() || "234567",
                            'password': $(that.$CPassword).val() || "czp20mhkdurl"
                        },
                        success: function(data) {
                            if (data.code === 200) {
                                window.location = "";
                            }
                            ResultOpt.Opt(data);
                        }
                    });
                }).fail(function(error) {
                    console.log(error);
                });
        }
    };
    window.CitizenSignUp = new CitizenSignUp();
});