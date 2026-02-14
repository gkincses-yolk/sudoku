import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {SudokuService} from './service/sudoku-service';
import {IBoard} from './model/i-board';
import {Board} from "./model/board";
import {Block} from "./model/block";
import {IBlock} from "./model/i-block";
import {Cell} from "./model/cell";

@Component({
  selector: 'board',
  imports: [],
  templateUrl: './game.html',
  styleUrls: ['./game.css'],
})

export class Game {
  readonly _title = 'Sudoku';

  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly sudokuService: SudokuService = inject(SudokuService);

  private _ix = 0;

  _block: IBlock = new Block(this._ix++, Array(9).fill(new Cell("", true, false)));
  _board: IBoard = new Board(Array(9).fill(this._block));

  printvalue(board: IBoard, ix: number) {
    console.log(`Fetched block ${ix}: ${JSON.stringify(board.blockAt(ix))}`);
  }

  constructor() {
    this.sudokuService.getBoard()
        .then((board: IBoard) => {
          this._board = board;
          for (let ix = 0; ix < 9; ix++) {
            this.printvalue(this._board, ix);
          }
          this.changeDetectorRef.markForCheck();
        })
  }
}
