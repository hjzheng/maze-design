import Cell, { ICell } from "./Cell";
import ascii from "./display/ascii";
import svg from "./display/svg";
import canvas from "./display/canvas";

export default class Grid<T extends ICell> {
    public cells: T[][];
    public cols: number;
    public rows: number;
    constructor(rows: number, cols: number) {
        this.cols = cols;
        this.rows = rows;
        this.cells = [];
        this.init();
    }

    init() {
        for (let row = 0; row < this.rows; row++) {
            this.cells[row] = [];
            for (let col = 0; col < this.cols; col++) {
                this.cells[row].push(new (Cell as any as { new(row: number, col: number): T })(row, col));
            }
        }
        this.configureCells();
    }

    configureCells(): void {
        this.eachCell(cell => {
            cell.north = this.cells[cell.row - 1]?.[cell.col];
            cell.south = this.cells[cell.row + 1]?.[cell.col];
            cell.west = this.cells[cell.row]?.[cell.col - 1];
            cell.east = this.cells[cell.row]?.[cell.col + 1];
        });
    }

    size(): number {
        return this.rows * this.cols;
    }

    isInBounds(cell: T): boolean {
        return cell.row >= 0 && cell.row < this.rows && cell.col >= 0 && cell.col < this.cols;
    }

    randomCell(): T {
        const row = Math.floor(Math.random() * this.rows);
        const col = Math.floor(Math.random() * this.cols);
        return this.cells[row][col];
    }

    eachRow(callback: (row: T[]) => void): void {
        this.cells.forEach(callback);
    }

    eachCell(callback: (cell: T) => void): void {
        this.cells.forEach(row => row.forEach(callback));
    }

    getCell(row: number, col: number): T | undefined {
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
            return undefined;
        }
        return this.cells[row][col];
    }

    // 获取所有的死胡同
    deadends(): T[] {
        const deadends: T[] = [];
        this.eachCell(cell => {
            if (cell.links.length === 1) {
                deadends.push(cell);
            }
        });
        return deadends;
    }

    // 编排
    braid(p = 1.0) {
        const cells = this.deadends();
        for (let i=0; i<cells.length; i++) {
            if (cells[i].links.length !== 1 && Math.random() < p) {
                continue;
            } else {
                const neighbors = cells[i].getNeighbors().filter(neighbor => !cells[i].linked(neighbor));
                let best = neighbors.filter(neighbor => neighbor.links.length === 1);
                best = best.length > 0 ? best : neighbors;
                const neighbor = best[Math.floor(Math.random() * best.length)];
                cells[i].link(neighbor);
            }
        }
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