"use strict";
/*---------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
/*------------------------ Variables (state) ----------------------------*/
let board;
let winner;
let tie;
let turn;
/*-------------------- Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const boardEl = document.querySelector('.board');
const resetBtnEl = document.querySelector('button');
/*------------------------- Event Listeners -----------------------------*/
boardEl.addEventListener('click', handleClick);
resetBtnEl.addEventListener('click', init);
/*---------------------------- Functions --------------------------------*/
init();
function init() {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    turn = 1;
    winner = false;
    tie = false;
    render();
}
function handleClick(evt) {
    if (evt.target instanceof Element) {
        let sqIdx = parseInt((evt.target.id).replace('sq', ''));
        if ((sqIdx || sqIdx === 0) && !board[sqIdx] && !winner) {
            placePiece(sqIdx);
            checkForTie();
            checkForWinner();
            switchPlayerTurn();
            render();
        }
    }
}
function switchPlayerTurn() {
    if (!winner)
        turn *= -1;
}
function checkForWinner() {
    for (let combo of winningCombos) {
        if (Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) === 3) {
            winner = true;
        }
    }
}
function checkForTie() {
    tie = !board.includes(0);
}
function placePiece(idx) {
    board[idx] = turn;
}
function render() {
    updateBoard();
    updateMessage();
}
function updateBoard() {
    board.forEach((val, idx) => {
        if (val === 1) {
            squareEls[idx].textContent = 'X';
        }
        else if (val === -1) {
            squareEls[idx].textContent = 'O';
        }
        else {
            squareEls[idx].textContent = '';
        }
    });
}
function updateMessage() {
    if (!winner && !tie) {
        messageEl.textContent = `It's ${turn === 1 ? 'X' : 'O'}'s turn!`;
    }
    else if (!winner && tie) {
        messageEl.textContent = "It's a tie!";
    }
    else {
        messageEl.textContent = `${turn === 1 ? 'X' : 'O'} wins!`;
    }
}
