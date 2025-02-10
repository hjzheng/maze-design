import DistanceGrid from '../maze/DistanceGrid';
import Sidewinder from '../maze/gen/sidewinder';

// Dijkstra shortest path
export default function distanceGridTest(): string {
    const grid = new DistanceGrid(10, 10);
    const sidewinder = new Sidewinder();
    sidewinder.on(grid);

    console.log('distances all', grid.getCell(0, 0)?.distances());
    let distances = grid.getCell(0, 0)?.distances();

    distances = distances?.toGoal(grid?.getCell(9, 9));
    console.log('distances toGoal', distances);
    
    grid.setDistances(distances);
    
    console.log(grid.toString());
    return grid.toSVG();
}