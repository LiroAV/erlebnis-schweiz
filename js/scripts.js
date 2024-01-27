jQuery(function ($) {
	var createCookie = function (name, value, days) {
		var expires;
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toGMTString();
		} else {
			expires = ""; // Creates the session cookie if empty.
		}
		document.cookie = name + "=" + value + expires + "; path=/";
	}

	var getCookie = function (name) {
		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
		if (parts.length == 2) return parts.pop().split(";").shift();
	}

	var useGeoLocation = $('span#use_geolocation').data('use-geolocation');
	var geolocationCurrencyCode = $('span#geolocation_currency_code').data('geolocation-currency-code');
	var hasconfirmed = getCookie('wp_travel_multiple_currency_customer_geolocation_confirmed');

	if (useGeoLocation) {
		var cookieName = 'wp_travel_multiple_currency_customerSelectedCurrency';
		var cookieValue = geolocationCurrencyCode;
		if (!hasconfirmed) {
			if (confirm('Display currency on the basis of your geo-location?')) {
				createCookie(cookieName, cookieValue);
				createCookie('wp_travel_multiple_currency_customer_geolocation_confirmed', true);

				var ajaxData ={
					action: 'wtmc_clear_cache',
					_nonce: wp_travel._nonce
				}
				$.ajax({
					type: "POST",
					url: wp_travel.ajaxUrl,
					data: ajaxData,
					beforeSend: function beforeSend() {},
					success: function success(data) {
						location.reload(true);
					}
				});
			} else {
				createCookie('wp_travel_multiple_currency_customer_geolocation_confirmed', false);
			}
		}
	} else {
		$('select#customer_selected_currency').change(function () {
			var cookieName = 'wp_travel_multiple_currency_customerSelectedCurrency';
			var cookieValue = $(this).children('option:selected').val();
			createCookie(cookieName, cookieValue);
			location.reload(true);
		});
	}
});
