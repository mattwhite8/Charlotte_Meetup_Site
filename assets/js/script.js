$(function() {

	"use strict";

	var topOffset = 50; //variable for menu height
	var slideqty = ('#featured .item').length;

	//Activate Scrollspy
	$('body').scrollspy({
		target: 'header .navbar',
		offset: topOffset
	});

	var hash = $(this).find('li.active a').attr('href');
	if(hash !== '#featured') {
		$('header nav').addClass('inbody');
	} else {
		$('header nav').removeClass('inbody');
	}

	$('.navbar-fixed-top').on('activate.bs.scrollspy', function(){
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
		      scrollTop: target.offset().top-topOffset+2
		    }, 500);
		    return false;
		  } //target.length
		} //click function
	}); //smooth scrolling	


	//Automatically generate carousel indicators
	for(var i = 0; i < slideqty; i++){
		var insertText = '<li data-target="#featured" data-slide-to="' + i + '"></li>';
		$('#featured ol').append(insertText);
	}

	$('#featured').carousel({
  		interval: false
	});

});


