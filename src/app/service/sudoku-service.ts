import {Injectable} from '@angular/core';
import {ISudokuBoard} from '../i-sudoku-block';

@Injectable({
  providedIn: 'root',
})

export class SudokuService {

  url = 'http://localhost:3000/blocks';

  emptyBoard: ISudokuBoard = {
    _size: 9,
    _blocks: Array(9).fill({ _size: 9, _cells: ["", "", "", "", "", "", "", "", ""] }),
  };

  async getBoard(): Promise<ISudokuBoard> {
    const response = await fetch(this.url);
    if (!response.ok) {
      console.log(`Failed to fetch blocks: ${response.status}`);
      return this.emptyBoard
    }
    const board: void | ISudokuBoard = await response.json().then(
        (jsonData) => {
          console.log(`Fetched board data: ${JSON.stringify(jsonData)}`);
          const board: ISudokuBoard = jsonData.map((blockData: any) => {
            console.log(`Processing block data: ${JSON.stringify(blockData)}`);
            if (blockData && blockData.cells && Array.isArray(blockData.cells)) {
              return this.emptyBoard;
            } else {
              console.warn(`Invalid block data: ${JSON.stringify(blockData)}`);
              return {
                _size: 9,
                _cells: ["", "", "", "", "", "", "", "", ""],
              };
            }
          });
          console.log(typeof board);
          // console.log(typeof board._blocks[0]);
          console.log(JSON.stringify(board));
          // console.log(JSON.stringify(board._blocks[0]));
          return board;
        }
    )
    return board ?? this.emptyBoard;
  }
}
