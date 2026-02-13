import {Injectable} from '@angular/core';
import {ISudokuBlock, ISudokuBoard} from '../i-sudoku-block';

@Injectable({
  providedIn: 'root',
})

export class SudokuService {

  url = 'http://localhost:3000/blocks';

  emptyBlock: ISudokuBlock = {
    _cells: Array(9).fill(""),
  };

  emptyBoard: ISudokuBoard = {
    _blocks: Array(9).fill(this.emptyBlock),
  };

  async getBoard(): Promise<ISudokuBoard> {
    const response = await fetch(this.url);
    if (!response.ok) {
      console.log(`Failed to fetch board: ${response.status}`);
      return this.emptyBoard;
    }
    const board: ISudokuBoard = await response.json().then(
        (jsonData) => {
          console.log(`Fetched board data: ${JSON.stringify(jsonData)}`);
          const board: ISudokuBoard = {
            _blocks: jsonData.map(
                (blockData: any) => {
                  console.log(`Processing block data: ${JSON.stringify(blockData)}`);
                  if (blockData && blockData.cells && Array.isArray(blockData.cells)) {
                    return {_cells: blockData.cells,};
                  } else {
                    console.warn(`Invalid block data: ${JSON.stringify(blockData)}`);
                    return this.emptyBlock;
                  }
                })
          };
          return board;
        }
    );
    return board ?? this.emptyBoard;
  }
}
