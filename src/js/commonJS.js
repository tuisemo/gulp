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
            loginStatue: false,
            idsCode: 'http://www.ixm.gov.cn/ids/admin/abc.code?'
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
                    '                    <span><a href="/vue.html">注册</a></span>' +
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
                            that.loginStatue = true;
                        } else {
                            that.loginDrawHTML = that.TMPheader({
                                haslogin: false,
                                userName: ''
                            });
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
            //模拟请求
            requset: function() {
                var that = this;
                that.idsCode = that.idsCode + Math.random();
                $.ajax({
                    url: '/api/request',
                    type: 'GET',
                    dataType: 'html',
                    data: {
                        data: Math.random()
                    },
                    success: function(data) {
                        console.log(data);
                    },
                    erroe: function() {}
                });
                /*$.ajax({
                    //url: 'http://www.ixm.gov.cn/ids/custom/xiamen/login_xm.jsp',
                    url: 'http://www.ixm.gov.cn',
                    type: 'GET',
                    dataType: 'jsonp',
                    data: {
                        data: Math.random()
                    },
                    success: function(data) {
                        console.log(data);
                    },
                    erroe: function() {}
                });*/
            },
            //定时轮循
            setTimerFunc: function() {
                var that = this;
                setTimeout(function() {
                    that.requset();
                    that.setTimerFunc();
                }, 600);
            }
        }
    });
    window.common = common;
});
