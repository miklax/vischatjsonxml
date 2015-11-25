var bodyParser = require('body-parser');
var JsonChat = require('../models/jsonChatModel');

module.exports = function(app, express){


  var apiRouter = express.Router();

  apiRouter.route('/chat')
  //dodaj liniju u stack
  .post(function(req, res){
    var jsonChat = new JsonChat();
    jsonChat.timeStamp = new Date();
    jsonChat.username = req.body.username;
    jsonChat.msgLine = req.body.msgLine;

    jsonChat.save(function(err){
      return res.send(err);
    });

    // TODO !!!!!
    //ovde mozda treba vratiti updejtovani json
  })

  //get sve linije iz baze
  .get(function(req, res){
      JsonChat.find({}, function(err, chatHistory){
        if(err) return res.send(err);

        return res.json(chatHistory);

      });
  });

  //TODO Obrisi history


  //endpoint  '/' provera da li endpoint radi.
  apiRouter.route('/', function(req, res){
    res.json({
      message: 'ok, chat api root'
    });
  });

  return apiRouter;
};
