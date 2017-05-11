define(['vue'], function(Vue) {

    var common = new Vue({
        el: '#header',
        created: function() {
            var that = this;
            that.Alltemplate();
            that.loginDraw();
            that.setTimerFunc();
        },
        data: {
            loginDrawHTML: '',
            loginStatue: false
        },
        watch: {
            loginStatue: function(newValue) {
                if (newValue) {
                    console.log('成功');
                } else {
                    console.log('失败');
                }
            }
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
                    url: 'http://www.ixm.gov.cn/dis/interface/user_inferface_v1.0.jsp',
                    type: 'GET',
                    async: true,
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
                            var logmsg = $('#log').html();
                            $('#log').html(logmsg + "...登录成功...==> \n" + new Date());
                            $('#log').scrollTop($('#log')[0].scrollHeight);
                            that.loginStatue = true;
                        } else {
                            that.loginDrawHTML = that.TMPheader({
                                haslogin: false,
                                userName: ''
                            });
                            var logmsg = $('#log').html();
                            $('#log').html(logmsg + "============登录失败=========== \n" + new Date());
                            $('#log').scrollTop($('#log')[0].scrollHeight);
                            that.loginStatue = false;
                        }
                    },
                    error: function() {
                        that.loginDrawHTML = that.TMPheader({
                            haslogin: false,
                            userName: ''
                        });
                        that.loginStatue = false;
                    }
                });
            },
            //定时轮循
            setTimerFunc: function() {
                var that = this;
                setTimeout(function() {
                    that.loginDraw();
                    that.setTimerFunc();
                }, 60000);
            }
        }
    });
    window.common = common;
});
