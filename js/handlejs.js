define(['jquery', 'MSG', 'lodash', 'layer'], function() {
    var begin, end;
    var CheckFunc = function() {
        this.$Tel = $("input[type='tel']");
        this.$Email = $("input[type='email']");
        this.$Password = $("input[type='password']");
        this.$SubmitBtn = $("#submit");
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
        checkTel: function(text) { //定义功能函数
            var that = this;
            var TelVal = that.$Tel.val();
            var telVal = /^(((13[0-9]{1})|(15[0-9]{1})|(17[01678]{1})|(18[0-9]{1}))+\d{8})$/;
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
        removeClass: function(Obj) {
            Obj.parents('.form-group').removeClass("has-success has-warring has-error");
        },
        listen: function() { //设置监听
            var that = this;
            that.$Tel.on("blur", function() {
                that.checkTel();
            });
            that.$Tel.on("focus", function() {
                that.removeClass($(this));
                $(this).next('.help-block').html(MSG["201"]);
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
