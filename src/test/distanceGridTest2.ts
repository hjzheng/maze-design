import DistanceGrid from '../maze/DistanceGrid';
import Sidewinder from '../maze/gen/sidewinder';

// Dijkstra
export default function distanceGridTest2(): string {
    const grid = new DistanceGrid(10, 10);
    const sidewinder = new Sidewinder();
    sidewinder.on(grid);
    // 去除所有死角
    grid.braid(1);

    console.log('distances all', grid.getCell(0, 0)?.distances());
    let distances = grid.getCell(0, 0)?.distances();
    
    grid.setDistances(distances);
    
    console.log(grid.toString());
    return grid.toSVG();
}