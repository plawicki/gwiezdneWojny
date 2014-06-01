$(function(){

	// ustawienia grafiki okna gry

	var canvas = $('canvas')[0];

	canvas.width = document.body.clientWidth;
	// height of canvas is set to 90% of screen
	canvas.height = document.body.clientHeight - (document.body.clientHeight/50);

	canvas.style.width = canvas.width + "px";
	canvas.style.height = (canvas.height-(canvas.height/50))  + "px";

	var ctx = canvas.getContext("2d");

	ctx.szerokosc = canvas.width;
	ctx.wysokosc = canvas.height;
	ctx.srodek = new Wektor2(canvas.width/2, canvas.height/2);

	gracz.srodek = ctx.srodek;

	// end ustawienia grafiki

	// ustawienia okna logowania

	$('#login').hide();

	// end okno logowania

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

	// ustawienia okna upgradow
	$('#upgrade').hide();
	$('.upgrade').click(function(){
		if($(canvas).is(':visible'))
		{
			$(canvas).hide();
			$('#wybor').hide();
			$('#upgrade').show();
		}
		else
		{
			$(canvas).show();
			$('#wybor').show();
			$('#upgrade').hide();
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

		ctx.przesuniecie = new Wektor2(gracz.pozycja.x, gracz.pozycja.y);
	
		if(gameState === 1)
		{

		} 
		else if(gameState === 0)
		{
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