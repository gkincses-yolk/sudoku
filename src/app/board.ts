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
    _blocks: Array(9).fill({ _cells: Array(9).fill(""), }),
  };

  printvalue(board: ISudokuBoard, ix: number) {
    console.log(`Fetched block ${ix}: ${JSON.stringify(board._blocks[ix])}`);
  }

  constructor() {
    this.sudokuService.getBoard()
        .then((board: ISudokuBoard) => {
          this.board = board;
          for (let ix = 0; ix < 9; ix++) {
            this.printvalue(this.board, ix);
          }
          this.changeDetectorRef.markForCheck();
        })
  }
}
