import { ICell } from "../Cell";
import Grid from "../Grid";

export class SimplifiedPrims {
    on<T extends ICell>(grid: Grid<T>) {
        const startCell = grid.randomCell();
        let active: T[] = [startCell];

        while (active.length > 0) {
            const randomIndex = Math.floor(Math.random() * active.length);
            const cell = active[randomIndex];
            const neighbors = cell.getNeighbors();
            const unlinkedNeighbors = neighbors.filter(n => n.links.length === 0);

            if (unlinkedNeighbors.length > 0) {
                const randomNeighborIndex = Math.floor(Math.random() * unlinkedNeighbors.length);
                const randomNeighbor = unlinkedNeighbors[randomNeighborIndex];
                cell.link(randomNeighbor);
                active.push(randomNeighbor as T);
            } else {
                active.splice(randomIndex, 1);
            }
        }
    }
}

function min<T extends ICell>(cells: T[], costs: Map<T, number>) {
    let minCell = cells[0];
    let minCost = costs.get(minCell)!;
    for (let i = 1; i < cells.length; i++) {
        const cell = cells[i];
        const cost = costs.get(cell)!;
        if (cost < minCost) {
            minCell = cell;
            minCost = cost;
        }
    }

    return minCell;
}

export class Prims {
    on<T extends ICell>(grid: Grid<T>) {
        const startCell = grid.randomCell();
        let active: T[] = [startCell];
        let costs = new Map<T, number>();
        grid.eachCell(cell => {
            costs.set(cell, 100 * Math.random());
        });
        while (active.length > 0) {

            let cell = min(active, costs);
            const neighbors = cell.getNeighbors();
            const unlinkedNeighbors = neighbors.filter(n => n.links.length === 0);
            
            if (unlinkedNeighbors.length > 0) {
                let neighbor = min(unlinkedNeighbors, costs);
                cell.link(neighbor);
                active.push(neighbor as T);
                // costs.delete(neighbor as T);
            } else {
                active.splice(active.indexOf(cell), 1);
            }
        }
    }
}