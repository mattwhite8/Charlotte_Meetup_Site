// Cardinal Solutions lat/lng: 35.227024, -80.846575

//firebase information ###########################
var config = {
    apiKey: "AIzaSyChAcOSZ_Wm3hUXTNX42uwMTIuRK3oi-yw",
    authDomain: "charlottehackathondata.firebaseapp.com",
    databaseURL: "https://charlottehackathondata.firebaseio.com",
    storageBucket: "charlottehackathondata.appspot.com",
    messagingSenderId: "968440978977"
  };
firebase.initializeApp(config);

var database = firebase.database();
    console.log(database.ref());

    var databaseList = [];

    // Capture Button Click
    $("#add-user").on("click", function() {

      event.preventDefault();
      // YOUR TASK!!!

      var user = {};
      user.name = $('#name-input').val().trim();
      user.age = $('#age-input').val().trim();
      user.email = $('#email-input').val().trim();
      user.comment = $('#comment-input').val().trim();
      // Code in the logic for storing and retrieving the most recent user.
      databaseList.push(user);
      database.ref().set(databaseList);
      setTimeout(function(){
        $('#name-input').val('');
        $('#age-input').val('');
        $('#email-input').val('');
        $('#comment-input').val('');
        $("#contact").prepend('<div class="alert alert-info alert-dismissible" role="alert">' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
        '<strong>Hey!</strong> Your submission went through!' +
        '</div>');
      },1000);
      
    });

    // Don't forget to handle the "initial load"
    
    // Create Firebase "watcher" Hint: .on("value")
    database.ref().on('value', function(snapshot){
      console.log(snapshot.val());
      databaseList = snapshot.val() || [];
      

      

    }, function(errorObj){
      console.log('Errors Handled:  ' + errorObj.code);
    });


//initializing google maps API
var map;
var myLatlng = {
        lat: 35.227024,
        lng: -80.846575
    };
function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: myLatlng
        });
        var infowindow = new google.maps.InfoWindow({
                    content: 'Charlotte Hackathon Address: <br>222 S Church St #500, Charlotte, NC 28202'
                });
        var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title: 'Location:'
                });
        marker.addListener('click', function() {
                    infowindow.open(map, marker);
                });
      }
//##########################END OF MAP API#######################


//document ready / onload
$(function() {

  "use strict";

  var topoffset = 50; //variable for menu height
  var slideqty = $('#featured .item').length;
  var wheight = $(window).height(); //get the height of the window
  var randSlide = Math.floor(Math.random()*slideqty);

  $('#featured .item').eq(randSlide).addClass('active');

  $('.fullheight').css('height', wheight); //set to window tallness  


  //replace IMG inside carousels with a background image
  $('#featured .item img').each(function() {
    var imgSrc = $(this).attr('src');
    $(this).parent().css({'background-image': 'url('+imgSrc+')'});
    $(this).remove();
  });

  //adjust height of .fullheight elements on window resize
  $(window).resize(function() {
    wheight = $(window).height(); //get the height of the window
    $('.fullheight').css('height', wheight); //set to window tallness  
  });


  //Activate Scrollspy
  $('body').scrollspy({
    target: 'header .navbar',
    offset: topoffset
  });

  // add inbody class
  var hash = $(this).find('li.active a').attr('href');
  if(hash !== '#featured') {
    $('header nav').addClass('inbody');
  } else {
    $('header nav').removeClass('inbody');
  }


  // Add an inbody class to nav when scrollspy event fires
  $('.navbar-fixed-top').on('activate.bs.scrollspy', function() {
    var hash = $(this).find('li.active a').attr('href');
    if(hash !== '#featured') {
      $('header nav').addClass('inbody');
    } else {
      $('header nav').removeClass('inbody');
    }
  });


  //Use smooth scrolling when clicking on navigation
  $('.navbar a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') === 
      this.pathname.replace(/^\//,'') && 
      location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top-topoffset+2
        }, 500);
        return false;
      } //target.length
    } //click function
  }); //smooth scrolling

  //Automatically generate carousel indicators
  for (var i=0; i < slideqty; i++) {
    var insertText = '<li data-target="#featured" data-slide-to="' + i + '"';
    if (i === randSlide) {
      insertText += ' class="active" ';
    }
    insertText += '></li>';
    $('#featured ol').append(insertText);
  }

  $('.carousel').carousel({
    pause: false
  });

});

