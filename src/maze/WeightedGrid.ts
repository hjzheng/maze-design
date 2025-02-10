import ColorGrid from "./ColorGrid";
import WeightedCell from "./WeightedCell";

export default class WeightedGrid extends ColorGrid<WeightedCell>{
    constructor(rows: number, cols: number) {
        super(rows, cols);
    }

    init(): void {
        for (let row = 0; row < this.rows; row++) {
            this.cells[row] = [];
            for (let col = 0; col < this.cols; col++) {
                this.cells[row][col] = new WeightedCell(row, col);
            }
        }
        this.configureCells();
    }

    genCellBgColor(cell: WeightedCell): string {
        let color = `rgb(255, 255, 255)`;
        const weight = cell.weight;
        if (weight > 1) {
            color = `rgba(255, 0, 0, 0.3)`;
        } else if (this.distances) {
            const distance = this.distances.get(cell);
            const { distance: max } = this.distances.max();
            
            if (distance && distance !== Infinity) {
                const intansity = 60 + 191 * (max - distance) / max;
                color = `rgba(${intansity}, ${intansity}, 0, 0.3)`;
            }
        } 

        return color;
    }

    toSVG(): string {
        return super.toSVG(this.genCellBgColor.bind(this));
    }
}