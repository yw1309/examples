document.addEventListener('DOMContentLoaded', init);

function init() {
  // look for the button
  var btn = document.querySelector('#message-submit');

  // bind sendMessage when it's cliecked
  btn.addEventListener('click', sendMessage);

  // retrieves all messages in the background
  getMessages();
}

function getMessages() {
    // typical ajax get request
  var req = new XMLHttpRequest(),
    url = 'http://localhost:3000/api/messages';

  req.open('GET', url, true);
  req.addEventListener('load', handleMessageLoad);
  req.send();
}

// setInterval
// setTimeout
// <--- calls some function at a specific interval repeatedly
// <--- call some function after x number of ms


function handleMessageLoad() {
  if(this.status >= 200 && this.status < 400) {
    var data = JSON.parse(this.responseText);
    var div = document.querySelector('#message-list') ;

    if(div.childNodes.length) {
        Array.prototype.slice.call(div.childNodes).forEach(function(child) {
            console.log('removing', child);
            div.removeChild(child); 
        });
    }
    
    data.forEach(function(msg) {
      div.appendChild(document.createElement('p')).textContent = (new Date(msg.date)).toLocaleString() + ' - ' + msg.text;
    });
  }

  setTimeout(getMessages, 1000);
}

function sendMessage() {
  var msg = document.querySelector('#message').value;
  var req = new XMLHttpRequest();
  url = 'http://localhost:3000/api/message';
  req.open('POST', url, true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

  req.send('message=' + msg);
  console.log(msg);
}



/*
    // A
    if(div.childNodes.length) {
        Array.prototype.slice.call(div.childNodes).forEach(function(child) {
            console.log('removing', child);
            div.removeChild(child); 
        });
    }
  // B
  setTimeout(getMessages, 2000);
*/
