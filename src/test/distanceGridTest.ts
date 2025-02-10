import DistanceGrid from '../maze/DistanceGrid';
// import Sidewinder from '../maze/gen/sidewinder';
import Kruskal from '../maze/gen/kruskal';

// Dijkstra shortest path
export default function distanceGridTest(): string {
    const grid = new DistanceGrid(20, 20);
    const gen = new Kruskal();
    gen.on(grid);

    console.log('distances all', grid.getCell(0, 0)?.distances());
    let distances = grid.getCell(0, 0)?.distances();

    distances = distances?.toGoal(grid?.getCell(19, 19));
    console.log('distances toGoal', distances);
    
    grid.setDistances(distances);
    
    console.log(grid.toString());
    return grid.toSVG(undefined, 2);
}