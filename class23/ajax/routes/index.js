var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/food', function(req, res, next) {
    console.log(req.body);
    res.send('got it!');
});

var letters = {
    tango: 'http://localhost:3000/api/urls/uniform',
    uniform: 'http://localhost:3000/api/urls/victor',
    victor: 'done!'
};

router.get('/api/urls/:letter', function(req, res) {
    var delay = Math.random() * 2000;
    setTimeout(function() {
        res.json({'url':letters[req.params.letter]});
    }, delay);
});

module.exports = router;
