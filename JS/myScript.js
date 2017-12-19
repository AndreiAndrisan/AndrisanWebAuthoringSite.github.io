var bgImg = new Image();
var title = new Image();
var painting = new Image();
var bgImg2 = new Image();
bgImg.src = "Assets/bg.png";
title.src="Assets/Imagine2.png";
painting.src = "Assets/General.png"
bgImg2.src = "Assets/bg2.png";
window.onload = function() {
    document.body.className += " loaded";
	console.log("loaded");
	intro.style.backgroundImage = 'url(' + bgImg.src + ')';
	names.style.backgroundImage = 'url(' + title.src + ')';
	general.style.background = 'linear-gradient(#0d0d0d 20%, #1a1a1a 50%, #1a1a1a ,#0d0d0d 20%)';
	general.style.background = '-moz-linear-gradient(#0d0d0d 20%, #1a1a1a 50%, #1a1a1a ,#0d0d0d 20%)';
	general.style.background = '-webkit-linear-gradient(#0d0d0d 20%, #1a1a1a 50%, #1a1a1a ,#0d0d0d 20%)';
	general.style.background = '-o-linear-gradient(#0d0d0d 20%, #1a1a1a 50%, #1a1a1a ,#0d0d0d 20%)';
	general_painting_face.style.backgroundImage = 'url(' + painting.src + ')';
	members_background.style.backgroundImage = 'url(' + bgImg2.src + ')';
};
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
	var causeRepaintsOn = $("h1, p");
	$(window).resize(function() {
		causeRepaintsOn.css("z-index", 1);
	});
	$('.rectangles-content').hover(function() {
		$(this).parent().css('filter','none');
		$(this).parent().css('-webkit-filter','none');
	}
	)
	$( ".rectangles-content" ).mouseleave(function() {
		$('.rectangles').css('filter','grayscale(100%)');
		$('.rectangles').css('-webkit-filter','grayscale(100%)');
	});
});


