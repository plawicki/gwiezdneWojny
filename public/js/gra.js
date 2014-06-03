$(function(){

	// ustawienia grafiki okna gry

	var canvas = $('canvas')[0];

	canvas.width = document.body.clientWidth;
	// height of canvas is set to 90% of screen
	canvas.height = document.body.clientHeight;

	canvas.style.width = canvas.width + "px";
	canvas.style.height = canvas.height  + "px";

	var ctx = canvas.getContext("2d");

	ctx.szerokosc = canvas.width;
	ctx.wysokosc = canvas.height;
	ctx.srodek = new Wektor2(canvas.width/2, canvas.height/2);

	gracz.srodek = ctx.srodek;

	// end ustawienia grafiki

	// ustawienia okna logowania

	$('#login').hide();

	// end okno logowania

	// ustawienia okna planety

	$('#planeta').hide();
	$('#menu .odlec').click(function(){
	
		if(gracz.planeta)
		{
			$(canvas).show();
			$('#wybor').show();
			$('#planeta').hide();
			$('#upgrade').hide();
			ekran1.odlec();
		}
	})

	$('#menu .wlec').click(function(){

		ekran1.laduj();
		if(gracz.planeta)
		{
			$('#planeta #wielkosc').text("");
			$('#planeta #doWykopania').text("");
			$('#planeta img').replaceWith(gracz.planeta.grafika);
			$('#planeta #wielkosc').text($('#planeta #wielkosc').text() + gracz.planeta.wielkosc);

			if((gracz.planeta.wielkosc/10) - gracz.planeta.wydobyc >= 0)
				$('#planeta #proby').text((gracz.planeta.wielkosc/10) - gracz.planeta.wydobyc);
			else
				$('#planeta #proby').text("0");

			$.each(gracz.planeta.surowce, function(i, surowiec){
				$('#planeta #doWykopania').text($('#planeta #doWykopania').text() + " " + surowiec.nazwa);
			})
			$('#planeta').show();
			$('#wybor').hide();
			$(canvas).hide();
		} 
	})

	// end okno planety

	przypiszBron = function(){
		// ustawienia okna wyboru broni
		if(gracz.rozwoj.posiadaneBronie[0])
			$('#wybor0 img').replaceWith(gracz.rozwoj.posiadaneBronie[0].grafika);
		$('#wybor0').click(function(){
			if(gracz.rozwoj.posiadaneBronie[0])
				gracz.rozwoj.aktualnaBron = gracz.rozwoj.posiadaneBronie[0];
		})
		if(gracz.rozwoj.posiadaneBronie[1])
			$('#wybor1 img').replaceWith(gracz.rozwoj.posiadaneBronie[1].grafika);
		$('#wybor1').click(function(){
			if(gracz.rozwoj.posiadaneBronie[1])
				gracz.rozwoj.aktualnaBron = gracz.rozwoj.posiadaneBronie[1];
		})
		if(gracz.rozwoj.posiadaneBronie[2])
			$('#wybor2 img').replaceWith(gracz.rozwoj.posiadaneBronie[2].grafika);
		$('#wybor2').click(function(){
			if(gracz.rozwoj.posiadaneBronie[2])
				gracz.rozwoj.aktualnaBron = gracz.rozwoj.posiadaneBronie[2];
		})
		if(gracz.rozwoj.posiadaneBronie[3])
			$('#wybor3 img').replaceWith(gracz.rozwoj.posiadaneBronie[3].grafika);
		$('#wybor3').click(function(){
			if(gracz.rozwoj.posiadaneBronie[3])
				gracz.rozwoj.aktualnaBron = gracz.rozwoj.posiadaneBronie[3];
		})	
		// end okno wyboru
	}

	przypiszBron();

	// menu

	$('.wydobywanie').click(function(){
		if(gracz.planeta.wydobyc <= (gracz.planeta.wielkosc/10))
			$('#planeta #proby').text((gracz.planeta.wielkosc/10) - gracz.planeta.wydobyc);
		gracz.wydobywaj();
		console.log(gracz.rozwoj.posiadaneSurowce);
	});

	// ustawienia okna upgradow
	$('#upgrade').hide();
	var ostatniEkran = null;
	$('.upgrade').click(function(){
		$('#zelazo').text(gracz.rozwoj.posiadaneSurowce[0]);
		$('#wegiel').text(gracz.rozwoj.posiadaneSurowce[1]);
		$('#pluton').text(gracz.rozwoj.posiadaneSurowce[2]);
		$('#aluminium').text(gracz.rozwoj.posiadaneSurowce[3]);

		$('#aktualnySilnik').text(gracz.rozwoj.aktualnySilnik.nazwa);
		$('#aktualnySilnik').append(gracz.rozwoj.aktualnySilnik.grafika);

		// tak wiem ze bronie nie sa poprawna forma
		$('#posiadaneBronie').text("");
		$.each(gracz.rozwoj.posiadaneBronie, function(i, el){
			$('#posiadaneBronie').html($('#posiadaneBronie').text() + el.nazwa);
			$('#posiadaneBronie').append(el.grafika);
		});

		$('#aktualnyPancerz').text(gracz.rozwoj.aktualnyPancerz.nazwa);
		$('#aktualnyPancerz').append(gracz.rozwoj.aktualnyPancerz.grafika);

		$('#aktualnyMagazyn').text(gracz.rozwoj.aktualnyMagazyn.nazwa);
		$('#aktualnyMagazyn').append(gracz.rozwoj.aktualnyMagazyn.grafika);

		$('#posiadaneExtrudery').text("");
		$.each(gracz.rozwoj.posiadaneExtrudery, function(i, el){
			$('#posiadaneExtrudery').text($('#posiadaneExtrudery').text() + el.nazwa);
			$('#posiadaneExtrudery').append(el.grafika);
		});

		if($('#upgrade').is(':visible'))
		{
			if(ostatniEkran == "planeta")
				$('#planeta').show();
			$('#upgrade').hide();

			return 0;
		}
		if($(canvas).is(':visible'))
		{
			ostatniEkran = "canvas";

			$('#upgrade').show();

			return 0;
		}
		if($('#planeta').is(':visible'))
		{
			ostatniEkran = "planeta";
			$('#wybor').hide();
			$('#planeta').hide();
			$('#upgrade').show();

			return 0;
		}
	})
	$('#zelazo').text($('#zelazo').text() + gracz.rozwoj.posiadaneSurowce[0]);
	$('#wegiel').text($('#wegiel').text() + gracz.rozwoj.posiadaneSurowce[1]);
	$('#pluton').text($('#pluton').text() + gracz.rozwoj.posiadaneSurowce[2]);
	$('#aluminium').text($('#aluminium').text() + gracz.rozwoj.posiadaneSurowce[3]);

	$('#aktualnySilnik').text(gracz.rozwoj.aktualnySilnik.nazwa);
	// tak wiem ze bronie nie sa poprawna forma
	$.each(gracz.rozwoj.posiadaneBronie, function(i, el){
		$('#posiadaneBronie').text($('#posiadaneBronie').text() + el.nazwa);
	});
	$('#aktualnyPancerz').text(gracz.rozwoj.aktualnyPancerz.nazwa);
	$('#aktualnyMagazyn').text(gracz.rozwoj.aktualnyMagazyn.nazwa);
	$.each(gracz.rozwoj.posiadaneExtrudery, function(i, el){
		$('#posiadaneExtrudery').text($('#posiadaneExtrudery').text() + el.nazwa);
	});

	// end okno upgradow

	var mouseEvent = function(e){
		wejscie.mysz = e;
		wejscie.dzialajMysz();
	}

	var keyboardEvent = function(e){
		wejscie.klawiatura = e;
		wejscie.dzialajKlawiatura();
	}

	$('canvas').mousemove(mouseEvent);
	$('canvas').click(mouseEvent);

	$(document).keypress(keyboardEvent);

	// 0 - menu, 1 - mapa uniwersum, 2 - mapa ukladu, 3 - mapa drzewka rozwoju, 4 - gameover

	var gameState = 0;

	// if gamer connected to server playing = true, otherwise playing = false

	var playing = false;

	init = function(){
		
		// After all media are initialized we can start a game loop

		setInterval(play, 33);
	}

	play = function(){

		// ustawienie rysowania wzgeldem gracza
		ctx.przesuniecie = new Wektor2(gracz.pozycja.x, gracz.pozycja.y);

		if(gameState === 1)
		{

		} 
		else if(gameState === 0)
		{
			$('#hp').text(gracz.hp);
			if(gracz.isDead === true)
				gameState = 1;

			if(gracz)
			{
				if(ekran1.aktywny)
				{
					ekran1.odswiez(ctx);
				}
			}
			else
				menu.odswiez(ctx);
			
		} 
		else if(gameState === 2)
		{	



		}
		else if(gameState === 3)
		{

		}
		else if(gameState === 4)
		{

		}

	}

	window.onload = init;
});