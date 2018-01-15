var title = new Image();
var painting = new Image();
var bgImg2 = new Image();
title.src="Assets/Imagine2.png";
painting.src = "Assets/General.png"
var albumList;
var audio;
var list;
var array = new Array();
$(window).load(function() {
	$( 'body' ).addClass(' loaded');
	$( '#names' ).css('background-image','url('+title.src+')');
	$( '#general_painting_face' ).css('background-image','url('+painting.src+')');
});

$(function(){
	console.log("loaded");
	if(localStorage && localStorage.getItem('songWanted'))
	{	var retrievedObject = JSON.parse(localStorage.getItem('songWanted'));
		console.log(retrievedObject);
		$.merge(array , retrievedObject );
		$.each( array, function( i, val ) {
		$('.list').append(val);
		});
	}
	$('.albums-songs').show().hide();
	var bottomPos = $(window).scrollTop() + $(window).height();
	var windowWidth=$(window).width();
	$triggered_times_general = 0;
	$triggered_times_members = 0;
	$triggered_times_albums = 0;
    var general_location = $('#general').offset().top;
	var general_height = $('#general').height();
	var members_location = $('#members').offset().top;
	var members_height = $('#members').height();
	var albums_location = $('#albums').offset().top;
	var albums_height = $('#albums').height();
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
                $triggered_times_members=1; 
            }
			if((y_scroll_pos > (albums_location+albums_height/4)) && $triggered_times_albums == 0 ) {
                $('#carousel').addClass('fadeInUp');
				$('#albums h1').addClass('fadeInUp');
				$('.album-name').addClass('reflection');
                $triggered_times_albums=1; 
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
        $triggered_times_members=1;  
	}
	if((bottomPos > (albums_location+albums_height/4)) && $triggered_times_albums == 0 ){
        $('#carousel').addClass('fadeInUp');
		$('#albums-title').addClass('fadeInUp');
		$('.album-name').addClass('fadeInUp2');
        $triggered_times_albums=1; 
    }
	var causeRepaintsOn = $('h1, p');
	$(window).resize(function() {
		causeRepaintsOn.css("z-index", 1);
	});
	$('.rectangles-content').hover(function() {
		$(this).parent().css('filter','none');
		$(this).parent().css('-webkit-filter','none');
		setTimeout(function() {
		$('.rectangles-content p,.rectangles-content h1,.rectangles-content h2').addClass('text-shadow');},200);

	},
		function () {
        $('.rectangles-content p,.rectangles-content h1,.rectangles-content h2').removeClass('text-shadow');}
	);
	$( ".rectangles-content" ).mouseleave(function() {
		$(this).parent().css('filter','grayscale(100%)');
		$(this).parent().css('-webkit-filter','grayscale(100%)');
	});
	var customSeparation;
	var customFlankingItems;
	if (765 >= $('body').innerWidth()) {
			customSeparation = 150;
		}
	if (450 >= $('body').innerWidth()) {
			customSeparation = 125;
			customFlankingItems = 1;
		}
	if (1080 <= $('body').innerWidth()) {
			customSeparation = 250;
		}
	if (1600 <= $('body').innerWidth()) {
			customSeparation = 300;
		}
	
	var carousel = $('#carousel').waterwheelCarousel({
		flankingItems: customFlankingItems,
		separation: customSeparation,
		autoPlay:5000,
		clickedCenter: function ($item) {
			var found = ( $item ).attr('id');
			albumList = $('[album-track="' + found + '"]');
			var firstSong = albumList.find('li:first-child');
			initAudio($(firstSong));
			$(albumList).show();
		},
	});
	
	$('#prev').bind('click', function () {
        carousel.prev();
        return false;
    });
	
    $('#next').bind('click', function () {
		carousel.next();
        return false;
    });
	
	$('.pause').hide();
	$('.pause2').hide();
	
	function initAudio(element){
		var song = element.attr('song');
		if(title == undefined || title != $('[song="'+song+'"]').text())
			var title = element.text();
		var cover = element.attr('cover');
		var album = element.attr('album-name');
		console.log(album);

		//Create a New Audio Object
		audio = new Audio('Assets/Albums/' + album + '/' + song);
		
		if(!audio.currentTime){
			$('.currentTime').html('0:00');
		}
		if(!audio.duration){
			$('.duration').html('0:00');
		}
		
		$('.song-name').text(title);
		$('.audio-player .album-names').text(album);
		$('#custom-playlist-body .album-names').text(album);
		
		//Insert Cover Image
		$('img.cover').attr('src','Assets/Covers/' + cover);
		
		$('.album-playlist li').removeClass('active');
		audio.pause();
		currentTime = 0;
		$('.list li').removeClass('active');
		audio.pause();
		currentTime = 0;
		element.addClass('active');
		
	}

	//Close Button
	$('.close-button').click(function(){
		audio.pause(); 
		currentTime = 0; 
		$('.pause').hide();
		$('.play').show();
		$(albumList).hide();
	});
	
	//Play Button
	$('.play').click(function(){
		if($('.play2').is(':hidden') && $('.list li').is('active') == true)
		{
			audio.setAttribute('src',''); 
			audio.load(); 
			audio.pause();
			initAudio($('.connect li:first-child'));
			$('.play2').show();
			$('.pause2').hide();
		}
		audio.play();
		$('.play').hide();
		$('.pause').show();
		$('.duration').fadeIn(400);
		showDuration();
		clickBtn = true;
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
	});

	//Next Button
	$('.next').click(function(){
		audio.pause();
		var next = $('.album-playlist li.active').next();
		if (next.length == 0) {
			next = $('.album-playlist li.active').parent().children(':first-child');
		}
		initAudio(next);
		audio.play();
		showDuration();
		$('.play').hide();
		$('.pause').show();
	});

	//Prev Button
	$('.prev').click(function(){
		$('audio').each(function(){
			this.pause(); 
			this.currentTime = 0; 
		});
		audio.pause();
		var prev = $('.album-playlist li.active').prev();
		if (prev.length == 0) {
			prev = $('.album-playlist li.active').parent().children(':last-child');
		}
		initAudio(prev);
		audio.play();
		showDuration();
		$('.play').hide();
		$('.pause').show();
	});
	
	//Playlist Song Click
	$(document).on('click', '.connect li', function () {
		audio.setAttribute('src',''); 
		audio.load(); 
		audio.pause();
		initAudio($(this));
		$('.play').hide();
		$('.pause').show();
		$('.play2').show();
		$('.pause2').hide();
		$('.duration').fadeIn(400);
		audio.play();
		showDuration();
		clickBtn = true;
	});
	
	$('.playlist-button').click(function(){
		$('#playlist').show();
		$('.container').css('margin-left','2vw');
		$('.container').css('margin-top','5vh');
	});
	
	//PLAYLIST BUTTONS

	//Next Button
	$('.next2').click(function(){
		$('audio').each(function(){
			this.pause(); 
			this.currentTime = 0; 
		});
		audio.pause();
		var next = $('.list li.active').next();
		if (next.length == 0) {
			next = $('.list li:first-child');
		}
		initAudio(next);
		audio.play();
		showDuration();
		$('.play2').hide();
		$('.pause2').show();
	});

	//Prev Button
	$('.prev2').click(function(){
		$('audio').each(function(){
			this.pause(); 
			this.currentTime = 0; 
		});
		audio.pause();
		var prev = $('.list li.active').prev();
		if (prev.length == 0) {
			prev = $('.list li:last-child');
		}
		initAudio(prev);
		audio.play();
		showDuration();
		$('.play2').hide();
		$('.pause2').show();
	});
	
	var clickBtn = false;
	
	//Play Button
	$('.play2').click(function(){
		if(clickBtn == false ){
			clickBtn = true;
			initAudio($('.list li:first-child'));
		}
		if($('.play').is(':hidden') && $('.connet li').is('active') == 'true')
		{
			audio.setAttribute('src',''); 
			audio.load(); 
			audio.pause();
			initAudio($('.list li:first-child'));
			$('.play').show();
			$('.pause').hide();
		}
		audio.play();
		$('.play2').hide();
		$('.pause2').show();
		$('.duration').fadeIn(400);
		showDuration();
		clickBtn = true;
	});

	//Pause Button
	$('.pause2').click(function(){
		audio.pause();
		$('.pause2').hide();
		$('.play2').show();
	});
		
	//Stop Button
	$('.stop2').click(function(){
		audio.pause();		
		audio.currentTime = 0;
		$('.pause2').hide();
		$('.play2').show();
	});
	
	//Clear Playlist Button
	$('#clear-playlist').click(function(){
		localStorage.clear();
		$('.list').empty();
	});
	
	clickBtn = false;
	
	//Playlist Song Click
	$(document).on('click', '.list li', function () {
		if(clickBtn == false){
			clickBtn = true;
		}
		else
		{
			audio.setAttribute('src',''); 
			audio.load(); 
			audio.pause();
		}
		initAudio($(this));
		$('.play2').hide();
		$('.pause2').show();
		$('.play').show();
		$('.pause').hide();
		$('.duration').fadeIn(400);
		audio.play();
		showDuration();
		clickBtn = true;
	});

	//Volume Control
	$('.volume span').css('width','30%');
	$('.volume-bar').change(function(){
		audio.volume = parseFloat(this.value / 10);
		console.log(audio.volume);
		$('.volume span').css('width',this.value*6+'%');
		if(audio.muted == false){
			if(audio.volume >= 0.7){
				$('.volume-button').css('background','url("Assets/Media Controls/Status-audio-volume-high-icon.png")');}
			if(audio.volume < 0.7){
				$('.volume-button').css('background','url("Assets/Media Controls/Status-audio-volume-medium-icon.png")');}
			if(audio.volume < 0.4){
				$('.volume-button').css('background','url("Assets/Media Controls/Status-audio-volume-low-icon.png")');}
		}
	});

	$('.volume-button').click(function(){
		if(audio.muted == true){	
			audio.muted = false;
			if(audio.volume >= 0.7){
				$('.volume-button').css('background','url("Assets/Media Controls/Status-audio-volume-high-icon.png")');}
			if(audio.volume < 0.7){
				$('.volume-button').css('background','url("Assets/Media Controls/Status-audio-volume-medium-icon.png")');}
			if(audio.volume < 0.4){
				$('.volume-button').css('background','url("Assets/Media Controls/Status-audio-volume-low-icon.png")');}
			}
		else
		{
			audio.muted = true;
			$('.volume-button').css('background-image','url("Assets/Media Controls/Status-audio-volume-muted-icon.png")');
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
			});
			if(audio.currentTime==audio.duration){
				$('.album-playlist .sona-name').text('');
				console.log($('.album-playlist .sona-name').text());
				if($('li.active').parent().hasClass('list')){
					var next = $('.list li.active').next();
					if (next.length == 0){
						next = $('.list li.active').parent().children(':first-child');}}
				else{
				var next = $('.album-playlist li.active').next();
				if (next.length == 0) {
					next = $('.album-playlist li.active').parent().children(':first-child');
				}}
				initAudio(next);
				audio.play();
				showDuration();
			}
		});
	}
	
	$('#PlaylistM').click(function(){
		$('#playlist').show();
		$('.container').css('margin-left','0');
		$('.container').css('margin-top','5vh');
	})
	
	$('.close-button2').click(function(){
		$('#playlist').hide();
	})
	
	$('.connect').sortable({
    connectWith: '.list',
	cursor: 'move',
    helper: function (e, li) {
		this.copyHelper = li.clone().insertAfter(li);
        $(this).data('copied', false);
        return li.clone();
    },

    stop: function () {

        var copied = $(this).data('copied');
        if (!copied) {
            this.copyHelper.remove();
        }
		else
		{
			var songWanted = this.copyHelper.wrap("<div></div>").parent().html();
			songWanted = songWanted.replace('<div>','');
			songWanted = songWanted.replace('</div>','');
			console.log(songWanted);
			array.push(songWanted);
			localStorage.setItem('songWanted', JSON.stringify(array));
			console.log(JSON.stringify(array));
			$('.album-playlist div li').unwrap();
		}
        this.copyHelper = null;
    }
	});
	localStorage.setItem('songWanted', JSON.stringify(array));	
	
	$('.list').sortable({
		receive: function (e, ui) {
			ui.sender.data('copied', true);
			sortableIn = 1;
		},
		over: function(e, ui) { sortableIn = 1;},
		out: function(e, ui) { sortableIn = 0; },
		beforeStop: function(e, ui) {
			var removeOne = false;
			if (sortableIn == 0) { 
				ui.item.remove();
				var contains = ui.item.wrap( '<div></div>' ).parent().html();
				contains = contains.replace(' style=""','');
				contains = contains.replace(' active" style="display: list-item;','');
				contains = contains.replace(' style="display: list-item;"','');
				contains = contains.replace("ui-sortable-handle","");
				console.log(contains);
				array = $.grep(array, function(value) {
					value = value.replace( ' style="display: list-item;"','');
					value = value.replace("ui-sortable-handle active","ui-sortable-handle");
					value = value.replace("ui-sortable-handle","");
					value = value.replace("<div>","");
					value = value.replace('"<div class="ui-sortable-handle">"',"");
					value = value.replace("</div>","");
					console.log(value);
					if(removeOne == false && value == contains)
					{
						removeOne = true;}
					else{
						return value;
					}
				});
			};
			localStorage.setItem('songWanted', JSON.stringify(array));
		} 
	});
	
	$(document).on('click', '#PDFM', function () {
		window.open('Assets/Web-Authoring-Item1.pdf','Web-Authoring-Item1');
	});
	
	$('li').removeClass('active');
	$('#copyright-year').html(new Date().getFullYear());
});


