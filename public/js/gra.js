$(function(){

	$('body').html($('body').html()+ "LOADING");

	var canvas = $('canvas')[0];

	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;

	canvas.style.width = canvas.width + "px";
	canvas.style.height = canvas.height + "px";

	var ctx = canvas.getContext("2d");


	init = function(){
		
		// After all media are initialized we can start a game loop

		przycisk1.rysuj(ctx);
		mapa.rysuj(ctx);


		setInterval(play, 30);
	}

	play = function(){
	

	}

	window.onload = init;
});