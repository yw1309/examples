a promise is a representation of a task that will eventually complete
takes a single a arg, executor <--- a function that performs some async task
it takes two other functions as its parameters, fulfill and reject (to be called when task completes succesfully and completes with an error)

result = fetch(url)
result.then()
var promise = new Promise(function(fulfill, reject) {
    var req = new XMLHttpRequest()
    req.addEventListener('load', function() {
        fulfill(req.responseText) ;
    });

});


promise.then(console.log).then

