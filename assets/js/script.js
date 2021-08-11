  

function API_Album_Search(artist) {
  var queryURL = "https://theaudiodb.com/api/v1/json/1/search.php?s=" + artist;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) { 
    var detailURL = "https://theaudiodb.com/api/v1/json/1/album.php?i=" + response.artists[0].idArtist;    
    $("#parallax-banner").attr("src",response.artists[0].strArtistBanner);  
    $("#carousel-title").html("Albums"); 
    $.ajax({
        url: detailURL,
        method: "GET"
      }).then(function(detail_response) {   
        $("#albumCarousel").empty();   
        for (x=0; x<detail_response.album.length; x++) {
          //$("#album_list").append('<li><img src="' + detail_response.album[x].strAlbumThumb + '/preview"</img> ' + detail_response.album[x].strAlbum + ' (' + detail_response.album[x].intYearReleased + ')</li>');
          $(".carousel").append('<a class="carousel-item" id = "album' + x + '" href="#one!"><img src="' + detail_response.album[x].strAlbumThumb + '/preview"></a>');
        } 
        //remove the 'initialized' class which prevents slider from initializing itself again when it's not needed
        if ($(".carousel").hasClass('initialized')){
          $(".carousel").removeClass('initialized')
        }
        //just reinit the carousel
        $(".carousel").carousel();          
      });
  });
}


function API_Video_Search(artist) {
  var queryURL = "https://theaudiodb.com/api/v1/json/1/search.php?s=" + artist;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) { 
    var detailURL = "https://theaudiodb.com/api/v1/json/1/mvid.php?i=" + response.artists[0].idArtist;
    $("#parallax-banner").attr("src",response.artists[0].strArtistBanner);  
    $("#carousel-title").html("Videos");
    $.ajax({
        url: detailURL,
        method: "GET"
      }).then(function(detail_response) {   
        $("#albumCarousel").empty();
        console.log(detail_response);  
        for (x=0; x<detail_response.mvids.length; x++) {
          //$("#album_list").append('<li><img src="' + detail_response.album[x].strAlbumThumb + '/preview"</img> ' + detail_response.album[x].strAlbum + ' (' + detail_response.album[x].intYearReleased + ')</li>');
          //$(".carousel").append('<a class="carousel-item" id = "mvid' + x + '" href="' + detail_response.mvids[x].strMusicVid + '"><img src="' + detail_response.mvids[x].strTrackThumb + '"></a>');
          $(".carousel").append('<div class="card carousel-item"><div class="card-content"><span class="card-title">' + detail_response.mvids[x].strTrack + '</span><a target=_blank href="' + detail_response.mvids[x].strMusicVid + '"><img src="' + detail_response.mvids[x].strTrackThumb + '" style="height:100%;width:100%;object-fit:cover"></a></div></div>');
        } 
        //remove the 'initialized' class which prevents slider from initializing itself again when it's not needed
        if ($(".carousel").hasClass('initialized')){
          $(".carousel").removeClass('initialized')
        }
        //just reinit the carousel
        $(".carousel").carousel();          
      });
  });
}



function test() {
  $("body").prepend('<div id="testDiv"></div>')
  $("#testDiv").append('<input type="text" id="artist-name">');
  $("#testDiv").append('</input><button type="submit" id="search-album">Album Search</button>');
  $("#testDiv").append('</input><button type="submit" id="search-video">Video Search</button>');
  $("#testDiv").append('<h4 id="carousel-title"></h4>');
  $("#search-album").on("click", function(e) {
      e.preventDefault();
      API_Album_Search($("#artist-name").val());
  });
  $("#search-video").on("click", function(e) {
    e.preventDefault();
    API_Video_Search($("#artist-name").val());
});  
  $("#testDiv").append('<div class="parallax"><img id="parallax-banner" src="" alt=""></div>');
}

test();

  
$(document).ready(function(){
  $('.carousel').carousel();
});

//detecting arrow key presses
document.addEventListener('keydown', function(e) {
  switch (e.key) {
      case 'ArrowLeft':
        $('.carousel').carousel('next');
        break;
      case 'ArrowRight':
        $('.carousel').carousel('next', -1);
        break;
  }
});