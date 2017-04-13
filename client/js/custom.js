jQuery.noConflict();
jQuery(document).ready(function($){
									
    "use strict";
	
	Pace.on("done", function(){
		$("#loader-wrapper").fadeOut(500);
		$(".pace").remove();
	});	
	
	$("#main-menu.type2 .main-menuwrapper ul:first li").hover(function(){
		$(this).find('ul:first').stop().fadeIn('slow');
	  },function(){
		$(this).find('ul:first').stop().fadeOut('fast');
	});
	
		
	var x, y = "";
	x = $('.main-menuwrapper').html();
		
	y = '<button class="dl-trigger">Open Menu</button>'+x;
	$('#dl-menu').html(y);
				
	//DL MENU...
	$('#dl-menu').dlmenu({
		animationClasses : { classin : 'dl-animate-in-5', classout : 'dl-animate-out-5' }
	});
	
	var currentWidth = window.innerWidth || document.documentElement.clientWidth;
	if(currentWidth < 767) {
		
		if(currentWidth <= 479) var offset = -50;
		else var offset = -60;
			
		$('.dl-menu li a').click(function(e){
			$.scrollTo($(this).attr('href'), 1400, { offset: { top: offset }});
			$('.dl-menu').removeClass('dl-menuopen');
			e.preventDefault();
		});	
		
	}	
	
	//Mega menu starts...
	var isMobile = (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/Blackberry/i)) || (navigator.userAgent.match(/Windows Phone/i)) ? true : false;
	
	//Menu Hover Start
	function menuHover() {
		
		$("li.menu-item-depth-0,li.menu-item-simple-parent ul li" ).hover(function(){
			//mouseover 
			if( $(this).find(".megamenu-child-container").length  ){
				$(this).find(".megamenu-child-container").stop(true, true).slideDown('slow', 'easeOutQuad');
			} else {
				$(this).find("> ul.sub-menu").stop(true, true).slideDown('slow', 'easeOutQuad');
			}
		},function(){
				//mouseout
			if( $(this).find(".megamenu-child-container").length ){
				$(this).find(".megamenu-child-container").stop(true, true).hide();
			} else {
				$(this).find('> ul.sub-menu').stop(true, true).hide(); 
			}
		});
			
	}//Menu Hover End


	//Mobile Menu
	$("#dt-menu-toggle").click(function( event ){
		event.preventDefault();
		var $menu = $("nav#main-menu").find("ul.menu:first");
		$menu.slideToggle(function(){
			$menu.css('overflow' , 'visible');
			$menu.toggleClass('menu-toggle-open');
		});
	});

	$(".dt-menu-expand").click(function(){
		if( $(this).hasClass("dt-mean-clicked") ){
			$(this).text("+");
			if( $(this).prev('ul').length ) {
				$(this).prev('ul').slideUp(300);
			} else {
				$(this).prev('.megamenu-child-container').find('ul:first').slideUp(300);
			}
		} else {
			$(this).text("-");
			if( $(this).prev('ul').length ) {
				$(this).prev('ul').slideDown(300);
			} else{
				$(this).prev('.megamenu-child-container').find('ul:first').slideDown(300);
			}
		}
		
		$(this).toggleClass("dt-mean-clicked");
		return false;
	});
	
	if( !isMobile ){
		currentWidth = window.innerWidth || document.documentElement.clientWidth;
		if( currentWidth > 767 ){
			menuHover();
		}
	}	
	//Mobile Menu End

	
	//BLOG ENTRY GALLERY...
	if( ($("ul.entry-gallery-post-slider").length) && ( $("ul.entry-gallery-post-slider li").length > 1 ) ){
		$("ul.entry-gallery-post-slider").bxSlider({auto:false, video:true, useCSS:false, pager:'', autoHover:true, adaptiveHeight:true});
    }		
	
    //PRETTYPHOTO...	
    var $pphoto = $('a[data-gal^="prettyPhoto[gallery]"]');
    if ($pphoto.length) {
        //PRETTYPHOTO...
        $("a[data-gal^='prettyPhoto[gallery]']").prettyPhoto({
			hook:'data-gal',
            show_title: false,
            social_tools: false,
            deeplinking: false
        });
    }
	
	//TWITTER TWEETS...
	if($('#tweets_container').length) {
		$("#tweets_container").tweet({
			modpath: 'js/twitter/',
			username: "envato",
			count: 3,
			loading_text: "loading tweets...",
			join_text: '<i class="show-feed"></i>',
			template: "{join}{text} - {time}"
		});
	}
	
	my_smartresize_function();
	$(window).smartresize(function(){
		my_smartresize_function();
	});
	

	//UI TO TOP PLUGIN...
	$().UItoTop({ easingType: 'easeOutQuart' });

	//GOOGLE MAPS...
	var $map = $('#map');
	if( $map.length ) {
		$map.gMap({
			address: '1/52,3/53, Lal Bahadhur Colony, Peelamedu, Coimbatore, Tamil Nadu 641004',
			zoom: 16,
			scrollwheel: 0,
			markers: [
				{ 'address' : '1/52,3/53, Lal Bahadhur Colony, Peelamedu, Coimbatore, Tamil Nadu 641004' }
			]
		});
	}
	
	//AJAX CONTACT FORM...
	$('form[name="frmcontact"]').submit(function () {
		var This = $(this);
		if($(This).valid()) {
			var action = $(This).attr('action');
			var data_value = unescape($(This).serialize());
			$.ajax({
				 type: "POST",
				 url:action,
				 data: data_value,
				 error: function (xhr, status, error) {
					 confirm('The page save failed.');
				   },
				  success: function (response) {
					$('#ajax_contact_msg').html(response);
					$('#ajax_contact_msg').slideDown('slow');
					if (response.match('success') != null) $(This).slideUp('slow');
				 }
			});
		}
		return false;
    });
	
	$('form[name="frmcontact"]').validate({
		rules: { 
			txtname: { required: true },
			txtemail: { required: true, email: true },
			txtquestion: { required: true }
		},
		errorPlacement: function(error, element) { }
	});	
	
	//AJAX COMMENT FORM...
	$('form[name="commentform"]').validate({
		rules: { 
			txtName: { required: true },
			txtEmail: { required: true, email: true },
			txtMessage: { required: true }
		},
		errorPlacement: function(error, element) { }
	});	
	
	//AJAX SEARCH FORM...
	$('form[name="searchform"]').validate({
		rules: { 
			txtSearch: { required: true },
		},
		errorPlacement: function(error, element) { }
	});	

	//AJAX SUBSCRIBE FORM...
	$('form[name="frmnewsletter"]').submit(function () {
		var This = $(this);
		if($(This).valid()) {
			var action = $(This).attr('action');
			var data_value = unescape($(This).serialize());
			$.ajax({
				 type: "POST",
				 url:action,
				 data: data_value,
				 error: function (xhr, status, error) {
					 confirm('The page save failed.');
				   },
				  success: function (response) {
					$('#ajax_subscribe_msg').html(response);
					$('#ajax_subscribe_msg').slideDown('slow');
					if (response.match('success') != null) $(This).slideUp('slow');
				 }
			});
		}
		return false;
    });
	
	$('form[name="frmnewsletter"]').validate({
		rules: { 
			mc_email: { required: true, email: true }
		},
		errorPlacement: function(error, element) { }
	});
	
	//DOMAINS SEARCH VALIDATION
	$('form[name="frmDomainSearch"]').validate({
		rules: { 
			domainsearch: { required: true }
		},
		errorPlacement: function(error, element) { }
	});
	
	//REGISTER FORM VALIDATION
	$('form[name="frmRegister"]').validate({
		rules: { 
			f_user: { required: true },
			email: { required: true, email: true },
			pwd: { required: true },
			c_pwd: { required: true }
		},
		errorPlacement: function(error, element) { }
	});
	
	//LOGIN FORM VALIDATION
	$('form[name="frmLogin"]').validate({
		rules: { 
			user: { required: true },
			pwd: { required: true },
		},
		errorPlacement: function(error, element) { }
	});
	
	//SEARCH FORM VALIDATION
	$('form[name="frmSearch"]').validate({
		rules: { 
			txtsearch: { required: true },
		},
		errorPlacement: function(error, element) { }
	});
		
	
	/* SELECT DROPDOWN ARROW FIX */
	$("select").each(function(){
		$(this).wrap( '<span class="selection-box"></span>' );
	});	

	//PORTFOLIO BXSLIDER...
	if($('.portfolio-slider-container').length) {
		$("ul.portfolio-slider").bxSlider({auto:false, video:true, useCSS:false, pager:'', autoHover:true, adaptiveHeight:true});			
	}

	//DONUTCHARTS...
	$(".donutchart").each(function(){
		$(this).one('inview', function (event, visible) {
			if(visible === true) {
			   var $this = $(this);
			   var $bgColor =  ( $this.data("bgcolor") !== undefined ) ? $this.data("bgcolor") : "#5D18D6";
			   var $fgColor =  ( $this.data("fgcolor") !== undefined ) ? $this.data("fgcolor") : "#000000";
			   var $size = ( $this.data("size") !== undefined ) ? $this.data("size") : "140";
			   
			   $this.donutchart({'size': $size, 'fgColor': $fgColor, 'donutwidth': 6, 'bgColor': $bgColor });
			   $this.donutchart('animate');
			}
		});   
   });
	
   //TOOLTIP...	 
   if($(".dt-sc-tooltip-bottom").length){
	  $(".dt-sc-tooltip-bottom").each(function(){	$(this).tipTip({maxWidth: "auto"}); });
   }
	
   if($(".dt-sc-tooltip-top").length){
	  $(".dt-sc-tooltip-top").each(function(){ $(this).tipTip({maxWidth: "auto",defaultPosition: "top"}); });
   }
	
   if($(".dt-sc-tooltip-left").length){
	  $(".dt-sc-tooltip-left").each(function(){ $(this).tipTip({maxWidth: "auto",defaultPosition: "left"}); });
   }
	
   if($(".dt-sc-tooltip-right").length){
	  $(".dt-sc-tooltip-right").each(function(){ $(this).tipTip({maxWidth: "auto",defaultPosition: "right"}); });
   }

	//TABS...
	if($('ul.dt-sc-tabs').length > 0) {
	  $('ul.dt-sc-tabs').tabs('> .dt-sc-tabs-content');
	}
	
	if($('ul.dt-sc-tabs-frame').length > 0){
	  $('ul.dt-sc-tabs-frame').tabs('> .dt-sc-tabs-frame-content');
	}
	
	if($('.dt-sc-tabs-vertical-frame').length > 0){
	  
	  $('.dt-sc-tabs-vertical-frame').tabs('> .dt-sc-tabs-vertical-frame-content');
	  
	  $('.dt-sc-tabs-vertical-frame').each(function(){
		$(this).find("li:first").addClass('first').addClass('current');
		$(this).find("li:last").addClass('last');
	  });
	  
	  $('.dt-sc-tabs-vertical-frame li').click(function(){
		$(this).parent().children().removeClass('current');
		$(this).addClass('current');
	  });
	}
	
   //TOOGGLES...
	$('.dt-sc-toggle').toggle(function(){ $(this).addClass('active'); },function(){ $(this).removeClass('active'); });
	$('.dt-sc-toggle').click(function(){ $(this).next('.dt-sc-toggle-content').slideToggle(); });
	$('.dt-sc-toggle-set').each(function(){
	  var $this = $(this),
		  $toggle = $this.find('.dt-sc-toggle-accordion');
	  
	  $toggle.click(function(){
		if( $(this).next().is(':hidden') ) {
		  $this.find('.dt-sc-toggle-accordion').removeClass('active').next().slideUp();
		  $(this).toggleClass('active').next().slideDown();
		}
		return false;
	  });
	  
	  $this.find('.dt-sc-toggle-accordion:first').addClass("active");
	  $this.find('.dt-sc-toggle-accordion:first').next().slideDown();
	});

	//ANIMATE NUMBER...
	$('.dt-sc-num-count').each(function(){
	  $(this).one('inview', function (event, visible) {
		  if(visible === true) {
			  var val = $(this).attr('data-value');
			  $(this).animateNumber({ number: val	}, 2000);
		  }
	  });
	});
	
	//PARALLAX SECTIONS...
	$('.dt-sc-parallax').bind('inview', function (event, visible) {
		if(visible === true) {
			$(this).parallax("50%", 0.5);
		} else {
			$(this).css('background-position', '');
		}
	});


});


