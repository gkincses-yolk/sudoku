import {IBlock} from "./i-block";

export class Block implements IBlock {
  private readonly _ix: number = 0;
  private readonly _cells: string[] = [];

  constructor(ix: number, cells: string[]) {
    this._ix = ix;
    this._cells = cells;
  }

  cells(): string[] {
    return this._cells;
  }

  cellAt(ix: number): string {
    return  this._cells[ix];
  }

  ix(): number {
    return this._ix;
  }
}