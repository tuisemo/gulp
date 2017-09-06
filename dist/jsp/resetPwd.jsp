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
            <div class="col-sm-12">
                <ul class="step step-square">
                    <li class="active">
                        <a>填写用户名</a>
                    </li>
                    <li class="active">
                        <a>选择找回方式</a>
                    </li>
                    <li class="active">
                        <a>重新设置密码</a>
                    </li>
                </ul>
            </div>
            <div class="col-sm-8 col-sm-offset-2 col-xs-12">
                <div class="panel panel-default">
                    <div class="panel-heading">手机短信方式找回密码</div>
                    <div class="panel-body">
                        <form class="form-horizontal col-sm-9 col-sm-offset-1 col-xs-12" action="/dis/passport/resetPwdByMobileOrEmail" method="post">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">用户名:</label>
                                <div class="col-sm-9">
                                    <p class="form-control-static">tui**mo</p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">证件号码:</label>
                                <div class="col-sm-9">
                                    <input name="certificateNum" type="text" class="form-control" placeholder="证件号码">
                                    <span class="help-block" data-msg="7000">请输入有效证件号码</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">手&nbsp;&nbsp;&nbsp;&nbsp;机:</label>
                                <div class="col-sm-9">
                                    <p class="form-control-static">182****9098</p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">图片验证码:</label>
                                <div class="col-sm-9">
                                    <div class="input-group">
                                        <input id="validateCode" name="validateCode" type="text" class="form-control" placeholder="图片验证码">
                                        <div class="input-group-btn">
                                            <img id="codeimg" class="btn btn-default" src="http://ixm.terton.com.cn/dis/passport/authCode/show" style="padding:0;height:34px;">
                                            <div id="reloadBtn" class="btn btn-default">刷新</div>
                                        </div>
                                    </div>
                                    <span class="help-block" data-msg="4000"></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">短信验证码:</label>
                                <div class="col-sm-9">
                                    <div class="input-group">
                                        <input id="msgCode" name="msgCode" type="text" class="form-control" placeholder="请输入校验码">
                                        <span class="input-group-btn">
                            <div id="sendmsg" class="btn btn-primary" data-type="01" style="display:inline-block;">发送校验码</div>
                            <div id="msgtimer" class="btn btn-default" style="display:none;" disabled="">发送校验码</div>
                        </span>
                                    </div>
                                    <span class="help-block" data-msg="5000"></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">设置密码:</label>
                                <div class="col-sm-9">
                                    <input name="password" type="password" class="form-control password" id="FPassword" placeholder="设置密码">
                                    <span class="help-block" data-msg="6000">8-30位字符包含数字和英文字符</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">确认密码:</label>
                                <div class="col-sm-9">
                                    <input name="password" type="password" class="form-control password" id="CPassword" placeholder="确认密码">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-offset-3 col-sm-9">
                                    <div class="btn btn-primary col-sm-12" onclick="$('form').submit();">确认修改</div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @@include('./include/footer.html')
    <!-- inject:none:js -->
    <!-- endinject -->
    @@include('./include/JSinclude.html')
</body>

</html>