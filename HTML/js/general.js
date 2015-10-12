/*---------------------------------------------------------------------*/
;(function($){
/*================= Global Variable Start =================*/		   
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var IEbellow9 = !$.support.leadingWhitespace;
var iPhoneAndiPad = /iPhone|iPod/i.test(navigator.userAgent);
function isIE () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}
//if (isIE () == 8) {}
/*================= Global Variable End =================*/	

/*================= On Document Load Start =================*/	
$(document).ready( function(){
	$('body').removeClass('noJS').addClass("hasJS");
	/*Navigation */
	if( $("#nav").length) {
		$(".toggleMenu").click(function(e) {
			e.preventDefault();
			$(this).toggleClass("active");
			$("#nav").slideToggle();
			$("#nav li").removeClass("resHover")
			$(".resIcon").removeClass("active")
			return false;
		});
		$("#nav li a").each(function() {
			if ($(this).next().length) {
				$(this).parent().addClass("parent");
			};
		})
		$("#nav li.parent").each(function () {
			if ($(this).has(".menuIcon").length <= 0) $(this).append('<i class="menuIcon">&nbsp;</i>')
		});
		dropdown('nav', 'hover', 1);
		adjustMenu();
	}
	// Index Banner Slider
	if( $(".indexBanner").length) {
		var owl = $(".sliderBanner");
		owl.owlCarousel({
			loop:true,
			autoplay:true,
			autoplayTimeout:3000,
			smartSpeed:1200,
			nav:true,
			items : 1,
			//dots : false		
		});
	}
	if( $(".carouselBlock").length) {
		$('.carouselBlock').owlCarousel({
			loop:true,
			autoplay:true,
			autoplayTimeout:3000,
			smartSpeed:1200,
			margin:10,
			nav:true,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:3
				},
				1000:{
					items:5
				}
			}
		})
	}
	if( $(".marqueeScrolling li").length > 1){
		var $mq = $('.marquee').marquee({
			speed: 25000,
			gap: 0,
			duplicated: true,
			pauseOnHover: true
			});
		$(".btnMPause").toggle(function(){
			$(this).addClass('play');
			$(this).text('Play');
			$mq.marquee('pause');
		},function(){
			$(this).removeClass('play');
			$(this).text('Pause');
			$mq.marquee('resume');
			return false;
		});
	}
	
	// Multiple Ticker	
	if( $(".ticker").length){
		$('.ticker').each(function(i){
			$(this).addClass('tickerDiv'+i).attr('id', 'ticker'+i);
			$('#ticker'+i).find('.tickerDivBlock').first().addClass('newsTikker'+i).attr('id', 'newsTikker'+i);
			$('#ticker'+i).find('a.playPause').attr('id', 'stopNews'+i)
			$('#newsTikker'+i).vTicker({ speed: 1E3, pause: 4E3, animation: "fade", mousePause: false, showItems: 3, height: 150, direction: 'up' })
			$("#stopNews"+i).click(function () {
				if($(this).hasClass('stop')){
					$(this).removeClass("stop").addClass("play").text("Play").attr('title', 'Play');
				}else{
					$(this).removeClass("play").addClass("stop").text("Pause").attr('title', 'pause');
				}
				return false;
			});
		});
	}
	
	$('.equalHeights .cols4').equalHeight();
	
	// Responsive Tabing Script
	if( $(".resTab").length) {
		$('.resTab').responsiveTabs({
			rotate: false,
			scrollToAccordion: true,
			startCollapsed: 'tab', //accordion
			collapsible: 'tab', //accordion
		});
	}
	if( $(".accordion").length){
	   $('.accordion .accordDetail').hide();
	   $(".accordion .accordDetail:first").show(); 
	   $(".accordion .accTrigger:first").addClass("active");	
	   $('.accordion .accTrigger').click(function(){
		  if ($(this).hasClass('active')) {
			   $(this).removeClass('active');
			   $(this).next().slideUp();
		  } else {
			   $('.accordion .accTrigger').removeClass('active');
			   $(this).addClass('active');
			   $('.accordion .accordDetail').slideUp();
			   $(this).next().slideDown();
		  }
		  return false;
	   });
	};
	
	// Responsive Table
	if( $(".responsiveTable").length){
		$(".responsiveTable").each(function(){
		$(this).wrap('<div class="tableOut"></div>');
		$(this).find('td').removeAttr('width');
		//$(this).find('td').removeAttr('align');
		var head_col_count =  $(this).find('tr th').size();
		// loop which replaces td
		for ( i=0; i <= head_col_count; i++ )  {
			// head column label extraction
			var head_col_label = $(this).find('tr th:nth-child('+ i +')').text();
			// replaces td with <div class="column" data-label="label">
			$(this).find('tr td:nth-child('+ i +')').attr("data-label", head_col_label);
		}
		});
	}
	
	// Responsive Table
	if( $(".tableScroll").length){
		$(".tableScroll").each(function(){
			$(this).wrap('<div class="tableOut"></div>');
		});
	}
	
	// Back to Top function
	if( $("#backtotop").length){
		$(window).scroll(function(){
			if ($(window).scrollTop()>120){
			$('#backtotop').fadeIn('250').css('display','block');}
			else {
			$('#backtotop').fadeOut('250');}
		});
		$('#backtotop').click(function(){
			$('html, body').animate({scrollTop:0}, '200');
			return false;
		});
	};
	
	// Get Focus Inputbox
	if( $(".getFocus").length){
			$(".getFocus").each(function(){
			$(this).on("focus", function(){
			if ($(this).val() == $(this)[0].defaultValue) { $(this).val("");};
		  }).on("blur", function(){
			  if ($(this).val() == "") {$(this).val($(this)[0].defaultValue);};
		  });								  
		});
	};
	
	// For device checking
	if (isMobile == false) {
	
	}
	if( $("#gmap").length){	
		var map = new google.maps.Map(document.getElementById('gmap'), {
		zoom: 15,
		center: new google.maps.LatLng(23.021666 , 72.55464),
		mapTypeId: google.maps.MapTypeId.ROADMAP
		});
		var infoWindow = new google.maps.InfoWindow;
		var onMarkerClick = function() {
		  var marker = this;
		  var latLng = marker.getPosition();
		  infoWindow.setContent('<strong>Jayanti Solanki</strong><br>Friends Colony,<br>Ambavadi,<br>Ahmedabad, Gujarat 380006');
		  infoWindow.open(map, marker);
		};
		google.maps.event.addListener(map, 'click', function() {
		  infoWindow.close();
		});
		var marker = new google.maps.Marker({
		  map: map,
		  position: new google.maps.LatLng(23.021666 , 72.55464)
		});
		google.maps.event.addListener(marker, 'click', onMarkerClick);
	}
	if( $(".litebox").length){	
		$('.litebox').liteBox();
	}
	
	/*================= On Document Load and Resize Start =================*/
	$(window).on('resize', function () {
			
    }).trigger('resize');
	/*================= On Document Load and Resize End =================*/
	
});
/*================= On Document Load End =================*/

/*================= On Window Resize Start =================*/	
$(window).bind('resize orientationchange', function() {
	ww = document.body.clientWidth;
	adjustMenu();
});

/*================= On Window Resize End =================*/	

/*================= On Window Load Start =================*/
$(window).load(function() {
						
});
/*================= On Document Load End =================*/

})(jQuery);

