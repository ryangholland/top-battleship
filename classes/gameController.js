import Player from "./player";

export default class GameController {
  constructor() {
    this.humanPlayer = new Player("human");
    this.compPlayer = new Player("comp");
  }
}
