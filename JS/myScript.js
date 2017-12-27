var title = new Image();
var painting = new Image();
var bgImg2 = new Image();
title.src="Assets/Imagine2.png";
painting.src = "Assets/General.png"
bgImg2.src = "Assets/bg2.png";
$(window).load(function() {
	$( 'body' ).addClass(' loaded');
	$( '#names' ).css('background-image','url('+title.src+')');
	$( '#general_painting_face' ).css('background-image','url('+painting.src+')');
	$( '#members_background' ).css('background-image','url('+bgImg2.src+')');
});
$(function(){
	console.log("loaded");
	var bottomPos = $(window).scrollTop() + $(window).height();
	var windowWidth=$(window).width();
	$triggered_times_general = 0;
	$triggered_times_members = 0
    var general_location = $('#general').offset().top;
	var general_height = $('#general').height();
	var members_location = $('#members').offset().top;
	var members_height = $('#members').height();
	$( ".rectangles" ).each(function( index ) {
		$( this ).css('background-image','url("Assets/Members/'+index+'.png")');
	});
	$('.h1 span').css('background','url(' + bgImg2.src + ') no-repeat center center fixed');
    $(window).on('scroll', function() {

            var y_scroll_pos = window.pageYOffset+bottomPos;
            if((y_scroll_pos > (general_location+general_height/4)) && $triggered_times_general == 0 ) {

                $('#general-text p').addClass('fadeInUp');
				$('#general-text h1').addClass('fadeInUp');
				$('#general-painting div').addClass('UP');
                $triggered_times_general=1;   
            }
			if((y_scroll_pos > (members_location+members_height/4)) && $triggered_times_members == 0 ) {
                $('.rectangles').addClass('fadeInUp');
				$('#current-members h1').addClass('fadeInUp');
				$('#former-members h1').addClass('fadeInUp');
                $triggered_times_members=1; 
            }
    });
	if(bottomPos > (general_location+general_height/4)&&$triggered_times_general == 0 ){
		$('#general-text p').addClass('fadeInUp');
		$('#general-text h1').addClass('fadeInUp');
		$('#general-painting div').addClass('UP');
		$triggered_times_general = 1;   
		}
	if(bottomPos > (members_location+members_height/4)&&$triggered_times_members == 0 ){
		console.log('reach');
		$('.rectangles').addClass('fadeInUp');
		$('#current-members h1').addClass('fadeInUp');
		$('#former-members h1').addClass('fadeInUp');
        $triggered_times_members=1;  
		}
	var causeRepaintsOn = $('h1, p');
	$(window).resize(function() {
		causeRepaintsOn.css("z-index", 1);
	});
	$('.rectangles-content').hover(function() {
		$(this).parent().css('filter','none');
		$(this).parent().css('-webkit-filter','none');
		setTimeout(function() {
		$('.rectangles-content p,.rectangles-content h1').addClass('text-shadow');},200);

	},
		function () {
        $('.rectangles-content p,.rectangles-content h1').removeClass('text-shadow');}
	);
	$( ".rectangles-content" ).mouseleave(function() {
		$(this).parent().css('filter','grayscale(100%)');
		$(this).parent().css('-webkit-filter','grayscale(100%)');
	});
});


