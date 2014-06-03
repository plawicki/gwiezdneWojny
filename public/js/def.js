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
	this.surowce = planetaTyp.surowce;
	this.wielkosc = wielkosc;
	this.pozycja = pozycja;
	this.fizyka = new Fizyka(pozycja, planetaTyp.grafika.width,  planetaTyp.grafika.height);

	this.wydobyc = 0; // zmienna tymczasowa, po restarcie serwera jest zerowana
}

Planeta.prototype.rysuj = function(ctx){

	if(ctx && this.grafika)
	{
		//ctx, pozycja, rozmiar, offset, obrot, przesunacWzgledemGracza)
		this.skala = new Wektor2(this.grafika.width * this.wielkosc/40, this.grafika.height * this.wielkosc/40);
		this.grafika.rysuj(ctx, this.pozycja, this.skala, null, null, true);
	}

	// fizyka fix
	if(this.fizyka.szerokosc === 0)
	{
		this.fizyka.szerokosc = this.skala.x;
		this.fizyka.wysokosc = this.skala.y;
	}
		
};


function Uklad(nazwa, ukladTyp, wielkosc, pozycja, planety) {
	this.nazwa = nazwa;
	this.ukladTyp = ukladTyp;
	this.grafika = ukladTyp.grafika;

	if(planety)
		this.planety = planety;
	else
		this.planety = [];

	this.wielkosc = wielkosc;
	this.pozycja = pozycja;
	this.fizyka = new Fizyka(this.pozycja, 0, 0);


}

Uklad.prototype.rysuj = function(ctx){
	//fizyka fix
	this.fizyka.szerokosc = this.grafika.width;
	this.fizyka.wysokosc = this.grafika.height;
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

function Fizyka (pozycja, szerokosc, wysokosc) {

	this.pozycja = pozycja; // referencja na wektor (nie trzeba updateowac)
	this.szerokosc = szerokosc;
	this.wysokosc = wysokosc;

	this.sprawdz = function(zkim) {

			// czy ktorys z 4 wierzcholkow zawiera sie w innym prostokacie 
			// 1 1
			// 1 1
		if(	(zkim.pozycja.x >= this.pozycja.x && zkim.pozycja.x <= this.pozycja.x + this.szerokosc &&
			 zkim.pozycja.y >= this.pozycja.y && zkim.pozycja.y <= this.pozycja.y + this.wysokosc) ||
			(zkim.pozycja.x + zkim.szerokosc >= this.pozycja.x && zkim.pozycja.x + zkim.szerokosc <= this.pozycja.x + this.szerokosc &&
			 zkim.pozycja.y >= this.pozycja.y && zkim.pozycja.y <= this.pozycja.y + this.wysokosc) ||
			(zkim.pozycja.x + zkim.szerokosc >= this.pozycja.x && zkim.pozycja.x + zkim.szerokosc <= this.pozycja.x + this.szerokosc &&
			 zkim.pozycja.y + zkim.pozycja.wysokosc >= this.pozycja.y && zkim.pozycja.y + zkim.pozycja.wysokosc <= this.pozycja.y + this.wysokosc) ||
			(zkim.pozycja.x >= this.pozycja.x && zkim.pozycja.x <= this.pozycja.x + this.szerokosc &&
			 zkim.pozycja.y + zkim.pozycja.wysokosc >= this.pozycja.y && zkim.pozycja.y + zkim.pozycja.wysokosc <= this.pozycja.y + this.wysokosc)
		  )	
			return true;
		else
			return false;
	};
}

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
		
		ctx.translate(-pozycja.x - offset.x, -pozycja.y - offset.y);

		if(!rozmiar)
			ctx.translate(-this.width/2, -this.height/2);
		else
			ctx.translate(-rozmiar.x/2, -rozmiar.y/2);
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
	this.aktywny = true;

	this.przesuniecieWidoku = new Wektor2();
}

