import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {SudokuService} from './service/sudoku-service';
import {ISudokuBlock,ISudokuBoard} from './i-sudoku-block';

@Component({
  selector: 'board',
  imports: [],
  templateUrl: './board.html',
  styleUrls: ['./board.css'],
})

export class Board {
  title = 'Gabor\'s Sudoku Board';

  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  sudokuService: SudokuService = inject(SudokuService);

  board: ISudokuBoard = new SudokuBoard([
      new SudokuBlock(["x", "", "", "", "", "", "", "", ""]),
      new SudokuBlock(["", "", "", "", "", "", "", "", ""]),
      new SudokuBlock(["", "", "", "", "", "", "", "", ""]),
      new SudokuBlock(["", "", "", "", "", "", "", "", ""]),
      new SudokuBlock(["", "", "", "", "y", "", "", "", ""]),
      new SudokuBlock(["", "", "", "", "", "", "", "", ""]),
      new SudokuBlock(["", "", "", "", "", "", "", "", ""]),
      new SudokuBlock(["", "", "", "", "", "", "", "", ""]),
      new SudokuBlock(["", "", "", "", "", "", "", "", "z"])
  ]);

  printvalue(board: ISudokuBoard, ix: number) {
    console.log(`Fetched block ${ix}: ${JSON.stringify(board.blockAt(ix))}`);
  }

  constructor() {
    this.sudokuService.getBoard()
        .then((board: ISudokuBoard) => {
          console.log(typeof board);
          console.log(typeof board.blockAt(0));
          for (let ix = 0; ix < 9; ix++) {
            this.printvalue(board, ix);
          }

          this.board = board;
          console.log(typeof this.board);
          console.log(typeof this.board.blockAt(0));
          for (let ix = 0; ix < 9; ix++) {
            this.printvalue(this.board, ix);
          }
          this.changeDetectorRef.markForCheck();
        })
  }
}

export class SudokuBlock implements ISudokuBlock {
  private readonly _cells: string[];

  constructor(s: string[]) {
    this._cells = s;
  }

  cells() {
    return this._cells;
  }

  cellAt(ix: number): string {
    return this._cells[ix];
  }
}

export class SudokuBoard implements ISudokuBoard {
  private readonly _blocks: ISudokuBlock[];

  constructor(blocks: ISudokuBlock[]) {
    this._blocks = blocks;
  }

  blocks() {
    return this._blocks;
  }

  blockAt(ix: number): ISudokuBlock {
    return this._blocks[ix];
  }
}
