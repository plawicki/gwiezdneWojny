

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

function Planeta (nazwa, planetaTyp, wielkosc, pozycja) {
	this.nazwa = nazwa;
	this.grafika = planetaTyp.grafika;
	this.planetaTyp = planetaTyp;
	this.wielkosc = wielkosc;
	this.pozycja = pozycja;

	var that = this;

	this.rysuj = function(ctx){

		if(ctx && that.grafika)
		{
			that.grafika.rysuj(ctx, that.pozycja);
		}
		
	};
}

function Uklad(nazwa, ukladTyp, wielkosc, pozycja) {
	this.nazwa = nazwa;
	this.ukladTyp = ukladTyp;
	this.grafika = ukladTyp.grafika;
	this.planety = [];
	this.wielkosc = wielkosc;
	this.pozycja = pozycja;

	var that = this;

	this.rysuj = function(ctx){

		if(ctx && that.grafika)
		{
			that.grafika.rysuj(ctx, that.pozycja);
		}
		
	};

	this.rysujSrodek = function(ctx){
		if(ctx)
		{
			for(var i=0; i<that.planety.length; i++)
			{
				that.planety[i].rysuj(ctx);
			}
		}
	};
}

function Mapa () {
	this.uklady = [];

	var that = this;

	this.rysuj = function(ctx){
		if(ctx)
		{
			for(var i=0; i<that.uklady.length; i++)
			{
				that.uklady[i].rysuj(ctx);
			}
		}
		
	};
}

function Wejscie (ekran) {
	// przechwytywanie klawiatury + siec
	this.mysz = null;
	this.klawiatura = null;
	this.ekran = ekran;

	var that = this;

	this.dzialajMysz = function(){
		that.ekran.dzialaj(that.mysz);
	};

	this.dzialajKlawiatura = function(){
		that.ekran.dzialaj(that.klawiatura);
	};
}

function Wektor2 (x, y) {
	if(x && y)
	{
		this.x = x; this.y = y;
	}
	else
	{
		this.x = 0; this.y = 0;
	}
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
		console.log("x "+this.width+" y "+this.height);
	};

	this.grafika.rysuj = function(ctx, pozycja, rozmiar, offset, obrot){
		ctx.save();

		var pozycja = pozycja;
		var offset = offset;

		if(!offset)
			var offset = new Wektor2();

		if(!pozycja)
			var pozycja = new Wektor2();

		if(obrot)
		{
			ctx.translate(pozycja.x + offset.x, pozycja.y + offset.y);
			ctx.translate(this.width/2, this.height/2);
			ctx.rotate(obrot);

			pozycja = new Wektor2();
			offset = new Wektor2(-this.width/2, -this.height/2);
		}

		if(rozmiar)
			ctx.drawImage(this, pozycja.x+offset.x, pozycja.y+offset.y, rozmiar.x, rozmiar.y);
		else
			ctx.drawImage(this, pozycja.x+offset.x, pozycja.y+offset.y);

		ctx.restore();
	};
}

function Przycisk (tekst, objekt, pozycja, offset, dzialanie) {

	// tekst = obj
	this.tekst = tekst;

	this.tekst.pozycja = pozycja;
	this.tekst.offset = offset;

	this.pozycja = pozycja;
	this.dzialanie = dzialanie;
	this.grafika = objekt.grafika;

	var that = this;

	this.rysuj = function(ctx){
		that.grafika.rysuj(ctx, that.pozycja);
		that.tekst.rysuj(ctx);
	};
}

function Tekst (tekst, pozycja, kolor, rozmiar, czcionka, offset) {

	// tekst = string

	this.tekst = tekst;
	this.pozycja = pozycja;
	this.kolor = kolor;
	this.rozmiar = rozmiar;
	this.czcionka = czcionka;
	this.offset = offset;

	if(!offset)
		this.offset = new Wektor2();

	var that = this;

	this.rysuj = function(ctx){
		ctx.save();

		ctx.font = that.rozmiar+"px "+that.czcionka;
		ctx.fillStyle = that.kolor;
		ctx.fillText(that.tekst, that.pozycja.x +  that.offset.x, that.pozycja.y + that.offset.y);

		ctx.restore();
	};
}

