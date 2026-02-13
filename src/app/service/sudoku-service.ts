import {Injectable} from '@angular/core';
import {ISudokuBoard} from '../i-sudoku-block';
import {SudokuBlock, SudokuBoard} from "../board";

@Injectable({
  providedIn: 'root',
})

export class SudokuService {

  url = 'http://localhost:3000/blocks';

  async getBoard(): Promise<ISudokuBoard> {
    const response = await fetch(this.url);
    if (!response.ok) {
      console.log(`Failed to fetch blocks: ${response.status}`);
      return new SudokuBoard([]);
    }
    const board: void | ISudokuBoard = await response.json().then(
        (jsonData) => {
          console.log(`Fetched board data: ${JSON.stringify(jsonData)}`);
          const board: ISudokuBoard = jsonData.map((blockData: any) => {
            console.log(`Processing block data: ${JSON.stringify(blockData)}`);
            if (blockData && blockData.cells && Array.isArray(blockData.cells)) {
              return new SudokuBlock(blockData.cells);
            } else {
              console.warn(`Invalid block data: ${JSON.stringify(blockData)}`);
              return new SudokuBlock(["", "", "", "", "", "", "", "", ""]);
            }
          });
          console.log(JSON.stringify(board));
          console.log(JSON.stringify((<ISudokuBoard>board).blockAt(0)));
          return board;
        }
    )
    return board ?? new SudokuBoard([]);
  }
}
