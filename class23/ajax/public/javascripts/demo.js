

var techniques = {
    cb: useCallbacks,
    cbr: useCallbacksAndRecursion,
    p: usePromises,
    f: useFetch
};

document.addEventListener("DOMContentLoaded", function() {
    var btn= document.querySelector("#btn");
    btn.addEventListener("click", handleClick);
});

function useCallbacks(url) {
    console.log('retrieving urls using get with callbacks');

    getWithCallback(url, function(res) {
        url = handleResponse(res);    
        getWithCallback(url, function(res) {
            url = handleResponse(res);    
            getWithCallback(url, function(res) {
                url = handleResponse(res);    
            });
        });
    });
}

function useCallbacksAndRecursion(url) {
    console.log('retrieving urls using get, callbacks and recursion');
    seq(url);

    function seq(url) {
        if(url != 'done!') {
            getWithCallback(url, function(res) {
                var url = handleResponse(res); 
                seq(url);
            });
        }
    }
}

function usePromises(url) {
    console.log('retrieving urls using get and promises');
    getWithPromises(url)
        .then(handleResponse)
        .then(getWithPromises)
        .then(handleResponse)
        .then(getWithPromises)
        .then(handleResponse);
}

function useFetch(url) {
    fetch(url)
        .then(function(response) { return response.text(); })
        .then(handleResponse)
        .then(fetch)
        .then(function(response) { return response.text(); })
        .then(handleResponse)
        .then(fetch)
        .then(function(response) { return response.text(); })
        .then(handleResponse);
}

function handleClick() {
    var name = document.querySelector("#technique").value;
    var url = 'http://localhost:3000/api/urls/tango';
    techniques[name](url);
}

function getWithCallback(url, cb) {
    var req = new XMLHttpRequest();
    req.addEventListener('load', function() {
        if(req.status >= 200 && req.status < 400) {
            cb(req.responseText);
        } else {
            alert(req.status); 
        }
    });
    req.addEventListener('error', function() {
        alert('error'); 
    });
    req.open('GET', url);
    req.send();
}

function getWithPromises(url) {
    return new Promise(function(fulfill, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', url);
        req.addEventListener("load", function() {
            if(req.status == 200) {
                fulfill(req.responseText) ;
            } else {
                reject('got ' + req.status); 
            } 
        });
        req.addEventListener("error", function() {
            reject('error'); 
        });
        req.send();
    }); 
}

function handleResponse(res) {
    var obj = JSON.parse(res);
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(obj.url));
    document.body.appendChild(div);
    return obj.url;
}
