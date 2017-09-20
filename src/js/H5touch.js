$(function() {
    var H5touch = function() {
        this.$nav = $('#nav');
        this.$navul = $('.navul');
        this.$navli = $('.navli');
        this.startEvent = {
            x: 0,
            y: 0
        };
        this.moveEvent = {
            x: 0,
            y: 0
        };
        this.navLeft = 0;
        this.init();
    };
    H5touch.prototype = {
        init: function() {
            this.listen();
        },
        listen: function() {
            var self = this;
            self.$navli.on('click', function(e) {
                self.navActive(this);
            });
            self.$nav.on('touchstart', function(e) {
                self.getTouchStart(e);
            });
            self.$nav.on('touchmove', function(e) {
                e.preventDefault();
                self.getTouchMove(e);
            });
            self.$nav.on('touchend', function(e) {
                self.getTouchEnd(e);
            });
        },
        navActive:function(e){
        	var self=this;
        	$(e).addClass('active').siblings('.navli').removeClass('active');
        },
        getTouchStart: function(e) {
            var self = this;
            var touch = e.originalEvent.targetTouches[0];
            //初始化
            self.startEvent.x = touch.pageX;
            self.startEvent.y = touch.pageY;
            self.moveEvent.x = 0;
            self.moveEvent.y = 0;
            console.log('起点'+self.startEvent.x);
        },
        getTouchMove: function(e) {
            var self = this;
            var touch = e.originalEvent.targetTouches[0];
            //计算滑动距离
            self.moveEvent.x = touch.pageX - self.startEvent.x;
            self.moveEvent.y = touch.pageY - self.startEvent.y;
            self.navLeft = self.$navul.css("left").replace("px", "");
            self.navLeft = self.navLeft - 0;//这一步很重要，需要将变量转为number
            console.log(self.moveEvent);
            var t = self.$navul.width() - 640 + 70;
            var n = self.moveEvent.x + self.navLeft;

        if (n > 0) {
            n = 0
        } else if (n < -t) {
            n = -t
        }

            //self.navLeft = n;
            self.$navul.css({
                left: n
            });
            return false;
        },
        getTouchEnd: function(e) {
            var self = this;
            //计算滑动距离
            console.log(self.moveEvent);
            self.moveNav(self.navLeft);
            console.log('移动距离：' + self.navLeft);
        },
        moveNav: function(l) {
            var self = this;
            self.$navul.animate({
                left: l
            },500);
            //}
        }
    };
    window.H5touch = new H5touch();
})