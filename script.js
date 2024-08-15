let currentPlayer = 'X';
let moves = 0;
let gameActive = true;
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let boardState = ['', '', '', '', '', '', '', '', ''];

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('click', () => handleClick(cell.dataset.index)));
});

function handleClick(index) {
    if (!gameActive || boardState[index] !== '') return;

    boardState[index] = currentPlayer;
    document.querySelector(`.cell[data-index="${index}"]`).innerText = currentPlayer;

    if (checkWin()) {
        document.getElementById('message').innerText = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (moves === 8) {
        document.getElementById('message').innerText = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('message').innerText = `${currentPlayer}'s turn`;
    }

    moves++;
}

function checkWin() {
    for (let condition of winningConditions) {
        let [a, b, c] = condition;
        if (boardState[a] !== '' && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    currentPlayer = 'X';
    moves = 0;
    gameActive = true;
    boardState = ['', '', '', '', '', '', '', '', ''];
    document.getElementById('message').innerText = `${currentPlayer}'s turn`;
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.innerText = '');
}

