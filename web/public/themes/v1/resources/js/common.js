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
            beforeOpen: function() {},
            closeCallBack: function() {}
        },
        sc = {},
        el = $(this),
        itemClick = el.find('.val-selected'),
        txtItemClick = itemClick.find('.txt-selected'),
        itemDropClick = el.find('.item-dropdown a');

        if ( el.length == 0 ) return el;

        sc.settings = $.extend({}, defaults, options);

        itemClick.on('click', toggleView);

        showSortLoad();

        if ( sc.settings.selectedValue ) {
            selectItem();
        }
        
        // set value input when reload page
        function showSortLoad () {
            if ( el.find('input[type=hidden]').val() != '' ) {
                var valInputHidden = el.find('input[type=hidden]').val();
                itemDropClick.each(function () {
                    var _this = $(this),
                        dataValue = _this.data('value'),
                        txtItem = _this.text();

                    if ( valInputHidden == dataValue ) {
                        if ( txtItemClick.find('.get-val').length ) {
                            txtItemClick.find('.get-val').text(txtItem);
                        }else {
                            txtItemClick.text(txtItem);
                        }
                    }
                });
            }
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
                sc.settings.closeCallBack(el);
            }else {
                _this.addClass('active');
                el.find('.dropdown-up-style').removeClass('hide');
                setTimeout(function() {
                    el.find('.dropdown-up-style').addClass('active');
                },50);
                sc.settings.beforeOpen(el);
            }
        }

        // show item when click in dropdown
        function selectItem () {
            itemDropClick.on('click', function (e) {
                e.preventDefault();
                var _this = $(this),
                    dataVal = _this.data('value'),
                    txtClick = _this.text();
                txtItemClick.text(txtClick);
                el.find('input[type=hidden]').val(dataVal);
                itemClick.trigger('click');
            });
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

var renderPriceArea = {
    valArea: 10,
    valPrice: 0,
    flagPrice: 0, // 0: gia mua, 1: gia thue,
    itemRender: '',
    flagToggle: 'min',
    minVal: '',
    maxVal: '',
    unitAdd: '',
    itemClickShowDropdown: '',
    wrapTxtShow: '',
    txtGetText: '',
    init: function (item) {
        renderPriceArea.itemRender = item;
        renderPriceArea.itemClickShowDropdown = item.find('.val-selected');
        renderPriceArea.txtGetText = renderPriceArea.itemClickShowDropdown.find('.txt-selected');
        renderPriceArea.wrapTxtShow = item.find('.txt-show');
        renderPriceArea.minVal = item.find('.min-val');
        renderPriceArea.maxVal = item.find('.max-val');

        renderPriceArea.checkPriceOrArea() ? renderPriceArea.unitAdd = 'm2' : renderPriceArea.unitAdd = '';

        if ( renderPriceArea.itemRender.find('.wrap-minmax').hasClass('show-max') ) {
            renderPriceArea.flagToggle = 'max';
        }else {
            renderPriceArea.flagToggle = 'min';
            renderPriceArea.checkPriceOrArea() ? renderPriceArea.areaRender() : renderPriceArea.priceRender();
        }

        renderPriceArea.itemRender.find('.txt-min-max').unbind('click');
        renderPriceArea.itemRender.find('.txt-min-max').on('click', function () {
            renderPriceArea.toggleMinMax($(this));
        });
    },
    updateHidden: function () {

    },
    checkPriceOrArea: function () {
        var check = renderPriceArea.itemRender.data('item') == 'dientich' ? true : false;
        return check;
    },
    priceRender: function () {
        var priceFirst = 0; 

        if ( !renderPriceArea.flagPrice ) {
            priceFirst = 1000000000; // 1ty
        }else {
            priceFirst = 1000000; // 1trieu
        }

        renderPriceArea.valPrice = priceFirst;
        
        renderPriceArea.renderVal(priceFirst);
    },
    areaRender: function () {
        renderPriceArea.renderVal(renderPriceArea.valArea);
    },
    renderVal: function (num) {
        var numAdd,
            valLoop = 10;

        renderPriceArea.itemRender.find('.wrap-minmax').html('');

        //console.log(renderPriceArea.flagToggle);

        renderPriceArea.flagToggle == 'min' ? numAdd = 0 : numAdd = num;
        renderPriceArea.flagToggle == 'min' ? valLoop = 11 : valLoop = 10;

        for ( var i = 0; i < valLoop; i++ ) {
            var itemRender = $('<li><a href="#" data-number="'+numAdd+'">'+formatPrice(numAdd.toString())+renderPriceArea.unitAdd+'</a></li>');
            renderPriceArea.selectVal(itemRender);
            renderPriceArea.itemRender.find('.wrap-minmax').append(itemRender);
            numAdd += renderPriceArea.checkPriceOrArea() ? renderPriceArea.valArea : renderPriceArea.valPrice;

            if ( i+1 == valLoop && renderPriceArea.flagToggle == 'max' ) {
                itemRender = $('<li><a href="#" data-number="-1">Giá trị bất kỳ</a></li>');
                renderPriceArea.selectVal(itemRender);
                renderPriceArea.itemRender.find('.wrap-minmax').append(itemRender);
            }
        }
    },
    selectVal: function (item) {
        item.find('a').on('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var _this = $(this),
                valData = _this.data('number');

            renderPriceArea.renderTextShow(valData);

            if ( renderPriceArea.flagToggle == 'min' ) {
                renderPriceArea.toggleMinMax();
            }
        });
    },
    renderTextShow: function (valData) {
        renderPriceArea.txtGetText.hide();
        var txt = formatPrice(valData.toString())+renderPriceArea.unitAdd,
            txtMaxDefaultMax = renderPriceArea.maxVal.data('text'),
            txtMaxDefaultMin = renderPriceArea.minVal.data('text');

        renderPriceArea.saveInputHidden(renderPriceArea.flagToggle, valData);

        if ( renderPriceArea.minVal.data('value') > 0 && renderPriceArea.maxVal.data('value') > 0 ) {
            renderPriceArea.maxVal.text(txt);

            renderPriceArea.wrapTxtShow.find('.trolen').addClass('hide');
            renderPriceArea.wrapTxtShow.find('.den').removeClass('hide');
            renderPriceArea.wrapTxtShow.find('.wrap-max').removeClass('hide').text(txt);

            renderPriceArea.itemClickShowDropdown.trigger('click');
        }else if ( renderPriceArea.minVal.data('value') > 0 && renderPriceArea.maxVal.data('value') == '' ) {
            if ( valData < 0 ) {
                renderPriceArea.maxVal.text(txtMaxDefaultMax);
                renderPriceArea.wrapTxtShow.find('.trolen').removeClass('hide');
                renderPriceArea.wrapTxtShow.find('.wrap-max').addClass('hide');
                renderPriceArea.wrapTxtShow.find('.den').addClass('hide');
                renderPriceArea.itemClickShowDropdown.trigger('click');
                return;
            }
            renderPriceArea.maxVal.text(txtMaxDefaultMax);
            renderPriceArea.minVal.text(txt);

            renderPriceArea.wrapTxtShow.find('.trolen').removeClass('hide');
            renderPriceArea.wrapTxtShow.find('.wrap-max').addClass('hide');
            renderPriceArea.wrapTxtShow.find('.den').addClass('hide');
            renderPriceArea.wrapTxtShow.find('.troxuong').addClass('hide');
            renderPriceArea.wrapTxtShow.find('.wrap-min').removeClass('hide').text(txt);
        }else if ( renderPriceArea.minVal.data('value') == '' && renderPriceArea.maxVal.data('value') > 0 ) {
            renderPriceArea.maxVal.text(txt);
            renderPriceArea.wrapTxtShow.find('.trolen').addClass('hide');
            renderPriceArea.wrapTxtShow.find('.den').addClass('hide');
            renderPriceArea.wrapTxtShow.find('.wrap-min').addClass('hide');

            renderPriceArea.wrapTxtShow.find('.wrap-max').removeClass('hide').text(txt);
            renderPriceArea.wrapTxtShow.find('.troxuong').removeClass('hide');
            renderPriceArea.itemClickShowDropdown.trigger('click');
        }else {
            renderPriceArea.txtGetText.show();
            renderPriceArea.maxVal.text(txtMaxDefaultMax);
            renderPriceArea.minVal.text(txtMaxDefaultMin);
            renderPriceArea.wrapTxtShow.find('.trolen').addClass('hide');
            renderPriceArea.wrapTxtShow.find('.den').addClass('hide');
            renderPriceArea.wrapTxtShow.find('.wrap-min').addClass('hide');
            renderPriceArea.wrapTxtShow.find('.wrap-max').addClass('hide');
            renderPriceArea.wrapTxtShow.find('.troxuong').addClass('hide');
            if ( renderPriceArea.flagToggle == 'max' ) {
                renderPriceArea.itemClickShowDropdown.trigger('click');
            }
        }
    },
    toggleMinMax: function (item) {
        if ( item != undefined ) {
            if ( renderPriceArea.flagToggle == 'min' && item.hasClass('min-val') ) return;
            if ( renderPriceArea.flagToggle == 'max' && item.hasClass('max-val') ) return;
        }
        renderPriceArea.itemRender.find('.txt-min-max').removeClass('active');
        if ( renderPriceArea.flagToggle == 'min' ) {
            renderPriceArea.itemRender.find('.wrap-minmax').addClass('show-max');
            renderPriceArea.maxVal.addClass('active');
            renderPriceArea.flagToggle = 'max';

            if ( renderPriceArea.minVal.data('value') != '' ) {
                var numAdd = renderPriceArea.minVal.data('value') + (renderPriceArea.checkPriceOrArea() ? renderPriceArea.valArea : renderPriceArea.valPrice);
                renderPriceArea.renderVal(numAdd);
            }else {
                renderPriceArea.checkPriceOrArea() ? renderPriceArea.areaRender() : renderPriceArea.priceRender();
            }
        }else {
            renderPriceArea.flagToggle = 'min';
            renderPriceArea.checkPriceOrArea() ? renderPriceArea.areaRender() : renderPriceArea.priceRender();
            renderPriceArea.itemRender.find('.wrap-minmax').removeClass('show-max');
            renderPriceArea.minVal.addClass('active');
        }
    },
    saveInputHidden: function (flagMinMax, val) {
        var iputMin = renderPriceArea.itemRender.find ('input[name=min]'),
            iputMax = renderPriceArea.itemRender.find ('input[name=max]');

        if ( val == 0 || val < 0 ) {
            val = '';
        }
        if ( flagMinMax == 'min' ) {
            iputMin.val(val).trigger('change');
            renderPriceArea.minVal.data('value', val);
            iputMax.val('').trigger('change');
            renderPriceArea.maxVal.data('value', '');
        }else {
            iputMax.val(val).trigger('change');
            renderPriceArea.maxVal.data('value', val);
        }
    }
}
