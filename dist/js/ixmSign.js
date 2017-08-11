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
            that.$Password.on("blur", function() {
                that.checkpassword();
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
            if (that.wait == 0) {
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
            };
        },
        //手机唯一性校验
        checkTel: function() {
            var that = this;
            var TelVal = that.$Tel.val();
            var telVal = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[2-9])|(18[0-9]))\d{8}$/;
            if (!telVal.test(TelVal) || TelVal.length != 11) {
                that.optMsg(that.$Tel, false, 202);
            };
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
            var that=this;
            if (that.$FPassword.val()!=that.$CPassword) {
                that.optMsg(that.$Password, false, 502);
            }
        },
        /*==================================*/
        sendMsgFor: function(operationType, domainName, sendType) {
            var that = this;
            var TelOrEmail = $("#TelOrEmail").val();
            var validateCode = $("#validateCode").val();
            if (that.timeBoo == false) {
                return false;
            } else {
                $.ajax({
                    url: "/dis/passport/sendMsg", //请求的url地址
                    dataType: "json", //服务器返回的值类型
                    async: true, //请求是否异步，默认为异步
                    cache: false,
                    data: {
                        "operationType": operationType,
                        "domainName": domainName,
                        "sendType": sendType,
                        "mobile": TelOrEmail,
                        "code": validateCode,
                    }, //发送到服务器的参数
                    type: "POST", //请求方式
                    success: function(data) {
                        //请求成功时处理
                        var code = data.code;
                        var resultmsg = data.result;
                        switch (code) {
                            case 200:
                                {
                                    $("#msgtimer").hide();
                                    $("#sendmsg").show();
                                    $("#mobilemsg").addClass('text-success');
                                    $("#mobilemsg").html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>' + resultmsg);
                                    that.Timesetter();
                                    break;
                                }
                            case -1:
                                {
                                    $("#valimsg").addClass('text-danger');
                                    $("#valimsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                                    break;
                                }
                            case 2001:
                                {
                                    $("#mobilemsg").addClass('text-danger');
                                    $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                                    mobileBoo = false;
                                    break;
                                }
                            case 2002:
                                {
                                    $("#mobilemsg").addClass('text-danger');
                                    $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                                    break;
                                }
                            case 2003:
                                {
                                    $("#mobilemsg").addClass('text-danger');
                                    $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                                    break;
                                }
                            case 2005:
                                {
                                    $("#mobilemsg").addClass('text-danger');
                                    $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                                    break;
                                }
                            case 3001:
                                {
                                    $("#mobilemsg").addClass('text-danger');
                                    $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                                    break;
                                }
                            case 3002:
                                {
                                    $("#mobilemsg").addClass('text-danger');
                                    $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                                    break;
                                }
                            case 3003:
                                {
                                    $("#mobilemsg").addClass('text-danger');
                                    $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                                    break;
                                }
                            case 3005:
                                {
                                    $("#mobilemsg").addClass('text-danger');
                                    $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                                    break;
                                }
                            case 4004:
                                {
                                    $("#valimsg").addClass('text-danger');
                                    $("#valimsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                                    break;
                                }
                            case 4006:
                                {
                                    $("#valimsg").addClass('text-danger');
                                    $("#valimsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                                    break;
                                }
                            default:
                                {
                                    $("#codemsg").addClass('text-danger');
                                    $("#codemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                                    break;
                                }
                        }
                    },
                    error: function(data) {
                        //请求出错处理
                        $("#codemsg").addClass('text-danger');
                        $("#codemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "请求出错请重试！");
                        return false;
                    }
                });
            }
        },
        /*==================================*/
        SignUp: function() {
            var that = this;
            $.ajax({
                url: "/api/checkUserAttribute", //请求的url地址
                dataType: "json", //服务器返回的值类型
                async: true, //请求是否异步，默认为异步
                data: {
                    "attributeValue": "tuisemo3",
                    "attributeName": "userName",
                    "domainName": "Citizen"
                }, //发送到服务器的参数
                type: "POST"
            }).done(function(data) {
                switch (data.code) {
                    case 200:
                        {
                            return $.ajax({
                                url: "/api/checkUserAttribute", //请求的url地址
                                dataType: "json", //服务器返回的值类型
                                async: true, //请求是否异步，默认为异步
                                data: {
                                    "attributeValue": "18248639098",
                                    "attributeName": "mobile",
                                    "domainName": "Citizen"
                                }, //发送到服务器的参数
                                type: "POST"
                            });
                        }
                    case -1:
                        {
                            $("#valimsg").addClass('text-danger');
                            $("#valimsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + data.result);
                            return false;
                        }
                    case 1001:
                        {
                            $("#usermsg").addClass('text-danger');
                            $("#usermsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + data.result);
                            return false;
                        }
                    case 1002:
                        {
                            $("#usermsg").addClass('text-danger');
                            $("#usermsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + data.result);
                            return false;
                        }
                    case 1003:
                        {
                            $("#usermsg").addClass('text-danger');
                            $("#usermsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + data.result);
                            return false;
                        }
                    case 2001:
                        {
                            $("#mobilemsg").addClass('text-danger');
                            $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + data.result);
                            return false;
                        }
                    case 2002:
                        {
                            $("#mobilemsg").addClass('text-danger');
                            $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + data.result);
                            return false;
                        }
                    case 2003:
                        {
                            $("#usermsg").addClass('text-danger');
                            $("#usermsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + data.result);
                            return false;
                        }
                    default:
                        {
                            $("#valimsg").addClass('text-danger');
                            $("#valimsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + data.result);
                            break;
                        }
                }
            }).done(function(data) {
                $.ajax({
                    url: '/path/to/file',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        'userName': that.$userName.val(),
                        'mobile': that.$Tel.val(),
                        'Code': that.$validateCode.val(),
                        'msgCode': that.$msgCode.val(),
                        'password': that.$CPassword.val()
                    },
                    success: function(data) {
                        switch (data.code) {
                            case 200:
                                {
                                    return true;
                                }
                            case -1:
                                {
                                    $("#valimsg").addClass('text-danger');
                                    $("#valimsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + data.result);
                                    return false;
                                }
                            case 1001:
                                {
                                    $("#usermsg").addClass('text-danger');
                                    $("#usermsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + data.result);
                                    return false;
                                }
                            case 1002:
                                {
                                    $("#usermsg").addClass('text-danger');
                                    $("#usermsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + data.result);
                                    return false;
                                }
                            case 1003:
                                {
                                    $("#usermsg").addClass('text-danger');
                                    $("#usermsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + data.result);
                                    return false;
                                }
                            case 2001:
                                {
                                    $("#mobilemsg").addClass('text-danger');
                                    $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + data.result);
                                    return false;
                                }
                            case 2002:
                                {
                                    $("#mobilemsg").addClass('text-danger');
                                    $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + data.result);
                                    return false;
                                }
                            case 2003:
                                {
                                    $("#usermsg").addClass('text-danger');
                                    $("#usermsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + data.result);
                                    return false;
                                }
                            default:
                                {
                                    $("#valimsg").addClass('text-danger');
                                    $("#valimsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + data.result);
                                    break;
                                }
                        }
                    }
                });
            }).fail(function(error) {
                console.log(error);
            });
        }
    };
    window.CitizenSignUp = new CitizenSignUp();
});