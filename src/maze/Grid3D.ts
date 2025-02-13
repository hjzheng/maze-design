// @ts-nocheck

// TODO Grid3D 继承 Grid 后，由于 Cells 需要升级成三维数组，目前没有好方法兼容类型检测，暂时禁用 TS 类型检查 
import Grid from "./Grid"
import Cell3D from "./Cell3D"
import points from "./display/points"

export default class Grid3D extends Grid<Cell3D> {
    constructor(rows: number, cols: number, levels: number) {
        super(rows, cols, levels)
        this.init();
    }

    init(): void {
        for (let i=0; i<this.levels; i++) {
            this.cells[i] = []
            for (let j=0; j<this.rows; j++) {
                this.cells[i][j] = []
                for (let k=0; k<this.cols; k++) {
                    this.cells[i][j][k] = new Cell3D(i, j, k);
                }
            }
        }

        this.configureCells();
    }

    configureCells(): void {
        this.eachCell(cell => {
            const { level, row, col } = cell;
            cell.north = this.getCell(level, row - 1, col);
            cell.south = this.getCell(level, row + 1, col);
            cell.west = this.getCell(level, row, col-1);
            cell.east = this.getCell(level, row, col+1);
            cell.down = this.getCell(level-1, row, col);
            cell.up = this.getCell(level+1, row, col);
        })
    }

    getCell(level: number, row: number, col: number): Cell3D | undefined {
        if (level >=0 && level < this.levels && row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
            return this.cells[level][row][col];
        }
    }
    

    randomCell(): Cell3D {
        const level = Math.floor(Math.random() * this.levels)
        const row = Math.floor(Math.random() * this.rows);
        const col = Math.floor(Math.random() * this.cols);

        return this.cells[level][row][col];
    }

    size(): number {
        return this.levels * this.rows * this.cols;
    }

    eachLevel(callback: (row: Cell3D[][]) => void) {
        this.cells.forEach(callback);
    }

    eachRow(callback: (row: Cell3D[]) => void): void {
        this.cells.forEach(level => {
            level.forEach(callback);
        });
    }

    eachCell(callback: (cell: Cell3D) => void): void {
        this.cells.forEach(level => {
            level.forEach((row => {
                row.forEach(cell => {
                    callback(cell);
                })
            }));
        });
    }

    toPoints() {
        return points(this);
    }

}