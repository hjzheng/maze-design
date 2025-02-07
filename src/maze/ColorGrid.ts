import Grid from "./Grid";
import { ICell } from "./Cell";
import Distances from "./solution/Distance";
import svg from "./display/svg";

export default class ColorGrid extends Grid {

    distances: Distances | undefined;
    constructor(rows: number, cols: number) {
        super(rows, cols);
    }

    setDistances(distances: Distances) {
        this.distances = distances;
    }

    // override
    toSVG(): string {

        const { distance: maxDistance } = this.distances?.max() || { distance: 0 };

        return svg(this, (cell: ICell) => {
            const number = this?.distances?.get(cell);
            return number !== undefined && number !== Infinity ?  number?.toString() : '';
        }, (cell: ICell) => {
            const number = this?.distances?.get(cell) ?? 0;
            const intensity = maxDistance - number;
            const dark = Math.floor(255 * intensity / maxDistance);
            const bright = 128 + Math.floor(127 * intensity / maxDistance);
            return `rgb(${dark}, ${bright}, ${dark})`;
        });
    }
}
   