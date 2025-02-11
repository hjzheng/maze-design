import Grid from "../Grid";
import { ICell } from "../Cell";
import WaveGrid from "../WaveGrid";
import { OverCell } from "../WaveCells";

type SetNumber = number;

export class State<T extends ICell> {
    grid: WaveGrid | Grid<T>;
    neighbors: T[][];
    set2Cells: Map<SetNumber, T[]>;
    cell2Set: Map<T, SetNumber>;

    constructor(grid: Grid<T>) {
        this.grid = grid;
        this.neighbors = [];
        this.set2Cells = new Map();
        this.cell2Set = new Map();

        this.grid.eachCell((cell: T) => {

            let setNumber = this.cell2Set.size;
            this.set2Cells.set(setNumber, [cell]);
            this.cell2Set.set(cell, setNumber);

            if (cell.south) {
                this.neighbors.push([cell, cell.south as T]);
            }
            if (cell.east) {
                this.neighbors.push([cell, cell.east as T]);
            }
        });
    }

    canMerge(left: T, right: T) {
        if (left && right) {
            return this.cell2Set.get(left)!== this.cell2Set.get(right);
        }
        return false;
    }

    merge(left: T, right: T) {
       if(!left || !right) return;
       left.link(right);
       let winner = this.cell2Set.get(left)!;
       let loser = this.cell2Set.get(right)!;
       let losersCells = this.set2Cells.get(loser) || [];

       losersCells?.forEach(cell => {
        this.cell2Set?.set(cell, winner);
       });

       this.set2Cells.set(winner, [...(this.set2Cells.get(winner) || []), ...(losersCells)]);
       
       this.set2Cells.delete(loser);
    }

    addCrossing(cell: T) {
        if (cell.links.length > 0 || (cell?.east &&  cell?.west && !this.canMerge(cell?.east as T, cell?.west as T)) || ( cell?.north && cell?.south && !this.canMerge(cell?.north as T, cell?.south as T))) {
            return false;
        }

        this.neighbors = this.neighbors.filter(([left, right]) => {
            return left !== cell && right !== cell;
        })

        if (Math.random() > 0.5) {
            this.merge(cell.west as T, cell);
            this.merge(cell, cell?.east as T);
            if (this.grid instanceof WaveGrid) {
                this.grid.tunnelUnder(cell as unknown as OverCell);
            }
            this.merge(cell?.north as T, cell?.north?.south as T);
            this.merge(cell?.south as T, cell?.south?.north as T);
        } else {
            this.merge(cell?.north as T, cell);
            this.merge(cell, cell?.south as T);
            if (this.grid instanceof WaveGrid) {
                this.grid.tunnelUnder(cell as unknown as OverCell);
            }
            this.merge(cell?.west as T, cell?.west?.east as T);
            this.merge(cell?.east as T, cell?.east?.west as T);
        }
    }

}

export default class Kruskal {
    on<T extends ICell>(grid: Grid<T>, state: State<T> = new State(grid)) {
        while (state.neighbors.length > 0) {
            let index = Math.floor(Math.random() * state.neighbors.length);
            let pair = state.neighbors[index];
            if (state.canMerge(pair[0], pair[1])) {
                state.merge(pair[0], pair[1]);
            }
            state.neighbors.splice(index, 1);
        }
    }
}