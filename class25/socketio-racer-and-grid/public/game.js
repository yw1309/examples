const socket = io();
document.addEventListener('DOMContentLoaded', init);

function init() {
    socket.on('initialBoard', onInitialBoard);
    socket.on('update', colorBoard);
}

function onInitialBoard(board) {
    for(let [rowNum, row] of board.entries()) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row'); 
        for(let [colNum, col] of row.entries()) {
            const colDiv = document.createElement('div');
            colDiv.classList.add('col'); 
            rowDiv.appendChild(colDiv);
            colDiv.col = colNum;
            colDiv.row = rowNum;
            colDiv.classList.add(`cell${rowNum}x${colNum}`);
            colDiv.addEventListener('click', handleClick);
        } 
        document.body.appendChild(rowDiv);
    }
    colorBoard(board);
}

function colorBoard(board) {
    for(let [rowNum, row] of board.entries()) {
        for(let [colNum, col] of row.entries()) {
            let ele = document.querySelector(`.cell${rowNum}x${colNum}`) ;
            if(col) {
                ele.classList.add('clicked');
            } else {
                ele.classList.remove('clicked');
            }
        } 
    }
}

function handleClick(evt) {
    socket.emit('click', [this.row, this.col]);
}


