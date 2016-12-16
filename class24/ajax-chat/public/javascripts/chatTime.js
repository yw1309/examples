
var lastRetrievalDate, 
    timer, 
    delay = 1000;

document.addEventListener("DOMContentLoaded", init);

function init() {
    var btn = document.querySelector('#message-submit');
    btn.addEventListener('click', sendMessage);
    getMessages();
}
function getMessages() {
    var req = new XMLHttpRequest(),
      url = 'http://localhost:3000/api/messages';

    console.log(lastRetrievalDate);
    // if we retrieved previously, we can set it as
    // part of the query string
    if (lastRetrievalDate) {
        url += '?lastRetrievalDate=' + lastRetrievalDate;
    }

    req.open('GET', url, true);
    req.addEventListener('load', handleMessageLoad);
    req.send();
}

function handleMessageLoad() {
    if (this.status >= 200 && this.status < 400){
        var data = JSON.parse(this.responseText);

        console.log(data);
        if(data.length >= 1) { 
            lastRetrievalDate = data[data.length - 1].date;
        }

        var messageList = document.getElementById('message-list');

        data.forEach(function(msg) {
            var div = messageList.appendChild(document.createElement('div'));
            div.textContent = (new Date(msg.date)).toLocaleString() + ' - ' + msg.text;
        });
        timer = setTimeout(getMessages, delay);
    } else {
        console.log(this.status);
    }
}


function sendMessage() {
    var message = document.getElementById('message').value;
    console.log('sending message', message);
    var req= new XMLHttpRequest();
    req.open('POST', 'http://localhost:3000/api/message', true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    req.send('message=' + message);
    req.addEventListener('load', function(eve) {
        clearTimeout(timer);
        getMessages();
    });
}

