var http = require('http');
var routes = require('./routes');
var express = require('express');
var app = express();
var connect = require('connect');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var socketIo = require('socket.io');
var passportSocketIo = require('passport.socketio');
var sessionStore = new connect.session.MemoryStore();

var sessionSecret = 'wielkiSekret44';
var sessionKey = 'connect.sid';
var server;
var sio;

// roomchaty i wpisy
//var history = {"roomGlobal": []};
//var rooms = [{id: "roomGlobal", name: "Global"}];

// uklady i planety
var gracze = {};
var uklady = [];
var iloscGraczy = 1;

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function Planeta(nazwa, typ, wielkosc, x, y){
    var json = 
    {
        "nazwa": nazwa,
        "typ": typ,
        "wielkosc": wielkosc,
        "pozycja": {"x": x, "y": y}
    }
    return json
}

function Uklad(nazwa, typ, wielkosc, x, y, planety){
    var json = 
    {
        "nazwa": nazwa,
        "typ": typ,
        "wielkosc": wielkosc,
        "pozycja": {"x": x, "y": y},
        "planety": planety
    }
    return json
}

function generujUklad(){
    // polozenie od (-100, -100)*iloscGraczy do (100,100)*iloscGraczy
    var x = Math.floor(Math.random() * (100*iloscGraczy + 100*iloscGraczy + 1)) - 100*iloscGraczy;
    var y = Math.floor(Math.random() * (100*iloscGraczy + 100*iloscGraczy + 1)) - 100*iloscGraczy;

    //typy ukladow: 4, typt planet: 4, from 0 to 3
    var typUkladu = Math.floor(Math.random() * (3 - 0 + 1)) + 0;

    //randomowe nazwy ukladow i planet
    var nazwaUkladu = makeid();

    //randomowe wielkosci ukladu i planet
    var wielkoscUkladu = Math.floor(Math.random() * (1500 - 1100 + 1)) + 1100;

    //zawsze wstawiaj slonce

    //randoowa ilosc planet od 1 do 5
    var iloscPlanet = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

    var planety = [];

    for(var i=0; i<iloscPlanet; i++)
        planety.push(generujPlanete(wielkoscUkladu));

    //gwiazda
    var wielkoscGwiazdy = Math.floor(Math.random() * (100 - 80 + 1)) + 80;
    planety.push(Planeta(makeid(), typUkladu+4, wielkoscGwiazdy, -wielkoscGwiazdy*13/2, -wielkoscGwiazdy*13/2));

    return Uklad(nazwaUkladu, typUkladu, wielkoscUkladu, x, y, planety);
}

function generujPlanete(rc){

    //helpery
    var a=2*3.14*Math.random();
    var r=Math.sqrt(Math.random());

    // x i y musza zawierac sie w promieniu ukladu
    var x=Math.floor((rc*r)*Math.cos(a));
    var y=Math.floor((rc*r)*Math.sin(a));

    var typPlanety = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
    var nazwaPlanety = makeid();
    var wielkoscPlanety = Math.floor(Math.random() * (60 - 30 + 1)) + 30;

    return Planeta(nazwaPlanety, typPlanety, wielkoscPlanety, x, y);
}

// Konfiguracja passport.js
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        if ((username === 'admin') && (password === 'tajne')) {
            console.log("Udane logowanie...");
            return done(null, {
                username: username,
                password: password,
            });
        } else {
            return done(null, false);
        }
    }
));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.cookieParser());
app.use(express.urlencoded());
app.use(express.session({
    store: sessionStore,
    key: sessionKey,
    secret: sessionSecret
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(express.static("bower_components"));

app.get('/', routes.login)

app.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login',
    }),
    routes.authorized
);

app.get('/logout', function (req, res) {
    console.log('Wylogowanie...')
    req.logout();
    res.redirect('/login');
});

server = http.createServer(app);
sio = socketIo.listen(server);

var onAuthorizeSuccess = function (data, accept) {
    console.log('Udane połączenie z socket.io');
    accept(null, true);
};

var onAuthorizeFail = function (data, message, error, accept) {
    if (error) {
        throw new Error(message);
    }
    console.log('Nieudane połączenie z socket.io:', message);
    accept(null, false);
};

sio.set('authorization', passportSocketIo.authorize({
    passport: passport,
    cookieParser: express.cookieParser,
    key: sessionKey, // nazwa ciasteczka, w którym express/connect przechowuje identyfikator sesji
    secret: sessionSecret,
    store: sessionStore,
    success: onAuthorizeSuccess,
    fail: onAuthorizeFail
}));

sio.set('log level', 2); // 3 == DEBUG, 2 == INFO, 1 == WARN, 0 == ERROR

sio.sockets.on('connection', function (socket) {

    // gdy polaczony zwieksz ilosc graczy i generuj nowy uklad
    socket.on("addPlayer", function(gracz){

        iloscGraczy++;

        uklady.push(generujUklad());
        gracze[gracz.nazwa] = gracz;

        socket.emit('uklady', uklady);
        socket.broadcast.emit('uklady', uklady);
    })

    socket.join("global");
    socket.set("uklad", "global");
    socket.emit("uklady", uklady);

    socket.on("changeStar", function(data){
        socket.get('uklad', function (err, uklad) {
            socket.leave(uklad);
        });

        socket.join(data.nazwaUkladu);
        socket.set('uklad',data.nazwaUkladu);

        for(var i=0; i<gracze.length; i++)
        {
            if(gracze[i].kierunek == data.nazwaUkladu)
                socket.emit('innyGracz', gracze[i]);
        }

        // jesli wylecielismy poza jakis uklad, nie informuj o tym nikogo
        if(data.nazwaUkladu != "global")
        {   
            var gracz = gracze[data.gracz];
            gracz.przeciwnik = true;
            socket.broadcast.emit('innyGracz', gracz);
            console.log("Przeslano info o " + gracze[data.gracz].nazwa + " do ukladu " + data.nazwaUkladu)
        }

    });
    /*
        LOGIKA
        
        ==== uklady gwiezdne dzialaja jak kanaly w czacie
        ==== mapa jest generowana na starcie sererwera
        ==== mapa zmienia sie za kazdym razem gdy ktos wchodzi do gry (dodaje sie uklad)
        
        Mozliwosci:
        1. gracz wchodzi do gry (generuje sobie playera w kliencie) i przesyla go do serwera
        2. gracz otrzymuje mape
        3. gracz wchodzi do ukladu, przesylane sa informacje na temat graczy do niego, on jest wysylany do innych graczy (wysylanie wiadmosci w czacie)
        4. gracz umiera to wywala go do logowania i usuwa jego statek
        5. gracz wylogowywuje sie
    */

    //1.

    // generuj mape

    // socket.emit('mapa', mapa)

    var address = socket.handshake.address;

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    var current_date = year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

    console.log(address.address + " logged " + current_date);
});

server.listen(80, function () {
    console.log('Serwer pod adresem http://localhost:80/');
});