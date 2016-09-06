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
            load: function() {},
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

        //sc.settings.load(el);

        if ( sc.settings.selectedValue ) {
            selectItem();
        }
        
        // set value input when reload page
        function showSortLoad () {
            if ( el.hasClass('price-area') ) {
                renderPriceArea.updateHidden(el);
                return;
            }
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
                        //_this.addClass('active');
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
            itemDropClick.unbind('click');
            itemDropClick.on('click', function (e) {
                e.preventDefault();
                var _this = $(this),
                    txtClick = _this.text(),
                    valSelected = _this.data('value');

                itemDropClick.removeClass('active');
                _this.addClass('active');
                if ( itemClick.find('.get-val').length ) {
                    itemClick.find('.get-val').text(txtClick);
                }else {
                    txtItemClick.text(txtClick);
                }
                el.find('input[type=hidden]').val(valSelected);
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
    arrPriceAdd: [20000000, 30000000, 40000000, 50000000], // trieu
    arrAreaAdd: [200, 300, 400, 500],
    flagPrice: 0, // 0: gia mua, 1: gia thue,
    itemRender: '',
    flagToggle: 'min',
    minVal: '',
    maxVal: '',
    unitAdd: '',
    itemClickShowDropdown: '',
    wrapTxtShow: '',
    txtGetText: '',
    iputMinHidden: '',
    iputMaxHidden: '',
    init: function (item) {
        renderPriceArea.itemRender = item;
        renderPriceArea.iputMinHidden = renderPriceArea.itemRender.find ('input[name=min]');
        renderPriceArea.iputMaxHidden = renderPriceArea.itemRender.find ('input[name=max]');
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
    updateHidden: function (item) {
        renderPriceArea.init(item);
        renderPriceArea.renderTextShow();
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
            valLoop = 10,
            tempArr = 0;

        renderPriceArea.itemRender.find('.wrap-minmax').html('');

        renderPriceArea.flagToggle == 'min' ? numAdd = 0 : numAdd = num;
        renderPriceArea.flagToggle == 'min' ? valLoop = 11 : valLoop = 10;

        if ( renderPriceArea.arrAreaAdd.length > 0 || renderPriceArea.arrPriceAdd.length > 0 ) {
            valLoop += 4;
        }

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

            if ( renderPriceArea.checkPriceOrArea() && renderPriceArea.flagToggle == 'min' && i+1 > 10 ) { // dien tich
                numAdd = renderPriceArea.arrAreaAdd[tempArr];
            }else if ( renderPriceArea.flagToggle == 'min' && renderPriceArea.flagPrice && i+1 > 10 ) { // gia thue
                numAdd = renderPriceArea.arrPriceAdd[tempArr];
            }else if ( renderPriceArea.flagToggle == 'min' && i+1 > 10 ) { // gia mua
                numAdd = renderPriceArea.arrPriceAdd[tempArr]*1000 ;
            }

            if ( i+1 > 10 && tempArr+1 < 4 ) {
                tempArr += 1;
            }
        }
    },
    selectVal: function (item) {
        item.find('a').on('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var _this = $(this),
                valData = _this.data('number');

            renderPriceArea.saveInputHidden(renderPriceArea.flagToggle, valData);

            renderPriceArea.renderTextShow(valData);

            if ( renderPriceArea.flagToggle == 'min' ) {
                renderPriceArea.toggleMinMax();
            }
        });
    },
    renderTextShow: function (valData) {
        renderPriceArea.txtGetText.hide();
        var txtMaxDefaultMax = renderPriceArea.maxVal.data('text'),
            txtMaxDefaultMin = renderPriceArea.minVal.data('text'),
            valMinHidden = renderPriceArea.iputMinHidden.val(),
            valMaxHidden = renderPriceArea.iputMaxHidden.val();

        if ( valMinHidden > 0 && valMaxHidden > 0 ) {
            var txtMin = formatPrice(valMinHidden.toString())+renderPriceArea.unitAdd,
                txtMax = formatPrice(valMaxHidden.toString())+renderPriceArea.unitAdd;
            renderPriceArea.maxVal.text(txtMax);
            renderPriceArea.minVal.text(txtMin);

            renderPriceArea.wrapTxtShow.find('.trolen').addClass('hide');
            renderPriceArea.wrapTxtShow.find('.den').removeClass('hide');
            renderPriceArea.wrapTxtShow.find('.wrap-min').removeClass('hide').text(txtMin);
            renderPriceArea.wrapTxtShow.find('.wrap-max').removeClass('hide').text(txtMax);

            if ( valData != undefined )  renderPriceArea.itemClickShowDropdown.trigger('click');
        }else if ( valMinHidden > 0 && valMaxHidden == '' ) {
            var txtMin = formatPrice(valMinHidden.toString())+renderPriceArea.unitAdd;
            if ( valData < 0 ) {
                renderPriceArea.maxVal.text(txtMaxDefaultMax);
                renderPriceArea.wrapTxtShow.find('.trolen').removeClass('hide');
                renderPriceArea.wrapTxtShow.find('.wrap-max').addClass('hide');
                renderPriceArea.wrapTxtShow.find('.den').addClass('hide');
                if ( valData != undefined )  renderPriceArea.itemClickShowDropdown.trigger('click');
                return;
            }
            renderPriceArea.maxVal.text(txtMaxDefaultMax);
            renderPriceArea.minVal.text(txtMin);

            renderPriceArea.wrapTxtShow.find('.trolen').removeClass('hide');
            renderPriceArea.wrapTxtShow.find('.wrap-max').addClass('hide');
            renderPriceArea.wrapTxtShow.find('.den').addClass('hide');
            renderPriceArea.wrapTxtShow.find('.troxuong').addClass('hide');
            renderPriceArea.wrapTxtShow.find('.wrap-min').removeClass('hide').text(txtMin);
        }else if ( valMinHidden == '' && valMaxHidden > 0 ) {
            var txtMax = formatPrice(valMaxHidden.toString())+renderPriceArea.unitAdd;
            renderPriceArea.maxVal.text(txtMax);
            renderPriceArea.wrapTxtShow.find('.trolen').addClass('hide');
            renderPriceArea.wrapTxtShow.find('.den').addClass('hide');
            renderPriceArea.wrapTxtShow.find('.wrap-min').addClass('hide');

            renderPriceArea.wrapTxtShow.find('.wrap-max').removeClass('hide').text(txtMax);
            renderPriceArea.wrapTxtShow.find('.troxuong').removeClass('hide');
            if ( valData != undefined ) renderPriceArea.itemClickShowDropdown.trigger('click');
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
                if ( valData != undefined )  renderPriceArea.itemClickShowDropdown.trigger('click');
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
        if ( val == 0 || val < 0 ) {
            val = '';
        }
        if ( flagMinMax == 'min' ) {
            renderPriceArea.iputMinHidden.val(val).trigger('change');
            renderPriceArea.minVal.data('value', val);
            renderPriceArea.iputMaxHidden.val('').trigger('change');
            renderPriceArea.maxVal.data('value', '');
        }else {
            renderPriceArea.iputMaxHidden.val(val).trigger('change');
            renderPriceArea.maxVal.data('value', val);
        }
    }
}

$.fn.checkbox_ui = function (options) {

    return this.each(function() {
        var defaults = {
            checked: false,
            unchecked: false,
            disable: false,
            enable: false,
            done: function(){}
        },
        sc = {},
        el = $(this);

        if ( el.length == 0 ) return el;

        sc.settings = $.extend({}, defaults, options);

        if ( el.find('input[type=checkbox]').attr('checked') ) {
            el.addClass('active');
        }

        if ( el.find('input[type=checkbox]').attr('disabled') ) {
            el.addClass('disabled-rc');
        }

        if ( sc.settings.checked ) {
            el.find('input[type=checkbox]').prop("checked", true);
            checkedItem(el, true);
        }

        if ( sc.settings.unchecked ) {
            el.find('input[type=checkbox]').prop("checked", false);
            checkedItem(el, false);
        }

        if ( sc.settings.disable ) {
            el.addClass('disabled-rc');
        }

        if ( sc.settings.enable ) {
            el.removeClass('disabled-rc');
        }

        el.unbind('click');
        el.on('click', toggleCheck);

        function toggleCheck (e) {
            e.preventDefault();
            var _this = $(this);
            if ( _this.hasClass('disabled-rc') ) return;
            if ( _this.find('input[type=checkbox]').prop("checked") ) {
                _this.find('input[type=checkbox]').prop("checked", false);
                checkedItem(_this, false);
            }else {
                _this.find('input[type=checkbox]').prop("checked", true);
                checkedItem(_this, true);
            }
            _this.find('input[type=checkbox]').trigger('change');

            sc.settings.done(_this.find('input[type=checkbox]')); // CALLBACK
        }

        function checkedItem (item, flagChecked) {
            if ( flagChecked ) {
                item.addClass('active');
            }else {
                item.removeClass('active');
            }
        }

    });
}

$.fn.radio_ui = function (options) {

    return this.each(function() {
        var defaults = {
            done: function(){}
        },
        sc = {},
        el = $(this);

        if ( el.length == 0 ) return el;

        sc.settings = $.extend({}, defaults, options);

        el.on('click', toggleCheck);

        if ( el.find('input').attr('checked') ) {
            el.addClass('active');
        }

        function toggleCheck (e) {
            e.preventDefault();
            var _this = $(this),
                nameGroup = _this.find('input').attr('name');

            $('input[name="'+nameGroup+'"]').prop("checked", false);
            $('input[name="'+nameGroup+'"]').closest('.radio-ui').removeClass('active');

            if ( _this.find('input[type=radio]').prop("checked") ) {
                _this.find('input[type=radio]').prop("checked", false);
                checkedItem(_this, false);
            }else {
                _this.find('input[type=radio]').prop("checked", true);
                checkedItem(_this, true);
            }

            sc.settings.done(_this.find('input'));
        }
        function checkedItem (item, flagChecked) {
            if ( flagChecked ) {
                item.addClass('active');
            }else {
                item.removeClass('active');
            }
        }

    });
}
