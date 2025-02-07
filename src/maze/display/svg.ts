import { ICell } from "../Cell";
import Grid from "../Grid";


export default function svg(grid: Grid): string {
    const cellSize = 30; // 单元格大小，可调整
    const strokeWidth = 1; // 线条粗细，可调整

    let svg = `<svg width="${grid.cols * cellSize + 1}" height="${grid.rows * cellSize + 1}">`;

    // 绘制墙壁 (根据链接情况)
    grid.eachCell((cell: ICell) => {
        if (!cell) return; // 跳过空单元格

        const x1 = cell.col * cellSize;
        const y1 = cell.row * cellSize;
        const x2 = (cell.col + 1) * cellSize;
        const y2 = (cell.row + 1) * cellSize;

        if (!cell?.north) {
            svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y1}" stroke="black" stroke-width="${strokeWidth}" />`; // 如果北边没有邻居，绘制北边墙壁
        }

        if (!cell.west) {
            svg += `<line x1="${x1}" y1="${y1}" x2="${x1}" y2="${y2}" stroke="black" stroke-width="${strokeWidth}" />`; // 如果西边没有邻居，绘制西边墙壁
        }

        if (!cell.linked(cell?.east)) {
            svg += `<line x1="${x2}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="${strokeWidth}" />`; // 东边墙壁
        }
        if (!cell.linked(cell?.south)) {
            svg += `<line x1="${x1}" y1="${y2}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="${strokeWidth}" />`; // 南边墙壁
        }
    });


    svg += '</svg>';
    return svg;
}