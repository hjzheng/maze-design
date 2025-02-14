import Cell from "./Cell";
import ColorGrid from "./ColorGrid";

export default class CylinderGrid extends ColorGrid<Cell> {
    getCell(row: number, col: number): Cell | undefined {
        if (row < 0 || row > this.rows - 1) return;
        return this.cells[row][(col + this.cols) % (this.cols)];
    }
}