Ekran.prototype.odswiez = function(ctx){

	for(var i=0; i < this.inniGracze.length; i++)
	{
		this.inniGracze[i].odswiez();
		if(this.inniGracze[i] && this.inniGracze[i].pociski)
		{
			for(var j=0; j < this.inniGracze[i].pociski.length; j++)
			{
				if(this.gracz.fizyka.sprawdz(this.inniGracze[i].pociski[j].fizyka))
				{
					this.gracz.hp -= this.inniGracze[i].pociski[j].moc; // jesli jakis pocisk uderzy w gracza odejmuje mu zycie o swoja energie
					this.inniGracze[i].pociski[j].doSkasowania = true;
				}
			}
		}

		if(this.inniGracze[i] && this.gracz.pociski)
		{
			for(var j=0; j < this.gracz.pociski.length; j++)
			{
				if(this.inniGracze[i].fizyka.sprawdz(this.gracz.pociski[j].fizyka))
				{
					this.inniGracze[i].hp -= this.gracz.pociski[j].moc; // jesli jakis pocisk uderzy w gracza odejmuje mu zycie o swoja energie
					this.gracz.pociski[j].doSkasowania = true;
				}
			}
		}
	}

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

	/*
	if(this.inniGracze.length !== 0)
	{
		for(var i=0; i<this.inniGracze.length; i++)
			this.inniGracze[i].rysuj(ctx);
	}
	*/

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
			if(this.nazwa == "Uniwersum")
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
				
			if(this.nazwa == "Uklad")
			{
				console.log("zrobic cos ze statkiem w ukladzie");



				this.gracz.strzel();
			}
				
			
			if(this.nazwa == "Menu")
				console.log("zrobic cos ze statkiem w menu");
		}
		wcisniety = false;
	}

	if(e.type === "mousemove")
	{
		if(this.nazwa == "Uklad")
			this.gracz.obroc(e.clientX, e.clientY);
	}

	if(e.type === "keypress")
	{
		if(this.nazwa == "Uklad")
			this.gracz.ruszaj(e);
	}
};

Ekran.prototype.laduj = function(){
	// sprawdzenie czy statek jest nad jakas planeta, jesli tak mozna ladaowac

	for(var i=0; i<this.gracz.kierunek.planety.length; i++)
	{
		if(this.gracz.kierunek.planety[i].fizyka.sprawdz(this.gracz.fizyka) === true) // ciekawostka gdyby nie porownanie ===true, funkcja sprawdzala czy != null XD
		{
			this.gracz.planeta = this.gracz.kierunek.planety[i];
			this.gracz.ruszaj("stop");
			continue;
		}
	}
}

Ekran.prototype.odlec = function(){
	// sprawdzenie czy statek jest nad jakas planeta, jesli tak mozna ladaowac
	
	this.gracz.planeta = null;
}

// mozna budowac all chyba ze sie nie ma surowcow, im wiekszy statek tym wiekszy magazyn moze powstac
function Rozwoj (bronie, pancerze, silniki, magazyny, extrudery, surowce, posiadaneSurowce, pBronie, pPancerze, pSilniki, pMagazyny, pExtrudery, typStatku) {
	// referencja do typu statku, w zaleznosci od typu - wiecej mozliwosci
	this.typStatku = typStatku;

	this.surowce = surowce;

	if(posiadaneSurowce)
		this.posiadaneSurowce = posiadaneSurowce;
	else
		this.posiadaneSurowce = [0, 0, 0, 0]; // zawsze sa 4 surowce, liczby sa iloscia surowcow

	if(pBronie)
		this.posiadaneBronie = pBronie;
	else
		this.posiadaneBronie = [];
	this.zdobywalneBronie = bronie;

	this.aktualnaBron = null;

	this.aktualnyPancerz = null;

	if(pPancerze)
	{
		this.posiadanePancerze = pPancerze;
		this.aktualnyPancerz = pPancerze[pPancerze.length-1];
	}
	else
		this.posiadanePancerze = [];
	
	this.zdobywalnePancerze = pancerze;


	this.aktualnySilnik = null;

	if(pSilniki)
	{
		this.posiadaneSilniki = pSilniki;
		this.aktualnySilnik = pSilniki[pSilniki.length-1];
	}
	else
		this.posiadaneSilniki = [];

	this.zdobywalneSilniki = silniki;

	this.aktualnyMagazyn = null;

	if(pMagazyny)
	{
		this.posiadaneMagazyny = pMagazyny;
		this.aktualnyMagazyn = pMagazyny[pMagazyny.length-1];
	}
	else
		this.posiadaneMagazyny = [];

	this.zdobywalneMagazyny = magazyny;

	this.aktualnyExtruder = null;

	if(pExtrudery)
		this.posiadaneExtrudery = pExtrudery;
	else
		this.posiadaneExtrudery = [];

	this.zdobywalneExtrudery = extrudery;
}

