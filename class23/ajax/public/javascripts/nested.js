/*
var req = new XMLHttpRequest();
req.open('GET', 'http://localhost:3000/api/urls/tango');
req.addEventListener("load", function() {
    if(req.status >= 200 && req.status < 400) {
        var obj = JSON.parse(req.responseText);
        var url = obj.url;
        var div = document.createElement('div');
        var t = document.createTextNode(url);
        div.appendChild(t);
        document.body.appendChild(div);

        var req1 = new XMLHttpRequest();
        req1.open('GET', url);
        req1.addEventListener("load", function() {
            if(req1.status >= 200 && req1.status < 400) {
                var obj = JSON.parse(req1.responseText);
                var url = obj.url;
                var div = document.createElement('div');
                var t = document.createTextNode(url);
                div.appendChild(t);
                document.body.appendChild(div);
            }
        });
        req1.send();

    }
});
req.send();
*/

/*
function get(url, cb) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.addEventListener("load", function() {
        if(req.status >= 200 && req.status < 400) {
            cb(req.responseText);
        }
    });
    req.send();
}

function handleResponse(s) {
    var obj = JSON.parse(s);
    var url = obj.url;
    return url;
}

function addToPage(url) {
    var div = document.createElement('div');
    var t = document.createTextNode(url);
    div.appendChild(t);
    document.body.appendChild(div);
}
*/

/*
get('http://localhost:3000/api/urls/tango', function(responseText) {
    var url = handleResponse(responseText);
    addToPage(url);
    get(url, function(responseText) {
        var url = handleResponse(responseText);
        addToPage(url);
        get(url, function(responseText) {
            var url = handleResponse(responseText);
            addToPage(url);
        });
    });
});
*/
/*
function seq(url) {
    if(url != 'done!') {
        get(url, function(responseText) {
            var url = handleResponse(responseText);
            addToPage(url);
            seq(url);
        });
    }
}
seq('http://localhost:3000/api/urls/tango');
*/



function get(url, cb) {
    var promise = new Promise(function(fulfill, reject) { 
        var req = new XMLHttpRequest();
        req.open('GET', url);
        req.addEventListener("load", function() {
            if(req.status >= 200 && req.status < 400) {
                fulfill(req.responseText);
            } else {
                reject(new Error('bad status code')); 
            }
        });
        req.send();
    });
    return promise;
}

function handleResponse(s) {
    var url = extractUrl(s);
    addToPage(url);
    return url;
}

function extractUrl(s) {
    var obj = JSON.parse(s);
    var url = obj.url;
    return url;
}

function addToPage(url) {
    var div = document.createElement('div');
    var t = document.createTextNode(url);
    div.appendChild(t);
    document.body.appendChild(div);
}

/*
var p = get('http://localhost:3000/api/urls/tango');
p.then(handleResponse)
.then(get)
.then(handleResponse);
*/



fetch('http://localhost:3000/api/urls/tango')
.then(function(res) {
    console.log(res);
    return res.text();
})
.then(handleResponse)
.then(fetch)
.then(function(res) {
    console.log(res);
    return res.text();
})
.then(handleResponse);
