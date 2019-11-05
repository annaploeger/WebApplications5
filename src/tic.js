/**Return start field*/

var baseState = function() {
  return [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ];
};

var currentState, turn;
var BOARD_SIZE = 5;
var isGameOver = false;
/**Check if there is a winner*/

var isWinner = function() {
  var wins = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20]
  ];

  // Look, if there could be a winning combination

  var isWinner = wins.filter(function(win) {
    return (
      currentState[win[0]] &&
      currentState[win[0]] === currentState[win[1]] &&
      currentState[win[0]] === currentState[win[2]] &&
      currentState[win[0]] === currentState[win[3]] &&
      currentState[win[0]] === currentState[win[4]]
    );
  });

  return isWinner.length > 0 ? currentState[isWinner[0][0]] : false;
};

/**Refresh the baord */

var updateBoard = function(square) {
  if (square) square.innerHTML = turn;
};

/**Render 5x5 field */

var renderTurn = function(square) {
  var selected = square.innerHTML;
  if (selected) return;
  currentState[square.identifier] = turn;
  updateBoard(square);
  turn = turn === "X" ? "O" : "X";
};

/** Clears the board */

var resetBoard = function() {
  isGameOver = false;
  currentState = baseState();
  turn = "X";
  initGame();
};

//Recall function

var onCellClick = function() {
  if (!isGameOver) {
    var square = this;
    renderTurn(square);
    var winner = isWinner();
    console.log(winner);
    if (winner) {
      if (winner === "X") {
        alert("Player 1 won!");
      } else {
        alert("Player 2 won!");
      }
      isGameOver = true;
    }
  }
};

var initGame = function() {
  turn = "X";
  var gameContainer = document.getElementById("board");
  gameContainer.innerHTML = "";
  var board = document.createElement("table");
  var identifier = 0;
  for (var i = 0; i < BOARD_SIZE; i++) {
    var row = document.createElement("tr");
    board.appendChild(row);
    for (var j = 0; j < BOARD_SIZE; j++) {
      var cell = document.createElement("td");
      cell.identifier = identifier;
      cell.addEventListener("click", onCellClick);
      row.appendChild(cell);
      identifier += 1;
    }
  }
  gameContainer.appendChild(board).appendChild(buildPlayAgainBtn());
};

var buildPlayAgainBtn = function() {
  var paragraphElement = document.createElement("p");
  var button = document.createElement("button");
  button.innerHTML = "Play Again";
  button.addEventListener("click", resetBoard);
  paragraphElement.appendChild(button);
  //Play-Again Button
  //button += '<p><button id="play-again">Play Again</button></p>';
  return paragraphElement;
};

resetBoard();