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
}

Planeta.prototype.rysuj = function(ctx){

	if(ctx && this.grafika)
	{
		this.grafika.rysuj(ctx, this.pozycja, null, null, null, true);
	}
		
};

Planeta.prototype.rysujSrodek = function (ctx) {
		if(ctx && this.grafika)
		{
			//rysowanie duzej planety na srodku ekranu
			this.grafika.rysuj(ctx, new Wektor2(), new Wektor2(ctx.width/2, ctx.height/2), new Wektor2(ctx.width/4, ctx.height/4), null, false);
		}
	};

function Uklad(nazwa, ukladTyp, wielkosc, pozycja) {
	this.nazwa = nazwa;
	this.ukladTyp = ukladTyp;
	this.grafika = ukladTyp.grafika;
	this.planety = [];
	this.wielkosc = wielkosc;
	this.pozycja = pozycja;


}

Uklad.prototype.rysuj = function(ctx){

	if(ctx && this.grafika)
	{
		this.grafika.rysuj(ctx, this.pozycja, null, null, null, true);
	}
	
};

Uklad.prototype.rysujSrodek = function(ctx){
	if(ctx)
	{
		for(var i=0; i<this.planety.length; i++)
		{
			this.planety[i].rysuj(ctx);
		}
	}
};

function Mapa () {
	this.uklady = [];
}

Mapa.prototype.rysuj = function(ctx){
	if(ctx)
	{
		for(var i=0; i<this.uklady.length; i++)
		{
			this.uklady[i].rysuj(ctx);
		}
	}
	
};

function Wejscie (ekran) {
	// przechwytywanie klawiatury + siec
	this.mysz = null;
	this.klawiatura = null;
	this.ekran = ekran;
}

Wejscie.prototype.dzialajMysz = function(){
	this.ekran.dzialaj(this.mysz);
};

Wejscie.prototype.dzialajKlawiatura = function(){
	this.ekran.dzialaj(this.klawiatura);
};

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

Image.prototype.onload = function(){
	console.log("x "+this.width+" y "+this.height);
};

Image.prototype.rysuj = function(ctx, pozycja, rozmiar, offset, obrot, przesunacWzgledemGracza){
	ctx.save();

	if(!offset)
		offset = new Wektor2();

	if(!pozycja)
		pozycja = new Wektor2();

	if(przesunacWzgledemGracza)
	{
		offset = new Wektor2(offset.x - ctx.przesuniecie.x + ctx.srodek.x, offset.y - ctx.przesuniecie.y + ctx.srodek.y);
	}

	if(obrot)
	{
		ctx.translate(pozycja.x + offset.x, pozycja.y + offset.y);

		if(!rozmiar)
			ctx.translate(this.width/2, this.height/2);
		else
			ctx.translate(rozmiar.x/2, rozmiar.y/2);

		ctx.rotate(obrot);
		
		pozycja = new Wektor2();

		if(!rozmiar)
			offset = new Wektor2(-offset.x - this.width/2, -offset.x - this.height/2);
		else
			offset = new Wektor2(-offset.x - rozmiar.x/2, -offset.x - rozmiar.y/2);
	}

	if(rozmiar)
		ctx.drawImage(this, pozycja.x+offset.x, pozycja.y+offset.y, rozmiar.x, rozmiar.y);
	else
		ctx.drawImage(this, pozycja.x+offset.x, pozycja.y+offset.y);

	ctx.restore();
};

function Objekt (id, nazwa, grafika)
{
	this.id = id;
	this.nazwa = nazwa;

	this.grafika = new Image();

	this.grafika.src = grafika;
}


function Przycisk (tekst, objekt, pozycja, offset, dzialanie) {

	// tekst = obj
	this.tekst = tekst;

	this.tekst.pozycja = pozycja;
	this.tekst.offset = offset;

	this.pozycja = pozycja;
	this.dzialanie = dzialanie;
	this.grafika = objekt.grafika;
}

Przycisk.prototype.rysuj = function(ctx){
	this.grafika.rysuj(ctx, this.pozycja);
	this.tekst.rysuj(ctx);
};

function Tekst (tekst, pozycja, kolor, rozmiar, czcionka, offset) {

	// tekst = string

	this.tekst = tekst;
	this.pozycja = pozycja;
	this.kolor = kolor;
	this.rozmiar = rozmiar;
	this.czcionka = czcionka;
	this.offset = offset;
	this.aktywny = false;

	if(!offset)
		this.offset = new Wektor2();
}

