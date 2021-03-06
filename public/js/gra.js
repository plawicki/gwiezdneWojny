$(function(){

	// socketio

	socket.emit("addPlayer", zapiszGracza(gracz));

	socket.on("nowy", function(gracz){
		console.log(gracz);
	});

	socket.on("innySmierc", function(gracz){

		for(var i=0; i<ekran1.inniGracze.length; i++)
		{
			if(ekran1.inniGracze[i].nazwa == gracz)
			{
				ekran1.inniGracze.splice(i, 1);
				continue;
			}
		}
	});

	socket.on("innyOdlatuje", function(gracz){

		for(var i=0; i<ekran1.inniGracze.length; i++)
		{
			if(ekran1.inniGracze[i].nazwa == gracz)
			{
				ekran1.inniGracze.splice(i, 1);
				continue;
			}
		}
	});

	socket.on("uklady", function(uklady){
		ekran1.mapa.uklady = [];
		for(var i=0; i<uklady.length; i++)
			ekran1.mapa.uklady.push(stworzUklad(uklady[i]));
	});

	socket.on("innyGracz", function(gracz){
		if(gracz.nazwa != ekran1.gracz.nazwa)
			ekran1.inniGracze.push(stworzGracza(gracz));
		console.log(ekran1.inniGracze);
	});

	socket.on("innyStrzal", function(data){
		for(var i=0; i<ekran1.inniGracze.length; i++)
		{
			if(ekran1.inniGracze[i].nazwa === data.gracz)
			{
				for(var j=0; j<bronie.length; j++)
					if(bronie[j].nazwa === data.bron)
					{
						console.log("Bron znaleziona");
						ekran1.inniGracze[i].rozwoj.aktualnaBron = bronie[j];
					}

				ekran1.inniGracze[i].strzel();

			}
		}
	});

	socket.on("innyRuch", function(data){

		for(var i=0; i<ekran1.inniGracze.length; i++)
		{
			if(ekran1.inniGracze[i].nazwa == data.gracz)
			{
				ekran1.inniGracze[i].obrot = data.obrot;
				ekran1.inniGracze[i].pozycja = new Wektor2(data.pozycja.x, data.pozycja.y);
				ekran1.inniGracze[i].predkosc = data.predkosc;
			}
		}
	});

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

	// ustawienia okna planety

	$('#planeta').hide();
	$('#menu .odlec').click(function(){
	
		if(gracz.planeta)
		{
			$(canvas).show();
			$('#wybor').show();
			$('#planeta').hide();
			$('#upgrade').hide();
			przypiszBron();
			ekran1.odlec();
		}
		else if(gracz.kierunek)
		{
			gracz.wyjdzZUkladu();
			ekran1.nazwa = "Uniwersum";
			ekran1.inniGracze = [];
			socket.emit("changeStar", { "nazwaUkladu": "global", "gracz": gracz.nazwa });
		}
	});

	$('#menu .wlec').click(function(){

		ekran1.laduj();
		if(ekran1.nazwa !== "Uniwersum" && gracz.planeta)
		{
			$('#upgrade').hide();
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
			});
			$('#planeta').show();
			$('#wybor').hide();
		} 
		else if(gracz.kierunek)
		{
			gracz.wejdzDoUkladu();

			socket.emit("changeStar", { "nazwaUkladu": gracz.kierunek.nazwa, "gracz": gracz.nazwa });
		}
	});


	// end okno planety

	przypiszBron = function(){
		// ustawienia okna wyboru broni
		if(gracz.rozwoj.posiadaneBronie[0])
			$('#wybor0').append(gracz.rozwoj.posiadaneBronie[0].grafika);
		$('#wybor0').click(function(){
			if(gracz.rozwoj.posiadaneBronie[0])
				gracz.rozwoj.aktualnaBron = gracz.rozwoj.posiadaneBronie[0];
		});
		if(gracz.rozwoj.posiadaneBronie[1])
			$('#wybor1 ').append(gracz.rozwoj.posiadaneBronie[1].grafika);
		$('#wybor1').click(function(){
			if(gracz.rozwoj.posiadaneBronie[1])
				gracz.rozwoj.aktualnaBron = gracz.rozwoj.posiadaneBronie[1];
		});
		if(gracz.rozwoj.posiadaneBronie[2])
			$('#wybor2 ').append(gracz.rozwoj.posiadaneBronie[2].grafika);
		$('#wybor2').click(function(){
			if(gracz.rozwoj.posiadaneBronie[2])
				gracz.rozwoj.aktualnaBron = gracz.rozwoj.posiadaneBronie[2];
		});
		if(gracz.rozwoj.posiadaneBronie[3])
			$('#wybor3 ').append(gracz.rozwoj.posiadaneBronie[3].grafika);
		$('#wybor3').click(function(){
			if(gracz.rozwoj.posiadaneBronie[3])
				gracz.rozwoj.aktualnaBron = gracz.rozwoj.posiadaneBronie[3];
		});
		// end okno wyboru
	};

	przypiszExtruder = function(){
		if(gracz.rozwoj.posiadaneExtrudery[0])
			$('#wybor10').append(gracz.rozwoj.posiadaneExtrudery[0].grafika).click(function(){
				gracz.aktualnyExtruder = gracz.rozwoj.posiadaneExtrudery[0];
		});

		if(gracz.rozwoj.posiadaneExtrudery[1])
			$('#wybor11').append(gracz.rozwoj.posiadaneExtrudery[1].grafika).click(function(){
				gracz.aktualnyExtruder = gracz.rozwoj.posiadaneExtrudery[1];
		});
	};

	przypiszExtruder();

	przypiszBron();

	// menu
	$('.wydobywanie').click(function(){
		if(gracz.planeta.wydobyc <= (gracz.planeta.wielkosc/10))
			$('#planeta #proby').text(Math.floor(gracz.planeta.wielkosc/10) - gracz.planeta.wydobyc);
		gracz.wydobywaj();
	});

	// ustawienia okna upgradow
	// kupowanie silnikow
	$('#spalinowy img').click(function(){ gracz.kupUlepszenie(gracz.rozwoj.zdobywalneSilniki[1]); });
	$('#impulsowy img').click(function(){ gracz.kupUlepszenie(gracz.rozwoj.zdobywalneSilniki[2]); });
	$('#nadprzestrzenny img').click(function(){ gracz.kupUlepszenie(gracz.rozwoj.zdobywalneSilniki[3]); });

	// kupowanie broni
	$('#minigun img').click(function(){ gracz.kupUlepszenie(gracz.rozwoj.zdobywalneBronie[0]); });
	$('#laser img').click(function(){ gracz.kupUlepszenie(gracz.rozwoj.zdobywalneBronie[1]); });
	$('#gauss img').click(function(){ gracz.kupUlepszenie(gracz.rozwoj.zdobywalneBronie[2]); });
	$('#rocket img').click(function(){ gracz.kupUlepszenie(gracz.rozwoj.zdobywalneBronie[3]); });

	// kupowanie pancerzy
	$('#lekki img').click(function(){ gracz.kupUlepszenie(gracz.rozwoj.zdobywalnePancerze[0]); });
	$('#ciezki img').click(function(){ gracz.kupUlepszenie(gracz.rozwoj.zdobywalneBronie[1]); });

	// kupowanie magazynow
	$('#maly img').click(function(){ gracz.kupUlepszenie(gracz.rozwoj.zdobywalneMagazyny[0]); });
	$('#sredni img').click(function(){ gracz.kupUlepszenie(gracz.rozwoj.zdobywalneMagazyny[1]); });
	$('#duzy img').click(function(){ gracz.kupUlepszenie(gracz.rozwoj.zdobywalneMagazyny[2]); });

	// kupowanie extryderow
	$('#wiertlo img').click(function(){ gracz.kupUlepszenie(gracz.rozwoj.zdobywalneExtrudery[0]); });
	$('#wytapiarka img').click(function(){ gracz.kupUlepszenie(gracz.rozwoj.zdobywalneExtrudery[1]); });


	$('#upgrade').hide();
	var ostatniEkran = null;
	$('.upgrade').click(function(){

		$('#zelazo').text(gracz.rozwoj.posiadaneSurowce[0]);
		$('#wegiel').text(gracz.rozwoj.posiadaneSurowce[3]);
		$('#pluton').text(gracz.rozwoj.posiadaneSurowce[2]);
		$('#aluminium').text(gracz.rozwoj.posiadaneSurowce[1]);

		$('#aktualnySilnik').text(gracz.rozwoj.aktualnySilnik.nazwa);
		$('#aktualnySilnik').append(gracz.rozwoj.aktualnySilnik.grafika);

		// tak wiem ze bronie nie sa poprawna forma
		$('#posiadaneBronie').text("");
		$.each(gracz.rozwoj.posiadaneBronie, function(i, el){
			$('#posiadaneBronie').html($('#posiadaneBronie').text() + el.nazwa);
			$('#posiadaneBronie').append(el.grafika);
		});

		if(gracz.rozwoj.aktualnyPancerz)
		{
			$('#aktualnyPancerz').text(gracz.rozwoj.aktualnyPancerz.nazwa);
			$('#aktualnyPancerz').append(gracz.rozwoj.aktualnyPancerz.grafika);
		}

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

			przypiszBron();
			przypiszExtruder();

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
	});
	$('#zelazo').text($('#zelazo').text() + gracz.rozwoj.posiadaneSurowce[0]);
	$('#wegiel').text($('#wegiel').text() + gracz.rozwoj.posiadaneSurowce[1]);
	$('#pluton').text($('#pluton').text() + gracz.rozwoj.posiadaneSurowce[2]);
	$('#aluminium').text($('#aluminium').text() + gracz.rozwoj.posiadaneSurowce[3]);

	$('#aktualnySilnik').text(gracz.rozwoj.aktualnySilnik.nazwa);
	// tak wiem ze bronie nie sa poprawna forma
	$.each(gracz.rozwoj.posiadaneBronie, function(i, el){
		$('#posiadaneBronie').text($('#posiadaneBronie').text() + el.nazwa);
	});
	if(gracz.rozwoj.aktualnyPancerz)
		$('#aktualnyPancerz').text(gracz.rozwoj.aktualnyPancerz.nazwa);
	$('#aktualnyMagazyn').text(gracz.rozwoj.aktualnyMagazyn.nazwa);
	$.each(gracz.rozwoj.posiadaneExtrudery, function(i, el){
		$('#posiadaneExtrudery').text($('#posiadaneExtrudery').text() + el.nazwa);
	});

	// end okno upgradow

	poruszam = function(){
		socket.emit("ruch", {"gracz": gracz.nazwa, "pozycja": {"x": gracz.pozycja.x, "y": gracz.pozycja.y}, "obrot": gracz.obrot, "predkosc": gracz.predkosc});
	};

	var mouseEvent = function(e){
		wejscie.mysz = e;
		wejscie.dzialajMysz();
		poruszam();


	};

	var keyboardEvent = function(e){
		wejscie.klawiatura = e;
		wejscie.dzialajKlawiatura();
		poruszam();
	};

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
	};

	play = function(){

		// ustawienie rysowania wzgeldem gracza
		ctx.przesuniecie = new Wektor2(gracz.pozycja.x, gracz.pozycja.y);

		if(gameState === 1)
		{
			$(canvas).replaceWith("<h1>You are dead</h1>");
			$('#menu').detach();
			socket.emit("smierc", gracz.nazwa);
		} 
		else if(gameState === 0)
		{
			$('#hp').text(gracz.hp);
			$('#predkosc').text(gracz.predkosc);

			if(gracz.hp <= 0)
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

	};

	window.onload = init;
});