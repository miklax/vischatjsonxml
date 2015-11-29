/*
/ VISER
/ Mihail Miklasevskij
*/

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var bodyParser = require('body-parser');
var morgan 	= require('morgan'); //logovi pristupa serveru
var mongoose = require('mongoose');
var path 	= require('path'); //sredjuje i optimizuje putanje nodejs.org/api/path.html

var config 	= require('./config.js');
var History = require('./app/models/jsonChatModel.js');
//KONFIGURACIJA - middlewares

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//CORS
app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

//log u konzolu sa zahtevima (get, update, etc)
app.use(morgan('dev'));

//konekcija na bazu
mongoose.connect(config.database);


io.sockets.on('connection', function(socket){
    socket.on('send msg', function(dataObject){

				var newHistory = new History(dataObject);
				newHistory.save(function(err){
					if(err) throw err;
					else
      			io.sockets.emit('get msg', dataObject);
				});

    });
});

//staticna lokacija za fajlove - assets, etc
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));

//API USERS rutiranje
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

//APU JSON Chat
var apiJsonRoutes = require('./app/routes/apiJsonChat')(app, express);
app.use('/chat', apiJsonRoutes);

app.get('*', function(req, res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

server.listen(config.port, function () {
  console.log('Server started at port %d', config.port);
	console.log('=======================================');
});

//pokretanje servera
// app.listen(config.port);
// console.log('=======================================');
// console.log('Server started at port: ' + config.port);
