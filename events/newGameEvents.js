import DisplayController from "../classes/displayController";

export default function loadNewGameEvents(game) {
  DisplayController.loadGrids();
  DisplayController.updateActiveShipName(game.player.ships[game.activeShipNum]);
}
