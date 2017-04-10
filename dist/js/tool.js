define(['脚本lodash'], function() {
    var tool = function() {
        this.$body = $("body");
        this.init();
    };
    tool.prototype = {
        init: function() {
            this.Alltemplate();
            this.handleSucc();
        },
        //初始化全部模板
        Alltemplate: function() {
            var that = this;
            that.TMPhandle = _.template(
                '    <div class="modal fade" id="TMPhandle" tabindex="-1" role="dialog" aria-labelledby="TMPhandle">' +
                '        <div class="modal-dialog modal-sm" role="document">' +
                '            <div class="modal-content alert-success">' +
                '                <div class="modal-header">' +
                '                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                '                    <p class="modal-title"><%=title%></p>' +
                '                </div>' +
                '                <div class="modal-body">' +
                '                    <h3 class="text-c"><%= body%></h3>' +
                '                </div>' +
                '                <div class="modal-footer">' +
                '                    <div type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</div>' +
                '                </div>' +
                '            </div>' +
                '        </div>' +
                '    </div'
            );
        },
        handleSucc: function() {
            var that = this;
            that.$body.append(that.TMPhandle({
                title: "测试数据",
                body: "测试发送的山东航空数据"
            }));
            $("#TMPhandle").modal('show');
        }
    };
    window.tool = new tool();
});
