// $(document).ready(function() {
var APP = APP || {};
APP.breakepoints = {
    s: 480,
    m: 640,
    l: 1024
}
APP.core = (function() {
    return {
        init: function() {
            APP.navSwitcher.init();
            APP.nav.init();
            APP.window.init();
            APP.slider.init();
        }
    }
}());
APP.nav = (function() {
    var el = $('.navbar')
    return {
        init: function() {
            this.events();
        },
        showToggle: function() {
            el.slideToggle('400');
        },
        show: function() {
            el.show();
        },
        stick: function() {
            console.log('stick');
            el.addClass('navbar--stick')
                .children('.navbar__item:not(navbar__item--logo)')
                .addClass('navbar__item--stick');
            el.find('.navbar__item--logo')
                .addClass('navbar__item--hiden');
        },
        unstick: function() {
            console.log('unstick');
            el.removeClass('navbar--stick')
                .children('.navbar__item:not(navbar__item--logo)')
                .removeClass('navbar__item--stick');
            el.find('.navbar__item--logo')
                .removeClass('navbar__item--hiden');
        },
        events: function() {
            var that = this;
            $(window).on('switch-menu', function() {
                that.showToggle();
            })
            $(window).on('resize', function(event) {
                event.preventDefault();
                if ($(window).width() > APP.breakepoints.l) {
                    that.show();
                }
            });
            $(window).on('stick-menu', function(event) {
                event.preventDefault();
                that.stick();

            });
            $(window).on('unstick-menu', function(event) {
                event.preventDefault();
                that.unstick();

            });
        }
    }
})();
APP.navSwitcher = (function() {
    var el = $('#navbar-button');
    return {
        init: function() {
            this.events();
        },
        events: function() {
            el.on('click', function() {
                console.log('switch-menu');
                $(window).trigger('switch-menu');
            });
        }
    }
})();
APP.window = (function() {
    return {
        init: function() {
            this.events();
        },
        events: function() {
            var that = this;
            $(window).on('scroll', function(event) {
                event.preventDefault();
                var toTop = $(document).scrollTop();
                var markerStickMenu = $(document).height() * 0.05;
                // console.log(toTop);
                if (toTop > markerStickMenu) {
                    $(window).trigger('stick-menu');
                }
                if (toTop < markerStickMenu) {
                    $(window).trigger('unstick-menu');
                }
            });
        }
    }
})();
APP.slider = (function() {
    var el = $('.slider');
    var params = {};
    return {
        init: function() {
            this.events();
            // el.each(function(i, $el){
            //     params.margin = [
            //         $el.css('margin-top'),
            //         $el.css('margin-right'),
            //         $el.css('margin-bottom'),
            //         $el.css('margin-left')
            //     ]
            // });
        },
        nextSlide: function($slider) {

        },
        prevSlide: function($slider) {
            var $slides = $slider.find('.slider__box');
            var margins = parseInt($slides.css('margin-right')) + parseInt($slides.css('margin-left'));
            var $slideConveyor = $slider.find('.slider__scroll-conveyor');
            var step = $slides.width() + margins;
            var width = $slides.length * step;
            if($slides.last().css('margin-left') != $slides.length * (step-1) ){
                $slideConveyor.animate({
                    'margin-left': (parseInt($slideConveyor.css('margin-left')) - step) + 'px'
                }, 800);
            }
        },
        events: function() {
            var that = this;
            el.on('click', '.slider__control-left', function(event) {
                event.preventDefault();
                console.log('click-left');
                var $thisSlider = $(this).parents('.slider');
                that.prevSlide($thisSlider);
            });
        }
    }
})();
APP.core.init();
// });
