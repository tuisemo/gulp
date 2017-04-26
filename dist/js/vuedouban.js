define(['脚本lazyload', 'vue'], function(lazyload, Vue) {

    var app = new Vue({
        el: '.wrap',
        created: function() {
            var that = this;
            that.movielist();
            console.log("success");
        },
        data: {
            search_key: "",
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
            taglists: [{
                keyword: "热门",
                checked: true
            }, {
                keyword: "喜剧",
                checked: false
            }, {
                keyword: "爱情",
                checked: false
            }, {
                keyword: "文化",
                checked: false
            }, {
                keyword: "科幻",
                checked: false
            }, {
                keyword: "恐怖",
                checked: false
            }, {
                keyword: "动画",
                checked: false
            }, {
                keyword: "台湾",
                checked: false
            }, {
                keyword: "动作",
                checked: false
            }, {
                keyword: "欧美",
                checked: false
            }, {
                keyword: "纪录片",
                checked: false
            }, {
                keyword: "穿越",
                checked: false
            }, {
                keyword: "武侠",
                checked: false
            }, {
                keyword: "传记",
                checked: false
            }, {
                keyword: "青春",
                checked: false
            }],
            lists: [
                /*{
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
            movielist: function() {
                var that = this;
                $.ajax({
                    url: 'https://api.douban.com/v2/movie/in_theaters',
                    type: 'GET',
                    dataType: 'jsonp',
                    data: {},
                    success: function(data) {
                        that.lists = [];
                        for (var i = 0; i < data.subjects.length; i++) {
                            that.lists.push({
                                alt: data.subjects[i].alt,
                                imgsrc: data.subjects[i].images.medium,
                                title: data.subjects[i].title,
                                year: data.subjects[i].year
                            });
                        }
                    },
                    erroe: function() {}
                });
            },
            moviesearch: function() {
                var that = this;
                var q = that.search_key;
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
                        that.lists = [];
                        for (var i = 0; i < data.subjects.length; i++) {
                            that.lists.push({
                                alt: data.subjects[i].alt,
                                imgsrc: data.subjects[i].images.medium,
                                title: data.subjects[i].title,
                                year: data.subjects[i].year
                            });
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
