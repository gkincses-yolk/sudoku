import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {SudokuService} from './service/sudoku-service';
import {ISudokuBoard} from './i-sudoku-block';

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

  board: ISudokuBoard = {
    _size: 9,
    _blocks: [
      { _size: 9, _cells: ["x", "", "", "", "", "", "", "", ""]},
      { _size: 9, _cells: ["", "", "", "", "", "", "", "", ""]},
      { _size: 9, _cells: ["", "", "", "", "", "", "", "", ""]},
      { _size: 9, _cells: ["", "", "", "", "", "", "", "", ""]},
      { _size: 9, _cells: ["", "", "", "", "y", "", "", "", ""]},
      { _size: 9, _cells: ["", "", "", "", "", "", "", "", ""]},
      { _size: 9, _cells: ["", "", "", "", "", "", "", "", ""]},
      { _size: 9, _cells: ["", "", "", "", "", "", "", "", ""]},
      { _size: 9, _cells: ["", "", "", "", "", "", "", "", "z"]},
    ],
  };

  printvalue(board: ISudokuBoard, ix: number) {
    console.log(`Fetched block ${ix}: ${JSON.stringify(board._blocks[ix])}`);
  }

  constructor() {
    this.sudokuService.getBoard()
        .then((board: ISudokuBoard) => {
          console.log(typeof board);
          console.log(typeof board._blocks[0]);
          for (let ix = 0; ix < 9; ix++) {
            this.printvalue(board, ix);
          }

          this.board = board;
          console.log(typeof this.board);
          console.log(typeof this.board._blocks[0]);
          for (let ix = 0; ix < 9; ix++) {
            this.printvalue(this.board, ix);
          }
          this.changeDetectorRef.markForCheck();
        })
  }
}
