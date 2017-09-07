define(['脚本tools', '脚本layer', '脚本Passport'], function() {
    var EnPassport = function(ResultOpt) {
        /*=======企业注册dom======*/
        this.$enterpriseName = $("#enterpriseName");
        this.$licenseLocation = $("#licenseLocation");
        this.$businessLicense = $("#businessLicense");
        this.$organizationCode = $("#organizationCode");
        this.$unifiedcreditCode = $("#unifiedcreditCode");
        this.$certificateName = $("#certificateName");
        this.$certificateNum = $("#certificateNum");
        this.$EnBox1 = $("#EnBox1");
        this.$EnBox2 = $("#EnBox2");
        this.$idUpdate = $("input[name='idUpdate']");
        this.$infoSpan = $('span.help-block');
        this.init();
    };
    EnPassport.prototype = {
        init: function() {
            //tools.scan(this.$infoSpan);
            this.Enterpriseinfo('true');
            this.listen();
        },
        listen: function() {
            var self = this;
            /* =========企业注册=============*/
            self.$idUpdate.on("click", function() {
                self.Enterpriseinfo($(this).val());
            });
            self.$enterpriseName.on("blur", function() {
                self.REGEX(03, $(this));
            });
            self.$licenseLocation.on("blur", function() {
                self.REGEX(03, $(this));
            });
            self.$businessLicense.on("blur", function() {
                self.REGEX(02, $(this));
            });
            self.$organizationCode.on("blur", function() {
                self.REGEX(02, $(this));
            });
            self.$unifiedcreditCode.on("blur", function() {
                self.REGEX(02, $(this));
            });
            self.$certificateName.on("blur", function() {
                self.REGEX(03, $(this));
            });
            self.$certificateNum.on("blur", function() {
                if (!tools.checkIDnumber($(this).val())) {
                    tools.errorMsg(this, MSG[7003]);
                }
            });
        },
        //操作结果通用提示工具
        optMsg: function(Obj, boolean, MSGnum) {
            if (boolean === true) {
                Obj.parents('.form-group').addClass('has-success')
                    .find('.help-block').html(MSG["true"]);
            } else {
                Obj.parents('.form-group').addClass('has-error')
                    .find('.help-block').html(MSG["false"] + MSG[MSGnum]);
            }
        },
        //正则格式检验
        REGEX: function(type, Obj) {
            var self = this;
            var value = $(Obj).val();
            var regex1 = /^[0-9]+$/, //限制数字
                regex2 = /^[0-9a-zA-Z._]*$/g, //限制字母+数字
                regex3 = /[a-zA-Z|\u4e00-\u9fa5]/, //限制字母+中文
                regex4 = /(^[a-zA-Z_\u4e00-\u9fa5]+[0-9]*)/; //限制字母+数字
            switch (type) {
                case 01:
                    {
                        if (!regex1.test(value)) {
                            self.optMsg(Obj, false, 'REG');
                        }
                        break;
                    }
                case 02:
                    {
                        if (!regex2.test(value)) {
                            self.optMsg(Obj, false, 'REG');
                        }
                        break;
                    }
                case 03:
                    {
                        if (!regex3.test(value)) {
                            self.optMsg(Obj, false, 'REG');
                        }
                        break;
                    }
            }
        },
        /*===============法人注册===================*/
        EnterpriseSignUp: function() {
            var self = this;
            if (!self.$Check.is(':checked')) {
                layer.msg('请勾选通行证协议');
                return;
            }
            var attributeValue, attributeName;
            if ($("input[name='idUpdate']:checked").val() == "true") {
                attributeValue = self.$userName.val() + ";" + self.$mobile.val() + ";" +
                    self.$enterpriseName.val() + ";" + self.$unifiedcreditCode.val();
                attributeName = "userName;mobile;enterpriseName;unifiedcreditCode";
            } else {
                attributeValue = self.$userName.val() + ";" + self.$mobile.val() + ";" +
                    self.$enterpriseName.val() + ";" + self.$businessLicense.val() + ";" + self.$organizationCode.val();
                attributeName = "userName;mobile;enterpriseName;businessLicense;organizationCode";
            }
            $.ajax({
                url: "/dis/passport/checkUserAttribute",
                dataType: "json",
                async: true,
                data: {
                    "attributeValue": attributeValue,
                    "attributeName": attributeName,
                    "code": self.$validateCode.val(),
                    "domainName": "Enterprise"
                },
                type: "POST"
            }).done(function(data) {
                if (data.code == 200 || data.result) {
                    self.EnsignSubmit();
                } else {
                    ResultOpt.msg(data);
                }
            }).fail(function(error) {
                console.log(error);
                layer.msg('请求出错，请稍后重试');
                return;
            });
        },
        EnsignSubmit: function() {
            var self = this;
            layer.load(2, {
                shade: [0.1, '#333'] //0.1透明度的白色背景
            });
            $('form').submit();
        },
        Enterpriseinfo: function(idUpdate) {
            var self = this;
            if (idUpdate == "true") {
                self.$EnBox1.show();
                self.$EnBox2.hide();
                self.$EnBox2.find('input').attr('hidden', 'hidden');
            } else {
                self.$EnBox1.hide();
                self.$EnBox2.show();
                self.$EnBox1.find('input').attr('hidden', 'hidden');
            }
        }
    };
    window.EnPassport = new EnPassport();
});