Rozwoj.prototype.dodajSurowiec = function(surowiec){

	if(this.aktualnyMagazyn && this.aktualnyExtruder)
	{
		for(var i=0; i<this.surowce.length; i++)
		{
			if(surowiec.nazwa === this.surowce[i].nazwa && this.posiadaneSurowce[i] < this.aktualnyMagazyn.pojemnosc && this.aktualnyExtruder.nazwa === surowiec.wymaganyExtruder.nazwa)
			{
				this.posiadaneSurowce[i]++;
				return 1;
			}
		}
	}
}	

Rozwoj.prototype.kup = function(ulepszenie){

	var pass = false;

	for(var i=0; i<ulepszenie.wymaganeSurowce.length; i++)
	{
		if(ulepszenie.wymaganeSurowce[i].nazwa === this.surowce[0].nazwa)
		{
			if(this.posiadaneSurowce[0] > 0)
			{
				pass = true;
			}
			else
				pass = false;
		}
		if(ulepszenie === this.surowce[1].nazwa)
		{
			if(this.posiadaneSurowce[1] > 0)
				pass = true;
			else
				pass = false;
		}
		if(ulepszenie === this.surowce[2].nazwa)
		{
			if(this.posiadaneSurowce[2] > 0)
				pass = true;
			else
				pass = false;
		}
		if(ulepszenie === this.surowce[3].nazwa)
		{
			if(this.posiadaneSurowce[3] > 0)
				pass = true;
			else
				pass = false;
		}
	}

	if(pass === true)
	{
		if(ulepszenie instanceof Bron)
		{
			this.aktualnaBron = ulepszenie;
			this.posiadaneBronie.push(ulepszenie);
		}
		if(ulepszenie instanceof Magazyn)
		{
			this.aktualnyMagazyn = ulepszenie;
		}
		if(ulepszenie instanceof Extruder)
		{
			this.aktualnyExtruder = ulepszenie;
			this.posiadaneExtrudery.push(ulepszenie);
		}
		if(ulepszenie instanceof Pancerz)
		{
			this.aktualnyPancerz = ulepszenie;
			return 1;
		}
		if(ulepszenie instanceof Silnik)
		{
			this.aktualnySilnik = ulepszenie;
		}
	}
}

function Bron (objekt, moc, szybkostrzelnosc, zasieg, szybkoscPocisku, objektPocisku, wymaganeSurowce) {
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.moc = moc;
	this.szybkostrzelnosc = szybkostrzelnosc;
	this.zasieg = zasieg;
	this.szybkoscPocisku = szybkoscPocisku;
	this.objektPocisku = objektPocisku; 
	this.wymaganeSurowce = wymaganeSurowce;
}

function Pancerz (objekt, wytrzymalosc, wymaganeSurowce) {
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.wytrzymalosc = wytrzymalosc;
	this.wymaganeSurowce = wymaganeSurowce;
}

function Silnik(objekt, szybkosc, przyspieszenie, wymaganeSurowce) {
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.szybkosc = szybkosc;
	this.przyspieszenie = przyspieszenie;
	this.wymaganeSurowce = wymaganeSurowce;
}

function Surowiec (objekt, wymaganyExtruder) {
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.wymaganyExtruder = wymaganyExtruder;
}

function Magazyn(objekt, pojemnosc, wymaganeSurowce) {
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.pojemnosc = pojemnosc;
	this.wymaganeSurowce = wymaganeSurowce;
}

function Extruder(objekt, wymaganeSurowce) {
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.wymaganeSurowce = wymaganeSurowce;
}

