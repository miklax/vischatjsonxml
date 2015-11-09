var mongoose	= require('mongoose');
var Schema		= mongoose.Schema;
var bcrypt 		= require('bcrypt-nodejs');

//korisnicka Schema
var UserSchema 	= new Schema({
	name: String,
	username: { type: String, required: true, index: { unique: true }},
	password: { type: String, required: true, select: false }
});

// pre nego sto se korisnik shimimi uradi hash lozinke
UserSchema.pre('save', function(next) {
	var user = this;
	
	//novi korisnik ili lozinka promenjena - hash password
	if (!user.isModified('password'))
		return next();
	
	//generisi hash
	bcrypt.hash(user.password, null, null, function(err, hash) {
		if (err) return next(err);

		// promeni lozinku u hash
		user.password = hash;
		next();
	});
});

// dodavanje metoda za proveru lozinke koja je hashed
UserSchema.methods.comparePassword = function(password) {
	var user = this;

	return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);