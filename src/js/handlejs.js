define(['jquery', 'MSG'], function() {
    var begin, end;
    var CheckFunc = function() {
        this.$userName = $("#userName");
        this.$Tel = $("input[type='tel']");
        this.$Email = $("input[type='email']");
        this.$validateCode = $("#validateCode");
        this.$codeimg = $("#codeimg");
        this.$Password = $("input[type='password']");
        this.$SubmitBtn = $("#submit");
        userNamTrue = false;
        UserTrue = false;
        TelTrue = false;
        EmailTrue = false;
        PwdTrue = false;
        this.init(); //定义声明，默认执行函数
    };
    CheckFunc.prototype = {
        init: function() { //默认执行的函数功能汇总
            this.listen();
        },
        checkuserName: function(text) { //定义功能函数
            var that = this;
            var userNameVal = that.$userName.val();
            var userNameRE = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
            if (!userNameRE.test(userNameVal)) {
                userNamTrue = false;
                that.$userName.parents('.form-group').addClass('has-error');
                that.$userName.next('.help-block').html(MSG["false"] + MSG["102"]);
            } else {
                $.ajax({
                    url: '/checkTel',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        'userName': userNameVal
                    },
                    success: function(data) {
                        if (data.result) {
                            userNamTrue = true;
                            that.$userNam.parents('.form-group').addClass('has-success');
                            that.$userNam.next('.help-block').html(MSG["true"]);
                        } else {
                            that.$userNam.parents('.form-group').addClass('has-error');
                            that.$userNam.next('.help-block').html(MSG["false"] + data.msg);
                        }
                    }
                });
            }
        },
        checkTel: function(text) { //定义功能函数
            var that = this;
            var TelVal = that.$Tel.val();
            var telVal = /^(((13[0-9]{1})|(15[0-9]{1})|(17[678]{1})|(18[0-9]{1}))+\d{8})$/;
            if (!telVal.test(TelVal) || TelVal.length != 11) {
                TelTrue = false;
                that.$Tel.parents('.form-group').addClass('has-error');
                that.$Tel.next('.help-block').html(MSG["false"] + MSG["202"]);
            } else {
                $.ajax({
                    url: '/checkTel',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        'tel': TelVal
                    },
                    success: function(data) {
                        if (data.result) {
                            TelTrue = true;
                            that.$Tel.parents('.form-group').addClass('has-success');
                            that.$Tel.next('.help-block').html(MSG["true"]);
                        } else {
                            that.$Tel.parents('.form-group').addClass('has-error');
                            that.$Tel.next('.help-block').html(MSG["false"] + data.msg);
                        }
                    }
                });
            }
        },
        checkEmail: function(argument) {
            var that = this;
            var EmailVal = that.$Email.val();
            var emailVal = /^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;
            if (!emailVal.test(EmailVal)) {
                that.$Email.parents('.form-group').addClass('has-error');
                that.$Email.next('.help-block').html(MSG["false"] + MSG["302"]);
            }
        },
        reloadvalidata:function(){
            var that =this;
            that.$codeimg.attr('src', 'http://www.ixm.gov.cn/dis/passport/authCode/show?' + Math.random());
            validataCodeTrue=false;
        },
        removeClass: function(Obj) {
            Obj.parents('.form-group').removeClass("has-success has-warring has-error");
        },
        listen: function() { //设置监听
            var that = this;
            that.$userName.on("blur", function() {
                that.checkuserName();
            });
            that.$userName.on("focus", function() {
                that.removeClass($(this));
                $(this).next('.help-block').html(MSG["101"]);
            });
            that.$Tel.on("blur", function() {
                that.checkTel();
            });
            that.$Tel.on("focus", function() {
                that.removeClass($(this));
                $(this).next('.help-block').html(MSG["201"]);
            });
            that.$codeimg.on("click",function(){
                that.reloadvalidata($(this));
            });
            that.$Email.on("blur", function() {
                that.checkEmail();
            });
            that.$Email.on("focus", function() {
                that.removeClass($(this));
                $(this).next('.help-block').html(MSG["301"]);
            });
            that.$SubmitBtn.on("click", function() {
                that.checkTel();
            });
        }
    };
    window.checkFunc = new CheckFunc();
});
