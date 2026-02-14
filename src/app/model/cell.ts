import {ICell} from "./i-cell";

export class Cell implements ICell {
  private readonly _value: string = "";
  private readonly _orig: boolean = false;
  private readonly _highlight: boolean = false;

  constructor(value: string, orig: boolean, highlight: boolean) {
    this._value = value;
    this._orig = orig;
    this._highlight = highlight;
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
  display(): string {
    if (!this._orig && this._highlight) {
      return "filled-highlight";
    }
    let clazz = "";
    if (!this._orig) {
      clazz += "filled ";
    }
    if (this.highlight()) {
      clazz += "highlight ";
    }
    return clazz;
  }
}