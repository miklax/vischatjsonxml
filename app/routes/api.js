var bodyParser	= require('body-parser');
var jwt 		= require('jsonwebtoken');

var User 		= require('../models/user');
var config 		= require('../../config');

var secretKey = config.secret;

module.exports = function(app, express){

	var apiRouter = express.Router();

		//kreiraj admina - OVO IZBACITI KASNIJE IZ KODA :D
	apiRouter.post('/admincreate', function(req, res){
		User.findOne({'username': 'admin'}, function(err, user){
			if (user) {
				//ako vec postoji samo uradi update passorda
				user.password = 'admin';
				user.save();
			} else {
				//kreiraj novog korisnika i snimi
				var newUser = new User();
				newUser.name = 'admin';
				newUser.username = 'admin';
				newUser.password = 'admin';
				newUser.save();

				res.json({
					message: 'admin user created'
				});

				console.log(newUser.name + 'created');
			}
		});
	});

	//atentikacija korisnika
	apiRouter.post('/authenticate', function(req, res) {

		// pronadji korisnika
		User.findOne({
			username: req.body.username
		}).select('name username password').exec(function(err, user) {

			if (err) throw err;

			// user not foundapp
			if (!user) {
				res.json({
					success: false,
					message: 'Korisnik nije pronadjen.'
				});
			} else if (user) {

				// provera lozinke
				var validPassword = user.comparePassword(req.body.password);
				if (!validPassword) {
					res.json({
						success: false,
						message: 'Pogresna lozinka.'
					});
				} else {

					// user ok, kreiraj token
					var token = jwt.sign({
						name: user.name,
						username: user.username
					}, secretKey, {
						expiresInMinutes: 2880 //2 dana :D
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

	//endpoint  '/'
	apiRouter.route('/', function(req, res){
		res.json({
			message: 'success, api root'
		});
	});

	apiRouter.post('/users', function(req, res){
		//uzmi iz requesta podatke i snimi u bazu
		var newUser = new User();
		newUser.name = req.body.name;
		newUser.username = req.body.username;
		newUser.password = req.body.password;

		newUser.save(function(err){
			if(err){
				if (err.code == 11000)
					return res.json({ success: false, message: 'Korisnik sa tim imenom vec postoji '});
				else
					return res.send(err);
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


	// /users
	//ovaj deo nalazi se iza middleware koji proverava prvo da li token postoji
	//pa tek onda dozvoli ove operacije. Prebacio sam da se korisnik moze kreirati
	//pre tokena pa je i taj deo prebacen.
	// apiRouter.route('/users')
	// 	.post(function(req, res){
	// 		//uzmi iz requesta podatke i snimi u bazu
	// 		var newUser = new User();
	// 		newUser.name = req.body.name;
	// 		newUser.username = req.body.username;
	// 		newUser.password = req.body.password;
	//
	// 		newUser.save(function(err){
	// 			if(err){
	// 				if (err.code == 11000)
	// 					return res.json({ success: false, message: 'Korisnik sa tim imenom vec postoji '});
	// 				else
	// 					return res.send(err);
	// 			}
	// 		});
	// 	})
	// 	.get(function(req, res){
	// 		User.find({}, function(err, usersList){
	// 			if(err)
	// 				res.send(err);
	//
	// 			res.json(usersList);
	// 		});
	// 	});

	apiRouter.get('/users', function(req, res){
		User.find({}, function(err, usersList){
			if(err)
				res.send(err);

			res.json(usersList);
		});
	});

	// /users/:user_id
	//get, put, delete,
	apiRouter.route('/users/:user_id')

		//vrati usera (json) sa zadatim ID
		.get(function(req, res){
			User.findById(req.params.user_id, function(err, user){
				if(err) res.send(err);

				//vrati korisnika
				res.json(user);
			});
		})

		//UPDATE korisnika sa zadatim ID
		.put(function(req, res){
				User.findById(res.params.user_id, function(err, user){
					if (err) res.send(err);

					//procitaj iz headera
					if (res.body.name) user.name = res.body.name;
					if (res.body.username) user.username = res.body.username;
					if (res.body.password) user.pasword = res.body.password;

					user.save(function(err){
						if (err) res.send(err);
					});

					//feedback u konzoli
					res.json({message: 'User is updated'});
					console.log('User: ' + user.name + ', is updated');
				});
		})

		.delete(function(req, res){
			User.remove({_id: req.params.user_id}, function(err, user){
				if (err) res.send(err);

				res.json({message: 'User deleted'});
				console.log('User: '+ user.name + ', is deleted');
			});
		});

	// /me endpoint -prikaz informacija korisnika
	apiRouter.get('/me', function(req, res) {
		res.send(req.decoded);
	});

	return apiRouter;
};
