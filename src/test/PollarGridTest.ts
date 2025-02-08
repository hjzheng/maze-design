import PollarGrid from "../maze/PolarGrid";
import RecursiveBacktracker from "../maze/gen/recursiveBacktracker";

export default function pollarGridTest(): string {
    const maskGrid = new PollarGrid(10);
    const recursiveBacktracker = new RecursiveBacktracker();
    recursiveBacktracker.on(maskGrid);
    console.log(maskGrid.toString());
    return maskGrid.toSVG();
} 