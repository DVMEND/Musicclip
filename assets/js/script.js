//Function that takes the artist name and pulls data from the audiodb api to get album art
function API_Album_Search(artist) {
  var queryURL = "https://theaudiodb.com/api/v1/json/1/search.php?s=" + artist;
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) { 
    var detailURL = "https://theaudiodb.com/api/v1/json/1/album.php?i=" + response.artists[0].idArtist; 
    $("#bio-title").html("Artist Bio"); 
    //$("#bio-div").append('<p id="bio" class="flow-text"></p>');
    //$("#bio").html(response.artists[0].strBiographyEN);   
    $("#bioText").html(response.artists[0].strBiographyEN);
    $("#parallax-banner").attr("src",response.artists[0].strArtistBanner);  
    $("#carousel-title").html("Albums"); 
    $.ajax({
        url: detailURL,
        method: "GET"
      //takes the api data and applies it to the album carousel 
      }).then(function(detail_response) { 
        // hides any previous track listing table when searching a new artist.
        $("#row6").addClass("hide");  
        $("#albumCarousel").empty();   
        for (x=0; x<detail_response.album.length; x++) {
          if (detail_response.album[x].strAlbumThumb){
            var albumImg = detail_response.album[x].strAlbumThumb;
          }
          else{
            var albumImg = "assets/Images/main_logo_clear.png";
          }
          //$(".carousel").append('<a class="carousel-item" id = "album' + x + '" href="#one!"><img src="' + detail_response.album[x].strAlbumThumb + '/preview"></a>');
          //$("#albumCarousel").append('<div class="card carousel-item"><div class="card-content"><span class="card-title">' + detail_response.album[x].strAlbum + ' ('+ detail_response.album[x].intYearReleased + ')' + '</span><a target=_blank href="' + detail_response.album[x].strMusicVid + '"><img title="'+ detail_response.album[x].strTrack+'" src="' + albumImg + '" style="height:100%;width:100%;object-fit:cover"></a></div></div>');
          //$("#albumCarousel").append('<div class="card carousel-item hoverable"><div class="card-content"><span class="card-title">' + detail_response.album[x].strAlbum + ' ('+ detail_response.album[x].intYearReleased + ')' + '</span><a><img onclick="API_Track_Search(' + detail_response.album[x].idAlbum + ')" title="'+ detail_response.album[x].strTrack+'" src="' + albumImg + '" style="height:100%;width:100%;object-fit:cover"></a></div></div>');
          $("#albumCarousel").append('<div class="card carousel-item hoverable"><div class="card-content"> <a><img onclick="API_Track_Search(' + detail_response.album[x].idAlbum + ')" title="'+ detail_response.album[x].strTrack+'" src="' + albumImg + '" style="height:100%;width:100%;object-fit:cover"></a>' + '</br><span class="card-title">' + detail_response.album[x].strAlbum + ' ('+ detail_response.album[x].intYearReleased + ')' + '</span></div></div>');
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

function API_Track_Search(albumId) {
  var queryURL = "https://theaudiodb.com/api/v1/json/1/track.php?m=" + albumId;
  console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
      //takes the api data and applies it to the album carousel 
      }).then(function(detail_response) {   
        console.log(detail_response)
        $("#tableBody").empty();
        $("#row6").removeClass("hide");
         for (x=0; x<detail_response.track.length; x++) {
          console.log (detail_response.track[x].strTrack + detail_response.track[x].intTrackNumber + detail_response.track[x].intDuration);
          var seconds = (detail_response.track[x].intDuration /1000).toFixed(0) % 60;
          var minutes = Math.floor(( detail_response.track[x].intDuration / 60000), 0)
          console.log( minutes + ":" + (seconds < 10 ? '0' : '') + seconds);
          var lengthFormatted = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;

          $("#tableBody").append("<tr id=tableElement" + x + "></tr>");

          $("#tableElement" + x ).append("<td>"+ detail_response.track[x].intTrackNumber + "</td>");
          $("#tableElement" + x ).append("<td>"+ detail_response.track[x].strTrack + "</td>");
          $("#tableElement" + x ).append("<td>"+ lengthFormatted + "</td>");

        } 
        
  })};













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
          if (detail_response.mvids[x].strTrackThumb){
            var videoImg = detail_response.mvids[x].strTrackThumb;
          }
          else{
            var videoImg = "assets/Images/main_logo_clear.png";
          }
          $("#videoCarousel").append('<div class="card carousel-item hoverable"><div class="card-content"><span class="card-title">' + detail_response.mvids[x].strTrack + '</span><a target=_blank href="' + detail_response.mvids[x].strMusicVid + '"><img title="'+ detail_response.mvids[x].strTrack+'" src="' + videoImg + '" style="height:100%;width:100%;object-fit:cover"></a></div></div>');
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
        $("#row1, #row2").hide();
        //Shows the rows that are going to have content inserted 
        $("#row3, #row4, #row5, #row7, nav, #mobile-demo").removeClass("hide");
        //removes the limits on vertical scrolling;
        $("body").removeClass("screenLimit");
        //Appends the div containing the band banner to col3
        $("#banner").append('<div class="parallax"><img id="parallax-banner" src="" alt=""></div>');
        //sets the variable artist to be the value of what is inside the input div
        artist=$("#icon_prefix2").val();
        //calls the function with the input 'artist' that generates the album art carousel
        API_Album_Search(artist);
        //calls the function with the input 'artist' that generates the artist video carousel
        API_Video_Search(artist);


        e.preventDefault();
       
      }      
    });
    

    $("#navbarsearch").keyup(function (e) {
      if (e.which == 13) {   
        artist=$("#icon_prefix2_navbar").val();
        //calls the function with the input 'artist' that generates the album art carousel
        API_Album_Search(artist);
        //calls the function with the input 'artist' that generates the artist video carousel
        API_Video_Search(artist);
        // clears the input field to be ready for the next search.
        $("#icon_prefix2_navbar").val("");
        e.preventDefault();
      }      
    });


    $("#sidenavsearch").keyup(function (e) {
      if (e.which == 13) {   
        artist=$("#icon_prefix2_sidenav").val();
        //calls the function with the input 'artist' that generates the album art carousel
        API_Album_Search(artist);
        //calls the function with the input 'artist' that generates the artist video carousel
        API_Video_Search(artist);
        // clears the input field to be ready for the next search.
        $("#icon_prefix2_sidenav").val("");
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

$(document).ready(function(){
  $('.sidenav').sidenav();
});

//initializes the collapsible div 
$(document).ready(function(){
  $('.collapsible').collapsible();
});