

document.addEventListener('DOMContentLoaded', init);
function init() {
    const buttons = document.querySelectorAll('button');

    let socket = io();

    socket.on('update', function(data) {
        for (const player in data) {
            console.log(player);
            if(data.hasOwnProperty(player)) {
                document.querySelector(`.${player}`).style.left = `${data[player]}px`;
            }
        }
    });

    Array.prototype.forEach.call(buttons, (btn) => {
        btn.addEventListener('click', move.bind(btn, socket));
    });

}

function move(socket) {
    socket.emit('update', this.className.replace('Btn', ''));
}


