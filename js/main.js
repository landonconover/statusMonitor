$(document).ready(function() {
  $.simpleWeather({
    location: 'Orem, UT',
    woeid: '',
    unit: 'f',
    success: function(weather) {
      html = '<h2 class="text-center weather-header"><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';

      html += '<ul id="forcast">';

      for(var i=0;i<weather.forecast.length;i++) {
        html += '<li><i class="icon-'+weather.forecast[i].code+'"></i> '+weather.forecast[i].day+': '+weather.forecast[i].high+'</li>';
      }

      html += '</ul>';

      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });

//Clock Stuff
  function clock() {
    var t = moment(),
        a = t.minutes() * 6,
        o = t.hours() % 12 / 12 * 360 + (a / 12);
    $(".hour").css("transform", "rotate(" + o + "deg)");
    $(".minute").css("transform", "rotate(" + a + "deg)");
  }
  function refreshClock() {
    clock(), setTimeout(refreshClock, 1000)
  }
  refreshClock();

  //News stuff
  var rssurl = 'http://feeds.gawker.com/gizmodo/full';
 function parseRSS(url, callback) {
   $.ajax({
     url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
     dataType: 'json',
     success: function(data) {
       callback(data.responseData.feed);
     }
   });
 }

 parseRSS(rssurl, function (data) {
    $.each(data.entries, function (i, item) {
        console.log("ITEM");
        console.log(item);
        var newsHTML = '';
        newsHTML += '<div class="media"><div class="media-body"><h4 class="media-heading">';
        newsHTML += item.title;
        newsHTML += '</h4><p>';
        newsHTML += item.contentSnippet;
        newsHTML += '</p></div></div>';

        $('#newsContain').append(newsHTML);

    })
})

});
