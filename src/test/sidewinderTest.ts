import Grid from '../maze/Grid';
import Sidewinder from '../maze/gen/sidewinder';
import ascii from '../maze/display/ascii';
import svg from '../maze/display/svg';

export default function sidewinderTest(): string {
    const grid = new Grid(10, 10);
    console.log(ascii(grid));
    const sidewinder = new Sidewinder();
    sidewinder.on(grid);
    const res = ascii(grid);
    console.log(res);
    return svg(grid);
}