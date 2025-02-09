import Grid from '../Grid';
import { ICell } from '../Cell';

export default class BinaryTree {
    on(grid: Grid<ICell>): Grid<ICell> {
        grid.eachCell((cell: ICell) => {
            const neighbors: ICell[] = [];

            if (cell.north) neighbors.push(cell.north);
            if (cell.east) neighbors.push(cell.east);
            
            const neighbor = neighbors[Math.floor(Math.random() * neighbors.length)];

            if (neighbor) {
                cell.link(neighbor);
            }
        });
        return grid;
    }
}