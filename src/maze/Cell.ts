export interface ICell {
    row: number;
    col: number;
    north?: ICell;
    south?: ICell;
    east?: ICell;
    west?: ICell;
    links: ICell[];

    link(cell: ICell, bidi?: boolean): void;
    unlink(cell: ICell, bidi?: boolean): void;
    linked(cell: ICell | undefined): boolean;

    getNeighbors(): ICell[];
}

export default class Cell implements ICell {
    row: number;
    col: number;
    north?: ICell;
    south?: ICell;
    east?: ICell;
    west?: ICell;
    links: ICell[]; // array of cells
    
    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
        this.links = [];
    }

    link(cell: ICell): void {
        this.links.push(cell);
        cell.links.push(this);
    }

    unlink(cell: ICell): void {
        this.links = this.links.filter(link => link !== cell);
        cell.links = cell.links.filter(link => link !== this);
    }

    linked(cell: ICell): boolean {
        return this.links.includes(cell);
    }


    getNeighbors(): ICell[] {
        const neighbors: ICell[] = [];
        if (this.north) neighbors.push(this.north);
        if (this.south) neighbors.push(this.south);
        if (this.east) neighbors.push(this.east);
        if (this.west) neighbors.push(this.west);
        return neighbors;
    }
}