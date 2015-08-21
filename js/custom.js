$(document).ready(function() {

	/*-----------------------------------------------------------------------------------*/
	/*	Smooth Scroll
	/*  Thanks to: https://github.com/davist11/jQuery-One-Page-Nav
	/*-----------------------------------------------------------------------------------*/

	function smoothScroll(){
		$(".nav").onePageNav({
			filter: ':not(.external)',
			scrollSpeed: 1500
		});

		var formTarget = $(".js-form"); // Assign this class to corresponding section on Index.html

		// Scrolls to form section
		$(".js-scroll").on("click", function() {
			$('html, body').animate({
				scrollTop: formTarget.offset().top
			}, 2000);
			return false;
		});

		return false;
	}

	smoothScroll();

	/*-----------------------------------------------------------------------------------*/
	/*	Backstretch
	/*  Thanks to: http://srobbin.com/jquery-plugins/backstretch/
	/*-----------------------------------------------------------------------------------*/

	function backStrech() {
		$("aside").backstretch([
			"img/placeholder-1.jpg",
			], {duration: 4000, fade: 1000});
	}

	backStrech();

	/*-----------------------------------------------------------------------------------*/
	/*	Flexslider
	/*  Thanks to: http://www.woothemes.com/flexslider/
	/*-----------------------------------------------------------------------------------*/

	function flexSlider(){
		$('.flexslider').flexslider({
			animation: "slide",
			slideshow: false,
			touch: true
		});
	}

	flexSlider();

	/*-----------------------------------------------------------------------------------*/
	/*	RSVP Form Validation + Submission
	/*-----------------------------------------------------------------------------------*/

	function rsvpFormSubmit() {

		// this is the id of the form
		var formID = $("#js-form");
		
		// submits form with ajax method
		formID.on("submit", function() {

			$.ajax({
				url: "mailer.php",
				type: "POST",		    	
		        data: formID.serialize(), // serializes the form's elements.

		        success: function(data) {
		        	$("#js-form").hide();
					$(".js-success").addClass("message-panel").html(data); // show response from the php script.
					window.location = '#section-6';					
		        }		    
		    });

		    return false; // avoid to execute the actual submit of the form.
		});
		
		$(".rsvp-guest-choice").fadeOut();

		// Show/Hide RSVP Menu selection on accept/decline
		$(".decline").on("click", function(){
			$(".rsvp-guest-choice").fadeOut();
		});	
		$(".accept").on("click", function(){
			$(".rsvp-guest-choice").fadeIn();
		});
	}
	rsvpFormSubmit();
	
});

/*-----------------------------------------------------------------------------------*/
/*	Google Map API 
/*  Credit to: http://stiern.com/tutorials/adding-custom-google-maps-to-your-website/
/*-----------------------------------------------------------------------------------*/

var map;
var myLatlng = new google.maps.LatLng(41.99901,-93.7135802); // Specify YOUR coordinates

var MY_MAPTYPE_ID = 'custom_style';

function initialize() {

	/*----------------------------------------------------------------------------*/
	/* Creates a custom color scheme for map
	/* For details on styling go to the link below:
	/* http://www.evoluted.net/thinktank/web-design/custom-google-maps-style-tool */
	/*----------------------------------------------------------------------------*/
	
	var featureOpts = [
		{
			"featureType": "road",
			"stylers": [
				{ "hue": "#ab41ab" },
				{ "gamma": 0.82 },
				{ "visibility": "on" },
				{ "saturation": 62 },
				{ "lightness": -7 }
			]
		},{
			"featureType": "poi",
			"stylers": [
				{ "hue": "#ab41ab" },
				{ "lightness": 14 }
			]
		},{
			"stylers": [
				{ "hue": "#ab41ab" }
			]
		}
	]

	var mapOptions = {
		zoom: 11,
		center: myLatlng,
		disableDefaultUI: true,
		scrollwheel: false,
		draggable: false,
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
		},
		mapTypeId: MY_MAPTYPE_ID
	};

	map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);

	var styledMapOptions = {
		name: 'Custom Style'
	};

	var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

	var image = new google.maps.MarkerImage("img/map-marker@2x.png", null, null, null, new google.maps.Size(55,57));

	// Includes custom marker on map
	var myLatLngCeremony = new google.maps.LatLng(41.938171,-93.860032);
	var beachMarkerCeremony = new google.maps.Marker({
		position: myLatLngCeremony,
		map: map,
		icon: image,
		title: 'Ceremony - Iowa Arboretum'
	});
	
	var infowindowCeremony = new google.maps.InfoWindow({
      content: '<h2>Ceremony</h2><h5>Iowa Arboretum</h5><p>1875 Peach Ave, Madrid, IA 50156</p>'
	});
	google.maps.event.addListener(beachMarkerCeremony, 'click', function() {
	infowindowCeremony.open(map,beachMarkerCeremony);
	});
	
	var myLatLngReception = new google.maps.LatLng(42.0349832,-93.5791194);
	var beachMarkerReception = new google.maps.Marker({
		position: myLatLngReception,
		map: map,
		icon: image
	});
	var infowindowReception = new google.maps.InfoWindow({
      content: '<h2>Reception</h2><h5>Quality Inn & Suites</h5><p>2601 E 13th St, Ames, IA 50010</p>'
	});
	google.maps.event.addListener(beachMarkerReception, 'click', function() {
	infowindowReception.open(map,beachMarkerReception);
	});

	map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
}

google.maps.event.addDomListener(window, 'load', initialize);

