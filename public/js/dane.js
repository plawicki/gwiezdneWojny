
// typy ekranow : Uniwersum, Uklad, Menu
var objektekran1 = new Objekt(1, "Uniwersum", "/img/tla/skybox1.jpg");

var objektplaneta1 = new Objekt(5, "Ziemia", "/img/planety/planet3.png");

var objektgwiazda1 = new Objekt(2, "Niebieska Gwiazda","/img/gwiazdy/gwiazda1.png" );

var objektstatek1 = new Objekt(4, "Statek", "/img/statki/scouter.png");

var objektbron1 = new Objekt(3, "Gauss Cannon", "/img/bronie/gauss.png");

var objektpocisk1 = new Objekt(6, "Kinetic missile", "/img/pociski/gauss.png");

var objektnull = new Objekt(0, "null", "/img/GUI/none.png");

var typstatku1 = new TypStatku(objektstatek1, 100);

// gracz

var bronie = [];
// objekt, moc, szybkostrzelnosc, zasieg, szybkoscPocisku, objektPocisku
bronie.push(new Bron(objektnull, 0, 0, 0, 0, objektnull)); // null
bronie.push(new Bron(objektbron1, 1, 20, 10, 60, objektpocisk1));
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

gracz.rozwoj.posiadaneBronie.push(bronie[1]);

gracz.rozwoj.aktualnyExtruder = gracz.rozwoj.zdobywalneExtrudery[0];
gracz.rozwoj.aktualnyPancerz = gracz.rozwoj.zdobywalnePancerze[1];
gracz.rozwoj.aktualnyMagazyn = gracz.rozwoj.zdobywalneMagazyny[1];
gracz.rozwoj.aktualnySilnik = gracz.rozwoj.zdobywalneSilniki[1];


var planetatyp1 = new PlanetaTyp(objektplaneta1, surowce);

// 30 < d < 60
var planeta1 = new Planeta("Ziemia", planetatyp1, 30, new Wektor2(0, 0));

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
var obcy = new Statek(typstatku1, new Wektor2(0, 0), mapa[0], 0, "inny", rozwojGracza, new Wektor2(), true);
obcy.obroc(200, 100);


var ekran1 = new Ekran(objektekran1, mapa, gracz);
ekran1.inniGracze.push(obcy)

var wejscie = new Wejscie(ekran1);

// tekst, objekt, pozycja, offset, dzialanie

/* 
	1. Wczytywanie wszystkich obiektów potrzebnych do gry
	2. Wczytywanie danych na temat gracza ze sesji i ustawianie zmiennej player, oraz player.rozwoj
	3. Wczytywanie danych na temat otaczajacych go graczy (tworzenie tablicy gracze, i ustawienie kazdego z nich na bota)
	4. Wczytanie mapy z serwera
*/