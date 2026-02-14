import {IUnused} from "./i-unused";

export class Unused implements IUnused {
  private readonly _count: number = 0;

  constructor(count: number) {
    this._count = count;
  }

  count(): number {
    return this._count;
  }

  display(): string {
    if (this._count === 0) {
      return "none-unused";
    } else {
      return "any-unused";
    }
  }

}