import Grid from '../Grid';
import { ICell } from '../Cell';

export default class Sidewinder {
    on(grid: Grid): Grid {
        grid.eachRow((row: ICell[]) => {
            let run: ICell[] = [];
            row.forEach((cell: ICell) => {
                run.push(cell);
                const atEasternBoundary = cell.east === undefined;
                const atNorthernBoundary = cell.north === undefined;
                const shouldCloseOut = atEasternBoundary || (!atNorthernBoundary && Math.random() > 0.5);
                if (shouldCloseOut) {
                    const member = run[Math.floor(Math.random() * run.length)];
                    if (member.north) {
                        member.link(member.north);
                    }
                    run = [];
                } else {
                    if (cell.east) cell.link(cell.east);
                }
            });
        });
        return grid;
    }
}