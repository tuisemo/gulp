<%@page import="com.sdp.util.RequestUtil"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!-- include jstl标签库 -->
<%@ include file="../include/include.jsp" %>
<%
    String fromCoAppName = RequestUtil.getParameterAndTrim(request, "fromCoAppName");
    request.getSession().setAttribute("fromCoAppName", fromCoAppName);
%>
<%@page import="com.chinaums.xm.macUtil.DESPlus"%>
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>通行证</title>
    <!-- inject:base:css -->
    <!-- endinject -->
    <!--IEhack@include('./include/IEhack.html')-->
</head>

<body>
    @@include('./include/header.html')
    <div class="ixm-container wrap">
        <div class="ixm-body">
            <div class="col-sm-12 container-top">市民通行证密码找回</div>
            <div class="col-sm-5 col-sm-offset-1 col-xs-12">
                <form class="form-horizontal col-sm-12 col-xs-12" action="/dis/passport/resetPwdChooseUI" method="post">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">用户名:</label>
                        <div class="col-sm-9">
                            <input id="forgetInput" name="userName" data-ignore="true" type="text" class="form-control" placeholder="请输入用户名/手机/邮箱">
                            <span class="help-block" data-msg="1005">请输入用户名/手机/邮箱</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">验证码:</label>
                        <div class="col-sm-9">
                            <div class="input-group">
                                <input name="validateCode" type="text" class="form-control" placeholder="图片验证码">
                                <div class="input-group-btn">
                                    <img class="btn btn-default codeimg reloadBtn" src="http://ixm.terton.com.cn/dis/passport/authCode/show" style="padding:0;height:34px;">
                                    <div class="btn btn-default reloadBtn">刷新</div>
                                </div>
                            </div>
                            <span class="help-block" data-msg="4000"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-9">
                            <div class="col-sm-12 btn btn-primary" onclick="Passport.ForgetAccount('Citizen')">找回密码</div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-9">
                            <span class="fl"><a href="/signup.html" target="_blank"><small>免费注册</small>
                            </a></span>
                            <span class="fr"><a href="/login.html" target="_blank"><small>去登录</small>
                            </a></span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-sm-4 col-sm-offset-2 hidden-xs">
                <div class="warm-text">
                    <h4>温馨提示：</h4>
                    <p>市民通行证为您提供统一权威的实名电子身份，注册实名后不仅可以在“i厦门”惠民服务平台上享受在线办理积分入学、交通违法查询与缴交、生育险在线申领等来自多个部门的办事服务，还可以登录到其他如厦门交警网、人力资源和社会保障局网、厦门图书馆等打通了市民通行证登录的系统。随着越来越多的应用服务系统改造成市民通行证通行系统，未来您的市民通行证将在厦门“一个ID，一次登录，全市通行”。</p>
                </div>
            </div>
        </div>
    </div>
    @@include('./include/footer.html')
    <!-- inject:none:js -->
    <!-- endinject -->
    @@include('./include/JSinclude.html')
    <script>
    require(['脚本tools', '脚本Passport'], function() {});
    </script>
</body>

</html>