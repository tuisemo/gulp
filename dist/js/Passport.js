define(["脚本tool","脚本layer"],function(){var e=function(e){this.wait=10,this.timeBoo=!0,this.$userName=$('input[name="userName"]'),this.$mobile=$('input[name="mobile"]'),this.$validateCode=$('input[name="validateCode"]'),this.$sendmsgBtn=$("#sendmsg"),this.$msgCode=$("#msgCode"),this.$codeimg=$("#codeimg"),this.$reloadBtn=$("#reloadBtn"),this.$Password=$('input[name="password"]'),this.$FPassword=$("#FPassword"),this.$CPassword=$("#CPassword"),this.$SubmitBtn=$("#submit"),this.$Check=$("#check"),this.$forgetInput=$("#forgetInput"),this.$ForgetBtn=$("#ForgetBtn"),this.$enterpriseName=$("#enterpriseName"),this.$licenseLocation=$("#licenseLocation"),this.$businessLicense=$("#businessLicense"),this.$organizationCode=$("#organizationCode"),this.$unifiedcreditCode=$("#unifiedcreditCode"),this.$certificateName=$("#certificateName"),this.$certificateNum=$("#certificateNum"),this.$EnBox1=$("#EnBox1"),this.$EnBox2=$("#EnBox2"),this.$idUpdate=$("input[name='idUpdate']"),this.init()};e.prototype={init:function(){this.listen()},listen:function(){var e=this;e.$userName.on("blur",function(){e.checkuserName()}).on("focus",function(){e.removeClass($(this)),$(this).parents(".form-group").find(".help-block").html(MSG[101])}),e.$mobile.on("blur",function(){e.checkTel()}).on("focus",function(){e.removeClass($(this)),$(this).parents(".form-group").find(".help-block").html(MSG[201])}),e.$validateCode.on("focus",function(){e.removeClass($(this)),$(this).parents(".form-group").find(".help-block").html(MSG[401])}),e.$codeimg.on("click",function(){e.reloadvalidate($(this))}),e.$sendmsgBtn.on("click",function(t){e.sendMsgFor($(this).attr("data-type"),$(this).attr("data-domainname"))}),e.$reloadBtn.on("click",function(){e.reloadvalidate($(this))}),e.$FPassword.on("blur",function(){e.checkpassword()}),e.$CPassword.on("blur",function(){e.confirmpwd()}),e.$Password.on("focus",function(){e.removeClass($(this)),$(this).parents(".form-group").find(".help-block").html(MSG[501])}),e.$SubmitBtn.on("click",function(){e.SignUp()}),e.$ForgetBtn.on("click",function(){e.ForgetAccount()}),e.$idUpdate.on("click",function(){e.Enterpriseinfo($(this).val())}),e.$enterpriseName.on("focus",function(){e.removeClass($(this)),$(this).parents(".form-group").find(".help-block").html(MSG.En100)}).on("blur",function(){e.REGEX(3,$(this))}),e.$licenseLocation.on("focus",function(){e.removeClass($(this)),$(this).parents(".form-group").find(".help-block").html(MSG.En200)}).on("blur",function(){e.REGEX(3,$(this))}),e.$businessLicense.on("focus",function(){e.removeClass($(this)),$(this).parents(".form-group").find(".help-block").html(MSG.En300)}).on("blur",function(){e.REGEX(2,$(this))}),e.$organizationCode.on("focus",function(){e.removeClass($(this)),$(this).parents(".form-group").find(".help-block").html(MSG.En400)}).on("blur",function(){e.REGEX(2,$(this))}),e.$unifiedcreditCode.on("focus",function(){e.removeClass($(this)),$(this).parents(".form-group").find(".help-block").html(MSG.En500)}).on("blur",function(){e.REGEX(2,$(this))}),e.$certificateName.on("focus",function(){e.removeClass($(this)),$(this).parents(".form-group").find(".help-block").html("")}).on("blur",function(){e.REGEX(3,$(this))}),e.$certificateNum.on("focus",function(){e.removeClass($(this)),$(this).parents(".form-group").find(".help-block").html("")}).on("blur",function(){e.checkIDnumber($(this).val())})},optMsg:function(e,t,s){t===!0?e.parents(".form-group").addClass("has-success").find(".help-block").html(MSG.true):e.parents(".form-group").addClass("has-error").find(".help-block").html(MSG.false+MSG[s])},removeClass:function(e){e.parents(".form-group").removeClass("has-success has-warring has-error")},REGEX:function(e,t){var s=this,i=$(t).val(),o=/^[0-9]+$/,n=/^[0-9a-zA-Z._]*$/g,a=/[a-zA-Z|\u4e00-\u9fa5]/;switch(e){case 1:o.test(i)||s.optMsg(t,!1,"REG");break;case 2:n.test(i)||s.optMsg(t,!1,"REG");break;case 3:a.test(i)||s.optMsg(t,!1,"REG")}},Timesetter:function(e){var t=this;this.timeBoo=!1,0===t.wait?($("#msgtimer").html("发送校验码").hide(),$("#sendmsg").show(),t.wait=10,t.timeBoo=!0):(10==t.wait&&($("#sendmsg").hide(),$("#msgtimer").show()),$("#msgtimer").html(t.wait+"秒后再重试"),t.wait--,setTimeout(function(){t.Timesetter(e)},1e3))},checkuserName:function(){var e=this,t=e.$userName.val();/^[a-zA-Z][a-zA-Z0-9_]{2,19}$/.test(t)||e.optMsg(e.$userName,!1,"102")},checkTel:function(){var e=this,t=e.$mobile.val();/^((13[0-9])|(14[0-9])|(15[0-9])|(17[2-9])|(18[0-9]))\d{8}$/.test(t)&&11==t.length||e.optMsg(e.$mobile,!1,202)},reloadvalidate:function(){var e=this;e.$validateCode.val(""),e.$codeimg.attr("src","http://ixm.terton.com.cn/dis/passport/authCode/show?"+Math.random()),validateTrue=!1},checkpassword:function(){var e=this,t=e.$FPassword.val();/^[A-Za-z0-9`~!@#\$%\^&\*\(\)_\+-=\[\]\{\}\\\|;:'"<,>\.\?\/]{8,30}$/.test(t)?t.length<8||t.length>30?e.optMsg(e.$FPassword,!1,502):$.ajax({url:"/dis/ids/checkUserPwd",type:"GET",dataType:"json",cache:!1,data:{userName:e.$userName.val()||"",password:e.$FPassword.val()},success:function(t){t.result?e.optMsg(e.$FPassword,!0):(ResultOpt.msg(t),e.optMsg(e.$FPassword,!1,503))}}):e.optMsg(e.$FPassword,!1,502)},confirmpwd:function(){var e=this;e.$FPassword.val()!=e.$CPassword.val()&&(e.optMsg(e.$FPassword,!1,505),e.optMsg(e.$CPassword,!1,505))},sendMsgFor:function(e,t,s){var i=this;if(!i.timeBoo)return!1;$.ajax({url:"/dis/passport/sendMsg",dataType:"json",async:!0,cache:!1,data:{operationType:e,domainName:t,sendType:s,mobile:i.$mobile.val()||"",code:i.$validateCode.val()||""},type:"POST",success:function(e){if(200==e.code||e.result)return $("#msgtimer").hide(),$("#sendmsg").show(),$("#mobilemsg").addClass("text-success").html(MSG.true+e.msg),void i.Timesetter();ResultOpt.msg(e)},error:function(e){layer.msg("请求出错，请稍后重试")}}).done(function(e){})},checkIDnumber:function(e){var t=this;if(18!=e.length)return t.optMsg(t.$certificateNum,!1,"IdReg"),!1;"x"==e[17]&&(e=e.replace("x","X"));for(var s,i=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],o=["1","0","X","9","8","7","6","5","4","3","2"],n=0,a=0;a<=16;a++)n+=e[a]*i[a];if(s=n%11,e[17]==o[s])return!0;t.optMsg(t.$certificateNum,!1,"IdReg")},SignUp:function(){var e=this;if(!e.$Check.is(":checked"))return void layer.msg("请勾选通行证协议");var t=e.$userName.val()+";"+e.$mobile.val();$.ajax({url:"dis/passport/checkUserAttribute",dataType:"json",async:!0,data:{attributeValue:t,attributeName:"userName;mobile",domainName:"Citizen"},type:"POST"}).done(function(e){200==e.code||e.result?$("form").submit():ResultOpt.msg(e)}).fail(function(e){console.log(e),layer.msg("请求出错，请稍后重试")})},EnterpriseSignUp:function(){var e=this;if(!e.$Check.is(":checked"))return void layer.msg("请勾选通行证协议");var t,s;"true"==$("input[name='idUpdate']:checked").val()?(t=e.$userName.val()+";"+e.$mobile.val()+";"+e.$enterpriseName.val()+";"+e.$unifiedcreditCode.val(),s="userName;mobile;enterpriseName;unifiedcreditCode"):(t=e.$userName.val()+";"+e.$mobile.val()+";"+e.$enterpriseName.val()+";"+e.$businessLicense.val()+";"+e.$organizationCode.val(),s="userName;mobile;enterpriseName;businessLicense;organizationCode"),$.ajax({url:"/dis/passport/checkUserAttribute",dataType:"json",async:!0,data:{attributeValue:t,attributeName:s,code:e.$validateCode.val(),domainName:"Enterprise"},type:"POST"}).done(function(e){200==e.code||e.result?(layer.load(2,{shade:[.1,"#333"]}),$("form").submit()):ResultOpt.msg(e)}).fail(function(e){console.log(e),layer.msg("请求出错，请稍后重试")})},Enterpriseinfo:function(e){var t=this;"true"==e?(t.$EnBox1.show(),t.$EnBox2.hide()):(t.$EnBox1.hide(),t.$EnBox2.show())},ForgetAccount:function(e){var t=this;$.ajax({url:"/dis/passport/checkUser",type:"POST",dataType:"json",data:{userName:t.$forgetInput.val(),code:t.$validateCode.val(),domainName:e},success:function(e){200===e.code||e.result?$("form").submit():ResultOpt.msg(e)},error:function(e){layer.msg("请求出错，请稍后重试")}})}},window.Passport=new e});