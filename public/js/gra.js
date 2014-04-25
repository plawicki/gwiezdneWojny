$(function(){

	$('body').html($('body').html()+ "LOADING");

	var canvas = $('canvas')[0];

	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;

	canvas.style.width = canvas.width + "px";
	canvas.style.height = canvas.height + "px";

	var ctx = canvas.getContext("2d");

	// 0 - menu, 1 - mapa uniwersum, 2 - mapa ukladu, 3 - mapa drzewka rozwoju, 4 - gameover

	var gameState = 0;

	init = function(){
		
		// After all media are initialized we can start a game loop

		przycisk1.rysuj(ctx);
		mapa.rysuj(ctx);


		setInterval(play, 30);
	}

	play = function(){
	
		if(gameState === 1)
		{

		} 
		else if(gameState === 0)
		{

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