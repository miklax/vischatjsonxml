var bodyParser = require('body-parser');
var JsonChat = require('../models/jsonChatModel');

module.exports = function(app, express){


  var apiRouter = express.Router();

  //TODO pokupi stack - za pocetak mozda samo aktuelni dan
  apiRouter.route('/chat')
  .post(function(req, res){
    var jsonChat = new JsonChat();
    jsonChat.timeStamp = new Date();
    jsonChat.username = req.body.username;
    jsonChat.msgLine = req.body.msgLine;

    jsonChat.save(function(err){
      return res.send(err);
    });
  })

  .get(function(req, res){
      JsonChat.find({}, function(err, chatHistory){
        if(err) return res.send(err);

        return res.json(chatHistory);

      });
  });

  //TODO Dodaj liniju u stack

  //TODO Obrisi history


  //endpoint  '/' provera da li endpoint radi.
  apiRouter.route('/', function(req, res){
    res.json({
      message: 'ok, chat api root'
    });
  });

  return apiRouter;
};
