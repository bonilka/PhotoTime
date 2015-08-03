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
    return {
        init: function() {
            this.events();
        },
        nextSlide: function($slider) {
            var count = $slider.attr('data-count');
            var maxCount = $slider.attr('data-max-count');
            var $box = $slider.find('.slider__box');
            var boxWidth = $slider.find('.slider__box').width() + parseInt( $box.css('margin-right') );
            if(count < maxCount){
                $slider.find('.slider__scroll-conveyor').animate({'margin-left': -1*count*boxWidth}, 800);
                $slider.attr('data-count', ++count);
            }
        },
        prevSlide: function($slider) {
            var count = $slider.attr('data-count');
            var maxCount = $slider.attr('data-max-count');
            var $box = $slider.find('.slider__box');
            var boxWidth = $slider.find('.slider__box').width() + parseInt( $box.css('margin-right') );
            if(count > 1){
                $slider.attr('data-count', --count);
                $slider.find('.slider__scroll-conveyor').animate({'margin-left': -1*(count-1)*boxWidth}, 800);
            }
        },
        renderCount: function ($slider) {
            var count = $slider.attr('data-count');
            if(count >= 10){
                $slider.find('.slider__slide-count .slider__current').html(count);
            }else{
                $slider.find('.slider__slide-count .slider__current').html('0' + count);
            }
        },
        events: function() {
            var that = this;
            el.on('click', '.slider__control-left', function(event) {
                event.preventDefault();
                console.log('click-left');
                var $thisSlider = $(this).parents('.slider');
                that.prevSlide($thisSlider);
                that.renderCount($thisSlider);
            });
            el.on('click', '.slider__control-right', function(event) {
                event.preventDefault();
                console.log('click-right');
                var $thisSlider = $(this).parents('.slider');
                that.nextSlide($thisSlider);
                that.renderCount($thisSlider);
            });
        }
    }
})();
APP.core.init();
// });
