export interface IBlock {
  cells(): string[];
  cellAt(ix: number): string;
  ix(): number;
}
