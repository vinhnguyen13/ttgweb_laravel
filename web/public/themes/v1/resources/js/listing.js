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

	$('.price-area').dropdown({
        beforeOpen: function (item) {
        	renderPriceArea.flagPrice = 1; // 0: gia mua, 1: gia thue
            renderPriceArea.init(item);
        },
        closeCallBack: function (item) {
            
        }
    });

});