import { ICell } from '../maze/Cell';
import CubeGrid from '../maze/CubeGrid';
import RecursiveBacktracker from '../maze/gen/recursiveBacktracker';
import Grid from '../maze/Grid';

export default function cubeGridTest() {
    const grid = new CubeGrid(10);
    const gen = new RecursiveBacktracker();
    // @ts-ignore
    gen.on(grid as Grid<ICell>);
    return grid.toSVG();
}