function Pocisk(bron, pozycja, predkosc, obrot) {
	this.nazwa = bron.objektPocisku.nazwa;
	this.grafika = bron.objektPocisku.grafika;
	this.fizyka = new Fizyka(pozycja, 0, 0);
	this.pozycja = pozycja;
	this.predkosc = predkosc;
	this.obrot = obrot;
	this.zasieg = bron.zasieg;
	this.moc = bron.moc;
	this.odleglosc = 0;
	this.doSkasowania = false;
}

Pocisk.prototype.rysuj = function(ctx){
	if(ctx)
	{
		// ctx, pozycja, rozmiar, offset, obrot, przesunacWzgledemGracza
		this.grafika.rysuj(ctx, this.pozycja, null, null, this.obrot, true);
	}
};

Pocisk.prototype.odswiez = function(){

	if(this.fizyka.szerokosc === 0)
	{
		this.fizyka.szerokosc = this.grafika.width;
		this.fizyka.wysokosc = this.grafika.height;
	}

	//this.pozycja.x += szybkosc;
	this.pozycja.x += Math.cos(this.obrot) * this.predkosc; 
	this.pozycja.y += Math.sin(this.obrot) * this.predkosc;
	this.odleglosc++
	if(this.odleglosc >= this.zasieg)
		this.doSkasowania = true;
};

function TypStatku(objekt, hp, predkosc) {
	this.id = objekt.id;
	this.nazwa = objekt.nazwa;
	this.grafika = objekt.grafika;
	this.hp = hp;
	this.predkosc = predkosc;
}



function Statek (typ, pozycja, kierunek, obrot, nazwa, rozwoj, srodek, przeciwnik) {
	this.id = 0;

	// zmienna bool, zachowanie jak bot czy gracz
	this.bot = przeciwnik;

	this.typ = typ;

	this.rozwoj = rozwoj;

	if(this.rozwoj)
		this.rozwoj.typStatku = typ;

	this.hp = 100;
	this.hp += typ.hp;

	if(rozwoj)
		this.hp += rozwoj.aktualnyPancerz.wytrzymalosc;
	this.isDead = false;

	this.typ = typ;
	this.grafika = typ.grafika;
	this.pozycja = pozycja;
	this.fizyka = new Fizyka(this.pozycja, typ.grafika.width, typ.grafika.height);

	this.obrot = obrot;

	// uniwersum
	if(kierunek)
		this.kierunek = kierunek;
	else
		this.kierunek = null; // uklad w ktorym sie znajduje

	this.planeta = null; // planeta na ktorej laduje
	this.dotarl = false;

	// pomocnicza zmienna ustawiajaca statek na srodku ekranu
	if(srodek)
		this.srodek = srodek;
	else
		this.srodek = new Wektor2();

	//this.fizyka = typ.fizyka;

	this.nazwa = nazwa;
	this.maxPredkosc = this.rozwoj.typStatku.predkosc + this.rozwoj.aktualnySilnik.szybkosc;
	this.predkosc = 0;

	this.pociski = [];



	this.timer = 0;
}

Statek.prototype.kupUlepszenie = function(ulepszenie){

	// jesli akutalizujemy pancerz trzeba dodac hp
	if(this.rozwoj.kup(ulepszenie) === 1)
		this.hp += this.rozwoj.aktualnyPancerz.wytrzymalosc;
}

Statek.prototype.obroc = function(x, y){
	this.obrot = Math.atan2(y - (this.grafika.height/2) - this.srodek.y, x - (this.grafika.width/2) - this.srodek.x);
};

Statek.prototype.rysuj = function(ctx, rozmiar)
{
	ctx.save();

	if(this.bot)
	{
		if(!rozmiar)
			this.grafika.rysuj(ctx, this.pozycja, null, null, this.obrot, true);
		else
			this.grafika.rysuj(ctx, this.pozycja, rozmiar, null, this.obrot, true);

		if(this.pociski && this.pociski.length !== 0)
		{
			for(var i=0; i<this.pociski.length; i++)
			{
				this.pociski[i].rysuj(ctx);
			}
		}
	}
	else
	{
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
		if(Math.floor(this.predkosc) < this.maxPredkosc)
			this.predkosc = this.rozwoj.aktualnySilnik.przyspieszenie;
	}

	if(e === "stop")
	{
		this.predkosc = 0;
	}

	if(e.keyCode === 119)
		if(Math.floor(this.predkosc) < this.maxPredkosc)
			this.predkosc += this.rozwoj.aktualnySilnik.przyspieszenie;

	if(e.keyCode === 115)
		if(this.predkosc >= 0.0)
		{
			this.predkosc -= this.rozwoj.aktualnySilnik.przyspieszenie;
			
			if(this.predkosc <= 0.0 && this.predkosc >= -1)
				this.predkosc = 0;
		}
};

