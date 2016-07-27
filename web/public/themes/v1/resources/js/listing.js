$(window).on('load', function () {

	$('.fillter-listing > ul > li .dopdown-1').dropdown({
		beforeOpen: function (item) {
			var itemClick = item.find('.val-selected'),
		        txtItemClick = itemClick.find('.txt-selected'),
		        itemDropClick = item.find('.item-dropdown a');

		    itemDropClick.unbind('click');
			itemDropClick.on('click', function (e) {
				e.preventDefault();
				var _this = $(this),
					txtClick = _this.text(),
					valSelected = _this.data('value');

				if ( itemClick.find('.get-val').length ) {
					itemClick.find('.get-val').text(txtClick);
				}else {
					txtItemClick.text(txtClick);
				}
				item.find('input[type=hidden]').val(valSelected);
				itemClick.trigger('click');
			});
		},
		closeCallBack: function (item) {
			console.log(item);
		}
	});

	var gia_dientich = {
		priceFlag: 0,
		priceSell : '1000000000',
		priceRent: '1000000',
		dtValFrist: 10,
		init: function (item) {
			gia_dientich.renderMinMax(item);
			gia_dientich.toggleMinMax(item);
		},
		renderMinMax: function (item) {
			if ( gia_dientich.priceFlag == 0 && item.data('item') == 'gia' ) { //mua
				var valPrice = gia_dientich.priceSell;
				item.find('.wrap-minmax').html('');
				for ( var i = 0; i < 10; i++ ) {
					var itemList = $('<li><a href="#" data-value="'+valPrice+'">'+formatPrice(valPrice)+'</a></li>');
					item.find('.wrap-minmax').append(itemList);
					valPrice += gia_dientich/2;
				}

			}else if ( gia_dientich.priceFlag == 1 && item.data('item') == 'gia' ) { //thue
				item.find('.wrap-minmax').html('');
			}else { //dien tich
				var valDT = gia_dientich.dtValFrist;
				item.find('.wrap-minmax').html('');
				for ( var i = 0; i < 10; i++ ) {
					var itemList = $('<li><a href="#" data-value="'+valDT+'">'+valDT+'m2</a></li>');
					item.find('.wrap-minmax').append(itemList);
					valDT += gia_dientich.dtValFrist;
				}
			}
		},
		toggleMinMax: function (item) {
			$('.box-input .txt-min-max').on('click', function () {
				var _this = $(this);
				if ( _this.hasClass('max-val') ) {
					if ( item.find('.min-val').data('value') != '' && item.data('item') == 'dientich' ) {

					}else {

					}
				}else {

				}
			});
		}
	};
	gia_dientich.priceFlag == 0; //0. mua - 1. thue
	$('.fillter-listing > ul > li .dopdown-2').dropdown({
		beforeOpen: function (item) {
			gia_dientich.init(item);
		},
		closeCallBack: function (item) {
			
		}
	});

	function formatPrice(price) {
		var priceFormated = price.split( /(?=(?:\d{3})+(?:\.|$))/g ).join(".");
		var priceNum = Number(price);
		
		if(price.length > 9) {
			priceFormated = (priceNum / 1000000000) + '';
			priceFormated = formatNumber(priceFormated.replace('.', ',')) + ' tỷ';
		} else if(price.length > 6) {
			priceFormated = (priceNum / 1000000) + '';
			priceFormated = priceFormated.replace('.', ',') + ' triệu';
		}
		
		return priceFormated;
	}

	function formatNumber(number) {
		if(/^0*$/.test(number)) {
			return '';
		}
		
		number = number.split(',');
		var numberFormated = number[0];
		numberFormated = numberFormated.split( /(?=(?:\d{3})+(?:\.|$))/g ).join(".");
		
		if(number.length > 1) {
			numberFormated = numberFormated + ',' + number[1];
		}
		
		return numberFormated;
	}

});