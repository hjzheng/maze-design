import Mask from "../maze/tools/Mask";
import MaskGrid from "../maze/MaskGrid";
import RecursiveBacktracker from "../maze/gen/recursiveBacktracker";

export default function maskGridTest(): string {
    const mask = new Mask(10, 10);
    mask.set(0, 0, false);
    mask.set(0, 9, false);
    mask.set(5, 5, false);
    mask.set(9, 0, false);
    mask.set(9, 9, false);
    const maskGrid = new MaskGrid(mask);
    const recursiveBacktracker = new RecursiveBacktracker();
    recursiveBacktracker.on(maskGrid);
    console.log(maskGrid.toString());
    return maskGrid.toSVG();
} 