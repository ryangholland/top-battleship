import DisplayController from "../classes/displayController";
import Game from "../classes/game";

export default function loadRestartEvents(app) {
  const restartBtn = document.getElementById("restart");
  restartBtn.addEventListener("click", () => {
    app.game = new Game();
    DisplayController.loadGrids();
    DisplayController.showPlacementScreen();
    app.init();
  });
}
