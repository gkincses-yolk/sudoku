import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {SudokuService} from './service/sudoku-service';
import {IBoard} from './model/i-board';
import {Board} from "./model/board";
import {Block} from "./model/block";
import {IBlock} from "./model/i-block";
import {Cell} from "./model/cell";
import {UnusedCounterService} from "./service/unused-counter.service";
import {IUnused} from "./model/i-unused";
import {Unused} from "./model/unused";

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
  private readonly unusedCounterService: UnusedCounterService = inject(UnusedCounterService);

  private _ix = 0;

  _block: IBlock = new Block(this._ix++, Array(9).fill(new Cell("", true, false)));
  _board: IBoard = new Board(Array(9).fill(this._block));
  _unusedCounts: IUnused[] = Array(9).fill(new Unused(9));

  constructor() {
    this.sudokuService.getBoard()
        .then((board: IBoard) => {
          this._board = board;
          this._unusedCounts = this.unusedCounterService.countUnusedNumbers(this._board);
          this.changeDetectorRef.markForCheck();
        })
  }
}
