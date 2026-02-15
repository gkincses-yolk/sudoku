export interface ICell {
  value(): string;
  orig(): boolean;
  highlight(): boolean;
  setHighlight(): void;
  clearHighlight(): void;
  setError(): void;
  clearError(): void;
  display(): string;
}