import Grid from '../Grid';

export default class AldousBroder {
    on(grid: Grid) {
        let cell = grid.randomCell();
        let unvisited = grid.size() - 1;
        while (unvisited > 0) {
            const neighbor = cell.randomNeighbor();
            if (neighbor?.links?.length === 0) {
                cell.link(neighbor);
                unvisited--;
            }
            cell = neighbor!;
        }
    }
}