// @ts-nocheck
// TODO Grid3D 继承 Grid 后，由于 Cells 需要升级成三维数组，目前没有好方法兼容类型检测，暂时禁用 TS 类型检查 

import Grid from "./Grid";
import CubeCell from "./CubeCell";
import cubeSvg from './display/cubeSvg';

export default class CubeGird extends Grid<CubeCell> {
    constructor(dim: number) {
        super(dim, dim, 6);
    }

    init(): void {
        for (let i = 0; i < this.levels; i++) { // 在这里 levels 是 face 也就是 立方体的 6 个面
            this.cells[i] = []
            for (let j = 0; j < this.rows; j++) {
                this.cells[i][j] = []
                for (let k = 0; k < this.cols; k++) {
                    this.cells[i][j][k] = new CubeCell(i, j, k);
                }
            }
        }
        this.configureCells();
    }

    configureCells(): void {
        this.eachCell(cell => {
            const { face, row, col } = cell;
            cell.north = this.getCell(face, row - 1, col);
            cell.south = this.getCell(face, row + 1, col);
            cell.west = this.getCell(face, row, col-1);
            cell.east = this.getCell(face, row, col+1);
        })
    }

    getCell(face: number, row: number, col: number): CubeCell | undefined {
        if (face >= 0 && face < this.levels) {
            const [d0, d1, d2] = this.wrap(face, row, col);
            return this.cells[d0][d1][d2];
        }
    }


    randomCell(): CubeCell {
        const face = Math.floor(Math.random() * this.levels)
        const row = Math.floor(Math.random() * this.rows);
        const col = Math.floor(Math.random() * this.cols);

        return this.getCell(face, row, col);
    }

    size(): number {
        return this.levels * this.rows * this.cols;
    }

    eachFace(callback: (row: CubeCell[][]) => void) {
        this.cells.forEach(callback);
    }

    eachRow(callback: (row: CubeCell[]) => void): void {
        this.cells.forEach(level => {
            level.forEach(callback);
        });
    }

    eachCell(callback: (cell: CubeCell) => void): void {
        this.cells.forEach(face => {
            face.forEach((row => {
                row.forEach(cell => {
                    callback(cell);
                })
            }));
        });
    }

    wrap(face: number, row: number, col: number) {
        let n = this.rows - 1;

        if (row < 0) {
            if (face === 0) return [4, col, 0];
            if (face === 1) return [4, n, col];
            if (face === 2) return [4, n - col, n];
            if (face === 3) return [4, 0, n - col];
            if (face === 4) return [3, 0, n - col];
            if (face === 5) return [1, n, col];
        } else if (row >= this.rows) {
            if (face === 0) return [5, n-col, 0];
            if (face === 1) return [5, 0, col];
            if (face === 2) return [5, col, n];
            if (face === 3) return [5, n, n - col];
            if (face === 4) return [1, 0, col];
            if (face === 5) return [3, n, n - col];
        } else if (col < 0) {
            if (face === 0) return [3, row, n];
            if (face === 1) return [0, row, n];
            if (face === 2) return [1, row, n];
            if (face === 3) return [2, row, n];
            if (face === 4) return [0, 0, row];
            if (face === 5) return [0, n, n-row];
        } else if (col >= this.cols) {
            if (face === 0) return [1, row, 0];
            if (face === 1) return [2, row, 0];
            if (face === 2) return [3, row, 0];
            if (face === 3) return [0, row, 0];
            if (face === 4) return [2, 0, n - row];
            if (face === 5) return [2, n, row];
        }

        return [face, row, col]

    }

    toSVG(): string {
        return cubeSvg(this);
    }

}