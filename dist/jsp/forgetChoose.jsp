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
            <div class="col-sm-12 step-row">
                <div class="step-item col-sm-4">
                    <div class="step-line"><i></i></div>
                    <div class="num"><span>1</span></div>
                    <label class="step-msg">已完成</label>
                </div>
                <div class="step-item col-sm-4">
                    <div class="num"><span>1</span></div>
                    <label class="step-msg">已完成</label>
                    <div class="step-line"><i></i></div>
                </div>
            </div>
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">手机方式找回</div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-8">
                                <p>您的账号已绑定手机（182****9098），可以选择该方式！</p>
                            </div>
                            <div class="col-md-4">
                                <a href="/dis/passport/resetPwdByMobileUI">
                                    <div class="btn btn-primary fr">前往找回</div>
                                </a>
                            </div>
                        </div>
                        <p>备注：涉及证件号时，港澳台人员请输入注册时使用的有效来往大陆通行证件号，外籍人士输入注册时使用的护照号</p>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">邮箱方式找回</div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-8">
                                <p>您的账号已绑定邮箱（tui****sian.cn），可以选择该方式！</p>
                            </div>
                            <div class="col-md-4">
                                <a href="/dis/passport/resetPwdByEmailUI">
                                    <div class="btn btn-primary fr">前往找回</div>
                                </a>
                            </div>
                        </div>
                        <p>备注：涉及证件号时，港澳台人员请输入注册时使用的有效来往大陆通行证件号，外籍人士输入注册时使用的护照号</p>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">密保方式找回</div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-8">
                                <p>您的账号未设置密保！</p>
                            </div>
                            <div class="col-md-4">
                                <div class="btn btn-default fr" disabled="">前往找回</div>
                            </div>
                        </div>
                        <p>备注：涉及证件号时，港澳台人员请输入注册时使用的有效来往大陆通行证件号，外籍人士输入注册时使用的护照号</p>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">人工申诉找回</div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-8">
                                <p>填写申请单，上传证件照片，我们将会在两个工作日内受理，请耐心等待！</p>
                            </div>
                            <div class="col-md-4">
                                <a href="/dis/passport/complaintUI">
                                    <div class="btn btn-primary fr">前往找回</div>
                                </a>
                            </div>
                        </div>
                        <p>备注：涉及证件号时，港澳台人员请输入注册时使用的有效来往大陆通行证件号，外籍人士输入注册时使用的护照号</p>
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