define(['jquery', '脚本WebUploader'], function(jquery, WebUploader) {
    //var $list = $('#fileList'),
    var $curlist,
        // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,
        // 缩略图大小
        thumbnailWidth = 200 * ratio,
        thumbnailHeight = 200 * ratio,
        curBtn;
    $('.uploadtable').on('click', '.uploadBtn', function() {
        curBtn = $(this).attr('id');
        $curList=$('#'+curBtn+'List');

    });

    var uploader = WebUploader.create({
        //是否自动上传文件，当设置为false时，调用手动调用
        auto: true,
        method: 'POST', //默认为post方式提交
        //duplicate: true,
        // swf文件路径
        swf: '../css/Uploader.swf',
        // 文件接收服务端。
        server: '../upload',
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: {
            id: '#ZM_Picker', //文件选择器（按钮），即input=file元素
            innerHTML: '上传证件照正面', //按钮文字
            multiple: false, //是否开启支持多文件选择
        },
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/jpg,image/jpeg,image/png'
        },
        //单文件大小限制，此处以bit为计算单位
        fileSingleSizeLimit: 2048000,
        thumb: { //配置生成缩略图的选项
            width: 110,
            height: 110,
            // 图片质量，只有type为`image/jpeg`的时候才有效。
            quality: 70,
            // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
            allowMagnify: true,
            // 是否允许裁剪。
            crop: true,
            // 为空的话则保留原有图片格式。
            // 否则强制转换成指定的类型。
            type: 'image/jpeg'
        },
        // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
        resize: false
    });
    //添加上传按钮
    uploader.addButton({
        id: '#FM_Picker',
        innerHTML: '上传证件照反面',
        multiple: false, //是否开启支持多文件选择
    });
    uploader.addButton({
        id: '#SC_Picker',
        innerHTML: '上传手持证件照',
        multiple: false, //是否开启支持多文件选择
    });
    // 当有文件添加进来的时候
    uploader.on('fileQueued', function(file) {
        var $li = $(
                '<div id="' + file.id + '" class="file-item thumbnail">' +
                '<img>' +
                '<div class="info">' + file.name + '</div>' +
                '</div>'
            ),
            $img = $li.find('img');


        // $list为容器jQuery实例
        $curList.append($li);

        // 创建缩略图
        // 如果为非图片文件，可以不用调用此方法。
        // thumbnailWidth x thumbnailHeight 为 100 x 100
        uploader.makeThumb(file, function(error, src) {
            if (error) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }

            $img.attr('src', src);
        }, thumbnailWidth, thumbnailHeight);
    });
    //文件上传前验证文件大小
    uploader.on('beforeFileQueued', function(file) {
        var that = this;
        if (file.size > that.options.fileSingleSizeLimit) {
            console.log('文件过大');
            return false;
        }
    });
    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function(file, percentage) {
        var $li = $('#' + file.id),
            $percent = $li.find('.webuploader-progress span');

        // 避免重复创建
        if (!$percent.length) {
            $percent = $('<p class="webuploader-progress"><span></span></p>')
                .appendTo($li)
                .find('span');
        }
        $percent.css('width', percentage * 100 + '%');
    });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on('uploadSuccess', function(file) {
        $('#' + file.id).addClass('upload-state-done');
    });

    // 文件上传失败，显示上传出错。
    uploader.on('uploadError', function(file) {
        var $li = $('#' + file.id),
            $error = $li.find('div.error');

        // 避免重复创建
        if (!$error.length) {
            $error = $('<div class="error"></div>').appendTo($li);
        }

        $error.text('上传失败');
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on('uploadComplete', function(file) {
        $('#' + file.id).find('.progress').remove();
    });

});
