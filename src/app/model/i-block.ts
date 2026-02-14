import {ICell} from "./i-cell";

export interface IBlock {
  cells(): ICell[];
  cellAt(ix: number): ICell;
  ix(): number;
}
