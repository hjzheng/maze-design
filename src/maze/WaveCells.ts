import Cell from "./Cell";
import WaveGrid from "./WaveGrid";

export class OverCell extends Cell {

    grid: WaveGrid;

    constructor(row: number, col: number, grid: WaveGrid) {
        super(row, col);
        this.grid = grid
    }
    getNeighbors(): OverCell[] {
        let neighbors = super.getNeighbors();
        if (this.canTunnelNorth()) {
            neighbors.push(this.north?.north as OverCell);
        }
        if (this.canTunnelSouth()) {
            neighbors.push(this.south?.south as OverCell);
        }
        if (this.canTunnelEast()) {
            neighbors.push(this.east?.east as OverCell);
        }
        if (this.canTunnelWest()) {
            neighbors.push(this.west?.west as OverCell);
        }
        return neighbors as OverCell[];
    }

    canTunnelNorth(): boolean {
        return !!this?.north && !!this?.north?.north && !!this?.north?.horizontalPassage?.();
    }

    canTunnelSouth(): boolean {
        return !!this?.south && !!this?.south?.south && !!this?.south?.horizontalPassage?.();
    }

    canTunnelEast(): boolean {
        return !!this?.east && !!this?.east?.east && !!this?.east?.verticalPassage?.();
    }

    canTunnelWest(): boolean {
        return !!this?.west && !!this?.west?.west && !!this?.west?.verticalPassage?.();
    }

    horizontalPassage(): boolean {
        return this.linked(this.east as Cell) && this.linked(this.west as Cell) && !this.linked(this.north as Cell) && !this.linked(this.south as Cell);
    }

    verticalPassage(): boolean {
        return this.linked(this.north as Cell) && this.linked(this.south as Cell) &&!this.linked(this.east as Cell) &&!this.linked(this.west as Cell);
    }

    link(cell: OverCell): void {
        let neighbor = null
        if (this.north && this.north === cell.south) {
            neighbor = this.north;
        } else if (this.south && this.south === cell.north) {
            neighbor = this.south;
        } else if (this.east && this.east === cell.west) {
            neighbor = this.east;
        } else if (this.west && this.west === cell.east) {
            neighbor = this.west;
        }

        console.log(neighbor);
        if (neighbor) {
            this.grid.tunnelUnder(neighbor as OverCell)
        } else {
            super.link(cell)
        }
    }
}

export class UnderCell extends Cell {
    constructor(overCell: OverCell) {
        super(overCell.row, overCell.col);

        if (overCell.horizontalPassage()) {
            this.north = overCell.north;
            if (overCell.north) {
                overCell.north.south = this;
            }
            this.south = overCell.south;
            if (overCell.south) {
                overCell.south.north = this;
            }
            if (this.north) {
                this.link(this.north as Cell)
            }
            if (this.south) {
                this.link(this.south as Cell)
            }   
        }

        if (overCell.verticalPassage()) {
            this.west = overCell.west;
            if (overCell.west) {
                overCell.west.east = this;
            }
            this.east = overCell.east;
            if (overCell.east) {
                overCell.east.west = this;
            }

            if (this.west) {
                this.link(this.west as Cell)
            }
            if (this.east) {
                this.link(this.east as Cell)
            }
        }
    }

    horizontalPassage(): boolean {
        return !!this.east || !!this.west;
    }

    verticalPassage(): boolean {
        return !!this.north || !!this.south;
    }
}

export class SimpleOverCell extends OverCell {
    constructor(row: number, col: number, grid: WaveGrid) {
        super(row, col, grid);
    }

    getNeighbors(): SimpleOverCell[] {
        let neighbors = super.getNeighbors();
        if (this.north) {
            neighbors.push(this.north as SimpleOverCell);
        }
        if (this.south) {
            neighbors.push(this.south as SimpleOverCell);
        }
        if (this.east) {
            neighbors.push(this.east as SimpleOverCell);
        }
        if (this.west) {
            neighbors.push(this.west as SimpleOverCell);
        }
        return neighbors;
    }
}