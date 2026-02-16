import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {SudokuService} from './service/sudoku.service';
import {IBoard} from './model/i-board';
import {Board} from "./model/board";
import {Block} from "./model/block";
import {IBlock} from "./model/i-block";
import {Cell} from "./model/cell";
import {UnusedCounterService} from "./service/unused-counter.service";
import {IUnused} from "./model/i-unused";
import {Unused} from "./model/unused";
import {HighlightCellsService} from "./service/highlight-cells.service";

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
  private readonly highlightCellsService: HighlightCellsService = inject(HighlightCellsService);

  private _ix = 0;

  _block: IBlock = new Block(this._ix++, Array(9).fill(new Cell("", true)));
  _board: IBoard = new Board(Array(9).fill(this._block));
  _unusedCounts: IUnused[] = Array(9).fill(new Unused(9));

  private _selectedNumber: number = 0;

  constructor() {
    this.updateBoard();
  }

  updateBoard(): void {
    this.sudokuService.getBoard()
        .then((board: IBoard) => {
          this._board = board;
          console.log(`Updating ${JSON.stringify(board)}`);
          this._unusedCounts = this.unusedCounterService.countUnusedNumbers(this._board);
          this.markSelected(this._selectedNumber);
          this.changeDetectorRef.markForCheck();
        });
  }

  markSelected(number: number): void {
    if (number === 0) {
      return;
    }
    this._unusedCounts[number - 1].setSelected();
    this._selectedNumber = number;
    this.highlightCellsService.markHighlights(this._board, number);
  }

  unmarkSelected(number: number): void {
    if (number === 0) {
      return;
    }
    this._unusedCounts[number - 1].unsetSelected();
    this._selectedNumber = 0;
    this.highlightCellsService.markHighlights(this._board, 0);
  }

  select(number: number): void {
    console.log(`select ${number}`);
    if (this._selectedNumber === number) {
      this.unmarkSelected(number);
    } else {
      this.unmarkSelected(this._selectedNumber);
      this.markSelected(number);
    }
  }

  fill(blockIx: number, cellIx: number): boolean {
    console.log(`fill ${blockIx}:${cellIx}`);
    if (this._selectedNumber === 0) {
      return false;
    }
    this.sudokuService.fillCell(blockIx, cellIx, this._selectedNumber).then(() => {
      this.updateBoard();
      return true;
    });
    return true;
  //   if () {
  //     this.updateBoard();
  //     return true;
  //   } else {
  //     this._board.blockAt(blockIx).cellAt(cellIx).setError();
  //     setTimeout(() => {
  //       this._board.blockAt(blockIx).cellAt(cellIx).clearError();
  //       this.updateBoard();
  //     }, 1000);
  //     return false;
  //   }
  }

  display(blockIx: number, cellIx: number): string {
    return this._board.blockAt(blockIx).cellAt(cellIx).display();
  }

  value(blockIx: number, cellIx: number): string {
    return this._board.blockAt(blockIx).cellAt(cellIx).value();
  }
}
