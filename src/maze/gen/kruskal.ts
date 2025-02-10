import Grid from "../Grid";
import { ICell } from "../Cell";

type SetNumber = number;

class State<T extends ICell> {
    grid: Grid<T>;
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
        return this.cell2Set.get(left) !== this.cell2Set.get(right);
    }

    merge(left: T, right: T) {
       left.link(right);
       let winner = this.cell2Set.get(left)!;
       let loser = this.cell2Set.get(right)!;
       let losersCells = this.set2Cells.get(loser)!;

       losersCells.forEach(cell => {
        this.cell2Set.set(cell, winner);
       });

       this.set2Cells.set(winner, [...this.set2Cells.get(winner)!, ...losersCells]);
       
       this.set2Cells.delete(loser);
    }

}

export default class Kruskal {
    on<T extends ICell>(grid: Grid<T>) {
        let state = new State(grid);
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