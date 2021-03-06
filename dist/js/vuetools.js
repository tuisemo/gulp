define(['vue'], function(Vue) {
    var vuetemplate = function() {
        this.input_username = {
            template: (
                '<div class="form-group">' +
                '    <label class="col-sm-3 control-label"><small>用户名:</small></label>' +
                '    <div class="col-sm-9">' +
                '        <input id="userName" type="text" class="form-control" placeholder="用户名">' +
                '        <span class="help-block">以英文字母开头，可包含3-20个字符</span>' +
                '    </div>' +
                '</div>'
            )
        };
        this.input_tel = {
            template: (
                '<div class="form-group">' +
                '    <label class="col-sm-3 control-label"><small>手机:</small></label>' +
                '    <div class="col-sm-9">' +
                '        <input type="tel" class="form-control" id="inputTel" placeholder="手机">' +
                '        <span class="help-block">请输入您的手机号(仅支持中国大陆)</span>' +
                '    </div>' +
                '</div>'
            )
        };
        this.input_validatecode = {
            template: (
                '<div class="form-group">' +
                '    <label class="col-sm-3 control-label"><small>图片验证码:</small></label>' +
                '    <div class="col-sm-9">' +
                '        <div class="input-group">' +
                '            <input id="validateCode" type="text" class="form-control" placeholder="图片验证码">' +
                '            <div class="input-group-btn">' +
                '                <img id="codeimg" class="btn btn-default" src="http://www.ixm.gov.cn/dis/passport/authCode/show" style="padding:0;height:34px;">' +
                '                <div id="reloadBtn" class="btn btn-default">刷新</div>' +
                '            </div>' +
                '        </div>' +
                '        <span class="help-block"></span>' +
                '    </div>' +
                '</div>'
            )
        };
        this.input_msgcode = {
            template: (
                '<div class="form-group">' +
                '    <label class="col-sm-3 control-label"><small>短信验证码:</small></label>' +
                '    <div class="col-sm-9">' +
                '        <div class="input-group ">' +
                '            <input id="msgCode" name="msgCode" type="text" class="form-control" placeholder="请输入校验码">' +
                '            <span class="input-group-btn">' +
                '            <div id="sendmsg" class="btn btn-primary" style="display:none;" onclick="sendMsgFor(\'01\',\'Citizen\')">发送校验码</div>' +
                '            <div id="msgtimer" class="btn btn-default" style="display:inline-block;" disabled="">发送校验码</div>' +
                '        </span>' +
                '        </div>' +
                '        <span class="help-block"></span>' +
                '    </div>' +
                '</div>'
            )
        };
    };
    window.Vuetemplate = new vuetemplate();
});
