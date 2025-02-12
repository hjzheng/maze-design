import Cell from "./Cell";

export default class Cell3D extends Cell {
    level: number
    up?: Cell3D
    down?: Cell3D

    constructor(level: number, row: number, column: number) {
        super(row, column)
        this.level = level;
    }

    getNeighbors(): Cell3D[] {
        let neighbors = super.getNeighbors() || [] as Cell3D[];
        if (this.up) neighbors.push(this.up);
        if (this.down) neighbors.push(this.down);
        return neighbors as Cell3D[];
    }
}