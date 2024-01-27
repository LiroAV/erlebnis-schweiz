jQuery(document).ready( function($){
    function weatherForcastSlickSettings() {
        return {
            infinite: false,
            draggable: true,
            slidesToShow: 1,
            slidesToScroll: 1
        };
    }
    // jQuery for slick slider.
    $('.wp-travel-trip-weather-forecast-slick-wrapper').slick(weatherForcastSlickSettings());

    // On select change, display the slides according to the selected values ( dates ).
    $( document ).on( 'change', '.wp_travel_trip_weather_forecast_date_select', function() {
        var selected_date = $(this).val();
        $(this).parent('.wp-travel-trip-weather-forecast-date-select').siblings('.wp-travel-trip-weather-forecast-slick-wrapper').removeClass('slick-initialized slick-slider');
        $(this).parent('.wp-travel-trip-weather-forecast-date-select').siblings( '.' + selected_date ).addClass('slick-initialized slick-slider');

        // Hide extra divs button.
        $(this).parent('.wp-travel-trip-weather-forecast-date-select').siblings('.wp-travel-trip-weather-forecast-slick-wrapper').find( 'button' ).css( "display", "none" );
        $(this).parent('.wp-travel-trip-weather-forecast-date-select').siblings( '.' + selected_date ).find( 'button' ).css( "display", "block" );
    } );
    $('.wp_travel_trip_weather_forecast_date_select').trigger( 'change' );

});