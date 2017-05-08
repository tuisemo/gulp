define(['vue'], function(Vue) {

    var common = new Vue({
        el: '#header',
        created: function() {
            var that = this;
            that.Alltemplate();
            that.loginDraw();
        },
        data: {
            loginDrawHTML: ''
        },
        methods: {
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
                    '                    <span><a href="/"><%=hello%> , <%=userName%></a></span>&nbsp;|' +
                    '                    <span><a href="http://www.ixm.gov.cn/ids/admin/logout.jsp">退出</a></span>' +
                    '                </li>' +
                    '<% } %>' +
                    '            </ul>'
                );
            },
            loginDraw: function(haslogin, userName) {
                var that = this;
                $.ajax({
                    url: 'https://www.ixm.gov.cn/dis/interface/user_inferface_v1.0.jsp',
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    jsonpCallback: 'ssoUser_for_login',
                    data: {},
                    success: function(data) {
                        if (data.result) {
                            that.loginDrawHTML = that.TMPheader({
                                haslogin: data.result,
                                hello: data.user.hello,
                                userName: data.user.userName
                            });
                        } else {
                            that.loginDrawHTML = that.TMPheader({
                                haslogin: false,
                                userName: ''
                            });
                        }
                    },
                    error: function() {
                        that.loginDrawHTML = that.TMPheader({
                            haslogin: false,
                            userName: ''
                        });
                        return false;
                    }
                });
            }
        }
    });
    window.common = common;
});
