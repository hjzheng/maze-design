import Cell from "./Cell";

export default class TrangleCell extends Cell {
   
    constructor(row: number, col: number) {
        super(row, col);
    }

    isUpRight(): boolean {
        return (this.col + this.row ) % 2 === 0;
    }

    getNeighbors(): TrangleCell[] {
        const neighbors: TrangleCell[] = [];
        if (this.west) {
            neighbors.push(this.west as TrangleCell);
        }

        if (this.east) {
            neighbors.push(this.east as TrangleCell);
        }

        if (!this.isUpRight()) {
            if (this.north) {
                neighbors.push(this.north as TrangleCell);
            }
        }

        if (this.isUpRight()) {
            if (this.south) {
                neighbors.push(this.south as TrangleCell);
            }
        }

        return neighbors;
    }
}