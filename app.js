var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var less = require('less-middleware');
var redis = require('redis');
var rClient = redis.createClient();
var connect = require('connect');
var passport = require('passport');
var socketio = require("socket.io");
var passportSocketIo = require('passport.socketio');
var LocalStrategy = require('passport-local').Strategy;
var sessionStore = new connect.session.MemoryStore();

var sessionSecret = '123hbh321h3jHhjj123459900dsad09dad78s';
var sessionKey = 'connect.sid';

///socket io i server create
var app = express();
http = http.createServer(app);

var sio = socketio.listen(http, { log: false });

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
    };
    return json;
}

function Uklad(nazwa, typ, wielkosc, x, y, planety){
    var json = 
    {
        "nazwa": nazwa,
        "typ": typ,
        "wielkosc": wielkosc,
        "pozycja": {"x": x, "y": y},
        "planety": planety
    };
    return json;
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
        rClient.hgetall(username, function (err, data) {
            if (data && data.pass && password === data.pass.toString()) {
            console.log("Udane logowanie...");
            return done(null, {
                username: username,
                password: password
            });
            } else {
                return done(null, false);
            }
        });
    }
));

 //express + passport
    app.use(express.cookieParser());
    app.use(express.urlencoded());
    app.use(express.session({
        store: sessionStore,
        key: sessionKey,
        secret: sessionSecret
    }));
    app.use(passport.initialize());
    app.use(passport.session());

//EXPRESS CONF
app.configure(function () {
    app.set('port', process.env.PORT || 80);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser('bardzo tajne aqq'));
    app.use(express.session());
    app.use(app.router);

        // „middleware” obsługujące LESS-a
    // samo kompiluje pliki less-owe do CSS
    // a do tego pliki wynikowe kompresuje
    // Opis parametrów:
    //
    // https://github.com/emberfeather/less.js-middleware
    app.use(less({
        src: path.join(__dirname, 'less'),
        dest: path.join(__dirname, 'public/css'),
        prefix: '/css',
        compress: true
    }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'bower_components/jquery/dist')));
   

});

//Routes
app.get('/', routes.login);
app.get('/register', routes.register);
app.post('/',
    passport.authenticate('local', {
        failureRedirect: '/',
    }),
    routes.authorized
);

app.post('/register',function(req, res){
    if(req.body.password == req.body.password1 && req.body.ship >= 0 && req.body.ship <= 2)
     rClient.hmset(req.body.username, "pass", req.body.password,"type", req.body.ship, function(){
        res.redirect('/');
     });
    else{
        res.redirect('/register');
    }
});

app.get('/logout', function (req, res) {
    console.log('Wylogowanie...');
    req.logout();
    res.redirect('/');
});

//server start
http.listen(app.get('port'), function () {
    console.log("Serwer nasłuchuje na porcie " + app.get('port'));
});

//SOCKET PASSPORT 
var onAuthorizeSuccess = function (data, accept) {
    accept( null, true );
};

var onAuthorizeFail = function (data, message, error, accept) {
    if ( error ) {
        throw new Error( message );
    }
    accept( null, false );
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

sio.sockets.on('connection', function (socket) {

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

    // gdy polaczony zwieksz ilosc graczy i generuj nowy uklad
    socket.on("addPlayer", function(gracz){

        iloscGraczy++;

        uklady.push(generujUklad());
        gracze[gracz.nazwa] = gracz;

        socket.emit('uklady', uklady);
        socket.broadcast.emit('uklady', uklady);
    });

    socket.join("global");
    socket.set("uklad", "global");
    socket.emit("uklady", uklady);

    socket.on("changeStar", function(data){
        socket.get('uklad', function (err, uklad) {
            // powiedz kazdemu kogo miales w ukladzie, ze juz cie tam nie ma

            sio.sockets.in(uklad).emit('innyOdlatuje', data.gracz);

            socket.leave(uklad);
        });

        socket.join(data.nazwaUkladu);
        socket.set('uklad',data.nazwaUkladu);
        gracze[data.gracz].kierunek = data.nazwaUkladu;

        socket.get('uklad', function (err, uklad) {

            // jesli wylecielismy poza jakis uklad, nie informuj o tym nikogo
            if(data.nazwaUkladu != "global")
            {   
                var gracz = gracze[data.gracz];
                gracz.przeciwnik = true;

                sio.sockets.in(uklad).emit('innyGracz', gracz);

                
                // foreach
                Object.keys(gracze).forEach(function(key) {

                    if(gracze[key].kierunek === data.nazwaUkladu)
                        socket.emit('innyGracz', gracze[key]);
                });


                console.log("Przeslano info o " + gracze[data.gracz].nazwa + " do ukladu " + data.nazwaUkladu);
            }
            else
            {
                sio.sockets.in(uklad).emit('innyOdlatuje', data.gracz);
            }

         });

    });

    socket.on("ruch", function(data){

        socket.get('uklad', function (err, uklad) {
            gracze[data.gracz].pozycja = data.pozycja;
            gracze[data.gracz].obrot = data.obrot;
            gracze[data.gracz].predkosc = data.predkosc;

            sio.sockets.in(uklad).emit("innyRuch", data);
        });
    });

    socket.on("strzelanie", function(data){

        socket.get('uklad', function (err, uklad) {

            sio.sockets.in(uklad).emit("innyStrzal", data);
        });
    });

    socket.on("smierc", function(gracz){

        socket.get('uklad', function (err, uklad) {

            sio.sockets.in(uklad).emit("innySmierc", gracz);
            socket.set('uklad', 'global');
            socket.leave(uklad);
        });

        delete gracze[gracz];

        socket.disconnect();

    });


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