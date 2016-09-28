/** 
 * AIT - building an http server on top of the net module
 * this program displays a page that says hello if you go to
 * localhost:8080/hello... and goodbye if you go to localhost:8080/goodbye
 */
var net = require('net');


/**
 * Request object - takes http request string and parses out path
 * @param s - http request as string
 */
function Request(s) {
    // GET /foo/bar.baz HTTP/1.1\r\nX-Header:Qux\r\n\r\n
    // get the path ^ (which is 2nd element on 1st line)
    var requestParts = s.split(' ');
    var path = requestParts[1];
    this.path = path;
}

/**
 * object that maps paths to functions that return an http response via
 * socket
 */
var routes = {};

routes['/hello'] = function(sock) {
    sock.write('HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<h2>hello!!!!!!</h2>'); 
};

routes['/goodbye'] = function(sock) {
    sock.write('HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<h1><em>goodbye :( :(</em></h1>'); 
};
var server = net.createServer(function(sock) {
    sock.on('data', function(data){
        var reqString = data + '';
        var req = new Request(reqString);

        // determine if our applications "knows" about this path
        if(routes.hasOwnProperty(req.path)) {
            // if it does, call the function that exists in the routes
            // object at the key, path ... pass in the socket as an
            // argument so that it can be used to send back a response
            routes[req.path](sock);
        } else {
            // uh-oh... didn't find a path, so send back a 404!
            sock.write('HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\n\r\n NOT FOUND!!!!!!!');
        }

        // remember to close the connection after response is sent
        sock.end();
    });

    sock.on('close', function(data){
        console.log('closed');
    });

    console.log('got connection');
});

// use http://localhost:8080/hello in browser
// or curl -i localhost:8080/hello in terminal
server.listen(8080, '127.0.0.1');
