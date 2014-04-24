

function PlanetaTyp (objekt, surowce) {
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.surowce = surowce;
}

function UkladTyp (objekt, temperatura) {
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.temperatura = temperatura;
}

function Planeta (nazwa, planetaTyp, wielkosc) {
	this.nazwa = nazwa;
	this.grafika = planetaTyp.grafika;
	this.planetaTyp = planetaTyp;
	this.wielkosc = wielkosc;
}

function Uklad(nazwa, ukladTyp, planety, wielkosc, pozycja) {
	this.nazwa = nazwa;
	this.grafika = ukladTyp.grafika;
	this.planety = planety;
	this.wielkosc = wielkosc;
	this.pozycja = pozycja;
}

function Mapa () {
	this.uklady = [];
}

function Wejscie (statek, input) {
	// przechwytywanie klawiatury + siec
}

function Wektor2 (x, y) {
	this.x = x; this.y = y;
}

function Fizyka (kto, kogo) {
	this.sprawdz = function(kto, kogo) {
		if (true)
			return true;
		else
			return false;
	};
}

function Objekt (id, nazwa, grafika)
{
	this.id = id;
	this.nazwa = nazwa;
	this.grafika = new Image();

	this.grafika.src = grafika;

	this.grafika.onload = function(){
		console.log("DONE");
	}
}

function Ekran (objekt) {
	this.tlo = objekt.grafika;
	this.tytul = objekt.nazwa;
	this.przyciski = [];
	this.teksty = [];
}

function  Wezel(ten, nastepny, poprzedni) {
	this.ten = ten;
	this.nastepny = nastepny;
	this.poprzedni = poprzedni;
}

function DrzewoRozwoju(){
	this.wezly = [];
}

function Rozwoj () {
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

function Bron (objekt, moc, szybkostrzelnosc, zasieg) {
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.moc = moc;
	this.szybkostrzelnosc = szybkostrzelnosc;
	this.zasieg = zasieg;
}

function Pancerz (objekt, wytrzymalosc) {
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.wytrzymalosc = wytrzymalosc;
}

function Silnik(objekt, przyspieszenie, szybkosc) {
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.przyspieszenie = przyspieszenie;
	this.szybkosc = szybkosc;
}

function Surowiec (objekt, waga) {
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.waga = waga;
}

function Magazyn(objekt, pojemnosc) {
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.pojemnosc = pojemnosc;
}

function Extruder(objekt, surowce) {
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.surowce = [];
}

function TypStatku(objekt, fizyka) {
	this.id = objekt.id;
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.fizyka = fizyka;
}

function Pocisk(objekt, pozycja, szybkosc, obrot) {
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.pozycja = pozycja;
	this.szybkosc = szybkosc;
	this.obrot = obrot;
}

function Statek (typ, pozycja, pozycjaMapa, obrot, kolor, nazwa, rozwoj, wejscie) {
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