Statek.prototype.strzel = function(){
	if(this.rozwoj.aktualnaBron && this.timer >= this.rozwoj.aktualnaBron.szybkostrzelnosc)
	{
		var pocisk = new Pocisk(this.rozwoj.aktualnaBron, new Wektor2(this.pozycja.x, this.pozycja.y + this.grafika.height/2), this.rozwoj.aktualnaBron.szybkoscPocisku, this.obrot)
		this.pociski.push(pocisk);
		this.timer = 0;
	}
};

Statek.prototype.wydobywaj = function(){

	if(this.planeta && this.rozwoj.aktualnyMagazyn && this.rozwoj.aktualnyExtruder)
	{

		for(var i=0; i<this.planeta.surowce.length; i++)
		{
			// random number of surowiec

			// wielkosc planety wyznacza ile razy mozna na niej wydobywac

			var s = Math.floor(Math.random() * (5 - 0) + 0); // stopien trudnosci wydobycia

			if(s === 4 && this.planeta.wydobyc <= this.planeta.wielkosc/10)
			{
				if(this.rozwoj.dodajSurowiec(this.planeta.surowce[i]) === 1)
					this.planeta.wydobyc++;
			}
		}
	}
}

Statek.prototype.wejdzDoUkladu = function(){
	if(this.kierunek && this.pozycja.x >= this.kierunek.pozycja.x - 32 && this.pozycja.x <= this.kierunek.pozycja.x + 32 && this.pozycja.y >= this.kierunek.pozycja.y - 32 && this.pozycja.y <= this.kierunek.pozycja.y + 32)
	{
		if(this.dotarl === false)
		{
			this.dotarl = true;
			this.pozycja = new Wektor2();
		}
	}
}

Statek.prototype.wyjdzZUkladu = function(){
	if(Math.sqrt(this.pozycja.x*this.pozycja.x +this.pozycja.y*this.pozycja.y) >= this.kierunek.wielkosc)
	{
		console.log("mozna wyjsc")
		this.dotarl = false;
		this.ruszaj("stop");

		this.pozycja.x = this.kierunek.pozycja.x + 35;
		this.pozycja.y = this.kierunek.pozycja.y;
	}
}

Statek.prototype.odswiez = function(){

	// fizyka fix
	if(this.fizyka.szerokosc === 0)
	{
		this.fizyka.szerokosc = this.grafika.width;
		this.fizyka.wysokosc = this.grafika.height;
	}

	this.fizyka.pozycja.x = this.pozycja.x;
	this.fizyka.pozycja.y = this.pozycja.y;

	if(this.isDead) // logika co jesli nie zyje
		return 0;

	// pomocnicza do liczenia szybkostrzelnosci statku
	this.timer++;

	this.pozycja.x += Math.cos(this.obrot) * this.predkosc; 
	this.pozycja.y += Math.sin(this.obrot) * this.predkosc;

	if(this.kierunek && this.pozycja.x >= this.kierunek.pozycja.x - 32 && this.pozycja.x <= this.kierunek.pozycja.x + 32 && this.pozycja.y >= this.kierunek.pozycja.y - 32 && this.pozycja.y <= this.kierunek.pozycja.y + 32)
	{
		if(this.dotarl === false)
		{
			this.ruszaj("stop");
		}
	}

	if(this.pociski && this.pociski.length !== 0)
	{
		for(var i=0; i<this.pociski.length; i++)
		{
			if(this.pociski[i].doSkasowania)
			{
				this.pociski.splice(i, 1);
				continue;
			}
			if(i < this.pociski.length)
				this.pociski[i].odswiez();
		}
	}

};