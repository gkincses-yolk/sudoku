export interface ICell {
  value(): string;
  orig(): boolean;
  highlight(): boolean;
  display(): string;
}