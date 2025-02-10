import ColorGrid from "./ColorGrid";
import PolarCell from "./PolarCell";


export default class PolarGrid extends ColorGrid<PolarCell> {
    constructor(rows: number) {
        super(rows, 0);
    }

    init() {
        const rowsArray = new Array(this.rows);
        const rowHeight = 1.0 / this.rows
        rowsArray[0] = [new PolarCell(0, 0)];

        for (let i = 1; i < this.rows; i++) {
            const row: PolarCell[] = [];
            const radius = i * rowHeight;
            const circumference = 2 * Math.PI * radius;

            const previousCount = rowsArray[i - 1].length;

            const estimatedCellWidth = circumference / previousCount;

            const ratio = Math.round(estimatedCellWidth / rowHeight);

            const cells = previousCount * ratio;

            for (let j = 0; j < cells; j++) {
                row.push(new PolarCell(i, j));
            }
            rowsArray[i] = row;
        }

        this.cells = rowsArray;
        this.configureCells();
    }

    configureCells(): void {
        this.cells.forEach((rowCells) => {
            rowCells.forEach((cell) => {
                const { row, col } = cell;
                if (row > 0) {
                    (cell as any).cw = this.getCell(row, col + 1);
                    (cell as any).ccw = this.getCell(row, col - 1);
                    let ratio = this.cells[row].length / this.cells[row - 1].length;
                    let parent = this.cells[row - 1][Math.floor(col / ratio)] as PolarCell;
                    parent.outward.push(cell as PolarCell);
                    (cell as PolarCell).inward = parent;
                }
            });
        });
    }

    // override
    getCell(row: number, col: number): PolarCell {
        return this.cells[row][col % this.cells[row].length] as PolarCell;
    }

    toSVG(cellBgColor?: ((cell: PolarCell) => string) | undefined): string {
        return this._toSVG(super.getCellContent.bind(this), cellBgColor || super.getCellBgColor.bind(this));
    }

    // override
    _toSVG(cellContent?: (cell: PolarCell) => string, cellBgColor?: (cell: PolarCell) => string): string {
        const cellSize = 30; // 单元格大小，可调整
        const strokeWidth = 1; // 线条粗细，可调整
        const imageSize = 2 * cellSize * this.rows;

        let svg = `<svg width="${imageSize + 1}" height="${imageSize + 1}">`;
        const center = imageSize / 2;


        // 绘制墙壁 (根据链接情况)
        this.eachCell((cell) => {
            if (!cell) return; // 跳过空单元格

            const c = cell as PolarCell;
            const theta = 2 * Math.PI / this.cells[c.row].length;
            const innerRadius = c.row * cellSize;
            const outerRadius = (c.row + 1) * cellSize;
            const thetaCCW = c.col * theta;
            const thetaCW = (c.col + 1) * theta;

            const ax = center + innerRadius * Math.cos(thetaCCW);
            const ay = center + innerRadius * Math.sin(thetaCCW);
            const bx = center + outerRadius * Math.cos(thetaCCW);
            const by = center + outerRadius * Math.sin(thetaCCW);

            const cx = center + innerRadius * Math.cos(thetaCW);
            const cy = center + innerRadius * Math.sin(thetaCW);
            const dx = center + outerRadius * Math.cos(thetaCW);
            const dy = center + outerRadius * Math.sin(thetaCW);

            if (cellContent) {
                // 添加背景
                // 绘制弧度形
                if (cellBgColor) {
                    let path = `M ${ax} ${ay} L ${bx} ${by} A ${outerRadius+1} ${outerRadius+1} 0 0 1 ${dx} ${dy} L ${cx} ${cy} L ${ax} ${ay} Z`;
                    if (cell.row === 0) {
                        path = 'M '
                        const theta = 2 * Math.PI / this.cells[1].length;
                        for (let i = 0; i < this.cells[1].length; i++) {
                            const x = center + cellSize * Math.cos(theta * i);
                            const y = center + cellSize * Math.sin(theta * i);
                            if (i === this.cells[1].length - 1) {
                                path += `${x} ${y} `;
                            } else {
                                path += `${x} ${y} L `;
                            }
                        }
                        path += `Z`;
                    }
                    svg += `<path d="${path}" fill="${cellBgColor(c)}" />`;
                }
                const textX = cell.row !== 0 ? (ax + bx + cx + dx) / 4 : center;
                const textY = cell.row !== 0 ? (ay + by + cy + dy) / 4 : center;
                svg += `<text x="${textX}" y="${textY}" text-anchor="middle" dominant-baseline="middle">${cellContent(c)}</text>`;
            }

            if (!cell?.links?.includes(c.cw as PolarCell) && cell.row !== 0) {
                svg += `<line x1="${cx}" y1="${cy}" x2="${dx}" y2="${dy}" stroke="black" stroke-width="${strokeWidth}" />`; // 如果北边没有邻居，绘制北边墙壁
            }

            if (!cell?.links?.includes(c.inward as PolarCell)) {
                svg += `<line x1="${ax}" y1="${ay}" x2="${cx}" y2="${cy}" stroke="black" stroke-width="${strokeWidth}" />`; // 如果西边没有邻居，绘制西边墙壁
            }
        });

        // 绘制圆形
        svg += `<circle cx="${center}" cy="${center}" r="${cellSize * this.rows}" stroke="black" stroke-width="${strokeWidth}" fill="none" />`;

        svg += '</svg>';
        return svg;
    }
    // override
    toString(): string {
        return 'not support now';
    }
}