var bodyParser	= require('body-parser');
var jwt 		= require('jsonwebtoken');

var User 		= require('../models/user');
var config 		= require('../../config');

var secretKey = config.secret

module.exports = function(app, express){

	var apiRouter = express.Router();

	//atentikacija korisnika
	apiRouter.post('/authenticate', function(req, res) {

	  // pronadji korisnika
	  User.findOne({
	    username: req.body.username
	  }).select('name username password').exec(function(err, user) {

	    if (err) throw err;

	    // user not found
	    if (!user) {
	      res.json({
	      	success: false,
	      	message: 'User not found.'
	    	});
	    } else if (user) {

	      // provera lozinke
	      var validPassword = user.comparePassword(req.body.password);
	      if (!validPassword) {
	        res.json({
	        	success: false,
	        	message: 'Wrong password.'
	      	});
	      } else {

	        // user ok, kreiraj token
	        var token = jwt.sign({
	        	name: user.name,
	        	username: user.username
	        }, secretKey, {
	          expiresInMinutes: 1440
	        });

	        // vrati token
	        res.json({
	          success: true,
	          message: 'Token assigned!',
	          token: token
	        });
	      }

	    }

	  });
	});

	//provera tokena
	apiRouter.use(function(req, res, next){

		//proveri da li token postoji u headeru ili url
		var token = req.body.token || req.query.token || req.headers['x-access-token'];

		if(token){
			jwt.verify(token, secretKey, function(err, decoded){
				if(err){
					res.status(403).send({
						success: false,
						message: 'error (403)'
					});
				} else {
					//ako je sve ok, snimi req za koriscenje u ostalim rutama
					req.decoded = decoded;
					next(); //produzi ka route
				}
			});
		} else {
			// ukoliko nema tokena
				res.status(403).send({
					success: false,
					message: 'No token.'
				});
		}
	});

	//testiranje rute

	// /users

	// /users/:user_id

	// /me endpoint -prikaz informacija korisnika


};
