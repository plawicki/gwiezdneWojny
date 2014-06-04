
// typow ukladow: 4, typow planet: 4

// typy ekranow : Uniwersum, Uklad, Menu
var objektekran1 = new Objekt(0, "Uniwersum", "/img/tla/skybox1.jpg");

// planety
var objektplaneta1 = new Objekt(1, "Earth", "/img/planety/planet3.png");
var objektplaneta2 = new Objekt(2, "Magma planet", "/img/planety/planet14.png");
var objektplaneta3 = new Objekt(3, "Gas Giant", "/img/planety/planet12.png");
var objektplaneta4 = new Objekt(4, "Frozen planet", "/img/planety/planet17.png");

var objektplaneta5 = new Objekt(5, "Blue Star", "/img/planety/blue_star.png");
var objektplaneta6 = new Objekt(6, "Red Star", "/img/planety/red_star.png");
var objektplaneta7 = new Objekt(7, "White Star", "/img/planety/white_star.png");
var objektplaneta8 = new Objekt(8, "Yellow Star", "/img/planety/yellow_star.png");

// gwiazdy
var objektgwiazda1 = new Objekt(9, "Blue Star","/img/gwiazdy/gwiazda1.png" );
var objektgwiazda2 = new Objekt(10, "Red Star","/img/gwiazdy/gwiazda2.png" );
var objektgwiazda3 = new Objekt(11, "White Star","/img/gwiazdy/gwiazda4.png" );
var objektgwiazda4 = new Objekt(12, "Yellow Star","/img/gwiazdy/gwiazda3.png" );

// statki
var objektstatek1 = new Objekt(13, "Scouter", "/img/statki/scouter.png");
var objektstatek2 = new Objekt(14, "Cruiser", "/img/statki/cruiser.png");
var objektstatek3 = new Objekt(15, "Destroyer", "/img/statki/destroyer.png");

var typyStatku = [];
typyStatku.push(new TypStatku(objektstatek1, 100, 3));
typyStatku.push(new TypStatku(objektstatek2, 200, 0));
typyStatku.push(new TypStatku(objektstatek2, 150, 1));

//bron
var objektbron1 = new Objekt(16, "Gauss Cannon", "/img/bronie/gauss.png");
var objektbron2 = new Objekt(17, "Laser", "/img/bronie/laser.png");
var objektbron3 = new Objekt(18, "Minigun", "/img/bronie/minigun.png");
var objektbron4 = new Objekt(19, "Rocket luncher", "/img/bronie/wyrzutnia.png");

var objektnull = new Objekt(20, "null", "/img/GUI/none.png");

// surowce
var objekzelazo = new Objekt(21, "Iron", "/img/surowce/zelazo.jpg");
var objekaluminium = new Objekt(22, "Aluminum", "/img/surowce/aluminium.jpg");
var objekpluton = new Objekt(23, "Plutonium", "/img/surowce/pluton.jpg");
var objekgrafit = new Objekt(24, "Graphite", "/img/surowce/grafit.jpg");

// wydobywarki
var objektextruder1 = new Objekt(25, "Drill", "/img/wiertla/mechaniczne.png");
var objektextruder2 = new Objekt(26, "Smelter", "/img/wiertla/wytapiarka.png");

// pancerze
var objektpancerz1 = new Objekt(27, "Light armor", "/img/pancerze/light.png");
var objektpancerz2 = new Objekt(28, "Heavy armor", "/img/pancerze/heavy.png");

// pociski
var objektpocisk1 = new Objekt(29, "Kinetic missile", "/img/pociski/gauss.png");
var objektpocisk2 = new Objekt(30, "Laser beam", "/img/pociski/laser.png");
var objektpocisk3 = new Objekt(31, "Bullet", "/img/pociski/bullet.png");
var objektpocisk4 = new Objekt(32, "Rocket", "/img/pociski/rocket.png");

// magazyny
var objektmagazyn1 = new Objekt(33, "Small magazine", "/img/magazyny/small.png");
var objektmagazyn2 = new Objekt(34, "Avarage magazine", "/img/magazyny/avarage.png");
var objektmagazyn3 = new Objekt(35, "Huge magazine", "/img/magazyny/big.png");

// silniki
var objektsilnik1 = new Objekt(36, "Pulse engine", "/img/silniki/impulsowy.png");
var objektsilnik2 = new Objekt(37, "Rocket engine", "/img/silniki/spalinowy.png");
var objektsilnik3 = new Objekt(38, "Stronger rocket engine", "/img/silniki/spalinowy2.png");
var objektsilnik4 = new Objekt(39, "Hyperspace engine", "/img/silniki/nadprzestrzenny.png");

// itemy w grze
var extrudery = [];
extrudery.push(new Extruder(objektextruder1));
extrudery.push(new Extruder(objektextruder2));

var surowce = [];
surowce.push(new Surowiec(objekzelazo, extrudery[0]));
surowce.push(new Surowiec(objekaluminium, extrudery[0]));
surowce.push(new Surowiec(objekpluton, extrudery[1]));
surowce.push(new Surowiec(objekgrafit, extrudery[1]));

