var space = new Objekt(1, "Nowy", "/img/space.jpg");

var objektgwiazda1 = new Objekt(2, "Niebieska Gwiazda","/img/gwiazda1.png" );

var objektprzycisk = new Objekt(3, "", "/img/przycisk.jpg");

var ukladtyp1 = new UkladTyp(objektgwiazda1, 100);

var mapa = new Mapa();

for(var j=0; j<50; j++)
{
	var x = Math.random() * (1600 - 0) + 0;
	var y = Math.random() * (600 - 50) + 50;
	var s = Math.random() * (1200 - 100) + 100;
	var n = new Uklad(j, ukladtyp1, s, new Wektor2(x,y));

	mapa.uklady.push(n);

}

var ekran1 = new Ekran(space, mapa, null);

var tekst1 = new Tekst("Hello World!", new Wektor2(10, 50), 'red', 20, 'Arial');

//ekran1.teksty.push(tekst1);

var przycisk1 = new Przycisk(tekst1, objektprzycisk, new Wektor2(100, 100), new Wektor2(150, 200), function(){ alert("HELLO WORLD"); });

ekran1.przyciski.push(przycisk1);

// tekst, objekt, pozycja, offset, dzialanie