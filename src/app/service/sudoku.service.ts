import {Injectable} from '@angular/core';
import {Block} from "../model/block";
import {Board} from "../model/board";
import {IBoard} from "../model/i-board";
import {Cell} from "../model/cell";
import {IBlock} from "../model/i-block";
import {ICell} from "../model/i-cell";
import {FillCellDto} from "../dto/fill-cell.dto";

@Injectable({
  providedIn: 'root',
})

export class SudokuService {

  private readonly _url = 'http://localhost:3000/board';
  private readonly _emptyCell: ICell = new Cell("", true);
  private readonly _emptyBlock: IBlock = new Block(0, Array(9).fill(this._emptyCell));
  private readonly _emptyBoard: IBoard = new Board(Array(9).fill(this._emptyBlock));

  async getBoard() {
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
                    console.log(`Processing block: ${JSON.stringify(blockData)}`);
                    if (blockData && blockData.cells && Array.isArray(blockData.cells)) {
                      return new Block(ix++,
                          blockData.cells.map(
                              (cellData: any) => {
                                if (cellData && cellData.value) {
                                  return new Cell(cellData.value, cellData.orig);
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
    console.log(`Built board: ${JSON.stringify(board)}`);
    return board ?? this._emptyBoard;
  }

  async fillCell(blockIx: number, cellIx: number, value: number) {
    console.log(`fill ${blockIx}:${cellIx} - ${value}`);
    const dto = new FillCellDto(blockIx, cellIx, value);
    console.log(`dto: ${JSON.stringify(dto)}`);
    const response = await fetch(this._url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(dto)
    });
    console.log(response);
    return true;
  }
}
