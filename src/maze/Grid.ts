import Cell, { ICell } from "./Cell";

export default class Grid {
    public cells: ICell[][];
    public cols: number;
    public rows: number;
    constructor(rows: number, cols: number) {
        this.cols = cols;
        this.rows = rows;
        this.cells = [];
        for (let row = 0; row < rows; row++) {
            this.cells[row] = [];
            for (let col = 0; col < cols; col++) {
                this.cells[row].push(new Cell(row, col));
            }
        }
        this.configureCells();
    }

    configureCells(): void {
        this.cells.forEach(row => {
            row.forEach(cell => {
                cell.north = this.cells[cell.row - 1]?.[cell.col];
                cell.south = this.cells[cell.row + 1]?.[cell.col];
                cell.west = this.cells[cell.row]?.[cell.col - 1];
                cell.east = this.cells[cell.row]?.[cell.col + 1];
            })
        });
    }

    size(): number {
        return this.rows * this.cols;
    }

    isInBounds(cell: ICell): boolean {
        return cell.row >= 0 && cell.row < this.rows && cell.col >= 0 && cell.col < this.cols;
    }

    randomCell(): ICell {
        const row = Math.floor(Math.random() * this.rows);
        const col = Math.floor(Math.random() * this.cols);
        return this.cells[row][col];
    }

    eachRow(callback: (row: ICell[]) => void): void {
        this.cells.forEach(callback);
    }

    eachCell(callback: (cell: ICell) => void): void {
        this.cells.forEach(row => row.forEach(callback));
    }
}