$(function(){

	$('body').html($('body').html()+ "LOADING");

	var canvas = $('canvas')[0];

	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;

	canvas.style.width = canvas.width + "px";
	canvas.style.height = canvas.height + "px";

	var ctx = canvas.getContext("2d");

	var wejscie();

	var mouseEvent = function(e){
		
	}

	var keyboardEvent = function(e){
		
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

		//przycisk1.rysuj(ctx);
		
		console.log();

		setInterval(play, 30);
	}

	play = function(){
	
		if(gameState === 1)
		{

		} 
		else if(gameState === 0)
		{
			ekran1.rysuj(ctx);
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