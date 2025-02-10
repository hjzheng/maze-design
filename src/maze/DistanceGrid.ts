import Grid from "./Grid";
import { ICell } from "./Cell";
import Distances from "./solution/Distance";
import ascii from "./display/ascii";
import svg from "./display/svg";
import canvas from "./display/canvas";

export default class DistanceGrid<T extends ICell> extends Grid<T> {
    distances: Distances | undefined;
    constructor(rows: number, cols: number) {
        super(rows, cols);
    }

    setDistances(distances?: Distances) {
        this.distances = distances;
    }

    getCellContent(cell: T): string {
        const number = this?.distances?.get(cell);
        return number !== undefined && number !== Infinity ? number?.toString() : '';
    }

    // override
    toSVG(cellBgColor?: (cell: T) => string, inset?: number): string {
        return svg(this, this.getCellContent.bind(this), cellBgColor ? cellBgColor : undefined, inset || 0);
    }

    // override
    toString(): string {
        return ascii(this, (cell: T) => {
            const number = this?.distances?.get(cell);
            return number !== undefined && number !== Infinity ?  number?.toString()?.padEnd(3) : '';
        });
    }

    canvasDraw(canvasEle: HTMLCanvasElement, cellBgColor?: (cell: T) => string,) {
        canvas(canvasEle, this, this.getCellContent.bind(this), cellBgColor ? cellBgColor : undefined);
    }
}