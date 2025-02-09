import { ICell } from "../Cell";
import Grid from "../Grid";

export default class HuntAndKill {
    on(grid: Grid<ICell>) {
        let current: ICell | undefined = grid.randomCell();
        while (current) {
            const unvisitedNeighbors: ICell[] = current.getNeighbors()?.filter(n => n.links?.length === 0) || [];
            if (unvisitedNeighbors.length > 0) {
                const randomNeighbor = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
                current.link(randomNeighbor);
                current = randomNeighbor;
            } else {
                current = undefined;
                outer: for (let row = 0; row < grid.rows; row++) {
                    for (let col = 0; col < grid.cols; col++) {
                        const cell = grid.getCell(row, col);
                        const visitedNeighbors: ICell[] = cell?.getNeighbors()?.filter(n => n.links?.length > 0) || [];
                        if (visitedNeighbors.length > 0 && cell?.links?.length === 0) {
                            const randomVisitedNeighbor = visitedNeighbors[Math.floor(Math.random() * visitedNeighbors.length)];
                            cell.link(randomVisitedNeighbor);
                            current = cell;
                            break outer;
                        }
                    }
                }
            }
        }

        return grid;
    }
}