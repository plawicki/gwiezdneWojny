var space = new Objekt(1, "Nowy", "/img/space.jpg");

var objektgwiazda1 = new Objekt(2, "Niebieska Gwiazda","/img/gwiazda1.png" );

var ukladtyp1 = new UkladTyp(objektgwiazda1, 100);

var uklad1 = new Uklad("Uklad Sloneczny", ukladtyp1, [], 1200, new Wektor2(100, 100))


var mapa = new Mapa();

mapa.uklady.push(uklad1);