Tekst.prototype.rysuj = function(ctx){
	ctx.save();

	ctx.font = this.rozmiar+"px "+this.czcionka;
	ctx.fillStyle = this.kolor;
	ctx.fillText(this.tekst, this.pozycja.x +  this.offset.x, this.pozycja.y + this.offset.y);

	ctx.restore();
};

function ekranTyp(objekt, nazwa){
	this.nazwa = nazwa;
	this.grafika = objekt.grafika;
}

function Ekran (ekranTyp, mapa, gracz) {
	this.tlo = ekranTyp.grafika;
	this.nazwa = ekranTyp.nazwa;
	this.przyciski = [];
	this.teksty = [];
	this.mapa = mapa;
	this.gracz = gracz;
	this.inniGracze = [];
	this.aktywny = false;

	this.przesuniecieWidoku = new Wektor2();
}

Ekran.prototype.odswiez = function(ctx){

	this.gracz.odswiez();

	if(this.gracz.dotarl)
	{
		this.nazwa = "Uklad";
		this.rysujUklad(ctx);
	}
	else
		this.rysuj(ctx);
};

Ekran.prototype.rysujUklad = function(ctx){

	this.tlo.rysuj(ctx, new Wektor2(0,0), new Wektor2(ctx.szerokosc, ctx.wysokosc));
	ctx.przesuniecie = this.gracz.pozycja;

	this.gracz.kierunek.rysujSrodek(ctx);

	if(this.inniGracze.length !== 0)
	{
		for(var i=0; i<this.inniGracze.length; i++)
			this.inniGracze[i].rysuj(ctx);
	}

	if(this.gracz)
		this.gracz.rysuj(ctx);

	if(this.przyciski.length !== 0)
	{
		for(var i=0; i<this.przyciski.length; i++)
			this.przyciski[i].rysuj(ctx);
	}

	if(this.teksty.length !== 0)
	{
		for(var i=0; i<this.teksty.length; i++)
			this.teksty[i].rysuj(ctx);
	}

};

Ekran.prototype.rysuj = function(ctx){

	this.tlo.rysuj(ctx, new Wektor2(0,0), new Wektor2(ctx.szerokosc, ctx.wysokosc));

	ctx.przesuniecie = this.gracz.pozycja;

	if(this.mapa)
		this.mapa.rysuj(ctx);

	if(this.inniGracze.length !== 0)
	{
		for(var i=0; i<this.inniGracze.length; i++)
			this.inniGracze[i].rysuj(ctx);
	}
		
	if(this.gracz)
		this.gracz.rysuj(ctx, new Wektor2(25,25));

	if(this.przyciski.length !== 0)
	{
		for(var i=0; i<this.przyciski.length; i++)
			this.przyciski[i].rysuj(ctx);
	}

	if(this.teksty.length !== 0)
	{
		for(var i=0; i<this.teksty.length; i++)
			this.teksty[i].rysuj(ctx);
	}
};

Ekran.prototype.dzialaj = function(e){
	if(e.type === "click")
	{
		var wcisniety = false;
		for(var i=0; i<this.przyciski.length; i++)
		{
			if(e.clientX >= this.przyciski[i].pozycja.x && e.clientX <= (this.przyciski[i].pozycja.x + this.przyciski[i].grafika.width) && e.clientY >= this.przyciski[i].pozycja.y && e.clientY <= (this.przyciski[i].pozycja.y + this.przyciski[i].grafika.height))
			{
				this.przyciski[i].dzialanie();
				wcisniety = true;
				break;
			}
		}

		// typy ekranow : Uniwersum, Uklad, Menu

		if(!wcisniety)
		{
			if(this.nazwa === "Uniwersum")
			{
				// wyznaczanie kierunku statkowi ku ukladowi gwiezdnemu 

				for(var i=0; i<this.mapa.uklady.length; i++)
				{
					if(e.clientX >= this.mapa.uklady[i].pozycja.x - this.gracz.pozycja.x + this.gracz.srodek.x && e.clientX <= (this.mapa.uklady[i].pozycja.x + this.mapa.uklady[i].grafika.width - this.gracz.pozycja.x + this.gracz.srodek.x) && e.clientY >= this.mapa.uklady[i].pozycja.y - this.gracz.pozycja.y + this.gracz.srodek.y && e.clientY <= (this.mapa.uklady[i].pozycja.y + this.mapa.uklady[i].grafika.height - this.gracz.pozycja.y + this.gracz.srodek.y))
						{
							this.gracz.ruszajDoGwiazdy(this.mapa.uklady[i],e.clientX, e.clientY);
						}
				}
			}
				
			if(this.nazwa === "Uklad")
			{
				console.log("zrobic cos ze statkiem w ukladzie");
				this.gracz.strzel();
			}
				
			
			if(this.nazwa === "Menu")
				console.log("zrobic cos ze statkiem w menu");
		}
		wcisniety = false;
	}

	if(e.type === "mousemove")
	{
		if(this.nazwa === "Uklad")
			this.gracz.obroc(e.clientX, e.clientY);
	}

	if(e.type === "keypress")
	{
		if(this.nazwa === "Uklad")
			this.gracz.ruszaj(e);
	}
};



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

