//Function that takes the artist name and pulls data from the audiodb api to get album art
function API_Album_Search(artist) {
  var queryURL = "https://theaudiodb.com/api/v1/json/1/search.php?s=" + artist;
  console.log(queryURL);
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
      //takes the api data and applies it to the album carousel 
      }).then(function(detail_response) {   
        $("#albumCarousel").empty();   
        for (x=0; x<detail_response.album.length; x++) {
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

//Function that takes the artist name and pulls data from the audiodb api to get videos 
function API_Video_Search(artist) {
  var queryURL = "https://theaudiodb.com/api/v1/json/1/search.php?s=" + artist;
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) { 
    var detailURL = "https://theaudiodb.com/api/v1/json/1/mvid.php?i=" + response.artists[0].idArtist;
    console.log(detailURL)
    $("#carousel-title2").html("Videos");
    $.ajax({
        url: detailURL,
        method: "GET"
      ////takes the api data and applies it to the video carousel
      }).then(function(detail_response) {   
        $("#videoCarousel").empty();
        console.log(detail_response);  
        for (x=0; x<detail_response.mvids.length; x++) {
          $("#videoCarousel").append('<div class="card carousel-item"><div class="card-content"><span class="card-title">' + detail_response.mvids[x].strTrack + '</span><a target=_blank href="' + detail_response.mvids[x].strMusicVid + '"><img src="' + detail_response.mvids[x].strTrackThumb + '" style="height:100%;width:100%;object-fit:cover"></a></div></div>');
        } 
        //remove the 'initialized' class which prevents slider from initializing itself again when it's not needed
        if ($("#videoCarousel").hasClass('initialized')){
          $("#videoCarousel").removeClass('initialized')
        }
        //just reinit the carousel
        $("#videoCarousel").carousel();          
      });
  });
}



function test() {
  
  //function that is called when the enter key is pressed while inside the input field
  $(function(){
    $("#artistInput").keyup(function (e) {
      if (e.which == 13) {   
        $('input[name="textInput"]').trigger('click');
        //Hides the starting screen
        $("#col1, #col2").hide();
        //Shows the rows that are going to have content inserted 
        $("#row3, #row4, #row5").removeClass("hide");
        //removes the limits on vertical scrolling;
        $("body").removeClass("screenLimit");
        //Appends the div containing the band banner to col3
        $("#col3").append('<div class="parallax"><img id="parallax-banner" src="" alt=""></div>');
        //sets the variable artist to be the value of what is inside the input div
        artist=$("#icon_prefix2").val();
        //calls the function with the input 'artist' that generates the album art carousel
        API_Album_Search(artist);
        //calls the function with the input 'artist' that generates the artist video carousel
        API_Video_Search(artist);
        e.preventDefault();
       
      }
    });
  }); 
 
}

test();

//initializes the carousels
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