import TrangleCell from "./TrangleCell";
import ColorGrid from "./ColorGrid";

export default class TrangleGrid extends ColorGrid<TrangleCell> {
    constructor(rows: number, cols: number) {
        super(rows, cols);
    }

    init() {
        for (let row = 0; row < this.rows; row++) {
            this.cells[row] = [];
            for (let col = 0; col < this.cols; col++) {
                this.cells[row][col] = new TrangleCell(row, col);
            }
        }
        this.configureCells();
    }

    configureCells(): void {
        this.cells.forEach(row => {
            row.forEach(cell => {
                cell.west = this.cells[cell.row]?.[cell.col - 1];
                cell.east = this.cells[cell.row]?.[cell.col + 1];
                if (!cell.isUpRight()) {
                    cell.north = this.cells[cell.row - 1]?.[cell.col];
                } else {
                    cell.south = this.cells[cell.row + 1]?.[cell.col];
                }
            })
        });
    }

    toSVG(cellBgColor?: ((cell: TrangleCell) => string) | undefined): string {
        return this._toSVG(super.getCellContent.bind(this), cellBgColor || super.getCellBgColor.bind(this));
    }

    _toSVG(cellContent?: (cell: TrangleCell) => string, cellBgColor?: (cell: TrangleCell) => string): string {
        let size = 60; // 三角形边
        let half_size = size / 2;
        let height = size * Math.sin(60 * Math.PI / 180);
        let half_height = height / 2;

        let svg = `<svg width="${(this.cols + 1) * size / 2}" height="${this.rows * height}">`;

        this.eachCell((cell: TrangleCell) => {
            if (!cell) return; // 跳过空单元格
            
            // 三角形中心坐标
            let cx = half_size + cell.col * half_size;
            let cy = half_height + cell.row * height;

            // 定点坐标
            let tx = cx;
            let ty = cy - half_height;

            let lx = cx - half_size;
            let ly = cy + half_height;

            let rx = cx + half_size;
            let ry = cy + half_height;

            if (!cell.isUpRight()) {
                ty = cy + half_height;
                ly = cy - half_height;
                ry = cy - half_height;
            }

            // 绘制文字 (如果有)
            if (cellContent) {
                // 添加背景
                if (cellBgColor) svg += `<path d="${`M ${tx} ${ty} L ${rx} ${ry} L ${lx} ${ly} Z`}" fill="${cellBgColor(cell)}" />`;
                const textX = cx;
                let textY = cy;
                const fontSize = 12;
                if (cell.isUpRight()) {
                    textY = textY + fontSize/2;
                } else {
                    textY = textY - fontSize/2;
                }
                svg += `<text x="${textX}" y="${textY + 6}" font-size="${fontSize}" text-anchor="middle" alignment-baseline="middle">${cellContent(cell)}</text>`;
            }

            if (!cell?.west) {
                svg += `<line x1="${lx}" y1="${ly}" x2="${tx}" y2="${ty}" stroke="black" stroke-width="1" />`; // 如果北边没有邻居，绘制北边墙壁
            }

            if (!cell.links.includes(cell?.east as TrangleCell)) {
                svg += `<line x1="${rx}" y1="${ry}" x2="${tx}" y2="${ty}" stroke="black" stroke-width="1" />`; // 东边墙壁
            }

            if (cell.isUpRight()) {
                if (!cell?.south) {
                    svg += `<line x1="${lx}" y1="${ly}" x2="${rx}" y2="${ry}" stroke="black" stroke-width="1" />`; // 南边墙壁
                }
            } else {
                if (!cell?.links.includes(cell?.north as TrangleCell)) {
                    svg += `<line x1="${lx}" y1="${ly}" x2="${rx}" y2="${ry}" stroke="black" stroke-width="1" />`; // 北边墙壁
                }
            }
        });
        
        svg += `</svg>`;
        return svg;
    } 

    toString(): string {
        return 'not support now';
    }
}