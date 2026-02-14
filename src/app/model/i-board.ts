import {IBlock} from "./i-block";

export interface IBoard {
  blocks(): IBlock[];
  blockAt(ix: number): IBlock;
}