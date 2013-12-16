$(document).ready(function (){

	

	// Slider
	if ($('#slider-area').length) {
		$('#slider-area').after('<div id="nav">') .cycle({ 
			fx:     'fade', 
			speed:  1000,
			pause: 1, 
			timeout: 3000,
			next:   '#next',
			prev:   '#prev',
			pager: '#nav' 
		});
	}


	size_li = $("#thumbs li").size();
    x=12;
    $('#thumbs li:lt('+x+')').show();
    $('#loadMore').click(function () {
        x= (x+6 <= size_li) ? x+6 : size_li;
        $('#thumbs li:lt('+x+')').show();
    });

    $('.vote_candidata_thumb').on('click', function (){
    	var pueblo = $(this).children('.pueblo').val();
    	
    	$('.registro_votar h2').html('Reg&iacute;strate antes de votar');
		$('.registro_votar p').html('Para realizar tu voto necesitas autenticarte con Facebook');
		$('.fb_connect').show();

    	$('.overlay').css('opacity', 0);
    	$('.registro_votar').css('opacity', 0);
    	
    	var dialogTop = ($(window).height() - $('.registro_votar').height() ) / 2 + $(window).scrollTop();
		var dialogLeft = ($(window).width() - $('.registro_votar').width()) / 2 + $(window).scrollLeft(); 

		
		$('.overlay').show();
		$('.registro_votar').css({top:dialogTop, left:dialogLeft}).show();

		$('.overlay').fadeTo('slow', 0.9);
		$('.registro_votar').fadeTo('slow', 1);

    });

    $('.registro_votar img').on('click', function(){
    	FB.login(function(response) {
	        if (response.authResponse) {
	            console.log('Authenticated!');
	            checkUser();

	        } else {
	            console.log('User cancelled login or did not fully authorize.');
	        }
	    });


    });

	function checkUser() {

		$('.fb_connect').hide();
		$('.loading').show();

		FB.api('/me', function(response) {
			var fbid, name, email, gender, hometown, location;

			fbid = response.id; //fbid
			name = response.name; //n
			email = response.email; //e
			gender = response.gender; //g
			hometown = response.hometown.name; //ht
			location = response.location.name; //loc

			$.ajax({
				type: "GET",
				url: "db_handler.php",
				data: "fbid="+fbid+"&n="+name+"&e="+email+"&g="+gender+"&ht="+hometown+"&loc="+location,
				success: function(status){
					// console.log("fbid="+fbid+"&n="+name+"&e="+email+"&g="+gender+"&ht="+hometown+"&loc="+location);
					if(status == 1){
						document.cookie= "vote_status=voted";
						$('.registro_votar').fadeTo('fast', 0, function(){
							$('.overlay').fadeTo('slow', 0, function (){
								$('.registro_votar').hide();
								$('.overlay').hide();

								// Show results
								$('.textLight').html('Resultado de votaciones').css({'margin-left':'290px'});
								$('#vote_candidatas').fadeTo('slow', 0, function(){
									$('#vote_candidatas').hide();
									$('#results_candidatas').show().css('opacity', 0);
									$('#results_candidatas').fadeTo('slow', 1);	
								});
								
							});
						});
					}else{
						document.cookie= "vote_status=voted";

						$('.loading').fadeTo('slow', 0, function(){
							$('.loading').hide();
						});
						$('.registro_votar h2').html('Lo sentimos...');
						$('.registro_votar p').html('Ya usted excedió la cantidad de votos permitidos.');
					}	
				}
			});
		});
	}


    $('.registro_votar a').on('click', function(){
    	voted_status = getCookie("vote_status");

    	if(voted_status == 'voted'){
    		$('.textLight').html('Resultado de votaciones').css({'margin-left':'290px'});
    		$('#vote_candidatas').hide();
    		$('#results_candidatas').show();
    	}

    	// CERRAR MODAL
		$('.registro_votar').fadeTo('fast', 0, function(){
			$('.overlay').fadeTo('slow', 0, function (){
				$('.registro_votar').hide();
				$('.overlay').hide();
			});
		});
    });

    


    $(window).resize(function(){

    	var dialogTop = ($(window).height() - $('.registro_votar').height() ) / 2 + $(window).scrollTop();
		var dialogLeft = ($(window).width() - $('.registro_votar').width()) / 2 + $(window).scrollLeft(); 
		
		$('.registro_votar').css({top:dialogTop, left:dialogLeft});

		while ($('#slider-area li img').height() != 0){
			$('#slider-area, #slider-area li ').css({height: $('#slider-area li img').height()});        		
    		break;
    	}

    	//////////// reload iframe on window resize ////////////
    	//////////// reload iframe on window resize ////////////
    	//////////// reload iframe on window resize ////////////
    	$('#video_holder iframe').attr( 'src', function ( i, val ) { return val; });
    	//////////// reload iframe on window resize ////////////
    	//////////// reload iframe on window resize ////////////
    	//////////// reload iframe on window resize ////////////

    });


	$(window).scroll(function (){
		// console.log($(window).width());

		if($(window).width() >= 960){
			if($('.sticky').css('width') > '1000px'){
				$('.name').html('<img src="img/logo_small_sticky_menu.png">');
				$('.sticky').addClass('navShadow');
			}else{
				$('.name').html('');
				$('.sticky').removeClass('navShadow');
			}
		}

		var dialogTop = ($(window).height() - $('.registro_votar').height() ) / 2 + $(window).scrollTop();
		var dialogLeft = ($(window).width() - $('.registro_votar').width()) / 2 + $(window).scrollLeft(); 

		$('.registro_votar').css({top:dialogTop, left:dialogLeft});

	});

	$('.subir').on('click', function(){
		$('html, body').animate({scrollTop:0}, 'slow');
	});
		
});




