import {ICell} from "./i-cell";

export class Cell implements ICell {
  private _value: string = "";
  private _orig: boolean = false;
  private _highlight: boolean = false;
  private _error: boolean = false;

  constructor(value: string, orig: boolean) {
    this._value = value;
    this._orig = orig;
  }

  value(): string {
    return this._value;
  }
  orig(): boolean {
    return this._orig;
  }
  highlight(): boolean {
    return this._highlight;
  }
  setHighlight() {
    this._highlight = true;
  }
  clearHighlight() {
    this._highlight = false;
  }
  setError() {
    this._error = true;
  }
  clearError() {
    this._error = false;
  }
  display(): string {
    if (this._error) {
      return 'error';
    }
    if (!this._orig && this._highlight) {
      return 'filled-highlight';
    }
    let clazz = '';
    if (!this._orig) {
      clazz += 'filled ';
    }
    if (this.highlight()) {
      clazz += 'highlight ';
    }
    return clazz;
  }
}