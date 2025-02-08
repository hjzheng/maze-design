import Grid from "./Grid";
import Mask from "./tools/Mask";
import Cell from "./Cell";

export default class MaskGrid extends Grid {
    mask: Mask;
    constructor(mask: Mask) {
        const { rows, cols } = mask;
        super(rows, cols);
        this.mask = mask;
        this.cells = [];
        for (let row = 0; row < rows; row++) {
            this.cells[row] = [];
            for (let col = 0; col < cols; col++) {
                if (mask.get(row, col)) {
                    this.cells[row].push(new Cell(row, col));
                } else {
                    // 不创建单元格，只占位
                    // @ts-ignore
                    this.cells[row].push(undefined);
                }
            }
        }
        console.log(this.cells)
        this.configureCells();
    }

    configureCells(): void {
        this.cells.forEach(row => {
            row.forEach(cell => {
                if (!cell) return;
                cell.north = this.cells[cell.row - 1]?.[cell.col];
                cell.south = this.cells[cell.row + 1]?.[cell.col];
                cell.west = this.cells[cell.row]?.[cell.col - 1];
                cell.east = this.cells[cell.row]?.[cell.col + 1];
            })
        });
    }
    setMask(mask: Mask) {
        this.mask = mask;
    }
}