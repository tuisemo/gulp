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
            lists: [
                /*{
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
                            }*/
            ],
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
                var that = this;
                var q = $('#search_key').val();
                var tag = $('search_tag').val();
                $.ajax({
                    url: 'https://api.douban.com/v2/movie/search',
                    type: 'GET',
                    dataType: 'jsonp',
                    data: {
                        q: q,
                        tag: tag,
                        start: 0,
                        count: 10
                    },
                    success: function(data) {
                        for (var i = 0; i < data.subjects.length; i++) {
                            imgsrc: data.subjects[i].casts[0].avatars.medium,

                            that.lists.push({
                                imgsrc: data.subjects[i].casts[0].avatars.medium,
                                title: data.subjects[i].title
                            })
                        }
                    },
                    erroe: function() {}
                });

            }

        }
    });
    window.app = app;
    //$('img.lazy').lazyload();
});
