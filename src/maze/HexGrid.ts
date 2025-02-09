import HexCell from "./HexCell";
import Grid from "./Grid";

export default class HexGrid extends Grid<HexCell> {
    constructor(rows: number, cols: number) {
        super(rows, cols);
    }

    init() {
        for (let row = 0; row < this.rows; row++) {
            this.cells[row] = [];
            for (let col = 0; col < this.cols; col++) {
                this.cells[row][col] = new HexCell(row, col);
            }
        }
        this.configureCells();
    }

    configureCells(): void {
        this.cells.forEach(row => {
            row.forEach(cell => {
                const { row, col } = cell;
                let north_diagonal = null;
                let south_diagonal = null;
                if ((col & 1) === 0) { // 偶数列
                    north_diagonal = row - 1;
                    south_diagonal = row;
                } else { // 奇数列
                    north_diagonal = row;
                    south_diagonal = row + 1;
                }
                cell.northwest = this.getCell(north_diagonal, col - 1);
                cell.north = this.getCell(row - 1, col);
                cell.northeast = this.getCell(north_diagonal, col + 1);
                cell.southwest = this.getCell(south_diagonal, col - 1);
                cell.south = this.getCell(row + 1, col);
                cell.southeast = this.getCell(south_diagonal, col + 1);
            })
        });
    }

    // override
    toSVG(cellContent?: (cell: HexCell) => string, cellBgColor?: (cell: HexCell) => string): string {
        const size = 30; // 边大小
        const aSize = size / 2;
        const bSize = size * Math.sqrt(3) / 2;
        // const hexWidth = size * 2; 
        const hexHeight = bSize * 2;
        const strokeWidth = 1; // 线条粗细，可调整

        const imageWidth = 3 * aSize * this.cols + aSize + 0.5;
        const imageHeight = hexHeight * this.rows + bSize + 0.5;

        let svg = `<svg width="${imageWidth}" height="${imageHeight + 1}">`;


        // 绘制墙壁 (根据链接情况)
        this.eachCell((cell) => {

            let cx = size + 3 * cell.col * aSize;
            let cy = bSize + cell.row * hexHeight;

            if ((cell.col & 1) === 1) { // 奇数列
                cy += bSize;
            }

            let w_x = cx - size;
            let w_y = cy;
            
            let nw_x = cx - aSize;
            let nw_y = cy - bSize;

            let ne_x = cx + aSize;
            let ne_y = cy - bSize;

            let e_x = cx + size;
            let e_y = cy

            let se_x = cx + aSize;
            let se_y = cy + bSize;

            let sw_x = cx - aSize;
            let sw_y = cy + bSize;

           

            if (cellContent) {
                // 添加背景
                // 绘制弧度形
                if (cellBgColor) {
                    let path = `M ${w_x} ${w_y} L ${nw_x} ${nw_y} L ${ne_x} ${ne_y} L ${e_x} ${e_y} L ${se_x} ${se_y} L ${sw_x} ${sw_y} Z`;
                    svg += `<path d="${path}" fill="${cellBgColor(cell)}" />`;
                }
                const textX = cx;
                const textY = cy;
                svg += `<text x="${textX}" y="${textY}" text-anchor="middle" dominant-baseline="middle">${cellContent(cell)}</text>`;
            }

            if (!cell.southwest) {
                svg += `<line x1="${w_x}" y1="${w_y}" x2="${sw_x}" y2="${sw_y}" stroke="black" stroke-width="${strokeWidth}" />`; // 如果西北没有邻居，绘制西北墙壁
            }

            if (!cell.northwest) {
                svg += `<line x1="${w_x}" y1="${w_y}" x2="${nw_x}" y2="${nw_y}" stroke="black" stroke-width="${strokeWidth}" />`; // 如果西南没有邻居，绘制西南墙壁
            }

            if (!cell.north) {
                svg += `<line x1="${nw_x}" y1="${nw_y}" x2="${ne_x}" y2="${ne_y}" stroke="black" stroke-width="${strokeWidth}" />`; // 如果北没有邻居，绘制北墙壁
            }
            if (!cell.links.includes(cell?.southeast as HexCell)) {
                svg += `<line x1="${e_x}" y1="${e_y}" x2="${se_x}" y2="${se_y}" stroke="black" stroke-width="${strokeWidth}" />`; // 如果东南没有邻居，绘制东南墙壁
            }
            if (!cell.links.includes(cell?.south as HexCell)) {
                svg += `<line x1="${se_x}" y1="${se_y}" x2="${sw_x}" y2="${sw_y}" stroke="black" stroke-width="${strokeWidth}" />`; // 如果南没有邻居，绘制南墙壁
            }
            if (!cell.links.includes(cell?.northeast as HexCell)) {
                svg += `<line x1="${ne_x}" y1="${ne_y}" x2="${e_x}" y2="${e_y}" stroke="black" stroke-width="${strokeWidth}" />`; // 如果东北没有邻居，绘制东北墙壁
            }
        });

        svg += '</svg>';
        return svg;
    }
    // override
    toString(): string {
        return 'not support now';
    }
}