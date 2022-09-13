const board = (() => {
  const cells = document.querySelectorAll("[data-cell]");
  const board = document.querySelector(".board");
  const restartBtn = document.querySelector(".restart-btn");
  const playerDisplay = document.querySelector(".turn-status");
  const xScore = document.querySelector(".x-score");
  const oScore = document.querySelector(".o-score");

  let oTurn;
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let xWins = 0;
  let oWins = 0;

  // Players
  const _Players = (mark) => {
    return { mark };
  };

  const player1 = _Players("o");
  const player2 = _Players("x");
  const oPlayer = player1.mark;
  const xPlayer = player2.mark;

  _play = (e) => {
    const cell = e.target;
    const currentPlayer = oTurn ? oPlayer : xPlayer;
    _addMark(cell, currentPlayer);
    switchPlayer();
    _addMarkHover();

    if (_checkWin(currentPlayer)) {
      countWins(currentPlayer);
      _endGame(false, currentPlayer);
    } else if (isDraw()) {
      _endGame(true);
    }
  };

  _checkWin = (currentPlayer) => {
    return winCombinations.some((combination) => {
      return combination.every((index) => {
        return cells[index].classList.contains(currentPlayer);
      });
    });
  };

  _endGame = (draw, currentPlayer) => {
    if (draw) {
      playerDisplay.innerText = `It's a draw!`;
      playerDisplay.classList.add("draw");
    } else {
      playerDisplay.innerHTML = `<span>${currentPlayer}</span> wins!`;
      const winner = playerDisplay.querySelector("span");

      currentPlayer == oPlayer
        ? winner.classList.add("o_win")
        : winner.classList.add("x_win");
    }

    setTimeout(() => {
      _restartGame();
    }, 2000);
  };

  countWins = (currentPlayer) => {
    if (currentPlayer === xPlayer) {
      xWins++;
      // console.log("x + 1");
      xScore.textContent = xWins;
    } else if (currentPlayer === oPlayer) {
      oWins++;
      // console.log("o + 1");
      oScore.textContent = oWins;
    }
  };

  isDraw = () => {
    return [...cells].every((cell) => {
      return (
        cell.classList.contains(oPlayer) || cell.classList.contains(xPlayer)
      );
    });
  };

  switchPlayer = () => {
    oTurn = !oTurn;

    if (oTurn) {
      playerDisplay.innerText = `It's ${oPlayer} turn`;
    } else {
      playerDisplay.innerText = `It's ${xPlayer} turn`;
    }
  };

  _addMark = (cell, currentPlayer) => {
    cell.classList.add(currentPlayer);
  };

  _addMarkHover = () => {
    _resetBoard();
    if (oTurn) {
      board.classList.add(oPlayer);
    } else {
      board.classList.add(xPlayer);
    }
  };

  _resetBoard = () => {
    board.classList.remove(xPlayer);
    board.classList.remove(oPlayer);
    playerDisplay.classList.remove("x_win");
    playerDisplay.classList.remove("o_win");
    playerDisplay.classList.remove("draw");
  };

  startGame = () => {
    oTurn = false;
    cells.forEach((cell) => {
      cell.addEventListener("click", _play, { once: true });
    });
    _addMarkHover();
  };

  _restartGame = () => {
    cells.forEach((cell) => {
      cell.classList.remove(oPlayer);
      cell.classList.remove(xPlayer);
    });

    playerDisplay.innerText = "Play again";
    _resetBoard();
    startGame();
  };

  restartBtn.addEventListener("click", _restartGame);

  return { startGame };
})();

board.startGame();
