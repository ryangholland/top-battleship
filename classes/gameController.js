import Player from "./player";

export default class GameController {
  constructor() {
    this.humanPlayer = new Player();
    this.compPlayer = new Player();
  }
}
