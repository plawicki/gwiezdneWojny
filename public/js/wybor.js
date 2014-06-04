$(function(){

	var wybor = 0;

	var przypisz = function(){
		$('#ship').val(wybor);
	};

	przypisz();

	$('#scouter img').click(function(){
		wybor = 0;
		przypisz();
	});
	$('#cruiser img').click(function(){
		wybor = 1;
		przypisz();
	});
	$('#destroyer img').click(function(){
		wybor = 2;
		przypisz();
	});
});