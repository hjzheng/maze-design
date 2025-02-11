import WaveGrid from "./WaveGrid";
import { SimpleOverCell } from "./WaveCells";

export default class PreconfiguredWaveGrid extends WaveGrid {
    constructor(rows: number, cols: number) {
        super(rows, cols);
    }

    init(): void {
        this.underCells = [];
        for (let row = 0; row < this.rows; row++) {
            this.cells[row] = [];
            for (let col = 0; col < this.cols; col++) {
                this.cells[row][col] = new SimpleOverCell(row, col, this);
            }
        }
        this.configureCells();
    }
}