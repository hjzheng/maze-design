import Grid from "./Grid";
import { ICell } from "./Cell";
import Distances from "./solution/Distance";
import svg from "./display/svg";
import canvas from "./display/canvas";

const getCellContent = (number: number) => {
    return number !== undefined && number !== Infinity ? number?.toString() : '';
}

const genCellBgColor = (currentCellNumber: number, maxDistance: number) => {
    const intensity = maxDistance - currentCellNumber;
    const dark = Math.floor(255 * intensity / maxDistance);
    const bright = 128 + Math.floor(127 * intensity / maxDistance);
    return `rgb(${dark}, ${bright}, ${dark})`;
}

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
            return getCellContent(this?.distances?.get(cell) ?? 0);
        }, (cell: ICell) => {
            return genCellBgColor(this?.distances?.get(cell) ?? 0, maxDistance);
        });
    }

    canvasDraw(canvasEle: HTMLCanvasElement) {
        const { distance: maxDistance } = this.distances?.max() || { distance: 0 };
        canvas(canvasEle, this, (cell: ICell) => {
            return getCellContent(this?.distances?.get(cell)?? 0);
        }, (cell: ICell) => {
            return genCellBgColor(this?.distances?.get(cell) ?? 0, maxDistance);
        });
    }
}
