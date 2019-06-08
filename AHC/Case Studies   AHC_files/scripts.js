jQuery.noConflict();
(function( $ ) {

	var map;
	var ahcLocation = new google.maps.LatLng(53.676697, -1.464163);
	var slider;

	$(document).ready(function(){
		initializeBackstretch();
		resizeBackstretch();
		sectionResize();

		if(is_mobile()) {
			$('.home .section-1 video').hide();
		}

		if($('.strapline').size() > 0) {
			$('.strapline').cycle();
		}

		$('.home .section-1 .diagonal-overlay a .down-chevron, 	.home .section-2 a .down-chevron, .home .section-3 a .down-chevron, .home .section-4 a .down-chevron, .scroll-down .down-chevron, .down-arrow .fa-chevron-down').on('mouseenter', function(){
			if(!$(this).hasClass('animating')){
				$(this).addClass('animating');
				$(this).animate({ bottom: '20px' }, 150, 'easeOutSine', function(){
					$(this).stop().animate({ bottom: '0px' }, 850, 'easeOutBounce', function(){
						$(this).removeClass('animating');
					});
				});
			}
		});

		if($('#team_slider').size() > 0) {
			team_slider_init();

			$(window).resize(function() {
				team_slider_resize();
			});
		}

		/* Original
		$('.bxslider video').hover(function() {
			this.play();
		}, function() {
			this.pause();
			this.currentTime = 0;
		});*/

		if(!is_mobile()) {
			$('.bxslider .team-member').on('mouseenter', function() {
				var videoUrlMP4 = $(this).attr('data-video-url-mp4');
				var videoUrlWebm = $(this).attr('data-video-url-webm');
				var videoUrlOgg = $(this).attr('data-video-url-ogg');
				var imageSrc = $(this).attr('data-image-src');
				var imageAlt = $(this).attr('data-image-alt');

				var height = $('img', this).height(), width = $('img', this).width();
				if($('video', this).size()==0) {
					if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
						var posterimage = "";
					} else {
						var posterimage = imageSrc;
					}

					$(this).prepend( '<div style="position: absolute; width: ' + $(this).width() + 'px; height: ' + $(this).height() + 'px; top: 0; left: 0;"><video autobuffer="false" preload="metadata" style="margin: 0 auto;" height="' + height + '" width="' + width + '" autoplay="true" poster="' + posterimage + '" muted class="bgvid resize" loop>' +
		                            '	<source src="' + videoUrlOgg + '" type="video/ogg">' +
		                            '	<source src="' + videoUrlWebm + '" type="video/webm">' +
		                            '   <source src="' + videoUrlMP4 + '" type="video/mp4">' +
		                            '</video></div>' );
				} else {
					if ($('video', this)[0].play) {
						$('video', this)[0].play();
					} else {
						$('video', this).parent().show();
					}
				}
			});

			$('.bxslider .team-member').on('mouseleave', function(){
				var videoUrlMP4 = $(this).attr('data-video-url-mp4');
				var imageSrc = $(this).attr('data-image-src');
				var imageAlt = $(this).attr('data-image-alt');

				if ($('video', this)[0].pause) {
					$('video', this)[0].pause();
				} else {
					$('video', this).parent().hide();
				}

			});
		}


		/*
		$('.bxslider video').hover(function() {
			this.play();
		}, function() {
			this.pause();
			this.currentTime = 0;
		});
		*/

		// Smooth scrollto
		$('a[href*=#][rel=scrollTo]').click(function(){

			$el = $(this);

			if($el.attr('data-percentage-offset')){
			    $('html, body').animate({
			        scrollTop: (
			        	$('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top - 50 + (
			        		$('#' + $.attr(this, 'href').substr(1)).height() / 100 * $el.attr('data-percentage-offset')
			        	)
			        )
			    }, 500);
			} else if($el.attr('data-bottom')){
			    $('html, body').animate({
			        scrollTop: (
			        	$('#' + $el.attr('href').substr(1)).offset().top + $('#' + $el.attr('href').substr(1)).height() - 50
			        )
			    }, 500);
			} else if($el.attr('data-bottomthis')){
			    $('html, body').animate({
			        scrollTop: (
			        	$('#' + $el.attr('href').substr(1)).offset().top + $('#' + $el.attr('href').substr(1)).height() - $(window).height()
			        )
			    }, 500);
			} else {
			    $('html, body').animate({
			        scrollTop: ($('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top - 50)
			    }, 500);
			}
		    return false;
		});

		// Navbar fix
		$('.home .navbar').affix({
			offset: {
				top: $(window).height()
			}
		});
		$('.generic .navbar').affix({
			offset: {
				top: 1
			}
		});

		// Home waypoints
		window.sec2Called = false;
		$('.home .section-2').waypoint(function(direction){
			if(window.sec2Called == false){
				window.sec2Called = true;

				// Animate the slidey things
				// image 1
				$('.home .section-2 .item.active .image1').animate({ left:'0' }, 1000);

				// image 2
				setTimeout(function(){
					$('.home .section-2 .item.active .image2').animate({ left:'-100px' }, 1000);
				}, 300);

				// image 3
				setTimeout(function(){
					$('.home .section-2 .item.active .image3').show(10);
					$('.home .section-2 .item.active .image3').animate({ bottom:'0' }, 1000);
				}, 900);
			}
		}, { offset: '70%' });

		// Case study slider on home page
		$('#casestudy_slider').carousel({
			interval : 8000,
			pause: 'hover'
		}).on('slide.bs.carousel', function(slide) {
			$('.home .section-2 .item.active .image1').fadeOut(100, function(){
				$('.home .section-2 .item.active .image1').css({ left:'-999px' });
			});
			$('.home .section-2 .item.active .image2').fadeOut(100, function(){
				$('.home .section-2 .item.active .image2').css({ left:'-999px' });
			});
			$('.home .section-2 .item.active .image3').fadeOut(100, function(){
				$('.home .section-2 .item.active .image3').css({ bottom:'-100%' });
			});
		}).on('slid.bs.carousel', function(slide) {
			// image 1
			$('.home .section-2 .item.active .image1').show();
			$('.home .section-2 .item.active .image1').animate({ left:'0' }, 1000);
			// image 2
			setTimeout(function(){
				$('.home .section-2 .item.active .image2').show();
				$('.home .section-2 .item.active .image2').animate({ left:'-100px' }, 1000);
			}, 300);
			// image 3
			setTimeout(function(){
				$('.home .section-2 .item.active .image3').show();
				$('.home .section-2 .item.active .image3').animate({ bottom:'0' }, 1000);
			}, 900);
		});

		// Meet the team slider
		$('.team-member').on({
			mouseenter: function(){
				$('.rolltip', this).animate({ opacity:1, bottom:'35%' }, { queue: false }, 500);
			},
			mouseleave: function(){
				$('.rolltip', this).animate({ opacity:0, bottom:'0%' }, { queue: false }, 500);
			}
		});

		// LV case study waypoints
		window.casestudySec2Called = false;
		$('.case-study.lv .section-2').waypoint(function(direction){
			if(window.casestudySec2Called == false){
				window.casestudySec2Called = true;

				// image 1
				$('.case-study.lv .section-2 .imac').animate({ right:'0' }, 1000);

				// image 2
				setTimeout(function(){
					$('.case-study.lv .section-2 .imac .plane').animate({ left:'0' }, 800);
				}, 300);

			}
		});

		// Asda case study waypoints
		window.asdacasestudySec2Called = false;
		$('.case-study.asda .section-2').waypoint(function(direction){
			if(window.asdacasestudySec2Called == false){
				window.asdacasestudySec2Called = true;

				// image 1
				$('.case-study.asda .section-2 .flyer').animate({ right:'-234' }, 1000);
			}
		}, { offset: '20%' });

		// Asda case study waypoints
		window.asdacasestudySubsec2Called = false;
		$('.case-study.asda .sub-section2').waypoint(function(direction){
			if(window.asdacasestudySubsec2Called == false){
				window.asdacasestudySubsec2Called = true;

				// image 1
				$('.case-study.asda #phonehand').animate({ bottom:'70' }, 1000);
			}
		}, { offset: '50%' });

		// Arla case study waypoints
		window.arlacasestudySec2Called = false;
		$('.case-study.arla .section-2').waypoint(function(direction){
			if(window.arlacasestudySec2Called == false){
				window.arlacasestudySec2Called = true;

				// image 1
				$('.case-study.arla .section-2 .flyer').animate({ left:'-234' }, 1000);
			}
		}, { offset: '20%' });

		// Arla case study waypoints
		window.arlacasestudySubsec2Called = false;
		$('.case-study.arla .sub-section2').waypoint(function(direction){
			if(window.arlacasestudySubsec2Called == false){
				window.arlacasestudySubsec2Called = true;

				// image 1
				$('.case-study.arla #arlaphone').animate({ bottom:'0' }, 1000);
			}
		}, { offset: '50%' });

		// Club Plus case study waypoints
		window.clubpluscasestudySec2Called = false;
		$('.case-study.clubplus .section-2').waypoint(function(direction){
			if(window.clubpluscasestudySec2Called == false){
				window.clubpluscasestudySec2Called = true;

				// image 1
				$('.case-study.clubplus .section-2 .flyer').animate({ left:'20%' }, 1000);
			}
		}, { offset: '20%' });

		// Club Plus case study waypoints
		window.clubpluscasestudySubsec2Called = false;
		$('.case-study.clubplus .sub-section2').waypoint(function(direction){
			if(window.clubpluscasestudySubsec2Called == false){
				window.clubpluscasestudySubsec2Called = true;

				// image 1
				$('.case-study.clubplus #clubphone').animate({ bottom:'115' }, 1000);
			}
		}, { offset: '50%' });


		// Bupa case study waypoints
		window.bupacasestudySec2Called = false;
		$('.case-study.bupa .section-2').waypoint(function(direction){
			if(window.bupacasestudySec2Called == false){
				window.bupacasestudySec2Called = true;

				// image 1
				$('.case-study.bupa .section-2 .flyer').animate({ right: 0 }, 1000);
			}
		}, { offset: '20%' });

		// Bupa case study waypoints
		window.bupahandCalled = false;
		$('.case-study.bupa .sub-section2').waypoint(function(direction){
			if(window.bupahandCalled == false){
				window.bupahandCalled = true;

				$('.case-study.bupa #phonehand').animate({ bottom:'70' }, 1000);
			}
		}, { offset: '50%' });



		// Mass mutual case study waypoints
		window.mmcasestudySec2Called = false;
		$('.case-study.massmutual .section-2').waypoint(function(direction){
			if(window.mmcasestudySec2Called == false){
				window.mmcasestudySec2Called = true;

				// image 1
				$('.case-study.massmutual .section-2 .flyer').animate({ right: 0 }, 1000);
			}
		}, { offset: '20%' });

		// Mass Mutual study waypoints
		window.mmhandCalled = false;
		$('.case-study.massmutual .sub-section2').waypoint(function(direction){
			if(window.mmhandCalled == false){
				window.mmhandCalled = true;

				$('.case-study.massmutual #phonehand').animate({ bottom:'70' }, 1000);
			}
		}, { offset: '50%' });

		// Footer map
		$('.footer-section').on('click', '.find-us', function(e){
			var lat = $(this).attr('data-lat');
			var lng = $(this).attr('data-lng');

			var latlng = new google.maps.LatLng(lat, lng);
    		window.marker.setPosition(latlng);
			map.panTo(latlng);

			e.preventDefault();
		});

		// language selector
		$('.language-selector > a').click(function(e) {
			e.preventDefault();
			$('.language-dropdown', $(this).parent()).toggle();
		});

		// mobile menu
		$('.navbar-toggle').click(function() {
			$('.nav.navbar-nav.navbar-right').toggle();
		});

	});


	// Google map for footer
	function initialize(){
		var mapOptions = {
			center: ahcLocation,
			zoom: 15,
			scrollwheel: false,
        };
        map = new google.maps.Map(document.getElementById("footer-map"),
			mapOptions);

		window.marker = new google.maps.Marker({
		    position: ahcLocation,
    		animation: google.maps.Animation.DROP,
		    title:"AHC",
		    map:map
		});
	}
	google.maps.event.addDomListener(window, 'load', initialize);

	$(window).on('resize', function(){
		resizeBackstretch();
		sectionResize();
	});



	// Start backstretch
	function initializeBackstretch()
	{
		if($('.backstretch[data-url]').length){
			$('.backstretch').backstretch($('.backstretch').attr('data-url'));
		}
		if($('.backstretch.resize').length){
			//if($(window).width() > 767) {
				$('.backstretch.resize').height($(window).height());
			//}
			$('.backstretch.resize').backstretch('resize');
		}
		if($('.footer-section .real-footer').length){
			$('.footer-section .real-footer').backstretch($('.footer-section .real-footer').attr('data-url'));
		}
		if($('.what-we-do .stretch').length){
			$('.what-we-do .stretch').backstretch($('.what-we-do .stretch').attr('data-url'), {
				centeredY : false
			});
		}
		if($('.our_work .section-3 .stretch').length){
			if($(window).width() > 991) {
				url = $('.our_work .section-3 .stretch').attr('data-url');
			} else {
				url = $('.our_work .section-3 .stretch').attr('data-alt-url')
			}
			$('.our_work .section-3 .stretch').backstretch(url, {
				centeredY : false
			});
		}
		if($('.reward-comms .section-2 .stretch').length){
			$('.reward-comms .section-2 .stretch').backstretch($('.reward-comms .section-2 .stretch').attr('data-url'), {
				centeredY : false
			});
			$('.reward-comms .section-4 .stretch2').backstretch($('.reward-comms .section-4 .stretch2').attr('data-url'), {
				centeredY : false
			});
		}
	}

	// Resize backstretch areas and then retrigger
	function resizeBackstretch()
	{
		if($('.backstretch[data-url]').length){
			$('.backstretch').backstretch('resize');
		}
		if($('.backstretch.resize').length){
			//if($(window).width() > 767) {
				$('.backstretch.resize').height($(window).height());
			//}
			$('.backstretch.resize').backstretch('resize');
		}
		if($('.footer-section .real-footer').length){
			$('.footer-section .real-footer').backstretch('resize');
		}
		if($('.what-we-do .stretch').length){
			$('.what-we-do .stretch').backstretch('resize', {
				centeredY : false
			});
		}
		if($('.our_work .section-3 .stretch').length){
			$('.our_work .section-3 .stretch').backstretch('resize', {
				centeredY : false
			});
		}
		if($('.reward-comms .section-2 .stretch').length){
			$('.reward-comms .section-2 .stretch').backstretch('resize', {
				centeredY : false
			});
			$('.reward-comms .section-4 .stretch2').backstretch('resize', {
				centeredY : false
			});
		}
	}

	// Resize all sections
	function sectionResize()
	{
		// General
		/*if($(window).width() > 767) {
			$('.footer-section').height($(window).height());
		}*/
		// Home
		$('.home .section-2').height($(window).height());
		//$('.home .section-3').height($(window).height());
		// Case Studies
		$('.case-study .section-1').height($(window).height());

		if($(window).width() > 767) {
			$('.our_work .section-3 .stretch').height($(window).height());
			//$('.meet-the-team .section-1').height($(window).height());
		}

		section_height = $('.reward-comms .section-1').height();
		backstretch_height = $('.reward-comms .section-1 .backstretch').height();
		if(section_height > backstretch_height) {
			$('.reward-comms .section-1 .backstretch').height(section_height);
		}

		img_width = 1450
		img_height = 951;
		ratio = $(window).width() / img_width;
		height = img_height * ratio;
		if($(window).width() > 767) {
			$('.reward-comms .section-2 .stretch, .reward-comms .section-2 .container').height(height);
		}
	}

	function team_slider_init()
	{
		window_width = $(window).width();

		if(window_width > 768) {
			slide_width = window_width / 4;
			slide_count = 4;
		} else if(window_width > 480) {
			slide_width = window_width / 2;
			slide_count = 2;
		} else {
			slide_width = window_width;
			slide_count = 1;
		}

		slider = $('#team_slider').bxSlider({
			minSlides: slide_count,
		  	maxSlides: slide_count,
		  	slideWidth: slide_width,
		  	slideMargin: 0,
		  	pager : false,
		  	moveSlides : 1
		});
	}

	function team_slider_resize()
	{
		window_width = $(window).width();

		if(window_width > 768) {
			slide_width = window_width / 4;
			slide_count = 4;
		} else if(window_width > 480) {
			slide_width = window_width / 2;
			slide_count = 2;
		} else {
			slide_width = window_width;
			slide_count = 1;
		}

		slider.reloadSlider({
			minSlides: slide_count,
		  	maxSlides: slide_count,
		  	slideWidth: slide_width,
		  	slideMargin: 0,
		  	pager : false,
		  	moveSlides : 1
		});
	}

})(jQuery);

function is_mobile()
{
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		return true;
	} else {
		return false;
	}
}
