var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Message = mongoose.model('Message');

/* GET home page. */
/*
router.get('/api/messages', function(req, res, next) {
    // find all the messages... send back as json with text and date
  Message.find({}, function(err, messages, count) {
    res.json(messages.map(function(msg) {
      return {'text':msg.text, 'date':msg.dateSent}; 
    })); 
  });
});
*/

router.get('/api/messages', function(req, res) {
    console.log(req.query.lastRetrievalDate);

    var q = {};
    if (req.query.lastRetrievalDate) {
        q.dateSent = {$gt:new Date(req.query.lastRetrievalDate)};
        console.log(q);
    }

    Message.find(q).sort('dateSent').exec(function(err, messages, count) {
        console.log('messages:', messages);
        console.log('err:', err);
        res.json(messages.map(function(ele) {
            return {
                'text': ele.text,
                'date': ele.dateSent
            }; 
        }));
    });
});

router.post('/api/message', function(req, res, next) {
  console.log(req.body);
  var m = new Message({
    text: req.body.message,
    dateSent: Date.now()
  });
  m.save(function(err, message, count){
    if(err) {
      console.log(err);
      return res.send(500, 'Oops - 500 error!')
    } else {
      res.json({id: message._id});
    }
  })
});

module.exports = router;
