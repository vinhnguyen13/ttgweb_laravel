$(window).on('load', function () {
    $('.popup-common').appendTo('body');
});
$(document).ready(function () {
    'use strict';

    $('.detail-chat .close-item-chat').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.detail-chat').remove();
    });

    var wWindow = $(window).outerWidth(),
        hWindow = $(window).outerHeight();

    $('.tootip-show').tooltip();

    function checkMobile () {
        var wWindow = $(window).outerWidth();

        if ( wWindow <= 860 ) { ///Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            return true;
        }
        return false;
    }

    menuMobile();

    function menuMobile () {
        $('#show-mn-mobile').on('click', function (e) {
            e.preventDefault();
            var itemClone = $('.list-menu').clone();
            itemClone.addClass('clone-menu-left');
            $('body').prepend(itemClone);
            itemClone.show();
            setTimeout(function () {
                $('html').addClass('menu-left');
                setTimeout(function () {
                    $('header,footer,#wrapper').addClass('menu-left-slide');
                    $('body').append('<div class="outsite-menu"></div>');
                    $('.outsite-menu').velocity("fadeIn", { duration: 500 });
                    $('.outsite-menu').on('click', function () {
                        $('html').removeClass('menu-left');
                        $(this).velocity("fadeOut", {
                            duration: 500,
                            complete: function () {
                                $('.outsite-menu,.clone-menu-left').remove();
                                $('header,footer,#wrapper').removeClass('menu-left-slide');
                            }
                        });
                    });
                },100);
            },150);
        });

        $('.avatar-user-mobile').on('click', function (e) {
            e.preventDefault();
            var itemClone = $('.menu-user').clone();
            itemClone.addClass('clone-menu-right');
            $('body').prepend(itemClone);
            itemClone.show();
            setTimeout(function () {
                $('html').addClass('menu-right');
                setTimeout(function () {
                    $('header,footer,#wrapper').addClass('menu-right-slide');
                    $('body').append('<div class="outsite-menu"></div>');
                    $('.outsite-menu').velocity("fadeIn", { duration: 500 });
                    $('.outsite-menu').on('click', function () {
                        $('html').removeClass('menu-right');
                        $(this).velocity("fadeOut", { 
                            duration: 500,
                            complete: function () {
                                $('.outsite-menu,.clone-menu-right').remove();
                                $('header,footer,#wrapper').removeClass('menu-right-slide');
                            }
                        });
                    });
                },100);
            },150);
        });
    }

    $('.user-ui-desktop li .dropdown-emu').dropdown();
});

$.fn.dropdown = function (options) {

    return this.each(function() {
        var defaults = {
            selectedValue: false,
            ajaxLoad: function () {},
            open: function () {},
            selectItem: function () {}
        },
        sc = {},
        el = $(this);

        if ( el.length == 0 ) return el;

        sc.settings = $.extend({}, defaults, options);

        el.find('.val-selected').on('click', toggleView);

        showSortLoad();
        
        // set value input when reload page
        function showSortLoad () {
            
        }

        // toggle show and hide
        function toggleView (e) {
            e.preventDefault();
            var _this = $(this);

            if ( _this.hasClass('active') ) {
                _this.removeClass('active');
                el.find('.dropdown-up-style').removeClass('active');
                setTimeout(function() {
                    el.find('.dropdown-up-style').addClass('hide');
                },250);
            }else {
                _this.addClass('active');
                el.find('.dropdown-up-style').removeClass('hide');
                setTimeout(function() {
                    el.find('.dropdown-up-style').addClass('active');
                },50);
            }
        }

        // show item when click in dropdown
        function selectItem () {
            
        }

        hideElOutSite(el, function () {
            el.find('.val-selected').removeClass('active');
            el.find('.dropdown-up-style').removeClass('active');
            setTimeout(function() {
                el.find('.dropdown-up-style').addClass('hide');
            },250);
        });

    });
}

function hideElOutSite (el, callBackItem) {
    $(document).on('click', function (e) {
        var container = $(el);
        if ( !container.is(e.target) && container.has(e.target).length === 0 ) {
            callBackItem();
        }
    });
}
