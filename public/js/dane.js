
// typy ekranow : Uniwersum, Uklad, Menu
var objektekran1 = new Objekt(1, "Uniwersum", "/img/tla/skybox1.jpg");
var objektekran2 = new Objekt(1, "Uklad", "/img/tla/skybox1.jpg");
var objektekran3 = new Objekt(1, "Menu", "/img/tla/skybox1.jpg");

var objektplaneta1 = new Objekt(5, "Ziemia", "/img/planety/ziemia.jpg");

var objektgwiazda1 = new Objekt(2, "Niebieska Gwiazda","/img/gwiazdy/gwiazda1.png" );

var objektprzycisk = new Objekt(3, "", "/img/GUI/przycisk.jpg");

var objektstatek1 = new Objekt(4, "Statek", "/img/statki/1.png");

var typstatku1 = new TypStatku(objektstatek1, null);

// gracz
var surowce = [];
surowce.push(new Surowiec(objektgwiazda1));
var bronie = [];
bronie.push(new Bron(objektgwiazda1, 0, 0, 0)); // null
bronie.push(new Bron(objektgwiazda1, 1, 20, 2));
var pancerze = [];
pancerze.push(new Pancerz(objektgwiazda1, 0)); // null
pancerze.push(new Pancerz(objektgwiazda1, 10));
var silniki = [];
silniki.push(new Silnik(objektgwiazda1, 4, 1)); // default
silniki.push(new Silnik(objektgwiazda1, 6, 1)); // spalinowy
var magazyny = [];
magazyny.push(new Magazyn(objektgwiazda1, 0)); // null
magazyny.push(new Magazyn(objektgwiazda1, 10)); // maly
var extrudery = [];
extrudery.push(new Extruder(objektgwiazda1, [surowce[0]]));


var rozwojGracza = new Rozwoj(bronie, pancerze, silniki, extrudery);
var gracz = new Statek(typstatku1, new Wektor2(), null, 0.0, "Gracz", rozwojGracza, null);
gracz.rozwoj.posiadaneBronie.push(bronie[0]);
gracz.rozwoj.posiadaneExtrudery.push(extrudery[0]);
gracz.rozwoj.aktualnyPancerz = gracz.rozwoj.zdobywalnePancerze[0];
gracz.rozwoj.aktualnyMagazyn = gracz.rozwoj.zdobywalneMagazyny[0];
gracz.rozwoj.aktualnySilnik = gracz.rozwoj.zdobywalneSilniki[0];


var planetatyp1 = new PlanetaTyp(objektplaneta1, []);

var planeta1 = new Planeta("Ziemia", planetatyp1, 30, new Wektor2(0, 0));

var ukladtyp1 = new UkladTyp(objektgwiazda1, 100);

var mapa = new Mapa();

for(var j=0; j<50; j++)
{
	var x = Math.random() * (1600 - 0) + 0;
	var y = Math.random() * (600 - 50) + 50;
	var s = Math.random() * (1200 - 100) + 100;
	var n = new Uklad(j, ukladtyp1, s, new Wektor2(x,y));
	n.planety.push(planeta1);
	
	mapa.uklady.push(n);
}

mapa.uklady.push(new Uklad(500, ukladtyp1, 200, new Wektor2(0,0)));

var ekran1 = new Ekran(objektekran1, mapa, gracz);
ekran1.aktywny = true;

var tekst1 = new Tekst("Hello World!", new Wektor2(10, 50), 'red', 20, 'Arial');

//ekran1.teksty.push(tekst1);

var przycisk1 = new Przycisk(tekst1, objektprzycisk, new Wektor2(100, 100), new Wektor2(150, 200), function(){ alert("HELLO WORLD"); });

//ekran1.przyciski.push(przycisk1);

var wejscie = new Wejscie(ekran1);

// tekst, objekt, pozycja, offset, dzialanie