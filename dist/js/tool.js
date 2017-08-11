define(['脚本layer'], function(layer) {
    var tool = function() {
        this.$header = $("#header");
        this.$headercon = $("#header .container");
        this.init();
    };
    tool.prototype = {
        init: function() {
            this.Alltemplate();
            this.loginCheck();
        },
        //检查登录状态
        loginCheck: function() {
            var that = this;
            $.ajax({
                url: 'www.ixm.gov.cn/dis/interface/user_inferface_v1.0.jsp?callback=ssoUser_for_login',
                type: 'GET',
                dataType: 'jsonp',
                data: {},
                success: function(data) {
                    that.loginDraw(data.result,data.user.info);
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
                //'        <a href="/">' +
                //'            <div class="logo"></div>' +
                //'        </a>' +
                '        <nav class="header-nav col-sm-4 hidden-xs">' +
                '            <ul class="nav-menu fr">' +
                '<% if (!haslogin) { %>' +
                '                <li class="nav-li"><a href="http://www.ixm.gov.cn/sy/zczy/" target=_blank >注册指引</a></li>' +
                '                <li id="loginbox" class="nav-li">' +
                '                    <span><a href="/">登录</a></span>&nbsp;|' +
                '                    <span><a href="/">注册</a></span>' +
                '                </li>' +
                '<% } else { %>' +
                '                <li id="hasloginbox" class="nav-li">' +
                '                    <span><a href="/"><%=userName%></a></span>&nbsp;|' +
                '                    <span><a href="/">退出</a></span>' +
                '                </li>' +
                '<% } %>' +
                '            </ul>' +
                '        </nav>'
            );
        },
        loginDraw: function(haslogin, userName) {
            var that = this;
            that.$headercon.append(that.TMPheader({
                haslogin: haslogin,
                userName: userName
            }));
        }
    };
    window.tool = new tool();
});
