import ColorGrid from "./ColorGrid";
import { OverCell, UnderCell } from "./WaveCells";
import waveSvg from "./display/waveSvg";


export default class WaveGrid extends ColorGrid<OverCell | UnderCell> {

    underCells: UnderCell[] = [];
    constructor(rows: number, cols: number) {
        super(rows, cols);
    }
    init(): void {
        this.underCells = [];
        for (let row = 0; row < this.rows; row++) {
            this.cells[row] = [];
            for (let col = 0; col < this.cols; col++) {
                this.cells[row][col] = new OverCell(row, col, this);
            }
        }
        this.configureCells();
    }

    tunnelUnder(cell: OverCell) {
        const underCell = new UnderCell(cell);
        this.underCells.push(underCell)
    }

    eachCell(callback: (cell: OverCell | UnderCell) => void): void {

        this.cells.forEach(row => {
            row.forEach(cell => {
                callback(cell);
            })
        });

        this.underCells.forEach(cell => {
            callback(cell);
        })
    }

    toSVG(cellBgColor?: (cell: OverCell | UnderCell) => string, inset: number = 5): string {
        return waveSvg(this, super.getCellContent.bind(this), cellBgColor ? cellBgColor : super.getCellBgColor.bind(this), inset);
    }
}