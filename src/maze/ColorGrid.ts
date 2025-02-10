import DistanceGrid from "./DistanceGrid";
import { ICell } from "./Cell";
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

export default class ColorGrid<T extends ICell> extends DistanceGrid<T> {

    constructor(rows: number, cols: number) {
        super(rows, cols);
    }

    // override
    toSVG(cellBgColor?: (cell: T) => string): string {
        const { distance: maxDistance } = this.distances?.max() || { distance: 0 };
        return svg(this, (cell: T) => {
            return getCellContent(this?.distances?.get(cell) ?? 0);
        }, cellBgColor ? cellBgColor : (cell: T) => {
            return genCellBgColor(this?.distances?.get(cell) ?? 0, maxDistance);
        });
    }

    canvasDraw(canvasEle: HTMLCanvasElement) {
        const { distance: maxDistance } = this.distances?.max() || { distance: 0 };
        canvas(canvasEle, this, (cell: T) => {
            return getCellContent(this?.distances?.get(cell)?? 0);
        }, (cell: T) => {
            return genCellBgColor(this?.distances?.get(cell) ?? 0, maxDistance);
        });
    }
}
