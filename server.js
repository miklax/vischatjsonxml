/*
/ VISER
/ Mihail Miklasevskij
*/

var express = require('express');
var app 	= express();
var bodyParser = require('body-parser');
var morgan 	= require('morgan'); //logovi pristupa serveru
var mongoose = require('moongose');

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