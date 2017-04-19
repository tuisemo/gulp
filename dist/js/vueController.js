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
            inputfile:{
            	seen:false,
            	src:""
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
                reader.omload = function(e) {
                    console.log(e);
                }
            }
        }
    });
    $('img.lazy').lazyload();
});
