export interface ISudokuBlock {
    cells: () => string[];
    cellAt: (index: number) => string;
}

export interface ISudokuBoard {
    blocks: () => ISudokuBlock[];
    blockAt: (index: number) => ISudokuBlock;
}