extrudery[0].wymaganeSurowce = [surowce[0]];
extrudery[1].wymaganeSurowce = [surowce[0], surowce[1]];

var bronie = [];
bronie.push(new Bron(objektbron1, 50, 30, 30, 120, objektpocisk1, [surowce[0], surowce[0], surowce[2]]));
bronie.push(new Bron(objektbron2, 20, 10, 5, 150, objektpocisk2, [surowce[1], surowce[1], surowce[3]]));
bronie.push(new Bron(objektbron3, 10, 5, 5, 60, objektpocisk3, [surowce[1], surowce[0]]));
bronie.push(new Bron(objektbron4, 40, 20, 15, 40, objektpocisk4, [surowce[0], surowce[1], surowce[3], surowce[2]]));

var pancerze = [];
pancerze.push(new Pancerz(objektpancerz1, 50), [surowce[1], surowce[1], surowce[1], surowce[3]]);
pancerze.push(new Pancerz(objektpancerz2, 150), [surowce[0], surowce[0], surowce[0], surowce[0], surowce[0], surowce[0], surowce[0], surowce[0], surowce[2]]);

var silniki = [];
silniki.push(new Silnik(objektsilnik2, 4, 1)); // default
silniki.push(new Silnik(objektsilnik3, 6, 1, [surowce[0], surowce[3]])); // spalinowy
silniki.push(new Silnik(objektsilnik1, 10, 2, [surowce[0], surowce[0], surowce[1], surowce[2], surowce[2], surowce[2]]));
silniki.push(new Silnik(objektsilnik4, 15, 3, [surowce[0], surowce[0], surowce[0], surowce[0], surowce[0], surowce[1], surowce[2], surowce[2], surowce[2]]));

var magazyny = [];
magazyny.push(new Magazyn(objektmagazyn1, 4, [surowce[0], surowce[0]])); // maly
magazyny.push(new Magazyn(objektmagazyn2, 6, [surowce[0], surowce[0], surowce[1]])); // sredni
magazyny.push(new Magazyn(objektmagazyn3, 8, [surowce[0], surowce[0], surowce[0], surowce[0], surowce[0], surowce[1]])); // duzy

// gracz

var rozwojGracza = new Rozwoj(bronie, pancerze, silniki, magazyny, extrudery, surowce);

rozwojGracza.posiadaneExtrudery.push(rozwojGracza.zdobywalneExtrudery[0]);
rozwojGracza.aktualnyExtruder = rozwojGracza.zdobywalneExtrudery[0];
rozwojGracza.aktualnyMagazyn = rozwojGracza.zdobywalneMagazyny[0];
rozwojGracza.aktualnySilnik = rozwojGracza.zdobywalneSilniki[0];

var gracz = new Statek(typyStatku[0], new Wektor2(), null, 0.0, makeid(), rozwojGracza, null, false);

var typyPlanet = [];

typyPlanet.push(new PlanetaTyp(objektplaneta1, [surowce[3]]));
typyPlanet.push(new PlanetaTyp(objektplaneta2, [surowce[0]]));
typyPlanet.push(new PlanetaTyp(objektplaneta3, [surowce[2]]));
typyPlanet.push(new PlanetaTyp(objektplaneta4, [surowce[1]]));

typyPlanet.push(new PlanetaTyp(objektplaneta5, []));
typyPlanet.push(new PlanetaTyp(objektplaneta6, []));
typyPlanet.push(new PlanetaTyp(objektplaneta7, []));
typyPlanet.push(new PlanetaTyp(objektplaneta8, []));

var typyUkladow = [];

typyUkladow.push(new UkladTyp(objektgwiazda1, 100));
typyUkladow.push(new UkladTyp(objektgwiazda2, 200));
typyUkladow.push(new UkladTyp(objektgwiazda3, 300));
typyUkladow.push(new UkladTyp(objektgwiazda4, 400));

var mapa = new Mapa();

var ekran1 = new Ekran(objektekran1, mapa, gracz);

var wejscie = new Wejscie(ekran1);

// tekst, objekt, pozycja, offset, dzialanie

/* 
	1. Wczytywanie wszystkich obiektów potrzebnych do gry
	2. Wczytywanie danych na temat gracza ze sesji i ustawianie zmiennej player, oraz player.rozwoj
	3. Wczytywanie danych na temat otaczajacych go graczy (tworzenie tablicy gracze, i ustawienie kazdego z nich na bota)
	4. Wczytanie mapy z serwera
*/
// DODAC parsowanie i zapisywanie(done) do jsona, zeby mozna bylo wysylac informacje

// siec

