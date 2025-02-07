import { ICell } from "../Cell";

export default class Distances {
    root: ICell;
    cells: Map<ICell, number> = new Map();
    constructor(root: ICell) {
        this.root = root;
        this.cells = new Map();
        this.cells.set(root, 0);
    }
    set(cell: ICell, distance: number): void {
        this.cells.set(cell, distance);
    }
    get(cell: ICell): number {
        return this.cells.get(cell) ?? Infinity;
    }

    has(cell: ICell): boolean {
        return this.cells.has(cell);
    }

    // Dijkstra's algorithm
    toGoal(goal: ICell): Distances {
        const distances = new Distances(this.root);
        let current = goal;
        distances.set(current, this.get(current));
        while (current !== this.root) {
            for (let i=0; i< current.links.length; i++) {
                const cell = current.links[i];
                if (this.get(cell) < this.get(current)) {
                    distances.set(cell, this.get(cell));
                    current = cell;
                    break;
                }
            }
        }
        return distances;
    }
}