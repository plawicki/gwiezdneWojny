$(function(){

	var canvas = $('canvas')[0];

	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;

	canvas.style.width = canvas.width + "px";
	canvas.style.height = canvas.height + "px";

	var ctx = canvas.getContext("2d");

	var img = new Image();
	img.src = objone.grafika;

	window.onload = function(){
		ctx.drawImage(img, 0, 0);
	}

	console.log();

	// ctx.fillRect(20, 20, 10, 10);

});