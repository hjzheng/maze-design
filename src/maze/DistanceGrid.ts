import Grid from "./Grid";
import { ICell } from "./Cell";
import Distances from "./solution/Distance";
import ascii from "./display/ascii";
import svg from "./display/svg";
import canvas from "./display/canvas";

export default class DistanceGrid extends Grid {
    distances: Distances | undefined;
    constructor(rows: number, cols: number) {
        super(rows, cols);
    }

    setDistances(distances: Distances) {
        this.distances = distances;
    }

    // override
    toSVG(): string {
        return svg(this, (cell: ICell) => {
            const number = this?.distances?.get(cell);
            return number!== undefined && number!== Infinity?  number?.toString() : '';
        });
    }

    // override
    toString(): string {
        return ascii(this, (cell: ICell) => {
            const number = this?.distances?.get(cell);
            return number !== undefined && number !== Infinity ?  number?.toString()?.padEnd(3) : '';
        });
    }

    canvasDraw(canvasEle: HTMLCanvasElement) {
        canvas(canvasEle, this, (cell: ICell) => {
            const number = this?.distances?.get(cell);
            return number!== undefined && number!== Infinity?  number?.toString() : '';
        });
    }
}