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
        this.init();
    };
    ResultOpt.prototype = {
        init: function() {
            this.Alltemplate();
            this.loginCheck();
            //this.Opt();
        },
        //检查登录状态
        loginCheck: function() {
            var that = this;
            $.ajax({
                url: 'http://www.ixm.gov.cn/dis/interface/user_inferface_v1.0.jsp',
                type: 'GET',
                dataType: 'jsonp',
                jsonpCallback: "ssoUser_for_login",
                data: {},
                success: function(data) {
                    if (data.result) {
                        that.loginDraw(data.result, data.user.info);
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
                '                    <span><%=userName%></span>' +
                '                    <span><a href="/">个人中心</a></span>' +
                '                    <span><a href="/">i厦门</a></span>' +
                '                </li>' +
                '<% } %>' +
                '            </ul>'
            );
        },
        loginDraw: function(haslogin, userName) {
            var that = this;
            that.$headercon.append(that.TMPheader({
                haslogin: haslogin,
                userName: userName
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
                        this.$userName.parents('.form-group').addClass('has-error');
                        this.$userName.next('.help-block').html(MSG["false"] + data.msg);
                        break;
                    }
                case 1002:
                    {
                        this.$userName.parents('.form-group').addClass('has-error');
                        this.$userName.next('.help-block').html(MSG["false"] + data.msg);
                        break;
                    }
                case 1003:
                    {
                        this.$userName.parents('.form-group').addClass('has-error');
                        this.$userName.next('.help-block').html(MSG["false"] + data.msg);
                        break;
                    }
                case 2001:
                    {
                        this.$Tel.parents('.form-group').addClass('has-error');
                        this.$Tel.next('.help-block').html(MSG["false"] + data.msg);
                        break;
                    }
                case 2002:
                    {
                        this.$Tel.parents('.form-group').addClass('has-error');
                        this.$Tel.next('.help-block').html(MSG["false"] + data.msg);
                        break;
                    }
                case 2003:
                    {
                        this.$Tel.parents('.form-group').addClass('has-error');
                        this.$Tel.next('.help-block').html(MSG["false"] + data.msg);
                        break;
                    }
                case 2005:
                    {
                        this.$Tel.parents('.form-group').addClass('has-error');
                        this.$Tel.next('.help-block').html(MSG["false"] + data.msg);
                        break;
                    }
                case 3001:
                    {
                        this.$Tel.parents('.form-group').addClass('has-error');
                        this.$Tel.next('.help-block').html(MSG["false"] + data.msg);
                        break;
                    }
                case 3002:
                    {
                        this.$Tel.parents('.form-group').addClass('has-error');
                        this.$Tel.next('.help-block').html(MSG["false"] + data.msg);
                        break;
                    }
                case 3003:
                    {
                        this.$Tel.parents('.form-group').addClass('has-error');
                        this.$Tel.next('.help-block').html(MSG["false"] + data.msg);
                        break;
                    }
                case 3005:
                    {
                        this.$Tel.parents('.form-group').addClass('has-error');
                        this.$Tel.next('.help-block').html(MSG["false"] + data.msg);
                        break;
                    }
                case 4004:
                    {
                        this.$validateCode.parents('.form-group').addClass('has-error');
                        this.$validateCode.parents('.input-group').next('.help-block').html(MSG["false"] + data.msg);
                        break;
                    }
                case 4006:
                    {
                        this.$validateCode.parents('.form-group').addClass('has-error');
                        this.$validateCode.parents('.input-group').next('.help-block').html(MSG["false"] + data.msg);
                        break;
                    }
                default:
                    {
                        this.$msgCode.addClass('text-danger').html(MSG["false"] + data.msg);
                        break;
                    }
            }
        }
    };
    window.ResultOpt = new ResultOpt();
});