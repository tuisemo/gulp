define(['脚本tools'], function() {
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
        this.$Check = $("#check"); //服务协议勾选
        this.$forgetInput = $("#forgetInput");
        this.$ForgetBtn = $("#ForgetBtn");
        this.$certificateNum = $('input[name="certificateNum"]');
        //this.$infoSpan = $('span.help-block');
        this.baseUrl = tools.baseUrl;
        this.init();
    };
    Passport.prototype = {
        init: function() {
            //tools.scan(this.$infoSpan);
            this.listen();
        },
        //对象时间监听
        listen: function() {
            var self = this;
            self.$userName.on("blur", function() {
                if ($(this).attr('data-ignore') == "true") { //是否忽略数据格式正则校验
                    return;
                }
                self.checkuserName();
            });
            self.$mobile.on("blur", function() {
                self.checkTel();
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
            self.$FPassword.on("blur", function() {
                self.checkpassword();
            });
            self.$CPassword.on("blur", function() {
                self.confirmpwd();
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
                formCheck.userName = false;
            } else {
                formCheck.userName = true;
            }
        },
        //手机唯一性校验
        checkTel: function() {
            var self = this;
            var TelVal = self.$mobile.val();
            var telVal = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[2-9])|(18[0-9]))\d{8}$/;
            if (!telVal.test(TelVal) || TelVal.length != 11) {
                self.optMsg(self.$mobile, false, 2003);
                formCheck.mobile = false;
            } else {
                formCheck.mobile = true;
            }
        },
        //刷新图片验证码
        reloadvalidate: function() {
            var self = this;
            self.$validateCode.val("");
            self.$codeimg.attr('src', self.baseUrl + '/dis/passport/authCode/show?' + Math.random());
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
                formCheck.password = true;
                return false;
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
                            formCheck.password = true;
                            return true;
                        } else {
                            tools.msg(data);
                            formCheck.password = false;
                            return false;
                        }
                    }
                });
            }
        },
        //再次确认密码
        confirmpwd: function() {
            var self = this;
            if (!self.$FPassword.val()) { //为空直接返回
                return false;
            }
            if (self.$FPassword.val() != self.$CPassword.val()) {
                self.optMsg(self.$FPassword, false, 6003);
                self.optMsg(self.$CPassword, false, 6003);
                formCheck.password = false;
                return false;
            } else {
                tools.removeClass(self.$FPassword);
                self.checkpassword();
                return;
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
        /*================市民注册==================*/
        SignUp: function() {
            var self = this;
            self.checkuserName();
            self.checkTel();
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
                    self.signSubmit();
                } else {
                    tools.msg(data);
                }
            }).fail(function(error) {
                console.log(error);
                layer.msg('请求出错，请稍后重试');
                return;
            });
        },
        signSubmit: function() {
            var self = this;
            var hasValue = [];
            var isSubmit = true;
            $('form input').each(function(index, el) {
                if (!$(el).is(':hidden')) { //当输入框可见时，则要求为必填项
                    (!$(el).val()) ? hasValue[index] = false: hasValue[index] = true;
                } else {
                    hasValue[index] = true; //隐藏的输入框可不输入
                }
                isSubmit = isSubmit && hasValue[index];
                if (!hasValue[index]) {
                    $(el).focus();
                    layer.msg('请将所有内容填写完整');
                    return false;
                }
            });
            if (isSubmit && formCheck.userName && formCheck.mobile && formCheck.password) {
                layer.load(2, {
                    shade: [0.1, '#333'] //0.1透明度的白色背景
                });
                //===============密码加密START===============//
                var Password = self.$Password.val();
                self.$Password.val(tools.encryptByDES(Password));
                //===============密码加密END===============// 
                $('form').submit();
            }
            /*================以下代码为ajax方式注册提交==================*/
            /*$.ajax({
                url: 'dis/passport/reg',
                type: 'POST',
                dataType: 'json',
                cache: false,
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
                        $(data.data).each(function(index, e) {
                            tools.msg(e);
                        });
                    }
                }
            });*/
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
        },
        ForgetPassword: function() {
            var self = this;
            self.confirmpwd();
            var hasValue = [];
            var isSubmit = true;
            $('form input').each(function(index, el) {
                if (!$(el).is(':hidden')) { //当输入框可见时，则要求为必填项
                    (!$(el).val()) ? hasValue[index] = false: hasValue[index] = true;
                } else {
                    hasValue[index] = true; //隐藏的输入框可不输入
                }
                isSubmit = isSubmit && hasValue[index];
                if (!hasValue[index]) {
                    $(el).focus();
                    layer.msg('请将所有内容填写完整');
                    return false;
                }
            });
            if (isSubmit && formCheck.password) {
                layer.load(2, {
                    shade: [0.1, '#333'] //0.1透明度的白色背景
                });
                //===============密码加密START===============//
                var Password = self.$Password.val();
                self.$Password.val(tools.encryptByDES(Password));
                //===============密码加密END===============// 
                $('form').submit();
            }
        },
        fileUpload: function(element) {
            var self = this;
            var support = typeof FileReader != "undefinde"; //检测浏览器是否支持FileReader
            var isIE = navigator.userAgent.match(/MSIE/) !== null;
            var filextension = element.value.substring(element.value.lastIndexOf("."), element.value.length);
            filextension = filextension.toLowerCase(); //获取文件扩展名
            if ((filextension != '.jpg') && (filextension != '.png') && (filextension != '.jpge')) {
                layer.msg('仅支持上传jpg/png/jpge格式的图片文件');
                return;
            }
            if (false) {
                var file = element.files[0];
                if (file.size >= 2048000) {
                    layer.msg('该图片已超过2M！');
                    return;
                }
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    $(element).parents('.thumbnail').find('input.file-name').val(file.name);
                    $(element).parents('.thumbnail').find('span.file-name').html(file.name);
                    $(element).parents('.thumbnail').find('img').attr('src', reader.result);
                }
            } else {
                element.select();
                element.blur()
                var reallocalpath = document.selection.createRange().text;
                // 非IE6版本的IE由于安全问题直接设置img的src无法显示本地图片，但是可以通过滤镜来实现
                $(element).parents('.thumbnail').find('img').css('filter', "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\"" + reallocalpath + "\")");
                // 设置img的src为base64编码的透明图片 取消显示浏览器默认图片
                $(element).parents('.thumbnail').find('img').attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
            }

        }
    };
    window.Passport = new Passport();
});