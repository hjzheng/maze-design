import ColorGrid from '../maze/ColorGrid';
import Sidewinder from '../maze/gen/sidewinder';

export default function distanceGridTest2(): string {
    const grid = new ColorGrid(10, 10);
    const sidewinder = new Sidewinder();
    sidewinder.on(grid);

    console.log('distances all', grid.getCell(0, 0)?.distances());
    let distances = grid.getCell(0, 0)?.distances();
    
    grid.setDistances(distances);
    
    console.log(grid.toString());
    return grid.toSVG();
}