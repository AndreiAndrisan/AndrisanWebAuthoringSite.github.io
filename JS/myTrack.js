var audio;

//Hide Pause Initially
$('.pause').hide();
	
//Initializer - Play First Song
initAudio($('.album-playlist li:first-child'));
	
function initAudio(element){
	var song = element.attr('song');
    var title = element.text();
    var cover = element.attr('cover');
    var artist = element.attr('album-name');

	//Create a New Audio Object
	audio = new Audio('media/' + song);
	
	if(!audio.currentTime){
		$('.currentTime').html('0:00');
	}
	if(!audio.duration){
		$('.duration').html('0:00');
	}
	$('.audio-player .title').text(title);
    $('.audio-player .album-name').text(artist);
	
	//Insert Cover Image
	$('img.cover').attr('src','images/covers/' + cover);
	
	$('.album-playlist li').removeClass('active');
    element.addClass('active');
}


//Play Button
$('.play').click(function(){
	audio.play();
	$('.play').hide();
	$('.pause').show();
	$('.duration').fadeIn(400);
	showDuration();
});

//Pause Button
$('.pause').click(function(){
	audio.pause();
	$('.pause').hide();
	$('.play').show();
});
	
//Stop Button
$('.stop').click(function(){
	audio.pause();		
	audio.currentTime = 0;
	$('.pause').hide();
	$('.play').show();
	//$('#duration').fadeOut(400);
});

//Next Button
$('.next').click(function(){
    audio.pause();
    var next = $('.album-playlist li.active').next();
    if (next.length == 0) {
        next = $('.album-playlist li:first-child');
    }
    initAudio(next);
	audio.play();
	showDuration();
	$('.play').hide();
	$('.pause').show();
});

//Prev Button
$('.prev').click(function(){
    audio.pause();
    var prev = $('.album-playlist li.active').prev();
    if (prev.length == 0) {
        prev = $('.album-playlist li:last-child');
    }
    initAudio(prev);
	audio.play();
	showDuration();
	$('.play').hide();
	$('.pause').show();
});

//Playlist Song Click
$('.album-playlist li').click(function () {
    audio.pause();
    initAudio($(this));
	$('.play').hide();
	$('.pause').show();
	$('.duration').fadeIn(400);
	audio.play();
	showDuration();
});

//Volume Control
$('.volume span').css('width','30%');
$('.volume-bar').change(function(){
	audio.volume = parseFloat(this.value / 10);
	console.log(audio.volume);
	$('.volume span').css('width',this.value*6+'%');
	if(audio.muted == false){
		if(audio.volume >= 0.7){
			$('.volume-button').css('background','url("images/Media Controls/Status-audio-volume-high-icon.png")');}
		if(audio.volume < 0.7){
			$('.volume-button').css('background','url("images/Media Controls/Status-audio-volume-medium-icon.png")');}
		if(audio.volume < 0.4){
			$('.volume-button').css('background','url("images/Media Controls/Status-audio-volume-low-icon.png")');}
	}
});

$('.volume-button').click(function(){
	if(audio.muted == true){	
		audio.muted = false;
		if(audio.volume >= 0.7){
			$('.volume-button').css('background','url("images/Media Controls/Status-audio-volume-high-icon.png")');}
		if(audio.volume < 0.7){
			$('.volume-button').css('background','url("images/Media Controls/Status-audio-volume-medium-icon.png")');}
		if(audio.volume < 0.4){
			$('.volume-button').css('background','url("images/Media Controls/Status-audio-volume-low-icon.png")');}
		}
	else
	{
		audio.muted = true;
		$('.volume-button').css('background-image','url("images/Media Controls/Status-audio-volume-muted-icon.png")');
	}
});	
	
//Time Duration
function showDuration(){
	$(audio).bind('timeupdate', function(){
		//Get hours and minutes
		var s = parseInt(audio.currentTime % 60);
		var m = parseInt((audio.currentTime / 60) % 60);
		//Add 0 if seconds less than 10
		if (s < 10) {
			s = '0' + s;
		}
		$('.currentTime').html(m + ':' + s);	
		s = parseInt(audio.duration % 60);
		m = parseInt((audio.duration / 60) % 60);
		if (s < 10) {
			s = '0' + s;
		}
		$('.duration').html(m + ':' + s);
		var value = 0;
		if (audio.currentTime > 0) {
			value = Math.floor((100 / audio.duration) * audio.currentTime);
		}
		$('.progress').css('width',value+'%');
		$('.progressBar').click(function(e){
			if(audio.currentTime != audio.duration){
				var barClicked = e.pageX - $(this).offset().left;
				var newTime = barClicked * audio.duration / $(this).width();
				audio.currentTime = newTime+2;
				value = Math.floor((100 / audio.duration) * audio.currentTime);
				$('.progress').css('width',value+'%');
			}
		})
		if(audio.currentTime==audio.duration){
			var next = $('.album-playlist li.active').next();
			if (next.length == 0) {
				next = $('.album-playlist li:first-child');
			}
			initAudio(next);
			audio.play();
			showDuration();
		}
	});
}