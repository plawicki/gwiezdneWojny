var space = new Objekt(1, "Nowy", "/img/space.jpg");

var objektgwiazda1 = new Objekt(2, "Niebieska Gwiazda","/img/gwiazda1.png" );

var objektprzycisk = new Objekt(3, "", "/img/przycisk.jpg");

var ukladtyp1 = new UkladTyp(objektgwiazda1, 100);

var uklad1 = new Uklad("Uklad Sloneczny", ukladtyp1, 1200, new Wektor2(100, 100))


var mapa = new Mapa();

mapa.uklady.push(uklad1);

var tekst1 = new Tekst("Hello World!", new Wektor2(10, 50), 'red', 20, 'Arial');

var przycisk1 = new Przycisk(tekst1, objektprzycisk, new Wektor2(100, 100), new Wektor2(150, 200), function(){ alert("HELLO WORLD"); });

// tekst, objekt, pozycja, offset, dzialanie