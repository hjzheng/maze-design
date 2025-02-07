import Cell, { ICell } from "../Cell";
import Grid from "../Grid";

export default function ascii(grid: Grid, cellContent?: (cell: ICell) => string): string {
    let s = '';
    s += '+'; // top left corner
    for (let i = 0; i < grid.cols; i++) {
        s += '---+';
    }
    s += '\n';
    grid.eachRow(row => {
        let top = '|';
        let bottom = '+';
        row.forEach((cell: ICell) => {
            if (!cell) cell = new Cell(-1, -1); 

            const body = cellContent ? (cellContent(cell) || '   ') : '   ';
            let east_boundary = cell.linked(cell?.east) ? ' ' : '|';
            top += body + east_boundary;
            const south_boundary = cell.linked(cell?.south) ? '   ' : '---';
            bottom += south_boundary + '+';
        });
        s += top + '\n';
        s += bottom + '\n';
    });
    return s;
}