
// typy ekranow : Uniwersum, Uklad, Menu
var objektekran1 = new Objekt(1, "Uniwersum", "/img/tla/skybox1.jpg");

var objektplaneta1 = new Objekt(5, "Ziemia", "/img/planety/planet3.png");

var objektgwiazda1 = new Objekt(2, "Niebieska Gwiazda","/img/gwiazdy/gwiazda1.png" );

// satki
var objektstatek1 = new Objekt(4, "Scouter", "/img/statki/scouter.png");
var objektstatek2 = new Objekt(11, "Cruiser", "/img/statki/cruiser.png");
var objektstatek3 = new Objekt(12, "Destroyer", "/img/statki/destroyer.png");

var typyStatku = [];
typyStatku.push(new TypStatku(objektstatek1, 100, 3));
typyStatku.push(new TypStatku(objektstatek2, 200, 0));
typyStatku.push(new TypStatku(objektstatek2, 150, 1));

//bron
var objektbron1 = new Objekt(3, "Gauss Cannon", "/img/bronie/gauss.png");

var objektpocisk1 = new Objekt(6, "Kinetic missile", "/img/pociski/gauss.png");

var objektnull = new Objekt(0, "null", "/img/GUI/none.png");

// surowce
var objekzelazo = new Objekt(7, "Zelazo", "/img/surowce/zelazo.jpg");
var objekaluminium = new Objekt(8, "Aluminium", "/img/surowce/aluminium.jpg");
var objekpluton = new Objekt(9, "Pluton", "/img/surowce/pluton.jpg");
var objekgrafit = new Objekt(10, "Grafit", "/img/surowce/grafit.jpg");

// wydobywarki
var objektextruder1 = new Objekt(13, "Drill", "/img/wiertla/mechaniczne.png");
var objektextruder2 = new Objekt(13, "Smelter", "/img/wiertla/wytapiarka.png");

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
extrudery[1].wymaganeSurowce = [surowce[0], surowce[0]];

var bronie = [];
bronie.push(new Bron(objektbron1, 1, 20, 10, 60, objektpocisk1, [surowce[0], surowce[0], surowce[3]]));
var pancerze = [];
pancerze.push(new Pancerz(objektgwiazda1, 10), [surowce[1], surowce[1]]);
var silniki = [];
silniki.push(new Silnik(objektgwiazda1, 4, 1)); // default
silniki.push(new Silnik(objektgwiazda1, 6, 1, [surowce[0]])); // spalinowy
var magazyny = [];
magazyny.push(new Magazyn(objektgwiazda1, 0, [surowce[0]])); // null
magazyny.push(new Magazyn(objektgwiazda1, 10, [surowce[0], surowce[0]])); // maly
magazyny.push(new Magazyn(objektgwiazda1, 15, [surowce[0], surowce[0], surowce[1]])); // sredni


// gracz

var rozwojGracza = new Rozwoj(bronie, pancerze, silniki, magazyny, extrudery, surowce);

rozwojGracza.posiadaneBronie.push(bronie[0]);
rozwojGracza.posiadaneExtrudery.push(rozwojGracza.zdobywalneExtrudery[0]);
rozwojGracza.aktualnyExtruder = rozwojGracza.zdobywalneExtrudery[0];
rozwojGracza.aktualnyPancerz = rozwojGracza.zdobywalnePancerze[0];
rozwojGracza.aktualnyMagazyn = rozwojGracza.zdobywalneMagazyny[1];
rozwojGracza.aktualnySilnik = rozwojGracza.zdobywalneSilniki[1];
rozwojGracza.posiadaneSurowce[0] = 2;

var gracz = new Statek(typyStatku[0], new Wektor2(), null, 0.0, "Gracz", rozwojGracza, null, false);
gracz.kupUlepszenie(magazyny[2]);

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
var obcy = new Statek(typyStatku[1], new Wektor2(0, 0), mapa[0], 0, "inny", rozwojGracza, new Wektor2(), true);
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
// DODAC parsowanie i zapisywanie(done) do jsona, zeby mozna bylo wysylac informacje


