define(['脚本tool', '脚本layer'], function() {
    var Passport = function(ResultOpt) {
        this.wait = 10;
        this.timeBoo = true;
        this.$userName = $("#userName");
        this.$Tel = $("input[type='tel']");
        this.$validateCode = $("#validateCode");
        this.$sendmsgBtn = $("#sendmsg");
        this.$msgCode = $("#msgCode");
        this.$codeimg = $("#codeimg");
        this.$reloadBtn = $("#reloadBtn");
        this.$Password = $(".password");
        this.$FPassword = $("#FPassword");
        this.$CPassword = $("#CPassword");
        this.$SubmitBtn = $("#submit");
        this.$Check = $("#check"); //服务协议勾选
        this.$forgetInput = $("#forgetInput");
        this.$ForgetBtn = $("#ForgetBtn");
        /*=======企业注册dom======*/
        this.$enterpriseName = $("#enterpriseName");
        this.$licenseLocation = $("#licenseLocation");
        this.$businessLicense = $("#businessLicense");
        this.$organizationCode = $("#organizationCode");
        this.$unifiedcreditCode = $("#unifiedcreditCode");
        this.$certificateName = $("#certificateName");
        this.$certificateNum = $("#certificateNum");
        this.$EnBox1 = $("#EnBox1");
        this.$EnBox2 = $("#EnBox2");
        this.$idUpdate = $("input[name='idUpdate']");
        this.init();
    };
    Passport.prototype = {
        init: function() {
            this.listen();
        },
        listen: function() {
            var that = this;
            that.$userName.on("blur", function() {
                that.checkuserName();
            }).on("focus", function() {
                that.removeClass($(this));
                $(this).parents('.form-group').find('.help-block').html(MSG["101"]);
            });
            that.$Tel.on("blur", function() {
                that.checkTel();
            }).on("focus", function() {
                that.removeClass($(this));
                $(this).parents('.form-group').find('.help-block').html(MSG["201"]);
            });
            that.$validateCode.on("focus", function() {
                that.removeClass($(this));
                $(this).parents('.form-group').find('.help-block').html(MSG["401"]);
            });
            that.$codeimg.on("click", function() {
                that.reloadvalidate($(this));
            });
            //==========短信发送按钮监听============
            that.$sendmsgBtn.on("click", function(event) {
                that.sendMsgFor($(this).attr('data-type'), $(this).attr('data-domainname'));
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
                $(this).parents('.form-group').find('.help-block').html(MSG["501"]);
            });
            that.$SubmitBtn.on("click", function() {
                that.SignUp();
            });
            that.$ForgetBtn.on("click", function() {
                that.ForgetAccount();
            });
            /* =========企业注册=============*/
            that.$idUpdate.on("click", function() {
                that.Enterpriseinfo($(this).val());
            });
            that.$enterpriseName.on("focus", function() {
                that.removeClass($(this));
                $(this).parents('.form-group').find('.help-block').html(MSG.En100);
            }).on("blur", function() {
                that.REGEX(03, $(this));
            });
            that.$licenseLocation.on("focus", function() {
                that.removeClass($(this));
                $(this).parents('.form-group').find('.help-block').html(MSG.En200);
            }).on("blur", function() {
                that.REGEX(03, $(this));
            });
            that.$businessLicense.on("focus", function() {
                that.removeClass($(this));
                $(this).parents('.form-group').find('.help-block').html(MSG.En300);
            }).on("blur", function() {
                that.REGEX(02, $(this));
            });
            that.$organizationCode.on("focus", function() {
                that.removeClass($(this));
                $(this).parents('.form-group').find('.help-block').html(MSG.En400);
            }).on("blur", function() {
                that.REGEX(02, $(this));
            });
            that.$unifiedcreditCode.on("focus", function() {
                that.removeClass($(this));
                $(this).parents('.form-group').find('.help-block').html(MSG.En500);
            }).on("blur", function() {
                that.REGEX(02, $(this));
            });
            that.$certificateName.on("focus", function() {
                that.removeClass($(this));
                $(this).parents('.form-group').find('.help-block').html("");
            }).on("blur", function() {
                that.REGEX(03, $(this));
            });
            that.$certificateNum.on("focus", function() {
                that.removeClass($(this));
                $(this).parents('.form-group').find('.help-block').html("");
            }).on("blur", function() {
                that.checkIDnumber($(this).val());
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
            Obj.parents('.form-group').removeClass("has-success has-warring has-error");
        },
        //正则格式检验
        REGEX: function(type, Obj) {
            var that = this;
            var value = $(Obj).val();
            var regex1 = /^[0-9]+$/, //限制数字
                regex2 = /^[0-9a-zA-Z._]*$/g, //限制字母+数字
                regex3 = /[a-zA-Z|\u4e00-\u9fa5]/, //限制字母+中文
                regex4 = /(^[a-zA-Z_\u4e00-\u9fa5]+[0-9]*)/; //限制字母+数字
            switch (type) {
                case 01:
                    {
                        if (!regex1.test(value)) {
                            that.optMsg(Obj, false, 'REG');
                        }
                        break;
                    }
                case 02:
                    {
                        if (!regex2.test(value)) {
                            that.optMsg(Obj, false, 'REG');
                        }
                        break;
                    }
                case 03:
                    {
                        if (!regex3.test(value)) {
                            that.optMsg(Obj, false, 'REG');
                        }
                        break;
                    }
            }
        },
        Timesetter: function(o) {
            var that = this;
            this.timeBoo = false;
            if (that.wait === 0) {
                $("#msgtimer").html("发送校验码").hide();
                $("#sendmsg").show();
                that.wait = 10;
                that.timeBoo = true;
            } else {
                if (that.wait == 10) {
                    $("#sendmsg").hide();
                    $("#msgtimer").show();
                }
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
            //var pwdRE = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/;
            var pwdRE = /^[A-Za-z0-9`~!@#\$%\^&\*\(\)_\+-=\[\]\{\}\\\|;:'"<,>\.\?\/]{8,30}$/;
            if (!pwdRE.test(pwdVal)) {
                that.optMsg(that.$FPassword, false, 502);
            } else if (pwdVal.length < 8 || pwdVal.length > 30) {
                that.optMsg(that.$FPassword, false, 502);
            } else {
                $.ajax({
                    url: '/dis/ids/checkUserPwd',
                    type: 'GET',
                    dataType: 'json',
                    cache: false,
                    data: {
                        'userName': that.$userName.val() || '',
                        'password': that.$FPassword.val()
                    },
                    success: function(data) {
                        if (data.result) {
                            that.optMsg(that.$FPassword, true);
                        } else {
                            ResultOpt.msg(data);
                            that.optMsg(that.$FPassword, false, 503);

                        }
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
            if (!(that.timeBoo)) {
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
                            "mobile": that.$Tel.val() || "",
                            "code": that.$validateCode.val() || "",
                        },
                        type: "POST",
                        success: function(data) {
                            if (data.code == 200 || data.result) {
                                $("#msgtimer").hide();
                                $("#sendmsg").show();
                                $("#mobilemsg").addClass('text-success').html(MSG["true"] + data.msg);
                                that.Timesetter();
                                return;
                            }
                            ResultOpt.msg(data);
                        },
                        error: function(data) {
                            layer.msg('请求出错，请稍后重试');
                            return;
                        }
                    })
                    .done(function(data) {
                    });
            }
        },
        //身份证号格式检测
        checkIDnumber: function(IDnum) {
            var that = this;
            if (IDnum.length != 18) {
                that.optMsg(that.$certificateNum, false, 'IdReg');
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
                that.optMsg(that.$certificateNum, false, 'IdReg');
            }
        },
        /*================市民注册==================*/
        SignUp: function() {
            var that = this;
            if (!that.$Check.is(':checked')) {
                layer.msg('请勾选通行证协议');
                return;
            }
            var attributeValue = that.$userName.val() + ";" + that.$Tel.val();
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
                    $('form').submit();
                } else {
                    ResultOpt.msg(data);
                }
            }).fail(function(error) {
                console.log(error);
                layer.msg('请求出错，请稍后重试');
                return;
            });
        },
        /*===============法人注册===================*/
        EnterpriseSignUp: function() {
            var that = this;
            if (!that.$Check.is(':checked')) {
                layer.msg('请勾选通行证协议');
                return;
            }
            var attributeValue, attributeName;
            if ($("input[name='idUpdate']:checked").val() == "true") {
                attributeValue = that.$userName.val() + ";" + that.$Tel.val() + ";" +
                    that.$enterpriseName.val() + ";" + that.$unifiedcreditCode.val();
                attributeName = "userName;mobile;enterpriseName;unifiedcreditCode";
            } else {
                attributeValue = that.$userName.val() + ";" + that.$Tel.val() + ";" +
                    that.$enterpriseName.val() + ";" + that.$businessLicense.val() + ";" + that.$organizationCode.val();
                attributeName = "userName;mobile;enterpriseName;businessLicense;organizationCode";
            }
            $.ajax({
                url: "/dis/passport/checkUserAttribute",
                dataType: "json",
                async: true,
                data: {
                    "attributeValue": attributeValue,
                    "attributeName": attributeName,
                    "code": that.$validateCode.val(),
                    "domainName": "Enterprise"
                },
                type: "POST"
            }).done(function(data) {
                if (data.code == 200 || data.result) {
                    layer.load(2, {
                        shade: [0.1, '#333'] //0.1透明度的白色背景
                    });
                    $('form').submit();
                } else {
                    ResultOpt.msg(data);
                }
            }).fail(function(error) {
                console.log(error);
                layer.msg('请求出错，请稍后重试');
                return;
            });
        },
        Enterpriseinfo: function(idUpdate) {
            var that = this;
            if (idUpdate == "true") {
                that.$EnBox1.show();
                that.$EnBox2.hide();
            } else {
                that.$EnBox1.hide();
                that.$EnBox2.show();
            }
        },
        /*===============找回密码===================*/
        ForgetAccount: function(domainName) {
            var that = this;
            $.ajax({
                url: '/dis/passport/checkUser',
                type: 'POST',
                dataType: 'json',
                data: {
                    "userName": that.$forgetInput.val(),
                    "code": that.$validateCode.val(),
                    "domainName": domainName
                },
                success: function(data) {
                    if (data.code === 200 || data.result) {
                        $('form').submit();
                    } else {
                        ResultOpt.msg(data);
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