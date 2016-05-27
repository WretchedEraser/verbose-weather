$('.manual-loc').keyup(function(event) {
  if (event.keyCode == 13) {
    $('.find-me').click();
  }
});

$('.find-me').click(function() {

  var userLocation = $('.manual-loc').val();
  console.log(userLocation);
  loadWeather(userLocation);
  userColor = $('.manual-loc').val('');

});

/* Does your browser support geolocation? */
if ("geolocation" in navigator) {
  $('.js-geolocation').show();
} else {
  $('.js-geolocation').hide();
}

/* Where in the world are you? */
$('.js-geolocation').on('click', function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude + ',' + position.coords.longitude); 
    //load weather using your lat/lng coordinates
  });
});

loadWeather('47.647644, -117.430343'); //@params 

function loadWeather(location) {
  $.simpleWeather({
    location: location,
    unit: 'f',
    
    success: function(weather) {
      if (weather.city == 'Spokane') {
        $('.loc').text('Hello from ' + weather.city + '!');
      } else {
        $('.loc').text('Hello in ' + weather.city + '!');
      }

      if (weather.todayCode === 1 ||
        weather.todayCode === 3 ||
        weather.todayCode === 4 ||
        weather.todayCode === 5 ||
        weather.todayCode === 6 ||
        weather.todayCode === 8 ||
        weather.todayCode === 9 ||
        weather.todayCode === 10 ||
        weather.todayCode === 11 ||
        weather.todayCode === 12 ||
        weather.todayCode === 37 ||
        weather.todayCode === 38 ||
        weather.todayCode === 39 ||
        weather.todayCode === 40 ||
        weather.todayCode === 45 ||
        weather.text.indexOf('storm') > -1 ||
        weather.text.indexOf('Storm') > -1 ||
        weather.text.indexOf('Rain') > -1 ||
        weather.text.indexOf('Shower') > -1 ||
        weather.text.indexOf('shower') > -1 ||
        weather.text.indexOf('mist') > -1 ||
        weather.text.indexOf('drizzle') > -1

      ) {
        $('.rain').text('You NEED an umbrella it\'s going to ' + weather.text);
      } else if (weather.text.indexOf('Sunny') > -1 ||
        weather.text.indexOf('Fair') > -1 ||
        weather.text.indexOf('Hot') > -1 ||
        weather.text.indexOf('Clear') > -1) {
        $('.rain').text('Grab your sunglasses it\'s ' + weather.text);
      } else {
        $('.rain').text('You don\'t need an umbrella it\'s ' + weather.text);
      };

      if (weather.wind.chill > 90) {
        $('.wrapper').css({
          /*91+  */
          'background-image': 'linear-gradient(90deg, rgb(231, 76, 60) 0%, rgb(52, 73, 94) 100%)'
        });
        $('.jacket').text('be careful  it\'s ' + weather.temp + '°F outside');
      } else if (weather.wind.chill > 69 && weather.wind.chill < 91) {
        // console.log('im in!'); 
        $('.wrapper').css({
          /* 70-90 */
          'background-image': 'linear-gradient(90deg, rgb(230, 126, 34) 0%, rgb(52, 73, 94) 100%)'
        });
        $('.jacket').text('wear your warm weather clothes it\'s ' + weather.temp + '°F outside');
      } else if (weather.wind.chill > 58 && weather.wind.chill < 70) {
        $('.wrapper').css({
          /* 59-69 */
          'background-image': ' linear-gradient(90deg, rgb(26, 188, 156) 0%, rgb(52, 73, 94) 100%)'
        });
        $('.jacket').text('you should think about wearing jacket it\'s ' + weather.temp + '°F outside');

      } else if (weather.wind.chill > 32 && weather.wind.chill < 60) {
        $('.wrapper').css({
          /* 33-59 */
          'background-image': 'linear-gradient(90deg, rgb(52, 152, 219) 0%, rgb(52, 73, 94) 100%)'
        });
        $('.jacket').text('You NEED a jacket it\'s ' + weather.temp + '°F outside');
      } else {
        $('.wrapper').css({
          /* below freezing */
          'background-image': 'linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(52, 73, 94) 100%)'
        });
        $('.jacket').text('You really NEED a jacket it\'s ' + weather.temp + '°F outside');
      };

      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>' + error.message + '</p>');
    }
  });
};