define(['脚本lazyload', 'vue'], function(lazyload, Vue) {

    var app = new Vue({
        el: '.wrap',
        data: {
            bannerlists: [{
                imgsrc: 'https://unsplash.it/1500/300/?random=' + Math.random(),
                title: Math.random()
            }, {
                imgsrc: 'https://unsplash.it/1500/300/?random=' + Math.random(),
                title: Math.random()
            }, {
                imgsrc: 'https://unsplash.it/1500/300/?random=' + Math.random(),
                title: Math.random()
            }],
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
            validate: {
                imgsrc: 'http://www.ixm.gov.cn/dis/passport/authCode/show'
            }

        },
        methods: {
            moviesearch: function() {
                var q=$('#search_key').val();
                var tag=$('search_tag').val();
                $.ajax({
                    url: 'https://api.douban.com/v2/movie/search',
                    type: 'GET',
                    dataType: 'jsonp',
                    data: {
                        q: q,
                        tag: tag,
                        start: start,
                        count: count
                    },
                    success: function(data) {

                    },
                    erroe: function() {}
                })

            }

        }
    });
    window.app = app;
    $('img.lazy').lazyload();
});
