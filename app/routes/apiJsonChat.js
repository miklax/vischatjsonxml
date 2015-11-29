var bodyParser = require('body-parser');
var JsonChat = require('../models/jsonChatModel');

module.exports = function(app, express){


  var apiRouter = express.Router();

  apiRouter.route('/chat')

  // get sve linije iz baze
  .get(function(req, res){
      JsonChat.find({}, function(err, chatHistory){
        if(err) return res.send(err);

        return res.json(chatHistory);
      });
  });

  //TODO Ograniceni history, recimo na zadnjih 7 dana

  //TODO Obrisi history


  //endpoint  '/' provera da li endpoint radi.
  apiRouter.get('/', function(req, res){
    res.json({
      message: 'ok, chat api root'
    });
  });

  return apiRouter;
};
