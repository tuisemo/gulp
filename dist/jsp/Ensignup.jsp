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
    <div class="ixm-container wrap" data-type="enterprise">
        <div class="ixm-body">
            <div class="col-sm-12 container-top">法人通行证注册</div>
            <div class="col-sm-8 col-sm-offset-1 col-xs-12">
                <form class="form-horizontal col-sm-12 col-xs-12" action="/dis/passport/reg" method="post">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">注册所在地:</label>
                        <div class="col-sm-10">
                            <div class="input-group pad-t5">
                                <label>
                                    <input type="radio" name="isLocal" value="true" checked="checked" autocomplete="off"> 厦门市&nbsp;&nbsp;</label>
                                <label>
                                    <input type="radio" name="isLocal" value="false" autocomplete="off"> 非厦门市&nbsp;&nbsp;</label>
                            </div>
                            <span class="help-block">非厦门市企业注册需要1-2个工作日的人工审核，审核结果会以短信方式通知您</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">单位性质:</label>
                        <div class="col-sm-10">
                            <div class="input-group pad-t5">
                                <label>
                                    <input type="radio" name="enterpriseType" value="businessGroup" checked="checked"> 企业&nbsp;&nbsp;</label>
                                <label>
                                    <input type="radio" name="enterpriseType" value="formalGroup" disabled=""> 事业单位&nbsp;&nbsp;</label>
                                <label>
                                    <input type="radio" name="enterpriseType" value="informalGroup" disabled=""> 社团&nbsp;&nbsp;</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">单位名称:</label>
                        <div class="col-sm-5">
                            <input id="enterpriseName" name="enterpriseName" type="text" class="form-control" placeholder="请输入营业执照上的单位名称" value="">
                        </div>
                        <span class="help-block"></span>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">登记注册地址:</label>
                        <div class="col-sm-5">
                            <input id="licenseLocation" name="licenseLocation" type="text" class="form-control" placeholder="请填写登记注册地址" value="">
                        </div>
                        <span class="help-block"></span>
                    </div>
                    <!-- ==================三证合一切换================== -->
                    <div class="form-group">
                        <label class="col-sm-2 control-label">已办理三证合一:</label>
                        <div class="col-sm-10">
                            <div class="input-group pad-t5">
                                <label>
                                    <input type="radio" name="idUpdate" value="true" checked="checked"> 已换证&nbsp;&nbsp;</label>
                                <label>
                                    <input type="radio" name="idUpdate" value="false"> 未换证&nbsp;&nbsp;</label>
                            </div>
                            <span class="help-block">非厦门市企业注册需要1-2个工作日的人工审核，审核结果会以短信方式通知您</span>
                        </div>
                    </div>
                    <!-- ==================三证合一切换================== -->
                    <div id="EnBox1">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">统一社会信用代码:</label>
                            <div class="col-sm-5">
                                <input id="unifiedcreditCode" name="unifiedcreditCode" type="text" class="form-control" placeholder="请输入18位统一社会信用代码" value="">
                            </div>
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div id="EnBox2" style="display: none;">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">营业执照:</label>
                            <div class="col-sm-5">
                                <input id="businessLicense" name="businessLicense" type="text" class="form-control" placeholder="请输入15位营业执照注册号" value="">
                            </div>
                            <span class="help-block"></span>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">组织机构代码:</label>
                            <div class="col-sm-5">
                                <input id="organizationCode" name="organizationCode" type="text" class="form-control" placeholder="请输入9位组织机构代码" value="">
                            </div>
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">联系人姓名:</label>
                        <div class="col-sm-5">
                            <input id="certificateName" name="certificateName" type="text" value="" class="form-control" placeholder="请填写真实姓名">
                        </div>
                        <span class="help-block"></span>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">联系人身份证号:</label>
                        <div class="col-sm-5">
                            <input id="certificateNum" name="certificateNum" type="text" value="" class="form-control" placeholder="请输入有效证件号">
                        </div>
                        <span class="help-block"></span>
                    </div>
                    <!--===================法人注册信息====================-->
                    <div class="form-group">
                        <label class="col-sm-2 control-label">用&nbsp;户&nbsp;名:</label>
                        <div class="col-sm-5">
                            <input id="userName" name="userName" type="text" class="form-control" placeholder="用户名">
                        </div>
                        <span class="help-block">以英文字母开头，可包含3-20个字符（例：abc123）</span>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机:</label>
                        <div class="col-sm-5">
                            <input name="mobile" type="tel" class="form-control" id="Tel" placeholder="建议使用省内手机">
                        </div>
                        <span class="help-block">请输入省内有效手机号码 (不支持170/171/175号段)</span>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">图片验证:</label>
                        <div class="col-sm-5">
                            <div class="input-group">
                                <input id="validateCode" name="validateCode" type="text" class="form-control" placeholder="图片验证码">
                                <div class="input-group-btn">
                                    <img id="codeimg" class="btn btn-default" src="http://www.ixm.gov.cn/dis/passport/authCode/show" style="padding:0;height:34px;">
                                    <div id="reloadBtn" class="btn btn-default">刷新</div>
                                </div>
                            </div>
                        </div>
                        <span class="help-block"></span>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">短信验证:</label>
                        <div class="col-sm-5">
                            <div class="input-group">
                                <input id="msgCode" name="msgCode" type="text" class="form-control" placeholder="请输入校验码">
                                <span class="input-group-btn">
                            <div id="sendmsg" class="btn btn-primary" data-type="01" data-domainname="Enterprise" style="display:inline-block;">发送校验码</div>
                            <div id="msgtimer" class="btn btn-default" style="display:none;" disabled="">发送校验码</div>
                        </span>
                            </div>
                        </div>
                        <span class="help-block"></span>
                    </div>
                    <p class="col-sm-offset-2 help-block">省外手机用户可在点击发送按钮后，使用本机号码拨打0592-5051516询查验证码</p>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">设置密码:</label>
                        <div class="col-sm-5">
                            <input name="password" type="password" class="form-control password" id="FPassword" placeholder="设置密码">
                        </div>
                        <span class="help-block">8-30位字符包含数字和英文字符</span>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">确认密码:</label>
                        <div class="col-sm-5">
                            <input name="password" type="password" class="form-control password" id="CPassword" placeholder="确认密码">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-5">
                            <div class="checkbox">
                                <label>
                                    <input id="check" type="checkbox" checked="checked"><small>我已阅读并接受 <a href="/" target="_blank">“法人通行证”服务协议</a></small>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-5">
                            <div class="btn btn-primary col-sm-12 col-xs-12" onclick="Passport.EnterpriseSignUp()">提交注册</div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-5">
                            <span class="fl"><a href="/forgetPwd.html" target="_blank"><small>找回密码</small>
                            </a></span>
                            <span class="fr"><a href="/forgetPwd.html" target="_blank"><small>去登录</small>
                            </a></span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-sm-3 hidden-xs">
                <div class="warm-text">
                    <h3>温馨提示：</h3>
                    <p>法人通行证是包括企业、事业单位、社会团体等法人的实名电子身份，注册认证了法人通行证的企业或单位不仅可以享受“i厦门”企业服务平台的各项服务，还可以登录到厦门市其他打通了法人通行证登录的在线服务系统。随着越来越多的应用服务系统改造成法人通行证通行系统，未来您的法人通行证将在厦门“一个ID，一次登录，全市通行”。</p>
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