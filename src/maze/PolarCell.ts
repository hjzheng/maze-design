import Cell, { ICell } from "./Cell";

export interface IPolarCell extends ICell {
    cw: IPolarCell | null;
    ccw: IPolarCell | null;
    inward: IPolarCell | null;
    outward: IPolarCell[];
}

export default class PolarCell extends Cell {
    cw: IPolarCell | null = null;
    ccw: IPolarCell | null = null;
    inward: IPolarCell | null = null;
    outward: IPolarCell[] = [];
    constructor(row: number, column: number) {
        super(row, column);
        this.outward = []
    }

    getNeighbors(): IPolarCell[] {
        const neighbors = [];
        if (this.cw) {
            neighbors.push(this.cw);
        }
        if (this.ccw) {
            neighbors.push(this.ccw);
        }
        if (this.inward) {
            neighbors.push(this.inward);
        }
        this.outward.forEach(cell => {
            neighbors.push(cell);
        });
        return neighbors;
    }
}