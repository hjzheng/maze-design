import CylinderGrid from '../maze/CylinderGrid';
import RecursiveBacktracker from '../maze/gen/recursiveBacktracker';

export default function cylinderGridTest() {
    const grid = new CylinderGrid(7, 16);
    const gen = new RecursiveBacktracker();
    gen.on(grid);
    return grid.toSVG();
}