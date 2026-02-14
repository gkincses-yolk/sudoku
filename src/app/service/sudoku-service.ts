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

  private readonly _url = 'http://localhost:3000/board';
  private readonly _emptyCell: ICell = new Cell("", true, false);
  private readonly _emptyBlock: IBlock = new Block(0, Array(9).fill(this._emptyCell));
  private readonly _emptyBoard: IBoard = new Board(Array(9).fill(this._emptyBlock));

  async getBoard(): Promise<IBoard> {
    const response = await fetch(this._url);
    if (!response.ok) {
      console.log(`Failed to fetch board: ${response.status}`);
      return this._emptyBoard;
    }
    const board: IBoard = await response.json().then(
        (jsonData) => {
          console.log(`Fetched json: ${JSON.stringify(jsonData)}`);
          let ix = 0;
          return new Board(
              jsonData.blocks?.map(
                  (blockData: any) => {
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
