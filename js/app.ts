/*---------------------------- Constants --------------------------------*/
const winningCombos: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

/*------------------------ Variables (state) ----------------------------*/
let board: number[]
let winner: boolean
let tie: boolean
let turn: number

/*-------------------- Cached Element References ------------------------*/
const squareEls: NodeListOf<HTMLDivElement> = document.querySelectorAll('.sqr')
const messageEl: HTMLElement = document.getElementById('message')!
const boardEl: HTMLElement = document.querySelector('.board')!
const resetBtnEl: HTMLButtonElement = document.querySelector('button')!

/*------------------------- Event Listeners -----------------------------*/
boardEl.addEventListener('click', handleClick)
resetBtnEl.addEventListener('click', init)

/*---------------------------- Functions --------------------------------*/

init()

function init(): void {
  board =  [0,0,0,0,0,0,0,0,0]
  turn = 1
  winner = false
  tie = false
  render()
}

function handleClick(evt: Event): void {
  if (evt.target instanceof Element) {
    let sqIdx: number = parseInt((evt.target.id).replace('sq', ''))
    if ((sqIdx || sqIdx === 0) && !board[sqIdx] && !winner) {
      placePiece(sqIdx)
      checkForTie()
      checkForWinner()
      switchPlayerTurn()
      render()
    }
  }
}

function switchPlayerTurn(): void {
  if (!winner) turn *= -1
}

function checkForWinner(): void {
  for (let combo of winningCombos) {
    if (Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) === 3) {
      winner = true
    }
  }
}

function checkForTie(): void {
  tie = !board.includes(0)
}

function placePiece(idx: number): void {
  board[idx] = turn
}

function render(): void {
  updateBoard()
  updateMessage()
}

function updateBoard(): void {
  board.forEach((val, idx) => {
    if (val === 1) {
      squareEls[idx].textContent = 'X'
    } else if (val === -1) {
      squareEls[idx].textContent = 'O'
    } else {
      squareEls[idx].textContent = ''
    }
  })
}

function updateMessage(): void {
  if (!winner && !tie) {
    messageEl.textContent = `It's ${turn === 1 ? 'X' : 'O'}'s turn!`
  } else if (!winner && tie) {
    messageEl.textContent = "It's a tie!"
  } else {
    messageEl.textContent =  `${turn === 1 ? 'X' : 'O'} wins!`
  }
}