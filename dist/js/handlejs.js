define(["脚本MSG"],function(){var e=function(){this.$userName=$("#userName"),this.$Tel=$("input[type='tel']"),this.$Email=$("input[type='email']"),this.$validateCode=$("#validateCode"),this.$msgCode=$("#msgCode"),this.$codeimg=$("#codeimg"),this.$reloadBtn=$("#reloadBtn"),this.$Password=$(".password"),this.$CPassword=$("#CPassword"),this.$SubmitBtn=$("#submit"),this.$FileUploadBtn=$("#FileUploadBtn"),this.init()};e.prototype={init:function(){this.listen()},optMsg:function(e,s,a){s===!0?(e.parents(".form-group").addClass("has-success"),e.next(".help-block").html(MSG.true)):(e.parents(".form-group").addClass("has-error"),e.next(".help-block").html(MSG.false+MSG[a]))},Timesetter:function(e){0===wait?($("#msgtimer").HTML("发送校验码"),$("#sendmsg").show(),$("#msgtimer").hide(),wait=180,timeBoo=!0):(180==wait&&($("#sendmsg").hide(),$("#msgtimer").show()),timeBoo=!1,document.getElementById("msgtimer").innerHTML=wait+"秒后再重试",wait--,setTimeout(function(){time(e)},1e3))},checkuserName:function(){var e=this,s=e.$userName.val();/^[a-zA-Z][a-zA-Z0-9_]{2,19}$/.test(s)?$.ajax({url:"/checkTel",type:"GET",dataType:"json",data:{attributeName:"userName",attributeValue:s},success:function(s){s.result?e.optMsg(e.$userName,!0):e.optMsg(e.$userName,!1,202)}}):e.optMsg(e.$userName,!1,"102")},checkTel:function(){var e=this,s=e.$Tel.val();/^((13[0-9])|(14[0-9])|(15[0-9])|(17[2-9])|(18[0-9]))\d{8}$/.test(s)&&11==s.length?$.ajax({url:"/checkTel",type:"GET",dataType:"json",data:{attributeName:"mobile",attributeValue:s},success:function(s){s.result?e.optMsg(e.$Tel,!0):(telTrue=!1,e.optMsg(e.$Tel,!1,203))}}):e.optMsg(e.$Tel,!1,202)},checkvalidateCode:function(){var e=this;$.ajax({url:"/checkTel",type:"GET",dataType:"json",data:{Code:e.$validateCode.val()},success:function(s){s.result?e.optMsg(e.$validateCode,!0):e.optMsg(e.$validateCode,!1,302)}})},reloadvalidate:function(){var e=this;e.$validateCode.val(""),e.$codeimg.attr("src","http://www.ixm.gov.cn/dis/passport/authCode/show?"+Math.random()),validateTrue=!1},checkpassword:function(e){var s=this,a=s.$Password.val();/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(a)?a.length<8||a.length>30?s.optMsg(s.$Password,!1,502):$.ajax({url:"/checkTel",type:"GET",dataType:"json",data:{userName:s.$userName.val()||"",password:a},success:function(e){e.result?s.optMsg(s.$Password,!0):s.optMsg(s.$Password,!1,302)}}):s.optMsg(s.$Password,!1,502)},confirmpwd:function(){},CitizenSignUp:function(){var e=this;$.ajax({url:"/api/checkUserAttribute",dataType:"json",async:!0,data:{attributeValue:"tuisemo3",attributeName:"userName",domainName:"Citizen"},type:"POST"}).done(function(e){switch(e.code){case 200:return $.ajax({url:"/api/checkUserAttribute",dataType:"json",async:!0,data:{attributeValue:"18248639098",attributeName:"mobile",domainName:"Citizen"},type:"POST"});case-1:return $("#valimsg").addClass("text-danger"),$("#valimsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'+e.result),!1;case 1001:return $("#usermsg").addClass("text-danger"),$("#usermsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'+e.result),!1;case 1002:return $("#usermsg").addClass("text-danger"),$("#usermsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'+e.result),!1;case 1003:return $("#usermsg").addClass("text-danger"),$("#usermsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'+e.result),!1;case 2001:return $("#mobilemsg").addClass("text-danger"),$("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'+e.result),!1;case 2002:return $("#mobilemsg").addClass("text-danger"),$("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'+e.result),!1;case 2003:return $("#usermsg").addClass("text-danger"),$("#usermsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'+e.result),!1;default:$("#valimsg").addClass("text-danger"),$("#valimsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'+e.result)}}).done(function(s){$.ajax({url:"/path/to/file",type:"POST",dataType:"json",data:{userName:e.$userName.val(),mobile:e.$Tel.val(),Code:e.$validateCode.val(),msgCode:e.$msgCode.val(),password:e.$CPassword.val()},success:function(e){switch(e.code){case 200:return $.ajax({url:"/api/checkUserAttribute",dataType:"json",async:!0,data:{attributeValue:"18248639098",attributeName:"mobile",domainName:"Citizen"},type:"POST"});case-1:return $("#valimsg").addClass("text-danger"),$("#valimsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'+e.result),!1;case 1001:return $("#usermsg").addClass("text-danger"),$("#usermsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'+e.result),!1;case 1002:return $("#usermsg").addClass("text-danger"),$("#usermsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'+e.result),!1;case 1003:return $("#usermsg").addClass("text-danger"),$("#usermsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'+e.result),!1;case 2001:return $("#mobilemsg").addClass("text-danger"),$("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'+e.result),!1;case 2002:return $("#mobilemsg").addClass("text-danger"),$("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'+e.result),!1;case 2003:return $("#usermsg").addClass("text-danger"),$("#usermsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'+e.result),!1;default:$("#valimsg").addClass("text-danger"),$("#valimsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'+e.result)}}})}).fail(function(e){console.log(e)})},removeClass:function(e){e.parents(".form-group").removeClass("has-success has-warring has-error")},listen:function(){var e=this;e.$userName.on("blur",function(){e.checkuserName()}),e.$userName.on("focus",function(){e.removeClass($(this)),$(this).next(".help-block").html(MSG[101])}),e.$Tel.on("blur",function(){e.checkTel()}),e.$Tel.on("focus",function(){e.removeClass($(this)),$(this).next(".help-block").html(MSG[201])}),e.$validateCode.on("focus",function(){e.removeClass($(this)),$(this).next(".help-block").html(MSG[401])}),e.$codeimg.on("click",function(){e.reloadvalidate($(this))}),e.$reloadBtn.on("click",function(){e.reloadvalidate($(this))}),e.$Password.on("blur",function(){e.checkpassword()}),e.$Password.on("focus",function(){e.removeClass($(this)),$(this).next(".help-block").html(MSG[501])}),e.$SubmitBtn.on("click",function(){e.CitizenSignUp()})}},window.checkFunc=new e});