//PROGRESS BARS...
(function($){
	$(".dt-sc-progress").one('inview', function (event, visible) {
		var $this = $(this),
		pvalue = $this.find('.dt-sc-bar').attr('data-value');
		
		if (visible == true) {
			$this.find('.dt-sc-bar').animate({width: pvalue + "%"},600,function(){ $this.find('.dt-sc-bar-text').fadeIn(400); });
		}
	});
})(jQuery);

//CAROUSEL...
function my_smartresize_function(){
	
	//TESTIMONIAL.....
	if(jQuery('.dt-sc-testimonial-carousel-wrapper').length) {
		jQuery('.dt-sc-testimonial-carousel-wrapper').each(function(){
			var $this = jQuery(this).find('.dt-sc-testimonial-carousel');
			$this.carouFredSel({
		        responsive: true,
				auto: false,
				width: '100%',
				prev: jQuery(this).find('.prev-arrow'),
				next: jQuery(this).find('.next-arrow'),
				height: 'auto',
				scroll: 1,
				items: { width: $this.find(".column").width(),  visible: { min: 1, max: 2 } }
	    	});
		});
	}


	if(jQuery('.search-carousel').length) {
		
		var $maxvis = 5;
		if(jQuery('.container').width() < 710 && jQuery('.container').width() > 420) {
			$maxvis = 2;
		}
		else if(jQuery('.container').width() < 420) {
			$maxvis = 1;
		}
		
		jQuery('.search-carousel').each(function(){
			var $this = jQuery(this).find('.carousel_items');
			$this.carouFredSel({
		        responsive: true,
				width: '100%',
				circular: false,
				infinite: false,
				auto 	: false,
				prev	: {	
					button	: jQuery(this).find('.search-prev'),
					key		: "left"
				},
				next	: { 
					button	: jQuery(this).find('.search-next'),
					key		: "right"
				},				
				height: 'variable',
				circular: false,
				scroll: 1,
				items: { width: $this.find(".column").width(), height: 'variable',  visible: { min: 1, max: $maxvis } }
	    	});
		});
	}

	//SIDEBAR CAROUSEL...
	if(jQuery('.carousel-container').length) {
		jQuery('.carousel-container').each(function(){
			var $this = jQuery(this).find('.carousel_items');
			$this.carouFredSel({
		        responsive: true,
				auto: false,
				width: '100%',
				prev: jQuery(this).find('.prev-arrow'),
				next: jQuery(this).find('.next-arrow'),
				height: 'auto',
				scroll: {
					fx: "crossfade",
					duration: 1500
				},
				items: { width: $this.find("li").width(),  visible: { min: 1, max: 1 } }
		    });
		});
	}
	
	//CLIENTS CAROUSEL...
	if(jQuery('.partner-carousel-wrapper').length) {
		var $this = jQuery('partner-carousel-wrapper').find('.partner-carousel');
		jQuery('.partner-carousel').carouFredSel({
			responsive: true,
			auto: true,
			width: '100%',
			height: 'auto',
			scroll: 1,
			items: { width: $this.find("li").width(),  visible: { min: 1, max: 5 } }
		});
	}	
	
	//TWITTER CAROUSEL...	
	if(jQuery('#tweets_container').length) {
		jQuery('#tweets_container .tweet_list').carouFredSel({
			width: 'auto',
			height: 'auto',
			scroll: {
				duration: 1000
			},
			direction: 'up',
			items: {
				height: 'auto',
				visible: {
					min: 1,
					max: 1
				}
			}
		});
	}
	
	//BLOG ISOTOPE...
	if( jQuery(".apply-isotope").length ){
		var $gw = 19;
		
		if (jQuery('#primary').hasClass('with-left-sidebar') || jQuery('#primary').hasClass('with-right-sidebar')) {
			
			if(jQuery(".container").width() == 1170) $gw = 17;
			else if(jQuery(".container").width() == 900) $gw = 12;
			else if(jQuery(".container").width() == 710) $gw = 10;
			
		} else {
		
			if(jQuery(".container").width() == 1170) $gw = 24;
			else if(jQuery(".container").width() < 1170 && jQuery(".container").width() > 710) $gw = 13;
			else if(jQuery(".container").width() <= 710) $gw = 10;
		
		}
		
		jQuery(".apply-isotope").isotope({ itemSelector : '.column', transformsEnabled:false, masonry: { gutterWidth: $gw } });
		
		setTimeout(function() {
			jQuery('.apply-isotope').isotope('reLayout');
		}, 500);			
	}
}

