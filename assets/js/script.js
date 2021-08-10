
function API_Album_Search(artist) {
    var queryURL = "https://theaudiodb.com/api/v1/json/1/search.php?s=" + artist;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) { 
      var detailURL = "https://theaudiodb.com/api/v1/json/1/album.php?i=" + response.artists[0].idArtist;    
      $.ajax({
          url: detailURL,
          method: "GET"
        }).then(function(detail_response) {   
          $("#album_list").empty();   
          for (x=0; x<detail_response.album.length; x++) {
            //$("#album_list").append('<li><img src="' + detail_response.album[x].strAlbumThumb + '/preview"</img> ' + detail_response.album[x].strAlbum + ' (' + detail_response.album[x].intYearReleased + ')</li>');
            $(".carousel").append('<a class="carousel-item" id = "album' + x + '" href="#one!"><img src="' + detail_response.album[x].strAlbumThumb + '/preview"></a>');
            //$(".carousel").attr("src","detail_response.album[x].strAlbumThumb"+"/preview");
            //$(".carousel").attr("id","album"+x);

          }  
        });
    
    });
  }

  function test() {
      var albumArray = [];
    $("body").prepend('<div id="testDiv"></div>')
    $("#testDiv").append('<form><input type="text" id="artist-name"></input><button type="submit" id="search-button">Search Artist</button></form>');
    $("#testDiv").append('<ul id="album_list"></ul>');
    $("#search-button").on("click", function(e) {
        e.preventDefault();
        albumArray = API_Album_Search($("#artist-name").val());
    });
  }

  test();

    
  $(document).ready(function(){
    $('.carousel').carousel();
  });
  