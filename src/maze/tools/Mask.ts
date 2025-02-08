export default class Mask {
    mask: boolean[][];
    rows: number;
    cols: number;
    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.mask = Array.from({ length: rows }, () => Array(cols).fill(true));
    }
    set(row: number, col: number, value: boolean) {
        this.mask[row][col] = value;
    }

    get(row: number, col: number) {
        return this.mask[row][col];
    }

    count() {
        let count = 0;
        for (let row = 0; row < this.mask.length; row++) {
            for (let col = 0; col < this.mask[row].length; col++) {
                if (this.mask[row][col]) {
                    count++;
                }
            }
        }
        return count;
    }
}