jQuery(window).load(function() {


	//PORTFOLIO ISOTOPE
	var $container = jQuery('.portfolio-container');
	if( $container.length) {
		if (jQuery('.portfolio-container .portfolio').hasClass('with-sidebar')) {
			if(jQuery(".container").width() == 1170) $width = 16;
			else if(jQuery(".container").width() == 900) $width = 13;
			else if(jQuery(".container").width() == 710) $width = 8;
			else $width = 23;
		} else {
			if(jQuery(".container").width() == 900) $width = 17;
			else if(jQuery(".container").width() == 710) $width = 14;
			else $width = 22;
		}
	
		jQuery(window).smartresize(function(){
			$container.css({overflow:'hidden'}).isotope({itemSelector : '.column',masonry: { gutterWidth: $width } });
		});
		
		$container.isotope({
		  filter: '*',
		  masonry: { gutterWidth: $width },
		  animationOptions: { duration: 750, easing: 'linear', queue: false  }
		});
		
	}
	
	if(jQuery("div.sorting-container").length){
		jQuery("div.sorting-container a").click(function(){
			if (jQuery('.portfolio-container .portfolio').hasClass('with-sidebar')) {
				if(jQuery(".container").width() == 1170) $width = 16;
				else if(jQuery(".container").width() == 900) $width = 13;
				else if(jQuery(".container").width() == 710) $width = 8;
				else $width = 23;
			} else {
				if(jQuery(".container").width() == 900) $width = 17;
				else if(jQuery(".container").width() == 710) $width = 14;
				else $width = 22;
			}
						
			jQuery("div.sorting-container a").removeClass("active-sort");
			var selector = jQuery(this).attr('data-filter');
			jQuery(this).addClass("active-sort");
			$container.isotope({
				filter: selector,
				masonry: { gutterWidth: $width },
				animationOptions: { duration:750, easing: 'linear',  queue: false }
			});
		return false;	
		});
	}
	//PORTFOLIO ISOTOPE ENDS

	// TO DISABLE STICKY NAV FOR MOBILES (LANDSCAPE VIEW)
	if(jQuery("body").hasClass('one-page')) {
		jQuery("#header-wrapper").sticky({ topSpacing: 0, bottomSpacing: 0 });
	} else {
		var currentWidth = window.innerWidth || document.documentElement.clientWidth;
		
		if(currentWidth > 480 && currentWidth < 767) {
		} else {
			jQuery("#header-wrapper").sticky({ topSpacing: 0, bottomSpacing: 0 });
		}
	}
	   	
	//RECENT PORTFOLIO...
	if(jQuery('.carousel-wrapper').length) {
		jQuery('.carousel-wrapper').each(function(){
			var $this = jQuery(this).find('.carousel_items');
			$this.carouFredSel({
		        responsive: true,
				auto: false,
				width: '100%',
				prev: jQuery(this).find('.prev-arrow'),
				next: jQuery(this).find('.next-arrow'),
				height: 'auto',
				scroll: 1,
				items: { width: $this.find(".portfolio").width(), visible: { min: 1, max: 3 } }
	    	});
		});
	}	
	
	//TEAM CAROUSEL...
	if(jQuery('.carousel-wrapper').length) {
		jQuery('.carousel-wrapper').each(function(){
			
			var $this = jQuery(this).find('.carousel_items');
			$this.carouFredSel({
				responsive: true,
				auto: false,
				width: '100%',
				prev: jQuery(this).find('.prev-arrow'),
				next: jQuery(this).find('.next-arrow'),
				height: 'variable',
				scroll: 1,
				items: { width: $this.find(".dt-sc-team").width(), height: 'variable', visible: { min: 1, max: 3 } }
			});
		});
	}	

});
$(function() {
    $('#search').on('keyup', function() {
        var pattern = $(this).val();
        $('.searchable-container .items').hide();
        $('.searchable-container .items').filter(function() {
            return $(this).text().match(new RegExp(pattern, 'i'));
        }).show();
    });
});