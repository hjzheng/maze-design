import Grid from '../maze/Grid';
import Sidewinder from '../maze/gen/sidewinder';

export default function sidewinderTest(): string {
    const grid = new Grid(10, 10);
    console.log(grid.toString());
    const sidewinder = new Sidewinder();
    sidewinder.on(grid);
    return grid.toSVG();
}