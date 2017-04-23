define(['脚本lazyload', 'vue', 'vuetools'], function(lazyload, Vue) {

    var app = new Vue({
        el: '.wrap',
        data: {
            lists: [{
                imgsrc: 'https://unsplash.it/150/150/?random=' + Math.random(),
                title: Math.random()
            }, {
                imgsrc: 'https://unsplash.it/150/150/?random=' + Math.random(),
                title: Math.random()
            }, {
                imgsrc: 'https://unsplash.it/150/150/?random=' + Math.random(),
                title: Math.random()
            }, {
                imgsrc: 'https://unsplash.it/150/150/?random=' + Math.random(),
                title: Math.random()
            }, {
                imgsrc: 'https://unsplash.it/150/150/?random=' + Math.random(),
                title: Math.random()
            }],
            inputfile: {
                seen: false,
                src: ""
            },
            validate:{
            	imgsrc:'http://www.ixm.gov.cn/dis/passport/authCode/show'
            }

        },
        methods: {
        	//Ajax-post方式，以base64格式上传图片文件
            uploadpic: function(obj) {
                var that = this;
                var element = obj.target;
                var file = element.files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    app.inputfile.seen = true;
                    app.inputfile.src = reader.result;
                    var imgData = reader.result;
                    $.ajax({
                            url: '/uploadpic',
                            type: 'POST',
                            //contentType: false,
                            //processData: false,
                            data: { imgData: imgData },
                            success: function(data) {
                                console.log(data);
                            }
                        })
                        .done(function() {
                            console.log("success");
                        })
                        .fail(function() {
                            console.log("error");
                        })
                        .always(function() {
                            console.log("complete");
                        });

                };
            }
        },
        components: {
            'input-username': Vuetemplate.input_username,
            'input-tel': Vuetemplate.input_tel,
            'input-validatecode': Vuetemplate.input_validatecode
        }
    });
    window.app = app;
    $('img.lazy').lazyload();
});
