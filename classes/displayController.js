export default class DisplayController {
  constructor() {}

  static loadGrid(div) {
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-cell", i);
      div.appendChild(cell);
    }
  }

  static loadGrids() {
    const placementGrid = document.getElementById("placement-grid");
    const opponentGrid = document.getElementById("opponent-grid");
    const playerGrid = document.getElementById("player-grid");
    this.loadGrid(placementGrid);
    this.loadGrid(opponentGrid);
    this.loadGrid(playerGrid);
  }

  static showGameplayScreen() {
    const placementDiv = document.getElementById("placement");
    const gameplayDiv = document.getElementById("gameplay");

    placementDiv.hidden = true;
    gameplayDiv.hidden = false;
  }

  static displayShips(player, grid) {
    const cellDivs = grid.querySelectorAll("[data-cell]");

    let cellNum = 0;
    player.gameBoard.board.forEach((cell) => {
      if (cell === "ship") {
        cellDivs[cellNum].classList.add("ship-here");
      }
      cellNum++;
    });
  }

  static updateBoardDisplay(player, grid) {
    const cellDivs = grid.querySelectorAll("[data-cell]");

    let cellNum = 0;
    player.gameBoard.board.forEach((cell) => {
      if (cell === "hit") {
        cellDivs[cellNum].classList.add("hit-here");
      }
      if (cell === "miss") {
        cellDivs[cellNum].classList.add("miss-here");
      }
      cellNum++;
    });
  }
}
