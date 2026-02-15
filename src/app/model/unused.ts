import {IUnused} from "./i-unused";

export class Unused implements IUnused {
  private readonly _count: number = 0;
  private _selected: boolean = false;

  constructor(count: number) {
    this._count = count;
  }

  count(): number {
    return this._count;
  }

  setSelected(): void {
    this._selected = true;
  }

  unsetSelected(): void {
    this._selected = false;
  }

  display(): string {
    if (this._selected) {
      return 'selected';
    }
    if (this._count === 0) {
      return 'none-unused';
    } else {
      return 'any-unused';
    }
  }

}