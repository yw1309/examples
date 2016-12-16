/* jshint esnext:true */
const socket = io(); // could take a url, but default to same origin

const sendBtn = document.querySelector('#sendBtn');
sendBtn.addEventListener('click', handleSend);

function handleSend(evt) {
    const message = document.querySelector('#message').value;
    socket.emit('chat message', message);

}

socket.on('chat message', (data) => {
    document.body.appendChild(
            document.createElement('div'))
            .textContent = data;

});
