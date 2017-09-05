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
    <!--top-->
    @@include('./include/header.html')
    <!--body-->
    <div class="ixm-container wrap">
        <div class="ixm-body">
            <div class="col-sm-12 container-top hidden-xs">市民通行证注册</div>
            <div class="col-sm-5 col-sm-offset-1 col-xs-12">
                <p class="fr pad-r15"><a class="text-danger" href="/dis/passport/realNameRegUI">港澳侨台外籍注册点击此处</a></p>
                <form class="form-horizontal col-sm-12 col-xs-12" action="/dis/passport/reg" method="post">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">用&nbsp;户&nbsp;名:</label>
                        <div class="col-sm-9">
                            <input name="userName" type="text" class="form-control" placeholder="用户名">
                            <span class="help-block" data-msg="1000">以英文字母开头，可包含3-20个字符（例：abc123）</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机:</label>
                        <div class="col-sm-9">
                            <input name="mobile" type="tel" class="form-control" placeholder="建议使用省内手机">
                            <span class="help-block" data-msg="2000">请输入省内有效手机号码 (不支持170/171/175号段)</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">图片验证:</label>
                        <div class="col-sm-9">
                            <div class="input-group">
                                <input name="validateCode" type="text" class="form-control" placeholder="图片验证码">
                                <div class="input-group-btn">
                                    <img class="btn btn-default reloadBtn codeimg" src="http://ixm.terton.com.cn/dis/passport/authCode/show" style="padding:0;height:34px;">
                                    <div class="btn btn-default reloadBtn">刷新</div>
                                </div>
                            </div>
                            <span class="help-block"  data-msg="4000"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">短信验证:</label>
                        <div class="col-sm-9">
                            <div class="input-group ">
                                <input name="msgCode" type="text" class="form-control" placeholder="请输入校验码">
                                <span class="input-group-btn">
                            <div id="sendmsg" class="btn btn-primary" data-type="01" data-domainname="Citizen" style="display:inline-block;">发送校验码</div>
                            <div id="msgtimer" class="btn btn-default" style="display:none;" disabled="">发送校验码</div>
                        </span>
                            </div>
                            <span class="help-block" data-msg="5000"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">设置密码:</label>
                        <div class="col-sm-9">
                            <input name="password" type="password" class="form-control" id="FPassword" placeholder="设置密码">
                            <span class="help-block" data-msg="6000">8-30位字符包含数字和英文字符</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">确认密码:</label>
                        <div class="col-sm-9">
                            <input name="password" type="password" class="form-control" id="CPassword" placeholder="确认密码">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-9">
                            <div class="checkbox">
                                <label>
                                    <input id="check" type="checkbox" checked="checked"><small>我已阅读并接受 <a href="http://www.ixm.gov.cn/sy/fwxy/index.html" target="_blank">“市民通行证”服务协议</a></small>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-9">
                            <div id="submit" class="btn btn-primary col-sm-12 col-xs-12">提交注册</div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-9">
                            <span class="fl"><a href="/forgetPwd.html" target="_blank"><small>找回密码</small>
                            </a></span>
                            <span class="fr"><a href="/forgetPwd.html" target="_blank"><small>去登录</small>
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
    <!--buttom-->
    @@include('./include/footer.html')
    <!-- inject:none:js -->
    <!-- endinject -->
    @@include('./include/JSinclude.html')
</body>

</html>