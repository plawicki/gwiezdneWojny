
// typy ekranow : Uniwersum, Uklad, Menu
var objektekran1 = new Objekt(1, "Uniwersum", "/img/tla/skybox1.jpg");
var objektekran2 = new Objekt(1, "Uklad", "/img/tla/skybox1.jpg");
var objektekran3 = new Objekt(1, "Menu", "/img/tla/skybox1.jpg");

var objektplaneta1 = new Objekt(5, "Ziemia", "/img/planety/ziemia.jpg");

var objektgwiazda1 = new Objekt(2, "Niebieska Gwiazda","/img/gwiazdy/gwiazda1.png" );

var objektprzycisk = new Objekt(3, "", "/img/GUI/przycisk.jpg");

var objektstatek1 = new Objekt(4, "Statek", "/img/statki/1.png");

var typstatku1 = new TypStatku(objektstatek1, 100);

// gracz

var bronie = [];
// objekt, moc, szybkostrzelnosc, zasieg, szybkoscPocisku, objektPocisku
bronie.push(new Bron(objektgwiazda1, 0, 0, 0, 0, objektgwiazda1)); // null
bronie.push(new Bron(objektgwiazda1, 1, 20, 10, 60, objektgwiazda1));
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
extrudery.push(new Extruder(objektgwiazda1));
var surowce = [];
surowce.push(new Surowiec(objektgwiazda1, extrudery[0]));

var rozwojGracza = new Rozwoj(bronie, pancerze, silniki, magazyny, extrudery, surowce);
var gracz = new Statek(typstatku1, new Wektor2(), null, 0.0, "Gracz", rozwojGracza, null, false);
//gracz.rozwoj.posiadaneBronie.push(bronie[0]);
gracz.rozwoj.posiadaneBronie.push(bronie[1]);
gracz.rozwoj.aktualnyExtruder = gracz.rozwoj.zdobywalneExtrudery[0];
gracz.rozwoj.aktualnyPancerz = gracz.rozwoj.zdobywalnePancerze[1];
gracz.rozwoj.aktualnyMagazyn = gracz.rozwoj.zdobywalneMagazyny[1];
gracz.rozwoj.aktualnySilnik = gracz.rozwoj.zdobywalneSilniki[1];


var planetatyp1 = new PlanetaTyp(objektplaneta1, surowce);

var planeta1 = new Planeta("Ziemia", planetatyp1, 40, new Wektor2(0, 0));

var ukladtyp1 = new UkladTyp(objektgwiazda1, 100);

var mapa = new Mapa();

mapa.uklady.push(new Uklad(500, ukladtyp1, 500, new Wektor2(0,0)));
mapa.uklady[0].planety.push(planeta1);

for(var j=0; j<50; j++)
{
	var x = Math.random() * (1600 - 0) + 0;
	var y = Math.random() * (600 - 50) + 50;
	var s = Math.random() * (1500 - 800) + 800;
	var n = new Uklad(j, ukladtyp1, 1600, new Wektor2(x,y));
	n.planety.push(planeta1);
	
	mapa.uklady.push(n);
}

//typ, pozycja, pozycjaMapa, obrot, nazwa, rozwoj, srodek
var obcy = new Statek(typstatku1, new Wektor2(100, 100), mapa[0], 0, "inny", null, new Wektor2(), true);
obcy.obroc(200, 200);
console.log(obcy)

var ekran1 = new Ekran(objektekran1, mapa, gracz);
ekran1.inniGracze.push(obcy)

var tekst1 = new Tekst("Hello World!", new Wektor2(10, 50), 'red', 20, 'Arial');

//ekran1.teksty.push(tekst1);

var przycisk1 = new Przycisk(tekst1, objektprzycisk, new Wektor2(100, 100), new Wektor2(150, 200), function(){ alert("HELLO WORLD"); });

//ekran1.przyciski.push(przycisk1);

var wejscie = new Wejscie(ekran1);

// tekst, objekt, pozycja, offset, dzialanie

/* 
	1. Wczytywanie wszystkich obiektów potrzebnych do gry
	2. Wczytywanie danych na temat gracza ze sesji i ustawianie zmiennej player, oraz player.rozwoj
	3. Wczytywanie danych na temat otaczajacych go graczy (tworzenie tablicy gracze, i ustawienie kazdego z nich na bota)
	4. Wczytanie mapy z serwera
*/