zapiszGracza = function(gracz){
	// typ nazwa, pozycja wektor, kierunek nazwa, obrot numer, nazwa string, rozwoj - objekt, srodek null, przeciwnik tak lub nie
	// tworzenie jsona na podstawie statystyk
	var rozwoj = zapiszRozwoj(gracz.rozwoj);
  var json = null;
	if(gracz.kierunek)
	json = 
	{ 
		"typ": gracz.typ.nazwa, 
		"pozycja": { "x": gracz.pozycja.x, "y": gracz.pozycja.y}, 
		"kierunek": gracz.kierunek.nazwa, 
		"obrot": gracz.obrot, 
		"nazwa": gracz.nazwa, 
		"rozwoj": rozwoj, 
		"srodek": null, 
		"przeciwnik": null 
	};
	else
	json = 
	{ 
		"typ": gracz.typ.nazwa, 
		"pozycja": { "x": gracz.pozycja.x, "y": gracz.pozycja.y}, 
		"kierunek": null, 
		"obrot": gracz.obrot, 
		"nazwa": gracz.nazwa, 
		"rozwoj": rozwoj, 
		"srodek": null, 
		"przeciwnik": null 
	};
	return json;
};

zapiszRozwoj = function(rozwoj){
	// bronie, pancerze, silniki, magazyny, extrudery, surowce, posiadaneSurowce, pBronie, pPancerze, pSilniki, pMagazyny, pExtrudery, typStatku)
	var pBronie = [];
	$.each(rozwoj.posiadaneBronie, function(i, el){
		pBronie.push(el.nazwa);
	});
	var pExtrudery = [];
	$.each(rozwoj.posiadaneExtrudery, function(i, el){
		pExtrudery.push(el.nazwa);
	});

	var aPancerz = null;
	if(rozwoj.aktualnyPancerz)
		aPancerz = rozwoj.aktualnyPancerz.nazwa;

	var json =
	{
		"posiadaneSurowce": rozwoj.posiadaneSurowce,
		"pBronie": pBronie,
		"aktualnyPancerz": aPancerz,
		"aktualnySilnik": rozwoj.aktualnySilnik.nazwa,
		"aktualnyMagazyn": rozwoj.aktualnyMagazyn.nazwa,
		"pExtrudery": pExtrudery,
	};
	return json;
};

stworzGracza = function(json){
	// typ nazwa, pozycja wektor, kierunek numer, obrot numer, nazwa string, rozwoj - objekt, srodek null, przeciwnik tak lub nie
	// typ, pozycja, kierunek, obrot, nazwa, rozwoj, srodek, przeciwnik
	var typO = null;
  	var i=0, j=0;
  
	for(i=0; i<typyStatku.length; i++)
		if(typyStatku[i].nazwa === json.typ)
			typO = typyStatku[i];

	var kierunekO = null;
	for(i=0; i<ekran1.mapa.uklady.length; i++)
		if(ekran1.mapa.uklady[i].nazwa === json.kierunek)
			kierunekO = ekran1.mapa.uklady[i];

	// kierunek string
	// rozowj bronie, pancerze, silniki, magazyny, extrudery, surowce, posiadaneSurowce, pBronie, pPancerze, pSilniki, pMagazyny, pExtrudery, typStatku
	var pBronieO = [];
	for(i=0; i<bronie.length; i++)
	{
		for(j=0; j<json.rozwoj.pBronie.length; j++)
			if(bronie[i].nazwa === json.rozwoj.pBronie[j])
				pBronieO.push(bronie[i]);
	}
	var pExtruderyeO = [];
	for(i=0; i<extrudery.length; i++)
	{
		for(j=0; j<json.rozwoj.pExtrudery.length; j++)
			if(extrudery[i].nazwa === json.rozwoj.pExtrudery[j])
				pExtruderyeO.push(extrudery[i]);
	}
	var aPancerzO = null;
	for(i=0; i<pancerze.length; i++)
	{
		if(pancerze[i].nazwa === json.rozwoj.aktualnyPancerz)
				aPancerzO = pancerze[i];
	}
	var aSilnikO = null;
	for(i=0; i<silniki.length; i++)
	{
		if(silniki[i].nazwa === json.rozwoj.aktualnySilnik)
			aSilnikO = silniki[i];
	}
	var aMagazynO = null;
	for(i=0; i<magazyny.length; i++)
	{
		if(magazyny[i].nazwa === json.rozwoj.aktualnyMagazyn)
			aMagazynO = magazyny[i];
	}

	var gracz = new Statek(
		typO, 
		new Wektor2(json.pozycja.x, json.pozycja.y), 
		kierunekO, 
		json.obrot, 
		json.nazwa, 
		new Rozwoj(bronie, pancerze, silniki, magazyny, extrudery, surowce, json.posiadaneSurowce, pBronieO, [aPancerzO], [aSilnikO], [aMagazynO], pExtruderyeO, typO), 
		null, 
		json.przeciwnik);

	return gracz;
};

stworzPlanete = function(json){


	var planeta = new Planeta(json.nazwa, typyPlanet[json.typ], json.wielkosc, new Wektor2(json.pozycja.x, json.pozycja.y));

	return planeta;
};

stworzUklad = function(json){

	var planety = [];
	for(var i=0; i<json.planety.length; i++)
	{
		planety.push(stworzPlanete(json.planety[i]));
	}

	var uklad = new Uklad(json.nazwa, typyUkladow[json.typ], json.wielkosc, new Wektor2(json.pozycja.x, json.pozycja.y), planety);

	return uklad;
};

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
