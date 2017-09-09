define(['脚本layer'], function() {
    window.MSG = {
        "true": '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>',
        "false": '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>',
        "1000": '以英文字母开头，可包含3-20个字符（例：abc123）',
        "1001": '用户名不能为空',
        "1002": '用户名已被占用',
        "1003": '用户名格式不正确',
        "1004": '该账号不存在！',
        "1005": '请输入用户名/手机/邮箱', //找回密码用户名输入框默认提示
        "2000": '请输入省内有效手机号码 (不支持170/171/175号段)',
        "2001": '手机号不能为空',
        "2002": '手机号已被占用',
        "2003": '手机格式不正确',
        "3000": '请输入您的邮箱地址',
        "3001": '邮箱不能为空',
        "3002": '邮箱已被占用',
        "3003": '邮箱格式不正确',
        "4000": '', //请输入图片验证码
        "4001": '图片验证码过期或有误',
        "4002": '图片验证码校验次数过多',
        "5000": '',
        "5001": '短信验证码过期或有误',
        "5002": '短信验证码发送失败',
        "5003": '邮箱验证码过期或有误',
        "5004": '邮箱验证码发送失败',
        "6000": '8-30位字符包含数字和英文字符',
        "6001": '密码格式不正确',
        "6002": '密码强度弱，请重试',
        "6003": '两次密码不一致',
        "6004": '新密码与旧密码一致',
        "7000": '请输入有效证件号码',
        "7001": '身份证不能为空',
        "7002": '身份证已被占用',
        "7003": '身份证格式不正确',
        "7004": '身份证与姓名不匹配',
        "REG": '格式不符合！',
        "IdReg": '证件号格式不符合！'
    };
    window.formCheck = { 'userName': false, 'mobile': false, 'password': false };
    var tools = function() {
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
        this.$enterpriseName = $("#enterpriseName");
        this.$licenseLocation = $("#licenseLocation");
        this.$businessLicense = $("#businessLicense");
        this.$organizationCode = $("#organizationCode");
        this.$unifiedcreditCode = $("#unifiedcreditCode");
        this.$certificateName = $("#certificateName");
        this.$certificateNum = $('input[name="certificateNum"]');
        this.$header = $("#header");
        this.$headercon = $("#header .header-nav");
        this.$formInput = $('form input');
        this.$infoSpan = $('span.help-block');
        this.baseUrl = "http://ixm.terton.com.cn";
        this.init();
    };
    tools.prototype = {
        init: function() {
            this.logo();
            //this.scan(this.$infoSpan);
            this.Alltemplate();
            this.listen();
            this.loginCheck();
        },
        listen: function() {
            var self = this;
            //全局输入框提示复位功能
            self.$formInput.on("focus", function() {
                self.removeClass(this);
                self.scan(self.catchspan(this));
            });
            self.$certificateNum.on("blur", function() {
                if ($(this).attr('data-ignore') == "true") { //是否忽略数据格式正则校验
                    return;
                } else if (!self.checkIDnumber($(this).val())) {
                    self.errorMsg(this, MSG[7003]);
                }
            });
        },
        //判断页面类型，渲染不同logo
        logo: function() {
            var self = this;
            if ($('body').attr("data-type") == "enterprise") {
                $(".logo").css("background", "url(" + self.baseUrl + "/dis/images/trs_en_logo.png) no-repeat");
            }
        },
        //对象扫描，提示信息复位功能
        scan: function(elements) {
            var self = this;
            $(elements).each(function(index, element) {
                $(element).html(MSG[$(element).attr('data-msg')]);
            });
        },
        //捕获提示对象span
        catchspan: function(element) {
            return $(element).parents('.form-group').find('.help-block');
        },
        //提示复位清除样式
        removeClass: function(Obj) {
            $(Obj).parents('.form-group').removeClass("has-success has-warring has-error");
        },
        //检查登录状态
        loginCheck: function() {
            var self = this;
            $.ajax({
                url: self.baseUrl + '/dis/interface/passport_inferface_v1.0.jsp',
                type: 'GET',
                dataType: 'jsonp',
                jsonpCallback: "ssoUser_for_login",
                data: {},
                success: function(data) {
                    if (data.result) {
                        self.loginDraw(data.result, data.user);
                    } else {
                        self.loginDraw(false);
                    }
                },
                error: function() {
                    self.loginDraw(false);
                    return false;
                }
            });
        },
        //初始化全部模板
        Alltemplate: function() {
            var self = this;
            self.TMPheader = _.template(
                '            <ul class="nav-menu fr">' +
                '<% if (!haslogin) { %>' +
                '                <li class="nav-li"><a href="http://www.ixm.gov.cn/sy/zczy/" target=_blank >注册指引</a></li>' +
                '                <li id="loginbox" class="nav-li">' +
                '                    <span><a href="https://www.ixm.gov.cn/ids/custom/xiamen/login_xm.jsp">登录</a></span>&nbsp;|' +
                '                    <span><a href="http://www.ixm.gov.cn/dis/passport/regUI">注册</a></span>' +
                '                </li>' +
                '<% } else { %>' +
                '                <li id="hasloginbox" class="nav-li">' +
                '                    <span><%=user.hello%>，<%=user.userName%></span>' +
                '                    <span><a href="http://www.ixm.gov.cn/ids/admin/logout.jsp?returnUrl=/ids/custom/xiamen/login_xm.jsp">退出账号</a></span>' +
                '                    <span><a href="http://www.ixm.gov.cn/dis/passport/personCenter">个人中心</a></span>' +
                '                    <span><a href="http://www.ixm.gov.cn">i厦门</a></span>' +
                '                </li>' +
                '<% } %>' +
                '            </ul>'
            );
        },
        //登录状态渲染
        loginDraw: function(haslogin, user) {
            var self = this;
            self.$headercon.append(self.TMPheader({
                haslogin: haslogin,
                user: user
            }));
        },
        //DES密码加密
        encryptByDES: function(message, key) {
            key ? desKey = key : desKey = "des55781";
            var keyHex = CryptoJS.enc.Utf8.parse(desKey);
            var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            return encrypted.toString();
        },
        //身份证号格式检测
        checkIDnumber: function(IDnum) {
            var self = this;
            if (IDnum.length != 18) {
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
                return false;
            }
        },
        //查找span提示错误信息
        errorMsg: function(element, msg) {
            return $(element).parents('.form-group').addClass('has-error')
                .find('.help-block').html(MSG["false"] + msg);
        },
        //统一响应值处理
        msg: function(data) {
            switch (data.code) {
                case 200:
                    {
                        break;
                    }
                case -1:
                    {
                        layer.msg(data.msg);
                        break;
                    }
                case 1001:
                case 1002:
                case 1003:
                    { //用户名错误提示
                        this.errorMsg(this.$userName, data.msg);
                        formCheck.userName = false;
                        break;
                    }
                case 2001:
                case 2002:
                case 2003:
                case 2004:
                case 2005:
                case 3001:
                case 3002:
                case 3003:
                case 3004:
                case 3005:
                    { //手机、邮箱错误提示
                        this.errorMsg(this.$mobile, data.msg);
                        formCheck.mobile = false;
                        break;
                    }
                case 4001:
                case 4002:
                case 4004:
                case 4006:
                    { //图片验证码错误提示
                        this.errorMsg(this.$validateCode, data.msg);
                        break;
                    }
                case 5001:
                case 5002:
                case 5003:
                case 5004:
                    { //短信验证码错误提示
                        this.errorMsg(this.$msgCode, data.msg);
                        break;
                    }
                case 6001:
                case 6002:
                case 6003:
                case 6004:
                    { //短信验证码错误提示
                        this.errorMsg(this.$FPassword, data.msg);
                        formCheck.password = false;
                        break;
                    }
                case 7001:
                case 7002:
                case 7003:
                case 7004:
                    {
                        this.errorMsg(this.$certificateNum, data.msg);
                        layer.msg(data.msg);
                        break;
                    }
                case 8001:
                case 8002:
                case 8003:
                    {
                        this.errorMsg(this.$enterpriseName, data.msg);
                        layer.msg(data.msg);
                        break;
                    }
                case 9002:
                    {
                        this.errorMsg(this.$businessLicense, data.msg);
                        layer.msg(data.msg);
                        break;
                    }
                case 10002:
                    {
                        this.errorMsg(this.$organizationCode, data.msg);
                        layer.msg(data.msg);
                        break;
                    }
                case 11002:
                    {
                        this.errorMsg(this.$unifiedcreditCode, data.msg);
                        layer.msg(data.msg);
                        break;
                    }
                default:
                    {
                        layer.msg('请求异常，请稍后重试');
                        break;
                    }
            }
        }
    };
    window.tools = new tools();
});