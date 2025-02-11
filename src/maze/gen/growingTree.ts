import { ICell } from "../Cell";
import Grid from "../Grid";

export default class GrowingTree {
    on<T extends ICell>(grid: Grid<T>, pickCell: (active: T[]) => T = (active: T[]) => active[Math.floor(Math.random() * active.length)]) {
        let current = grid.randomCell();
        let active: T[] = [current];
        while (active.length > 0) {
            const cell = pickCell(active);
            const neighbors = cell.getNeighbors();
            const unlinkedNeighbors = neighbors.filter(cell => cell.links.length === 0);

            if (unlinkedNeighbors?.length > 0) {
                const neighbor = unlinkedNeighbors[Math.floor(Math.random() * unlinkedNeighbors.length)];
                cell?.link(neighbor);
                active.push(neighbor as T);
            } else {
                active.splice(active.indexOf(cell), 1);
            }
        }
    }
}