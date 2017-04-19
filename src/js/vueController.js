define(['脚本lazyload', 'vue'], function(lazyload, Vue) {
    var app = new Vue({
        el: '#app',
        data: {
            lists: [{
                imgsrc: 'https://unsplash.it/200/200/?random=' + Math.random(),
                title: Math.random()
            }, {
                imgsrc: 'https://unsplash.it/200/200/?random=' + Math.random(),
                title: Math.random()
            }, {
                imgsrc: 'https://unsplash.it/200/200/?random=' + Math.random(),
                title: Math.random()
            }, {
                imgsrc: 'https://unsplash.it/200/200/?random=' + Math.random(),
                title: Math.random()
            }, {
                imgsrc: 'https://unsplash.it/200/200/?random=' + Math.random(),
                title: Math.random()
            }],
            inputfile: {
                seen: false,
                src: ""
            }

        },
        methods: {
            uploadpic: function(obj) {
                var that = this;
                var element = obj.target;
                var file = element.files[0];
                console.log(file);
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    console.log(e);
                    app.inputfile.seen = true;
                    app.inputfile.src = reader.result;
                    var imgData = reader.result;
                    $.ajax({
                            url: '/uploadpic',
                            type: 'POST',
                            contentType: false,
                            processData: false,
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
        }
    });
    window.app = app;
    $('img.lazy').lazyload();
});
