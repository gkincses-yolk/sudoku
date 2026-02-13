export interface ISudokuBlock {
    _cells: string[];
}

export interface ISudokuBoard {
    _blocks: ISudokuBlock[];
}