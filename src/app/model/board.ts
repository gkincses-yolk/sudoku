import {IBoard} from "./i-board";
import {IBlock} from "./i-block";

export class Board implements IBoard {
  private readonly _blocks: IBlock[] = [];

  constructor(blocks: IBlock[]) {
    this._blocks = blocks;
  }

  blocks(): IBlock[] {
    return this._blocks;
  }

  blockAt(ix: number): IBlock {
    return this._blocks[ix];
  }
}