function Ekran (objekt, mapa, gracz) {
	this.tlo = objekt.grafika;
	this.tytul = objekt.nazwa;
	this.przyciski = [];
	this.teksty = [];
	this.mapa = mapa;
	this.gracz = gracz;
	this.inniGracze = [];

	this.przesuniecieWidoku = new Wektor2();

	var that = this;

	this.dzialaj = function(e){
		if(e.type === "click")
		{
			var wcisniety = false;
			for(var i=0; i<that.przyciski.length; i++)
			{
				if(e.clientX >= that.przyciski[i].pozycja.x && e.clientX <= (that.przyciski[i].pozycja.x + that.przyciski[i].grafika.width) &&
				   e.clientY >= that.przyciski[i].pozycja.y && e.clientY <= (that.przyciski[i].pozycja.y + that.przyciski[i].grafika.height))
				{
					that.przyciski[i].dzialanie();
					wcisniety = true;
					break;
				}

				if(!wcisniety)
				{
					console.log("zrobic cos ze statkiem");
				}
				wcisniety = false;
			}
		}

		if(e.type === "mousemove")
		{
			gracz.obroc(e.clientX, e.clientY);
		}

		if(e.type === "keypress")
		{
			gracz.ruszaj();
		}
	}

	this.rysuj = function(ctx){

		that.tlo.rysuj(ctx, new Wektor2(0,0), new Wektor2(ctx.szerokosc, ctx.wysokosc));



		if(that.gracz)
			that.przesuniecieWidoku = that.gracz.pozycja;

		if(that.mapa)
			that.mapa.rysuj(ctx);

		if(that.inniGracze.length !== 0)
		{
			for(var i=0; i<that.inniGracze.length; i++)
				that.inniGracze[i].rysuj(ctx);
		}
			
		if(that.gracz)
			that.gracz.rysuj(ctx);

		if(that.przyciski.length !== 0)
		{
			for(var i=0; i<that.przyciski.length; i++)
				that.przyciski[i].rysuj(ctx);
		}

		if(that.teksty.length !== 0)
		{
			for(var i=0; i<that.teksty.length; i++)
				that.teksty[i].rysuj(ctx);
		}
	};
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

function Bron (objekt, moc, szybkostrzelnosc, zasieg, szybkoscPocisku) {
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.moc = moc;
	this.szybkostrzelnosc = szybkostrzelnosc;
	this.zasieg = zasieg;
	this.szybkoscPocisku = szybkoscPocisku;
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

function Pocisk(objekt, pozycja, szybkosc, obrot) {
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.pozycja = pozycja;
	this.szybkosc = szybkosc;
	this.obrot = obrot;
	var that = this;

	this.rysuj = function(ctx){
		if(ctx)
		{
			that.grafika.rysuj(ctx, that.pozycja);
		}
	};
}

function TypStatku(objekt, fizyka) {
	this.id = objekt.id;
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.fizyka = fizyka;
}

function Statek (typ, pozycja, pozycjaMapa, obrot, kolor, nazwa, rozwoj) {
	this.id = 0;



	this.pozycja = pozycja;
	this.obrot = obrot;
	this.grafika = typ.grafika;

	this.typ = typ;
	//this.fizyka = typ.fizyka;

	this.pozycjaMapa = pozycjaMapa;

	this.kolor = kolor;
	this.nazwa = nazwa;
	this.predkosc = 0;
	/*
	this.bronie = rozwoj.bronie;
	this.pancerze = rozwoj.pancerze;
	this.silniki = rozwoj.silniki;
	this.magazyny = rozwoj.magazyny;
	this.extrudery = rozwoj.extrudery;
	*/
	

	var that = this;

	this.obroc = function(x, y){
		that.obrot = Math.atan2(y - (that.grafika.height/2) - that.pozycja.y, x - (that.grafika.width/2) - that.pozycja.x);
	}

	this.rysuj = function(ctx)
	{
		ctx.save();

		that.grafika.rysuj(ctx, that.pozycja, null, null, that.obrot);

		ctx.restore();

	}

	this.ruszaj = function(){
		
		that.predkosc += 1;
		console.log("x " + that.pozycja.x + " y " + that.pozycja.y);
	}

	this.odswiez = function(){
		that.pozycja.x += Math.cos(that.obrot) * that.predkosc; 
		that.pozycja.y += Math.sin(that.obrot) * that.predkosc;
	}


	this.pociski = [];

}


