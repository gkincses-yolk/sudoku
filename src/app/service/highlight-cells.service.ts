import {Injectable} from "@angular/core";
import {IBoard} from "../model/i-board";

@Injectable({
  providedIn: 'root',
})

export class HighlightCellsService {
  markHighlights(board: IBoard, selectedNumber: number): IBoard {
    board.blocks().forEach((block) => {
      block.cells().forEach((cell) => {
        cell.clearHighlight();
        if (parseInt(cell.value()) === selectedNumber) {
          cell.setHighlight();
        }
      })
    });
    return board;
  }
}
