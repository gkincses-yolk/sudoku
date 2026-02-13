export interface ISudokuBlock {
    _size: number;
    _cells: string[];
}

export interface ISudokuBoard {
    _size: number;
    _blocks: ISudokuBlock[];
}