const turns = { X: "O", O: "X" };
let turn = "X";
let scores = { X: 0, O: 0 };

function toggleTurn() {
  turn = turns[turn];
  document.getElementById("turn-indicator").textContent = `Turno de: ${turn}`;
}

let board = Array(9).fill(null);

const cells = document.querySelectorAll(".cell");

cells.forEach((cell) => {
  cell.addEventListener("click", handleClick);
});

function handleClick(event) {
  const cell = event.target;
  const index = Array.from(cells).indexOf(cell);

  if (board[index]) return;

  board[index] = turn;
  cell.textContent = turn;
  cell.setAttribute("aria-label", `Casilla marcada por ${turn}`);

  if (checkWinner()) {
    updateScores(turn);
    document.getElementById("turn-indicator").textContent = `El ganardor es ${turn}`;
    setTimeout(resetGame, 2000);
    return;
  }

  if (!board.includes(null)) {
    console.log("Es un empate");
    document.getElementById("turn-indicator").textContent = "¡Es un empate!";
    setTimeout(resetGame, 2000);
    return;
  }

  toggleTurn();
}

function checkWinner() {
  //  Hagamos la lógica para saber si hay un ganador
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");
      console.log(`El ganador es ${cells[a].textContent}`);
      return true;
    }
  }

  return null;
}

function updateScores(winner) {
  scores[winner]++;
  document.getElementById("score-x").textContent = `X: ${scores.X}`;
  document.getElementById("score-o").textContent = `O: ${scores.O}`;
}

function resetGame() {
  board.fill(null);
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("winner");
    cell.addEventListener("click", handleClick);
  });

  turn = "X";
  document.getElementById("turn-indicator").textContent = `Turno de: ${turn}`;
}
