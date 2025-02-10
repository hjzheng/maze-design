import DistanceGrid from "./DistanceGrid";
import { ICell } from "./Cell";

export default class ColorGrid<T extends ICell> extends DistanceGrid<T> {

    constructor(rows: number, cols: number) {
        super(rows, cols);
    }

    getCellBgColor(cell: T) {
        const currentCellNumber = this?.distances?.get(cell);
        if (currentCellNumber === Infinity || currentCellNumber === undefined) return 'white';
        const { distance: maxDistance } = this.distances?.max() || { distance: 0 };
        const intensity = maxDistance - currentCellNumber;
        const dark = Math.floor(255 * intensity / maxDistance);
        const bright = 128 + Math.floor(127 * intensity / maxDistance);
        return `rgb(${dark}, ${bright}, ${dark})`;
    }

    // override
    toSVG(cellBgColor?: (cell: T) => string, inset?: number): string {
        return super.toSVG(cellBgColor || this.getCellBgColor.bind(this), inset || 0);
    }

    canvasDraw(canvasEle: HTMLCanvasElement, cellBgColor?: (cell: T) => string) {
        super.canvasDraw(canvasEle, cellBgColor || this.getCellBgColor.bind(this));
    }
}
