export default class DisplayController {
  constructor() {}

  loadGrid(div) {
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-cell", i);
      div.appendChild(cell);
    }
  }

  loadGrids() {
    const placementGrid = document.getElementById("placement-grid");
    const enemyGrid = document.getElementById("enemy-grid");
    const playerGrid = document.getElementById("player-grid");
    this.loadGrid(placementGrid);
    this.loadGrid(enemyGrid);
    this.loadGrid(playerGrid);
  }

  showGameplayScreen() {
    const placementDiv = document.getElementById("placement");
    const gameplayDiv = document.getElementById("gameplay");

    placementDiv.hidden = true;
    gameplayDiv.hidden = false;
  }

  displayShips(player) {
    const gridDiv =
      player.type == "human"
        ? document.getElementById("player-grid")
        : document.getElementById("enemy-grid");

    const cellDivs = gridDiv.querySelectorAll("[data-cell]");

    let rowNum = 0;
    player.gameBoard.board.forEach((row) => {
      let cellNum = 0;
      row.forEach((cell) => {
        if (cell === "ship") {
          cellDivs[rowNum * 10 + cellNum].classList.add("ship-here");
        }
        cellNum++;
      });
      rowNum++;
    });
  }
}