zapiszGracza = function(gracz){
	// typ nazwa, pozycja wektor, kierunek nazwa, obrot numer, nazwa string, rozwoj - objekt, srodek null, przeciwnik tak lub nie
	// tworzenie jsona na podstawie statystyk
	var rozwoj = zapiszRozwoj(gracz.rozwoj);
	if(gracz.kierunek)
	var json = 
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
	var json = 
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
}

zapiszRozwoj = function(rozwoj){
	// bronie, pancerze, silniki, magazyny, extrudery, surowce, posiadaneSurowce, pBronie, pPancerze, pSilniki, pMagazyny, pExtrudery, typStatku)
	var pBronie = [];
	$.each(rozwoj.posiadaneBronie, function(i, el){
		pBronie.push(el.nazwa);
	})
	var pExtrudery = [];
	$.each(rozwoj.posiadaneExtrudery, function(i, el){
		pExtrudery.push(el.nazwa);
	})
	var json =
	{
		"posiadaneSurowce": rozwoj.posiadaneSurowce,
		"pBronie": pBronie,
		"aktualnyPancerz": rozwoj.aktualnyPancerz.nazwa,
		"aktualnySilnik": rozwoj.aktualnySilnik.nazwa,
		"aktualnyMagazyn": rozwoj.aktualnyMagazyn.nazwa,
		"pExtrudery": pExtrudery,
	}
	return json;
}

stworzGracza = function(json){
	// typ nazwa, pozycja wektor, kierunek numer, obrot numer, nazwa string, rozwoj - objekt, srodek null, przeciwnik tak lub nie
	// typ, pozycja, kierunek, obrot, nazwa, rozwoj, srodek, przeciwnik
	var typO = null;
	for(var i=0; i<typyStatku.length; i++)
		if(typyStatku[i].nazwa === json.typ)
			typO = typyStatku[i];

	var kierunekO = null;
	for(var i=0; i<ekran1.mapa.uklady.length; i++)
		if(ekran1.mapa.uklady[i].nazwa === json.kierunek)
			kierunekO = ekran1.mapa.uklady[i].nazwa;

	// kierunek string
	// rozowj bronie, pancerze, silniki, magazyny, extrudery, surowce, posiadaneSurowce, pBronie, pPancerze, pSilniki, pMagazyny, pExtrudery, typStatku
	var pBronieO = [];
	for(var i=0; i<bronie.length; i++)
	{
		for(var j=0; j<json.rozwoj.pBronie.length; j++)
			if(bronie[i].nazwa === json.rozwoj.pBronie[j])
				pBronieO.push(bronie[i]);
	}
	var pExtruderyeO = [];
	for(var i=0; i<extrudery.length; i++)
	{
		for(var j=0; j<json.rozwoj.pExtrudery.length; j++)
			if(extrudery[i].nazwa === json.rozwoj.pExtrudery[j])
				pExtruderyeO.push(extrudery[i]);
	}
	var aPancerzO = null;
	for(var i=0; i<pancerze.length; i++)
	{
		if(pancerze[i].nazwa === json.rozwoj.aktualnyPancerz)
				aPancerzO = pancerze[i];
	}
	var aSilnikO = null
	for(var i=0; i<silniki.length; i++)
	{
		if(silniki[i].nazwa === json.rozwoj.aktualnySilnik)
			aSilnikO = silniki[i];
	}
	var aMagazynO = null
	for(var i=0; i<magazyny.length; i++)
	{
		if(magazyny[i].nazwa === json.rozwoj.aktualnyMagazyn)
			aMagazynO = magazyny[i];
	}

	console.log(pBronieO + pExtruderyeO + aPancerzO + aSilnikO + aMagazynO)

	var gracz = new Statek(
		typO, 
		new Wektor2(json.pozycja.x, json.pozycja.y), 
		json.kierunek, 
		json.obrot, 
		json.nazwa, 
		new Rozwoj(bronie, pancerze, silniki, magazyny, extrudery, surowce, json.posiadaneSurowce, pBronieO, [aPancerzO], [aSilnikO], [aMagazynO], pExtruderyeO, typO), 
		null, 
		json.przeciwnik);

	return gracz;
}

var json = zapiszGracza(gracz);
console.log(stworzGracza(json));