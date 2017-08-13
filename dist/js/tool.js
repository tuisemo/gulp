define(['脚本layer'], function(layer) {
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
        this.$header = $("#header");
        this.$headercon = $("#header .header-nav");
        this.$ixmcontainer = $(".ixm-container");
        this.init();
    };
    ResultOpt.prototype = {
        init: function() {
            this.logo();
            this.Alltemplate();
            this.loginCheck();
        },
        logo: function() {
            if (this.$ixmcontainer.attr("data-type") == "enterprise") {
                $(".logo").css("background", "url(http://www.ixm.gov.cn/dis/images/trs_en_logo.png) no-repeat");
            }
        },
        //检查登录状态
        loginCheck: function() {
            var that = this;
            $.ajax({
                url: 'http://www.ixm.gov.cn/dis/interface/passport_inferface_v1.0.jsp',
                type: 'GET',
                dataType: 'jsonp',
                jsonpCallback: "ssoUser_for_login",
                data: {},
                success: function(data) {
                    if (data.result) {
                        that.loginDraw(data.result, data.user);
                    } else {
                        that.loginDraw(false);
                    }
                },
                error: function() {
                    that.loginDraw(false);
                    return false;
                }
            });
        },
        //初始化全部模板
        Alltemplate: function() {
            var that = this;
            that.TMPheader = _.template(
                '            <ul class="nav-menu fr">' +
                '<% if (!haslogin) { %>' +
                '                <li class="nav-li"><a href="http://www.ixm.gov.cn/sy/zczy/" target=_blank >注册指引</a></li>' +
                '                <li id="loginbox" class="nav-li">' +
                '                    <span><a href="/">登录</a></span>&nbsp;|' +
                '                    <span><a href="/">注册</a></span>' +
                '                </li>' +
                '<% } else { %>' +
                '                <li id="hasloginbox" class="nav-li">' +
                '                    <span><%=user.hello%>，<%=user.userName%></span>' +
                '                    <span><a href="http://www.ixm.gov.cn/ids/admin/logout.jsp?returnUrl=/ids/custom/xiamen/login_xm.jsp">退出账号</a></span>' +
                '                    <span><a href="/">个人中心</a></span>' +
                '                    <span><a href="/">i厦门</a></span>' +
                '                </li>' +
                '<% } %>' +
                '            </ul>'
            );
        },
        loginDraw: function(haslogin, user) {
            var that = this;
            that.$headercon.append(that.TMPheader({
                haslogin: haslogin,
                user: user
            }));
        },
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
                    {
                        this.$userName.parents('.form-group').addClass('has-error')
                        .find('.help-block').html(MSG["false"] + data.msg);
                        break;
                    }
                case 1002:
                    {
                        this.$userName.parents('.form-group').addClass('has-error')
                        .find('.help-block').html(MSG["false"] + data.msg);
                        break;
                    }
                case 1003:
                    {
                        this.$userName.parents('.form-group').addClass('has-error')
                        .find('.help-block').html(MSG["false"] + data.msg);
                        break;
                    }
                case 2001:
                    {
                        this.$Tel.parents('.form-group').addClass('has-error')
                        .find('.help-block').html(MSG["false"] + data.msg);
                        break;
                    }
                case 2002:
                    {
                        this.$Tel.parents('.form-group').addClass('has-error')
                        .find('.help-block').html(MSG["false"] + data.msg);
                        break;
                    }
                case 2003:
                    {
                        this.$Tel.parents('.form-group').addClass('has-error')
                        .find('.help-block').html(MSG["false"] + data.msg);
                        break;
                    }
                case 2005:
                    {
                        this.$Tel.parents('.form-group').addClass('has-error')
                        .find('.help-block').html(MSG["false"] + data.msg);
                        break;
                    }
                case 3001:
                    {
                        this.$Tel.parents('.form-group').addClass('has-error')
                        .find('.help-block').html(MSG["false"] + data.msg);
                        break;
                    }
                case 3002:
                    {
                        this.$Tel.parents('.form-group').addClass('has-error')
                        .find('.help-block').html(MSG["false"] + data.msg);
                        break;
                    }
                case 3003:
                    {
                        this.$Tel.parents('.form-group').addClass('has-error')
                        .find('.help-block').html(MSG["false"] + data.msg);
                        break;
                    }
                case 3005:
                    {
                        this.$Tel.parents('.form-group').addClass('has-error')
                        .find('.help-block').html(MSG["false"] + data.msg);
                        break;
                    }
                case 4004:
                    {
                        this.$validateCode.parents('.form-group').addClass('has-error')
                        .find('.help-block').html(MSG["false"] + data.msg);
                        break;
                    }
                case 4006:
                    {
                        this.$validateCode.parents('.form-group').addClass('has-error')
                        .find('.help-block').html(MSG["false"] + data.msg);
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
    window.ResultOpt = new ResultOpt();
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
        "En100": '请输入营业执照上的单位名称',
        "En200": '请填写登记注册地址',
        "En300": '请输入15位营业执照注册号',
        "En400": '请输入9位组织机构代码',
        "En500": '请输入18位统一社会信用代码',
        "REG": '格式不符合！',
        "IdReg": '证件号格式不符合！'
    };
});