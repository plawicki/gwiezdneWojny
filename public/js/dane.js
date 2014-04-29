
// typy ekranow : Uniwersum, Uklad, Menu
var objektekran1 = new Objekt(1, "Uniwersum", "/img/tla/skybox1.jpg");
var objektekran2 = new Objekt(1, "Uklad", "/img/tla/skybox1.jpg");
var objektekran3 = new Objekt(1, "Menu", "/img/tla/skybox1.jpg");

var objektgwiazda1 = new Objekt(2, "Niebieska Gwiazda","/img/gwiazdy/gwiazda1.png" );

var objektprzycisk = new Objekt(3, "", "/img/GUI/przycisk.jpg");

var objektstatek1 = new Objekt(4, "Statek", "/img/statki/1.png");

var typstatku1 = new TypStatku(objektstatek1, null);

var gracz = new Statek(typstatku1, new Wektor2(0,0), null, 0.0, "Gracz", null, null);

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

var ekran1 = new Ekran(objektekran1, mapa, gracz);
ekran1.aktywny = true;

var tekst1 = new Tekst("Hello World!", new Wektor2(10, 50), 'red', 20, 'Arial');

//ekran1.teksty.push(tekst1);

var przycisk1 = new Przycisk(tekst1, objektprzycisk, new Wektor2(100, 100), new Wektor2(150, 200), function(){ alert("HELLO WORLD"); });

//ekran1.przyciski.push(przycisk1);

var wejscie = new Wejscie(ekran1);

// tekst, objekt, pozycja, offset, dzialanie