function Pocisk(objekt, pozycja, predkosc, obrot) {
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.pozycja = pozycja;
	this.predkosc = predkosc;
	this.obrot = obrot;
}

Pocisk.prototype.rysuj = function(ctx){
	if(ctx)
	{
		this.grafika.rysuj(ctx, this.pozycja, null, null, null, true);
	}

	//console.log(this.obrot);
};

Pocisk.prototype.odswiez = function(){

	//this.pozycja.x += szybkosc;
	this.pozycja.x += Math.cos(this.obrot) * this.predkosc; 
	this.pozycja.y += Math.sin(this.obrot) * this.predkosc;
};

function TypStatku(objekt, fizyka) {
	this.id = objekt.id;
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.fizyka = fizyka;
}

function Statek (typ, pozycja, pozycjaMapa, obrot, nazwa, rozwoj, srodek) {
	this.id = 0;


	this.typ = typ;
	this.grafika = typ.grafika;
	this.pozycja = pozycja;

	this.obrot = obrot;

	// uniwersum
	this.kierunek = null;
	this.dotarl = false;

	// pomocnicza zmienna ustawiajaca statek na srodku ekranu
	this.srodekEkranu = srodek;


	//this.fizyka = typ.fizyka;

	this.nazwa = nazwa;
	this.predkosc = 0;

	this.pociski = [];
	/*
	this.bronie = rozwoj.bronie;
	this.pancerze = rozwoj.pancerze;
	this.silniki = rozwoj.silniki;
	this.magazyny = rozwoj.magazyny;
	this.extrudery = rozwoj.extrudery;
	*/
}

Statek.prototype.obroc = function(x, y){
	this.obrot = Math.atan2(y - (this.grafika.height/2) - this.srodek.y, x - (this.grafika.width/2) - this.srodek.x);
};

Statek.prototype.rysuj = function(ctx, rozmiar)
{
	ctx.save();

	if(!rozmiar)
		this.grafika.rysuj(ctx, this.srodek, null, null, this.obrot);
	else
		this.grafika.rysuj(ctx, this.srodek, rozmiar, null, this.obrot);

	if(this.pociski && this.pociski.length !== 0)
	{
		for(var i=0; i<this.pociski.length; i++)
		{
			this.pociski[i].rysuj(ctx);
		}
	}
	ctx.restore();

};

Statek.prototype.ruszajDoGwiazdy = function(dokad, x, y)
{
	this.obroc(x,y);

	this.ruszaj("przod");
	this.kierunek = dokad;
};

Statek.prototype.ruszaj = function(e){

	if(e === "przod")
	{
		this.predkosc = 1;
	}

	if(e === "stop")
	{
		this.predkosc = 0;
	}
	
	if(e.keyCode === 119)
		this.predkosc += 1;

	if(e.keyCode === 115)
		if(this.predkosc >= 0.0)
		{
			this.predkosc -= 1;
			
			if(this.predkosc <= 0.0 && this.predkosc >= -1)
				this.predkosc = 0;
		}
};

Statek.prototype.strzel = function(){

	var pocisk = new Pocisk(objektgwiazda1, $.extend( true, new Wektor2(), this.pozycja ), 5, this.obrot);
	this.pociski.push(pocisk);
};

Statek.prototype.odswiez = function(){
	this.pozycja.x += Math.cos(this.obrot) * this.predkosc; 
	this.pozycja.y += Math.sin(this.obrot) * this.predkosc;

	if(this.kierunek && this.pozycja.x >= this.kierunek.pozycja.x - 32 && this.pozycja.x <= this.kierunek.pozycja.x + 32 && this.pozycja.y >= this.kierunek.pozycja.y - 32 && this.pozycja.y <= this.kierunek.pozycja.y + 32)
	{
		if(this.dotarl === false)
		{
			this.ruszaj("stop");
			this.dotarl = true;
		}
	}

	if(this.pociski && this.pociski.length !== 0)
	{
		for(var i=0; i<this.pociski.length; i++)
		{
			this.pociski[i].odswiez();
		}
	}

};