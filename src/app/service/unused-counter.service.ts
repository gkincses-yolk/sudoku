import {IBoard} from "../model/i-board";
import {IUnused} from "../model/i-unused";
import {Unused} from "../model/unused";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})

export class UnusedCounterService {
  countUnusedNumbers(board: IBoard): IUnused[] {
    let usedCounts: number[] = Array(9).fill(0);
    console.log(`attempting to count unuseds: ${JSON.stringify(board)}`);
    board.blocks().forEach((block) => {
      block.cells().forEach((cell) => {
        ++usedCounts[+cell.value() - 1];
      })
    });
    console.log(`Used up: ${JSON.stringify(usedCounts)}`);
    let unusedCounts: IUnused[] = [];
    for (let ix = 0; ix < 9; ix++) {
      unusedCounts[ix] = new Unused(9 - usedCounts[ix]);
    }
    console.log(`Unused counts: ${JSON.stringify(unusedCounts.map(value => value.count()))}`);
    return unusedCounts;
  }
}