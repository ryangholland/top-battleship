export default class DisplayController {
  constructor() {}

  loadGrid(div) {
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      div.appendChild(cell);
    }
  }
}
