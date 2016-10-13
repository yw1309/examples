var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// middleware
// just a function
// a function that gets called before your route's callback
// it has the option immediately returning a response
// or calling the next middleware / route handler
// req, res, next
app.use(function(req, res, next) {
    if(req.headers.hasOwnProperty('host')) {
        next(); 
    } else {
        res.status(400).send('bad request');
    }
}); 

app.use(express.static('public'));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('index', {stuff: ['foo', 'bar', 'baz']});
});

// pass in query string parameter... minNum
// only display numbers from numbers array that are greater minNum
// var <-- const, let (actually don't ever use var in es6)
// const <-- the reference cannot be changed (can't reassign), if it's a mutable, it can
// be changed, but you just can't change the reference to another object
// by default use const
// let... block level scoping
const numbers = [1, 2, 3, 4, 5, 6];
app.get('/numbers', function(req, res) {
    let min = req.query['minNum'] || 0;
    min = +min;
    const filteredNumbers = numbers.filter((num) => {
        return num > min; 
    });
    res.render('numbers', {numbers: filteredNumbers});
});

app.get('/foo', function(req, res) {
  console.log(req.query);
  res.send('get request ftw');
});

var cats = [];
app.get('/cats', function(req, res){
    res.render('cats', {cats: cats});
});

// post - redirect - get
// PRG
app.post('/cats', function(req, res){
    cats.push(req.body.catName);
    res.redirect('/cats');
});


app.listen(3000);
