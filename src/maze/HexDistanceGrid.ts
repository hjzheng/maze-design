import HexGrid from "./HexGrid";
import Distances from "./solution/Distance";
import { ICell } from "./Cell";

const genCellBgColor = (currentCellNumber: number, maxDistance: number) => {
    const intensity = maxDistance - currentCellNumber;
    const dark = Math.floor(255 * intensity / maxDistance);
    const bright = 128 + Math.floor(127 * intensity / maxDistance);
    return `rgb(${dark}, ${bright}, ${dark})`;
}

export default class HexDistanceGrid extends HexGrid {
    distances: Distances | undefined;
    constructor(rows: number, cols: number) {
        super(rows, cols);
    }
    setDistances(distances?: Distances) {
        this.distances = distances;
    }
    // override
    toSVG(): string {
        const { distance: maxDistance } = this.distances?.max() || { distance: 0 };
        return super.toSVG((cell: ICell) => {
            const number = this?.distances?.get(cell);
            return number!== undefined && number!== Infinity?  number?.toString() : '';
        }, (cell: ICell) => {
            return genCellBgColor(this?.distances?.get(cell) ?? 0, maxDistance);
        })
    }

}