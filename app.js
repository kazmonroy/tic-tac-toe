const board = (() => {
  const cells = document.querySelectorAll("[data-cell]");
  const board = document.querySelector(".board");
  const restartBtn = document.querySelector(".restart-btn");
  const playerDisplay = document.querySelector(".turn-status");

  let oTurn;
  const oPlayer = "o";
  const xPlayer = "x";
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

  play = (e) => {
    const cell = e.target;
    const currentPlayer = oTurn ? oPlayer : xPlayer;
    addMark(cell, currentPlayer);
    switchPlayer();
    addMarkHover();

    if (checkWin(currentPlayer)) {
      endGame(false, currentPlayer);
    } else if (isDraw()) {
      endGame(true);
    }
  };

  checkWin = (currentPlayer) => {
    return winCombinations.some((combination) => {
      return combination.every((index) => {
        return cells[index].classList.contains(currentPlayer);
      });
    });
  };

  endGame = (draw, currentPlayer) => {
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
      restartGame();
    }, 2000);
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

  addMark = (cell, currentPlayer) => {
    cell.classList.add(currentPlayer);
  };

  addMarkHover = () => {
    resetBoard();
    if (oTurn) {
      board.classList.add(oPlayer);
    } else {
      board.classList.add(xPlayer);
    }
  };

  resetBoard = () => {
    board.classList.remove(xPlayer);
    board.classList.remove(oPlayer);
    playerDisplay.classList.remove("x_win");
    playerDisplay.classList.remove("o_win");
    playerDisplay.classList.remove("draw");
  };

  startGame = () => {
    oTurn = false;
    cells.forEach((cell) => {
      cell.addEventListener("click", play, { once: true });
    });
    addMarkHover();
  };

  restartGame = () => {
    cells.forEach((cell) => {
      cell.classList.remove(oPlayer);
      cell.classList.remove(xPlayer);
    });

    playerDisplay.innerText = "Play again";
    resetBoard();
    startGame();
  };

  restartBtn.addEventListener("click", restartGame);

  return { startGame };
})();

board.startGame();
