import Grid from "../Grid";
import { ICell } from "../Cell";

export default class RecursiveBacktracker {
    on(grid: Grid) {
        let stack = [];
        let startCell: ICell = grid.randomCell();
        stack.push(startCell);

        while (stack.length > 0) {
            const current = stack[stack.length - 1];
            const unvisitedNeighbors: ICell[] = current?.getNeighbors()?.filter(n => n.links?.length === 0) || [];
            if (unvisitedNeighbors.length > 0) {
                const randomNeighbor = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
                current.link(randomNeighbor);
                stack.push(randomNeighbor);
            } else {
                stack.pop();
            }
        }
        return grid;
    }
}