const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const gameStatus = document.getElementById('gameStatus');
const restartButton = document.getElementById('restartButton');

let isXNext = true;
let gameActive = true;
let boardState = Array(9).fill(null);

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick, { once: true });
});

restartButton.addEventListener('click', restartGame);

function handleCellClick(e) {
    const cell = e.target;
    const currentClass = isXNext ? 'X' : 'O';

    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        updateGameStatus();
    }
}

function placeMark(cell, currentClass) {
    cell.textContent = currentClass;
    boardState[Array.from(cells).indexOf(cell)] = currentClass;
}

function swapTurns() {
    isXNext = !isXNext;
}

function updateGameStatus() {
    gameStatus.textContent = isXNext ? "Player X's turn" : "Player O's turn";
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return boardState[index] === currentClass;
        });
    });
}

function isDraw() {
    return boardState.every(cell => cell !== null);
}

function endGame(draw) {
    if (draw) {
        gameStatus.textContent = "It's a draw!";
    } else {
        gameStatus.textContent = `Player ${isXNext ? 'X' : 'O'} wins!`;
    }
    gameActive = false;
    cells.forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
    });
}

function restartGame() {
    isXNext = true;
    gameActive = true;
    boardState.fill(null);
    gameStatus.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick, { once: true });
    });
}
