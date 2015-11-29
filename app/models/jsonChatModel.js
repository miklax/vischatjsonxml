var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ChatSchema 	= new Schema({
	timeStamp: Date, //mozda odmah datenow
  username: String,
  msgLine: String
});

module.exports = mongoose.model('JsonChat', ChatSchema, 'history');
