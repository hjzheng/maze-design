import Cell from "./Cell";
export default class HexCell extends Cell {
    northeast?: HexCell;
    northwest?: HexCell;
    southeast?: HexCell;
    southwest?: HexCell;
    constructor(row: number, column: number) {
        super(row, column);
    }
    getNeighbors(): HexCell[] {
        const neighbors: HexCell[] = [];
        if (this.northeast) {
            neighbors.push(this.northeast);
        }
        
        if (this.northwest) {
            neighbors.push(this.northwest);
        }
        
        if (this.southeast) {
            neighbors.push(this.southeast);
        }
        
        if (this.southwest) {
            neighbors.push(this.southwest);
        }
        
        if (this.south) {
            neighbors.push(this.south as HexCell);
        }

        if (this.north) {
            neighbors.push(this.north as HexCell);
        }
        return neighbors;
    }
}