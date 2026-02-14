import {IBlock} from "./i-block";
import {ICell} from "./i-cell";

export class Block implements IBlock {
  private readonly _ix: number = 0;
  private readonly _cells: ICell[] = [];

  constructor(ix: number, cells: ICell[]) {
    this._ix = ix;
    this._cells = cells;
  }

  cells(): ICell[] {
    return this._cells;
  }

  cellAt(ix: number): ICell {
    return this._cells[ix];
  }

  ix(): number {
    return this._ix;
  }
}