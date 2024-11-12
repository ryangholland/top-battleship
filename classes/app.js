import Game from "./game";
import loadPlacementEvents from "../events/placementEvents";
import loadGameplayEvents from "../events/gameplayEvents";
import loadRestartEvents from "../events/restartEvents";
import loadNewGameEvents from "../events/newGameEvents";

export default class App {
  constructor() {
    this.game = new Game();
  }

  init() {
    loadNewGameEvents(this.game);
    loadPlacementEvents(this.game);
    loadGameplayEvents(this.game);
    loadRestartEvents(this);
  }
}
