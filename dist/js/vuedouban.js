define(['脚本lazyload', 'vue'], function(lazyload, Vue) {

    var app = new Vue({
        el: '.wrap',
        created: function() {
            var that = this;
            that.movielist();
            that.hotmovielist();
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
            tagvalue: "",
            taglists: [{
                keyword: "热门"
            }, {
                keyword: "喜剧"
            }, {
                keyword: "爱情"
            }, {
                keyword: "文化"
            }, {
                keyword: "科幻"
            }, {
                keyword: "恐怖"
            }, {
                keyword: "动画"
            }, {
                keyword: "台湾"
            }, {
                keyword: "动作"
            }, {
                keyword: "欧美"
            }, {
                keyword: "纪录片"
            }, {
                keyword: "穿越"
            }, {
                keyword: "武侠"
            }, {
                keyword: "传记"
            }, {
                keyword: "青春"
            }],
            lists: [/*{
                imgsrc: 'https://unsplash.it/150/150/?random=' + Math.random(),
                title: Math.random(),
                id: 001,
            }*/],
            hotlists: [/*{
                imgsrc: 'https://unsplash.it/150/150/?random=' + Math.random(),
                title: Math.random(),
                id: 001,
            }*/],
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
                                id: data.subjects[i].id,
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
            hotmovielist: function() {
                var that = this;
                $.ajax({
                    url: 'https://api.douban.com/v2/movie/us_box',
                    type: 'GET',
                    dataType: 'jsonp',
                    data: {},
                    success: function(data) {
                        that.lists = [];
                        for (var i = 0; i < data.subjects.length; i++) {
                            that.hotlists.push({
                                id: data.subjects[i].subject.id,
                                alt: data.subjects[i].subject.alt,
                                imgsrc: data.subjects[i].subject.images.medium,
                                title: data.subjects[i].subject.title,
                                year: data.subjects[i].subject.year
                            });
                        }
                    },
                    erroe: function() {}
                });
            },
            moviesearch: function() {
                var that = this;
                var q = that.search_key;
                var tag = that.tagvalue;
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
            },
            tagclick: function(obj) {
                var that = this;
                var element = obj.target;
                $(element).parent('label').siblings('label').removeClass('active');
                $(element).parent('label').addClass('active');
                that.tagvalue = element.value;
                that.moviesearch();
            }

        }
    });
    window.app = app;
    //$('img.lazy').lazyload();
});
