/*
	* statek class
		* wejscie class
		* fizyka class
	* mapa class
		* planeta class
			* surowiec class
*/

function planetaTyp (objekt, surowce) {
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.surowce = surowce;
}

function planeta (nazwa, planetaTyp, wielkosc) {
	this.nazwa = nazwa;
	this.grafika = planetaTyp.grafika;
	this.planetaTyp = planetaTyp;
	this.wielkosc = wielkosc;
}

function uklad(nazwa, objekt, planety, wielkosc, pozycja) {
	this.nazwa = nazwa;
	this.grafika = objekt;
	this.planety = planety;
	this.wielkosc = wielkosc;
	this.pozycja = pozycja;
}

function mapa (uklady) {
	this.uklady = uklady;
}

function wejscie (statek, input) {
	// przechwytywanie klawiatury + siec
}

function wektor2 (x, y) {
	this.x = x; this.y = y;
}

function fizyka (kto, kogo) {
	this.sprawdz = function(kto, kogo) {
		if (true)
			return true;
		else
			return false;
	};
}

function objekt (id, nazwa, grafika)
{
	this.id = id;
	this.nazwa = nazwa;
	this.grafika = grafika;
	this.img = new Image();
	this.img.src = grafika;

	that = this;

	this.img.onload = function(){
		that.grafika = that.img;
	}
}

function ekran (objekt) {
	this.tlo = objekt.grafika;
	this.tytul = objekt.nazwa;
	this.przyciski = [];
	this.teksty = [];
}

function  wezel(ten, nastepny, poprzedni) {
	this.ten = ten;
	this.nastepny = nastepny;
	this.poprzedni = poprzedni;
}

function drzewoRozwoju(){
	this.wezly = [];
}

function rozwoj () {
	this.posiadaneBronie = [];
	this.zdobywalneBronie = [];

	this.aktualnaBron = null;

	this.posiadanePancerze = [];
	this.zdobywalnePancerze = [];

	this.aktualnyPancerz = null;

	this.posiadaneSilniki = [];
	this.zdobywalneSilniki = [];

	this.aktualnySilnik = null;

	this.posiadaneMagazyny = [];
	this.zdobywalneMagazyny = [];

	this.aktualnyMagazyn = null;

	this.posiadaneExtrudery = [];
	this.zdobywalneExtrudery = [];

	this.aktualnyExtruder = null;
}

function bron (objekt, moc, szybkostrzelnosc, zasieg) {
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.moc = moc;
	this.szybkostrzelnosc = szybkostrzelnosc;
	this.zasieg = zasieg;
}

function pancerz (objekt, wytrzymalosc) {
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.wytrzymalosc = wytrzymalosc;
}

function silnik(objekt, przyspieszenie, szybkosc) {
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.przyspieszenie = przyspieszenie;
	this.szybkosc = szybkosc;
}

function surowiec (objekt, waga) {
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.waga = waga;
}

function magazyn(objekt, pojemnosc) {
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.pojemnosc = pojemnosc;
}

function extruder(objekt, surowce) {
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.surowce = [];
}

function typStatku(objekt, fizyka) {
	this.id = objekt.id;
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.fizyka = fizyka;
}

function pocisk(objekt, pozycja, szybkosc, obrot) {
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.pozycja = pozycja;
	this.szybkosc = szybkosc;
	this.obrot = obrot;
}

function statek (typ, pozycja, pozycjaMapa, obrot, kolor, nazwa, rozwoj, wejscie) {
	this.id = 0;
	this.typ = typ;
	this.fizyka = typ.fizyka;
	this.pozycja = pozycja;
	this.pozycjaMapa = pozycjaMapa;
	this.obrot = obrot;
	this.kolor = kolor;
	this.nazwa = nazwa;
	this.bronie = rozwoj.bronie;
	this.pancerze = rozwoj.pancerze;
	this.silniki = rozwoj.silniki;
	this.magazyny = rozwoj.magazyny;
	this.extrudery = rozwoj.extrudery;
	this.wejscie = wejscie;


	this.pociski = [];

}



