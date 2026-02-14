import {Injectable} from '@angular/core';
import {Block} from "../model/block";
import {Board} from "../model/board";
import {IBoard} from "../model/i-board";
import {Cell} from "../model/cell";
import {IBlock} from "../model/i-block";
import {ICell} from "../model/i-cell";

@Injectable({
  providedIn: 'root',
})

export class SudokuService {

  _url = 'http://localhost:3000/blocks';
  _emptyBlock: IBlock = new Block(0, Array(9).fill(""));
  _emptyBoard: IBoard = new Board(Array(9).fill(this._emptyBlock));
  _emptyCell: ICell = new Cell("", true, false);

  async getBoard(): Promise<IBoard> {
    const response = await fetch(this._url);
    if (!response.ok) {
      console.log(`Failed to fetch board: ${response.status}`);
      return this._emptyBoard;
    }
    const board: IBoard = await response.json().then(
        (jsonData) => {
          let ix = 0;
          console.log(`Fetched board data: ${JSON.stringify(jsonData)}`);
          return new Board(
              jsonData.map(
                  (blockData: any) => {
                    console.log(`Processing block data: ${JSON.stringify(blockData)}`);
                    if (blockData && blockData.cells && Array.isArray(blockData.cells)) {
                      return new Block(ix++,
                          blockData.cells.map(
                              (cellData: any) => {
                                if (cellData && cellData.value) {
                                  return new Cell(cellData.value, cellData.orig, cellData.highlight);
                                } else {
                                  return this._emptyCell;
                                }
                              }
                          ));
                    } else {
                      console.warn(`Invalid block data: ${JSON.stringify(blockData)}`);
                      return this._emptyBlock;
                    }
                  }));
        }
    );
    return board ?? this._emptyBoard;
  }
}
