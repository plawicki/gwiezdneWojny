$(function(){

	alert("IT WORKS");

	/*
		* statek class
			* wejscie class
			* fizyka class
		* mapa class
			* planeta class
				* surowiec class
	*/

	function wektor2 (x, y) {
		this.x = x; this.y = y;
	}

	function fizyka (kto, kogo) {
		this.sprawdz = function(kto. kogo) {
			if (true)
				return true;
			else
				return false;
		}
	}

	function objekt (id, nazwa, grafika)
	{
		this.id = id;
		this.nazwa = nazwa;
		this.grafika = grafika;
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

	function typStatku(objekt) {
		this.nazwa = objekt.nazwa;
		this.grafika = objekt.grafika;
	}

	function pocisk(objekt, pozycja, szybkosc, obrot) {
		this.nazwa = objekt.nazwa;
		this.grafika = objekt.grafika;
		this.pozycja = pozycja;
		this.szybkosc = szybkosc;
		this.obrot = obrot;
	}

	function statek (typ, pozycja, pozycjaMapa, obrot, kolor, nazwa, rozwoj ) {
		this.typ = typ;
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

		this.pociski = [];



	}
})