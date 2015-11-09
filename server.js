/*
/ VISER
/ Mihail Miklasevskij
*/

var express = require('express');
var app 	= express();
var bodyParser = require('body-parser');
var morgan 	= require('morgan'); //logovi pristupa serveru
var mongoose = require('mongoose');

var config 	= require('./config.js');
var path 	= require('path') //sredjuje i optimizuje putanje nodejs.org/api/path.html

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

//staticna lokacija za fajlove - assets, etc
app.use(express.static(__dirname + '/public'));

//API rutiranje 
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

app.get('*', function(req, res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

//pokretanje servera
app.listen(config.port);
console.log('Server started at port: ' + config.port);