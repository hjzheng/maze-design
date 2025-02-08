import Cell, { ICell } from "./Cell";
import ascii from "./display/ascii";
import svg from "./display/svg";
import canvas from "./display/canvas";

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

    getCell(row: number, col: number): ICell {
        return this.cells[row][col];
    }

    toString(): string {
        return ascii(this);
    }

    toSVG(): string {
        return svg(this);
    }

    canvasDraw(canvasEle: HTMLCanvasElement) {
        canvas(canvasEle, this);
    }
}